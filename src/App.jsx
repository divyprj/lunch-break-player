import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { TRACKS } from './tracks';
import bgArtworkPreview from './assets/background.jpg';
import bgArtworkFull from './assets/background.png';

const RESUME_KEY = 'lunch-break-player:resume';
const IDLE_DELAY_MS = 7000;
const EASTER_EGG_CODE = 'TBSM';
const FADE_IN_SECONDS = 2.4;
const FADE_OUT_SECONDS = 4.2;
const FULL_VOLUME = 0.96;
const PLAYING_VINYL_SPEED = 45;

const readResumeState = () => {
  if (typeof window === 'undefined') return null;

  try {
    const saved = JSON.parse(window.localStorage.getItem(RESUME_KEY));
    const trackIndex = Number(saved?.trackIndex);
    const currentTime = Number(saved?.currentTime);

    if (
      Number.isInteger(trackIndex) &&
      trackIndex >= 0 &&
      trackIndex < TRACKS.length &&
      Number.isFinite(currentTime) &&
      currentTime >= 0
    ) {
      return { trackIndex, currentTime };
    }
  } catch {
    return null;
  }

  return null;
};

const getFadeVolume = (time, totalDuration) => {
  if (!Number.isFinite(time) || time < 0) return FULL_VOLUME;

  const fadeInLevel = Math.min(1, Math.max(0, time / FADE_IN_SECONDS));
  const remaining = Number.isFinite(totalDuration) && totalDuration > 0
    ? totalDuration - time
    : Number.POSITIVE_INFINITY;
  const fadeOutLevel = remaining < FADE_OUT_SECONDS
    ? Math.min(1, Math.max(0, remaining / FADE_OUT_SECONDS))
    : 1;

  return Math.min(FULL_VOLUME, FULL_VOLUME * fadeInLevel * fadeOutLevel);
};

export default function App() {
  const resumeState = useMemo(() => readResumeState(), []);
  const resumeTrackIndexRef = useRef(resumeState?.trackIndex ?? null);
  const resumeTimeRef = useRef(resumeState?.currentTime ?? 0);
  const didRestoreResumeRef = useRef(false);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(resumeState?.trackIndex ?? 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(resumeState?.currentTime ?? 0);
  const [duration, setDuration] = useState(TRACKS[resumeState?.trackIndex ?? 0]?.duration ?? 0);
  const [onlineCount, setOnlineCount] = useState(22);
  const [isIdle, setIsIdle] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const playerShellRef = useRef(null);
  const idleTimerRef = useRef(null);
  const toastTimerRef = useRef(null);
  const easterEggTimerRef = useRef(null);
  const keyBufferRef = useRef('');
  const fadeFrameRef = useRef(null);
  const vinylRef = useRef(null);
  const vinylFrameRef = useRef(null);
  const vinylAngleRef = useRef(0);
  const vinylVelocityRef = useRef(0);
  const currentTrackIndexRef = useRef(currentTrackIndex);
  const currentTimeRef = useRef(currentTime);
  const lastPersistAtRef = useRef(0);

  const currentTrack = TRACKS[currentTrackIndex] || TRACKS[0];
  const currentAura = currentTrack.aura || TRACKS[0].aura;

  const formatTime = useCallback((secs) => {
    if (!Number.isFinite(secs) || secs < 0) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  const flashToast = useCallback((message, delay = 2200) => {
    window.clearTimeout(toastTimerRef.current);
    setToastMessage(message);
    toastTimerRef.current = window.setTimeout(() => setToastMessage(''), delay);
  }, []);

  const applyAudioFade = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const totalDuration = audio.duration || duration || currentTrack.duration || 0;
    audio.volume = getFadeVolume(audio.currentTime, totalDuration);
  }, [currentTrack.duration, duration]);

  const persistResumeState = useCallback((trackIndex, trackTime, force = false) => {
    if (typeof window === 'undefined') return;

    const now = Date.now();
    if (!force && now - lastPersistAtRef.current < 3000) return;

    lastPersistAtRef.current = now;
    window.localStorage.setItem(
      RESUME_KEY,
      JSON.stringify({
        trackIndex,
        currentTime: trackTime,
        updatedAt: now,
      }),
    );
  }, []);

  useEffect(() => {
    currentTrackIndexRef.current = currentTrackIndex;
    currentTimeRef.current = currentTime;
  }, [currentTime, currentTrackIndex]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => setPrefersReducedMotion(mediaQuery.matches);

    handleMotionChange();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
      return () => mediaQuery.removeEventListener('change', handleMotionChange);
    }

    mediaQuery.addListener(handleMotionChange);
    return () => mediaQuery.removeListener(handleMotionChange);
  }, []);

  // Sync audio play/pause.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      applyAudioFade();
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setIsPlaying(false));
      }
    } else {
      audio.pause();
    }
  }, [applyAudioFade, currentTrackIndex, isPlaying]);

  // Smooth fade-in/out automation while audio is running.
  useEffect(() => {
    if (!isPlaying) {
      window.cancelAnimationFrame(fadeFrameRef.current);
      return undefined;
    }

    const tick = () => {
      applyAudioFade();
      fadeFrameRef.current = window.requestAnimationFrame(tick);
    };

    fadeFrameRef.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(fadeFrameRef.current);
  }, [applyAudioFade, currentTrackIndex, isPlaying]);

  // Vinyl inertia: ease toward full speed while playing, coast down on pause.
  useEffect(() => {
    if (prefersReducedMotion) {
      window.cancelAnimationFrame(vinylFrameRef.current);
      vinylVelocityRef.current = 0;
      return undefined;
    }

    let lastFrame = performance.now();

    const tick = (timestamp) => {
      const delta = Math.min(64, timestamp - lastFrame) / 1000;
      lastFrame = timestamp;

      const targetSpeed = isPlaying ? PLAYING_VINYL_SPEED : 0;
      const ease = isPlaying ? 5.5 : 2.2;
      vinylVelocityRef.current += (
        targetSpeed - vinylVelocityRef.current
      ) * Math.min(1, delta * ease);
      vinylAngleRef.current = (
        vinylAngleRef.current + vinylVelocityRef.current * delta
      ) % 360;

      if (vinylRef.current) {
        vinylRef.current.style.transform = `rotate(${vinylAngleRef.current}deg)`;
      }

      if (isPlaying || vinylVelocityRef.current > 0.08) {
        vinylFrameRef.current = window.requestAnimationFrame(tick);
      }
    };

    window.cancelAnimationFrame(vinylFrameRef.current);
    vinylFrameRef.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(vinylFrameRef.current);
  }, [isPlaying, prefersReducedMotion]);

  // Dynamic presence count fluctuation.
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => Math.max(12, prev + (Math.random() > 0.5 ? 1 : -1)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Idle cinematic mode.
  useEffect(() => {
    const resetIdleTimer = () => {
      setIsIdle(false);
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        if (!isQueueOpen) setIsIdle(true);
      }, IDLE_DELAY_MS);
    };

    const events = ['mousemove', 'mousedown', 'touchstart', 'touchmove', 'keydown'];
    events.forEach(eventName => window.addEventListener(eventName, resetIdleTimer, { passive: true }));
    resetIdleTimer();

    return () => {
      window.clearTimeout(idleTimerRef.current);
      events.forEach(eventName => window.removeEventListener(eventName, resetIdleTimer));
    };
  }, [isQueueOpen]);

  // Close the hidden queue from outside clicks.
  useEffect(() => {
    if (!isQueueOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!playerShellRef.current?.contains(event.target)) {
        setIsQueueOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [isQueueOpen]);

  const triggerEasterEgg = useCallback(() => {
    window.clearTimeout(easterEggTimerRef.current);
    setEasterEggActive(true);
    setOnlineCount(prev => prev + 3);
    flashToast('TBSM');
    easterEggTimerRef.current = window.setTimeout(() => setEasterEggActive(false), 2400);
  }, [flashToast]);

  // Keyboard shortcuts and hidden TBSM unlock.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (audioRef.current) audioRef.current.currentTime += 5;
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (audioRef.current) audioRef.current.currentTime -= 5;
      } else if (e.code === 'Escape') {
        setIsQueueOpen(false);
      }

      if (!e.metaKey && !e.ctrlKey && !e.altKey && e.key.length === 1) {
        keyBufferRef.current = `${keyBufferRef.current}${e.key.toUpperCase()}`.slice(-EASTER_EGG_CODE.length);
        if (keyBufferRef.current === EASTER_EGG_CODE) {
          triggerEasterEgg();
          keyBufferRef.current = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerEasterEgg]);

  // Persist listening position without adding visible UI.
  useEffect(() => {
    persistResumeState(currentTrackIndex, currentTime);
  }, [currentTime, currentTrackIndex, persistResumeState]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      persistResumeState(currentTrackIndexRef.current, currentTimeRef.current, true);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [persistResumeState]);

  useEffect(() => () => {
    window.clearTimeout(toastTimerRef.current);
    window.clearTimeout(idleTimerRef.current);
    window.clearTimeout(easterEggTimerRef.current);
    window.cancelAnimationFrame(fadeFrameRef.current);
    window.cancelAnimationFrame(vinylFrameRef.current);
  }, []);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(audio.currentTime);
    currentTimeRef.current = audio.currentTime;
    persistResumeState(currentTrackIndexRef.current, audio.currentTime);
    applyAudioFade();
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextDuration = audio.duration || currentTrack.duration || 0;
    setDuration(nextDuration);

    if (
      !didRestoreResumeRef.current &&
      currentTrackIndex === resumeTrackIndexRef.current &&
      resumeTimeRef.current > 1
    ) {
      const restoredTime = Math.min(
        resumeTimeRef.current,
        Math.max(0, nextDuration - FADE_OUT_SECONDS - 0.5),
      );
      audio.currentTime = restoredTime;
      setCurrentTime(restoredTime);
      didRestoreResumeRef.current = true;
      flashToast(`resumed from ${formatTime(restoredTime)}`);
    } else {
      setCurrentTime(audio.currentTime);
    }

    applyAudioFade();
  };

  const selectTrack = (index, shouldPlay = true) => {
    const nextIndex = (index + TRACKS.length) % TRACKS.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);
    setDuration(TRACKS[nextIndex]?.duration ?? 0);
    setIsPlaying(shouldPlay);
  };

  const handleNext = () => selectTrack(currentTrackIndex + 1, true);

  const handlePrev = () => {
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      selectTrack(currentTrackIndex - 1, true);
    }
  };

  const handleEnded = () => {
    if (audioRef.current) audioRef.current.volume = 0;

    if (currentTrackIndex === TRACKS.length - 1) {
      setIsPlaying(false);
      flashToast('back to work.', 3200);
      return;
    }

    selectTrack(currentTrackIndex + 1, true);
  };

  const handlePlayPause = () => {
    if (!isPlaying && audioRef.current && duration && audioRef.current.currentTime >= duration - 0.35) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }

    setIsPlaying(prev => !prev);
  };

  const handleSeek = (e) => {
    if (!progressBarRef.current || !audioRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));
    const newTime = percentage * (duration || 0);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    applyAudioFade();
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <main
      className="app-root relative flex w-screen flex-col items-center justify-between overflow-hidden select-none"
      style={{
        '--track-accent': currentAura.accent,
        '--track-glow': currentAura.glow,
      }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
        <picture className="background-picture">
          <source
            srcSet={bgArtworkFull}
            media="(min-width: 1280px) and (min-resolution: 1.5dppx), (min-width: 1920px)"
          />
          <img
            src={bgArtworkPreview}
            alt="Seedhe Maut Lunch Break Artwork"
            decoding="async"
            fetchPriority="high"
            className={`background-art w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-out ${isIdle && !prefersReducedMotion ? 'scale-[1.025]' : 'scale-100'}`}
          />
        </picture>
        <div
          className="absolute inset-0 transition-colors duration-[1600ms]"
          style={{
            backgroundColor: currentAura.tint,
            mixBlendMode: 'screen',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className={`presence-badge fixed top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] ${easterEggActive ? 'presence-badge-unlocked' : ''}`}>
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E575] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E575] shadow-[0_0_8px_rgba(0,229,117,0.9)]" />
        </span>
        <span className="text-sm font-semibold text-white">
          <span className="font-bold mr-1">{onlineCount}</span>online
        </span>
      </div>

      <div className={`message-flash fixed top-[18vh] left-1/2 z-20 -translate-x-1/2 text-[12px] font-semibold uppercase text-white/85 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] ${toastMessage ? 'message-flash-visible' : ''}`}>
        {toastMessage}
      </div>

      <div className="flex-1" />

      <div className="player-dock flex w-full justify-center z-20">
        <div ref={playerShellRef} className={`player-shell relative w-full max-w-xl transition-all duration-700 ease-out ${isIdle && !isQueueOpen ? 'translate-y-2 scale-[0.96] opacity-75' : 'translate-y-0 scale-100 opacity-100'}`}>
          {isQueueOpen && (
            <div className="queue-panel absolute bottom-[calc(100%+0.75rem)] left-0 right-0 max-h-[42vh] overflow-hidden rounded-[24px] border border-white/15 bg-black/35 p-2 shadow-[0_18px_70px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-2xl backdrop-saturate-150">
              <div className="queue-scroll max-h-[calc(42vh-1rem)] overflow-y-auto pr-1">
                {TRACKS.map((track, index) => (
                  <button
                    type="button"
                    key={track.id}
                    onClick={() => {
                      selectTrack(index, true);
                      setIsQueueOpen(false);
                    }}
                    aria-current={index === currentTrackIndex ? 'true' : undefined}
                    className={`queue-row flex h-10 w-full items-center gap-3 rounded-full px-3 text-left text-white transition ${index === currentTrackIndex ? 'bg-white/16' : 'hover:bg-white/10'}`}
                  >
                    <span className={`w-7 shrink-0 text-[11px] tabular-nums ${index === currentTrackIndex ? 'text-white' : 'text-white/45'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                      {track.title}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] tabular-nums text-white/45">
                      {formatTime(track.duration)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div
            className="
              player-pill group relative flex items-center gap-4 rounded-full p-3 pr-5
              bg-white/10 backdrop-blur-2xl backdrop-saturate-150
              border border-white/20
              shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)]
            "
          >
            <div className="relative h-20 w-20 shrink-0">
              <div
                ref={vinylRef}
                className="vinyl-disc h-full w-full rounded-full shadow-lg ring-1 ring-white/20 overflow-hidden"
                style={{
                  boxShadow: `0 12px 34px rgba(0,0,0,0.38), 0 0 26px ${currentAura.glow}`,
                }}
              >
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/85 ring-2 ring-white/50 shadow-inner" />
            </div>

            <div className="min-w-0 flex-1">
              <button
                type="button"
                onClick={() => setIsQueueOpen(prev => !prev)}
                aria-expanded={isQueueOpen}
                aria-label="Toggle track queue"
                className="block w-full min-w-0 cursor-pointer text-left"
              >
                <p className="truncate text-[15px] font-semibold text-white drop-shadow-sm">
                  {currentTrack.title}
                </p>
                <p className="truncate text-[13px] text-white/70">
                  {currentTrack.artist}
                </p>
              </button>

              <div className="mt-2">
                <div
                  ref={progressBarRef}
                  onClick={handleSeek}
                  className="group/bar relative h-2.5 w-full cursor-pointer flex items-center"
                  role="slider"
                  aria-label="Seek"
                  aria-valuemin="0"
                  aria-valuemax={duration || 100}
                  aria-valuenow={currentTime}
                >
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full transition-colors duration-700"
                      style={{
                        width: `${progressPercent}%`,
                        backgroundColor: currentAura.accent,
                      }}
                    />
                  </div>
                  <div
                    className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 shadow transition-opacity group-hover/bar:opacity-100"
                    style={{
                      left: `${progressPercent}%`,
                      backgroundColor: currentAura.accent,
                    }}
                  />
                </div>

                <div className="mt-1 text-left text-[11px] tabular-nums font-mono text-white/60">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous track"
                className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95 border-0 outline-none focus:outline-none focus:ring-0"
              >
                <SkipBack size={17} strokeWidth={2.4} />
              </button>

              <button
                type="button"
                onClick={handlePlayPause}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="h-11 w-11 rounded-full bg-white text-black shadow-lg transition hover:scale-105 active:scale-95 flex items-center justify-center border-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none p-0 cursor-pointer"
                style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
              >
                {isPlaying ? (
                  <Pause size={18} strokeWidth={3} fill="currentColor" />
                ) : (
                  <Play size={18} strokeWidth={3} fill="currentColor" className="ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next track"
                className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95 border-0 outline-none focus:outline-none focus:ring-0"
              >
                <SkipForward size={17} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

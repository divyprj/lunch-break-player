import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ListMusic, Pause, Play, Search, SkipBack, SkipForward, X } from 'lucide-react';
import { TRACKS } from './tracks';
import lunchBreakBg from './assets/background.webp';

const RESUME_KEY = 'lunch-break-player:resume';
const IDLE_DELAY_MS = 7000;
const EASTER_EGG_CODE = 'TBSM';
const FADE_OUT_SECONDS = 4.2;
const FULL_VOLUME = 1.0;

function formatTime(secs) {
  if (!Number.isFinite(secs) || secs < 0) return '0:00';
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

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

// Isolated, High-Performance Progress Bar with Direct DOM Transforms & Off-Thread GPU Scaling
const AudioProgressBar = React.memo(function AudioProgressBar({
  audioRef,
  duration,
  accentColor,
  playbackStatus,
  isPlaying,
  playbackError,
  onSeek,
}) {
  const barRef = useRef(null);
  const fillRef = useRef(null);
  const thumbRef = useRef(null);
  const timeLabelRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const updateDOM = () => {
      const cur = audio.currentTime || 0;
      const dur = duration || audio.duration || 0;
      const fraction = dur > 0 ? Math.min(1, Math.max(0, cur / dur)) : 0;
      const pct = fraction * 100;

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${fraction})`;
      }
      if (thumbRef.current) {
        thumbRef.current.style.left = `${pct}%`;
      }
      if (timeLabelRef.current) {
        timeLabelRef.current.textContent = `${formatTime(cur)} / ${formatTime(dur)}`;
      }
    };

    audio.addEventListener('timeupdate', updateDOM, { passive: true });
    updateDOM();

    return () => {
      audio.removeEventListener('timeupdate', updateDOM);
    };
  }, [audioRef, duration]);

  const handleBarClick = (e) => {
    if (!barRef.current || !audioRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(fraction);
  };

  const isBuffering = playbackStatus === 'loading' || playbackStatus === 'buffering';

  return (
    <div className="mt-2">
      <div
        ref={barRef}
        onClick={handleBarClick}
        className="group/bar relative h-2.5 w-full cursor-pointer flex items-center"
        role="slider"
        aria-label="Seek"
      >
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
          <div
            ref={fillRef}
            className="h-full w-full rounded-full origin-left transition-colors duration-700"
            style={{
              transform: 'scaleX(0)',
              backgroundColor: accentColor,
              willChange: 'transform',
            }}
          />
        </div>
        <div
          ref={thumbRef}
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 shadow transition-opacity group-hover/bar:opacity-100 pointer-events-none"
          style={{
            left: '0%',
            backgroundColor: accentColor,
          }}
        />
      </div>

      <div className="mt-1 flex items-center justify-between text-[11px] tabular-nums font-mono text-white/60">
        <span ref={timeLabelRef}>0:00 / {formatTime(duration)}</span>
        {isBuffering && isPlaying && (
          <span className="text-[10px] text-amber-300/90 font-medium animate-pulse" aria-live="polite">
            Buffering…
          </span>
        )}
        {playbackStatus === 'error' && (
          <span className="text-[10px] text-rose-400 font-medium" title={playbackError?.message || ''} aria-live="polite">
            Unable to load audio
          </span>
        )}
      </div>
    </div>
  );
});

// Memoized Tracklist Drawer (Rendered only when open)
const TrackDrawer = React.memo(function TrackDrawer({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  onClearSearch,
  filteredTracks,
  currentTrackIndex,
  isPlaying,
  playbackStatus,
  onSelectTrack,
  searchInputRef,
  activeTrackRowRef,
}) {
  if (!isOpen) return null;

  return (
    <div className="queue-panel absolute bottom-[calc(100%+0.75rem)] left-0 right-0 max-h-[60vh] md:max-h-[52vh] overflow-hidden rounded-[28px] border border-white/20 bg-black/65 p-3.5 shadow-[0_24px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-3xl backdrop-saturate-200 flex flex-col z-30">
      {/* Drawer Header & Real-Time Search */}
      <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/10 px-1">
        <div className="relative flex-1 flex items-center">
          <Search size={14} className="absolute left-3.5 text-white/40 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tracks..."
            className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/15 focus:border-white/30 rounded-full pl-9 pr-8 py-2 text-[13px] text-white placeholder-white/40 outline-none transition duration-200"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={onClearSearch}
              className="absolute right-3 text-white/50 hover:text-white"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close tracklist"
          className="grid h-8 w-8 place-items-center rounded-full text-white/60 hover:bg-white/15 hover:text-white transition active:scale-95 border-0 outline-none shrink-0"
        >
          <X size={16} />
        </button>
      </div>

      {/* Scrollable Clean Tracklist */}
      <div className="queue-scroll mt-2 max-h-[calc(60vh-4.5rem)] md:max-h-[calc(52vh-4.5rem)] overflow-y-auto pr-1 space-y-1">
        {filteredTracks.length === 0 ? (
          <div className="py-10 text-center text-xs text-white/40 font-mono">
            No tracks found matching "{searchQuery}"
          </div>
        ) : (
          filteredTracks.map(({ track, index }) => {
            const isSelected = index === currentTrackIndex;
            return (
              <button
                type="button"
                key={track.id}
                ref={isSelected ? activeTrackRowRef : null}
                onClick={() => onSelectTrack(index)}
                aria-current={isSelected ? 'true' : undefined}
                className={`group/row flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left text-white transition-all duration-200 ${
                  isSelected
                    ? 'bg-white/18 border border-white/25 shadow-sm'
                    : 'hover:bg-white/10 border border-transparent'
                }`}
              >
                {/* Number or Equalizer */}
                <div className="w-6 shrink-0 flex items-center justify-center">
                  {isSelected && (playbackStatus === 'playing' || (playbackStatus === 'buffering' && isPlaying)) ? (
                    <div className="flex items-end gap-0.5 h-3.5">
                      <span className="eq-bar-1 w-0.5 rounded-full bg-[#00E575]" />
                      <span className="eq-bar-2 w-0.5 rounded-full bg-[#00E575]" />
                      <span className="eq-bar-3 w-0.5 rounded-full bg-[#00E575]" />
                    </div>
                  ) : (
                    <span className={`text-[11px] font-mono tabular-nums ${isSelected ? 'text-white font-bold' : 'text-white/40 group-hover/row:text-white/70'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  )}
                </div>

                {/* Title & Artist */}
                <div className="min-w-0 flex-1">
                  <div className={`truncate text-[13px] font-medium leading-snug ${isSelected ? 'text-white font-semibold' : 'text-white/90'}`}>
                    {track.title}
                  </div>
                  <div className="truncate text-[11px] text-white/50 leading-none mt-0.5">
                    {track.artist}
                  </div>
                </div>

                {/* Duration */}
                <span className="text-[11px] font-mono tabular-nums text-white/40 group-hover/row:text-white/70 shrink-0">
                  {formatTime(track.duration)}
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
});

export default function App() {
  const resumeState = useMemo(() => readResumeState(), []);
  const resumeTrackIndexRef = useRef(resumeState?.trackIndex ?? null);
  const resumeTimeRef = useRef(resumeState?.currentTime ?? 0);
  const didRestoreResumeRef = useRef(false);

  // Coarse player state (Only triggers re-renders on genuine user actions/events)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(resumeState?.trackIndex ?? 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState('paused');
  const [playbackError, setPlaybackError] = useState(null);
  const [duration, setDuration] = useState(TRACKS[resumeState?.trackIndex ?? 0]?.duration ?? 0);
  const [onlineCount, setOnlineCount] = useState(22);
  const [isIdle, setIsIdle] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const audioRef = useRef(null);
  const playerShellRef = useRef(null);
  const searchInputRef = useRef(null);
  const activeTrackRowRef = useRef(null);
  const idleTimerRef = useRef(null);
  const easterEggTimerRef = useRef(null);
  const keyBufferRef = useRef('');
  const currentTrackIndexRef = useRef(currentTrackIndex);
  const currentTimeRef = useRef(resumeState?.currentTime ?? 0);
  const lastPersistAtRef = useRef(0);
  const playIntentRef = useRef(false);
  const playbackGenerationRef = useRef(0);
  const preloaderRef = useRef(null);
  const preloadTimerRef = useRef(null);

  const setPlaybackIntent = useCallback((nextOrUpdater) => {
    const next =
      typeof nextOrUpdater === 'function'
        ? Boolean(nextOrUpdater(playIntentRef.current))
        : Boolean(nextOrUpdater);

    playIntentRef.current = next;
    setIsPlaying(next);
    return next;
  }, []);

  const currentTrack = TRACKS[currentTrackIndex] || TRACKS[0];
  const currentAura = currentTrack.aura || TRACKS[0].aura;

  // Filtered tracks with original playlist indices for exact selection
  const filteredTracks = useMemo(() => {
    const all = TRACKS.map((track, index) => ({ track, index }));
    if (!searchQuery.trim()) return all;
    const q = searchQuery.toLowerCase().trim();
    return all.filter(({ track }) =>
      track.title.toLowerCase().includes(q) ||
      track.artist.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Scroll current track into view when drawer opens
  useEffect(() => {
    if (isQueueOpen) {
      setTimeout(() => {
        activeTrackRowRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, 50);
    }
  }, [isQueueOpen]);

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
  }, [currentTrackIndex]);

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

  // Central Single-Source-of-Truth Audio Controller Effect
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const generation = ++playbackGenerationRef.current;

    const targetSrc = new URL(
      currentTrack.audioUrl,
      window.location.href,
    ).href;

    const sourceChanged =
      audio.currentSrc !== targetSrc &&
      audio.src !== targetSrc;

    setPlaybackError(null);

    if (sourceChanged) {
      audio.pause();
      audio.src = currentTrack.audioUrl;
      audio.load();
      setPlaybackStatus('loading');
    }

    if (!isPlaying) {
      audio.pause();
      if (!sourceChanged) {
        setPlaybackStatus('paused');
      }
      return () => {
        if (playbackGenerationRef.current === generation) {
          playbackGenerationRef.current += 1;
        }
      };
    }

    audio.volume = FULL_VOLUME;

    if (audio.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
      setPlaybackStatus(sourceChanged ? 'loading' : 'buffering');
    }

    const startPlayback = async () => {
      try {
        await audio.play();
        if (generation !== playbackGenerationRef.current) return;
        setPlaybackStatus('playing');
      } catch (error) {
        if (generation !== playbackGenerationRef.current) return;

        if (error?.name === 'AbortError') {
          return;
        }

        if (error?.name === 'NotAllowedError') {
          setPlaybackIntent(false);
          setPlaybackStatus('paused');
          return;
        }

        console.error('Audio playback failed:', error);
        setPlaybackError(error);
        setPlaybackIntent(false);
        setPlaybackStatus('error');
      }
    };

    startPlayback();

    return () => {
      if (playbackGenerationRef.current === generation) {
        playbackGenerationRef.current += 1;
      }
    };
  }, [currentTrack.audioUrl, isPlaying, setPlaybackIntent]);

  // Dynamic presence count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => Math.max(12, prev + (Math.random() > 0.5 ? 1 : -1)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Idle cinematic mode
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

  // Close the hidden queue from outside clicks
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
    easterEggTimerRef.current = window.setTimeout(() => setEasterEggActive(false), 2400);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setPlaybackIntent(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (audioRef.current) {
          const next = audioRef.current.currentTime + 5;
          audioRef.current.currentTime = next;
          currentTimeRef.current = next;
        }
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (audioRef.current) {
          const next = Math.max(0, audioRef.current.currentTime - 5);
          audioRef.current.currentTime = next;
          currentTimeRef.current = next;
        }
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
  }, [setPlaybackIntent, triggerEasterEgg]);

  // Persist listening position on tab close / unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      persistResumeState(currentTrackIndexRef.current, currentTimeRef.current, true);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [persistResumeState]);

  // Unmount cleanup
  useEffect(() => () => {
    window.clearTimeout(idleTimerRef.current);
    window.clearTimeout(easterEggTimerRef.current);
    window.clearTimeout(preloadTimerRef.current);
    if (preloaderRef.current) {
      preloaderRef.current.pause();
      preloaderRef.current.removeAttribute('src');
      preloaderRef.current.load();
      preloaderRef.current = null;
    }
  }, []);

  // Continuous Native Audio Time Tracking (Updates refs & persistence ONLY — 0 React root re-renders)
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const curTime = audio.currentTime;
    currentTimeRef.current = curTime;
    persistResumeState(currentTrackIndexRef.current, curTime);
  }, [persistResumeState]);

  // Throttled MediaSession Position Sync (~1 Hz)
  useEffect(() => {
    if (typeof window === 'undefined' || !('mediaSession' in navigator)) return undefined;

    const interval = window.setInterval(() => {
      const audio = audioRef.current;
      if (!audio || playbackStatus !== 'playing') return;
      const mediaDuration = audio.duration || duration || 0;
      if (Number.isFinite(mediaDuration) && mediaDuration > 0) {
        try {
          navigator.mediaSession.setPositionState({
            duration: mediaDuration,
            playbackRate: audio.playbackRate || 1,
            position: Math.min(Math.max(0, audio.currentTime), mediaDuration),
          });
        } catch {
          // Ignore
        }
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [duration, playbackStatus]);

  const handleLoadedMetadata = useCallback(() => {
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
      currentTimeRef.current = restoredTime;
      didRestoreResumeRef.current = true;
    }
  }, [currentTrack.duration, currentTrackIndex]);

  // Metadata-only next track warm-up (with 2s debounce and explicit cancellation)
  useEffect(() => {
    window.clearTimeout(preloadTimerRef.current);

    const existing = preloaderRef.current;
    if (existing) {
      existing.pause();
      existing.removeAttribute('src');
      existing.load();
      preloaderRef.current = null;
    }

    if (playbackStatus !== 'playing') {
      return undefined;
    }

    const connection =
      typeof navigator !== 'undefined'
        ? navigator.connection || navigator.mozConnection || navigator.webkitConnection
        : null;

    if (connection?.saveData || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') {
      return undefined;
    }

    const nextIndex = (currentTrackIndexRef.current + 1) % TRACKS.length;
    const nextTrack = TRACKS[nextIndex];
    if (!nextTrack) return undefined;

    preloadTimerRef.current = window.setTimeout(() => {
      const preloader = new Audio();
      preloader.preload = 'metadata';
      preloader.src = nextTrack.audioUrl;
      preloader.load();
      preloaderRef.current = preloader;
    }, 2000);

    return () => {
      window.clearTimeout(preloadTimerRef.current);
      const preloader = preloaderRef.current;
      if (preloader) {
        preloader.pause();
        preloader.removeAttribute('src');
        preloader.load();
        preloaderRef.current = null;
      }
    };
  }, [currentTrackIndex, playbackStatus]);

  const selectTrack = useCallback((index, shouldPlay = true) => {
    const nextIndex = (index + TRACKS.length) % TRACKS.length;
    const targetTrack = TRACKS[nextIndex];
    if (!targetTrack) return;

    // CRITICAL: Update imperative refs BEFORE scheduling React state.
    currentTrackIndexRef.current = nextIndex;
    currentTimeRef.current = 0;
    didRestoreResumeRef.current = true;

    setCurrentTrackIndex(nextIndex);
    setDuration(targetTrack.duration || 0);

    setPlaybackIntent(shouldPlay);
  }, [setPlaybackIntent]);

  const handleNext = useCallback(() => {
    selectTrack(currentTrackIndexRef.current + 1, true);
  }, [selectTrack]);

  const handlePrev = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      currentTimeRef.current = 0;
      setPlaybackIntent(true);
      return;
    }
    selectTrack(currentTrackIndexRef.current - 1, true);
  }, [selectTrack, setPlaybackIntent]);

  const handleEnded = useCallback(() => {
    const endedIndex = currentTrackIndexRef.current;
    if (endedIndex >= TRACKS.length - 1) {
      setPlaybackIntent(false);
      setPlaybackStatus('paused');
      return;
    }
    selectTrack(endedIndex + 1, true);
  }, [selectTrack, setPlaybackIntent]);

  // Native Web MediaSession metadata
  useEffect(() => {
    if (typeof window === 'undefined' || !('mediaSession' in navigator)) return;

    try {
      const absoluteCover = new URL(currentTrack.cover, window.location.href).href;
      const absoluteBg = new URL(currentTrack.background, window.location.href).href;
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: currentTrack.album || 'Seedhe Maut',
        artwork: [
          { src: absoluteCover, sizes: '512x512', type: 'image/jpeg' },
          { src: absoluteBg, sizes: '1920x1080', type: 'image/webp' },
        ],
      });
    } catch {
      // Safe fallback
    }
  }, [currentTrack]);

  // Native Web MediaSession action handlers (dispatch INTENT only)
  useEffect(() => {
    if (typeof window === 'undefined' || !('mediaSession' in navigator)) return undefined;

    const mediaSession = navigator.mediaSession;
    const register = (action, handler) => {
      try {
        mediaSession.setActionHandler(action, handler);
      } catch {
        // Unsupported action in browser
      }
    };

    register('play', () => setPlaybackIntent(true));
    register('pause', () => setPlaybackIntent(false));
    register('previoustrack', handlePrev);
    register('nexttrack', handleNext);

    register('seekto', (details) => {
      const audio = audioRef.current;
      if (!audio || details.seekTime == null) return;
      const curDur = Number.isFinite(audio.duration) && audio.duration > 0
        ? audio.duration
        : TRACKS[currentTrackIndexRef.current]?.duration || 0;
      const nextTime = Math.max(0, Math.min(details.seekTime, curDur));
      if (details.fastSeek && typeof audio.fastSeek === 'function') {
        audio.fastSeek(nextTime);
      } else {
        audio.currentTime = nextTime;
      }
      currentTimeRef.current = nextTime;
    });

    register('seekbackward', (details) => {
      const audio = audioRef.current;
      if (!audio) return;
      const offset = details.seekOffset || 5;
      const nextTime = Math.max(0, audio.currentTime - offset);
      audio.currentTime = nextTime;
      currentTimeRef.current = nextTime;
    });

    register('seekforward', (details) => {
      const audio = audioRef.current;
      if (!audio) return;
      const curDur = Number.isFinite(audio.duration) && audio.duration > 0
        ? audio.duration
        : TRACKS[currentTrackIndexRef.current]?.duration || 0;
      const offset = details.seekOffset || 5;
      const nextTime = Math.min(curDur, audio.currentTime + offset);
      audio.currentTime = nextTime;
      currentTimeRef.current = nextTime;
    });

    return () => {
      ['play', 'pause', 'previoustrack', 'nexttrack', 'seekto', 'seekbackward', 'seekforward'].forEach((action) => {
        try {
          mediaSession.setActionHandler(action, null);
        } catch {
          // ignore
        }
      });
    };
  }, [handleNext, handlePrev, setPlaybackIntent]);

  // Sync MediaSession playbackState with actual playback status
  useEffect(() => {
    if (typeof window === 'undefined' || !('mediaSession' in navigator)) return;
    try {
      if (playbackStatus === 'playing' || (playbackStatus === 'buffering' && playIntentRef.current)) {
        navigator.mediaSession.playbackState = 'playing';
      } else {
        navigator.mediaSession.playbackState = 'paused';
      }
    } catch {
      // ignore
    }
  }, [playbackStatus]);

  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;
    const nextIntent = !playIntentRef.current;

    if (nextIntent && audio && duration && audio.currentTime >= duration - 0.35) {
      audio.currentTime = 0;
      currentTimeRef.current = 0;
    }

    setPlaybackIntent(nextIntent);
  }, [duration, setPlaybackIntent]);

  const handleSeekFraction = useCallback((fraction) => {
    const audio = audioRef.current;
    if (!audio) return;
    const targetDuration = audio.duration || duration || TRACKS[currentTrackIndexRef.current]?.duration || 0;
    const nextTime = fraction * targetDuration;
    audio.currentTime = nextTime;
    currentTimeRef.current = nextTime;
    persistResumeState(currentTrackIndexRef.current, nextTime, true);
  }, [duration, persistResumeState]);

  return (
    <main
      className="app-root relative flex w-screen flex-col items-center justify-between overflow-hidden select-none"
      style={{
        '--track-accent': currentAura.accent,
        '--track-glow': currentAura.glow,
      }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Permanent Default Lunch Break Background Layer */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={lunchBreakBg}
            alt="Seedhe Maut Lunch Break Artwork"
            decoding="async"
            fetchPriority="high"
            className={`w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-out ${
              isIdle && !prefersReducedMotion ? 'scale-[1.025]' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />
        </div>

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
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onLoadStart={() => {
          setPlaybackStatus('loading');
        }}
        onWaiting={() => {
          if (playIntentRef.current) {
            setPlaybackStatus('buffering');
          }
        }}
        onStalled={() => {
          if (playIntentRef.current) {
            setPlaybackStatus('buffering');
          }
        }}
        onPlaying={() => {
          setPlaybackStatus('playing');
          setPlaybackError(null);
        }}
        onPause={() => {
          if (!playIntentRef.current) {
            setPlaybackStatus('paused');
          }
        }}
        onError={() => {
          const mediaError = audioRef.current?.error;
          if (mediaError) {
            console.error('HTMLAudioElement error:', mediaError);
            setPlaybackError(mediaError);
            setPlaybackStatus('error');
            setPlaybackIntent(false);
          }
        }}
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

      <div className="flex-1" />

      <div className="player-dock flex w-full justify-center z-20">
        <div ref={playerShellRef} className={`player-shell relative w-full max-w-xl transition-all duration-700 ease-out ${isIdle && !isQueueOpen ? 'translate-y-2 scale-[0.96] opacity-75' : 'translate-y-0 scale-100 opacity-100'}`}>
          <TrackDrawer
            isOpen={isQueueOpen}
            onClose={() => setIsQueueOpen(false)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={() => setSearchQuery('')}
            filteredTracks={filteredTracks}
            currentTrackIndex={currentTrackIndex}
            isPlaying={isPlaying}
            playbackStatus={playbackStatus}
            onSelectTrack={(index) => {
              selectTrack(index, true);
              setIsQueueOpen(false);
              setSearchQuery('');
            }}
            searchInputRef={searchInputRef}
            activeTrackRowRef={activeTrackRowRef}
          />

          <div
            className="
              player-pill relative flex items-center gap-3.5 rounded-[32px] p-3 pr-4
              bg-white/10 backdrop-blur-2xl backdrop-saturate-150
              border border-white/20
              shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)]
            "
          >
            {/* Vinyl Disc with 100% GPU Compositor Hardware Acceleration */}
            <div className="relative h-20 w-20 shrink-0">
              <div
                className={`vinyl-disc h-full w-full rounded-full shadow-lg ring-1 ring-white/20 overflow-hidden ${
                  prefersReducedMotion ? '' : 'vinyl-spin'
                }`}
                style={{
                  boxShadow: `0 12px 34px rgba(0,0,0,0.38), 0 0 26px ${currentAura.glow}`,
                  animationPlayState: playbackStatus === 'playing' ? 'running' : 'paused',
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
                className="block w-full min-w-0 cursor-pointer text-left group/title"
              >
                <p className="truncate text-[15px] font-semibold text-white drop-shadow-sm group-hover/title:underline decoration-white/30 underline-offset-2">
                  {currentTrack.title}
                </p>
                <p className="truncate text-[13px] text-white/70">
                  {currentTrack.artist}
                </p>
              </button>

              <AudioProgressBar
                audioRef={audioRef}
                duration={duration}
                accentColor={currentAura.accent}
                playbackStatus={playbackStatus}
                isPlaying={isPlaying}
                playbackError={playbackError}
                onSeek={handleSeekFraction}
              />
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

              {/* Tracklist Drawer Toggle Button */}
              <button
                type="button"
                onClick={() => setIsQueueOpen(prev => !prev)}
                aria-label="Open tracklist drawer"
                className={`grid h-9 w-9 place-items-center rounded-full transition active:scale-95 border-0 outline-none focus:outline-none focus:ring-0 ${
                  isQueueOpen ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/15 hover:text-white'
                }`}
              >
                <ListMusic size={17} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

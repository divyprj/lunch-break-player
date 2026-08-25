import React, { useState, useRef, useEffect } from 'react';
import { TRACKS } from './tracks';
import bgArtwork from './assets/background.png';



export default function App() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [onlineCount, setOnlineCount] = useState(22);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const currentTrack = TRACKS[currentTrackIndex] || TRACKS[0];

  // Sync Audio Play / Pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setIsPlaying(false));
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  // Dynamic presence count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => Math.max(12, prev + (Math.random() > 0.5 ? 1 : -1)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut: Spacebar to toggle Play/Pause
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
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex(prev => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
    } else {
      setCurrentTrackIndex(prev => (prev - 1 + TRACKS.length) % TRACKS.length);
      setIsPlaying(true);
    }
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
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <main className="relative flex h-screen w-screen flex-col items-center justify-between overflow-hidden select-none">
      {/* 1. Fullscreen Background Image (Fixed Z-Index & Clean object-cover) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
        <img 
          src={bgArtwork} 
          alt="Seedhe Maut Lunch Break Artwork" 
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle Ambient Vignette for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
      />

      {/* 2. Top-Center Live Presence Indicator (Exact match to screenshot) */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E575] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E575] shadow-[0_0_8px_rgba(0,229,117,0.9)]" />
        </span>
        <span className="text-sm font-semibold text-white tracking-wide">
          <span className="font-bold mr-1">{onlineCount}</span>online
        </span>
      </div>

      {/* Center Breathing Room */}
      <div className="flex-1" />

      {/* 3. Bottom Glassmorphic Player (Exact match to screenshot) */}
      <div className="mb-[6vh] flex w-full justify-center px-4 z-20">
        <div className="w-full max-w-xl">
          <div 
            className="
              group relative flex items-center gap-4 rounded-full p-3 pr-5
              bg-white/10 backdrop-blur-2xl backdrop-saturate-150
              border border-white/20
              shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)]
            "
          >
            {/* Spinning Vinyl Record Disc with Artwork */}
            <div className="relative h-20 w-20 shrink-0">
              <div 
                className={`h-full w-full rounded-full shadow-lg ring-1 ring-white/20 overflow-hidden spin-disc ${!isPlaying ? 'spin-disc-paused' : ''}`}
              >
                <img 
                  src={currentTrack.cover} 
                  alt={currentTrack.title} 
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Spindle Center Hole */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/85 ring-2 ring-white/50 shadow-inner" />
            </div>

            {/* Track Info & Interactive Seeker */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold text-white drop-shadow-sm">
                {currentTrack.title}
              </p>
              <p className="truncate text-[13px] text-white/70">
                {currentTrack.artist}
              </p>

              {/* Seeker Bar */}
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
                  {/* Track Background */}
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                    <div 
                      className="h-full rounded-full bg-white/90" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  {/* Hover Thumb Indicator */}
                  <div 
                    className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover/bar:opacity-100"
                    style={{ left: `${progressPercent}%` }}
                  />
                </div>

                {/* Timestamp */}
                <div className="mt-1 text-left text-[11px] tabular-nums font-mono text-white/60">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </div>

            {/* Controls: Prev, Play/Pause, Next */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Previous */}
              <button 
                type="button" 
                onClick={handlePrev}
                aria-label="Previous track" 
                className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              {/* Play / Pause */}
              <button 
                type="button" 
                onClick={() => setIsPlaying(prev => !prev)}
                aria-label={isPlaying ? "Pause" : "Play"} 
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 active:scale-95"
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Next */}
              <button 
                type="button" 
                onClick={handleNext}
                aria-label="Next track" 
                className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 6h2v12h-2zm-2 6L5.5 6v12z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

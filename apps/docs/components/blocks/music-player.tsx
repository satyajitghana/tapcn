'use client';

import { useState, useEffect } from 'react';
import { View } from 'react-native';
import dynamic from 'next/dynamic';

const GrainGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.GrainGradient),
  { ssr: false },
);

export function MusicPlayerBlock() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [liked, setLiked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'lyrics' | 'queue'>('queue');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.5));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const queue = [
    { title: 'Midnight City', artist: 'M83', duration: '4:03', active: true },
    { title: 'Electric Feel', artist: 'MGMT', duration: '3:49', active: false },
    { title: 'Somebody Else', artist: 'The 1975', duration: '5:43', active: false },
    { title: 'Heart to Heart', artist: 'Mac DeMarco', duration: '3:25', active: false },
  ];

  const formatTime = (pct: number) => {
    const total = 243; // 4:03 in seconds
    const current = Math.floor((pct / 100) * total);
    const m = Math.floor(current / 60);
    const s = current % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View className="flex-1 bg-background">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        @keyframes equalizerBar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes heartPop {
          0% { transform: scale(1); }
          30% { transform: scale(1.4); }
          60% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .music-fade-in { animation: fadeSlideUp 0.6s ease-out both; }
        .music-fade-in-1 { animation: fadeSlideUp 0.6s ease-out 0.1s both; }
        .music-fade-in-2 { animation: fadeSlideUp 0.6s ease-out 0.2s both; }
        .music-fade-in-3 { animation: fadeSlideUp 0.6s ease-out 0.3s both; }
        .music-fade-in-4 { animation: fadeSlideUp 0.6s ease-out 0.4s both; }
        .vinyl-spin { animation: vinylSpin 3s linear infinite; }
        .vinyl-spin-paused { animation-play-state: paused; }
        .pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }
        .heart-pop { animation: heartPop 0.4s ease-out; }
        .eq-bar { animation: equalizerBar 0.8s ease-in-out infinite; }
        .eq-bar-2 { animation-delay: 0.2s; }
        .eq-bar-3 { animation-delay: 0.4s; }
        .eq-bar-4 { animation-delay: 0.1s; }
        .slide-in-right { animation: slideInRight 0.4s ease-out both; }
      `}} />

      <div className="px-5 py-8 space-y-6">
        {/* Album Art */}
        <div className={`flex flex-col items-center space-y-4 ${mounted ? 'music-fade-in' : 'opacity-0'}`}>
          <div className={`relative ${isPlaying ? 'pulse-glow' : ''} rounded-2xl`}>
            <div className="size-56 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500 flex items-center justify-center overflow-hidden relative">
              <GrainGradient
                className="absolute inset-0"
                colors={['#7c3aed', '#a855f7', '#d946ef']}
                colorBack="#1e1b4b"
                softness={0.8}
                intensity={1}
                noise={0.4}
                speed={isPlaying ? 1.2 : 0.3}
                shape="plane"
                minPixelRatio={1}
                maxPixelCount={512 * 512}
              />
              <div className={`size-32 rounded-full border-4 border-white/20 flex items-center justify-center ${isPlaying ? 'vinyl-spin' : 'vinyl-spin vinyl-spin-paused'}`}>
                <div className="size-24 rounded-full bg-black/30 flex items-center justify-center">
                  <div className="size-8 rounded-full bg-white/40 backdrop-blur-sm" />
                </div>
              </div>
            </div>
            {/* Equalizer overlay */}
            {isPlaying && (
              <div className="absolute bottom-3 right-3 flex items-end gap-0.5">
                <div className="w-1 rounded-full bg-white/80 eq-bar" style={{ height: 4 }} />
                <div className="w-1 rounded-full bg-white/80 eq-bar eq-bar-2" style={{ height: 4 }} />
                <div className="w-1 rounded-full bg-white/80 eq-bar eq-bar-3" style={{ height: 4 }} />
                <div className="w-1 rounded-full bg-white/80 eq-bar eq-bar-4" style={{ height: 4 }} />
              </div>
            )}
          </div>
        </div>

        {/* Track Info */}
        <div className={`text-center space-y-1 ${mounted ? 'music-fade-in-1' : 'opacity-0'}`}>
          <h1 className="text-xl font-bold tracking-tight">Midnight City</h1>
          <p className="text-sm text-muted-foreground">M83 — Hurry Up, We're Dreaming</p>
        </div>

        {/* Progress Bar */}
        <div className={`space-y-2 ${mounted ? 'music-fade-in-2' : 'opacity-0'}`}>
          <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full bg-white shadow-md border border-violet-200 transition-all duration-100"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
            <span>{formatTime(progress)}</span>
            <span>4:03</span>
          </div>
        </div>

        {/* Controls */}
        <div className={`flex items-center justify-center gap-6 ${mounted ? 'music-fade-in-3' : 'opacity-0'}`}>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </button>

          <button className="text-foreground hover:scale-110 transition-transform active:scale-95">
            <svg className="size-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629V7.19c0-1.44-1.555-2.343-2.805-1.629L3.99 8.638a1.875 1.875 0 000 3.232l5.205 2.97zM15.75 7.5v9" strokeWidth={1.5} stroke="currentColor" strokeLinecap="round" />
            </svg>
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="size-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <button className="text-foreground hover:scale-110 transition-transform active:scale-95">
            <svg className="size-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.805 18.44c-1.25.714-2.805-.189-2.805-1.629V7.19c0-1.44 1.555-2.343 2.805-1.629l5.205 2.97a1.875 1.875 0 010 3.232l-5.205 2.97zM8.25 7.5v9" strokeWidth={1.5} stroke="currentColor" strokeLinecap="round" />
            </svg>
          </button>

          <button
            onClick={() => setLiked(!liked)}
            className={`transition-colors ${liked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <svg className={`size-5 ${liked ? 'heart-pop' : ''}`} fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className={`${mounted ? 'music-fade-in-4' : 'opacity-0'}`}>
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab('queue')}
              className={`flex-1 pb-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'queue' ? 'border-violet-500 text-foreground' : 'border-transparent text-muted-foreground'
              }`}
            >
              Up Next
            </button>
            <button
              onClick={() => setActiveTab('lyrics')}
              className={`flex-1 pb-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'lyrics' ? 'border-violet-500 text-foreground' : 'border-transparent text-muted-foreground'
              }`}
            >
              Lyrics
            </button>
          </div>

          {activeTab === 'queue' ? (
            <div className="mt-3 space-y-1">
              {queue.map((track, i) => (
                <div
                  key={track.title}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                    track.active ? 'bg-violet-500/10' : 'hover:bg-muted/50'
                  } slide-in-right`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="flex size-8 shrink-0 items-center justify-center">
                    {track.active && isPlaying ? (
                      <div className="flex items-end gap-0.5 h-4">
                        <div className="w-0.5 rounded-full bg-violet-500 eq-bar" style={{ height: 4 }} />
                        <div className="w-0.5 rounded-full bg-violet-500 eq-bar eq-bar-2" style={{ height: 4 }} />
                        <div className="w-0.5 rounded-full bg-violet-500 eq-bar eq-bar-3" style={{ height: 4 }} />
                      </div>
                    ) : (
                      <span className={`text-xs tabular-nums ${track.active ? 'text-violet-500 font-bold' : 'text-muted-foreground'}`}>
                        {i + 1}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${track.active ? 'font-semibold text-violet-500' : ''}`}>
                      {track.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{track.artist}</p>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums">{track.duration}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3 space-y-3 px-2">
              {[
                { line: 'Waiting in a car', highlight: true },
                { line: 'Waiting for a ride in the dark', highlight: false },
                { line: 'The night city grows', highlight: false },
                { line: 'Look and see her eyes, they glow', highlight: false },
              ].map((lyric, i) => (
                <p
                  key={i}
                  className={`text-sm transition-all duration-500 slide-in-right ${
                    lyric.highlight ? 'text-foreground font-semibold scale-105 origin-left' : 'text-muted-foreground'
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {lyric.line}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </View>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { View } from 'react-native';
import dynamic from 'next/dynamic';
import { Play, Shuffle, ListMusic, Clock, TrendingUp } from 'lucide-react';

const GrainGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.GrainGradient),
  { ssr: false },
);

export function PlaylistsBlock() {
  const [mounted, setMounted] = useState(false);
  const [activePlaylist, setActivePlaylist] = useState<number | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const playlists = [
    { name: 'Chill Vibes', count: 24, colors: ['#06b6d4', '#3b82f6', '#1e3a5f'] as [string, string, string] },
    { name: 'Workout Mix', count: 18, colors: ['#f97316', '#ef4444', '#7f1d1d'] as [string, string, string] },
    { name: 'Late Night', count: 32, colors: ['#8b5cf6', '#7c3aed', '#1e1b4b'] as [string, string, string] },
    { name: 'Focus Flow', count: 15, colors: ['#10b981', '#14b8a6', '#064e3b'] as [string, string, string] },
  ];

  const recentlyPlayed = [
    { title: 'Blinding Lights', artist: 'The Weeknd', cover: 'from-red-500 to-pink-600', duration: '3:20', plays: '2.1B' },
    { title: 'Levitating', artist: 'Dua Lipa', cover: 'from-fuchsia-500 to-purple-600', duration: '3:23', plays: '1.8B' },
    { title: 'Heat Waves', artist: 'Glass Animals', cover: 'from-amber-400 to-orange-500', duration: '3:58', plays: '1.5B' },
    { title: 'As It Was', artist: 'Harry Styles', cover: 'from-blue-400 to-indigo-500', duration: '2:47', plays: '2.3B' },
    { title: 'Anti-Hero', artist: 'Taylor Swift', cover: 'from-violet-400 to-purple-500', duration: '3:20', plays: '1.9B' },
  ];

  return (
    <View className="flex-1 bg-background">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes playlistSlide {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes trackFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes coverPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes nowPlaying {
          0%, 100% { height: 3px; }
          50% { height: 12px; }
        }
        .pl-slide { animation: playlistSlide 0.5s ease-out both; }
        .pl-slide-0 { animation-delay: 0.05s; }
        .pl-slide-1 { animation-delay: 0.12s; }
        .pl-slide-2 { animation-delay: 0.19s; }
        .pl-slide-3 { animation-delay: 0.26s; }
        .track-fade { animation: trackFade 0.4s ease-out both; }
        .track-fade-0 { animation-delay: 0.1s; }
        .track-fade-1 { animation-delay: 0.18s; }
        .track-fade-2 { animation-delay: 0.26s; }
        .track-fade-3 { animation-delay: 0.34s; }
        .track-fade-4 { animation-delay: 0.42s; }
        .cover-pulse { animation: coverPulse 2s ease-in-out infinite; }
        .now-bar { animation: nowPlaying 0.6s ease-in-out infinite; }
        .now-bar-2 { animation-delay: 0.15s; }
        .now-bar-3 { animation-delay: 0.3s; }
      `}} />

      <div className="px-5 py-8 space-y-6">
        {/* Header */}
        <div className={`flex items-end justify-between ${mounted ? 'track-fade' : 'opacity-0'}`}>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Your Library</h1>
            <p className="text-sm text-muted-foreground mt-0.5">4 playlists · 89 songs</p>
          </div>
          <div className="flex gap-2">
            <button className="flex size-9 items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors">
              <Shuffle className="size-4 text-muted-foreground" />
            </button>
            <button className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Play className="size-4 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Playlists Grid — each card uses GrainGradient */}
        <div className="grid grid-cols-2 gap-3">
          {playlists.map((pl, i) => (
            <button
              key={pl.name}
              onClick={() => setActivePlaylist(activePlaylist === i ? null : i)}
              className={`relative overflow-hidden rounded-xl text-left transition-all duration-300 ${
                mounted ? `pl-slide pl-slide-${i}` : 'opacity-0'
              } ${activePlaylist === i ? 'scale-[1.03] shadow-lg' : 'hover:scale-[1.02]'}`}
            >
              <div className="relative h-24">
                <GrainGradient
                  className="absolute inset-0"
                  colors={pl.colors}
                  colorBack={pl.colors[2]}
                  softness={0.8}
                  intensity={0.9}
                  noise={0.4}
                  speed={activePlaylist === i ? 0.8 : 0.15}
                  shape="plane"
                  minPixelRatio={1}
                  maxPixelCount={256 * 256}
                />
                <div className="absolute top-3 left-3">
                  <ListMusic className="size-5 text-white/80" />
                </div>
                {activePlaylist === i && (
                  <div className="absolute top-3 right-3 flex items-end gap-0.5">
                    <div className="w-0.5 rounded-full bg-white now-bar" style={{ height: 3 }} />
                    <div className="w-0.5 rounded-full bg-white now-bar now-bar-2" style={{ height: 3 }} />
                    <div className="w-0.5 rounded-full bg-white now-bar now-bar-3" style={{ height: 3 }} />
                  </div>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2.5">
                <p className="text-sm font-semibold text-white truncate">{pl.name}</p>
                <p className="text-[10px] text-white/70">{pl.count} songs</p>
              </div>
            </button>
          ))}
        </div>

        {/* Recently Played */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Recently Played</h2>
          </div>
          <div className="space-y-1">
            {recentlyPlayed.map((track, i) => (
              <button
                key={track.title}
                onClick={() => setPlaying(playing === track.title ? null : track.title)}
                className={`flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-all ${
                  playing === track.title ? 'bg-primary/10' : 'hover:bg-muted/50'
                } ${mounted ? `track-fade track-fade-${i}` : 'opacity-0'}`}
              >
                <div className={`relative size-10 shrink-0 rounded-lg bg-gradient-to-br ${track.cover} flex items-center justify-center ${
                  playing === track.title ? 'cover-pulse' : ''
                }`}>
                  {playing === track.title ? (
                    <div className="flex items-end gap-0.5 h-4">
                      <div className="w-0.5 rounded-full bg-white now-bar" style={{ height: 3 }} />
                      <div className="w-0.5 rounded-full bg-white now-bar now-bar-2" style={{ height: 3 }} />
                      <div className="w-0.5 rounded-full bg-white now-bar now-bar-3" style={{ height: 3 }} />
                    </div>
                  ) : (
                    <Play className="size-4 text-white/80" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${playing === track.title ? 'font-semibold text-primary' : ''}`}>
                    {track.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{track.artist}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground tabular-nums">{track.duration}</p>
                  <div className="flex items-center gap-0.5 justify-end">
                    <TrendingUp className="size-2.5 text-muted-foreground/60" />
                    <p className="text-[10px] text-muted-foreground/60">{track.plays}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </View>
  );
}

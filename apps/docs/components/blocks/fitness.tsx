'use client';

import { useState, useEffect } from 'react';
import { View } from 'react-native';
import dynamic from 'next/dynamic';
import { IconFlame, IconActivity, IconDroplet, IconRun, IconHeartbeat, IconBarbell } from '@tabler/icons-react';

const GrainGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.GrainGradient),
  { ssr: false },
);

function AnimatedRing({ progress, color, size, delay }: { progress: number; color: string; size: number; delay: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (mounted ? progress / 100 : 0) * circumference;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-muted/50" />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: `stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s` }}
      />
    </svg>
  );
}

export function FitnessBlock() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { label: 'Calories', value: '487', unit: 'kcal', icon: IconFlame, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Steps', value: '8,432', unit: 'steps', icon: IconRun, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Water', value: '6', unit: 'glasses', icon: IconDroplet, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Heart', value: '72', unit: 'bpm', icon: IconHeartbeat, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  ];

  const workouts = [
    { name: 'Morning Run', duration: '32 min', cal: '320 kcal', icon: IconRun, color: 'from-emerald-500 to-green-400', time: '7:30 AM' },
    { name: 'HIIT Session', duration: '25 min', cal: '280 kcal', icon: IconActivity, color: 'from-orange-500 to-amber-400', time: '12:00 PM' },
    { name: 'Weight Training', duration: '45 min', cal: '195 kcal', icon: IconBarbell, color: 'from-violet-500 to-purple-400', time: '5:30 PM' },
  ];

  const weeklyData = [
    { day: 'Mon', pct: 90 },
    { day: 'Tue', pct: 75 },
    { day: 'Wed', pct: 100 },
    { day: 'Thu', pct: 60 },
    { day: 'Fri', pct: 85 },
    { day: 'Sat', pct: 45 },
    { day: 'Sun', pct: 30 },
  ];

  return (
    <View className="flex-1 bg-background">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fitSlide {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes barGrow {
          from { height: 0; }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringPop {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        .fit-slide { animation: fitSlide 0.5s ease-out both; }
        .fit-slide-0 { animation-delay: 0.05s; }
        .fit-slide-1 { animation-delay: 0.15s; }
        .fit-slide-2 { animation-delay: 0.25s; }
        .fit-slide-3 { animation-delay: 0.35s; }
        .fit-slide-4 { animation-delay: 0.45s; }
        .bar-grow { animation: barGrow 0.8s ease-out both; }
        .count-up { animation: countUp 0.4s ease-out both; }
        .ring-pop { animation: ringPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .ring-pop-1 { animation-delay: 0.1s; }
        .ring-pop-2 { animation-delay: 0.2s; }
      `}} />

      <div className="px-5 py-8 space-y-6">
        {/* Header */}
        <div className={`${mounted ? 'fit-slide' : 'opacity-0'}`}>
          <h1 className="text-2xl font-bold tracking-tight">Activity</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Wednesday, Feb 12</p>
        </div>

        {/* Activity Rings with Shader Background */}
        <div className={`relative rounded-2xl overflow-hidden p-6 ${mounted ? 'fit-slide fit-slide-0' : 'opacity-0'}`}>
          <GrainGradient
            className="absolute inset-0"
            colors={['#1e1b4b', '#312e81', '#0f172a']}
            colorBack="#030712"
            softness={0.8}
            intensity={0.9}
            noise={0.5}
            speed={0.3}
            shape="plane"
            minPixelRatio={1}
            maxPixelCount={512 * 512}
          />
          <div className="relative flex items-center gap-6">
            {/* Rings */}
            <div className="relative">
              <div className="ring-pop">
                <AnimatedRing progress={81} color="#ef4444" size={100} delay={0.2} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center ring-pop ring-pop-1">
                <AnimatedRing progress={65} color="#22c55e" size={76} delay={0.4} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center ring-pop ring-pop-2">
                <AnimatedRing progress={90} color="#3b82f6" size={52} delay={0.6} />
              </div>
            </div>
            {/* Ring Labels */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-red-500" />
                <span className="text-xs text-white/80">Move</span>
                <span className="text-xs font-bold text-white ml-auto">487/600 kcal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-white/80">Exercise</span>
                <span className="text-xs font-bold text-white ml-auto">20/30 min</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-blue-500" />
                <span className="text-xs text-white/80">Stand</span>
                <span className="text-xs font-bold text-white ml-auto">9/10 hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`rounded-xl border border-border bg-card p-3 ${mounted ? `fit-slide fit-slide-${i + 1}` : 'opacity-0'}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`flex size-7 items-center justify-center rounded-lg ${stat.bg}`}>
                    <Icon className={`size-4 ${stat.color}`} stroke={1.5} />
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <div className={`count-up`} style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                  <span className="text-lg font-bold tabular-nums">{stat.value}</span>
                  <span className="text-xs text-muted-foreground ml-1">{stat.unit}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Weekly Activity */}
        <div className={`rounded-xl border border-border bg-card p-4 ${mounted ? 'fit-slide fit-slide-4' : 'opacity-0'}`}>
          <h3 className="text-sm font-semibold mb-4">This Week</h3>
          <div className="flex items-end justify-between gap-2 h-24">
            {weeklyData.map((day, i) => (
              <div key={day.day} className="flex flex-col items-center gap-1.5 flex-1">
                <div className="w-full flex flex-col items-center justify-end h-16">
                  <div
                    className={`w-full max-w-[20px] rounded-t-md transition-all bar-grow ${
                      day.pct === 100 ? 'bg-emerald-500' : 'bg-primary/60'
                    }`}
                    style={{ height: `${day.pct * 0.64}px`, animationDelay: `${0.5 + i * 0.08}s` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workouts */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Today's Workouts</h3>
          <div className="space-y-2">
            {workouts.map((workout, i) => {
              const Icon = workout.icon;
              return (
                <div
                  key={workout.name}
                  className={`flex items-center gap-3 rounded-xl border border-border bg-card p-3 ${
                    mounted ? `fit-slide` : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                >
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${workout.color}`}>
                    <Icon className="size-5 text-white" stroke={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{workout.name}</p>
                    <p className="text-xs text-muted-foreground">{workout.duration} · {workout.cal}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{workout.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </View>
  );
}

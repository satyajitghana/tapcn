'use client';

import { useState, useEffect } from 'react';
import { View } from 'react-native';
import dynamic from 'next/dynamic';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Sun01Icon,
  CloudIcon,
  RainIcon,
  FastWindIcon,
  TemperatureIcon,
  Moon01Icon,
  SunriseIcon,
  SunsetIcon,
  DropletIcon,
} from '@hugeicons/core-free-icons';

const GrainGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.GrainGradient),
  { ssr: false },
);

export function WeatherBlock() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hourly = [
    { time: 'Now', temp: 72, icon: Sun01Icon },
    { time: '1PM', temp: 74, icon: Sun01Icon },
    { time: '2PM', temp: 73, icon: CloudIcon },
    { time: '3PM', temp: 70, icon: CloudIcon },
    { time: '4PM', temp: 68, icon: RainIcon },
    { time: '5PM', temp: 65, icon: RainIcon },
    { time: '6PM', temp: 63, icon: Moon01Icon },
  ];

  const weekly = [
    { day: 'Today', high: 74, low: 58, icon: Sun01Icon, condition: 'Sunny' },
    { day: 'Tue', high: 71, low: 55, icon: CloudIcon, condition: 'Cloudy' },
    { day: 'Wed', high: 68, low: 52, icon: RainIcon, condition: 'Rain' },
    { day: 'Thu', high: 65, low: 50, icon: RainIcon, condition: 'Showers' },
    { day: 'Fri', high: 72, low: 56, icon: Sun01Icon, condition: 'Sunny' },
  ];

  const conditions = [
    { label: 'Humidity', value: '45%', icon: DropletIcon },
    { label: 'Wind', value: '12 mph', icon: FastWindIcon },
    { label: 'UV Index', value: '6 High', icon: Sun01Icon },
    { label: 'Feels Like', value: '70°', icon: TemperatureIcon },
  ];

  return (
    <View className="flex-1 bg-background">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes weatherFade {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tempReveal {
          from { opacity: 0; transform: scale(0.8); filter: blur(8px); }
          to { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        @keyframes sunFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(10deg); }
        }
        @keyframes slideInX {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes conditionPop {
          0% { opacity: 0; transform: scale(0.8); }
          70% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .wx-fade { animation: weatherFade 0.5s ease-out both; }
        .wx-fade-0 { animation-delay: 0.1s; }
        .wx-fade-1 { animation-delay: 0.2s; }
        .wx-fade-2 { animation-delay: 0.3s; }
        .wx-fade-3 { animation-delay: 0.4s; }
        .temp-reveal { animation: tempReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both; }
        .sun-float { animation: sunFloat 3s ease-in-out infinite; }
        .slide-x { animation: slideInX 0.4s ease-out both; }
        .cond-pop { animation: conditionPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .cond-pop-0 { animation-delay: 0.15s; }
        .cond-pop-1 { animation-delay: 0.22s; }
        .cond-pop-2 { animation-delay: 0.29s; }
        .cond-pop-3 { animation-delay: 0.36s; }
      `}} />

      <div className="space-y-0">
        {/* Hero Temperature with Shader Sky */}
        <div className={`relative overflow-hidden pb-6 pt-8 ${mounted ? 'wx-fade' : 'opacity-0'}`}>
          <GrainGradient
            className="absolute inset-0"
            colors={['#38bdf8', '#0ea5e9', '#0284c7']}
            colorBack="#075985"
            softness={1}
            intensity={0.8}
            noise={0.3}
            speed={0.4}
            shape="plane"
            minPixelRatio={1}
            maxPixelCount={512 * 512}
          />
          <div className="relative flex flex-col items-center text-center px-5">
            <div className="flex items-center gap-1.5 mb-1">
              <HugeiconsIcon icon={Sun01Icon} size={14} className="text-white/70" />
              <span className="text-xs text-white/70 font-medium">San Francisco, CA</span>
            </div>
            <div className="flex items-start">
              <span className="text-7xl font-thin text-white temp-reveal tabular-nums">72</span>
              <span className="text-2xl text-white/60 mt-3">°F</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="sun-float">
                <HugeiconsIcon icon={Sun01Icon} size={22} className="text-amber-300" />
              </div>
              <span className="text-sm text-white/80 font-medium">Mostly Sunny</span>
            </div>
            <div className="flex gap-3 mt-2 text-xs text-white/60">
              <span>H: 74°</span>
              <span>L: 58°</span>
            </div>
          </div>
        </div>

        <div className="px-5 py-5 space-y-5">
          {/* Conditions Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {conditions.map((cond, i) => (
              <div
                key={cond.label}
                className={`rounded-xl border border-border bg-card p-3 ${mounted ? `cond-pop cond-pop-${i}` : 'opacity-0'}`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <HugeiconsIcon icon={cond.icon} size={14} className="text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{cond.label}</span>
                </div>
                <span className="text-sm font-bold">{cond.value}</span>
              </div>
            ))}
          </div>

          {/* Hourly Forecast */}
          <div className={`rounded-xl border border-border bg-card p-4 ${mounted ? 'wx-fade wx-fade-1' : 'opacity-0'}`}>
            <h3 className="text-sm font-semibold mb-3">Hourly Forecast</h3>
            <div className="flex gap-4 overflow-x-auto pb-1">
              {hourly.map((h, i) => (
                <div
                  key={h.time}
                  className={`flex flex-col items-center gap-2 shrink-0 slide-x`}
                  style={{ animationDelay: `${0.2 + i * 0.06}s` }}
                >
                  <span className={`text-xs ${h.time === 'Now' ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                    {h.time}
                  </span>
                  <HugeiconsIcon icon={h.icon} size={20} className={h.time === 'Now' ? 'text-amber-500 sun-float' : 'text-muted-foreground'} />
                  <span className="text-sm font-medium tabular-nums">{h.temp}°</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Forecast */}
          <div className={`rounded-xl border border-border bg-card overflow-hidden ${mounted ? 'wx-fade wx-fade-2' : 'opacity-0'}`}>
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold">5-Day Forecast</h3>
            </div>
            <div className="divide-y divide-border">
              {weekly.map((day, i) => (
                <div
                  key={day.day}
                  className={`flex items-center gap-3 px-4 py-2.5 ${mounted ? 'wx-fade' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.35 + i * 0.07}s` }}
                >
                  <span className={`w-10 text-sm ${day.day === 'Today' ? 'font-semibold' : 'text-muted-foreground'}`}>
                    {day.day}
                  </span>
                  <HugeiconsIcon icon={day.icon} size={18} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground flex-1">{day.condition}</span>
                  <div className="flex gap-2 tabular-nums">
                    <span className="text-sm font-medium w-7 text-right">{day.high}°</span>
                    {/* Mini bar */}
                    <div className="flex items-center w-16">
                      <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-amber-400"
                          style={{
                            marginLeft: `${((day.low - 48) / 30) * 100}%`,
                            width: `${((day.high - day.low) / 30) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground w-7 text-right">{day.low}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sunrise / Sunset */}
          <div className={`flex gap-3 ${mounted ? 'wx-fade wx-fade-3' : 'opacity-0'}`}>
            <div className="flex-1 rounded-xl border border-border bg-card p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <HugeiconsIcon icon={SunriseIcon} size={14} className="text-amber-500" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Sunrise</span>
              </div>
              <span className="text-sm font-bold">6:52 AM</span>
            </div>
            <div className="flex-1 rounded-xl border border-border bg-card p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <HugeiconsIcon icon={SunsetIcon} size={14} className="text-orange-500" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Sunset</span>
              </div>
              <span className="text-sm font-bold">5:48 PM</span>
            </div>
          </div>
        </div>
      </div>
    </View>
  );
}

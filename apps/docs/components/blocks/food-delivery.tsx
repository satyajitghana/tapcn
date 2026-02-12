'use client';

import { useState, useEffect } from 'react';
import { View } from 'react-native';
import dynamic from 'next/dynamic';
import { MapPin, Timer, Phone, Star, Bicycle, Package, ChatCircle } from '@phosphor-icons/react';

const Dithering = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.Dithering),
  { ssr: false },
);

export function FoodDeliveryBlock() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentStep((s) => (s >= 3 ? 0 : s + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: 'Confirmed', icon: Package },
    { label: 'Preparing', icon: Timer },
    { label: 'On the way', icon: Bicycle },
    { label: 'Delivered', icon: MapPin },
  ];

  const orderItems = [
    { name: 'Margherita Pizza', qty: 1, price: '$14.99' },
    { name: 'Caesar Salad', qty: 1, price: '$8.99' },
    { name: 'Garlic Bread', qty: 2, price: '$5.98' },
  ];

  return (
    <View className="flex-1 bg-background">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes deliverySlide {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes driverPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          50% { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
        }
        @keyframes routeDot {
          0% { opacity: 0; transform: translateX(-4px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(4px); }
        }
        @keyframes stepPop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes etaBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .del-slide { animation: deliverySlide 0.5s ease-out both; }
        .del-slide-0 { animation-delay: 0.05s; }
        .del-slide-1 { animation-delay: 0.15s; }
        .del-slide-2 { animation-delay: 0.25s; }
        .del-slide-3 { animation-delay: 0.35s; }
        .driver-pulse { animation: driverPulse 2s ease-in-out infinite; }
        .route-dot { animation: routeDot 1.5s ease-in-out infinite; }
        .route-dot-2 { animation-delay: 0.3s; }
        .route-dot-3 { animation-delay: 0.6s; }
        .step-pop { animation: stepPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .eta-blink { animation: etaBlink 2s ease-in-out infinite; }
      `}} />

      <div className="space-y-0">
        {/* Map Area with Shader */}
        <div className={`relative h-44 overflow-hidden ${mounted ? 'del-slide' : 'opacity-0'}`}>
          <Dithering
            colorBack="#e0f2fe"
            colorFront="#3b82f6"
            shape="warp"
            type="4x4"
            speed={0.4}
            className="absolute inset-0"
            minPixelRatio={1}
          />
          {/* Route dots */}
          <div className="absolute top-1/2 left-1/4 right-1/4 flex items-center justify-between">
            <div className="size-3 rounded-full bg-emerald-500 shadow-md" />
            <div className="flex gap-2">
              <div className="size-1.5 rounded-full bg-blue-500 route-dot" />
              <div className="size-1.5 rounded-full bg-blue-500 route-dot route-dot-2" />
              <div className="size-1.5 rounded-full bg-blue-500 route-dot route-dot-3" />
            </div>
            <div className="driver-pulse size-3 rounded-full bg-blue-500 shadow-md" />
            <div className="flex gap-2">
              <div className="size-1.5 rounded-full bg-blue-400/50" />
              <div className="size-1.5 rounded-full bg-blue-400/30" />
            </div>
            <div className="size-3 rounded-full bg-red-500 shadow-md" />
          </div>
          {/* ETA Badge */}
          <div className="absolute top-3 right-3 rounded-lg bg-white/90 dark:bg-black/70 backdrop-blur-sm px-3 py-1.5 shadow-sm">
            <div className="flex items-center gap-1.5">
              <Timer size={14} weight="bold" className="text-blue-500 eta-blink" />
              <span className="text-xs font-bold">15 min</span>
            </div>
          </div>
        </div>

        <div className="px-5 py-5 space-y-5">
          {/* Driver Card */}
          <div className={`flex items-center gap-3 rounded-xl border border-border bg-card p-3 ${mounted ? 'del-slide del-slide-0' : 'opacity-0'}`}>
            <div className="size-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-sm font-bold text-white">
              MR
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold">Marco R.</span>
                <div className="flex items-center gap-0.5">
                  <Star size={12} weight="fill" className="text-amber-400" />
                  <span className="text-xs text-muted-foreground">4.9</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <Bicycle size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">On the way to you</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex size-9 items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors">
                <ChatCircle size={16} className="text-muted-foreground" />
              </button>
              <button className="flex size-9 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                <Phone size={16} weight="fill" />
              </button>
            </div>
          </div>

          {/* Order Status Stepper */}
          <div className={`rounded-xl border border-border bg-card p-4 ${mounted ? 'del-slide del-slide-1' : 'opacity-0'}`}>
            <h3 className="text-sm font-semibold mb-4">Order Status</h3>
            <div className="flex items-center justify-between">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isComplete = i <= currentStep;
                const isActive = i === currentStep;
                return (
                  <div key={step.label} className="flex flex-col items-center gap-1.5 flex-1">
                    <div className="relative">
                      <div
                        className={`flex size-9 items-center justify-center rounded-full transition-all duration-500 ${
                          isActive ? 'bg-blue-500 text-white scale-110 shadow-md step-pop' :
                          isComplete ? 'bg-emerald-500 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Icon size={16} weight={isComplete ? 'fill' : 'regular'} />
                      </div>
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
                      )}
                    </div>
                    <span className={`text-[9px] font-medium text-center leading-tight ${
                      isActive ? 'text-blue-500' : isComplete ? 'text-emerald-600' : 'text-muted-foreground'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-1 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-1000 ease-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className={`rounded-xl border border-border bg-card overflow-hidden ${mounted ? 'del-slide del-slide-2' : 'opacity-0'}`}>
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <Package size={14} className="text-muted-foreground" />
              <h3 className="text-sm font-semibold">Order Summary</h3>
            </div>
            <div className="divide-y divide-border">
              {orderItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex size-5 items-center justify-center rounded bg-muted text-[10px] font-bold">{item.qty}</span>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium tabular-nums">{item.price}</span>
                </div>
              ))}
              <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-sm font-bold">$29.96</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </View>
  );
}

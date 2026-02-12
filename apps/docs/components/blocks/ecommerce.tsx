'use client';

import { useState, useEffect } from 'react';
import { View } from 'react-native';
import dynamic from 'next/dynamic';

const GrainGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.GrainGradient),
  { ssr: false },
);

export function EcommerceBlock() {
  const [mounted, setMounted] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [liked, setLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colors = [
    { name: 'Midnight', bg: 'bg-slate-900', ring: 'ring-slate-900' },
    { name: 'Ocean', bg: 'bg-blue-600', ring: 'ring-blue-600' },
    { name: 'Forest', bg: 'bg-emerald-700', ring: 'ring-emerald-700' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const reviews = [
    { name: 'Alex M.', rating: 5, text: 'Perfect fit and amazing quality.', time: '2d ago' },
    { name: 'Jamie L.', rating: 4, text: 'Great fabric, runs slightly large.', time: '1w ago' },
  ];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <View className="flex-1 bg-background">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes cartBounce {
          0% { transform: scale(1); }
          25% { transform: scale(0.9); }
          50% { transform: scale(1.1); }
          75% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        @keyframes starPop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes colorRipple {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes priceReveal {
          from { opacity: 0; transform: translateX(-10px); filter: blur(4px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        .ecom-fade-in { animation: fadeScaleIn 0.5s ease-out both; }
        .ecom-slide-0 { animation: slideUp 0.5s ease-out 0.1s both; }
        .ecom-slide-1 { animation: slideUp 0.5s ease-out 0.2s both; }
        .ecom-slide-2 { animation: slideUp 0.5s ease-out 0.3s both; }
        .ecom-slide-3 { animation: slideUp 0.5s ease-out 0.4s both; }
        .ecom-slide-4 { animation: slideUp 0.5s ease-out 0.5s both; }
        .cart-bounce { animation: cartBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .star-pop { animation: starPop 0.3s ease-out both; }
        .star-pop-1 { animation-delay: 0.05s; }
        .star-pop-2 { animation-delay: 0.1s; }
        .star-pop-3 { animation-delay: 0.15s; }
        .star-pop-4 { animation-delay: 0.2s; }
        .color-ripple { animation: colorRipple 0.3s ease-out; }
        .price-reveal { animation: priceReveal 0.6s ease-out 0.3s both; }
        .shimmer-bg {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite;
        }
      `}} />

      <div className="space-y-5">
        {/* Product Image Gallery */}
        <div className={`relative ${mounted ? 'ecom-fade-in' : 'opacity-0'}`}>
          <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center overflow-hidden relative">
            <GrainGradient
              className="absolute inset-0"
              colors={['#e2e8f0', '#cbd5e1', '#94a3b8']}
              colorBack="#f1f5f9"
              softness={1}
              intensity={0.6}
              noise={0.3}
              speed={0.2}
              shape="corners"
              minPixelRatio={1}
              maxPixelCount={512 * 512}
            />
            <div className="relative size-40">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    activeImage === i ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}
                >
                  <div className={`size-36 rounded-2xl ${colors[i]!.bg} shadow-2xl flex items-center justify-center`}>
                    <svg className="size-16 text-white/30" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            {/* Image dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`rounded-full transition-all duration-300 ${
                    activeImage === i ? 'w-6 h-2 bg-foreground' : 'size-2 bg-foreground/30'
                  }`}
                />
              ))}
            </div>
            {/* Wishlist */}
            <button
              onClick={() => setLiked(!liked)}
              className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-sm shadow-sm hover:scale-110 active:scale-90 transition-transform"
            >
              <svg
                className={`size-5 transition-colors ${liked ? 'text-red-500' : 'text-foreground/60'}`}
                fill={liked ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-5 space-y-5 pb-8">
          {/* Title + Price */}
          <div className={`space-y-2 ${mounted ? 'ecom-slide-0' : 'opacity-0'}`}>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h1 className="text-xl font-bold tracking-tight">Premium Minimal Tee</h1>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`size-3.5 ${i < 4 ? 'text-amber-400' : 'text-muted-foreground/30'} star-pop star-pop-${i}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">4.0 (128 reviews)</span>
                </div>
              </div>
              <div className={`text-right ${mounted ? 'price-reveal' : 'opacity-0'}`}>
                <div className="text-xl font-bold">$49</div>
                <div className="text-xs text-muted-foreground line-through">$69</div>
              </div>
            </div>
          </div>

          {/* Color Selector */}
          <div className={`space-y-2.5 ${mounted ? 'ecom-slide-1' : 'opacity-0'}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Color</span>
              <span className="text-xs text-muted-foreground">{colors[selectedColor]!.name}</span>
            </div>
            <div className="flex gap-2.5">
              {colors.map((color, i) => (
                <button
                  key={color.name}
                  onClick={() => { setSelectedColor(i); setActiveImage(i); }}
                  className={`size-8 rounded-full ${color.bg} transition-all duration-200 hover:scale-110 active:scale-95 ${
                    selectedColor === i ? `ring-2 ring-offset-2 ring-offset-background ${color.ring} color-ripple` : ''
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className={`space-y-2.5 ${mounted ? 'ecom-slide-2' : 'opacity-0'}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Size</span>
              <button className="text-xs text-primary underline underline-offset-2">Size Guide</button>
            </div>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-10 flex-1 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedSize === size
                      ? 'bg-foreground text-background scale-105 shadow-md'
                      : 'border border-border hover:border-foreground/30'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className={`flex gap-3 ${mounted ? 'ecom-slide-3' : 'opacity-0'}`}>
            <div className="flex items-center rounded-lg border border-border">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="flex size-10 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                </svg>
              </button>
              <span className="w-8 text-center text-sm font-medium tabular-nums">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="flex size-10 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                addedToCart
                  ? 'bg-emerald-500 text-white cart-bounce'
                  : 'bg-foreground text-background hover:opacity-90 active:scale-[0.98]'
              }`}
            >
              {addedToCart ? (
                <>
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Added!
                </>
              ) : (
                <>
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  Add to Cart — ${49 * qty}
                </>
              )}
            </button>
          </div>

          {/* Reviews */}
          <div className={`space-y-3 ${mounted ? 'ecom-slide-4' : 'opacity-0'}`}>
            <h3 className="text-sm font-semibold">Recent Reviews</h3>
            <div className="space-y-3">
              {reviews.map((review, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full bg-gradient-to-br from-primary/60 to-primary flex items-center justify-center text-[10px] font-bold text-white">
                        {review.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium">{review.name}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{review.time}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className={`size-3 ${j < review.rating ? 'text-amber-400' : 'text-muted-foreground/20'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </View>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { View } from 'react-native';
import dynamic from 'next/dynamic';

const Dithering = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.Dithering),
  { ssr: false },
);

export function SocialFeedBlock() {
  const [mounted, setMounted] = useState(false);
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({
    0: 142, 1: 89, 2: 256,
  });
  const [activeStory, setActiveStory] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stories = [
    { name: 'You', gradient: 'from-blue-500 to-cyan-400', hasNew: false, isOwn: true },
    { name: 'Sarah', gradient: 'from-pink-500 to-rose-500', hasNew: true, isOwn: false },
    { name: 'Alex', gradient: 'from-violet-500 to-purple-500', hasNew: true, isOwn: false },
    { name: 'Mike', gradient: 'from-amber-500 to-orange-500', hasNew: true, isOwn: false },
    { name: 'Emma', gradient: 'from-emerald-500 to-green-500', hasNew: false, isOwn: false },
  ];

  const posts = [
    {
      id: 0,
      author: 'Sarah Kim',
      handle: '@sarahkim',
      gradient: 'from-pink-500 to-rose-500',
      time: '2h',
      text: 'Just shipped our new landing page built entirely with tapcn components. The cross-platform DX is unreal.',
      hasImage: true,
      imageGradient: 'from-violet-400 via-fuchsia-300 to-pink-400',
      comments: 24,
      shares: 8,
    },
    {
      id: 1,
      author: 'Alex Rivera',
      handle: '@alexr',
      gradient: 'from-violet-500 to-purple-500',
      time: '5h',
      text: 'Hot take: NativeWind + tapcn is the best way to build universal apps in 2025. Change my mind.',
      hasImage: false,
      imageGradient: '',
      comments: 67,
      shares: 23,
    },
    {
      id: 2,
      author: 'Mike Chen',
      handle: '@mikechen',
      gradient: 'from-amber-500 to-orange-500',
      time: '8h',
      text: 'Built this music player UI in 30 minutes with tapcn blocks. The animations are chef\'s kiss.',
      hasImage: true,
      imageGradient: 'from-slate-700 via-blue-900 to-slate-800',
      comments: 31,
      shares: 15,
    },
  ];

  const toggleLike = (id: number) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
    setLikeCounts((prev) => ({
      ...prev,
      [id]: likes[id] ? (prev[id] ?? 0) - 1 : (prev[id] ?? 0) + 1,
    }));
  };

  return (
    <View className="flex-1 bg-background">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes storyPop {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes feedSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heartBurst {
          0% { transform: scale(1); }
          15% { transform: scale(1.3); }
          30% { transform: scale(0.85); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes storyRing {
          0% { stroke-dashoffset: 283; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes shimmerSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes doubleTapHeart {
          0% { opacity: 0; transform: scale(0) rotate(-15deg); }
          30% { opacity: 1; transform: scale(1.3) rotate(5deg); }
          60% { transform: scale(0.9) rotate(-3deg); }
          100% { opacity: 0; transform: scale(1) rotate(0deg); }
        }
        .story-pop { animation: storyPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .story-pop-0 { animation-delay: 0.05s; }
        .story-pop-1 { animation-delay: 0.1s; }
        .story-pop-2 { animation-delay: 0.15s; }
        .story-pop-3 { animation-delay: 0.2s; }
        .story-pop-4 { animation-delay: 0.25s; }
        .feed-slide-0 { animation: feedSlideUp 0.5s ease-out 0.15s both; }
        .feed-slide-1 { animation: feedSlideUp 0.5s ease-out 0.3s both; }
        .feed-slide-2 { animation: feedSlideUp 0.5s ease-out 0.45s both; }
        .heart-burst { animation: heartBurst 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .shimmer-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: shimmerSlide 2s ease-in-out infinite;
        }
        .story-ring-animate circle {
          animation: storyRing 0.8s ease-out forwards;
          stroke-dasharray: 283;
          stroke-dashoffset: 283;
        }
      `}} />

      <div className="space-y-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h1 className="text-lg font-bold tracking-tight">Feed</h1>
          <div className="flex items-center gap-2">
            <button className="flex size-8 items-center justify-center rounded-full hover:bg-muted transition-colors">
              <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
            <button className="flex size-8 items-center justify-center rounded-full hover:bg-muted transition-colors">
              <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stories */}
        <div className="relative border-b border-border px-1 py-3 overflow-hidden">
          <Dithering
            colorBack="#00000000"
            colorFront="#818cf8"
            shape="sphere"
            type="4x4"
            scale={0.5}
            size={3}
            speed={0.3}
            className="absolute inset-0 opacity-15 dark:opacity-20"
            minPixelRatio={1}
          />
          <div className="flex gap-3 overflow-x-auto px-3 pb-1">
            {stories.map((story, i) => (
              <button
                key={story.name}
                onClick={() => setActiveStory(activeStory === i ? null : i)}
                className={`flex flex-col items-center gap-1.5 story-pop story-pop-${i}`}
              >
                <div className="relative">
                  <div className={`size-14 rounded-full p-[2.5px] ${
                    story.hasNew
                      ? `bg-gradient-to-br ${story.gradient}`
                      : story.isOwn ? 'bg-muted' : 'bg-border'
                  } ${activeStory === i ? 'scale-110' : ''} transition-transform`}>
                    <div className="size-full rounded-full bg-background p-[2px]">
                      <div className={`size-full rounded-full bg-gradient-to-br ${story.gradient} flex items-center justify-center text-xs font-bold text-white`}>
                        {story.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  {story.isOwn && (
                    <div className="absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-blue-500 border-2 border-background">
                      <svg className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground w-14 truncate text-center">{story.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="divide-y divide-border">
          {posts.map((post, i) => (
            <div
              key={post.id}
              className={`${mounted ? `feed-slide-${i}` : 'opacity-0'}`}
            >
              {/* Post header */}
              <div className="flex items-center gap-3 px-4 py-3">
                <div className={`size-9 rounded-full bg-gradient-to-br ${post.gradient} flex items-center justify-center text-xs font-bold text-white`}>
                  {post.author.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold truncate">{post.author}</span>
                    <svg className="size-3.5 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.handle} · {post.time}</p>
                </div>
                <button className="text-muted-foreground">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </button>
              </div>

              {/* Post text */}
              <div className="px-4 pb-3">
                <p className="text-sm leading-relaxed">{post.text}</p>
              </div>

              {/* Post image */}
              {post.hasImage && (
                <div className="relative mx-4 mb-3 aspect-video rounded-xl overflow-hidden">
                  <div className={`size-full bg-gradient-to-br ${post.imageGradient}`}>
                    <div className="shimmer-overlay" />
                  </div>
                </div>
              )}

              {/* Post actions */}
              <div className="flex items-center gap-6 px-4 pb-3">
                <button
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center gap-1.5 group"
                >
                  <svg
                    className={`size-5 transition-colors ${likes[post.id] ? 'text-red-500 heart-burst' : 'text-muted-foreground group-hover:text-red-400'}`}
                    fill={likes[post.id] ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  <span className={`text-xs tabular-nums ${likes[post.id] ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}>
                    {likeCounts[post.id]}
                  </span>
                </button>

                <button className="flex items-center gap-1.5 text-muted-foreground hover:text-blue-500 transition-colors group">
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                  </svg>
                  <span className="text-xs tabular-nums">{post.comments}</span>
                </button>

                <button className="flex items-center gap-1.5 text-muted-foreground hover:text-emerald-500 transition-colors group">
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                  <span className="text-xs tabular-nums">{post.shares}</span>
                </button>

                <button className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </View>
  );
}

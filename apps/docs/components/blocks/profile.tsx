'use client';

import { View } from 'react-native';

export function ProfileBlock() {
  return (
    <View className="flex-1 bg-background">
      <div className="px-6 py-8 space-y-6">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative">
            <div className="size-20 rounded-full bg-gradient-to-br from-primary/80 to-violet-600 flex items-center justify-center text-2xl font-bold text-white">
              JD
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 size-6 rounded-full bg-emerald-500 border-[3px] border-background" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">John Doe</h2>
            <p className="text-sm text-muted-foreground">@johndoe</p>
          </div>
          <div className="flex gap-2">
            <button className="h-8 rounded-lg bg-primary px-4 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Follow
            </button>
            <button className="h-8 rounded-lg border border-border px-4 text-xs font-medium hover:bg-accent transition-colors">
              Message
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: '127', label: 'Posts' },
            { value: '2.4k', label: 'Followers' },
            { value: '893', label: 'Following' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-3 text-center">
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* About */}
        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
          <h3 className="text-sm font-semibold">About</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Product designer and developer. Building beautiful cross-platform apps with React Native.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['Design', 'Development', 'React Native', 'UI/UX'].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold">Recent Activity</h3>
          </div>
          <div className="divide-y divide-border">
            {[
              { icon: '\u2764\uFE0F', action: 'Liked', content: 'Building mobile apps', time: '2h ago' },
              { icon: '\uD83D\uDCAC', action: 'Commented on', content: 'React Native tips', time: '5h ago' },
              { icon: '\uD83D\uDCDD', action: 'Posted', content: 'New project showcase', time: '1d ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <span className="text-base">{activity.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">
                    <span className="font-medium">{activity.action}</span>{' '}
                    <span className="text-muted-foreground">{activity.content}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </View>
  );
}

'use client';

import { View } from 'react-native';

export function DashboardBlock() {
  const stats = [
    { label: 'Revenue', value: '$45,231', change: '+20.1%', positive: true, icon: '💰' },
    { label: 'Users', value: '2,345', change: '+15.3%', positive: true, icon: '👥' },
    { label: 'Conversions', value: '183', change: '-4.2%', positive: false, icon: '📊' },
    { label: 'Avg. Session', value: '12m 34s', change: '+8.7%', positive: true, icon: '⏱' },
  ];

  const recentActivity = [
    { user: 'Alice Johnson', action: 'made a purchase', time: '2m ago', amount: '$129', color: 'bg-emerald-500' },
    { user: 'Bob Smith', action: 'signed up', time: '15m ago', amount: null, color: 'bg-blue-500' },
    { user: 'Carol Davis', action: 'made a purchase', time: '1h ago', amount: '$89', color: 'bg-emerald-500' },
    { user: 'David Wilson', action: 'upgraded plan', time: '2h ago', amount: '$299', color: 'bg-violet-500' },
  ];

  const topProducts = [
    { name: 'Pro Plan', sales: 234, revenue: '$23,400', pct: 100 },
    { name: 'Premium', sales: 189, revenue: '$31,200', pct: 81 },
    { name: 'Basic', sales: 156, revenue: '$9,450', pct: 67 },
  ];

  return (
    <View className="flex-1 bg-background">
      <div className="px-5 py-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your business at a glance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
                <span className="text-base">{stat.icon}</span>
              </div>
              <div className="text-xl font-bold tracking-tight">{stat.value}</div>
              <div className="mt-1 flex items-center gap-1">
                <span className={`text-xs font-medium ${stat.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-sm font-semibold">Recent Activity</h2>
          </div>
          <div className="divide-y divide-border">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${activity.color} text-white text-xs font-bold`}>
                  {activity.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">
                    <span className="font-medium">{activity.user}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.action} &middot; {activity.time}</div>
                </div>
                {activity.amount && (
                  <div className="text-sm font-semibold tabular-nums">{activity.amount}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-sm font-semibold">Top Products</h2>
          </div>
          <div className="p-4 space-y-4">
            {topProducts.map((product) => (
              <div key={product.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{product.name}</span>
                  <span className="text-sm tabular-nums text-muted-foreground">{product.revenue}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${product.pct}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">{product.sales} sales</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </View>
  );
}

'use client';

import { View } from 'react-native';

function Card({ children, className }: any) {
  return (
    <div className={`border border-border rounded-lg bg-card ${className}`}>
      {children}
    </div>
  );
}

export function DashboardBlock() {
  const stats = [
    { label: 'Total Revenue', value: '$45,231', change: '+20.1%', positive: true },
    { label: 'Active Users', value: '2,345', change: '+15.3%', positive: true },
    { label: 'Conversions', value: '183', change: '-4.2%', positive: false },
    { label: 'Avg. Session', value: '12m 34s', change: '+8.7%', positive: true },
  ];

  const recentActivity = [
    { user: 'Alice Johnson', action: 'made a purchase', time: '2 minutes ago', amount: '$129' },
    { user: 'Bob Smith', action: 'signed up', time: '15 minutes ago', amount: null },
    { user: 'Carol Davis', action: 'made a purchase', time: '1 hour ago', amount: '$89' },
    { user: 'David Wilson', action: 'upgraded plan', time: '2 hours ago', amount: '$299' },
  ];

  return (
    <View className="flex-1 bg-background">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of your business metrics
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="p-4">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-2xl font-bold mt-2">{stat.value}</div>
              <div
                className={`text-xs mt-1 ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-4">
          <h2 className="font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-muted-foreground">{activity.action}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </div>
                </div>
                {activity.amount && (
                  <div className="text-sm font-semibold">{activity.amount}</div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold mb-4">Top Products</h2>
          <div className="space-y-3">
            {[
              { name: 'Premium Plan', sales: 234, revenue: '$23,400' },
              { name: 'Basic Plan', sales: 189, revenue: '$9,450' },
              { name: 'Pro Plan', sales: 156, revenue: '$31,200' },
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium">{product.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {product.sales} sales
                  </div>
                </div>
                <div className="text-sm font-semibold">{product.revenue}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </View>
  );
}

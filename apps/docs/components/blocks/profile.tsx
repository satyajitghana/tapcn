'use client';

import { View } from 'react-native';

function Avatar({ children, className }: any) {
  return (
    <div className={`rounded-full bg-gray-200 ${className}`}>
      {children}
    </div>
  );
}

function Badge({ children, className }: any) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}

function Button({ children, className, ...props }: any) {
  return (
    <button className={`px-4 py-2 rounded-md font-medium ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ProfileBlock() {
  return (
    <View className="flex-1 bg-background">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 flex items-center justify-center text-2xl font-bold">
            JD
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-sm text-muted-foreground">@johndoe</p>
          </div>
          <Button className="border border-input bg-background hover:bg-accent">
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4 border-y">
          <div className="text-center">
            <div className="text-2xl font-bold">127</div>
            <div className="text-xs text-muted-foreground">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">2.4k</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">893</div>
            <div className="text-xs text-muted-foreground">Following</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">About</h3>
          <p className="text-sm text-muted-foreground">
            Product designer and developer. Building beautiful cross-platform apps with React Native.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Interests</h3>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-secondary text-secondary-foreground">Design</Badge>
            <Badge className="bg-secondary text-secondary-foreground">Development</Badge>
            <Badge className="bg-secondary text-secondary-foreground">React Native</Badge>
            <Badge className="bg-secondary text-secondary-foreground">UI/UX</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'Liked', content: '"Building beautiful mobile apps"', time: '2h ago' },
              { action: 'Commented on', content: '"React Native tips and tricks"', time: '5h ago' },
              { action: 'Posted', content: '"New project showcase"', time: '1d ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">●</span>
                </div>
                <div className="flex-1">
                  <p>
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

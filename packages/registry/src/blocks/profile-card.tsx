import * as React from 'react';
import { View } from 'react-native';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Separator } from '@/components/ui/separator';

interface ProfileCardUser {
  name: string;
  bio?: string;
  avatarUrl?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

interface ProfileCardProps {
  user: ProfileCardUser;
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
  onFollow?: () => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return count.toString();
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <View className="flex-1 items-center gap-0.5">
      <Text className="text-base font-semibold">{formatCount(value)}</Text>
      <Text variant="muted">{label}</Text>
    </View>
  );
}

function ProfileCard({ user, isOwnProfile = false, onEditProfile, onFollow }: ProfileCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center gap-3">
        <Avatar className="size-20">
          {user.avatarUrl ? (
            <AvatarImage source={{ uri: user.avatarUrl }} />
          ) : null}
          <AvatarFallback>
            <Text className="text-lg">{getInitials(user.name)}</Text>
          </AvatarFallback>
        </Avatar>
        <View className="items-center gap-1">
          <Text variant="h3" className="text-center">
            {user.name}
          </Text>
          {user.bio ? (
            <Text variant="muted" className="text-center">
              {user.bio}
            </Text>
          ) : null}
        </View>
      </CardHeader>
      <CardContent className="gap-4">
        <Separator />
        <View className="flex-row">
          <StatItem label="Posts" value={user.stats.posts} />
          <StatItem label="Followers" value={user.stats.followers} />
          <StatItem label="Following" value={user.stats.following} />
        </View>
        <Separator />
      </CardContent>
      <CardFooter className="justify-center">
        {isOwnProfile ? (
          <Button variant="outline" className="flex-1" onPress={onEditProfile}>
            <Text>Edit Profile</Text>
          </Button>
        ) : (
          <Button className="flex-1" onPress={onFollow}>
            <Text>Follow</Text>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export { ProfileCard };
export type { ProfileCardProps, ProfileCardUser };

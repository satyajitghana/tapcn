import * as React from 'react';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';

const SECTIONS = [
  'Typography',
  'Buttons',
  'Cards',
  'Inputs & Forms',
  'Data Display',
  'Feedback',
  'Settings Pattern',
] as const;

export default function ShowcaseScreen() {
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = React.useState(false);
  const [progress, setProgress] = React.useState(68);
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleLoadingButton = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="mx-auto w-full max-w-lg gap-8 p-6">
        {/* Hero */}
        <View className="gap-2">
          <Text variant="h1">tapcn</Text>
          <Text variant="muted">
            Beautiful, accessible components for React Native. Cross-platform by
            default.
          </Text>
        </View>

        <Separator />

        {/* Typography */}
        <View className="gap-4">
          <Text variant="h2">Typography</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="h4">Heading 4</Text>
          <Text variant="p">
            This is a paragraph demonstrating the text component with rich
            variant support. All text styles are driven by NativeWind classes.
          </Text>
          <Text variant="lead">Lead text for introductions.</Text>
          <Text variant="large">Large text</Text>
          <Text variant="small">Small text</Text>
          <Text variant="muted">Muted text for secondary content.</Text>
          <Text variant="code">console.log('hello tapcn')</Text>
          <Text variant="blockquote">
            This is a blockquote for highlighting important quotes or callouts.
          </Text>
        </View>

        <Separator />

        {/* Buttons */}
        <View className="gap-4">
          <Text variant="h2">Buttons</Text>
          <Text variant="muted">All button variants and sizes.</Text>
          <View className="flex-row flex-wrap gap-3">
            <Button>
              <Text>Default</Text>
            </Button>
            <Button variant="secondary">
              <Text>Secondary</Text>
            </Button>
            <Button variant="destructive">
              <Text>Destructive</Text>
            </Button>
            <Button variant="outline">
              <Text>Outline</Text>
            </Button>
            <Button variant="ghost">
              <Text>Ghost</Text>
            </Button>
            <Button variant="link">
              <Text>Link</Text>
            </Button>
          </View>
          <Text variant="small" className="text-muted-foreground">
            Sizes
          </Text>
          <View className="flex-row items-center gap-3">
            <Button size="sm">
              <Text>Small</Text>
            </Button>
            <Button size="default">
              <Text>Default</Text>
            </Button>
            <Button size="lg">
              <Text>Large</Text>
            </Button>
          </View>
          <Text variant="small" className="text-muted-foreground">
            States
          </Text>
          <View className="flex-row items-center gap-3">
            <Button disabled>
              <Text>Disabled</Text>
            </Button>
            <Button onPress={handleLoadingButton} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text>Loading</Text>
              )}
            </Button>
          </View>
        </View>

        <Separator />

        {/* Cards */}
        <View className="gap-4">
          <Text variant="h2">Cards</Text>

          {/* Notification Card */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <View className="flex-row items-start gap-3">
                <View className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                <View className="flex-1 gap-0.5">
                  <Text variant="small">Your call has been confirmed.</Text>
                  <Text variant="muted">1 hour ago</Text>
                </View>
              </View>
              <View className="flex-row items-start gap-3">
                <View className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                <View className="flex-1 gap-0.5">
                  <Text variant="small">You have a new message!</Text>
                  <Text variant="muted">2 hours ago</Text>
                </View>
              </View>
              <View className="flex-row items-start gap-3">
                <View className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                <View className="flex-1 gap-0.5">
                  <Text variant="small">
                    Your subscription is expiring soon!
                  </Text>
                  <Text variant="muted">5 hours ago</Text>
                </View>
              </View>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Text>Mark all as read</Text>
              </Button>
            </CardFooter>
          </Card>

          {/* Stats Cards */}
          <View className="flex-row gap-3">
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardDescription>Total Revenue</CardDescription>
                <CardTitle>$45,231</CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="muted" className="text-xs">
                  +20.1% from last month
                </Text>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardDescription>Active Users</CardDescription>
                <CardTitle>+2,350</CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="muted" className="text-xs">
                  +180 since yesterday
                </Text>
              </CardContent>
            </Card>
          </View>
        </View>

        <Separator />

        {/* Inputs & Forms */}
        <View className="gap-4">
          <Text variant="h2">Inputs & Forms</Text>
          <View className="gap-2">
            <Label nativeID="email-input">Email</Label>
            <Input
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              aria-labelledby="email-input"
            />
          </View>
          <View className="gap-2">
            <Label nativeID="password-input">Password</Label>
            <Input
              placeholder="Enter password"
              secureTextEntry
              aria-labelledby="password-input"
            />
          </View>
          <View className="gap-2">
            <Label nativeID="disabled-input">Disabled</Label>
            <Input
              placeholder="Disabled input"
              editable={false}
              aria-labelledby="disabled-input"
            />
          </View>
          <View className="flex-row items-center gap-3">
            <Checkbox
              checked={checkboxChecked}
              onCheckedChange={setCheckboxChecked}
            />
            <Pressable onPress={() => setCheckboxChecked(!checkboxChecked)}>
              <Text variant="small">I agree to the terms and conditions</Text>
            </Pressable>
          </View>
          <Button>
            <Text>Submit</Text>
          </Button>
        </View>

        <Separator />

        {/* Data Display */}
        <View className="gap-4">
          <Text variant="h2">Data Display</Text>

          {/* Badges */}
          <Text variant="small" className="text-muted-foreground">
            Badges
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <Badge>
              <Text>Default</Text>
            </Badge>
            <Badge variant="secondary">
              <Text>Secondary</Text>
            </Badge>
            <Badge variant="destructive">
              <Text>Destructive</Text>
            </Badge>
            <Badge variant="outline">
              <Text>Outline</Text>
            </Badge>
          </View>

          {/* Avatars */}
          <Text variant="small" className="text-muted-foreground">
            Avatars
          </Text>
          <View className="flex-row items-center gap-3">
            <Avatar>
              <AvatarImage
                source={{
                  uri: 'https://github.com/shadcn.png',
                }}
              />
              <AvatarFallback>
                <Text>CN</Text>
              </AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>
                <Text>JD</Text>
              </AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>
                <Text>AB</Text>
              </AvatarFallback>
            </Avatar>
            <View className="gap-0.5">
              <Text variant="small">John Doe</Text>
              <Text variant="muted">john@example.com</Text>
            </View>
          </View>

          {/* Skeleton */}
          <Text variant="small" className="text-muted-foreground">
            Skeleton Loading
          </Text>
          <View className="flex-row items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <View className="gap-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </View>
          </View>
          <View className="gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[60%]" />
          </View>
        </View>

        <Separator />

        {/* Feedback */}
        <View className="gap-4">
          <Text variant="h2">Feedback</Text>

          {/* Progress */}
          <Text variant="small" className="text-muted-foreground">
            Progress
          </Text>
          <Progress value={progress} />
          <Text variant="muted">{progress}% complete</Text>

          {/* Switch */}
          <Text variant="small" className="text-muted-foreground">
            Switch
          </Text>
          <View className="flex-row items-center justify-between rounded-lg border border-border p-4">
            <View className="gap-0.5">
              <Text variant="small">Dark Mode</Text>
              <Text variant="muted">Toggle dark mode appearance</Text>
            </View>
            <Switch
              checked={switchChecked}
              onCheckedChange={setSwitchChecked}
            />
          </View>
        </View>

        <Separator />

        {/* Settings Pattern - Real Mobile UI */}
        <View className="gap-4">
          <Text variant="h2">Settings Pattern</Text>
          <Text variant="muted">
            A real mobile settings screen pattern.
          </Text>

          <Card>
            <CardContent className="gap-0 p-0">
              {/* Setting Item */}
              <View className="flex-row items-center justify-between border-b border-border p-4">
                <View className="flex-1 gap-0.5">
                  <Text variant="small">Push Notifications</Text>
                  <Text variant="muted">Receive push notifications</Text>
                </View>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </View>
              {/* Setting Item */}
              <View className="flex-row items-center justify-between border-b border-border p-4">
                <View className="flex-1 gap-0.5">
                  <Text variant="small">Biometric Login</Text>
                  <Text variant="muted">Use Face ID or fingerprint</Text>
                </View>
                <Switch
                  checked={biometricsEnabled}
                  onCheckedChange={setBiometricsEnabled}
                />
              </View>
              {/* Setting Item - Navigation */}
              <Pressable className="flex-row items-center justify-between p-4 active:bg-accent">
                <View className="flex-1 gap-0.5">
                  <Text variant="small">Account</Text>
                  <Text variant="muted">Manage your account settings</Text>
                </View>
                <Text className="text-muted-foreground">{'>'}</Text>
              </Pressable>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full">
                <Text>Delete Account</Text>
              </Button>
            </CardContent>
          </Card>
        </View>

        <View className="h-12" />
      </View>
    </ScrollView>
  );
}

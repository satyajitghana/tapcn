import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';

export default function ShowcaseScreen() {
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [progress, setProgress] = React.useState(45);

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="mx-auto w-full max-w-lg gap-8 p-6">
        {/* Header */}
        <View className="gap-2">
          <Text variant="h1">tapcn</Text>
          <Text variant="muted">
            Beautiful, accessible components for React Native.
          </Text>
        </View>

        <Separator />

        {/* Typography */}
        <View className="gap-4">
          <Text variant="h2">Typography</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="h4">Heading 4</Text>
          <Text variant="p">
            This is a paragraph of text demonstrating the text component with various variants.
          </Text>
          <Text variant="lead">Lead text for introductions.</Text>
          <Text variant="large">Large text</Text>
          <Text variant="small">Small text</Text>
          <Text variant="muted">Muted text for secondary content.</Text>
          <Text variant="code">console.log('hello tapcn')</Text>
        </View>

        <Separator />

        {/* Buttons */}
        <View className="gap-4">
          <Text variant="h2">Buttons</Text>
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
          <View className="flex-row gap-3">
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
        </View>

        <Separator />

        {/* Card */}
        <View className="gap-4">
          <Text variant="h2">Card</Text>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here.</CardDescription>
            </CardHeader>
            <CardContent>
              <Text>This is the card content area.</Text>
            </CardContent>
            <CardFooter>
              <Button>
                <Text>Action</Text>
              </Button>
            </CardFooter>
          </Card>
        </View>

        <Separator />

        {/* Input & Label */}
        <View className="gap-4">
          <Text variant="h2">Input</Text>
          <View className="gap-2">
            <Label>Email</Label>
            <Input placeholder="Enter your email..." />
          </View>
          <View className="gap-2">
            <Label>Disabled Input</Label>
            <Input placeholder="Disabled..." editable={false} />
          </View>
        </View>

        <Separator />

        {/* Badge */}
        <View className="gap-4">
          <Text variant="h2">Badge</Text>
          <View className="flex-row flex-wrap gap-3">
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
        </View>

        <Separator />

        {/* Switch */}
        <View className="gap-4">
          <Text variant="h2">Switch</Text>
          <View className="flex-row items-center gap-3">
            <Switch
              checked={switchChecked}
              onCheckedChange={setSwitchChecked}
            />
            <Text>{switchChecked ? 'On' : 'Off'}</Text>
          </View>
        </View>

        <Separator />

        {/* Progress */}
        <View className="gap-4">
          <Text variant="h2">Progress</Text>
          <Progress value={progress} />
          <Text variant="muted">{progress}% complete</Text>
        </View>

        <Separator />

        {/* Skeleton */}
        <View className="gap-4">
          <Text variant="h2">Skeleton</Text>
          <View className="flex-row items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <View className="gap-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </View>
          </View>
        </View>

        <View className="h-12" />
      </View>
    </ScrollView>
  );
}

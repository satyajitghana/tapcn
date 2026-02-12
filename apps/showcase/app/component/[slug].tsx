import { useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';

// Component name mapping to showcase screens
const COMPONENT_ROUTES: Record<string, string> = {
  button: '/(main)/button',
  input: '/(main)/input',
  card: '/(main)/card',
  badge: '/(main)/badge',
  avatar: '/(main)/avatar',
  checkbox: '/(main)/checkbox',
  switch: '/(main)/switch',
  'radio-group': '/(main)/radio-group',
  tabs: '/(main)/tabs',
  progress: '/(main)/progress',
  'toggle-group': '/(main)/toggle-group',
  select: '/(main)/select',
  alert: '/(main)/alert',
  slider: '/(main)/slider',
  dialog: '/(main)/dialog',
  tooltip: '/(main)/tooltip',
  popover: '/(main)/popover',
  'dropdown-menu': '/(main)/dropdown-menu',
  toast: '/(main)/toast',
  separator: '/(main)/separator',
  // Add more mappings as components are added to showcase
};

export default function ComponentDeepLink() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();

  useEffect(() => {
    if (slug) {
      const route = COMPONENT_ROUTES[slug];
      if (route) {
        // Navigate to the component's showcase page
        router.replace(route as any);
      } else {
        // Component not found, redirect to home
        router.replace('/');
      }
    } else {
      // No slug provided, redirect to home
      router.replace('/');
    }
  }, [slug, router]);

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" />
      <Text className="mt-4 text-foreground">Loading component...</Text>
    </View>
  );
}

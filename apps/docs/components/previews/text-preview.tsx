'use client';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function TextPreview() {
  return (
    <View className="gap-4 items-start max-w-[400px]">
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="p">
        This is a paragraph of body text with default styling.
      </Text>
      <Text variant="lead">This is lead text, slightly larger and muted.</Text>
      <Text variant="large">Large text</Text>
      <Text variant="small">Small text</Text>
      <Text variant="muted">Muted text</Text>
      <Text variant="blockquote">
        This is a blockquote with italic styling.
      </Text>
      <Text variant="code">console.log('code')</Text>
    </View>
  );
}

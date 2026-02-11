'use client';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { View } from 'react-native';

export function TextareaPreview() {
  return (
    <View className="gap-2 w-[300px]">
      <Label>Message</Label>
      <Textarea placeholder="Type your message here..." />
      <Text variant="muted">Your message will be sent to support.</Text>
    </View>
  );
}

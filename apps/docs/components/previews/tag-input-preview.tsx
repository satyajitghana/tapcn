'use client';
import * as React from 'react';
import { TagInput } from '@/components/ui/tag-input';
import { View } from 'react-native';

export function TagInputPreview() {
  const [tags, setTags] = React.useState(['React', 'TypeScript']);

  return (
    <View className="w-[320px]">
      <TagInput
        tags={tags}
        onTagsChange={setTags}
        placeholder="Add tag..."
      />
    </View>
  );
}

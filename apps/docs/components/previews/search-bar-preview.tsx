'use client';
import * as React from 'react';
import { SearchBar } from '@/components/ui/search-bar';
import { View } from 'react-native';

export function SearchBarPreview() {
  const [value, setValue] = React.useState('');

  return (
    <View className="w-[280px]">
      <SearchBar
        value={value}
        onChangeText={setValue}
        placeholder="Search..."
      />
    </View>
  );
}

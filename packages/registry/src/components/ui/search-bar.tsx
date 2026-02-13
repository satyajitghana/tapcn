import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  onCancel?: () => void;
  showCancel?: boolean;
  autoFocus?: boolean;
  className?: string;
  ref?: React.Ref<TextInput>;
}

function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search',
  onCancel,
  showCancel = false,
  autoFocus = false,
  className,
  ref,
  ...props
}: SearchBarProps) {
  return (
    <View className={cn('flex-row items-center gap-2', className)}>
      <View className="flex-1 flex-row items-center gap-2 rounded-xl bg-muted px-3 h-10">
        <Icon
          as={Search}
          className="size-4 text-muted-foreground"
        />
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={cn(
            'flex-1 text-base text-foreground',
            Platform.select({
              web: 'placeholder:text-muted-foreground outline-none',
              native: 'placeholder:text-muted-foreground',
            })
          )}
          {...props}
        />
        {value && value.length > 0 && (
          <Pressable
            onPress={() => onChangeText?.('')}
            hitSlop={8}
          >
            <Icon
              as={X}
              className="size-4 text-muted-foreground"
            />
          </Pressable>
        )}
      </View>
      {showCancel && (
        <Pressable
          onPress={onCancel}
          className={cn(Platform.select({ web: 'active:opacity-70', native: 'active:opacity-70' }))}
        >
          <Text className="text-base text-primary">Cancel</Text>
        </Pressable>
      )}
    </View>
  );
}

export { SearchBar };
export type { SearchBarProps };

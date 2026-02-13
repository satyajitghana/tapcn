import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react-native';
import * as React from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  Pressable,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
  className?: string;
}

function TagInput({
  tags,
  onTagsChange,
  placeholder = 'Add tag...',
  maxTags,
  disabled = false,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef<TextInput>(null);

  const addTag = React.useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      if (tags.includes(trimmed)) return;
      if (maxTags !== undefined && tags.length >= maxTags) return;
      onTagsChange([...tags, trimmed]);
      setInputValue('');
    },
    [tags, onTagsChange, maxTags]
  );

  const removeTag = React.useCallback(
    (index: number) => {
      onTagsChange(tags.filter((_, i) => i !== index));
    },
    [tags, onTagsChange]
  );

  const handleChangeText = React.useCallback(
    (text: string) => {
      if (text.includes(',')) {
        const parts = text.split(',');
        for (const part of parts) {
          addTag(part);
        }
        return;
      }
      setInputValue(text);
    },
    [addTag]
  );

  const handleSubmitEditing = React.useCallback(() => {
    addTag(inputValue);
  }, [addTag, inputValue]);

  const handleKeyPress = React.useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (e.nativeEvent.key === 'Backspace' && inputValue === '') {
        removeTag(tags.length - 1);
      }
    },
    [inputValue, removeTag, tags.length]
  );

  const isMaxReached = maxTags !== undefined && tags.length >= maxTags;

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      disabled={disabled}
      className={cn(
        'border-input bg-background min-h-[40px] flex-row flex-wrap items-center gap-2 rounded-md border px-3 py-2',
        disabled &&
          cn(
            'opacity-50',
            Platform.select({
              web: 'cursor-not-allowed',
            })
          ),
        className
      )}>
      {tags.map((tag, index) => (
        <View
          key={`${tag}-${index}`}
          className="bg-secondary flex-row items-center gap-1 rounded-full px-2.5 py-1">
          <Text className="text-secondary-foreground text-sm">{tag}</Text>
          {!disabled && (
            <Pressable
              onPress={() => removeTag(index)}
              hitSlop={4}
              className={cn(
                'active:opacity-100',
                Platform.select({
                  web: 'cursor-pointer rounded-full',
                })
              )}
              role="button"
              aria-label={`Remove ${tag}`}>
              <Icon
                as={X}
                className="text-secondary-foreground/70 active:text-secondary-foreground size-3"
              />
            </Pressable>
          )}
        </View>
      ))}
      {!isMaxReached && (
        <TextInput
          ref={inputRef}
          value={inputValue}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          editable={!disabled}
          blurOnSubmit={false}
          className={cn(
            'text-foreground min-w-[80px] flex-1 border-0 text-base',
            Platform.select({
              web: 'placeholder:text-muted-foreground outline-none',
              native: 'placeholder:text-muted-foreground',
            })
          )}
        />
      )}
    </Pressable>
  );
}

export { TagInput };
export type { TagInputProps };

import { cn } from '@/lib/utils';
import * as React from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

interface OTPInputProps {
  length?: number;
  value?: string;
  onComplete?: (code: string) => void;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  disabled?: boolean;
  className?: string;
}

function OTPInput({
  length = 6,
  value = '',
  onComplete,
  onChangeText,
  secureTextEntry = false,
  disabled = false,
  className,
}: OTPInputProps) {
  const inputRef = React.useRef<TextInput>(null);
  const cursorOpacity = useSharedValue(1);

  React.useEffect(() => {
    cursorOpacity.value = withRepeat(withTiming(0, { duration: 500 }), -1, true);
  }, [cursorOpacity]);

  const cursorAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cursorOpacity.value,
  }));

  const handlePress = React.useCallback(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleChangeText = React.useCallback(
    (text: string) => {
      const sanitized = text.replace(/[^0-9]/g, '').slice(0, length);
      onChangeText?.(sanitized);
      if (sanitized.length === length) {
        onComplete?.(sanitized);
      }
    },
    [length, onChangeText, onComplete]
  );

  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View className={cn('flex-row gap-2', disabled && 'opacity-50', className)}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={length}
        keyboardType="number-pad"
        autoComplete="one-time-code"
        editable={!disabled}
        caretHidden
        style={{
          position: 'absolute',
          opacity: 0,
          width: 1,
          height: 1,
        }}
      />
      {Array.from({ length }, (_, index) => {
        const char = value[index];
        const isFocusedCell = isFocused && index === value.length;
        const isFilled = char !== undefined;

        return (
          <Pressable key={index} onPress={handlePress}>
            <View
              className={cn(
                'border-input bg-background h-14 w-12 items-center justify-center rounded-lg border',
                isFocusedCell && 'border-primary border-2',
                Platform.select({
                  web: cn(
                    'transition-colors',
                    !disabled && 'cursor-text'
                  ),
                })
              )}
            >
              {isFilled ? (
                secureTextEntry ? (
                  <View className="bg-foreground size-3 rounded-full" />
                ) : (
                  <Text className="text-foreground text-xl font-semibold">{char}</Text>
                )
              ) : isFocusedCell ? (
                <Animated.View
                  style={cursorAnimatedStyle}
                  className="bg-foreground h-6 w-0.5 rounded-full"
                />
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export { OTPInput };
export type { OTPInputProps };

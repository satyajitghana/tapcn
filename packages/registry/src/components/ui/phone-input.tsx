import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';

type CountryData = {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
};

const COUNTRIES: CountryData[] = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: '\u{1F1FA}\u{1F1F8}' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '\u{1F1E9}\u{1F1EA}' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '\u{1F1EB}\u{1F1F7}' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '\u{1F1EF}\u{1F1F5}' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '\u{1F1E6}\u{1F1FA}' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '\u{1F1E8}\u{1F1E6}' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '\u{1F1E7}\u{1F1F7}' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '\u{1F1F2}\u{1F1FD}' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '\u{1F1F0}\u{1F1F7}' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '\u{1F1EE}\u{1F1F9}' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '\u{1F1EA}\u{1F1F8}' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '\u{1F1F3}\u{1F1F1}' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '\u{1F1F8}\u{1F1EA}' },
];

type PhoneInputProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  defaultCountry?: string;
  onCountryChange?: (country: CountryData) => void;
  disabled?: boolean;
  className?: string;
};

const PhoneInput = React.forwardRef<TextInput, PhoneInputProps>(
  (
    {
      value,
      onChangeText,
      defaultCountry = 'US',
      onCountryChange,
      disabled = false,
      className,
    },
    ref
  ) => {
    const [selectedCountry, setSelectedCountry] = React.useState<CountryData>(
      () =>
        COUNTRIES.find((c) => c.code === defaultCountry) ?? COUNTRIES[0]
    );

    const handleCountryPress = React.useCallback(() => {
      if (disabled) return;
      const currentIndex = COUNTRIES.findIndex(
        (c) => c.code === selectedCountry.code
      );
      const nextIndex = (currentIndex + 1) % COUNTRIES.length;
      const nextCountry = COUNTRIES[nextIndex];
      setSelectedCountry(nextCountry);
      onCountryChange?.(nextCountry);
    }, [disabled, selectedCountry.code, onCountryChange]);

    return (
      <View
        className={cn(
          'border-input bg-background flex h-10 flex-row items-center rounded-md border shadow-sm shadow-black/5',
          disabled && 'opacity-50',
          className
        )}
      >
        <Pressable
          onPress={handleCountryPress}
          disabled={disabled}
          className={cn(
            'border-input flex-row items-center justify-center gap-1 border-r px-3',
            Platform.select({
              web: 'cursor-pointer select-none',
            })
          )}
        >
          <Text className="text-base">{selectedCountry.flag}</Text>
          <Text className="text-foreground text-sm">{selectedCountry.dialCode}</Text>
          <Icon
            as={ChevronDown}
            className="text-muted-foreground"
            size={12}
          />
        </Pressable>
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          keyboardType="phone-pad"
          editable={!disabled}
          className={cn(
            'text-foreground h-full flex-1 px-3 text-base leading-5',
            Platform.select({
              web: cn(
                'placeholder:text-muted-foreground outline-none md:text-sm',
                'focus-visible:outline-none'
              ),
              native: 'placeholder:text-muted-foreground/50',
            })
          )}
          placeholder="Phone number"
        />
      </View>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
export type { CountryData, PhoneInputProps };

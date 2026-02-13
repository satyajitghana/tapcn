import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onPress?: () => void;
  showSeparator?: boolean;
  chevron?: boolean;
  disabled?: boolean;
  className?: string;
}

function ListItem({
  title,
  subtitle,
  leading,
  trailing,
  onPress,
  showSeparator = true,
  chevron,
  disabled,
  className,
}: ListItemProps) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        className={cn(
          'flex-row items-center gap-3 bg-background px-4 py-3',
          'active:bg-accent',
          Platform.select({ web: 'cursor-default' }),
          disabled && 'opacity-50',
          className
        )}
      >
        {leading && <View>{leading}</View>}
        <View className="flex-1 gap-0.5">
          <Text
            className={cn(
              'text-base text-foreground',
              Platform.select({ web: 'select-none' })
            )}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              className={cn(
                'text-sm text-muted-foreground',
                Platform.select({ web: 'select-none' })
              )}
            >
              {subtitle}
            </Text>
          )}
        </View>
        {trailing
          ? <View>{trailing}</View>
          : chevron && (
              <Icon
                as={ChevronRight}
                className="size-5 text-muted-foreground"
              />
            )}
      </Pressable>
      {showSeparator && (
        <View
          className={cn(
            'h-[1px] bg-border',
            leading ? 'ml-[52px]' : 'ml-4'
          )}
        />
      )}
    </View>
  );
}

interface ListItemGroupProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

function ListItemGroup({ title, className, children }: ListItemGroupProps) {
  return (
    <View className={cn(className)}>
      {title && (
        <View className="px-4 py-2">
          <Text
            className={cn(
              'text-xs font-medium uppercase tracking-wider text-muted-foreground',
              Platform.select({ web: 'select-none' })
            )}
          >
            {title}
          </Text>
        </View>
      )}
      {children}
    </View>
  );
}

export { ListItem, ListItemGroup };
export type { ListItemGroupProps, ListItemProps };

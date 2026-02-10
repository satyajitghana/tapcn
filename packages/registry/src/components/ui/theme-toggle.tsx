import * as React from 'react';
import { Pressable, Platform } from 'react-native';
import { cn } from '@/lib/utils';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Moon, Sun } from 'lucide-react-native';
import { iconWithClassName } from '@/components/ui/icon';

iconWithClassName(Moon);
iconWithClassName(Sun);

function ThemeToggle({ className }: { className?: string }) {
  const { isDark, toggleColorScheme } = useColorScheme();

  return (
    <Pressable
      onPress={toggleColorScheme}
      className={cn(
        'h-10 w-10 items-center justify-center rounded-md',
        Platform.select({ web: 'hover:bg-accent' }),
        'active:bg-accent',
        className
      )}
      role="button"
      accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Moon className="size-5 text-foreground" />
      ) : (
        <Sun className="size-5 text-foreground" />
      )}
    </Pressable>
  );
}

export { ThemeToggle };

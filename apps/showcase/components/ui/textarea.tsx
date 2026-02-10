import { cn } from '@/lib/utils';
import { Platform, TextInput, type TextInputProps } from 'react-native';

function Textarea({ className, ...props }: TextInputProps & React.RefAttributes<TextInput>) {
  return (
    <TextInput
      multiline
      className={cn(
        'dark:bg-input/30 border-input bg-background text-foreground min-h-[80px] w-full rounded-md border px-3 py-2 text-base shadow-sm shadow-black/5',
        Platform.select({
          web: cn(
            'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground outline-none transition-[color,box-shadow] md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
          ),
          native: 'placeholder:text-muted-foreground/50',
        }),
        props.editable === false && 'opacity-50',
        className
      )}
      textAlignVertical="top"
      {...props}
    />
  );
}

export { Textarea };

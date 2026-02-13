import { cn } from '@/lib/utils';
import * as React from 'react';
import { NativeSyntheticEvent, Platform, Pressable, Text, TextLayoutEventData, View } from 'react-native';

type ExpandableTextProps = {
  numberOfLines?: number;
  expandLabel?: string;
  collapseLabel?: string;
  className?: string;
  children: string;
};

function ExpandableText({
  numberOfLines = 3,
  expandLabel = 'Read more',
  collapseLabel = 'Show less',
  className,
  children,
}: ExpandableTextProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [needsTruncation, setNeedsTruncation] = React.useState(
    Platform.select({ web: true, default: false })
  );

  const onTextLayout = React.useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (!expanded) {
        setNeedsTruncation(event.nativeEvent.lines.length > numberOfLines);
      }
    },
    [expanded, numberOfLines]
  );

  return (
    <View className={className}>
      <Text
        className={cn('text-base text-foreground', Platform.select({ web: 'select-text' }))}
        numberOfLines={expanded ? undefined : numberOfLines}
        onTextLayout={Platform.select({ web: undefined, default: onTextLayout })}
      >
        {children}
      </Text>
      {needsTruncation ? (
        <Pressable
          onPress={() => setExpanded((prev) => !prev)}
          className="active:opacity-70"
          role="button"
        >
          <Text
            className={cn(
              'text-sm font-medium text-primary mt-1',
              Platform.select({ web: 'select-none cursor-pointer' })
            )}
          >
            {expanded ? collapseLabel : expandLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export { ExpandableText };
export type { ExpandableTextProps };

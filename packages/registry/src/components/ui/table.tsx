import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as TablePrimitive from '@rn-primitives/table';
import * as React from 'react';
import { Platform, ScrollView, View } from 'react-native';

function Table({
  className,
  ...props
}: TablePrimitive.RootProps & React.RefAttributes<TablePrimitive.RootRef>) {
  return (
    <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
      <TablePrimitive.Root
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </ScrollView>
  );
}

function TableHeader({
  className,
  ...props
}: TablePrimitive.HeaderProps & React.RefAttributes<TablePrimitive.HeaderRef>) {
  return (
    <TablePrimitive.Header
      className={cn('border-border border-b', Platform.select({ web: '[&_tr]:border-b' }), className)}
      {...props}
    />
  );
}

function TableBody({
  className,
  ...props
}: TablePrimitive.BodyProps & React.RefAttributes<TablePrimitive.BodyRef>) {
  return (
    <TablePrimitive.Body
      className={cn(Platform.select({ web: '[&_tr:last-child]:border-0' }), className)}
      {...props}
    />
  );
}

function TableFooter({
  className,
  ...props
}: TablePrimitive.FooterProps & React.RefAttributes<TablePrimitive.FooterRef>) {
  return (
    <TextClassContext.Provider value="text-primary-foreground">
      <TablePrimitive.Footer
        className={cn('bg-muted/50 border-border border-t font-medium', className)}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function TableRow({
  className,
  ...props
}: TablePrimitive.RowProps & React.RefAttributes<TablePrimitive.RowRef>) {
  return (
    <TablePrimitive.Row
      className={cn(
        'border-border flex-row border-b',
        Platform.select({
          web: 'transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        }),
        Platform.select({
          native: 'active:bg-muted/50',
        }),
        className
      )}
      {...props}
    />
  );
}

function TableHead({
  className,
  ...props
}: TablePrimitive.HeadProps & React.RefAttributes<TablePrimitive.HeadRef>) {
  return (
    <TextClassContext.Provider value="text-muted-foreground">
      <TablePrimitive.Head
        className={cn(
          'h-12 items-center justify-center px-4 text-left font-medium',
          Platform.select({
            web: 'align-middle [&:has([role=checkbox])]:pr-0',
          }),
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function TableCell({
  className,
  ...props
}: TablePrimitive.CellProps & React.RefAttributes<TablePrimitive.CellRef>) {
  return (
    <TablePrimitive.Cell
      className={cn(
        'flex-1 items-center justify-center p-4',
        Platform.select({
          web: 'align-middle [&:has([role=checkbox])]:pr-0',
        }),
        className
      )}
      {...props}
    />
  );
}

export { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow };

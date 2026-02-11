'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Text } from '@/components/ui/text';

export function CardPreview() {
  return (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text className="text-sm">
          This is the card content area. It can contain any content you need to
          display.
        </Text>
      </CardContent>
      <CardFooter className="justify-end">
        <Button>
          <Text>Action</Text>
        </Button>
      </CardFooter>
    </Card>
  );
}

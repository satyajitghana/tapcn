'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function AccordionPreview() {
  return (
    <View className="w-[320px]">
      <Accordion type="multiple" defaultValue={['item-1']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <Text>Is it accessible?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <Text>Is it styled?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              Yes. It comes with default styles that match the theme.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <Text>Is it animated?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>Yes. It supports animations using Reanimated.</Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}

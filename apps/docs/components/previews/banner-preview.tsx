'use client';
import * as React from 'react';
import { Banner } from '@/components/ui/banner';
import { Icon } from '@/components/ui/icon';
import { Info } from 'lucide-react-native';
import { View } from 'react-native';

export function BannerPreview() {
  const [visible, setVisible] = React.useState(true);

  return (
    <View className="w-[320px]">
      {visible && (
        <Banner
          variant="info"
          icon={<Icon as={Info} size={20} />}
          title="This is an informational banner"
          dismissable
          onDismiss={() => setVisible(false)}
        />
      )}
    </View>
  );
}

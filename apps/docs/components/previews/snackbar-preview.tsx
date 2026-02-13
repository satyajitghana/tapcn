'use client';
import { SnackbarProvider, useSnackbar } from '@/components/ui/snackbar';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

function SnackbarDemo() {
  const { snackbar } = useSnackbar();

  return (
    <View>
      <Button
        onPress={() =>
          snackbar({
            message: 'Message sent successfully',
            action: {
              label: 'Undo',
              onPress: () => console.log('Undo'),
            },
          })
        }
      >
        <Text>Show Snackbar</Text>
      </Button>
    </View>
  );
}

export function SnackbarPreview() {
  return (
    <SnackbarProvider>
      <SnackbarDemo />
    </SnackbarProvider>
  );
}

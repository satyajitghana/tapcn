import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { PortalHost } from '@rn-primitives/portal';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack />
      <PortalHost />
    </>
  );
}

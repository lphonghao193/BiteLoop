import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/theme';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerBackTitle: 'Back', headerShadowVisible: false, headerStyle: { backgroundColor: colors.background }, contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ presentation: 'modal', title: 'Welcome' }} />
        <Stack.Screen name="profile" options={{ title: 'You' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        <Stack.Screen name="check-in" options={{ title: 'New bite' }} />
        <Stack.Screen name="restaurant" options={{ title: 'Choose restaurant' }} />
        <Stack.Screen name="review" options={{ title: 'Quick review' }} />
        <Stack.Screen name="circles" options={{ title: 'Circles' }} />
        <Stack.Screen name="group-decision" options={{ title: 'Group decision' }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}

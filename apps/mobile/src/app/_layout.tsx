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
        <Stack.Screen name="journal" options={{ title: 'Your journal' }} />
        <Stack.Screen name="taste-profile" options={{ title: 'Taste profile' }} />
        <Stack.Screen name="dish" options={{ title: 'Dish details' }} />
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

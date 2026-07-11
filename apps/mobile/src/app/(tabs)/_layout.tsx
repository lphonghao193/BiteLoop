import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/theme';

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700', marginBottom: 3 },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 82,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="loop"
        options={{
          title: 'Loop',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons color={color} name={focused ? 'people' : 'people-outline'} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Capture',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons color={color} name={focused ? 'camera' : 'camera-outline'} size={29} />
          ),
        }}
      />
      <Tabs.Screen
        name="pick"
        options={{
          title: 'Decide',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons color={color} name={focused ? 'sparkles' : 'sparkles-outline'} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

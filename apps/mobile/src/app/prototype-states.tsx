import { useState } from 'react';

import { ChoiceChip, DataStateCard, PrototypePage } from '@/components/prototype-ui';
import { space } from '@/theme';
import { StyleSheet, View } from 'react-native';

const states = ['Loading', 'Empty', 'Permission', 'Offline', 'Error'] as const;
type State = (typeof states)[number];

const content: Record<State, { icon: 'hourglass-outline' | 'restaurant-outline' | 'lock-closed-outline' | 'cloud-offline-outline' | 'warning-outline'; title: string; detail: string; action?: string }> = {
  Loading: { icon: 'hourglass-outline', title: 'Finding your bites...', detail: 'Keep the current layout stable while journal entries, feed cards, or recommendations load.' },
  Empty: { icon: 'restaurant-outline', title: 'Your first bite starts here', detail: 'Explain what will appear here and give one clear route to create it.', action: 'Capture a bite' },
  Permission: { icon: 'lock-closed-outline', title: 'Permission needed', detail: 'Camera, photos, and location remain optional. Explain the benefit and preserve a manual alternative.', action: 'Open settings' },
  Offline: { icon: 'cloud-offline-outline', title: 'You are offline', detail: 'Keep safe local work, label stale content, and retry automatically when the connection returns.', action: 'Try again' },
  Error: { icon: 'warning-outline', title: 'That did not work', detail: 'Use plain language, preserve user input, and offer a retry without exposing implementation details.', action: 'Try again' },
};

export default function PrototypeStatesScreen() {
  const [selected, setSelected] = useState<State>('Loading');
  const state = content[selected];
  return <PrototypePage title="Data-flow states" subtitle="Shared behavior for Loop, Journal, Capture, restaurant search, decisions, and account flows."><View style={styles.chips}>{states.map((item) => <ChoiceChip key={item} label={item} selected={selected === item} onPress={() => setSelected(item)} />)}</View><DataStateCard icon={state.icon} title={state.title} detail={state.detail} actionLabel={state.action} /></PrototypePage>;
}

const styles = StyleSheet.create({ chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm } });

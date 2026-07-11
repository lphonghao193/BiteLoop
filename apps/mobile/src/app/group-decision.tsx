import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ChoiceChip, ListRow, PrimaryButton, PrototypePage, Section } from '@/components/prototype-ui';
import { colors, space } from '@/theme';

export default function GroupDecisionScreen() {
  const [step, setStep] = useState<'room' | 'result'>('room');
  if (step === 'result') return <PrototypePage title="Everyone can eat here" subtitle="Hard constraints were applied before the random choice."><View style={styles.result}><Text style={styles.resultEyebrow}>TODAY'S PICK</Text><Text style={styles.resultTitle}>Bún bò Huế</Text><Text style={styles.resultPlace}>Bếp Huế · 8 minutes away</Text><Text style={styles.reason}>Within everyone's budget · Open now · No excluded ingredients · 4 friends would order again</Text></View><PrimaryButton icon="navigate" label="Let's go" /><PrimaryButton icon="shuffle" label="Reroll" secondary onPress={() => setStep('room')} /></PrototypePage>;
  return <PrototypePage title="Decide together" subtitle="Each person adds private hard constraints. BiteLoop chooses only from the shared safe set."><Section title="Room"><ListRow icon="person-circle" title="You" detail="Ready · 100k–300k VND" /><ListRow icon="person-circle" title="Minh" detail="Ready · No shellfish" /><ListRow icon="person-add-outline" title="Invite someone" detail="Share room link" /></Section><Section title="Shared context"><View style={styles.chips}><ChoiceChip label="Dinner" selected /><ChoiceChip label="Within 5 km" selected /><ChoiceChip label="Open now" selected /></View></Section><PrimaryButton icon="sparkles" label="Pick for the group" onPress={() => setStep('result')} /></PrototypePage>;
}
const styles = StyleSheet.create({ chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }, result: { backgroundColor: colors.ink, borderRadius: 26, gap: 7, padding: space.lg }, resultEyebrow: { color: '#E9B89B', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 }, resultTitle: { color: '#FFF', fontSize: 29, fontWeight: '900' }, resultPlace: { color: '#F2E8E1', fontSize: 15, fontWeight: '700' }, reason: { color: '#CDBFB6', fontSize: 13, lineHeight: 20, marginTop: 8 } });

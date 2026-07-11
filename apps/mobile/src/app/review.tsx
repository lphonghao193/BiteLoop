import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { ChoiceChip, PrimaryButton, PrototypePage, Section } from '@/components/prototype-ui';
import { colors, space } from '@/theme';

const Metric = ({ title, values }: { title: string; values: string[] }) => { const [value, setValue] = useState(values[1]); return <View style={styles.metric}><Text style={styles.metricTitle}>{title}</Text><View style={styles.chips}>{values.map((item) => <ChoiceChip key={item} label={item} selected={value === item} onPress={() => setValue(item)} />)}</View></View>; };
export default function ReviewScreen() {
  const router = useRouter();
  return <PrototypePage title="More useful than stars" subtitle="Concrete answers help friends know whether this dish fits them.">
    <Section title="Dish review"><Metric title="Would you order it again?" values={['No', 'Maybe', 'Yes']} /><Metric title="Taste" values={['Disappointing', 'Fine', 'Memorable']} /><Metric title="Value" values={['Poor', 'Fair', 'Great']} /><Metric title="Portion" values={['Too small', 'Just right', 'Too large']} /></Section>
    <TextInput multiline placeholder="One useful note (optional)" placeholderTextColor={colors.muted} style={styles.note} />
    <PrimaryButton icon="checkmark" label="Save private check-in" onPress={() => router.replace('/profile')} />
  </PrototypePage>;
}
const styles = StyleSheet.create({ metric: { gap: 8, marginBottom: space.md }, metricTitle: { color: colors.ink, fontSize: 14, fontWeight: '800' }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 }, note: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 16, borderWidth: 1, color: colors.ink, minHeight: 100, padding: 14, textAlignVertical: 'top' } });

import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { ChoiceChip, ListRow, PrototypePage, Section } from '@/components/prototype-ui';
import { colors, space } from '@/theme';

export default function SettingsScreen() {
  const [currency, setCurrency] = useState('VND');
  const [notifications, setNotifications] = useState(true);
  return <PrototypePage title="Settings" subtitle="Defaults that make every check-in and suggestion faster.">
    <Section title="Currency"><View style={styles.chips}>{['VND', 'USD', 'EUR'].map((item) => <ChoiceChip key={item} label={item} selected={currency === item} onPress={() => setCurrency(item)} />)}</View><Text style={styles.help}>Original menu prices stay unchanged; conversions are estimates.</Text></Section>
    <Section title="Privacy"><ListRow icon="lock-closed-outline" title="Default audience" detail="Only me" /><ListRow icon="location-outline" title="Location usage" detail="Nearby search while using the app" /><ListRow icon="trash-outline" title="Account and data" detail="Export or delete your data" /></Section>
    <Section title="Notifications"><View style={styles.switchRow}><View style={styles.switchCopy}><Text style={styles.switchTitle}>Friend food moments</Text><Text style={styles.help}>New bites from your selected circles</Text></View><Switch onValueChange={setNotifications} value={notifications} trackColor={{ true: colors.primary }} /></View></Section>
  </PrototypePage>;
}
const styles = StyleSheet.create({ chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }, help: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 8 }, switchRow: { alignItems: 'center', flexDirection: 'row', minHeight: 58 }, switchCopy: { flex: 1 }, switchTitle: { color: colors.ink, fontSize: 15, fontWeight: '700' } });

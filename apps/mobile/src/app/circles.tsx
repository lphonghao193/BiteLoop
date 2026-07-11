import { StyleSheet, Text, TextInput, View } from 'react-native';

import { ChoiceChip, ListRow, PrimaryButton, PrototypePage, Section } from '@/components/prototype-ui';
import { colors, space } from '@/theme';

export default function CirclesScreen() {
  return <PrototypePage title="Your circles" subtitle="Small groups keep food sharing personal and trustworthy.">
    <Section title="Share with"><View style={styles.chips}><ChoiceChip label="Friends · 8" selected /><ChoiceChip label="Family · 5" /><ChoiceChip label="Coworkers · 11" /></View></Section>
    <Section title="Friends"><ListRow icon="person-circle-outline" title="Minh" detail="Can see 14 shared bites" /><ListRow icon="person-circle-outline" title="Linh" detail="Can see 14 shared bites" /><ListRow icon="person-circle-outline" title="An" detail="Can see 14 shared bites" /></Section>
    <TextInput placeholder="Email or invite link" placeholderTextColor={colors.muted} style={styles.input} /><PrimaryButton icon="person-add-outline" label="Invite to circle" />
  </PrototypePage>;
}
const styles = StyleSheet.create({ chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }, input: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 15, borderWidth: 1, color: colors.ink, minHeight: 52, paddingHorizontal: 14 } });

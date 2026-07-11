import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ChoiceChip, PrimaryButton, PrototypePage, Section } from '@/components/prototype-ui';
import { colors, space } from '@/theme';

export default function TasteProfileScreen() {
  const [dislikes, setDislikes] = useState(['Cilantro']);
  const toggle = (item: string) => setDislikes((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  return <PrototypePage title="Taste profile" subtitle="Hard rules protect you. Soft preferences keep suggestions personal without removing surprise.">
    <Section title="Hard exclusions"><Text style={styles.help}>Never include these in Pick for Me results.</Text><View style={styles.chips}>{['Shellfish allergy', 'Peanuts', 'Alcohol', 'Pork'].map((item) => <ChoiceChip key={item} label={item} />)}</View></Section>
    <Section title="Disliked ingredients"><View style={styles.chips}>{['Cilantro', 'Durian', 'Bitter melon', 'Blue cheese'].map((item) => <ChoiceChip key={item} label={item} selected={dislikes.includes(item)} onPress={() => toggle(item)} />)}</View></Section>
    <Section title="Diet and discovery"><View style={styles.chips}><ChoiceChip label="No restriction" selected /><ChoiceChip label="Vegetarian" /><ChoiceChip label="Halal" /></View><Text style={styles.help}>Discovery balance: 70% familiar · 30% surprise</Text></Section>
    <PrimaryButton icon="checkmark" label="Save taste profile" />
  </PrototypePage>;
}
const styles = StyleSheet.create({ chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }, help: { color: colors.muted, fontSize: 12, lineHeight: 18, marginBottom: 10 } });

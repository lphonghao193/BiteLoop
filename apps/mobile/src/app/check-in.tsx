import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { ListRow, PrimaryButton, PrototypePage, Section } from '@/components/prototype-ui';
import { colors } from '@/theme';

export default function CheckInScreen() {
  const router = useRouter();
  return <PrototypePage title="Build your bite" subtitle="The photo is ready. Add enough context to make it useful later.">
    <Section title="1 · Where"><ListRow icon="location-outline" title="Choose restaurant branch" detail="Search nearby or create a missing place" onPress={() => router.push('/restaurant')} /></Section>
    <Section title="2 · What"><TextInput placeholder="Dish or drink name" placeholderTextColor={colors.muted} style={styles.input} /><TextInput keyboardType="numeric" placeholder="Exact menu price (VND)" placeholderTextColor={colors.muted} style={styles.input} /><ListRow icon="pricetags-outline" title="Categories" detail="Cuisine, dish type, flavor, texture" /></Section>
    <Section title="3 · Who sees it"><ListRow icon="lock-closed-outline" title="Only me" detail="Change to selected circles when ready" /><ListRow icon="people-outline" title="Choose circles" detail="Friends, Family, Coworkers" onPress={() => router.push('/circles')} /></Section>
    <PrimaryButton label="Review this dish" onPress={() => router.push('/review')} />
  </PrototypePage>;
}
const styles = StyleSheet.create({ input: { backgroundColor: colors.background, borderColor: colors.border, borderRadius: 14, borderWidth: 1, color: colors.ink, fontSize: 15, marginBottom: 8, minHeight: 50, paddingHorizontal: 14 } });

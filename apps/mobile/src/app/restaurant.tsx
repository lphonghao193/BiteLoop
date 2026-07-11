import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { ListRow, PrimaryButton, PrototypePage } from '@/components/prototype-ui';
import { colors } from '@/theme';

export default function RestaurantScreen() {
  const router = useRouter();
  return <PrototypePage title="Find the exact branch" subtitle="Results will come from the configured Vietnam map provider.">
    <TextInput autoFocus placeholder="Restaurant name or address" placeholderTextColor={colors.muted} style={styles.search} />
    <View style={styles.map}><Text style={styles.mapLabel}>Map prototype</Text><Text style={styles.pin}>●</Text><Text style={styles.mapSub}>Exact branch pins · provider attribution</Text></View>
    <ListRow icon="restaurant-outline" title="Bếp Huế · District 1" detail="123 Nguyễn Huệ · 1.2 km" onPress={() => router.back()} />
    <ListRow icon="restaurant-outline" title="Bếp Huế · District 3" detail="48 Võ Văn Tần · 2.8 km" onPress={() => router.back()} />
    <PrimaryButton icon="add" label="Create a missing branch" secondary />
  </PrototypePage>;
}
const styles = StyleSheet.create({ search: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 16, borderWidth: 1, color: colors.ink, fontSize: 16, minHeight: 54, paddingHorizontal: 15 }, map: { alignItems: 'center', backgroundColor: '#DDE9DE', borderRadius: 22, height: 220, justifyContent: 'center' }, mapLabel: { color: colors.ink, fontSize: 16, fontWeight: '800' }, pin: { color: colors.primary, fontSize: 36, lineHeight: 40 }, mapSub: { color: colors.muted, fontSize: 12 } });

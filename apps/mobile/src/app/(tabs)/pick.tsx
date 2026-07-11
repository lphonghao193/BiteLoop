import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DEFAULT_CURRENCY, priceBandsByCurrency } from '@/features/pricing/price-bands';
import { colors, space } from '@/theme';

export default function PickScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const bands = priceBandsByCurrency[DEFAULT_CURRENCY];

  const toggle = (id: string) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroIcon}><Ionicons color={colors.accent} name="sparkles" size={28} /></View>
        <Text style={styles.title}>What should we eat?</Text>
        <Text style={styles.subtitle}>Set a few boundaries. BiteLoop will choose one strong option and explain why.</Text>
      <View style={styles.section}>
        <View>
          <Text style={styles.label}>BUDGET PER PERSON</Text>
          <Text style={styles.hint}>VND · Select one or more ranges</Text>
        </View>
        <View style={styles.chips}>
          {bands.map((band) => {
            const active = selected.includes(band.id);
            return (
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: active }}
                key={band.id}
                onPress={() => toggle(band.id)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{band.label}</Text>
              </Pressable>
            );
          })}
        </View>
        <Pressable style={styles.primaryButton}>
          <Ionicons color={colors.surface} name="shuffle" size={21} />
          <Text style={styles.primaryButtonText}>Pick for me</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/group-decision')} style={styles.groupButton}>
          <Ionicons color={colors.ink} name="people-outline" size={20} />
          <Text style={styles.groupButtonText}>Decide with a group</Text>
        </Pressable>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { gap: space.md, padding: space.lg, paddingBottom: space.xl },
  heroIcon: { alignItems: 'center', backgroundColor: '#DDEFE8', borderRadius: 25, height: 50, justifyContent: 'center', width: 50 },
  title: { color: colors.ink, fontSize: 31, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22, marginBottom: space.sm },
  section: { gap: space.md },
  label: { color: colors.ink, fontSize: 13, fontWeight: '800', letterSpacing: 1 },
  hint: { color: colors.muted, marginTop: 4 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  chip: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 999, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 11 },
  chipActive: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  chipText: { color: colors.ink, fontWeight: '600' },
  chipTextActive: { color: colors.primary },
  primaryButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 16, flexDirection: 'row', gap: space.sm, justifyContent: 'center', marginTop: space.sm, padding: space.md },
  primaryButtonText: { color: colors.surface, fontSize: 17, fontWeight: '800' },
  groupButton: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 16, borderWidth: 1, flexDirection: 'row', gap: space.sm, justifyContent: 'center', minHeight: 52 },
  groupButtonText: { color: colors.ink, fontSize: 15, fontWeight: '800' },
});

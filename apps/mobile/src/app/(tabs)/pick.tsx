import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/Screen';
import { DEFAULT_CURRENCY, priceBandsByCurrency } from '@/features/pricing/price-bands';
import { colors, space } from '@/theme';

export default function PickScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const bands = priceBandsByCurrency[DEFAULT_CURRENCY];

  const toggle = (id: string) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <Screen title="Pick for me" subtitle="Set the boundaries. BiteLoop handles the indecision.">
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
          <Text style={styles.primaryButtonText}>Surprise me</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { gap: space.md },
  label: { color: colors.ink, fontSize: 13, fontWeight: '800', letterSpacing: 1 },
  hint: { color: colors.muted, marginTop: 4 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  chip: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 999, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 11 },
  chipActive: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  chipText: { color: colors.ink, fontWeight: '600' },
  chipTextActive: { color: colors.primary },
  primaryButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 16, marginTop: space.sm, padding: space.md },
  primaryButtonText: { color: colors.surface, fontSize: 17, fontWeight: '800' },
});


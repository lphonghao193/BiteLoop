import { Ionicons } from '@expo/vector-icons';
import type { PropsWithChildren, ReactNode } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, space } from '@/theme';

export function PrototypePage({ title, subtitle, children, action }: PropsWithChildren<{ title: string; subtitle?: string; action?: ReactNode }>) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
        <View style={styles.headingRow}>
          <View style={styles.headingCopy}>
            <Text style={styles.eyebrow}>BITELOOP PROTOTYPE</Text>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          {action}
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Section({ title, children }: PropsWithChildren<{ title: string }>) {
  return <View style={styles.section}><Text style={styles.sectionTitle}>{title}</Text>{children}</View>;
}

export function ListRow({ icon, title, detail, onPress, danger = false }: { icon: keyof typeof Ionicons.glyphMap; title: string; detail?: string; onPress?: () => void; danger?: boolean }) {
  return (
    <Pressable accessibilityRole={onPress ? 'button' : undefined} onPress={onPress} style={styles.row}>
      <View style={[styles.rowIcon, danger && styles.dangerSoft]}><Ionicons color={danger ? '#B74035' : colors.accent} name={icon} size={20} /></View>
      <View style={styles.rowCopy}><Text style={[styles.rowTitle, danger && styles.danger]}>{title}</Text>{detail ? <Text style={styles.rowDetail}>{detail}</Text> : null}</View>
      {onPress ? <Ionicons color={colors.muted} name="chevron-forward" size={18} /> : null}
    </Pressable>
  );
}

export function ChoiceChip({ label, selected = false, onPress }: { label: string; selected?: boolean; onPress?: () => void }) {
  return <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}><Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text></Pressable>;
}

export function PrimaryButton({ label, icon = 'arrow-forward', onPress, secondary = false }: { label: string; icon?: keyof typeof Ionicons.glyphMap; onPress?: () => void; secondary?: boolean }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={[styles.button, secondary && styles.buttonSecondary]}><Ionicons color={secondary ? colors.ink : '#FFFFFF'} name={icon} size={20} /><Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{label}</Text></Pressable>;
}

export function DataStateCard({ icon, title, detail, actionLabel, onAction }: { icon: keyof typeof Ionicons.glyphMap; title: string; detail: string; actionLabel?: string; onAction?: () => void }) {
  return <View style={styles.stateCard}><View style={styles.stateIcon}><Ionicons color={colors.primary} name={icon} size={25} /></View><Text style={styles.stateTitle}>{title}</Text><Text style={styles.stateDetail}>{detail}</Text>{actionLabel ? <Pressable accessibilityRole="button" onPress={onAction} style={styles.stateAction}><Text style={styles.stateActionText}>{actionLabel}</Text></Pressable> : null}</View>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  page: { gap: space.lg, padding: space.lg, paddingBottom: 48 },
  headingRow: { alignItems: 'flex-start', flexDirection: 'row', gap: space.md },
  headingCopy: { flex: 1 },
  eyebrow: { color: colors.primary, fontSize: 11, fontWeight: '900', letterSpacing: 1.6 },
  title: { color: colors.ink, fontSize: 30, fontWeight: '800', marginTop: 5 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: 7 },
  section: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 22, borderWidth: 1, gap: 2, overflow: 'hidden', padding: space.md },
  sectionTitle: { color: colors.muted, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 8, textTransform: 'uppercase' },
  row: { alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: 12, minHeight: 62, paddingVertical: 8 },
  rowIcon: { alignItems: 'center', backgroundColor: '#DDEFE8', borderRadius: 17, height: 34, justifyContent: 'center', width: 34 },
  rowCopy: { flex: 1 },
  rowTitle: { color: colors.ink, fontSize: 15, fontWeight: '700' },
  rowDetail: { color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: 2 },
  danger: { color: '#B74035' },
  dangerSoft: { backgroundColor: '#FBE2DE' },
  chip: { backgroundColor: colors.background, borderColor: colors.border, borderRadius: 999, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 10 },
  chipSelected: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  chipText: { color: colors.ink, fontSize: 13, fontWeight: '700' },
  chipTextSelected: { color: colors.primary },
  button: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 17, flexDirection: 'row', gap: 8, justifyContent: 'center', minHeight: 54, paddingHorizontal: 18 },
  buttonSecondary: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  buttonTextSecondary: { color: colors.ink },
  stateCard: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 22, borderWidth: 1, gap: 8, padding: space.lg },
  stateIcon: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 24, height: 48, justifyContent: 'center', width: 48 },
  stateTitle: { color: colors.ink, fontSize: 17, fontWeight: '800', textAlign: 'center' },
  stateDetail: { color: colors.muted, fontSize: 13, lineHeight: 19, textAlign: 'center' },
  stateAction: { borderColor: colors.primary, borderRadius: 999, borderWidth: 1, marginTop: 4, paddingHorizontal: 15, paddingVertical: 9 },
  stateActionText: { color: colors.primary, fontSize: 13, fontWeight: '800' },
});

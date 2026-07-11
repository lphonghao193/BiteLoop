import { StyleSheet, Text, View } from 'react-native';

import { colors, space } from '@/theme';

type FeatureCardProps = {
  title: string;
  body: string;
  badge?: string;
};

export function FeatureCard({ title, body, badge }: FeatureCardProps) {
  return (
    <View style={styles.card}>
      {badge ? <Text style={styles.badge}>{badge}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: space.xs,
    padding: space.md,
  },
  badge: { color: colors.accent, fontSize: 12, fontWeight: '800', textTransform: 'uppercase' },
  title: { color: colors.ink, fontSize: 18, fontWeight: '700' },
  body: { color: colors.muted, fontSize: 15, lineHeight: 21 },
});


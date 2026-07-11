import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, space } from '@/theme';

const moments = [
  {
    author: 'Minh',
    dish: 'Bún bò Huế',
    place: 'Bếp Huế · 12 min ago',
    note: 'Strong flavor, generous portion. Would order again.',
    color: '#E9B89B',
  },
  {
    author: 'Linh',
    dish: 'Cà phê muối',
    place: 'Góc Nhỏ Coffee · 38 min ago',
    note: 'Creamy and balanced—not too sweet.',
    color: '#A9C5B5',
  },
];

export default function LoopScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>YOUR PEOPLE</Text>
            <Text style={styles.title}>The Loop</Text>
          </View>
          <Pressable onPress={() => router.push('/profile')} style={styles.journalButton}>
            <Ionicons color={colors.ink} name="bookmark-outline" size={19} />
            <Text style={styles.journalLabel}>My bites</Text>
          </Pressable>
        </View>

        <Text style={styles.subtitle}>Food moments from friends you trust—not a popularity contest.</Text>

        {moments.map((moment) => (
          <Pressable key={`${moment.author}-${moment.dish}`} onPress={() => router.push('/dish')} style={styles.card}>
            <View style={[styles.photoPlaceholder, { backgroundColor: moment.color }]}>
              <Ionicons color="rgba(42,33,28,0.45)" name="restaurant" size={44} />
            </View>
            <View style={styles.cardBody}>
              <View style={styles.metaRow}>
                <View style={styles.authorBadge}><Text style={styles.authorInitial}>{moment.author[0]}</Text></View>
                <Text style={styles.author}>{moment.author}</Text>
                <Text style={styles.place}>{moment.place}</Text>
              </View>
              <Text style={styles.dish}>{moment.dish}</Text>
              <Text style={styles.note}>{moment.note}</Text>
              <View style={styles.actions}>
                <View style={styles.action}><Ionicons color={colors.primary} name="heart-outline" size={19} /><Text style={styles.actionText}>Want this</Text></View>
                <Ionicons color={colors.muted} name="paper-plane-outline" size={19} />
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { gap: space.md, padding: space.lg, paddingBottom: space.xl },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '900', letterSpacing: 1.6 },
  title: { color: colors.ink, fontSize: 32, fontWeight: '800', marginTop: 3 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22, marginBottom: space.sm },
  journalButton: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 18, borderWidth: 1, flexDirection: 'row', gap: 6, paddingHorizontal: 12, paddingVertical: 10 },
  journalLabel: { color: colors.ink, fontSize: 13, fontWeight: '700' },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 24, borderWidth: 1, overflow: 'hidden' },
  photoPlaceholder: { alignItems: 'center', aspectRatio: 16 / 10, justifyContent: 'center', width: '100%' },
  cardBody: { gap: 7, padding: space.md },
  metaRow: { alignItems: 'center', flexDirection: 'row', gap: 7 },
  authorBadge: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 13, height: 26, justifyContent: 'center', width: 26 },
  authorInitial: { color: colors.primary, fontSize: 12, fontWeight: '900' },
  author: { color: colors.ink, fontSize: 13, fontWeight: '800' },
  place: { color: colors.muted, flex: 1, fontSize: 11, textAlign: 'right' },
  dish: { color: colors.ink, fontSize: 22, fontWeight: '800', marginTop: 3 },
  note: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  actions: { alignItems: 'center', borderTopColor: colors.border, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingTop: 12 },
  action: { alignItems: 'center', flexDirection: 'row', gap: 6 },
  actionText: { color: colors.primary, fontSize: 13, fontWeight: '800' },
});

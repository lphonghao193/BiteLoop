import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ChoiceChip, PrototypePage } from '@/components/prototype-ui';
import { colors, space } from '@/theme';

const entries = [
  { dish: 'Bún bò Huế', place: 'Bếp Huế · District 1', date: 'Today', again: true },
  { dish: 'Cà phê muối', place: 'Góc Nhỏ Coffee', date: 'Yesterday', again: true },
  { dish: 'Mì trộn bò', place: 'Hẻm Kitchen', date: '4 days ago', again: false },
];

export default function JournalScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const visible = filter === 'Order again' ? entries.filter((item) => item.again) : entries;
  return <PrototypePage title="Food journal" subtitle="Searchable memories that become future recommendations.">
    <View style={styles.chips}>{['All', 'Order again', 'Private', 'Shared'].map((item) => <ChoiceChip key={item} label={item} selected={filter === item} onPress={() => setFilter(item)} />)}</View>
    {visible.length ? visible.map((entry) => <Pressable key={entry.dish} onPress={() => router.push('/dish')} style={styles.entry}><View style={styles.thumb}><Ionicons color={colors.primary} name="restaurant" size={25} /></View><View style={styles.copy}><Text style={styles.dish}>{entry.dish}</Text><Text style={styles.place}>{entry.place}</Text><Text style={styles.date}>{entry.date}</Text></View>{entry.again ? <Ionicons color={colors.accent} name="checkmark-circle" size={22} /> : null}</Pressable>) : <View style={styles.empty}><Ionicons color={colors.muted} name="search-outline" size={34} /><Text style={styles.emptyTitle}>Nothing matches yet</Text><Text style={styles.emptyBody}>Try another filter or capture a new bite.</Text></View>}
  </PrototypePage>;
}
const styles = StyleSheet.create({ chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }, entry: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 19, borderWidth: 1, flexDirection: 'row', gap: 12, padding: 12 }, thumb: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 14, height: 54, justifyContent: 'center', width: 54 }, copy: { flex: 1 }, dish: { color: colors.ink, fontSize: 16, fontWeight: '800' }, place: { color: colors.muted, fontSize: 12, marginTop: 3 }, date: { color: colors.accent, fontSize: 11, fontWeight: '700', marginTop: 5 }, empty: { alignItems: 'center', gap: 7, paddingVertical: 48 }, emptyTitle: { color: colors.ink, fontSize: 18, fontWeight: '800' }, emptyBody: { color: colors.muted, fontSize: 13 } });

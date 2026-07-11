import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ListRow, PrimaryButton, PrototypePage, Section } from '@/components/prototype-ui';
import { colors, space } from '@/theme';

export default function DishScreen() {
  const router = useRouter();
  return <PrototypePage title="Bún bò Huế" subtitle="Bếp Huế · District 1"><View style={styles.photo}><Ionicons color="rgba(42,33,28,0.4)" name="restaurant" size={52} /></View><View style={styles.summary}><Text style={styles.percent}>82%</Text><View style={styles.summaryCopy}><Text style={styles.summaryTitle}>would order again</Text><Text style={styles.summaryBody}>Memorable flavor and generous portions; some friends consider it expensive.</Text></View></View><Section title="What people experienced"><ListRow icon="flame-outline" title="Strong flavor" detail="6 of 8 check-ins" /><ListRow icon="resize-outline" title="Generous portion" detail="Usually enough for one hungry person" /><ListRow icon="cash-outline" title="100k–200k VND" detail="Exact prices last confirmed this week" /></Section><PrimaryButton icon="navigate-outline" label="Open directions" /><PrimaryButton icon="camera-outline" label="Check in this dish" secondary onPress={() => router.replace('/(tabs)')} /></PrototypePage>;
}
const styles = StyleSheet.create({ photo: { alignItems: 'center', backgroundColor: '#E9B89B', borderRadius: 24, height: 240, justifyContent: 'center' }, summary: { alignItems: 'center', backgroundColor: colors.ink, borderRadius: 22, flexDirection: 'row', gap: space.md, padding: space.md }, percent: { color: '#FFF', fontSize: 34, fontWeight: '900' }, summaryCopy: { flex: 1 }, summaryTitle: { color: '#FFF', fontSize: 16, fontWeight: '800' }, summaryBody: { color: '#D9CFC9', fontSize: 12, lineHeight: 18, marginTop: 3 } });

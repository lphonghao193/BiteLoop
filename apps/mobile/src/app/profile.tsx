import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ListRow, PrototypePage, Section } from '@/components/prototype-ui';
import { colors } from '@/theme';

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <PrototypePage title="Your food life" subtitle="Memories, people, and preferences in one place.">
      <View style={styles.identity}><View style={styles.avatar}><Text style={styles.initial}>Y</Text></View><View><Text style={styles.name}>Your profile</Text><Text style={styles.handle}>12 bites · 4 cuisines explored</Text></View></View>
      <Section title="Your library">
        <ListRow icon="time-outline" title="Food journal" detail="Every private and shared check-in" />
        <ListRow icon="heart-outline" title="Would order again" detail="7 saved dishes" />
        <ListRow icon="map-outline" title="Food map" detail="9 restaurant branches" />
        <ListRow icon="ribbon-outline" title="Taste passport" detail="Vietnamese, Korean, Italian, Thai" />
      </Section>
      <Section title="People and preferences">
        <ListRow icon="people-outline" title="Circles" detail="Friends, Family, Coworkers" onPress={() => router.push('/circles')} />
        <ListRow icon="options-outline" title="Taste profile" detail="Dislikes, allergens, and dietary needs" />
        <ListRow icon="settings-outline" title="Settings" detail="Currency, privacy, notifications" onPress={() => router.push('/settings')} />
      </Section>
      <ListRow danger icon="log-out-outline" title="Sign out" onPress={() => router.push('/login')} />
    </PrototypePage>
  );
}
const styles = StyleSheet.create({ identity: { alignItems: 'center', flexDirection: 'row', gap: 14 }, avatar: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 32, height: 64, justifyContent: 'center', width: 64 }, initial: { color: '#FFF', fontSize: 24, fontWeight: '900' }, name: { color: colors.ink, fontSize: 20, fontWeight: '800' }, handle: { color: colors.muted, fontSize: 13, marginTop: 3 } });

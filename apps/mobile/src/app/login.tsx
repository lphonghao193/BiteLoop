import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { PrimaryButton, PrototypePage } from '@/components/prototype-ui';
import { colors, space } from '@/theme';

export default function LoginScreen() {
  const router = useRouter();
  return (
    <PrototypePage title="Keep your food memories close" subtitle="Sign in to share privately, save favorites, and make better food decisions.">
      <View style={styles.mark}><Ionicons color={colors.primary} name="restaurant" size={38} /></View>
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text><TextInput autoCapitalize="none" keyboardType="email-address" placeholder="you@example.com" placeholderTextColor={colors.muted} style={styles.input} />
        <Text style={styles.label}>Password</Text><TextInput placeholder="At least 8 characters" placeholderTextColor={colors.muted} secureTextEntry style={styles.input} />
        <PrimaryButton label="Continue with email" onPress={() => router.replace('/(tabs)')} />
        <PrimaryButton icon="logo-apple" label="Continue with Apple" onPress={() => router.replace('/(tabs)')} secondary />
        <PrimaryButton icon="logo-google" label="Continue with Google" onPress={() => router.replace('/(tabs)')} secondary />
      </View>
      <Text style={styles.legal}>Prototype only — authentication buttons will connect to Supabase Auth in Phase 1.</Text>
    </PrototypePage>
  );
}

const styles = StyleSheet.create({ mark: { alignItems: 'center', alignSelf: 'center', backgroundColor: colors.primarySoft, borderRadius: 42, height: 84, justifyContent: 'center', width: 84 }, form: { gap: space.sm }, label: { color: colors.ink, fontSize: 13, fontWeight: '800', marginTop: 4 }, input: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 15, borderWidth: 1, color: colors.ink, fontSize: 16, minHeight: 52, paddingHorizontal: 15 }, legal: { color: colors.muted, fontSize: 12, lineHeight: 18, textAlign: 'center' } });

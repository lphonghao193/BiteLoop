import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, space } from '@/theme';

export default function CaptureScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Camera access needed',
        'Allow camera access to capture a food moment. You can change this later in iOS Settings.',
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.85,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0]?.uri ?? null);
    }
  };

  const choosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.85,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0]?.uri ?? null);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>BITELOOP</Text>
            <Text style={styles.greeting}>What are you having?</Text>
          </View>
          <Pressable accessibilityLabel="Open your profile" style={styles.avatar}>
            <Ionicons color={colors.ink} name="person-outline" size={20} />
          </Pressable>
        </View>

        <View style={styles.cameraCard}>
          {photoUri ? (
            <Image accessibilityLabel="Selected food photo" source={{ uri: photoUri }} style={styles.preview} />
          ) : (
            <View style={styles.emptyCamera}>
              <View style={styles.cameraIcon}>
                <Ionicons color={colors.primary} name="camera" size={38} />
              </View>
              <Text style={styles.cameraTitle}>Capture the bite</Text>
              <Text style={styles.cameraBody}>
                Start with the photo. Add the restaurant, dish, and quick review next.
              </Text>
            </View>
          )}

          <Pressable accessibilityRole="button" onPress={takePhoto} style={styles.shutterButton}>
            <Ionicons color="#FFFFFF" name="camera" size={23} />
            <Text style={styles.shutterText}>{photoUri ? 'Retake photo' : 'Take photo'}</Text>
          </Pressable>

          <Pressable accessibilityRole="button" onPress={choosePhoto} style={styles.libraryButton}>
            <Ionicons color={colors.ink} name="images-outline" size={20} />
            <Text style={styles.libraryText}>Choose from library</Text>
          </Pressable>
        </View>

        {photoUri ? (
          <View style={styles.nextCard}>
            <View style={styles.nextCopy}>
              <Text style={styles.nextTitle}>Photo ready</Text>
              <Text style={styles.nextBody}>Next, attach the exact restaurant and menu items.</Text>
            </View>
            <Pressable accessibilityRole="button" style={styles.nextButton}>
              <Ionicons color="#FFFFFF" name="arrow-forward" size={21} />
            </Pressable>
          </View>
        ) : (
          <View style={styles.promptRow}>
            <Ionicons color={colors.accent} name="lock-closed-outline" size={18} />
            <Text style={styles.promptText}>Private by default. You choose who sees each bite.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: space.lg, paddingBottom: space.xl, gap: space.lg },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  brand: { color: colors.primary, fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  greeting: { color: colors.ink, fontSize: 28, fontWeight: '800', marginTop: 5 },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  cameraCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 28,
    borderWidth: 1,
    gap: space.sm,
    overflow: 'hidden',
    padding: space.md,
  },
  emptyCamera: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: 20,
    justifyContent: 'center',
    minHeight: 330,
    padding: space.xl,
  },
  cameraIcon: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 36,
    height: 72,
    justifyContent: 'center',
    marginBottom: space.md,
    width: 72,
  },
  cameraTitle: { color: colors.ink, fontSize: 24, fontWeight: '800' },
  cameraBody: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: space.sm,
    maxWidth: 270,
    textAlign: 'center',
  },
  preview: { aspectRatio: 3 / 4, borderRadius: 20, width: '100%' },
  shutterButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 18,
    flexDirection: 'row',
    gap: space.sm,
    justifyContent: 'center',
    marginTop: 4,
    minHeight: 56,
  },
  shutterText: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  libraryButton: {
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    gap: space.sm,
    justifyContent: 'center',
    minHeight: 50,
  },
  libraryText: { color: colors.ink, fontSize: 15, fontWeight: '700' },
  promptRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: space.sm,
    justifyContent: 'center',
    paddingHorizontal: space.md,
  },
  promptText: { color: colors.muted, flex: 1, fontSize: 13, lineHeight: 19 },
  nextCard: {
    alignItems: 'center',
    backgroundColor: colors.ink,
    borderRadius: 22,
    flexDirection: 'row',
    gap: space.md,
    padding: space.md,
  },
  nextCopy: { flex: 1 },
  nextTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  nextBody: { color: '#D9CFC9', fontSize: 13, lineHeight: 18, marginTop: 3 },
  nextButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
});


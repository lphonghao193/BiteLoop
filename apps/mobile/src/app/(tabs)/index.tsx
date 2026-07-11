import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, space } from '@/theme';

type ZoomPreset = 0.5 | 1 | 2 | 4;

export default function CaptureScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [zoomPreset, setZoomPreset] = useState<ZoomPreset>(1);
  const [lenses, setLenses] = useState<string[]>([]);
  const [selectedLens, setSelectedLens] = useState<string | undefined>();
  const [flash, setFlash] = useState<'off' | 'on'>('off');

  const openCamera = async () => {
    const status = permission?.granted ? permission : await requestPermission();
    if (!status.granted) {
      Alert.alert('Camera access needed', 'Allow camera access to take food photos inside BiteLoop.');
      return;
    }
    setPhotoUri(null);
    setCameraOpen(true);
  };

  const selectZoom = (preset: ZoomPreset) => {
    const ultraWide = lenses.find((lens) => lens.toLowerCase().includes('ultrawide'));
    const wide = lenses.find((lens) => lens.toLowerCase().includes('wideangle'));
    const telephoto = lenses.find((lens) => lens.toLowerCase().includes('telephoto'));

    if (preset === 0.5 && !ultraWide) {
      Alert.alert('0.5× is unavailable', 'This iPhone did not report an ultra-wide lens to BiteLoop.');
      return;
    }

    setZoomPreset(preset);
    if (preset === 0.5) setSelectedLens(ultraWide);
    else if (preset >= 2 && telephoto) setSelectedLens(telephoto);
    else setSelectedLens(wide);
  };

  const normalizedZoom = zoomPreset === 4 ? 0.55 : zoomPreset === 2 && !selectedLens?.toLowerCase().includes('telephoto') ? 0.2 : 0;

  const capture = async () => {
    const picture = await cameraRef.current?.takePictureAsync({ quality: 0.85, shutterSound: true });
    if (picture?.uri) {
      setPhotoUri(picture.uri);
      setCameraOpen(false);
    }
  };

  const choosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.85 });
    if (!result.canceled) setPhotoUri(result.assets[0]?.uri ?? null);
  };

  if (cameraOpen) {
    return (
      <View style={styles.cameraScreen}>
        <CameraView
          autofocus="on"
          facing="back"
          flash={flash}
          onAvailableLensesChanged={(event) => setLenses(event.lenses)}
          ref={cameraRef}
          selectedLens={selectedLens}
          style={StyleSheet.absoluteFill}
          zoom={normalizedZoom}
        />
        <SafeAreaView style={styles.cameraOverlay}>
          <View style={styles.cameraTopBar}>
            <Pressable accessibilityLabel="Close camera" onPress={() => setCameraOpen(false)} style={styles.darkControl}><Ionicons color="#FFF" name="close" size={24} /></Pressable>
            <Text style={styles.cameraPrompt}>Center the dish</Text>
            <Pressable accessibilityLabel="Toggle flash" onPress={() => setFlash((value) => value === 'off' ? 'on' : 'off')} style={styles.darkControl}><Ionicons color="#FFF" name={flash === 'on' ? 'flash' : 'flash-off'} size={21} /></Pressable>
          </View>
          <View style={styles.cameraBottom}>
            <View style={styles.zoomRow}>
              {([0.5, 1, 2, 4] as ZoomPreset[]).map((preset) => {
                const disabled = preset === 0.5 && lenses.length > 0 && !lenses.some((lens) => lens.toLowerCase().includes('ultrawide'));
                return <Pressable key={preset} onPress={() => selectZoom(preset)} style={[styles.zoomButton, zoomPreset === preset && styles.zoomButtonActive, disabled && styles.zoomDisabled]}><Text style={[styles.zoomText, zoomPreset === preset && styles.zoomTextActive]}>{preset}×</Text></Pressable>;
              })}
            </View>
            <View style={styles.shutterRow}>
              <Pressable accessibilityLabel="Choose from photo library" onPress={choosePhoto} style={styles.sideControl}><Ionicons color="#FFF" name="images-outline" size={24} /></Pressable>
              <Pressable accessibilityLabel="Take photo" onPress={capture} style={styles.shutter}><View style={styles.shutterInner} /></Pressable>
              <View style={styles.sideControl}><Ionicons color="#FFF" name="restaurant-outline" size={23} /></View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}><View><Text style={styles.brand}>BITELOOP</Text><Text style={styles.greeting}>What are you having?</Text></View><Pressable accessibilityLabel="Open your profile" onPress={() => router.push('/profile')} style={styles.avatar}><Ionicons color={colors.ink} name="person-outline" size={20} /></Pressable></View>
        <View style={styles.cameraCard}>
          {photoUri ? <Image accessibilityLabel="Selected food photo" source={{ uri: photoUri }} style={styles.preview} /> : <View style={styles.emptyCamera}><View style={styles.cameraIcon}><Ionicons color={colors.primary} name="camera" size={38} /></View><Text style={styles.cameraTitle}>Capture the bite</Text><Text style={styles.cameraBody}>Use BiteLoop's camera, then add the exact dish and place.</Text></View>}
          <Pressable onPress={openCamera} style={styles.primary}><Ionicons color="#FFF" name="camera" size={23} /><Text style={styles.primaryText}>{photoUri ? 'Retake in BiteLoop' : 'Open BiteLoop camera'}</Text></Pressable>
          <Pressable onPress={choosePhoto} style={styles.secondary}><Ionicons color={colors.ink} name="images-outline" size={20} /><Text style={styles.secondaryText}>Choose from library</Text></Pressable>
        </View>
        {photoUri ? <View style={styles.nextCard}><View style={styles.nextCopy}><Text style={styles.nextTitle}>Photo ready</Text><Text style={styles.nextBody}>Attach the restaurant, menu items, review, and audience.</Text></View><Pressable onPress={() => router.push('/check-in')} style={styles.nextButton}><Ionicons color="#FFF" name="arrow-forward" size={21} /></Pressable></View> : <View style={styles.promptRow}><Ionicons color={colors.accent} name="lock-closed-outline" size={18} /><Text style={styles.promptText}>Private by default. You choose who sees each bite.</Text></View>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background }, content: { padding: space.lg, paddingBottom: space.xl, gap: space.lg },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, brand: { color: colors.primary, fontSize: 12, fontWeight: '900', letterSpacing: 2 }, greeting: { color: colors.ink, fontSize: 28, fontWeight: '800', marginTop: 5 },
  avatar: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 22, borderWidth: 1, height: 44, justifyContent: 'center', width: 44 },
  cameraCard: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 28, borderWidth: 1, gap: space.sm, overflow: 'hidden', padding: space.md },
  emptyCamera: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 20, justifyContent: 'center', minHeight: 330, padding: space.xl }, cameraIcon: { alignItems: 'center', backgroundColor: colors.surface, borderRadius: 36, height: 72, justifyContent: 'center', marginBottom: space.md, width: 72 },
  cameraTitle: { color: colors.ink, fontSize: 24, fontWeight: '800' }, cameraBody: { color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: space.sm, maxWidth: 270, textAlign: 'center' }, preview: { aspectRatio: 3 / 4, borderRadius: 20, width: '100%' },
  primary: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 18, flexDirection: 'row', gap: space.sm, justifyContent: 'center', minHeight: 56 }, primaryText: { color: '#FFF', fontSize: 17, fontWeight: '800' }, secondary: { alignItems: 'center', flexDirection: 'row', gap: space.sm, justifyContent: 'center', minHeight: 50 }, secondaryText: { color: colors.ink, fontSize: 15, fontWeight: '700' },
  promptRow: { alignItems: 'center', flexDirection: 'row', gap: space.sm, justifyContent: 'center', paddingHorizontal: space.md }, promptText: { color: colors.muted, flex: 1, fontSize: 13, lineHeight: 19 },
  nextCard: { alignItems: 'center', backgroundColor: colors.ink, borderRadius: 22, flexDirection: 'row', gap: space.md, padding: space.md }, nextCopy: { flex: 1 }, nextTitle: { color: '#FFF', fontSize: 17, fontWeight: '800' }, nextBody: { color: '#D9CFC9', fontSize: 13, lineHeight: 18, marginTop: 3 }, nextButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 22, height: 44, justifyContent: 'center', width: 44 },
  cameraScreen: { backgroundColor: '#000', flex: 1 }, cameraOverlay: { flex: 1, justifyContent: 'space-between' }, cameraTopBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: space.md }, cameraPrompt: { color: '#FFF', fontSize: 15, fontWeight: '800', textShadowColor: '#000', textShadowRadius: 6 }, darkControl: { alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.48)', borderRadius: 22, height: 44, justifyContent: 'center', width: 44 },
  cameraBottom: { backgroundColor: 'rgba(0,0,0,0.42)', gap: 22, paddingBottom: 24, paddingHorizontal: space.lg, paddingTop: 16 }, zoomRow: { alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.48)', borderRadius: 22, flexDirection: 'row', gap: 5, padding: 4 }, zoomButton: { alignItems: 'center', borderRadius: 18, height: 36, justifyContent: 'center', width: 45 }, zoomButtonActive: { backgroundColor: '#FFF' }, zoomDisabled: { opacity: 0.35 }, zoomText: { color: '#FFF', fontSize: 13, fontWeight: '800' }, zoomTextActive: { color: colors.ink },
  shutterRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }, shutter: { alignItems: 'center', borderColor: '#FFF', borderRadius: 39, borderWidth: 4, height: 78, justifyContent: 'center', width: 78 }, shutterInner: { backgroundColor: '#FFF', borderRadius: 31, height: 62, width: 62 }, sideControl: { alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.52)', borderRadius: 24, height: 48, justifyContent: 'center', width: 48 },
});

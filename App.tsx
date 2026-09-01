import {
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
  NotoSansKR_900Black,
  useFonts,
} from '@expo-google-fonts/noto-sans-kr';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSansKR_400Regular,
    NotoSansKR_500Medium,
    NotoSansKR_700Bold,
    NotoSansKR_900Black,
  });

  if (!fontsLoaded) {
    return <View style={styles.loading} />;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.outer}>
        <View style={styles.phoneFrame}>
          <NavigationContainer>
            <StatusBar style="dark" />
            <RootNavigator />
          </NavigationContainer>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  outer: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#EDEEF3' : colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneFrame:
    Platform.OS === 'web'
      ? {
          width: 402,
          height: 874,
          maxHeight: '95vh' as any,
          borderRadius: 40,
          overflow: 'hidden',
          borderWidth: 8,
          borderColor: '#111',
          backgroundColor: colors.bg,
        }
      : { flex: 1, width: '100%' },
});

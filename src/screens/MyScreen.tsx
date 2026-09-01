import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../theme';

export function MyScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={56} color={colors.textTertiary} />
      <Text style={styles.text}>준비 중인 화면이에요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.base,
    color: colors.textTertiary,
  },
});

import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../theme';

type Day = { label: string; date: string; done: boolean };

export function WeekDots({ days }: { days: Day[] }) {
  return (
    <View style={styles.row}>
      {days.map((day, i) => (
        <View key={i} style={styles.item}>
          <View style={[styles.dot, day.done && styles.dotDone]} />
          <Text style={styles.label}>{day.label}</Text>
          <Text style={styles.date}>{day.date}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  dotDone: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  date: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: colors.textTertiary,
  },
});

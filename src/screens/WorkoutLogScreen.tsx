import { Ionicons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { useWorkoutStore } from '../store/useWorkoutStore';
import { colors, fontFamily, fontSize, radius, spacing } from '../theme';
import type { RootStackParamList, TabParamList } from '../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'WorkoutLog'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function WorkoutLogScreen({ navigation }: Props) {
  const exercises = useWorkoutStore((s) => s.exercises);
  const toggleSetDone = useWorkoutStore((s) => s.toggleSetDone);
  const addSet = useWorkoutStore((s) => s.addSet);

  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.navigate('Home')}
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>오늘의 운동</Text>
        <View style={{ width: 26 }} />
      </View>

      {exercises.map((exercise) => (
        <Card key={exercise.id}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.th, styles.colSet]}>SET</Text>
            <Text style={[styles.th, styles.colKg]}>KG</Text>
            <Text style={[styles.th, styles.colReps]}>REPS</Text>
            <View style={styles.colCheck} />
          </View>

          {exercise.sets.map((s) => (
            <View key={s.id} style={styles.tableRow}>
              <Text style={[styles.td, styles.colSet]}>{s.set}</Text>
              <Text style={[styles.td, styles.colKg]}>{s.kg}</Text>
              <Text style={[styles.td, styles.colReps]}>{s.reps}</Text>
              <View style={styles.colCheck}>
                <Pressable
                  onPress={() => toggleSetDone(exercise.id, s.id)}
                  style={[styles.checkCircle, s.done && styles.checkCircleDone]}
                  hitSlop={6}
                >
                  {s.done && <Ionicons name="checkmark" size={14} color="#fff" />}
                </Pressable>
              </View>
            </View>
          ))}

          <Pressable
            style={styles.addSetButton}
            onPress={() => addSet(exercise.id)}
          >
            <Ionicons name="add" size={16} color={colors.primary} />
            <Text style={styles.addSetLabel}>세트 추가</Text>
          </Pressable>
        </Card>
      ))}

      <PrimaryButton
        label="운동 완료"
        onPress={() => navigation.navigate('Complete')}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  exerciseName: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  th: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
    color: colors.textTertiary,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  td: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  colSet: { width: 44 },
  colKg: { width: 60 },
  colReps: { flex: 1 },
  colCheck: { width: 32, alignItems: 'flex-end' },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  addSetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.primarySoft,
    backgroundColor: colors.primarySoft,
  },
  addSetLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
});

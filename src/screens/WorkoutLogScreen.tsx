import { Ionicons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
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
  const addExercise = useWorkoutStore((s) => s.addExercise);
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [exerciseName, setExerciseName] = useState('');

  const handleAddExercise = () => {
    const name = exerciseName.trim();
    if (!name || exercises.some((exercise) => exercise.name === name)) return;
    addExercise(name);
    setExerciseName('');
    setIsAddingExercise(false);
  };

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

      {isAddingExercise ? (
        <View style={styles.addExercisePanel}>
          <Text style={styles.addExerciseTitle}>새 종목 이름</Text>
          <TextInput
            autoFocus
            value={exerciseName}
            onChangeText={setExerciseName}
            onSubmitEditing={handleAddExercise}
            placeholder="예: 덤벨 숄더프레스"
            placeholderTextColor={colors.textTertiary}
            returnKeyType="done"
            style={styles.exerciseInput}
          />
          <View style={styles.addExerciseActions}>
            <Pressable
              onPress={() => {
                setExerciseName('');
                setIsAddingExercise(false);
              }}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelLabel}>취소</Text>
            </Pressable>
            <Pressable onPress={handleAddExercise} style={styles.confirmButton}>
              <Text style={styles.confirmLabel}>추가</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Pressable
          onPress={() => setIsAddingExercise(true)}
          style={styles.addExerciseButton}
        >
          <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
          <Text style={styles.addExerciseLabel}>새 종목 추가</Text>
        </Pressable>
      )}

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
  addExerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
  },
  addExerciseLabel: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.base,
    color: colors.primary,
  },
  addExercisePanel: {
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  addExerciseTitle: {
    marginBottom: spacing.sm,
    fontFamily: fontFamily.bold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  exerciseInput: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  addExerciseActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  cancelButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  cancelLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  confirmButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
  },
  confirmLabel: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.sm,
    color: '#FFFFFF',
  },
});

import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { useWorkoutStore } from '../store/useWorkoutStore';
import { colors, fontFamily, fontSize, radius, spacing } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Complete'>;

const EMOJIS = ['😞', '😕', '😐', '🙂', '😄'];
const ELAPSED_MINUTES = 52;

export function CompleteScreen({ navigation }: Props) {
  const exercises = useWorkoutStore((s) => s.exercises);
  const condition = useWorkoutStore((s) => s.condition);
  const memo = useWorkoutStore((s) => s.memo);
  const setCondition = useWorkoutStore((s) => s.setCondition);
  const setMemo = useWorkoutStore((s) => s.setMemo);
  const resetWorkout = useWorkoutStore((s) => s.resetWorkout);

  const summary = useMemo(() => {
    const doneSets = exercises.flatMap((e) => e.sets.filter((s) => s.done));
    const totalVolume = doneSets.reduce((sum, s) => sum + s.kg * s.reps, 0);
    return {
      totalVolume,
      exerciseCount: exercises.length,
      doneSetCount: doneSets.length,
      calories: Math.round(totalVolume * 0.06),
    };
  }, [exercises]);

  const handleSave = () => {
    resetWorkout();
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  return (
    <ScreenContainer>
      <View style={styles.badgeWrap}>
        <View style={styles.badge}>
          <Ionicons name="checkmark" size={40} color="#fff" />
        </View>
      </View>

      <View style={styles.headline}>
        <Text style={styles.title}>운동 완료!</Text>
        <Text style={styles.subtitle}>{ELAPSED_MINUTES}분 운동</Text>
      </View>

      <Card style={styles.volumeCard}>
        <Text style={styles.volumeLabel}>총 운동량</Text>
        <Text style={styles.volumeValue}>
          {summary.totalVolume.toLocaleString()} kg
        </Text>
      </Card>

      <Card>
        <StatRow label="운동 종목" value={`${summary.exerciseCount}개`} />
        <StatRow label="완료 세트" value={`${summary.doneSetCount}세트`} />
        <StatRow label="예상 칼로리" value={`${summary.calories}kcal`} last />
      </Card>

      <View>
        <Text style={styles.sectionTitle}>오늘 컨디션은 어땠나요?</Text>
        <View style={styles.emojiRow}>
          {EMOJIS.map((emoji, i) => (
            <Pressable
              key={i}
              onPress={() => setCondition(i)}
              style={[styles.emojiButton, condition === i && styles.emojiButtonActive]}
            >
              <Text style={styles.emoji}>{emoji}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>운동 메모</Text>
        <TextInput
          style={styles.memoInput}
          placeholder="오늘 운동에 대해 남겨보세요"
          placeholderTextColor={colors.textTertiary}
          value={memo}
          onChangeText={setMemo}
          multiline
        />
      </View>

      <PrimaryButton label="기록 저장" onPress={handleSave} />
    </ScreenContainer>
  );
}

function StatRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.statRow, !last && styles.statRowBorder]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeWrap: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamily.black,
    fontSize: fontSize.xxl,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginTop: 4,
  },
  volumeCard: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderColor: colors.primarySoft,
  },
  volumeLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.primaryDark,
  },
  volumeValue: {
    fontFamily: fontFamily.black,
    fontSize: fontSize.display,
    color: colors.primaryDark,
    marginTop: 4,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm + 2,
  },
  statRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statLabel: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.base,
    color: colors.textSecondary,
  },
  statValue: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emojiButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emojiButtonActive: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  emoji: {
    fontSize: 22,
  },
  memoInput: {
    minHeight: 80,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    textAlignVertical: 'top',
  },
});

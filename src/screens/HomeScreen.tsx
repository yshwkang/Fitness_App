import { Ionicons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { WeekDots } from '../components/WeekDots';
import { recentRecords, todayWorkout, weeklyProgress } from '../data/mockData';
import { colors, fontFamily, fontSize, radius, spacing } from '../theme';
import type { TabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<TabParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        <Ionicons name="menu" size={26} color={colors.textPrimary} />
        <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
      </View>

      <View>
        <Text style={styles.greeting}>안녕하세요!</Text>
        <Text style={styles.greetingSub}>오늘도 화이팅 💪</Text>
      </View>

      <Card>
        <Text style={styles.cardLabel}>오늘의 운동</Text>
        <Text style={styles.cardTitle}>{todayWorkout.bodyPart}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>예상 시간 {todayWorkout.estimatedMinutes}분</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{todayWorkout.exerciseCount}종목</Text>
        </View>
        <View style={{ marginTop: spacing.lg }}>
          <PrimaryButton
            label="운동 시작"
            onPress={() => navigation.navigate('WorkoutLog')}
          />
        </View>
      </Card>

      <Card>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>이번 주 운동</Text>
          <Text style={styles.progressText}>
            {weeklyProgress.completed}/{weeklyProgress.total}회 완료
          </Text>
        </View>
        <View style={{ marginTop: spacing.md }}>
          <WeekDots days={weeklyProgress.days} />
        </View>
      </Card>

      <View>
        <Text style={styles.sectionTitle}>최근 기록</Text>
        <View style={styles.recentRow}>
          {recentRecords.map((record) => (
            <Card key={record.id} style={styles.recentCard}>
              <Text style={styles.recentTitle}>{record.title}</Text>
              <Text style={styles.recentDate}>{record.date}</Text>
              <Text style={styles.recentVolume}>
                {record.volume.toLocaleString()}kg
              </Text>
            </Card>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  greetingSub: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginTop: 2,
  },
  cardLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
  cardTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
    color: colors.textPrimary,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  metaText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  metaDot: {
    color: colors.textTertiary,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  progressText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
  recentRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  recentCard: {
    flex: 1,
  },
  recentTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  recentDate: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    marginTop: 2,
  },
  recentVolume: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
});

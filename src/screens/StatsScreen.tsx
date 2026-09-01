import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { ScreenContainer } from '../components/ScreenContainer';
import { WeekDots } from '../components/WeekDots';
import { DonutChart } from '../components/charts/DonutChart';
import { LineChart } from '../components/charts/LineChart';
import { bodyPartRatio, volumeTrend, weeklyProgress } from '../data/mockData';
import { colors, fontFamily, fontSize, spacing } from '../theme';

export function StatsScreen() {
  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        <Ionicons name="menu" size={26} color={colors.textPrimary} />
        <Text style={styles.title}>통계</Text>
        <View style={{ width: 26 }} />
      </View>

      <Card>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>이번 주</Text>
          <Text style={styles.progressText}>
            {weeklyProgress.completed}/{weeklyProgress.total}회
          </Text>
        </View>
        <View style={{ marginTop: spacing.md }}>
          <WeekDots days={weeklyProgress.days} />
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>총 운동 볼륨</Text>
        <View style={{ marginTop: spacing.lg }}>
          <LineChart data={volumeTrend} />
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>부위별 비율</Text>
        <View style={{ marginTop: spacing.lg }}>
          <DonutChart data={bodyPartRatio} />
        </View>
      </Card>
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
});

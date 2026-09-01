import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colors, fontFamily, fontSize, spacing } from '../../theme';

type Slice = { label: string; percent: number; color: keyof typeof colors.chart };

const SIZE = 140;
const STROKE = 20;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function DonutChart({ data }: { data: Slice[] }) {
  let offset = 0;

  return (
    <View style={styles.row}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <G rotation={-90} origin={`${SIZE / 2}, ${SIZE / 2}`}>
          {data.map((slice, i) => {
            const length = (slice.percent / 100) * CIRCUMFERENCE;
            const dashArray = `${length} ${CIRCUMFERENCE - length}`;
            const circle = (
              <Circle
                key={i}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke={colors.chart[slice.color]}
                strokeWidth={STROKE}
                strokeDasharray={dashArray}
                strokeDashoffset={-offset}
                fill="none"
                strokeLinecap="butt"
              />
            );
            offset += length;
            return circle;
          })}
        </G>
      </Svg>
      <View style={styles.legend}>
        {data.map((slice, i) => (
          <View key={i} style={styles.legendRow}>
            <View style={[styles.swatch, { backgroundColor: colors.chart[slice.color] }]} />
            <Text style={styles.legendLabel}>{slice.label}</Text>
            <Text style={styles.legendPercent}>{slice.percent}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
  },
  legend: {
    flex: 1,
    gap: spacing.sm,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  swatch: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  legendLabel: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  legendPercent: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});

import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { colors, fontFamily, fontSize, spacing } from '../../theme';

type Point = { label: string; value: number };

const WIDTH = 300;
const HEIGHT = 120;
const PADDING = 16;

export function LineChart({ data }: { data: Point[] }) {
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const stepX = (WIDTH - PADDING * 2) / (data.length - 1 || 1);
  const points = data.map((d, i) => {
    const x = PADDING + stepX * i;
    const y =
      PADDING + (1 - (d.value - min) / range) * (HEIGHT - PADDING * 2);
    return { x, y };
  });

  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  return (
    <View>
      <Svg width="100%" height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <Line
          x1={PADDING}
          y1={HEIGHT - PADDING}
          x2={WIDTH - PADDING}
          y2={HEIGHT - PADDING}
          stroke={colors.chart.grid}
          strokeWidth={1}
        />
        <Path d={path} stroke={colors.chart.line} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r={4} fill={colors.chart.line} />
        ))}
      </Svg>
      <View style={styles.labels}>
        {data.map((d, i) => (
          <Text key={i} style={styles.label}>
            {d.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    paddingHorizontal: PADDING - 8,
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textTertiary,
  },
});

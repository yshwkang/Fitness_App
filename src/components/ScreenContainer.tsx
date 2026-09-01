import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View, ViewProps } from 'react-native';
import { colors, spacing } from '../theme';

type Props = PropsWithChildren<{
  scroll?: boolean;
  contentStyle?: ViewProps['style'];
}>;

export function ScreenContainer({ children, scroll = true, contentStyle }: Props) {
  if (!scroll) {
    return <View style={[styles.container, contentStyle]}>{children}</View>;
  }
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, contentStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.lg,
  },
});

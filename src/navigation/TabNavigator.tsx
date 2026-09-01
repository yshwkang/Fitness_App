import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { MyScreen } from '../screens/MyScreen';
import { StatsScreen } from '../screens/StatsScreen';
import { WorkoutLogScreen } from '../screens/WorkoutLogScreen';
import { colors, fontFamily, fontSize } from '../theme';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<keyof TabParamList, { active: any; inactive: any }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  WorkoutLog: { active: 'clipboard', inactive: 'clipboard-outline' },
  Stats: { active: 'bar-chart', inactive: 'bar-chart-outline' },
  My: { active: 'person', inactive: 'person-outline' },
};

const LABELS: Record<keyof TabParamList, string> = {
  Home: '홈',
  WorkoutLog: '기록',
  Stats: '통계',
  My: '마이',
};

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: { fontFamily: fontFamily.medium, fontSize: fontSize.xs },
        tabBarStyle: { borderTopColor: colors.border, height: 60, paddingTop: 6, paddingBottom: 8 },
        tabBarLabel: LABELS[route.name],
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? ICONS[route.name].active : ICONS[route.name].inactive}
            color={color}
            size={size ?? 22}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="WorkoutLog" component={WorkoutLogScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="My" component={MyScreen} />
    </Tab.Navigator>
  );
}

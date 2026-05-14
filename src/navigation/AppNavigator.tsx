import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import RiskHistoryScreen from '../screens/RiskHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AlertDetailScreen from '../screens/AlertDetailScreen';
import { colors } from '../constants/theme';
import { MainTabParamList, RootStackParamList } from '../types/navigation';
import { addRiskNotificationListeners } from '../services/notificationService';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const navigationRef = createNavigationContainerRef<RootStackParamList>();

function MainTabs() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = 58 + insets.bottom;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: tabBarHeight,
          paddingBottom: Math.max(insets.bottom, 10),
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === 'Home'
              ? 'home'
              : route.name === 'History'
                ? 'format-list-bulleted'
                : 'settings';

          return <MaterialIcons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
      <Tab.Screen name="History" component={RiskHistoryScreen} options={{ title: '이력' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: '설정' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  React.useEffect(() => {
    return addRiskNotificationListeners({
      onNotificationResponse: (eventId) => {
        if (eventId && navigationRef.isReady()) {
          navigationRef.navigate('AlertDetail', { eventId });
        }
      },
    });
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: colors.background },
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontSize: 17, fontWeight: '700' },
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="AlertDetail"
          component={AlertDetailScreen}
          options={{ title: '알림 상세' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

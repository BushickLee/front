import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RiskEventCard from '../components/RiskEventCard';
import StateView from '../components/StateView';
import { colors, spacing } from '../constants/theme';
import { useRiskAlerts } from '../hooks/useRiskAlerts';
import { RootStackParamList } from '../types/navigation';

type HistoryNavigation = StackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function RiskHistoryScreen() {
  const navigation = useNavigation<HistoryNavigation>();
  const insets = useSafeAreaInsets();
  const alertsState = useRiskAlerts();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: Math.max(insets.top, spacing.lg),
          paddingBottom: 86 + insets.bottom,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Risk history</Text>
        <Text style={styles.title}>위험 이력</Text>
        <Text style={styles.description}>최근 감지된 위험 이벤트를 시간순으로 확인합니다.</Text>
      </View>

      {alertsState.data && alertsState.data.length > 0 ? (
        alertsState.data.map((alert) => (
          <RiskEventCard
            key={alert.event_id}
            alert={alert}
            onPress={() => navigation.navigate('AlertDetail', { eventId: alert.event_id })}
          />
        ))
      ) : (
        <StateView
          title="위험 이력이 없습니다"
          description={alertsState.error ?? 'Backend에 저장된 알림이 없거나 아직 위험 이벤트가 없습니다.'}
          icon="format-list-bulleted"
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});

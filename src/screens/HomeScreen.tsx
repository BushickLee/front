import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VideoPlayer from '../components/VideoPlayer';
import AlarmModal from '../components/AlarmModal';
import RiskBadge from '../components/RiskBadge';
import RiskEventCard from '../components/RiskEventCard';
import StateView from '../components/StateView';
import { colors, radii, spacing } from '../constants/theme';
import { riskLevelMeta } from '../constants/riskLevels';
import { useRiskAlerts } from '../hooks/useRiskAlerts';
import { useStreamInfo } from '../hooks/useStreamInfo';
import { scheduleLocalRiskAlert } from '../services/notificationService';
import { RootStackParamList } from '../types/navigation';

type HomeNavigation = StackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigation>();
  const insets = useSafeAreaInsets();
  const [isAlarmVisible, setIsAlarmVisible] = useState(false);
  const streamState = useStreamInfo();
  const alertsState = useRiskAlerts();
  const latestAlert = alertsState.data?.[0] ?? null;
  const riskMeta = latestAlert ? riskLevelMeta[latestAlert.phase] : null;

  const handleSystemPushAlarm = async () => {
    if (latestAlert) {
      await scheduleLocalRiskAlert(latestAlert, 3);
    }
  };

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
        <View>
          <Text style={styles.eyebrow}>Toddle Guard</Text>
          <Text style={styles.title}>
            {streamState.data?.camera_location ?? '실내'} 실시간 모니터링
          </Text>
        </View>
        <View style={styles.headerIcon}>
          <MaterialIcons name="shield" size={22} color={colors.primary} />
        </View>
      </View>

      {streamState.data ? (
        <View style={styles.videoCard}>
          <VideoPlayer hlsUrl={streamState.data.hls_url} />
        </View>
      ) : (
        <StateView
          title="스트림 정보를 불러올 수 없습니다"
          description={streamState.error ?? 'Backend /stream API 연결 상태를 확인해 주세요.'}
          icon="videocam-off"
        />
      )}

      {latestAlert && riskMeta ? (
        <View style={styles.statusCard}>
          <View style={styles.statusTop}>
            <RiskBadge phase={latestAlert.phase} />
            <Text style={styles.confidence}>신뢰도 {Math.round(latestAlert.confidence * 100)}%</Text>
          </View>
          <Text style={styles.statusTitle}>{riskMeta.description}</Text>
          <Text style={styles.statusMessage}>{latestAlert.guardian_message}</Text>
          {alertsState.isMock ? <Text style={styles.mockLabel}>Mock 데이터 표시 중</Text> : null}
        </View>
      ) : (
        <StateView title="아직 감지된 위험 알림이 없습니다" icon="check-circle-outline" />
      )}

      <View style={styles.actionsRow}>
        <Pressable
          style={[styles.actionButton, styles.primaryAction, !latestAlert && styles.disabledAction]}
          disabled={!latestAlert}
          onPress={() => setIsAlarmVisible(true)}
        >
          <MaterialIcons name="warning" size={18} color={colors.white} />
          <Text style={styles.primaryActionText}>인앱 알림</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, !latestAlert && styles.disabledAction]}
          disabled={!latestAlert}
          onPress={handleSystemPushAlarm}
        >
          <MaterialIcons name="notifications" size={18} color={colors.textPrimary} />
          <Text style={styles.actionText}>푸시 테스트</Text>
        </Pressable>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>최근 이벤트</Text>
        <Text style={styles.sectionHint}>최근 3건</Text>
      </View>

      {alertsState.data && alertsState.data.length > 0 ? (
        alertsState.data.slice(0, 3).map((alert) => (
          <RiskEventCard
            key={alert.event_id}
            alert={alert}
            onPress={() => navigation.navigate('AlertDetail', { eventId: alert.event_id })}
          />
        ))
      ) : (
        <StateView
          title="최근 이벤트가 없습니다"
          description={alertsState.error ?? '위험이 감지되면 이 영역에 최근 알림이 표시됩니다.'}
        />
      )}

      {latestAlert ? (
        <AlarmModal
          visible={isAlarmVisible}
          onClose={() => setIsAlarmVisible(false)}
          dangerData={latestAlert}
        />
      ) : null}
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 24,
    fontWeight: '800',
  },
  headerIcon: {
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: radii.md,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  videoCard: {
    borderRadius: radii.md,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  statusCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  statusTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  confidence: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  statusTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 25,
    marginBottom: spacing.sm,
  },
  statusMessage: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },
  mockLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: spacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  primaryAction: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  disabledAction: {
    opacity: 0.48,
  },
  actionText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '800',
  },
  primaryActionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  sectionHint: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
});

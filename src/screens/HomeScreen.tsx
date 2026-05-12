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
import { colors, radii, spacing } from '../constants/theme';
import { riskLevelMeta } from '../constants/riskLevels';
import { mockRiskAlert } from '../mocks/mockRiskAlert';
import { mockRiskHistory } from '../mocks/mockRiskHistory';
import { mockStreamInfo } from '../mocks/mockStreamInfo';
import { scheduleLocalRiskAlert } from '../services/notificationService';
import { RootStackParamList } from '../types/navigation';

type HomeNavigation = StackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigation>();
  const insets = useSafeAreaInsets();
  const [isAlarmVisible, setIsAlarmVisible] = useState(false);
  const riskMeta = riskLevelMeta[mockRiskAlert.phase];

  const handleSystemPushAlarm = async () => {
    await scheduleLocalRiskAlert(mockRiskAlert, 3);
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
          <Text style={styles.title}>{mockStreamInfo.camera_location} 실시간 모니터링</Text>
        </View>
        <View style={styles.headerIcon}>
          <MaterialIcons name="shield" size={22} color={colors.primary} />
        </View>
      </View>

      <View style={styles.videoCard}>
        <VideoPlayer hlsUrl={mockStreamInfo.hls_url} />
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusTop}>
          <RiskBadge phase={mockRiskAlert.phase} />
          <Text style={styles.confidence}>신뢰도 {Math.round(mockRiskAlert.confidence * 100)}%</Text>
        </View>
        <Text style={styles.statusTitle}>{riskMeta.description}</Text>
        <Text style={styles.statusMessage}>{mockRiskAlert.guardian_message}</Text>
      </View>

      <View style={styles.actionsRow}>
        <Pressable style={[styles.actionButton, styles.primaryAction]} onPress={() => setIsAlarmVisible(true)}>
          <MaterialIcons name="warning" size={18} color={colors.white} />
          <Text style={styles.primaryActionText}>인앱 알림</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={handleSystemPushAlarm}>
          <MaterialIcons name="notifications" size={18} color={colors.textPrimary} />
          <Text style={styles.actionText}>푸시 테스트</Text>
        </Pressable>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>최근 이벤트</Text>
        <Text style={styles.sectionHint}>최근 3건</Text>
      </View>

      {mockRiskHistory.slice(0, 3).map((alert) => (
        <RiskEventCard
          key={alert.event_id}
          alert={alert}
          onPress={() => navigation.navigate('AlertDetail', { eventId: alert.event_id })}
        />
      ))}

      <AlarmModal
        visible={isAlarmVisible}
        onClose={() => setIsAlarmVisible(false)}
        dangerData={mockRiskAlert}
      />
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

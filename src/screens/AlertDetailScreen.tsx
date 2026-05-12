import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RiskBadge from '../components/RiskBadge';
import VideoPlayer from '../components/VideoPlayer';
import { colors, radii, spacing } from '../constants/theme';
import { mockRiskHistory } from '../mocks/mockRiskHistory';
import { mockStreamInfo } from '../mocks/mockStreamInfo';
import { RootStackParamList } from '../types/navigation';

type AlertDetailRoute = RouteProp<RootStackParamList, 'AlertDetail'>;

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export default function AlertDetailScreen() {
  const route = useRoute<AlertDetailRoute>();
  const insets = useSafeAreaInsets();
  const alert =
    mockRiskHistory.find((item) => item.event_id === route.params.eventId) ?? mockRiskHistory[0];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: spacing.xl + insets.bottom }]}
    >
      <View style={styles.videoWrap}>
        <VideoPlayer hlsUrl={alert.hls_url} />
      </View>

      <View style={styles.card}>
        <RiskBadge phase={alert.phase} />
        <Text style={styles.message}>{alert.guardian_message}</Text>
        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>발생 시간</Text>
            <Text style={styles.metaValue}>{alert.timestamp}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>위치</Text>
            <Text style={styles.metaValue}>{mockStreamInfo.camera_location}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>감지 물체</Text>
            <Text style={styles.metaValue}>
              {alert.object_type_ko} ({alert.object_type})
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>프레임 ID</Text>
            <Text style={styles.metaValue}>{alert.frame_id}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>이벤트 ID</Text>
            <Text style={styles.metaValue}>{alert.event_id}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>신뢰도</Text>
            <Text style={styles.metaValue}>{formatPercent(alert.confidence)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>영상 기준 정보</Text>
        <Text style={styles.infoText}>
          이 이벤트는 frame_id {alert.frame_id} 기준으로 저장되었습니다. Backend가 과거 영상
          조회를 제공하면 이 값을 기준으로 전후 영상을 요청할 수 있습니다.
        </Text>
      </View>
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
  videoWrap: {
    borderRadius: radii.md,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  message: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 28,
    marginTop: spacing.lg,
  },
  metaGrid: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  metaItem: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: spacing.md,
  },
  metaLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  metaValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },
});

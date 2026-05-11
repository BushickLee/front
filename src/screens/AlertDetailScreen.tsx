import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RiskBadge from '../components/RiskBadge';
import VideoPlayer from '../components/VideoPlayer';
import { colors, radii, spacing } from '../constants/theme';
import { mockRiskHistory } from '../mocks/mockRiskHistory';
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
            <Text style={styles.metaLabel}>카메라</Text>
            <Text style={styles.metaValue}>{alert.camera_id}</Text>
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
        <Text style={styles.sectionTitle}>위험 확률</Text>
        {Object.entries(alert.probabilities).map(([phase, value]) => (
          <View key={phase} style={styles.probabilityRow}>
            <Text style={styles.probabilityLabel}>{phase}</Text>
            <View style={styles.probabilityTrack}>
              <View style={[styles.probabilityFill, { width: `${Math.round(value * 100)}%` }]} />
            </View>
            <Text style={styles.probabilityValue}>{formatPercent(value)}</Text>
          </View>
        ))}
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
    marginBottom: spacing.lg,
  },
  probabilityRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  probabilityLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    width: 92,
  },
  probabilityTrack: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 4,
    flex: 1,
    height: 8,
    overflow: 'hidden',
  },
  probabilityFill: {
    backgroundColor: colors.primary,
    height: '100%',
  },
  probabilityValue: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: spacing.sm,
    textAlign: 'right',
    width: 42,
  },
});

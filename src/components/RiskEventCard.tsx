import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import RiskBadge from './RiskBadge';
import { colors, radii, spacing } from '../constants/theme';
import { RiskAlert } from '../types/risk';

interface RiskEventCardProps {
  alert: RiskAlert;
  onPress?: () => void;
}

function formatEventTime(timestamp: string) {
  return new Date(timestamp).toLocaleString('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function RiskEventCard({ alert, onPress }: RiskEventCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.topRow}>
        <RiskBadge phase={alert.phase} compact />
        <Text style={styles.time}>{formatEventTime(alert.timestamp)}</Text>
      </View>
      <Text style={styles.message}>{alert.guardian_message}</Text>
      <View style={styles.metaRow}>
        <MaterialIcons name="category" size={15} color={colors.textSecondary} />
        <Text style={styles.metaText}>{alert.object_type_ko}</Text>
        <View style={styles.separator} />
        <Text style={styles.metaText}>Frame {alert.frame_id}</Text>
        <View style={styles.separator} />
        <Text style={styles.metaText}>신뢰도 {Math.round(alert.confidence * 100)}%</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  cardPressed: {
    opacity: 0.82,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  time: {
    color: colors.textMuted,
    fontSize: 12,
  },
  message: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
    marginBottom: spacing.md,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 4,
  },
  separator: {
    backgroundColor: colors.border,
    height: 12,
    marginHorizontal: spacing.sm,
    width: 1,
  },
});

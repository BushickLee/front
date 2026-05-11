import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { riskLevelMeta } from '../constants/riskLevels';
import { radii } from '../constants/theme';
import { RiskPhase } from '../types/risk';

interface RiskBadgeProps {
  phase: RiskPhase;
  compact?: boolean;
}

export default function RiskBadge({ phase, compact = false }: RiskBadgeProps) {
  const meta = riskLevelMeta[phase];

  return (
    <View style={[styles.badge, { backgroundColor: `${meta.color}14` }]}>
      <View style={[styles.dot, { backgroundColor: meta.color }]} />
      <Text style={[styles.text, { color: meta.color }, compact && styles.compactText]}>
        {meta.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: radii.sm,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  dot: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
  compactText: {
    fontSize: 11,
  },
});

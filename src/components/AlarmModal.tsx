import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { riskLevelMeta } from '../constants/riskLevels';
import { colors, radii, spacing } from '../constants/theme';
import { RiskAlert } from '../types/risk';

interface AlarmModalProps {
  visible: boolean;
  onClose: () => void;
  dangerData: RiskAlert;
}

export default function AlarmModal({ visible, onClose, dangerData }: AlarmModalProps) {
  const riskLevel = riskLevelMeta[dangerData.phase];

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.alarmBox}>
          <View style={[styles.iconCircle, { backgroundColor: `${riskLevel.color}14` }]}>
            <Text style={[styles.iconText, { color: riskLevel.color }]}>!</Text>
          </View>
          <Text style={[styles.alarmTitle, { color: riskLevel.color }]}>{riskLevel.title}</Text>
          <Text style={styles.alarmMessage}>{dangerData.guardian_message}</Text>
          <Text style={styles.alarmDescription}>{riskLevel.description}</Text>
          <Text style={styles.confidence}>신뢰도: {Math.round(dangerData.confidence * 100)}%</Text>
          <Text style={styles.alarmTime}>발생 시간: {dangerData.timestamp}</Text>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>확인했어요</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.62)',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  alarmBox: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    elevation: 5,
    padding: spacing.xl,
    width: '100%',
  },
  iconCircle: {
    alignItems: 'center',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    marginBottom: spacing.md,
    width: 44,
  },
  iconText: {
    fontSize: 24,
    fontWeight: '900',
  },
  alarmTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  alarmMessage: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 25,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  alarmDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  confidence: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  alarmTime: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: spacing.xl,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: radii.md,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    width: '100%',
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});

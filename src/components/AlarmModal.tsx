import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { riskLevelMeta } from '../constants/riskLevels';
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
          <Text style={[styles.alarmTitle, { color: riskLevel.color }]}>
            {riskLevel.title}
          </Text>
          <Text style={styles.alarmMessage}>{dangerData.guardian_message}</Text>
          <Text style={styles.alarmDescription}>{riskLevel.description}</Text>
          <Text style={styles.confidence}>신뢰도: {Math.round(dangerData.confidence * 100)}%</Text>
          <Text style={styles.alarmTime}>발생 시간: {dangerData.timestamp}</Text>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>확인 및 알람 끄기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: { flex: 1, backgroundColor: 'rgba(255, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center' },
  alarmBox: { width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center', elevation: 5 },
  alarmTitle: { fontSize: 22, fontWeight: 'bold', color: 'red', marginBottom: 15 },
  alarmMessage: { fontSize: 18, textAlign: 'center', marginBottom: 10, fontWeight: '600' },
  alarmDescription: { fontSize: 14, textAlign: 'center', color: '#555', marginBottom: 10 },
  confidence: { fontSize: 14, color: '#333', marginBottom: 8 },
  alarmTime: { fontSize: 14, color: 'gray', marginBottom: 25 },
  closeButton: { backgroundColor: 'black', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8 },
  closeButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});

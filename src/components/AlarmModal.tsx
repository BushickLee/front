import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';

// 이 부품이 외부에서 받아올 데이터들의 타입 정의
interface AlarmModalProps {
  visible: boolean;
  onClose: () => void;
  dangerData: any;
}

export default function AlarmModal({ visible, onClose, dangerData }: AlarmModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.alarmBox}>
          <Text style={styles.alarmTitle}>⚠️ 긴급 위험 감지 ⚠️</Text>
          <Text style={styles.alarmMessage}>{dangerData.guardian_message}</Text>
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
  alarmTime: { fontSize: 14, color: 'gray', marginBottom: 25 },
  closeButton: { backgroundColor: 'black', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8 },
  closeButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
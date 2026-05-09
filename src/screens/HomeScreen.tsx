import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import AlarmModal from '../components/AlarmModal';
import { mockRiskAlert } from '../mocks/mockRiskAlert';
import { scheduleLocalRiskAlert } from '../services/notificationService';


export default function HomeScreen() {
  const [isAlarmVisible, setIsAlarmVisible] = useState(false);

  const handleSystemPushAlarm = async () => {
    await scheduleLocalRiskAlert(mockRiskAlert, 3);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>아이방 실시간 홈캠</Text>
      </View>

      {/* 조립된 비디오 부품 */}
      <VideoPlayer hlsUrl={mockRiskAlert.hls_url} />

      <View style={styles.controlBox}>
        <Text style={styles.subtitle}>알림 시뮬레이션 제어판</Text>
        <View style={styles.buttonContainer}>
          <Button title="(1) 인앱 팝업 알람 띄우기" onPress={() => setIsAlarmVisible(true)} color="red" />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="(2) 시스템 푸시 알람 (3초 뒤)" onPress={handleSystemPushAlarm} />
        </View>
      </View>

      {/* 조립된 알람 모달 부품 (스위치와 데이터를 넘겨줌) */}
      <AlarmModal 
        visible={isAlarmVisible} 
        onClose={() => setIsAlarmVisible(false)} 
        dangerData={mockRiskAlert} 
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0', paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold' },
  liveBadge: { color: 'red', fontWeight: 'bold', fontSize: 14 },
  controlBox: { marginTop: 20, alignItems: 'center' },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 15 },
  buttonContainer: { marginVertical: 10, width: '80%' },
});

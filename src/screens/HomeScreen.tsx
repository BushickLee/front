import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import * as Notifications from 'expo-notifications';
import VideoPlayer from '../components/VideoPlayer';
import AlarmModal from '../components/AlarmModal';


export default function HomeScreen() {
  const [isAlarmVisible, setIsAlarmVisible] = useState(false);

  const mockDangerData = {
    event_id: "evt-20260427-001",
    risk_type: "chair_climb_risk",
    guardian_message: "아이가 의자에 올라가려는 행동이 감지되었습니다.",
    timestamp: "2026-04-28T23:11:35+09:00"
  };

  const handleSystemPushAlarm = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "긴급 낙상 위험 감지",
        body: mockDangerData.guardian_message,
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 3 },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>아이방 실시간 홈캠</Text>
      </View>

      {/* 조립된 비디오 부품 */}
      <VideoPlayer />

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
        dangerData={mockDangerData} 
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
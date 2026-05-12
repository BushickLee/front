import * as Notifications from 'expo-notifications';
import { RiskAlert } from '../types/risk';

export async function requestNotificationPermissions() {
  const currentPermissions = await Notifications.getPermissionsAsync();

  if (currentPermissions.granted) {
    return currentPermissions;
  }

  return Notifications.requestPermissionsAsync();
}

export async function scheduleLocalRiskAlert(alert: RiskAlert, seconds = 3) {
  await requestNotificationPermissions();

  return Notifications.scheduleNotificationAsync({
    content: {
      title: `${alert.phase_ko} 위험 알림`,
      body: alert.guardian_message,
      data: {
        eventId: alert.event_id,
        phase: alert.phase,
        objectType: alert.object_type,
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
    },
  });
}

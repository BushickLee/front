import * as Notifications from 'expo-notifications';
import { RiskAlert } from '../types/risk';

export interface RiskNotificationData {
  eventId?: string;
  event_id?: string;
  phase?: string;
  objectType?: string;
  object_type?: string;
}

export async function requestNotificationPermissions() {
  const currentPermissions = await Notifications.getPermissionsAsync();

  if (currentPermissions.granted) {
    return currentPermissions;
  }

  return Notifications.requestPermissionsAsync();
}

export function getEventIdFromNotificationData(data: Record<string, unknown>) {
  const riskData = data as RiskNotificationData;
  return riskData.eventId ?? riskData.event_id ?? null;
}

export function addRiskNotificationListeners(handlers: {
  onNotificationReceived?: (eventId: string | null) => void;
  onNotificationResponse?: (eventId: string | null) => void;
}) {
  const receivedSubscription = Notifications.addNotificationReceivedListener((notification) => {
    const eventId = getEventIdFromNotificationData(notification.request.content.data);
    handlers.onNotificationReceived?.(eventId);
  });

  const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
    const eventId = getEventIdFromNotificationData(
      response.notification.request.content.data,
    );
    handlers.onNotificationResponse?.(eventId);
  });

  return () => {
    receivedSubscription.remove();
    responseSubscription.remove();
  };
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

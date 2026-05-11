import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii, spacing } from '../constants/theme';

const hlsUrl =
  process.env.EXPO_PUBLIC_MOCK_HLS_URL ?? 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL ?? '설정되지 않음';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: Math.max(insets.top, spacing.lg),
          paddingBottom: 86 + insets.bottom,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Settings</Text>
        <Text style={styles.title}>설정</Text>
        <Text style={styles.description}>알림, 스트리밍, Backend 연결 상태를 확인합니다.</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.settingRow}>
          <View style={styles.iconBox}>
            <MaterialIcons name="notifications-active" size={20} color={colors.primary} />
          </View>
          <View style={styles.settingTextWrap}>
            <Text style={styles.settingTitle}>위험 알림</Text>
            <Text style={styles.settingDescription}>조기경보 이상 단계에서 알림을 받습니다.</Text>
          </View>
          <Switch value />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>연결 정보</Text>
        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>HLS URL</Text>
          <Text style={styles.infoValue}>{hlsUrl}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>API BASE URL</Text>
          <Text style={styles.infoValue}>{apiBaseUrl}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>앱 정보</Text>
        <Text style={styles.infoValue}>Toddle Guard Frontend</Text>
        <Text style={styles.settingDescription}>Edge AI 기반 가정 내 유아 낙상 조기경보 앱</Text>
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
  header: {
    marginBottom: spacing.xl,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  settingRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconBox: {
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: radii.md,
    height: 40,
    justifyContent: 'center',
    marginRight: spacing.md,
    width: 40,
  },
  settingTextWrap: {
    flex: 1,
  },
  settingTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
  settingDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  infoBlock: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingVertical: spacing.md,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  infoValue: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19,
  },
});

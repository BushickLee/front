import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../constants/theme';

interface StateViewProps {
  title: string;
  description?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
}

export default function StateView({
  title,
  description,
  icon = 'info-outline',
}: StateViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <MaterialIcons name={icon} size={22} color={colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    padding: spacing.xl,
  },
  iconBox: {
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: radii.md,
    height: 44,
    justifyContent: 'center',
    marginBottom: spacing.md,
    width: 44,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  description: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
});

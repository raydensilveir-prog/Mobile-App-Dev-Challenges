import { useCallback, useEffect, useState } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTheme, saveTheme, type ThemeMode } from '../lib/storage';

const THEME_UPDATED_KEY = '@learner_theme_updated_at';

/**
 * Restores the persisted theme preference on mount and saves it back
 * to AsyncStorage every time it changes, so the choice survives an
 * app restart.
 */
export function useThemeStorage() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getTheme().then((stored) => {
      if (isMounted) {
        setTheme(stored);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleTheme = useCallback(async () => {
    const next: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    await saveTheme(next);
    await AsyncStorage.setItem(THEME_UPDATED_KEY, new Date().toISOString());
    setTheme(next);
  }, [theme]);

  return { theme, loading, toggleTheme, isDark: theme === 'dark' };
}

/**
 * Toggle button that reads/writes the persisted theme preference,
 * demonstrating restore-on-launch and save-on-change behaviour.
 */
export function ThemeToggleButton() {
  const { loading, toggleTheme, isDark } = useThemeStorage();

  if (loading) {
    return (
      <Pressable style={styles.container} testID="theme-toggle-loading">
        <Text style={styles.label}>Loading theme...</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[styles.container, isDark ? styles.dark : styles.light]}
      onPress={toggleTheme}
      testID="theme-toggle-button"
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      accessibilityState={{ selected: isDark }}
    >
      <Text
        style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}
      >
        {isDark ? '🌙 Dark mode' : '☀️ Light mode'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  dark: { backgroundColor: '#1e293b' },
  light: { backgroundColor: '#e2e8f0' },
  label: { fontSize: 15, fontWeight: '600' },
  labelDark: { color: '#f8fafc' },
  labelLight: { color: '#0f172a' },
});
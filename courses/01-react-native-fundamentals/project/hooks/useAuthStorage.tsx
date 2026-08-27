import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser, saveUser, type StoredUser } from '../lib/storage';

const LAST_LOGIN_KEY = '@learner_last_login';

/**
 * Persists the logged-in user and restores them automatically on
 * mount, so a returning user is signed back in without re-entering
 * credentials (auto-login).
 */
export function useAuthStorage() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getUser().then((stored) => {
      if (isMounted) {
        setUser(stored);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (data: StoredUser) => {
    await saveUser(data);
    await AsyncStorage.setItem(LAST_LOGIN_KEY, new Date().toISOString());
    setUser(data);
  }, []);

  const logout = useCallback(async () => {
    await saveUser(null);
    await AsyncStorage.removeItem(LAST_LOGIN_KEY);
    setUser(null);
  }, []);

  return { user, loading, isLoggedIn: !!user, login, logout };
}

/**
 * Small status banner that proves the auto-login flow works: on
 * mount it checks AsyncStorage (via useAuthStorage) for a saved
 * session and greets the user without requiring them to log in
 * again, with a button to end the persisted session.
 */
export function AuthStatusBanner() {
  const { user, loading, isLoggedIn, logout } = useAuthStorage();

  if (loading) {
    return (
      <View style={styles.banner} testID="auth-status-loading">
        <ActivityIndicator size="small" color="#38bdf8" />
        <Text style={styles.checkingText}>Checking session...</Text>
      </View>
    );
  }

  return (
    <View style={styles.banner} testID="auth-status-banner">
      <Text style={styles.statusText}>
        {isLoggedIn ? `Signed in as ${user?.username}` : 'Not signed in'}
      </Text>
      {isLoggedIn && (
        <Pressable
          style={styles.logoutButton}
          onPress={logout}
          testID="auth-logout-button"
          accessibilityRole="button"
          accessibilityLabel="Log out"
        >
          <Text style={styles.logoutButtonText}>Log out</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    margin: 16,
  },
  checkingText: { color: '#94a3b8', marginLeft: 8, fontSize: 13 },
  statusText: { color: '#f8fafc', fontSize: 14, fontWeight: '600' },
  logoutButton: {
    backgroundColor: '#f87171',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  logoutButtonText: { color: '#0f172a', fontWeight: '700', fontSize: 13 },
});
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import { fetchUsers, type ApiUser } from '../lib/api';

export default function UserList() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch {
      setError('Could not load users. Check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const renderUser = useCallback(
    ({ item }: ListRenderItemInfo<ApiUser>) => (
      <View style={styles.card} testID={`user-card-${item.id}`}>
        <Image
          source={{ uri: `https://i.pravatar.cc/80?u=${item.id}` }}
          style={styles.avatar}
          testID={`user-avatar-${item.id}`}
        />
        <View style={styles.info}>
          <Text style={styles.name} testID={`user-name-${item.id}`}>
            {item.name}
          </Text>
          <Text style={styles.email} testID={`user-email-${item.id}`}>
            {item.email}
          </Text>
        </View>
      </View>
    ),
    []
  );

  if (loading) {
    return (
      <View style={styles.centered} testID="users-loading">
        <ActivityIndicator size="large" color="#38bdf8" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered} testID="users-error">
        <Text style={styles.errorText}>{error}</Text>
        <Pressable
          style={styles.retryButton}
          onPress={loadUsers}
          testID="retry-button"
          accessibilityRole="button"
          accessibilityLabel="Retry loading users"
        >
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderUser}
      testID="user-list"
      contentContainerStyle={
        users.length === 0 ? styles.emptyListContent : styles.list
      }
      ListEmptyComponent={
        <View style={styles.centered} testID="users-empty-state">
          <Text style={styles.errorText}>No users found.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  emptyListContent: { flexGrow: 1, justifyContent: 'center' },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    color: '#94a3b8',
    marginTop: 12,
    fontSize: 14,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
    backgroundColor: '#334155',
  },
  info: { flex: 1 },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 4,
  },
  email: { fontSize: 14, color: '#94a3b8' },
  errorText: {
    color: '#f87171',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#38bdf8',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: { color: '#0f172a', fontWeight: '700' },
});
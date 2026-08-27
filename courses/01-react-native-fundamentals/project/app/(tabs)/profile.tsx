import { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStorage } from '../../hooks/useAuthStorage';

interface ActivityItem {
  id: string;
  label: string;
}

const TABS = ['Posts', 'Likes'] as const;
type ProfileTab = (typeof TABS)[number];

const MOCK_ACTIVITY: Record<ProfileTab, ActivityItem[]> = {
  Posts: [
    { id: 'post-1', label: 'Shipped a new feature today!' },
    { id: 'post-2', label: 'Weekend hike recap' },
  ],
  Likes: [
    { id: 'like-1', label: 'Liked "Sunday reset"' },
    { id: 'like-2', label: 'Liked "Coffee first, code second"' },
  ],
};

export default function ProfileScreen() {
  const router = useRouter();
  const { user, loading, logout } = useAuthStorage();
  const [activeTab, setActiveTab] = useState<ProfileTab>('Posts');
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    setActivity(MOCK_ACTIVITY[activeTab]);
  }, [activeTab]);

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login');
  };

  if (loading) {
    return (
      <View style={styles.container} testID="profile-screen-loading">
        <Text style={styles.subtitle}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="profile-screen">
      <View style={styles.avatarCircle} testID="profile-avatar">
        <Text style={styles.avatarInitial}>
          {(user?.username?.[0] ?? '?').toUpperCase()}
        </Text>
      </View>

      <Text style={styles.username} testID="profile-username">
        @{user?.username ?? 'guest'}
      </Text>

      <View style={styles.infoCard} testID="profile-info-card">
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Username</Text>
          <Text style={styles.infoValue} testID="profile-info-username">
            {user?.username ?? '—'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue} testID="profile-info-email">
            {user?.email ?? '—'}
          </Text>
        </View>
      </View>

      <View style={styles.tabRow} testID="profile-tab-row">
        {TABS.map((tab) => (
          <Pressable
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab(tab)}
            testID={`profile-tab-${tab.toLowerCase()}`}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === tab && styles.tabButtonTextActive,
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={activity}
        keyExtractor={(item) => item.id}
        style={styles.activityList}
        testID="profile-activity-list"
        renderItem={({ item }) => (
          <View
            style={styles.activityRow}
            testID={`profile-activity-${item.id}`}
          >
            <Text style={styles.activityText}>{item.label}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyActivity} testID="profile-activity-empty">
            No {activeTab.toLowerCase()} yet.
          </Text>
        }
      />

      <Pressable
        style={styles.logoutButton}
        onPress={handleLogout}
        testID="profile-logout-button"
        accessibilityRole="button"
        accessibilityLabel="Log out"
      >
        <Text style={styles.logoutButtonText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: 20,
  },

  subtitle: {
    color: '#999999',
    marginTop: 8,
  },

  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#38bdf8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  avatarInitial: {
    fontSize: 34,
    fontWeight: '700',
    color: '#0F172A',
  },

  username: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },

  infoCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  infoRow: {
    marginBottom: 14,
  },

  infoLabel: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 4,
  },

  infoValue: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
  },

  tabRow: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 400,
    marginBottom: 12,
    gap: 10,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },

  tabButtonActive: {
    backgroundColor: '#38bdf8',
    borderColor: '#38bdf8',
  },

  tabButtonText: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 13,
  },

  tabButtonTextActive: {
    color: '#0F172A',
  },

  activityList: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
  },

  activityRow: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },

  activityText: {
    color: '#F8FAFC',
    fontSize: 14,
  },

  emptyActivity: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 12,
  },

  logoutButton: {
    backgroundColor: '#f87171',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
  },

  logoutButtonText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
  },
});
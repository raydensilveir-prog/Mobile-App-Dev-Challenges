import { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useAuthStorage } from '../hooks/useAuthStorage';

interface SplashTip {
  id: string;
  text: string;
}

const SPLASH_TIPS: SplashTip[] = [
  { id: 'tip-1', text: 'Swipe through your feed to like posts.' },
  { id: 'tip-2', text: 'Search finds users and images by category.' },
  { id: 'tip-3', text: 'Your session is saved automatically.' },
];

function SplashScreen() {
  const [activeTip, setActiveTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTip((prev) => (prev + 1) % SPLASH_TIPS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.splash} testID="app-splash-screen">
      <Text style={styles.splashTitle}>Loading your session...</Text>
      <FlatList
        data={SPLASH_TIPS}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        testID="splash-tips-list"
        contentContainerStyle={styles.tipsContent}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.tipCard,
              index === activeTip && styles.tipCardActive,
            ]}
            testID={`splash-tip-${item.id}`}
          >
            <Text style={styles.tipText}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default function AppLayout() {
  const { isLoggedIn, loading } = useAuthStorage();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!isLoggedIn && !inAuthGroup) {
      router.replace('/auth/login');
    } else if (isLoggedIn && inAuthGroup) {
      router.replace('/(tabs)/feed');
    }
  }, [isLoggedIn, loading, segments, router]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#111111',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '700',
        },
        contentStyle: {
          backgroundColor: '#0F0F0F',
        },
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="auth/login"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="auth/signup"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="details/[username]"
        options={({ route }) => {
          const params = route.params as { username?: string } | undefined;
          const username = params?.username;

          return {
            title: username ? `@${username}` : 'User Details',
            headerStyle: {
              backgroundColor: '#1c1c1c',
            },
            headerTintColor: '#a855f7',
          };
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  splashTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  tipsContent: {
    paddingHorizontal: 8,
  },
  tipCard: {
    width: 200,
    padding: 14,
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  tipCardActive: {
    borderColor: '#38bdf8',
  },
  tipText: {
    color: '#94A3B8',
    fontSize: 13,
  },
});
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function UserDetailsScreen() {
  useNavigation();

  const { username } = useLocalSearchParams<{
    username?: string;
  }>();

  const displayedUsername = Array.isArray(username)
    ? username[0] ?? 'User'
    : username ?? 'User';

  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileCard}>
        <Text style={styles.usernameText}>
          @{displayedUsername}
        </Text>

        <Text style={styles.descriptionText}>
          Welcome {displayedUsername} to your dashboard
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  profileCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#1c1c1c',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },

  usernameText: {
    color: '#a855f7',
    fontSize: 18,
    marginTop: 10,
  },

  descriptionText: {
    color: '#999999',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
  },
});
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStorage } from '../../hooks/useAuthStorage';

export default function SignupScreen() {
  const router = useRouter();
  const { login } = useAuthStorage();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [signupComplete, setSignupComplete] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};

    if (!username.trim()) {
      next.username = 'Username is required';
    }

    if (!email.trim()) {
      next.email = 'Email is required';
    }

    if (!password) {
      next.password = 'Password is required';
    } else if (password.length < 6) {
      next.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      next.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      next.confirmPassword = 'Passwords do not match';
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) {
      return;
    }

    try {
      await login({
        email: email.trim(),
        username: username.trim(),
      });

      setSignupComplete(true);
    } catch {
      setErrors({
        username: 'Unable to create account. Please try again.',
      });
    }
  };

  const handleViewProfile = () => {
    router.replace('/(tabs)/profile');
  };

  const handleGoToLogin = () => {
    router.replace('/auth/login');
  };

  if (signupComplete) {
    return (
      <View
        style={styles.container}
        testID="signup-success-screen"
      >
        <Text style={styles.title}>
          Account Created!
        </Text>

        <Text
          style={styles.successText}
          testID="signup-success-message"
        >
          Welcome, {username}!
        </Text>

        <Pressable
          style={styles.button}
          onPress={handleViewProfile}
          testID="view-profile-button"
        >
          <Text style={styles.buttonText}>
            View Profile
          </Text>
        </Pressable>

        <Pressable
          onPress={handleGoToLogin}
          testID="go-login-after-signup"
        >
          <Text style={styles.link}>
            Go to Login
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={styles.container}
      testID="signup-screen"
    >
      <Text style={styles.title}>
        Sign up
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#64748b"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        testID="signup-username"
      />

      {errors.username ? (
        <Text
          style={styles.error}
          testID="signup-username-error"
        >
          {errors.username}
        </Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#64748b"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        testID="signup-email"
      />

      {errors.email ? (
        <Text
          style={styles.error}
          testID="signup-email-error"
        >
          {errors.email}
        </Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#64748b"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        testID="signup-password"
      />

      {errors.password ? (
        <Text
          style={styles.error}
          testID="signup-password-error"
        >
          {errors.password}
        </Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        placeholderTextColor="#64748b"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        testID="signup-confirm-password"
      />

      {errors.confirmPassword ? (
        <Text
          style={styles.error}
          testID="signup-confirm-password-error"
        >
          {errors.confirmPassword}
        </Text>
      ) : null}

      <Pressable
        style={styles.button}
        onPress={handleSignup}
        testID="signup-submit"
      >
        <Text style={styles.buttonText}>
          Create account
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.back()}
        testID="go-login"
      >
        <Text style={styles.link}>
          Already have an account? Log in
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 24,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#f8fafc',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },

  error: {
    color: '#f87171',
    marginBottom: 12,
    fontSize: 14,
  },

  button: {
    backgroundColor: '#38bdf8',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },

  buttonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '700',
  },

  link: {
    color: '#38bdf8',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 15,
  },

  successText: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});
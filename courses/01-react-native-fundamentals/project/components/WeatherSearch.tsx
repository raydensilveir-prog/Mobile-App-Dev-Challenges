import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { fetchWeather, type WeatherResult } from '../lib/api';

export default function WeatherSearch() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherResult | null>(null);

  const search = useCallback(async () => {
    const trimmed = city.trim();
    if (!trimmed) {
      setError('Enter a city name to search.');
      setWeather(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchWeather(trimmed);
      setWeather(result);
    } catch {
      setError('Could not find weather for that city.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [city]);

  return (
    <View style={styles.container} testID="weather-search">
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          placeholderTextColor="#64748b"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={search}
          returnKeyType="search"
          autoCapitalize="words"
          autoCorrect={false}
          testID="weather-city-input"
          accessibilityLabel="City name"
        />
        <Pressable
          style={styles.button}
          onPress={search}
          testID="weather-search-button"
          accessibilityRole="button"
          accessibilityLabel="Search weather"
        >
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>

      {loading && (
        <View style={styles.centered} testID="weather-loading">
          <ActivityIndicator color="#38bdf8" size="large" />
          <Text style={styles.loadingText}>Fetching weather...</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.centered} testID="weather-error">
          <Text style={styles.errorText}>{error}</Text>
          <Pressable
            style={styles.button}
            onPress={search}
            testID="weather-retry"
            accessibilityRole="button"
            accessibilityLabel="Retry weather search"
          >
            <Text style={styles.buttonText}>Retry</Text>
          </Pressable>
        </View>
      )}

      {!loading && !error && weather && (
        <View style={styles.result} testID="weather-result">
          {weather.icon ? (
            <Image
              source={{ uri: weather.icon }}
              style={styles.icon}
              testID="weather-icon"
            />
          ) : null}
          <Text style={styles.city} testID="weather-city-name">
            {weather.name}
          </Text>
          <Text style={styles.temp} testID="weather-temp">
            {weather.temp}°C
          </Text>
          <Text style={styles.desc} testID="weather-description">
            {weather.description}
          </Text>
        </View>
      )}

      {!loading && !error && !weather && (
        <View style={styles.centered} testID="weather-empty-state">
          <Text style={styles.hintText}>
            Search for a city to see current conditions.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', padding: 16 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#f8fafc',
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    backgroundColor: '#38bdf8',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#0f172a', fontWeight: '700', fontSize: 15 },
  centered: { alignItems: 'center', paddingVertical: 16 },
  loadingText: { color: '#94a3b8', marginTop: 10, fontSize: 14 },
  errorText: { color: '#f87171', marginBottom: 12, textAlign: 'center' },
  hintText: { color: '#64748b', fontSize: 14, textAlign: 'center' },
  result: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1e293b',
    borderRadius: 12,
  },
  icon: { width: 64, height: 64, marginBottom: 8 },
  city: { fontSize: 22, fontWeight: '700', color: '#f8fafc' },
  temp: { fontSize: 36, fontWeight: '700', color: '#38bdf8', marginVertical: 8 },
  desc: { fontSize: 16, color: '#94a3b8', textTransform: 'capitalize' },
});
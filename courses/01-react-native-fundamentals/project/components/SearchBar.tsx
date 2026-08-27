import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

interface SearchBarProps {

  onSearch: (query: string) => void;
  placeholder?: string;

  debounceMs?: number;
  testID?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  onSearch,
  placeholder = 'Search...',
  debounceMs = 250,
  testID = 'search-bar',
  autoFocus = false,
}: SearchBarProps) {
  const [text, setText] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      onSearch(text.trim());
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, debounceMs]);

  const handleClear = () => {
    setText('');
    onSearch('');
  };

  return (
    <View style={styles.container} testID={testID}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={autoFocus}
        clearButtonMode={Platform.OS === 'ios' ? 'never' : 'never'}
        returnKeyType="search"
        testID={`${testID}-input`}
        accessibilityLabel="Search"
        accessibilityRole="search"
      />
      {text.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={styles.clearButton}
          testID={`${testID}-clear`}
          accessibilityLabel="Clear search"
          accessibilityRole="button"
        >
          <Text style={styles.clearButtonText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    height: 40,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#C7C7CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
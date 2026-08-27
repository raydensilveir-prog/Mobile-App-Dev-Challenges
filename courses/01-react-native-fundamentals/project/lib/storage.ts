import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  type FlatListProps,
} from 'react-native';

const KEYS = {
  notes: '@learner_notes',
  user: '@learner_user',
  theme: '@learner_theme',
};

export type StoredNote = { id: string; text: string; createdAt: string };
export type StoredUser = { email: string; username: string };
export type ThemeMode = 'light' | 'dark';

export async function getNotes(): Promise<StoredNote[]> {
  const raw = await AsyncStorage.getItem(KEYS.notes);
  return raw ? JSON.parse(raw) : [];
}

export async function saveNotes(notes: StoredNote[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.notes, JSON.stringify(notes));
}

export async function getUser(): Promise<StoredUser | null> {
  const raw = await AsyncStorage.getItem(KEYS.user);
  return raw ? JSON.parse(raw) : null;
}

export async function saveUser(user: StoredUser | null): Promise<void> {
  if (user) await AsyncStorage.setItem(KEYS.user, JSON.stringify(user));
  else await AsyncStorage.removeItem(KEYS.user);
}

export async function getTheme(): Promise<ThemeMode> {
  const raw = await AsyncStorage.getItem(KEYS.theme);
  return raw === 'light' ? 'light' : 'dark';
}

export async function saveTheme(theme: ThemeMode): Promise<void> {
  await AsyncStorage.setItem(KEYS.theme, theme);
}

/**
 * Self-contained notes panel. Loads persisted notes from AsyncStorage
 * on mount, and lets the user add / delete notes, writing the full
 * list back to storage on every change. Fulfils "save and retrieve
 * notes locally".
 *
 * NOTE: this file is `.ts`, not `.tsx`, so JSX syntax is not
 * available here — the UI is built with React.createElement instead.
 */
export function NotesPanel() {
  const [notes, setNotes] = useState<StoredNote[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getNotes().then((stored) => {
      if (isMounted) {
        setNotes(stored);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddNote = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newNote: StoredNote = {
      id: `${Date.now()}`,
      text: trimmed,
      createdAt: new Date().toISOString(),
    };

    const nextNotes = [newNote, ...notes];
    setNotes(nextNotes);
    setText('');
    await saveNotes(nextNotes);
  };

  const handleDeleteNote = async (id: string) => {
    const nextNotes = notes.filter((note) => note.id !== id);
    setNotes(nextNotes);
    await saveNotes(nextNotes);
  };

  if (loading) {
    return React.createElement(
      View,
      { style: styles.centered, testID: 'notes-loading' },
      React.createElement(Text, { style: styles.hint }, 'Loading notes...')
    );
  }

  const inputRow = React.createElement(
    View,
    { style: styles.inputRow, key: 'input-row' },
    React.createElement(TextInput, {
      key: 'notes-text-input',
      style: styles.input,
      value: text,
      onChangeText: setText,
      placeholder: 'Write a note...',
      placeholderTextColor: '#64748b',
      testID: 'notes-input',
      accessibilityLabel: 'New note text',
    }),
    React.createElement(
      Pressable,
      {
        key: 'add-note-pressable',
        style: styles.addButton,
        onPress: handleAddNote,
        testID: 'add-note-button',
        accessibilityRole: 'button',
        accessibilityLabel: 'Add note',
      },
      React.createElement(Text, { style: styles.addButtonText }, 'Add')
    )
  );

  const notesBody =
    notes.length === 0
      ? React.createElement(
          View,
          {
            style: styles.centered,
            testID: 'notes-empty-state',
            key: 'notes-empty-state',
          },
          React.createElement(Text, { style: styles.hint }, 'No notes yet.')
        )
      : React.createElement<FlatListProps<StoredNote>>(FlatList, {
          key: 'notes-list',
          data: notes,
          keyExtractor: (item) => item.id,
          testID: 'notes-list',
          renderItem: ({ item }) =>
            React.createElement(
              View,
              { style: styles.noteRow, testID: `note-item-${item.id}` },
              React.createElement(
                Text,
                { style: styles.noteText },
                item.text
              ),
              React.createElement(
                Pressable,
                {
                  onPress: () => handleDeleteNote(item.id),
                  style: styles.deleteButton,
                  testID: `delete-note-${item.id}`,
                  accessibilityRole: 'button',
                  accessibilityLabel: 'Delete note',
                },
                React.createElement(Text, { style: styles.deleteButtonText }, '✕')
              )
            ),
        });

  return React.createElement(
    View,
    { style: styles.panel, testID: 'notes-panel' },
    inputRow,
    notesBody
  );
}

const styles = StyleSheet.create({
  panel: { width: '100%', padding: 16 },
  centered: { alignItems: 'center', paddingVertical: 16 },
  hint: { color: '#64748b', fontSize: 14 },
  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: '#f8fafc',
    borderWidth: 1,
    borderColor: '#334155',
  },
  addButton: {
    backgroundColor: '#38bdf8',
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: { color: '#0f172a', fontWeight: '700' },
  noteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  noteText: { color: '#f8fafc', flex: 1, marginRight: 8 },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: { color: '#f87171', fontWeight: '700', fontSize: 12 },
});
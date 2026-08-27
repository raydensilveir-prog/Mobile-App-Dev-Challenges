import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useAuthStorage } from '../../hooks/useAuthStorage';
import PostFeed from '../../components/PostFeed';

interface Story {
  id: string;
  username: string;
}

const STORIES: Story[] = [
  { id: 'story-1', username: 'aria.codes' },
  { id: 'story-2', username: 'jmiller' },
  { id: 'story-3', username: 'travel_with_zo' },
  { id: 'story-4', username: 'devon_p' },
  { id: 'story-5', username: 'northstar' },
];

export default function FeedScreen() {
  const { user } = useAuthStorage();
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedStory) return;
    const timeout = setTimeout(() => setSelectedStory(null), 1500);
    return () => clearTimeout(timeout);
  }, [selectedStory]);

  return (
    <View style={styles.container} testID="feed-screen">
      <Text style={styles.greeting} testID="feed-greeting">
        Welcome{user ? `, ${user.username}` : ''}!
      </Text>

      <FlatList
        data={STORIES}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storiesList}
        contentContainerStyle={styles.storiesContent}
        testID="feed-stories-list"
        renderItem={({ item }) => (
          <Pressable
            style={styles.storyItem}
            onPress={() => setSelectedStory(item.id)}
            testID={`feed-story-${item.id}`}
            accessibilityRole="button"
            accessibilityLabel={`View ${item.username}'s story`}
          >
            <View
              style={[
                styles.storyAvatar,
                selectedStory === item.id && styles.storyAvatarActive,
              ]}
            >
              <Text style={styles.storyInitial}>
                {item.username[0].toUpperCase()}
              </Text>
            </View>
            <Text style={styles.storyUsername} numberOfLines={1}>
              {item.username}
            </Text>
          </Pressable>
        )}
      />

      <PostFeed />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },

  greeting: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
    padding: 16,
    paddingBottom: 8,
  },

  storiesList: {
    maxHeight: 92,
    flexGrow: 0,
  },

  storiesContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },

  storyItem: {
    width: 68,
    alignItems: 'center',
    marginHorizontal: 4,
  },

  storyAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1e293b',
    borderWidth: 2,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },

  storyAvatarActive: {
    borderColor: '#a855f7',
  },

  storyInitial: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 18,
  },

  storyUsername: {
    color: '#94a3b8',
    fontSize: 11,
    textAlign: 'center',
  },
});
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import SearchBar from './SearchBar';

interface Post {
  id: string;
  username: string;
  avatarUrl: string;
  imageUrl: string;
  caption: string;
  likes: number;
  likedByMe: boolean;
}

function generateMockPosts(): Post[] {
  const usernames = [
    'aria.codes',
    'jmiller',
    'travel_with_zo',
    'devon_p',
    'northstar',
    'kiki.makes',
    'sam_writes',
    'harper.io',
  ];
  const captions = [
    'Golden hour never disappoints 🌅',
    'Shipped a new feature today!',
    'Coffee first, code second ☕',
    'Weekend hike recap',
    'Testing out the new gallery UI',
    'Late night debugging session',
    'Found this gem downtown',
    'Sunday reset',
  ];

  return Array.from({ length: 15 }, (_, i) => ({
    id: `post-${i + 1}`,
    username: usernames[i % usernames.length],
    avatarUrl: `https://i.pravatar.cc/100?img=${(i % 70) + 1}`,
    imageUrl: `https://picsum.photos/seed/post-${i + 1}/600/400`,
    caption: captions[i % captions.length],
    likes: Math.floor(Math.random() * 500),
    likedByMe: false,
  }));
}

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadPosts = useCallback(() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setPosts(generateMockPosts());
        resolve();
      }, 800);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    loadPosts().finally(() => setLoading(false));
  }, [loadPosts]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts().finally(() => setRefreshing(false));
  }, [loadPosts]);

  const handleToggleLike = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likedByMe: !post.likedByMe,
              likes: post.likedByMe ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  }, []);

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    const q = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.username.toLowerCase().includes(q) ||
        post.caption.toLowerCase().includes(q)
    );
  }, [posts, searchQuery]);

  const renderPost = useCallback(
    ({ item }: ListRenderItemInfo<Post>) => (
      <View style={styles.card} testID={`post-card-${item.id}`}>
        <View style={styles.header}>
          <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
          <Text style={styles.username} testID={`post-username-${item.id}`}>
            {item.username}
          </Text>
        </View>

        <Image source={{ uri: item.imageUrl }} style={styles.postImage} />

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => handleToggleLike(item.id)}
            style={styles.likeButton}
            testID={`like-button-${item.id}`}
            accessibilityRole="button"
            accessibilityLabel={item.likedByMe ? 'Unlike post' : 'Like post'}
          >
            <Text style={styles.likeIcon}>
              {item.likedByMe ? '❤️' : '🤍'}
            </Text>
            <Text style={styles.likeCount} testID={`like-count-${item.id}`}>
              {item.likes}
            </Text>
          </TouchableOpacity>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>
      </View>
    ),
    [handleToggleLike]
  );

  if (loading) {
    return (
      <View style={styles.centerState} testID="post-feed-loading">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.stateText}>Loading posts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="post-feed">
      <SearchBar
        onSearch={setSearchQuery}
        placeholder="Search users or captions..."
        testID="post-feed-search-bar"
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        testID="post-feed-list"
        contentContainerStyle={
          filteredPosts.length === 0 ? styles.emptyListContent : undefined
        }
        ListEmptyComponent={
          <View style={styles.centerState} testID="post-feed-empty-state">
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.stateText}>No Data</Text>
            <Text style={styles.stateSubText}>
              {searchQuery
                ? `No posts match "${searchQuery}".`
                : 'No posts to show right now.'}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#E5E5EA',
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  postImage: {
    width: '100%',
    height: 350,
    backgroundColor: '#E5E5EA',
  },
  footer: {
    padding: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  likeIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  likeCount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3C3C43',
  },
  caption: {
    fontSize: 14,
    color: '#000000',
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  stateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3C3C43',
    marginTop: 8,
  },
  stateSubText: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 4,
    textAlign: 'center',
  },
});
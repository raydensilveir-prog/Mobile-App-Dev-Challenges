import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';

interface GalleryImage {
  id: string;
  url: string;
  category: string;
}

const CATEGORIES = ['All', 'Nature', 'City', 'Food', 'Travel', 'Art'];

function generateMockImages(): GalleryImage[] {
  const cats = ['Nature', 'City', 'Food', 'Travel', 'Art'];
  const images: GalleryImage[] = [];
  for (let i = 1; i <= 24; i++) {
    const category = cats[i % cats.length];
    images.push({
      id: `img-${i}`,
      url: `https://picsum.photos/seed/${i}/400/400`,
      category,
    });
  }
  return images;
}

const { width } = Dimensions.get('window');
const GRID_GAP = 8;
const NUM_COLUMNS = 3;
const ITEM_SIZE = (width - GRID_GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

export default function ImageGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setImages(generateMockImages());
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') return images;
    return images.filter((img) => img.category === selectedCategory);
  }, [images, selectedCategory]);

  return (
    <View style={styles.container} testID="image-gallery">
      {/* Horizontal category scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryScrollContent}
        testID="category-scroll"
      >
        {CATEGORIES.map((category) => {
          const isSelected = category === selectedCategory;
          return (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[styles.chip, isSelected && styles.chipSelected]}
              testID={`category-chip-${category.toLowerCase()}`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextSelected,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Loading state */}
      {loading && (
        <View style={styles.centerState} testID="gallery-loading">
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.stateText}>Loading images...</Text>
        </View>
      )}

      {/* Empty state */}
      {!loading && filteredImages.length === 0 && (
        <View style={styles.centerState} testID="gallery-empty-state">
          <Text style={styles.emptyIcon}>🖼️</Text>
          <Text style={styles.stateText}>No Data</Text>
          <Text style={styles.stateSubText}>
            No images found in this category.
          </Text>
        </View>
      )}

      {/* Vertical image gallery */}
      {!loading && filteredImages.length > 0 && (
        <ScrollView
          style={styles.gridScroll}
          contentContainerStyle={styles.gridContent}
          testID="image-gallery-scroll"
        >
          <View style={styles.grid}>
            {filteredImages.map((img) => (
              <TouchableOpacity
                key={img.id}
                style={styles.gridItem}
                testID={`gallery-image-${img.id}`}
                accessibilityRole="imagebutton"
                accessibilityLabel={`${img.category} image`}
              >
                <Image source={{ uri: img.url }} style={styles.gridImage} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryScroll: {
    maxHeight: 48,
    flexGrow: 0,
  },
  categoryScrollContent: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginHorizontal: 4,
  },
  chipSelected: {
    backgroundColor: '#007AFF',
  },
  chipText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  gridScroll: {
    flex: 1,
  },
  gridContent: {
    padding: GRID_GAP,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: GRID_GAP / 2,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#E5E5EA',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
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
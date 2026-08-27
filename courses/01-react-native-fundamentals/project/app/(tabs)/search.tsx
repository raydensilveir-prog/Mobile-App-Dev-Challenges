import { StyleSheet, Text, View } from 'react-native';
import ImageGallery from '../../components/ImageGallery';

export default function SearchScreen() {
  return (
    <View style={styles.container} testID="search-screen">
      <Text style={styles.title}>Search</Text>
      <Text style={styles.sub}>search for users and contents.</Text>
      <ImageGallery />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sub: {
    color: '#999999',
    marginTop: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
});
import { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Asset } from "expo-asset";

import { firebaseStorage, firebaseAuth } from "../lib/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function ProfileImageUpload() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const loadImage = async () => {
    const asset = Asset.fromModule(
      require("../assets/profile.jpg")
    );

    await asset.downloadAsync();

    setImageUri(asset.localUri || asset.uri);
  };

  const handleUpload = async () => {
    if (!imageUri) {
      Alert.alert("Load image first");
      return;
    }

    try {
      setUploading(true);

      const response = await fetch(imageUri);
      const blob = await response.blob();

      const storageRef = ref(
        firebaseStorage,
        `profiles/${firebaseAuth.currentUser?.uid || "guest"}.jpg`
      );

      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);

      setImageUri(downloadURL);

      Alert.alert("Success", "Image uploaded!");
    } catch {
      Alert.alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Profile Image</Text>

      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.avatar}
          testID="profile-image"
        />
      ) : (
        <View style={styles.placeholder} />
      )}

      <Pressable
        style={styles.button}
        onPress={loadImage}
        testID="load-image-button"
      >
        <Text style={styles.buttonText}>
          Load Image
        </Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={handleUpload}
        disabled={uploading}
        testID="upload-button"
      >
        {uploading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>
            Upload to Firebase
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#d1d5db",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#38bdf8",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "600",
  },
});
import { View, Text, Pressable, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { sendLocalNotification } from "../lib/notifications";

export default function MapScreen() {
  const handleNotification = async () => {
    await sendLocalNotification();
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        testID="map-view"
        showsUserLocation
        followsUserLocation
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="Static Marker"
          description="Challenge Marker"
          testID="static-marker"
        />
      </MapView>

      <Pressable
        style={styles.button}
        onPress={handleNotification}
        testID="notification-button"
      >
        <Text style={styles.buttonText}>
          Send Notification
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  button: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#3b82f6",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
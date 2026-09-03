import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { router } from "expo-router";

const PRODUCTS = [
  {
    id: "1",
    name: "iPhone 15",
    price: 999,
  },
  {
    id: "2",
    name: "AirPods Pro",
    price: 249,
  },
  {
    id: "3",
    name: "Apple Watch",
    price: 399,
  },
];

export default function HomeScreen() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: any) => state.cart.items
  );

  const cartCount = useMemo(() => {
    return cartItems.length;
  }, [cartItems]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          E-Commerce Store
        </Text>

        <Pressable
          style={styles.cartButton}
          onPress={() => router.push("/checkout")}
          testID="cart-button"
        >
          <Text style={styles.cartText}>
            Cart ({cartCount})
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>
              {item.name}
            </Text>

            <Text style={styles.price}>
              ${item.price}
            </Text>

            <Pressable
              style={styles.addButton}
              onPress={() =>
                handleAddToCart(item)
              }
              testID={`add-to-cart-${item.id}`}
            >
              <Text style={styles.buttonText}>
                Add To Cart
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  cartButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  cartText: {
    color: "#fff",
    fontWeight: "600",
  },

  productCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },

  productName: {
    fontSize: 18,
    fontWeight: "600",
  },

  price: {
    marginTop: 6,
    marginBottom: 12,
    fontSize: 16,
  },

  addButton: {
    backgroundColor: "#22c55e",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
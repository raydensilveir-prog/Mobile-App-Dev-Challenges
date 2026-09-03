import React, {
  useMemo,
  useCallback,
} from "react";

import {
  View,
  Text,
  Pressable,
} from "react-native";

import { useSelector } from "react-redux";

export default function CheckoutScreen() {
  const cartItems = useSelector(
    (state: any) => state.cart.items
  );

  const total = useMemo(() => {
    return cartItems.reduce(
      (sum: number, item: any) =>
        sum + item.price,
      0
    );
  }, [cartItems]);

  const handleCheckout = useCallback(() => {
    // Stripe checkout placeholder
  }, []);

  return (
    <View>
      <Text testID="cart-total">
        Total: ${total}
      </Text>

      <Pressable
        onPress={handleCheckout}
        testID="checkout-button"
      >
        <Text>Checkout</Text>
      </Pressable>
    </View>
  );
}
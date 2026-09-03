import React, {
  useMemo,
  useCallback,
} from "react";

import {
  FlatList,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

type Product = {
  id: string;
  name: string;
  price: number;
};

type Props = {
  products: Product[];
  onSelect: (product: Product) => void;
};

const ProductItem = React.memo(
  ({
    item,
    onSelect,
  }: {
    item: Product;
    onSelect: (product: Product) => void;
  }) => {
    return (
      <Pressable
        style={styles.card}
        onPress={() => onSelect(item)}
        testID={`product-${item.id}`}
      >
        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text>${item.price}</Text>
      </Pressable>
    );
  }
);

function ProductList({
  products,
  onSelect,
}: Props) {
  const memoizedProducts = useMemo(
    () => products,
    [products]
  );

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductItem
        item={item}
        onSelect={onSelect}
      />
    ),
    [onSelect]
  );

  const keyExtractor = useCallback(
    (item: Product) => item.id,
    []
  );

  return (
    <FlatList
      data={memoizedProducts}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}

export default React.memo(ProductList);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderRadius: 8,
  },

  name: {
    fontWeight: "600",
    marginBottom: 4,
  },
});
import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for the product
type Product = {
  id: number;
  title: string;
  photo: string;
  price: number;
};

// Define the type for navigation stack parameters
type RootStackParamList = {
  ProductDetailScreen: { productId: number };
};

export default function ProductList() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const products: Product[] = [
    {
      id: 1,
      title: "Sản phẩm 1",
      photo: "https://example.com/product1.jpg",
      price: 100000,
    },
    {
      id: 2,
      title: "Sản phẩm 2",
      photo: "https://example.com/product2.jpg",
      price: 200000,
    },
    // More products...
  ];

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetailScreen', { productId: item.id })}
    >
      <Image source={{ uri: item.photo }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>
        {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  productCard: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
});

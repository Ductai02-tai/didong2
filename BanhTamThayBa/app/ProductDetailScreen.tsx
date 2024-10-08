import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

 
type Product = {
  name: string;
  price: string;
  image: any;  
};

type ProductDetailScreenRouteProp = RouteProp<{ params: { product: Product } }, 'params'>;

 
type RelatedProduct = {
  id: string;
  name: string;
  price: string;
  image: any;  
};

const relatedProducts: RelatedProduct[] = [
  { id: '1', name: 'Bò Bía', price: '100.000đ', image: require('@/assets/images/Sản phẩm 1.png') },
  { id: '2', name: 'Chả Cá/miếng', price: '150.000đ', image: require('@/assets/images/Sản phẩm 2.png') },
  { id: '3', name: 'Xíu Mại/Viên', price: '200.000.000đ', image: require('@/assets/images/Sản phẩm 3.png') },
  // Thêm sản phẩm khác
];

const ProductDetailScreen = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const { product } = route.params;  

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

   
  const renderRelatedProduct = ({ item }: { item: RelatedProduct }) => (
    <TouchableOpacity style={styles.relatedProductContainer}>
      <Image source={item.image} style={styles.relatedProductImage} />
      <Text style={styles.relatedProductName}>{item.name}</Text>
      <Text style={styles.relatedProductPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <Image source={product.image} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <View style={styles.quantitySelector}>
        <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Đặt Món</Text>
      </TouchableOpacity>
      <Text style={styles.descriptionTitle}>Mô tả:</Text>
      <Text style={styles.descriptionText}>
        {/* Thêm mô tả sản phẩm tại đây */}
      </Text>
      <Text style={styles.relatedProductsTitle}>Sản phẩm liên quan</Text>
      <FlatList
        data={relatedProducts}
        renderItem={renderRelatedProduct}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productImage: {
    width: width,
    height: 330,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
  quantitySelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  quantityText: {
    width: 60,
    textAlign: 'center',
    fontSize: 15,
  },
  button: {
    width: 50,
    alignItems: 'center',
    backgroundColor: '#fec524',
    padding: 7,
    borderRadius: 2,
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 18,
  },
  orderButton: {
    backgroundColor: '#fec524',
    paddingVertical: 15,
    paddingHorizontal: 150,
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'center',
  },
  orderButtonText: {
    color: '#000',
    fontSize: 19,
  },
  descriptionTitle: {
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 20,
    textAlign: 'justify',
  },
  relatedProductsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  relatedProductContainer: {
    marginRight: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  relatedProductImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  relatedProductName: {
    fontSize: 14,
    textAlign: 'center',
  },
  relatedProductPrice: {
    fontSize: 12,
    color: 'gray',
  },
});

export default ProductDetailScreen;

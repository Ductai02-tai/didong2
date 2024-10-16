import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

// Định nghĩa interface cho params
interface RouteParams {
  productId: string; // hoặc number nếu productId là số
}

// Đường dẫn hình ảnh
const imageMap: { [key: string]: any } = {
  'Sanpham1.png': require('../assets/images/Sanpham1.png'),
  'Sanpham4.png': require('../assets/images/Sanpham4.png'),
  'banhmi.png': require('../assets/images/banhmi.png'),
  'Sanpham3.png': require('../assets/images/Sanpham3.png'),
  'Sanpham6.png': require('../assets/images/Sanpham6.png'),
  'nuocu.png': require('../assets/images/nuocu.png'),
  'banhmi77.png': require('../assets/images/banhmi77.png'),
  default: require('../assets/images/logoba.png'), // Hình ảnh mặc định
};

const ProductDetailScreen = () => {
  const route = useRoute();
  const { productId } = route.params as RouteParams; // Ép kiểu params
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuZ3V5ZW5uZ3V5ZW5kdWN0YWkiLCJpYXQiOjE3Mjg5Nzg5MTIsImV4cCI6MTcyOTA2NTMxMn0.UNj4mMxI2y__wJ_yqoUl4SLYXLXYjTuCAPPwhAdn1rc'; // Thay thế bằng token thực tế
        const response = await axios.get(`http://172.20.10.8:8080/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product detail:', error);
        setError('Error fetching product detail');
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Lấy hình ảnh từ imageMap
  const imageSource = imageMap[product.photo] || imageMap.default;

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.productImage} />
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}>
        {parseFloat(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
      </Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Đặt món</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: 400,
    marginBottom: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 20,
    color: 'green',
  },
  productDescription: {
    fontSize: 16,
    marginVertical: 8,
  },
  orderButton: {
    backgroundColor: 'orange',
    padding: 12,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ProductDetailScreen;

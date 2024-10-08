import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Modal, StyleSheet, ScrollView, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

 
interface Product {
  id: string;
  name: string;
  price: string;
  image: any;
}
 
const products = [
  { id: '1', name: 'Bò Bía', price: '100.000đ', image: require('@/assets/images/Sản phẩm 1.png') },
  { id: '2', name: 'Chả Cá/miếng', price: '150.000đ', image: require('@/assets/images/Sản phẩm 2.png') },
  { id: '3', name: 'Xíu Mại/Viên', price: '200.000đ', image: require('@/assets/images/Sản phẩm 3.png') },
  { id: '4', name: 'Bánh Tằm Bì Xíu Mại', price: '250.000đ', image: require('@/assets/images/Sản phẩm 4.png') },
  { id: '5', name: 'Yaourt/Chai', price: '250.000đ', image: require('@/assets/images/Sản phẩm 5.png') },
  { id: '6', name: 'Chả giòn chiên/cuốn', price: '250.000đ', image: require('@/assets/images/Sản phẩm 6.png') },
];

export default function HomeScreen() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<NavigationProp<any>>();

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => {
        const nextBanner = prevBanner === 3 ? 0 : prevBanner + 1;

        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: nextBanner * width, animated: true });
        }

        return nextBanner;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetailScreen', { product: item })} 
    >
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.productDetails}>
          <Text style={styles.productPrice}>{item.price}</Text>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>Đặt món +</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('@/assets/images/logoba.png')} style={styles.Logo} />
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={toggleSearch}>
            <Ionicons name="search-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
            <Ionicons name="cart-outline" size={24} color="white" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu-outline" size={30} color="yellow" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      {isSearchVisible && (
        <View style={styles.searchBar}>
          <TextInput placeholder="Tìm kiếm..." style={styles.searchInput} placeholderTextColor="#999" />
        </View>
      )}

      {/* Menu Modal */}
      <Modal transparent={true} visible={isMenuVisible} animationType="slide">
        <TouchableOpacity style={styles.modalBackground} onPress={toggleMenu}>
          <View style={styles.menu}>
            <Text style={styles.menuItem}>TRANG CHỦ</Text>
            <Text style={styles.menuItem}>SẢN PHẨM</Text>
            <Text style={styles.menuItem}>GIỚI THIỆU</Text>
            <Text style={styles.menuItem}>LIÊN HỆ</Text>
            <Text style={styles.menuItem}>TUYỂN DỤNG</Text>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Main Content */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productList}
        ListHeaderComponent={
          <View style={{ flex: 1 }}>
            {/* Banners */}
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} ref={scrollViewRef} style={styles.bannerContainer}>
              <Image source={require('@/assets/images/slideshow_1.png')} style={styles.banner} />
              <Image source={require('@/assets/images/slideshow_2.png')} style={styles.banner} />
              <Image source={require('@/assets/images/slideshow_3.png')} style={styles.banner} />
              <Image source={require('@/assets/images/slideshow_4.png')} style={styles.banner} />
            </ScrollView>

            <Image source={require('@/assets/images/img_home_welcome.png')} style={styles.welcomeImage} resizeMode="contain" />
            <Text style={styles.welcomeText}>Chào mừng đến với Bánh Tằm Thầy Ba</Text>
            <View style={styles.iconContainer}>
              <View style={styles.iconWrapper}>
                <Image source={require('@/assets/images/img_icon_home_welcome_1.png')} style={styles.iconImage} />
              </View>
              <View style={styles.iconWrapper}>
                <Image source={require('@/assets/images/img_icon_home_welcome_2.png')} style={styles.iconImage} />
              </View>
              <View style={styles.iconWrapper}>
                <Image source={require('@/assets/images/img_icon_home_welcome_3.png')} style={styles.iconImage} />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Text style={styles.descriptionText}>
                Mở cửa 6:00 - 21:30 hằng ngày tại địa chỉ 344 Tên Lửa, Phường Bình Trị Đông B, Quận Bình Tân, Tp.HCM
              </Text>
              <TouchableOpacity style={styles.exploreButton}>
                <Text style={styles.buttonText}>Đặt Món ngay</Text>
              </TouchableOpacity>

              <View style={styles.bannerSection}>
                <Image source={require('@/assets/images/img_home_banner_1.png')} style={styles.homeBanner} />
                <Image source={require('@/assets/images/img_home_banner_3.png')} style={styles.homeBanner} />
              </View>
              <View style={styles.menuSection}>
                <Text style={styles.menuTitle}>Menu</Text>
                <View style={styles.menuCategories}>
                  <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryText}>Món Chính</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryText}>Món Phụ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryText}>Nước Uống</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>

            <Text style={styles.featuredText}>Sản Phẩm bán chạy</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({

  header: {
    height: 95,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 1,

  },

  Logo: {
    width: 130,
    height: 50,
    marginTop: 20,

  },
  headerRight: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menu: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  menuItem: {
    marginTop: 25,
    fontSize: 18,
    marginBottom: 15,
  },
  //----
  bannerContainer: {
    width: '100%',
    height: 200,
    marginBottom: 15,


  },
  banner: {
    width: width,
    height: 200,

  },
  //----
  welcomeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  welcomeImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 47,
    textAlign: 'center'
  },
  //----
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginBottom: 20,

  },
  iconWrapper: {
    borderRadius: 60,
    borderWidth: 1.5,
    borderColor: 'black',
    padding: 27,
    marginHorizontal: 10,


  },
  iconImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  featuredText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
    marginBottom: 20,
  },
  //-----
  productList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    width: (width / 2) - 20,  // Tính toán căn đúng 2 cột
  },
  productImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  productInfo: {
    width: '100%',
    marginTop: 10,
  },
  productName: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    color: 'red',
  },

  orderButton: {
    borderWidth: 1,
    borderColor: '#fec524',
    borderRadius: 10,

    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  orderButtonText: {
    color: '#c88738',
    fontSize: 14,

  },
  //----------
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  exploreButton: {
    backgroundColor: '#fec524',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fec524',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,

  },
  //----
  bannerSection: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 13,
  },
  homeBanner: {
    width: width - 40,
    height: 160,
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: '#FFD700',

  },
//------menu
menuSection: {
  marginTop: 30,
  alignItems: 'center',
},
menuTitle: {
  fontSize: 25,
  fontWeight: 'bold',
  marginBottom: 20,
  textAlign: 'center',
},
menuCategories: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '85%',
},
categoryButton: {
  backgroundColor: '#fec524',  
  paddingVertical: 10,
  paddingHorizontal: 25,
  borderRadius: 20,  
  borderWidth: 1,
  borderColor: '#FFD700',  
  marginHorizontal: 5,  
  marginBottom: 35,
},
categoryText: {
  color: '#000',  
  fontSize: 15,
  
  textAlign: 'center',
},

});

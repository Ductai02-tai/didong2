import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import this
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Demo from './(tabs)/demo';
import Register from './Register';
import ProductDetailScreen from './ProductDetailScreen';
import CartScreen from './CartScreen';
import ProductList from './ProductList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> {/* Wrap your NavigationContainer */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="demo">
          <Stack.Screen name="demo" component={Demo} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="ProductList" component={ProductList} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}  
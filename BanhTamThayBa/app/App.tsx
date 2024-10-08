import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import demo from './(tabs)/demo';
import Register from './Register';
import ProductDetailScreen from './ProductDetailScreen';
import CartScreen from './CartScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="demo">
        <Stack.Screen name="demo" component={demo} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

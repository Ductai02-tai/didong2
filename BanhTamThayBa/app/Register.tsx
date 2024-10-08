import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Di chuyển logo lên gần đầu trang */}
      <Image style={styles.logo} source={require('@/assets/images/logoba.png')} />

      {/* Tiêu đề ngay dưới logo */}
      <Text style={styles.baseText}>ĐĂNG KÝ TÀI KHOẢN</Text>

      {/* Các trường nhập liệu gần nhau */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        style={styles.inputt}
        placeholder="Nhập lại mật khẩu"
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <View style={styles.registerButton}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </View>

      <Text style={styles.loginText}>
        Đã có tài khoản?{' '}
        <TouchableOpacity>
          <Text style={styles.textLogin}>Đăng nhập</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',  
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingTop: 3, // Giảm khoảng cách từ đầu trang
  },
  logo: {
    width: 350,
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,  // Giảm khoảng cách phía trên của logo
    marginBottom: 20,  // Giảm khoảng cách giữa logo và tiêu đề
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  inputt: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 15,
    marginBottom: 30,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#f4b142',
    padding: 15,
    borderRadius: 40,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  baseText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30,  // Giảm khoảng cách giữa tiêu đề và trường nhập liệu
  },
  loginText: {
    color: '#4285F4',
    marginTop: 20,
    fontSize: 16,
  },
  textLogin: {
    color: 'red',
  },
});

export default Register;

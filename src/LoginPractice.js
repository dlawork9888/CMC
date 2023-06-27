import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

const LoginPractice = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://3.39.131.14:8080/api/v1/auth/signin/member', {
        email: username,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // 로그인 성공 처리
      console.log(response.data);
    } catch (error) {
      // 로그인 실패 처리
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  };
  
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>아이디:</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디를 입력하세요"
        value={username}
        onChangeText={text => setUsername(text)}
      />

      <Text>비밀번호:</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity onPress={handleLogin}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>로그인</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    // Input styles
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF50',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginTop: 50,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
});

export default LoginPractice;

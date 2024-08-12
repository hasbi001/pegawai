import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { Input, Icon } from 'react-native-elements'; 
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        //  Implement login logic here (e.g., API call)
        console.log("Username: " + username + ", Password: " + password);
        const url = 'http://localhost:8080/api/auth/signin';
        const headers = {
        'Content-Type': 'application/json',
        };
        const formData = {
        username: username,
        password: password
        }
        console.log(formData);
        try {
        const response = await axios.post(url, formData, { headers, withCredentials: true });
        console.log(response.data);
        
        navigation.navigate('home' as never);
        } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error saat login:', error.message);
        } else {
            console.error('Error tidak dikenal:', error);
        }
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <Input
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
            leftIcon={{ type: 'font-awesome', name: 'user', size: 24 }}
        />

        <Input
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            leftIcon={{ type: 'font-awesome', name: 'lock', size: 24 }}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff', // Example color
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 15,
    color: '#007bff', // Example color
  }
});

export default LoginScreen;
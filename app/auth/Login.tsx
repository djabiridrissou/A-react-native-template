import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez entrer votre email et mot de passe");
      return;
    }

    try {
      const response = await fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Connexion réussie", "Bienvenue !");
        navigation.navigate('Home');
      } else {
        Alert.alert("Erreur de connexion");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur de connexion", "Impossible de joindre le serveur");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <View style={{ position: 'relative', marginBottom: 12 }}>
        <FontAwesome name="envelope" size={20} style={{ position: 'absolute', left: 12, top: 10 }} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            paddingLeft: 40,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            height: 50,
            paddingVertical: 10,
          }}
        />
      </View>

      <View style={{ position: 'relative', marginBottom: 24 }}>
        <FontAwesome name="lock" size={20} style={{ position: 'absolute', left: 12, top: 10 }} />
        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          style={{
            paddingLeft: 40,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            height: 50,
            paddingVertical: 10,
          }}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={{ position: 'absolute', right: 12, top: 10 }}>
          <FontAwesome name={passwordVisible ? "eye" : "eye-slash"} size={20} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: '#007BFF', padding: 12, borderRadius: 4 }}>
        <Text style={{ color: '#FFF', textAlign: 'center' }}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 20 }}>
        <Text style={{ color: '#007BFF', textDecorationLine: 'underline', textAlign: 'center' }}>
          Créer un compte
        </Text>
      </TouchableOpacity>
    </View>
  );
}

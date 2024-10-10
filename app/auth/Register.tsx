import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const response = await fetch(`${API_URL}auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Inscription réussie', 'Vous pouvez maintenant vous connecter');
        navigation.navigate('Login');
      } else {
        Alert.alert("Erreur d'inscription", data.msg || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur de connexion', 'Impossible de joindre le serveur');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <View style={{ position: 'relative' }}>
            <FontAwesome name="user" size={20} style={{ position: 'absolute', left: 12, top: 10 }} />
            <TextInput
              placeholder="Entrez Votre Nom Complet"
              value={name}
              onChangeText={setName}
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
        </View>
      </View>

      <View style={{ position: 'relative', marginBottom: 12 }}>
        <FontAwesome name="envelope" size={20} style={{ position: 'absolute', left: 12, top: 10 }} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
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

      <View style={{ position: 'relative', marginBottom: 12 }}>
        <FontAwesome name="lock" size={20} style={{ position: 'absolute', left: 12, top: 10 }} />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
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
          <FontAwesome name={passwordVisible ? 'eye' : 'eye-slash'} size={20} />
        </TouchableOpacity>
      </View>

      <View style={{ position: 'relative', marginBottom: 24 }}>
        <FontAwesome name="lock" size={20} style={{ position: 'absolute', left: 12, top: 10 }} />
        <TextInput
          placeholder="Confirmer le mot de passe"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          style={{ position: 'absolute', right: 12, top: 10 }}>
          <FontAwesome name={confirmPasswordVisible ? 'eye' : 'eye-slash'} size={20} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: '#007BFF', padding: 12, borderRadius: 4 }}>
        <Text style={{ color: '#FFF', textAlign: 'center' }}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 20 }}>
        <Text style={{ color: '#007BFF', textDecorationLine: 'underline', textAlign: 'center' }}>
          Déjà un compte? Se connecter
        </Text>
      </TouchableOpacity>
    </View>
  );
}

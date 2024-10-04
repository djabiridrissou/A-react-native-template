// app/auth/Register.tsx
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <View style={{ position: 'relative' }}>
            <FontAwesome name="user" size={20} style={{ position: 'absolute', left: 12, top: 10 }} />
            <TextInput
              placeholder="Prénom"
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
        <View style={{ flex: 1 }}>
          <View style={{ position: 'relative' }}>
            <FontAwesome name="user" size={20} style={{ position: 'absolute', left: 12, top: 10 }} />
            <TextInput
              placeholder="Nom"
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
        <FontAwesome name="home" size={20} style={{ position: 'absolute', left: 12, top: 10 }} />
        <TextInput
          placeholder="Adresse"
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
        <FontAwesome name="envelope" size={20} style={{ position: 'absolute', left: 12, top: 10 }} />
        <TextInput
          placeholder="Email"
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

      <View style={{ position: 'relative', marginBottom: 24 }}>
        <FontAwesome name="lock" size={20} style={{ position: 'absolute', left: 12, top: 10 }} />
        <TextInput
          placeholder="Confirmer le mot de passe"
          secureTextEntry={!confirmPasswordVisible}
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
          <FontAwesome name={confirmPasswordVisible ? "eye" : "eye-slash"} size={20} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{ backgroundColor: '#007BFF', padding: 12, borderRadius: 4 }}>
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

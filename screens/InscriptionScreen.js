import React, { useState } from 'react';
import { auth_service } from '../services/auth.service';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import logoImage from '../public/logo.png'; // Importation de l'image du logo

const InscriptionScreen = () => {
  const navigation = useNavigation();

  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChanges = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    try {
      const response = await auth_service.register(credentials);
      await auth_service.save_token(response.data.accessToken);
      navigation.navigate('DrawerNavigator');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textCenter}>
          <Image source={logoImage} style={styles.logo} />
          <Text style={styles.title}>Créer un compte</Text>
          <Text>
            Vous avez déjà un compte ?{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('SignupScreen')}>
              Connectez-vous
            </Text>
          </Text>
        </View>
        <View style={styles.form}>
          <Text>Prénom</Text>
          <TextInput
            style={styles.input}
            name="firstName"
            onChangeText={(value) => handleChanges('firstName', value)}
            value={credentials.firstName}
          />
          <Text>Nom</Text>
          <TextInput
            style={styles.input}
            name="lastName"
            onChangeText={(value) => handleChanges('lastName', value)}
            value={credentials.lastName}
          />
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            name="email"
            onChangeText={(value) => handleChanges('email', value)}
            value={credentials.email}
          />
          <Text>Mot de passe</Text>
          <TextInput
            style={styles.input}
            name="password"
            secureTextEntry
            onChangeText={(value) => handleChanges('password', value)}
            value={credentials.password}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    maxWidth: 360,
    width: '100%',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    color: '#069',
  },
  form: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#069',
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textCenter: {
    alignItems: 'center',
  },
});

export default InscriptionScreen;

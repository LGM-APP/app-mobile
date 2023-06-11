import React, {useState} from 'react';
import {auth_service} from '../services/auth.service';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';

const InscriptionScreen = () => {
    const navigation = useNavigation();
    const logo = 'chemin_vers_votre_logo';

    const [credentials, setCredentials] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
    });

    const handleChanges = (name, value) => {
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const handleRegister = () => {
        auth_service.register(credentials)
            .then(response => {
                auth_service.save_token(response.data.accessToken);
                navigation.navigate('SignupScreen'); // Assurez-vous que vous avez une route nommée 'Login'
            })
            .catch(err => console.log(err))
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('DrawerNavigator')}>
                <Image source={{uri: logo}} style={styles.logo} />
            </TouchableOpacity>
            <Text style={styles.title}>Créer un compte</Text>
            <Text>Vous avez déjà un compte ?
                <Text style={styles.link} onPress={() => navigation.navigate('SignupScreen')}>Connectez-vous</Text>
            </Text>
            <View style={styles.form}>
                <Text>Prénom</Text>
                <TextInput
                    style={styles.input}
                    name="firstName"
                    onChangeText={value => handleChanges('firstName', value)}
                    value={credentials.firstName}
                />
                <Text>Nom</Text>
                <TextInput
                    style={styles.input}
                    name="lastName"
                    onChangeText={value => handleChanges('lastName', value)}
                    value={credentials.lastName}
                />
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    name="email"
                    onChangeText={value => handleChanges('email', value)}
                    value={credentials.email}
                />
                <Text>Mot de passe</Text>
                <TextInput
                    style={styles.input}
                    name="password"
                    secureTextEntry
                    onChangeText={value => handleChanges('password', value)}
                    value={credentials.password}
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Créer un compte</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
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
        color: 'blue',
    },
    form: {
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'cyan',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    }
});

export default InscriptionScreen;

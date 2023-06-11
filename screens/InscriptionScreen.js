import React, {useState} from 'react';
import { auth_service } from '../services/auth.service.js';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const InscriptionScreen = () => {
    const navigation = useNavigation();

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
                navigation.navigate("SignupScreen");
            })
            .catch(err => console.log(err))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Créer un compte</Text>
            <TextInput
                style={styles.input}
                placeholder="Prénom"
                onChangeText={value => handleChanges('firstName', value)}
                value={credentials.firstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Nom"
                onChangeText={value => handleChanges('lastName', value)}
                value={credentials.lastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={value => handleChanges('email', value)}
                value={credentials.email}
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                secureTextEntry
                onChangeText={value => handleChanges('password', value)}
                value={credentials.password}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Créer un compte"
                    onPress={handleRegister}
                />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        marginTop: 20,
    }
});

export default InscriptionScreen;

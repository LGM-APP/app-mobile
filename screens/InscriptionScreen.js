import React, {useState} from 'react';
import { auth_service } from '../services/auth.service.js';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button } from 'react-native';

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
        <View>
            <Text>Créer un compte</Text>
            <TextInput
                placeholder="Prénom"
                onChangeText={value => handleChanges('firstName', value)}
                value={credentials.firstName}
            />
            <TextInput
                placeholder="Nom"
                onChangeText={value => handleChanges('lastName', value)}
                value={credentials.lastName}
            />
            <TextInput
                placeholder="Email"
                onChangeText={value => handleChanges('email', value)}
                value={credentials.email}
            />
            <TextInput
                placeholder="Mot de passe"
                secureTextEntry
                onChangeText={value => handleChanges('password', value)}
                value={credentials.password}
            />
            <Button
                title="Créer un compte"
                onPress={handleRegister}
            />
        </View>
    );
};

export default InscriptionScreen;

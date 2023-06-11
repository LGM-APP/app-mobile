import Axios from "./api.service";
import AsyncStorage from '@react-native-async-storage/async-storage';

const save_token = async (token) => {
    try {
        await AsyncStorage.setItem('auth_token', token);
    } catch (e) {
        // saving error
    }
}

const get_token = async () => {
    try {
        const value = await AsyncStorage.getItem('auth_token')
        return value;
    } catch(e) {
        // read error
    }
}

const register = (credentials) => {
    return Axios.post("/user/register", credentials)
}

const login = (credentials) => {
    return Axios.post("/user/login", credentials);
}

const logout = async () => {
    try {
        await AsyncStorage.removeItem('auth_token');
    } catch(e) {
        // remove error
    }
}

const is_logged = async () => {
    try {
        const auth_token = await AsyncStorage.getItem('auth_token');
        return !!auth_token;
    } catch(e) {
        // read error
    }
}

export const auth_service = {
    save_token, get_token, is_logged, logout, register, login
}

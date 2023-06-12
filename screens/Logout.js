import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth_service } from "../services/auth.service";

const Logout = () => {
  const navigation = useNavigation();

  useEffect(() => {
    auth_service.logout();
    navigation.navigate('SignupScreen');
  }, []);

  return null;
};

export default Logout;

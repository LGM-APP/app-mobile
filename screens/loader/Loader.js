import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loader = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
      <ActivityIndicator size="large" color="#4A5568" />
    </View>
  );
};

export default Loader;

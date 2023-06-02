import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Filter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Filtres</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexShrink: 0,
  },
  titleContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#D1D5DB',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
});

export default Filter;

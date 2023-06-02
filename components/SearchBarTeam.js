import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

function SearchBarTeam() {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = (text) => {
      setSearchQuery(text);
      // Effectuez la recherche ou appelez une fonction pour traiter la requête de recherche.
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Recherche une équipe"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 8,
    },
    searchInput: {
      backgroundColor: '#ffffff',
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 8,
      borderRadius: 8,
    },
  });
  
  
  export default SearchBarTeam;
  
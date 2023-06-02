import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View, Text, FlatList } from 'react-native';
import SearchBarComp from '../components/SearchBarComp';

const ListTeamScreen = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (filters) => {
    // Effectuez la recherche en utilisant les filtres
    console.log(filters);

    // Ici, vous devez implémenter la logique pour récupérer les résultats en fonction des filtres
    // Pour cet exemple, je vais simuler un résultat de recherche
    const results = [
      { id: '1', title: 'Résultat 1' },
      { id: '2', title: 'Résultat 2' },
    ];

    setSearchResults(results);
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <SearchBarComp onSearch={handleSearch} />
        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default ListTeamScreen;
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EquipeScreen = () => {
  const navigation = useNavigation();

  const [equipes, setEquipes] = useState([
    { id: '1', name: 'Team 1', region: 'EUW', game: 'League of Legends', description: 'The first team in EUW region.', players: ['Player 1', 'Player 2', 'Player 3'] },
    { id: '2', name: 'Team 2', region: 'NA', game: 'League of Legends', description: 'The second team in NA region.', players: ['Player A', 'Player B', 'Player C']},
    { id: '3', name: 'Team 3', region: 'EUW', game: 'Valorant', description: 'The third team in EUW region.', players: ['Player X', 'Player Y', 'Player Z'] },
    { id: '4', name: 'Team 4', region: 'NA', game: 'Valorant', description: 'The fourth team in NA region.', players: ['Player Alpha', 'Player Beta', 'Player Gamma'] },
  ]);

  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [game, setGame] = useState("");

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handleRegionChange = (newRegion) => {
    setRegion(prevRegion => prevRegion === newRegion ? "" : newRegion);
  };

  const handleGameChange = (newGame) => {
    setGame(prevGame => prevGame === newGame ? "" : newGame);
  };

  const filteredEquipes = equipes.filter(equipe => {
    const matchesSearch = !search || equipe.name.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = !region || equipe.region === region;
    const matchesGame = !game || equipe.game === game;

    return matchesSearch && matchesRegion && matchesGame;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.equipeBox}
      onPress={() => navigation.navigate('EquipeDetails', { equipe: item })}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TextInput
        value={search}
        onChangeText={handleSearchChange}
        placeholder="Search teams"
      />

      <View style={styles.filters}>
        <View style={styles.filterRow}>
          <TouchableOpacity onPress={() => handleGameChange('League of Legends')}>
            <Text>{game === 'League of Legends' ? '✅' : ''} League of Legends</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleGameChange('Valorant')}>
            <Text>{game === 'Valorant' ? '✅' : ''} Valorant</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity onPress={() => handleRegionChange('EUW')}>
            <Text>{region === 'EUW' ? '✅' : ''} EUW</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleRegionChange('NA')}>
            <Text>{region === 'NA' ? '✅' : ''} NA</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredEquipes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 10,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  equipeBox: {
    height: Dimensions.get('window').height * 0.10, // 10% of screen height
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default EquipeScreen;

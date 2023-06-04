import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from 'react-native-paper';

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
      onPress={() => navigation.navigate('EquipeDetails', { team: item })}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.textInput}
          value={search}
          onChangeText={handleSearchChange}
          placeholder="Search teams..."
        />
      </View>

      <View style={styles.filters}>
        <View style={styles.filterRow}>
          <RadioButton.Android
            value="League of Legends"
            status={game === 'League of Legends' ? 'checked' : 'unchecked'}
            onPress={() => handleGameChange('League of Legends')}
          />
          <Text style={styles.filterText}>League of Legends</Text>

          <RadioButton.Android
            value="Valorant"
            status={game === 'Valorant' ? 'checked' : 'unchecked'}
            onPress={() => handleGameChange('Valorant')}
          />
          <Text style={styles.filterText}>Valorant</Text>
        </View>

        <View style={styles.filterRow}>
          <RadioButton.Android
            value="EUW"
            status={region === 'EUW' ? 'checked' : 'unchecked'}
            onPress={() => handleRegionChange('EUW')}
          />
          <Text style={styles.filterText}>EUW</Text>

          <RadioButton.Android
            value="NA"
            status={region === 'NA' ? 'checked' : 'unchecked'}
            onPress={() => handleRegionChange('NA')}
          />
          <Text style={styles.filterText}>NA</Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={filteredEquipes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    elevation: 2,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
  },

  filters: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    marginLeft: 0,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
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

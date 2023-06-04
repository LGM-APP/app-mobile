import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, FlatList } from "react-native";
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ListCompScreen = () => {
  const [competitions, setCompetitions] = useState([
    { id: '1', name: 'Spring 2023 EUW', region: 'EUW', game: 'League of Legends', description: 'The spring competition for EUW region.', teams: ['Team 1', 'Team 2', 'Team 3'] },
    { id: '2', name: 'Summer 2023 NA', region: 'NA', game: 'League of Legends', description: 'The summer competition for NA region.', teams: ['Team A', 'Team B', 'Team C'] },
    { id: '3', name: 'Fall 2023 EUW', region: 'EUW', game: 'Valorant', description: 'The fall competition for EUW region.', teams: ['Team X', 'Team Y', 'Team Z'] },
    { id: '4', name: 'Winter 2023 NA', region: 'NA', game: 'Valorant', description: 'The winter competition for NA region.', teams: ['Team Alpha', 'Team Beta', 'Team Gamma'] },
    { id: '5', name: 'Spring 2024 EUW', region: 'EUW', game: 'League of Legends', description: 'The spring competition for EUW region.', teams: ['Team 1', 'Team 2', 'Team 3'] },
    { id: '6', name: 'Summer 2024 NA', region: 'NA', game: 'League of Legends', description: 'The summer competition for NA region.', teams: ['Team A', 'Team B', 'Team C'] },
    { id: '7', name: 'Fall 2024 EUW', region: 'EUW', game: 'Valorant', description: 'The fall competition for EUW region.', teams: ['Team X', 'Team Y', 'Team Z'] },
    { id: '8', name: 'Winter 2024 NA', region: 'NA', game: 'Valorant', description: 'The winter competition for NA region.', teams: ['Team Alpha', 'Team Beta', 'Team Gamma'] },
    { id: '9', name: 'Spring 2025 EUW', region: 'EUW', game: 'League of Legends', description: 'The spring competition for EUW region.', teams: ['Team 1', 'Team 2', 'Team 3'] },
    { id: '10', name: 'Summer 2025 NA', region: 'NA', game: 'League of Legends', description: 'The summer competition for NA region.', teams: ['Team A', 'Team B', 'Team C'] },
    { id: '11', name: 'Fall 2025 EUW', region: 'EUW', game: 'Valorant', description: 'The fall competition for EUW region.', teams: ['Team X', 'Team Y', 'Team Z'] },
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

  const filteredCompetitions = competitions.filter(competition => {
    const matchesSearch = !search || competition.name.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = !region || competition.region === region;
    const matchesGame = !game || competition.game === game;

    return matchesSearch && matchesRegion && matchesGame;
  });

  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const handleTeamPress = () => {
      navigation.navigate('CompetitionDetails', { competition: item });
    };

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.competitionBox}
        onPress={handleTeamPress}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.textInput}
          value={search}
          onChangeText={handleSearchChange}
          placeholder="Search competitions"
        />
      </View>

      <View style={styles.filters}>
        <View style={styles.filterRow}>
          <RadioButton.Android
            value="League of Legends"
            status={game === 'League of Legends' ? 'checked' : 'unchecked'}
            onPress={() => handleGameChange('League of Legends')}
          />
          <Text style={styles.filterText}>LOL</Text>

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
          data={filteredCompetitions}
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
    backgroundColor: '#fff',
    elevation: 2,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
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
    marginLeft: 8,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  competitionBox: {
    height: Dimensions.get('window').height * 0.1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
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

export default ListCompScreen;

import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, FlatList } from "react-native";

const ListCompScreen = ({ navigation }) => {
  const [competitions, setCompetitions] = useState([
    { id: '1', name: 'Spring 2023 EUW', region: 'EUW', game: 'League of Legends', description: 'The spring competition for EUW region.', teams: ['Team 1', 'Team 2', 'Team 3'] },
    { id: '2', name: 'Summer 2023 NA', region: 'NA', game: 'League of Legends', description: 'The summer competition for NA region.', teams: ['Team A', 'Team B', 'Team C'] },
    { id: '3', name: 'Fall 2023 EUW', region: 'EUW', game: 'Valorant', description: 'The fall competition for EUW region.', teams: ['Team X', 'Team Y', 'Team Z'] },
    { id: '4', name: 'Winter 2023 NA', region: 'NA', game: 'Valorant', description: 'The winter competition for NA region.', teams: ['Team Alpha', 'Team Beta', 'Team Gamma'] },
    { id: '5', name: 'Spring 2024 EUW', region: 'EUW', game: 'League of Legends', description: 'The spring competition for EUW region.', teams: ['Team 1', 'Team 2', 'Team 3'] },
    { id: '6', name: 'Summer 2024 NA', region: 'NA', game: 'League of Legends', description: 'The summer competition for NA region.', teams: ['Team A', 'Team B', 'Team C'] },
    { id: '7', name: 'Fall 2024 EUW', region: 'EUW', game: 'Valorant', description: 'The fall competition for EUW region.', teams: ['Team X', 'Team Y', 'Team Z'] },
    { id: '8', name: 'Winter 2024 NA', region: 'NA', game: 'Valorant', description: 'The winter competition for NA region.', teams: ['Team Alpha', 'Team Beta', 'Team Gamma'] },
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.competitionBox}
      onPress={() => navigation.navigate('CompetitionDetails', { competition: item })}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TextInput
        value={search}
        onChangeText={handleSearchChange}
        placeholder="Search competitions"
      />

      <View style={styles.filters}>
        <View style={styles.filterRow}>
          <TouchableOpacity onPress={() => handleGameChange('League of Legends')}>
            <Text>{game === 'League of Legends' ? '✅' : ''} LOL</Text>
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
        data={filteredCompetitions}
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

  competitionBox: {
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

export default ListCompScreen;

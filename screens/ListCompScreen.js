import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, FlatList } from "react-native";

const Competitions = ({ navigation }) => {
  const [competitions, setCompetitions] = useState([
    { id: '1', name: 'Spring 2023 EUW', region: 'euw', game: 'lol' },
    { id: '2', name: 'Summer 2023 EUW', region: 'euw', game: 'lol' },
    { id: '3', name: 'Spring 2023 NA', region: 'na', game: 'lol' },
    { id: '4', name: 'Valorant 202EUW', region: 'euw', game: 'valorant' },
    { id: '5', name: 'Valorant 20NA', region: 'na', game: 'valorant' },
    { id: '7', name: 'Spring 2A', region: 'na', game: 'lol' },
    { id: '8', name: 'Valorant 20 EUW', region: 'euw', game: 'valorant' },
    { id: '9', name: 'Valorant 2 NA', region: 'na', game: 'valorant' },
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
      onPress={() => navigation.navigate('Competition', { competitionId: item.id })}
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
          <TouchableOpacity onPress={() => handleGameChange('lol')}>
            <Text>{game === 'lol' ? '✅' : ''} LOL</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleGameChange('valorant')}>
            <Text>{game === 'valorant' ? '✅' : ''} Valorant</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity onPress={() => handleRegionChange('euw')}>
            <Text>{region === 'euw' ? '✅' : ''} EUW</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleRegionChange('na')}>
            <Text>{region === 'na' ? '✅' : ''} NA</Text>
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

export default Competitions;

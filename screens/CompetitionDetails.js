// CompetitionDetails.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CompetitionDetails = ({ route }) => {
  const { competition } = route.params;

  const navigation = useNavigation();

  if (!competition) {
    return (
      <View style={styles.container}>
        <Text>Competition not found</Text>
      </View>
    );
  }

  const { name, game, region, description, teams } = competition;

  const teamsData = [
    { id: '1', name: 'Team 1', region: 'EUW', game: 'League of Legends', description: 'The first team in EUW region.', players: ['Player 1', 'Player 2', 'Player 3'] },
    { id: '2', name: 'Team 2', region: 'NA', game: 'League of Legends', description: 'The second team in NA region.', players: ['Player A', 'Player B', 'Player C']},
    { id: '3', name: 'Team 3', region: 'EUW', game: 'Valorant', description: 'The third team in EUW region.', players: ['Player X', 'Player Y', 'Player Z'] },
    { id: '5', name: 'Team Alpha', region: 'EUW', game: 'League of Legends', description: 'The fifth team in EUW region.', players: ['Player 1', 'Player 2', 'Player 3'] },
    { id: '6', name: 'Team Beta', region: 'NA', game: 'League of Legends', description: 'The sixth team in NA region.', players: ['Player A', 'Player B', 'Player C']},
    { id: '7', name: 'Team Gamma', region: 'EUW', game: 'Valorant', description: 'The seventh team in EUW region.', players: ['Player X', 'Player Y', 'Player Z'] },
    { id: '8', name: 'Team A', region: 'NA', game: 'Valorant', description: 'The fourth team in NA region.', players: ['Player Alpha', 'Player Beta', 'Player Gamma'] },
    { id: '9', name: 'Team B', region: 'EUW', game: 'Valorant', description: 'The fourth team in EUW region.', players: ['Player Delta', 'Player Epsilon', 'Player Zeta'] },
    { id: '10', name: 'Team C', region: 'EUW', game: 'Valorant', description: 'The fourth team in EUW region.', players: ['Player Delta', 'Player Epsilon', 'Player Zeta'] },
    { id: '11', name: 'Team X', region: 'EUW', game: 'Valorant', description: 'The fourth team in EUW region.', players: ['Player Delta', 'Player Epsilon', 'Player Zeta'] },
    { id: '12', name: 'Team Y', region: 'EUW', game: 'Valorant', description: 'The fourth team in EUW region.', players: ['Player Delta', 'Player Epsilon', 'Player Zeta'] },
    { id: '13', name: 'Team Z', region: 'EUW', game: 'Valorant', description: 'The fourth team in EUW region.', players: ['Player Delta', 'Player Epsilon', 'Player Zeta'] },
  ];

  const competitionTeams = teamsData.filter(team => teams.includes(team.name));

  const handleTeamPress = (team) => {
    navigation.navigate('EquipeDetails', { team: team });
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>{game}</Text>
      <Text style={styles.subtitle}>{region}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.teamsTitle}>Teams:</Text>
      {competitionTeams.map((team, index) => (
        <TouchableOpacity
          key={index}
          style={styles.team}
          onPress={() => handleTeamPress(team)}
        >
          <Text>{team.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
  },
  teamsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  team: {
    fontSize: 16,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
});

export default CompetitionDetails;

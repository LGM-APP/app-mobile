import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CompetitionDetails = ({ route }) => {
  const { competition } = route.params;

  

  if (!competition) {
    return (
      <View style={styles.container}>
        <Text>Competition not found</Text>
      </View>
    );
  }

  const { name, game, region, description, teams } = competition;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>{game}</Text>
      <Text style={styles.subtitle}>{region}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.teamsTitle}>Teams:</Text>
      {teams.map((team, index) => (
        <Text key={index} style={styles.team}>{team}</Text>
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
  },
});

export default CompetitionDetails;

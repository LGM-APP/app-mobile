// EquipeDetails.js
import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, Dimensions, FlatList } from "react-native";
import { matchs_service } from "../services/matchs.service";
import { team_service } from "../services/teams.service";


const EquipeDetails = ({ route }) => {
  const { team } = route.params;
  const { id } = team;
  const [matchs, setMatchs] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetch_data = async () => {
            const match_data = await matchs_service.getMatchsByTeamId(id);
            setMatchs(match_data);

            const playersData = await team_service.getPlayerByTeamId(id);
            setPlayers(playersData);
        }

        fetch_data();
    }, [id]);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Team Details</Text>
        <Text style={styles.subtitle}>{team.name}</Text>
        <Image style={styles.image} source={{ uri: team.imageUrl }} />
        <Text style={styles.subtitle}>Matchs</Text>
        <FlatList
          data={matchs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>{item.name}</Text>
          )}
        />
  
        <Text style={styles.subtitle}>Players</Text>
        <FlatList
          data={players}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>{item.name}</Text>
          )}
        />
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
  playersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  player: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: Dimensions.get('window').height * 0.10, // 10% of screen height
    height: Dimensions.get('window').height * 0.10, // 10% of screen height
    marginRight: 10,
  },
});

export default EquipeDetails;

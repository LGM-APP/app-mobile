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
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: team.imageUrl }} />
      </View>
      <Text style={styles.subtitle}>Matchs</Text>
      {matchs.length > 0 ? (
        <FlatList
          data={matchs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>{item.name}</Text>
          )}
        />
      ) : (
        <Text style={styles.listItem}>Aucun match actuellement</Text>
      )}

      <Text style={styles.subtitle}>Players</Text>
      {players.length > 0 ? (
        <FlatList
          data={players}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>{item.name}</Text>
          )}
        />
      ) : (
        <Text style={styles.listItem}>Aucun joueurs disponibles</Text>
      )}
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 18,
    marginBottom: 5,
    color: '#4B5563',
  },
  imageContainer: {
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.50, // 50% of screen width
    height: Dimensions.get('window').width * 0.50, // 50% of screen width
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,  
    elevation: 5,
    borderRadius: 10, // Optional, if you want the box corners to be rounded
    marginBottom: 20,
  },
  image: {
    width: '80%', 
    height: '80%', 
    resizeMode: 'contain',
  },
});

export default EquipeDetails;

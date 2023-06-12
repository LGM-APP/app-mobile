import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, Dimensions, FlatList, ActivityIndicator  } from "react-native";
import { matchs_service } from "../services/matchs.service";
import { team_service } from "../services/teams.service";


const EquipeDetails = ({ route }) => {
  const { team } = route.params;
  const { id } = team;
  const [matchs, setMatchs] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_data = async () => {
      setLoading(true);
      const match_data = await matchs_service.getMatchsByTeamId(id);
      const playersData = await team_service.getPlayerByTeamId(id);
      setMatchs(match_data);
      setPlayers(playersData);
      setLoading(false);
    }

    fetch_data();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#374151" />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{team.name}</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: team.imageUrl }} />
      </View>
      <View style={styles.section}>
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
      </View>
      
      <View style={styles.section}>
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
          <Text style={styles.listItem}>Aucun joueur actuellement</Text>
        )}
      </View>
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
    
  },
  section: {
    flex: 1,
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

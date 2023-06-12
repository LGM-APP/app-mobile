import React, { useState , useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { team_service } from "../services/teams.service";
import Pagination from "./pagination/Pagination";



const EquipeScreen = () => {
  const navigation = useNavigation();

  const [teamData, setTeamData] = useState({teams: [], totalPages: 0});
  const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchTeamData = async () => {
            
          const data  = await team_service.getAllTeamsData(currentPage);
          setTeamData(data);
        };

        fetchTeamData();
    });

    const [search, setSearch] = useState("");

    const handleSearchChange = (value) => {
        setSearch(value);
    };

    const filteredCompetitions = teamData.teams.filter(team => {
      const name = `${team.name} `
      const matchesSearch = !search || name.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
        key={item.id}
        style={styles.competitionBox}
        onPress={() => navigation.navigate('EquipeDetails', { team: item })}
    >
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image}/>
            <Text style={styles.fullName}>{`${item.name}`}</Text>
        </View>
    </TouchableOpacity>
);

  return (
    <View style={styles.container}>
        <TextInput
            value={search}
            onChangeText={handleSearchChange}
            placeholder="Search teams"
            style={styles.searchInput}
        />
        {teamData.teams.length > 0 ? (
            <FlatList
                data={filteredCompetitions}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        ) : (
            <View style={styles.noDataContainer}>
                <Text>No data available</Text>
            </View>
        )}
        <Pagination
            currentPage={currentPage}
            totalPages={teamData.totalPages}
            onPageChange={setCurrentPage}
        />
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
},
loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
competitionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},
filters: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 10,
},
filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
},
itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
},
image: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    resizeMode: 'contain',
    marginRight: 10,
},
fullName: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
},
searchInput: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
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

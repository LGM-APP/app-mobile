import React, { useState , useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from 'react-native-paper';
import { team_service } from "../services/teams.service";
import Pagination from "./pagination/Pagination";


const EquipeScreen = () => {
  const navigation = useNavigation();

  const [teamData, setTeamData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const { teams, totalPages } = await team_service.getAllTeamsData(
                    currentPage
                );
                setTeamData(teams);
                setTotalPages(totalPages);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des données d'équipe :",
                    error
                );
                setTeamData([]);
                setTotalPages(0);
            }
        };

        fetchTeamData();
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


  return (
    <View style={styles.container}>
        <Text style={styles.title}>Liste des équipes</Text>
        <View style={styles.table}>
            <FlatList
                data={teamData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => navigation.navigate('EquipeDetails', {team: item})}
                    >
                        <Image
                            style={styles.image}
                            source={{uri: item.imageUrl}}
                        />
                        <Text style={styles.teamName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
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
  image: {
    width: Dimensions.get('window').height * 0.10, // 10% of screen height
    height: Dimensions.get('window').height * 0.10, // 10% of screen height
    marginRight: 10,
  },
});

export default EquipeScreen;

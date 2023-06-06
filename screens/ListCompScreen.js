import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, FlatList } from "react-native";
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Pagination from "./pagination/Pagination";


const ListCompScreen = () => {
  const [compData, setCompData] = useState({ series: [], totalPages: 0 });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await comp_service.getAllCompData(currentPage);
        setCompData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données d'équipe :", error);
        setCompData({ series: [], totalPages: 0 });
      }
    };

    fetchData();
  }, [currentPage]);

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
      <Pagination
        currentPage={currentPage}
        totalPages={compData.totalPages}
        onPageChange={setCurrentPage}
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

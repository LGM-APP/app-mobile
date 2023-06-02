import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ComplistTable from './ComplistTable';
import Filter from './Filter';
import { comp_service } from '../../services/comp.service';

const Complist = () => {
  const [tableItems, setTableItems] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const games = ['valorant', 'lol'];
        const data = await comp_service.getCompetitionsByGames(games);
        setTableItems(data);
        console.log(data);
      } catch (error) {
        console.error(
          'Une erreur s\'est produite lors de la récupération des compétitions :',
          error
        );
      }
    };

    fetchTournaments();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compétitions</Text>
      <View style={styles.listContainer}>
        <ComplistTable tableItems={tableItems} />
        <Filter />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
});

export default Complist;

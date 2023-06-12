// CompetitionDetails.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { series_service } from '../services/series.service';
import { matchs_service } from '../services/matchs.service';

const CompetitionDetails = ({ route }) => {
  const { competition } = route.params;
  const { id } = competition;
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournamentData = async () => {
      const tournamentData = await series_service.getTournamentBySerieId(id);
      const tournamentsData = await Promise.all(
        tournamentData.data.map(async (tournament) => {
          const matchsData = await matchs_service.getMatchsByTournamentId(tournament.id);
          return {
            id: tournament.id,
            logo: tournament.serie.leagueId.imageUrl,
            name: tournament.name,
            league_name: tournament.serie.leagueId.name + ' ' + tournament.serie.fullName,
            begin_at: tournament.beginAt,
            end_at: tournament.endAt,
            matchs: matchsData,
          };
        }),
      );
      setTournaments(tournamentsData);
    };

    fetchTournamentData();
  }, [id]);

  if (!competition) {
    return (
      <View style={styles.container}>
        <Text>Competition not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{competition.leagueId.name + ' ' + competition.fullName}</Text>
      <Text style={styles.subtitle}>Date de début : {competition.beginAt}</Text>
      <Text style={styles.subtitle}>Date de fin : {competition.endAt}</Text>
      <Text style={styles.subtitle}>Jeu de la compétition : {competition.leagueId.videoGame.name}</Text>
      <View style={styles.container}>
        <FlatList
          data={tournaments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tournamentItem}>
              <Image style={styles.tournamentLogo} source={{ uri: item.logo }} />
              <View style={styles.matchList}>
                <Text style={styles.matchListTitle}>Liste des matchs</Text>
                {item.matchs.map((match) => (
                  <Text key={match.id} style={styles.matchItem}>
                    {match.name}
                  </Text>
                ))}
              </View>
            </View>
          )}
        />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
    color: '#4B5563',
  },
  tournamentItem: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    alignItems: 'center',
  },
  tournamentLogo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  matchList: {
    width: '100%',
  },
  matchListTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  matchItem: {
    padding: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default CompetitionDetails;

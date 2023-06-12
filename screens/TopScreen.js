import React, { useEffect, useState } from "react";
import { user_service } from "../services/user.service";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";

const TopScreen = () => {
  const [rankList, setRankList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const rankData = await user_service.getUsersRanking();
        setRankList(rankData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const getItemBackgroundColor = (index) => {
    if (index === 0) {
      return "#ffd700"; // gold
    } else if (index === 1) {
      return "#c0c0c0"; // silver
    } else if (index === 2) {
      return "#cd7f32"; // bronze
    } else {
      return "#F1F1F1"; // white
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#374151" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Classement joueurs</Text>
      </View>
      {rankList && rankList.length > 0 ? (
        <FlatList
          data={rankList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={[styles.player, { backgroundColor: getItemBackgroundColor(index) }]}>
              <Text>
                <Text style={styles.label}>Nom :</Text>{" "}
                {item.firstName} {item.lastName}
              </Text>
              <Text>
                <Text style={styles.label}>Points :</Text> {item.point}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text>Aucun joueur</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headingContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  player: {
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
  },
  label: {
    fontWeight: "bold",
  },
});

export default TopScreen;

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { bet_service } from "../services/bet.service";
import { user_service } from "../services/user.service";
import Pagination from "./pagination/Pagination";

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [betList, setBetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userinfo = await user_service.getUserData();
        setUserData(userinfo);

        const betData = await bet_service.getBet(1);
        setBetList(betData.data);

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#374151" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userBox}>
        <Text style={styles.header}>Informations utilisateur</Text>
        {userData ? (
          <View>
            <Text>
              <Text style={styles.bold}>Nom :</Text>{" "}
              {userData.firstName} {userData.lastName}
            </Text>
            <Text>
              <Text style={styles.bold}>Email :</Text> {userData.email}
            </Text>
            <Text>
              <Text style={styles.bold}>Points :</Text> {userData.point}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.betBox}>
        <Text style={styles.header}>Liste des paris</Text>
        {betList.series && betList.series.length > 0 ? (
          <View>
            <FlatList
              data={betList.series}
              keyExtractor={(bet) => bet.id.toString()}
              renderItem={({ item: bet }) => (
                <View style={styles.betItem}>
                  <Text>
                    <Text style={styles.bold}>Match ID:</Text> {bet.matchId.name}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Bet Team ID:</Text>{" "}
                    {bet.betTeamId.name}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Montant:</Text> {bet.amount}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Côte:</Text> {bet.odd}
                  </Text>
                </View>
              )}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={betList.totalPages}
              onPageChange={setCurrentPage}
            />
          </View>
        ) : (
          <Text>Aucun match disponible</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  userBox: {
    flex: 0.2, // 20% of the height
    backgroundColor: "#E5E7EB",
    padding: 16,
  },
  betBox: {
    flex: 0.8, // 80% of the height
    backgroundColor: "#F3F4F6",
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  betItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
});

export default ProfileScreen;

import React, { useEffect, useState} from "react";
import { user_service } from "../services/user.service";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";

const TopScreen=() => {
  
    const [rankList, setrankList] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
  
          const rankData = await user_service.getUsersRanking();
          setrankList(rankData);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données :",
            error
          );
        }
      };
      fetchData();
    }, []);

    return (
      <View style={{ width: '50%', backgroundColor: '#ccc', padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Classement joueurs</Text>
        {rankList && rankList.length > 0 ? (
          <View>
            {rankList.map((rank) => (
              <View key={rank.id}>
                <Text>
                  <Text style={{ fontWeight: 'bold' }}>Nom :</Text>{' '}
                  {rank.firstName} {rank.lastName}
                </Text>
                <Text>
                  <Text style={{ fontWeight: 'bold' }}>Points :</Text>{' '}
                  {rank.point}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text>Aucun joueur</Text>
        )}
      </View>
    );
  };

export default TopScreen;

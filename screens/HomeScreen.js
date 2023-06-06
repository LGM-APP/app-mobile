import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";

const HomeScreen = () => {
  const matches = [
    { id: "1", team1: "G2 Esports", team2: "Fnatic", odds1: 1.8, odds2: 2.2 },
    { id: "2", team1: "G2 Esports", team2: "OG", odds1: 1.8, odds2: 4.2 },
    { id: "3", team1: "Fnatic", team2: "OG", odds1: 2.8, odds2: 2.2 },
    { id: "4", team1: "G2 Esports", team2: "Rogue", odds1: 1.8, odds2: 2.2 },
    { id: "5", team1: "Fnatic", team2: "Rogue", odds1: 1.8, odds2: 2.2 },
    { id: "6", team1: "OG", team2: "Rogue", odds1: 1.8, odds2: 2.2 },
    { id: "7", team1: "G2 Esports", team2: "Misfits", odds1: 1.8, odds2: 2.2 },
    { id: "8", team1: "Fnatic", team2: "Misfits", odds1: 1.8, odds2: 2.2 },
    { id: "9", team1: "OG", team2: "Misfits", odds1: 1.8, odds2: 2.2 },
    { id: "10", team1: "Rogue", team2: "Misfits", odds1: 1.8, odds2: 2.2 },
    { id: "11", team1: "G2 Esports", team2: "Excel", odds1: 1.8, odds2: 2.2 },
    { id: "12", team1: "Fnatic", team2: "Excel", odds1: 1.8, odds2: 2.2 },
    { id: "13", team1: "OG", team2: "Excel", odds1: 1.8, odds2: 2.2 },
    { id: "14", team1: "Rogue", team2: "Excel", odds1: 1.8, odds2: 2.2 },
    // Ajoutez plus de matchs ici si nécessaire
  ];

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [betAmount, setBetAmount] = useState("1");
  const [selectedOdds, setSelectedOdds] = useState({});

  const handleOddsPress = (id, team, odds) => {
    console.log("Odds pressed for", team, "with odds", odds, "for match id", id);
    setSelectedOdds((prevState) => ({ ...prevState, [`${id}-${team}`]: !prevState[`${id}-${team}`] }));
    if (!isTeamAlreadyInCart(id, team)) {
      setCart([...cart, { id, team, odds }]);
    }
  };

  const isTeamAlreadyInCart = (id, team) => {
    return cart.some((item) => item.team === team && item.id === id);
  };

  const handleClearCart = () => {
    setCart([]);
    setSelectedOdds({});
  };

  const handleRemoveFromCart = (index) => {
    const cartItem = cart[index];
    const teamKey = `${cartItem.id}-${cartItem.team}`;
  
    setSelectedOdds((prevSelectedOdds) => ({
      ...prevSelectedOdds,
      [teamKey]: false,
    }));
  
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };
  
  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleBetAmountChange = (value) => {
    if (value && !isNaN(value) && Number(value) >= 1) {
      setBetAmount(value);
    } else {
      setBetAmount("1");
    }
  };

  const calculateTotalOdds = () => {
    return cart.reduce((total, item) => total + item.odds, 0).toFixed(1);
  };

  const calculatePotentialWin = () => {
    const totalOdds = calculateTotalOdds();
    return (betAmount * totalOdds).toFixed(1);
  };

  const handleValidateBet = () => {
    console.log("Bet validated with the following cart: ", cart);
    console.log("Bet validated with the following cart: ", cart);
    // Ajoutez ici la logique nécessaire pour valider le pari
    // Par exemple, vous pouvez envoyer cette information à une API
    handleClearCart(); // vider le panier après la validation
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {matches.map((match, index) => (
          <View key={index} style={styles.matchContainer}>
            <Text style={styles.teamName}>{match.team1}</Text>
            <TouchableOpacity
              style={[
                styles.oddsButton,
                selectedOdds[`${match.id}-${match.team1}`] && { backgroundColor: "#0a0836" },
              ]}
              onPress={() => handleOddsPress(match.id, match.team1, match.odds1)}
              disabled={isTeamAlreadyInCart(match.id, match.team1)}
            >
              <Text style={styles.oddsButtonText}>{match.odds1}</Text>
            </TouchableOpacity>
            <View style={{ width: 20 }}></View>
            <TouchableOpacity
              style={[
                styles.oddsButton,
                selectedOdds[`${match.id}-${match.team2}`] && { backgroundColor: "#0a0836" },
              ]}
              onPress={() => handleOddsPress(match.id, match.team2, match.odds2)}
              disabled={isTeamAlreadyInCart(match.id, match.team2)}
            >
              <Text style={styles.oddsButtonText}>{match.odds2}</Text>
            </TouchableOpacity>
            <Text style={[styles.teamName, styles.teamNameRight]}>
              {match.team2}
            </Text>
          </View>
        ))}
      </ScrollView>
      {isCartOpen && (
        <View style={styles.cartContainer}>
          <Text style={styles.cartTitle}>Panier :</Text>
          {cart.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <Text style={styles.cartItemText}>
                Match {item.id}: {item.team} - Cote: {item.odds}
              </Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFromCart(index)}>
                <Text style={styles.removeButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          ))}
          {cart.length > 0 && (
            <View style={styles.cartActionContainer}>
              <TouchableOpacity style={styles.clearCartButton} onPress={handleClearCart}>
                <Text style={styles.clearCartButtonText}>Vider le panier</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.validateBetButton} onPress={handleValidateBet}>
                <Text style={styles.validateBetButtonText}>Valider le pari</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Cote totale :</Text>
            <Text style={styles.totalValue}>{calculateTotalOdds()}</Text>
          </View>
          <View style={styles.betAmountContainer}>
            <Text style={styles.betAmountLabel}>Mise :</Text>
            <TextInput
              style={styles.betAmountInput}
              value={betAmount}
              onChangeText={handleBetAmountChange}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Gain potentiel :</Text>
            <Text style={styles.totalValue}>{calculatePotentialWin()}</Text>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.cartButton} onPress={handleToggleCart}>
        <Text style={styles.cartButtonText}>Panier ({cart.length})</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  matchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  teamName: {
    flex: 1,
    textAlign: "left",
  },
  teamNameRight: {
    textAlign: "right",
  },
  oddsButton: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d3948",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  oddsButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cartButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#0d3948",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cartButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cartContainer: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    elevation: 5, // for Android
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.25, // for iOS
  },
  cartTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  cartItemText: {
    flex: 1,
  },
  removeButton: {
    backgroundColor: "#f00",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  removeButtonText: {
    color: "#fff",
  },
  clearCartButton: {
    backgroundColor: "#f00",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "flex-end",
  },
  clearCartButtonText: {
    color: "#fff",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  totalText: {
    fontWeight: "bold",
  },
  totalValue: {
    fontWeight: "bold",
  },
  betAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  betAmountLabel: {
    fontWeight: "bold",
  },
  betAmountInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 5,
    textAlign: "center",
  },
  validateBetButton: {
    backgroundColor: "#0d3948",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "flex-end",
    marginTop: 10, // Ajout d'une marge pour séparer les boutons
  },
  validateBetButtonText: {
    color: "#fff",
  },
  cartActionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  clearCartButton: {
    backgroundColor: "#f00",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 5,
  },
  clearCartButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  validateBetButton: {
    backgroundColor: "#0d3948",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginLeft: 5,
  },
  validateBetButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default HomeScreen;

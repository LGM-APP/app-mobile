import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import { matchs_service } from "../services/matchs.service";
import Pagination from "./pagination/Pagination";
import { bet_service } from "../services/bet.service";

const HomeScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
	const [matches, setMatches] = useState([]);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const fetchMatchData = async () => {
			try {
				const data = await matchs_service.getAllMatchs(currentPage);
				setMatches(data.matchs);
				setTotalPages(data.totalPages);
			} catch (error) {
				console.error(error);
			}
		};

		fetchMatchData();
	}, [currentPage]);

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [betAmount, setBetAmount] = useState("1");
  const [selectedOdds, setSelectedOdds] = useState({});

  const handleOddsPress = (id, team, odds, match_name, team_name) => {
    setSelectedOdds((prevState) => ({ ...prevState, [`${id}-${team}`]: !prevState[`${id}-${team}`] }));
    if (!isTeamAlreadyInCart(id, team)) {
      setCart([...cart, { id, team, odds, match_name, team_name }]);
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
    
    cart.forEach((bet) => {
      bet_service
        .addBet({
          matchID: bet.id,
          betTeamID: bet.team,
          amount: betAmount,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    handleClearCart();
  };


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {matches.map((match, index) => (
          <View>
            <Text style={styles.compName} >
            {match.tournament && match.tournament.serie.leagueId.name}
                        {" - "}
                        {match.tournament && match.tournament.serie.fullName}
                        {" : "}
                        {match.tournament && match.tournament.name}
            </Text>
          
          <View key={index} style={styles.matchContainer}>
            <Text style={styles.teamName}>{match.home.name}</Text>
            <TouchableOpacity
              style={[
                styles.oddsButton,
                selectedOdds[`${match.id}-${match.home.id}`] && { backgroundColor: "#0a0836" },
              ]}
              onPress={() => handleOddsPress(match.id, match.home.id, match.homeOdd,  match.name ,match.home.name)}
              disabled={isTeamAlreadyInCart(match.id, match.home.id)}
            >
              <Text style={styles.oddsButtonText}>{match.homeOdd}</Text>
            </TouchableOpacity>
            <View style={{ width: 20 }}></View>
            <TouchableOpacity
              style={[
                styles.oddsButton,
                selectedOdds[`${match.id}-${match.away.id}`] && { backgroundColor: "#0a0836" },
              ]}
              onPress={() => handleOddsPress(match.id, match.away.id, match.awayOdd, match.name, match.away.name)}
              disabled={isTeamAlreadyInCart(match.id, match.away.id)}
            >
              <Text style={styles.oddsButtonText}>{match.awayOdd}</Text>
            </TouchableOpacity>
            <Text style={[styles.teamName, styles.teamNameRight]}>
              {match.away.name}
            </Text>
          </View>
          </View>
        ))}
      </ScrollView>
      {isCartOpen && (
        <View style={styles.cartContainer}>
          <Text style={styles.cartTitle}>Panier :</Text>
          {cart.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <Text style={styles.cartItemText}>
                Match {item.match_name}: {item.team_name} - Cote: {item.odds}
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
      <Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>
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
    marginBottom: 5,
  },
  compName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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

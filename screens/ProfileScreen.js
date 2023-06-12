import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { bet_service } from "../services/bet.service";
import { user_service } from "../services/user.service";
import Loader from "./loader/Loader";

const ProfileScreen = () => {
	const [userData, setUserData] = useState(null);
	const [betList, setBetList] = useState([]);
	const [rankList, setrankList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userinfo = await user_service.getUserData();
				setUserData(userinfo);

				const betData = await bet_service.getBet(1);
				setBetList(betData.data);

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
		<View style={styles.container}>
			<View style={styles.userBox}>
				<Text style={styles.header}>Informations utilisateur</Text>
				{userData ? (
					<View>
						<Text><Text style={styles.bold}>Nom :</Text> {userData.firstName} {userData.lastName}</Text>
						<Text><Text style={styles.bold}>Email :</Text> {userData.email}</Text>
						<Text><Text style={styles.bold}>Points :</Text> {userData.point}</Text>
					</View>
				) : (
					<Loader />
				)}
			</View>
			<View style={styles.betBox}>
				<Text style={styles.header}>Liste des paris</Text>
				{betList.series && betList.series.length > 0 ? (
					<FlatList
						data={betList.series}
						keyExtractor={(bet) => bet.id.toString()}
						renderItem={({item: bet}) => (
							<View>
								<Text><Text style={styles.bold}>Match ID :</Text> {bet.matchId}</Text>
								<Text><Text style={styles.bold}>Bet Team ID :</Text> {bet.betTeamId}</Text>
								<Text><Text style={styles.bold}>Montant :</Text> {bet.amount}</Text>
								<Text><Text style={styles.bold}>Côte :</Text> {bet.odd}</Text>
							</View>
						)}
					/>
				) : (
					<Loader />
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	userBox: {
		flex: 1,
		backgroundColor: '#E5E7EB',
		padding: 16,
	},
	betBox: {
		flex: 1,
		backgroundColor: '#F3F4F6',
		padding: 16,
	},
	rankBox: {
		flex: 1,
		backgroundColor: '#F3F4F6',
		padding: 16,
	},
	header: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	bold: {
		fontWeight: 'bold',
	},
});

export default ProfileScreen;

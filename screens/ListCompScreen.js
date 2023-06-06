import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, FlatList, Image } from "react-native";
import {comp_service} from "../services/comp.service";
import Pagination from "./pagination/Pagination";
import { RadioButton } from 'react-native-paper';

const ITEMS_PER_PAGE = 10;

const ListCompScreen = ({ navigation }) => {
    const [compData, setCompData] = useState({series: [], totalPages: 0});
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const data = await comp_service.getAllCompData(1);
            setCompData(data);
        };

        fetchData();
    }, []);

    const [search, setSearch] = useState("");
    const [game, setGame] = useState("");

    const handleSearchChange = (value) => {
        setSearch(value);
    };

    const handleGameChange = (newGame) => {
        setGame(prevGame => prevGame === newGame ? "" : newGame);
    };

    if (compData.series.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View> 
        )
    }

    const filteredCompetitions = compData.series.filter(competition => {
        const name = `${competition.leagueId.name} ${competition.fullName}`
        const matchesSearch = !search || name.toLowerCase().includes(search.toLowerCase());
        const matchesGame = !game || competition.leagueId.videoGame.name === game;

        return matchesSearch && matchesGame;
    });

    const renderItem = ({ item }) => (
        <TouchableOpacity
            key={item.id}
            style={styles.competitionBox}
            onPress={() => navigation.navigate('CompetitionDetails', { competition: item })}
        >
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.leagueId.imageUrl }} style={styles.image}/>
                <Text style={styles.fullName}>{`${item.leagueId.name} ${item.fullName}`}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                value={search}
                onChangeText={handleSearchChange}
                placeholder="Search competitions"
            />

            <View style={styles.filters}>
                <View style={styles.filterRow}>
                    <View style={styles.row}>
                    <Text>League of Legends</Text>
                    <RadioButton
                        value="LoL"
                        status={ game === 'LoL' ? 'checked' : 'unchecked' }
                        onPress={() => handleGameChange('LoL')}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text>Valorant</Text>
                    <RadioButton
                        value="Valorant"
                        status={ game === 'Valorant' ? 'checked' : 'unchecked' }
                        onPress={() => handleGameChange('Valorant')}
                    />
                    </View>
                </View>
                </View>
            {compData.series.length > 0 ? (
                <FlatList
                    data={filteredCompetitions}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            ) : (
                <View style={styles.noDataContainer}>
                    <Text>No data available</Text>
                </View>
            )}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    competitionBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 5,
        margin: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    filters: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: 10,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').width * 0.2,
        resizeMode: 'contain',
        marginRight: 10,
    },
    fullName: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
});

export default ListCompScreen;


import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, FlatList, Image } from "react-native";
import {comp_service} from "../services/comp.service";
import Pagination from "./pagination/Pagination";

const ITEMS_PER_PAGE = 5;

const ListCompScreen = ({ navigation }) => {
    const [compData, setCompData] = useState({series: [], totalPages: 0});
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(compData.series.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const currentItems = compData.series.slice(startIndex, endIndex);

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

    const filteredCompetitions = currentItems.filter(competition => {
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
                    <TouchableOpacity onPress={() => handleGameChange('LoL')}>
                        <Text>{game === 'LoL' ? '✅' : ''} League of Legends</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleGameChange('Valorant')}>
                        <Text>{game === 'Valorant' ? '✅' : ''} Valorant</Text>
                    </TouchableOpacity>
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
                totalPages={totalPages}
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
        resizeMode: 'cover',
        marginRight: 10,
    },
    fullName: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
    },
});

export default ListCompScreen;


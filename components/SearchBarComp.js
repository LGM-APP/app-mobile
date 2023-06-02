import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';

const SearchBarComp = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [game, setGame] = useState({ valo: false, lol: false });

  const handleSearch = () => {
    onSearch({ searchTerm, region, game });
  };

  const toggleGame = (gameName) => {
    setGame({ ...game, [gameName]: !game[gameName] });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
        placeholder="Rechercher..."
      />

      <Text style={styles.label}>Région:</Text>
      <RadioButton.Group onValueChange={setRegion} value={region}>
        <View style={styles.radioContainer}>
          <RadioButton.Item label="EUW" value="EUW" />
          <RadioButton.Item label="NA" value="NA" />
          <RadioButton.Item label="SA" value="SA" />
          {/* Ajoutez d'autres régions si nécessaire */}
        </View>
      </RadioButton.Group>

      <Text style={styles.label}>Jeu:</Text>
      <RadioButton.Group onValueChange={setGame} value={game}>
        <View style={styles.radioContainer}>
          <RadioButton.Item label="VALO" value="VALO" />
          <RadioButton.Item label="LOL" value="LOL" />
          {/* Ajoutez d'autres jeux si nécessaire */}
          </View>
      </RadioButton.Group>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 18,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SearchBarComp;
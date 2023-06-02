import React, { useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { truncateText } from "../../utils/utils";
import Pagination from "screens\pagination\Pagination.js";
import Loader from "screens\loader\Loader.js";

const ITEMS_PER_PAGE = 5;

const ComplistTable = ({ tableItems }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tableItems.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentItems = tableItems.slice(startIndex, endIndex);

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: item["serie"]["leagueId"]["imageUrl"] }}
        />
      </View>
      <View>
        <Text style={styles.text}>
          {truncateText(item["serie"]["leagueId"]["name"], 20)}
        </Text>
      </View>
      <View>
        <Text style={styles.text}>{item["serie"]["fullName"]}</Text>
      </View>
      <View>
        <Text style={styles.text}>{truncateText(item.name, 20)}</Text>
      </View>
      <View>
        <Text style={styles.text}>{truncateText(item["winner"]["name"], 25)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {tableItems.length === 0 ? (
        <Loader />
      ) : (
        <FlatList
          data={currentItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          }
        />
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    marginTop: 8,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    flex: 2,
    marginLeft: 10,
  },
};

export default ComplistTable;

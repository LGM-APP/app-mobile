import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const MAX_PAGE_NUMBERS = 5; // Nombre maximum de numéros de pages à afficher

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(2, currentPage - Math.floor(MAX_PAGE_NUMBERS / 2));
    let endPage = Math.min(
      startPage + MAX_PAGE_NUMBERS - 3,
      totalPages - 1
    );

    if (startPage > 2) {
      pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }

    return [1, ...pageNumbers, totalPages];
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePreviousPage}
        disabled={currentPage === 1}
        style={[
          styles.pageButton,
          styles.firstButton,
          currentPage === 1 && styles.disabledButton,
        ]}
      >
        <Text style={styles.pageButtonText}>Previous</Text>
      </TouchableOpacity>
      {getPageNumbers().map((pageNumber, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPageChange(pageNumber)}
          style={[
            styles.pageButton,
            pageNumber === currentPage && styles.currentButton,
          ]}
        >
          <Text
            style={[
              styles.pageButtonText,
              pageNumber === currentPage && styles.currentButtonText,
            ]}
          >
            {pageNumber}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={handleNextPage}
        disabled={currentPage === totalPages}
        style={[
          styles.pageButton,
          styles.lastButton,
          currentPage === totalPages && styles.disabledButton,
        ]}
      >
        <Text style={styles.pageButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  pageButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  firstButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  lastButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  pageButtonText: {
    color: '#000'
  },
  currentButton: {
    borderColor: '#000',
    backgroundColor: '#000',
  },
  currentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default Pagination;

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

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
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
          style={{
            opacity: currentPage === 1 ? 0.5 : 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#fff',
          }}
        >
          <Text style={{ color: '#000' }}>Previous</Text>
        </TouchableOpacity>
        {getPageNumbers().map((pageNumber, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onPageChange(pageNumber)}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderWidth: 1,
              borderColor: pageNumber === currentPage ? '#000' : '#ccc',
              backgroundColor: pageNumber === currentPage ? '#000' : '#fff',
            }}
          >
            <Text
              style={{
                color: pageNumber === currentPage ? '#fff' : '#000',
                fontWeight: pageNumber === currentPage ? 'bold' : 'normal',
              }}
            >
              {pageNumber}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
          style={{
            opacity: currentPage === totalPages ? 0.5 : 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#fff',
          }}
        >
          <Text style={{ color: '#000' }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pagination;

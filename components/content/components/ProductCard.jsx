
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProductCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.productContainer}>
      <Image source={{ uri: item.foto }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.nombre}</Text>
        <Text style={styles.productDescription}>{item.descripcion}</Text>
        <Text style={styles.productPrice}>${item.precio}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    margin: 10,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderRadius: 5,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  productPrice: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default ProductCard;

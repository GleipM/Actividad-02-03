import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../utils/firebase.config';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Referencia a la colección 'productos'
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const productsList = querySnapshot.docs.map(doc => doc.data());
        
        setData(productsList);
      } catch (error) {
        console.error("Error al obtener productos de Firestore: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }) => {
    return <ProductCard item={item} />;
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} 
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default Products;

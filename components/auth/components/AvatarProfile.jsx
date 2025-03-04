import { Avatar, Icon } from '@rneui/base';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../../utils/firebase.config';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AvatarProfile = ({ user }) => {
    const auth = getAuth(app);
    const [userCredential, setUseCredential] = useState(auth.currentUser);

    const agregarProductos = async () => {
        console.log("Hola")
        const productosRef = collection(db, 'productos');

        // Usando map para iterar sobre los productos y agregarlos a Firestore
        await Promise.all(
            productos.map(async (producto) => {
                try {

                    await addDoc(productosRef, producto);
                    console.log('Producto ${producto.nombre} agregado con éxito.');
                } catch (e) {
                    console.error('Error agregando el producto: ', e);
                }
            })
        );
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUseCredential(user);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Avatar
                rounded
                size="xlarge"
                source={user.photoUrl ? { uri: user.photoUrl } : { uri: 'https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da8438a17815a33470df87e42ede' }}
                containerStyle={styles.avatar}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Datos</Text>
                <View style={styles.infoItem}>
                    <Text>Usuario:</Text>
                    <Text style={styles.text}>{user.phoneNumber}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text>Email::</Text>
                    <Text style={styles.text}>{userCredential?.email}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text>Carrera:</Text>
                    <Text style={styles.text}>{user.carrera}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    avatar: {
        marginBottom: 20,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    infoContainer: {
        width: '100%',
        padding: 20,
        borderRadius: 10
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginLeft: 10,
    },
});

export default AvatarProfile;
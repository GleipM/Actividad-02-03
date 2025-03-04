import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import AvatarProfile from '../components/AvatarProfile';

const Profile = () => {
    const auth = getAuth();
    const [user] = useState(auth.currentUser);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        if (user) {
            const fetchProfileData = async () => {
                const db = getFirestore();
                const userRef = doc(db, 'users', user.uid); 
                const docSnap = await getDoc(userRef); 

                if (docSnap.exists()) {
                    setProfileData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            };

            fetchProfileData(); 
        }
    }, [user]);

    return (
        <View style={styles.container}>
            {profileData ? (
                <>
                    <AvatarProfile user={profileData} /> {}

                </>
            ) : (
                <Text>Cargando...</Text>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 64,
        backgroundColor: "white",
        alignItems: 'center',
    },
});

export default Profile;

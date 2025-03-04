import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { getAuth, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../../utils/firebase.config';
import { useNavigation } from '@react-navigation/native';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { Input, Button } from 'react-native-elements';

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, user, password).then((userCredential) => {
      console.log("ingreso");
      const user = userCredential.user;
      save(user.uid);
      navigation.navigate("HomeProfile");
    }).catch(error => {
      console.log(error);
    });
  };

  const save = async (uid) => {
    const data = {
      name: "Max",
      phoneNumber: "7771932360"
    };

    try {
      if (uid) {
        const userRef = doc(db, 'users', uid);
        await setDoc(userRef, data, { merge: true });
        console.log("User profile saved:", data);
      } else {
        console.log("Error: Invalid UID");
      }
    } catch (error) {
      console.log("Error saving user profile:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Login</Text>
        <View style={{ width: '100%', marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Input
            placeholder="Username"
            keyboardType="email-address"
            onChangeText={(text) => setUser(text)}
          />
          <Input
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Button title="Iniciar Sesion" onPress={handleSignIn} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
    width: '100%',
    paddingVertical: 110
  },
  text: {
    fontSize: 44,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    width: '100%'
  }
});

export default Login;
import { initializeApp } from 'firebase/app'; // Importamos la función de inicialización
import { getFirestore } from 'firebase/firestore';  // Si vas a usar Firestore
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyACR7_RbgpOg1JLt6UwuG6I1xH5lYOXS5I",
  authDomain: "airbnbe-b0779.firebaseapp.com",
  projectId: "airbnbe-b0779",
  storageBucket: "airbnbe-b0779.firebasestorage.app",
  messagingSenderId: "691149767342",
  appId: "1:691149767342:web:0a957ab257ffa176cca33f"
};

const app = initializeApp(firebaseConfig);
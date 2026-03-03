 import{
    firebaseConfig,
    initializeApp,
    getAuth, 
    createUserWithEmailAndPassword,
   onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider, 
    signInWithPopup
  } from './Firebase.js'

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { router } from 'expo-router'
import { Alert } from 'react-native';

const Main = () => {

  // send user to login page if unauthorised
  useEffect(() => {
    const logOut = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/') 
      }
    })
    return logOut
  }, [])

  // signing out user
  const handleSignOut = async () => {
    await signOut(auth)
  }

  // get users data from database
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'users', auth.currentUser.uid) 
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUserData(docSnap.data())
        }
      }
    }
    fetchUserData()
  }, [])

  // redirect to level 1
  const redirectLevel1 = () => {
    router.replace('/level1')
  };

  // redirect level 2
  const redirectLevel2 = () => {
    if (!userData) { // alert for if it takes a while to get users data
      Alert.alert("Loading...", "Please wait while we load your progress.");
      return; // prevents crash if nothing found
    }
    const level1Score = userData.highscores.level1;
    // only redirect if user has high enough score on level 1
    if (level1Score >= 3) {
      router.replace('/level2'); 
    } else {
      Alert.alert(
        "Level 2 Locked",
        "You need a score of 3 on Level 1 to unlock Level 2."
      );
    }
  };

  // redirect level 3
  const redirectLevel3 = () => {
    if (!userData) { // alert for if it takes a while to get users data
      Alert.alert("Loading...", "Please wait while we load your progress.");
      return;
    }
    const level2Score = userData.highscores.level2;
    // only redirect if user has high enough score on level 2
    if (level2Score >= 3) {
      router.replace('/level3'); 
    } else {
      Alert.alert(
        "Level 3 Locked",
        "You need a score of 3 on Level 2 to unlock Level 3."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.heading}>
        <Text style={[styles.title, , {textAlign: 'center'}]}>Welcome to Quiz King!</Text>
      </View>
      
      <View style={styles.content}>
        <TouchableOpacity style={styles.card} onPress={redirectLevel1}>
          <Text style={[styles.text, {textAlign: 'center'}]}>Level 1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={redirectLevel2}>
          <Text style={[styles.text, {textAlign: 'center'}]}>Level 2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={redirectLevel3}>
          <Text style={[styles.text, {textAlign: 'center'}]}>Level 3</Text>
        </TouchableOpacity>
      </View>
      
      <View>
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={styles.button}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#c1b9ddff',
  },
  heading: {
    alignItems: 'center',
    paddingTop: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 60,
    color: 'purple',
  },
  text: {
    fontSize: 40,
    color: 'purple',
  },
  card: {
    backgroundColor: '#d2cbeaff',
    width: 300,
    padding: 20,
    margin: 30,
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#a56dbaff',
    padding: 10,
    marigin: 20,
  },
})
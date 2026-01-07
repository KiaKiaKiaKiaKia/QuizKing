import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { router, Link } from 'expo-router'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'



const Signup = () => {
  // set variables
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // creates a new user in the firestore database
  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      // add fields in database for user
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        highscores: {
          level1: 0,
          level2: 0,
          level3: 0,
        },
      })
      router.replace('/main') // take to main page 
    } catch (error) { // error handling
      console.log(error)
      alert('Sign up failed: ' + error.message)
    }
  }


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.heading}>
        <Text style={styles.title}>Quiz King</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={[styles.text, { textAlign: 'center' }]}>SignUp</Text>

          <TextInput
            style={styles.input}
            placeholder='Email'
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={signUp}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>

        <Link href='/' style={styles.link}>Back to Login</Link>
      </View>
      
    </SafeAreaView>
  )
}

export default Signup

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
    borderRadius: 5,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
    color: '#9344b0ff',
    borderColor: '#9344b0ff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#EEE',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#a56dbaff',
    padding: 10,
  },
})

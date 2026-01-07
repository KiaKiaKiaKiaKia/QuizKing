import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Link, router } from 'expo-router'
import { auth } from '../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'



const Login = () => {
  // set variables
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // log user in if matches authentication
  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth,email,password);
      if (user) router.replace('/main'); // take to main page if valid details
    } catch (error) { // error handling
      console.log(error)
      alert('Sign in failed: ' + error.message);
    }
  }


  return (
      <SafeAreaView style={styles.container}>
        
        <View style={styles.heading}>
          <Text style={styles.title}>Quiz King</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}> 
            <Text style={[styles.text, {textAlign: 'center'}]}>Login</Text>
            <TextInput style={styles.input} placeholder='Email' autoCapitalise='none' value={email} onChangeText={setEmail}/>
            <TextInput style={styles.input} placeholder='Password' secureTextEntry value={password} onChangeText={setPassword}/>

            <TouchableOpacity style={styles.button} onPress={signIn}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
          <Link href="/signup" style={styles.link}>Don't have an acount? Sign up here!</Link>
        </View>
      
      </SafeAreaView>
  )
}

export default Login


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
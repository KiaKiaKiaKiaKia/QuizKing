import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react';


const results = () => {

  // set variables
  const { finalScore, highScore } = useLocalSearchParams(); 
  const score = Number(finalScore);
  const bestScore = Number(highScore);
  const [message, setMessage] = useState('');

  // compare new score to high score for message
  useEffect(() => {
    if (finalScore > bestScore) {
      setMessage('Good job! New High Score!');
    } else {
      setMessage('No new high score.');
    }
  }, [finalScore, bestScore]);

  // redirect to main page
  const redirectMain = () => {
    router.replace('/main')
  };

  // try quiz again
  const tryAgain = () => {
    router.replace('/level1')
  };


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Results!</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.text}>Previous High Score: {bestScore}</Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.text}>Score: {score}</Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.text}>{message} </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={redirectMain}>
          <Text>Exit Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={tryAgain}>
          <Text>Try again!</Text>
        </TouchableOpacity>
      </View>   

    </SafeAreaView>
  )
}

export default results


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#c1b9ddff',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingHorizontal: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 60,
    color: 'purple',
  },
  text: {
    fontSize: 20,
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
  },
})
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useState, useEffect } from 'react';
import level2Questions from '../assets/questions/level2';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Alert } from 'react-native';


const level2 = () => {

  // set variables
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(null);

  // get high score to display
  useEffect(() => {
    const fetchHighScore = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const level2HighScore = userSnap.data().highscores.level2;
          setHighScore(level2HighScore);
        } 
      } catch (error) { // error handling
        console.error("Error fetching high score:", error);
      }
    };
    fetchHighScore();
  }, []);

  // updating high score
  const updateHighScore = async (newScore) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return; // prevents crash by stopping function if no user
      const userRef = doc(db, "users", user.uid);
      // update highscore
      if (newScore > highScore) {
        const updateData = {
          "highscores.level2": newScore,
        };
        // update in Firestore
        await updateDoc(userRef, updateData);
        // update score variable
        setHighScore(newScore);
      }
    } catch (error) { // error handling
      console.error("Error updating high score:", error);
    }
  };

  // tracks scores
  const handleAnswer = async (isCorrect) => { 
    let finalScore;
      if (isCorrect) {
        finalScore = score + 1;
        Alert.alert('Correct!');
      } else {
        finalScore = score; 
        Alert.alert('Incorrect!');
      }

  // tracks questions
  if (currentIndex < level2Questions.length - 1) {
    setCurrentIndex(prev => prev + 1);
  } else {
    // end of quiz 
    await updateHighScore(finalScore); // update final score
    router.replace({
      pathname: '/results', // send user to results page
      params: { finalScore, highScore }, // send scores to results page to display
    });
  }
  if (isCorrect) {
    setScore(prev => prev + 1);
  }
};

  // redirect to main page
  const redirectMain = () => {
    router.replace('/main')
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.heading}>

        <View style={styles.scoreCard}>
          <Text style={styles.text}>Score:</Text>
          <Text style={styles.text}>{score}</Text>
        </View>

        <View style={styles.scoreCard}>
          <Text style={styles.text}>Highscore:</Text>
          <Text style={styles.text}>{highScore}</Text>
        </View>
        
      </View>

      <Text style={styles.title}>Level 2</Text>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.text}>
            {level2Questions[currentIndex].question}
          </Text>
        </View>
        
        <View style={styles.questionContainer}>
          <View style={styles.questionContainer}>
            {level2Questions[currentIndex].answers.map((answer, index) => (
            <TouchableOpacity key={index} style={styles.answerButton} onPress={() => handleAnswer(answer.correct)}>
              <Text style={styles.text}>{answer.text}</Text>
            </TouchableOpacity>
            ))}
          </View>
        </View>
        
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={redirectMain}>
          <Text>Exit Quiz</Text>
        </TouchableOpacity>
      </View>

   </SafeAreaView>
  )
}

export default level2


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
    padding: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
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
    width: '80%',
    padding: 20,
    marginVertical: 20,
    borderRadius: 5,
  },
  scoreCard: {
    backgroundColor: '#d2cbeaff',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  answerButton: {
    alignItems: 'center',
    backgroundColor: '#a56dbaff',
    width: '45%',
    aspectRatio: 1,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#a56dbaff',
    padding: 10,
  },
})
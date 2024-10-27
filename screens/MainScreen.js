import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth} from 'firebase/auth';

export default function MainScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, navigate to the ChatScreen
        navigation.replace('Chat');
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleRegister = () => {
    navigation.navigate('Registration');
  };

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(function (_firebaseUser) {
        Alert.alert('User logged in!');
        // Navigate to the ChatScreen
        navigation.replace('Chat');
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          Alert.alert('Wrong password.');
        } else {
          Alert.alert(errorMessage);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text>Main Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

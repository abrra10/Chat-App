import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';




export default function RegistrationScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update the user's display name with their first name
        updateProfile(user, { displayName: firstName })
          .then(() => {
        
           // Firestore
            const firestore = getFirestore();
            const userDocRef = doc(firestore, 'users', user.uid);
            setDoc(userDocRef, {
              firstName: firstName,
              lastName: lastName,
              email: email,
            }, { merge: true });

            Alert.alert('Registration successful');
            navigation.navigate('Login', { email: user.email, isEmailVerified: user.emailVerified });
          })
          .catch((error) => {
            console.error('Error updating user profile:', error);
            Alert.alert('Error updating user profile');
          });
      })
      .catch((error) => {
        console.error('Error registering the user:', error);
        Alert.alert('Registration failed. Please check your email and password.');
      });
  };

  return (
    <View style={styles.container}>
      <Text>Registration Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
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

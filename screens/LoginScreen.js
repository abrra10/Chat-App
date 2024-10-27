import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { auth } from 'firebase/auth';
import { signInWithEmailAndPassword, sendEmailVerification, getAuth } from 'firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const openRegisterScreen = () => {
    navigation.navigate('Register');
  };

  const handleVerifyEmail = () => {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert('Email verification link sent! Please check your inbox and click the link.');
      })
      .catch((error) => {
        console.error('Error sending email verification link:', error);
        alert('Error sending email verification link. Please try again.');
      });
  };

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user && user.emailVerified) {
          navigation.navigate('Chat');
        } else {
          alert('Please verify your email before signing in.');
          handleVerifyEmail(); // Optionally resend the verification email
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter your email'
        label='Email'
        leftIcon={{ type: 'material', name: 'email' }}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder='Enter your password'
        label='Password'
        leftIcon={{ type: 'material', name: 'lock' }}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title="Sign In" style={styles.button} onPress={signin} />
      <Button title="Register" style={styles.button} onPress={openRegisterScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 100,
  },
  button: {
    width: 370,
    marginTop: 10,
  },
});

export default Login;

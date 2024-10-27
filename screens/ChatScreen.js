import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, signOut, db } from 'firebase/firestore';
import {
  collection,
  addDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(getFirestore(), 'chats'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        );
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL,
            }}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLogout = () => {
    if (auth) {
      signOut(auth)
        .then(() => {
          navigation.replace('Login');
        })
        .catch((error) => {
          console.error('Logout error:', error);
        });
    } else {
      console.error('auth is not defined');
    }
  };

const onSend = useCallback(async (messages = []) => {
  try {
    // Append new messages to the state
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    // Extract the relevant information from the sent message
    const { _id, createdAt, text } = messages[0];

    // Get the current user from Firebase Authentication
    const currentUser = auth.currentUser;

    // Ensure that the user is authenticated before attempting to send a message
    if (currentUser) {
      // Get a reference to the 'chats' collection in Firestore
      const chatsCollection = collection(getFirestore(), 'chats');

      // Add a new document to the 'chats' collection with the message data
      await addDoc(chatsCollection, {
        _id,
        createdAt: serverTimestamp(),
        text,
        user: {
          _id: currentUser.uid, // Set the user ID
          name: currentUser.displayName,
          // Omit the avatar property or provide a default value if needed
        },
      });
    } else {
      console.error('User is not authenticated.');
    }
  } catch (error) {
    console.error('Error storing message in Firestore:', error);
  }
}, []);

  
  

  return <GiftedChat messages={messages} onSend={onSend} user={{ _id: auth?.currentUser?.uid }} />;
};

export default ChatScreen;

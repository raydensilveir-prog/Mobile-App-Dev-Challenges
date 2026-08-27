import React from 'react';
import { View, Text, Image, Button, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';

export default function ProfileCard() {
    const [isFollowing, setIsFollowing] = useState(false);

    const handlePress = () => {
        setIsFollowing((prevState)=> !prevState);
    };
    const navigation=useNavigation();
      const{username}=useLocalSearchParams<{
        username:string;
      }>();
    return(
        <View style={styles.card} testID="profile-card">
  <Image
    testID="profile-avatar"
    source={{
      uri: 'https://imgs.search.brave.com/rqkeU77w1m9hk0K-tc7Rlkxqd_FlxVdlyrIp6hCr_yY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tdmVj/dG9yL2NoYXJhY3Rl/ci1hcnQtYW5pbWUt/c3R5bGVfOTYxMzA3/LTIzNTc4LmpwZz9z/ZW10PWFpc190ZXN0/X2Imdz03NDAmcT04/MA',
    }}
    style={styles.profileImage}
/>

<Text
  testID="profile-username"
  style={styles.uname}
>
  @Rayden
</Text>

<Text
  testID="profile-bio"
  style={styles.jobTitle}
>
  Junior React Native Developer
</Text>

<Pressable
  testID="follow-button"
  onPress={handlePress}
  style={[
    styles.buttonwrapper,
    isFollowing
      ? styles.followingButton
      : styles.followButton,
  ]}
>
  <Text style={styles.buttonText}>
    {isFollowing ? 'Following' : 'Follow'}
  </Text>
</Pressable>
</View>


    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1E1E1E',
        width: '100%',
        maxWidth: 360,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FAFFFA',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,   
        marginBottom: 10,
        borderWidth:1,
        borderColor:'#fff'
  },
  uname:{
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 18,
    color: '#661',
    marginBottom: 10,
    fontWeight:'400',
  },
  buttonwrapper: {
    backgroundColor: '#8B5C',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    textAlign: 'center',
    width: '50%',
    borderWidth:1,
    borderColor:'#fff'
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#eee',
  },
  followButton: {
    backgroundColor: '#8B5CF6',
  },
  followingButton: {
    backgroundColor: '#6B7280',
  },
});
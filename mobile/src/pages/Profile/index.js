import React from 'react';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

function Profile(){

  const route = useRoute();
  const username = route.params.github_username;

  return (
    <WebView source={{ uri: `https://github.com/${username}` }}/>
  );
}

export default Profile;
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Contants from 'expo-constants'
import TeamClassification from './screens/TeamClassification';
import Home from './screens/Home';
export default function App() {
  return (
    <View style={styles.container}>
      <Home/>
      <Text>.....</Text>
      <TeamClassification/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8b8ec7',
    marginTop : Contants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

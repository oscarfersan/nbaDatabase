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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    marginTop : Contants.statusBarHeight,
    justifyContent: 'center',
  },
});

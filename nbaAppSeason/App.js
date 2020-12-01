import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Contants from 'expo-constants'
import TeamsList from './screens/TeamsList';
import Home from './screens/Home';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Draft from './screens/Draft';
import Match from './screens/Match';
import DraftScreen from './screens/DraftScreen';
import TeamMenu from './screens/TeamMenu';
const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
       <Stack.Navigator>
        <Stack.Screen name={"Home"} component={Home}/>
        <Stack.Screen name={"TeamMenu"} component ={TeamMenu}/>
        <Stack.Screen name={"TeamsList"} component ={TeamsList}/>
        <Stack.Screen name={"DraftScreen"} component ={DraftScreen}/>
        <Stack.Screen name={"Draft"} component ={Draft}/>
        <Stack.Screen name={"Match"} component ={Match}/>
       </Stack.Navigator>
    </View>
  )
}
export default ()=>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    marginTop : Contants.statusBarHeight,
    justifyContent: 'center',
  },
});

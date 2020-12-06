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
import Player from './screens/Player';
import TeamInfo from './screens/TeamInfo';
import Coach from './screens/Coach';
import Game from './screens/Game';


const Stack = createStackNavigator();
const myOptions = {
  headerTintColor:"white",
  headerStyle:{
    backgroundColor:"#006aff"
  }
}
function App() {
  return (
    <View style={styles.container}>
       <Stack.Navigator>
        <Stack.Screen name={"Home"} component={Home} options={{...myOptions,title:"Home"}}/>
        <Stack.Screen name={"TeamMenu"} component ={TeamMenu} options={{...myOptions,title:"Classifications"}}/>
        <Stack.Screen name={"TeamsList"} component ={TeamsList} options={{...myOptions,title:"Classifications"}}/>
        <Stack.Screen name={"TeamInfo"} component ={TeamInfo} options={{...myOptions,title:"Information"}}/>
        <Stack.Screen name={"Coach"} component ={Coach} options={{...myOptions,title:"Coach"}}/>
        <Stack.Screen name={"DraftScreen"} component ={DraftScreen} options={{...myOptions,title:"Draft classes"}}/>
        <Stack.Screen name={"Draft"} component ={Draft} options={{...myOptions,title:"Draft"}}/>
        <Stack.Screen name={"Player"} component ={Player} options={{...myOptions,title:"Player"}}/>
        <Stack.Screen name={"Match"} component ={Match} options={{...myOptions,title:"Match Info"}}/>
        <Stack.Screen name={"Game"} component ={Game} options={{...myOptions,title:"What´s my contract?"}}/>
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

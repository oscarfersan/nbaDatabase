import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, FlatList, ImageBackground, Alert } from 'react-native';
import { Card } from 'react-native-paper'

const TeamInfo = () =>{
    return(
        <View>
            <LinearGradient 
            colors = {["#043b59","#035582"]}
            />
        </View>
    )
}
export default TeamInfo
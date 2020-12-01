import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View , FlatList, ImageBackground} from 'react-native';
import {Button, Card } from 'react-native-paper'

const DraftScreen = (props) =>{
    return(
    <View style={styles.homeContainer}>
            <ImageBackground source={{ 
            uri: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=749&q=80" }} 
            style={styles.back_image}>
                <Card style={styles.myCard}>
                    <View>
                        <Button onPress={()=> props.navigation.navigate("Draft",{year:'2020'})}>
                            Draft 2020/2021
                </Button>
                    </View>
                </Card>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        resizeMode: "stretch",
    },
    mycard: {
        margin: 5,
        position:'absolute'

    },
    back_image: {
        width: null,
        height: null,
        justifyContent: 'center',
        flex: 1,
        resizeMode: 'contain',
    },
    cardView: {
        flexDirection: "row",
        padding: 6
    },
    text: {
        fontSize: 18,
    },
    myImage: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
})

export default DraftScreen
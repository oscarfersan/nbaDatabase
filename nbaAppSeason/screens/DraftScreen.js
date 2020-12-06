import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View , FlatList, ImageBackground} from 'react-native';
import {Button, Card } from 'react-native-paper'

const DraftScreen = (props) =>{
    return(
    <View style={styles.homeContainer}>
            <ImageBackground source={{ 
            uri: "https://cdn.pixabay.com/photo/2020/06/22/10/46/raptors-5328750_960_720.jpg" }} 
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
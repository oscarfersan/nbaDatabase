import React from 'react';
import { Image, StyleSheet, Text, View, FlatList, ImageBackground, Alert } from 'react-native';
import { Button, Card } from 'react-native-paper'

const Home = (props) => {
    return (
        <View style={styles.homeContainer}>
            <ImageBackground source={{ 
            uri: "https://images.pexels.com/photos/3189980/pexels-photo-3189980.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" }} 
            style={styles.back_image}>
                <Card style={styles.mycard}>
                    <View>
                        <Button mode="contained" onPress={()=> props.navigation.navigate("TeamMenu")}>
                            Classifications
                </Button>
                        <Button mode="outlined" onPress={()=> props.navigation.navigate("DraftScreen")}>
                            Draft
                </Button>
                <Button mode="contained" onPress={()=> props.navigation.navigate("Match")}>
                            Matches
                </Button>
                <Button mode="outlined" onPress={()=> props.navigation.navigate("Game")}>
                            What´s my contract?
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
        marginTop:"39%",
        marginBottom:"auto"
    },
    back_image: {
        width: null,
        height: null,
        flex: 1,
        resizeMode: 'contain',
    }
})
export default Home
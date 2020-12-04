import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, View, FlatList, ImageBackground, Alert } from 'react-native';
import { Button, Card } from 'react-native-paper'

const Player = (props) => {
    const player = props.route.params.player
    const logo = "https://www.sportsmediawatch.com/wp-content/uploads/2018/06/nbadraftlogo.png"
    return (
        <View style={styles.root}>
            <View style={{ flexDirection: "row", marginTop: "auto" }}>
                <Text style={{ color: "yellow", fontSize: 20, fontStyle: "italic" }}>#{player.name}</Text>
                <Text style={{ color: "yellow", fontSize: 20, fontStyle: "italic", marginLeft: "auto" }}>
                    #{player.draft_number}</Text>
            </View>
            <Card style={styles.card}>
            <View style={{ alignItems: "center" }}>
                    <Image
                        style={styles.myImage}
                        source={{ uri: player.thumbnail }}
                    />
                </View>
                <Image style={styles.logo} source={{uri:logo}}/>
                <View style={{
                    position: "absolute",
                    top: "5%",
                    left: "1%",
                    color: "yellow",
                }}>
                    <Text style={styles.info}>#University:{player.university}</Text>
                    <Text style={styles.info}>#Team:{player.team}</Text>
                    <Text style={styles.info}>#Position:{player.position}</Text>
                    <Text style={styles.info}>#Heigh:{player.heigh}m</Text>
                    <Text style={styles.info}>#Weight:{player.weight}kg</Text>
                </View>
                
            </Card>
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#4a0803"
    },
    logo:{
        position:"absolute",
        top:"90%",
        marginLeft:"35%",
        marginRight:"auto",
        width: 70,
        height: 70,
    },
    card: {
        alignItems: "center",
        // marginTop:"auto",
        marginBottom: "auto",
        borderColor: "yellow",
        borderWidth: 20
    },
    card_border: {

    },
    info:{
        fontSize:15,
        marginBottom:3
    },
    card_out: {
        borderColor: "yellow",
        borderWidth: 10
    },
    myImage: {
        width: 250,
        height: 250,
        // borderRadius: 250 / 2,
        // borderColor:"#0c0c0d",
        marginTop: -10,
        marginLeft: 69
    }
})
export default Player
import React from 'react';
import { Image, StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import { Card } from 'react-native-paper';

const Match = () => {
    const data = [
        {
            id: 1, t1: "Atlanta Hawks", t2: "Los Angeles Clippers",
            thumbnail_1: "https://assets.stickpng.com/images/58419be4a6515b1e0ad75a58.png",
            thumbnail_2: "https://assets.stickpng.com/images/58419c59a6515b1e0ad75a60.png",
            sc1: 127, sc2: 120
        },
        {
            id: 2, t1: "Los Angeles Lakers", t2: "Golden State Warriors",
            thumbnail_1: "https://assets.stickpng.com/images/58419d0aa6515b1e0ad75a6c.png",
            thumbnail_2: "https://i.pinimg.com/originals/64/3b/db/643bdb48540f70aed4c55ce2e3cee473.png",
            sc1: 97, sc2: 100
        },
        {
            id: 3, t1: "Orlando Magic", t2: "Charlotte Hornets",
            thumbnail_1: "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fnba%2F500%2Forl.png",
            thumbnail_2: "https://assets.stickpng.com/images/58419bd7a6515b1e0ad75a57.png",
            sc1: 107, sc2: 120
        }
    ]

    const renderList = (item) => {
        return (
            <Card style={styles.mycard}>
                <View style={styles.cardView}>
                    <Image
                        style={styles.myImage_visit}
                        source={{ uri: item.thumbnail_1 }} />
                    <View style={styles.content}>
                        <Text style={styles.text_res}>{item.sc1}-{item.sc2}</Text>
                    </View>
                    <Image
                        style={styles.myImage_local}
                        source={{ uri: item.thumbnail_2 }} />
                </View>
            </Card>
        )
    }
    return (
        <ImageBackground source={{
            uri: "https://images.pexels.com/photos/6071708/pexels-photo-6071708.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }}
            style={styles.back_image}>
            <View styles={{ flex: 1 }}>

                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return renderList(item)
                    }}
                    keyExtractor={item => `${item.id}`}
                />
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    mycard: {
        margin: 5,

    },
    cardView: {
        flexDirection: "row",
    },
    content: {
        marginTop:20,
        marginRight:148,
        marginLeft:"auto"
    },
    text_res: {
        fontSize: 20,
        fontWeight:"bold"
    },
    back_image: {
        width: null,
        height: null,
        flex: 1,
        resizeMode: 'contain',
    },
    myImage_visit: {
        position: "relative",
        width: 60,
        height: 60,
        
        maxWidth: 60,
        maxHeight: 60,
        marginTop:3,
        left: 2,
        marginBottom:3
    },
    myImage_local: {
        position: "absolute",
        width: 60,
        height: 60,
        maxWidth: 60,
        maxHeight: 60,
        right: 2,
        marginBottom:3,
        marginBottom:3
    }
})
export default Match
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
        },
        {
            id: 4, t1: "Brooklyn Nets", t2: "Chicago Bulls",
            thumbnail_1: "https://assets.stickpng.com/images/58419c7ba6515b1e0ad75a62.png",
            thumbnail_2: "https://assets.stickpng.com/images/58419cf6a6515b1e0ad75a6b.png",
            sc1: 127, sc2: 95
        }
    ]

    const renderList = (item) => {
        return (
            <Card style={styles.mycard}>
                <View style={styles.cardView}>
                    <Image
                        style={styles.myImage}
                        source={{ uri: item.thumbnail_1 }} />
                    <View style={{ marginLeft: 10 }}>
                        <View style={styles.header}>
                            <Text style={styles.text}>{item.t1}-{item.t2}</Text>
                        </View>
                        <View style={styles.result}>
                            <Text styles={styles.text_res}>{item.sc1}-{item.sc2}</Text>
                        </View>
                    </View>
                    <Image
                        style={styles.myImage}
                        source={{ uri: item.thumbnail_2 }} />
                </View>
            </Card>
        )
    }
    return (
        <ImageBackground source={{
            uri: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=749&q=80"
        }}
            style={styles.back_image}>
            <View>

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
        padding: 6,
        display:"flex"
    },
    text: {
        fontSize: 12,
    }, back_image: {
        width: null,
        height: null,
        justifyContent: 'center',
        flex: 1,
        resizeMode: 'contain',
    },
    myImage: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
})
export default Match
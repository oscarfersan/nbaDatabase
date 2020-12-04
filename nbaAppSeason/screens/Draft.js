import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, FlatList, ImageBackground, Alert } from 'react-native';
import { Button, Card } from 'react-native-paper'

const Draft = (props) => {
    const [data, setData] = useState(null)
    const fetchURL = 'http:192.168.43.183:6060'
    const year = props.route.params.year

    useEffect(() => {
        fetch(`${fetchURL}/draft?draft_year=${year}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => {
                console.error(error);
            });
    }, [])
    const renderList = (item) => {
        return (
            <Card style={styles.mycard} onPress={() => props.navigation.navigate("Player", { player: item })}>
                <View style={styles.cardView}>
                    <Image
                        style={styles.myImage}
                        source={{ uri: item.thumbnail }} />
                    <View style={{ marginLeft: 10 }}>
                        <View style={styles.sub_card}>
                            <Text style={styles.text}>{item.name}</Text>
                            <Text style={{ marginLeft: 10, fontSize: 18 }}>#{item.draft_number}</Text>
                        </View>
                        <Text style={styles.sub_text}>{item.position}/{item.weight}kgs/{item.heigh}m</Text>
                        <Text style={styles.sub_text}>{item.team}/{item.university}</Text>
                        <View style={styles.sub_card}>

                        </View>
                    </View>

                    {/* <Button style={{
                        position:"absolute",
                        marginRight:"0%"
                    }} icon="clipboard-plus" onTouchStart={() => props.navigation.navigate("Player", { player: item })} /> */}

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
                    keyExtractor={item => `${item._id}`}
                />
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    mycard: {
        margin: 5,

    },
    sub_card: {
        flexDirection: "row"
    },
    sub_text: {
        fontSize: 13,
    },
    cardView: {
        flexDirection: "row",
        padding: 6
    },
    text: {
        fontSize: 18,
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
export default Draft
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import { Card } from 'react-native-paper'

const TeamList = () => {
    // const data = [
    //     { id: 1, name: "Los Angeles Lakers", wins: 0, defeat: 0, thumbnail: "https://toppng.com/uploads/preview/lakers-logo-png-los-angeles-lakers-11562884650hddhrc18oe.png" },
    //     { id: 2, name: "Los Angeles Clippers", wins: 0, defeat: 0, thumbnail: "https://logos-download.com/wp-content/uploads/2016/04/LA_Clippers_logo_logotype_emblem.png" },
    //     { id: 3, name: "Orlando Magic", wins: 0, defeat: 0, thumbnail: "https://assets.stickpng.com/images/58419b7da6515b1e0ad75a51.png" },
    // ]
    const [data,setData] = useState(null)
    const fetchURL = 'http:192.168.43.183:6060'
    useEffect(()=>{
        fetch(`${fetchURL}/`)
        .then((res)=>res.json())
        .then((data)=>setData(data))
        .catch((error)=>{
            console.error(error);
        });
    },[])
    const renderList = ((item) => {
        return (
            <Card style={styles.mycard}>
                <View style={styles.cardView}>
                    <Image
                        style={styles.myImage}
                        source={{ uri: item.thumbnail }} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.wins}/{item.defeat}</Text>
                    </View>
                </View>
            </Card>
        )
    })
    //Ctrl + K +C
    //Ctrl + K +U
    return (
        <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1563506644863-444710df1e03?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=400&q=80" }}style = {styles.back_image}>
        <View style={{flex: 1,
            resizeMode: "stretch"}}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return renderList(item)
                }}
                keyExtractor={item => `${item._id}`}
            />
        </View >
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    mycard: {
        margin: 5,

    },
    cardView: {
        flexDirection: "row",
        padding: 6
    },
    text: {
        fontSize: 18,
    },
    back_image: {
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
export default TeamList
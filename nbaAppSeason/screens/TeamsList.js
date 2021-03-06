import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, FlatList, ImageBackground, Alert } from 'react-native';
import { Card } from 'react-native-paper'

const TeamList = (props) => {
    const [data,setData] = useState(null)
    const fetchURL = 'http:192.168.43.183:6060'
    const cnf = props.route.params.group
    const type = props.route.params.type
    useEffect(()=>{
        fetch(`${fetchURL}/${type}?${type}=${cnf}`)
        .then((res)=>res.json())
        .then((data)=>setData(data))
        .catch((error)=>{
            console.error(error);
        });
    },[])
    const renderList = ((item) => {
        return (
            <Card style={styles.mycard} onPress={()=>props.navigation.navigate("TeamInfo", { team: item })}>
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
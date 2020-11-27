import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator,StyleSheet, FlatList, Image, Text, View } from 'react-native'
import { Card } from 'react-native-paper'
import axios from 'axios'
const TeamClassification=()=>{
    const [data,setData] = useState({hits: []});
    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
               fetch('http:192.168.43.183:6060/')
               .then(res=>res.json())
               .then(results=>{
                   setData(results)
               })
      }, []);
    const renderList = ((item)=>{
        return(
            <Card style={styles.mycard}>
            <View style={styles.cardView}>
                <Image
                style={styles.myImage}
                source={{uri:item.thumbnail}}
                />
                <Text style={styles.text}>{item.name}</Text>
                <Text>Hola</Text>
            </View>
            </Card>
        )
    })
    return(
        <View>
            {/* {isLoading ? <ActivityIndicator/> : ( */}
            <FlatList
            data={data}
            renderItem={({item})=>{
                return renderList(item)
            }}
            keyExtractor={item=>`${item._id}`}
            />
            {/* )} */}
        </View>
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
    myImage: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
})
export default TeamClassification
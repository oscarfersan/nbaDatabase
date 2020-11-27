import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator,StyleSheet, FlatList, Image, Text, View } from 'react-native'
import { Card } from 'react-native-paper'
import axios from 'axios'
const TeamClassification=()=>{
    const [data,setData] = useState({hits: []});
    const [isLoading, setLoading] = useState(true);
    
    useEffect(async () => {
        const result = await axios(
            'http://192.168.43.69:6060'
        );
        setData(result.data)        
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
            </View>
            </Card>
        )
    })
    return(
        // <View>
        //     {/* {isLoading ? <ActivityIndicator/> : ( */}
        //     <FlatList
        //     data={data}
        //     renderItem={({item})=>{
        //         return renderList(item)
        //     }}
        //     keyExtractor={item=>`${item.name}`}
        //     />
        //     {/* )} */}
        // </View>
            <ul>
              {data.hits.map(item => (
                <li key={item.objectID}>
                  <a href={item.url}>{item.title}</a>
                </li>
              ))}
            </ul>
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
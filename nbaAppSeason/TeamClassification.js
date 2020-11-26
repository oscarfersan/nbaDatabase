import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

export default function TeamClassification(){
    const [data,setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch('http://192.168.43.69:6060/')
          .then((response) => response.json())
          .then((json) => setData(json.team))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      }, []);
    const renderList = ((item)=>{
        return(
            <View>
                <Image
                style={{width:60,height:60,borderRadius:60}}
                source={{uri:item.thumbnail}}
                ></Image>
                <Text>{item.name}</Text>
            </View>
        )
    })
    return(
        <View>
            {isLoading ? <ActivityIndicator/> : (
            <FlatList
            data={data}
            keyExtractor={({ id }, name) => id}
            renderItem={({ item }) => (
                <Text>{item.name}, {item.coach}</Text>
            )}
            />
            )}
        </View>
    )
}
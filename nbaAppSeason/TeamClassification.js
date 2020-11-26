import React, { useEffect, useState } from 'react'
import { FlatList, Image, View } from 'react-native'

export default function TeamClassification(){
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch("192.168.43.69:6060/")
        .then(res=>res.json())
        .then(results=>{
            setData(results)
        })
    },[])
    const renderList = ((item)=>{
        return(
            <View>
                <Image
                source={{uri:item.thumbnail}}
                ></Image>
                <Text>{item.name}</Text>
                <Text>{item.coach}</Text>
            </View>
        )
    })
    return(
        <View>
            <FlatList>
                data = {data}
                renderItem = {({item})=>{
                    return renderList(item)
                }}
                keyExtractor = {item=>item.name}
            </FlatList>
        </View>
    )
}
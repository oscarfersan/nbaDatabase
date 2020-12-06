import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { Button, Card } from 'react-native-paper'
const Game = () => {
    const [data,setData]= useState([
        { id: 1, name: "Russell Westbrook", salary: 38.51 },
        { id: 2, name: "De'Aaron Fox", salary: 8.099 },
        { id: 3, name: "James Harden", salary:41},
        { id: 4, name: "Dwight Howard", salary:1.5}
    ])
    var [cont,setCont] = useState(0)
    var Game = (index_1,index_2) =>{
        var b = data[index_1].salary>=data[index_2].salary
        if(b){
            let result = data.filter((item,key)=>key!=index_2)
            setData(result)
            cont=cont+1
            setCont(cont)
        }else{
            let result = data.filter((item,key)=>key!=index_1)
            setData(result)
            cont=0
            setCont(cont)
        }
        // return(
        //     null
        // )
    }
    return (
        <View>
            <Button mode="contained" style={{ marginBottom: 10 }} onPress={()=>Game(0,1)}>{data[0].name}</Button>
            <Text style={{ marginLeft: "auto", marginRight: "auto" }}>{cont}</Text>
            <Button mode="contained" style={{ marginTop: 10 }} onPress={()=>Game(1,0)}>{data[1].name}</Button>
        </View>
    )
}

export default Game
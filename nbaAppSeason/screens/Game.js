import React, { useEffect, useState } from 'react'
import { Alert, Image, Text, View } from 'react-native'
import { Card } from 'react-native-paper'
import {EatBeanLoader} from 'react-native-indicator';
const Game = (props) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchURL = 'http:192.168.43.183:6060'
    useEffect(() => {
        fetch(`${fetchURL}/game`)
            .then((res) => res.json())
            .then((data) => {
                setData(shuffle(data))
                setLoading(false)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])
    var [cont, setCont] = useState(0)

    const shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array
    }
    var Game = (index_1, index_2) => {
        var b = data[index_1].salary >= data[index_2].salary
        if (b) {
            if (data.length > 0) {
                let result = data.filter((item, key) => key != index_1)
                setData(result)
            }
            cont = cont + 1
            setCont(cont)
        } else {
            cont = 0
            setCont(cont)
            Alert.alert('Fail!')
            fetch(`${fetchURL}/game`)
                .then((res) => res.json())
                .then((data) => {
                    setData(shuffle(data))
                    setLoading(false)
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        if (data.length <= 0) {
            Alert.alert('End of game!')
            fetch(`${fetchURL}/game`)
                .then((res) => res.json())
                .then((data) => {
                    setData(shuffle(data))
                    setLoading(false)
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
    return (
        <View style={{ marginLeft: "auto", marginRight: "auto" }}>
            {
                loading ? <EatBeanLoader  style={{marginBottom:"auto",marginTop:"auto"}}/>
                    :
                    data.length > 0 ?
                        <View>
                            <Card style={{ marginTop: 5, marginBottom: 10 }} onPress={() => Game(0, 1)}>
                                <Image source={{ uri: data[0].thumbnail }} style={{ width: 150, height: 150, borderRadius: 150 / 2 }} />
                            </Card>
                            <Text style={{ marginLeft: "auto", marginRight: "auto" }}>{cont}</Text>
                            <Card style={{ marginTop: 10 }} onPress={() => Game(1, 0)}>
                                <Image source={{ uri: data[1].thumbnail }} style={{ width: 150, height: 150, borderRadius: 150 / 2 }} />
                            </Card>

                        </View>
                        : Alert.alert('End')
            }
        </View>
    )
}

export default Game
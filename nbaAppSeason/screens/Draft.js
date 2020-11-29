import React from 'react';
import { Image, StyleSheet, Text, View , FlatList, ImageBackground} from 'react-native';
import { Card } from 'react-native-paper'

const Draft = () =>{
    const data = [
        {id:1, name:"Anthony Edwards", pos:"Es", team:"Minnesota Timberwolves", thumbnail:"https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4594268.png"},
        {id:2, name:"James Wiseman", pos:"P",team:"Golden State Warriors",thumbnail:"https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4594268.png"},
        {id:3, name:"LaMelo Ball", pos:"BA",team:"Charlotte Hornets",thumbnail:"https://hoopshype.com/wp-content/uploads/sites/92/2019/11/i_a7_72_41_lamelo-ball.png"},
        {id:4, name:"Patrick Williams", pos:"ES",team:"Chicago Bulls",thumbnail:"https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4431687.png"},
    ]

    const renderList = (item) =>{
        return(
            <Card style={styles.mycard}>
                <View style={styles.cardView}>
                    <Image
                        style={styles.myImage}
                        source={{ uri: item.thumbnail}} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.pos}</Text>
                    </View>
                </View>
            </Card>
        )
    }
    return (
        <ImageBackground source={{ 
            uri: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=749&q=80" }} 
            style={styles.back_image}>
        <View>
            
            <FlatList
                data={data}
                renderItem={({item})=>{
                    return renderList(item)
                }}
                keyExtractor={item=>`${item.id}`}
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
        padding: 6
    },
    text: {
        fontSize: 18,
    },back_image: {
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
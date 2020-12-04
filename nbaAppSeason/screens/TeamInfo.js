import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, FlatList, ImageBackground, Alert } from 'react-native';
import { Card } from 'react-native-paper'

const TeamInfo = (props) => {
    const team = props.route.params.team
    var coachName = team.coach.split(" ")
    return (
        <View style={styles.background_view}>
            <Image style={styles.logo_image} source={{ uri: team.thumbnail }} />
            <Card style={styles.card_info}>
                <Card>
                    <View style={{ flexDirection: "row" }}>
                    <Text>Name</Text>
                    <Text style={styles.data}>{team.name}</Text>
                    </View>
                </Card>
                <Card style={styles.card_data} onPress={() => props.navigation.navigate("Coach", {name:coachName})}>
                    <View style={{ flexDirection: "row" }}>
                    <Text>Coach</Text>
                    <Text style={styles.data}>{team.coach}</Text>
                    </View>
                </Card>
                <Card style={styles.card_data}>
                    <View style={{ flexDirection: "row" }}>
                    <Text>Stadium</Text>
                    <Text style={styles.data}>...</Text>
                    </View>
                </Card>
                <Card style={styles.card_data} onPress={() => props.navigation.navigate("TeamsList", { group: team.conference, type: 'conference' })}>
                    <View style={{ flexDirection: "row" }}>
                    <Text>Conference</Text>
                    <Text style={styles.data}>{team.conference}</Text>
                    </View>
                </Card>
                <Card style={styles.card_data} onPress={() => props.navigation.navigate("TeamsList", { group: team.division, type: 'division' })}>
                    <View style={{ flexDirection: "row" }}>
                    <Text>Division</Text>
                    <Text style={styles.data}>{team.division}</Text>
                    </View>
                </Card>
                <Card style={styles.card_data}>
                    <View style={{ flexDirection: "row" }}>
                    <Text>nChamps</Text>
                    <Text style={styles.data}>0</Text>
                    </View>
                </Card>
            </Card>
        </View>
    )
}
const styles = StyleSheet.create({
    background_view: {
        flex: 1,
        backgroundColor: "#697891"
    },
    logo_image: {
        marginLeft: "auto",
        marginRight: "auto",
        height: 150,
        width: 150,
        borderWidth: 30
    },
    card_info: {
        flexDirection:"column"
    },
    card_data:{
        marginTop:5
    },
    data:{
        position:"absolute",
        right:5
    }
})
export default TeamInfo
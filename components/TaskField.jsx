import React, {useState} from "react";
import {Text, View, ImageBackground, StyleSheet, TouchableOpacity, TextInput, FlatList, BackHandler, Image, Modal} from 'react-native';
import * as Font from "expo-font"
import { Button } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';




const TaskField = ({ title, id, onRemove, image}) => {
    const[imagesSize, setImageSize] = useState({width: 30, height: 30})
    const[visible, setVisible] = useState(false)
    return (
        <View style={styles.task}>
            <Text>{title}</Text>
            {image && <TouchableOpacity  onPress={() => visible == false ? setVisible(true) : setVisible(false)}><Image source={{ uri: image }} style={{width: 30, height: 30}}/></TouchableOpacity>}
            <TouchableOpacity style={styles.button} onPress={() => onRemove(id)}>
                <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>Remove</Text>
            </TouchableOpacity>
            <Modal visible={visible}>
                <TouchableOpacity onPress={() => setVisible(false)} style={{margin: 20}}>
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
                <View style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%"}}>
                    <Image source={{uri: image}} style={{width: 200, height: 100}}/>
                </View>
            </Modal>
        </View>
    );
};



const styles = StyleSheet.create({
    task: {
        width: "100%",
        height: 50,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "black",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
        padding: 10,
        borderRadius: 50,
        backgroundColor: "white"
    },
    button: {
        backgroundColor: "red",
        color: "white",
        width: 100,
        height: 40,
        display: "flex",
        justifyContent: "center",
        borderRadius: 50,
    },
})




export default TaskField;
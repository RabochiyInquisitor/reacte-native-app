import { React, useState} from "react";
import {Text, View, ImageBackground, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';



  

const MainPage = (props) => {
  const [name, SetName] = useState("");
    return(
        <View>
            <ImageBackground source={require("../assets/images/image.png")} style={styles.background}>
                <View style={styles.main_container}>
                    <TextInput placeholder="Enter your name: " style={{backgroundColor: "white", width: 200, borderRadius: 20, textAlign: "center", margin: 20}} value={name} onChangeText={text => SetName(text)}></TextInput>
                    <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => {name != "" ? props.navigation.navigate('Tasks', {binding: name}) : null}}>
                      <Text style={{color: 'white', fontSize: 20}}>Войти</Text>
                    </TouchableOpacity>
                </View>
                
            </ImageBackground>    
        </View>
    );
};




const styles = StyleSheet.create({
    button: {
        display: "flex",
        borderStyle: "solid",
        backgroundColor: "#03b6fc",
        width: 150,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        
    },
    background: {
      height: '100%',
      
      
    },
    main_container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: '100%',
      width: '100%',
    },
  });

export default MainPage;
import { React, useState, useEffect} from "react";
import {Text, View, ImageBackground, StyleSheet, TouchableOpacity, TextInput, FlatList, Image} from 'react-native';
import TaskField from "./TaskField";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tasks = ({ route }) => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };


    const Gettask = async () =>
        {
            try{
                let get = await AsyncStorage.getItem("user_task")
                return JSON.parse(get)
            }
            catch(error){
                console.log(error)
            }
        }
    

    

    const [tasks, setTasks] = useState([]); // Используем состояние для хранения задач
    const [modalVisible, changeVisible] = useState("none");
    const [taskText, setTaskText] = useState("");
    

    useEffect(() => {   
        const fetchTasks = async () => {
            const storedTasks = await Gettask();
            if (storedTasks) {
                setTasks(storedTasks); // Парсим строку в массив
            }
        };
        fetchTasks();
    }, []);


    const [imageUri, setImageUri] = useState(null);
    const { binding } = route.params;

    const renderItem = ({ item }) => (
        <TaskField title={item.title} id={item.id} onRemove={removeTask} image={item.image} />
    );


    const SaveInStorage = async (task) =>
    {
        try{
            await AsyncStorage.setItem('user_task', JSON.stringify(task))
        }
        catch(error){
            console.log(error);
        }
        return task
    }

    const removeTask = async (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id); // Фильтруем задачи, чтобы удалить нужную
        setTasks(updatedTasks); // Обновляем состояние с новым массивом
        await SaveInStorage(updatedTasks); // Сохраняем обновленный массив в AsyncStorage
    };


    const addNewTask = async () => {
        const newTask = { id: String(tasks.length + 1), title: taskText, image: image}; // Создаем новую задачу
        const updated = [...tasks, newTask]
        setTasks(updated); // Обновляем состояние с новым массивом
        setTaskText("");
        setImage(null);
        await SaveInStorage(updated)
    };

    return (
        <View>
            <ImageBackground source={require("../assets/images/image.png")} style={styles.background}>
                <View style={styles.for_text}>
                    <View>
                        <Text style={{ fontSize: 50, textAlign: "center" }}>{binding}</Text>
                        <Text style={{ fontSize: 30, fontFamily: "Adgasima-Regular", textAlign: "center" }}>Let's add a new task?</Text>
                    </View>

                    {tasks[0] != null && <FlatList
                        data={tasks} // Используем состояние для отображения задач
                        renderItem={renderItem}
                        keyExtractor={item => item.id} // Добавляем ключ для каждого элемента
                    />}
                    {tasks[0] == null && <Text style={{fontSize: 30, marginBottom: 100}}>No tasks yet!</Text>}

                    <View style={{ margin: 20 }}>
                        <TouchableOpacity style={{ backgroundColor: "#03b6fc", borderRadius: 100, height: 50, width: 150, display: "flex", justifyContent: "center" }} onPress={() => changeVisible("flex")}>
                            <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>Add new task</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            <View style={{display: modalVisible, backgroundColor: "white", height: 200, width: "100%", position: "absolute", alignItems: "center"}}>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <TextInput placeholder="Enter a task: " onChangeText={text => setTaskText(text)} value={taskText}/>
                    {image && <Image source={{ uri: image }} style={styles.image}/>}
                </View>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 70, padding: 20}}>
                    <TouchableOpacity style={{backgroundColor: "#03b6fc", width: 100, height: 30, display: "flex", justifyContent: "center", borderRadius: 20}} onPress={() => taskText != "" ? addNewTask() : null}>
                        <Text style={{color: "white", textAlign: "center"}}>Save task</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: "#03b6fc", width: 100, height: 30, display: "flex", justifyContent: "center", borderRadius: 20}} onPress={() => pickImage()}>
                        <Text style={{color: "white", textAlign: "center"}}>Set photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: "#03b6fc", width: 100, height: 30, display: "flex", justifyContent: "center", borderRadius: 20}} onPress={() => {changeVisible("none"); setImage(null); setTaskText("");}}>
                        <Text style={{color: "white", textAlign: "center"}}>Cancel</Text>
                    </TouchableOpacity>
                    
                </View>

                
        </View>
        </ImageBackground>
        
    </View>
    );
};


const styles = StyleSheet.create({
    background: {
        height: '100%',
        position: "relative",
        display: "flex",
        justifyContent: "flex-end",
        //flex: 1,
    },
    for_text: {
        width :"100%",
        display: "flex",
        alignItems: "center",
        //flexDirection: "column",
        //justifyContent: "center", // добавлено
        height: '100%', // добавлено для центрирования по вертикали
        justifyContent: "space-between",
        flexDirection: "column",
    },
    image: {
        width: 50,
        height: 50,
        marginLeft: 10
    },
    
})
export default Tasks;
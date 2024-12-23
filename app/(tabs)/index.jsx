import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainPage from "../../components/MainPage";
import  Tasks  from "../../components/Tasks"
import { AppRegistry } from "react-native";

const Stack = createNativeStackNavigator();

export default function HomeScreen({navigation}) {
  return(
      <Stack.Navigator screenOptions={{animation: "fade"}}>
        <Stack.Screen name="Home" component={MainPage} />
        <Stack.Screen name="Tasks" component={Tasks}/>
      </Stack.Navigator> 
  );
}


AppRegistry.registerComponent('my_react_app', () => HomeScreen);
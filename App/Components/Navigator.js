import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Intro } from "../Screens/Intro";
import { HomeScreen } from "../Screens/HomeScreen";
import { SignUp } from "../Screens/SignUp";
import { Note } from "../Screens/Note"; 
import { AddNote } from "../Screens/AddNote";

const Stack = createNativeStackNavigator();

export function AuthNaviator(){
    return(
        <Stack.Navigator initialRouteName="Intro">
            <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false}}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false}}/>
            <Stack.Screen name="AddNote" component={AddNote}/>
            <Stack.Screen name="Note" component={Note}/>
        </Stack.Navigator>
    );
}
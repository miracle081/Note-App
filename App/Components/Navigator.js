import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Intro } from "../Screens/Intro";
import { HomeScreen } from "../Screens/HomeScreen";
import { SignUp } from "../Screens/SignUp";
import { Note } from "../Screens/Note"; 
import { AddNote } from "../Screens/AddNote";
import { Transfer } from "../Screens/Transfar";
import { ResetPassword } from "../Screens/ResetPassword";
import { Deposit } from "../Screens/Deposit";
import { Admin } from "../Screens/Admin";
import { Profile } from "../Screens/Profile";
import { Display } from "../Screens/display";
import { ChangePassword } from "../Screens/ChangePassword";
import { TransactionSummary } from "../Screens/TransactionSummary";
import Crypto from "../Screens/Crypto";
import BuyCoin from "../Screens/BuyCoin";
import SellCoin from "../Screens/SellCoin";
import { SetPassword } from "../Screens/SetPassword";

const Stack = createNativeStackNavigator();

export function AuthNaviator(){
    return(
        <Stack.Navigator initialRouteName="Intro">
            <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false}}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false}}/>
            <Stack.Screen name="AddNote" component={AddNote}/>
            <Stack.Screen name="Note" component={Note}/>
            <Stack.Screen name="Transfer" component={Transfer}/>
            <Stack.Screen name="BuyCoin" component={BuyCoin} options={{ headerShown: false}}/>
            <Stack.Screen name="SellCoin" component={SellCoin}/>
            <Stack.Screen name="Deposit" component={Deposit}/>
            <Stack.Screen name="Admin" component={Admin}/>
            <Stack.Screen name="TransactionSummary" component={TransactionSummary}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="SetPassword" component={SetPassword}/>
            <Stack.Screen name="Crypto" component={Crypto}/>
            <Stack.Screen name="Display" component={Display}/>
            <Stack.Screen name="ChangePassword" component={ChangePassword}/>
            <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from './src/context/UserContext.jsx'; 

import LoginScreen from './src/screens/LoginScreen'
import VagasScreen from './src/screens/VagasScreen'
import CadastroScreen from './src/screens/CadastroScreen.jsx'
import EditarPerfilScreen from './src/screens/EditarPerfilScreen.jsx'


const Stack = createNativeStackNavigator()

export default function App(){
    return(
        <NavigationContainer>
            <UserProvider>      
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Cadastro" component={CadastroScreen} />
                <Stack.Screen name="Vagas" component={VagasScreen} />
                <Stack.Screen name="Perfil" component={EditarPerfilScreen} />
            </Stack.Navigator>
            </UserProvider>
        </NavigationContainer>
    )
}
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationRouteContext } from '@react-navigation/native';
import  { AuthContext } from './AuthContext';
import { View, ActivityIndicator } from 'react-native';

import AuthContext from './context/AuthContext';
import AuthStack from './screens/AuthStack';
import HomeScreen from './screens/HomeScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator( )

const AppNavitagor = () => {
    const {userToken, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                { userToken ? ( //Se logou, faça isso (verifica se userToken existe, é true ou false)
                    <>
                    {/* se estiver logado ele pode navegar por essas telas */}
                    <Stack.Screen name="Home" component={HomeScreen} /> 
                    <Stack.Screen name="PostDetail" component={PostDetailScreen} />
                    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    </>
                ) : ( //Se não logou, faça isso
                    <Stack.Screen name="Auth" component={AuthStack} />
                )

                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}
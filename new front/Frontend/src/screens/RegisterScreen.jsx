import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Api from '../services/Api'; 


const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async ( ) => {
        try{
            const response = await Api.post('/auth/register', {username, email, password});
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!'); 
            navigation.navigate('Login');

        } catch (e) {
            console.error('Erro ao cadastrar:', e.response?.data || e.message);
            Alert.alert('Erro no cadastro', e.response?.data?.message || 'Ocorreu um erro ao cadastrar o usuário.');
        }
    
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Crie sua conta! </Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Nome de Usuário'
                    value={username}
                    onChangeText={setUsername} //setIdentifier é a função que atualiza o estado do identifier
                    autoCapitalize='none'
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Senha'
                    value={password}
                    onChangeText={setPassword} 
                    secureTextEntry
                />
                 <TextInput 
                    style={styles.input}
                    placeholder='E-mail'
                    value={username}
                    onChangeText={setUsername} //setIdentifier é a função que atualiza o estado do identifier
                    autoCapitalize='none'
                />
                <Button 
                    title='Cadastrar'
                    onPress={handleRegister}/>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
                </TouchableOpacity>    
            </View>
        )
    }


}
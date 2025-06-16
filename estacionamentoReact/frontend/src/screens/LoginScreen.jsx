import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    Alert,
    Image, 
    TouchableOpacity
} from 'react-native';
import { login } from "../services/api";
import { useUser } from '../context/UserContext.jsx';


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const { setUserLogado } = useUser();
    const handleLogin = async () => {
        const result = await login(email, password);
        if (result.success) {
            setUserLogado(result.userLogado);
            navigation.navigate('Vagas');

        } else {
            Alert.alert('Erro', result.message);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.containerEsquerda}>
                <Text style={styles.estacioneJa}>BEM VINDO!</Text>
                <Text style={styles.estacioneJa}>AO</Text>
                <Text style={styles.estacioneJa}>ESTACIONE JÁ</Text>
            </View>
            <View style={styles.containerDireita}>
                <View style={styles.containerLogin}>
                    <Text style={styles.title}> LOGIN </Text>
                    <TextInput style={styles.input} placeholder="E-mail" onChangeText={setEmail} />
                    <TextInput style={styles.input} placeholder="Senha" onChangeText={setPassword} secureTextEntry />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.textoEntrar}> Entrar </Text>                    
                    </TouchableOpacity>
                    <Text style={styles.link} onPress={() => navigation.navigate('Cadastro')}> Criar Conta </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    containerEsquerda: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    containerDireita: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2e8bc0',
        
    },
    containerLogin: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 5,
        width: 500,
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    input: {
        borderWidth: 0,
        marginBottom: 10,
        padding: 10,
        borderRadius: 3,
        width: '100%',
        backgroundColor: '#f0f0f0'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',

        
    },
    link: {
        marginTop: 20,
        color: '#2e8bc0',
        textAlign: 'center',
        width: '100%',
    },
    button: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 37,
        borderRadius: 5,
        backgroundColor: '#01b5ff',

    },
    textoEntrar: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 20,
    },
    estacioneJa: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2e8bc0',
        textAlign: 'center',
        marginBottom: 10,
    }


});

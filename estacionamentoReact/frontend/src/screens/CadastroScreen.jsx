import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    Alert
} from 'react-native';
import { cadastrar } from "../services/api";

export default function CadastroScreen({ navigation }) {
    const [form, setForm] = useState({
        username: '', password: '', email: '',
        placa: '', cor: '', modelo: ''
    })

    const handleChange = (name, value) => setForm({ ...form, [name]: value })

    const handleSubmit = async () => {
        const result = await cadastrar(form)
        console.log(form);
        
        if (result.success) {
            Alert.alert('Sucesso', result.message)
            navigation.navigate('Login')
        } else {
            Alert.alert('Erro', result.message)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerCadastro}>
            <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: 'bold' }}>CADASTRO</Text>

            {['username', 'email', 'password', 'placa', 'cor', 'modelo'].map((field) => (
                <TextInput
                key={field}
                placeholder={field}
                secureTextEntry={field === 'password'}
                onChangeText={(value) => handleChange(field, value)}
                style={styles.input}
                />
            ))}
            <Button title='Cadastrar' onPress={handleSubmit} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#01b5ff'
    },
    input:{
        borderWidth: 0,
        marginBottom: 10,
        padding: 10,
        borderRadius: 3,
        width: '90%',
        backgroundColor: '#f0f0f0'
    },
    containerCadastro:{

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 700,
        height: '95%',
        borderRadius: 5

    }
})
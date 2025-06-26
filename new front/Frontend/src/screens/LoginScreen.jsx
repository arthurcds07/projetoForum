import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Api from '../services/Api'; 
import AuthContext from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
    const [identifier, setIdentifier] = useState(''); //IDENTIFIER para identificar se o user ta usando @ ou email pra fazer o login
    const [password, setPassword] = useState(''); //senha
    const { signIn } = useContext(AuthContext); //contexto de autenticação
    //is loading vai carreegar o token ao iniciar

    const handleLogin = async () => {
        try {
            const response = await Api.post(' /auth/login', 
            {identifier, password});
            Alert.alert('Sucesso', 'Login realizado com sucesso!');
            //chama signIn para salvar o token e atualizar o estado global
            await signIn(response.data.token, response.data.user);
        } catch (e) {
            console.error('Erro ao fazer login:', e.response?.data || e.message);
            Alert.alert('Erro no login', e.response?.data?.message || 'Usuário ou senha inválidos.');
        } //o ? é o encadeamento opcional, ele causa um "curto-circuito". Casoele não encontre o erro em nenhum dos dois, ele retorna undefined. Isso evita que o código quebre e crasha a aplicação.
        //Nao existe mais "null" quando a gente coloca o encadeamento, só undefined e aí colocamos o "||" para o código pensar em ir par a o próximo caso, que é a mensagem de erro genérica. 
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Bem-vindo! </Text>
            <TextInput 
                style={styles.input}
                placeholder='Usuário ou E-mail'
                value={identifier}
                onChangeText={setIdentifier} //setIdentifier é a função que atualiza o estado do identifier
                autoCapitalize='none'
            />
            <TextInput 
                style={styles.input}
                placeholder='Senha'
                value={password}
                onChangeText={setPassword} 
                secureTextEntry
            />
            <Button 
                title='Entrar'
                onPress={handleLogin}/>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
            </TouchableOpacity>    
        </View>
    )
    
} 


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      color: '#333',
    },
    input: {
      width: '100%',
      padding: 15,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      marginBottom: 15,
      backgroundColor: '#fff',
    },
    registerText: {
      marginTop: 20,
      color: '#007bff',
      textDecorationLine: 'underline',
    },
  });

export default LoginScreen;
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Image,
    Button,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { listarVagas, ocuparVaga, desocuparVaga } from "../services/api";
import { useUser } from '../context/UserContext.jsx'; 

export default function VagasScreen() {
    const [vagas, setVagas] = useState([]);
    const navigation = useNavigation();
    const { userLogado } = useUser(); // Obtém o usuário logado do contexto

    useEffect(() => {
        fetchVagas();
    }, []);

    const fetchVagas = async () => {
        const result = await listarVagas();
        console.log("Requisitando lista de vagas..."); 
        if (result.success) setVagas(result.vagas);
    };

    const handleOcupar = async (vagaId) => {
    console.log("handleOcupar chamado para vagaId:", vagaId);

    if (!userLogado) {
        Alert.alert('Erro', 'Você precisa estar logado para ocupar uma vaga.');
        return;
    }

    try {
        const result = await ocuparVaga(vagaId, userLogado.id);
        console.log("Resposta da API ocuparVaga:", result); 
        Alert.alert(result.message || 'Operação concluída');
        fetchVagas();
    } catch (error) {
        console.error("Erro ao ocupar vaga:", error);
        Alert.alert('Erro', 'Não foi possível ocupar a vaga.');
    }
};


    const handleDesocupar = async (vagaId) => {
    console.log("handleDesocupar chamado para vagaId:", vagaId);

    if (!userLogado) {
        Alert.alert('Erro', 'Você precisa estar logado para desocupar uma vaga.');
        return;
    }
    const result = await desocuparVaga(vagaId);
    Alert.alert(result.message);
    fetchVagas();
    };

    const renderItem = ({ item }) => {
        return (            
            <View style={styles.card}>
            <View style={styles.cardContent}>
                <Image 
                    source={require('../../assets/silhueta-carro.avif')}
                    style={styles.cardImage}
                    />
                <Text style={styles.vagaTitle}>Vaga #{item.id} - {item.preferencial_int ? 'Preferencial' : 'Comum'}</Text>
                <Text>Disponível: {item.disponivel ? 'Sim' : 'Não'}</Text>
                {item.disponivel ? (
                    <Button 
                    title="Ocupar"
                    onPress={() => {
                        handleOcupar(item.id) }} />
                ) : (
                    <Button 
                    title="Desocupar" 
                    onPress={() => {
                        handleDesocupar(item.id)}} />
                )}
            </View>
        </View>
        )   
    };

    return (
        <View style={styles.container}>
            {/* Botão de imagem no canto superior direito */}
            <TouchableOpacity
                style={styles.profileImageContainer}
                onPress={() => navigation.navigate('EditarPerfil', { user: userLogado })}

            >
                <Image
                    source={require('../../assets/silhueta-perfil.png')} 
                    style={styles.profileImage}
                />
            </TouchableOpacity>

            <Text style={styles.header}>Vagas Disponíveis</Text>

            <FlatList
                data={vagas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={4}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        paddingTop: 30,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2e8bc0',
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 1,
    },
    listContent: {
        paddingBottom: 20,
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 18,
        margin: 8,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        maxWidth: '22%',
    },
    cardContent: {
        alignItems: 'center',
        width: '100%',
    },
    cardImage: {
        width: 70,
        height: 70,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: '#e0e0e0',
    },
    vagaTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },
    profileImageContainer: {
        position: 'absolute',
        top: 30,
        right: 20,
        zIndex: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});

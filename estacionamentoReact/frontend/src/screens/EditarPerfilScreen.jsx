import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-native";
import styled from "styled-components/native";
import { editarUsuario } from "../services/api";

 
export default function EditUserScreen({ navigation, route }) {
  const { user } = route.params;
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    placa: "",
    cor: "",
    modelo: "",
    
  });
 
  useEffect(() => {
    setForm({
      username: user.username || "",
      password: "",
      email: user.email || "",
      placa: user.placa || "",
      cor: user.cor || "",
      modelo: user.modelo || "",
    });
  }, [user]);
 
  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };
 
  const handleSubmit = async () => {
    // Se o campo senha estiver vazio, não vamos incluí-lo no body,
    // para que o backend não sobrescreva com string vazia.
    const dadosParaEnviar = { ...form };
    if (!dadosParaEnviar.password) {
      delete dadosParaEnviar.password;
    }
 
    const result = await editarUsuario(user.id, dadosParaEnviar);
    if (result.success) {
      Alert.alert("Sucesso", result.message);
      navigation.goBack();
    } else {
      Alert.alert("Erro", result.message);
    }
  };
 
  return (
    <Container>
      {["username", "email", "password", "placa", "cor", "modelo"].map(
        (field) => (
          <StyledInput
            key={field}
            placeholder={field}
            secureTextEntry={field === "password"}
            value={form[field]}
            onChangeText={(value) => handleChange(field, value)}
          />
        )
      )}
      <Button title="Salvar" onPress={handleSubmit} />
    </Container>
  );
}
 
const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;
 
const StyledInput = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
`;
import axios from 'axios';
//npm i axios 

const API_BASE_URL = 'http://localhost:3000/api'; 
//se estiver rodando em um celular ou emulador terá que modificar 
// prexsa do IP da máquina para testar

//EX: http://192.168.1.XX:3001

const api = axios.create({
    bseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})


export default api
const BASE_URL = 'http://localhost:3030'

export async function login(email, password) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    return response.json()
}

export async function cadastrar(user) {
    const response = await fetch(`${BASE_URL}/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    return response.json()
}

//get das vagas
export async function listarVagas() {
    const response = await fetch(`${BASE_URL}/vagas`)
    return response.json()
}

export const ocuparVaga = async (vagaId, userId) => {
    try {
        const response = await fetch(`${BASE_URL}/vagas/${vagaId}/ocupar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Erro na função ocuparVaga:", error);
        return { success: false, message: 'Erro na requisição' };
    }
};

export async function desocuparVaga(vagaId){
    const response = await fetch(`${BASE_URL}/vagas/${vagaId}/desocupar`, {
        method: 'DELETE'
    })
    return response.json()
}

export async function editarUsuario(id, dados) {
    const response = await fetch(`${BASE_URL}/editar/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dados)
    })
    return response.json()
}
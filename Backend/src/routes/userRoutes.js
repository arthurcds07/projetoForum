const pool = require('../connection/db');
const bcypt = require('bcrypt.js')
//npm i bcrypt
//para comparar senhas na edição

const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET || 'senhoajwt';

//obter as info do usuário lodgado (usado no perfil)

//esse aqui é um get para pegar todos os dados do usário, verificar tudo 
exports.getMe = async(req, res) => {
    const userId = req.user.id //id vem do middleware que a gente configurou

    try{
        const [rows] = await pool.query(
            'SELECT id, username, email, profile_picture_url, created_at FROM users WHERE id = ?', [userId]
        )
        if (rows.length === 0) {
            return res.status(404).json({
                message: "Usuário não encontrado",
            })
        }
        //cado encontrado buscamos o primeiro indice do SELECT
        res.status(200).json(rows[0])
    } catch(error) {
        console.log('Erro ao buscar infos do usuário', error)
        res.status(500).json({
            message: 'Erro interno no servidor'
        })
    }
}


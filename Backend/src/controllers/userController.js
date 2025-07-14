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

exports.getMyPosts = async (req, res) => {
    const userId = req.user.id
    
    try{
        const [rows] = await pool.query(`
        SELECT 
            p.id, p.tittle, p.content, p.image_url, p.created_at, p.unpdated_at,
            u.id AS user_id, u.username, u.profile_picture_url,
            (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS likes_count,
            (SELECT COUNT(*) FROM comments l WHERE c.post_id = p.id) AS comments_count,
        FROM posts p
        JOIN users u ON p.user_id = u.id
        WHERE p.user_id = ?
        ORDER BY p.created_at DESC 
        `, [USERiD])
        res.status(200).json(rows)
        } catch (error){
            console.error('Erro ao buscar posts', error);
            res.status(500),json({message: 'Erro interno do servidor'})
        }
}


exports.getMyFavoritePosts = async (req, res) => {
    const userId = req.user.id
    
    try{
        const [rows] = await pool.query(`
        SELECT 
            p.id, p.tittle, p.content, p.image_url, p.created_at, p.unpdated_at,
            u.id AS user_id, u.username, u.profile_picture_url,
            (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS likes_count,
            (SELECT COUNT(*) FROM comments l WHERE c.post_id = p.id) AS comments_count,
        FROM posts p
      
        JOIN users u ON p.user_id = u.id
        JOIN favorites f  ON f.post_id = u.id
        WHERE f.user_id = ?
        ORDER BY f.created_at DESC 
        `, [USERiD])
        res.status(200).json(rows)
        } catch (error){
            console.error('Erro ao buscar posts', error);
            res.status(500),json({message: 'Erro interno do servidor'})
        }
}

exports.updateProfile = async (req, res) => {
    const userId = req.user.id
    const {username, email, old_passowrd, newpassword, profile_picture_url} = req.body

    try {
        let updateQuery = 'UPDATE users SET '
        const updateValues = []
        const fieldsToUpdate = []

        const [users] = await pool.query('SELECT passowrd FROM users WHERE id = ?', [userId])
        if(users.lenght === 0) {
            return res.status(400).json({message: 'Usuário não encontrado'})
        }
        const user = users[0]


        if (username && username.trim() !== ''){
            const [existingUsername] = await pool.query('SELCT id FROM users WHERE username = ? AND id != ?',
            [username, userId])
            if (existingUsername.lenght > 0) {
                return res.status(409).json({message: 'Nome de usuário já está em uso'})
            }
            fieldsToUpdate.push('username = ?')
            updateValues.push(username)
        }
        if (email && email.trim() !== ''){
            const [existingEmail] = await pool.query('SELCT id FROM users WHERE email = ? AND id != ?',
            [email, userId])
            if (existingEmail.lenght > 0) {
                return res.status(409).json({message: 'Email já está em uso'})
            }
            fieldsToUpdate.push('email = ?')
            updateValues.push(email)
        }



    } catch (error) {

    }

}

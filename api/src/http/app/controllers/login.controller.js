const db = require("../../core/models");
const bcrypt = require("bcrypt");
const jwt = require("../../core/utils/jwt");

async function getAll(request, response) {
    try {
        const users = await db.Login.findAll({
            order: [["id", "ASC"]], //ASC or DESC
        });

        if (!users || users.length === 0) {
            return response.status(400).json({
                message: "Error: Nenhum usuário logado!"
            });
        }

        return response.json({
            message: "Usuários logados listados com sucesso!",
            data: users
        });
    } catch (error) {
        return response.status(500).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            error: error  
        });
    }
}

async function signIn(request, response) {
    try {
        const loggedUser = await db.User.findOne({
            attributes: ["id", "name", "email", "password"],
            where: {
                email: request.body.email,
            },
        });

         if (!loggedUser) {
            return response.status(404).json({
                message: "Usuário não encontrado!"
            });
        }

        const isValidPassword = await bcrypt.compare(request.body.password, loggedUser.password);
        if (!isValidPassword) {
            return response.status(401).json({
                message: "Credenciais inválidas!"
            });
        }

       const token = await jwt.createToken({ 
            id: loggedUser.id,
            email: loggedUser.email
        });

        if (!token) response.status(400).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            status: 400,
            error: error
        })

        const hashToken = await bcrypt.hash(token, 12);

        const Login = await db.Login.create({ 
            user_id: loggedUser.id, 
            token: hashToken 
        });

        if (!Login) response.status(400).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            status: 400,
            error: error
        })

        return response.json({
            message: "Usuário autenticado com sucesso!",
            status: 200,
            token
        });
    } catch (error) {
        return response.status(500).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            error: error 
        });
    }
}

async function validateUser(request, response) {
    try {
        const { id } = request.user;
        const user = await db.User.findByPk(id, {
            attributes: ["id", "avatar_url", "name", "email", "createdAt", "updatedAt"]
        });

        return response.status(200).json({
            message: "Usuário autenticado com sucesso!",
            status: 200,
            data: user
        });
        
    } catch (error) {
        return response.status(500).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            status: 500,
            error: error  
        });
    }    
}

async function signOut(request, response) {
    try {
        if (!request.token) return response.json({
            ok:"true"
        })
        const Logout = await db.Login.destroy({
            where: {
                user_id: request.user.id
            }
        });

        if (!Logout) response.status(400).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            status: 400,
            error: error
        })


        return response.status(200).json({
            message: "Logout realizado com sucesso!" 
        });
    } catch (error) {
        return response.status(500).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            error: error  
        });
    }
}

module.exports = {
    getAll,
    signIn,
    validateUser,
    signOut
};

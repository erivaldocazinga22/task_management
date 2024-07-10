const db = require("../../core/models");
const bcrypt = require("bcrypt");

async function getAll(request, response) {
    try {
        const users = await db.User.findAll({
            order: [["id", "ASC"]], //ASC or DESC
            attributes: ["id", "avatar_url", "name", "email", "createdAt", "updatedAt"]
        });
    
        if (!users) response.status(400).json({
            message: "Error: Nenhum usuário encontrado!",
            status: 400
        });


        return response.json({
            message: "Usuários listado com sucesso!",
            status: 200,
            data: users
        });
    } catch (error) {
        return response.status(500).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            status: 500,
            error: error  
        });
    }
}
async function getUserById(request, response) {
    const { id } = request.params;
    try {
        const user = await db.User.findByPk(id, {
            attributes: ["id", "avatar_url", "name", "email", "level", "createdAt"]
        });
        
        if (!user) return response.status(400).json({
            message: "Error: Usuário não encontrado!",
            status: 400
        });


        return response.status(200).json({
            message: `Usuário com o id ${user.id} listado com sucesso!!`,
            status: 200,
            data: user
        })
    } catch (error) {
        return response.status(500).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            status: 500,
            error: error  
        });
    }
}
async function createUser(request, response) {
    const hashPassword = await bcrypt.hash(request.body.password, 12);
    await db.User.create({ 
        ...request.body, 
        avatar_url: request.file.filename, 
        password: hashPassword 
    }).then(responseUser => {
        return response.json({
            message: "Usuário cadastrado com sucesso!",
            status: 200,
            data: responseUser
        });
    }).catch(error => {
        return response.status(500).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            status: 500,
            error: error  
        });
    }); 
}
async function deleteUser(request, response) {
    const { id } = request.params;
    try {
        const destroyUser = await db.User.destroy({ where: { id: id } });
        if (!destroyUser) response.status(400).json({
            message: "Error: Falha ao deletar usuário!",
            status: 400
        });

        
        return response.json({
            message: "Usuário deletado com sucesso!",
            status: 200
        });

    } catch (error) {
        return response.status(500).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            status: 500,
            error: error  
        });
    }
}
async function updateUser(request, response) {
    try {
        return response.json({
            message: "Usuário actulizado com sucesso!",
            status: 200,
            data: request.body
        })
    } catch (error) {
        return response.status(500).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            status: 500,
            error: error  
        });
    }
}


module.exports = {
    getAll,
    getUserById,
    createUser,
    deleteUser,
    updateUser
}
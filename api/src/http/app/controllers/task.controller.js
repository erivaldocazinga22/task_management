const db = require("../../core/models");

async function getAll(request, response) {
    try {
        const tasks = await db.Task.findAll({
            order: [["id", "ASC"]], //ASC or DESC
            where: (!request.body || !request.body.all) ? { 
                user_id:  request.user.id
            } : undefined
        }); 
    
        if (!tasks) response.status(404).json({
            message: "Error: Falha ao buscar as tarefas"
        });

        if (tasks.length === 0) response.status(400).json({
            message: "Error: Nenhuma tarefa encontrado!"
        });

        return response.json({
            message: "Tarefas listados com sucesso!",
            data: tasks
        });
    } catch (error) {
        return response.status(500).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            error: error  
        });
    }
}
async function getTaskById(request, response) {
    const { id } = request.params;
    try {
        const user = await db.Task.findOne({
            where: !request.body || !request.body.all 
            ? { id, user_id: request.user.id}
            : { id }
        }
        );
        
        if (!user) return response.status(400).json({
            message: "Error: Tarefa não encontrado!"
        });

        return response.status(200).json({
            message: `Tarefa com o id ${user.id} listado com sucesso!!`,
            data: user
        })
    } catch (error) {
        return response.status(500).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            error: error,
        });
    }
}
async function createTask(request, response) {
    try {
        const newTask = await db.Task.create({
            title: request.body.title, 
            user_id: request.user.id, 
            status: "new" 
        });

        return response.json({
            message: "Tarefa criada com sucesso!",
            data: newTask
        });
    } catch (error) {
        return response.status(500).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            error: error
        });
    }
}

async function deleteTask(request, response) {
    const { id } = request.params;
    try {
        const destroyTask = await db.Task.destroy({ where: { id: +id, user_id: request.user.id } });
        if (!destroyTask) response.status(400).json({
            message: "Error: Falha ao deletar tarefa!",
            deleteTask
        });
        
        return response.json({
            message: "Tarefa deletado com sucesso!",
            id: +id,
            user_id: request.user.id,
            destroyTask
        });
    } catch (error) {
        return response.status(500).json({
            message: "Error: Falha na comunicação com o servidor. Tente mais tarde!",
            error: error  
        });
    }
}

async function updateTask(request, response) {
    try {
        const [rowsUpdated] = await db.Task.update(
            {
                title: request.body.title,
                status: request.body.status
            },
            {
                where: {
                    id: request.body.id,
                    user_id: request.user.id
                }
            }
        );

        if (rowsUpdated === 0) {
            return response.status(404).json({
                message: "Tarefa não encontrada ou usuário não autorizado"
            });
        }

        return response.json({
            message: "Tarefa atualizada com sucesso!",
            body: request.body
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
    getTaskById,
    createTask,
    deleteTask,
    updateTask
}
import noteDTO from "../DAO/DTO/note.dto.js";
import NoteManager from "../DAO/class/note.class.js";
import UserManager from "../DAO/class/user.class.js";
import customError from "../errors/customError.js";
import utils from "../utils/utils.js";
import infoError from '../errors/infoError.js';

const nm = new NoteManager();
const um = new UserManager();

const getAll = async (req, res, next) => {
    try {
        const notas = await nm.get();
        if (!notas) customError.createError({ name: 'Error', cause: 'La base de datos no puede encontrar las notas', message: 'Error al buscar todas las notas', code: 5 })
        res.status(200).send({ status: 'succes', payload: notas});

    } catch (error) {
        next(error);
    }
}

const getByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const nota = await nm.getById(id);
        const validUser = nota.share_with.find(user => user.user._id == req.user._id);
        if (!nota) customError.createError({ name: 'Error', cause: 'La nota no existe o el id es inválido', message: 'Error al buscar la nota', code: 4 });
        if (validUser.user._id == req.user._id || req.user._id == nota.created_by) return res.status(200).send({ status: 'succes', payload: nota });
        else customError.createError({ name: 'Error', cause: infoError.noPermissionsError(), message: 'Error al buscar la nota', code: 3 });
    } catch (error) {
        next(error);
    }
}

const createNote = async (req, res, next) => {
    try {
        const { title, content, users } = req.body;
        const validUsers = [];
        const invalidUsers = [];
        const validUsersResponse = [];
        const usuarios = await um.get();
        if (!usuarios) customError.createError({ name: 'Error', cause: 'Error al evaluar los usuarios existentes', message: 'Error al crear la nota', code: 5 })
        if (!users) customError.createError({ name: 'Error', cause: 'Debes compartir la nota con al menos 1 persona', message: 'Error al crear la nota', code: 2 });
        for (let i = 0; i < users.length; i++) {
            const element = users[i];
            const userExist = usuarios.find(user => user.nickname === element)
            if (userExist) validUsers.push({ user: userExist._id });
            else invalidUsers.push(element)
        }
        if (validUsers.length === 0) customError.createError({ name: 'Error', cause: infoError.invalidUsersError(invalidUsers), message: 'Error al crear la nota', code: 1 })
        if (!content || !title) customError.createError({ name: 'Error', cause: infoError.missingFieldsNote(title, content, validUsersResponse), message: 'Error al crear la nota', code: 2 });
        else {
            const nota = new noteDTO(title, content, req.user._id, utils.actualDate(), validUsers);
            const newNote = await nm.create(nota);
            return res.status(200).send({ status: 'succes', payload: newNote, message: `Los usuarios: ${JSON.stringify(invalidUsers)} no se agregaron debido a que no existen.` });
        }
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { keyupdate, title, content } = req.body;
        const note = await nm.getById(id);
        const sharedUser = note.share_with.find(user => user.user._id == req.user._id);
        if (sharedUser.user._id == req.user._id || req.user._id == note.created_by) {
            switch (keyupdate) {
                case 'titulo':
                    if (!title) res.status(400).send({ status: 'error', error: 'Debes proporcionar un titulo' });
                    else {
                        await nm.updateTitle(id, title);
                        res.status(200).send({ status: 'succes', message: 'title updated!' })
                        break;
                    }
                case 'descripcion':
                    if (!content) res.status(400).send({ status: 'error', error: 'Debes proporcionar un contenido' });
                    else {
                        await nm.updateContent(id, content);
                        res.status(200).send({ status: 'succes', payload: 'content updated!' })
                        break;
                    }
            }
        } else {
            customError.createError({ name: 'Error', cause: infoError.noPermissionsError(), message: 'Error al actualizar la nota', code: 3 });;
        }
    } catch (error) {
        next(error);
    }
}

const deleteNote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const note = await nm.getById(id);
        if (!note) customError.createError({ name: 'Error', cause: 'La nota no existe o el id es inválido', message: 'Error al borrar la nota', code: 4 })
        if (req.user._id !== note.created_by) customError.createError({ name: 'Error', cause: infoError.noPermissionsError(), message: 'Error al borrar la nota', code: 3 })
        else {
            await nm.deleteNote(id);
            return res.status(200).send({ status: 'succes', message: 'note deleted!' });
        }
    } catch (error) {
        next(error);
    }
}

export default {
    getAll,
    getByID,
    createNote,
    update,
    deleteNote
}
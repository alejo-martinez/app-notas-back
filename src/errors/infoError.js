const missingFieldsNote = (title, content, users) =>{
    return `El campo title es necesario, se obtuvo: ${title}. Content es necesario, se obtuvo: ${content}.`;
}

const invalidUsersError = (users) =>{
    return `Los usuarios: ${JSON.stringify(users)} no existen.`
}

const noPermissionsError = ()=>{
    return `No tienes los permisos para realizar esta acción.`
}

export default {
    missingFieldsNote,
    invalidUsersError,
    noPermissionsError
}
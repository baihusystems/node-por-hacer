const descripcion = {
    demand: true,
    alias: 'd',
    desc: "crea una tarea por hacer"
};

const completado = {
    alias: 'c',
    default: true
};

const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Elimina una tarea', {
        descripcion
    })
    .command('listar', 'Listar tareas', {
        completado: {
            alias: 'c',
            default: 'all'
        }
    })

.help()
    .argv;

module.exports = {
    argv
}
const fs = require('fs');

let listadopPorHacer = [];

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };
    listadopPorHacer.push(porHacer);
    guardarDB(porHacer);

    return porHacer;
}

const guardarDB = () => {
    let data = JSON.stringify(listadopPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('No se puede guardar datos' + err)
    });
}

const cargarDB = () => {
    try {
        listadopPorHacer = require('../db/data.json');

    } catch (error) {
        listadopPorHacer = [];
    }
}

const getListado = (completado) => {
    cargarDB();
    let busqueda;
    if (completado == 'all') {
        return listadopPorHacer;
    } else {
        let nuevoListado = listadopPorHacer.filter(tarea => {
            return tarea.completado == completado;
        })
        return nuevoListado;
    }
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadopPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });


    if (index >= 0) {
        listadopPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}


const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadopPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    })

    if (listadopPorHacer.length == nuevoListado.length) {
        return false;
    } else {
        listadopPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}
const message = require('../../modulo/config');
const generoDAO = require('../model/DAO/genero');

const inserirGenero = async (genero, contentType) => {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (genero.nome == '' || genero.nome == undefined || genero.nome == null || genero.nome.length > 100) {
                return message.ERROR_REQUIRE_FIELDS;
            } else {
                let result = await generoDAO.insertGenero(genero);
                return result ? message.SUCESS_CREATED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL;
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

const atualizarGenero = async (id, genero, contentType) => {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (genero.nome == '' || genero.nome == undefined || genero.nome == null || genero.nome.length > 100 ||
                id == '' || id == undefined || id == null || isNaN(id)) {
                return message.ERROR_REQUIRE_FIELDS;
            } else {
                let verificar = await generoDAO.selectByIdGenero(id);

                if (verificar) {
                    genero.id = id;
                    let result = await generoDAO.updateGenero(genero);
                    return result ? message.SUCESS_UPDATED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL;
                } else {
                    return message.ERROR_NOT_FOUND;
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

const excluirGenero = async (id) => {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRE_FIELDS;
        } else {
            let verificar = await generoDAO.selectByIdGenero(id);

            if (verificar) {
                let result = await generoDAO.deleteGenero(id);
                return result ? message.SUCESS_DELETED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

const listarGenero = async () => {
    try {
        let dados = await generoDAO.selectAllGenero();

        if (dados && dados.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: dados.length,
                generos: dados
            };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

const buscarGenero = async (id) => {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRE_FIELDS;
        } else {
            let dados = await generoDAO.selectByIdGenero(id);

            if (dados) {
                return {
                    status: true,
                    status_code: 200,
                    genero: dados
                };
            } else {
                return message.ERROR_NOT_FOUND;
            }
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

module.exports = {
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero
};

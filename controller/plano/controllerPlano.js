const message = require('../../modulo/config');
const planoDAO = require('../model/DAO/plano');

const inserirPlano = async (plano, contentType) => {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (plano.nome == '' || plano.nome == undefined || plano.nome == null || plano.nome.length > 100 ||
                plano.valor == '' || plano.valor == undefined || plano.valor == null || isNaN(plano.valor) ||
                plano.descricao == undefined) {
                return message.ERROR_REQUIRE_FIELDS;
            } else {
                let result = await planoDAO.insertPlano(plano);
                return result ? message.SUCESS_CREATED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL;
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

const atualizarPlano = async (id, plano, contentType) => {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (plano.nome == '' || plano.nome == undefined || plano.nome == null || plano.nome.length > 100 ||
                plano.valor == '' || plano.valor == undefined || plano.valor == null || isNaN(plano.valor) ||
                plano.descricao == undefined ||
                id == '' || id == undefined || id == null || isNaN(id)) {
                return message.ERROR_REQUIRE_FIELDS;
            } else {
                let verificar = await planoDAO.selectByIdPlano(id);

                if (verificar) {
                    plano.id = id;
                    let result = await planoDAO.updatePlano(plano);
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

const excluirPlano = async (id) => {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRE_FIELDS;
        } else {
            let verificar = await planoDAO.selectByIdPlano(id);

            if (verificar) {
                let result = await planoDAO.deletePlano(id);
                return result ? message.SUCESS_DELETED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

const listarPlano = async () => {
    try {
        let dados = await planoDAO.selectAllPlano();

        if (dados && dados.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: dados.length,
                planos: dados
            };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

const buscarPlano = async (id) => {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRE_FIELDS;
        } else {
            let dados = await planoDAO.selectByIdPlano(id);

            if (dados) {
                return {
                    status: true,
                    status_code: 200,
                    plano: dados
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
    inserirPlano,
    atualizarPlano,
    excluirPlano,
    listarPlano,
    buscarPlano
};

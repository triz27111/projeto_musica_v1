const message = require('../../modulo/config');
const assinaturaDAO = require('../model/DAO/assinatura');

const inserirAssinatura = async (assinatura, contentType) => {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (assinatura.data_assinatura == '' || assinatura.data_assinatura == undefined || assinatura.data_assinatura == null || assinatura.data_assinatura.length > 10 ||
                assinatura.id_usuario == '' || assinatura.id_usuario == undefined || assinatura.id_usuario == null || isNaN(assinatura.id_usuario) ||
                assinatura.id_plano == '' || assinatura.id_plano == undefined || assinatura.id_plano == null || isNaN(assinatura.id_plano)) {
                return message.ERROR_REQUIRE_FIELDS;
            } else {
                let result = await assinaturaDAO.insertAssinatura(assinatura);
                return result ? message.SUCESS_CREATED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL;
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

const atualizarAssinatura = async (id, assinatura, contentType) => {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (assinatura.data_assinatura == '' || assinatura.data_assinatura == undefined || assinatura.data_assinatura == null || assinatura.data_assinatura.length > 10 ||
                assinatura.id_usuario == '' || assinatura.id_usuario == undefined || assinatura.id_usuario == null || isNaN(assinatura.id_usuario) ||
                assinatura.id_plano == '' || assinatura.id_plano == undefined || assinatura.id_plano == null || isNaN(assinatura.id_plano) ||
                id == '' || id == undefined || id == null || isNaN(id)) {
                return message.ERROR_REQUIRE_FIELDS;
            } else {
                let verificar = await assinaturaDAO.selectByIdAssinatura(id);

                if (verificar) {
                    assinatura.id = id;
                    let result = await assinaturaDAO.updateAssinatura(assinatura);
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

const excluirAssinatura = async (id) => {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRE_FIELDS;
        } else {
            let verificar = await assinaturaDAO.selectByIdAssinatura(id);

            if (verificar) {
                let result = await assinaturaDAO.deleteAssinatura(id);
                return result ? message.SUCESS_DELETED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

const listarAssinatura = async () => {
    try {
        let dados = await assinaturaDAO.selectAllAssinatura();

        if (dados && dados.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: dados.length,
                assinaturas: dados
            };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

const buscarAssinatura = async (id) => {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRE_FIELDS;
        } else {
            let dados = await assinaturaDAO.selectByIdAssinatura(id);

            if (dados) {
                return {
                    status: true,
                    status_code: 200,
                    assinatura: dados
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
    inserirAssinatura,
    atualizarAssinatura,
    excluirAssinatura,
    listarAssinatura,
    buscarAssinatura
};

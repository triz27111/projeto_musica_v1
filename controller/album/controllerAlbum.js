const message = require('../../modulo/config');
const albumDAO = require('../model/DAO/album');

const inserirAlbum = async (album, contentType) => {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (album.nome == '' || album.nome == undefined || album.nome == null || album.nome.length > 100 ||
                album.data_lancamento == '' || album.data_lancamento == undefined || album.data_lancamento == null || album.data_lancamento.length > 10 ||
                album.id_banda == '' || album.id_banda == undefined || album.id_banda == null || isNaN(album.id_banda)) {
                return message.ERROR_REQUIRE_FIELDS;
            } else {
                let result = await albumDAO.insertAlbum(album);
                return result ? message.SUCESS_CREATED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL;
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

const atualizarAlbum = async (id, album, contentType) => {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (album.nome == '' || album.nome == undefined || album.nome == null || album.nome.length > 100 ||
                album.data_lancamento == '' || album.data_lancamento == undefined || album.data_lancamento == null || album.data_lancamento.length > 10 ||
                album.id_banda == '' || album.id_banda == undefined || album.id_banda == null || isNaN(album.id_banda) ||
                id == '' || id == undefined || id == null || isNaN(id)) {
                return message.ERROR_REQUIRE_FIELDS;
            } else {
                let verificar = await albumDAO.selectByIdAlbum(id);

                if (verificar) {
                    album.id = id;
                    let result = await albumDAO.updateAlbum(album);
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

const excluirAlbum = async (id) => {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRE_FIELDS;
        } else {
            let verificar = await albumDAO.selectByIdAlbum(id);

            if (verificar) {
                let result = await albumDAO.deleteAlbum(id);
                return result ? message.SUCESS_DELETED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

const listarAlbum = async () => {
    try {
        let dados = await albumDAO.selectAllAlbum();

        if (dados && dados.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: dados.length,
                albuns: dados
            };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

const buscarAlbum = async (id) => {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRE_FIELDS;
        } else {
            let dados = await albumDAO.selectByIdAlbum(id);

            if (dados) {
                return {
                    status: true,
                    status_code: 200,
                    album: dados
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
    inserirAlbum,
    atualizarAlbum,
    excluirAlbum,
    listarAlbum,
    buscarAlbum
};

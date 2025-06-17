//Import do arquivo de mensagens e status code
const message = require('../../modulo/config')

//Import do DAO para realizar CRUD no BD
const artistaDAO = require('../../model/DAO/artista.js')

//Função para inserir um novo artista
const inserirArtista = async function (artista, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                artista.nome == '' || artista.nome == null || artista.nome == undefined || artista.nome.length > 100
            ) {
                return message.ERROR_REQUIRE_FIELDS //400
            } else {
                let resultArtista = await artistaDAO.insertArtista(artista)

                if (resultArtista) {
                    return message.SUCESS_CREATED_ITEM //201
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para atualizar um artista
const atualizarArtista = async function (id, artista, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                artista.nome == '' || artista.nome == null || artista.nome == undefined || artista.nome.length > 100 ||
                id == '' || id == undefined || id == null || isNaN(id)
            ) {
                return message.ERROR_REQUIRE_FIELDS //400
            } else {
                // Verifica se o artista existe no banco
                let result = await artistaDAO.selectByIdArtista(id)

                if (result != false && typeof result == 'object') {
                    if (result.length > 0) {
                        artista.id = id
                        let resultArtista = await artistaDAO.updateArtista(artista)

                        if (resultArtista) {
                            return message.SUCESS_UPDATED_ITEM //200
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        }
                    } else {
                        return message.ERROR_NOT_FOUND //404
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para excluir um artista
const excluirArtista = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRE_FIELDS //400
        } else {
            // Verifica se artista existe antes de excluir
            let resultArtista = await artistaDAO.selectByIdArtista(id)

            if (resultArtista != false && typeof resultArtista == 'object') {
                if (resultArtista.length > 0) {
                    let result = await artistaDAO.deleteArtista(id)

                    if (result) {
                        return message.SUCESS_DELETED_ITEM //200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para listar artistas
const listarArtistas = async function () {
    try {
        let dadosArtista = {}

        let resultArtista = await artistaDAO.selectAllArtista()

        if (resultArtista != false && typeof resultArtista == 'object') {
            if (resultArtista.length > 0) {
                dadosArtista.status = true
                dadosArtista.status_code = 200
                dadosArtista.items = resultArtista.length
                dadosArtista.artistas = resultArtista
                return dadosArtista
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para buscar artista por id
const buscarArtista = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRE_FIELDS //400
        } else {
            let dadosArtista = {}

            let resultArtista = await artistaDAO.selectByIdArtista(id)

            if (resultArtista != false && typeof resultArtista == 'object') {
                if (resultArtista.length > 0) {
                    dadosArtista.status = true
                    dadosArtista.status_code = 200
                    dadosArtista.artistas = resultArtista
                    return dadosArtista
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirArtista,
    atualizarArtista,
    excluirArtista,
    listarArtistas,
    buscarArtista
}

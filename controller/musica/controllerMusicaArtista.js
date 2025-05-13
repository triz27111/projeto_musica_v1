//Import do arquivo de mensagens e status code
const message = require('../../modulo/config')

//Import do DAO realizar o CRUD no BD
const musicaArtistaDAO = require('../../model/DAO/musica_artista.js')

//Função para inserir uma nova relação musica-artista
const inserirMusicaArtista = async function (relacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                relacao.id_musica == '' || relacao.id_musica == null || relacao.id_musica == undefined || isNaN(relacao.id_musica) ||
                relacao.id_artista == '' || relacao.id_artista == null || relacao.id_artista == undefined || isNaN(relacao.id_artista)
            ) {
                return message.ERROR_REQUIRE_FIELDS // status code 400
            } else {
                let result = await musicaArtistaDAO.inserirMusicaArtista(relacao)

                if (result)
                    return message.SUCESS_CREATED_ITEM // 201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Função para atualizar uma relação musica-artista
const atualizarMusicaArtista = async function (id, relacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                relacao.id_musica == '' || relacao.id_musica == null || relacao.id_musica == undefined || isNaN(relacao.id_musica) ||
                relacao.id_artista == '' || relacao.id_artista == null || relacao.id_artista == undefined || isNaN(relacao.id_artista) ||
                id == '' || id == null || id == undefined || isNaN(id)
            ) {
                return message.ERROR_REQUIRE_FIELDS // 400
            } else {
                let result = await musicaArtistaDAO.selectByIdMusicaArtista(id)

                if (result != false && typeof result == 'object') {
                    if (result.length > 0) {
                        relacao.id = id
                        let updateResult = await musicaArtistaDAO.updateMusicaArtista(relacao)

                        if (updateResult)
                            return message.SUCESS_UPDATED_ITEM // 200
                        else
                            return message.ERROR_INTERNAL_SERVER_MODEL // 500
                    } else {
                        return message.ERROR_NOT_FOUND // 404
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Função para excluir uma relação musica-artista
const excluirMusicaArtista = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRE_FIELDS // 400
        } else {
            let result = await musicaArtistaDAO.selectByIdMusicaArtista(id)

            if (result != false && typeof result == 'object') {
                if (result.length > 0) {
                    let deleteResult = await musicaArtistaDAO.deleteMusicaArtista(id)

                    if (deleteResult)
                        return message.SUCESS_DELETED_ITEM // 200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL // 500
                } else {
                    return message.ERROR_NOT_FOUND // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Função para listar todas as relações musica-artista
const listarMusicaArtista = async function () {
    try {
        let dados = {}
        let result = await musicaArtistaDAO.selectAllMusicaArtista()

        if (result != false && typeof result == 'object') {
            if (result.length > 0) {
                dados.status = true
                dados.status_code = 200
                dados.items = result.length
                dados.relations = result
                return dados
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Função para buscar uma relação musica-artista por ID
const buscarMusicaArtista = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRE_FIELDS // 400
        } else {
            let dados = {}
            let result = await musicaArtistaDAO.selectByIdMusicaArtista(id)

            if (result != false && typeof result == 'object') {
                if (result.length > 0) {
                    dados.status = true
                    dados.status_code = 200
                    dados.relations = result
                    return dados
                } else {
                    return message.ERROR_NOT_FOUND // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirMusicaArtista,
    atualizarMusicaArtista,
    excluirMusicaArtista,
    listarMusicaArtista,
    buscarMusicaArtista
}

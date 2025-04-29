/***************************************************************************
 * Objetivo: Controller referente as ações de CRUD de Banda
 * Data: 11/02/2025
 * Autor: Beatriz Rodrigues
 * Versão: 1.0
 ****************************************************************************/
//Import do arquivo de mensagens e status code
const message  = require('../../modulo/config')

//Import do DAO realizar o CRUD no BD
const bandaDAO = require('../../model/DAO/banda')

//Função para inserir uma nova banda
const inserirBanda = async function (banda, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(
               banda.nome            == ''        || banda.nome            == null  || banda.nome             == undefined ||  banda.nome.length > 100        ||
               banda.pais_origem     == ''        || banda.pais_origem     == null  || banda.pais_origem      == undefined ||  banda.pais_origem.length > 100 ||
               banda.data_criacao    == ''        || banda.data_criacao    == null  || banda.data_criacao     == undefined ||  banda.data_criacao.length > 10                          
            )
            {
                return message.ERROR_REQUIRE_FIELDS //status code 400
            } else {
                let resultBanda = await bandaDAO.inserirBanda(banda)
                if(resultBanda){
                    return message.SUCESS_CREATED_ITEM //201
                }else{
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

//Função para atualizar uma banda
const atualizarBanda = async function (id, banda, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(banda.nome            == ''        || banda.nome            == null  || banda.nome            == undefined ||  banda.nome.length > 100  ||
               banda.pais_origem     == ''        || banda.pais_origem     == null  || banda.pais_origem     == undefined ||  banda.pais_origem.length > 100 ||
               banda.data_criacao    == ''        || banda.data_criacao    == null  || banda.data_criacao    == undefined ||  banda.data_criacao.length > 10 ||
               id                    == ''        || id                    == undefined || id == null || isNaN(id)
              ) {
                return message.ERROR_REQUIRE_FIELDS //status code 400
            } else {
                let result = await bandaDAO.selectByIdBanda(id)
                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){
                        banda.id = id
                        let resultBanda = await bandaDAO.updateBanda(banda)
                        if(resultBanda){
                            return message.SUCESS_UPDATE_ITEM
                        } else {
                            return message.ERROR_NOT_FOUND // 404
                        }
                    } else {
                        return message.ERROR_NOT_FOUND // 404
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

//Função para excluir uma banda
const excluirBanda = async function (id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        } else {
            let resultBanda = await bandaDAO.selectByIdBanda(id)
            if(resultBanda != false || typeof(resultBanda) == 'object'){
                if (resultBanda.length > 0){
                    let result = await bandaDAO.deleteBanda(id)
                    if(result)
                        return message.SUCESS_DELETE_ITEM
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
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

//Função para listar todas as bandas
const listarBanda = async function () {
    try {
        let dadosBanda = {}
        //chamar funç
        let resultBanda = await bandaDAO.selectAllBanda()

        if(resultBanda != false || typeof(resultBanda) == 'object'){
            if(resultBanda.length > 0){

                //criando um JSON de retorno de dados para A API
                dadosBanda.status = true
                dadosBanda.status_code = 200
                dadosBanda.items = resultBanda.length

            
                dadosBanda.bandas = resultBanda
                return dadosBanda
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

//Função para buscar uma banda pelo ID
const buscarBanda = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        } else {
            let dadosBanda = {}
            let resultBanda = await bandaDAO.selectByIdBanda(id)

            if(resultBanda != false || typeof(resultBanda) == 'object'){
                if(resultBanda.length > 0){
                    dadosBanda.status = true
                    dadosBanda.status_code = 200
                    dadosBanda.banda = resultBanda
                    return dadosBanda
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
    inserirBanda,
    atualizarBanda,
    excluirBanda,
    listarBanda,
    buscarBanda
}

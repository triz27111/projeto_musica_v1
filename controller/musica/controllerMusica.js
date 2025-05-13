/***************************************************************************
 * Objetivo: Controller referente as ações de CRUD de Música
 * Data: 11/02/2025
 * Autor: Beatriz Rodrigues
 * Versão: 1.0
 ****************************************************************************/
//Import do arquivo de menssagens e status code
const message   = require('../../modulo/config')

//Import do DAO realizar o CRUD no BD
const musicaDAO = require('../../model/DAO/musica.js')

//Função para inserir uma nova musica
const inserirMusica = async function (musica, contentType) {
    
    try {

    if(String(contentType).toLowerCase() == 'application/json'){
        if(musica.nome            == ''        || musica.nome            == null  || musica.nome             == undefined ||  musica.nome.lenght > 100  ||
            musica.duracao         == ''        || musica.duracao         == null  || musica.duracao          == undefined ||  musica.duracao.lenght > 8 ||
            musica.data_lancamento == ''        || musica.data_lancamento == null  || musica.data_lancamento  == undefined ||  musica.data_lancamento.lenght > 10 ||
            musica.letra           == undefined ||
            musica.link            == undefined || musica.link.lenght > 200
         )
         {
             return message.ERROR_REQUIRE_FIELDS //status code 400
         }else{
             //encaminhando os dados da msuica para o DAO realizar o insert no BD
             let resultMusica = await musicaDAO.insertMusica(musica)
     
             if(resultMusica){
                 return message.SUCESS_CREATED_ITEM //201
             }else{
                 return message.ERROR_INTERNAL_SERVER_MODEL //500
             }
     
        }
    }else{
        return message.ERROR_CONTENT_TYPE//415
    }
   
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }      

    
}
//Função para atualizar uma nova musica
const atualizarMusica = async function (id, musica, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(musica.nome            == ''        || musica.nome             == null  || musica.nome             == undefined ||  musica.nome.lenght > 100  ||
                musica.duracao         == ''        || musica.duracao         == null  || musica.duracao          == undefined ||  musica.duracao.lenght > 8 ||
                musica.data_lancamento == ''        || musica.data_lancamento == null  || musica.data_lancamento  == undefined ||  musica.data_lancamento.lenght > 10 ||
                musica.letra           == undefined ||
                musica.link            == undefined || musica.link.lenght > 200 ||
                id                  == ''        || id                     == undefined || id == null || isNaN(id)
              ) 
              {
                 return message.ERROR_REQUIRE_FIELDS //status code 400
              }else{
                //identifica se o ID existe no BD
                 let result = await musicaDAO.selectByIdMusica(id)

                 if(result =! false || typeof(result) == 'object'){
                    if(result.lenght > 0){
                        //Update

                        //adiciona o atributo do id no json com os dados recebidos no corpo da requisi
                        musica.id = id
                        let resultMusica = await musicaDAO.updateMusica(musica)
                        if(resultMusica){

                        }else{
                            return message.ERROR_NOT_FOUND // 404
                      }
                   }
                    
                 }
                   
              }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        
    }
    
}
//Função para excluir uma nova musica
const excluirMusica = async function (id) {
    try {
        if( id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS//400
        }else{
            //amtes da exclusão, estamos verificando se existe esse ID
            let resultMusica = await musicaDAO.selectByIdMusica(id)

            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if (resultMusica.lenght > 0){
                    //delete
                    let result = await musicaDAO.deleteMsuica(id)

                    if(result)
                        return
                    else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
       return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 
    }
}
//Função para listar uma nova musica
const listarMusica = async function () {
    try {
        let dadosMusica = {}
       //Chama a funçaõ para retornaar as musicas de=o bd
       let resultMusica = await musicaDAO.selectAllMusica()
    
       //!= diferente
       if(resultMusica != false || typeof(resultMusica) == 'object'){
           if(resultMusica.length > 0){
            //Cria um JSON para colocar o array de musicas
            dadosMusica.status = true
            dadosMusica.status_code = 200,
            dadosMusica.items = resultMusica.length
            dadosMusica.musics = resultMusica

        for(const itemMusica of resultMusica){
            
            let dadosMusicaArtista = await controllerMusicaArtista.buscarArtista(itemMusica.id_musicaArtista)

            itemMusica.musicaArtista = dadosMusicaArtista.musicaArtista

            delete itemMusica.id_musicaArtista

            let dadosArtista = await controllerMusicaArtista.buscarArtistaPorMusica(itemMusica.id)

            itemMusica.artista = dadosArtista.artista

            arrayMusicas.push(itemMusica)
        }
               return dadosMusica
            }else{
            return message.ERROR_NOT_FOUND //500
            }
        }else{
          return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
      
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
 
}
//Função para buscar uma nova musica
const buscarMusica = async function (id) {
    try {

           if (id == '' || id == undefined || id == null || isNaN(id)){
              return message.ERROR_REQUIRE_FIELDS //400
            }else{
                   let dadosMusica = {}

                   //chama funcao para retornar a musica no banco de dados
                   let resultado = await musicaDAO.selectByIdMusica(id)

                   if(resultMusica != false || typeof(resultMusica) == 'object'){
                      if(resultMusica.lenght > 0){
                       
                    //cria um json para colocar o array de musicas
                        dadosMusica.status = true
                        dadosMusica.status_code = 200,
                        dadosMusica.musics = resultMusica
            
                        for(const itemMusica of resultMusica){
            
                            let dadosMusicaArtista = await controllerMusicaArtista.buscarArtista(itemMusica.id_musicaArtista)
                
                            itemMusica.musicaArtista = dadosMusicaArtista.musicaArtista
                
                            delete itemMusica.id_musicaArtista
                
                            arrayMusicas.push(itemMusica)
                        }
                    







                        return dadosMusica
                      }else{
                        return message.ERROR_NOT_FOUND //404
                      }
                   }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL//500
                   }}
      
        } catch (error) {
            return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
        
    }
    
}

module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica
}

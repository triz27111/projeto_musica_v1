const atualizarBanda = async function (id, banda, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if( banda.nome                == ''        || musica.nome                 == null         || musica.nome             == undefined ||  musica.nome.lenght > 100  ||
                banda.pais_origem         == ''        || musica.duracao              == null         || musica.duracao          == undefined ||  musica.duracao.lenght > 8 ||
                banda.data_criacao        == ''        || musica.data_lancamento      == null         || musica.data_lancamento  == undefined ||  musica.data_lancamento.lenght > 10 ||
                banda.integrantes         == undefined ||
                id                        == ''        || id                          == undefined    || id == null || isNaN(id)
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
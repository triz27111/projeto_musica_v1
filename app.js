 /***************************************************************************
 * Objetivo: Criar uma API para realizar integração com banco de dados
 * Data: 11/02/2025
 * Autor: Beatriz Rodrigues
 * Versão: 1.0
 * Observações: Para criar a API precisa instalar:
 *    - express           npm install express --save
 *    - cors              npm install cors  --save
 *    - body-parser       npm install body-parser --save
 * 
 * Para criar a conexão com banco de daos precisa instalar:
 *    - prisma            npm install prisma --save
 *    - @prisma/client    npm install @prisma/client --save
 * 
 * Após a instalação do prisma e @prisma/client, devemos:
 *      npx prisma init Para inicializar o prisma no projeto
 * Após esse comando você devera configurar o .env e o schema.prisma, e rodar o comando:
 *      npx prisma migrate dev
 ****************************************************************************/

//import das bibliotecas para criar a API
const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')

//Import das Controllers do projeto
const controllerMusica = require('./controller/musica/controllerMusica')
const controllerBanda = require('./controller/banda/controllerBanda')
const controllerUsuario = require('./controller/usuario/controllerUsuario')
const controllerArtista = require('./controller/controllerArtista')
const controllerAlbum = require('./controller/controllerAlbum')
const controllerGenero = require('./controller/controllerGenero')
const controllerAssinatura = require('./controller/controllerAssinatura')
const controllerPlano = require('./controller/controllerPlano')

//Cria um objeto para body do tipo JSON
const bodyParserJSON = bodyParser.json()

//criando um objeto do app para a API
const app =  express()

//Configurações de permissões do CORS para a API
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()

})
//end-point
//v1 - versão 1//nome do projeto/função

//MUSICA
//Endpoint para inserir uma musica
app.post('/v1/controle-musicas/musica/', cors(),bodyParserJSON, async function(request,response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe os dados do body da requisição
    let dadosBody = request.body
    
    //Chama a função da controller para inserir os dados e agurda o retorno da função
    let resultMusica =  await controllerMusica.inserirMusica(dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

app.get('/v1/controle-musicas/musica', cors(), async function(request, response){
    let resultMusica = await controllerMusica.listarMusica()

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

app.get(`/v1/controle-musicas/musica/:id`, cors(), async function(request, response) {
   
    let idMusica = request.params.id

    let resultMusica = await controllerMusica.buscarMusica(idMusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

app.delete('/v1/controle-musicas/musica/:id', cors(), async function (request,  response){
    //recebe id
    let idMusica = request.params.id

    let resultMusica = await controllerMusica.excluirMusica(idMusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

app.put(`/v1/controle-musicas/musica/:id`, cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    let idMusica = request.params.id

    let dadosBody = request.body
    
    let resultMusica = await controllerMusica.atualizarMusica(idMusica, dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//BANDA

app.post('/v1/controle-musicas/banda/', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultBanda = await controllerBanda.inserirBanda(dadosBody, contentType)

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

app.get('/v1/controle-musicas/banda', cors(), async function (request, response) {
    let resultBanda = await controllerBanda.listarBanda()

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

app.get('/v1/controle-musicas/banda/:id', cors(), async function (request, response) {
    let idBanda = request.params.id

    let resultBanda = await controllerBanda.buscarBanda(idBanda)

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

app.delete('/v1/controle-musicas/banda/:id', cors(), async function (request, response) {
    let idBanda = request.params.id

    let resultBanda = await controllerBanda.excluirBanda(idBanda)

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

app.put('/v1/controle-musicas/banda/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let idBanda = request.params.id
    let dadosBody = request.body

    let resultBanda = await controllerBanda.atualizarBanda(idBanda, dadosBody, contentType)

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})
///USUARIO

app.post('/v1/controle-musicas/usuario/', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultUsuario = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.get('/v1/controle-musicas/usuario', cors(), async function (request, response) {
    let resultUsuario = await controllerUsuario.listarUsuario()

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.get('/v1/controle-musicas/usuario/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id

    let resultUsuario = await controllerUsuario.buscarUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.delete('/v1/controle-musicas/usuario/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id

    let resultUsuario = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.put('/v1/controle-musicas/usuario/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let idUsuario = request.params.id
    let dadosBody = request.body

    let resultUsuario = await controllerUsuario.atualizarUsuario(idUsuario, dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

// ARTISTA
app.post('/v1/controle-musicas/artista/', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultArtista = await controllerArtista.inserirArtista(dadosBody, contentType)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

app.get('/v1/controle-musicas/artista', cors(), async function(request, response) {
    let resultArtista = await controllerArtista.listarArtistas()

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

app.get('/v1/controle-musicas/artista/:id', cors(), async function(request, response) {
    let idArtista = request.params.id

    let resultArtista = await controllerArtista.buscarArtista(idArtista)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

app.delete('/v1/controle-musicas/artista/:id', cors(), async function(request, response) {
    let idArtista = request.params.id

    let resultArtista = await controllerArtista.excluirArtista(idArtista)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

app.put('/v1/controle-musicas/artista/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let idArtista = request.params.id
    let dadosBody = request.body

    let resultArtista = await controllerArtista.atualizarArtista(idArtista, dadosBody, contentType)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

// GENERO
app.post('/v1/controle-musicas/genero/', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.get('/v1/controle-musicas/genero', cors(), async function(request, response) {
    let resultGenero = await controllerGenero.listarGeneros()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.get('/v1/controle-musicas/genero/:id', cors(), async function(request, response) {
    let idGenero = request.params.id

    let resultGenero = await controllerGenero.buscarGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.delete('/v1/controle-musicas/genero/:id', cors(), async function(request, response) {
    let idGenero = request.params.id

    let resultGenero = await controllerGenero.excluirGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.put('/v1/controle-musicas/genero/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let idGenero = request.params.id
    let dadosBody = request.body

    let resultGenero = await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})


// ASSINATURA
app.post('/v1/controle-musicas/assinatura/', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultAssinatura = await controllerAssinatura.inserirAssinatura(dadosBody, contentType)

    response.status(resultAssinatura.status_code)
    response.json(resultAssinatura)
})

app.get('/v1/controle-musicas/assinatura', cors(), async function(request, response) {
    let resultAssinatura = await controllerAssinatura.listarAssinaturas()

    response.status(resultAssinatura.status_code)
    response.json(resultAssinatura)
})

app.get('/v1/controle-musicas/assinatura/:id', cors(), async function(request, response) {
    let idAssinatura = request.params.id

    let resultAssinatura = await controllerAssinatura.buscarAssinatura(idAssinatura)

    response.status(resultAssinatura.status_code)
    response.json(resultAssinatura)
})

app.delete('/v1/controle-musicas/assinatura/:id', cors(), async function(request, response) {
    let idAssinatura = request.params.id

    let resultAssinatura = await controllerAssinatura.excluirAssinatura(idAssinatura)

    response.status(resultAssinatura.status_code)
    response.json(resultAssinatura)
})

app.put('/v1/controle-musicas/assinatura/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let idAssinatura = request.params.id
    let dadosBody = request.body

    let resultAssinatura = await controllerAssinatura.atualizarAssinatura(idAssinatura, dadosBody, contentType)

    response.status(resultAssinatura.status_code)
    response.json(resultAssinatura)
})


// PLANO
app.post('/v1/controle-musicas/plano/', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultPlano = await controllerPlano.inserirPlano(dadosBody, contentType)

    response.status(resultPlano.status_code)
    response.json(resultPlano)
})

app.get('/v1/controle-musicas/plano', cors(), async function(request, response) {
    let resultPlano = await controllerPlano.listarPlanos()

    response.status(resultPlano.status_code)
    response.json(resultPlano)
})

app.get('/v1/controle-musicas/plano/:id', cors(), async function(request, response) {
    let idPlano = request.params.id

    let resultPlano = await controllerPlano.buscarPlano(idPlano)

    response.status(resultPlano.status_code)
    response.json(resultPlano)
})

app.delete('/v1/controle-musicas/plano/:id', cors(), async function(request, response) {
    let idPlano = request.params.id

    let resultPlano = await controllerPlano.excluirPlano(idPlano)

    response.status(resultPlano.status_code)
    response.json(resultPlano)
})

app.put('/v1/controle-musicas/plano/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let idPlano = request.params.id
    let dadosBody = request.body

    let resultPlano = await controllerPlano.atualizarPlano(idPlano, dadosBody, contentType)

    response.status(resultPlano.status_code)
    response.json(resultPlano)
})


//Endpoint pesquisar e deletar musicas pelo id
//app.delete('/v1/controle-musicas/musica/:id', )
app.listen(8080,function(){
    // console.log('Servidor rodando na porta 8080'); 
    console.log('API agurdando requisição...')
})
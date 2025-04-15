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

app.post('/v1/controle-musicas/musica/', cors(),bodyParserJSON, async function(request,response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe os dados do body da requisição
    let dadosBody = request.body
    
    //Chama a função da controller para inserir os dados e agurda o retorno da função
    let resultMusica =  await controllerMusica.inserirBanda
    (dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//Endpoint pesquisar e deletar musicas pelo id
//app.delete('/v1/controle-musicas/musica/:id', )
app.listen(8080,function(){
    console.log('API agurdando requisição...')
})
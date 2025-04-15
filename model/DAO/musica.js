/***************************************************************************
 * Objetivo: Criar o CRUD de dados da tabela de música no Bnaco de dados
 * Data: 11/02/2025
 * Autor: Beatriz Rodrigues
 * Versão: 1.0
 ****************************************************************************/

//Import da biblioteca do prisma cliente para realizar as ações no BD(banco de dados)
const { PrismaClient } = require("@prisma/client")
const { Prisma } = require("@prisma/client/wasm")
//instancia da classe do prisma client(cria um objeto)
const prisma = new PrismaClient()

//Função para inserir uma nova música
const insertMusica = async function(musica){
    try{

    //const não altera
    //let pode ser alterado
    let sql = `insert into tbl_musica (nome,
                                       duracao, 
                                       data_lancamento, 
                                       letra, 
                                       link
                                        )
                                          values 
                                        (
                                        '${musica.nome}',
                                        '${musica.duracao}',
                                        '${musica.data_lancamento}',
                                        '${musica.letra}',
                                        '${musica.link}'
                                        )`

    //Executa o script SQL no banco de dados e agurda o resultado(talvez retorne true ou false (0 ou 1))
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false  //bug no banco de dados
    
    }catch(error){
        return false //bug de programação
    }
                        

}

//Função para atualizar uma música existente
const updateMusica = async function() {
    try {
        let sql = `update tbl_musica set nome            = '${musica.nome}',
                                         duracao         = '${musica.durcao}',
                                         data_lancamento = '${musica.data_lancamento}',
                                         letra           = '${musica.letra}',
                                         link            = '${musica.link}'
                                         where id        = $${musica.id}`
                    
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false
    } catch (error) {    
        return
    }   
}

//Função para excluir uma música existnte
const deleteMsuica = async function () {
    try {
         let sql = `delete from tbl_musicas wj=here id =${id}`

         let resultMusica = await prisma.$executeRawUnsafe(sql)

        if(resultMusica)
            return true
        else
           return false
    } catch (error) {
        return false
    }
}

//função para retornar todas as músicas do BD(BANCO DE DADOS)
const selectAllMusica = async function() {
    try {
        //Script sql
        let sql = 'select * from tbl_musica order by id desc'

        //encaminha o script SQL para o banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result //retorna os dados do banco
        else
            return false
    } catch (error) {
            return false
    }
}

//Função para buscar uma música pelo ID
const selectByIdMusica = async function(id) {
   
try {
    let sql = `select * from tbl_musica where id = ${id}`
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result
    else
    return false
} catch (error) {
    return false
}
    
}

module.exports = {
    insertMusica,
    updateMusica,
    deleteMsuica,
    selectAllMusica,
    selectByIdMusica
}
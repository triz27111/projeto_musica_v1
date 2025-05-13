/***************************************************************************
 * Objetivo: Criar o CRUD de dados da tabela de música no Bnaco de dados
 * Data: 14/04/2025
 * Autor: Beatriz Rodrigues
 * Versão: 1.0
 ****************************************************************************/

const { PrismaClient} = require("@prisma/client")
const prisma=new PrismaClient()


const insertBanda = async function (banda) {
    try {
       
        let sql = `insert into tbl_banda (nome, 
                                                   pais_origem, 
                                                   data_criacao
                                                   )
                                                   values
                                                   (
                                                   '${banda.nome}',
                                                   '${banda.pais_origem}',
                                                   '${banda.data_criacao}'
                                                   )`
        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
       } catch (error) {
        console.log('Erro no inserirBanda (DAO):', error)
          return false
    }
}

const updateBanda = async function (banda) {
    try {
        let sql = `update tbl_banda set nome          = '${banda.nome}',
                                        pais_origem   = '${banda.pais_origem}',
                                        data_criacao  = '${banda.data_criacao}'
                                        where id      = $${banda.id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
      return false
    } catch (error) {
        return
    }
}

const deleteBanda = async function (id) {
    try {
        let sql = `DELETE FROM tbl_banda where id =${id}`

        let resultBanda = await prisma.$executeRawUnsafe(sql)

        if(resultBanda)
            return true
        else
        return false
    } catch (error) {
        return false
    }
}

const selectAllBanda = async function () {
    try {
         let sql = 'SELECT * FROM tbl_banda order by id desc'

         let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result
    else
        return false
    } catch (error) {
        return false
    }
}

const selectByIdBanda = async function (id) {
    try {
        let sql = `select * from tbl_banda where id = ${id}`
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
    insertBanda,
    updateBanda,
    deleteBanda,
    selectAllBanda,
    selectByIdBanda
}
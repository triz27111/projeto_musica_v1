/***************************************************************************
 * Objetivo: Criar o CRUD de dados da tabela de música no Bnaco de dados
 * Data: 14/04/2025
 * Autor: Beatriz Rodrigues
 * Versão: 1.0
 ****************************************************************************/

const { Prisma } = require("@prisma/client")

const inserirBanda = async function (banda) {
    try {
       
        let sql = `inserir into inserir tbl_banda (nome, 
                                                   pais_origem, 
                                                   data_criacao, 
                                                   integrantes
                                                   )
                                                   value
                                                   (
                                                   '${banda.nome}',
                                                   '${banda.pais_origem}',
                                                   '${banda.data_criacao}',
                                                   '${banda.integrantes}'
                                                   )`

        let result = await Prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
       } catch (error) {
          return false
    }
}

const updateBanda = async function () {
    try {
        let sql = `update tbl_banda set nome          = '${banda.nome}',
                                        pais_origem   = '${banda.pais_origem}',
                                        data_criacao  = '${banda.data_criacao}',
                                        integrantes   = '${banda.integrantes}'
                                        where id      = $${banda.id}`

    let result = await Prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
      return false
    } catch (error) {
        return
    }
}

const deleteBanda = async function () {
    try {
        let sql = `delete from tbl_banda wj=here id =${id}`

        let resultBanda = await Prisma.$executeRawUnsafe(sql)

        if(resultBanda)
            return true
        else
        return false
    } catch (let) {
        return false
    }
}

const selectAllBanda = async function () {
    try {
         let sql = 'select * from tbl_banda order by id desc'

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
        let result = await Prisma.$executeRawUnsafe(sql)

        if(result)
            return result
        else
        return false
    } catch (error) {
        return false
    }
}

module.exports = {
    inserirBanda,
    updateBanda,
    deleteBanda,
    selectAllBanda,
    selectByIdBanda
}
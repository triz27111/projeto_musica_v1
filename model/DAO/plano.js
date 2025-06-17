const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertPlano = async function(plano) {
    try {
        let sql = `insert into tbl_plano (nome, valor, descricao)
                   values ('${plano.nome}', '${plano.valor}', '${plano.descricao}')`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const updatePlano = async function(plano) {
    try {
        let sql = `update tbl_plano set nome = '${plano.nome}',
                                        valor = '${plano.valor}',
                                        descricao = '${plano.descricao}'
                   where id = ${plano.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const deletePlano = async function(id) {
    try {
        let sql = `delete from tbl_plano where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const selectAllPlano = async function() {
    try {
        let sql = 'select * from tbl_plano order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result : false
    } catch (error) {
        return false
    }
}

const selectByIdPlano = async function(id) {
    try {
        let sql = `select * from tbl_plano where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result[0] : false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertPlano,
    updatePlano,
    deletePlano,
    selectAllPlano,
    selectByIdPlano
}

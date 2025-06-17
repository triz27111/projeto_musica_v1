const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertGenero = async function(genero) {
    try {
        let sql = `insert into tbl_genero (nome, descricao)
                   values ('${genero.nome}', '${genero.descricao}')`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const updateGenero = async function(genero) {
    try {
        let sql = `update tbl_genero set nome = '${genero.nome}',
                                         descricao = '${genero.descricao}'
                   where id = ${genero.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const deleteGenero = async function(id) {
    try {
        let sql = `delete from tbl_genero where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const selectAllGenero = async function() {
    try {
        let sql = 'select * from tbl_genero order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result : false
    } catch (error) {
        return false
    }
}

const selectByIdGenero = async function(id) {
    try {
        let sql = `select * from tbl_genero where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result[0] : false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}

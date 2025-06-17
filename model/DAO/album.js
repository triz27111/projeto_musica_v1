const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertAlbum = async function(album) {
    try {
        let sql = `insert into tbl_album (nome, data_lancamento, capa, id_banda)
                   values ('${album.nome}', '${album.data_lancamento}', '${album.capa}', ${album.id_banda})`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const updateAlbum = async function(album) {
    try {
        let sql = `update tbl_album set nome = '${album.nome}',
                                         data_lancamento = '${album.data_lancamento}',
                                         capa = '${album.capa}',
                                         id_banda = ${album.id_banda}
                   where id = ${album.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const deleteAlbum = async function(id) {
    try {
        let sql = `delete from tbl_album where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const selectAllAlbum = async function() {
    try {
        let sql = 'select * from tbl_album order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result : false
    } catch (error) {
        return false
    }
}

const selectByIdAlbum = async function(id) {
    try {
        let sql = `select * from tbl_album where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result[0] : false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertAlbum,
    updateAlbum,
    deleteAlbum,
    selectAllAlbum,
    selectByIdAlbum
}

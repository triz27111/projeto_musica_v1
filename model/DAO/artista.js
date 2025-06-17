const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertArtista = async function(artista) {
    try {
        let sql = `insert into tbl_artista (nome, foto, biografia, id_banda)
                   values ('${artista.nome}', '${artista.foto}', '${artista.biografia}', ${artista.id_banda})`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const updateArtista = async function(artista) {
    try {
        let sql = `update tbl_artista set nome = '${artista.nome}',
                                          foto = '${artista.foto}',
                                          biografia = '${artista.biografia}',
                                          id_banda = ${artista.id_banda}
                   where id = ${artista.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const deleteArtista = async function(id) {
    try {
        let sql = `delete from tbl_artista where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const selectAllArtista = async function() {
    try {
        let sql = 'select * from tbl_artista order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result : false
    } catch (error) {
        return false
    }
}

const selectByIdArtista = async function(id) {
    try {
        let sql = `select * from tbl_artista where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result[0] : false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertArtista,
    updateArtista,
    deleteArtista,
    selectAllArtista,
    selectByIdArtista
}

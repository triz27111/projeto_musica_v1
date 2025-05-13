const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const insertMusicaArtista = async function (musica_artista) {
    try {
        let sql = `INSERT INTO tbl_musica_artista (
                        id_musica, 
                        id_artista
                   )
                   VALUES (
                        '${musica_artista.id_musica}',
                        '${musica_artista.id_artista}'
                   )`
        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        console.log('Erro no inserirMusicaArtista (DAO):', error)
        return false
    }
}

const updateMusicaArtista = async function (musica_artista) {
    try {
        let sql = `UPDATE tbl_musica_artista SET 
                        id_musica  = '${musica_artista.id_musica}',
                        id_artista = '${musica_artista.id_artista}'
                   WHERE id = ${musica_artista.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteMusicaArtista = async function (id) {
    try {
        let sql = `DELETE FROM tbl_musica_artista WHERE id = ${id}`

        let resultMusicaArtista = await prisma.$executeRawUnsafe(sql)

        if (resultMusicaArtista)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllMusicaArtista = async function () {
    try {
        let sql = 'SELECT * FROM tbl_musica_artista ORDER BY id DESC'

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdMusicaArtista = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_musica_artista WHERE id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertMusicaArtista,
    updateMusicaArtista,
    deleteMusicaArtista,
    selectAllMusicaArtista,
    selectByIdMusicaArtista
}

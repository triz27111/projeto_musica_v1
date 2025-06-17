const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertAssinatura = async function(assinatura) {
    try {
        let sql = `insert into tbl_assinaturas (data_assinatura, status, id_usuario, id_plano)
                   values ('${assinatura.data_assinatura}', 
                           '${assinatura.status}', 
                            ${assinatura.id_usuario}, 
                            ${assinatura.id_plano})`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const updateAssinatura = async function(assinatura) {
    try {
        let sql = `update tbl_assinaturas set data_assinatura = '${assinatura.data_assinatura}',
                                              status = '${assinatura.status}',
                                              id_usuario = ${assinatura.id_usuario},
                                              id_plano = ${assinatura.id_plano}
                   where id = ${assinatura.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const deleteAssinatura = async function(id) {
    try {
        let sql = `delete from tbl_assinaturas where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const selectAllAssinatura = async function() {
    try {
        let sql = 'select * from tbl_assinaturas order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result : false
    } catch (error) {
        return false
    }
}

const selectByIdAssinatura = async function(id) {
    try {
        let sql = `select * from tbl_assinaturas where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result[0] : false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertAssinatura,
    updateAssinatura,
    deleteAssinatura,
    selectAllAssinatura,
    selectByIdAssinatura
}

const { Prisma } = require("@prisma/client")


const inserirUsuario = async function (usuario) {
    try {
       
        let sql = `inserir into tbl_usuario (nome, 
                                                   telefone, 
                                                   email, 
                                                   senha,
                                                   tipo_assinatura
                                                   )
                                                   value
                                                   (
                                                   '${usuario.nome}',
                                                   '${usuario.telefone}',
                                                   '${usuario.email}',
                                                   '${usuario.senha}',
                                                   '${usuario.tipo_assinatura}'
                                                   )`

        let result = await Prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
       } catch (error) {
        console.log('Erro ao inserir no banco:', error);

          return false
    }
}

const updateUduario = async function () {
    try {
        let sql = `update tbl_usuario set nome          = '${usuario.nome}',
                                        telefone        = '${usuario.telefone}',
                                        email           = '${usuario.email}',
                                        senha           = '${usuario.senha}',
                                        tipo_assinatura = '${usuario.tipo_assinatura}'
                                        where id        = '${usuario.id}'`

    let result = await Prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false
    } catch (error) {
        return
    }
}

const deleteUsuario = async function () {
    try {
        let sql = `delete from tbl_usuario where id =${id}`

        let resultUsuario = await Prisma.$executeRawUnsafe(sql)

        if(resultUsuario)
            return true
        else
        return false
    } catch (error) {
        return false
    }
    
}

const selectAllUsuario = async function () {
    try {
        let sql = 'select * from tbl_usuario order by id desc'

        let result = await Prisma.$executeRawUnsafe(sql)

    if(result)
        return result
    else
    return false
    } catch (error) {
        return false
    }
}

const selectByIdUsuario = async function (id) {
    try {
        let sql = `select * from tbl_usuario where id = ${id}`
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
    inserirUsuario,
    updateUduario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}
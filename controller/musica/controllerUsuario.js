const inserirUsuario = async function (usuario, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (usuario.nome             == '' || usuario.nome             == null || usuario.nome             == undefined || usuario.nome.length > 100 ||
                usuario.telefone         == '' || usuario.telefone         == null || usuario.telefone         == undefined || usuario.telefone.length > 20 ||
                usuario.email            == '' || usuario.email            == null || usuario.email            == undefined || usuario.email.length > 150 ||
                usuario.senha            == '' || usuario.senha            == null || usuario.senha            == undefined || usuario.senha.length > 100 ||
                usuario.tipo_assinatura  == '' || usuario.tipo_assinatura  == null || usuario.tipo_assinatura  == undefined || usuario.tipo_assinatura.length > 50
            ) {
                return message.ERROR_REQUIRE_FIELDS; // 400
            } else {
                let resultUsuario = await usuarioDAO.insertUsuario(usuario);

                if (resultUsuario) {
                    return message.SUCESSO_CREATED_ITEM; // 201
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL; // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

const atualizarUsuario = async function (id, usuario, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (usuario.nome             == '' || usuario.nome             == null || usuario.nome             == undefined || usuario.nome.length > 100 ||
                usuario.telefone         == '' || usuario.telefone         == null || usuario.telefone         == undefined || usuario.telefone.length > 20 ||
                usuario.email            == '' || usuario.email            == null || usuario.email            == undefined || usuario.email.length > 150 ||
                usuario.senha            == '' || usuario.senha            == null || usuario.senha            == undefined || usuario.senha.length > 100 ||
                usuario.tipo_assinatura  == '' || usuario.tipo_assinatura  == null || usuario.tipo_assinatura  == undefined || usuario.tipo_assinatura.length > 50 ||
                id == '' || id == undefined || id == null || isNaN(id)
            ) {
                return message.ERROR_REQUIRE_FIELDS; // 400
            } else {
                let result = await usuarioDAO.selectByIdUsuario(id);

                if (result != false && typeof (result) == 'object') {
                    if (result.length > 0) {
                        usuario.id = id;
                        let resultUsuario = await usuarioDAO.updateUsuario(usuario);
                        if (resultUsuario) {
                            return message.SUCESSO_UPDATED_ITEM;
                        } else {
                            return message.ERROR_NOT_FOUND; // 404
                        }
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

const excluirUsuario = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRE_FIELDS; // 400
        } else {
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id);

            if (resultUsuario != false && typeof (resultUsuario) == 'object') {
                if (resultUsuario.length > 0) {
                    let result = await usuarioDAO.deleteUsuario(id);
                    if (result)
                        return message.SUCESSO_DELETED_ITEM;
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL; // 500
                } else {
                    return message.ERROR_NOT_FOUND; // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL; // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

const listarUsuario = async function () {
    try {
        let dadosUsuario = {};
        let resultUsuario = await usuarioDAO.selectAllUsuario();

        if (resultUsuario != false && typeof (resultUsuario) == 'object') {
            if (resultUsuario.length > 0) {
                dadosUsuario.status = true;
                dadosUsuario.status_code = 200;
                dadosUsuario.items = resultUsuario.length;
                dadosUsuario.usuarios = resultUsuario;

                return dadosUsuario;
            } else {
                return message.ERROR_NOT_FOUND; // 404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL; // 500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

const buscarUsuario = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRE_FIELDS; // 400
        } else {
            let dadosUsuario = {};
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id);

            if (resultUsuario != false && typeof (resultUsuario) == 'object') {
                if (resultUsuario.length > 0) {
                    dadosUsuario.status = true;
                    dadosUsuario.status_code = 200;
                    dadosUsuario.usuarios = resultUsuario;
                    return dadosUsuario;
                } else {
                    return message.ERROR_NOT_FOUND; // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL; // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

module.exports = {
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
};

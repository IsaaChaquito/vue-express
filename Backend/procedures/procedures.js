const PROCEDURES = () => {

    const USER = {
        CREATE: "sp_user_insert",
        GET: "sp_user_getAll",
        GET_BY_ID: "sp_user_get_by_id"
    }

    return {USER}
}

module.exports = PROCEDURES
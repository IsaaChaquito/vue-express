const PROCEDURES = () => {

    const USER = {
        CREATE: "sp_person_insert",
        GET: "sp_person_getAll",
        GET_BY_ID: "sp_person_get_by_id"
    }

    return {USER}
}

module.exports = PROCEDURES
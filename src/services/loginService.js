import database from '../repository/mySQL.js'

async function emailUser(id_user){
    const sql = ""
}

async function passwordUser(email){
    const bankPassword = "select senha from tbl_usuario where email = ?"

    const conn = await database.connect();
    await conn.query(password, email);
    conn.end();
    return bankPassword;
}
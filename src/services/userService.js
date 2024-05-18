import database from '../repository/mySQL.js'

async function createUser(email, name, password, user_type){ //Async pois o await é usado
    const userInsert = "INSERT INTO tbl_usuario(email, nome, senha, tipo_usuario) VALUES (?,?,?,?)" //é declarado como interrogação pois não sabemos os dados (Ainda virão do front)

    const dataUser = [email, name, password, user_type] //Vetor para guardar os dados

    const conn = await database.connect(); //com parenteses pois connect é uma função, await pois é um comando pesado que precisa ser asíncrono
    await conn.query(userInsert, dataUser); //Padrão de envio de dados, o primeiro é o comando, o segundo é os valores
    conn.end() //Fecha a conexão
}

async function listUser(){ 
    const sqlSelect = "select * from tbl_usuario where deletado = 0" //Não precisa de interrogação pois é um select(?)

    const conn = await database.connect(); 
    const [rows] = await conn.query(sqlSelect); //rows é um nome proprio para trazer esses dados de forma organizada
    conn.end() //Fecha a conexão

    return rows; //Faz com que o resultado ao chamar a função seja a constante rows
}

async function listDeletedUser(){ 
    const sqlSelect = "select * from tbl_usuario where deletado = 1" //Não precisa de interrogação pois é um select(?)

    const conn = await database.connect(); 
    const [rows] = await conn.query(sqlSelect); //rows é um nome proprio para trazer esses dados de forma organizada
    conn.end() //Fecha a conexão

    return rows; //Faz com que o resultado ao chamar a função seja a constante rows
}

async function updateUser(email, name, password, user_type, id_usuario){
    const sqlUpdate = "update tbl_usuario set email = ?, nome = ?, senha = ?, tipo_usuario = ? where id_usuario = ?"

    const dataUser = [email, name, password, user_type, id_usuario];

    const conn = await database.connect()
    await conn.query(sqlUpdate, dataUser)
    conn.end()
}

//Esse é um delete lógico apenas
async function softDeleteUser(userId){
    const softDelete = "update tbl_usuario set deletado = true where id_usuario = ?"

    const conn = await database.connect()
    await conn.query(softDelete, userId)
    conn.end()
}

//Esse é o delete físico
async function hardDeleteUser(userId){
    const hardDelete = "delete from tbl_usuario where id_usuario = ?"

    const conn = await database.connect();
    await conn.query(hardDelete, userId);
    conn.end();
}

async function listSpecificUser(userId){
    const sql = "select * from tbl_usuario where id_usuario = ? and deletado = false" 

    const conn = await database.connect(); 
    const [rows] = await conn.query(sql, userId); //rows é um nome proprio para trazer esses dados de forma organizada
    conn.end() //Fecha a conexão

    return rows; 
}
export default {createUser, listUser, listDeletedUser, updateUser, softDeleteUser, hardDeleteUser, listSpecificUser} //Exportado com virgulas pois são vários elementos

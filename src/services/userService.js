import database from '../repository/mySQL.js'

async function createUser(email, name, password, user_type){ //Async pois o await é usado
    const userInsert = "INSERT INTO tbl_usuario(email, nome, senha, tipo_usuario) VALUES (?,?,?,?)" //é declarado como interrogação pois não sabemos os dados (Ainda virão do front)

    const dataUser = [email, name, password, user_type] //Vetor para guardar os dados

    const conn = await database.connect(); //com parenteses pois connect é uma função, await pois é um comando pesado que precisa ser asíncrono
    await conn.query(userInsert, dataUser); //Padrão de envio de dados, o primeiro é o comando, o segundo é os valores
    conn.end() //Fecha a conexão
}

async function listUser(){ 
    const sqlSelect = "select * from tbl_usuario" //Não precisa de interrogação pois é um select(?)

    const conn = await database.connect(); 
    const [rows] = await conn.query(sqlSelect); //rows é um nome proprio para trazer esses dados de forma organizada
    conn.end() //Fecha a conexão

    return rows; //Faz com que o resultado ao chamar a função seja a constante rows
}

async function updateUser(email, name, password, user_type, id_usuario){
    const sqlUpdate = "update tbl_usuario set email = ?, nome = ?, senha = ?, tipo_usuario = ? where id_usuario = ?"

    const dataUser = [email, name, password, user_type, id_usuario]

    const conn = await database.connect()
    await conn.query(sqlUpdate, dataUser)
    conn.end()
}

export default {createUser, listUser, updateUser} //Exportado com virgulas pois são vários elementos
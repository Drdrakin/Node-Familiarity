import database from '../repository/mySQL.js'

async function createUser(email, name, password, user_type){ //Async pois o await é usado
    const userInsert = "INSERT INTO tbl_usuario(nome, email, senha, tipo_usuario) VALUES (?,?,?,?)" //é declarado como interrogação pois não sabemos os dados (Ainda virão do front)

    const dataUser = [email, name, password, user_type] //Vetor para guardar os dados

    const conn = await database.connect(); //com parenteses pois connect é uma função, await pois é um comando pesado que precisa ser asíncrono
    await conn.query(userInsert, dataUser); //Padrão de envio de dados, o primeiro é o comando, o segundo é os valores
    conn.end() //Fecha a conexão
}

export default {createUser} //Exportado com chaves pois é uma função
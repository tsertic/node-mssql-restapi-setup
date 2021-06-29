if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}
const config= {
    user:process.env.SQL_USER,
    password:process.env.SQL_PASSWORD,
    server:process.env.SQL_SERVER,
    database:process.env.SQL_DB_NAME,
    options:{
        trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
        instancename:'MSSQLSERVER15'
    },
    port:parseInt(process.env.SQL_PORT)
}

module.exports = config
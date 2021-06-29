const config=require('./dbconfig'),
         sql=require('mssql')


const getPersons=async ()=>{
    try {
        let pool=await sql.connect(config)
        let persons=await pool.request().query("SELECT * from afm.persons") 
         return persons.recordsets;
       
    } catch (error) {   
        console.error(error)
    }
}

module.exports={
    getPersons: getPersons
}
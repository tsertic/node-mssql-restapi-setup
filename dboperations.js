const config=require('./dbconfig'),
         sql=require('mssql')


const getPersons=async ()=>{
    try {
        let pool=await sql.connect(config)
        let persons=await pool.request().query("SELECT LastName from afm.persons") 
        console.log(persons.recordsets[0])
         return persons.recordsets[0];
       
    } catch (error) {   
        console.error(error)
    }
}
const getPersonById=async (id)=>{
    try {
        let pool=await sql.connect(config);
        let product=await pool.request().input('input_parameter',sql.Int,id).query('SELECT * from afm.persons where PersonId = @input_parameter')
        return product.recordsets[0]
    } catch (error) {
        console.error(error)
    }
}
module.exports={
    getPersons: getPersons,
    getPersonById: getPersonById
}
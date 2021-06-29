const dboperations = require('./dboperations')
const Db=require ('./dboperations'),
    Persons=require('./persons')


dboperations.getPersons().then(result=>{
    console.log(result)
})
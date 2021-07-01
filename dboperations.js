const config = require("./dbconfig"),
  sql = require("mssql");

const getPersons = async () => {
  try {
    let pool = await sql.connect(config);
    let persons = await pool
      .request()
      .query("SELECT LastName from afm.persons");
    console.log(persons.recordsets[0]);
    return persons.recordsets[0];
  } catch (error) {
    console.error(error);
  }
};
const getPersonById = async (id) => {
  try {
    let pool = await sql.connect(config);
    let product = await pool
      .request()
      .input("input_parameter", sql.Int, id)
      .query("SELECT * from afm.persons where PersonId = @input_parameter");
    return product.recordsets[0];
  } catch (error) {
    console.error(error);
  }
};
/* Using store procedure  */
/* 
    store procedure created in mssql


    create PROCEDURE [afm].[InsertPersons]
@PersonID Int, 
@FirstName varchar(255), 
@LastName varchar(255) 
AS
BEGIN
INSERT INTO afm.persons (PersonID, FirstName,LastName) VALUES 
                (@PersonID, @FirstName, @LastName)
END


*/
const addPersonStoreP = async (person) => {
  try {
    const pool = await sql.connect(config);
    const insertPerson = await pool
      .request()
      .input("PersonID", sql.Int, person.PersonID)
      .input("FirstName", sql.NVarChar, person.FirstName)
      .input("LastName", sql.NVarChar, person.LastName)
      .execute("afm.InsertPersons");

    /* Returns status, idealy woudl be insertPerson.recordsets but it returns empty array ,sometnihg must be added to store procedure to return inserted data */
    return insertPerson;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getPersons: getPersons,
  getPersonById: getPersonById,
  addPersonStoreP: addPersonStoreP,
};

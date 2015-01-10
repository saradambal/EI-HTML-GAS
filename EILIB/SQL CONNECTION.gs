var TimeZone=Session.getScriptTimeZone();
var UserStamp=Session.getActiveUser().getEmail();
var DB_INSTANCE="instance",
    DB_SCHEMA=getSchemaName(),
    DB_USER="test",
    DB_PASSWORD="test";
//GET INSTANCE ,SCHEMA,USER NAME N PASSWORD
function db_Connect(){
  var stringcon = DB_INSTANCE + "/" + DB_SCHEMA;
  var connection=[stringcon,DB_USER, DB_PASSWORD];
  return connection;
}
//GET SQL CONNECTION
function db_GetConnection() {
  return Jdbc.getCloudSqlConnection("jdbc:google:rdbms://" + DB_INSTANCE + "/" + DB_SCHEMA, DB_USER, DB_PASSWORD);
  
}


function getSchemaName()
{
  return "PRODUCTION";
}

function getInstanceName()
{
  return DB_INSTANCE;
}


var UATschema="UAT";
//GET UAT SQL CONNECTION
function db_GetUATConnection() {
 
  return Jdbc.getCloudSqlConnection("jdbc:google:rdbms://" + DB_INSTANCE + "/" + UATschema, DB_USER, DB_PASSWORD);
}



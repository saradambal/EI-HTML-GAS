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
function getUserNamePassword()
{
 var userpw="";
 var conn=Jdbc.getCloudSqlConnection("jdbc:google:rdbms://" + DB_INSTANCE + "/" + DB_SCHEMA, DB_USER, DB_PASSWORD),creatStatement = conn.createStatement();
 var usernamepassquery="SELECT RC_NAME FROM  ROLE_CREATION RC,USER_LOGIN_DETAILS ULD,USER_ACCESS UA,USER_RIGHTS_CONFIGURATION URC WHERE  ULD.ULD_ID=UA.ULD_ID AND RC.RC_ID=UA.RC_ID AND RC.URC_ID=URC.URC_ID AND ULD.ULD_LOGINID='"+UserStamp+"' ORDER BY URC_DATA ASC"
 var usernamepassrs = creatStatement.executeQuery(usernamepassquery);
 while(usernamepassrs.next())
 {
   var username=usernamepassrs.getString(1);
   var pw=usernamepassrs.getString(1);
   userpw ={"username":username,"password":pw};
 }
 usernamepassrs.close(); creatStatement.close(); conn.close();
 return userpw;
}
function db_GetConnection() {
  var unamepw=getUserNamePassword();
  if(unamepw!="")
  {
    DB_USER1=unamepw.username;
    DB_PASSWORD1=unamepw.password;
    return Jdbc.getCloudSqlConnection("jdbc:google:rdbms://" + DB_INSTANCE + "/" + DB_SCHEMA, DB_USER1, DB_PASSWORD1);
  }
  else
  {
    return Jdbc.getCloudSqlConnection("jdbc:google:rdbms://" + DB_INSTANCE + "/" + DB_SCHEMA, DB_USER, DB_PASSWORD);
  }
}





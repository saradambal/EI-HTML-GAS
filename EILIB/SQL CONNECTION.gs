//CHANGED CONNECTION STRING TO IMPLEMENT NEW CONNECTION STRING WITH IP ON 04/03/2015 BY PUNI
//CHANGED CONNECTION STRING TO IMPLEMENT PF ON 18/12/2014 BY PUNI
var TimeZone=Session.getTimeZone();
var UserStamp=Session.getActiveUser().getEmail();
    DB_SCHEMA=getSchemaName(),
    DB_USER="",
    DB_PASSWORD="";
    DB_SCHEMA1=getSchemaName(),
    DB_USER1="",
    DB_PASSWORD1="";
var UATschema=getSchemaName();
var DB_INSTANCE = 'IP';
var instanceUrl = 'jdbc:mysql://' + DB_INSTANCE;
var dbUrl = instanceUrl + '/' + DB_SCHEMA;
//GET UAT SQL CONNECTION
function db_GetUATConnection() { 
  var dbUrl = instanceUrl + '/' + UATschema;
   var unamepw=getUserNamePassword();
  if(unamepw!="")
  {
    DB_USER1=unamepw.username;
    DB_PASSWORD1=unamepw.password;
    return Jdbc.getConnection(dbUrl, DB_USER1, DB_PASSWORD1)
  }
  else
  {
    return Jdbc.getConnection(dbUrl, DB_USER, DB_PASSWORD);
  }
}
//GET INSTANCE ,SCHEMA,USER NAME N PASSWORD
function db_Connect(){
  var stringcon = DB_INSTANCE + "/" + DB_SCHEMA;
  var connection=[stringcon,DB_USER, DB_PASSWORD];
  return connection;
}
function getSchemaName()
{
  return "EI_PF";
}
function getInstanceName()
{
  return DB_INSTANCE;
}
function getUserNamePassword()
{
 var userpw="";
 var conn=Jdbc.getConnection(dbUrl, DB_USER, DB_PASSWORD),creatStatement = conn.createStatement();
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
    return Jdbc.getConnection(dbUrl, DB_USER1, DB_PASSWORD1)
  }
  else
  {
    return Jdbc.getConnection(dbUrl, DB_USER, DB_PASSWORD);
  }
}


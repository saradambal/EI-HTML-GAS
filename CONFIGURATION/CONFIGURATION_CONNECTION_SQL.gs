////*****************************************************GLOBAL DECLARATION*********************************//
//var Connparam   = eilib.db_Connect();
//Jdbc.getCloudSqlConnection("jdbc:google:rdbms://"+Connparam[0],Connparam[1],Connparam[2]); 
var timeZoneFormat=eilib.getTimezone();
var UserStamp = Session.getActiveUser().getEmail();
var TimeZone=Session.getTimeZone();

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).setSandboxMode(HtmlService.SandboxMode.NATIVE)
  .getContent();
}
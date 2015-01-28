//*******************************************FILE DESCRIPTION*********************************************//
//****************************************USER SEARCH DETAILS*********************************************//
//DONE BY:PUNI
//VER 1.1-SD:03/10/2014 ED:03/10/2014,TRACKER NO:683,1.changed html script to hide preloader after menu loads,2.changed messagebx position
//DONE BY:SARADAMBAL
//VER 1.0-SD:22/08/2014 ED:22/08/2014,TRACKER NO:683,updated new links
//DONE BY:LALITHA
//VER 0.09-SD:14/06/2014 ED:14/06/2014,TRACKER NO:683,Changed failure funct
//VER 0.08-SD:06/06/2014 ED:06/06/2014,Changed jquery link 
//VER 0.07-SD:27/05/2014 ED:27/05/2014,Increased flex tbl height,Removed return functn file,Sorted by login id
//VER 0.06-SD:11/03/2014 ED:11/03/2014,removed arry fr err msg,included menu
//VER 0.05-SD:04/03/2014 ED:04/03/2014,changed div,userstamp as uldid
//VER 0.04-SD:04/02/2014 ED:04/02/2014,implemented eilib for err msg,nd h3 tag
//VER 0.03-SD:17/01/2014,ED:17/01/2014,updated div for flex table 
//VER 0.02-SD:13/01/2014,ED:14/01/2014,removed doget function,updated the int links
//VER 0.01-INITIAL VERSION, SD:09/12/2013 ED:23/12/2013,TRACKER NO:683
//*********************************************************************************************************//
try
{
  //FUNCTION FOR ERROR MESSAGE FROM SQL TABLE
  function USD_SRC_get_err()
  {
    var USD_SRC_conn=eilib.db_GetConnection();
    var USD_SRC_errmsgids="355";
    var USD_SRC_errorMsg=eilib.GetErrorMessageList(USD_SRC_conn,USD_SRC_errmsgids);
    return USD_SRC_errorMsg.errormsg;
    USD_SRC_conn.close();
  }
  // FUNCTION FOR SHOW THE DATA IN TABLE
  function USD_SRC_flextable_getdatas()
  {
    var USD_SRC_connection=eilib.db_GetConnection();
    var USD_SRC_user_list=[];
    var USD_SRC_flextable_query="SELECT UA.UA_ID,ULD.ULD_LOGINID,RC.RC_NAME,UA.UA_REC_VER,UA.UA_REASON,UA.UA_USERSTAMP,DATE_FORMAT(UA.UA_JOIN_DATE,'%d-%m-%Y') AS UA_JOIN_DATE,DATE_FORMAT(UA.UA_END_DATE,'%d-%m-%Y') AS UA_END_DATE,DATE_FORMAT(CONVERT_TZ(UA.UA_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM USER_LOGIN_DETAILS ULD,ROLE_CREATION RC,USER_ACCESS UA,USER_RIGHTS_CONFIGURATION URC WHERE URC.URC_ID=RC.URC_ID AND ULD.ULD_ID=UA.ULD_ID AND UA.RC_ID=RC.RC_ID ORDER BY ULD.ULD_LOGINID";
    var USD_SRC_stmt_flex=USD_SRC_connection.createStatement();
    var USD_SRC_flex_rs=USD_SRC_stmt_flex.executeQuery(USD_SRC_flextable_query);
    while(USD_SRC_flex_rs.next())
    {
      var USD_SRC_uaid=USD_SRC_flex_rs.getString("UA_ID");
      var USD_SRC_loginid=USD_SRC_flex_rs.getString("ULD_LOGINID");
      var USD_SRC_rcid=USD_SRC_flex_rs.getString("RC_NAME");
      var USD_SRC_recver=USD_SRC_flex_rs.getString("UA_REC_VER");
      var USD_SRC_joindate = USD_SRC_flex_rs.getString("UA_JOIN_DATE");
      var USD_SRC_enddate=USD_SRC_flex_rs.getString("UA_END_DATE");
      if((USD_SRC_enddate=='null')||(USD_SRC_enddate==undefined))
      {
        USD_SRC_enddate='';
      }
      var USD_SRC_reason=USD_SRC_flex_rs.getString("UA_REASON");
      if((USD_SRC_reason=='null')||(USD_SRC_reason==undefined))
      {
        USD_SRC_reason='';
      }
      var USD_SRC_userstamp=USD_SRC_flex_rs.getString("UA_USERSTAMP");
      var USD_SRC_timestamp=USD_SRC_flex_rs.getString("TIMESTAMP");
      var USD_SRC_userlist={'uaid':USD_SRC_uaid,'loginid':USD_SRC_loginid,'rcid':USD_SRC_rcid,'recordver':USD_SRC_recver,'joindate':USD_SRC_joindate,'terminationdate':USD_SRC_enddate,'reasonoftermination':USD_SRC_reason,'userstamp':USD_SRC_userstamp,'timestamp':USD_SRC_timestamp}
      USD_SRC_user_list.push(USD_SRC_userlist)
    }
    USD_SRC_flex_rs.close();
    USD_SRC_stmt_flex.close();
    USD_SRC_connection.close();  
    return USD_SRC_user_list;
  }
}
catch(err)
{
}  
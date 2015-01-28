//*******************************************FILE DESCRIPTION*********************************************//
//****************************************DOOR CODE:SEARCH/UPDATE***********************************************//
//<!--DONE BY:PUNI
//VER 1.8-SD:06/10/2014 ED:06/10/2014,TRACKER NO:726,Changed some preloader n msgbox position
//DONE BY:SARADAMBAL
//VER 1.7 -SD:13/09/2014 ED:13/09/2014,TRACKER NO:726,implemented script for preloader,msgbox
//VER 1.6-SD:14/08/2014 ED:14/08/2014, TRACKER NO:726,updated new links,checked sp after updation of rollback
//VER 1.5 -SD:11/07/2014 ED:11/07/2014,TRACKER NO:726,checked sp through form,rename id for doorcode and login (same id for creation to get eilib func)
//VER 1.4 -SD:30/06/2014 ED:30/06/2014,TRACKER NO:726,updated already exists for doorcode,weblogin,implemented script for update button validation
//VER 1.3 -SD:13/06/2014 ED:13/06/2014,TRACKER NO:726,updated failure function
//VER 1.2 -SD:06/06/2014 ED:06/06/2014,TRACKER NO:726,updated new link
//VER 1.1-SD:19/05/2014 ED:19/05/2014,TRACKER NO:726,implemented * for doorcode srch,gave integration link
//VER 1.0-SD:09/04/2014 ED:09/04/2014,TRACKER NO:726,changed title as DOOR CODE:SEARCH/UPDATE
//VER 0.09-SD:03/03/2014 ED:03/03/2014,TRACKER NO:726,checked sp for using uldid instead of userstamp
//VER 0.08-SD:14/02/2014 ED:14/02/2014,updated sp for returning flag whether the data updated or not,implemented error msg for that one,updated validation as per migration(login and password can make as null)
//VER 0.07-SD:04/12/2013 ED:05/12/2013,changed error msg for updation,implement readonly for empty field in login details,field not make as null,implement eilib for errormsg and special character 
//VER 0.06-SD:28/12/2013 ED:30/12/2013,changed form alignment tag & userstamp syntax
//VER 0.05-SD:25/11/2013 ED:25/11/2013,updated eilib for active unit,implemented err msg for not having active unit,updated failure function
//VER 0.04-SD:07/11/2013 ED:14/11/2013,remove radio for flex table,changes in doorcode,weblogin & password length,updated errormsg
//VER 0.03-SD:07/10/2013 ED:07/10/2013,implement return function,change head tag links
//VER 0.02-SD:30/09/2013 ED:30/09/2013,updated eilib connection,message box,preloader,removed scriplet,convert blur function for all change function
//VER 0.01-INITIAL VERSION,TRACKER NO:246,SD:02/09/2013,ED:03/09/2013
//*********************************************************************************************************//
try
{
  /*-----------------------------------------FUNCTION FOR FETCHING ERROR MESSAGE,UNIT NO FROM SQL TABLE----------------------------------------------*/
  function USRC_UPDCODE_getunitno_err()
  {
    var USRC_UPDCODE_conn =eilib.db_GetConnection();
    var USRC_UPDCODE_errorid='2,18,22,324,396,401,463,464,466,467';
    var USRC_UPDCODE_errorarray =  eilib.GetErrorMessageList(USRC_UPDCODE_conn,USRC_UPDCODE_errorid);
    var USRC_UPDCODE_unitnoarr=eilib.GetActiveUnit(USRC_UPDCODE_conn);
    var USRC_UPDCODE_result={"USRC_UPDCODE_errorarray":USRC_UPDCODE_errorarray.errormsg,"USRC_UPDCODE_unitno":USRC_UPDCODE_unitnoarr};      
    USRC_UPDCODE_conn.close();
    return USRC_UPDCODE_result;
  }     
  /*-----------------------------------------FUNCTION TO GET DOOR CODE FROM LOGIN_DETAILS TABLE----------------------------------*/
  function USRC_UPDCODE_logindetails(USRC_UPDCODE_unitnumber,USRC_UPDCODE_flag){
    var USRC_UPDCODE_conn =eilib.db_GetConnection();
    var USRC_UPDCODE_stmt_unit = USRC_UPDCODE_conn.createStatement();
    var USRC_UPDCODE_unitno_select="SELECT * FROM UNIT WHERE UNIT_NO="+USRC_UPDCODE_unitnumber+"";
    var USRC_UPDCODE_unitno_rs=USRC_UPDCODE_stmt_unit.executeQuery(USRC_UPDCODE_unitno_select);
    while(USRC_UPDCODE_unitno_rs.next())
    {
      var USRC_UPDCODE_unitno=USRC_UPDCODE_unitno_rs.getString(1);
    }
    USRC_UPDCODE_unitno_rs.close();USRC_UPDCODE_stmt_unit.close();
    var USRC_UPDCODE_login_select="SELECT ULDTL.ULDTL_ID,ULDTL.ULDTL_DOORCODE,ULDTL.ULDTL_WEBLOGIN,ULDTL.ULDTL_WEBPWD,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ULDTL.ULDTL_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM UNIT_LOGIN_DETAILS ULDTL,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ULDTL.ULD_ID AND UNIT_ID="+USRC_UPDCODE_unitno+"";
    var USRC_UPDCODE_stmt = USRC_UPDCODE_conn.createStatement();
    var USRC_UPDCODE_login_rs=USRC_UPDCODE_stmt.executeQuery(USRC_UPDCODE_login_select);
    var USRC_UPDCODE_array_login='';
    while(USRC_UPDCODE_login_rs.next()){
      var USRC_UPDCODE_id = USRC_UPDCODE_login_rs.getString("ULDTL_ID");
      var USRC_UPDCODE_doorcode = USRC_UPDCODE_login_rs.getString("ULDTL_DOORCODE");
      var USRC_UPDCODE_weblogin = USRC_UPDCODE_login_rs.getString("ULDTL_WEBLOGIN");
      var USRC_UPDCODE_webpass = USRC_UPDCODE_login_rs.getString("ULDTL_WEBPWD");
      var USRC_UPDCODE_userstamp = USRC_UPDCODE_login_rs.getString("ULD_LOGINID");
      var USRC_UPDCODE_timestamp = USRC_UPDCODE_login_rs.getString("TIMESTAMP");
      if(USRC_UPDCODE_doorcode==null)
        USRC_UPDCODE_doorcode='';
      if(USRC_UPDCODE_weblogin==null)
        USRC_UPDCODE_weblogin='';
      if(USRC_UPDCODE_webpass==null)
        USRC_UPDCODE_webpass='';
    }
    USRC_UPDCODE_array_login={"USRC_UPDCODE_id":USRC_UPDCODE_id,"USRC_UPDCODE_doorcode":USRC_UPDCODE_doorcode,"USRC_UPDCODE_weblog":USRC_UPDCODE_weblogin,"USRC_UPDCODE_webpass":USRC_UPDCODE_webpass,"USRC_UPDCODE_user":USRC_UPDCODE_userstamp,"USRC_UPDCODE_time":USRC_UPDCODE_timestamp,"USRC_UPDCODE_flg":USRC_UPDCODE_flag} 
    USRC_UPDCODE_login_rs.close(); USRC_UPDCODE_stmt.close();
    USRC_UPDCODE_conn.close();
    return USRC_UPDCODE_array_login;
  }
  /*--------------------------------------------FUNCTION FOR UPDATE DOORCODE,WEBLOGIN AND WEBPASSWORD---------------------------------*/
  function USRC_UPDCODE_updateDoorcode(USRC_UPDCODE_login_id,USRC_UPDCODE_unitnumber,USRC_UPDCODE_doorcode,USRC_UPDCODE_weblogin,USRC_UPDCODE_webpass)
  {
    var USRC_UPDCODE_conn =eilib.db_GetConnection();
    var USRC_UPDCODE_stmt = USRC_UPDCODE_conn.createStatement();
    if(USRC_UPDCODE_weblogin!='')
      USRC_UPDCODE_weblogin=eilib.ConvertSpclCharString(USRC_UPDCODE_weblogin)
      var USRC_UPDCODE_creatstmtLogin ="CALL SP_UNIT_LOGIN_DOORCODE_UPDATE("+USRC_UPDCODE_unitnumber+",'"+USRC_UPDCODE_doorcode+"','"+USRC_UPDCODE_weblogin+"','"+USRC_UPDCODE_webpass+"','"+UserStamp+"',@FLAG)";
    USRC_UPDCODE_stmt.execute(USRC_UPDCODE_creatstmtLogin);
    USRC_UPDCODE_stmt.close();
    var USRC_UPDCODE_stmt_flag = USRC_UPDCODE_conn.createStatement();
    var USRC_UPDCODE_flag_rs=USRC_UPDCODE_stmt_flag.executeQuery("SELECT @FLAG");
    while(USRC_UPDCODE_flag_rs.next())
      var USRC_UPDCODE_flag= USRC_UPDCODE_flag_rs.getString("@FLAG");
    USRC_UPDCODE_flag_rs.close(); USRC_UPDCODE_stmt_flag.close();
    var USRC_UPDCODE_refresh=USRC_UPDCODE_logindetails(USRC_UPDCODE_unitnumber,USRC_UPDCODE_flag)
    USRC_UPDCODE_conn.close();
    return USRC_UPDCODE_refresh;    
  }
  /*-----------------------------------------FUNCTION FOR FETCHING ERROR MESSAGE,UNIT NO FROM SQL TABLE----------------------------------------------*/
  function USRC_UPDCODE_ExistsDoorcode(USRC_UPDCODE_doorcode,USRC_UPDCODE_flag_doorCodeLogin)
  {
    var USRC_UPDCODE_conn =eilib.db_GetConnection();
    var USRC_UPDCODE_arr=  eilib.Check_ExistsDoorcodeLogin(USRC_UPDCODE_conn, USRC_UPDCODE_doorcode, USRC_UPDCODE_flag_doorCodeLogin)
    USRC_UPDCODE_conn.close();
    return USRC_UPDCODE_arr;
  }
}
catch(err)
{
}
//****************************************************FILE DESCRIPTION*************************************//
//*************************************EMAIL PROFILE ENTRY****************************************************//
//DONE BY:LALITHA
//VER 1.5-SD:09/06/2014 ED:12/06/2014,TRACKER NO:703,Updated commit funct,Changed failure funct,Converted the emailid to lowercase for valid emailid only,Changed btn name(submit to save)
//VER 1.4-SD:06/06/2014 ED:06/06/2014,Changed jquery link in html file
//VER 1.3-SD:28/05/2014 ED:28/05/2014,Updated preloader for already exit functn,Updated after reset button hide the email id lbl,txt bx nd buttons(save,reset)
//VER 1.2-SD:09/04/2014 ED:09/04/2014,added preloader in beginning form loading,before return functn closed stmt,rs,conn,put parse int for checking condition
//VER 1.1-SD:10/03/2014 ED:10/03/2014,removed repeated queries
//VER 1.0-SD:26/02/2014 ED:01/03/2014,Updated userstamp as uld id
//VER 0.09-SD:13/02/2014 ED:13/02/2014,implemented eilib for err msg,checked whether the data are inserted or not nd update the error msg for not-saved record
//VER 0.08-SD:09/01/2014 ED:10/01/2014,TRACKER NO:703,changed upper case to lower case while the emailid to save 
//VER 0.07-SD:28/12/2013 ED:28/12/2013,removed utilities,doget function,updated title tag,connection,identifier,userstamp
//VER 0.06-SD:22/11/2013 ED:29/11/2013,changed validation,lowercase for emailid
//VER 0.05-SD:22/10/2013 ED:07/11/2013,changed error message,removed listbox underscore,control width
//VER 0.04-SD:07/10/2013 ED:08/10/2013,changed implement return function,head tag links
//VER 0.03-SD:27/09/2013 ED:27/09/2013,updated correct html file
//VER 0.02-SD:24/09/2013 ED:26/09/2013,updated eilib connection,message box,preloader,removed scriplet
//VER 0.01-INITIAL VERSION, SD:31/07/2013 ED:02/09/2013,TRACKER NO:429
//*********************************************************************************************************//
try
{
  //FUNCTION FOR FETCHING EMAIL DOMAIN NAME,ERROR MESSAGE FROM SQL TABLE
  function EP_ENTRY_getdomain_err()
  {
    var EP_ENTRY_conn=eilib.db_GetConnection();
    var EP_ENTRY_profile_stmt=EP_ENTRY_conn.createStatement();
    var EP_ENTRY_profile_array=[];
    var EP_ENTRY_select_profile="SELECT EP_ID,EP_EMAIL_DOMAIN FROM EMAIL_PROFILE WHERE EP_NON_IP_FLAG is null"; 
    var EP_ENTRY_profile_rs=EP_ENTRY_profile_stmt.executeQuery( EP_ENTRY_select_profile);
    while(EP_ENTRY_profile_rs.next())
    {
      var EP_ENTRY_profile_name_id=EP_ENTRY_profile_rs.getString(1);
      var EP_ENTRY_profile_name=EP_ENTRY_profile_rs.getString(2);
      var EP_ENTRY_script_object={"EP_ENTRY_profile_names_id":EP_ENTRY_profile_name_id,"EP_ENTRY_profile_names":EP_ENTRY_profile_name};
      EP_ENTRY_profile_array.push(EP_ENTRY_script_object);    
    }
    EP_ENTRY_profile_rs.close();
    EP_ENTRY_profile_stmt.close();
    //RETRIEVE MESSAGE FOR EMAIL RECORD FROM ERROR TABLE
    var EP_ENTRY_errmsgids="285,36,286,400";
    var EP_ENTRY_errorMsg_array=[];
    EP_ENTRY_errorMsg_array=eilib.GetErrorMessageList(EP_ENTRY_conn,EP_ENTRY_errmsgids);
    var EP_ENTRY_result={"EP_ENTRY_profilenamedataid":EP_ENTRY_profile_array,"EP_ENTRY_errormsg":EP_ENTRY_errorMsg_array.errormsg};      
    EP_ENTRY_conn.close();
    return EP_ENTRY_result;
  }
  //FUNCTION TO CHECK WHETHER THE DATA INSERTED OR NOT
  function EP_ENTRY_getmaxprimaryid()
  {
    var EP_ENTRY_conn=eilib.db_GetConnection();
    var EP_ENTRY_stmt_primaryid=EP_ENTRY_conn.createStatement();
    var EP_ENTRY_select="SELECT MAX(EL_ID) AS PRIMARY_ID FROM EMAIL_LIST";
    var EP_ENTRY_rs_primaryid=EP_ENTRY_stmt_primaryid.executeQuery(EP_ENTRY_select);
    while(EP_ENTRY_rs_primaryid.next())
      var EP_ENTRY_primaryid=EP_ENTRY_rs_primaryid.getString("PRIMARY_ID");
    EP_ENTRY_rs_primaryid.close();
    EP_ENTRY_stmt_primaryid.close();
    EP_ENTRY_conn.close();
    return EP_ENTRY_primaryid;        
  }
  //FUNCTION FOR TO SAVE THE EMAIL ID
  function EP_ENTRY_save(EP_ENTRY_profilenameid,EP_ENTRY_emailid) 
  {
    EP_ENTRY_emailid=EP_ENTRY_emailid.toString().toLowerCase();
    var EP_ENTRY_conn=eilib.db_GetConnection();
    EP_ENTRY_conn.setAutoCommit(false);
    var EP_ENTRY_stmt=EP_ENTRY_conn.createStatement()
    var EP_ENTRY_primaryid_before=EP_ENTRY_getmaxprimaryid()
    var EP_ENTRY_insertemailid="INSERT INTO EMAIL_LIST(EP_ID,EL_EMAIL_ID,ULD_ID)VALUES("+EP_ENTRY_profilenameid+",'"+EP_ENTRY_emailid+"',(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'))"; 
    EP_ENTRY_stmt.execute(EP_ENTRY_insertemailid);
    EP_ENTRY_stmt.close();
    EP_ENTRY_conn.commit();
    EP_ENTRY_conn.close();
    var EP_ENTRY_primaryid_after=EP_ENTRY_getmaxprimaryid()
    if(parseInt(EP_ENTRY_primaryid_before)<parseInt(EP_ENTRY_primaryid_after))
    return true;
    else
      return false;
  }
  //FUNCTION FOR ALREADY EXIST FOR EMAIL ID
  function EP_ENTRY_already(EP_ENTRY_profilename,EP_ENTRY_email_id)
  {
    var EP_ENTRY_conn=eilib.db_GetConnection();
    var EP_ENTRY_stmt=EP_ENTRY_conn.createStatement();
    var EP_ENTRY_alreadyemailid="SELECT * FROM EMAIL_LIST WHERE EL_EMAIL_ID='"+EP_ENTRY_email_id+"' AND EP_ID=(SELECT  EP_ID FROM EMAIL_PROFILE WHERE EP_EMAIL_DOMAIN='"+EP_ENTRY_profilename+"')";
    var EP_ENTRY_rs=EP_ENTRY_stmt.executeQuery(EP_ENTRY_alreadyemailid);
    if(EP_ENTRY_rs.next())
    {
      var EP_ENTRY_chkmail_flag=1;
    }
    else
    {
      EP_ENTRY_chkmail_flag=0;
    }
    EP_ENTRY_rs.close();
    EP_ENTRY_stmt.close();
    EP_ENTRY_conn.close();
    return EP_ENTRY_chkmail_flag;
  }
}
catch(err)
{
}
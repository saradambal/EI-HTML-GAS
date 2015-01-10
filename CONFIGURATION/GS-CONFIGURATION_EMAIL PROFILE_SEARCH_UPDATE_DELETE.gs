//*******************************************FILE DESCRIPTION*********************************************//
//*************************************EMAIL PROFILE SEARCH/UPDATE/DELETE***************************//
//DONE BY:LALITHA
//VER 1.6-SD:09/06/2014 ED:12/06/2014,TRACKER NO:703,Updated commit funct,Changed failure funct,Converted the emailid to lowercase for valid emailid only,If flex tble data nd txt bx data same means hide the err msg nd invalid class,Updated while updating nd deleting data in flex tble means frst load the flex tble nd thn shown err msg,After delete the record reload the email profile listbox
//VER 1.5-SD:06/06/2014 ED:06/06/2014,Changed jquery link in html file
//VER 1.4-SD:28/05/2014 ED:28/05/2014,Updated preloader for already exit functn
//VER 1.3-SD:09/04/2014 ED:09/04/2014,added preloader in beginning form loading,before return functn closed stmt,rs,conn
//VER 1.2-SD:11/03/2014 ED:11/03/2014,removed repeated queries,removed one function
//VER 1.1-SD:26/02/2014 ED:01/03/2014,Updated userstamp as uld id,div tag for flextable,err msg for non-update record
//VER 1.0-SD:17/02/2014 ED:18/02/2014,updated eilib for sp deletion,removed the select query for postapid,included new function while clicking radio button 
//VER 0.09-SD:13/02/2014 ED:13/02/2014,showned emailid as per in db,implemented sp for deletion,removed deletion query,implemented eilib for err msg,update error msg for non-deletion record 
//VER 0.08-SD:09/01/2014 ED:10/01/2014,TRACKER NO:703,updated upper case to lower case while fetching the email id from db and also for save 
//VER 0.07-SD:28/12/2013 ED:28/12/2013,removed utilities,doget function,updated title tag,connection,identifier,userstamp
//VER 0.06-SD:22/11/2013 ED:29/11/2013,changed validation,lowercase for emailid,emailid label,header visible after loader end,loader disapper on cancel confirm msg,corrected the error msg shown,after deleted the record updated the html table,updated failure function
//VER 0.05-SD:22/10/2013 ED:07/11/2013,changed error message,removed listbox underscore,control width,updated script to highlight row,class name for css,tickler delete function
//VER 0.04-SD:07/10/2013 ED:08/10/2013,change implement return function,change head tag links
//VER 0.03-SD:27/09/2013 ED:27/09/2013,updated correct html file
//VER 0.02-SD:24/09/2013 ED:26/09/2013,updated eilib connection,message box,preloader,removed scriplet
//VER 0.01-INITIAL VERSION, SD:31/07/2013 ED:31/8/2013,TRACKER NO:429
//*********************************************************************************************************//
try
{
  //FUNCTION TO FETCHING EMAIL PROFILE,EMAIL LIST TABLE,ERROR MESSAGE FROM SQL TABLE
  function EP_SRC_UPD_DEL_searchoption()
  {
    var EP_SRC_UPD_DEL_conn=eilib.db_GetConnection();
    var EP_SRC_UPD_DEL_email_array=[];
    var EP_SRC_UPD_DEL_emailstmt=EP_SRC_UPD_DEL_conn.createStatement();
    var EP_SRC_UPD_DEL_emaillistprofile="SELECT EP.EP_ID,EP.EP_EMAIL_DOMAIN,EL.EL_ID,EP.EP_NON_IP_FLAG FROM EMAIL_PROFILE EP,EMAIL_LIST EL WHERE EL.EP_ID=EP.EP_ID ORDER BY EP_EMAIL_DOMAIN";
    var EP_SRC_UPD_DEL_emailresult=EP_SRC_UPD_DEL_emailstmt.executeQuery(EP_SRC_UPD_DEL_emaillistprofile);
    while(EP_SRC_UPD_DEL_emailresult.next())
    {
      var EP_SRC_UPD_DEL_profilename_id=EP_SRC_UPD_DEL_emailresult.getString(1);
      var EP_SRC_UPD_DEL_profilename_data=EP_SRC_UPD_DEL_emailresult.getString(2);
      var EP_SRC_UPD_DEL_listname_id=EP_SRC_UPD_DEL_emailresult.getString(3);
      var EP_SRC_UPD_DEL_profilename_flag=EP_SRC_UPD_DEL_emailresult.getString(4);
      var EP_SRC_UPD_DEL_nameid_object={"EP_SRC_UPD_DEL_profilenames_id":EP_SRC_UPD_DEL_profilename_id,"EP_SRC_UPD_DEL_profilenames_data":EP_SRC_UPD_DEL_profilename_data,"EP_SRC_UPD_DEL_listnames_id":EP_SRC_UPD_DEL_listname_id,"EP_SRC_UPD_DEL_profilenames_flag":EP_SRC_UPD_DEL_profilename_flag};
      EP_SRC_UPD_DEL_email_array.push(EP_SRC_UPD_DEL_nameid_object); 
    }
    var EP_SRC_UPD_DEL_errmsgids="170,288,283,284,36,286,282,315,401";  
    var EP_SRC_UPD_DEL_errorMsg_array=[];
    EP_SRC_UPD_DEL_errorMsg_array=eilib.GetErrorMessageList(EP_SRC_UPD_DEL_conn,EP_SRC_UPD_DEL_errmsgids);
    var EP_SRC_UPD_DEL_email_arrayresult={"EP_SRC_UPD_DEL_profilelistdataid":EP_SRC_UPD_DEL_email_array,"EP_SRC_UPD_DEL_errormsg":EP_SRC_UPD_DEL_errorMsg_array.errormsg};      
    EP_SRC_UPD_DEL_emailresult.close();
    EP_SRC_UPD_DEL_emailstmt.close();
    EP_SRC_UPD_DEL_conn.close(); 
    return EP_SRC_UPD_DEL_email_arrayresult;
  }
  //FUNCTION FOR SHOW THE DATA IN TABLE
  function EP_SRC_UPD_DEL_srch(EP_SRC_UPD_DEL_id)
  {
    var EP_SRC_UPD_DEL_conn=eilib.db_GetConnection();
    var EP_SRC_UPD_DEL_email_list=[];
    var EP_SRC_UPD_DEL_emailstmt_array=[];
    var EP_SRC_UPD_DEL_stmt=EP_SRC_UPD_DEL_conn.createStatement();
    var EP_SRC_UPD_DEL_email_list=[];
    var EP_SRC_UPD_DEL_query="SELECT DATE_FORMAT(CONVERT_TZ(EL_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,EL_ID,EL_EMAIL_ID,ULD.ULD_LOGINID,EP_NON_IP_FLAG FROM EMAIL_LIST EL,EMAIL_PROFILE EP ,USER_LOGIN_DETAILS ULD WHERE EL.EP_ID='"+EP_SRC_UPD_DEL_id+"' AND EL.EP_ID=EP.EP_ID AND EL.ULD_ID=ULD.ULD_ID ORDER BY EL.EL_EMAIL_ID";
    var EP_SRC_UPD_DEL_rs=EP_SRC_UPD_DEL_stmt.executeQuery(EP_SRC_UPD_DEL_query);
    while(EP_SRC_UPD_DEL_rs.next())
    {
      var EP_SRC_UPD_DEL_emailid=EP_SRC_UPD_DEL_rs.getString("EL_EMAIL_ID");
      var EP_SRC_UPD_DEL_userstamp=EP_SRC_UPD_DEL_rs.getString("ULD_LOGINID");
      var EP_SRC_UPD_DEL_timestamp=EP_SRC_UPD_DEL_rs.getString("TIMESTAMP");
      var EP_SRC_UPD_DEL_el_id=EP_SRC_UPD_DEL_rs.getString("EL_ID");
      var EP_SRC_UPD_DEL_flag=EP_SRC_UPD_DEL_rs.getString("EP_NON_IP_FLAG");
      var EP_SRC_UPD_DEL_emaillist={'emailno':EP_SRC_UPD_DEL_el_id,'emailid':EP_SRC_UPD_DEL_emailid,'userstamp':EP_SRC_UPD_DEL_userstamp,'timestamp':EP_SRC_UPD_DEL_timestamp,'EP_SRC_UPD_DEL_flag':EP_SRC_UPD_DEL_flag}
      EP_SRC_UPD_DEL_email_list.push(EP_SRC_UPD_DEL_emaillist)
    }
    EP_SRC_UPD_DEL_rs.close();
    EP_SRC_UPD_DEL_stmt.close();
    EP_SRC_UPD_DEL_conn.close();  
    return EP_SRC_UPD_DEL_email_list;
  }
  //UPDATE DATA FOR EMAIL PROFILE TABLE
  function EP_SRC_UPD_DEL_update(EP_SRC_UPD_DEL_profilename,EP_SRC_UPD_DEL_email_dataId,EP_SRC_UPD_DEL_id)
  {
    var EP_SRC_UPD_DEL_delflag=0;
    EP_SRC_UPD_DEL_email_dataId=EP_SRC_UPD_DEL_email_dataId.toString().toLowerCase();
    var EP_SRC_UPD_DEL_conn=eilib.db_GetConnection();
    EP_SRC_UPD_DEL_conn.setAutoCommit(false);
    var EP_SRC_UPD_DEL_updstmt=EP_SRC_UPD_DEL_conn.createStatement();
    var EP_SRC_UPD_DEL_el_id=EP_SRC_UPD_DEL_id;
    var EP_SRC_UPD_DEL_update="UPDATE EMAIL_LIST SET EL_EMAIL_ID='"+EP_SRC_UPD_DEL_email_dataId+"',ULD_ID=(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"') WHERE EL_ID="+EP_SRC_UPD_DEL_el_id+" ";
    EP_SRC_UPD_DEL_updstmt.execute(EP_SRC_UPD_DEL_update);
    EP_SRC_UPD_DEL_delflag=1;
    EP_SRC_UPD_DEL_updstmt.close();
    EP_SRC_UPD_DEL_conn.commit();
    EP_SRC_UPD_DEL_conn.close();
    return EP_SRC_UPD_DEL_delflag;
  }
  //FUNCTION FOR DUPLICATE EMAIL ID
  function EP_SRC_UPD_DEL_already(EP_SRC_UPD_DEL_profilename,EP_SRC_UPD_DEL_emailid)
  {
    var EP_SRC_UPD_DEL_chkemailid="";
    var EP_SRC_UPD_DEL_conn=eilib.db_GetConnection();
    var EP_SRC_UPD_DEL_stmt=EP_SRC_UPD_DEL_conn.createStatement();
    var EP_SRC_UPD_DEL_already="SELECT * FROM EMAIL_LIST WHERE EL_EMAIL_ID='"+EP_SRC_UPD_DEL_emailid+"' AND EP_ID=(SELECT  EP_ID FROM EMAIL_PROFILE WHERE EP_EMAIL_DOMAIN='"+EP_SRC_UPD_DEL_profilename+"')";
    var EP_SRC_UPD_DEL_rs=EP_SRC_UPD_DEL_stmt.executeQuery(EP_SRC_UPD_DEL_already);
    if(EP_SRC_UPD_DEL_rs.next())
    {
      EP_SRC_UPD_DEL_chkemailid=1;
    }
    else
    {
      EP_SRC_UPD_DEL_chkemailid=0;
    }
    EP_SRC_UPD_DEL_rs.close();
    EP_SRC_UPD_DEL_stmt.close();
    EP_SRC_UPD_DEL_conn.close();
    return EP_SRC_UPD_DEL_chkemailid;
  }
  //DELETE DATA FROM EMAIL LIST TABLE ND INSERT TO TICKLER HISTORY TABLE
  function EP_SRC_UPD_DEL_delete(EP_SRC_UPD_DEL_id)
  {
    var EP_SRC_UPD_DEL_conn=eilib.db_GetConnection();
    var EP_SRC_UPD_DEL_delete=eilib.DeleteRecord(EP_SRC_UPD_DEL_conn,22,EP_SRC_UPD_DEL_id)
    EP_SRC_UPD_DEL_conn.close();
    return EP_SRC_UPD_DEL_delete;
  }
}
catch(err)
{
}
//*******************************************FILE DESCRIPTION*********************************************//
//***********************************************EMAIL TEMPLATE SEARCH/UPDATE*********************************//
//DONE BY:PUNI
//VER 1.7-SD:03/10/2014 ED:03/10/2014 TRACKER NO:422:1.updated html script to hide preloader after menu n form loads,2.changed preloader n msgbox position
//DONE BY:SARADAMBAL
//VER 1.6-SD:21/08/2014 ED:21/08/2014,TRACKER NO:422,updated new links,autogrow
//DONE BY:LALITHA
//VER 1.5-SD:11/07/2014 ED:11/07/2014,TRACKER NO:422,In script name change funct set success flag zero,Updated HTML tag,preloader hide before shwn err msg,Increased the timestamp width
//VER 1.4-SD:20/06/2014 ED:21/06/2014,TRACKER NO:422,Updated commit funct,Changed failure funct,Updated dovalidation for triming the all txt area,Updated frst shown reloaded flex tble nd thn err msg showned
//VER 1.3-SD:07/06/2014 ED:07/06/2014,TRACKER NO:422,Changed jquery link 
//VER 1.2-SD:10/04/2014 ED:10/04/2014,added preloader in begining form loading
//VER 1.1-SD:10/03/2014 ED:10/03/2014,removed repeated queries
//VER 1.0-SD:26/02/2014 ED:01/03/2014,Updated userstamp as uld id,div tag for flextable,err msg for non-update record
//VER 0.09-SD:11/02/2014 ED:11/02/2014,updated uppercase in subject nd body,nd implemented key press function for txt area
//VER 0.08-SD:04/02/2014 ED:04/02/2014,implemented eilib for err msg,eilib special charater for comments,nd h3 tag
//VER 0.07-SD:28/12/2013 ED:28/12/2013,removed utilities,doget function,updated title tag,connection,identifier,userstamp
//VER 0.06-SD:28/11/2013 ED:28/11/2013,changed timestamp time,validation,header visible after loader end,updated failure function
//VER 0.05-SD:22/10/2013 ED:07/11/2013,changed error message,sp name,control width,updated script to highlight row,class name for css
//VER 0.04-SD:08/10/2013 ED:08/10/2013,change implement return function,change head tag links
//VER 0.03-SD:27/09/2013 ED:27/09/2013,updated correct html file
//VER 0.02-SD:25/09/2013 ED:26/09/2013,updated eilib connection,message box,preloader,removed scriplet
//VER 0.01-INITIAL VERSION, SD:24/08/2013 ED:29/08/2013,TRACKER NO:422
//*********************************************************************************************************//
try
{
  //FUNCTION TO FETCHING EMAIL TEMPLATE SCRIPT NAME,ERROR MESSAGE FROM SQL TABLE
  function ET_SRC_UPD_DEL_getscriptname_err()
  {
    var ET_SRC_UPD_DEL_conn =eilib.db_GetConnection();
    var ET_SRC_UPD_DEL_script_stmt = ET_SRC_UPD_DEL_conn.createStatement();
    var ET_SRC_UPD_DEL_script_array =[];
    var ET_SRC_UPD_DEL_select_query = "SELECT ET_ID,ET_EMAIL_SCRIPT FROM EMAIL_TEMPLATE"; 
    var ET_SRC_UPD_DEL_script_rs = ET_SRC_UPD_DEL_script_stmt.executeQuery(ET_SRC_UPD_DEL_select_query);
    while(ET_SRC_UPD_DEL_script_rs.next())
    {
      var ET_SRC_UPD_DEL_script_name_id=ET_SRC_UPD_DEL_script_rs.getString(1);
      var ET_SRC_UPD_DEL_script_name=ET_SRC_UPD_DEL_script_rs.getString(2);
      var ET_SRC_UPD_DEL_script_object={"ET_SRC_UPD_DEL_script_names_id":ET_SRC_UPD_DEL_script_name_id,"ET_SRC_UPD_DEL_script_names":ET_SRC_UPD_DEL_script_name};
      ET_SRC_UPD_DEL_script_array.push(ET_SRC_UPD_DEL_script_object);  
    }
    ET_SRC_UPD_DEL_script_rs.close();
    ET_SRC_UPD_DEL_script_stmt.close();
    //FETCHING ERROR MESSAGE FROM SQL TABLE
    var ET_SRC_UPD_DEL_errmsgids="281,280,291,401";
    var ET_SRC_UPD_DEL_errorMsg_array=[];
    ET_SRC_UPD_DEL_errorMsg_array=eilib.GetErrorMessageList(ET_SRC_UPD_DEL_conn,ET_SRC_UPD_DEL_errmsgids);
    var ET_SRC_UPD_DEL_result={"ET_SRC_UPD_DEL_scriptnamedataid":ET_SRC_UPD_DEL_script_array,"ET_SRC_UPD_DEL_errormsg":ET_SRC_UPD_DEL_errorMsg_array.errormsg};      
    return ET_SRC_UPD_DEL_result;
  }
  //FUNCTION FOR SHOW THE DATA IN TABLE
  function ET_SRC_UPD_DEL_srch(ET_SRC_UPD_DEL_scriptname)
  {
    var ET_SRC_UPD_DEL_conn=eilib.db_GetConnection();
    var ET_SRC_UPD_DEL_email_list=[];
    var scriptname =ET_SRC_UPD_DEL_scriptname;
    var ET_SRC_UPD_DEL_stmt =ET_SRC_UPD_DEL_conn.createStatement();
    var ET_SRC_UPD_DEL_query="SELECT DATE_FORMAT(CONVERT_TZ(ETD.ETD_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,ETD.ETD_EMAIL_SUBJECT,ETD.ETD_EMAIL_BODY,ULD.ULD_LOGINID,ETD.ETD_ID FROM EMAIL_TEMPLATE_DETAILS ETD,USER_LOGIN_DETAILS ULD WHERE ETD.ULD_ID=ULD.ULD_ID AND ETD.ET_ID='"+scriptname+"'";
    var ET_SRC_UPD_DEL_rs =ET_SRC_UPD_DEL_stmt.executeQuery(ET_SRC_UPD_DEL_query);
    while(ET_SRC_UPD_DEL_rs.next())
    {
      var ET_SRC_UPD_DEL_subject = ET_SRC_UPD_DEL_rs.getString("ETD_EMAIL_SUBJECT");
      var ET_SRC_UPD_DEL_body=ET_SRC_UPD_DEL_rs.getString("ETD_EMAIL_BODY");
      var ET_SRC_UPD_DEL_userstamp=ET_SRC_UPD_DEL_rs.getString("ULD_LOGINID");
      var ET_SRC_UPD_DEL_timestamp=ET_SRC_UPD_DEL_rs.getString("TIMESTAMP");
      var ET_SRC_UPD_DEL_el_id=ET_SRC_UPD_DEL_rs.getString("ETD_ID");
      var ET_SRC_UPD_DEL_emaillist={'scriptno':ET_SRC_UPD_DEL_el_id,'emailsubject':ET_SRC_UPD_DEL_subject,'emailbody':ET_SRC_UPD_DEL_body,'userstamp':ET_SRC_UPD_DEL_userstamp,'timestamp':ET_SRC_UPD_DEL_timestamp}
      ET_SRC_UPD_DEL_email_list.push(ET_SRC_UPD_DEL_emaillist) 
    }
    ET_SRC_UPD_DEL_rs.close();
    ET_SRC_UPD_DEL_stmt.close();
    ET_SRC_UPD_DEL_conn.close();  
    return ET_SRC_UPD_DEL_email_list;
  }
  //UPDATE DATA FOR EMAIL TEMPLATE TABLE
  function ET_SRC_UPD_DEL_update(ET_SRC_UPD_DEL_scriptname,ET_SRC_UPD_DEL_subject,ET_SRC_UPD_DEL_body,ET_SRC_UPD_DEL_id)
  {
    var ET_SRC_UPD_DEL_delflag=0;
    var ET_SRC_UPD_DEL_conn=eilib.db_GetConnection();
    ET_SRC_UPD_DEL_conn.setAutoCommit(false);
    var ET_SRC_UPD_DEL_updstmt =ET_SRC_UPD_DEL_conn.createStatement();
    var ET_SRC_UPD_DEL_el_id=ET_SRC_UPD_DEL_id;
    ET_SRC_UPD_DEL_subject=eilib.ConvertSpclCharString(ET_SRC_UPD_DEL_subject);    
    ET_SRC_UPD_DEL_body=eilib.ConvertSpclCharString(ET_SRC_UPD_DEL_body);
    var ET_SRC_UPD_DEL_update="UPDATE EMAIL_TEMPLATE_DETAILS SET ETD_EMAIL_SUBJECT='"+ET_SRC_UPD_DEL_subject+"',ETD_EMAIL_BODY='"+ET_SRC_UPD_DEL_body+"', ULD_ID=(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"') WHERE ETD_ID="+ET_SRC_UPD_DEL_el_id+" ";
    ET_SRC_UPD_DEL_updstmt.execute(ET_SRC_UPD_DEL_update);
    ET_SRC_UPD_DEL_delflag=1;
    ET_SRC_UPD_DEL_updstmt.close();
    ET_SRC_UPD_DEL_conn.commit();
    ET_SRC_UPD_DEL_conn.close();
    return ET_SRC_UPD_DEL_delflag;
  }
}
catch(err)
{
}
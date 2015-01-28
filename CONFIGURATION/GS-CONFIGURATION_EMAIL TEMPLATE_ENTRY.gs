//***********************************************FILE DESCRIPTION*********************************************//
//*************************************************EMAIL TEMPLATE ENTRY***************************************//
//DONE BY:PUNI
//VER 1.7-SD:03/10/2014 ED:03/10/2014 TRACKER NO:422:1.updated html script to hide preloader after menu n form loads,2.changed preloader n msgbox position,3.corrected btn validation
//DONE BY:SARADAMBAL
//VER 1.6-SD:21/08/2014 ED:21/08/2014,TRACKER NO:422,updated new links,autogrow
//DONE BY:LALITHA
//VER 1.5-SD:11/07/2014 ED:11/07/2014,TRACKER NO:422,preloader hide before shwn err msg
//VER 1.4-SD:20/06/2014 ED:21/06/2014,TRACKER NO:422,Changed failure funct,Changed btn name(submit to save),Updated trim function manually written for txt area,empty the hidden txt while calling insert nd after insertion,Changed validation,alredy exit funt calling time preloader showned,In gs side(Changed userstamp in global funct,while loop for resultset)
//VER 1.3-SD:07/06/2014 ED:07/06/2014,Changed jquery link 
//VER 1.2-SD:26/02/2014 ED:01/03/2014,Updated userstamp as uld id
//VER 1.1-SD:22/02/2014 ED:22/02/2014,updated the comments in gs file
//VER 1.0-SD:17/02/2014 ED:17/02/2014,checked whether the data are inserted or not nd update the error msg for not-saved record
//VER 0.09-SD:11/02/2014 ED:11/02/2014,updated uppercase in subject nd body,nd implemented key press function for txt area
//VER 0.08-SD:04/02/2014 ED:04/02/2014,implemented eilib for err msg,eilib special charater for comments,nd h3 tag
//VER 0.07-SD:28/12/2013 ED:28/12/2013,removed utilities,doget function,updated title tag,connection,identifier,userstamp
//VER 0.06-SD:28/11/2013 ED:28/11/2013,changed validation,max length,reduce the width after save or reset,updated failure function 
//VER 0.05-SD:22/10/2013 ED:12/11/2013,changed control width,sp name
//VER 0.04-SD:08/10/2013 ED:08/10/2013,change implement return function,change head tag links
//VER 0.03-SD:27/09/2013 ED:27/09/2013,updated correct html file
//VER 0.02-SD:25/09/2013 ED:26/09/2013,updated eilib connection,message box,preloader and removed scriplet
//VER 0.01-INITIAL VERSION, SD:24/08/2013 ED:29/08/2013,TRACKER NO:422
//*********************************************************************************************************//
try
{
  //FUNCTION FOR FETCHING ERROR MESSAGE FROM SQL TABLE
  function ET_ENTRY_geterrmsg()
  {
    var ET_ENTRY_conn=eilib.db_GetConnection();
    var ET_ENTRY_errmsgids="278,279,400";
    var ET_ENTRY_errorMsg_array=[];
    ET_ENTRY_errorMsg_array=eilib.GetErrorMessageList(ET_ENTRY_conn,ET_ENTRY_errmsgids);
    var ET_ENTRY_result={"ET_ENTRY_errormsg":ET_ENTRY_errorMsg_array.errormsg};      
    ET_ENTRY_conn.close();
    return ET_ENTRY_result;
  }
  //FUNCTION FOR TO SAVE THE EMAIL TEMPLATE
  function ET_ENTRY_insert(ET_ENTRY_template)
  {
    var ET_ENTRY_conn=eilib.db_GetConnection();
    var ET_ENTRY_stmt=ET_ENTRY_conn.createStatement()
    var ET_ENTRY_scriptname=ET_ENTRY_template.ET_ENTRY_tb_scriptname;
    var ET_ENTRY_subject=ET_ENTRY_template.ET_ENTRY_ta_subject;
    ET_ENTRY_subject=eilib.ConvertSpclCharString(ET_ENTRY_subject);    
    var ET_ENTRY_body=ET_ENTRY_template.ET_ENTRY_ta_body; 
    ET_ENTRY_body=eilib.ConvertSpclCharString(ET_ENTRY_body);    
    ET_ENTRY_stmt.execute("CALL SP_EMAIL_TEMPLATE_INSERT('"+ET_ENTRY_scriptname+"','"+ET_ENTRY_subject+"','"+ET_ENTRY_body+"','"+UserStamp+"',@EMAILINSERT_FLAG)");
    ET_ENTRY_stmt.close();
    var ET_ENTRY_stmt_flag=ET_ENTRY_conn.createStatement();
    var ET_ENTRY_flag_select="SELECT @EMAILINSERT_FLAG";
    var ET_ENTRY_flag_rs=ET_ENTRY_stmt_flag.executeQuery(ET_ENTRY_flag_select);
    if(ET_ENTRY_flag_rs.next())
    {
      var ET_ENTRY_flag_insert=ET_ENTRY_flag_rs.getString("@EMAILINSERT_FLAG");
    }
    ET_ENTRY_flag_rs.close();
    ET_ENTRY_stmt_flag.close();
    ET_ENTRY_conn.close();
    return ET_ENTRY_flag_insert;
  }
  //FUNCTION FOR ALREADY EXIST FOR SCRIPT NAME
  function ET_ENTRY_already(ET_ENTRY_scriptname)
  {
    var ET_ENTRY_chkscriptname="";
    var ET_ENTRY_conn=eilib.db_GetConnection();
    var ET_ENTRY_stmt=ET_ENTRY_conn.createStatement();
    var ET_ENTRY_alreadyscript="SELECT ET_EMAIL_SCRIPT FROM EMAIL_TEMPLATE WHERE ET_EMAIL_SCRIPT='"+ET_ENTRY_scriptname+"'";  
    var ET_ENTRY_rs=ET_ENTRY_stmt.executeQuery(ET_ENTRY_alreadyscript);
    if(ET_ENTRY_rs.next())
    {
      ET_ENTRY_chkscriptname=1;
    }
    else
    {
      ET_ENTRY_chkscriptname=0;
    }
    ET_ENTRY_rs.close();
    ET_ENTRY_stmt.close();
    ET_ENTRY_conn.close();
    return ET_ENTRY_chkscriptname;
  }
}
catch(err)
{
}
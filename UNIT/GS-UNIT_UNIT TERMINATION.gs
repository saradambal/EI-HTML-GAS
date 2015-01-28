//*******************************************FILE DESCRIPTION*********************************************//
//********************************************UNIT TERMINATION***********************************************//
//<!--DONE BY:PUNI
//VER 1.6 -SD:06/10/2014 ED:06/10/2014,TRACKER NO:249,Changed some preloader n msgbox position
//DONE BY:SARADAMBAL
//VER 1.5 -SD:13/09/2014 ED:13/09/2014,TRACKER NO:249,implemented script for preloader,msgbox
//VER 1.4-SD:14/08/2014 ED:14/08/2014, TRACKER NO:249,updated new links,checked sp after updation of rollback,implemented autogrow
//VER 1.3 -SD:13/06/2014 ED:13/06/2014,TRACKER NO:249,updated failure function
//VER 1.2 -SD:06/06/2014 ED:06/06/2014,TRACKER NO:249,updated new link
//VER 1.1 -SD:27/05/2014 ED:27/05/2014,TRACKER NO:249,cleared return function,implemented sp and checked
//VER 1.0 -SD:09/04/2014 ED:09/04/2014,TRACKER NO:249,checked sp for adding comments,include comments in form
//VER 0.09-SD:01/03/2014 ED:01/03/2014,TRACKER NO:249,checked sp for uldid instead of userstamp
//VER 0.08-SD:12/02/2014 ED:13/02/2014,TRACKER NO:249,removed updation query,tickler part and implemented sp for updation and TH,implemented eilib for errormsg
//VER 0.07-SD:28/12/2013 ED:30/12/2013,TRACKER NO:249,changed form alignment tag & userstamp syntax,remove utilities syntax,updated view for customer
//VER 0.06-SD:2/12/2013 ED:2/12/2013,TRACKER NO:249,implemented utilities.sleep function,removed disabled 
//VER 0.05-SD:20/11/2013 ED:25/11/2013,TRACKER NO:249,implemented errormsg for not having active unit,updated failure function,implemented eilib for getting active unit 
//VER 0.04-SD:07/11/2013 ED:07/11/2013,TRACKER NO:249,updated tickler,implemented class name for button,implemented alignment for textbox
//VER 0.03-SD:08/10/2013 ED:08/10/2013,TRACKER NO:249,updated head tag links & implement return function
//VER 0.02-SD:30/09/2013 ED:30/09/2013,TRACKER NO:249,updated eilib connection,message box,preloader,removed scriplet,convert blur function for all change function
//VER 0.01-INITIAL VERSION,TRACKER NO:249,SD:04/09/2013,ED:05/09/2013
//*********************************************************************************************************//
try{
  /*-----------------------------------------FUNCTION FOR FETCHING ERROR MESSAGE AND UNIT NO FROM SQL TABLE----------------------------------------------*/
  function UTERM_get_errormsg_unitno()
  {
    var UTERM_conn =eilib.db_GetConnection();
    var UTERM_errorarray =[];
    var UTERM_errorarray =  eilib.GetErrorMessageList(UTERM_conn,'15,31,32,324');
    var UTERM_unitnoarr=[];
    var UTERM_stmtunitno = UTERM_conn.createStatement();
    var UTERM_loadunitno_query = "SELECT UNIT_NO FROM UNIT WHERE UNIT_ID IN (SELECT UNIT_ID FROM UNIT_DETAILS WHERE UD_OBSOLETE IS NULL)"; 
    var UTERM_rs_unitno = UTERM_stmtunitno.executeQuery(UTERM_loadunitno_query);
    while(UTERM_rs_unitno.next())
    {
      UTERM_unitnoarr.push(UTERM_rs_unitno.getString(1));
    } 
    var UTERM_result={"UTERM_errormsg":UTERM_errorarray.errormsg,"UTERM_unitno":UTERM_unitnoarr};      
    UTERM_rs_unitno.close();UTERM_stmtunitno.close();
    UTERM_conn.close();  
    return UTERM_result;
  }  
  /*-----------FUNCTION FOR RETRIEVE UNIT DETAILS FROM UNIT_DETAILS TABLE, CHECK CUSTOMER ID AND UPDATE OBSOLETE----------------*/
  function UTERM_unitdetails(UTERM_unitnumber,UTERM_flag_selectcheck,UTERM_comments)
  {
    var UTERM_conn =eilib.db_GetConnection();
    if(UTERM_flag_selectcheck=='UTERM_flag_select')
    { 
      var UTERM_stmt_unit = UTERM_conn.createStatement();
      var UTERM_unitno_select="SELECT * FROM UNIT WHERE UNIT_NO="+UTERM_unitnumber+"";
      var UTERM_unitno_rs=UTERM_stmt_unit.executeQuery(UTERM_unitno_select);
      while(UTERM_unitno_rs.next())
      {
        var UTERM_unitno=UTERM_unitno_rs.getString("UNIT_ID");
      }
      UTERM_unitno_rs.close();UTERM_stmt_unit.close();
      var UTERM_stmt = UTERM_conn.createStatement();
      var UTERM_unitdetails="SELECT UD_START_DATE,UD_END_DATE,UD_PAYMENT,UD_COMMENTS FROM UNIT_DETAILS WHERE UNIT_ID="+UTERM_unitno+"";
      var UTERM_unitdetails_rs=UTERM_stmt.executeQuery(UTERM_unitdetails);
      var UTERM_array_unitdetails='';
      while(UTERM_unitdetails_rs.next())
      {
        var UTERM_startdate = UTERM_unitdetails_rs.getString(1);
        var UTERM_enddate = UTERM_unitdetails_rs.getString(2);
        var UTERM_rental = UTERM_unitdetails_rs.getString(3);
        var UTERM_comments = UTERM_unitdetails_rs.getString(4);
        UTERM_array_unitdetails={"UTERM_sdate":UTERM_startdate,"UTERM_edate":UTERM_enddate,"UTERM_rent":UTERM_rental,"UTERM_comment":UTERM_comments}
      }
      UTERM_unitdetails_rs.close();UTERM_stmt.close(); UTERM_conn.close();
      return UTERM_array_unitdetails;
    } 
    else if(UTERM_flag_selectcheck=='UTERM_flag_check')
    { 
      if(UTERM_comments!="")//COMMENTS
      {UTERM_comments=eilib.ConvertSpclCharString(UTERM_comments);}
      var UTERM_stmt_unitsp = UTERM_conn.createStatement();
      var UTERM_unitno_sp="CALL SP_UNIT_TERMINATION("+UTERM_unitnumber+",'"+UserStamp+"','"+UTERM_comments+"',@FLAG)";
      UTERM_stmt_unitsp.execute(UTERM_unitno_sp);
      UTERM_stmt_unitsp.close();
      var UTERM_stmt_flag = UTERM_conn.createStatement();
      var UTERM_unitflag_select="SELECT @FLAG";
      var UTERM_unitno_rs=UTERM_stmt_flag.executeQuery(UTERM_unitflag_select);
      while(UTERM_unitno_rs.next())
      {
        var UTERM_flag_customer=UTERM_unitno_rs.getString("@FLAG");
      }
      UTERM_unitno_rs.close();UTERM_stmt_flag.close();
      var UTERM_UPDCODE_unitno_refresh=UTERM_get_errormsg_unitno();
      var UTERM_UPDCODE_unitno_refresh_arr=UTERM_UPDCODE_unitno_refresh.UTERM_unitno;
    }
    var UTERM_UPDCODE_object={"UTERM_UPDCODE_obj_flag":UTERM_flag_customer,"UTERM_UPDCODE_unitno_obj":UTERM_UPDCODE_unitno_refresh_arr}
    UTERM_conn.close();
    return UTERM_UPDCODE_object;
  }
}
catch(err)
{
}
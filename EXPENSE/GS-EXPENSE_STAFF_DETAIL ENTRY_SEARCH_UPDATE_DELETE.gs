//*******************************************FILE DESCRIPTION*********************************************//
//***********************************************STAFF EXPENSE DETAIL:SEARCH/UPDATE/DELETE**********//
//DONE BY:PUNI
//VER 1.7-SD:9/03/2015 ED:09/03/2015-updated autocommit false for new connection string,corrected sorting for empname listbox
//VER 1.6-SD:09/10/2014 ED:09/10/2014,TRACKER NO:706:1.added script to hide preloader after menu n form loads,2.changed preloader n msgbox position
//DONE BY:SARADAMBAL
//VER 1.5-SD:21/08/2014 ED:21/08/2014,TRACKER NO:706,updated new links,autogrow
//DONE BY:LALITHA
//VER 1.4-SD:09/06/2014 ED:13/06/2014,TRACKER NO:706,Updated commit funct,Changed failure funct,Hide the flex tble thn nly shown err msg for update nd delete,After deleting record again checked flex tble response length zero means reload the listbox
//VER 1.3-SD:06/06/2014 ED:06/06/2014,Changed jquery link
//VER 1.2-SD:04/06/2014 ED:05/06/2014,Added preloader for radio button clicked nd already exit function of cpf number,Updated parse float for three amount fields,Changed query for emp name lst bx,Changed change funct to blur funct of cpf number,After updated comments called auto complt functn nd cleared the txt area
//VER 1.1-SD:09/04/2014 ED:09/04/2014,added preloader in beginning form loading,corrected err msg for no data in comments,before return functn closed stmt,rs,conn,changed while comments empty means set null,removed div widget
//VER 1.0-SD:08/03/2014 ED:10/03/2014,removed repeated queries,unwanted codings
//VER 0.09-SD:17/02/2014 ED:17/02/2014,updated eilib for deletion,removed the select query for postid
//VER 0.08-SD:04/02/2014 ED:15/02/2014,implemented eilib for err msg,eilib special charater for comments,nd h3 tag,after search button click to hide the error msg,changed cpf number textbox width,implemented sp for deletion,removed deletion query,update error msg for non-deletion record 
//VER 0.07-SD:10/01/2014 ED:12/01/2014,TRACKER NO:706,changed one emp name in ddl,removed underscore for no data err msg,fixed width for amount box and search button,aftr updating the comments again i shown the autocomplete,put err msg for not search option and also disabled the button,not loaded the null fields in all listbox
//VER 0.06-SD:28/12/2013 ED:02/01/2014,removed utilities,doget function,updated connection
//VER 0.05-SD:26/12/2013 ED:26/12/2013,changed link,updated identifier name,title div tag
//VER 0.04-SD:14/12/2013 ED:16/12/2013,updated utilities syntax,user stamp,implemented error msg for not havg search option
//VER 0.03-SD:25/10/2013 ED:27/11/2013,update the script to reload the search table,onfailure function,flex table shown in ascending,changed validation
//VER 0.02-SD:12/10/2013 ED:12/11/2013,changed error message,validation of cpf amount,removed listbox,control width,updated script to highlight row,class name for css,tickler delete function
//VER 0.01-INITIAL VERSION, SD:02/09/2013 ED:10/10/2013,TRACKER NO:448
//*********************************************************************************************************//
try
{
  //FUNCTION TO GET SEARCH OPTION 
  function STDTL_SEARCH_searchoption()
  {
    var STDTL_SEARCH_connection=eilib.db_GetConnection();
    var STDTL_SEARCH_employee_name_stmt=STDTL_SEARCH_connection.createStatement();
    var STDTL_SEARCH_employeename_array=[];
    var STDTL_SEARCH_select_employee_name="SELECT DISTINCT ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME FROM EXPENSE_DETAIL_STAFF_SALARY EDSS,EMPLOYEE_DETAILS ED WHERE EDSS.EMP_ID=ED.EMP_ID ORDER BY ED.EMP_FIRST_NAME ASC";
    var STDTL_SEARCH_employee_name_rs=STDTL_SEARCH_employee_name_stmt.executeQuery(STDTL_SEARCH_select_employee_name);
    while(STDTL_SEARCH_employee_name_rs.next())
    {
      STDTL_SEARCH_employeename_array.push( STDTL_SEARCH_employee_name_rs.getString("EMP_FIRST_NAME")+'_'+STDTL_SEARCH_employee_name_rs.getString("EMP_LAST_NAME"));
    }
    STDTL_SEARCH_employee_name_rs.close();
    STDTL_SEARCH_employee_name_stmt.close();
    //CODING TO GET CPF NUMBER FROM DATABASE
    var STDTL_SEARCH_error_stmt=STDTL_SEARCH_connection.createStatement();
    var STDTL_SEARCH_error_name="SELECT EDSS_CPF_NUMBER FROM EXPENSE_DETAIL_STAFF_SALARY EDSS,EMPLOYEE_DETAILS ED WHERE  EDSS.EMP_ID=ED.EMP_ID AND EDSS_CPF_NUMBER IS NOT NULL  ORDER BY EDSS_CPF_NUMBER"; 
    var STDTL_SEARCH_error_rs=STDTL_SEARCH_error_stmt.executeQuery(STDTL_SEARCH_error_name);
    var STDTL_SEARCH_cpfnumber_array=[];
    while(STDTL_SEARCH_error_rs.next())
    {
      STDTL_SEARCH_cpfnumber_array.push(STDTL_SEARCH_error_rs.getString("EDSS_CPF_NUMBER"));
    }
    STDTL_SEARCH_error_rs.close();
    STDTL_SEARCH_error_stmt.close();
    // RETRIEVE MESSAGE FOR STAFF RECORD FROM ERROR TABLE
    var STDTL_SEARCH_errmsgids="128,45,60,241,240,135,172,173,146,145,147,137,136,71,72,171,315,375,170";  
    var STDTL_SEARCH_errorMsg_array=[];
    STDTL_SEARCH_errorMsg_array=eilib.GetErrorMessageList(STDTL_SEARCH_connection,STDTL_SEARCH_errmsgids);
    //CODING TO GET SEARCH OPTION FROM DATABASE
    var STDTL_SEARCH_flagstaffdetail_check=false;
    var STDTL_SEARCH_stmtstaffdetail_check = STDTL_SEARCH_connection.createStatement();
    var STDTL_SEARCH_querystaffdetail_check = "SELECT * FROM EXPENSE_DETAIL_STAFF_SALARY";
    var STDTL_SEARCH_rsstaffdetail_check = STDTL_SEARCH_stmtstaffdetail_check.executeQuery(STDTL_SEARCH_querystaffdetail_check);
    while(STDTL_SEARCH_rsstaffdetail_check.next())
    {
      STDTL_SEARCH_flagstaffdetail_check=true;
    }
    STDTL_SEARCH_rsstaffdetail_check.close();
    STDTL_SEARCH_stmtstaffdetail_check.close();
    var STDTL_SEARCH_searchoptions_dataid=[];
    if(STDTL_SEARCH_flagstaffdetail_check==true){    
      var STDTL_SEARCH_select_searchoptions="SELECT * FROM EXPENSE_CONFIGURATION  WHERE  ECN_ID IN (90,93,86,87,88,79)ORDER BY ECN_DATA ASC"
      var STDTL_SEARCH_expconfigmsg_stmt=STDTL_SEARCH_connection.createStatement();
      var STDTL_SEARCH_searchoption_rs=STDTL_SEARCH_expconfigmsg_stmt.executeQuery(STDTL_SEARCH_select_searchoptions);
      while(STDTL_SEARCH_searchoption_rs.next())
      {
        var STDTL_SEARCH_searchoptions_id=STDTL_SEARCH_searchoption_rs.getString(1);
        var STDTL_SEARCH_searchoptions_data=STDTL_SEARCH_searchoption_rs.getString(3);
        var STDTL_SEARCH_searchoptions_object={"STDTL_SEARCH_searchoption_id":STDTL_SEARCH_searchoptions_id,"STDTL_SEARCH_searchoption_data":STDTL_SEARCH_searchoptions_data};
        STDTL_SEARCH_searchoptions_dataid.push(STDTL_SEARCH_searchoptions_object);
      }}
    var STDTL_SEARCH_result={"STDTL_SEARCH_employeename":STDTL_SEARCH_employeename_array,"STDTL_SEARCH_errormsg":STDTL_SEARCH_errorMsg_array.errormsg,"STDTL_SEARCH_searchoptionn":STDTL_SEARCH_searchoptions_dataid,"STDTL_SEARCH_cpfnumber":STDTL_SEARCH_cpfnumber_array};      
    STDTL_SEARCH_searchoption_rs.close();
    STDTL_SEARCH_expconfigmsg_stmt.close();
    STDTL_SEARCH_connection.close();
    return STDTL_SEARCH_result
  }
  //FUNCTION FOR AUTOCOMPLETE FOR STAFF COMMENTS
  function STDTL_SEARCH_comments_autocomplete()
  {
    var STDTL_SEARCH_conn=eilib.db_GetConnection();
    var STDTL_SEARCH_stmt=STDTL_SEARCH_conn.createStatement();
    var STDTL_SEARCH_dataArray=[];
    var STDTL_SEARCH_rs=STDTL_SEARCH_stmt.executeQuery("SELECT DISTINCT EDSS.EDSS_COMMENTS FROM EXPENSE_DETAIL_STAFF_SALARY EDSS,EMPLOYEE_DETAILS ED WHERE  EDSS.EMP_ID=ED.EMP_ID AND EDSS.EDSS_COMMENTS IS NOT NULL ORDER BY EDSS.EDSS_COMMENTS");
    while(STDTL_SEARCH_rs.next()) 
    {
      if(STDTL_SEARCH_rs.getString('EDSS.EDSS_COMMENTS')!=null)
        STDTL_SEARCH_dataArray.push(STDTL_SEARCH_rs.getString('EDSS.EDSS_COMMENTS'));
    }
    STDTL_SEARCH_rs.close();
    STDTL_SEARCH_stmt.close();
    STDTL_SEARCH_conn.close();
    return STDTL_SEARCH_dataArray;
  }  
  // FUNCTION FOR SHOW THE DATA IN TABLE
  function STDTL_SEARCH_flextabel_getdatas(STDTL_SEARCH_flexresponse)
  {
    var STDTL_SEARCH_connection=eilib.db_GetConnection();
    var STDTL_SEARCH_stmt_flex=STDTL_SEARCH_connection.createStatement();
    var STDTL_SEARCH_staffexpense_selectquery=[];
    var STDTL_SEARCH_search_employeelistarray=[];
    var STDTL_SEARCH_cpfnumber=STDTL_SEARCH_flexresponse.STDTL_SEARCH_lb_cpfnumber_listbox;
    var STDTL_SEARCH_levyfrom_form=STDTL_SEARCH_flexresponse.STDTL_SEARCH_tb_fromamt;
    var STDTL_SEARCH_levyto_form=STDTL_SEARCH_flexresponse.STDTL_SEARCH_tb_toamt;
    var STDTL_SEARCH_salaryfrom_form=STDTL_SEARCH_flexresponse.STDTL_SEARCH_tb_fromamt;
    var STDTL_SEARCH_salaryto_form=STDTL_SEARCH_flexresponse.STDTL_SEARCH_tb_toamt;
    var STDTL_SEARCH_comments=STDTL_SEARCH_flexresponse.STDTL_SEARCH_ta_comments;
    var STDTL_SEARCH_cpffrom_form=STDTL_SEARCH_flexresponse.STDTL_SEARCH_tb_fromamt;
    var STDTL_SEARCH_cpfto_form=STDTL_SEARCH_flexresponse.STDTL_SEARCH_tb_toamt;
    var STDTL_SEARCH_flextable_option=STDTL_SEARCH_flexresponse.STDTL_SEARCH_lb_searchoption;
    //CPF NUMBER
    STDTL_SEARCH_staffexpense_selectquery[93]="SELECT ED.EMP_ID,EDSS.EDSS_ID,ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME,EDSS.EDSS_CPF_NUMBER,EDSS.EDSS_CPF_AMOUNT,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EDSS.EDSS_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSS.EDSS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSS_TIMESTAMP FROM EXPENSE_DETAIL_STAFF_SALARY EDSS,EMPLOYEE_DETAILS ED,USER_LOGIN_DETAILS ULD WHERE EDSS.EDSS_CPF_NUMBER='"+STDTL_SEARCH_cpfnumber+"' AND  EDSS.EMP_ID=ED.EMP_ID AND ULD.ULD_ID=EDSS.ULD_ID ORDER BY EDSS.EMP_ID";
    //LEVY AMOUNT
    STDTL_SEARCH_staffexpense_selectquery[87]="SELECT ED.EMP_ID,EDSS.EDSS_ID,ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME,EDSS.EDSS_CPF_NUMBER,EDSS.EDSS_CPF_AMOUNT,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EDSS.EDSS_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSS.EDSS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSS_TIMESTAMP FROM EXPENSE_DETAIL_STAFF_SALARY EDSS,EMPLOYEE_DETAILS ED,USER_LOGIN_DETAILS ULD WHERE EDSS_LEVY_AMOUNT between "+STDTL_SEARCH_levyfrom_form+" and "+STDTL_SEARCH_levyto_form+" and EDSS.EMP_ID=ED.EMP_ID AND ULD.ULD_ID=EDSS.ULD_ID ORDER BY ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME,EDSS.EMP_ID";
    //SALARY AMOUNT
    STDTL_SEARCH_staffexpense_selectquery[88]="SELECT ED.EMP_ID,EDSS.EDSS_ID,ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME,EDSS.EDSS_CPF_NUMBER,EDSS.EDSS_CPF_AMOUNT,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EDSS.EDSS_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSS.EDSS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSS_TIMESTAMP FROM EXPENSE_DETAIL_STAFF_SALARY EDSS,EMPLOYEE_DETAILS ED,USER_LOGIN_DETAILS ULD WHERE EDSS_SALARY_AMOUNT between "+STDTL_SEARCH_salaryfrom_form+" and "+STDTL_SEARCH_salaryto_form+" and EDSS.EMP_ID=ED.EMP_ID AND ULD.ULD_ID=EDSS.ULD_ID ORDER BY ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME,EDSS.EMP_ID";
    //STAFF COMMENTS
    STDTL_SEARCH_staffexpense_selectquery[79]="SELECT ED.EMP_ID,EDSS.EDSS_ID,ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME,EDSS.EDSS_CPF_NUMBER,EDSS.EDSS_CPF_AMOUNT,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EDSS.EDSS_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSS.EDSS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSS_TIMESTAMP FROM EXPENSE_DETAIL_STAFF_SALARY EDSS,EMPLOYEE_DETAILS ED,USER_LOGIN_DETAILS ULD WHERE EDSS.EDSS_COMMENTS='"+STDTL_SEARCH_comments+"' AND EDSS.EMP_ID=ED.EMP_ID AND ULD.ULD_ID=EDSS.ULD_ID ORDER BY EDSS.EMP_ID"; 
    //CPF AMOUNT
    STDTL_SEARCH_staffexpense_selectquery[86]="SELECT ED.EMP_ID,EDSS.EDSS_ID,ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME,EDSS.EDSS_CPF_NUMBER,EDSS.EDSS_CPF_AMOUNT,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EDSS.EDSS_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSS.EDSS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSS_TIMESTAMP FROM EXPENSE_DETAIL_STAFF_SALARY EDSS,EMPLOYEE_DETAILS ED,USER_LOGIN_DETAILS ULD WHERE EDSS_CPF_AMOUNT between "+STDTL_SEARCH_cpffrom_form+" and "+STDTL_SEARCH_cpfto_form+" and EDSS.EMP_ID=ED.EMP_ID  AND ULD.ULD_ID=EDSS.ULD_ID ORDER BY ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME, EDSS.EMP_ID";
    //EMPLOYEE NAME
    var STDTL_SEARCH_employeename=STDTL_SEARCH_flexresponse.STDTL_SEARCH_lb_employeename_listbox;
    var STDTL_SEARCH_flname=STDTL_SEARCH_employeename.split('_');
    var STDTL_SEARCH_fname=STDTL_SEARCH_flname[0];
    var STDTL_SEARCH_lname=STDTL_SEARCH_flname[1];
    STDTL_SEARCH_staffexpense_selectquery[90]="SELECT ED.EMP_ID,EDSS.EDSS_ID,ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME,EDSS.EDSS_CPF_NUMBER,EDSS.EDSS_CPF_AMOUNT,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EDSS.EDSS_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSS.EDSS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSS_TIMESTAMP FROM EXPENSE_DETAIL_STAFF_SALARY EDSS,EMPLOYEE_DETAILS ED,USER_LOGIN_DETAILS ULD WHERE ED.EMP_FIRST_NAME='"+STDTL_SEARCH_fname+"' AND  ED.EMP_LAST_NAME='"+STDTL_SEARCH_lname+"' AND EDSS.EMP_ID=ED.EMP_ID AND ULD.ULD_ID=EDSS.ULD_ID ORDER BY EDSS.EMP_ID" ;
    var STDTL_SEARCH_flex_rs = STDTL_SEARCH_stmt_flex.executeQuery(STDTL_SEARCH_staffexpense_selectquery[STDTL_SEARCH_flextable_option]);
    while (STDTL_SEARCH_flex_rs.next()) 
    {
      var STDTL_SEARCH_employeenamefirst=STDTL_SEARCH_flex_rs.getString("EMP_FIRST_NAME");
      var STDTL_SEARCH_employeenamelast=STDTL_SEARCH_flex_rs.getString("EMP_LAST_NAME");
      var STDTL_SEARCH_employeenameconcat=STDTL_SEARCH_employeenamefirst+' '+STDTL_SEARCH_employeenamelast
      var STDTL_SEARCH_employeename=STDTL_SEARCH_flex_rs.getString("EMP_ID");
      var STDTL_SEARCH_cpfnumber=STDTL_SEARCH_flex_rs.getString("EDSS_CPF_NUMBER");
      if((STDTL_SEARCH_cpfnumber=='null')||(STDTL_SEARCH_cpfnumber==undefined))
      {
        STDTL_SEARCH_cpfnumber='';
      }
      var STDTL_SEARCH_cpfamount=STDTL_SEARCH_flex_rs.getString("EDSS_CPF_AMOUNT");
      if((STDTL_SEARCH_cpfamount=='null')||(STDTL_SEARCH_cpfamount==undefined))
      {
        STDTL_SEARCH_cpfamount='';
      }
      var STDTL_SEARCH_levyamount=STDTL_SEARCH_flex_rs.getString("EDSS_LEVY_AMOUNT");
      if((STDTL_SEARCH_levyamount=='null')||(STDTL_SEARCH_levyamount==undefined))
      {
        STDTL_SEARCH_levyamount='';
      }
      var STDTL_SEARCH_salaryamount=STDTL_SEARCH_flex_rs.getString("EDSS_SALARY_AMOUNT");
      var STDTL_SEARCH_comments=STDTL_SEARCH_flex_rs.getString("EDSS_COMMENTS");
      if(STDTL_SEARCH_comments==null)
      {
        STDTL_SEARCH_comments='';
      }
      var STDTL_SEARCH_userstamp=STDTL_SEARCH_flex_rs.getString("ULD_LOGINID");
      var STDTL_SEARCH_timestamp=STDTL_SEARCH_flex_rs.getString("EDSS_TIMESTAMP");
      var STDTL_SEARCH_el_id=STDTL_SEARCH_flex_rs.getString("EDSS_ID");
      var STDTL_SEARCH_employeelist={'empno':STDTL_SEARCH_el_id,'employeename':STDTL_SEARCH_employeenameconcat,'cpfnumber':STDTL_SEARCH_cpfnumber,'cpfamount':STDTL_SEARCH_cpfamount,'levyamount':STDTL_SEARCH_levyamount,'salaryamount':STDTL_SEARCH_salaryamount,'comments':STDTL_SEARCH_comments,'userstamp':STDTL_SEARCH_userstamp,'timestamp':STDTL_SEARCH_timestamp}
      STDTL_SEARCH_search_employeelistarray.push(STDTL_SEARCH_employeelist) 
    }
    PropertiesService.getUserProperties().setProperty('ID',STDTL_SEARCH_el_id)
    STDTL_SEARCH_flex_rs.close();
    STDTL_SEARCH_stmt_flex.close();
    STDTL_SEARCH_connection.close();
    return STDTL_SEARCH_search_employeelistarray;
  }
  //UPDATE DATA FOR STAFF DETAIL TABLE
  function STDTL_SEARCH_update(STDTL_SEARCH_form_employeelist)
  {
    var STDTL_SEARCH_connection=eilib.db_GetConnection()
    STDTL_SEARCH_connection.setAutoCommit(false);
    var STDTL_SEARCH_updstmt=STDTL_SEARCH_connection.createStatement();
    var STDTL_SEARCH_employeename=STDTL_SEARCH_form_employeelist.STDTL_SEARCH_lb_updemployeename;
    var STDTL_SEARCH_flname=STDTL_SEARCH_employeename.split(' ');
    var STDTL_SEARCH_fname=STDTL_SEARCH_flname[0];
    var STDTL_SEARCH_lname=STDTL_SEARCH_flname[1];
    var STDTL_SEARCH_el_id=STDTL_SEARCH_form_employeelist.STDTL_SEARCH_radio_staffdetail;
    STDTL_SEARCH_employeename=STDTL_SEARCH_form_employeelist.STDTL_SEARCH_lb_updemployeename;
    var STDTL_SEARCH_cpfnumber=STDTL_SEARCH_form_employeelist.STDTL_SEARCH_tb_updcpfnumber;
    if(STDTL_SEARCH_cpfnumber=='')
    {
      STDTL_SEARCH_cpfnumber=null;
    }
    else
    {STDTL_SEARCH_cpfnumber="'"+STDTL_SEARCH_cpfnumber+"'";}
    var STDTL_SEARCH_cpfnumberduplicate=STDTL_SEARCH_form_employeelist.STDTL_SEARCH_tb_updcpfnumberduplicate;
    var STDTL_SEARCH_cpfamount=STDTL_SEARCH_form_employeelist.STDTL_SEARCH_tb_updcpfamount;
    if(STDTL_SEARCH_cpfamount=='')
    {
      STDTL_SEARCH_cpfamount=null;
    }
    var STDTL_SEARCH_levyamount=STDTL_SEARCH_form_employeelist.STDTL_SEARCH_tb_updlevyamount;
    if(STDTL_SEARCH_levyamount=='')
    {
      STDTL_SEARCH_levyamount=null;
    }
    var STDTL_SEARCH_salaryamount=STDTL_SEARCH_form_employeelist.STDTL_SEARCH_tb_updsalaryamount;
    var STDTL_SEARCH_comments=STDTL_SEARCH_form_employeelist.STDTL_SEARCH_ta_updcomments;
    if(STDTL_SEARCH_comments=="")
    {
      STDTL_SEARCH_comments=null;
    }
    else
    {
      STDTL_SEARCH_comments='"'+eilib.ConvertSpclCharString(STDTL_SEARCH_comments)+'"';    
    }
    var STDTL_SEARCH_update="UPDATE EXPENSE_DETAIL_STAFF_SALARY SET EDSS_CPF_NUMBER ="+STDTL_SEARCH_cpfnumber+",EDSS_CPF_AMOUNT="+STDTL_SEARCH_cpfamount+",EDSS_LEVY_AMOUNT="+STDTL_SEARCH_levyamount+",EDSS_SALARY_AMOUNT="+STDTL_SEARCH_salaryamount+",EDSS_COMMENTS="+STDTL_SEARCH_comments+",ULD_ID=(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"') WHERE EDSS_ID="+STDTL_SEARCH_el_id+" ";
    STDTL_SEARCH_updstmt.execute(STDTL_SEARCH_update);
    STDTL_SEARCH_updstmt.close();
    STDTL_SEARCH_connection.commit();
    STDTL_SEARCH_connection.close();
    var STDTL_SEARCH_commentsupdate=STDTL_SEARCH_comments_autocomplete();
  }
  //FUNCTION FOR DUPLICATE CPF NUMBER
  function STDTL_SEARCH_already(STDTL_SEARCH_lb_updemployeename,STDTL_SEARCH_tb_cpfnumber)
  {
    var STDTL_SEARCH_chkcpfnumber="";
    var STDTL_SEARCH_connection=eilib.db_GetConnection();
    var STDTL_SEARCH_stmt=STDTL_SEARCH_connection.createStatement();
    var STDTL_SEARCH_scriptname=STDTL_SEARCH_lb_updemployeename;  
    var STDTL_SEARCH_flname=STDTL_SEARCH_scriptname.split('_');
    var STDTL_SEARCH_fname=STDTL_SEARCH_flname[0];
    var STDTL_SEARCH_lname=STDTL_SEARCH_flname[1];
    var STDTL_SEARCH_already="SELECT EDSS_ID FROM EXPENSE_DETAIL_STAFF_SALARY WHERE EDSS_CPF_NUMBER='"+STDTL_SEARCH_tb_cpfnumber+"' "
    var STDTL_SEARCH_rs= STDTL_SEARCH_stmt.executeQuery(STDTL_SEARCH_already);
    if(STDTL_SEARCH_rs.next())
    {
      STDTL_SEARCH_chkcpfnumber=1;
    }
    else
    {
      STDTL_SEARCH_chkcpfnumber=0;
    }
    STDTL_SEARCH_rs.close();
    STDTL_SEARCH_stmt.close();
    STDTL_SEARCH_connection.close();
    return STDTL_SEARCH_chkcpfnumber;
  }
  //FUNCTION FOR RADIO BUTTON CLICK
  function STDTL_SEARCH_radio_delete(STDTL_SEARCH_expenseid)
  {
    var STDTL_SEARCH_conn=eilib.db_GetConnection();
    var STDTL_SEARCH_delete=eilib.ChkTransactionBeforeDelete(STDTL_SEARCH_conn,41,STDTL_SEARCH_expenseid)
    STDTL_SEARCH_conn.close();
    return STDTL_SEARCH_delete;
  } 
  //DELETE DATA FROM THE EXPENSE_DETAIL_STAFF_SALARY TABLE
  function STDTL_SEARCH_delete(STDTL_SEARCH_id)
  {
    var STDTL_SEARCH_conn=eilib.db_GetConnection();
    var STDTL_SEARCH_delete=eilib.DeleteRecord(STDTL_SEARCH_conn,41,STDTL_SEARCH_id)
    STDTL_SEARCH_conn.close();
    STDTL_SEARCH_conn.close();
    return STDTL_SEARCH_delete;
  } 
}
catch(err)
{
}
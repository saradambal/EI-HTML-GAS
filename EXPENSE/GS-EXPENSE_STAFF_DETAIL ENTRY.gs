//*******************************************FILE DESCRIPTION*********************************************//
//****************************************STAFF EXPENSE DETAIL ENTRY**************************************//
//DONE BY:PUNI
//VER 1.2-SD:09/10/2014 ED:09/10/2014,TRACKER NO:488:1.added script to hide preloader after menu n form loads,2.changed preloader n msgbox position
//DONE BY:SARADAMBAL
//VER 1.1-SD:21/08/2014 ED:21/08/2014,TRACKER NO:488,updated new links,autogrow
//DONE BY:LALITHA
//VER 1.0-SD:09/06/2014 ED:13/06/2014,TRACKER NO:488,Updated commit funct,Changed failure funct,Changed btn name(submit to save)
//VER 0.09-SD:06/06/2014 ED:06/06/2014,Changed jquery link ,Updated parse float for amount fields,Added preloader for already exit funct of cpf number
//VER 0.08-SD:08/04/2014 ED:09/04/2014,added preloader in beginning form loading,put parse int for checking condition,removed class name for comments,before return functn closed stmt,rs,conn,changed while comments empty means set null
//VER 0.07-SD:07/03/2014 ED:07/03/2014,removed repeated queries
//VER 0.06-SD:03/02/2014 ED:15/02/2014,implemented eilib for err msg,eilib special charater for comments,nd h3 tag,checked whether the data are inserted or not nd update the error msg for not-saved record
//VER 0.05-SD:13/01/2014 ED:13/01/2014,changed validation
//VER 0.04-SD:28/12/2013 ED:02/01/2014,removed utilities,updated title tag,connection,identifier,userstamp,removed doget function
//VER 0.03-SD:25/10/2013 ED:27/11/2013,changed validation,updated onfailure function
//VER 0.02-SD:12/10/2013 ED:12/11/2013,changed radio button for same domain name,checked unique cpf no,changed validation of cpf amount
//VER 0.01-INITIAL VERSION, SD:02/09/2013 ED:01/10/2013,TRACKER NO:488
//*********************************************************************************************************//
try
{
  //FUNCTION FOR FETCHING STAFF EMPLOYEE NAME
  function STDTL_INPUT_getempname_err()
  {
    var STDTL_INPUT_connection=eilib.db_GetConnection();
    var STDTL_INPUT_employee_stmt=STDTL_INPUT_connection.createStatement();
    var STDTL_INPUT_employee_array=[];
    var STDTL_INPUT_select_employee="SELECT EMP_ID,EMP_FIRST_NAME,EMP_LAST_NAME FROM EMPLOYEE_DETAILS WHERE EMP_ID NOT IN (SELECT EMP_ID FROM EXPENSE_DETAIL_STAFF_SALARY) AND ECN_ID=74";
    var STDTL_INPUT_employee_rs=STDTL_INPUT_employee_stmt.executeQuery( STDTL_INPUT_select_employee);
    while(STDTL_INPUT_employee_rs.next())
    {
    var STDTL_INPUT_name_id=STDTL_INPUT_employee_rs.getString(1);
    var STDTL_INPUT_name_first=STDTL_INPUT_employee_rs.getString(2);
    var STDTL_INPUT_name_last=STDTL_INPUT_employee_rs.getString(3);
    var STDTL_INPUT_employeename_concat=(STDTL_INPUT_name_first+'_'+STDTL_INPUT_name_last);
    var STDTL_INPUT_name_object={"STDTL_INPUT_names_id":STDTL_INPUT_name_id,"STDTL_INPUT_names_concat":STDTL_INPUT_employeename_concat};
    STDTL_INPUT_employee_array.push(STDTL_INPUT_name_object);     
    }
    STDTL_INPUT_employee_rs.close();
    STDTL_INPUT_employee_stmt.close();
    //FETCHING ERROR MESSAGE FROM SQL TABLE
    var STDTL_INPUT_errmsgids="239,241,240,171,314,400";
    var STDTL_INPUT_errorMsg_array=[];
    STDTL_INPUT_errorMsg_array=eilib.GetErrorMessageList(STDTL_INPUT_connection,STDTL_INPUT_errmsgids);
    var STDTL_INPUT_result={"STDTL_INPUT_employeenameid":STDTL_INPUT_employee_array,"STDTL_INPUT_errormsg":STDTL_INPUT_errorMsg_array.errormsg};      
    STDTL_INPUT_connection.close();
    return STDTL_INPUT_result;
  }
  //FUNCTION TO CHECK WHETHER THE DATA INSERTED OR NOT
   function STDTL_INPUT_getmaxprimaryid()
  {
    var STDTL_INPUT_conn=eilib.db_GetConnection();
    var STDTL_INPUT_stmt_primaryid=STDTL_INPUT_conn.createStatement();
    var STDTL_INPUT_select="SELECT MAX(EDSS_ID) AS PRIMARY_ID FROM EXPENSE_DETAIL_STAFF_SALARY";
    var STDTL_INPUT_rs_primaryid=STDTL_INPUT_stmt_primaryid.executeQuery(STDTL_INPUT_select);
    while(STDTL_INPUT_rs_primaryid.next())
    var STDTL_INPUT_primaryid=STDTL_INPUT_rs_primaryid.getString("PRIMARY_ID");
    STDTL_INPUT_rs_primaryid.close();
    STDTL_INPUT_stmt_primaryid.close();
    STDTL_INPUT_conn.close();
    return STDTL_INPUT_primaryid;        
  }
  //FUNCTION FOR TO SAVE THE STAFF DETAILS
  function STDTL_INPUT_save(STDTL_INPUT_form_employeename)
  {
    var STDTL_INPUT_connection=eilib.db_GetConnection();
    STDTL_INPUT_connection.setAutoCommit(false);
    var STDTL_INPUT_stmt=STDTL_INPUT_connection.createStatement()
    var STDTL_INPUT_radibuttonvalue=STDTL_INPUT_form_employeename.STDTL_INPUT_radioemployid;
    var STDTL_INPUT_employeenameid=STDTL_INPUT_form_employeename.STDTL_INPUT_lb_employeename; 
    var STDTL_INPUT_cpfnumber=STDTL_INPUT_form_employeename.STDTL_INPUT_tb_cpfnumber; 
    if(STDTL_INPUT_cpfnumber=='')
    {
      STDTL_INPUT_cpfnumber=null;
    }
    else
    {STDTL_INPUT_cpfnumber="'"+STDTL_INPUT_cpfnumber+"'";}
    var STDTL_INPUT_cpfamount=STDTL_INPUT_form_employeename.STDTL_INPUT_tb_cpfamount; 
    if(STDTL_INPUT_cpfamount==''||STDTL_INPUT_cpfamount==undefined)
    {
      STDTL_INPUT_cpfamount=null;
    } 
    var STDTL_INPUT_levyamount=STDTL_INPUT_form_employeename.STDTL_INPUT_tb_levyamount;
    if(STDTL_INPUT_levyamount=='')
    {
      STDTL_INPUT_levyamount=null;
    }
    var STDTL_INPUT_comments=STDTL_INPUT_form_employeename.STDTL_INPUT_ta_comments;
    if(STDTL_INPUT_comments=="")
    {
      STDTL_INPUT_comments=null;
    }
    else
    {
      STDTL_INPUT_comments='"'+eilib.ConvertSpclCharString(STDTL_INPUT_comments)+'"';    
    }
    var STDTL_INPUT_salaryamount=STDTL_INPUT_form_employeename.STDTL_INPUT_tb_salaryamount;
    if(STDTL_INPUT_radibuttonvalue==undefined)
    {
      STDTL_INPUT_employeenameid=STDTL_INPUT_employeenameid;
    }
    else
    {
      STDTL_INPUT_employeenameid=STDTL_INPUT_radibuttonvalue
    }
    var STDTL_INPUT_primaryid_before=STDTL_INPUT_getmaxprimaryid()
    var STDTL_INPUT_insertscripdata="INSERT INTO EXPENSE_DETAIL_STAFF_SALARY(EMP_ID,EDSS_CPF_NUMBER,EDSS_CPF_AMOUNT,EDSS_LEVY_AMOUNT,EDSS_SALARY_AMOUNT,EDSS_COMMENTS,ULD_ID)VALUES('"+STDTL_INPUT_employeenameid+"',"+STDTL_INPUT_cpfnumber+","+STDTL_INPUT_cpfamount+","+STDTL_INPUT_levyamount+","+STDTL_INPUT_salaryamount+","+STDTL_INPUT_comments+",(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'))";
    STDTL_INPUT_stmt.execute(STDTL_INPUT_insertscripdata); 
    STDTL_INPUT_stmt.close();
    STDTL_INPUT_connection.commit();
    STDTL_INPUT_connection.close();
    var STDTL_INPUT_primaryid_after=STDTL_INPUT_getmaxprimaryid()
    if(parseInt(STDTL_INPUT_primaryid_before)<parseInt(STDTL_INPUT_primaryid_after))
    return true;
    else
    return false;
  }
  //FUNCTION FOR ALREADY EXIST FOR CPF NUMBER
  function STDTL_INPUT_already(STDTL_INPUT_employeename,STDTL_INPUT_tb_cpfnumber)
  {
    var STDTL_INPUT_chkcpfnumber="";
    var STDTL_INPUT_connection=eilib.db_GetConnection();
    var STDTL_INPUT_stmt=STDTL_INPUT_connection.createStatement();
    var STDTL_INPUT_scriptname=STDTL_INPUT_employeename; 
    var STDTL_INPUT_flname=STDTL_INPUT_scriptname.split('_');
    var STDTL_INPUT_fname=STDTL_INPUT_flname[0];
    var STDTL_INPUT_lname=STDTL_INPUT_flname[1];
    var STDTL_INPUT_already="SELECT EDSS_ID FROM EXPENSE_DETAIL_STAFF_SALARY WHERE EDSS_CPF_NUMBER='"+STDTL_INPUT_tb_cpfnumber+"' ";
    var STDTL_INPUT_rs= STDTL_INPUT_stmt.executeQuery(STDTL_INPUT_already);
    if(STDTL_INPUT_rs.next())
    {
      STDTL_INPUT_chkcpfnumber=1;
    }
    else
    {
      STDTL_INPUT_chkcpfnumber=0;
    }
    STDTL_INPUT_rs.close();
    STDTL_INPUT_stmt.close();
    STDTL_INPUT_connection.close();
    return STDTL_INPUT_chkcpfnumber;
  }
}
catch(err)
{
}
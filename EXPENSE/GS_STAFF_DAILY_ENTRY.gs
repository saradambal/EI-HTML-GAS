//*******************************************FILE DESCRTION*********************************************//
//*****************************************STAFF EXPENSE DAILY ENTRY*********************************************//
//DONE BY:PUNI
//VER 1.9 SD:09/10/2014 ED:09/10/2014, TRACKER NO:701//1.added script to hide preloader after menu n form loads,2.changed preloader n msgbox position
//VER 1.8 SD:27/09/2014 ED:27/09/2014, TRACKER NO:701//COMMENT:31,1.implemented staff salary new sp for duplicate month record,2.removed preloader n msgbox position,3.corrected submit button validatn when clicking same emp radio btn
//DONE BY:SARADAMBAL M
//VER 1.7 SD:01/09/2014 ED:01/09/2014, TRACKER NO:701//updated new links,n script for autogrow
//VER 1.6 SD:10/06/2014 ED:10/06/2014, TRACKER NO:701//implemented script for commit,failure function
//VER 1.5 SD:07/06/2014 ED:07/06/2014, TRACKER NO:701//updated new link
//VER 1.4 SD:02/06/2014 ED:03/02/2014, TRACKER NO:701//changed amt digit for agent-4,staff-3 and salary,levy,cpf-5
//VER 1.3 SD:12/04/2014 ED:15/04/2014, TRACKER NO:701//implemented scipt for comments ,corrected validation for salary,cpf,levey amt
//VER 1.2 SD:07/04/2014 ED:07/04/2014, TRACKER NO:701//show one row after insertion in multirow creation,implemented class for datemandatory for dp and checked all invoice date,paid date
//VER 1.1 SD:10/03/2014 ED:14/03/2014, TRACKER NO:701//CLEARED ALIGNMENT ISSUE,IMPLEMENT ARR CONCEPT TO REDUCE CODING,IMPLEMENT ULD_ID INSTEAD OF USING USERSTAMP,IMPLEMENT RADIO FOR DUPLICATE EMPLOYEE NAME,IMPLEMENT EILIB FOR COMMENTS (SPECIAL CHARACTER),IMPLEMENT SP FOR STAFF_EXPENSE
//DONE BY:ELANGO
//VER 0.10 SD:28/01/2014 ED:01/02/2014,TRACKER NO:449//REDUCE THE CODING AND SCRIPT,CHECK THE VALIDATION.
//VER 0.09 SD:09/01/2014 ED:09/01/2014,TRACKER NO:449//CHECK ALL THE DEFECT AND CLEARED(SUBMIT BUTTON VALIDATION, AND HIDE THE CONTROL).
//VER 0.08 SD:03/01/2014 ED:03/01/2014,TRACKER NO:449//CHANGE THE USING DIRECT QUERY IN THE EXECUTION PART
//VER 0.07 SD:03/01/2014 ED:03/01/2014,TRACKER NO:449//CHECK FORM WHICH IS LOAD CORRECTLY.
//VER 0.06 SD:29/12/2013 ED:30/12/2013,TRACKER NO:449//CHANGE THE EILIB CONNECTION AND HEADER TAG.
//VER 0.05 SD:21/12/2013 ED:21/12/2013,TRACKER NO:449//PUT THE ERROE MESSAGE FOR EMPTY TABLE.
//VER 0.04 SD:14/12/2013 ED:14/12/2013,TRACKER NO:449//CHANGE THE SCRIPT NAME.
//VER 0.03 SD:30/11/2013 ED:30/11/2013,TRACKER NO:449//CHANGE THE VERSION  COMMENDS .
//VER 0.02 SD:25/11/2013 ED:25/11/2013,TRACKER NO:449//DELETE THE MULTIROW AFTER THE SUBMITION.
//VER 0.01-INITIAL VERSION, SD:27/08/2013 ED:04/09/2013,TRACKER NO:449
//*********************************************************************************************************//
try
{
  //AGENT COMMISSION SAVE PART//
  function STDLY_INPUT_savedata(STDLY_INPUT_formallid)
  {
    var STDLY_INPUT_lbtypeofexpense = STDLY_INPUT_formallid.STDLY_INPUT_lb_typelist;
    var STDLY_INPUT_date = eilib.SqlDateFormat(STDLY_INPUT_formallid.STDLY_INPUT_db_selectdate);
    var STDLY_INPUT_conn = eilib.db_GetConnection();
    STDLY_INPUT_conn.setAutoCommit(false);
    //SAVE AGENT COMMISSION DATA IN TABLE//
    if(STDLY_INPUT_lbtypeofexpense==39)
    {
      var STDLY_INPUT_commision_amount = STDLY_INPUT_formallid.STDLY_INPUT_tb_amount;
      var STDLY_INPUT_comments = STDLY_INPUT_formallid.STDLY_INPUT_ta_comment;
      if(STDLY_INPUT_comments=="")//COMMENTS
      {  STDLY_INPUT_comments=null;}else{
        STDLY_INPUT_comments='"'+eilib.ConvertSpclCharString(STDLY_INPUT_comments)+'"';}
      var STDLY_INPUT_commision_date=STDLY_INPUT_date;
      var insertIntoExpAgent= "INSERT INTO EXPENSE_AGENT(ULD_ID,EA_DATE,EA_COMM_AMOUNT,EA_COMMENTS) VALUES((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'),'"+STDLY_INPUT_commision_date+"',"+STDLY_INPUT_commision_amount+","+STDLY_INPUT_comments+")";
      var STDLY_INPUT_stmtagent = STDLY_INPUT_conn.createStatement();
      STDLY_INPUT_stmtagent.execute(insertIntoExpAgent);
      STDLY_INPUT_stmtagent.close();
      STDLY_INPUT_conn.commit();
      var STDLY_INPUT_flag_SAVEFLAG=1;
    }
    //SAVE SALARY ENTRY IN THE TABLE//
    if(STDLY_INPUT_lbtypeofexpense==40)
    {
      var STDLY_INPUT_empname = STDLY_INPUT_formallid.STDLY_INPUT_lb_namelist.split('-');
      if(STDLY_INPUT_formallid.STDLY_INPUT_radio_employee==undefined)
        var STDLY_INPUT_edssid=STDLY_INPUT_formallid.STDLY_INPUT_hidden_edssid; 
      else
        var STDLY_INPUT_edssid=STDLY_INPUT_formallid.STDLY_INPUT_radio_employee; 
      var STDLY_INPUT_comments = STDLY_INPUT_formallid.STDLY_INPUT_ta_salarycommentsbox;   
      var STDLY_INPUT_paid_date = eilib.SqlDateFormat(STDLY_INPUT_formallid.STDLY_INPUT_db_paiddate);
      var STDLY_INPUT_cpfradio= STDLY_INPUT_formallid.STDLY_INPUT_radio_cpfamt;  
      var STDLY_INPUT_levyradio= STDLY_INPUT_formallid.STDLY_INPUT_radio_levyamt; 
      var STDLY_INPUT_from_period = eilib.SqlDateFormat(STDLY_INPUT_formallid.STDLY_INPUT_db_fromdate);  
      var STDLY_INPUT_to_period = eilib.SqlDateFormat(STDLY_INPUT_formallid.STDLY_INPUT_db_todate);  
      var STDLY_INPUT_cpfno = STDLY_INPUT_formallid.STDLY_INPUT_tb_cpfno;  
      var STDLY_INPUT_hidenlevyamount = STDLY_INPUT_formallid.STDLY_INPUT_tb_gethiddenelevy;  
      var STDLY_INPUT_hidensalaryamount = STDLY_INPUT_formallid.STDLY_INPUT_tb_gethiddenesal;  
      var STDLY_INPUT_hidencpfamount = STDLY_INPUT_formallid.STDLY_INPUT_tb_gethiddenecpf;  
      if(STDLY_INPUT_cpfno==undefined)
      {
        STDLY_INPUT_cpfno=null;
      }
      var STDLY_INPUT_cpfamount = STDLY_INPUT_formallid.STDLY_INPUT_tb_hidecpf1; 
      if(STDLY_INPUT_cpfamount==undefined || STDLY_INPUT_cpfamount=="")
      {
        STDLY_INPUT_cpfamount=null;
      }
      if(STDLY_INPUT_cpfradio=='on')
      {
        if((STDLY_INPUT_cpfamount==undefined)||(STDLY_INPUT_cpfamount==""))
        {
          STDLY_INPUT_cpfamount=STDLY_INPUT_hidencpfamount;
        }
      }
      var STDLY_INPUT_levyamount = STDLY_INPUT_formallid.STDLY_INPUT_tb_hidelevy1; 
      if(STDLY_INPUT_levyamount==undefined || STDLY_INPUT_levyamount=="" )
      {
        STDLY_INPUT_levyamount=null;
      }
      if(STDLY_INPUT_levyradio=='on')
      {
        if((STDLY_INPUT_levyamount==undefined)||(STDLY_INPUT_levyamount==""))
        {
          STDLY_INPUT_levyamount=STDLY_INPUT_hidenlevyamount;
        }
      }
      var STDLY_INPUT_salaryamount = STDLY_INPUT_formallid.STDLY_INPUT_tb_hidesal1;  
      if(STDLY_INPUT_salaryamount==undefined || STDLY_INPUT_salaryamount=="")
      {
        STDLY_INPUT_salaryamount=null;
      }
      if((STDLY_INPUT_salaryamount==undefined)||(STDLY_INPUT_salaryamount==""))
      {
        STDLY_INPUT_salaryamount=STDLY_INPUT_hidensalaryamount;
      }
      if(STDLY_INPUT_comments=="")//COMMENTS
      {  STDLY_INPUT_comments=null;}else{
        STDLY_INPUT_comments='"'+eilib.ConvertSpclCharString(STDLY_INPUT_comments)+'"';}
      var insert_salary_detailswithcomment = "CALL SP_STAFFDLY_STAFF_SALARY_INSERT("+STDLY_INPUT_edssid+",'"+STDLY_INPUT_paid_date+"','"+STDLY_INPUT_from_period+"','"+STDLY_INPUT_to_period+"',"+STDLY_INPUT_cpfamount+","+STDLY_INPUT_levyamount+","+STDLY_INPUT_salaryamount+","+STDLY_INPUT_comments+",'"+UserStamp+"',@SUCCESS_MSG)";
      var stmtinsetall = STDLY_INPUT_conn.createStatement();
      stmtinsetall.execute(insert_salary_detailswithcomment);
      stmtinsetall.close();
      var STDLY_INPUT_stmt_bscprfsveflag=STDLY_INPUT_conn.createStatement();
      var STDLY_INPUT_flag_bscprfsveselect="SELECT @SUCCESS_MSG";
      var STDLY_INPUT_flag_bscprfsvers=STDLY_INPUT_stmt_bscprfsveflag.executeQuery(STDLY_INPUT_flag_bscprfsveselect);
      while(STDLY_INPUT_flag_bscprfsvers.next())
        var STDLY_INPUT_flag_SAVEFLAG=STDLY_INPUT_flag_bscprfsvers.getString(1);
      STDLY_INPUT_flag_bscprfsvers.close();
      STDLY_INPUT_stmt_bscprfsveflag.close();
      STDLY_INPUT_conn.commit();
      var STDLY_INPUT_arr_refresh=STDLY_INPUT_loadfistlistbox();
    }
    STDLY_INPUT_conn.close();
    return [STDLY_INPUT_flag_SAVEFLAG,STDLY_INPUT_arr_refresh];
  }
  //SAVE THE STAFF DETAILS//
  function STDLY_INPUT_savestaff(STDLY_INPUT_formallid)
  { 
    var STDLY_INPUT_conn = eilib.db_GetConnection();
    var STDLY_INPUT_expenselist=[];
    var STDLY_INPUT_invoiceDate=[];
    var STDLY_INPUT_in_items=[];
    var STDLY_INPUT_invoiceAmount=[];
    var STDLY_INPUT_comments=[];
    var STDLY_INPUT_comments1=[];
    var STDLY_INPUT_expenselist=STDLY_INPUT_formallid.STDLY_INPUT_lb_category;
    var STDLY_INPUT_invoiceDate=STDLY_INPUT_formallid.STDLY_INPUT_db_invdate;
    var STDLY_INPUT_in_items=STDLY_INPUT_formallid.STDLY_INPUT_ta_invitem;
    var STDLY_INPUT_invoiceAmount=STDLY_INPUT_formallid.STDLY_INPUT_lb_incamtrp;
    var STDLY_INPUT_comments=STDLY_INPUT_formallid.STDLY_INPUT_tb_invfrom;
    var STDLY_INPUT_comments1=STDLY_INPUT_formallid.STDLY_INPUT_tb_comments;
    var STDLY_INPUT_lbtypeofexpense = STDLY_INPUT_formallid.STDLY_INPUT_lb_typelist;
    var STDLY_INPUT_counting=STDLY_INPUT_comments1;
    var STDLY_INPUT_array_length=STDLY_INPUT_counting.length;
    var STDLY_INPUT_array_length=STDLY_INPUT_counting.length;   
    var STDLY_INPUT_comments_split='';var STDLY_INPUT_invfrom_split='';var STDLY_INPUT_invitem_split='';
    if((Array.isArray(STDLY_INPUT_comments1))==true){
      for(var i=0;i<STDLY_INPUT_comments1.length;i++)
      {
        if(STDLY_INPUT_comments1[i]==''){
          if(i==0)
            STDLY_INPUT_comments_split +=' '
            else
              STDLY_INPUT_comments_split +='^^'+' '; }
        else{
          if(i==0)
            STDLY_INPUT_comments_split +=eilib.ConvertSpclCharString(STDLY_INPUT_comments1[i]);
          else
            STDLY_INPUT_comments_split +='^^'+eilib.ConvertSpclCharString(STDLY_INPUT_comments1[i]);
        }  
        if(i==0){
          STDLY_INPUT_invitem_split +=eilib.ConvertSpclCharString(STDLY_INPUT_in_items[i]);
          STDLY_INPUT_invfrom_split +=eilib.ConvertSpclCharString(STDLY_INPUT_comments[i]);
        }
        else{
          STDLY_INPUT_invitem_split +='^^'+eilib.ConvertSpclCharString(STDLY_INPUT_in_items[i]);
          STDLY_INPUT_invfrom_split +='^^'+eilib.ConvertSpclCharString(STDLY_INPUT_comments[i]);
        }
        STDLY_INPUT_invoiceDate[i]=eilib.SqlDateFormat(STDLY_INPUT_invoiceDate[i]);
        
      }}
    else
    {
      if(STDLY_INPUT_comments1=='')
        STDLY_INPUT_comments_split=' ';
      else
        STDLY_INPUT_comments_split=eilib.ConvertSpclCharString(STDLY_INPUT_comments1);
      STDLY_INPUT_invoiceDate=eilib.SqlDateFormat(STDLY_INPUT_invoiceDate);
      STDLY_INPUT_invitem_split=eilib.ConvertSpclCharString(STDLY_INPUT_in_items);
      STDLY_INPUT_invfrom_split=eilib.ConvertSpclCharString(STDLY_INPUT_comments);
    }
    var insertwithComment = "CALL SP_STAFFDLY_STAFF_INSERT('"+STDLY_INPUT_expenselist+"','"+STDLY_INPUT_invoiceDate+"','"+STDLY_INPUT_invoiceAmount+"','"+STDLY_INPUT_invitem_split+"','"+STDLY_INPUT_invfrom_split+"','"+STDLY_INPUT_comments_split+"','"+UserStamp+"',@FLAG_INSERT)";
    var STDLY_INPUT_stmtstaff = STDLY_INPUT_conn.createStatement();
    STDLY_INPUT_stmtstaff.execute(insertwithComment);
    STDLY_INPUT_stmtstaff.close();
    var insertwithComment = "SELECT @FLAG_INSERT";
    var STDLY_INPUT_stmtstaff_select = STDLY_INPUT_conn.createStatement();    
    var STDLY_INPUT_rs_flag = STDLY_INPUT_stmtstaff_select.executeQuery("SELECT @FLAG_INSERT");
    if(STDLY_INPUT_rs_flag.next())
      var  STDLY_INPUT_flag_staff= STDLY_INPUT_rs_flag.getString("@FLAG_INSERT");
    STDLY_INPUT_rs_flag.close();
    STDLY_INPUT_stmtstaff_select.close();
    STDLY_INPUT_conn.close();
    return [STDLY_INPUT_flag_staff];
  }
  /*---------------------------------------------------FUNCTION TO GET ECN_DATA ERRORMSG AND EMPLOYEE NAME------------------------------*/
  function STDLY_INPUT_loadfistlistbox()
  {
    var STDLY_INPUT_expenseArray = [];
    var STDLY_INPUT_expenseArrayid = [];
    var STDLY_INPUT_expenseArraydata = [];
    var STDLY_INPUT_checktable = [];
    var STDLY_INPUT_alldataArray = [];
    var STDLY_INPUT_conn = eilib.db_GetConnection();
    var STDLY_INPUT_selectTypeofexpense = "SELECT ECN_ID,ECN_DATA FROM EXPENSE_CONFIGURATION WHERE CGN_ID IN (26,23) ORDER BY ECN_ID ASC";
    var STDLY_INPUT_stmt = STDLY_INPUT_conn.createStatement();
    var STDLY_INPUT_typeofexpense = STDLY_INPUT_stmt.executeQuery(STDLY_INPUT_selectTypeofexpense);
    while(STDLY_INPUT_typeofexpense.next())
    {
      var STDLY_INPUT_expenselist = STDLY_INPUT_typeofexpense.getString("ECN_DATA");
      var STDLY_INPUT_expenselistid = STDLY_INPUT_typeofexpense.getString("ECN_ID");
      STDLY_INPUT_expenseArraydata.push(STDLY_INPUT_expenselist);
      STDLY_INPUT_expenseArrayid.push(STDLY_INPUT_expenselistid);
      STDLY_INPUT_expenseArray.push(STDLY_INPUT_expenseArraydata)
      STDLY_INPUT_expenseArray.push(STDLY_INPUT_expenseArrayid)
    }
    STDLY_INPUT_typeofexpense.close();
    var STDLY_INPUT_dataArray=[];
    var STDLY_INPUT_detlstaffdaily="SELECT DISTINCT CONCAT(ED.EMP_FIRST_NAME,' ',ED.EMP_LAST_NAME) AS EMPLOYEE_NAME,ED.EMP_ID,EDSS.EDSS_ID,EDSS.EDSS_CPF_NUMBER,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EDSS.EDSS_CPF_AMOUNT FROM EMPLOYEE_DETAILS ED,EXPENSE_DETAIL_STAFF_SALARY EDSS WHERE ED.EMP_ID=EDSS.EMP_ID";
    var STDLY_INPUT_rs = STDLY_INPUT_stmt.executeQuery(STDLY_INPUT_detlstaffdaily);
    while(STDLY_INPUT_rs.next()) {
      STDLY_INPUT_checktable.push({STDLY_INPUT_employeename:STDLY_INPUT_rs.getString("EMPLOYEE_NAME"),STDLY_INPUT_empid:STDLY_INPUT_rs.getString("EMP_ID"),STDLY_INPUT_employeeid:STDLY_INPUT_rs.getString("EDSS_ID"),STDLY_INPUT_cpfno:STDLY_INPUT_rs.getString("EDSS_CPF_NUMBER"),STDLY_INPUT_levyamt:STDLY_INPUT_rs.getString("EDSS_LEVY_AMOUNT"),STDLY_INPUT_salamt:STDLY_INPUT_rs.getString("EDSS_SALARY_AMOUNT"),STDLY_INPUT_cpfamt:STDLY_INPUT_rs.getString("EDSS_CPF_AMOUNT")});
    }
    STDLY_INPUT_rs.close();
    var STDLY_INPUT_empdtlArray=[];
    var STDLY_INPUT_empdetails="SELECT EMP_ID FROM EMPLOYEE_DETAILS";
    var STDLY_INPUT_empdtlrs = STDLY_INPUT_stmt.executeQuery(STDLY_INPUT_empdetails);
    while(STDLY_INPUT_empdtlrs.next()) {
      STDLY_INPUT_empdtlArray.push(STDLY_INPUT_empdtlrs.getString('EMP_ID'));
    }
    STDLY_INPUT_empdtlrs.close();
    var STDLY_INPUT_errmsgids="337,169,105,400";
    var STDLY_INPUT_emcmsgArray=[];
    STDLY_INPUT_emcmsgArray=eilib.GetErrorMessageList(STDLY_INPUT_conn,STDLY_INPUT_errmsgids);
    STDLY_INPUT_alldataArray.push(STDLY_INPUT_expenseArray);
    STDLY_INPUT_alldataArray.push(STDLY_INPUT_checktable);
    STDLY_INPUT_alldataArray.push(STDLY_INPUT_emcmsgArray.errormsg);
    STDLY_INPUT_alldataArray.push(STDLY_INPUT_empdtlArray);
    STDLY_INPUT_stmt.close();
    STDLY_INPUT_conn.close();
    return STDLY_INPUT_alldataArray;
  }
}
catch(err)
{
}
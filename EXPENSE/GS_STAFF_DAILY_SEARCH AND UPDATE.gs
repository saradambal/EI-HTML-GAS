//*******************************************FILE DESCRIPTION*********************************************//
//*******************************************STAFF EXPENSE DAILY ENTRY: SEARCH/UPDATE/DELETE*********************************************//
//DONE BY:PUNI
//VER 1.7-SD:09/10/2014 ED:09/10/2014,TRACKER NO:459:1.added script to hide preloader after menu n form loads,2.changed preloader n msgbox position
//VER 1.6-SD:27/09/2014 ED:27/09/2014,TRACKER NO:459,comment 51,1.removed trim for invitem n comments textarea search,2.hided del n srch btn while clicking srch btn,3.corrected issue when clicking cpf no srch,4.implemented staff salary new sp fr the duplicate month record
//DONE BY:SARADAMBAL
//VER 1.5-SD:13/08/2014 ED:13/08/2014,TRACKER NO:459,implemented script for reset normal size after updation,updated new links,checked after autocommit  
//VER 1.4-SD:11/06/2014 ED:11/06/2014,TRACKER NO:459,implemented script for commit and failure function ,implemented script show msg box for update after loading flex table,added general rule for comts,inv item
//VER 1.3 SD:03/06/2014 ED:03/06/2014, TRACKER NO:459//corrected err msg,updated link,change amt digit agent-4,staff exp-3,staff sal-5 
//VER 1.2 SD:12/04/2014 ED:21/03/2014, TRACKER NO:459//put maxdate as sysdate in srch form,checked migration data with updation and deletion,corrected validation for salaary,cpf n levy amt,put class for dp
//VER 1.1 SD:28/03/2014 ED:28/03/2014, TRACKER NO:459//CLOSED HEAD TAG
//VER 1.0 SD:25/03/2014 ED:25/03/2014, TRACKER NO:459//CHANGED IDENTIFIER
//VER 0.09 SD:10/03/2014 ED:15/03/2014,cleared alignment issue,corrected flex table width,reduced coding using arr concept,replaced userstamp into uld_loginid,removed hardcore,implement eilib for special character,filter comments by date,show values from htmltable instead of getting from db,removed one function,errormsg corrected
//VER 0.08 SD:17/02/2014 ED:17/02/2014,implemented eilib for deletion
//VER 0.07 SD:13/02/2014 ED:13/02/2014,implemented sp for deletion,removed deletion query,removed script for errormsg and update error msg for non-deletion record,removed empty space--DONE BY SARADAMBAL
//DONE BY:ELANGO
//VER 0.06 SD:09/01/2014 ED:09/01/2014,TRACKER NO:459//CHANGE THE INITIAL  CONDITION  OR THE FORM.
//VER 0.05 SD:30/12/2013 ED:30/12/2013,TRACKER NO:459//CHANGE THE HEADER TAG AND EILIB  CONNECTION.
//VER 0.04 SD:14/12/2013 ED:14/12/2013,TRACKER NO:459//CHANGE THE SCRIPT NAME.
//VER 0.03 SD:30/11/2013 ED:30/11/2013,TRACKER NO:459// CHANGE THE COMMENTS .
//VER 0.02 SD:18/11/2013 ED:22/11/2013,TRACKER NO:459//CHANGE THE WAY TO LOAD THE UPDATEFORMS,CHANGES THE TIMEZONE FORMATE,VALIDATION ,CHANGE THE DATEFORMAT IN DATEPICKER AND  FLEXTABLE.
//VER 0.01-INITIAL VERSION, SD:2/09/2013 ED:14/9/2013,TRACKER NO:459
//*********************************************************************************************************//
try
{  
  //GET DATA BY AGENT SEARCH......................
  function STDLY_SEARCH_searchbyagentcommission(STDLY_SEARCH_searchoptionmatch,STDLY_SEARCH_getstartdate,STDLY_SEARCH_getenddate,STDLY_SEARCH_fromamount,STDLY_SEARCH_toamount,STDLY_SEARCH_searchcomments)
  {
    var STDLY_SEARCH_fulltable=[];
    var STDLY_SEARCH_startdate= eilib.SqlDateFormat(STDLY_SEARCH_getstartdate);
    var STDLY_SEARCH_enddate= eilib.SqlDateFormat(STDLY_SEARCH_getenddate);
    var STDLY_SEARCH_conn=eilib.db_GetConnection();
    //SEARCH BY AGENT AMOUNT...................... 
    var STDLY_SEARCH_agent_query=[];
    var STDLY_SEARCH_stmt = STDLY_SEARCH_conn.createStatement();
    if(STDLY_SEARCH_searchcomments!='' && STDLY_SEARCH_searchcomments!=null)
      STDLY_SEARCH_searchcomments=eilib.ConvertSpclCharString(STDLY_SEARCH_searchcomments);   
    STDLY_SEARCH_agent_query[78] = "SELECT EA.EA_ID,EA.EA_DATE,EA.EA_COMM_AMOUNT,EA.EA_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EA.EA_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EXPENSE_AGENT EA,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EA.ULD_ID AND (EA_DATE BETWEEN '"+STDLY_SEARCH_startdate+"' AND '"+STDLY_SEARCH_enddate+"') AND (EA_COMM_AMOUNT BETWEEN '"+STDLY_SEARCH_fromamount+"' AND '"+STDLY_SEARCH_toamount+"')ORDER BY EA_DATE ASC";
    STDLY_SEARCH_agent_query[77]  = "SELECT EA.EA_ID,EA.EA_DATE,EA.EA_COMM_AMOUNT,EA.EA_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EA.EA_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EXPENSE_AGENT EA,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EA.ULD_ID AND (EA_COMMENTS='"+STDLY_SEARCH_searchcomments+"') ORDER BY EA_DATE ASC";
    STDLY_SEARCH_agent_query[76]  = "SELECT EA.EA_ID,EA.EA_DATE,EA.EA_COMM_AMOUNT,EA.EA_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EA.EA_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EXPENSE_AGENT EA,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EA.ULD_ID AND (EA_DATE BETWEEN '"+STDLY_SEARCH_startdate+"' AND '"+STDLY_SEARCH_enddate+"') ORDER BY EA_DATE ASC"; 
    var STDLY_SEARCH_agentvalue = STDLY_SEARCH_stmt.executeQuery( STDLY_SEARCH_agent_query[STDLY_SEARCH_searchoptionmatch] );
    while(STDLY_SEARCH_agentvalue.next())
    {           
      var STDLY_SEARCH_agentexepnse_id = STDLY_SEARCH_agentvalue.getString("EA_ID");
      var STDLY_SEARCH_agent_date = STDLY_SEARCH_agentvalue.getString("EA_DATE");
      if(STDLY_SEARCH_agent_date==null){ STDLY_SEARCH_agent_date=""; }      
      var STDLY_SEARCH_agent_amount = STDLY_SEARCH_agentvalue.getString("EA_COMM_AMOUNT");
      if(STDLY_SEARCH_agent_amount==null){ STDLY_SEARCH_agent_amount=""; }      
      var STDLY_SEARCH_agent_comments = STDLY_SEARCH_agentvalue.getString("EA_COMMENTS");
      if(STDLY_SEARCH_agent_comments==null){ STDLY_SEARCH_agent_comments=""; }      
      var STDLY_SEARCH_agent_userstamp = STDLY_SEARCH_agentvalue.getString("ULD_LOGINID");
      var STDLY_SEARCH_agent_timestamp = STDLY_SEARCH_agentvalue.getString("TIMESTMP");
      var STDLY_SEARCH_result={'STDLY_SEARCH_agentid':STDLY_SEARCH_agentexepnse_id,'STDLY_SEARCH_agentdate':STDLY_SEARCH_agent_date,'STDLY_SEARCH_agentcommamount':STDLY_SEARCH_agent_amount,'STDLY_SEARCH_agentcomments':STDLY_SEARCH_agent_comments,'STDLY_SEARCH_agentuserstamp':STDLY_SEARCH_agent_userstamp,'STDLY_SEARCH_agenttimestamp':STDLY_SEARCH_agent_timestamp}
      STDLY_SEARCH_fulltable.push(STDLY_SEARCH_result);
    }
    STDLY_SEARCH_agentvalue.close();
    STDLY_SEARCH_stmt.close();
    STDLY_SEARCH_conn.close();
    return STDLY_SEARCH_fulltable;
  }
  //GET THE CPF NO FOR SEARCHING.................. 
  function STDLY_SEARCH_loadcpfno(STDLY_SEARCH_salarysearchoption)
  {
    var STDLY_SEARCH_conn=eilib.db_GetConnection();
    var STDLY_SEARCH_cpfnostmt = STDLY_SEARCH_conn.createStatement();
    var STDLY_SEARCH_cpfnoarray=[];
    var STDLY_SEARCH_cpfno_selectquery = "SELECT DISTINCT EDSS_CPF_NUMBER FROM EXPENSE_DETAIL_STAFF_SALARY EDSS,EXPENSE_STAFF_SALARY ESS WHERE (ESS.EDSS_ID=EDSS.EDSS_ID) AND EDSS_CPF_NUMBER IS NOT NULL ORDER BY EDSS_CPF_NUMBER ASC";
    var STDLY_SEARCH_cpfresult = STDLY_SEARCH_cpfnostmt.executeQuery(STDLY_SEARCH_cpfno_selectquery);
    while(STDLY_SEARCH_cpfresult.next())
    {
      var STDLY_SEARCH_cpfno = STDLY_SEARCH_cpfresult.getString("EDSS_CPF_NUMBER");
      STDLY_SEARCH_cpfnoarray.push(STDLY_SEARCH_cpfno);
    }
    STDLY_SEARCH_cpfresult.close();STDLY_SEARCH_cpfnostmt.close();STDLY_SEARCH_conn.close();
    return STDLY_SEARCH_cpfnoarray;
  }
  //UPDATE SALARY ENTRY FORM  DATAS........................... 
  function STDLY_SEARCH_savealldetails(STDLY_SEARCH_updateformid)
  {
    var STDLY_SEARCH_lbtypeofexpense = STDLY_SEARCH_updateformid.STDLY_SEARCH_lb_typelist;
    var STDLY_SEARCH_conn=eilib.db_GetConnection();
    STDLY_SEARCH_conn.setAutoCommit(false);
    if(STDLY_SEARCH_lbtypeofexpense==39)
    {
      var STDLY_SEARCH_id = STDLY_SEARCH_updateformid.STDLY_SEARCH_tb_idhide;
      var STDLY_SEARCH_commission_amount = STDLY_SEARCH_updateformid.STDLY_SEARCH_tb_amount;
      var STDLY_SEARCH_comments = STDLY_SEARCH_updateformid.STDLY_SEARCH_ta_comment;
      if(STDLY_SEARCH_comments=="")//COMMENTS
      {  STDLY_SEARCH_comments=null;}else{
        STDLY_SEARCH_comments='"'+eilib.ConvertSpclCharString(STDLY_SEARCH_comments)+'"';}
      var STDLY_SEARCH_date = eilib.SqlDateFormat(STDLY_SEARCH_updateformid.STDLY_SEARCH_db_selectdate);
      var STDLY_SEARCH_updateagent = STDLY_SEARCH_conn.createStatement();
      var STDLY_SEARCH_searchoption=STDLY_SEARCH_updateformid.STDLY_SEARCH_lb_searchoption;      
      var STDLY_SEARCH_agentupdatequery = "UPDATE EXPENSE_AGENT SET EA_DATE='"+STDLY_SEARCH_date+"',EA_COMM_AMOUNT='"+STDLY_SEARCH_commission_amount+"',EA_COMMENTS="+STDLY_SEARCH_comments+",ULD_ID=(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"') WHERE EA_ID='"+STDLY_SEARCH_id+"'";
      STDLY_SEARCH_updateagent.execute(STDLY_SEARCH_agentupdatequery);
      STDLY_SEARCH_updateagent.close();
    }    
    if(STDLY_SEARCH_lbtypeofexpense==40)
    {
      var STDLY_SEARCH_id = STDLY_SEARCH_updateformid.STDLY_SEARCH_tb_idhide;
      var STDLY_SEARCH_empname = STDLY_SEARCH_updateformid.STDLY_SEARCH_lb_namelist;
      var STDLY_SEARCH_comments = STDLY_SEARCH_updateformid.STDLY_SEARCH_ta_salarycommentsbox;   
      var STDLY_SEARCH_paiddate =eilib.SqlDateFormat( STDLY_SEARCH_updateformid.STDLY_SEARCH_db_paiddate);
      var STDLY_SEARCH_cpfradio= STDLY_SEARCH_updateformid.STDLY_SEARCH_radio_cpfamt;  
      var STDLY_SEARCH_levyradio= STDLY_SEARCH_updateformid.STDLY_SEARCH_radio_levyamt; 
      var STDLY_SEARCH_fromperiod =eilib.SqlDateFormat( STDLY_SEARCH_updateformid.STDLY_SEARCH_db_fromdate);  
      var STDLY_SEARCH_toperiod = eilib.SqlDateFormat(STDLY_SEARCH_updateformid.STDLY_SEARCH_db_todate);  
      var STDLY_SEARCH_hidenlevyamount = STDLY_SEARCH_updateformid.STDLY_SEARCH_tb_gethiddenelevy;  
      var STDLY_SEARCH_hidensalaryamount = STDLY_SEARCH_updateformid.STDLY_SEARCH_tb_gethiddenesal;  
      var STDLY_SEARCH_hidencpfamount = STDLY_SEARCH_updateformid.STDLY_SEARCH_tb_gethiddenecpf;  
      var STDLY_SEARCH_cpfamount = STDLY_SEARCH_updateformid.STDLY_SEARCH_tb_hidecpf1;
      var STDLY_SEARCH_searchoption=STDLY_SEARCH_updateformid.STDLY_SEARCH_lb_salarysearchoption;
      if(STDLY_SEARCH_comments=="")//COMMENTS
      {  STDLY_SEARCH_comments=null;}else{
        STDLY_SEARCH_comments='"'+eilib.ConvertSpclCharString(STDLY_SEARCH_comments)+'"';}
      if(STDLY_SEARCH_cpfamount==undefined)
      {
        STDLY_SEARCH_cpfamount==null;
      }
      if(STDLY_SEARCH_cpfradio=='current')
      {
        if((STDLY_SEARCH_cpfamount==undefined)||(STDLY_SEARCH_cpfamount==""))
        {
          STDLY_SEARCH_cpfamount=STDLY_SEARCH_hidencpfamount;
        }
      }
      if(STDLY_SEARCH_cpfradio==undefined)
      {
        STDLY_SEARCH_cpfamount=null;
      }
      var STDLY_SEARCH_levyamount = STDLY_SEARCH_updateformid.STDLY_SEARCH_tb_hidelevy1;  
      if(STDLY_SEARCH_levyamount==undefined)
      {
        STDLY_SEARCH_levyamount==null;
      }
      if(STDLY_SEARCH_levyradio=='current')
      {
        if((STDLY_SEARCH_levyamount==undefined)||(STDLY_SEARCH_levyamount==""))
        {
          STDLY_SEARCH_levyamount=STDLY_SEARCH_hidenlevyamount;
        }
      }
      if(STDLY_SEARCH_levyradio==undefined)
      {
        STDLY_SEARCH_levyamount=null;
      }
      var STDLY_SEARCH_salaryamount = STDLY_SEARCH_updateformid.STDLY_SEARCH_tb_hidesal1;  
      if(STDLY_SEARCH_salaryamount==undefined)
      {
        STDLY_SEARCH_salaryamount==null;
      }
      if((STDLY_SEARCH_salaryamount==undefined)||(STDLY_SEARCH_salaryamount==""))
      {
        STDLY_SEARCH_salaryamount=STDLY_SEARCH_hidensalaryamount;
      }
      var STDLY_SEARCH_updatesalary_all="CALL SP_STAFFDLY_STAFF_SALARY_UPDATE("+STDLY_SEARCH_id+",'"+STDLY_SEARCH_paiddate+"','"+STDLY_SEARCH_fromperiod+"','"+STDLY_SEARCH_toperiod+"',"+STDLY_SEARCH_cpfamount+","+STDLY_SEARCH_levyamount+","+STDLY_SEARCH_salaryamount+","+STDLY_SEARCH_comments+",'"+UserStamp+"',@SUCCESS_MSG);"
      var STDLY_SEARCH_updateform = STDLY_SEARCH_conn.createStatement();
      STDLY_SEARCH_updateform.execute(STDLY_SEARCH_updatesalary_all);
      STDLY_SEARCH_updateform.close();
      var STDLY_SEARCH_stmt_bscprfsveflag=STDLY_SEARCH_conn.createStatement();
      var STDLY_SEARCH_flag_bscprfsveselect="SELECT @SUCCESS_MSG";
      var STDLY_SEARCH_flag_bscprfsvers=STDLY_SEARCH_stmt_bscprfsveflag.executeQuery(STDLY_SEARCH_flag_bscprfsveselect);
      while(STDLY_SEARCH_flag_bscprfsvers.next())
        var STDLY_SEARCH_flag_UPDFLAG=STDLY_SEARCH_flag_bscprfsvers.getString(1);
      STDLY_SEARCH_flag_bscprfsvers.close();
      STDLY_SEARCH_stmt_bscprfsveflag.close();
      
    }
    if(STDLY_SEARCH_lbtypeofexpense==41)
    {
      var STDLY_SEARCH_id = STDLY_SEARCH_updateformid.STDLY_SEARCH_tb_idhide;
      var STDLY_SEARCH_lbstaffexpense = STDLY_SEARCH_updateformid.STDLY_INPUT_lb_category;
      var STDLY_SEARCH_dbinvoicedate = eilib.SqlDateFormat(STDLY_SEARCH_updateformid.STDLY_SEARCH_db_invdate);
      var STDLY_SEARCH_staff_fullamount = STDLY_SEARCH_updateformid.STDLY_SEARCH_lb_incamtrp;
      var STDLY_SEARCH_tbinvoiceitems = STDLY_SEARCH_updateformid.STDLY_SEARCH_ta_invitem;
      var STDLY_SEARCH_tbinvoicefrom = STDLY_SEARCH_updateformid.STDLY_SEARCH_tb_invfrom;
      var STDLY_SEARCH_tbcomments = STDLY_SEARCH_updateformid.STDLY_SEARCH_tb_comments;
      var STDLY_SEARCH_esid = STDLY_SEARCH_updateformid.STDLY_SEARCH_radio_salaryflexradiobuttons;
      if(STDLY_SEARCH_tbinvoicefrom!='' && STDLY_SEARCH_tbinvoicefrom!=null)
        STDLY_SEARCH_tbinvoicefrom=eilib.ConvertSpclCharString(STDLY_SEARCH_tbinvoicefrom); 
      if(STDLY_SEARCH_tbinvoiceitems!='' && STDLY_SEARCH_tbinvoiceitems!=null)
        STDLY_SEARCH_tbinvoiceitems=eilib.ConvertSpclCharString(STDLY_SEARCH_tbinvoiceitems); 
      if(STDLY_SEARCH_tbcomments=="")//COMMENTS
      {  STDLY_SEARCH_tbcomments=null;}else{
        STDLY_SEARCH_tbcomments='"'+eilib.ConvertSpclCharString(STDLY_SEARCH_tbcomments)+'"';}
      var STDLY_SEARCH_id = STDLY_SEARCH_updateformid.STDLY_SEARCH_tb_idhide;
      var STDLY_SEARCH_searchoption=STDLY_SEARCH_updateformid.STDLY_SEARCH_lb_staffsearchoption
      //------------------------------------ UPDATE EXPENSE CAR TABLE ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
      var STDLY_SEARCH_updatestaff = STDLY_SEARCH_conn.createStatement();
      var STDLY_SEARCH_staffexpense_update_query = "UPDATE EXPENSE_STAFF SET ES_INVOICE_DATE='"+STDLY_SEARCH_dbinvoicedate+"',ES_INVOICE_AMOUNT='"+STDLY_SEARCH_staff_fullamount+"',ES_INVOICE_ITEMS='"+STDLY_SEARCH_tbinvoiceitems+"',ES_INVOICE_FROM='"+STDLY_SEARCH_tbinvoicefrom+"',ES_COMMENTS="+STDLY_SEARCH_tbcomments+",ULD_ID=(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'),ECN_ID="+STDLY_SEARCH_lbstaffexpense+" WHERE ES_ID="+STDLY_SEARCH_esid+"";
      STDLY_SEARCH_updatestaff.execute(STDLY_SEARCH_staffexpense_update_query);
      STDLY_SEARCH_updatestaff.close();
    }
    STDLY_SEARCH_conn.commit();
    STDLY_SEARCH_conn.close();
    var STDLY_INPUT_arr_comments=[];
    if((STDLY_SEARCH_searchoption==77)||(STDLY_SEARCH_searchoption==85)||(STDLY_SEARCH_searchoption==79)||(STDLY_SEARCH_searchoption==82)||(STDLY_SEARCH_searchoption==83))
    STDLY_INPUT_arr_comments=STDLY_SEARCH_func_comments(STDLY_SEARCH_updateformid.STDLY_SEARCH_db_startdate,STDLY_SEARCH_updateformid.STDLY_SEARCH_db_enddate,STDLY_SEARCH_lbtypeofexpense,STDLY_SEARCH_searchoption)
    return [STDLY_INPUT_arr_comments,STDLY_SEARCH_searchoption,STDLY_SEARCH_flag_UPDFLAG];
  }
  //DELETE THE  RECORD IN THE TABLE...........................
  function STDLY_SEARCH_deleterow(STDLY_SEARCH_deleteid,STDLY_SEARCH_typrval,STDLY_SEARCH_db_startdate,STDLY_SEARCH_db_enddate,STDLY_SEARCH_srchoption) {    
    var STDLY_SEARCH_conn=eilib.db_GetConnection();
    var STDLY_SEARCH_deleteagent = STDLY_SEARCH_conn.createStatement();
    var STDLY_SEARCH_twodimen={39:['EXPENSE_AGENT',44],40:['EXPENSE_STAFF_SALARY',42],41:['EXPENSE_STAFF',43]}
    if(STDLY_SEARCH_typrval==40){
      STDLY_SEARCH_deleteid=STDLY_SEARCH_deleteid.split('-');
      STDLY_SEARCH_deleteid=STDLY_SEARCH_deleteid[0];}
    var STDLY_SEARCH_flag_delete=eilib.DeleteRecord(STDLY_SEARCH_conn,STDLY_SEARCH_twodimen[STDLY_SEARCH_typrval][1],STDLY_SEARCH_deleteid)
    STDLY_SEARCH_conn.close();
    var STDLY_INPUT_arr_comments=[];     
    if((STDLY_SEARCH_srchoption==77)||(STDLY_SEARCH_srchoption==85)||(STDLY_SEARCH_srchoption==79)||(STDLY_SEARCH_srchoption==82)||(STDLY_SEARCH_srchoption==83))
    STDLY_INPUT_arr_comments=STDLY_SEARCH_func_comments(STDLY_SEARCH_db_startdate,STDLY_SEARCH_db_enddate,STDLY_SEARCH_typrval,STDLY_SEARCH_srchoption)
    return [STDLY_SEARCH_flag_delete,STDLY_INPUT_arr_comments];
  } 
  //GET DATA FOR SALARY SEARCH OPTIONS.................................FROM SALARY ENTRY...........
  function STDLY_SEARCH_searchbysalaryentry(STDLY_SEARCH_salaryoptionvalmatch,STDLY_SEARCH_getstartdate,STDLY_SEARCH_getenddate,STDLY_SEARCH_fromamount,STDLY_SEARCH_toamount,STDLY_SEARCH_selectedcpfno,STDLY_SEARCH_selectedempname,STDLY_SEARCH_searchcomments)
  { 
    var STDLY_SEARCH_startdate=eilib.SqlDateFormat(STDLY_SEARCH_getstartdate);
    var STDLY_SEARCH_enddate=eilib.SqlDateFormat(STDLY_SEARCH_getenddate)
    var STDLY_SEARCH_sendallsalarydata=[];
    var STDLY_SEARCH_conn=eilib.db_GetConnection();
    var STDLY_SEARCH_salary_selectquery=[];
    var STDLY_SEARCH_searchstm = STDLY_SEARCH_conn.createStatement();
    if(STDLY_SEARCH_searchcomments!='' && STDLY_SEARCH_searchcomments!=null)
      STDLY_SEARCH_searchcomments=eilib.ConvertSpclCharString(STDLY_SEARCH_searchcomments);  
    STDLY_SEARCH_salary_selectquery[86] = "SELECT ESS.ESS_ID,EDSS.EDSS_CPF_AMOUNT,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EMPDTL.EMP_FIRST_NAME,EMPDTL.EMP_LAST_NAME,EDSS.EDSS_CPF_NUMBER,ESS.ESS_INVOICE_DATE,ESS.ESS_TO_PERIOD,ESS.ESS_FROM_PERIOD,ESS.ESS_CPF_AMOUNT,ESS.ESS_LEVY_AMOUNT,ESS.ESS_SALARY_AMOUNT,ESS.ESS_SALARY_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESS.ESS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP  FROM EMPLOYEE_DETAILS EMPDTL,EXPENSE_DETAIL_STAFF_SALARY EDSS,EXPENSE_STAFF_SALARY ESS,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ESS.ULD_ID AND (EMPDTL.EMP_ID=EDSS.EMP_ID) AND (EDSS.EDSS_ID=ESS.EDSS_ID) AND (ESS.ESS_INVOICE_DATE BETWEEN '"+STDLY_SEARCH_startdate+"' AND '"+STDLY_SEARCH_enddate+"') AND (ESS.ESS_CPF_AMOUNT BETWEEN '"+STDLY_SEARCH_fromamount+"' AND '"+STDLY_SEARCH_toamount+"') ORDER BY ESS.ESS_INVOICE_DATE ASC";
    STDLY_SEARCH_salary_selectquery[93] = "SELECT ESS.ESS_ID,EDSS.EDSS_CPF_AMOUNT,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EMPDTL.EMP_FIRST_NAME,EMPDTL.EMP_LAST_NAME,EDSS.EDSS_CPF_NUMBER,ESS.ESS_INVOICE_DATE,ESS.ESS_TO_PERIOD,ESS.ESS_FROM_PERIOD,ESS.ESS_CPF_AMOUNT,ESS.ESS_LEVY_AMOUNT,ESS.ESS_SALARY_AMOUNT,ESS.ESS_SALARY_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESS.ESS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EMPLOYEE_DETAILS EMPDTL,EXPENSE_DETAIL_STAFF_SALARY EDSS,EXPENSE_STAFF_SALARY ESS ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ESS.ULD_ID AND (EMPDTL.EMP_ID=EDSS.EMP_ID) AND (EDSS.EDSS_ID=ESS.EDSS_ID) AND (EDSS.EDSS_CPF_NUMBER='"+STDLY_SEARCH_selectedcpfno+"') ORDER BY ESS.ESS_INVOICE_DATE ASC";
    var STDLY_SEARCH_splitempname = STDLY_SEARCH_selectedempname.split("_");
    var STDLY_SEARCH_firstname = STDLY_SEARCH_splitempname[0];
    var STDLY_SEARCH_lastname = STDLY_SEARCH_splitempname[1];
    STDLY_SEARCH_salary_selectquery[90]= "SELECT ESS.ESS_ID,EDSS.EDSS_CPF_AMOUNT,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EMPDTL.EMP_FIRST_NAME,EMPDTL.EMP_LAST_NAME,EDSS.EDSS_CPF_NUMBER,ESS.ESS_INVOICE_DATE,ESS.ESS_TO_PERIOD,ESS.ESS_FROM_PERIOD,ESS.ESS_CPF_AMOUNT,ESS.ESS_LEVY_AMOUNT,ESS.ESS_SALARY_AMOUNT,ESS.ESS_SALARY_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESS.ESS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EMPLOYEE_DETAILS EMPDTL,EXPENSE_DETAIL_STAFF_SALARY EDSS,EXPENSE_STAFF_SALARY ESS ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ESS.ULD_ID AND (EMPDTL.EMP_ID=EDSS.EMP_ID) AND (EDSS.EDSS_ID=ESS.EDSS_ID) AND (EMPDTL.EMP_FIRST_NAME='"+STDLY_SEARCH_firstname+"' AND EMPDTL.EMP_LAST_NAME ='"+STDLY_SEARCH_lastname+"') ORDER BY ESS.ESS_INVOICE_DATE ASC";
    STDLY_SEARCH_salary_selectquery[88] = "SELECT ESS.ESS_ID,EDSS.EDSS_CPF_AMOUNT,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EMPDTL.EMP_FIRST_NAME,EMPDTL.EMP_LAST_NAME,EDSS.EDSS_CPF_NUMBER,ESS.ESS_INVOICE_DATE,ESS.ESS_TO_PERIOD,ESS.ESS_FROM_PERIOD,ESS.ESS_CPF_AMOUNT,ESS.ESS_LEVY_AMOUNT,ESS.ESS_SALARY_AMOUNT,ESS.ESS_SALARY_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESS.ESS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EMPLOYEE_DETAILS EMPDTL,EXPENSE_DETAIL_STAFF_SALARY EDSS,EXPENSE_STAFF_SALARY ESS ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ESS.ULD_ID AND (EMPDTL.EMP_ID=EDSS.EMP_ID) AND (EDSS.EDSS_ID=ESS.EDSS_ID) AND (ESS.ESS_INVOICE_DATE BETWEEN '"+STDLY_SEARCH_startdate+"' AND '"+STDLY_SEARCH_enddate+"') AND (ESS.ESS_SALARY_AMOUNT BETWEEN '"+STDLY_SEARCH_fromamount+"' AND '"+STDLY_SEARCH_toamount+"') ORDER BY ESS.ESS_INVOICE_DATE ASC";
    STDLY_SEARCH_salary_selectquery[85] = "SELECT ESS.ESS_ID,EDSS.EDSS_CPF_AMOUNT,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EMPDTL.EMP_FIRST_NAME,EMPDTL.EMP_LAST_NAME,EDSS.EDSS_CPF_NUMBER,ESS.ESS_INVOICE_DATE,ESS.ESS_TO_PERIOD,ESS.ESS_FROM_PERIOD,ESS.ESS_CPF_AMOUNT,ESS.ESS_LEVY_AMOUNT,ESS.ESS_SALARY_AMOUNT,ESS.ESS_SALARY_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESS.ESS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EMPLOYEE_DETAILS EMPDTL,EXPENSE_DETAIL_STAFF_SALARY EDSS,EXPENSE_STAFF_SALARY ESS ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ESS.ULD_ID AND (EMPDTL.EMP_ID=EDSS.EMP_ID) AND (EDSS.EDSS_ID=ESS.EDSS_ID) AND (ESS.ESS_SALARY_COMMENTS='"+STDLY_SEARCH_searchcomments+"') ORDER BY ESS.ESS_INVOICE_DATE ASC";
    STDLY_SEARCH_salary_selectquery[91]= "SELECT ESS.ESS_ID,EDSS.EDSS_CPF_AMOUNT,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EMPDTL.EMP_FIRST_NAME,EMPDTL.EMP_LAST_NAME,EDSS.EDSS_CPF_NUMBER,ESS.ESS_INVOICE_DATE,ESS.ESS_TO_PERIOD,ESS.ESS_FROM_PERIOD,ESS.ESS_CPF_AMOUNT,ESS.ESS_LEVY_AMOUNT,ESS.ESS_SALARY_AMOUNT,ESS.ESS_SALARY_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESS.ESS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EMPLOYEE_DETAILS EMPDTL,EXPENSE_DETAIL_STAFF_SALARY EDSS,EXPENSE_STAFF_SALARY ESS ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ESS.ULD_ID AND (EMPDTL.EMP_ID=EDSS.EMP_ID) AND (EDSS.EDSS_ID=ESS.EDSS_ID) AND (ESS.ESS_FROM_PERIOD BETWEEN '"+STDLY_SEARCH_startdate+"' AND '"+STDLY_SEARCH_enddate+"') ORDER BY ESS.ESS_INVOICE_DATE ASC";
    STDLY_SEARCH_salary_selectquery[87] = "SELECT ESS.ESS_ID,EDSS.EDSS_CPF_AMOUNT,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EMPDTL.EMP_FIRST_NAME,EMPDTL.EMP_LAST_NAME,EDSS.EDSS_CPF_NUMBER,ESS.ESS_INVOICE_DATE,ESS.ESS_TO_PERIOD,ESS.ESS_FROM_PERIOD,ESS.ESS_CPF_AMOUNT,ESS.ESS_LEVY_AMOUNT,ESS.ESS_SALARY_AMOUNT,ESS.ESS_SALARY_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESS.ESS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EMPLOYEE_DETAILS EMPDTL,EXPENSE_DETAIL_STAFF_SALARY EDSS,EXPENSE_STAFF_SALARY ESS ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ESS.ULD_ID AND (EMPDTL.EMP_ID=EDSS.EMP_ID) AND (EDSS.EDSS_ID=ESS.EDSS_ID) AND (ESS.ESS_INVOICE_DATE BETWEEN '"+STDLY_SEARCH_startdate+"' AND '"+STDLY_SEARCH_enddate+"') AND (ESS.ESS_LEVY_AMOUNT BETWEEN '"+STDLY_SEARCH_fromamount+"' AND '"+STDLY_SEARCH_toamount+"') ORDER BY ESS.ESS_INVOICE_DATE ASC";
    STDLY_SEARCH_salary_selectquery[89] = "SELECT ESS.ESS_ID,EDSS.EDSS_CPF_AMOUNT,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EMPDTL.EMP_FIRST_NAME,EMPDTL.EMP_LAST_NAME,EDSS.EDSS_CPF_NUMBER,ESS.ESS_INVOICE_DATE,ESS.ESS_TO_PERIOD,ESS.ESS_FROM_PERIOD,ESS.ESS_CPF_AMOUNT,ESS.ESS_LEVY_AMOUNT,ESS.ESS_SALARY_AMOUNT,ESS.ESS_SALARY_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESS.ESS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EMPLOYEE_DETAILS EMPDTL,EXPENSE_DETAIL_STAFF_SALARY EDSS,EXPENSE_STAFF_SALARY ESS ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ESS.ULD_ID AND (EMPDTL.EMP_ID=EDSS.EMP_ID) AND (EDSS.EDSS_ID=ESS.EDSS_ID) AND (ESS.ESS_INVOICE_DATE BETWEEN '"+STDLY_SEARCH_startdate+"' AND '"+STDLY_SEARCH_enddate+"') ORDER BY ESS.ESS_INVOICE_DATE ASC";
    STDLY_SEARCH_salary_selectquery[92] = "SELECT ESS.ESS_ID,EDSS.EDSS_CPF_AMOUNT,EDSS.EDSS_LEVY_AMOUNT,EDSS.EDSS_SALARY_AMOUNT,EMPDTL.EMP_FIRST_NAME,EMPDTL.EMP_LAST_NAME,EDSS.EDSS_CPF_NUMBER,ESS.ESS_INVOICE_DATE,ESS.ESS_TO_PERIOD,ESS.ESS_FROM_PERIOD,ESS.ESS_CPF_AMOUNT,ESS.ESS_LEVY_AMOUNT,ESS.ESS_SALARY_AMOUNT,ESS.ESS_SALARY_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESS.ESS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EMPLOYEE_DETAILS EMPDTL,EXPENSE_DETAIL_STAFF_SALARY EDSS,EXPENSE_STAFF_SALARY ESS ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ESS.ULD_ID AND (EMPDTL.EMP_ID=EDSS.EMP_ID) AND (EDSS.EDSS_ID=ESS.EDSS_ID) AND (ESS.ESS_TO_PERIOD BETWEEN '"+STDLY_SEARCH_startdate+"' AND '"+STDLY_SEARCH_enddate+"') ORDER BY ESS.ESS_INVOICE_DATE ASC";
    var  STDLY_SEARCH_salaryentrydata = STDLY_SEARCH_searchstm.executeQuery(STDLY_SEARCH_salary_selectquery[STDLY_SEARCH_salaryoptionvalmatch]);
    while(STDLY_SEARCH_salaryentrydata.next())
    {var STDLY_SEARCH_lvamt=STDLY_SEARCH_salaryentrydata.getString("EDSS_LEVY_AMOUNT");
     var STDLY_SEARCH_cpfamt=STDLY_SEARCH_salaryentrydata.getString("EDSS_CPF_AMOUNT");
     if(STDLY_SEARCH_lvamt==null)
       STDLY_SEARCH_lvamt=""
       if(STDLY_SEARCH_cpfamt==null)
         STDLY_SEARCH_cpfamt=""
         var STDLY_SEARCH_salary_id = STDLY_SEARCH_salaryentrydata.getString("ESS_ID")+'-'+STDLY_SEARCH_salaryentrydata.getString("EDSS_SALARY_AMOUNT")+'-'+STDLY_SEARCH_cpfamt+'-'+STDLY_SEARCH_lvamt
         var STDLY_SEARCH_cpfno = STDLY_SEARCH_salaryentrydata.getString("EDSS_CPF_NUMBER");
     if(STDLY_SEARCH_cpfno==null){ STDLY_SEARCH_cpfno=""; }      
     var STDLY_SEARCH_fname = STDLY_SEARCH_salaryentrydata.getString("EMP_FIRST_NAME");
     var STDLY_SEARCH_lname = STDLY_SEARCH_salaryentrydata.getString("EMP_LAST_NAME");
     var STDLY_SEARCH_cpfamount = STDLY_SEARCH_salaryentrydata.getString("ESS_CPF_AMOUNT");
     if(STDLY_SEARCH_cpfamount==null){ STDLY_SEARCH_cpfamount=""; }      
     var STDLY_SEARCH_levyamount = STDLY_SEARCH_salaryentrydata.getString("ESS_LEVY_AMOUNT");
     if(STDLY_SEARCH_levyamount==null){ STDLY_SEARCH_levyamount=""; }   
     var STDLY_SEARCH_salaryamount = STDLY_SEARCH_salaryentrydata.getString("ESS_SALARY_AMOUNT");
     if(STDLY_SEARCH_salaryamount==null){ STDLY_SEARCH_salaryamount=""; }      
     var STDLY_SEARCH_paiddate = STDLY_SEARCH_salaryentrydata.getString("ESS_INVOICE_DATE");
     if(STDLY_SEARCH_paiddate==null){ STDLY_SEARCH_paiddate=""; }      
     var STDLY_SEARCH_fromperiod = STDLY_SEARCH_salaryentrydata.getString("ESS_FROM_PERIOD");
     if(STDLY_SEARCH_fromperiod==null){ STDLY_SEARCH_fromperiod=""; }      
     var STDLY_SEARCH_toperiod = STDLY_SEARCH_salaryentrydata.getString("ESS_TO_PERIOD");
     if(STDLY_SEARCH_toperiod==null){ STDLY_SEARCH_toperiod=""; }      
     var STDLY_SEARCH_salary_comments = STDLY_SEARCH_salaryentrydata.getString("ESS_SALARY_COMMENTS");
     if(STDLY_SEARCH_salary_comments==null){ STDLY_SEARCH_salary_comments=""; }      
     var STDLY_SEARCH_salary_userstamp = STDLY_SEARCH_salaryentrydata.getString("ULD_LOGINID");
     var STDLY_SEARCH_salary_timestamp = STDLY_SEARCH_salaryentrydata.getString("TIMESTMP");
     var STDLY_SEARCH_result={'STDLY_SEARCH_salary_id':STDLY_SEARCH_salary_id,'STDLY_SEARCH_salary_cpfno':STDLY_SEARCH_cpfno,'STDLY_SEARCH_salary_fname':STDLY_SEARCH_fname,'STDLY_SEARCH_salary_lname':STDLY_SEARCH_lname,'STDLY_SEARCH_salary_cpfamount':STDLY_SEARCH_cpfamount,'STDLY_SEARCH_salary_levyamount':STDLY_SEARCH_levyamount,'STDLY_SEARCH_salary_salaryamount':STDLY_SEARCH_salaryamount,'STDLY_SEARCH_salary_paiddate':STDLY_SEARCH_paiddate,'STDLY_SEARCH_salary_fromperiod':STDLY_SEARCH_fromperiod,'STDLY_SEARCH_salary_toperiod':STDLY_SEARCH_toperiod,'STDLY_SEARCH_salary_comments':STDLY_SEARCH_salary_comments,'STDLY_SEARCH_salary_userstamp':STDLY_SEARCH_salary_userstamp,'STDLY_SEARCH_salary_timestamp':STDLY_SEARCH_salary_timestamp}
     STDLY_SEARCH_sendallsalarydata.push(STDLY_SEARCH_result)
    }STDLY_SEARCH_salaryentrydata.close();
    STDLY_SEARCH_searchstm.close();
    STDLY_SEARCH_conn.close();
    return STDLY_SEARCH_sendallsalarydata;
  }
  //GET THE STAFF FLEX TABLE  DATAS FOR LOADING..................
  function STDLY_SEARCH_searchbystaff(STDLY_SEARCH_staffoptionvalmatch,STDLY_SEARCH_getstartdate,STDLY_SEARCH_getenddate,STDLY_SEARCH_staffexpansecategory,STDLY_SEARCH_fromamount,STDLY_SEARCH_toamount,STDLY_SEARCH_searchcomments,STDLY_SEARCH_invitemcom,STDLY_SEARCH_invfromcomt)
  {
    var STDLY_SEARCH_startdate=eilib.SqlDateFormat(STDLY_SEARCH_getstartdate);
    var STDLY_SEARCH_enddate=eilib.SqlDateFormat(STDLY_SEARCH_getenddate)
    var STDLY_SEARCH_sensallstaffdata=[]
    var STDLY_SEARCH_conn =eilib.db_GetConnection();
    var STDLY_SEARCH_staffexpense_selectquery=[];
    var STDLY_SEARCH_stmtexp = STDLY_SEARCH_conn.createStatement();
    if(STDLY_SEARCH_searchcomments!='' && STDLY_SEARCH_searchcomments!=null)
      STDLY_SEARCH_searchcomments=eilib.ConvertSpclCharString(STDLY_SEARCH_searchcomments);  
    if(STDLY_SEARCH_invitemcom!='' && STDLY_SEARCH_invitemcom!=null)
      STDLY_SEARCH_invitemcom=eilib.ConvertSpclCharString(STDLY_SEARCH_invitemcom);  
    if(STDLY_SEARCH_invfromcomt!='' && STDLY_SEARCH_invfromcomt!=null)
      STDLY_SEARCH_invfromcomt=eilib.ConvertSpclCharString(STDLY_SEARCH_invfromcomt);  
    STDLY_SEARCH_staffexpense_selectquery[80] = "SELECT ES.ES_ID,EXPCONFIG.ECN_DATA,ES.ES_INVOICE_DATE,ES.ES_INVOICE_AMOUNT,ES.ES_INVOICE_ITEMS,ES.ES_INVOICE_FROM,ES.ES_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ES.ES_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EXPENSE_STAFF ES,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ES.ULD_ID AND (ES.ES_INVOICE_DATE BETWEEN '"+STDLY_SEARCH_startdate+"' AND '"+STDLY_SEARCH_enddate+"') AND (EXPCONFIG.ECN_DATA='"+STDLY_SEARCH_staffexpansecategory+"') AND (EXPCONFIG.ECN_ID=ES.ECN_ID)ORDER BY ES.ES_INVOICE_DATE ASC";
    STDLY_SEARCH_staffexpense_selectquery[84] = "SELECT ES.ES_ID,EXPCONFG.ECN_DATA,ES.ES_INVOICE_DATE,ES.ES_INVOICE_AMOUNT,ES.ES_INVOICE_ITEMS,ES.ES_INVOICE_FROM,ES.ES_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ES.ES_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EXPENSE_STAFF ES,EXPENSE_CONFIGURATION EXPCONFG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ES.ULD_ID AND (ES.ES_INVOICE_DATE BETWEEN '"+STDLY_SEARCH_startdate+"' AND '"+STDLY_SEARCH_enddate+"') AND (ES.ES_INVOICE_AMOUNT BETWEEN '"+STDLY_SEARCH_fromamount+"' AND '"+STDLY_SEARCH_toamount+"') AND (ES.ECN_ID=EXPCONFG.ECN_ID) ORDER BY ES.ES_INVOICE_DATE ASC";
    STDLY_SEARCH_staffexpense_selectquery[81]= "SELECT ES.ES_ID,EXPCONFG.ECN_DATA,ES.ES_INVOICE_DATE,ES.ES_INVOICE_AMOUNT,ES.ES_INVOICE_ITEMS,ES.ES_INVOICE_FROM,ES.ES_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ES.ES_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EXPENSE_STAFF ES,EXPENSE_CONFIGURATION EXPCONFG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ES.ULD_ID AND (ES.ES_INVOICE_DATE BETWEEN '"+STDLY_SEARCH_startdate+"' AND '"+STDLY_SEARCH_enddate+"') AND (ES.ECN_ID=EXPCONFG.ECN_ID) ORDER BY ES.ES_INVOICE_DATE ASC"; 
    STDLY_SEARCH_staffexpense_selectquery[82] = "SELECT ES.ES_ID,EXPCONFG.ECN_DATA,ES.ES_INVOICE_DATE,ES.ES_INVOICE_AMOUNT,ES.ES_INVOICE_ITEMS,ES.ES_INVOICE_FROM,ES.ES_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ES.ES_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EXPENSE_STAFF ES,EXPENSE_CONFIGURATION EXPCONFG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ES.ULD_ID AND (ES.ES_INVOICE_DATE BETWEEN '"+STDLY_SEARCH_startdate+"' AND '"+STDLY_SEARCH_enddate+"') AND (ES.ECN_ID=EXPCONFG.ECN_ID) AND (ES.ES_INVOICE_FROM='"+STDLY_SEARCH_invfromcomt+"') ORDER BY ES.ES_INVOICE_DATE ASC"; 
    STDLY_SEARCH_staffexpense_selectquery[83] = "SELECT ES.ES_ID,EXPCONFG.ECN_DATA,ES.ES_INVOICE_DATE,ES.ES_INVOICE_AMOUNT,ES.ES_INVOICE_ITEMS,ES.ES_INVOICE_FROM,ES.ES_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ES.ES_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EXPENSE_STAFF ES,EXPENSE_CONFIGURATION EXPCONFG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ES.ULD_ID AND (ES.ES_INVOICE_DATE BETWEEN '"+STDLY_SEARCH_startdate+"' AND '"+STDLY_SEARCH_enddate+"') AND (ES.ECN_ID=EXPCONFG.ECN_ID) AND (ES.ES_INVOICE_ITEMS='"+STDLY_SEARCH_invitemcom+"') ORDER BY ES.ES_INVOICE_DATE ASC"; 
    STDLY_SEARCH_staffexpense_selectquery[79] = "SELECT ES.ES_ID,EXPCONFG.ECN_DATA,ES.ES_INVOICE_DATE,ES.ES_INVOICE_AMOUNT,ES.ES_INVOICE_ITEMS,ES.ES_INVOICE_FROM,ES.ES_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ES.ES_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EXPENSE_STAFF ES,EXPENSE_CONFIGURATION EXPCONFG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ES.ULD_ID AND (ES.ECN_ID=EXPCONFG.ECN_ID) AND (ES.ES_COMMENTS='"+STDLY_SEARCH_searchcomments+"') ORDER BY ES.ES_INVOICE_DATE ASC"; 
    var STDLY_SEARCH_staff = STDLY_SEARCH_stmtexp.executeQuery(STDLY_SEARCH_staffexpense_selectquery[STDLY_SEARCH_staffoptionvalmatch]);
    while(STDLY_SEARCH_staff.next())
    {
      var STDLY_SEARCH_staff_id = STDLY_SEARCH_staff.getString("ES_ID");
      var STDLY_SEARCH_type = STDLY_SEARCH_staff.getString("ECN_DATA");
      if(STDLY_SEARCH_type==null){ STDLY_SEARCH_type=""; }    
      var STDLY_SEARCH_date = STDLY_SEARCH_staff.getString("ES_INVOICE_DATE");
      if(STDLY_SEARCH_date==null){ STDLY_SEARCH_date=""; }    
      var STDLY_SEARCH_amount = STDLY_SEARCH_staff.getString("ES_INVOICE_AMOUNT");
      if(STDLY_SEARCH_amount==null){ STDLY_SEARCH_amount=""; }    
      var STDLY_SEARCH_items = STDLY_SEARCH_staff.getString("ES_INVOICE_ITEMS");
      if(STDLY_SEARCH_items==null){ STDLY_SEARCH_items=""; }    
      var STDLY_SEARCH_from = STDLY_SEARCH_staff.getString("ES_INVOICE_FROM");
      if(STDLY_SEARCH_from==null){ STDLY_SEARCH_from=""; }    
      var STDLY_SEARCH_comments = STDLY_SEARCH_staff.getString("ES_COMMENTS");
      if(STDLY_SEARCH_comments==null){ STDLY_SEARCH_comments=""; }    
      var STDLY_SEARCH_userstamp = STDLY_SEARCH_staff.getString("ULD_LOGINID");
      var STDLY_SEARCH_timestamp = STDLY_SEARCH_staff.getString("TIMESTMP");
      var STDLY_SEARCH_result={'STDLY_SEARCH_staff_id':STDLY_SEARCH_staff_id,'STDLY_SEARCH_type':STDLY_SEARCH_type,'STDLY_SEARCH_date':STDLY_SEARCH_date,'STDLY_SEARCH_amount':STDLY_SEARCH_amount,'STDLY_SEARCH_items':STDLY_SEARCH_items,'STDLY_SEARCH_from':STDLY_SEARCH_from,'STDLY_SEARCH_comments':STDLY_SEARCH_comments,'STDLY_SEARCH_userstamp':STDLY_SEARCH_userstamp,'STDLY_SEARCH_timestamp':STDLY_SEARCH_timestamp}
      STDLY_SEARCH_sensallstaffdata.push(STDLY_SEARCH_result);
    }STDLY_SEARCH_staff.close();
    STDLY_SEARCH_stmtexp.close();
    STDLY_SEARCH_conn.close();
    return STDLY_SEARCH_sensallstaffdata;
  }
  //GET THE EMPLOYEE NAME FROM THE TABLE..................
  function STDLY_INPUT_loademployeename()
  {
    var STDLY_SEARCH_conn = eilib.db_GetConnection();
    var STDLY_SEARCH_mainArray=[];
    var STDLY_SEARCH_employeeNameArray = [];
    var STDLY_SEARCH_employee_Name_List=[];
    var STDLY_SEARCH_employee_Name_List1=[];
    var STDLY_SEARCH_selectEmployeeName = "SELECT ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME FROM EMPLOYEE_DETAILS ED WHERE ED.EMP_ID IN (SELECT EMP_ID FROM EXPENSE_DETAIL_STAFF_SALARY)";
    var STDLY_SEARCH_stmtname= STDLY_SEARCH_conn.createStatement();
    var STDLY_SEARCH_employeeName = STDLY_SEARCH_stmtname.executeQuery(STDLY_SEARCH_selectEmployeeName);
    while(STDLY_SEARCH_employeeName.next())
    {
      var STDLY_SEARCH_emp_fname = STDLY_SEARCH_employeeName.getString("EMP_FIRST_NAME");
      var STDLY_SEARCH_epm_lname = STDLY_SEARCH_employeeName.getString("EMP_LAST_NAME");
      STDLY_SEARCH_employee_Name_List.push(STDLY_SEARCH_emp_fname+'_'+STDLY_SEARCH_epm_lname);
      STDLY_SEARCH_employee_Name_List1.push( STDLY_SEARCH_emp_fname+' '+STDLY_SEARCH_epm_lname);
      STDLY_SEARCH_employeeNameArray.push(STDLY_SEARCH_employee_Name_List);
      STDLY_SEARCH_employeeNameArray.push(STDLY_SEARCH_employee_Name_List1);
    }
    STDLY_SEARCH_employeeName.close();STDLY_SEARCH_stmtname.close();
    var STDLY_SEARCH_errmsgids="45,106,107,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,169,170,315,377,378,379,401";
    var STDLY_SEARCH_errorArray=[];
    STDLY_SEARCH_errorArray=eilib.GetErrorMessageList(STDLY_SEARCH_conn,STDLY_SEARCH_errmsgids);
    var STDLY_SEARCH_expenseArray = [];
    var STDLY_SEARCH_expenseArrayallid = [];
    var STDLY_SEARCH_stmtname= STDLY_SEARCH_conn.createStatement();
    var STDLY_SEARCH_selectTypeofexpense = "SELECT DISTINCT ECN_ID,ECN_DATA FROM EXPENSE_CONFIGURATION WHERE ECN_ID BETWEEN 76 AND 93 OR CGN_ID IN (23,26)ORDER BY ECN_ID ASC";
    var STDLY_SEARCH_typeofexpense = STDLY_SEARCH_stmtname.executeQuery(STDLY_SEARCH_selectTypeofexpense);
    while(STDLY_SEARCH_typeofexpense.next())
    {
      var STDLY_SEARCH_expenselist = STDLY_SEARCH_typeofexpense.getString("ECN_DATA");
      var STDLY_SEARCH_expenselistid = STDLY_SEARCH_typeofexpense.getString("ECN_ID");
      STDLY_SEARCH_expenseArray.push(STDLY_SEARCH_expenselist);
      STDLY_SEARCH_expenseArrayallid.push(STDLY_SEARCH_expenselistid)
    }
    STDLY_SEARCH_typeofexpense.close();STDLY_SEARCH_stmtname.close();
    var STDLY_SEARCH_expenseagentArray = [];
    var STDLY_SEARCH_arr_eacomments=[];
    var STDLY_SEARCH_stmtname= STDLY_SEARCH_conn.createStatement();
    var STDLY_SEARCH_expenseagentquery = "SELECT EA_ID,EA_COMMENTS FROM EXPENSE_AGENT";
    var STDLY_SEARCH_expenseagentres = STDLY_SEARCH_stmtname.executeQuery(STDLY_SEARCH_expenseagentquery);
    while(STDLY_SEARCH_expenseagentres.next())
    {
      var STDLY_SEARCH_expenseagentresdate = STDLY_SEARCH_expenseagentres.getString("EA_ID");
      STDLY_SEARCH_expenseagentArray.push(STDLY_SEARCH_expenseagentresdate);
      if(STDLY_SEARCH_expenseagentres.getString('EA_COMMENTS')!=null)
        STDLY_SEARCH_arr_eacomments.push(STDLY_SEARCH_expenseagentres.getString('EA_COMMENTS'));
    }  
    STDLY_SEARCH_expenseagentres.close();STDLY_SEARCH_stmtname.close();
    //CHECK EXPENSE EMPLOYEE DETAIL//
    var STDLY_SEARCH_employeedetailsArray = [];
    var STDLY_SEARCH_stmtname= STDLY_SEARCH_conn.createStatement();
    var STDLY_SEARCH_employeedetailsquery = "SELECT * FROM EMPLOYEE_DETAILS";
    var STDLY_SEARCH_employeedetailsres = STDLY_SEARCH_stmtname.executeQuery(STDLY_SEARCH_employeedetailsquery);
    while(STDLY_SEARCH_employeedetailsres.next())
    {
      var STDLY_SEARCH_employeedetailsdate = STDLY_SEARCH_employeedetailsres.getString("EMP_ID");
      STDLY_SEARCH_employeedetailsArray.push(STDLY_SEARCH_employeedetailsdate);
    } 
    STDLY_SEARCH_employeedetailsres.close();STDLY_SEARCH_stmtname.close();
    //CHECK EXPENSE_DETAIL_STAFF_SALARY//
    var STDLY_SEARCH_employeedetailstaffsalaryArray = [];
    var STDLY_SEARCH_stmtname= STDLY_SEARCH_conn.createStatement();
    var STDLY_SEARCH_employeedetailstaffsalaryquery = "SELECT EDSS_ID FROM EXPENSE_DETAIL_STAFF_SALARY";
    var STDLY_SEARCH_employeedetailstaffsalaryres = STDLY_SEARCH_stmtname.executeQuery(STDLY_SEARCH_employeedetailstaffsalaryquery);
    while(STDLY_SEARCH_employeedetailstaffsalaryres.next())
    {
      var STDLY_SEARCH_employeedetailstaffsalarydate = STDLY_SEARCH_employeedetailstaffsalaryres.getString("EDSS_ID");
      STDLY_SEARCH_employeedetailstaffsalaryArray.push(STDLY_SEARCH_employeedetailstaffsalarydate);
    }  
    STDLY_SEARCH_employeedetailstaffsalaryres.close();STDLY_SEARCH_stmtname.close();
    //CHECK EXPENSE_DETAIL_STAFF_SALARY//
    var STDLY_SEARCH_expensestaffsalaryArray = [];
    var STDLY_SEARCH_arr_salcomments = [];
    var STDLY_SEARCH_stmtname= STDLY_SEARCH_conn.createStatement();
    var STDLY_SEARCH_expensestaffsalaryquery = "SELECT ESS_ID,ESS_SALARY_COMMENTS FROM EXPENSE_STAFF_SALARY";
    var STDLY_SEARCH_expensestaffsalaryres = STDLY_SEARCH_stmtname.executeQuery(STDLY_SEARCH_expensestaffsalaryquery);
    while(STDLY_SEARCH_expensestaffsalaryres.next())
    {
      var STDLY_SEARCH_expensestaffsalarydate = STDLY_SEARCH_expensestaffsalaryres.getString("ESS_ID");
      STDLY_SEARCH_expensestaffsalaryArray.push(STDLY_SEARCH_expensestaffsalarydate);
      if(STDLY_SEARCH_expensestaffsalaryres.getString('ESS_SALARY_COMMENTS')!=null)
        STDLY_SEARCH_arr_salcomments.push(STDLY_SEARCH_expensestaffsalaryres.getString('ESS_SALARY_COMMENTS'));
    } 
    STDLY_SEARCH_expensestaffsalaryres.close();STDLY_SEARCH_stmtname.close();
    //CHECK EXPENSE_STAFF//
    var STDLY_SEARCH_expensestaffArray = [];
    var STDLY_SEARCH_arr_escomments = [];
    var STDLY_SEARCH_arr_esinvoicefrom = [];
    var STDLY_SEARCH_arr_esinvoiceitems = [];
    var STDLY_SEARCH_stmtname= STDLY_SEARCH_conn.createStatement();
    var STDLY_SEARCH_expensestaffquery = "SELECT ES_ID,ES_COMMENTS,ES_INVOICE_FROM,ES_INVOICE_ITEMS FROM EXPENSE_STAFF";
    var STDLY_SEARCH_expensestaffres = STDLY_SEARCH_stmtname.executeQuery(STDLY_SEARCH_expensestaffquery);
    while(STDLY_SEARCH_expensestaffres.next())
    {
      var STDLY_SEARCH_expensestaffdate = STDLY_SEARCH_expensestaffres.getString("ES_ID");
      STDLY_SEARCH_expensestaffArray.push(STDLY_SEARCH_expensestaffdate);
      if(STDLY_SEARCH_expensestaffres.getString('ES_COMMENTS')!=null)
        STDLY_SEARCH_arr_escomments.push(STDLY_SEARCH_expensestaffres.getString('ES_COMMENTS'));
      if(STDLY_SEARCH_expensestaffres.getString('ES_INVOICE_FROM')!=null)
        STDLY_SEARCH_arr_esinvoicefrom.push(STDLY_SEARCH_expensestaffres.getString('ES_INVOICE_FROM'));
      if(STDLY_SEARCH_expensestaffres.getString('ES_INVOICE_ITEMS')!=null)
        STDLY_SEARCH_arr_esinvoiceitems.push(STDLY_SEARCH_expensestaffres.getString('ES_INVOICE_ITEMS'));
    }
    STDLY_SEARCH_expensestaffres.close();STDLY_SEARCH_stmtname.close();STDLY_SEARCH_conn.close();
    var STDLY_SEARCH_result={'STDLY_SEARCH_expensestaffArray':STDLY_SEARCH_expensestaffArray,'STDLY_SEARCH_employeedetailstaffsalaryArray':STDLY_SEARCH_employeedetailstaffsalaryArray,'STDLY_SEARCH_expensestaffsalaryArray':STDLY_SEARCH_expensestaffsalaryArray,'STDLY_SEARCH_expensestaffsalaryArray':STDLY_SEARCH_expensestaffsalaryArray,'STDLY_SEARCH_expenseagentArray':STDLY_SEARCH_expenseagentArray,'STDLY_SEARCH_employeedetailsArray':STDLY_SEARCH_employeedetailsArray,'STDLY_SEARCH_expenseArrayallid':STDLY_SEARCH_expenseArrayallid,'STDLY_SEARCH_expenseArray':STDLY_SEARCH_expenseArray,'STDLY_SEARCH_employeeNameArray':STDLY_SEARCH_employeeNameArray,'STDLY_SEARCH_errorArray':STDLY_SEARCH_errorArray.errormsg,'STDLY_SEARCH_obj_eacomments':STDLY_SEARCH_arr_eacomments,'STDLY_SEARCH_obj_salcomments':STDLY_SEARCH_arr_salcomments,'STDLY_SEARCH_obj_escomments':STDLY_SEARCH_arr_escomments,'STDLY_SEARCH_obj_esinvoicefrom':STDLY_SEARCH_arr_esinvoicefrom,'STDLY_SEARCH_obj_esinvoiceitems':STDLY_SEARCH_arr_esinvoiceitems}//,'STDLY_SEARCH_errorArrayefirst':STDLY_SEARCH_errorArrayefirst,'STDLY_SEARCH_amtvalidatoionfirst':STDLY_SEARCH_amtvalidatoionfirst}
    STDLY_SEARCH_mainArray.push(STDLY_SEARCH_result);
    return STDLY_SEARCH_mainArray;
  }
  //FUNCTION FOR COMMENTS WITH COUNT
  function STDLY_SEARCH_func_comments(STDLY_SEARCH_db_startdate,STDLY_SEARCH_db_enddate,STDLY_SEARCH_lb_typelist,STDLY_SEARCH_lb_salarysearchoption){
    var STDLY_SEARCH_conn = eilib.db_GetConnection();
    var STDLY_SEARCH_comments_twodim=[];var STDLY_SEARCH_arr_comments=[];
    var STDLY_SEARCH_db_startdate= eilib.SqlDateFormat(STDLY_SEARCH_db_startdate);
    var STDLY_SEARCH_db_enddate= eilib.SqlDateFormat(STDLY_SEARCH_db_enddate);
    var STDLY_SEARCH_stmt_comments = STDLY_SEARCH_conn.createStatement();
    STDLY_SEARCH_comments_twodim[77] = "SELECT DISTINCT EA_COMMENTS  FROM EXPENSE_AGENT WHERE EA_DATE BETWEEN '"+STDLY_SEARCH_db_startdate+"' AND '"+STDLY_SEARCH_db_enddate+"'";
    STDLY_SEARCH_comments_twodim[85] = "SELECT  DISTINCT ESS_SALARY_COMMENTS FROM EXPENSE_STAFF_SALARY WHERE ESS_INVOICE_DATE BETWEEN '"+STDLY_SEARCH_db_startdate+"' AND '"+STDLY_SEARCH_db_enddate+"'";
    STDLY_SEARCH_comments_twodim[79] = "SELECT DISTINCT ES_COMMENTS FROM EXPENSE_STAFF WHERE ES_INVOICE_DATE BETWEEN '"+STDLY_SEARCH_db_startdate+"' AND '"+STDLY_SEARCH_db_enddate+"'";
    STDLY_SEARCH_comments_twodim[82] = "SELECT DISTINCT ES_INVOICE_FROM FROM EXPENSE_STAFF WHERE ES_INVOICE_DATE BETWEEN '"+STDLY_SEARCH_db_startdate+"' AND '"+STDLY_SEARCH_db_enddate+"'";
    STDLY_SEARCH_comments_twodim[83] = "SELECT DISTINCT ES_INVOICE_ITEMS FROM EXPENSE_STAFF WHERE ES_INVOICE_DATE BETWEEN '"+STDLY_SEARCH_db_startdate+"' AND '"+STDLY_SEARCH_db_enddate+"'";
    var STDLY_SEARCH_comments_rs = STDLY_SEARCH_stmt_comments.executeQuery( STDLY_SEARCH_comments_twodim[STDLY_SEARCH_lb_salarysearchoption] );
    while(STDLY_SEARCH_comments_rs.next())
    {           
      
      if(STDLY_SEARCH_comments_rs.getString(1)!=null)     
        STDLY_SEARCH_arr_comments.push(STDLY_SEARCH_comments_rs.getString(1)); 
    }STDLY_SEARCH_comments_rs.close();STDLY_SEARCH_stmt_comments.close();STDLY_SEARCH_conn.close();
    return[STDLY_SEARCH_arr_comments,STDLY_SEARCH_lb_salarysearchoption]
  }
}
catch(err)
{
}
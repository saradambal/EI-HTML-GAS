//*******************************************FILE DESCRIPTION*********************************************//
//*******************************************"PERSONAL EXPENSE: SEARCH/UPDATE/DELETE*********************************************//
//DONE BY:PUNI
//VER 2.0-SD:09/10/2014 ED:09/10/2014,TRACKER NO:412,1.added script to hide preloader after menu n form loads,2.changed preloader n msgbox position
//DONE BY:SARADAMBAL
//VER 1.9-SD:22/09/2014 ED:22/09/2014,TRACKER NO:412,removed trim for comments fields n invitems n srch options, hide the preloader after loading flex table,correct flex table height,removed hardcore for search by header,corrected error msg for no record data 
//VER 1.8-SD:13/08/2014 ED:13/08/2014,TRACKER NO:412,implemented script for reset normal size after updation,updated new links,checked after autocommit  
//VER 1.7-SD:19/06/2014 ED:19/06/2014,TRACKER NO:412,implemented script for commit and failure function,checked tickler part,call comments,inv from,inv item function  after deletion,added rule general for comments,inv from,item,added numbersonly for inv amt   
//VER 1.6 -SD:06/06/2014 ED:06/06/2014,TRACKER NO:412,updated new link
//VER 1.5 SD:19/04/2014 ED:19/04/2014 TRACKER NO:412//IMPLEMENTED DP PICKER VALIDATION FOR SDATE AND EDATE IN SRCH FORM,CHECKED MIGRATION DATA,IMPLEMENTED CLASS FOR DP(MANDATORY)
//VER 1.4 SD:11/03/2014 ED:15/03/2014 TRACKER NO:412//IMPLEMENTED SYSDATE IN SRCH FORM DP,EILIB FOR COMMENTS WHILE UPDATING AND FETCHING THE QUERY
//VER 1.3 SD:11/03/2014 ED:15/03/2014 TRACKER NO:412//REPLACE USERSTAMP INTO ULD_ID USING EILIB FUNCTION,GET ULD_LOGINID INSTEAD OF USERSTAMP,CLEARED ALIGNMENT ISSUE,
//VER 1.2 SD:17/02/2014 ED:17/02/2014,TRACKER NO:412//implemented eilib for deletion-DONE BY SARADAMBAL
//VER 1.1 SD:13/02/2014 ED:13/02/2014,TRACKER NO:412//removed tickler and deletion script,implemented sp for TH and deletion,updated errormsg for non-deletion,cleared empty spacee--DONE BY SARADAMABL
//DONE BY:ELANGO
//VER 0.10 SD:10/01/2014 ED:24/01/2014,TRACKER NO:412//REDUCE THE CODINGS AND QUERIES.
//VER 0.09 SD:09/01/2014 ED:09/01/2014,TRACKER NO:412//CORRECT THE DEFECT,CHANGE TO SHOW THE CONTROLS.
//VER 0.08 SD:03/01/2014 ED:03/12/2013,TRACKER NO:412//CHECK THE FORM WHICH IS LOAD CORRECTLY OR NOT.
//VER 0.07 SD:28/12/2013 ED:28/12/2013,TRACKER NO:412//CHANGE THE HEADER TAG AND CONNECTION FORMATE.
//VER 0.06 SD:26/12/2013 ED:26/12/2013,TRACKER NO:412//CHANGE THE JQUERY LINK.
//VER 0.05 SD:20/12/2013 ED:20/12/2013,TRACKER NO:412//CHANGE THE SHOWS OF ERROR MESSAGE FOR SEPERATE SEARCH , INVOICE DATE VALIDATION,AUTOCOMPLETE FOR INVOICE FROM.
//VER 0.04 SD:30/11/2013 ED:30/11/2013,TRACKER NO:412//CHANGE THE VERSION COMMENDS.
//VER 0.03 SD:18/11/2013 ED:18/11/2013,TRACKER NO:412//RELOAD THE FLEXTABLE AFTER  UPDATION.
//VER 0.02 SD:25/10/2013 ED:08/11/2013,TRACKER NO:412//UPDATE CHANGE THE SIZE OF CREATED ELEMENTS IN REQUIRED SIZE,CHECK THE VALIDATION IN ALL FORMS ,CHANGE THE TIMESTAM FORMATE.
//VER 0.01-INITIAL VERSION, SD:26/09/2013 ED:01/10/2013,TRACKER NO:412
//*********************************************************************************************************//
try
{
  //GET THE INITIAL LOADING  DATAS //
  function PDLY_SEARCH_gettypofexpense()
  {
    var PDLY_SEARCH_mainArray=[];
    var PDLY_SEARCH_errorArraye = [];
    var PDLY_SEARCH_conn=eilib.db_GetConnection();
    //CAR EXPENSE  CATEGORY  DATA LOADING//
    var PDLY_SEARCH_carexpensecategArray=[];
    var PDLY_SEARCH_personalsrch = PDLY_SEARCH_conn.createStatement();
    var PDLY_SEARCH_carexpensecategory_selectquery = "SELECT DISTINCT ECN_DATA FROM EXPENSE_CONFIGURATION EXPCONFIG,EXPENSE_CAR EXPCAR WHERE (EXPCONFIG.ECN_ID=EXPCAR.ECN_ID) ORDER BY ECN_DATA ASC";
    var PDLY_SEARCH_carexpense = PDLY_SEARCH_personalsrch.executeQuery(PDLY_SEARCH_carexpensecategory_selectquery);
    while(PDLY_SEARCH_carexpense.next())
    {
      var PDLY_SEARCH_carexpensecategoryval = PDLY_SEARCH_carexpense.getString("ECN_DATA");
      PDLY_SEARCH_carexpensecategArray.push(PDLY_SEARCH_carexpensecategoryval);
    }
    var PDLY_SEARCH_babyexpensecategArray=[];
    var PDLY_SEARCH_babyexpensecategory_selectquery = "SELECT DISTINCT ECN_DATA FROM EXPENSE_CONFIGURATION EXPCONFIG,EXPENSE_BABY EXPBABY WHERE (EXPCONFIG.ECN_ID=EXPBABY.ECN_ID) ORDER BY ECN_DATA ASC";
    var PDLY_SEARCH_baby = PDLY_SEARCH_personalsrch.executeQuery(PDLY_SEARCH_babyexpensecategory_selectquery);
    while(PDLY_SEARCH_baby.next())
    {
      var PDLY_SEARCH_babycategoryval = PDLY_SEARCH_baby.getString("ECN_DATA");
      PDLY_SEARCH_babyexpensecategArray.push(PDLY_SEARCH_babycategoryval);
    }
    var PDLY_SEARCH_personalexpensecategArray=[];
    var PDLY_SEARCH_personalexpensecategory_selectquery = "SELECT DISTINCT ECN_DATA FROM EXPENSE_CONFIGURATION EXPCONFIG,EXPENSE_PERSONAL EXPPERSONAL WHERE (EXPCONFIG.ECN_ID=EXPPERSONAL.ECN_ID) ORDER BY ECN_DATA ASC";
    var PDLY_SEARCH_personalexpense_rs = PDLY_SEARCH_personalsrch.executeQuery(PDLY_SEARCH_personalexpensecategory_selectquery);
    while(PDLY_SEARCH_personalexpense_rs.next())
    {
      var PDLY_SEARCH_personalexpensecategory = PDLY_SEARCH_personalexpense_rs.getString("ECN_DATA");
      PDLY_SEARCH_personalexpensecategArray.push(PDLY_SEARCH_personalexpensecategory);
    }
    var  PDLY_SEARCH_expensebabyArray = [];
    var  PDLY_SEARCH_expensebabyquery = "SELECT EB_ID FROM EXPENSE_BABY";
    var  PDLY_SEARCH_expensebabyres =  PDLY_SEARCH_personalsrch.executeQuery( PDLY_SEARCH_expensebabyquery);
    while( PDLY_SEARCH_expensebabyres.next())
    {
      var  PDLY_SEARCH_expenseagentresdate =  PDLY_SEARCH_expensebabyres.getString("EB_ID");
      PDLY_SEARCH_expensebabyArray.push( PDLY_SEARCH_expenseagentresdate);
    }  
    var  PDLY_SEARCH_expensecarArray = [];
    var  PDLY_SEARCH_expensecarquery = "SELECT EC_ID FROM EXPENSE_CAR";
    var  PDLY_SEARCH_expensecarres =  PDLY_SEARCH_personalsrch.executeQuery( PDLY_SEARCH_expensecarquery);
    while( PDLY_SEARCH_expensecarres.next())
    {
      var  PDLY_SEARCH_expensecarresdate =  PDLY_SEARCH_expensecarres.getString("EC_ID");
      PDLY_SEARCH_expensecarArray.push( PDLY_SEARCH_expensecarresdate);
    }  
    var  PDLY_SEARCH_expensecarloanArray = [];
    var  PDLY_SEARCH_expensecarloanquery = "SELECT ECL_ID FROM EXPENSE_CAR_LOAN";
    var  PDLY_SEARCH_expensecarloanres =  PDLY_SEARCH_personalsrch.executeQuery( PDLY_SEARCH_expensecarloanquery);
    while( PDLY_SEARCH_expensecarloanres.next())
    {
      var  PDLY_SEARCH_expensecarloanresdate =  PDLY_SEARCH_expensecarloanres.getString("ECL_ID");
      PDLY_SEARCH_expensecarloanArray.push( PDLY_SEARCH_expensecarloanresdate);
    }  
    var  PDLY_SEARCH_expensepersonalArray = [];    var PDLY_SEARCH_dataArray=[];
    var  PDLY_SEARCH_expensepersonalquery = "SELECT EP_ID,EP_INVOICE_FROM FROM EXPENSE_PERSONAL";
    var  PDLY_SEARCH_expensepersonalres =  PDLY_SEARCH_personalsrch.executeQuery( PDLY_SEARCH_expensepersonalquery);
    while( PDLY_SEARCH_expensepersonalres.next())
    {
      var  PDLY_SEARCH_expensepersonalresdate =  PDLY_SEARCH_expensepersonalres.getString("EP_ID");
      PDLY_SEARCH_expensepersonalArray.push( PDLY_SEARCH_expensepersonalresdate);
      if(PDLY_SEARCH_expensepersonalres.getString('EP_INVOICE_FROM')!=null)
        PDLY_SEARCH_dataArray.push(PDLY_SEARCH_expensepersonalres.getString('EP_INVOICE_FROM'));
    }  
    var PDLY_SEARCH_personalexp_Arrayid=[];
    var PDLY_SEARCH_personalexp_Array=[];
    var PDLY_SEARCH_allpersonalexp_Array=[];
    var PDLY_SEARCH_selectTypeofexpensee = "SELECT DISTINCT ECN_ID, ECN_DATA FROM EXPENSE_CONFIGURATION WHERE ECN_ID BETWEEN 51 AND 73 OR (CGN_ID=22) ORDER BY ECN_ID ASC";
    var PDLY_SEARCH_typeofexpensee = PDLY_SEARCH_personalsrch.executeQuery(PDLY_SEARCH_selectTypeofexpensee);
    while(PDLY_SEARCH_typeofexpensee.next())
    {
      var PDLY_SEARCH_exp_expenselist = PDLY_SEARCH_typeofexpensee.getString("ECN_DATA");
      var PDLY_SEARCH_exp_expenselistid = PDLY_SEARCH_typeofexpensee.getString("ECN_ID");
      PDLY_SEARCH_personalexp_Arrayid.push(PDLY_SEARCH_exp_expenselistid);
      PDLY_SEARCH_personalexp_Array.push(PDLY_SEARCH_exp_expenselist);
    }
    
    PDLY_SEARCH_allpersonalexp_Array.push(PDLY_SEARCH_personalexp_Arrayid);
    PDLY_SEARCH_allpersonalexp_Array.push(PDLY_SEARCH_personalexp_Array);
    //HEADER MESSAGE FOR THE FLEX TABLE//
    var PDLY_SEARCH_hdrmsgArray = [];
    var PDLY_SEARCH_errmsgids="2,20,45,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,134,140,170,209,210,211,212,315";
    var PDLY_SEARCH_expenseliste=[];
    PDLY_SEARCH_expenseliste=eilib.GetErrorMessageList(PDLY_SEARCH_conn,PDLY_SEARCH_errmsgids);
    var PDLY_SEARCH_result={'PDLY_SEARCH_dataArray':PDLY_SEARCH_dataArray,'PDLY_SEARCH_expensebabyArray':PDLY_SEARCH_expensebabyArray,'PDLY_SEARCH_expensecarArray':PDLY_SEARCH_expensecarArray,'PDLY_SEARCH_expensecarloanArray':PDLY_SEARCH_expensecarloanArray,'PDLY_SEARCH_expensepersonalArray':PDLY_SEARCH_expensepersonalArray,'PDLY_SEARCH_babyexp_Array':PDLY_SEARCH_babyexpensecategArray,'PDLY_SEARCH_carexpensecategArray':PDLY_SEARCH_carexpensecategArray,'PDLY_SEARCH_personalexpensecategArray':PDLY_SEARCH_personalexpensecategArray,'PDLY_SEARCH_hdrmsgArray':PDLY_SEARCH_expenseliste.errormsg,'PDLY_SEARCH_errorArraye':PDLY_SEARCH_allpersonalexp_Array}
    PDLY_SEARCH_mainArray.push(PDLY_SEARCH_result);
    PDLY_SEARCH_personalsrch.close();
    PDLY_SEARCH_conn.close();
    return PDLY_SEARCH_mainArray;
  }
  //DATAS SEARCH BY BABY EXPENSE FOR DISPLAY IN THE FLEX TABLE//
  function PDLY_SEARCH_searchbybaby(PDLY_SEARCH_typelistvalue,PDLY_SEARCH_startdate,PDLY_SEARCH_enddate,PDLY_SEARCH_babysearch,PDLY_SEARCH_fromamount,PDLY_SEARCH_toamount,PDLY_SEARCH_searchcomments,PDLY_SEARCH_invitemcom,PDLY_SEARCH_invfromcomt,PDLY_SEARCH_babycategory)
  {
    var PDLY_SEARCH_startdate= eilib.SqlDateFormat(PDLY_SEARCH_startdate);
    var PDLY_SEARCH_enddate= eilib.SqlDateFormat(PDLY_SEARCH_enddate);
    var PDLY_SEARCH_sendallbabydata=[];
    var PDLY_SEARCH_conn = eilib.db_GetConnection();
    var PDLY_SEARCH_searchstmt = PDLY_SEARCH_conn.createStatement();
    if(PDLY_SEARCH_searchcomments!='')
      PDLY_SEARCH_searchcomments=eilib.ConvertSpclCharString(PDLY_SEARCH_searchcomments);
    if(PDLY_SEARCH_invfromcomt!='')
      PDLY_SEARCH_invfromcomt=eilib.ConvertSpclCharString(PDLY_SEARCH_invfromcomt)
      if(PDLY_SEARCH_invitemcom!='')
        PDLY_SEARCH_invitemcom=eilib.ConvertSpclCharString(PDLY_SEARCH_invitemcom)
        if(PDLY_SEARCH_typelistvalue==36)
        {
          var PDLY_SEARCH_babyexpense_selectquery=[];
          PDLY_SEARCH_babyexpense_selectquery[56] = "SELECT EXPBABY.EB_ID,EXPBABY.EB_INVOICE_DATE,EXPBABY.EB_AMOUNT,EXPBABY.EB_INVOICE_ITEMS,EXPBABY.EB_INVOICE_FROM,EXPBABY.EB_COMMENTS,ULD.ULD_LOGINID, DATE_FORMAT(CONVERT_TZ(EXPBABY.EB_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_BABY EXPBABY,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPBABY.ULD_ID AND (EXPBABY.EB_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPBABY.EB_COMMENTS='"+PDLY_SEARCH_searchcomments+"') AND (EXPBABY.ECN_ID=EXPCONFIG.ECN_ID) ORDER BY EXPBABY.EB_INVOICE_DATE ASC";
          PDLY_SEARCH_babyexpense_selectquery[52] = "SELECT EXPBABY.EB_ID,EXPBABY.EB_INVOICE_DATE,EXPBABY.EB_AMOUNT,EXPBABY.EB_INVOICE_ITEMS,EXPBABY.EB_INVOICE_FROM,EXPBABY.EB_COMMENTS,ULD.ULD_LOGINID, DATE_FORMAT(CONVERT_TZ(EXPBABY.EB_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_BABY EXPBABY,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPBABY.ULD_ID AND (EXPBABY.EB_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPCONFIG.ECN_DATA='"+PDLY_SEARCH_babycategory+"') AND (EXPBABY.ECN_ID=EXPCONFIG.ECN_ID)ORDER BY EXPBABY.EB_INVOICE_DATE ASC";
          PDLY_SEARCH_babyexpense_selectquery[51] = "SELECT EXPBABY.EB_ID,EXPBABY.EB_INVOICE_DATE,EXPBABY.EB_AMOUNT,EXPBABY.EB_INVOICE_ITEMS,EXPBABY.EB_INVOICE_FROM,EXPBABY.EB_COMMENTS,ULD.ULD_LOGINID, DATE_FORMAT(CONVERT_TZ(EXPBABY.EB_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_BABY EXPBABY,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPBABY.ULD_ID AND (EXPBABY.EB_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPBABY.EB_AMOUNT BETWEEN '"+PDLY_SEARCH_fromamount+"' AND '"+PDLY_SEARCH_toamount+"') AND (EXPBABY.ECN_ID=EXPCONFIG.ECN_ID) ORDER BY EXPBABY.EB_INVOICE_DATE ASC";
          PDLY_SEARCH_babyexpense_selectquery[53] = "SELECT EXPBABY.EB_ID,EXPBABY.EB_INVOICE_DATE,EXPBABY.EB_AMOUNT,EXPBABY.EB_INVOICE_ITEMS,EXPBABY.EB_INVOICE_FROM,EXPBABY.EB_COMMENTS,ULD.ULD_LOGINID, DATE_FORMAT(CONVERT_TZ(EXPBABY.EB_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_BABY EXPBABY,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPBABY.ULD_ID AND (EXPBABY.EB_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPCONFIG.ECN_ID=EXPBABY.ECN_ID) ORDER BY EXPBABY.EB_INVOICE_DATE ASC";
          PDLY_SEARCH_babyexpense_selectquery[55]= "SELECT EXPBABY.EB_ID,EXPBABY.EB_INVOICE_DATE,EXPBABY.EB_AMOUNT,EXPBABY.EB_INVOICE_ITEMS,EXPBABY.EB_INVOICE_FROM,EXPBABY.EB_COMMENTS,ULD.ULD_LOGINID,  DATE_FORMAT(CONVERT_TZ(EXPBABY.EB_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_BABY EXPBABY,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPBABY.ULD_ID AND (EXPBABY.EB_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPBABY.EB_INVOICE_FROM='"+PDLY_SEARCH_invfromcomt+"') AND (EXPBABY.ECN_ID=EXPCONFIG.ECN_ID) ORDER BY EXPBABY.EB_INVOICE_DATE ASC";
          PDLY_SEARCH_babyexpense_selectquery[54] = "SELECT EXPBABY.EB_ID,EXPBABY.EB_INVOICE_DATE,EXPBABY.EB_AMOUNT,EXPBABY.EB_INVOICE_ITEMS,EXPBABY.EB_INVOICE_FROM,EXPBABY.EB_COMMENTS,ULD.ULD_LOGINID, DATE_FORMAT(CONVERT_TZ(EXPBABY.EB_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T')  AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_BABY EXPBABY,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPBABY.ULD_ID AND (EXPBABY.EB_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPBABY.EB_INVOICE_ITEMS='"+PDLY_SEARCH_invitemcom+"') AND (EXPBABY.ECN_ID=EXPCONFIG.ECN_ID) ORDER BY EXPBABY.EB_INVOICE_DATE ASC";
          var PDLY_SEARCH_baby = PDLY_SEARCH_searchstmt.executeQuery(PDLY_SEARCH_babyexpense_selectquery[PDLY_SEARCH_babysearch]);
          while(PDLY_SEARCH_baby.next())
          {  
            var PDLY_SEARCH_baby_id = PDLY_SEARCH_baby.getString("EB_ID");
            var PDLY_SEARCH_type = PDLY_SEARCH_baby.getString("ECN_DATA");
            if(PDLY_SEARCH_type==null){ PDLY_SEARCH_type=""; }    
            var PDLY_SEARCH_date = PDLY_SEARCH_baby.getString("EB_INVOICE_DATE");
            if(PDLY_SEARCH_date==null){ PDLY_SEARCH_date=""; }    
            var PDLY_SEARCH_amount = PDLY_SEARCH_baby.getString("EB_AMOUNT");
            if(PDLY_SEARCH_amount==null){ PDLY_SEARCH_amount=""; }    
            var PDLY_SEARCH_items = PDLY_SEARCH_baby.getString("EB_INVOICE_ITEMS");
            if(PDLY_SEARCH_items==null){ PDLY_SEARCH_items=""; }    
            var PDLY_SEARCH_from = PDLY_SEARCH_baby.getString("EB_INVOICE_FROM");
            if(PDLY_SEARCH_from==null){ PDLY_SEARCH_from=""; }    
            var PDLY_SEARCH_comments = PDLY_SEARCH_baby.getString("EB_COMMENTS");
            if(PDLY_SEARCH_comments==null){ PDLY_SEARCH_comments=""; }    
            var PDLY_SEARCH_userstamp = PDLY_SEARCH_baby.getString("ULD_LOGINID");
            var PDLY_SEARCH_timestamp = PDLY_SEARCH_baby.getString("TIMESTMP");
            var PDLY_SEARCH_result={'PDLY_SEARCH_baby_id':PDLY_SEARCH_baby_id,'PDLY_SEARCH_type':PDLY_SEARCH_type,'PDLY_SEARCH_date':PDLY_SEARCH_date,'PDLY_SEARCH_amount':PDLY_SEARCH_amount,'PDLY_SEARCH_items':PDLY_SEARCH_items,'PDLY_SEARCH_from':PDLY_SEARCH_from,'PDLY_SEARCH_comments':PDLY_SEARCH_comments,'PDLY_SEARCH_userstamp':PDLY_SEARCH_userstamp,'PDLY_SEARCH_timestamp':PDLY_SEARCH_timestamp}
            PDLY_SEARCH_sendallbabydata.push(PDLY_SEARCH_result);
          }
          PDLY_SEARCH_baby.close();
          //SEARCH BY CAR EXPENSE//
        }
    if(PDLY_SEARCH_typelistvalue==35)
    {         
      var PDLY_SEARCH_carexpenseexpense_selectquery=[];;
      PDLY_SEARCH_carexpenseexpense_selectquery[62] = "SELECT EXPCAR.EC_ID,EXPCAR.EC_INVOICE_DATE,EXPCAR.EC_AMOUNT,EXPCAR.EC_INVOICE_ITEMS,EXPCAR.EC_INVOICE_FROM,EXPCAR.EC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPCAR.EC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_CAR EXPCAR,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPCAR.ULD_ID AND (EXPCAR.EC_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPCAR.EC_COMMENTS ='"+PDLY_SEARCH_searchcomments+"') AND (EXPCAR.ECN_ID=EXPCONFIG.ECN_ID) ORDER BY EXPCAR.EC_INVOICE_DATE ASC";
      PDLY_SEARCH_carexpenseexpense_selectquery[58] = "SELECT EXPCAR.EC_ID,EXPCAR.EC_INVOICE_DATE,EXPCAR.EC_AMOUNT,EXPCAR.EC_INVOICE_ITEMS,EXPCAR.EC_INVOICE_FROM,EXPCAR.EC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPCAR.EC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_CAR EXPCAR,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPCAR.ULD_ID AND (EXPCAR.EC_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPCONFIG.ECN_DATA='"+PDLY_SEARCH_babycategory+"') AND (EXPCONFIG.ECN_ID=EXPCAR.ECN_ID)ORDER BY EXPCAR.EC_INVOICE_DATE ASC";
      PDLY_SEARCH_carexpenseexpense_selectquery[57] = "SELECT EXPCAR.EC_ID,EXPCAR.EC_INVOICE_DATE,EXPCAR.EC_AMOUNT,EXPCAR.EC_INVOICE_ITEMS,EXPCAR.EC_INVOICE_FROM,EXPCAR.EC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPCAR.EC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_CAR EXPCAR,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPCAR.ULD_ID AND (EXPCAR.EC_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPCAR.EC_AMOUNT BETWEEN '"+PDLY_SEARCH_fromamount+"' AND '"+PDLY_SEARCH_toamount+"') AND (EXPCAR.ECN_ID=EXPCONFIG.ECN_ID) ORDER BY EXPCAR.EC_INVOICE_DATE ASC";
      PDLY_SEARCH_carexpenseexpense_selectquery[59] = "SELECT EXPCAR.EC_ID,EXPCAR.EC_INVOICE_DATE,EXPCAR.EC_AMOUNT,EXPCAR.EC_INVOICE_ITEMS,EXPCAR.EC_INVOICE_FROM,EXPCAR.EC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPCAR.EC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_CAR EXPCAR,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPCAR.ULD_ID AND (EXPCAR.EC_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPCONFIG.ECN_ID=EXPCAR.ECN_ID) ORDER BY EXPCAR.EC_INVOICE_DATE ASC";
      PDLY_SEARCH_carexpenseexpense_selectquery[61] = "SELECT EXPCAR.EC_ID,EXPCAR.EC_INVOICE_DATE,EXPCAR.EC_AMOUNT,EXPCAR.EC_INVOICE_ITEMS,EXPCAR.EC_INVOICE_FROM,EXPCAR.EC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPCAR.EC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_CAR EXPCAR,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPCAR.ULD_ID AND (EXPCAR.EC_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPCAR.EC_INVOICE_FROM='"+PDLY_SEARCH_invfromcomt+"') AND (EXPCAR.ECN_ID=EXPCONFIG.ECN_ID) ORDER BY EXPCAR.EC_INVOICE_DATE ASC";
      PDLY_SEARCH_carexpenseexpense_selectquery[60] = "SELECT EXPCAR.EC_ID,EXPCAR.EC_INVOICE_DATE,EXPCAR.EC_AMOUNT,EXPCAR.EC_INVOICE_ITEMS,EXPCAR.EC_INVOICE_FROM,EXPCAR.EC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPCAR.EC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_CAR EXPCAR,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPCAR.ULD_ID AND (EXPCAR.EC_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPCAR.EC_INVOICE_ITEMS='"+PDLY_SEARCH_invitemcom+"')AND (EXPCAR.ECN_ID=EXPCONFIG.ECN_ID) ORDER BY EXPCAR.EC_INVOICE_DATE ASC";
      var PDLY_SEARCH_carexpense = PDLY_SEARCH_searchstmt.executeQuery(PDLY_SEARCH_carexpenseexpense_selectquery[PDLY_SEARCH_babysearch]);
      while(PDLY_SEARCH_carexpense.next())
      {   
        var PDLY_SEARCH_baby_id = PDLY_SEARCH_carexpense.getString("EC_ID");
        var PDLY_SEARCH_type = PDLY_SEARCH_carexpense.getString("ECN_DATA");
        if(PDLY_SEARCH_type==null){ PDLY_SEARCH_type=""; }
        var PDLY_SEARCH_date = PDLY_SEARCH_carexpense.getString("EC_INVOICE_DATE");
        if(PDLY_SEARCH_date==null){ PDLY_SEARCH_date=""; }    
        var PDLY_SEARCH_amount = PDLY_SEARCH_carexpense.getString("EC_AMOUNT");
        if(PDLY_SEARCH_amount==null){ PDLY_SEARCH_amount=""; }    
        var PDLY_SEARCH_items = PDLY_SEARCH_carexpense.getString("EC_INVOICE_ITEMS");
        if(PDLY_SEARCH_items==null){ PDLY_SEARCH_items=""; }    
        var PDLY_SEARCH_from = PDLY_SEARCH_carexpense.getString("EC_INVOICE_FROM");
        if(PDLY_SEARCH_from==null){ PDLY_SEARCH_from=""; }    
        var PDLY_SEARCH_comments = PDLY_SEARCH_carexpense.getString("EC_COMMENTS");
        if(PDLY_SEARCH_comments==null){ PDLY_SEARCH_comments=""; }    
        var PDLY_SEARCH_userstamp = PDLY_SEARCH_carexpense.getString("ULD_LOGINID");
        var PDLY_SEARCH_timestamp = PDLY_SEARCH_carexpense.getString("TIMESTMP");
        var PDLY_SEARCH_result={'PDLY_SEARCH_baby_id':PDLY_SEARCH_baby_id,'PDLY_SEARCH_type':PDLY_SEARCH_type,'PDLY_SEARCH_date':PDLY_SEARCH_date,'PDLY_SEARCH_amount':PDLY_SEARCH_amount,'PDLY_SEARCH_items':PDLY_SEARCH_items,'PDLY_SEARCH_from':PDLY_SEARCH_from,'PDLY_SEARCH_comments':PDLY_SEARCH_comments,'PDLY_SEARCH_userstamp':PDLY_SEARCH_userstamp,'PDLY_SEARCH_timestamp':PDLY_SEARCH_timestamp}
        PDLY_SEARCH_sendallbabydata.push(PDLY_SEARCH_result);
      }
      PDLY_SEARCH_carexpense.close();
    }
    //SEARCH BY PERSONAL EXPENSE//
    if(PDLY_SEARCH_typelistvalue==37)
    {
      var PDLY_SEARCH_personalexpenseexpense_selectquery=[];
      PDLY_SEARCH_personalexpenseexpense_selectquery[73] = "SELECT EXPPERSONAL.EP_ID,EXPPERSONAL.EP_INVOICE_DATE,EXPPERSONAL.EP_AMOUNT,EXPPERSONAL.EP_INVOICE_ITEMS,EXPPERSONAL.EP_INVOICE_FROM,EXPPERSONAL.EP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPPERSONAL.EP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_PERSONAL EXPPERSONAL,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPPERSONAL.ULD_ID AND (EXPPERSONAL.EP_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPPERSONAL.EP_COMMENTS='"+PDLY_SEARCH_searchcomments+"') AND (EXPPERSONAL.ECN_ID=EXPCONFIG.ECN_ID) ORDER BY EXPPERSONAL.EP_INVOICE_DATE ASC";
      PDLY_SEARCH_personalexpenseexpense_selectquery[69] = "SELECT EXPPERSONAL.EP_ID,EXPPERSONAL.EP_INVOICE_DATE,EXPPERSONAL.EP_AMOUNT,EXPPERSONAL.EP_INVOICE_ITEMS,EXPPERSONAL.EP_INVOICE_FROM,EXPPERSONAL.EP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPPERSONAL.EP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_PERSONAL EXPPERSONAL,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPPERSONAL.ULD_ID AND (EXPPERSONAL.EP_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPCONFIG.ECN_DATA='"+PDLY_SEARCH_babycategory+"') AND (EXPPERSONAL.ECN_ID=EXPCONFIG.ECN_ID)ORDER BY EXPPERSONAL.EP_INVOICE_DATE ASC";
      PDLY_SEARCH_personalexpenseexpense_selectquery[68] = "SELECT EXPPERSONAL.EP_ID,EXPPERSONAL.EP_INVOICE_DATE,EXPPERSONAL.EP_AMOUNT,EXPPERSONAL.EP_INVOICE_ITEMS,EXPPERSONAL.EP_INVOICE_FROM,EXPPERSONAL.EP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPPERSONAL.EP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_PERSONAL EXPPERSONAL,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPPERSONAL.ULD_ID AND (EXPPERSONAL.EP_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPPERSONAL.EP_AMOUNT BETWEEN '"+PDLY_SEARCH_fromamount+"' AND '"+PDLY_SEARCH_toamount+"') AND (EXPPERSONAL.ECN_ID=EXPCONFIG.ECN_ID) ORDER BY EXPPERSONAL.EP_INVOICE_DATE ASC";
      PDLY_SEARCH_personalexpenseexpense_selectquery[70] = "SELECT EXPPERSONAL.EP_ID,EXPPERSONAL.EP_INVOICE_DATE,EXPPERSONAL.EP_AMOUNT,EXPPERSONAL.EP_INVOICE_ITEMS,EXPPERSONAL.EP_INVOICE_FROM,EXPPERSONAL.EP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPPERSONAL.EP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_PERSONAL EXPPERSONAL,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPPERSONAL.ULD_ID AND (EXPPERSONAL.EP_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPCONFIG.ECN_ID=EXPPERSONAL.ECN_ID) ORDER BY EXPPERSONAL.EP_INVOICE_DATE ASC";
      PDLY_SEARCH_personalexpenseexpense_selectquery[72] = "SELECT EXPPERSONAL.EP_ID,EXPPERSONAL.EP_INVOICE_DATE,EXPPERSONAL.EP_AMOUNT,EXPPERSONAL.EP_INVOICE_ITEMS,EXPPERSONAL.EP_INVOICE_FROM,EXPPERSONAL.EP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPPERSONAL.EP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_PERSONAL EXPPERSONAL,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPPERSONAL.ULD_ID AND (EXPPERSONAL.EP_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPPERSONAL.EP_INVOICE_FROM='"+PDLY_SEARCH_invfromcomt+"') AND (EXPPERSONAL.ECN_ID=EXPCONFIG.ECN_ID) ORDER BY EXPPERSONAL.EP_INVOICE_DATE ASC";
      PDLY_SEARCH_personalexpenseexpense_selectquery[71] = "SELECT EXPPERSONAL.EP_ID,EXPPERSONAL.EP_INVOICE_DATE,EXPPERSONAL.EP_AMOUNT,EXPPERSONAL.EP_INVOICE_ITEMS,EXPPERSONAL.EP_INVOICE_FROM,EXPPERSONAL.EP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPPERSONAL.EP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,EXPCONFIG.ECN_DATA FROM EXPENSE_PERSONAL EXPPERSONAL,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPPERSONAL.ULD_ID AND (EXPPERSONAL.EP_INVOICE_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (EXPPERSONAL.EP_INVOICE_ITEMS='"+PDLY_SEARCH_invitemcom+"') AND (EXPPERSONAL.ECN_ID=EXPCONFIG.ECN_ID) ORDER BY EXPPERSONAL.EP_INVOICE_DATE ASC";
      var PDLY_SEARCH_personalexpense = PDLY_SEARCH_searchstmt.executeQuery( PDLY_SEARCH_personalexpenseexpense_selectquery[PDLY_SEARCH_babysearch]);
      while(PDLY_SEARCH_personalexpense.next())
      {  
        var PDLY_SEARCH_baby_id = PDLY_SEARCH_personalexpense.getString("EP_ID");
        var PDLY_SEARCH_type = PDLY_SEARCH_personalexpense.getString("ECN_DATA");
        if(PDLY_SEARCH_type==null){ PDLY_SEARCH_type=""; }    
        var PDLY_SEARCH_date = PDLY_SEARCH_personalexpense.getString("EP_INVOICE_DATE");
        if(PDLY_SEARCH_date==null){ PDLY_SEARCH_date=""; }    
        var PDLY_SEARCH_amount = PDLY_SEARCH_personalexpense.getString("EP_AMOUNT");
        if(PDLY_SEARCH_amount==null){ PDLY_SEARCH_amount=""; }    
        var PDLY_SEARCH_items = PDLY_SEARCH_personalexpense.getString("EP_INVOICE_ITEMS");
        if(PDLY_SEARCH_items==null){ PDLY_SEARCH_items=""; }    
        var PDLY_SEARCH_from = PDLY_SEARCH_personalexpense.getString("EP_INVOICE_FROM");
        if(PDLY_SEARCH_from==null){ PDLY_SEARCH_from=""; }    
        var PDLY_SEARCH_comments = PDLY_SEARCH_personalexpense.getString("EP_COMMENTS");
        if(PDLY_SEARCH_comments==null){ PDLY_SEARCH_comments=""; }    
        var PDLY_SEARCH_userstamp = PDLY_SEARCH_personalexpense.getString("ULD_LOGINID");
        var PDLY_SEARCH_timestamp = PDLY_SEARCH_personalexpense.getString("TIMESTMP");
        var PDLY_SEARCH_result={'PDLY_SEARCH_baby_id':PDLY_SEARCH_baby_id,'PDLY_SEARCH_type':PDLY_SEARCH_type,'PDLY_SEARCH_date':PDLY_SEARCH_date,'PDLY_SEARCH_amount':PDLY_SEARCH_amount,'PDLY_SEARCH_items':PDLY_SEARCH_items,'PDLY_SEARCH_from':PDLY_SEARCH_from,'PDLY_SEARCH_comments':PDLY_SEARCH_comments,'PDLY_SEARCH_userstamp':PDLY_SEARCH_userstamp,'PDLY_SEARCH_timestamp':PDLY_SEARCH_timestamp}
        PDLY_SEARCH_sendallbabydata.push(PDLY_SEARCH_result);
      }
      PDLY_SEARCH_personalexpense.close();
    }
    //SEARCH BY CAR LOAN//
    if(PDLY_SEARCH_typelistvalue==38)
    {
      var PDLY_SEARCH_carloanexpenseamt_selectquery=[];
      PDLY_SEARCH_carloanexpenseamt_selectquery[65] = "SELECT EXPENSE_CAR_LOAN.ECL_ID,EXPENSE_CAR_LOAN.ECL_PAID_DATE,EXPENSE_CAR_LOAN.ECL_AMOUNT,EXPENSE_CAR_LOAN.ECL_TO_PERIOD,EXPENSE_CAR_LOAN.ECL_FROM_PERIOD,EXPENSE_CAR_LOAN.ECL_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPENSE_CAR_LOAN.ECL_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EXPENSE_CAR_LOAN ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPENSE_CAR_LOAN.ULD_ID AND (ECL_PAID_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (ECL_AMOUNT BETWEEN '"+PDLY_SEARCH_fromamount+"' AND '"+PDLY_SEARCH_toamount+"')ORDER BY ECL_PAID_DATE ASC";
      PDLY_SEARCH_carloanexpenseamt_selectquery[67] = "SELECT EXPENSE_CAR_LOAN.ECL_ID,EXPENSE_CAR_LOAN.ECL_PAID_DATE,EXPENSE_CAR_LOAN.ECL_AMOUNT,EXPENSE_CAR_LOAN.ECL_TO_PERIOD,EXPENSE_CAR_LOAN.ECL_FROM_PERIOD,EXPENSE_CAR_LOAN.ECL_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPENSE_CAR_LOAN.ECL_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EXPENSE_CAR_LOAN ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPENSE_CAR_LOAN.ULD_ID AND (ECL_PAID_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') AND (ECL_COMMENTS='"+PDLY_SEARCH_searchcomments+"')ORDER BY ECL_PAID_DATE ASC";
      PDLY_SEARCH_carloanexpenseamt_selectquery[63] = "SELECT EXPENSE_CAR_LOAN.ECL_ID,EXPENSE_CAR_LOAN.ECL_PAID_DATE,EXPENSE_CAR_LOAN.ECL_AMOUNT,EXPENSE_CAR_LOAN.ECL_TO_PERIOD,EXPENSE_CAR_LOAN.ECL_FROM_PERIOD,EXPENSE_CAR_LOAN.ECL_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPENSE_CAR_LOAN.ECL_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EXPENSE_CAR_LOAN ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPENSE_CAR_LOAN.ULD_ID AND (ECL_PAID_DATE BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') ORDER BY ECL_PAID_DATE ASC";
      PDLY_SEARCH_carloanexpenseamt_selectquery[66] = "SELECT EXPENSE_CAR_LOAN.ECL_ID,EXPENSE_CAR_LOAN.ECL_PAID_DATE,EXPENSE_CAR_LOAN.ECL_AMOUNT,EXPENSE_CAR_LOAN.ECL_TO_PERIOD,EXPENSE_CAR_LOAN.ECL_FROM_PERIOD,EXPENSE_CAR_LOAN.ECL_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPENSE_CAR_LOAN.ECL_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EXPENSE_CAR_LOAN ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPENSE_CAR_LOAN.ULD_ID AND (ECL_FROM_PERIOD BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') ORDER BY ECL_PAID_DATE ASC";
      PDLY_SEARCH_carloanexpenseamt_selectquery[64] = "SELECT EXPENSE_CAR_LOAN.ECL_ID,EXPENSE_CAR_LOAN.ECL_PAID_DATE,EXPENSE_CAR_LOAN.ECL_AMOUNT,EXPENSE_CAR_LOAN.ECL_TO_PERIOD,EXPENSE_CAR_LOAN.ECL_FROM_PERIOD,EXPENSE_CAR_LOAN.ECL_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EXPENSE_CAR_LOAN.ECL_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP FROM EXPENSE_CAR_LOAN ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EXPENSE_CAR_LOAN.ULD_ID AND (ECL_TO_PERIOD BETWEEN '"+PDLY_SEARCH_startdate+"' AND '"+PDLY_SEARCH_enddate+"') ORDER BY ECL_PAID_DATE ASC";
      var PDLY_SEARCH_carloanexpense = PDLY_SEARCH_searchstmt.executeQuery(PDLY_SEARCH_carloanexpenseamt_selectquery[PDLY_SEARCH_babysearch]);
      while(PDLY_SEARCH_carloanexpense.next())
      { 
        var PDLY_SEARCH_baby_id = PDLY_SEARCH_carloanexpense.getString("ECL_ID");
        var PDLY_SEARCH_type = "";
        var PDLY_SEARCH_date = PDLY_SEARCH_carloanexpense.getString("ECL_PAID_DATE");
        if(PDLY_SEARCH_date==null){ PDLY_SEARCH_date=""; }    
        var PDLY_SEARCH_amount = PDLY_SEARCH_carloanexpense.getString("ECL_AMOUNT");
        if(PDLY_SEARCH_amount==null){ PDLY_SEARCH_amount=""; }    
        var PDLY_SEARCH_items = PDLY_SEARCH_carloanexpense.getString("ECL_TO_PERIOD");
        if(PDLY_SEARCH_items==null){ PDLY_SEARCH_items=""; }    
        var PDLY_SEARCH_from = PDLY_SEARCH_carloanexpense.getString("ECL_FROM_PERIOD");
        if(PDLY_SEARCH_from==null){ PDLY_SEARCH_from=""; }    
        var PDLY_SEARCH_comments = PDLY_SEARCH_carloanexpense.getString("ECL_COMMENTS");
        if(PDLY_SEARCH_comments==null){ PDLY_SEARCH_comments=""; }    
        var PDLY_SEARCH_userstamp = PDLY_SEARCH_carloanexpense.getString("ULD_LOGINID");
        var PDLY_SEARCH_timestamp = PDLY_SEARCH_carloanexpense.getString("TIMESTMP");
        var PDLY_SEARCH_result={'PDLY_SEARCH_baby_id':PDLY_SEARCH_baby_id,'PDLY_SEARCH_type':PDLY_SEARCH_type,'PDLY_SEARCH_date':PDLY_SEARCH_date,'PDLY_SEARCH_amount':PDLY_SEARCH_amount,'PDLY_SEARCH_items':PDLY_SEARCH_items,'PDLY_SEARCH_from':PDLY_SEARCH_from,'PDLY_SEARCH_comments':PDLY_SEARCH_comments,'PDLY_SEARCH_userstamp':PDLY_SEARCH_userstamp,'PDLY_SEARCH_timestamp':PDLY_SEARCH_timestamp}
        PDLY_SEARCH_sendallbabydata.push(PDLY_SEARCH_result);
      }
      PDLY_SEARCH_carloanexpense.close();
    }
    PDLY_SEARCH_searchstmt.close();
    PDLY_SEARCH_conn.close();
    return PDLY_SEARCH_sendallbabydata;
  }
  //GET THE TYPE OF CATEGORY VALUE//
  function PDLY_SEARCH_getbabycategoryvalue(PDLY_SEARCH_lb_babysearchoptionvalue)
  {
    var PDLY_SEARCH_conn = eilib.db_GetConnection();
    var PDLY_SEARCH_babyexpensecategArray=[];
    var PDLY_SEARCH_categorystmt = PDLY_SEARCH_conn.createStatement();
    if(PDLY_SEARCH_lb_babysearchoptionvalue==52)
    {
      var PDLY_SEARCH_babyexpensecategory_selectquery = "SELECT DISTINCT ECN_DATA FROM EXPENSE_CONFIGURATION EXPCONFIG,EXPENSE_BABY EXPBABY WHERE (EXPCONFIG.ECN_ID=EXPBABY.ECN_ID) ORDER BY ECN_DATA ASC";
      var PDLY_SEARCH_baby = PDLY_SEARCH_categorystmt.executeQuery(PDLY_SEARCH_babyexpensecategory_selectquery);
      while(PDLY_SEARCH_baby.next())
      {
        var PDLY_SEARCH_babycategory = PDLY_SEARCH_baby.getString("ECN_DATA");
        PDLY_SEARCH_babyexpensecategArray.push(PDLY_SEARCH_babycategory);
      }
      PDLY_SEARCH_baby.close();
    }
    if(PDLY_SEARCH_lb_babysearchoptionvalue==58)
    {
      var PDLY_SEARCH_babyexpensecategory_selectquery = "SELECT DISTINCT ECN_DATA FROM EXPENSE_CONFIGURATION EXPCONFIG,EXPENSE_CAR EXPCAR WHERE (EXPCONFIG.ECN_ID=EXPCAR.ECN_ID) ORDER BY ECN_DATA ASC";
      var PDLY_SEARCH_baby = PDLY_SEARCH_categorystmt.executeQuery(PDLY_SEARCH_babyexpensecategory_selectquery);
      while(PDLY_SEARCH_baby.next())
      {
        var PDLY_SEARCH_babycategory = PDLY_SEARCH_baby.getString("ECN_DATA");
        PDLY_SEARCH_babyexpensecategArray.push(PDLY_SEARCH_babycategory);
      }
      PDLY_SEARCH_baby.close();
    }
    if(PDLY_SEARCH_lb_babysearchoptionvalue==69)
    {
      var PDLY_SEARCH_personalexpensecategory_selectquery = "SELECT DISTINCT ECN_DATA FROM EXPENSE_CONFIGURATION EXPCONFIG,EXPENSE_PERSONAL EXPPERSONAL WHERE (EXPCONFIG.ECN_ID=EXPPERSONAL.ECN_ID) ORDER BY ECN_DATA ASC";
      var PDLY_SEARCH_personalexpense_rs = PDLY_SEARCH_categorystmt.executeQuery(PDLY_SEARCH_personalexpensecategory_selectquery);
      while(PDLY_SEARCH_personalexpense_rs.next())
      {
        var PDLY_SEARCH_personalexpensecategory = PDLY_SEARCH_personalexpense_rs.getString("ECN_DATA");
        PDLY_SEARCH_babyexpensecategArray.push(PDLY_SEARCH_personalexpensecategory);
      }
      PDLY_SEARCH_personalexpense_rs.close();
    }
    PDLY_SEARCH_categorystmt.close();
    PDLY_SEARCH_conn.close();
    return PDLY_SEARCH_babyexpensecategArray;
  }
  //UPDATE ALL DATAS IN  CHANGES IN THE UPDATE FORM//
  function PDLY_SEARCH_updatealldetails(PDLY_SEARCH_updateformid)
  { 
    var PDLY_SEARCH_conn = eilib.db_GetConnection();
    PDLY_SEARCH_conn.setAutoCommit(false);
    var PDLY_SEARCH_updateexp = PDLY_SEARCH_conn.createStatement();
    var PDLY_SEARCH_User_Stamp = Session.getUser().getEmail();  
    var PDLY_SEARCH_UserStampId=eilib.getUserStampId(PDLY_SEARCH_conn,UserStamp)
    var PDLY_SEARCH_typeofexpense = PDLY_SEARCH_updateformid.PDLY_SEARCH_lb_typelist;
    if((PDLY_SEARCH_typeofexpense==36)||(PDLY_SEARCH_typeofexpense==35)||(PDLY_SEARCH_typeofexpense==37))
    {
      var PDLY_SEARCH_id = PDLY_SEARCH_updateformid.PDLY_SEARCH_tb_hideid;
      var PDLY_SEARCH_lbbabyexpense = PDLY_SEARCH_updateformid.PDLY_SEARCH_lb_category;
      var PDLY_SEARCH_dbinvoicedate = PDLY_SEARCH_updateformid.PDLY_SEARCH_db_invdate;
      var PDLY_SEARCH_babyfullamount = PDLY_SEARCH_updateformid.PDLY_SEARCH_tb_incamtrp;
      var PDLY_SEARCH_invoiceitems = PDLY_SEARCH_updateformid.PDLY_SEARCH_ta_invitem;
      PDLY_SEARCH_invoiceitems=eilib.ConvertSpclCharString(PDLY_SEARCH_invoiceitems)
      var PDLY_SEARCH_invoicefrom = PDLY_SEARCH_updateformid.PDLY_SEARCH_tb_invfrom;
      PDLY_SEARCH_invoicefrom=eilib.ConvertSpclCharString(PDLY_SEARCH_invoicefrom)
      var PDLY_SEARCH_comments = PDLY_SEARCH_updateformid.PDLY_SEARCH_tb_comments;
      if(PDLY_SEARCH_comments=="")//COMMENTS
      {  PDLY_SEARCH_comments=null;}else{
        PDLY_SEARCH_comments='"'+eilib.ConvertSpclCharString(PDLY_SEARCH_comments)+'"';}
      var PDLY_SEARCH_dbinvoicedate= eilib.SqlDateFormat(PDLY_SEARCH_dbinvoicedate);
      var PDLY_SEARCH_id = PDLY_SEARCH_updateformid.PDLY_SEARCH_tb_hideid;
      if(PDLY_SEARCH_typeofexpense==36)
      {
        var PDLY_SEARCH_babyexpense_update_query = "UPDATE EXPENSE_BABY SET EB_INVOICE_DATE='"+PDLY_SEARCH_dbinvoicedate+"',EB_AMOUNT="+PDLY_SEARCH_babyfullamount+",EB_INVOICE_ITEMS='"+PDLY_SEARCH_invoiceitems+"',EB_INVOICE_FROM='"+PDLY_SEARCH_invoicefrom+"',EB_COMMENTS="+PDLY_SEARCH_comments+",ULD_ID="+PDLY_SEARCH_UserStampId+",ECN_ID=(SELECT ECN_ID FROM EXPENSE_CONFIGURATION WHERE ECN_DATA='"+PDLY_SEARCH_lbbabyexpense+"') WHERE EB_ID="+PDLY_SEARCH_id+"";
        PDLY_SEARCH_updateexp.execute(PDLY_SEARCH_babyexpense_update_query);
      }
      if(PDLY_SEARCH_typeofexpense==35)
      {
        var PDLY_SEARCH_carexpense_update_query = "UPDATE EXPENSE_CAR SET EC_INVOICE_DATE='"+PDLY_SEARCH_dbinvoicedate+"',EC_AMOUNT='"+PDLY_SEARCH_babyfullamount+"',EC_INVOICE_ITEMS='"+PDLY_SEARCH_invoiceitems+"',EC_INVOICE_FROM='"+PDLY_SEARCH_invoicefrom+"',EC_COMMENTS="+PDLY_SEARCH_comments+",ULD_ID="+PDLY_SEARCH_UserStampId+",ECN_ID=(SELECT ECN_ID FROM EXPENSE_CONFIGURATION WHERE ECN_DATA='"+PDLY_SEARCH_lbbabyexpense+"') WHERE EC_ID="+PDLY_SEARCH_id+"";
        PDLY_SEARCH_updateexp.execute(PDLY_SEARCH_carexpense_update_query);
      }
      if(PDLY_SEARCH_typeofexpense==37)
      {
        var PDLY_SEARCH_personalexpense_update_query = "UPDATE EXPENSE_PERSONAL SET EP_INVOICE_DATE='"+PDLY_SEARCH_dbinvoicedate+"',EP_AMOUNT='"+PDLY_SEARCH_babyfullamount+"',EP_INVOICE_ITEMS='"+PDLY_SEARCH_invoiceitems+"',EP_INVOICE_FROM='"+PDLY_SEARCH_invoicefrom+"',EP_COMMENTS="+PDLY_SEARCH_comments+",ULD_ID="+PDLY_SEARCH_UserStampId+",ECN_ID=(SELECT ECN_ID FROM EXPENSE_CONFIGURATION WHERE ECN_DATA='"+PDLY_SEARCH_lbbabyexpense+"' AND CGN_ID=24) WHERE EP_ID="+PDLY_SEARCH_id+"";
        PDLY_SEARCH_updateexp.execute(PDLY_SEARCH_personalexpense_update_query);
      }
    } 
    if(PDLY_SEARCH_typeofexpense==38)
    {
      var PDLY_SEARCH_id = PDLY_SEARCH_updateformid.PDLY_SEARCH_tb_hideid;
      var PDLY_SEARCH_carloanpaiddate = PDLY_SEARCH_updateformid.PDLY_SEARCH_db_carpaiddate;
      var PDLY_SEARCH_carloanfromdate = PDLY_SEARCH_updateformid.PDLY_SEARCH_db_carfromdate;
      var PDLY_SEARCH_carloantodate = PDLY_SEARCH_updateformid.PDLY_SEARCH_db_cartodate;
      var PDLY_SEARCH_carloanamt = PDLY_SEARCH_updateformid.PDLY_SEARCH_tb_carloanamt;
      var PDLY_SEARCH_carloancomments = PDLY_SEARCH_updateformid.PDLY_SEARCH_ta_carloancmt;
      if(PDLY_SEARCH_carloancomments=="")//COMMENTS
      {  PDLY_SEARCH_carloancomments=null;}else{
        PDLY_SEARCH_carloancomments='"'+eilib.ConvertSpclCharString(PDLY_SEARCH_carloancomments)+'"';}
      var PDLY_SEARCH_carloanpaiddate= eilib.SqlDateFormat(PDLY_SEARCH_carloanpaiddate);
      var PDLY_SEARCH_carloanfromdate= eilib.SqlDateFormat(PDLY_SEARCH_carloanfromdate);
      var PDLY_SEARCH_carloantodate= eilib.SqlDateFormat(PDLY_SEARCH_carloantodate);
      var PDLY_SEARCH_carloan_update_query = "UPDATE EXPENSE_CAR_LOAN SET ECL_PAID_DATE='"+PDLY_SEARCH_carloanpaiddate+"',ECL_FROM_PERIOD='"+PDLY_SEARCH_carloanfromdate+"',ECL_TO_PERIOD='"+PDLY_SEARCH_carloantodate+"',ECL_AMOUNT='"+PDLY_SEARCH_carloanamt+"',ECL_COMMENTS="+PDLY_SEARCH_carloancomments+",ULD_ID="+PDLY_SEARCH_UserStampId+" WHERE ECL_ID="+PDLY_SEARCH_id+"";
      PDLY_SEARCH_updateexp.execute(PDLY_SEARCH_carloan_update_query);
    }
    PDLY_SEARCH_updateexp.close();
    PDLY_SEARCH_conn.commit();
    PDLY_SEARCH_conn.close();
    return ;
  }
  // AUTO COMPLETION  FOR   COMMENTS SEARCH//
  function PDLY_SEARCH_getMatchText(PDLY_SEARCH_lb_typelistvalue,PDLY_SEARCH_lb_getstartvaluevalue,PDLY_SEARCH_lb_getendvaluevalue)
  {
    var dataArray=[];
    var PDLY_SEARCH_conn = eilib.db_GetConnection();
    var enddate=eilib.SqlDateFormat(PDLY_SEARCH_lb_getendvaluevalue);
    var startdate=eilib.SqlDateFormat(PDLY_SEARCH_lb_getstartvaluevalue);
    var PDLY_SEARCH_stmt=PDLY_SEARCH_conn.createStatement();
    if(PDLY_SEARCH_lb_typelistvalue==36)
    {
      var PDLY_SEARCH_expbabycmtquery="SELECT DISTINCT EB_COMMENTS FROM EXPENSE_BABY WHERE EB_INVOICE_DATE BETWEEN '"+startdate+"' AND '"+enddate+"' AND EB_COMMENTS IS NOT NULL";
      var PDLY_SEARCH_babycmtrst = PDLY_SEARCH_stmt.executeQuery(PDLY_SEARCH_expbabycmtquery);
      while(PDLY_SEARCH_babycmtrst.next()) {
        if(PDLY_SEARCH_babycmtrst.getString('EB_COMMENTS')!=null)
          dataArray.push(PDLY_SEARCH_babycmtrst.getString('EB_COMMENTS'));
      }
      PDLY_SEARCH_babycmtrst.close();
    }
    if(PDLY_SEARCH_lb_typelistvalue==35)
    {
      var PDLY_SEARCH_expcarcmtquery="SELECT DISTINCT EC_COMMENTS FROM EXPENSE_CAR WHERE EC_INVOICE_DATE  BETWEEN '"+startdate+"' AND '"+enddate+"' AND EC_COMMENTS IS NOT NULL";
      var PDLY_SEARCH_searchresult = PDLY_SEARCH_stmt.executeQuery(PDLY_SEARCH_expcarcmtquery);
      while(PDLY_SEARCH_searchresult.next()) {
        if(PDLY_SEARCH_searchresult.getString('EC_COMMENTS')!=null)
          dataArray.push(PDLY_SEARCH_searchresult.getString('EC_COMMENTS'));
      }
      PDLY_SEARCH_searchresult.close();
    }
    if(PDLY_SEARCH_lb_typelistvalue==37)
    {
      var PDLY_SEARCH_exppercmtquery="SELECT DISTINCT EP_COMMENTS FROM EXPENSE_PERSONAL WHERE EP_INVOICE_DATE BETWEEN '"+startdate+"' AND '"+enddate+"' AND EP_COMMENTS IS NOT NULL";
      var PDLY_SEARCH_searchresult = PDLY_SEARCH_stmt.executeQuery(PDLY_SEARCH_exppercmtquery);
      while(PDLY_SEARCH_searchresult.next()) {
        if(PDLY_SEARCH_searchresult.getString('EP_COMMENTS')!=null)
          dataArray.push(PDLY_SEARCH_searchresult.getString('EP_COMMENTS'));
      }
      PDLY_SEARCH_searchresult.close();
    }
    if(PDLY_SEARCH_lb_typelistvalue==38)
    {
      var PDLY_SEARCH_expcarlncmtquery="SELECT DISTINCT ECL_COMMENTS FROM EXPENSE_CAR_LOAN WHERE ECL_PAID_DATE BETWEEN '"+startdate+"' AND '"+enddate+"' AND ECL_COMMENTS IS NOT NULL";
      var PDLY_SEARCH_searchresult = PDLY_SEARCH_stmt.executeQuery(PDLY_SEARCH_expcarlncmtquery);
      while(PDLY_SEARCH_searchresult.next()) {
        if(PDLY_SEARCH_searchresult.getString('ECL_COMMENTS')!=null)
          dataArray.push(PDLY_SEARCH_searchresult.getString('ECL_COMMENTS'));
      }
      PDLY_SEARCH_searchresult.close();
    }
    PDLY_SEARCH_stmt.close();
    PDLY_SEARCH_conn.close();
    return dataArray;
  }
  //GET THE INVOICE FROM DATA FROM THE DB...................
  function PDLY_SEARCH_invfroandamtmgetMatchText(PDLY_SEARCH_lb_typelistvalue,PDLY_SEARCH_lb_getstartvaluevalue,PDLY_SEARCH_lb_getendvaluevalue,PDLY_SEARCH_lb_babysearchoptionvalue)
  {
    var dataArray=[];
    var enddate=eilib.SqlDateFormat(PDLY_SEARCH_lb_getendvaluevalue);
    var startdate=eilib.SqlDateFormat(PDLY_SEARCH_lb_getstartvaluevalue);
    var PDLY_SEARCH_conn = eilib.db_GetConnection();
    var PDLY_SEARCH_stmt=PDLY_SEARCH_conn.createStatement();
    if(PDLY_SEARCH_lb_typelistvalue==36)
    {
      if(PDLY_SEARCH_lb_babysearchoptionvalue==55)
      {
        var PDLY_SEARCH_expbabylninvfrmquery="SELECT DISTINCT EB_INVOICE_FROM FROM EXPENSE_BABY WHERE EB_INVOICE_DATE BETWEEN '"+startdate+"' AND '"+enddate+"' AND EB_INVOICE_FROM IS NOT NULL";
        var PDLY_SEARCH_lninvfrm = PDLY_SEARCH_stmt.executeQuery(PDLY_SEARCH_expbabylninvfrmquery);
        while(PDLY_SEARCH_lninvfrm.next()) {
          if(PDLY_SEARCH_lninvfrm.getString('EB_INVOICE_FROM')!=null)
            dataArray.push(PDLY_SEARCH_lninvfrm.getString('EB_INVOICE_FROM'));
        }
      }
      if(PDLY_SEARCH_lb_babysearchoptionvalue==54)
      {
        var PDLY_SEARCH_expbabylninvitmquery="SELECT DISTINCT EB_INVOICE_ITEMS FROM EXPENSE_BABY WHERE EB_INVOICE_DATE BETWEEN '"+startdate+"' AND '"+enddate+"' AND EB_INVOICE_ITEMS IS NOT NULL";
        var PDLY_SEARCH_searchresult = PDLY_SEARCH_stmt.executeQuery(PDLY_SEARCH_expbabylninvitmquery);
        while(PDLY_SEARCH_searchresult.next()) {
          if(PDLY_SEARCH_searchresult.getString('EB_INVOICE_ITEMS')!=null)
            dataArray.push(PDLY_SEARCH_searchresult.getString('EB_INVOICE_ITEMS'));
        }
      }
    }
    if(PDLY_SEARCH_lb_typelistvalue==35)
    {    
      if(PDLY_SEARCH_lb_babysearchoptionvalue==61)
      {    
        var PDLY_SEARCH_expcarlninvfrmquery="SELECT DISTINCT EC_INVOICE_FROM FROM EXPENSE_CAR  WHERE EC_INVOICE_DATE  BETWEEN '"+startdate+"' AND '"+enddate+"' AND EC_INVOICE_FROM IS NOT NULL";
        var PDLY_SEARCH_searchresult = PDLY_SEARCH_stmt.executeQuery(PDLY_SEARCH_expcarlninvfrmquery);
        while(PDLY_SEARCH_searchresult.next()) {
          if(PDLY_SEARCH_searchresult.getString('EC_INVOICE_FROM')!=null)
            dataArray.push(PDLY_SEARCH_searchresult.getString('EC_INVOICE_FROM'));
        }
      }
      if(PDLY_SEARCH_lb_babysearchoptionvalue==60)
      {
        var PDLY_SEARCH_expcarlninvitmquery="SELECT DISTINCT EC_INVOICE_ITEMS FROM EXPENSE_CAR WHERE EC_INVOICE_DATE  BETWEEN '"+startdate+"' AND '"+enddate+"' AND EC_INVOICE_ITEMS IS NOT NULL";
        var PDLY_SEARCH_searchresult = PDLY_SEARCH_stmt.executeQuery(PDLY_SEARCH_expcarlninvitmquery);
        while(PDLY_SEARCH_searchresult.next()) {
          if(PDLY_SEARCH_searchresult.getString('EC_INVOICE_ITEMS')!=null)
            dataArray.push(PDLY_SEARCH_searchresult.getString('EC_INVOICE_ITEMS'));
        }
      }
    }
    if(PDLY_SEARCH_lb_typelistvalue==37)
    {
      if(PDLY_SEARCH_lb_babysearchoptionvalue==72)
      {
        var PDLY_SEARCH_expperlninvfrmquery="SELECT DISTINCT EP_INVOICE_FROM FROM EXPENSE_PERSONAL WHERE EP_INVOICE_DATE BETWEEN '"+startdate+"' AND '"+enddate+"' AND EP_INVOICE_FROM IS NOT NULL";
        var PDLY_SEARCH_searchresult = PDLY_SEARCH_stmt.executeQuery(PDLY_SEARCH_expperlninvfrmquery);
        while(PDLY_SEARCH_searchresult.next()) {
          if(PDLY_SEARCH_searchresult.getString('EP_INVOICE_FROM')!=null)
            dataArray.push(PDLY_SEARCH_searchresult.getString('EP_INVOICE_FROM'));
        }
      }
      if(PDLY_SEARCH_lb_babysearchoptionvalue==71)
      {
        var PDLY_SEARCH_expperlninvitmquery="SELECT DISTINCT EP_INVOICE_ITEMS FROM EXPENSE_PERSONAL WHERE EP_INVOICE_DATE BETWEEN '"+startdate+"' AND '"+enddate+"' AND EP_INVOICE_ITEMS IS NOT NULL";
        var PDLY_SEARCH_searchresult = PDLY_SEARCH_stmt.executeQuery(PDLY_SEARCH_expperlninvitmquery);
        while(PDLY_SEARCH_searchresult.next()) {
          if(PDLY_SEARCH_searchresult.getString('EP_INVOICE_ITEMS')!=null)
            dataArray.push(PDLY_SEARCH_searchresult.getString('EP_INVOICE_ITEMS'));
        }
      }
    }
    PDLY_SEARCH_stmt.close();
    PDLY_SEARCH_conn.close();
    return dataArray;
  }
  // CODING FOR PERSONAL EXPENSE  DELETE //
  function  PDLY_SEARCH_delete(PDLY_SEARCH_lb_typelistvalue,PDLY_SEARCH_radiovalue,PDLY_SEARCH_lb_getstartvaluevalue,PDLY_SEARCH_lb_getendvaluevalue,PDLY_SEARCH_lb_babysearchoptionvalue)
  {
    var PDLY_SEARCH_conn = eilib.db_GetConnection();
    var PDLY_SEARCH_twodimen={36:['EXPENSE_BABY',66],37:['EXPENSE_PERSONAL',64],35:['EXPENSE_CAR',65],38:['EXPENSE_CAR_LOAN',67]}
    var PDLY_SEARCH_flag_delete=eilib.DeleteRecord(PDLY_SEARCH_conn,PDLY_SEARCH_twodimen[PDLY_SEARCH_lb_typelistvalue][1],PDLY_SEARCH_radiovalue)
    var PDLY_SEARCH_ref_autocom=[];
    if((PDLY_SEARCH_lb_babysearchoptionvalue==54)||(PDLY_SEARCH_lb_babysearchoptionvalue==55)||(PDLY_SEARCH_lb_babysearchoptionvalue==60)||(PDLY_SEARCH_lb_babysearchoptionvalue==61)||(PDLY_SEARCH_lb_babysearchoptionvalue==72)||(PDLY_SEARCH_lb_babysearchoptionvalue==71))
    PDLY_SEARCH_ref_autocom=PDLY_SEARCH_invfroandamtmgetMatchText(PDLY_SEARCH_lb_typelistvalue,PDLY_SEARCH_lb_getstartvaluevalue,PDLY_SEARCH_lb_getendvaluevalue,PDLY_SEARCH_lb_babysearchoptionvalue);
    else if((PDLY_SEARCH_lb_babysearchoptionvalue==56)||(PDLY_SEARCH_lb_babysearchoptionvalue==62)||(PDLY_SEARCH_lb_babysearchoptionvalue==73)||(PDLY_SEARCH_lb_babysearchoptionvalue==67))
    PDLY_SEARCH_ref_autocom=PDLY_SEARCH_getMatchText(PDLY_SEARCH_lb_typelistvalue,PDLY_SEARCH_lb_getstartvaluevalue,PDLY_SEARCH_lb_getendvaluevalue,PDLY_SEARCH_lb_babysearchoptionvalue);
    PDLY_SEARCH_conn.close();
    return [PDLY_SEARCH_flag_delete,PDLY_SEARCH_ref_autocom];
  }
}
catch(err)
{  
} 
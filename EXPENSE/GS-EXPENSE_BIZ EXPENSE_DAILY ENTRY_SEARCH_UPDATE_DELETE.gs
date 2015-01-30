//*******************************************FILE DESCRIPTION*********************************************//
/*********************************BIZ EXPENSE DAILY:SEARCH/UPDATE/DELETE*******************************/
//DONE BY:PUNI
//VER 1.9-SD:09/10/2014 ED:09/10/2014,TRACKER NO:511,corrected script for preloader,msgbox position
//DONE BY:SARADAMBAL M
//VER 1.8-SD:15/09/2014 ED:15/09/2014,TRACKER NO:511,implemented script for preloader,msgbox
//VER 1.7-SD:28/08/2014 ED:28/08/2014,TRACKER NO:511,updated data table version 1.10.2
//VER 1.6-SD:13/08/2014 ED:13/08/2014,TRACKER NO:511,implemented script for reset normal size after updation,updated new links,checked autocommit  
//VER 1.5-SD:27/07/2014 ED:27/07/2014,TRACKER NO:511,implemented script for starhub DP validation, autocomplete for unit category
//VER 1.4-SD:21/07/2014 ED:21/07/2014,TRACKER NO:511,implemented coding to sort asc,desc for inv date,from period,to period, timestamp and forperiod- DONE BY SARADAMBAL
//VER 1.3-SD:11/07/2014 ED:12/07/2014,TRACKER NO:511,implemented sp to get inv,sdate & edate for dynamic dp validation using eilib,removed script for dynamic dp validation- DONE BY SARADAMBAL
//VER 1.2-SD:25/06/2014 ED:25/06/2014,TRACKER NO:511,implemented err msg if the record not having within unit validation period,corrected some err msg
//VER 1.1-SD:19/06/2014 ED:19/06/2014,TRACKER NO:511,removed alais(as) for inv date,from period and to period for temp table(electricity)
//VER 1.0-SD:17/06/2014 ED:18/06/2014,TRACKER NO:511,implemented failure function,commit function,add class for amt (add title numbers only),checked tickler for updation and deletion
//VER 0.09-SD:05/06/2014 ED:06/06/2014,TRACKER NO:511,updated link,put 100 record in datatable
//VER 0.08-SD:24/05/2014 ED:26/05/2014,TRACKER NO:511,cheked in integration site,removed sno in data table
//VER 0.07-SD:14/05/2014 ED:16/05/2014,TRACKER NO:511,hide preloader if no card details in PAC,checked all srch option(initializing data),tickler,changed 3 digit  for all invoice amount in biz daily types except unit invoice amt(4 digit)--SARADAMBAL
//VER 0.06-SD:07/05/2014 ED:07/05/2014,TRACKER NO:511,put success function in seperate,implemented dynamic temp for electricity type search--SARADAMBAL
//VER 0.05-SD:21/04/2014 ED:21/04/2014,TRACKER NO:511,changed sp name for unit deletion,to show err msg if no customer in unit in datatable update form-SARADAMBAL
//VER 0.04-SD:16/04/2014 ED:16/04/2014,TRACKER NO:511,checked migration data and after lp changes,corrected and replaced error msg for description,implemented script for dp validation,implemented script for update validation,hide preloader while getting migration type in unit expense-SARADAMBAL
//DONE BY:PRADAP,PUNITHA
//VER 0.03-SD:29/03/2014 ED:04/04/2014,TRACKER NO:511,corrected srchbtn validation,error msg(no table entry),sp(unit expense),dp(invoice,forperiod)
//VER 0.02-SD:22/01/2014 ED:15/03/2014,TRACKER NO:511,corrected all select query,fileterd active unit condition in all search n updated validation,err msgs
//VER 0.01-INITIAL VERSION, SD:3/11/2013 ED:29/11/2013,TRACKER NO:511
//*********************************************************************************************************//
/*****************************************************CHANGES DONE AFTER PR SCRIPTINGS****************************************************
1.updated electricity search table query
2.changed date format dd/mm/yy to dd-mm-yy in datatable update form
3.replaced function BDLY_SRC_getEmail() to global var UserStamp in update query
4.changed datetime format for timestamp in all select query
5.corrected incorrect query for housekeeping duration search
6.changed date format for aircondue search
7.updated validation for autocomplete(ll not hit gs for all date range given) 
8.updated validation after updating records to show success msg.
9.updated update query for electricity
9.changed datepicker format for forperiod option
10.changed form label,amtvalidation,textarea to textbox for invoice from n updated textbox size based n length for unit exp
11.cleared datatable if again input is given
12.removed sorting in datatable by default
2.All comments shld be filtered with the active unit condition-DONE
3.For Large range search shows kill pages pop up from the site,but aftr some time it shows result-OK,checked upto 350 records
4.Invoice from shld be changed from textarea to textbox in datatable update form-done
5.need to add preloader for autocomplete results no of records in textarea-done
6.is need autocomplete for digital voice no search-no need
7.need to filter active unit condi in all select query with ed>sysdate(merge active unit view)-except hk keeping payment-done
8.need to change AMOUNT label to INVOICE AMOUNT in PURCHASE CARD in datatable update form-DONE
10.need to change no of digits for real part 3 to 5 in invoice amt search in MOVING IN OUT-no need -changed based on instruction of babu sir with old data-DONE
12.need to change real part 5 to 4 in petty cash form-DONE
13.need to change validation to retreive values if both sd n ed date is given(sd or ed) in all autocomplete -DONE
14.need to changed label name for duration search in housekeeping-DONE
18.need to add amt text box,EMP NAME for housekeeping for period DURATION AMT SEARCH-DONE
19.if inv from like by:A&K show data table like A&ampK -need to correct in unit exp-DONE
20.need to correct datatable cat n name lb except cat search in unit exp-DONE
24.need to set width for comments in data table.-DONE
25.need to reload input form for autocomplete search or search while typing-DONE
27.resize table width based on the type of exp-no of headers-DONE
27.need to add spcl char function from eilib-DONE
29.check accountno,invoice to for duplicate vlues with diff pk id like 1.1000-1,1.1000-2-DONE
//9.INVOICE DATE shld be restricted upto sysdate
//16.need to validate update button-DONE
//18.NEED TO ADD HOUSEKEEPING UNIT NO SEARCH-done
//22.need to update err msg.-amt from to err-done
//removed no data err msg after
*********/
//23.need sorting for date column in data table.
//11.need to change size(7,2) to max length for petty cash balance
//11.need to add minus in search form for amt search
//15.need to validate search button in search form if values not present
//17.need to do for period search button validaiton n datepicker validation
//21.need to correct datatable showing customer with the same customer name in listbox for unit exp
//11.need to validate duration field
//28.chk frm perio n to period dpicker valdiation
//30.chk search btn validation again giving date n amt in amt search n date search
//need to check each table n to show err msg if no data
/*****************************************************CHANGES DONE AFTER PUNITHA SCRIPTINGS****************************************************
1.solved duplicate customer name
2.solved srch btn validation with amt validation
3.implemented script to check for duration validation in srch option and in update form
1.implemented for period dp in search option and in the update form and
then checked validation part
2.starting to implement customer name with id in data table for duplicate
customer
3.correct error msg in purchase card
4.correct search btn validation for housekeeping duration with amt
5.implemented sp for unit expense deletion,implemented err msg for purchase card if record not to be delete
6.implemented err msg for all expense (checked whether the each table having record or not)
7.applied validation for invoice date,for period(cant greater than sysdate) ,set date as unit end date +1month for which end date is less than sysdate
8.corrected some expense srch btn validation
/*------------------------------------------GLOABAL DECLARATION TO GET DB CONNECTION-------------------------------------*/
try
{
  /* 1-> ELECTRICITY      2-> STARHUB
  3-> UNIT EXPENSE     4->FACILITY USE
  5-> DIGITAL VOICE    6->PURCHASE NEW ACCESS CARD
  7-> MOVING IN OUT     8->CARPARK
  9-> AIRCON SERVICES   10->PETTY CASH
  11-> HOUSEKEEPING     12->HOUSEKEEPING PAYMENT
  */
  /*-------------------------------GET INITIAL VALUE EXPENSE TYPE,UNIT EXP CATEGORY,ERROR MESSAGES--------------------------------------*/
  function BDLY_SRC_getInitialvalue()
  {
    var conn=eilib.db_GetConnection(),creatStatement = conn.createStatement();
    var BDLY_SRC_unitexp_catg_array=[];
    var BDLY_SRC_arr_errmsg_tablecount=[];
    //GET UNIT EXPENSE CATEGORY
    BDLY_SRC_unitexp_catg_array=BDLY_SRC_getUnitexp_catg("","",1);
    //GET BIZ DAILY TYPE OF EXPENSE LIST
    var get_BizDaily_exptype_query = "SELECT ECN_ID,ECN_DATA FROM EXPENSE_CONFIGURATION WHERE CGN_ID IN(18) ORDER BY ECN_DATA ASC";
    var BizDaily_explist_array=[];
    var type_of_expense_rs = creatStatement.executeQuery(get_BizDaily_exptype_query);
    while(type_of_expense_rs.next())
      BizDaily_explist_array.push({key:type_of_expense_rs.getString("ECN_ID"),value:type_of_expense_rs.getString("ECN_DATA")});
    type_of_expense_rs.close();
    creatStatement.close();
    //GET ERR MESSAGES
    var BIZDLY_SRC_errmsgids="2,7,8,9,10,18,22,45,50,51,106,107,401,170,109,108,114,315,111,112,117,118,113,119,115,110,116,122,123,124,125,130,134,144,148,178,179,180,181,182,183,184,185,186,204,205,206,207,208,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,245,246,312,313,410,409,408,407,406,405,404,422,421,420,419,418,417,416,415,414,413,412,411,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,445,462"
    var BIZDLY_SRC_errormsgs=eilib.GetErrorMessageList(conn,BIZDLY_SRC_errmsgids);
    //CHECK DIALY,DETAIL AIRCON TABLE 
    var BIZDLY_SRC_cnt_tblename={1:['EXPENSE_AIRCON_SERVICE'],2:['EXPENSE_DETAIL_AIRCON_SERVICE'],3:['EXPENSE_CARPARK'],4:['EXPENSE_DETAIL_CARPARK'],5:['EXPENSE_DIGITAL_VOICE'],6:['EXPENSE_DETAIL_DIGITAL_VOICE'],7:['EXPENSE_STARHUB'],8:['EXPENSE_DETAIL_STARHUB'],9:['EXPENSE_ELECTRICITY'],10:['EXPENSE_DETAIL_ELECTRICITY'],11:['EXPENSE_UNIT'],12:['EXPENSE_FACILITY_USE'],13:['EXPENSE_MOVING_IN_AND_OUT'],14:['EXPENSE_PETTY_CASH'],15:['EXPENSE_HOUSEKEEPING'],16:['EXPENSE_HOUSEKEEPING_PAYMENT']}
    for(var i=1;i<=16;i++){
      var BIZDLY_SRC_stmt_chk_expensetble = conn.createStatement();
      var BIZDLY_SRC_rs_expensetble = BIZDLY_SRC_stmt_chk_expensetble.executeQuery("SELECT COUNT(*) FROM "+BIZDLY_SRC_cnt_tblename[i][0]+"");
      if(BIZDLY_SRC_rs_expensetble.next()){
        BDLY_SRC_arr_errmsg_tablecount.push(BIZDLY_SRC_rs_expensetble.getString("COUNT(*)"));}
      BIZDLY_SRC_rs_expensetble.close();
      BIZDLY_SRC_stmt_chk_expensetble.close();    }
    conn.close();
    var BDLY_SRC_fininitialvalue={"explist":BizDaily_explist_array,"unitcat":BDLY_SRC_unitexp_catg_array,"errormsg":BIZDLY_SRC_errormsgs,"BIZDLY_SRC_chk_exptble":BDLY_SRC_arr_errmsg_tablecount};
    return BDLY_SRC_fininitialvalue;
  }
  /*------------------------------------------To GET UNIT EXP CATEGORY------------------------------------------------------*/
  function BDLY_SRC_getUnitexp_catg(BDLY_SRC_startdate,BDLY_SRC_enddate,BDLY_SRC_chkcat){
    if(BDLY_SRC_chkcat!=1)
    {
      var  BDLY_SRC_unitexp_categry_query = "SELECT DISTINCT EU.ECN_ID, EC.ECN_DATA FROM EXPENSE_UNIT EU,EXPENSE_CONFIGURATION EC,VW_ACTIVE_UNIT U WHERE EU.ECN_ID=EC.ECN_ID AND U.UNIT_ID=EU.UNIT_ID AND EU.EU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(BDLY_SRC_enddate)+"' AND EC.CGN_ID=20 ORDER BY EC.ECN_DATA ASC"
    }
    else
    {
      var  BDLY_SRC_unitexp_categry_query = "SELECT ECN_ID,ECN_DATA FROM EXPENSE_CONFIGURATION WHERE ECN_ID IN(22,23,24) ORDER BY ECN_DATA ASC"
      }
    var  conn=eilib.db_GetConnection(),creatStatement = conn.createStatement();
    var BDLY_SRC_unitexp_catg_array=[];
    var execute_statement = creatStatement.executeQuery( BDLY_SRC_unitexp_categry_query);
    while(execute_statement.next())
      BDLY_SRC_unitexp_catg_array.push({key:execute_statement.getString(1),value:execute_statement.getString(2)})
      creatStatement.close(); conn.close();
    return BDLY_SRC_unitexp_catg_array;
  }
  /*------------------------------------------To GET BIZ DAILY EXPENSE SEARCH OPTIONS FROM DB------------------------------------------------------*/
  function BDLY_SRC_getSearchOptions(selectedexpense){
    //GROUPING SEARCH OPTIONS
    var Expense_Seacrh_opt_key = {1:"159,160,161,162,163,164,165,166,191",2:"178,179,180,181,182,183,184,191",3:"185,186,187,188,189,190,191",4:"167,168,169,170,191",5:"151,152,153,154,155,156,157,158,191",6:"174,175,176,177,191",7:"171,172,173,191",8:"127,128,129,130,131,132,191",9:"124,125,126,191,197",
                                  10:"136,137,138,139,140",11:"141,142,143,144,145",12:"146,147,148,149,150,198"}; 
    var BDLY_SRC_Search_opt_query= "SELECT ECN_ID, ECN_DATA FROM EXPENSE_CONFIGURATION WHERE CGN_ID=40 AND ECN_ID IN ("+Expense_Seacrh_opt_key[selectedexpense]+") ORDER BY ECN_DATA ASC";
    var conn=eilib.db_GetConnection(),creatStatement = conn.createStatement(), 
        BDLY_SRC_Searchoption_array=[];   
    var execute_statement = creatStatement.executeQuery(BDLY_SRC_Search_opt_query);
    while(execute_statement.next())
      BDLY_SRC_Searchoption_array.push({key:execute_statement.getString(1),value:execute_statement.getString(2)})
      var BDLY_SRC_hkunitnoarray=[];
    //get houskeeping unit no
    if(selectedexpense==12)
    {
      BDLY_SRC_hkunitnoarray=BDLY_SRC_getUnitList("12","150","","")
    }
    var BDLY_SRC_srchoptnunit={"srcoption":BDLY_SRC_Searchoption_array,"hkpunitno":BDLY_SRC_hkunitnoarray};
    creatStatement.close(); conn.close();
    return BDLY_SRC_srchoptnunit;
  }
  /*------------------------------------------To GET ALL TYPE OF AUTOCOMPLTE RESULTS IN BIZ DAILY--------------------------------------------------*/
  function BDLY_SRC_get_autocomplete(searchform){
    var selectedexpense= searchform['BDLY_SRC_lb_ExpenseList'],
        selectedSearchopt=searchform.BDLY_SRC_lb_serachopt,
        startdate=searchform.BDLY_SRC_startdate,endate=searchform.BDLY_SRC_enddate;
    var conn=eilib.db_GetConnection(),creatStatement = conn.createStatement();
    var BDLY_SRC_Autocomp_query={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[]};
    /*ELECTRICITY COMMENTS*/BDLY_SRC_Autocomp_query['1']['159']="SELECT DISTINCT EE.EE_COMMENTS FROM EXPENSE_ELECTRICITY EE,EXPENSE_DETAIL_ELECTRICITY EDE,VW_ACTIVE_UNIT U WHERE U.UNIT_ID=EDE.UNIT_ID AND EE.EE_COMMENTS IS NOT NULL AND EDE.EDE_ID=EE.EDE_ID AND EE.EE_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'";
    /*STARHUB COMMENTS*/BDLY_SRC_Autocomp_query['2']['179']="SELECT DISTINCT ESH.ESH_COMMENTS FROM EXPENSE_STARHUB ESH,EXPENSE_DETAIL_STARHUB EDS,VW_ACTIVE_UNIT U WHERE U.UNIT_ID=EDS.UNIT_ID AND EDS.EDSH_ID=ESH.EDSH_ID AND ESH.ESH_COMMENTS IS NOT NULL AND ESH.ESH_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'";
    /*UNIT EXP INVOICE ITEM*/BDLY_SRC_Autocomp_query['3']['189']="SELECT DISTINCT EU.EU_INVOICE_ITEMS FROM EXPENSE_UNIT EU,VW_ACTIVE_UNIT U WHERE U.UNIT_ID=EU.UNIT_ID AND EU.EU_INVOICE_ITEMS IS NOT NULL AND EU.EU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'";
    /*UNIT EXP INVOICE FROM*/BDLY_SRC_Autocomp_query['3']['190']="SELECT DISTINCT EU.EU_INVOICE_FROM FROM EXPENSE_UNIT EU,VW_ACTIVE_UNIT U WHERE U.UNIT_ID=EU.UNIT_ID AND EU.EU_INVOICE_FROM IS NOT NULL AND EU.EU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'";
    /*UNIT EXP COMMENTS*/BDLY_SRC_Autocomp_query['3']['185']="SELECT DISTINCT EU.EU_COMMENTS FROM EXPENSE_UNIT EU,VW_ACTIVE_UNIT U WHERE U.UNIT_ID=EU.UNIT_ID AND EU.EU_COMMENTS IS NOT NULL AND EU.EU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'";
    /*FACILITY USE COMMENTS*/BDLY_SRC_Autocomp_query['4']['167']="SELECT DISTINCT EFU.EFU_COMMENTS FROM EXPENSE_FACILITY_USE EFU,VW_ACTIVE_UNIT U WHERE U.UNIT_ID=EFU.UNIT_ID AND EFU.EFU_COMMENTS IS NOT NULL AND EFU.EFU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'";
    /*DIGITAL VOICE COMMENTS*/BDLY_SRC_Autocomp_query['5']['153']="SELECT DISTINCT EDV.EDV_COMMENTS FROM EXPENSE_DIGITAL_VOICE EDV,EXPENSE_DETAIL_DIGITAL_VOICE EDDV,VW_ACTIVE_UNIT U WHERE U.UNIT_ID=EDDV.UNIT_ID AND EDDV.EDDV_ID=EDV.EDDV_ID AND EDV.EDV_COMMENTS IS NOT NULL AND EDV.EDV_COMMENTS!='' AND EDV.EDV_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'";
    /*PURCHASE CARD COMMENTS*/BDLY_SRC_Autocomp_query['6']['175']="SELECT DISTINCT EPNC.EPNC_COMMENTS FROM EXPENSE_PURCHASE_NEW_CARD EPNC,VW_ACTIVE_UNIT U WHERE U.UNIT_ID=EPNC.UNIT_ID AND EPNC.EPNC_COMMENTS IS NOT NULL AND EPNC.EPNC_COMMENTS!='' AND EPNC.EPNC_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'";
    /*MOVING IN OUT COMMENTS*/BDLY_SRC_Autocomp_query['7']['171']="SELECT DISTINCT EMIO.EMIO_COMMENTS FROM EXPENSE_MOVING_IN_AND_OUT  EMIO,VW_ACTIVE_UNIT U WHERE U.UNIT_ID= EMIO.UNIT_ID AND EMIO.EMIO_COMMENTS IS NOT NULL AND EMIO.EMIO_COMMENTS!='' AND EMIO.EMIO_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'";
    /*CAR PARK COMMENTS*/BDLY_SRC_Autocomp_query['8']['128']="SELECT DISTINCT ECP.ECP_COMMENTS FROM EXPENSE_CARPARK ECP,EXPENSE_DETAIL_CARPARK EDCP,VW_ACTIVE_UNIT U WHERE U.UNIT_ID= EDCP.UNIT_ID AND EDCP.EDCP_ID=ECP.EDCP_ID AND ECP.ECP_COMMENTS IS NOT NULL AND ECP.ECP_COMMENTS!='' AND ECP.ECP_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'";
    /*AIRCON SERVICE COMMENTS*/BDLY_SRC_Autocomp_query['9']['125']="SELECT DISTINCT EAS.EAS_COMMENTS FROM EXPENSE_AIRCON_SERVICE EAS,EXPENSE_DETAIL_AIRCON_SERVICE EDAS,VW_ACTIVE_UNIT U WHERE U.UNIT_ID= EDAS.UNIT_ID AND EDAS.EDAS_ID=EAS.EDAS_ID AND EAS.EAS_COMMENTS IS NOT NULL AND EAS.EAS_COMMENTS!='' AND EAS.EAS_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'";
    /*PETTY CASH INVOICE ITEMS*/BDLY_SRC_Autocomp_query['10']['139']="SELECT DISTINCT EPC_INVOICE_ITEMS FROM EXPENSE_PETTY_CASH WHERE EPC_INVOICE_ITEMS IS NOT NULL AND EPC_INVOICE_ITEMS!='' AND EPC_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'";
    /*PETTY CASH COMMENTS*/BDLY_SRC_Autocomp_query['10']['140']="SELECT DISTINCT EPC_COMMENTS FROM EXPENSE_PETTY_CASH WHERE EPC_COMMENTS IS NOT NULL AND EPC_COMMENTS!='' AND EPC_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'";
    /*HOUSE KEEPING COMMENTS*/BDLY_SRC_Autocomp_query['11']['143']="SELECT DISTINCT EHK_DESCRIPTION  FROM EXPENSE_HOUSEKEEPING WHERE EHK_DESCRIPTION  IS NOT NULL AND EHK_DESCRIPTION !='' AND EHK_WORK_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'";
    if(selectedexpense==12)
    {
      var BDLY_SRC_tmptbl_hkpsrch= BDLY_SRC_callhkpaymentsp(conn);
    }
    /*HOUSE KEEPING PAYMENT COMMENTS*/BDLY_SRC_Autocomp_query['12']['146']="SELECT DISTINCT EHKP_COMMENTS  FROM "+BDLY_SRC_tmptbl_hkpsrch+" WHERE EHKP_COMMENTS  IS NOT NULL AND EHKP_COMMENTS !='' AND EHKP_PAID_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'";
    var BDLY_SRC_Autocomp_array=[];  
    var execute_statement = creatStatement.executeQuery(BDLY_SRC_Autocomp_query[selectedexpense][selectedSearchopt]);
    while(execute_statement.next())
      BDLY_SRC_Autocomp_array.push(execute_statement.getString(1))
      BDLY_SRC_drophkpaymentsptemptable(conn,BDLY_SRC_tmptbl_hkpsrch);
    creatStatement.close(); conn.close();
    return BDLY_SRC_Autocomp_array;
  }
  /*------------------------------------------TO GET PURCHASE CARD NO------------------------------------------------------*/
  function BDLY_SRC_getPurchase_card(BDLY_SRC_startdate,BDLY_SRC_enddate){
    var  BDLY_SRC_purchasecardno_query = "SELECT DISTINCT EPNC.EPNC_NUMBER FROM EXPENSE_PURCHASE_NEW_CARD EPNC,VW_ACTIVE_UNIT U WHERE U.UNIT_ID=EPNC.UNIT_ID AND EPNC.EPNC_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(BDLY_SRC_enddate)+"' ORDER BY EPNC_NUMBER ASC ";
    var conn=eilib.db_GetConnection(),creatStatement = conn.createStatement();
    var BDLY_SRC_unitexp_catg_array=[];
    var execute_statement = creatStatement.executeQuery( BDLY_SRC_purchasecardno_query);
    while(execute_statement.next())
      BDLY_SRC_unitexp_catg_array.push({key:execute_statement.getString(1),value:execute_statement.getString(1)})
      creatStatement.close(); conn.close();
    return BDLY_SRC_unitexp_catg_array;
  }
  /*------------------------------------------TO GET CUSTOMER NAME--------------------------------------------------------*/
  function BDLY_SRC_get_cusname(unitno,startdate,enddate){
    if(startdate!=undefined)
      var  BDLY_SRC_unitexp_categry_query ="SELECT DISTINCT  EU.CUSTOMER_ID ,CONCAT(C.CUSTOMER_FIRST_NAME,' ',C.CUSTOMER_LAST_NAME) AS NAME FROM EXPENSE_UNIT EU JOIN  CUSTOMER C ON C.CUSTOMER_ID=EU.CUSTOMER_ID WHERE EU.EU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(enddate)+"' AND EU.ECN_ID =23 ORDER BY NAME ASC, EU.CUSTOMER_ID";
    else
      var  BDLY_SRC_unitexp_categry_query ="SELECT  DISTINCT CED.CUSTOMER_ID ,CONCAT(C.CUSTOMER_FIRST_NAME,' ',C.CUSTOMER_LAST_NAME) AS NAME, CED.UNIT_ID FROM CUSTOMER_ENTRY_DETAILS CED JOIN CUSTOMER C ON C.CUSTOMER_ID=CED.CUSTOMER_ID JOIN UNIT U ON U.UNIT_ID=CED.UNIT_ID  WHERE U.UNIT_NO='"+unitno+"' ORDER BY NAME ASC, CED.CUSTOMER_ID";
    var conn=eilib.db_GetConnection(),creatStatement = conn.createStatement();
    var BDLY_SRC_cusname_array=[];
    var execute_statement = creatStatement.executeQuery( BDLY_SRC_unitexp_categry_query);
    while(execute_statement.next())
    {
      BDLY_SRC_cusname_array.push({key:execute_statement.getString(1),value:execute_statement.getString(2)})
    }
    creatStatement.close(); conn.close();
    return BDLY_SRC_detect_repeated_name(BDLY_SRC_cusname_array);
  }
  /*------------------------------------------BINDING ID WITH OPTION FOR REPEATED NAME-------------------------------------------*/
  function BDLY_SRC_detect_repeated_name(BDLY_SRC_cusname_array){
    var BDLY_SRC_Modified_cusname_array=[]
    var total_cusname_count=BDLY_SRC_cusname_array.length
    for (var x=0; x<total_cusname_count; x++){
      var next_value=x+1;
      var previous_value=x-1;
      var BDLY_SRC_cusname_with_id ={key:BDLY_SRC_cusname_array[x].key,
                                     value:BDLY_SRC_cusname_array[x].value+' '+BDLY_SRC_cusname_array[x].key};
      var BDLY_SRC_cusname_without_id= {key:BDLY_SRC_cusname_array[x].key,
                                        value:BDLY_SRC_cusname_array[x].value};  
      if(x==total_cusname_count-1 && BDLY_SRC_Modified_cusname_array.length<total_cusname_count)
        BDLY_SRC_Modified_cusname_array.push(BDLY_SRC_cusname_without_id)
        else
        {
          if(x>0){
            if(BDLY_SRC_cusname_array[x].value == BDLY_SRC_cusname_array[previous_value].value)
              BDLY_SRC_Modified_cusname_array.push(BDLY_SRC_cusname_with_id)
              else if(x!=total_cusname_count-1){
                if(BDLY_SRC_cusname_array[x].value == BDLY_SRC_cusname_array[next_value].value)
                  BDLY_SRC_Modified_cusname_array.push(BDLY_SRC_cusname_with_id)
                  else
                    BDLY_SRC_Modified_cusname_array.push(BDLY_SRC_cusname_without_id)
                    }
          }
          if(x==0 && BDLY_SRC_Modified_cusname_array.length<1){
            if(BDLY_SRC_cusname_array[x].value == BDLY_SRC_cusname_array[next_value].value)
              BDLY_SRC_Modified_cusname_array.push(BDLY_SRC_cusname_with_id)
              else
                BDLY_SRC_Modified_cusname_array.push(BDLY_SRC_cusname_without_id)
                }
        }
    }
    return BDLY_SRC_Modified_cusname_array;
  }
  /*------------------------------------------TO GET DIGITAL VOICE N STARHUB ACCOUNT NO--------------------------------------------------------*/
  function BDLY_SRC_get_accountno(selectedexpense,BDLY_SRC_startdate,BDLY_SRC_enddate){
    if(selectedexpense==2)
      var  BDLY_SRC_accountno_query = "SELECT DISTINCT EDSH.EDSH_ACCOUNT_NO FROM EXPENSE_STARHUB ES JOIN EXPENSE_DETAIL_STARHUB EDSH ON ES.EDSH_ID=EDSH.EDSH_ID,VW_ACTIVE_UNIT U WHERE EDSH.UNIT_ID=U.UNIT_ID AND ES.ESH_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(BDLY_SRC_enddate)+"' ORDER BY EDSH.EDSH_ACCOUNT_NO";
    else
      var  BDLY_SRC_accountno_query = "SELECT  DISTINCT EDDV.EDDV_DIGITAL_ACCOUNT_NO FROM  EXPENSE_DETAIL_DIGITAL_VOICE EDDV JOIN EXPENSE_DIGITAL_VOICE EDV  ON EDV.EDDV_ID=EDDV.EDDV_ID,VW_ACTIVE_UNIT U WHERE EDDV.UNIT_ID=U.UNIT_ID AND EDV.EDV_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(BDLY_SRC_enddate)+"' ORDER BY EDDV.EDDV_DIGITAL_ACCOUNT_NO";
    var conn=eilib.db_GetConnection(),creatStatement = conn.createStatement();
    var BDLY_SRC_accountno_array=[];
    var execute_statement = creatStatement.executeQuery( BDLY_SRC_accountno_query);
    while(execute_statement.next())
    {
      BDLY_SRC_accountno_array.push({value:execute_statement.getString(1)})
    }
    creatStatement.close(); conn.close();
    return BDLY_SRC_accountno_array;
  }
  /*------------------------------------------TO GET CLEANER NAME--------------------------------------------------------*/
  function BDLY_SRC_get_cleanername(BDLY_SRC_startdate,BDLY_SRC_enddate,selectedSearchopt){
    if(selectedSearchopt==142)
    {
      var BDLY_SRC_hkforperiod =eilib.GetForperiodDateFormat(BDLY_SRC_startdate,BDLY_SRC_startdate);// SqlDateFormatFromMonth(SearchFormData.BDLY_SRC_servicedue,SearchFormData.BDLY_SRC_lb_serachopt)
      BDLY_SRC_startdate=BDLY_SRC_hkforperiod.frmdate,BDLY_SRC_enddate=BDLY_SRC_hkforperiod.todate;
      var  BDLY_SRC_cleanername_query = "SELECT EMP_ID,CONCAT(EMP_FIRST_NAME,' ',EMP_LAST_NAME) AS NAME  FROM EMPLOYEE_DETAILS WHERE EMP_ID IN (SELECT EMP_ID FROM EXPENSE_HOUSEKEEPING WHERE EHK_WORK_DATE BETWEEN '"+BDLY_SRC_startdate+"' AND '"+BDLY_SRC_enddate+"') ORDER BY NAME";
    }
    else
    {
      var  BDLY_SRC_cleanername_query = "SELECT EMP_ID,CONCAT(EMP_FIRST_NAME,' ',EMP_LAST_NAME) AS NAME  FROM EMPLOYEE_DETAILS WHERE EMP_ID IN (SELECT EMP_ID FROM EXPENSE_HOUSEKEEPING WHERE EHK_WORK_DATE BETWEEN '"+eilib.SqlDateFormat(BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(BDLY_SRC_enddate)+"') ORDER BY NAME";
    }
    var conn=eilib.db_GetConnection(),creatStatement = conn.createStatement();
    var BDLY_SRC_cleanername_array=[];
    var execute_statement = creatStatement.executeQuery( BDLY_SRC_cleanername_query);
    while(execute_statement.next())
      BDLY_SRC_cleanername_array.push({key:execute_statement.getString(1),value:execute_statement.getString(2)})
      creatStatement.close(); conn.close();
    return BDLY_SRC_detect_repeated_name(BDLY_SRC_cleanername_array);
  }
  /*------------------------------------------TO CALL HOUSE KEEPING PAYMENT SP--------------------------------------------------------*/
  function BDLY_SRC_callhkpaymentsp(conn)
  {
    var BDLY_SRC_temp_stmt= conn.createStatement();
    var BDLY_SRC_HKunitnospquery="CALL SP_BIZDLY_HOUSE_KEEPING_PAYMENT_SRCH_DTLS('"+UserStamp+"',@TEMP_TBLE_HKPSRCH)";
    BDLY_SRC_temp_stmt.execute(BDLY_SRC_HKunitnospquery);
    BDLY_SRC_temp_stmt.close();
    var BDLY_SRC_stmt_temptble = conn.createStatement();
    var BDLY_SRC_rs_temptble  = BDLY_SRC_stmt_temptble.executeQuery("SELECT @TEMP_TBLE_HKPSRCH");
    while(BDLY_SRC_rs_temptble.next()){   
      var BDLY_SRC_temptblename= BDLY_SRC_rs_temptble.getString("@TEMP_TBLE_HKPSRCH");
    }
    BDLY_SRC_rs_temptble.close();BDLY_SRC_stmt_temptble.close();
    return BDLY_SRC_temptblename;
  }
  /*------------------------------------------TO DROP HOUSE KEEPING PAYMENT TEMP TABLE--------------------------------------------------------*/
  function BDLY_SRC_drophkpaymentsptemptable(conn,BDLY_SRC_drptmptbl_hkpsrch)
  {
    eilib.DropTempTable(conn,BDLY_SRC_drptmptbl_hkpsrch);       
  }
  /*------------------------------------------TO GET UNIT NO BASED THE DATE RANGE OR GET HOUSEKPEEING UNIT NO--------------------------------------------------------*/
  function BDLY_SRC_getUnitList(selectedexpense,selectedSearchopt,startdate,endate){
    var conn=eilib.db_GetConnection(),creatStatement = conn.createStatement();
    if(selectedexpense==12)
    {
      var BDLY_SRC_tmptbl_hkpsrch= BDLY_SRC_callhkpaymentsp(conn);
    }
    var BDLY_SRC_getunitno_query={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[]};
    if(startdate!=""&&endate!=""&&selectedSearchopt!="")
    {
      /*ELECTRICITY UNIT NO*/BDLY_SRC_getunitno_query['1']['191']="SELECT DISTINCT U.UNIT_ID, U.UNIT_NO FROM UNIT U,EXPENSE_ELECTRICITY EE,EXPENSE_DETAIL_ELECTRICITY EDE WHERE U.UNIT_ID=EDE.UNIT_ID AND EDE.EDE_ID=EE.EDE_ID AND EE.EE_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"' ORDER BY U.UNIT_NO ASC";
      /*STARHUB UNIT NO*/BDLY_SRC_getunitno_query['2']['191']="SELECT DISTINCT U.UNIT_ID,U.UNIT_NO FROM UNIT U, EXPENSE_STARHUB ESH,EXPENSE_DETAIL_STARHUB EDS WHERE U.UNIT_ID=EDS.UNIT_ID AND ESH.EDSH_ID=EDS.EDSH_ID AND ESH.ESH_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"' ORDER BY U.UNIT_NO ASC";
      /*UNIT EXP UNIT NO*/BDLY_SRC_getunitno_query['3']['191']="SELECT DISTINCT U.UNIT_ID,U.UNIT_NO FROM UNIT U, EXPENSE_UNIT EU WHERE U.UNIT_ID=EU.UNIT_ID AND EU.EU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"' ORDER BY U.UNIT_NO ASC";
      /*FACILITY USE UNIT NO*/BDLY_SRC_getunitno_query['4']['191']="SELECT DISTINCT U.UNIT_ID,U.UNIT_NO FROM UNIT U, EXPENSE_FACILITY_USE EFU WHERE U.UNIT_ID=EFU.UNIT_ID AND EFU.EFU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"' ORDER BY U.UNIT_NO ASC";
      /*DIGITAL VOICE UNIT NO*/BDLY_SRC_getunitno_query['5']['191']="SELECT DISTINCT U.UNIT_ID,U.UNIT_NO FROM UNIT U, EXPENSE_DIGITAL_VOICE EDV,EXPENSE_DETAIL_DIGITAL_VOICE EDDV WHERE U.UNIT_ID=EDDV.UNIT_ID AND EDDV.EDDV_ID=EDV.EDDV_ID AND EDV.EDV_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"' ORDER BY U.UNIT_NO ASC";
      /*PURCHASE CARD UNIT NO*/BDLY_SRC_getunitno_query['6']['191']="SELECT DISTINCT U.UNIT_ID, U.UNIT_NO FROM UNIT U, EXPENSE_PURCHASE_NEW_CARD EPNC WHERE U.UNIT_ID=EPNC.UNIT_ID  AND EPNC.EPNC_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"' ORDER BY U.UNIT_NO ASC";
      /*MOVING IN OUT UNIT NO*/BDLY_SRC_getunitno_query['7']['191']="SELECT DISTINCT U.UNIT_ID, U.UNIT_NO FROM UNIT U, EXPENSE_MOVING_IN_AND_OUT  EMIO WHERE U.UNIT_ID= EMIO.UNIT_ID AND EMIO.EMIO_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"' ORDER BY U.UNIT_NO ASC";
      /*CAR PARK UNIT NO*/BDLY_SRC_getunitno_query['8']['191']="SELECT DISTINCT U.UNIT_ID, U.UNIT_NO FROM UNIT U, EXPENSE_CARPARK ECP,EXPENSE_DETAIL_CARPARK EDCP WHERE U.UNIT_ID= EDCP.UNIT_ID AND EDCP.EDCP_ID=ECP.EDCP_ID  AND ECP.ECP_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"' ORDER BY U.UNIT_NO ASC";
      /*AIRCON SERVICE UNIT NO*/BDLY_SRC_getunitno_query['9']['191']="SELECT DISTINCT U.UNIT_ID,U.UNIT_NO FROM UNIT U,EXPENSE_AIRCON_SERVICE EAS,EXPENSE_DETAIL_AIRCON_SERVICE EDAS WHERE U.UNIT_ID= EDAS.UNIT_ID AND EDAS.EDAS_ID=EAS.EDAS_ID AND EAS.EAS_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"' ORDER BY U.UNIT_NO ASC";
      /*HOUSE KEEPING PAYMENT UNIT NO*/BDLY_SRC_getunitno_query['12']['150']="SELECT DISTINCT UNIT_ID,UNIT_NO FROM "+BDLY_SRC_tmptbl_hkpsrch+" WHERE EHKP_PAID_DATE BETWEEN '"+eilib.SqlDateFormat(startdate)+"' AND '"+eilib.SqlDateFormat(endate)+"'  ORDER BY UNIT_NO ASC";
    }
    else
    {
      /*HOUSE KEEPING PAYMENT UNIT NO*/BDLY_SRC_getunitno_query['12']['150']="SELECT DISTINCT UNIT_ID,UNIT_NO FROM "+BDLY_SRC_tmptbl_hkpsrch+" ORDER BY UNIT_NO ASC";
    }
    //DIGITAL VOICE NO//SELECT DISTINCT EDDV.EDDV_DIGITAL_VOICE_NO FROM EXPENSE_DIGITAL_VOICE EDV,EXPENSE_DETAIL_DIGITAL_VOICE EDDV,VW_ACTIVE_UNIT U WHERE U.UNIT_ID=EDDV.UNIT_ID AND EDDV.EDDV_ID=EDV.EDDV_ID AND EDDV.EDDV_DIGITAL_VOICE_NO IS NOT NULL AND EDDV.EDDV_DIGITAL_VOICE_NO!=""
    var BDLY_SRC_unitarray=[]; 
    var execute_statement = creatStatement.executeQuery( BDLY_SRC_getunitno_query[selectedexpense][selectedSearchopt]);
    while(execute_statement.next())
      if(startdate==""&&endate=="")
      {
        BDLY_SRC_unitarray.push({value:execute_statement.getString(2)});
      }
    else
    {
      BDLY_SRC_unitarray.push({key:execute_statement.getString(1),value:execute_statement.getString(2)});
    }
    BDLY_SRC_drophkpaymentsptemptable(conn,BDLY_SRC_tmptbl_hkpsrch);
    creatStatement.close(); conn.close();
    return BDLY_SRC_unitarray;
  }
  /*------------------------------------------TO GET SERVICE BY LIST------------------------------------------------------*/
  function BDLY_SRC_getServiceByList(BDLY_SRC_startdate,BDLY_SRC_enddate){
    var BDLY_SRC_SelectServiceByQuery= "SELECT DISTINCT EASB.EASB_DATA FROM  EXPENSE_AIRCON_SERVICE EAS JOIN EXPENSE_DETAIL_AIRCON_SERVICE EDAS ON EDAS.EDAS_ID = EAS.EDAS_ID JOIN EXPENSE_AIRCON_SERVICE_BY EASB ON  EASB.EASB_ID = EDAS.EASB_ID JOIN VW_ACTIVE_UNIT U ON U.UNIT_ID=EDAS.UNIT_ID AND EAS.EAS_DATE BETWEEN '"+eilib.SqlDateFormat(BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(BDLY_SRC_enddate)+"'  ORDER BY EASB.EASB_DATA ASC";
    var conn=eilib.db_GetConnection(),creatStatement = conn.createStatement();
    var BDLY_SRC_servicebyarray=[];   
    var execute_statement = creatStatement.executeQuery( BDLY_SRC_SelectServiceByQuery);
    while(execute_statement.next())
      BDLY_SRC_servicebyarray.push({key:execute_statement.getString(1)})
      creatStatement.close(); conn.close();
    return BDLY_SRC_servicebyarray;
  }
  /*------------------------------------------TO GET CAR NO LIST--------------------------------------------------------*/
  function BDLY_SRC_getCarNoList(BDLY_SRC_startdate,BDLY_SRC_enddate){
    var BDLY_SRC_SelectServiceByQuery= "SELECT DISTINCT EDCP_CAR_NO  FROM EXPENSE_CARPARK EC JOIN  EXPENSE_DETAIL_CARPARK EDC ON EDC.EDCP_ID=EC.EDCP_ID AND EC.ECP_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(BDLY_SRC_enddate)+"' ORDER BY EDCP_CAR_NO ASC";
    var conn=eilib.db_GetConnection(),creatStatement = conn.createStatement();
    var BDLY_SRC_servicebyarray=[];   
    var execute_statement = creatStatement.executeQuery( BDLY_SRC_SelectServiceByQuery);
    while(execute_statement.next())
      BDLY_SRC_servicebyarray.push({key:execute_statement.getString(1)});
    creatStatement.close(); conn.close();
    return BDLY_SRC_servicebyarray;
  }
  /*------------------------------------------GET DIGITAL VOICE NO TO LIST---------------------------------------------------------*/
  function BDLY_SRC_getDigitalVoiceNo(BDLY_SRC_startdate,BDLY_SRC_enddate)
  {
    var conn=eilib.db_GetConnection(),creatStatement = conn.createStatement();
    var BDLY_SRC_digvoicenoquery="SELECT DISTINCT EDDV.EDDV_DIGITAL_VOICE_NO FROM EXPENSE_DIGITAL_VOICE EDV,EXPENSE_DETAIL_DIGITAL_VOICE EDDV,VW_ACTIVE_UNIT U WHERE U.UNIT_ID=EDDV.UNIT_ID AND EDDV.EDDV_ID=EDV.EDDV_ID AND EDDV.EDDV_DIGITAL_VOICE_NO IS NOT NULL AND EDDV.EDDV_DIGITAL_VOICE_NO!='' AND EDV.EDV_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(BDLY_SRC_enddate)+"' ORDER BY EDDV.EDDV_DIGITAL_VOICE_NO ASC";
    var BDLY_SRC_digvoicenoarray=[];   
    var execute_statement = creatStatement.executeQuery( BDLY_SRC_digvoicenoquery);
    while(execute_statement.next())
      BDLY_SRC_digvoicenoarray.push({key:execute_statement.getString(1)})
      creatStatement.close(); conn.close();
    return BDLY_SRC_digvoicenoarray;
  }
  /*------------------------------------------TO GET DIGITAL INVOICE TO LIST--------------------------------------------------------*/
  function BDLY_SRC_invoiceto(selectedexpense,selectedSearchopt,BDLY_SRC_startdate,BDLY_SRC_enddate){
    var BDLY_SRC_InvoiceToQuery={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[]};
    /*ELECTRICITY INVOICE TO*/BDLY_SRC_InvoiceToQuery['1']['165']="SELECT DISTINCT EC.ECN_ID,EC.ECN_DATA FROM  EXPENSE_CONFIGURATION EC,EXPENSE_DETAIL_ELECTRICITY EDE,EXPENSE_ELECTRICITY EE,VW_ACTIVE_UNIT U WHERE EC.ECN_ID=EDE.ECN_ID AND U.UNIT_ID=EDE.UNIT_ID AND EDE.EDE_ID=EE.EDE_ID AND EE.EE_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(BDLY_SRC_enddate)+"' ORDER BY ECN_DATA ASC";
    /*STARHUB INVOICE TO*/BDLY_SRC_InvoiceToQuery['2']['183']="SELECT DISTINCT EC.ECN_ID,EC.ECN_DATA FROM  EXPENSE_CONFIGURATION EC,EXPENSE_DETAIL_STARHUB EDS,EXPENSE_STARHUB ES,VW_ACTIVE_UNIT U WHERE EC.ECN_ID=EDS.ECN_ID AND U.UNIT_ID=EDS.UNIT_ID AND EDS.EDSH_ID=ES.EDSH_ID AND ES.ESH_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(BDLY_SRC_enddate)+"' ORDER BY ECN_DATA ASC";
    /*DIGITAL VOICE INVOICE TO*/BDLY_SRC_InvoiceToQuery['5']['157']="SELECT DISTINCT EC.ECN_ID,EC.ECN_DATA FROM  EXPENSE_CONFIGURATION EC,EXPENSE_DETAIL_DIGITAL_VOICE EDDV,EXPENSE_DIGITAL_VOICE EDV,VW_ACTIVE_UNIT U WHERE EC.ECN_ID=EDDV.ECN_ID AND U.UNIT_ID=EDDV.UNIT_ID AND EDDV.EDDV_ID=EDV.EDDV_ID AND EDV.EDV_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(BDLY_SRC_enddate)+"' ORDER BY ECN_DATA ASC";
    var conn=eilib.db_GetConnection(),creatStatement = conn.createStatement();
    var BDLY_SRC_InvocieToarray=[];   
    var execute_statement = creatStatement.executeQuery( BDLY_SRC_InvoiceToQuery[selectedexpense][selectedSearchopt]);
    while(execute_statement.next())
      BDLY_SRC_InvocieToarray.push({key:execute_statement.getString(1),value:execute_statement.getString(2)})
      creatStatement.close(); conn.close();
    return BDLY_SRC_InvocieToarray;
  }
  /*------------------------------------------TO GET DATA TABLE HEADER WIDTH--------------------------------------------------------*/
  function BDLY_SRC_getHeaderWidth(BDLY_SRC_exptype,BDLY_SRC_OPTION)
  {
    var BDLY_SRC_finalheader=[];
    var BDLY_SRC_headerwidth={"SNO":"30","USERSTAMP":"170","CATEGORY<em>*</em>":"40","TIMESTAMP":"140","UNIT NO":"40",'CARD NUMBER<em>*</em>':"50","CAR NO":"60",
                              "INVOICE DATE<em>*</em>":"75","INVOICE AMOUNT<em>*</em>":"10","COMMENTS":"500","PAID DATE<em>*</em>":"75","FOR PERIOD<em>*</em>":"75",
                              "INVOICE ITEMS<em>*</em>":"250","INVOICE FROM<em>*</em>":"150","INVOICE TO":"120","ACCOUNT NO":"80",
                              "FROM PERIOD<em>*</em>":"75","TO PERIOD<em>*</em>":"75","AIRCON SERVICE BY":"250","TOTAL AMOUNT":"120","UNIT NO<em>*</em>":"40"};
    var BDLY_SRC_headerwidthlen=Object.keys(BDLY_SRC_headerwidth).length
    var BDLY_SRC_tablewidth={"1":"2000","2":"2000","3":"2250","4":"1500","5":"2000","6":"1700","7":"1500","8":"2000","9":"1800","10":"1800","11":"1500","12":"1700"};
    if(BDLY_SRC_OPTION==142||BDLY_SRC_OPTION==198)
    {
      if(BDLY_SRC_OPTION==142)
      {
        var BDLY_SRC_GridHeaders={11:['TOTAL DURATION','TOTAL AMOUNT']};
        var BDLY_SRC_tablewidth={"11":"100"};
      }
      if(BDLY_SRC_OPTION==198)
      {
        var BDLY_SRC_GridHeaders={12:['SNO','UNIT NO<em>*</em>','USERSTAMP','TIMESTAMP']};
        var BDLY_SRC_tablewidth={"12":"800"}; 
      }
    }
    else
    {
      var BDLY_SRC_GridHeaders={1:['SNO','UNIT NO','INVOICE TO','INVOICE DATE<em>*</em>','FROM PERIOD<em>*</em>','TO PERIOD<em>*</em>','DEPOSIT','DEPOSIT REFUND','INVOICE AMOUNT','COMMENTS','USERSTAMP','TIMESTAMP'],
                                2:['SNO','UNIT NO','INVOICE TO','ACCOUNT NO','INVOICE DATE<em>*</em>','FROM PERIOD<em>*</em>','TO PERIOD<em>*</em>','INVOICE AMOUNT<em>*</em>','COMMENTS','USERSTAMP', 'TIMESTAMP'],
                                3:['SNO','UNIT NO','CATEGORY<em>*</em>','CUSTOMER','INVOICE DATE<em>*</em>','INVOICE ITEMS<em>*</em>','INVOICE FROM<em>*</em>','INVOICE AMOUNT<em>*</em>','COMMENTS','USERSTAMP', 'TIMESTAMP'],
                                4:['SNO','UNIT NO','INVOICE DATE<em>*</em>','DEPOSIT','INVOICE AMOUNT','COMMENTS','USERSTAMP', 'TIMESTAMP'],
                                5:['SNO','UNIT NO','INVOICE TO','DIGITAL VOICE NO','ACCOUNT NO','INVOICE DATE<em>*</em>','FROM PERIOD<em>*</em>','TO PERIOD<em>*</em>','INVOICE AMOUNT<em>*</em>','COMMENTS','USERSTAMP','TIMESTAMP'],
                                6:['SNO','UNIT NO','CARD NUMBER<em>*</em>','INVOICE DATE<em>*</em>','INVOICE AMOUNT<em>*</em>','COMMENTS','USERSTAMP', 'TIMESTAMP'],
                                7:['SNO','UNIT NO','INVOICE DATE<em>*</em>','INVOICE AMOUNT<em>*</em>','COMMENTS','USERSTAMP','TIMESTAMP'],
                                8:['SNO','UNIT NO','CAR NO','INVOICE DATE<em>*</em>','FROM PERIOD<em>*</em>','TO PERIOD<em>*</em>','INVOICE AMOUNT<em>*</em>','COMMENTS','USERSTAMP', 'TIMESTAMP'],
                                9:['SNO','UNIT NO','AIRCON SERVICE BY','INVOICE DATE<em>*</em>','COMMENTS','USERSTAMP','TIMESTAMP'],
                                10:['SNO','INVOICE DATE','CASH IN','CASH OUT','CURRENT BALANCE','INVOICE ITEMS<em>*</em>','COMMENTS','USERSTAMP', 'TIMESTAMP'],
                                11:['SNO','CLEANER NAME','WORK DATE<em>*</em>','DURATION<em>*</em>','DESCRIPTION<em>*</em>','USERSTAMP','TIMESTAMP'],                             
                                12:['SNO','UNIT NO','INVOICE AMOUNT<em>*</em>','FOR PERIOD<em>*</em>','PAID DATE<em>*</em>','COMMENTS','USERSTAMP','TIMESTAMP']};
    }
    for(var i=0;i<BDLY_SRC_GridHeaders[BDLY_SRC_exptype].length;i++)
    {
      if(BDLY_SRC_headerwidth[BDLY_SRC_GridHeaders[BDLY_SRC_exptype][i]]&&BDLY_SRC_headerwidth[BDLY_SRC_GridHeaders[BDLY_SRC_exptype][i]]!=undefined)
      {
        var str=BDLY_SRC_GridHeaders[BDLY_SRC_exptype][i]+'^'+BDLY_SRC_headerwidth[BDLY_SRC_GridHeaders[BDLY_SRC_exptype][i]];
        BDLY_SRC_finalheader.push(str)
      }
      else
      {
        BDLY_SRC_finalheader.push(BDLY_SRC_GridHeaders[BDLY_SRC_exptype][i])
      }
    }
    var BDLY_SRC_finalwidth={"headerwidth":BDLY_SRC_finalheader,"tablewidth":BDLY_SRC_tablewidth[BDLY_SRC_exptype]};
    return BDLY_SRC_finalwidth;
  }
  /*------------------------------------------WILL FETCH RESULT FROM DB AND WILL SHOW IN DATA TABLE -----------------------------------------------------*/
  function BDLY_SRC_getAnyTypeExpData(SearchFormData){
    var BDLY_SRC_lb_ExpenseList_val = SearchFormData['BDLY_SRC_lb_ExpenseList'];
    var BDLY_SRC_temptabledropQuery={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[]};
    var BDLY_SRC_SelectQuery={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[]},
        //Data Table Header Caption
        BDLY_SRC_GridHeaders=BDLY_SRC_getHeaderWidth(BDLY_SRC_lb_ExpenseList_val,SearchFormData.BDLY_SRC_lb_serachopt),
        BDLY_SRC_TableWidth=BDLY_SRC_GridHeaders.tablewidth;
    BDLY_SRC_GridHeaders=BDLY_SRC_GridHeaders.headerwidth;
    // Data Table cloumn type
    BDLY_SRC_GridColumnTypes={1:['lable','unit','label','date','sdate','edate','optionalamnt1','optionalamnt2','optionalamnt3','textarea','label','label'],
                              2:['lable','unit','label','label','date','sdate','edate','amount','textarea','label','label'],
                              3:['lable','unit','unit_category_lb','cus_name_lb','date','textarea','textbox','amount','textarea','label', 'label'],
                              4:['lable','unit','date','optionalamnt1','optionalamnt2','textarea','label', 'label'],
                              5:['lable','unit','label','lable','lable','date','sdate','edate','amount','textarea','lable','lable'],
                              6:['lable','unit','access_card','date','amount','textarea','label', 'label'],
                              7:['lable','unit','date','amount','textarea','label','label'],
                              8:['lable','unit','label','date','sdate','edate','amount','textarea','label', 'label'],
                              9:['lable','unit','lable','date','textarea','label','label'],
                              10:['lable','lable','lable','lable','lable','textarea','textarea','label', 'label'],
                              11:['lable','label','ndate','duration','textarea','label','label'],
                              12:['lable','hfp_unit_lb','amount','month','ndate','textarea','label','label']};
    if(SearchFormData.BDLY_SRC_lb_serachopt==198)
    {
      BDLY_SRC_GridColumnTypes={12:['lable','unittextbox','label','label']};
    }
    var conn=eilib.db_GetConnection();
    if(BDLY_SRC_lb_ExpenseList_val==12)
    {
      var BDLY_SRC_tmptbl_hkpsrch=BDLY_SRC_callhkpaymentsp(conn);
    }
    if(BDLY_SRC_lb_ExpenseList_val==1||SearchFormData.BDLY_SRC_lb_serachopt==142)
    {
      var BDLY_SRC_electtempstmt=conn.createStatement();
      if(SearchFormData.BDLY_SRC_lb_serachopt==191)
        var BDLY_SRC_sp_thirdval=SearchFormData.BDLY_SRC_lb_unitno;
      if(SearchFormData.BDLY_SRC_lb_serachopt==165)
        var BDLY_SRC_sp_thirdval=SearchFormData.BDLY_SRC_lb_invoiceto;
      if(SearchFormData.BDLY_SRC_lb_serachopt==159)
        var BDLY_SRC_sp_thirdval=SearchFormData.BDLY_SRC_comments; 
      if(SearchFormData.BDLY_SRC_lb_serachopt==160||SearchFormData.BDLY_SRC_lb_serachopt==161||SearchFormData.BDLY_SRC_lb_serachopt==163){
        var BDLY_SRC_sp_thirdval=SearchFormData.BDLY_SRC_tb_fromtoamnt[0];
        var BDLY_SRC_sp_fourthval=SearchFormData.BDLY_SRC_tb_fromtoamnt[1]}
      if(SearchFormData.BDLY_SRC_lb_serachopt==162||SearchFormData.BDLY_SRC_lb_serachopt==164||SearchFormData.BDLY_SRC_lb_serachopt==166)
        var BDLY_SRC_sp_thirdval=null;
      if(SearchFormData.BDLY_SRC_lb_serachopt==162||SearchFormData.BDLY_SRC_lb_serachopt==164||SearchFormData.BDLY_SRC_lb_serachopt==166||SearchFormData.BDLY_SRC_lb_serachopt==191||SearchFormData.BDLY_SRC_lb_serachopt==165||SearchFormData.BDLY_SRC_lb_serachopt==159)
        var BDLY_SRC_sp_fourthval=null
        if(SearchFormData.BDLY_SRC_lb_serachopt==142){
          var BDLY_SRC_hkpforperiod =eilib.GetForperiodDateFormat(SearchFormData.BDLY_SRC_servicedue,SearchFormData.BDLY_SRC_servicedue);
          BDLY_SRC_electtempstmt.execute("CALL SP_BIZDLY_HOUSEKEEPING_DURATION_AMOUNT_SRCH("+SearchFormData.BDLY_SRC_lb_cleanername+",'"+BDLY_SRC_hkpforperiod.frmdate+"','"+SearchFormData.BDLY_SRC_tb_durationamt+"','"+UserStamp+"',@TEMPTABLE_ELECTRICITY)");
        }
      else
        BDLY_SRC_electtempstmt.execute("CALL SP_TEMP_BIZDLY_ELECTRICITY_SEARCH('"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"','"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"','"+BDLY_SRC_sp_thirdval+"','"+BDLY_SRC_sp_fourthval+"',"+SearchFormData.BDLY_SRC_lb_serachopt+",'"+UserStamp+"',@TEMPTABLE_ELECTRICITY)");
      BDLY_SRC_electtempstmt.close();
      var BDLY_SRC_dynatemp_stmt= conn.createStatement();
      var BDLY_SRC_dynatemp_rs=BDLY_SRC_dynatemp_stmt.executeQuery("SELECT @TEMPTABLE_ELECTRICITY");
      while(BDLY_SRC_dynatemp_rs.next())
      {
        var BDLY_SRC_electemp_name=BDLY_SRC_dynatemp_rs.getString(1);
      }
      BDLY_SRC_dynatemp_rs.close();BDLY_SRC_dynatemp_stmt.close();
    }
    var creatStatement = conn.createStatement();
    var BDLY_SRC_Expdataobject=[];   
    BDLY_SRC_Expdataobject.push(BDLY_SRC_GridHeaders);
    BDLY_SRC_Expdataobject.push(BDLY_SRC_GridColumnTypes[BDLY_SRC_lb_ExpenseList_val]);
    if (SearchFormData.hasOwnProperty('BDLY_SRC_invoiceitem')) {
      var BDLY_SRC_invoiceitemssrcvalue=eilib.ConvertSpclCharString(SearchFormData.BDLY_SRC_invoiceitem)
      }
    if (SearchFormData.hasOwnProperty('BDLY_SRC_comments')) {
      var BDLY_SRC_commentssrcvalue=eilib.ConvertSpclCharString(SearchFormData.BDLY_SRC_comments)
      }
    if (SearchFormData.hasOwnProperty('BDLY_SRC_invoicefrom')) {
      var BDLY_SRC_invfromsrcvalue=eilib.ConvertSpclCharString(SearchFormData.BDLY_SRC_invoicefrom)
      }
    //ELECTRICITY--1
    if(BDLY_SRC_lb_ExpenseList_val==1)
    {  
      //UNIT NO SEARCH OPTION ID-191
      BDLY_SRC_SelectQuery['1']['191'] = "SELECT EE_ID,EE_UNITNO,EE_INVOICE_TO,DATE_FORMAT(EE_INVOICE_DATE,'%d-%m-%Y'),DATE_FORMAT(EE_FROM_PERIOD,'%d-%m-%Y'),DATE_FORMAT(EE_TO_PERIOD,'%d-%m-%Y'),EE_DEPOSIT,EE_DEPOSIT_REFUND,EE_INVOICE_AMOUNT,EE_COMMENTS,EE_USERSTAMP,DATE_FORMAT(CONVERT_TZ(EE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EE_TIMESTAMP FROM "+BDLY_SRC_electemp_name+" ORDER BY EE_INVOICE_DATE ASC";
      //INVOICE TO SEARCH OPTION ID-165
      BDLY_SRC_SelectQuery['1']['165'] = "SELECT EE_ID,EE_UNITNO,EE_INVOICE_TO,DATE_FORMAT(EE_INVOICE_DATE,'%d-%m-%Y'),DATE_FORMAT(EE_FROM_PERIOD,'%d-%m-%Y'),DATE_FORMAT(EE_TO_PERIOD,'%d-%m-%Y'),EE_DEPOSIT,EE_DEPOSIT_REFUND,EE_INVOICE_AMOUNT,EE_COMMENTS,EE_USERSTAMP,DATE_FORMAT(CONVERT_TZ(EE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EE_TIMESTAMP FROM "+BDLY_SRC_electemp_name+" ORDER BY EE_UNITNO,EE_INVOICE_DATE ASC";
      //INVOICE DATE SEARCH OPTION ID-164
      BDLY_SRC_SelectQuery['1']['164'] = "SELECT EE_ID,EE_UNITNO,EE_INVOICE_TO,DATE_FORMAT(EE_INVOICE_DATE,'%d-%m-%Y'),DATE_FORMAT(EE_FROM_PERIOD,'%d-%m-%Y'),DATE_FORMAT(EE_TO_PERIOD,'%d-%m-%Y'),EE_DEPOSIT,EE_DEPOSIT_REFUND,EE_INVOICE_AMOUNT,EE_COMMENTS,EE_USERSTAMP,DATE_FORMAT(CONVERT_TZ(EE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EE_TIMESTAMP FROM "+BDLY_SRC_electemp_name+" ORDER BY EE_INVOICE_DATE,EE_UNITNO ASC";
      //COMMENTS SEARCH OPTION ID-159
      BDLY_SRC_SelectQuery['1']['159'] = "SELECT EE_ID,EE_UNITNO,EE_INVOICE_TO,DATE_FORMAT(EE_INVOICE_DATE,'%d-%m-%Y'),DATE_FORMAT(EE_FROM_PERIOD,'%d-%m-%Y'),DATE_FORMAT(EE_TO_PERIOD,'%d-%m-%Y'),EE_DEPOSIT,EE_DEPOSIT_REFUND,EE_INVOICE_AMOUNT,EE_COMMENTS,EE_USERSTAMP,DATE_FORMAT(CONVERT_TZ(EE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EE_TIMESTAMP FROM "+BDLY_SRC_electemp_name+" ORDER BY EE_UNITNO,EE_INVOICE_DATE ASC";
      //FROM PERIOD SEARCH OPTION ID-162
      BDLY_SRC_SelectQuery['1']['162'] = "SELECT EE_ID,EE_UNITNO,EE_INVOICE_TO,DATE_FORMAT(EE_INVOICE_DATE,'%d-%m-%Y'),DATE_FORMAT(EE_FROM_PERIOD,'%d-%m-%Y'),DATE_FORMAT(EE_TO_PERIOD,'%d-%m-%Y'),EE_DEPOSIT,EE_DEPOSIT_REFUND,EE_INVOICE_AMOUNT,EE_COMMENTS,EE_USERSTAMP,DATE_FORMAT(CONVERT_TZ(EE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EE_TIMESTAMP FROM "+BDLY_SRC_electemp_name+" ORDER BY EE_FROM_PERIOD,EE_UNITNO,EE_INVOICE_DATE ASC";
      //TO PERIOD SEARCH OPTION ID-166
      BDLY_SRC_SelectQuery['1']['166'] = "SELECT EE_ID,EE_UNITNO,EE_INVOICE_TO,DATE_FORMAT(EE_INVOICE_DATE,'%d-%m-%Y'),DATE_FORMAT(EE_FROM_PERIOD,'%d-%m-%Y'),DATE_FORMAT(EE_TO_PERIOD,'%d-%m-%Y'),EE_DEPOSIT,EE_DEPOSIT_REFUND,EE_INVOICE_AMOUNT,EE_COMMENTS,EE_USERSTAMP,DATE_FORMAT(CONVERT_TZ(EE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EE_TIMESTAMP FROM "+BDLY_SRC_electemp_name+" ORDER BY EE_TO_PERIOD,EE_UNITNO,EE_INVOICE_DATE ASC";
    } 
    //------------------------------------------------------------STARHUB=2-----------------------------------------------------------------------------------//
    /*ACCOUNT NO SEARCH*/BDLY_SRC_SelectQuery['2']['178'] = "SELECT ESH.ESH_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(ESH.ESH_INVOICE_DATE,'%d-%m-%Y') AS STARHUBINVOICEDATE,DATE_FORMAT(ESH.ESH_FROM_PERIOD,'%d-%m-%Y') AS STARHUBFROMPERIOD,DATE_FORMAT(ESH.ESH_TO_PERIOD,'%d-%m-%Y') AS STARHUBTOPERIOD,ESH.ESH_AMOUNT,ESH.ESH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESH.ESH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS STARHUB_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_STARHUB EDSH ON U.UNIT_ID=EDSH.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID JOIN EXPENSE_STARHUB ESH ON ESH.EDSH_ID=EDSH.EDSH_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=ESH.ULD_ID AND ESH_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EDSH.EDSH_ACCOUNT_NO='"+SearchFormData.BDLY_SRC_lb_accountno+"' ORDER BY U.UNIT_NO,ESH_INVOICE_DATE ASC";
    /*COMMENTS SEARCH*/BDLY_SRC_SelectQuery['2']['179'] = "SELECT ESH.ESH_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(ESH.ESH_INVOICE_DATE,'%d-%m-%Y') AS STARHUBINVOICEDATE,DATE_FORMAT(ESH.ESH_FROM_PERIOD,'%d-%m-%Y') AS STARHUBFROMPERIOD,DATE_FORMAT(ESH.ESH_TO_PERIOD,'%d-%m-%Y') AS STARHUBTOPERIOD,ESH.ESH_AMOUNT,ESH.ESH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESH.ESH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS STARHUB_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_STARHUB EDSH ON U.UNIT_ID=EDSH.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID JOIN EXPENSE_STARHUB ESH ON ESH.EDSH_ID=EDSH.EDSH_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=ESH.ULD_ID AND ESH_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND ESH_COMMENTS='"+BDLY_SRC_commentssrcvalue+"' ORDER BY U.UNIT_NO,ESH_INVOICE_DATE ASC";
    /*FROM PERIOD SEARCH*/BDLY_SRC_SelectQuery['2']['180'] = "SELECT ESH.ESH_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(ESH.ESH_INVOICE_DATE,'%d-%m-%Y') AS STARHUBINVOICEDATE,DATE_FORMAT(ESH.ESH_FROM_PERIOD,'%d-%m-%Y') AS STARHUBFROMPERIOD,DATE_FORMAT(ESH.ESH_TO_PERIOD,'%d-%m-%Y') AS STARHUBTOPERIOD,ESH.ESH_AMOUNT,ESH.ESH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESH.ESH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS STARHUB_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_STARHUB EDSH ON U.UNIT_ID=EDSH.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID JOIN EXPENSE_STARHUB ESH ON ESH.EDSH_ID=EDSH.EDSH_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=ESH.ULD_ID AND ESH_FROM_PERIOD BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY ESH_FROM_PERIOD,U.UNIT_NO ASC";
    /*INVOICE DATE SEARCH*/BDLY_SRC_SelectQuery['2']['182'] = "SELECT ESH.ESH_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(ESH.ESH_INVOICE_DATE,'%d-%m-%Y') AS STARHUBINVOICEDATE,DATE_FORMAT(ESH.ESH_FROM_PERIOD,'%d-%m-%Y') AS STARHUBFROMPERIOD,DATE_FORMAT(ESH.ESH_TO_PERIOD,'%d-%m-%Y') AS STARHUBTOPERIOD,ESH.ESH_AMOUNT,ESH.ESH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESH.ESH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS STARHUB_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_STARHUB EDSH ON U.UNIT_ID=EDSH.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID JOIN EXPENSE_STARHUB ESH ON ESH.EDSH_ID=EDSH.EDSH_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=ESH.ULD_ID AND ESH_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY ESH_INVOICE_DATE,U.UNIT_NO ASC";
    /*INVOICE TO SEARCH*/BDLY_SRC_SelectQuery['2']['183'] = "SELECT ESH.ESH_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(ESH.ESH_INVOICE_DATE,'%d-%m-%Y') AS STARHUBINVOICEDATE,DATE_FORMAT(ESH.ESH_FROM_PERIOD,'%d-%m-%Y') AS STARHUBFROMPERIOD,DATE_FORMAT(ESH.ESH_TO_PERIOD,'%d-%m-%Y') AS STARHUBTOPERIOD,ESH.ESH_AMOUNT,ESH.ESH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESH.ESH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS STARHUB_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_STARHUB EDSH ON U.UNIT_ID=EDSH.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID JOIN EXPENSE_STARHUB ESH ON ESH.EDSH_ID=EDSH.EDSH_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=ESH.ULD_ID AND ESH_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EDSH.ECN_ID='"+SearchFormData.BDLY_SRC_lb_invoiceto+"' ORDER BY U.UNIT_NO,ESH_INVOICE_DATE ASC";
    /*TO PERIOD SEARCH*/BDLY_SRC_SelectQuery['2']['184'] = "SELECT ESH.ESH_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(ESH.ESH_INVOICE_DATE,'%d-%m-%Y') AS STARHUBINVOICEDATE,DATE_FORMAT(ESH.ESH_FROM_PERIOD,'%d-%m-%Y') AS STARHUBFROMPERIOD,DATE_FORMAT(ESH.ESH_TO_PERIOD,'%d-%m-%Y') AS STARHUBTOPERIOD,ESH.ESH_AMOUNT,ESH.ESH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESH.ESH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS STARHUB_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_STARHUB EDSH ON U.UNIT_ID=EDSH.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID JOIN EXPENSE_STARHUB ESH ON ESH.EDSH_ID=EDSH.EDSH_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=ESH.ULD_ID AND ESH_TO_PERIOD BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY ESH_TO_PERIOD,U.UNIT_NO ASC";
    /*UNIT NO SEARCH*/BDLY_SRC_SelectQuery['2']['191'] = "SELECT ESH.ESH_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(ESH.ESH_INVOICE_DATE,'%d-%m-%Y') AS STARHUBINVOICEDATE,DATE_FORMAT(ESH.ESH_FROM_PERIOD,'%d-%m-%Y') AS STARHUBFROMPERIOD,DATE_FORMAT(ESH.ESH_TO_PERIOD,'%d-%m-%Y') AS STARHUBTOPERIOD,ESH.ESH_AMOUNT,ESH.ESH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESH.ESH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS STARHUB_TIMESTAMP FROM UNIT U JOIN EXPENSE_DETAIL_STARHUB EDSH ON U.UNIT_ID=EDSH.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID JOIN EXPENSE_STARHUB ESH ON ESH.EDSH_ID=EDSH.EDSH_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=ESH.ULD_ID AND ESH_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND U.UNIT_ID='"+SearchFormData.BDLY_SRC_lb_unitno+"' ORDER BY U.UNIT_NO,ESH_INVOICE_DATE ASC";
    //----------------------------------------------------------UNIT EXPENSE=3---------------------------------------------------------------------------------//
    /*CATEGORY SEARCH*/
    var CUSTOMER_TYPE=SearchFormData.BDLY_SRC_lb_category==23?true:false;
    if(CUSTOMER_TYPE) //CUSTOMER TYPE
      BDLY_SRC_SelectQuery['3']['186'] = "SELECT EU.EU_ID,U.UNIT_NO,EC.ECN_DATA,CONCAT(C.CUSTOMER_FIRST_NAME,' ',C.CUSTOMER_LAST_NAME) AS NAME,DATE_FORMAT(EU.EU_INVOICE_DATE,'%d-%m-%Y'),EU.EU_INVOICE_ITEMS,EU.EU_INVOICE_FROM,EU.EU_AMOUNT,EU.EU_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EU.EU_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EU_TIMESTAMP  FROM EXPENSE_UNIT AS EU JOIN VW_ACTIVE_UNIT AS U ON U.UNIT_ID=EU.UNIT_ID LEFT JOIN CUSTOMER C ON C.CUSTOMER_ID=EU.CUSTOMER_ID JOIN EXPENSE_CONFIGURATION EC ON EU.ECN_ID=EC.ECN_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EU.ULD_ID AND EU.ECN_ID = "+SearchFormData.BDLY_SRC_lb_category+" AND EU.EU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EU.CUSTOMER_ID="+SearchFormData.BDLY_SRC_lb_cusname+" ORDER BY U.UNIT_NO ASC";
    else if(BDLY_SRC_lb_ExpenseList_val==3) // NON CUSTOMER
      BDLY_SRC_SelectQuery['3']['186'] = "SELECT EU.EU_ID,U.UNIT_NO,EC.ECN_DATA,NULL AS NAME,DATE_FORMAT(EU.EU_INVOICE_DATE,'%d-%m-%Y'),EU.EU_INVOICE_ITEMS,EU.EU_INVOICE_FROM,EU.EU_AMOUNT,EU.EU_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EU.EU_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EU_TIMESTAMP  FROM EXPENSE_UNIT AS EU JOIN VW_ACTIVE_UNIT U ON U.UNIT_ID=EU.UNIT_ID LEFT JOIN CUSTOMER C ON C.CUSTOMER_ID=EU.CUSTOMER_ID JOIN EXPENSE_CONFIGURATION EC ON EU.ECN_ID=EC.ECN_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EU.ULD_ID AND EU.ECN_ID = "+SearchFormData.BDLY_SRC_lb_category+" AND EU.EU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EU.CUSTOMER_ID IS NULL ORDER BY U.UNIT_NO,EU.EU_INVOICE_DATE ASC";
    /*INVOICE DATE SEARCH*/BDLY_SRC_SelectQuery['3']['188'] = "SELECT EU.EU_ID,U.UNIT_NO,EC.ECN_DATA,CONCAT(C.CUSTOMER_FIRST_NAME,' ',C.CUSTOMER_LAST_NAME) AS NAME,DATE_FORMAT(EU.EU_INVOICE_DATE,'%d-%m-%Y'),EU.EU_INVOICE_ITEMS,EU.EU_INVOICE_FROM,EU.EU_AMOUNT,EU.EU_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EU.EU_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EU_TIMESTAMP  FROM EXPENSE_UNIT AS EU JOIN VW_ACTIVE_UNIT U ON U.UNIT_ID=EU.UNIT_ID LEFT JOIN CUSTOMER C ON C.CUSTOMER_ID=EU.CUSTOMER_ID JOIN EXPENSE_CONFIGURATION EC ON EU.ECN_ID=EC.ECN_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EU.ULD_ID AND  EU.EU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY EU.EU_INVOICE_DATE,U.UNIT_NO ASC";
    /*INVOICE ITEM SEARCH*/BDLY_SRC_SelectQuery['3']['189'] = "SELECT EU.EU_ID,U.UNIT_NO,EC.ECN_DATA,CONCAT(C.CUSTOMER_FIRST_NAME,' ',C.CUSTOMER_LAST_NAME) AS NAME,DATE_FORMAT(EU.EU_INVOICE_DATE,'%d-%m-%Y'),EU.EU_INVOICE_ITEMS,EU.EU_INVOICE_FROM,EU.EU_AMOUNT,EU.EU_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EU.EU_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EU_TIMESTAMP  FROM EXPENSE_UNIT AS EU JOIN VW_ACTIVE_UNIT U ON U.UNIT_ID=EU.UNIT_ID LEFT JOIN CUSTOMER C ON C.CUSTOMER_ID=EU.CUSTOMER_ID JOIN EXPENSE_CONFIGURATION EC ON EU.ECN_ID=EC.ECN_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EU.ULD_ID AND  EU.EU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EU.EU_INVOICE_ITEMS='"+BDLY_SRC_invoiceitemssrcvalue+"' ORDER BY U.UNIT_NO,EU.EU_INVOICE_DATE ASC ";
    /*INVOICE FROM*/BDLY_SRC_SelectQuery['3']['190'] = "SELECT EU.EU_ID,U.UNIT_NO,EC.ECN_DATA,CONCAT(C.CUSTOMER_FIRST_NAME,' ',C.CUSTOMER_LAST_NAME) AS NAME,DATE_FORMAT(EU.EU_INVOICE_DATE,'%d-%m-%Y'),EU.EU_INVOICE_ITEMS,EU.EU_INVOICE_FROM,EU.EU_AMOUNT,EU.EU_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EU.EU_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EU_TIMESTAMP  FROM EXPENSE_UNIT AS EU JOIN VW_ACTIVE_UNIT U ON U.UNIT_ID=EU.UNIT_ID LEFT JOIN CUSTOMER C ON C.CUSTOMER_ID=EU.CUSTOMER_ID JOIN EXPENSE_CONFIGURATION EC ON EU.ECN_ID=EC.ECN_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EU.ULD_ID AND  EU.EU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EU.EU_INVOICE_FROM='"+BDLY_SRC_invfromsrcvalue+"' ORDER BY U.UNIT_NO,EU.EU_INVOICE_DATE ASC";
    /*COMMENTS*/BDLY_SRC_SelectQuery['3']['185'] = "SELECT EU.EU_ID,U.UNIT_NO,EC.ECN_DATA,CONCAT(C.CUSTOMER_FIRST_NAME,' ',C.CUSTOMER_LAST_NAME) AS NAME,DATE_FORMAT(EU.EU_INVOICE_DATE,'%d-%m-%Y'),EU.EU_INVOICE_ITEMS,EU.EU_INVOICE_FROM,EU.EU_AMOUNT,EU.EU_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EU.EU_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EU_TIMESTAMP  FROM EXPENSE_UNIT AS EU JOIN VW_ACTIVE_UNIT U ON U.UNIT_ID=EU.UNIT_ID LEFT JOIN CUSTOMER C ON C.CUSTOMER_ID=EU.CUSTOMER_ID JOIN EXPENSE_CONFIGURATION EC ON EU.ECN_ID=EC.ECN_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EU.ULD_ID AND EU.EU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EU.EU_COMMENTS='"+BDLY_SRC_commentssrcvalue+"' ORDER BY U.UNIT_NO,EU.EU_INVOICE_DATE ASC";
    /*UNIT NO*/BDLY_SRC_SelectQuery['3']['191'] = "SELECT EU.EU_ID,U.UNIT_NO,EC.ECN_DATA,CONCAT(C.CUSTOMER_FIRST_NAME,' ',C.CUSTOMER_LAST_NAME) AS NAME,DATE_FORMAT(EU.EU_INVOICE_DATE,'%d-%m-%Y'),EU.EU_INVOICE_ITEMS,EU.EU_INVOICE_FROM,EU.EU_AMOUNT,EU.EU_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EU.EU_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EU_TIMESTAMP  FROM EXPENSE_UNIT AS EU JOIN UNIT U ON U.UNIT_ID=EU.UNIT_ID LEFT JOIN CUSTOMER C ON C.CUSTOMER_ID=EU.CUSTOMER_ID JOIN EXPENSE_CONFIGURATION EC ON EU.ECN_ID=EC.ECN_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EU.ULD_ID AND  EU.EU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EU.UNIT_ID='"+SearchFormData.BDLY_SRC_lb_unitno+"' ORDER BY U.UNIT_NO,EU.EU_INVOICE_DATE ASC";
    /*-----------------------------------------------------------------------FACILITY USE=4----------------------------------------------------------------------*/
    /*COMMENTS SEARCH*/BDLY_SRC_SelectQuery['4']['167'] =  "SELECT EFU.EFU_ID,U.UNIT_NO,DATE_FORMAT(EFU.EFU_INVOICE_DATE,'%d-%m-%Y') AS FACILITYINVOICEDATE,EFU.EFU_DEPOSIT,EFU.EFU_AMOUNT,EFU.EFU_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EFU.EFU_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS FACILITY_TIMESTAMP FROM  EXPENSE_FACILITY_USE EFU JOIN VW_ACTIVE_UNIT U  ON U.UNIT_ID=EFU.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EFU.ULD_ID AND EFU.EFU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EFU.EFU_COMMENTS='"+BDLY_SRC_commentssrcvalue+"' ORDER BY U.UNIT_NO,EFU.EFU_INVOICE_DATE ASC";
    /*INVOICE DATE SEARCH*/BDLY_SRC_SelectQuery['4']['170'] =  "SELECT EFU.EFU_ID,U.UNIT_NO,DATE_FORMAT(EFU.EFU_INVOICE_DATE,'%d-%m-%Y') AS FACILITYINVOICEDATE,EFU.EFU_DEPOSIT,EFU.EFU_AMOUNT,EFU.EFU_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EFU.EFU_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS FACILITY_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_FACILITY_USE EFU ON U.UNIT_ID=EFU.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EFU.ULD_ID AND EFU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY EFU.EFU_INVOICE_DATE ASC";
    /*UNIT NO*/BDLY_SRC_SelectQuery['4']['191'] =  "SELECT EFU.EFU_ID,U.UNIT_NO,DATE_FORMAT(EFU.EFU_INVOICE_DATE,'%d-%m-%Y') AS FACILITYINVOICEDATE,EFU.EFU_DEPOSIT,EFU.EFU_AMOUNT,EFU.EFU_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EFU.EFU_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS FACILITY_TIMESTAMP FROM UNIT U JOIN EXPENSE_FACILITY_USE EFU ON U.UNIT_ID=EFU.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EFU.ULD_ID AND EFU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND U.UNIT_ID='"+SearchFormData.BDLY_SRC_lb_unitno+"' ORDER BY U.UNIT_NO,EFU.EFU_INVOICE_DATE ASC";
    /*----------------------------------------------------------------------DIGITAL VOICE=5--------------------------------------------------------------------------*/
    /*ACCOUNT NO*/BDLY_SRC_SelectQuery['5']['151'] = "SELECT EDV.EDV_ID,U.UNIT_NO,EC.ECN_DATA,EDDV.EDDV_DIGITAL_VOICE_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO,DATE_FORMAT(EDV.EDV_INVOICE_DATE,'%d-%m-%Y') AS DIGI_INV_DATE,DATE_FORMAT(EDV.EDV_FROM_PERIOD,'%d-%m-%Y') AS DIGI_FROM_PERIOD,DATE_FORMAT(EDV.EDV_TO_PERIOD,'%d-%m-%Y') AS DIGI_TO_PERIOD,EDV.EDV_AMOUNT,EDV.EDV_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDV.EDV_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS DIGITAL_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_DIGITAL_VOICE EDDV ON U.UNIT_ID=EDDV.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDDV.ECN_ID JOIN EXPENSE_DIGITAL_VOICE EDV ON EDV.EDDV_ID=EDDV.EDDV_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EDV.ULD_ID AND EDV.EDV_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EDDV.EDDV_DIGITAL_ACCOUNT_NO='"+SearchFormData.BDLY_SRC_lb_accountno+"' ORDER BY U.UNIT_NO,EDV.EDV_INVOICE_DATE ASC";
    /*COMMENTS SEARCH*/BDLY_SRC_SelectQuery['5']['153'] = "SELECT EDV.EDV_ID,U.UNIT_NO,EC.ECN_DATA,EDDV.EDDV_DIGITAL_VOICE_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO,DATE_FORMAT(EDV.EDV_INVOICE_DATE,'%d-%m-%Y') AS DIGI_INV_DATE,DATE_FORMAT(EDV.EDV_FROM_PERIOD,'%d-%m-%Y') AS DIGI_FROM_PERIOD,DATE_FORMAT(EDV.EDV_TO_PERIOD,'%d-%m-%Y') AS DIGI_TO_PERIOD,EDV.EDV_AMOUNT,EDV.EDV_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDV.EDV_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS DIGITAL_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_DIGITAL_VOICE EDDV ON U.UNIT_ID=EDDV.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDDV.ECN_ID JOIN EXPENSE_DIGITAL_VOICE EDV ON EDV.EDDV_ID=EDDV.EDDV_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EDV.ULD_ID AND EDV.EDV_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EDV.EDV_COMMENTS='"+BDLY_SRC_commentssrcvalue+"' ORDER BY U.UNIT_NO,EDV.EDV_INVOICE_DATE ASC";
    /*DIGITAL VOICE NO*/BDLY_SRC_SelectQuery['5']['154'] = "SELECT EDV.EDV_ID,U.UNIT_NO,EC.ECN_DATA,EDDV.EDDV_DIGITAL_VOICE_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO,DATE_FORMAT(EDV.EDV_INVOICE_DATE,'%d-%m-%Y') AS DIGI_INV_DATE,DATE_FORMAT(EDV.EDV_FROM_PERIOD,'%d-%m-%Y') AS DIGI_FROM_PERIOD,DATE_FORMAT(EDV.EDV_TO_PERIOD,'%d-%m-%Y') AS DIGI_TO_PERIOD,EDV.EDV_AMOUNT,EDV.EDV_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDV.EDV_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS DIGITAL_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_DIGITAL_VOICE EDDV ON U.UNIT_ID=EDDV.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDDV.ECN_ID JOIN EXPENSE_DIGITAL_VOICE EDV ON EDV.EDDV_ID=EDDV.EDDV_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EDV.ULD_ID AND EDV.EDV_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EDDV.EDDV_DIGITAL_VOICE_NO='"+SearchFormData.BDLY_SRC_lb_Digvoiceno+"' ORDER BY U.UNIT_NO,EDV.EDV_INVOICE_DATE ASC"; 
    /*FROM PERIOD*/BDLY_SRC_SelectQuery['5']['155'] = "SELECT EDV.EDV_ID,U.UNIT_NO,EC.ECN_DATA,EDDV.EDDV_DIGITAL_VOICE_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO,DATE_FORMAT(EDV.EDV_INVOICE_DATE,'%d-%m-%Y') AS DIGI_INV_DATE,DATE_FORMAT(EDV.EDV_FROM_PERIOD,'%d-%m-%Y') AS DIGI_FROM_PERIOD,DATE_FORMAT(EDV.EDV_TO_PERIOD,'%d-%m-%Y') AS DIGI_TO_PERIOD,EDV.EDV_AMOUNT,EDV.EDV_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDV.EDV_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS DIGITAL_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_DIGITAL_VOICE EDDV ON U.UNIT_ID=EDDV.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDDV.ECN_ID JOIN EXPENSE_DIGITAL_VOICE EDV ON EDV.EDDV_ID=EDDV.EDDV_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EDV.ULD_ID AND EDV.EDV_FROM_PERIOD BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY EDV.EDV_FROM_PERIOD,U.UNIT_NO,EDV.EDV_INVOICE_DATE ASC";
    /*INVOICE DATE*/BDLY_SRC_SelectQuery['5']['156'] = "SELECT EDV.EDV_ID,U.UNIT_NO,EC.ECN_DATA,EDDV.EDDV_DIGITAL_VOICE_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO,DATE_FORMAT(EDV.EDV_INVOICE_DATE,'%d-%m-%Y') AS DIGI_INV_DATE,DATE_FORMAT(EDV.EDV_FROM_PERIOD,'%d-%m-%Y') AS DIGI_FROM_PERIOD,DATE_FORMAT(EDV.EDV_TO_PERIOD,'%d-%m-%Y') AS DIGI_TO_PERIOD,EDV.EDV_AMOUNT,EDV.EDV_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDV.EDV_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS DIGITAL_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_DIGITAL_VOICE EDDV ON U.UNIT_ID=EDDV.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDDV.ECN_ID JOIN EXPENSE_DIGITAL_VOICE EDV ON EDV.EDDV_ID=EDDV.EDDV_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EDV.ULD_ID AND EDV.EDV_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY EDV.EDV_INVOICE_DATE,U.UNIT_NO ASC";
    /*INVOICE TO*/BDLY_SRC_SelectQuery['5']['157'] = "SELECT EDV.EDV_ID,U.UNIT_NO,EC.ECN_DATA,EDDV.EDDV_DIGITAL_VOICE_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO,DATE_FORMAT(EDV.EDV_INVOICE_DATE,'%d-%m-%Y') AS DIGI_INV_DATE,DATE_FORMAT(EDV.EDV_FROM_PERIOD,'%d-%m-%Y') AS DIGI_FROM_PERIOD,DATE_FORMAT(EDV.EDV_TO_PERIOD,'%d-%m-%Y') AS DIGI_TO_PERIOD,EDV.EDV_AMOUNT,EDV.EDV_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDV.EDV_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS DIGITAL_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_DIGITAL_VOICE EDDV ON U.UNIT_ID=EDDV.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDDV.ECN_ID JOIN EXPENSE_DIGITAL_VOICE EDV ON EDV.EDDV_ID=EDDV.EDDV_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EDV.ULD_ID AND EDV.EDV_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EC.ECN_ID='"+SearchFormData.BDLY_SRC_lb_invoiceto+"' ORDER BY U.UNIT_NO,EDV.EDV_INVOICE_DATE ASC";
    /*TO PERIOD*/BDLY_SRC_SelectQuery['5']['158'] = "SELECT EDV.EDV_ID,U.UNIT_NO,EC.ECN_DATA,EDDV.EDDV_DIGITAL_VOICE_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO,DATE_FORMAT(EDV.EDV_INVOICE_DATE,'%d-%m-%Y') AS DIGI_INV_DATE,DATE_FORMAT(EDV.EDV_FROM_PERIOD,'%d-%m-%Y') AS DIGI_FROM_PERIOD,DATE_FORMAT(EDV.EDV_TO_PERIOD,'%d-%m-%Y') AS DIGI_TO_PERIOD,EDV.EDV_AMOUNT,EDV.EDV_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDV.EDV_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS DIGITAL_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_DIGITAL_VOICE EDDV ON U.UNIT_ID=EDDV.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDDV.ECN_ID JOIN EXPENSE_DIGITAL_VOICE EDV ON EDV.EDDV_ID=EDDV.EDDV_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EDV.ULD_ID AND EDV.EDV_TO_PERIOD BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY EDV.EDV_TO_PERIOD,U.UNIT_NO,EDV.EDV_INVOICE_DATE ASC"; 
    /*UNIT NO*/BDLY_SRC_SelectQuery['5']['191'] = "SELECT EDV.EDV_ID,U.UNIT_NO,EC.ECN_DATA,EDDV.EDDV_DIGITAL_VOICE_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO,DATE_FORMAT(EDV.EDV_INVOICE_DATE,'%d-%m-%Y') AS DIGI_INV_DATE,DATE_FORMAT(EDV.EDV_FROM_PERIOD,'%d-%m-%Y') AS DIGI_FROM_PERIOD,DATE_FORMAT(EDV.EDV_TO_PERIOD,'%d-%m-%Y') AS DIGI_TO_PERIOD,EDV.EDV_AMOUNT,EDV.EDV_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDV.EDV_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS DIGITAL_TIMESTAMP FROM UNIT U JOIN EXPENSE_DETAIL_DIGITAL_VOICE EDDV ON U.UNIT_ID=EDDV.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDDV.ECN_ID JOIN EXPENSE_DIGITAL_VOICE EDV ON EDV.EDDV_ID=EDDV.EDDV_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EDV.ULD_ID AND EDV.EDV_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EDDV.UNIT_ID='"+SearchFormData.BDLY_SRC_lb_unitno+"' ORDER BY U.UNIT_NO,EDV.EDV_INVOICE_DATE ASC";
    /*----------------------------------------------------------PURCHASE NEW ACCESS CARD=6-------------------------------------------------------------------------------*/
    /*CARD NO*/BDLY_SRC_SelectQuery['6']['174'] = "SELECT EPC.EPNC_ID,U.UNIT_NO,EPC.EPNC_NUMBER,DATE_FORMAT(EPC.EPNC_INVOICE_DATE,'%d-%m-%Y') AS PURCAHSESDATE,EPC.EPNC_AMOUNT,EPC.EPNC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EPC.EPNC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS PURCHASE_TIMESTAMP FROM EXPENSE_PURCHASE_NEW_CARD EPC JOIN VW_ACTIVE_UNIT U ON EPC.UNIT_ID=U.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EPC.ULD_ID AND  EPC.EPNC_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EPC.EPNC_NUMBER='"+SearchFormData.BDLY_SRC_lb_cardno+"' ORDER BY U.UNIT_NO,EPC.EPNC_INVOICE_DATE ASC";
    /*COMMENTS SEARCH*/BDLY_SRC_SelectQuery['6']['175'] = "SELECT EPC.EPNC_ID,U.UNIT_NO,EPC.EPNC_NUMBER,DATE_FORMAT(EPC.EPNC_INVOICE_DATE,'%d-%m-%Y') AS PURCAHSESDATE,EPC.EPNC_AMOUNT,EPC.EPNC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EPC.EPNC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS PURCHASE_TIMESTAMP FROM EXPENSE_PURCHASE_NEW_CARD EPC JOIN VW_ACTIVE_UNIT U ON EPC.UNIT_ID=U.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EPC.ULD_ID AND  EPC.EPNC_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EPC.EPNC_COMMENTS='"+BDLY_SRC_commentssrcvalue+"' ORDER BY U.UNIT_NO,EPC.EPNC_INVOICE_DATE ASC";
    /*INVOICE DATE SEARCH*/BDLY_SRC_SelectQuery['6']['177'] = "SELECT EPC.EPNC_ID,U.UNIT_NO,EPC.EPNC_NUMBER,DATE_FORMAT(EPC.EPNC_INVOICE_DATE,'%d-%m-%Y') AS PURCAHSESDATE,EPC.EPNC_AMOUNT,EPC.EPNC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EPC.EPNC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS PURCHASE_TIMESTAMP FROM EXPENSE_PURCHASE_NEW_CARD EPC JOIN VW_ACTIVE_UNIT U ON EPC.UNIT_ID=U.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EPC.ULD_ID AND  EPC.EPNC_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY EPC.EPNC_INVOICE_DATE,U.UNIT_NO ASC";
    /*UNIT NO SEARCH*/BDLY_SRC_SelectQuery['6']['191'] = "SELECT EPC.EPNC_ID,U.UNIT_NO,EPC.EPNC_NUMBER,DATE_FORMAT(EPC.EPNC_INVOICE_DATE,'%d-%m-%Y') AS PURCAHSESDATE,EPC.EPNC_AMOUNT,EPC.EPNC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EPC.EPNC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS PURCHASE_TIMESTAMP FROM EXPENSE_PURCHASE_NEW_CARD EPC JOIN UNIT U ON EPC.UNIT_ID=U.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EPC.ULD_ID AND  EPC.EPNC_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EPC.UNIT_ID ='"+SearchFormData.BDLY_SRC_lb_unitno+"' ORDER BY EPC.EPNC_INVOICE_DATE ASC";
    /*----------------------------------------------------------MOVING IN OUT=7-------------------------------------------------------------------------------------*/
    /*COMMENTS SEARCH*/BDLY_SRC_SelectQuery['7']['171'] = "SELECT M.EMIO_ID,U.UNIT_NO,DATE_FORMAT(M.EMIO_INVOICE_DATE,'%d-%m-%Y') AS COMMENTSDATE,M.EMIO_AMOUNT,M.EMIO_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(M.EMIO_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS MOVING_TIMESTAMP FROM EXPENSE_MOVING_IN_AND_OUT M JOIN VW_ACTIVE_UNIT U ON U.UNIT_ID=M.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=M.ULD_ID AND M.EMIO_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND M.EMIO_COMMENTS='"+BDLY_SRC_commentssrcvalue+"' ORDER BY U.UNIT_NO,M.EMIO_INVOICE_DATE ASC";
    /*INVOICE DATE SEARCH*/BDLY_SRC_SelectQuery['7']['173'] = "SELECT M.EMIO_ID,U.UNIT_NO,DATE_FORMAT(M.EMIO_INVOICE_DATE,'%d-%m-%Y') AS COMMENTSDATE,M.EMIO_AMOUNT,M.EMIO_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(M.EMIO_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS MOVING_TIMESTAMP FROM EXPENSE_MOVING_IN_AND_OUT M JOIN VW_ACTIVE_UNIT U ON U.UNIT_ID=M.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=M.ULD_ID AND M.EMIO_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY M.EMIO_INVOICE_DATE,U.UNIT_NO ASC";
    /*UNIT NO SEARCH*/BDLY_SRC_SelectQuery['7']['191'] = "SELECT M.EMIO_ID,U.UNIT_NO,DATE_FORMAT(M.EMIO_INVOICE_DATE,'%d-%m-%Y') AS COMMENTSDATE,M.EMIO_AMOUNT,M.EMIO_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(M.EMIO_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS MOVING_TIMESTAMP FROM EXPENSE_MOVING_IN_AND_OUT M JOIN UNIT U ON U.UNIT_ID=M.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=M.ULD_ID AND M.EMIO_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND U.UNIT_ID='"+SearchFormData.BDLY_SRC_lb_unitno+"' ORDER BY U.UNIT_NO,M.EMIO_INVOICE_DATE ASC";
    /*------------------------------------------------------------CAR PARK=8------------------------------------------------------------------------------------------*/
    /*CAR NO SEARCH*/BDLY_SRC_SelectQuery['8']['127'] = "SELECT ECP.ECP_PARK_ID,U.UNIT_NO,EDCP.EDCP_CAR_NO,DATE_FORMAT(ECP.ECP_INVOICE_DATE,'%d-%m-%Y') AS CARPARKINVOICEDATE,DATE_FORMAT(ECP.ECP_FROM_PERIOD,'%d-%m-%Y') AS CARPARKFROMPERIOD,DATE_FORMAT(ECP.ECP_TO_PERIOD,'%d-%m-%Y') AS CARPARKTOPERIOD,ECP.ECP_AMOUNT,ECP.ECP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ECP.ECP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS CARPARK_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_CARPARK EDCP ON U.UNIT_ID=EDCP.UNIT_ID JOIN EXPENSE_CARPARK ECP ON EDCP.EDCP_ID=ECP.EDCP_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=ECP.ULD_ID AND ECP.ECP_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EDCP.EDCP_CAR_NO='"+SearchFormData.BDLY_SRC_lb_carno+"' ORDER BY U.UNIT_NO,ECP.ECP_INVOICE_DATE ASC";
    /*COMMENTS SEARCH*/BDLY_SRC_SelectQuery['8']['128'] = "SELECT ECP.ECP_PARK_ID,U.UNIT_NO,EDCP.EDCP_CAR_NO,DATE_FORMAT(ECP.ECP_INVOICE_DATE,'%d-%m-%Y') AS CARPARKINVOICEDATE,DATE_FORMAT(ECP.ECP_FROM_PERIOD,'%d-%m-%Y') AS CARPARKFROMPERIOD,DATE_FORMAT(ECP.ECP_TO_PERIOD,'%d-%m-%Y') AS CARPARKTOPERIOD,ECP.ECP_AMOUNT,ECP.ECP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ECP.ECP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS CARPARK_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_CARPARK EDCP ON U.UNIT_ID=EDCP.UNIT_ID JOIN EXPENSE_CARPARK ECP ON EDCP.EDCP_ID=ECP.EDCP_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=ECP.ULD_ID AND ECP.ECP_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND ECP.ECP_COMMENTS='"+BDLY_SRC_commentssrcvalue+"' ORDER BY U.UNIT_NO,ECP.ECP_INVOICE_DATE ASC";
    /*FROM PERIOD SEARCH*/BDLY_SRC_SelectQuery['8']['129'] = "SELECT ECP.ECP_PARK_ID,U.UNIT_NO,EDCP.EDCP_CAR_NO,DATE_FORMAT(ECP.ECP_INVOICE_DATE,'%d-%m-%Y') AS CARPARKINVOICEDATE,DATE_FORMAT(ECP.ECP_FROM_PERIOD,'%d-%m-%Y') AS CARPARKFROMPERIOD,DATE_FORMAT(ECP.ECP_TO_PERIOD,'%d-%m-%Y') AS CARPARKTOPERIOD,ECP.ECP_AMOUNT,ECP.ECP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ECP.ECP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS CARPARK_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_CARPARK EDCP ON U.UNIT_ID=EDCP.UNIT_ID JOIN EXPENSE_CARPARK ECP ON EDCP.EDCP_ID=ECP.EDCP_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=ECP.ULD_ID AND ECP.ECP_FROM_PERIOD BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY ECP.ECP_FROM_PERIOD,U.UNIT_NO,ECP.ECP_INVOICE_DATE ASC";
    /*TO PERIOD SEARCH*/BDLY_SRC_SelectQuery['8']['130'] = "SELECT ECP.ECP_PARK_ID,U.UNIT_NO,EDCP.EDCP_CAR_NO,DATE_FORMAT(ECP.ECP_INVOICE_DATE,'%d-%m-%Y') AS CARPARKINVOICEDATE,DATE_FORMAT(ECP.ECP_FROM_PERIOD,'%d-%m-%Y') AS CARPARKFROMPERIOD,DATE_FORMAT(ECP.ECP_TO_PERIOD,'%d-%m-%Y') AS CARPARKTOPERIOD,ECP.ECP_AMOUNT,ECP.ECP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ECP.ECP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS CARPARK_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_CARPARK EDCP ON U.UNIT_ID=EDCP.UNIT_ID JOIN EXPENSE_CARPARK ECP ON EDCP.EDCP_ID=ECP.EDCP_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=ECP.ULD_ID AND ECP.ECP_TO_PERIOD BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY ECP.ECP_TO_PERIOD,U.UNIT_NO,ECP.ECP_INVOICE_DATE ASC";
    /*INVOICE DATE SEARCH*/BDLY_SRC_SelectQuery['8']['131'] = "SELECT ECP.ECP_PARK_ID,U.UNIT_NO,EDCP.EDCP_CAR_NO,DATE_FORMAT(ECP.ECP_INVOICE_DATE,'%d-%m-%Y') AS CARPARKINVOICEDATE,DATE_FORMAT(ECP.ECP_FROM_PERIOD,'%d-%m-%Y') AS CARPARKFROMPERIOD,DATE_FORMAT(ECP.ECP_TO_PERIOD,'%d-%m-%Y') AS CARPARKTOPERIOD,ECP.ECP_AMOUNT,ECP.ECP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ECP.ECP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS CARPARK_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_CARPARK EDCP ON U.UNIT_ID=EDCP.UNIT_ID JOIN EXPENSE_CARPARK ECP ON EDCP.EDCP_ID=ECP.EDCP_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=ECP.ULD_ID AND ECP.ECP_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY ECP.ECP_INVOICE_DATE,U.UNIT_NO ASC";
    /*UNIT NO SEARCH*/BDLY_SRC_SelectQuery['8']['191'] = "SELECT ECP.ECP_PARK_ID,U.UNIT_NO,EDCP.EDCP_CAR_NO,DATE_FORMAT(ECP.ECP_INVOICE_DATE,'%d-%m-%Y') AS CARPARKINVOICEDATE,DATE_FORMAT(ECP.ECP_FROM_PERIOD,'%d-%m-%Y') AS CARPARKFROMPERIOD,DATE_FORMAT(ECP.ECP_TO_PERIOD,'%d-%m-%Y') AS CARPARKTOPERIOD,ECP.ECP_AMOUNT,ECP.ECP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ECP.ECP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS CARPARK_TIMESTAMP FROM UNIT U JOIN EXPENSE_DETAIL_CARPARK EDCP ON U.UNIT_ID=EDCP.UNIT_ID JOIN EXPENSE_CARPARK ECP ON EDCP.EDCP_ID=ECP.EDCP_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=ECP.ULD_ID AND ECP.ECP_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EDCP.UNIT_ID ='"+SearchFormData.BDLY_SRC_lb_unitno+"' ORDER BY U.UNIT_NO,ECP.ECP_INVOICE_DATE ASC";
    /*-----------------------------------------------------------AIRCON SERVICE=9-------------------------------------------------------------------------------------------------*/
    /*AIRCON SERVICE BY SEARCH*/BDLY_SRC_SelectQuery['9']['124'] = "SELECT EAS.EAS_ID,U.UNIT_NO,EASB.EASB_DATA,DATE_FORMAT(EAS_DATE,'%d-%m-%Y') AS AIRCONDATE,EAS.EAS_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EAS.EAS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS AIRCON_TIMESTAMP FROM EXPENSE_DETAIL_AIRCON_SERVICE EDAS JOIN EXPENSE_AIRCON_SERVICE EAS ON EDAS.EDAS_ID=EAS.EDAS_ID JOIN EXPENSE_AIRCON_SERVICE_BY EASB ON EASB.EASB_ID=EDAS.EASB_ID JOIN VW_ACTIVE_UNIT U ON EDAS.UNIT_ID=U.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EAS.ULD_ID AND EAS.EAS_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EASB.EASB_DATA='"+SearchFormData.BDLY_SRC_lb_serviceby+"' ORDER BY U.UNIT_NO,EAS.EAS_DATE ASC";
    /*COMMENTS SEARCH*/BDLY_SRC_SelectQuery['9']['125'] = "SELECT EAS.EAS_ID,U.UNIT_NO,EASB.EASB_DATA,DATE_FORMAT(EAS_DATE,'%d-%m-%Y') AS AIRCONDATE,EAS.EAS_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EAS.EAS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS AIRCON_TIMESTAMP FROM EXPENSE_DETAIL_AIRCON_SERVICE EDAS JOIN EXPENSE_AIRCON_SERVICE EAS ON EDAS.EDAS_ID=EAS.EDAS_ID JOIN EXPENSE_AIRCON_SERVICE_BY EASB ON EASB.EASB_ID=EDAS.EASB_ID JOIN VW_ACTIVE_UNIT U ON EDAS.UNIT_ID=U.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EAS.ULD_ID AND EAS.EAS_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EAS.EAS_COMMENTS='"+BDLY_SRC_commentssrcvalue+"' ORDER BY U.UNIT_NO,EAS.EAS_DATE ASC";
    /*INVOICE DATE SEARCH*/BDLY_SRC_SelectQuery['9']['126'] = "SELECT EAS.EAS_ID,U.UNIT_NO,EASB.EASB_DATA,DATE_FORMAT(EAS_DATE,'%d-%m-%Y') AS AIRCONDATE,EAS.EAS_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EAS.EAS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS AIRCON_TIMESTAMP FROM EXPENSE_DETAIL_AIRCON_SERVICE EDAS JOIN EXPENSE_AIRCON_SERVICE EAS ON EDAS.EDAS_ID=EAS.EDAS_ID JOIN EXPENSE_AIRCON_SERVICE_BY EASB ON EASB.EASB_ID=EDAS.EASB_ID JOIN VW_ACTIVE_UNIT U ON EDAS.UNIT_ID=U.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EAS.ULD_ID AND EAS.EAS_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY EAS.EAS_DATE,U.UNIT_NO ASC";
    /*UNIT NO SEARCH*/BDLY_SRC_SelectQuery['9']['191'] = "SELECT EAS.EAS_ID,U.UNIT_NO,EASB.EASB_DATA,DATE_FORMAT(EAS_DATE,'%d-%m-%Y') AS AIRCONDATE,EAS.EAS_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EAS.EAS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS AIRCON_TIMESTAMP FROM EXPENSE_DETAIL_AIRCON_SERVICE EDAS JOIN EXPENSE_AIRCON_SERVICE EAS ON EDAS.EDAS_ID=EAS.EDAS_ID JOIN EXPENSE_AIRCON_SERVICE_BY EASB ON EASB.EASB_ID=EDAS.EASB_ID JOIN UNIT U ON EDAS.UNIT_ID=U.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EAS.ULD_ID AND EAS.EAS_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND U.UNIT_ID='"+SearchFormData.BDLY_SRC_lb_unitno+"' ORDER BY U.UNIT_NO,EAS.EAS_DATE ASC";
    /*AIRCON DUE SEARCH*/if(SearchFormData.BDLY_SRC_lb_serachopt==197){
      var BDLY_SRC_Aircon_DueDate =eilib.GetForperiodDateFormat(SearchFormData.BDLY_SRC_servicedue,SearchFormData.BDLY_SRC_servicedue);// SqlDateFormatFromMonth(SearchFormData.BDLY_SRC_servicedue,SearchFormData.BDLY_SRC_lb_serachopt)
      BDLY_SRC_SelectQuery['9']['197'] = "SELECT EAS.EAS_ID,U.UNIT_NO,EASB.EASB_DATA,DATE_FORMAT(EAS_DATE,'%d-%m-%Y') AS AIRCONDATE,EAS.EAS_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EAS.EAS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS AIRCON_TIMESTAMP FROM EXPENSE_DETAIL_AIRCON_SERVICE EDAS JOIN EXPENSE_AIRCON_SERVICE EAS ON EDAS.EDAS_ID=EAS.EDAS_ID JOIN EXPENSE_AIRCON_SERVICE_BY EASB ON EASB.EASB_ID=EDAS.EASB_ID JOIN VW_ACTIVE_UNIT U ON EDAS.UNIT_ID=U.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EAS.ULD_ID AND EAS.EAS_DATE BETWEEN SUBDATE('"+BDLY_SRC_Aircon_DueDate.frmdate+"',INTERVAL 3 MONTH) AND SUBDATE('"+BDLY_SRC_Aircon_DueDate.todate+"',INTERVAL 3 MONTH) ORDER BY EAS.EAS_DATE,U.UNIT_NO ASC";
    }
    /*-------------------------------------------------------------PETTY CASH=10----------------------------------------------------------------------------*/
    /*INVOICE DATE SEARCH*/BDLY_SRC_SelectQuery['10']['136'] = "SELECT EPC.EPC_ID,DATE_FORMAT(EPC.EPC_DATE,'%d-%m-%Y') AS DATE,EPC.EPC_CASH_IN,EPC.EPC_CASH_OUT,EPC.EPC_BALANCE,EPC.EPC_INVOICE_ITEMS,EPC.EPC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EPC.EPC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM EXPENSE_PETTY_CASH EPC,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EPC.ULD_ID AND  EPC.EPC_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY EPC.EPC_DATE ASC";
    /*INVOICE ITEM*/BDLY_SRC_SelectQuery['10']['139'] = "SELECT EPC.EPC_ID,DATE_FORMAT(EPC.EPC_DATE,'%d-%m-%Y') AS DATE,EPC.EPC_CASH_IN,EPC.EPC_CASH_OUT,EPC.EPC_BALANCE,EPC.EPC_INVOICE_ITEMS,EPC.EPC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EPC.EPC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM EXPENSE_PETTY_CASH EPC,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EPC.ULD_ID AND  EPC.EPC_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"'  AND EPC.EPC_INVOICE_ITEMS='"+BDLY_SRC_invoiceitemssrcvalue+"' ORDER BY EPC.EPC_DATE ASC";
    /*COMMENTS SEARCH*/BDLY_SRC_SelectQuery['10']['140'] = "SELECT EPC.EPC_ID,DATE_FORMAT(EPC.EPC_DATE,'%d-%m-%Y') AS DATE,EPC.EPC_CASH_IN,EPC.EPC_CASH_OUT,EPC.EPC_BALANCE,EPC.EPC_INVOICE_ITEMS,EPC.EPC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EPC.EPC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM EXPENSE_PETTY_CASH EPC,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EPC.ULD_ID AND  EPC.EPC_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EPC.EPC_COMMENTS='"+BDLY_SRC_commentssrcvalue+"' ORDER BY EPC.EPC_DATE ASC";
    /*------------------------------------------------------------HOUSE KEEPING=11----------------------------------------------------------------------------*/
    /*EMP NAME SEARCH*/BDLY_SRC_SelectQuery['11']['141'] = "SELECT EHK.EHK_ID,CONCAT(ED.EMP_FIRST_NAME,' ',ED.EMP_LAST_NAME) AS NAME ,DATE_FORMAT(EHK.EHK_WORK_DATE,'%d-%m-%Y') AS DATE,EHK.EHK_DURATION,EHK.EHK_DESCRIPTION,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EHK.EHK_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EHK_TIMESTAMP FROM EXPENSE_HOUSEKEEPING EHK JOIN EMPLOYEE_DETAILS ED ON ED.EMP_ID=EHK.EMP_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EHK.ULD_ID AND EHK.EHK_WORK_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EHK.EMP_ID="+SearchFormData.BDLY_SRC_lb_cleanername+" ORDER BY EHK.EHK_WORK_DATE ASC";
    if(SearchFormData.BDLY_SRC_lb_serachopt==142)
    {
      /*FOR PERIOD DURATION SEARCH*/BDLY_SRC_SelectQuery['11']['142'] = "SELECT DURATION,AMOUNT FROM "+BDLY_SRC_electemp_name+"";
    }
    // SELECT DURATION,AMOUNT FROM TEMP_HOUSEKEEPING_DURATION_AMOUNT
    /*DESCRIPTION SEARCH*/BDLY_SRC_SelectQuery['11']['143'] = "SELECT EHK.EHK_ID,CONCAT(ED.EMP_FIRST_NAME,' ',ED.EMP_LAST_NAME) AS NAME ,DATE_FORMAT(EHK.EHK_WORK_DATE,'%d-%m-%Y') AS DATE,EHK.EHK_DURATION,EHK.EHK_DESCRIPTION,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EHK.EHK_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EHK_TIMESTAMP FROM EXPENSE_HOUSEKEEPING EHK JOIN EMPLOYEE_DETAILS ED ON ED.EMP_ID=EHK.EMP_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EHK.ULD_ID AND EHK.EHK_WORK_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EHK.EHK_DESCRIPTION ='"+BDLY_SRC_commentssrcvalue+"' ORDER BY EHK.EHK_WORK_DATE ASC";
    /*WORK DATE SEARCH*/BDLY_SRC_SelectQuery['11']['145'] = "SELECT EHK.EHK_ID,CONCAT(ED.EMP_FIRST_NAME,' ',ED.EMP_LAST_NAME) AS NAME ,DATE_FORMAT(EHK.EHK_WORK_DATE,'%d-%m-%Y') AS DATE,EHK.EHK_DURATION,EHK.EHK_DESCRIPTION,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EHK.EHK_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EHK_TIMESTAMP FROM EXPENSE_HOUSEKEEPING EHK JOIN EMPLOYEE_DETAILS ED ON ED.EMP_ID=EHK.EMP_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EHK.ULD_ID AND EHK.EHK_WORK_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY EHK.EHK_WORK_DATE ASC"; 
    /*DURATION SEARCH*/if(SearchFormData.BDLY_SRC_lb_serachopt==144)
    {
      BDLY_SRC_SelectQuery['11']['144']="SELECT EHK.EHK_ID,CONCAT(ED.EMP_FIRST_NAME,' ',ED.EMP_LAST_NAME) AS NAME ,DATE_FORMAT(EHK.EHK_WORK_DATE,'%d-%m-%Y') AS DATE,EHK.EHK_DURATION,EHK.EHK_DESCRIPTION,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EHK.EHK_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EHK_TIMESTAMP FROM EXPENSE_HOUSEKEEPING EHK JOIN EMPLOYEE_DETAILS ED ON ED.EMP_ID=EHK.EMP_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EHK.ULD_ID AND EHK.EHK_WORK_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EHK.EHK_DURATION BETWEEN "+SearchFormData.BDLY_SRC_duration[0]+" AND "+SearchFormData.BDLY_SRC_duration[1]+" ORDER BY EHK.EHK_DURATION,EHK.EHK_WORK_DATE ASC";
    }
    /*---------------------------------------------------------------HOUSEKEEPING PAYMENT=12-----------------------------------------------------------------*/
    /*COMMENTS SEARCH*/  BDLY_SRC_SelectQuery['12']['146'] = "SELECT EHKP.EHKP_ID,UNIT_NO,EHKP.EHKP_AMOUNT,DATE_FORMAT(EHKP.EHKP_FOR_PERIOD,'%M-%Y'),DATE_FORMAT(EHKP.EHKP_PAID_DATE,'%d-%m-%Y') AS DATE,EHKP.EHKP_COMMENTS,EHKP.EHKP_USERSTAMP,DATE_FORMAT(CONVERT_TZ(EHKP.EHKP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EHKP_TIMESTAMP FROM "+BDLY_SRC_tmptbl_hkpsrch+" EHKP WHERE EHKP.EHKP_PAID_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EHKP.EHKP_COMMENTS='"+BDLY_SRC_commentssrcvalue+"' ORDER BY UNIT_NO,EHKP.EHKP_PAID_DATE ASC";
    /*FOR PERIOD SEARCH*/if(SearchFormData.BDLY_SRC_lb_serachopt==147)
    {
      var BDLY_SRC_forperiodvalue=eilib.GetForperiodDateFormat(SearchFormData.BDLY_SRC_startforperiod,SearchFormData.BDLY_SRC_endforperiod)
      BDLY_SRC_SelectQuery['12']['147'] = "SELECT EHKP.EHKP_ID,UNIT_NO,EHKP.EHKP_AMOUNT,DATE_FORMAT(EHKP.EHKP_FOR_PERIOD,'%M-%Y'),DATE_FORMAT(EHKP.EHKP_PAID_DATE,'%d-%m-%Y') AS DATE,EHKP.EHKP_COMMENTS,EHKP.EHKP_USERSTAMP,DATE_FORMAT(CONVERT_TZ(EHKP.EHKP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EHKP_TIMESTAMP FROM "+BDLY_SRC_tmptbl_hkpsrch+" EHKP WHERE EHKP.EHKP_FOR_PERIOD BETWEEN '"+BDLY_SRC_forperiodvalue.frmdate+"' AND '"+BDLY_SRC_forperiodvalue.todate+"' ORDER BY EHKP.EHKP_FOR_PERIOD,UNIT_NO ASC";
    }
    /*PAID DATE SEARCH*/ BDLY_SRC_SelectQuery['12']['149'] = "SELECT EHKP.EHKP_ID,UNIT_NO,EHKP.EHKP_AMOUNT,DATE_FORMAT(EHKP.EHKP_FOR_PERIOD,'%M-%Y'),DATE_FORMAT(EHKP.EHKP_PAID_DATE,'%d-%m-%Y') AS DATE,EHKP.EHKP_COMMENTS,EHKP.EHKP_USERSTAMP,DATE_FORMAT(CONVERT_TZ(EHKP.EHKP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EHKP_TIMESTAMP FROM "+BDLY_SRC_tmptbl_hkpsrch+" EHKP WHERE EHKP.EHKP_PAID_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' ORDER BY EHKP.EHKP_PAID_DATE,UNIT_NO ASC";
    /*UNIT NO SEARCH*/ BDLY_SRC_SelectQuery['12']['198'] = "SELECT EHKU.EHKU_ID,EHKU_UNIT_NO,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EHKU.EHKU_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EHKU_TIMESTAMP FROM EXPENSE_HOUSEKEEPING_UNIT EHKU,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EHKU.ULD_ID ORDER BY EHKU_UNIT_NO ASC";
    /*WITH UNIT NO SEARCH*/ if(BDLY_SRC_lb_ExpenseList_val==12 && SearchFormData.BDLY_SRC_lb_serachopt==150){
      var BDLY_SRC_Merged_UnitNo=SearchFormData.BDLY_SRC_lb_unitno;
      var BDLY_SRC_Sep_Unit_Id=BDLY_SRC_Merged_UnitNo.split(' ');
      if(BDLY_SRC_Merged_UnitNo.search("HKUNIT")!=-1)
        BDLY_SRC_SelectQuery['12']['150'] = "SELECT EHKP.EHKP_ID,EHKU.EHKU_UNIT_NO,EHKP.EHKP_AMOUNT,DATE_FORMAT(EHKP.EHKP_FOR_PERIOD,'%M-%Y'),DATE_FORMAT(EHKP.EHKP_PAID_DATE,'%d-%m-%Y') AS DATE,EHKP.EHKP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EHKP.EHKP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EHKP_TIMESTAMP FROM EXPENSE_HOUSEKEEPING_PAYMENT EHKP JOIN EXPENSE_HOUSEKEEPING_UNIT AS EHKU ON EHKP.EHKU_ID = EHKU.EHKU_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EHKP.ULD_ID AND EHKP.EHKP_PAID_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EHKU.EHKU_ID='"+BDLY_SRC_Sep_Unit_Id[0]+"' ORDER BY EHKP.EHKP_PAID_DATE ASC"; 
      else
        BDLY_SRC_SelectQuery['12']['150'] = "SELECT EHKP.EHKP_ID,U.UNIT_NO,EHKP.EHKP_AMOUNT,DATE_FORMAT(EHKP.EHKP_FOR_PERIOD,'%M-%Y'),DATE_FORMAT(EHKP.EHKP_PAID_DATE,'%d-%m-%Y') AS DATE,EHKP.EHKP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EHKP.EHKP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EHKP_TIMESTAMP FROM EXPENSE_HOUSEKEEPING_PAYMENT EHKP JOIN UNIT U ON EHKP.UNIT_ID = U.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EHKP.ULD_ID AND EHKP.EHKP_PAID_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND U.UNIT_ID='"+BDLY_SRC_Sep_Unit_Id[0]+"' ORDER BY EHKP.EHKP_PAID_DATE ASC"; 
    }
    /*********************************************************************All type amount search******************************************************************/
    if (SearchFormData.hasOwnProperty('BDLY_SRC_tb_fromtoamnt')) {
      if(BDLY_SRC_lb_ExpenseList_val==1)//ELECTRICITY
      {
        //INVOICE AMOUNT SEARCH OPTION ID-163
        BDLY_SRC_SelectQuery['1']['163'] = "SELECT EE_ID,EE_UNITNO,EE_INVOICE_TO,DATE_FORMAT(EE_INVOICE_DATE,'%d-%m-%Y'),DATE_FORMAT(EE_FROM_PERIOD,'%d-%m-%Y') AS EE_FROM_PERIOD,DATE_FORMAT(EE_TO_PERIOD,'%d-%m-%Y') AS EE_TO_PERIOD,EE_DEPOSIT,EE_DEPOSIT_REFUND,EE_INVOICE_AMOUNT,EE_COMMENTS,EE_USERSTAMP,DATE_FORMAT(CONVERT_TZ(EE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') FROM "+BDLY_SRC_electemp_name+" ORDER BY EE_INVOICE_AMOUNT,EE_UNITNO,EE_INVOICE_DATE ASC";
        //DEPOSIT AMOUNT SEARCH OPTION ID-160
        BDLY_SRC_SelectQuery['1']['160'] = "SELECT EE_ID,EE_UNITNO,EE_INVOICE_TO,DATE_FORMAT(EE_INVOICE_DATE,'%d-%m-%Y'),DATE_FORMAT(EE_FROM_PERIOD,'%d-%m-%Y') AS EE_FROM_PERIOD,DATE_FORMAT(EE_TO_PERIOD,'%d-%m-%Y') AS EE_TO_PERIOD,EE_DEPOSIT,EE_DEPOSIT_REFUND,EE_INVOICE_AMOUNT,EE_COMMENTS,EE_USERSTAMP,DATE_FORMAT(CONVERT_TZ(EE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') FROM "+BDLY_SRC_electemp_name+" ORDER BY EE_DEPOSIT,EE_UNITNO,EE_INVOICE_DATE ASC";
        //DEPOSIT REFUND AMOUNT SEARCH OPTION ID-161
        BDLY_SRC_SelectQuery['1']['161'] = "SELECT EE_ID,EE_UNITNO,EE_INVOICE_TO,DATE_FORMAT(EE_INVOICE_DATE,'%d-%m-%Y'),DATE_FORMAT(EE_FROM_PERIOD,'%d-%m-%Y') AS EE_FROM_PERIOD,DATE_FORMAT(EE_TO_PERIOD,'%d-%m-%Y') AS EE_TO_PERIOD,EE_DEPOSIT,EE_DEPOSIT_REFUND,EE_INVOICE_AMOUNT,EE_COMMENTS,EE_USERSTAMP,DATE_FORMAT(CONVERT_TZ(EE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') FROM "+BDLY_SRC_electemp_name+" ORDER BY EE_DEPOSIT_REFUND,EE_UNITNO,EE_INVOICE_DATE ASC";
      }
      /*STARHUB AMNT*/BDLY_SRC_SelectQuery['2']['181'] = "SELECT ESH.ESH_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(ESH.ESH_INVOICE_DATE,'%d-%m-%Y') AS STARHUBINVOICEDATE,DATE_FORMAT(ESH.ESH_FROM_PERIOD,'%d-%m-%Y') AS STARHUBFROMPERIOD,DATE_FORMAT(ESH.ESH_TO_PERIOD,'%d-%m-%Y') AS STARHUBTOPERIOD,ESH.ESH_AMOUNT,ESH.ESH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ESH.ESH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS STARHUB_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_STARHUB EDSH ON U.UNIT_ID=EDSH.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID JOIN EXPENSE_STARHUB ESH ON ESH.EDSH_ID=EDSH.EDSH_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=ESH.ULD_ID AND ESH_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND ESH.ESH_AMOUNT BETWEEN "+SearchFormData.BDLY_SRC_tb_fromtoamnt[0]+" AND "+SearchFormData.BDLY_SRC_tb_fromtoamnt[1]+" ORDER BY ESH_AMOUNT,U.UNIT_NO,ESH_INVOICE_DATE ASC ";
      /*UNIT EXPENSE AMNT*/BDLY_SRC_SelectQuery['3']['187'] = "SELECT EU.EU_ID,U.UNIT_NO,EC.ECN_DATA,CONCAT(C.CUSTOMER_FIRST_NAME,' ',C.CUSTOMER_LAST_NAME) AS NAME,DATE_FORMAT(EU.EU_INVOICE_DATE,'%d-%m-%Y'),EU.EU_INVOICE_ITEMS,EU.EU_INVOICE_FROM,EU.EU_AMOUNT,EU.EU_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EU.EU_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EU_TIMESTAMP  FROM EXPENSE_UNIT AS EU JOIN VW_ACTIVE_UNIT U ON U.UNIT_ID=EU.UNIT_ID LEFT JOIN CUSTOMER C ON C.CUSTOMER_ID=EU.CUSTOMER_ID JOIN EXPENSE_CONFIGURATION EC ON EU.ECN_ID=EC.ECN_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EU.ULD_ID AND  EU.EU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EU.EU_AMOUNT BETWEEN "+SearchFormData.BDLY_SRC_tb_fromtoamnt[0]+" AND "+SearchFormData.BDLY_SRC_tb_fromtoamnt[1]+" ORDER BY EU.EU_AMOUNT,U.UNIT_NO,EU.EU_INVOICE_DATE ASC";
      /*FACILITY USE DEPOSIT AMNT*/BDLY_SRC_SelectQuery['4']['168'] = "SELECT EFU.EFU_ID,U.UNIT_NO,DATE_FORMAT(EFU.EFU_INVOICE_DATE,'%d-%m-%Y') AS FACILITYINVOICEDATE,EFU.EFU_DEPOSIT,EFU.EFU_AMOUNT,EFU.EFU_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EFU.EFU_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS FACILITY_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_FACILITY_USE EFU ON U.UNIT_ID=EFU.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EFU.ULD_ID AND EFU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EFU.EFU_DEPOSIT  BETWEEN  "+SearchFormData.BDLY_SRC_tb_fromtoamnt[0]+" AND "+SearchFormData.BDLY_SRC_tb_fromtoamnt[1]+" ORDER BY EFU.EFU_DEPOSIT,U.UNIT_NO,EFU.EFU_INVOICE_DATE ASC";
      /*FACILITY USE INVOICE AMNT*/BDLY_SRC_SelectQuery['4']['169'] = "SELECT EFU.EFU_ID,U.UNIT_NO,DATE_FORMAT(EFU.EFU_INVOICE_DATE,'%d-%m-%Y') AS FACILITYINVOICEDATE,EFU.EFU_DEPOSIT,EFU.EFU_AMOUNT,EFU.EFU_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EFU.EFU_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS FACILITY_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_FACILITY_USE EFU ON U.UNIT_ID=EFU.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EFU.ULD_ID AND EFU_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EFU.EFU_AMOUNT  BETWEEN  "+SearchFormData.BDLY_SRC_tb_fromtoamnt[0]+" AND "+SearchFormData.BDLY_SRC_tb_fromtoamnt[1]+" ORDER BY EFU.EFU_AMOUNT,U.UNIT_NO,EFU.EFU_INVOICE_DATE ASC";
      /*DIGITAL VOICE*/BDLY_SRC_SelectQuery['5']['152'] = "SELECT EDV.EDV_ID,U.UNIT_NO,EC.ECN_DATA,EDDV.EDDV_DIGITAL_VOICE_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO,DATE_FORMAT(EDV.EDV_INVOICE_DATE,'%d-%m-%Y') AS DIGI_INV_DATE,DATE_FORMAT(EDV.EDV_FROM_PERIOD,'%d-%m-%Y') AS DIGI_FROM_PERIOD,DATE_FORMAT(EDV.EDV_TO_PERIOD,'%d-%m-%Y') AS DIGI_TO_PERIOD,EDV.EDV_AMOUNT,EDV.EDV_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDV.EDV_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS DIGITAL_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_DIGITAL_VOICE EDDV ON U.UNIT_ID=EDDV.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDDV.ECN_ID JOIN EXPENSE_DIGITAL_VOICE EDV ON EDV.EDDV_ID=EDDV.EDDV_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EDV.ULD_ID AND EDV.EDV_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EDV.EDV_AMOUNT  BETWEEN  "+SearchFormData.BDLY_SRC_tb_fromtoamnt[0]+" AND "+SearchFormData.BDLY_SRC_tb_fromtoamnt[1]+" ORDER BY EDV.EDV_AMOUNT,U.UNIT_NO,EDV.EDV_INVOICE_DATE ASC";
      /*PURCHASE CARD AMNT*/BDLY_SRC_SelectQuery['6']['176'] = "SELECT EPC.EPNC_ID,U.UNIT_NO,EPC.EPNC_NUMBER,DATE_FORMAT(EPC.EPNC_INVOICE_DATE,'%d-%m-%Y') AS PURCAHSESDATE,EPC.EPNC_AMOUNT,EPC.EPNC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EPC.EPNC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS PURCHASE_TIMESTAMP FROM EXPENSE_PURCHASE_NEW_CARD EPC JOIN VW_ACTIVE_UNIT U ON EPC.UNIT_ID=U.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EPC.ULD_ID AND  EPC.EPNC_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EPC.EPNC_AMOUNT BETWEEN "+SearchFormData.BDLY_SRC_tb_fromtoamnt[0]+" AND "+SearchFormData.BDLY_SRC_tb_fromtoamnt[1]+" ORDER BY EPC.EPNC_AMOUNT,U.UNIT_NO,EPC.EPNC_INVOICE_DATE ASC";
      /*MOVING IN OUT AMNT*/BDLY_SRC_SelectQuery['7']['172'] = "SELECT M.EMIO_ID,U.UNIT_NO,DATE_FORMAT(M.EMIO_INVOICE_DATE,'%d-%m-%Y') AS COMMENTSDATE,M.EMIO_AMOUNT,M.EMIO_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(M.EMIO_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS MOVING_TIMESTAMP FROM EXPENSE_MOVING_IN_AND_OUT M JOIN VW_ACTIVE_UNIT U ON U.UNIT_ID=M.UNIT_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=M.ULD_ID AND  M.EMIO_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"'AND M.EMIO_AMOUNT  BETWEEN  "+SearchFormData.BDLY_SRC_tb_fromtoamnt[0]+" AND "+SearchFormData.BDLY_SRC_tb_fromtoamnt[1]+" ORDER BY M.EMIO_AMOUNT,U.UNIT_NO,M.EMIO_INVOICE_DATE ASC";
      /*CAR PARK AMNT*/BDLY_SRC_SelectQuery['8']['132'] = "SELECT ECP.ECP_PARK_ID,U.UNIT_NO,EDCP.EDCP_CAR_NO,DATE_FORMAT(ECP.ECP_INVOICE_DATE,'%d-%m-%Y') AS CARPARKINVOICEDATE,DATE_FORMAT(ECP.ECP_FROM_PERIOD,'%d-%m-%Y') AS CARPARKFROMPERIOD,DATE_FORMAT(ECP.ECP_TO_PERIOD,'%d-%m-%Y') AS CARPARKTOPERIOD,ECP.ECP_AMOUNT,ECP.ECP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ECP.ECP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS CARPARK_TIMESTAMP FROM VW_ACTIVE_UNIT U JOIN EXPENSE_DETAIL_CARPARK EDCP ON U.UNIT_ID=EDCP.UNIT_ID JOIN EXPENSE_CARPARK ECP ON EDCP.EDCP_ID=ECP.EDCP_ID,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=ECP.ULD_ID AND ECP.ECP_INVOICE_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND ECP.ECP_AMOUNT  BETWEEN  "+SearchFormData.BDLY_SRC_tb_fromtoamnt[0]+" AND "+SearchFormData.BDLY_SRC_tb_fromtoamnt[1]+" ORDER BY ECP.ECP_AMOUNT,U.UNIT_NO,ECP.ECP_INVOICE_DATE ASC";
      /*PETTY CASH CASH IN AMT*/BDLY_SRC_SelectQuery['10']['137'] = "SELECT EPC.EPC_ID,DATE_FORMAT(EPC.EPC_DATE,'%d-%m-%Y') AS DATE,EPC.EPC_CASH_IN,EPC.EPC_CASH_OUT,EPC.EPC_BALANCE,EPC.EPC_INVOICE_ITEMS,EPC.EPC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EPC.EPC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM EXPENSE_PETTY_CASH EPC,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EPC.ULD_ID AND  EPC.EPC_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EPC_CASH_IN  BETWEEN  "+SearchFormData.BDLY_SRC_tb_fromtoamnt[0]+" AND "+SearchFormData.BDLY_SRC_tb_fromtoamnt[1]+" ORDER BY EPC_CASH_IN,EPC.EPC_DATE ASC";
      /*PETTY CASH CASH OUT AMT*/BDLY_SRC_SelectQuery['10']['138'] = "SELECT EPC.EPC_ID,DATE_FORMAT(EPC.EPC_DATE,'%d-%m-%Y') AS DATE,EPC.EPC_CASH_IN,EPC.EPC_CASH_OUT,EPC.EPC_BALANCE,EPC.EPC_INVOICE_ITEMS,EPC.EPC_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EPC.EPC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM EXPENSE_PETTY_CASH EPC ,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=EPC.ULD_ID AND  EPC.EPC_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EPC_CASH_OUT  BETWEEN  "+SearchFormData.BDLY_SRC_tb_fromtoamnt[0]+" AND "+SearchFormData.BDLY_SRC_tb_fromtoamnt[1]+" ORDER BY EPC_CASH_OUT,EPC.EPC_DATE ASC";
      /*HOUSE KEEPING PAYMENT AMNT*/BDLY_SRC_SelectQuery['12']['148'] ="SELECT EHKP.EHKP_ID,UNIT_NO,EHKP.EHKP_AMOUNT,DATE_FORMAT(EHKP.EHKP_FOR_PERIOD,'%M-%Y'),DATE_FORMAT(EHKP.EHKP_PAID_DATE,'%d-%m-%Y') AS DATE,EHKP.EHKP_COMMENTS,EHKP.EHKP_USERSTAMP,DATE_FORMAT(CONVERT_TZ(EHKP.EHKP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EHKP_TIMESTAMP FROM "+BDLY_SRC_tmptbl_hkpsrch+" EHKP WHERE  EHKP.EHKP_PAID_DATE BETWEEN '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_startdate)+"' AND '"+eilib.SqlDateFormat(SearchFormData.BDLY_SRC_enddate)+"' AND EHKP.EHKP_AMOUNT BETWEEN  "+SearchFormData.BDLY_SRC_tb_fromtoamnt[0]+" AND "+SearchFormData.BDLY_SRC_tb_fromtoamnt[1]+" ORDER BY EHKP.EHKP_AMOUNT,UNIT_NO,EHKP.EHKP_PAID_DATE ASC";
    }  
    var execute_statement = creatStatement.executeQuery(BDLY_SRC_SelectQuery[BDLY_SRC_lb_ExpenseList_val][SearchFormData.BDLY_SRC_lb_serachopt]);
    while(execute_statement.next()){      
      var rowarray =[],Totalcolumns=BDLY_SRC_GridHeaders.length;
      for(var x=1; x<=Totalcolumns; x++){
        if(SearchFormData.BDLY_SRC_lb_serachopt==142&&x==2){rowarray.push(parseFloat(execute_statement.getString(x)).toFixed(2))}
        else
        {
          rowarray.push(execute_statement.getString(x));
        }
      }
      BDLY_SRC_Expdataobject.push(rowarray);
    }
    if((BDLY_SRC_lb_ExpenseList_val==1)||(SearchFormData.BDLY_SRC_lb_serachopt==142))
    {
     eilib.DropTempTable(conn,BDLY_SRC_electemp_name);    
    }
    var unit_start_end_date_query = creatStatement.executeQuery("SELECT U.UNIT_NO,UD.UD_START_DATE,UD.UD_END_DATE FROM UNIT_DETAILS UD JOIN UNIT U ON U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO ASC");
    var unit_start_end_date_obj={};
    while(unit_start_end_date_query.next())
    {
      unit_start_end_date_obj['UNITNO'+unit_start_end_date_query.getString('U.UNIT_NO')]=[unit_start_end_date_query.getString('UD_START_DATE'),unit_start_end_date_query.getString('UD_END_DATE')]
    }
    BDLY_SRC_drophkpaymentsptemptable(conn,BDLY_SRC_tmptbl_hkpsrch);
    var BDLY_SRC_arr_unitcmts=[];
    if(BDLY_SRC_lb_ExpenseList_val==3)
      BDLY_SRC_arr_unitcmts=eilib.BDLY_getinvoicefrom(conn); 
    creatStatement.close(),conn.close();
    return [BDLY_SRC_Expdataobject,unit_start_end_date_obj,BDLY_SRC_TableWidth,BDLY_SRC_arr_unitcmts];
  }
  /*------------------------------------------EILIB FUNCTION TO GET UNIT SDATE,EDATE AND INVDATE -----------------------------------------------------*/
  function BDLY_SRC_getUnitDate(BDLY_SRC_unitno){
    var BDLY_SRC_conn=eilib.db_GetConnection();
    var BDLY_SRC_unitdate=eilib.GetUnitSdEdInvdate(BDLY_SRC_conn,BDLY_SRC_unitno);
    BDLY_SRC_conn.close();
    return BDLY_SRC_unitdate;
  }
  /*------------------------------------------WILL CHK FOR EXISTING ACCESS CARD OR UNIT NO -----------------------------------------------------*/
  function BDLY_SRC_check_access_cardOrUnitno(BDLY_SCR_DT_access_cardrunit,BDLY_SRC_selectedexptype){
    var BDLY_SRC_CHKcardorunitflag="";
    var conn=eilib.db_GetConnection();
    if(BDLY_SRC_selectedexptype==6)
    {
      BDLY_SRC_CHKcardorunitflag=eilib.Check_ExistsCard(conn,BDLY_SCR_DT_access_cardrunit);
    }
    else
    {
      if ((eilib.CheckHKPUnitnoExists(conn,BDLY_SCR_DT_access_cardrunit)==true) || (eilib.CheckUnitnoExists(conn,BDLY_SCR_DT_access_cardrunit)==true))
      {
        BDLY_SRC_CHKcardorunitflag=true;
      }
      else
      {
        BDLY_SRC_CHKcardorunitflag=false;
      }
    }
    return BDLY_SRC_CHKcardorunitflag;
  }
  /*------------------------------------------WILL UPDATE DATA TABLE ROW IN DB -------------------------------------------------*/
  function BDLY_SRC_UpdaterowData(BDLY_new_values,BDLY_old_values,expense,selectedSearchopt){
    var BDLY_SRC_commenttype={1:9,2:8,3:8,4:5,5:9,6:5,7:4,8:7,9:4,10:6,11:4,12:5};
    if(selectedSearchopt!=198)
    {
      var BDLY_SRC_commentvalue=BDLY_new_values[BDLY_SRC_commenttype[expense]];
      if(BDLY_SRC_commentvalue=="")//COMMENTS
      {  BDLY_SRC_commentvalue=null;}else{
        BDLY_SRC_commentvalue='"'+eilib.ConvertSpclCharString(BDLY_SRC_commentvalue)+'"';}
    }
    var conn=eilib.db_GetConnection();
    var  creatStatement = conn.createStatement();   
    conn.setAutoCommit(false);
    var updatequery='';
    var BDLY_SRC_updateflag=0;
    switch (expense)
    {
      case '1': 
        var EELC_AMOUNT="",EELC_AMTID=0;        
        if(BDLY_new_values[6]!=""){EELC_AMOUNT=BDLY_new_values[6];EELC_AMTID=135;}else if(BDLY_new_values[7]!=""){EELC_AMOUNT=BDLY_new_values[7];EELC_AMTID=134;} else {EELC_AMOUNT=BDLY_new_values[8];EELC_AMTID=133;}
        updatequery ="CALL SP_BIZDLY_ELECTRICITY_UPDATE('"+BDLY_new_values[0]+"','"+eilib.SqlDateFormat(BDLY_new_values[3])+"','"+eilib.SqlDateFormat(BDLY_new_values[4])+"','"+eilib.SqlDateFormat(BDLY_new_values[5])+"',"+EELC_AMTID+",'"+EELC_AMOUNT+"',"+BDLY_SRC_commentvalue+",'"+UserStamp+"',@UPDATE_FLAG)";
        break;        
      case '2': { 
        updatequery= "CALL SP_BIZDLY_STARHUB_UPDATE('"+BDLY_new_values[0]+"','"+eilib.SqlDateFormat(BDLY_new_values[4])+"','"+eilib.SqlDateFormat(BDLY_new_values[5])+"','"+eilib.SqlDateFormat(BDLY_new_values[6])+"','"+BDLY_new_values[7]+"',"+BDLY_SRC_commentvalue+",'"+UserStamp+"',@UPDATE_FLAG)";
        break;
      }
      case '3':{
        if(BDLY_new_values[3]=='')
          BDLY_new_values[3]=null
          updatequery = "UPDATE EXPENSE_UNIT SET ECN_ID="+BDLY_new_values[2]+",CUSTOMER_ID="+BDLY_new_values[3]+",EU_INVOICE_DATE='"+eilib.SqlDateFormat(BDLY_new_values[4])+"',EU_AMOUNT='"+BDLY_new_values[7]+"',EU_INVOICE_ITEMS='"+eilib.ConvertSpclCharString(BDLY_new_values[5])+"',EU_INVOICE_FROM='"+eilib.ConvertSpclCharString(BDLY_new_values[6])+"',EU_COMMENTS="+BDLY_SRC_commentvalue+" ,ULD_ID=((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"')) WHERE EU_ID='"+BDLY_new_values[0]+"'";
        break;
      }
      case '4': { 
        var EFU_DEPOSIT= BDLY_new_values[3]==""?null:BDLY_new_values[3];
        var EFU_AMOUNT= BDLY_new_values[4]==""?null:BDLY_new_values[4];
        updatequery = "UPDATE EXPENSE_FACILITY_USE SET EFU_INVOICE_DATE='"+eilib.SqlDateFormat(BDLY_new_values[2])+"',EFU_DEPOSIT="+EFU_DEPOSIT+",EFU_AMOUNT="+EFU_AMOUNT+",EFU_COMMENTS="+BDLY_SRC_commentvalue+",ULD_ID=((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"')) WHERE EFU_ID='"+BDLY_new_values[0]+"'";
        break;
      }
      case '5': 
        updatequery = "UPDATE EXPENSE_DIGITAL_VOICE SET EDV_INVOICE_DATE='"+eilib.SqlDateFormat(BDLY_new_values[5])+"',EDV_FROM_PERIOD='"+eilib.SqlDateFormat(BDLY_new_values[6])+"',EDV_TO_PERIOD='"+eilib.SqlDateFormat(BDLY_new_values[7])+"',EDV_AMOUNT='"+BDLY_new_values[8]+"',EDV_COMMENTS="+BDLY_SRC_commentvalue+",ULD_ID=((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"')) WHERE EDV_ID='"+BDLY_new_values[0]+"'";
        break;
      case '6':  
        updatequery= "CALL SP_BIZDLY_PURCHASE_NEW_CARD_UPDATE("+BDLY_new_values[0]+",'"+BDLY_new_values[2]+"','"+eilib.SqlDateFormat(BDLY_new_values[3])+"','"+BDLY_new_values[4]+"',"+BDLY_SRC_commentvalue+",'"+UserStamp+"',@UPDATE_FLAG)";
        break;
      case '7':
        updatequery = "UPDATE EXPENSE_MOVING_IN_AND_OUT SET ULD_ID=((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"')),EMIO_INVOICE_DATE='"+eilib.SqlDateFormat(BDLY_new_values[2])+"',EMIO_AMOUNT='"+BDLY_new_values[3]+"',EMIO_COMMENTS="+BDLY_SRC_commentvalue+" WHERE EMIO_ID='"+BDLY_new_values[0]+"'";
        break;
      case '8': 
        updatequery= "UPDATE EXPENSE_CARPARK SET ECP_INVOICE_DATE='"+eilib.SqlDateFormat(BDLY_new_values[3])+"',ECP_FROM_PERIOD='"+eilib.SqlDateFormat(BDLY_new_values[4])+"',ECP_TO_PERIOD='"+eilib.SqlDateFormat(BDLY_new_values[5])+"',ECP_AMOUNT='"+BDLY_new_values[6]+"',ECP_COMMENTS="+BDLY_SRC_commentvalue+",ULD_ID=((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"')) WHERE ECP_PARK_ID='"+BDLY_new_values[0]+"'";
        break;
      case '9': 
        updatequery= "UPDATE EXPENSE_AIRCON_SERVICE SET ULD_ID=((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"')),EAS_DATE='"+eilib.SqlDateFormat(BDLY_new_values[3])+"',EAS_COMMENTS="+BDLY_SRC_commentvalue+" WHERE EAS_ID='"+BDLY_new_values[0]+"'";
        break;
      case '10': 
        updatequery = "UPDATE EXPENSE_PETTY_CASH SET EPC_INVOICE_ITEMS='"+eilib.ConvertSpclCharString(BDLY_new_values[5])+"',EPC_COMMENTS="+BDLY_SRC_commentvalue+",ULD_ID=((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"')) WHERE EPC_ID='"+BDLY_new_values[0]+"'";
        break;
      case '11': 
        updatequery = "UPDATE EXPENSE_HOUSEKEEPING SET ULD_ID=((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"')),EHK_WORK_DATE='"+eilib.SqlDateFormat(BDLY_new_values[2])+"',EHK_DURATION='"+BDLY_new_values[3]+"',EHK_DESCRIPTION="+BDLY_SRC_commentvalue+" WHERE EHK_ID='"+BDLY_new_values[0]+"'";
        break;
      case '12':{
        if(selectedSearchopt==198)
        {
          updatequery = "UPDATE EXPENSE_HOUSEKEEPING_UNIT SET EHKU_UNIT_NO="+BDLY_new_values[1]+" ,ULD_ID=((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"')) WHERE EHKU_ID='"+BDLY_new_values[0]+"'";
        }  
        else
        {
          var BIZDLY_hkpforperiod=eilib.GetForperiodDateFormat(BDLY_new_values[3],BDLY_new_values[3]);
          var BIZDLY_unitno=BDLY_new_values[1].split(" ")[0];
          updatequery = "CALL SP_BIZDLY_HOUSEKEEPING_PAYMENT_UPDATE("+BDLY_new_values[0]+","+BIZDLY_unitno+",'"+BIZDLY_hkpforperiod.frmdate+"','"+eilib.SqlDateFormat(BDLY_new_values[4])+"','"+BDLY_new_values[2]+"',"+BDLY_SRC_commentvalue+",'"+UserStamp+"',@UPDATE_FLAG)"
        }
        break;
      }
    }
    creatStatement.execute(updatequery);
    creatStatement.close();
    conn.commit();
    BDLY_SRC_updateflag=1;
    if(expense=='6'||(expense=='12'&&selectedSearchopt!=198) || expense=='1' || expense=='2')
    {
      BDLY_SRC_updateflag=0;
      var updateflag_query="SELECT @UPDATE_FLAG";
      var updateflag_stmt=conn.createStatement();
      var updateflag_rs=updateflag_stmt.executeQuery(updateflag_query);
      while(updateflag_rs.next())
      {
        var updateflag=updateflag_rs.getString(1);
      }
      updateflag_rs.close();
      updateflag_stmt.close();
      BDLY_SRC_updateflag=updateflag;
    }
    conn.close();
    return BDLY_SRC_updateflag;
  }
  /*------------------------------------------WILL DELETE  DATA TABLE VALUE ROW BY ROW IN DB -------------------------------------------------*/
  function  BDLY_SRC_DeleteRowData(BDLY_Delete_key,selectedexpense){
    var  conn=eilib.db_GetConnection();
    var  creatStatement = conn.createStatement();
    var delquery='';
    var BDLY_SRC_tableid={"1":"52","2":"53","3":"51","4":"55","5":"54","6":"59","7":"57","8":"56","9":"58","10":"60","11":"61","12":"62"};
    if(selectedexpense==6)
    {
      delquery="CALL SP_BIZDLY_PURCHASE_NEW_CARD_DELETE("+BDLY_SRC_tableid[selectedexpense]+","+BDLY_Delete_key+",'"+UserStamp+"',@DELETION_FLAG)"
      creatStatement.execute(delquery); 
      var BDLY_SRC_getresult= creatStatement.executeQuery("SELECT @DELETION_FLAG");
      while(BDLY_SRC_getresult.next()){
        var BDLY_SRC_chkdelflag=BDLY_SRC_getresult.getString("@DELETION_FLAG");
      }
      creatStatement.close(); 
    }
    else
    {
      BDLY_SRC_chkdelflag=eilib.DeleteRecord(conn,BDLY_SRC_tableid[selectedexpense],BDLY_Delete_key);
    }
    conn.close();
    return BDLY_SRC_chkdelflag;
  }
}catch(err)
{
}
/* 1-> ELECTRICITY      2-> STARHUB
3-> UNIT EXPENSE     4->FACILITY USE
5-> DIGITAL VOICE    6->PURCHASE NEW ACCESS CARD
7-> MOVING IN OUT     8->CARPARK
9-> AIRCON SERVICES   10->PETTY CASH
11-> HOUSEKEEPING     12->HOUSEKEEPING PAYMENT
*/

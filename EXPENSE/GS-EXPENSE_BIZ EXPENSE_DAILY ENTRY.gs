/*<!--//*******************************************FILE DESCRIPTION*********************************************
//*************************************************BIZ EXPENSE DAILY ENTRY*********************************************
//DONE BY:PUNI
<!---  VER 1.9-SD:09/10/2014 ED:09/10/2014,TRACKER NO:413,Corrected preloader n msgbox position
//DONE BY:SARADAMBAL M
<!---  VER 1.8-SD:15/09/2014 ED:15/09/2014,TRACKER NO:413,implemented script for preloader,msgbox,implemented script for style to submit button instead of div -style
<!---  VER 1.7-SD:01/09/2014 ED:01/09/2014,TRACKER NO:413,updated new links,n script for autogrow
<!---  VER 1.6-SD:05/08/2014 ED:05/08/2014,TRACKER NO:413,implemented script for inv from and inv item by adding ^^ & pass in sp
<!---  VER 1.5-SD:27/07/2014 ED:27/07/2014,TRACKER NO:413,implemented script for starhub DP validation, autocomplete for unit category,cleared exp unit DP issue
<!---  VER 1.4-SD:11/07/2014 ED:12/07/2014,TRACKER NO:413,implemented sp to get inv,sdate & edate for dynamic dp validation using eilib,corrected some coding to remove multirow after selecting another type of expense,cleared starhub dp validation issue
<!---  VER 1.3-SD:17/06/2014 ED:17/06/2014,TRACKER NO:413,implemented script for commit and failure function ,implemented script for numbers only,removed extra class for elect amt
<!---  VER 1.2-SD:04/06/2014 ED:04/06/2014;TRACKER NO:413//cleared petty cash issue (bal) after saving,put blur and change func for amt validation
<!---  VER 1.1-SD:22/05/2014 ED:23/03/2014;TRACKER NO:413//cleared issue for comments saving with quotes,save btn validation,clear err msg while reset btn clicked
<!---  VER 1.0-SD:07/04/2014 ED:19/04/2014;TRACKER NO:413//corrected dp for starhub,add date class for all dp,implemented script for duration validation,showing the unitno in ddl after saving the houkeepingpayment,refresh the unitno after giving new hkunit no,changed sp name(starhub and unit),checked migration issue
<!---  VER 0.09-SD:04/04/2014 ED:05/04/2014;TRACKER NO:413//IMPLEMENTED DP FOR FOR PERIOD,IMPLEMENTED SCRIPT FOR CORRECTED DATE FOR INVOICE DATE,FROM DATE AND TO DATE(SYSDATE,UNIT SD AND ED +1 MONTH)
<!---  VER 0.08-SD:16/03/2014 ED:21/03/2014;TRACKER NO:413//UPDATE SP(RETURNING FLAG) FOR PURCHASE CARD,DIGITAL VOICE,PETTY CASH,HOUSEKEEPING PAYMENT,IMPLEMENTED ERRORMSG FOR NOT SAVING,ACCESS CARD(MINIMUM 4 DIGITS),IMPLEMENTED SCRIPT FOR  ELECTRICITY -HIDE THE SUBMIT AND RESET BTN,-SUBMIT BTN VALIDATION(PURCHASE CARD),INCLUDED ONE FUNCTION TO GET MAX-PRIMARYID(ELECTRICITY,STARHUB,FACILITYUSE,AIRCON,CARPARK,HOUSEKEEPING.MOVINGIN-OUT),IMPLEMENTED EILIB FOR GETTING ULD_ID AND REPLACED USERSTAMP INTO ULDID,removed eilib and implement script for uldidREUDCED CODING USING ARR CONCEPT
CLEARED ALIGNMENT ISSUE,IMPLEMENT EILIB FOR ALL COMMENTS,INVOICEITEM AND INVOICEFROM,CORRECTED QUERY FOR GETTING MAX RECORD VERSION OF DETAILS FOR ALL TYPE OF EXPENSE
IMPLEMENT RADIO BUTTONG FOR DUPLICATE HOUSEKEEPING NAME--AND ALSO DONE BTN VALIDATION FOR THIS TYPE,SHOWED ONE RECORD AFTER SAVING PART IN MULTIROW CREATION FOR UNIT,ELECTRICITY AND STARHUB,DONE AMT VALIDATION FOR ELECTRICITY AMT FOR DEPOSIT,REFUND AND INVOICE AMT.
REMOVED INSERT QUERY AND IMPLEMENTED SP FOR MULTIROW CREATION FOR UNIT,STARHUB AND ELECTRICITY ,RELOAD DATA AFTER SUBMISSION OF RECORDS,CORRECTED AMT LENGTH VALIDATION FOR ALL TYPE OF EXPENSE,CLEARED ISSUE FOR SHOWING SERVER ERROR OCCURED FOR HOUSE KEEPING PAYMENT AND ALSO CLOSE RS AND STMT FOR ALL FUNCTION,CLEARED ISSUE IN DIGITAL SP AND IMPLEMENTED SP
<!---  VER 0.07-SD:31/01/2014 ED:31/01/2014;TRACKER NO: 413//GET THE ERROR MESSAGE FROM EILIB FUNCTION .
<!---  VER 0.06-SD:22/01/2014 ED:22/01/2014;TRACKER NO: 413//REDUCE THE QUERIES ,CODING AND CHECK ALL POSSIBLE VALIDATION .
<!---  VER 0.05-SD:18/01/2014 ED:21/01/2014;TRACKER NO: 413//REDUCE THE QUERIES ,CODING AND CHECK ALL POSSIBLE VALIDATION .
<!---  VER 0.04-SD:01/01/2014 ED:02/01/2014;TRACKER NO: 413//CHANGED THE HEADER TAG ,EILIB CONNECTION, APPLY THE SYS DATE CONDITION IN ALL THE FORMS AND APPLY SYS DATE CONDITION IN PETTY CASH ALSO.
<!---  VER 0.03-SD:29/11/2013 ED:29/10/2013;TRACKER NO: 413//PUT VERSION COMMENTE AND CHANGE THE LINK,UPDATE EILIB FUNCTION FOR UNIT NO CHECKING.
<!---  VER 0.02-SD:23/11/2013 ED:23/10/2013;TRACKER NO: 413//PUT ERROR MESSAGE WHEN EMPTY TABLE IS PRESENT,PUT RETURN MESSAGE FOR  EXCEPTION HANDLING. 
<!---  VER 0.01 - INITIAL VERSION-SD:04/10/2013 ED:12/10/2013;TRACKER NO: 413
*********************************************************************************************************
*/
try
{
  //FUNCTION TO LOAD ALL INITIAL VALUE'S
  function BDLY_INPUT_get_initialvalue()
  {
    var BDLY_INPUT_conn = eilib.db_GetConnection(); 
    var  BDLY_INPUT_expense_stmt=BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_unittable=[];
    var BDLY_INPUT_pettycash=[];
    var BDLY_INPUT_customer=[];
    var BDLY_INPUT_customerentrydetails=[];
    var BDLY_INPUT_detailairconservice=[];
    var BDLY_INPUT_detailcarpark=[];
    var BDLY_INPUT_detaildigitalvoice=[];
    var BDLY_INPUT_detailstarhub=[];
    var BDLY_INPUT_detailelecticity=[];
    var BDLY_INPUT_housekeepingunit=[];
    var BDLY_INPUT_expanse_array=[];
    var BDLY_INPUT_errorarray=[];
    var BDLY_INPUT_select_expense_type="SELECT ECN_ID,ECN_DATA FROM EXPENSE_CONFIGURATION WHERE CGN_ID IN (41,18,20,27,77,83)";
    var BDLY_INPUT_expanse_rs=BDLY_INPUT_expense_stmt.executeQuery(BDLY_INPUT_select_expense_type);    
    while(BDLY_INPUT_expanse_rs.next())
    {
      var BDLY_INPUT_expanse_id=BDLY_INPUT_expanse_rs.getString('ECN_ID');
      var BDLY_INPUT_expanse_date=BDLY_INPUT_expanse_rs.getString('ECN_DATA');
      var BDLY_INPUT_expanse_val={"BDLY_INPUT_expanse_id":BDLY_INPUT_expanse_id,"BDLY_INPUT_expanse_date":BDLY_INPUT_expanse_date};
      BDLY_INPUT_expanse_array.push(BDLY_INPUT_expanse_val);
    }
    BDLY_INPUT_expanse_rs.close();BDLY_INPUT_expense_stmt.close();
    var  BDLY_INPUT_expense_stmt=BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_unittablequery="SELECT UNIT_ID FROM UNIT ";
    var BDLY_INPUT_unittable_rs=BDLY_INPUT_expense_stmt.executeQuery(BDLY_INPUT_unittablequery);
    while(BDLY_INPUT_unittable_rs.next())
    {
      var BDLY_INPUT_unittabledata=BDLY_INPUT_unittable_rs.getString('UNIT_ID');
      BDLY_INPUT_unittable.push(BDLY_INPUT_unittabledata);
    }
    BDLY_INPUT_unittable_rs.close();BDLY_INPUT_expense_stmt.close();
    //CHECK CUSTOMER TABLE//
    var BDLY_INPUT_customerquery="SELECT CUSTOMER_ID FROM CUSTOMER";
    var  BDLY_INPUT_expense_stmt=BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_customer_rs=BDLY_INPUT_expense_stmt.executeQuery(BDLY_INPUT_customerquery);
    while(BDLY_INPUT_customer_rs.next())
    {
      var BDLY_INPUT_customerdata=BDLY_INPUT_customer_rs.getString('CUSTOMER_ID');
      BDLY_INPUT_customer.push(BDLY_INPUT_customerdata);
    }
    BDLY_INPUT_customer_rs.close();BDLY_INPUT_expense_stmt.close();
    //CHECK CUSTOMER_ENTRY_DETAILS TABLE//
    var BDLY_INPUT_customerentrydetailsquery="SELECT CED_ID FROM CUSTOMER_ENTRY_DETAILS";
    var  BDLY_INPUT_expense_stmt=BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_customerentrydetails_rs=BDLY_INPUT_expense_stmt.executeQuery(BDLY_INPUT_customerentrydetailsquery);
    while(BDLY_INPUT_customerentrydetails_rs.next())
    {
      var BDLY_INPUT_customerentrydetailsdata=BDLY_INPUT_customerentrydetails_rs.getString('CED_ID');
      BDLY_INPUT_customerentrydetails.push(BDLY_INPUT_customerentrydetailsdata);
    }
    BDLY_INPUT_customerentrydetails_rs.close();BDLY_INPUT_expense_stmt.close();
    //CHECK EXPENSE_DETAIL_AIRCON_SERVICE TABLE//
    var BDLY_INPUT_detailairconservicequery="SELECT EDAS_ID FROM EXPENSE_DETAIL_AIRCON_SERVICE";
    var  BDLY_INPUT_expense_stmt=BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_detailairconservice_rs=BDLY_INPUT_expense_stmt.executeQuery(BDLY_INPUT_detailairconservicequery);
    while(BDLY_INPUT_detailairconservice_rs.next())
    {
      var BDLY_INPUT_detailairconservicedata=BDLY_INPUT_detailairconservice_rs.getString('EDAS_ID');
      BDLY_INPUT_detailairconservice.push(BDLY_INPUT_detailairconservicedata);
    }
    BDLY_INPUT_detailairconservice_rs.close();BDLY_INPUT_expense_stmt.close();
    //CHECK EXPENSE_DETAIL_CARPARK TABLE//
    var BDLY_INPUT_detailcarparkquery="SELECT EDCP_ID FROM EXPENSE_DETAIL_CARPARK";
    var  BDLY_INPUT_expense_stmt=BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_detailcarpark_rs=BDLY_INPUT_expense_stmt.executeQuery(BDLY_INPUT_detailcarparkquery);
    while(BDLY_INPUT_detailcarpark_rs.next())
    {
      var BDLY_INPUT_detailcarparkdata=BDLY_INPUT_detailcarpark_rs.getString('EDCP_ID');
      BDLY_INPUT_detailcarpark.push(BDLY_INPUT_detailcarparkdata);
    }
    BDLY_INPUT_detailcarpark_rs.close();BDLY_INPUT_expense_stmt.close();
    //CHECK EXPENSE_DETAIL_DIGITAL_VOICE TABLE//
    var BDLY_INPUT_detaildigitalvoicequery="SELECT EDDV_ID FROM EXPENSE_DETAIL_DIGITAL_VOICE";
    var  BDLY_INPUT_expense_stmt=BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_detaildigitalvoice_rs=BDLY_INPUT_expense_stmt.executeQuery(BDLY_INPUT_detaildigitalvoicequery);
    while(BDLY_INPUT_detaildigitalvoice_rs.next())
    {
      var BDLY_INPUT_detaildigitalvoicedata=BDLY_INPUT_detaildigitalvoice_rs.getString('EDDV_ID');
      BDLY_INPUT_detaildigitalvoice.push(BDLY_INPUT_detaildigitalvoicedata);
    }
    BDLY_INPUT_detaildigitalvoice_rs.close();BDLY_INPUT_expense_stmt.close();
    //CHECK EXPENSE_DETAIL_STARHUB TABLE//
    var BDLY_INPUT_detailstarhubquery="SELECT EDSH_ID FROM EXPENSE_DETAIL_STARHUB";
    var  BDLY_INPUT_expense_stmt=BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_detailstarhub_rs=BDLY_INPUT_expense_stmt.executeQuery(BDLY_INPUT_detailstarhubquery);
    while(BDLY_INPUT_detailstarhub_rs.next())
    {
      var BDLY_INPUT_detailstarhubdata=BDLY_INPUT_detailstarhub_rs.getString('EDSH_ID');
      BDLY_INPUT_detailstarhub.push(BDLY_INPUT_detailstarhubdata);
    }
    BDLY_INPUT_detailstarhub_rs.close();BDLY_INPUT_expense_stmt.close();
    //CHECK EXPENSE_DETAIL_ELECTRICITY TABLE//
    var BDLY_INPUT_detailelecticityquery="SELECT EDE_ID FROM EXPENSE_DETAIL_ELECTRICITY";
    var  BDLY_INPUT_expense_stmt=BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_detailelecticity_rs=BDLY_INPUT_expense_stmt.executeQuery(BDLY_INPUT_detailelecticityquery);
    while(BDLY_INPUT_detailelecticity_rs.next())
    {
      var BDLY_INPUT_detailelecticitydata=BDLY_INPUT_detailelecticity_rs.getString('EDE_ID');
      BDLY_INPUT_detailelecticity.push(BDLY_INPUT_detailelecticitydata);
    }
    BDLY_INPUT_detailelecticity_rs.close();BDLY_INPUT_expense_stmt.close();
    //CHECK EXPENSE_DETAIL_STARHUB TABLE//
    var BDLY_INPUT_empdetailsarry=[];
    var BDLY_INPUT_empdetails="SELECT EMP_ID FROM EMPLOYEE_DETAILS";
    var  BDLY_INPUT_expense_stmt=BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_empdetails_rs=BDLY_INPUT_expense_stmt.executeQuery(BDLY_INPUT_empdetails);
    while(BDLY_INPUT_empdetails_rs.next())
    {
      var BDLY_INPUT_empdetailsdata=BDLY_INPUT_empdetails_rs.getString('EMP_ID');
      BDLY_INPUT_empdetailsarry.push(BDLY_INPUT_empdetailsdata);
    }
    BDLY_INPUT_empdetails_rs.close();BDLY_INPUT_expense_stmt.close();
    var BDLY_INPUT_errmsgids="2,8,9,10,105,169,204,205,206,207,208,242,245,246,247,248,250,256,258,400";
    var BDLY_INPUT_tableerrmsgarr=[];
    BDLY_INPUT_tableerrmsgarr=eilib.GetErrorMessageList(BDLY_INPUT_conn,BDLY_INPUT_errmsgids);
    var BDLY_INPUT_expanse_arrayvalues={"BDLY_INPUT_empdetailsarry":BDLY_INPUT_empdetailsarry,"BDLY_INPUT_tableerrmsgarr":BDLY_INPUT_tableerrmsgarr.errormsg,"BDLY_INPUT_detailstarhub":BDLY_INPUT_detailstarhub,"BDLY_INPUT_detailelecticity":BDLY_INPUT_detailelecticity,"BDLY_INPUT_detailairconservice":BDLY_INPUT_detailairconservice,"BDLY_INPUT_detailcarpark":BDLY_INPUT_detailcarpark,"BDLY_INPUT_detaildigitalvoice":BDLY_INPUT_detaildigitalvoice, "BDLY_INPUT_unittable":BDLY_INPUT_unittable,"BDLY_INPUT_customer":BDLY_INPUT_customer,"BDLY_INPUT_customerentrydetails":BDLY_INPUT_customerentrydetails,"BDLY_INPUT_expanse_array":BDLY_INPUT_expanse_array}//,"BDLY_INPUT_errmsgarr":BDLY_INPUT_errmsgarr}
    BDLY_INPUT_errorarray.push(BDLY_INPUT_expanse_arrayvalues);
    BDLY_INPUT_conn.close();
    return BDLY_INPUT_errorarray;
  }
  //GET THE UNIT NUMBER//
  function BDLY_INPUT_get_unitno(BDLY_INPUT_type)
  {
    var BDLY_INPUT_conn = eilib.db_GetConnection(); 
    var BDLY_INPUT_unitno_array=[]; var BDLY_INPUT_unit_autocomplete=[];
    var BDLY_INPUT_select_unitno=[];
    var  BDLY_INPUT_unitno_stmt=BDLY_INPUT_conn.createStatement();
    BDLY_INPUT_select_unitno[9]="SELECT DISTINCT U.UNIT_NO FROM UNIT U,EXPENSE_DETAIL_AIRCON_SERVICE AIRCONDTL WHERE (U.UNIT_ID=AIRCONDTL.UNIT_ID) ORDER BY U.UNIT_NO ASC"
    BDLY_INPUT_select_unitno[8]="SELECT DISTINCT U.UNIT_NO FROM UNIT U,EXPENSE_DETAIL_CARPARK CARPARKDTL WHERE (U.UNIT_ID=CARPARKDTL.UNIT_ID) ORDER BY U.UNIT_NO ASC";
    BDLY_INPUT_select_unitno[5]="SELECT DISTINCT U.UNIT_NO FROM UNIT U,EXPENSE_DETAIL_DIGITAL_VOICE DIGITALDTL WHERE (U.UNIT_ID=DIGITALDTL.UNIT_ID) ORDER BY U.UNIT_NO ASC";
    BDLY_INPUT_select_unitno[1]="SELECT DISTINCT U.UNIT_NO FROM UNIT U,EXPENSE_DETAIL_ELECTRICITY EDE WHERE (U.UNIT_ID=EDE.UNIT_ID) ORDER BY U.UNIT_NO ASC";
    BDLY_INPUT_select_unitno[2]="SELECT DISTINCT U.UNIT_NO FROM UNIT U,EXPENSE_DETAIL_STARHUB EDSH WHERE (U.UNIT_ID=EDSH.UNIT_ID) ORDER BY U.UNIT_NO ASC";
    if((BDLY_INPUT_type==4)||(BDLY_INPUT_type==6)||(BDLY_INPUT_type==7)||( BDLY_INPUT_type==3)){
      BDLY_INPUT_select_unitno[BDLY_INPUT_type]="SELECT DISTINCT UNIT_NO FROM UNIT ORDER BY UNIT_NO ASC";
    }
    var BDLY_INPUT_unitno_rs=BDLY_INPUT_unitno_stmt.executeQuery(BDLY_INPUT_select_unitno[BDLY_INPUT_type]);
    while(BDLY_INPUT_unitno_rs.next())
    {
      BDLY_INPUT_unitno_array.push(BDLY_INPUT_unitno_rs.getString('UNIT_NO'));
    }
    BDLY_INPUT_unitno_rs.close();
    BDLY_INPUT_unitno_stmt.close();
    if(BDLY_INPUT_type==3)
      BDLY_INPUT_unit_autocomplete=eilib.BDLY_getinvoicefrom(BDLY_INPUT_conn); 
    BDLY_INPUT_conn.close();
    return [BDLY_INPUT_unitno_array,BDLY_INPUT_unit_autocomplete]; 
  }
  //GET THE PETTY CASH BALANCE//
  function BDLY_INPUT_get_balance(){
    var BDLY_INPUT_conn = eilib.db_GetConnection(); 
    var BDLY_INPUT_opening_blns;
    var BDLY_INPUT_opening_blnsarry=[];
    var BDLY_INPUT_openingbalance_stmt =  BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_select_pettybalance="SELECT EPC_BALANCE,EPC_DATE FROM EXPENSE_PETTY_CASH ORDER BY EPC_ID DESC"
    var BDLY_INPUT_pettybalance_rs = BDLY_INPUT_openingbalance_stmt.executeQuery(BDLY_INPUT_select_pettybalance);
    if(BDLY_INPUT_pettybalance_rs.next())
    {
      BDLY_INPUT_opening_blns=parseFloat(BDLY_INPUT_pettybalance_rs.getString("EPC_BALANCE")).toFixed(2);
      var BDLY_INPUT_pettydate = BDLY_INPUT_pettybalance_rs.getString("EPC_DATE");
    }
    if(BDLY_INPUT_opening_blns==null || BDLY_INPUT_opening_blns=="")
    {
      BDLY_INPUT_opening_blns='0.00';
    }
    else
    {
      BDLY_INPUT_opening_blns=BDLY_INPUT_opening_blns;
    }
    BDLY_INPUT_opening_blnsarry.push(BDLY_INPUT_opening_blns);
    BDLY_INPUT_opening_blnsarry.push(BDLY_INPUT_pettydate);
    BDLY_INPUT_pettybalance_rs.close();
    BDLY_INPUT_openingbalance_stmt.close();
    BDLY_INPUT_conn.close();
    return BDLY_INPUT_opening_blnsarry;
  }
  //GET THE PAYMENT  VALUES//
  function BDLY_INPUT_get_invoiceto(unitno)
  {
    var BDLY_INPUT_conn = eilib.db_GetConnection(); 
    var BDLY_INPUT_invoiceto_stmt=BDLY_INPUT_conn.createStatement();    
    var BDLY_INPUT_select_invoieto=" SELECT EC.ECN_DATA,EDE.ECN_ID FROM EXPENSE_DETAIL_ELECTRICITY EDE,EXPENSE_CONFIGURATION EC ,UNIT U WHERE (EDE.UNIT_ID =U.UNIT_ID) AND (EC.ECN_ID=EDE.ECN_ID)AND(U.UNIT_NO="+unitno+") ORDER BY EDE.EDE_REC_VER DESC";
    var BDLY_INPUT_invoiceto_rs=BDLY_INPUT_invoiceto_stmt.executeQuery(BDLY_INPUT_select_invoieto);
    if(BDLY_INPUT_invoiceto_rs.next()){      
      var BDLY_INPUT_invoiceto=BDLY_INPUT_invoiceto_rs.getString("EC.ECN_DATA");   
      var BDLY_INPUT_invoicetoid=BDLY_INPUT_invoiceto_rs.getString("EDE.ECN_ID");
    }
    BDLY_INPUT_invoiceto_rs.close()
    var BDLY_INPUT_elect_values_array=[];
    BDLY_INPUT_elect_values_array=[BDLY_INPUT_invoiceto] 
    var BDLY_INPUT_getsedate=eilib.GetUnitSdEdInvdate(BDLY_INPUT_conn,unitno)
    BDLY_INPUT_elect_values_array.push(BDLY_INPUT_getsedate)
    BDLY_INPUT_elect_values_array.push(BDLY_INPUT_invoicetoid)
    BDLY_INPUT_invoiceto_stmt.close();
    BDLY_INPUT_conn.close();
    return BDLY_INPUT_elect_values_array;  
  }
  //GET THE CATEGORY FROM EXPENSE_CONFIGURATION//
  function BDLY_INPUT_get_category(unitno) 
  {
    var BDLY_INPUT_conn = eilib.db_GetConnection();
    var BDLY_INPUT_exp_config_stmt = BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_namearray=[];
    var BDLY_INPUT_select_customername = "SELECT DISTINCT CONCAT(C.CUSTOMER_FIRST_NAME,' ',C.CUSTOMER_LAST_NAME) AS CNAME,CED.CUSTOMER_ID FROM CUSTOMER C,CUSTOMER_ENTRY_DETAILS CED,UNIT U WHERE (CED.CUSTOMER_ID=C.CUSTOMER_ID) AND (U.UNIT_NO='"+unitno+"') AND (CED.UNIT_ID=U.UNIT_ID) ORDER BY C.CUSTOMER_FIRST_NAME ASC";
    var BDLY_INPUT_customername_rs = BDLY_INPUT_exp_config_stmt.executeQuery(BDLY_INPUT_select_customername);
    while(BDLY_INPUT_customername_rs.next()){      
      var BDLY_INPUT_custname=BDLY_INPUT_customername_rs.getString("CNAME");
      BDLY_INPUT_namearray.push({BDLY_INPUT_custname:BDLY_INPUT_custname,BDLY_INPUT_custid:BDLY_INPUT_customername_rs.getString("CUSTOMER_ID")})
    }
    var BDLY_INPUT_unitexp_values=[];
    BDLY_INPUT_unitexp_values=[BDLY_INPUT_namearray];
    var BDLY_INPUT_getsedate=eilib.GetUnitSdEdInvdate(BDLY_INPUT_conn,unitno)
    BDLY_INPUT_unitexp_values.push(BDLY_INPUT_getsedate)
    BDLY_INPUT_customername_rs.close();BDLY_INPUT_exp_config_stmt.close();
    BDLY_INPUT_conn.close();
    return BDLY_INPUT_unitexp_values
  }
  //GET THE VALUES FOR LOADING IN THE FORM//
  function BDLY_INPUT_get_values(unitno,type)
  {
    var BDLY_INPUT_conn = eilib.db_GetConnection(); 
    var BDLY_INPUT_values_array=[];
    var BDLY_INPUT_type=type
    if(BDLY_INPUT_type==9){
      var  BDLY_INPUT_serviceby_stmt=BDLY_INPUT_conn.createStatement();     
      var BDLY_INPUT_select_serviceby="SELECT AIRCONDTL.EDAS_ID,EAS.EASB_DATA FROM EXPENSE_DETAIL_AIRCON_SERVICE AIRCONDTL,UNIT U,EXPENSE_AIRCON_SERVICE_BY EAS WHERE (U.UNIT_ID=AIRCONDTL.UNIT_ID) AND U.UNIT_NO='"+unitno+"' and(EAS.EASB_ID=AIRCONDTL.EASB_ID) ORDER BY AIRCONDTL.EDAS_REC_VER DESC"
      var BDLY_INPUT_serviceby_rs=BDLY_INPUT_serviceby_stmt.executeQuery(BDLY_INPUT_select_serviceby);     
      if(BDLY_INPUT_serviceby_rs.next()){
        BDLY_INPUT_values_array.push({"BDLY_INPUT_airconserviceby":BDLY_INPUT_serviceby_rs.getString('EASB_DATA'),"BDLY_INPUT_edasid":BDLY_INPUT_serviceby_rs.getString('EDAS_ID')});
      }
      BDLY_INPUT_serviceby_rs.close();
      BDLY_INPUT_serviceby_stmt.close(); 
    }
    if(BDLY_INPUT_type==8){
      var  BDLY_INPUT_carno_stmt=BDLY_INPUT_conn.createStatement();      
      var BDLY_INPUT_select_carno="SELECT EDCP_CAR_NO,EDCP_ID FROM EXPENSE_DETAIL_CARPARK CARPARKDTL,UNIT U WHERE (U.UNIT_ID=CARPARKDTL.UNIT_ID) AND U.UNIT_NO='"+unitno+"' ORDER BY CARPARKDTL.EDCP_REC_VER DESC";
      var BDLY_INPUT_carno_rs=BDLY_INPUT_carno_stmt.executeQuery(BDLY_INPUT_select_carno);      
      if(BDLY_INPUT_carno_rs.next()){
        BDLY_INPUT_values_array.push({BDLY_INPUT_carno_data:BDLY_INPUT_carno_rs.getString('EDCP_CAR_NO'),BDLY_INPUT_carno_id:BDLY_INPUT_carno_rs.getString('EDCP_ID')});
      }
      BDLY_INPUT_carno_rs.close();
      BDLY_INPUT_carno_stmt.close();
    } 
    if(BDLY_INPUT_type==5){
      var BDLY_INPUT_invoiceto;
      var  BDLY_INPUT_invoiceto_stmt=BDLY_INPUT_conn.createStatement();      
      var BDLY_INPUT_select_invoiceto="SELECT EDDV.UNIT_ID,EC.ECN_DATA,EDDV.EDDV_DIGITAL_VOICE_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO FROM EXPENSE_DETAIL_DIGITAL_VOICE EDDV LEFT JOIN EXPENSE_CONFIGURATION EC ON (EDDV.ECN_ID=EC.ECN_ID),UNIT U WHERE (U.UNIT_NO="+unitno+") AND (EDDV.UNIT_ID=U.UNIT_ID) ORDER BY EDDV.EDDV_REC_VER DESC"
      var BDLY_INPUT_invoiceto_rs=BDLY_INPUT_invoiceto_stmt.executeQuery(BDLY_INPUT_select_invoiceto);      
      if(BDLY_INPUT_invoiceto_rs.next()){
        BDLY_INPUT_invoiceto=BDLY_INPUT_invoiceto_rs.getString('ECN_DATA');
        var BDLY_INPUT_digital_voiceno=BDLY_INPUT_invoiceto_rs.getString("EDDV_DIGITAL_VOICE_NO");
        var BDLY_INPUT_digital_accno=BDLY_INPUT_invoiceto_rs.getString("EDDV_DIGITAL_ACCOUNT_NO");
      }
      BDLY_INPUT_invoiceto_rs.close();
      BDLY_INPUT_invoiceto_stmt.close();
      if(BDLY_INPUT_invoiceto==null)
        BDLY_INPUT_invoiceto='';
      BDLY_INPUT_values_array=[BDLY_INPUT_invoiceto,BDLY_INPUT_digital_voiceno,BDLY_INPUT_digital_accno];
    }
    var BDLY_INPUT_getsedate=eilib.GetUnitSdEdInvdate(BDLY_INPUT_conn,unitno)
    BDLY_INPUT_values_array.push(BDLY_INPUT_getsedate);
    BDLY_INPUT_conn.close();
    return BDLY_INPUT_values_array;
  }
  //GET THE ACCESS CARD VALUE//
  function BDLY_INPUT_checkcardno(cardno)
  {
    var BDLY_INPUT_conn = eilib.db_GetConnection(); 
    var BDLY_INPUT_cardexist=eilib.Check_ExistsCard(BDLY_INPUT_conn,cardno);
    BDLY_INPUT_conn.close();
    return BDLY_INPUT_cardexist
  }
  //FUNCTION TO GET STAR HUB VALUES//
  function BDLY_INPUT_get_accno(unitno)
  {
    var BDLY_INPUT_conn = eilib.db_GetConnection(); 
    var BDLY_INPUT_starhubunitidstmt = BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_starhubinvoicetovalues = "SELECT EC.ECN_DATA,EDSH.ECN_ID,EDSH.EDSH_ACCOUNT_NO FROM EXPENSE_DETAIL_STARHUB EDSH LEFT JOIN EXPENSE_CONFIGURATION EC ON (EDSH.ECN_ID=EC.ECN_ID) WHERE (EDSH.UNIT_ID =(SELECT UNIT_ID FROM UNIT WHERE UNIT_NO="+unitno+"))  ORDER BY EDSH.EDSH_REC_VER DESC";
    var BDLY_INPUT_invoiceto_rs=BDLY_INPUT_starhubunitidstmt.executeQuery(BDLY_INPUT_starhubinvoicetovalues);
    if(BDLY_INPUT_invoiceto_rs.next()){      
      var BDLY_INPUT_invoiceto=BDLY_INPUT_invoiceto_rs.getString("ECN_DATA"); 
      var BDLY_INPUT_accno=BDLY_INPUT_invoiceto_rs.getString("EDSH_ACCOUNT_NO");  
      var BDLY_INPUT_starhubecnid=BDLY_INPUT_invoiceto_rs.getString("ECN_ID");}
    BDLY_INPUT_invoiceto_rs.close();
    BDLY_INPUT_starhubunitidstmt.close();    
    var BDLY_INPUT_starhub_values=[BDLY_INPUT_accno,BDLY_INPUT_invoiceto,BDLY_INPUT_starhubecnid];
    var BDLY_INPUT_getsedate=eilib.GetUnitSdEdInvdate(BDLY_INPUT_conn,unitno)
    BDLY_INPUT_starhub_values.push(BDLY_INPUT_getsedate)
    BDLY_INPUT_conn.close();
    return BDLY_INPUT_starhub_values
  }
  //FUNCTION TO GET THE CLEANER NAME//
  function BDLY_INPUT_get_cleanername(){
    var BDLY_INPUT_conn = eilib.db_GetConnection();
    var  BDLY_INPUT_geterrmsg=[];
    var BDLY_INPUT_cleanername_stmt=BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_selectcleanername="SELECT DISTINCT ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME,ED.EMP_ID FROM EMPLOYEE_DETAILS ED,EXPENSE_CONFIGURATION EXPCONFIG WHERE (EXPCONFIG.ECN_ID=ED.ECN_ID) AND (EXPCONFIG.ECN_ID=75) ORDER BY ED.EMP_FIRST_NAME ASC";
    var BDLY_INPUT_cleanername_rs=BDLY_INPUT_cleanername_stmt.executeQuery(BDLY_INPUT_selectcleanername);
    var BDLY_INPUT_cleanername=[];
    var BDLY_INPUT_allcleanernamedatas=[];
    while(BDLY_INPUT_cleanername_rs.next())
    {
      var BDLY_INPUT_firstname=BDLY_INPUT_cleanername_rs.getString('EMP_FIRST_NAME');
      var BDLY_INPUT_lastname=BDLY_INPUT_cleanername_rs.getString('EMP_LAST_NAME');
      BDLY_INPUT_cleanername.push({BDLY_INPUT_cleanername:BDLY_INPUT_firstname+' '+BDLY_INPUT_lastname,BDLY_INPUT_empid:BDLY_INPUT_cleanername_rs.getString('EMP_ID')});
    }
    BDLY_INPUT_cleanername_rs.close();
    BDLY_INPUT_cleanername_stmt.close();
    BDLY_INPUT_conn.close();
    return  BDLY_INPUT_cleanername;
  }
  //CHECK THE CUSTOMER NAME HAVING  MORE ID'S//
  function BDLY_INPUT_custvalidation(unit,customer,id)
  {
    var BDLY_INPUT_customername=customer.split('_');
    var BDLY_INPUT_customer_firstname=BDLY_INPUT_customername[0];
    var BDLY_INPUT_customer_lastname=BDLY_INPUT_customername[1];
    var BDLY_INPUT_mul_customername_array=[];
    var BDLY_INPUT_conn=eilib.db_GetConnection();
    var BDLY_INPUT_mul_stmt = BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_mul_activecustomerquery="SELECT DISTINCT C.CUSTOMER_ID,C.CUSTOMER_FIRST_NAME,C.CUSTOMER_LAST_NAME FROM CUSTOMER C,UNIT U,CUSTOMER_TERMINATION_DETAILS CTD,CUSTOMER_ENTRY_DETAILS CED WHERE C.CUSTOMER_FIRST_NAME='"+BDLY_INPUT_customer_firstname+"' AND C.CUSTOMER_LAST_NAME='"+BDLY_INPUT_customer_lastname+"' AND C.CUSTOMER_ID=CTD.CUSTOMER_ID AND U.UNIT_ID=CED.UNIT_ID AND CED.CUSTOMER_ID=CTD.CUSTOMER_ID  AND U.UNIT_NO="+unit+" "
    var BDLY_INPUT_mul_customerresult = BDLY_INPUT_mul_stmt.executeQuery(BDLY_INPUT_mul_activecustomerquery);
    while(BDLY_INPUT_mul_customerresult.next())
    {
      var BDLY_INPUT_name1=BDLY_INPUT_mul_customerresult.getString("CUSTOMER_FIRST_NAME");
      var BDLY_INPUT_name2=BDLY_INPUT_mul_customerresult.getString("CUSTOMER_LAST_NAME");
      var BDLY_INPUT_name=BDLY_INPUT_name1+" "+BDLY_INPUT_name2;
      var customer_details={unit:unit,name:BDLY_INPUT_name,custid:BDLY_INPUT_mul_customerresult.getString("CUSTOMER_ID")}
      BDLY_INPUT_mul_customername_array.push(customer_details);
    }
    var return_array_values=[BDLY_INPUT_mul_customername_array,id]
    BDLY_INPUT_mul_customerresult.close();
    BDLY_INPUT_mul_stmt.close();
    BDLY_INPUT_conn.close();
    return return_array_values;
  }
  //GET UNIT START DATE AND END DATE//
  function BDLY_INPUT_get_SEdate(BDLY_INPUT_unitno)
  {
    var BDLY_INPUT_conn=eilib.db_GetConnection();
    var BDLY_INPUT_unitdate=eilib.GetUnitSdEdInvdate(BDLY_INPUT_conn,BDLY_INPUT_unitno);
    BDLY_INPUT_conn.close();
    return BDLY_INPUT_unitdate;
  }
  //GET ALL UNIT NO//
  function BDLY_INPUT_get_allunitno()
  {
    var BDLY_INPUT_conn=eilib.db_GetConnection();
    var BDLY_INPUT_BDLY_INPUT_allunitArray=[];
    var BDLY_INPUT_getallunitfromunit="SELECT UNIT_NO from UNIT";
    var BDLY_INPUT_unittable =BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_fromunittable = BDLY_INPUT_unittable.executeQuery(BDLY_INPUT_getallunitfromunit);
    while(BDLY_INPUT_fromunittable.next())
    {
      var BDLY_INPUT_allUNITNUMBER = BDLY_INPUT_fromunittable.getString('UNIT_NO');
      BDLY_INPUT_BDLY_INPUT_allunitArray.push(BDLY_INPUT_allUNITNUMBER);
    }
    BDLY_INPUT_fromunittable.close();BDLY_INPUT_unittable.close();
    var BDLY_INPUT_unittable =BDLY_INPUT_conn.createStatement();
    var BDLY_INPUT_getallunitfromhku="SELECT DISTINCT EHU.EHKU_UNIT_NO  from EXPENSE_HOUSEKEEPING_UNIT EHU ,EXPENSE_HOUSEKEEPING_PAYMENT EHP WHERE EHU.EHKU_ID = EHP.EHKU_ID ";
    var BDLY_INPUT_fromunittablehku = BDLY_INPUT_unittable.executeQuery(BDLY_INPUT_getallunitfromhku);
    while(BDLY_INPUT_fromunittablehku.next())
    {
      var BDLY_INPUT_allUNITNUMBERhku = BDLY_INPUT_fromunittablehku.getString('EHKU_UNIT_NO');
      BDLY_INPUT_BDLY_INPUT_allunitArray.push(BDLY_INPUT_allUNITNUMBERhku);
    }
    BDLY_INPUT_fromunittablehku.close();
    BDLY_INPUT_BDLY_INPUT_allunitArray.sort();
    BDLY_INPUT_unittable.close();
    BDLY_INPUT_conn.close();
    return BDLY_INPUT_BDLY_INPUT_allunitArray;
  }
  //CHECK EXISTING UNIT//
  function BDLY_INPUT_checkexistunit(BDLY_INPUT_unitval)
  {
    var BDLY_INPUT_conn=eilib.db_GetConnection();
    var hkuunitcheck_flag=eilib.CheckHKPUnitnoExists(BDLY_INPUT_conn,BDLY_INPUT_unitval);
    var uunitcheck_flag=eilib.CheckUnitnoExists(BDLY_INPUT_conn,BDLY_INPUT_unitval);
    if(hkuunitcheck_flag==true||uunitcheck_flag==true)
    {
      return true;
    }
    else if(hkuunitcheck_flag==false&&uunitcheck_flag==false)
    {
    }
    BDLY_INPUT_conn.close();
    return false;
  }
  //SAVE ALL  FORM DATA IN THE TABLE//
  function BDLY_INPUT_save_values(BDLY_INPUT_form_values)
  {
    var BDLY_INPUT_refresh=[];
    var BDLY_INPUT_exptype=BDLY_INPUT_form_values.BDLY_INPUT_lb_selectexptype;
    var BDLY_INPUT_unitno=BDLY_INPUT_form_values.BDLY_INPUT_lb_unitno;
    var BDLY_INPUT_conn = eilib.db_GetConnection();
    BDLY_INPUT_conn.setAutoCommit(false);
    //AIRCON SERVICES SAVING PART//
    if(BDLY_INPUT_exptype==9){
      var BDLY_INPUT_serviceby=BDLY_INPUT_form_values.BDLY_INPUT_tb_serviceby;
      var BDLY_INPUT_invoicedate=eilib.SqlDateFormat(BDLY_INPUT_form_values.BDLY_INPUT_tb_air_date);
      var BDLY_INPUT_comments=BDLY_INPUT_form_values.BDLY_INPUT_ta_aircon_comments;
      if(BDLY_INPUT_comments=="")//COMMENTS
      {  BDLY_INPUT_comments=null;}else{
        BDLY_INPUT_comments='"'+eilib.ConvertSpclCharString(BDLY_INPUT_comments)+'"';}
      var BDLY_INPUT_airconid=(BDLY_INPUT_form_values.BDLY_INPUT_hidden_edasid).trim();      
      var BDLY_INPUT_airconsave_stmt=BDLY_INPUT_conn.createStatement();
      var BDLY_INPUT_insert_aircon="INSERT INTO EXPENSE_AIRCON_SERVICE(EDAS_ID,EAS_DATE,EAS_COMMENTS,ULD_ID)values("+BDLY_INPUT_airconid+",'"+BDLY_INPUT_invoicedate+"',"+BDLY_INPUT_comments+",(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'))";
      BDLY_INPUT_airconsave_stmt.execute(BDLY_INPUT_insert_aircon);
      BDLY_INPUT_airconsave_stmt.close();BDLY_INPUT_conn.commit();
    }
    //CAR PARK SAVING PART//
    if(BDLY_INPUT_exptype==8){      
      var BDLY_INPUT_carno=BDLY_INPUT_form_values.BDLY_INPUT_tb_carno;      
      var BDLY_INPUT_cp_invoicedate=eilib.SqlDateFormat(BDLY_INPUT_form_values.BDLY_INPUT_tb_cp_invoicedate);
      var BDLY_INPUT_cp_invoiceamt=BDLY_INPUT_form_values.BDLY_INPUT_tb_cp_invoiceamt; 
      var BDLY_INPUT_cp_fromdate=eilib.SqlDateFormat(BDLY_INPUT_form_values.BDLY_INPUT_tb_cp_fromdate);
      var BDLY_INPUT_cp_todate=eilib.SqlDateFormat(BDLY_INPUT_form_values.BDLY_INPUT_tb_cp_todate);
      var BDLY_INPUT_cp_comments=BDLY_INPUT_form_values.BDLY_INPUT_ta_cp_comments;
      var BDLY_INPUT_edcpid=BDLY_INPUT_form_values.BDLY_INPUT_hidden_edcpid;
      if(BDLY_INPUT_cp_comments=="")//COMMENTS
      { BDLY_INPUT_cp_comments=null;}else{
        BDLY_INPUT_cp_comments='"'+eilib.ConvertSpclCharString(BDLY_INPUT_cp_comments)+'"';}
      var BDLY_INPUT_carparksavestmt = BDLY_INPUT_conn.createStatement();
      var BDLY_INPUT_insert_carpark = "INSERT INTO EXPENSE_CARPARK (ULD_ID,EDCP_ID,ECP_INVOICE_DATE,ECP_FROM_PERIOD,ECP_TO_PERIOD,ECP_AMOUNT,ECP_COMMENTS) VALUES((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'),"+BDLY_INPUT_edcpid+",'"+BDLY_INPUT_cp_invoicedate+"','"+BDLY_INPUT_cp_fromdate+"','"+BDLY_INPUT_cp_todate+"','"+BDLY_INPUT_cp_invoiceamt+"',"+BDLY_INPUT_cp_comments+")";
      BDLY_INPUT_carparksavestmt.execute(BDLY_INPUT_insert_carpark); 
      BDLY_INPUT_carparksavestmt.close(); BDLY_INPUT_conn.commit();
    }
    //PURCHASE NEW ACCESS CARD SAVING PART//
    if(BDLY_INPUT_exptype==6){ 
      var BDLY_INPUT_access_cardno=BDLY_INPUT_form_values.BDLY_INPUT_tb_access_cardno;
      var BDLY_INPUT_access_date=eilib.SqlDateFormat(BDLY_INPUT_form_values.BDLY_INPUT_tb_access_date); 
      var BDLY_INPUT_access_invoiceamt=BDLY_INPUT_form_values.BDLY_INPUT_tb_access_invoiceamt;
      var BDLY_INPUT_access_comments=BDLY_INPUT_form_values.BDLY_INPUT_ta_access_comments;      
      var BDLY_INPUT_unitid_stmt = BDLY_INPUT_conn.createStatement();
      if(BDLY_INPUT_access_comments=="")//COMMENTS
      { BDLY_INPUT_access_comments=null;}else{
        BDLY_INPUT_access_comments='"'+eilib.ConvertSpclCharString(BDLY_INPUT_access_comments)+'"';}
      var BDLY_INPUT_insert_card="CALL SP_BIZDLY_PURCHASE_NEW_CARD_INSERT("+BDLY_INPUT_unitno+","+BDLY_INPUT_access_cardno+",'"+BDLY_INPUT_access_date+"','"+BDLY_INPUT_access_invoiceamt+"',"+BDLY_INPUT_access_comments+",'"+UserStamp+"',@FLAG_INSERT)";
      BDLY_INPUT_unitid_stmt.execute(BDLY_INPUT_insert_card);
      BDLY_INPUT_unitid_stmt.close();BDLY_INPUT_conn.commit();
    }
    //PETTY CASH SAVING PART//
    if(BDLY_INPUT_exptype==10)
    {
      var BDLY_INPUT_petty_cashin=BDLY_INPUT_form_values.BDLY_INPUT_tb_petty_cashin;
      var BDLY_INPUT_petty_date=eilib.SqlDateFormat(BDLY_INPUT_form_values.BDLY_INPUT_tb_petty_date); 
      var BDLY_INPUT_petty_cashout=BDLY_INPUT_form_values.BDLY_INPUT_tb_petty_cashout;
      if(BDLY_INPUT_petty_cashout==''){       
        BDLY_INPUT_petty_cashout=null
      }
      if(BDLY_INPUT_petty_cashin==''){
        BDLY_INPUT_petty_cashin=null;
      }
      var BDLY_INPUT_petty_comments=BDLY_INPUT_form_values.BDLY_INPUT_ta_petty_comments; 
      var BDLY_INPUT_petty_invoiceitem=BDLY_INPUT_form_values.BDLY_INPUT_ta_petty_invoiceitem;   
      if(BDLY_INPUT_petty_invoiceitem!='')
        BDLY_INPUT_petty_invoiceitem=eilib.ConvertSpclCharString(BDLY_INPUT_petty_invoiceitem)
        if(BDLY_INPUT_petty_comments=="")//COMMENTS
        { BDLY_INPUT_petty_comments=null;}else{
          BDLY_INPUT_petty_comments='"'+eilib.ConvertSpclCharString(BDLY_INPUT_petty_comments)+'"';}
      var BDLY_INPUT_pettysave_stmt = BDLY_INPUT_conn.createStatement();
      BDLY_INPUT_pettysave_stmt.execute("CALL SP_BIZDLY_PETTY_CASH_INSERT('"+UserStamp+"','"+BDLY_INPUT_petty_date+"',"+BDLY_INPUT_petty_cashin+","+BDLY_INPUT_petty_cashout+",'"+BDLY_INPUT_petty_invoiceitem+"',"+BDLY_INPUT_petty_comments+",@FLAG_INSERT)");
      BDLY_INPUT_pettysave_stmt.close();BDLY_INPUT_conn.commit();
      BDLY_INPUT_refresh=BDLY_INPUT_get_balance();
    }
    //MOVING IN AND OUT SAVING PART//
    if(BDLY_INPUT_exptype==7){
      var BDLY_INPUT_moving_date=eilib.SqlDateFormat(BDLY_INPUT_form_values.BDLY_INPUT_tb_mov_date);
      var BDLY_INPUT_moving_invoiceamt=BDLY_INPUT_form_values.BDLY_INPUT_tb_mov_invoiceamt;
      var BDLY_INPUT_moving_comments=BDLY_INPUT_form_values.BDLY_INPUT_ta_mov_comments;    
      var BDLY_INPUT_unitid_stmt = BDLY_INPUT_conn.createStatement();
      if(BDLY_INPUT_moving_comments=="")//COMMENTS
      { BDLY_INPUT_moving_comments=null;}else{
        BDLY_INPUT_moving_comments='"'+eilib.ConvertSpclCharString(BDLY_INPUT_moving_comments)+'"';}
      var BDLY_INPUT_insert_moving = "INSERT INTO EXPENSE_MOVING_IN_AND_OUT (ULD_ID,UNIT_ID,EMIO_INVOICE_DATE,EMIO_AMOUNT,EMIO_COMMENTS) VALUES ((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'),(SELECT UNIT_ID FROM UNIT U WHERE U.UNIT_NO='"+BDLY_INPUT_unitno+"'),'"+BDLY_INPUT_moving_date+"','"+BDLY_INPUT_moving_invoiceamt+"',"+BDLY_INPUT_moving_comments+")";
      BDLY_INPUT_unitid_stmt.execute(BDLY_INPUT_insert_moving);
      BDLY_INPUT_unitid_stmt.close();BDLY_INPUT_conn.commit();
    }
    //UNIT EXPENSE SAVING PART//
    if(BDLY_INPUT_exptype==3){
      var  BDLY_INPUT_arrunitvalue=BDLY_INPUT_form_values.BDLY_INPUT_lb_uexp_unit;
      var find_isArray=(BDLY_INPUT_arrunitvalue.toString()).search(',');
      var BDLY_INPUT_unitnovalue=BDLY_INPUT_form_values.BDLY_INPUT_hidden_customerid;
      var BDLY_INPUT_unitnovalue=BDLY_INPUT_form_values.BDLY_INPUT_lb_uexp_unit;
      var BDLY_INPUT_categoryvalue=BDLY_INPUT_form_values.BDLY_INPUT_lb_uexp_category;
      var BDLY_INPUT_customervalue=BDLY_INPUT_form_values.BDLY_INPUT_lb_uexp_customer;
      var BDLY_INPUT_customerid=BDLY_INPUT_form_values.BDLY_INPUT_tb_uexp_hideradioid;
      var BDLY_INPUT_invoicedatevalue=BDLY_INPUT_form_values.BDLY_INPUT_db_uexp_invoicedate;
      var BDLY_INPUT_amountvalue=BDLY_INPUT_form_values.BDLY_INPUT_tb_uexp_amount;
      var BDLY_INPUT_invoiceitemvalue=BDLY_INPUT_form_values.BDLY_INPUT_tb_uexp_invoiceitem;
      var BDLY_INPUT_invoicefromvalue=BDLY_INPUT_form_values.BDLY_INPUT_tb_uexp_invoicefrom;
      var BDLY_INPUT_commentsvalue=BDLY_INPUT_form_values.BDLY_INPUT_ta_uexpcomments;
      var BDLY_INPUT_array_length=parseInt(BDLY_INPUT_unitnovalue.length);
      var BDLY_INPUT_comments_split=''; var BDLY_INPUT_invfrom_split='';var BDLY_INPUT_invitem_split='';
      if((Array.isArray(BDLY_INPUT_commentsvalue))==true){
        for(var i=0;i<BDLY_INPUT_invoicefromvalue.length;i++)
        {
          if(BDLY_INPUT_commentsvalue[i]==''){
            if(i==0)
              BDLY_INPUT_comments_split +=' '
              else
                BDLY_INPUT_comments_split +='^^'+' '; }          
          else{
            if(i==0){
              BDLY_INPUT_comments_split +=eilib.ConvertSpclCharString(BDLY_INPUT_commentsvalue[i]);
            }
            else{
              BDLY_INPUT_comments_split +='^^'+eilib.ConvertSpclCharString(BDLY_INPUT_commentsvalue[i]);
            }  }
          if(i==0){
            BDLY_INPUT_invitem_split +=eilib.ConvertSpclCharString(BDLY_INPUT_invoiceitemvalue[i]);
            BDLY_INPUT_invfrom_split +=eilib.ConvertSpclCharString(BDLY_INPUT_invoicefromvalue[i]);}
          else{
            BDLY_INPUT_invitem_split +='^^'+eilib.ConvertSpclCharString(BDLY_INPUT_invoiceitemvalue[i]);
            BDLY_INPUT_invfrom_split +='^^'+eilib.ConvertSpclCharString(BDLY_INPUT_invoicefromvalue[i]);
          }
          BDLY_INPUT_invoicedatevalue[i]=eilib.SqlDateFormat(BDLY_INPUT_invoicedatevalue[i]);
          if(BDLY_INPUT_customerid[i]=='')
            BDLY_INPUT_customerid[i]=null;
        }}
      else
      {
        if(BDLY_INPUT_commentsvalue=='')
          BDLY_INPUT_comments_split=' ';
        else
          BDLY_INPUT_comments_split=eilib.ConvertSpclCharString(BDLY_INPUT_commentsvalue);
        if(BDLY_INPUT_customerid=='')
          BDLY_INPUT_customerid=' ';
        BDLY_INPUT_invoicedatevalue=eilib.SqlDateFormat(BDLY_INPUT_invoicedatevalue);
        BDLY_INPUT_invitem_split=eilib.ConvertSpclCharString(BDLY_INPUT_invoiceitemvalue);
        BDLY_INPUT_invfrom_split=eilib.ConvertSpclCharString(BDLY_INPUT_invoicefromvalue);
      }
      var BDLY_INPUT_unit_insertquery= "CALL SP_BIZDLY_UNIT_INSERT('"+BDLY_INPUT_unitnovalue+"','"+BDLY_INPUT_categoryvalue+"','"+BDLY_INPUT_customerid+"','"+BDLY_INPUT_invoicedatevalue+"','"+BDLY_INPUT_amountvalue+"','"+BDLY_INPUT_invitem_split+"','"+BDLY_INPUT_invfrom_split+"','"+BDLY_INPUT_comments_split+"','"+UserStamp+"',@FLAG_INSERT)";
      var BDLY_INPUT_unitstmt=BDLY_INPUT_conn.createStatement();
      BDLY_INPUT_unitstmt.execute(BDLY_INPUT_unit_insertquery);
      BDLY_INPUT_unitstmt.close();BDLY_INPUT_conn.commit();
    }
    //HOUSEKEEPING PAYMENT SAVING PART//
    if(BDLY_INPUT_exptype==12){
      var BDLY_INPUT_tb_payunitnoold=BDLY_INPUT_form_values.BDLY_INPUT_tb_pay_unitno;
      var BDLY_INPUT_tb_payunitnonew=BDLY_INPUT_form_values.BDLY_INPUT_tb_pay_unitnocheck;
      var BDLY_INPUT_tb_payunitno;
      if(BDLY_INPUT_tb_payunitnoold==undefined)
      {
        BDLY_INPUT_tb_payunitno=BDLY_INPUT_tb_payunitnonew;
      }
      if(BDLY_INPUT_tb_payunitnonew==undefined)
      {
        BDLY_INPUT_tb_payunitno=BDLY_INPUT_tb_payunitnoold;
      }
      var BDLY_INPUT_tb_payinvoiceamt=BDLY_INPUT_form_values.BDLY_INPUT_tb_pay_invoiceamt;    
      var BDLY_INPUT_tb_payforperiod=BDLY_INPUT_form_values.BDLY_INPUT_tb_pay_forperiod;
      var BDLY_INPUT_date=eilib.GetForperiodDateFormat(BDLY_INPUT_tb_payforperiod,BDLY_INPUT_tb_payforperiod)
      var BDLY_INPUT_period=BDLY_INPUT_date.frmdate;
      var BDLY_INPUT_tb_paypaiddate=eilib.SqlDateFormat(BDLY_INPUT_form_values.BDLY_INPUT_tb_pay_paiddate);
      var BDLY_INPUT_ta_paycomments=BDLY_INPUT_form_values.BDLY_INPUT_ta_pay_comments;
      if(BDLY_INPUT_ta_paycomments!='')
        BDLY_INPUT_ta_paycomments=eilib.ConvertSpclCharString(BDLY_INPUT_ta_paycomments)
        var timeZoneFormat=eilib.getTimezone();
      var BDLY_INPUT_pettysave_stmt = BDLY_INPUT_conn.createStatement();
      var BDLY_INPUT_housepayment_stmt = BDLY_INPUT_conn.createStatement();
      var BDLY_INPUT_hkp_savequery="CALL SP_BIZDLY_HOUSEKEEPING_PAYMENT_INSERT("+BDLY_INPUT_tb_payunitno+",'"+BDLY_INPUT_period+"','"+BDLY_INPUT_tb_paypaiddate+"',"+BDLY_INPUT_tb_payinvoiceamt+",'"+BDLY_INPUT_ta_paycomments+"','"+UserStamp+"',@FLAG_INSERT)";
      BDLY_INPUT_housepayment_stmt.execute(BDLY_INPUT_hkp_savequery);
      BDLY_INPUT_housepayment_stmt.close();BDLY_INPUT_conn.commit();
      BDLY_INPUT_refresh=BDLY_INPUT_get_allunitno();
    }
    //HOUSEKEEPING SAVING PART//
    if(BDLY_INPUT_exptype==11){
      var BDLY_INPUT_lb_housecleanername=BDLY_INPUT_form_values.BDLY_INPUT_lb_house_cleanername;
      var BDLY_INPUT_tb_housedate=eilib.SqlDateFormat(BDLY_INPUT_form_values.BDLY_INPUT_tb_house_date);
      var BDLY_INPUT_tb_househours=BDLY_INPUT_form_values.BDLY_INPUT_tb_house_hours;
      var BDLY_INPUT_tb_housemin=BDLY_INPUT_form_values.BDLY_INPUT_tb_house_min;
      var BDLY_INPUT_ta_housedesc=BDLY_INPUT_form_values.BDLY_INPUT_ta_house_desc;
      var BDLY_INPUT_radio_hkname=BDLY_INPUT_form_values.BDLY_INPUT_radio_hkname;
      var BDLY_INPUT_cleanerid=BDLY_INPUT_form_values.BDLY_INPUT_hidden_edeid;
      var BDLY_INPUT_index=BDLY_INPUT_lb_housecleanername.indexOf('_');
      var BDLY_INPUT_Cnamelength=BDLY_INPUT_lb_housecleanername.length;
      if(BDLY_INPUT_ta_housedesc!='')
        BDLY_INPUT_ta_housedesc=eilib.ConvertSpclCharString(BDLY_INPUT_ta_housedesc)
        var BDLY_INPUT_firstname= BDLY_INPUT_lb_housecleanername.substring(0,BDLY_INPUT_index);
      var BDLY_INPUT_lastname=BDLY_INPUT_lb_housecleanername.substring(BDLY_INPUT_index+1,BDLY_INPUT_Cnamelength);
      if(BDLY_INPUT_tb_househours!=""&&BDLY_INPUT_tb_housemin!="")
      {
        var BDLY_INPUT_duration=BDLY_INPUT_tb_househours+'.'+BDLY_INPUT_tb_housemin;
      }
      if(BDLY_INPUT_tb_househours!=""&&BDLY_INPUT_tb_housemin=="")
      {
        var BDLY_INPUT_duration=BDLY_INPUT_tb_househours+"."+'00';
      }
      if(BDLY_INPUT_tb_househours==""&&BDLY_INPUT_tb_housemin!="")
      {
        var BDLY_INPUT_duration='00'+"."+BDLY_INPUT_tb_housemin;
      }
      var BDLY_INPUT_hksavequery = "INSERT INTO EXPENSE_HOUSEKEEPING(ULD_ID,EHK_WORK_DATE,EHK_DURATION,EHK_DESCRIPTION,EMP_ID) VALUES ((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'),'"+BDLY_INPUT_tb_housedate+"','"+BDLY_INPUT_duration+"','"+BDLY_INPUT_ta_housedesc+"','"+BDLY_INPUT_cleanerid+"')";
      var BDLY_INPUT_cleanerstmt=BDLY_INPUT_conn.createStatement();
      BDLY_INPUT_cleanerstmt.execute(BDLY_INPUT_hksavequery);
      BDLY_INPUT_cleanerstmt.close();BDLY_INPUT_conn.commit();
    }
    //FACILITY USE SAVING PART//
    if(BDLY_INPUT_exptype==4){
      var BDLY_INPUT_tb_payunitno=BDLY_INPUT_form_values.BDLY_INPUT_lb_unitno;
      var BDLY_INPUT_tb_facinvoicedate=eilib.SqlDateFormat(BDLY_INPUT_form_values.BDLY_INPUT_tb_fac_invoicedate);
      var BDLY_INPUT_tb_facdepositamt=BDLY_INPUT_form_values.BDLY_INPUT_tb_fac_depositamt;
      var BDLY_INPUT_tb_facinvoiceamt=BDLY_INPUT_form_values.BDLY_INPUT_tb_fac_invoiceamt;
      var BDLY_INPUT_ta_faccomments=BDLY_INPUT_form_values.BDLY_INPUT_ta_fac_comments;
      if(BDLY_INPUT_tb_facdepositamt=="" || BDLY_INPUT_tb_facdepositamt==undefined)
      {
        BDLY_INPUT_tb_facdepositamt=null
      }
      else if(BDLY_INPUT_tb_facinvoiceamt=="" || BDLY_INPUT_tb_facinvoiceamt==undefined)
      {
        BDLY_INPUT_tb_facinvoiceamt=null
      }
      if(BDLY_INPUT_ta_faccomments=="")//COMMENTS
      {  BDLY_INPUT_ta_faccomments=null;}else{
        BDLY_INPUT_ta_faccomments='"'+eilib.ConvertSpclCharString(BDLY_INPUT_ta_faccomments)+'"';}
      var BDLY_INPUT_facility_without_depositinvoiceamt_insertquery = "INSERT INTO EXPENSE_FACILITY_USE(ULD_ID,UNIT_ID,EFU_INVOICE_DATE,EFU_COMMENTS,EFU_AMOUNT,EFU_DEPOSIT) VALUES ((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'),(SELECT UNIT_ID FROM UNIT U WHERE U.UNIT_NO='"+BDLY_INPUT_tb_payunitno+"'),'"+BDLY_INPUT_tb_facinvoicedate+"',"+BDLY_INPUT_ta_faccomments+","+BDLY_INPUT_tb_facinvoiceamt+","+BDLY_INPUT_tb_facdepositamt+")";
      var BDLY_INPUT_facilitystmt = BDLY_INPUT_conn.createStatement();
      BDLY_INPUT_facilitystmt.execute(BDLY_INPUT_facility_without_depositinvoiceamt_insertquery);
      BDLY_INPUT_facilitystmt.close();BDLY_INPUT_conn.commit();
    }
    //DIGITAL VOICE SAVING PART//
    if(BDLY_INPUT_exptype==5){
      var BDLY_INPUT_tb_gigunitno=BDLY_INPUT_form_values.BDLY_INPUT_lb_unitno;
      var BDLY_INPUT_tb_digiinvoicedate=eilib.SqlDateFormat(BDLY_INPUT_form_values.BDLY_INPUT_tb_digi_invoicedate);
      var BDLY_INPUT_tb_digifromdate=eilib.SqlDateFormat(BDLY_INPUT_form_values.BDLY_INPUT_tb_digi_fromdate);
      var BDLY_INPUT_tb_digitodate=eilib.SqlDateFormat(BDLY_INPUT_form_values.BDLY_INPUT_tb_digi_todate);
      var BDLY_INPUT_tb_digitovoice=BDLY_INPUT_form_values.BDLY_INPUT_lb_digi_invoiceto;
      var BDLY_INPUT_tb_digiinvoiceamt=BDLY_INPUT_form_values.BDLY_INPUT_tb_digi_invoiceamt;
      var BDLY_INPUT_ta_digicomments=BDLY_INPUT_form_values.BDLY_INPUT_ta_digi_comments;
      if(BDLY_INPUT_ta_digicomments!='')
        BDLY_INPUT_ta_digicomments=eilib.ConvertSpclCharString(BDLY_INPUT_ta_digicomments)
        var BDLY_INPUT_digitalsavestmt = BDLY_INPUT_conn.createStatement();
      if(BDLY_INPUT_form_values.BDLY_INPUT_tb_digi_invoiceto==undefined)
        var BDLY_INPUT_digitalsavequery = "CALL SP_BIZDLY_DIGITAL_VOICE_INSERT("+BDLY_INPUT_tb_gigunitno+","+BDLY_INPUT_tb_digitovoice+",'"+BDLY_INPUT_tb_digiinvoicedate+"','"+BDLY_INPUT_tb_digifromdate+"','"+BDLY_INPUT_tb_digitodate+"','"+BDLY_INPUT_tb_digiinvoiceamt+"','"+BDLY_INPUT_ta_digicomments+"','"+UserStamp+"',@FLAG_INSERT)";
      else
        var BDLY_INPUT_digitalsavequery = "CALL SP_BIZDLY_DIGITAL_VOICE_INSERT("+BDLY_INPUT_tb_gigunitno+",(SELECT ECN_ID FROM EXPENSE_CONFIGURATION WHERE ECN_DATA='"+BDLY_INPUT_form_values.BDLY_INPUT_tb_digi_invoiceto+"' AND CGN_ID=27),'"+BDLY_INPUT_tb_digiinvoicedate+"','"+BDLY_INPUT_tb_digifromdate+"','"+BDLY_INPUT_tb_digitodate+"','"+BDLY_INPUT_tb_digiinvoiceamt+"','"+BDLY_INPUT_ta_digicomments+"','"+UserStamp+"',@FLAG_INSERT)";
      BDLY_INPUT_digitalsavestmt.execute(BDLY_INPUT_digitalsavequery);
      BDLY_INPUT_digitalsavestmt.close();BDLY_INPUT_conn.commit();
    }
    //ELECTRICITY SAVE FUNCTION//
    if(BDLY_INPUT_exptype==1){
      var  BDLY_INPUT_electunit=BDLY_INPUT_form_values.BDLY_INPUT_lb_elect_unit;
      var find_isArray=(BDLY_INPUT_electunit.toString()).search(',');
      var BDLY_INPUT_electamountstmt = BDLY_INPUT_conn.createStatement();
      var BDLY_INPUT_electunit=BDLY_INPUT_form_values.BDLY_INPUT_lb_elect_unit;
      var BDLY_INPUT_invoiceto=BDLY_INPUT_form_values.BDLY_INPUT_lb_elect_payment;
      var BDLY_INPUT_invoicedate=BDLY_INPUT_form_values.BDLY_INPUT_db_invoicedate;
      var BDLY_INPUT_elect_amount=BDLY_INPUT_form_values.BDLY_INPUT_hidden_amt_elec;
      var BDLY_INPUT_fromperiod=BDLY_INPUT_form_values.BDLY_INPUT_db_fromperiod;
      var BDLY_INPUT_toperiod=BDLY_INPUT_form_values.BDLY_INPUT_db_toperiod;  
      var BDLY_INPUT_elect_payment=BDLY_INPUT_form_values.BDLY_INPUT_lb_elect_payment;    
      var BDLY_INPUT_comments=BDLY_INPUT_form_values.BDLY_INPUT_ta_comments;
      var BDLY_INPUT_array_length=parseInt(BDLY_INPUT_electunit.length);
      var BDLY_INPUT_comments_split=[];
      if((Array.isArray(BDLY_INPUT_comments))==true){
        for(var i=0;i<BDLY_INPUT_comments.length;i++)
        {
          if(BDLY_INPUT_comments[i]==''){
            if(i==0)
              BDLY_INPUT_comments_split +=' '
              else
                BDLY_INPUT_comments_split +='^^'+' '; }
          else{
            if(i==0)
              BDLY_INPUT_comments_split +=eilib.ConvertSpclCharString(BDLY_INPUT_comments[i]);
            else
              BDLY_INPUT_comments_split +='^^'+eilib.ConvertSpclCharString(BDLY_INPUT_comments[i]);
          }  
          BDLY_INPUT_invoicedate[i]=eilib.SqlDateFormat(BDLY_INPUT_invoicedate[i]);
          BDLY_INPUT_fromperiod[i]=eilib.SqlDateFormat(BDLY_INPUT_fromperiod[i]);
          BDLY_INPUT_toperiod[i]=eilib.SqlDateFormat(BDLY_INPUT_toperiod[i]);
        }}
      else
      {
        if(BDLY_INPUT_comments=='')
          BDLY_INPUT_comments_split=' ';
        else
          BDLY_INPUT_comments_split=eilib.ConvertSpclCharString(BDLY_INPUT_comments);
        BDLY_INPUT_invoicedate=eilib.SqlDateFormat(BDLY_INPUT_invoicedate);
        BDLY_INPUT_fromperiod=eilib.SqlDateFormat(BDLY_INPUT_fromperiod);
        BDLY_INPUT_toperiod=eilib.SqlDateFormat(BDLY_INPUT_toperiod);    }
      var BDLY_INPUT_insertinto_electricity_withoutcomment = "CALL SP_BIZDLY_ELECTRICITY_INSERT('"+BDLY_INPUT_electunit+"','"+BDLY_INPUT_invoicedate+"','"+BDLY_INPUT_fromperiod+"','"+BDLY_INPUT_toperiod+"','"+BDLY_INPUT_invoiceto+"','"+BDLY_INPUT_elect_amount+"','"+BDLY_INPUT_comments_split+"','"+UserStamp+"',@FLAG_INSERT)";
      BDLY_INPUT_electamountstmt.execute(BDLY_INPUT_insertinto_electricity_withoutcomment);
      BDLY_INPUT_electamountstmt.close();BDLY_INPUT_conn.commit();
    }
    //STAR HUB SAVING PART//
    if(BDLY_INPUT_exptype==2){      
      var  BDLY_INPUT_arrunitvalue=BDLY_INPUT_form_values.BDLY_INPUT_lb_star_unit;
      var find_isArray=(BDLY_INPUT_arrunitvalue.toString()).search(',');
      var BDLY_INPUT_unitnovalue=BDLY_INPUT_form_values.BDLY_INPUT_lb_star_unit;
      var BDLY_INPUT_accnovalue=BDLY_INPUT_form_values.BDLY_INPUT_tb_star_accno;
      var BDLY_INPUT_invoicetovalue=BDLY_INPUT_form_values.BDLY_INPUT_hidden_star_ecnid;
      var BDLY_INPUT_invoicedatevalue=BDLY_INPUT_form_values.BDLY_INPUT_db_star_invoicedate;
      var BDLY_INPUT_amountvalue=BDLY_INPUT_form_values.BDLY_INPUT_tb_star_amount;
      var BDLY_INPUT_fromdatevalue=BDLY_INPUT_form_values.BDLY_INPUT_db_star_fromperiod;
      var BDLY_INPUT_todatevalue=BDLY_INPUT_form_values.BDLY_INPUT_db_star_toperiod;    
      var BDLY_INPUT_commentsvalue=BDLY_INPUT_form_values.BDLY_INPUT_ta_star_comments;
      var BDLY_INPUT_array_length=parseInt(BDLY_INPUT_unitnovalue.length);
      var BDLY_INPUT_comments_split='';
      if((Array.isArray(BDLY_INPUT_commentsvalue))==true){
        for(var i=0;i<BDLY_INPUT_commentsvalue.length;i++)
        {
          if(BDLY_INPUT_commentsvalue[i]==''){
            if(i==0)
              BDLY_INPUT_comments_split +=' '
              else
                BDLY_INPUT_comments_split +='^^'+' '; }
          else{
            if(i==0)
              BDLY_INPUT_comments_split +=eilib.ConvertSpclCharString(BDLY_INPUT_commentsvalue[i]);
            else
              BDLY_INPUT_comments_split +='^^'+eilib.ConvertSpclCharString(BDLY_INPUT_commentsvalue[i]);
          }  
          BDLY_INPUT_invoicedatevalue[i]=eilib.SqlDateFormat(BDLY_INPUT_invoicedatevalue[i]);
          BDLY_INPUT_fromdatevalue[i]=eilib.SqlDateFormat(BDLY_INPUT_fromdatevalue[i]);
          BDLY_INPUT_todatevalue[i]=eilib.SqlDateFormat(BDLY_INPUT_todatevalue[i]);
        }}
      else
      {
        if(BDLY_INPUT_commentsvalue=='')
          BDLY_INPUT_comments_split=' ';
        else
          BDLY_INPUT_comments_split=eilib.ConvertSpclCharString(BDLY_INPUT_commentsvalue);
        BDLY_INPUT_invoicedatevalue=eilib.SqlDateFormat(BDLY_INPUT_invoicedatevalue);
        BDLY_INPUT_fromdatevalue=eilib.SqlDateFormat(BDLY_INPUT_fromdatevalue);
        BDLY_INPUT_todatevalue=eilib.SqlDateFormat(BDLY_INPUT_todatevalue);
      }
      var BDLY_INPUT_starhub_insert="CALL SP_BIZDLY_STARHUB_INSERT('"+BDLY_INPUT_unitnovalue+"','"+BDLY_INPUT_invoicetovalue+"','"+BDLY_INPUT_invoicedatevalue+"','"+BDLY_INPUT_fromdatevalue+"','"+BDLY_INPUT_todatevalue+"','"+BDLY_INPUT_amountvalue+"','"+BDLY_INPUT_comments_split+"','"+UserStamp+"',@FLAG_INSERT)"    
      var BDLY_INPUT_starhub_savestmt = BDLY_INPUT_conn.createStatement(); 
      BDLY_INPUT_starhub_savestmt.execute(BDLY_INPUT_starhub_insert);          
      BDLY_INPUT_starhub_savestmt.close();BDLY_INPUT_conn.commit();
    }
    if((BDLY_INPUT_exptype==9)||(BDLY_INPUT_exptype==8)||(BDLY_INPUT_exptype==7)||(BDLY_INPUT_exptype==11)||(BDLY_INPUT_exptype==4)){
      var BDLY_INPUT_flag=1;
    }else
    {
      var BDLY_INPUT_stmt_flag = BDLY_INPUT_conn.createStatement();
      var BDLY_INPUT_flag_rs=BDLY_INPUT_stmt_flag.executeQuery("SELECT @FLAG_INSERT");
      while(BDLY_INPUT_flag_rs.next())
        var BDLY_INPUT_flag=BDLY_INPUT_flag_rs.getString("@FLAG_INSERT")
        BDLY_INPUT_flag_rs.close();BDLY_INPUT_stmt_flag.close();
    } 
    if(BDLY_INPUT_exptype==5)
      BDLY_INPUT_refresh=BDLY_INPUT_get_values(BDLY_INPUT_tb_gigunitno,BDLY_INPUT_exptype)
      if((BDLY_INPUT_exptype==2)||(BDLY_INPUT_exptype==3)||(BDLY_INPUT_exptype==1))
      BDLY_INPUT_refresh=BDLY_INPUT_get_unitno(BDLY_INPUT_exptype)
      return [BDLY_INPUT_refresh,BDLY_INPUT_flag];
    BDLY_INPUT_conn.close();    
  }
}
catch(err)
{
}
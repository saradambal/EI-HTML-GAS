//*******************************************PAYMENT ENTRY-TERMINATED CUSTOMER*********************************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY:KUMAR
//VER 1.00-SD:19/06/2014 ED:19/06/2014,TRACKER NO:672 added conn failure message and did paiddate validation(mindate as customer 1st lp startdate and maxdate as sysdate).
//VER 0.09-SD:06/06/2014 ED:06/06/2014,TRACKER NO:672 Changed preloader and jquery and css link.
//VER 0.08-SD:16/05/2014 ED:16/05/2014,TRACKER NO:672 Changed temp table dynamically in script side.
//VER 0.07-SD:22/04/2014 ED:22/04/2014,TRACKER NO:672 Changed Table name and Restricted DP manual inputs.
//VER 0.06-SD:26/03/2014 ED:26/03/2014,TRACKER NO:672 changed for period DP format.
//VER 0.05-SD:06/03/2014 ED:06/03/2014,TRACKER NO:672 Changed uld_id and removed repeated queries functions and used array concepts.
//VER 0.04-SD:07/02/2014 ED:07/02/2014,TRACKER NO:672 changed preloader path,title alignment,gave error msg not unit aval
//VER 0.03-SD:31/12/2013 ED:01/01/2014,TRACKER NO:672 Removed sleep functions and multiple connections.did paid date validation.
//VER 0.02-SD:17/12/2013 ED:17/12/2013, TRACKER NO:672- Changed gs and html file and for period validation function getting from eilib. in ver 0.02 
//VER 0.01-INITIAL VERSION, SD:04/09/2013 ED:03/12/2013,TRACKER NO:171
//*********************************************************************************************************//
try
{
  /**************************INITIAL TABLE LOAD FUNCTION************************************/
  function FIN_TERM_ENTRY_payment_commonvalues()
  {
    var FIN_TERM_ENTRY_conn=eilib.db_GetConnection();
    var FIN_TERM_ENTRY_unit_array =FIN_payment_Customer('nounit');
    /************************PAYMENT************************/
    var FIN_TERM_ENTRY_payment_array=eilib.getPaymentProfile(FIN_TERM_ENTRY_conn);
    /************************ERROR MESSAGES************************/
    var FIN_TERM_ENTRY_error_code='2,3,92,248,309';
    var FIN_TERM_ENTRY_error_array=eilib.GetErrorMessageList(FIN_TERM_ENTRY_conn, FIN_TERM_ENTRY_error_code);
    var TERM_PAYMENT_ENTRY={unit:FIN_TERM_ENTRY_unit_array,payment:FIN_TERM_ENTRY_payment_array,error:FIN_TERM_ENTRY_error_array.errormsg}
    return TERM_PAYMENT_ENTRY;
    FIN_TERM_ENTRY_conn.close();
  }
  /****************************CUSTOMER NAME FOR SELECTED UNIT*****************************/
  function FIN_payment_Customer(unit)
  {
    var FIN_TERM_ENTRY_customer_array=[];
    var FIN_TERM_ENTRY_conn =eilib.db_GetConnection();
    var temptabletermcuststmt=FIN_TERM_ENTRY_conn.createStatement();
    var termtemptablequery="CALL SP_PAYMENT_ENTRY_TERMINATED_CUSTOMER('"+UserStamp+"',@PAYMENT_ENTRY_TERMINATED_CUSTOMER)";
    temptabletermcuststmt.execute(termtemptablequery);
    var temptableresult=temptabletermcuststmt.executeQuery("SELECT @PAYMENT_ENTRY_TERMINATED_CUSTOMER");
    if(temptableresult.next())
    {
      var temptablename=temptableresult.getString(1);
    }
    temptableresult.close();
    temptabletermcuststmt.close();
    var FIN_TERM_ENTRY_customerstmt = FIN_TERM_ENTRY_conn.createStatement();
    var FIN_TERM_ENTRY_allrecheckinunit="SELECT UNIT_NO,CUSTOMER_ID,CONCAT(CUSTOMER_FIRST_NAME,'_',CUSTOMER_LAST_NAME)AS CUSTOMERNAME,CED_REC_VER FROM "+temptablename+" ORDER BY UNIT_NO";
    var FIN_TERM_ENTRY_customerquery = "SELECT UNIT_NO,CUSTOMER_ID,CONCAT(CUSTOMER_FIRST_NAME,'_',CUSTOMER_LAST_NAME)AS CUSTOMERNAME,CED_REC_VER FROM "+temptablename+" WHERE UNIT_NO="+unit+" ORDER BY CUSTOMERNAME ASC";
    if(unit=='nounit')
    { var FIN_TERM_ENTRY_customerresult = FIN_TERM_ENTRY_customerstmt.executeQuery(FIN_TERM_ENTRY_allrecheckinunit);}
    else
    {   FIN_TERM_ENTRY_customerresult = FIN_TERM_ENTRY_customerstmt.executeQuery(FIN_TERM_ENTRY_customerquery);}
    while(FIN_TERM_ENTRY_customerresult.next())
    {
      FIN_TERM_ENTRY_customer_array.push({unit:FIN_TERM_ENTRY_customerresult.getString("UNIT_NO"),customername:FIN_TERM_ENTRY_customerresult.getString("CUSTOMERNAME"),customerid:FIN_TERM_ENTRY_customerresult.getString("CUSTOMER_ID")});
    }
    FIN_TERM_ENTRY_customerresult.close();
    FIN_TERM_ENTRY_customerstmt.close();
    var temptabledropstmt=FIN_TERM_ENTRY_conn.createStatement();
    temptabledropstmt.execute("DROP TABLE IF EXISTS "+temptablename+"");
    temptabledropstmt.close();
    return FIN_TERM_ENTRY_customer_array;
    FIN_TERM_ENTRY_conn.close();
  }
  
  /*************************FORPERIOD VALIDATION FOR SELECTED REC VER ************************************/
  function FIN_TERM_ENTRY_forperiod_validation(unit,customer)
  {
    var FIN_TERM_ENTRY_conn=eilib.db_GetConnection();
    var Term_forperion=eilib.Payment_forperiod_TermCustvalidation(FIN_TERM_ENTRY_conn,unit, customer);
    FIN_TERM_ENTRY_conn.close();
    return Term_forperion;
  }
  /************************INPUT SAVE FUNCTION*********************************************/
  function FIN_TERM_ENTRY_input_details(termination)
  {
    var FIN_TERM_ENTRY_conn=eilib.db_GetConnection();
    var unit=termination.FIN_TERM_ENTRY_lb_unit;
    var payment=termination.FIN_TERM_ENTRY_lb_payment;
    var recverdetails=termination.FIN_TERM_ENTRY_lb_recver;
    var recversplit=recverdetails.split('/');
    var recver=recversplit[2];
    var customerid=recversplit[3];
    var amount=termination.FIN_TERM_ENTRY_tb_amount;
    var forperiod=termination.FIN_TERM_ENTRY_db_forperiod;
    var paiddate=eilib.SqlDateFormat(termination.FIN_TERM_ENTRY_db_paiddate);
    var comments=termination.FIN_TERM_ENTRY_ta_comments;
    if(comments!="")
    {  comments=eilib.ConvertSpclCharString(comments) }
    var amount_flag='';
    var FIN_TERM_ENTRY_stmt=FIN_TERM_ENTRY_conn.createStatement();
    var FIN_TERM_ENTRY_query="CALL SP_PAYMENT_DETAIL_INSERT('"+unit+"','"+customerid+"','"+payment+"','"+recver+"','"+amount+"','"+forperiod+"','"+paiddate+"','"+amount_flag+"','"+comments+"','"+UserStamp+"',"+null+",@OUTPUT_FINAL_MESSAGE)";
    FIN_TERM_ENTRY_stmt.execute(FIN_TERM_ENTRY_query);
    var paymententryresult=FIN_TERM_ENTRY_stmt.executeQuery("SELECT @OUTPUT_FINAL_MESSAGE");
    if(paymententryresult.next())
    {
      var errormessage=paymententryresult.getString(1);
    }
    paymententryresult.close();
    FIN_TERM_ENTRY_stmt.close();
    if(errormessage==null || errormessage=="" || errormessage=='null' || errormessage==' ')
    {    return 'success';   }
    else 
    {    return errormessage;}
    FIN_TERM_ENTRY_conn.close();
  }
}
catch(err)
{
}
//*******************************************OCBC*********************************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY:KUMAR
//VER 1.05- SD:19/09/2014 ED:19/09/2014,TRACKER NO:741,Implemented preloader and msgbox position script
//VER 1.04- SD:03/09/2014 ED:03/09/2014 TRACKER NO:741,added ref-id sorting in ocbc bank records select query.
//VER 1.03- SD:22/08/2014 ED:22/08/2014TRACKER NO:742,Updated new jquery and css links and auto grow script line.
//VER 1.02- SD:11/07/2014 ED:11/07/2014 TRACKER NO:742,Did multiple customer radio buttons clear after saved record.
//VER 1.01- SD:08/07/2014 ED:08/07/2014 TRACKER NO:742,changed amount box maximum digits 4 to 5 in obdc direct updation form.
//VER 1.00- SD:21/06/2014 ED:21/06/2014 TRACKER NO:741,implemented conn failure message.
//VER 0.09- SD:06/06/2014 ED:06/06/2014 TRACKER NO:741,Changed preloader and jquery and css links.
//VER 0.08- SD:27/05/2014 ED:27/05/2014 TRACKER NO:741,Changed message box name PAYMENT ENTRY To OCBC .
//VER 0.07- SD:10/05/2014 ED:16/05/2014 TRACKER NO:741,Payment,Deposit,process fee amt splitted if customer have more then one LP in same month.
//VER 0.06- SD:18/04/2014 ED:18/04/2014 TRACKER NO:741,changed OCBC table header names and add one col in html table.
//VER 0.05- SD:26/03/2014 ED:26/03/2014 TRACKER NO:741,Changed OCBC form DP should show upto currentmonth and direct updation DP script changed.
//VER 0.04- SD:10/03/2014 TRACKER NO:741,changed uld and removed repeated queires and used array cocept.
//VER 0.03- ED:07/02/2014 TRACKER NO:741,Did all CR in OCBC direct updation form.And Did header Fixation in OCBC direct updation form.
//VER 0.02- SD:13/12/2013 ED:13/12/2013,TRACKER NO:171Added Return function script in ver0.02
//VER 0.01-INITIAL VERSION-SD:13/09/2013 ED:14/09/2013,TRACKER NO:171
//*********************************************************************************************************//
try
{
  //////////////CUSTOMER NAME FOR SELECTED UNIT/////////////
  function FIN_OCBC_Customer(unit,no)
  {
    var FIN_OCBC_DU_conn=eilib.db_GetConnection();
    var FIN_ENTRYcustomername_array=[];
    var FIN_ENTRY_conn=eilib.db_GetConnection();
    var FIN_ENTRYstmt = FIN_ENTRY_conn.createStatement();
    var FIN_ENTRYactivecustomerquery="SELECT DISTINCT UNIT_NO,CUSTOMER_ID,CUSTOMERNAME FROM VW_PAYMENT_CURRENT_ACTIVE_CUSTOMER WHERE UNIT_NO="+unit+" ORDER BY UNIT_NO,CUSTOMERNAME"
    var FIN_ENTRY_customerresult = FIN_ENTRYstmt.executeQuery(FIN_ENTRYactivecustomerquery);
    while(FIN_ENTRY_customerresult.next())
    {
      FIN_ENTRYcustomername_array.push({unit:FIN_ENTRY_customerresult.getString("UNIT_NO"),customerid:FIN_ENTRY_customerresult.getString("CUSTOMER_ID"),customername:FIN_ENTRY_customerresult.getString("CUSTOMERNAME")});
    }
    var ocbc_autoamountstmt=FIN_OCBC_DU_conn.createStatement();
    var ocbc_autoamountquery="SELECT OBR_DEBIT_AMOUNT,OBR_CREDIT_AMOUNT FROM OCBC_BANK_RECORDS WHERE OBR_ID="+no+"";
    var ocbc_autoamountresult=ocbc_autoamountstmt.executeQuery(ocbc_autoamountquery);
    if(ocbc_autoamountresult.next())
    {
      var debitamount=ocbc_autoamountresult.getString(1);
      var creditamount=ocbc_autoamountresult.getString(2);
      if(debitamount!=null && debitamount!='0.00')
      {  var amountautofill=debitamount; }
      else
      {  amountautofill=creditamount; }
    }
    ocbc_autoamountresult.close();
    ocbc_autoamountstmt.close();
    var return_array=[FIN_ENTRYcustomername_array,no,amountautofill]
    return return_array;
    FIN_OCBC_DU_conn.close();
  }
  ////////////OCBC_RECORDS FOR SELECTED MONTH////////////////
  function FIN_OCBC_DU_selectedmonthdetails(date)
  {
    var FIN_OCBC_DU_conn=eilib.db_GetConnection();
    var selectedmonthdate=date.FIN_OCBC_DU_selectedmonth;
    var ocbcselectedmonth=eilib.GetForperiodDateFormat(selectedmonthdate,selectedmonthdate);
    var ocbcforperiod=ocbcselectedmonth.frmdate;
    var ocbcforperiodsplit=ocbcforperiod.split('-');
    var ocbcselectmonth=ocbcforperiodsplit[0]+'-'+ocbcforperiodsplit[1];
    var FIN_OCBC_DU_stmt=FIN_OCBC_DU_conn.createStatement();
    var FIN_OCBC_DU_query="SELECT OBR.OBR_ID,OCA.OCN_DATA AS CURRENCY,OCB.OCN_DATA AS ACCOUNT,OBR.OBR_OPENING_BALANCE,OBR.OBR_CLOSING_BALANCE,OBR.OBR_PREVIOUS_BALANCE,OBR.OBR_LAST_BALANCE,OBR.OBR_OLD_BALANCE,OBR.OBR_NO_OF_CREDITS,OBR.OBR_NO_OF_DEBITS,OBR.OBR_POST_DATE,OBR.OBR_TRANS_DATE,OBR.OBR_VALUE_DATE,OBR.OBR_D_AMOUNT,OBR.OBR_DEBIT_AMOUNT,OBR.OBR_CREDIT_AMOUNT,OCN.OCN_DATA,OBR.OBR_CLIENT_REFERENCE,OBR.OBR_TRANSACTION_DESC_DETAILS,OBR.OBR_BANK_REFERENCE,OBR.OBR_TRX_TYPE,OBR.OBR_REFERENCE FROM OCBC_CONFIGURATION OCN,OCBC_BANK_RECORDS OBR LEFT JOIN OCBC_CONFIGURATION OCA ON OBR.OBR_CURRENCY=OCA.OCN_ID LEFT JOIN OCBC_CONFIGURATION OCB ON OBR.OBR_ACCOUNT_NUMBER=OCB.OCN_ID  WHERE OBR.OCN_ID=OCN.OCN_ID AND ((OBR.OBR_POST_DATE LIKE '"+ocbcselectmonth+"%' AND OBR.OBR_TRANS_DATE LIKE '"+ocbcselectmonth+"%') OR (OBR.OBR_POST_DATE LIKE '"+ocbcselectmonth+"%' AND OBR.OBR_VALUE_DATE LIKE '"+ocbcselectmonth+"%')OR (OBR.OBR_TRANS_DATE LIKE '"+ocbcselectmonth+"%' AND OBR.OBR_VALUE_DATE LIKE '"+ocbcselectmonth+"%')) ORDER BY OBR.OBR_VALUE_DATE,OBR_REF_ID";
//  old ocbc records select query
//    var FIN_OCBC_DU_query="SELECT OBR.OBR_ID,OCA.OCN_DATA AS CURRENCY,OCB.OCN_DATA AS ACCOUNT,OBR.OBR_OPENING_BALANCE,OBR.OBR_CLOSING_BALANCE,OBR.OBR_PREVIOUS_BALANCE,OBR.OBR_LAST_BALANCE,OBR.OBR_OLD_BALANCE,OBR.OBR_NO_OF_CREDITS,OBR.OBR_NO_OF_DEBITS,OBR.OBR_POST_DATE,OBR.OBR_TRANS_DATE,OBR.OBR_VALUE_DATE,OBR.OBR_D_AMOUNT,OBR.OBR_DEBIT_AMOUNT,OBR.OBR_CREDIT_AMOUNT,OCN.OCN_DATA,OBR.OBR_CLIENT_REFERENCE,OBR.OBR_TRANSACTION_DESC_DETAILS,OBR.OBR_BANK_REFERENCE,OBR.OBR_TRX_TYPE,OBR.OBR_REFERENCE FROM OCBC_CONFIGURATION OCN,OCBC_BANK_RECORDS OBR LEFT JOIN OCBC_CONFIGURATION OCA ON OBR.OBR_CURRENCY=OCA.OCN_ID LEFT JOIN OCBC_CONFIGURATION OCB ON OBR.OBR_ACCOUNT_NUMBER=OCB.OCN_ID  WHERE OBR.OCN_ID=OCN.OCN_ID AND  OBR.OBR_VALUE_DATE BETWEEN '"+ocbcselectedmonth.frmdate+"' AND '"+ocbcselectedmonth.todate+"' ORDER BY OBR.OBR_VALUE_DATE,OBR_REF_ID";
    var FIN_OCBC_DU_selectedmonthresult=FIN_OCBC_DU_stmt.executeQuery(FIN_OCBC_DU_query);
    var FIN_OCBC_DU_monthrecords_array=[];
    while(FIN_OCBC_DU_selectedmonthresult.next())
    {
      var sno=FIN_OCBC_DU_selectedmonthresult.getString("OBR_ID");
      var accno=FIN_OCBC_DU_selectedmonthresult.getString("ACCOUNT");
      var type=FIN_OCBC_DU_selectedmonthresult.getString("CURRENCY");
      var open_bal=FIN_OCBC_DU_selectedmonthresult.getString("OBR_OPENING_BALANCE");
      var close_bal=FIN_OCBC_DU_selectedmonthresult.getString("OBR_CLOSING_BALANCE");
      var today_bal=FIN_OCBC_DU_selectedmonthresult.getString("OBR_PREVIOUS_BALANCE");
      var credit=FIN_OCBC_DU_selectedmonthresult.getString("OBR_LAST_BALANCE");
      var debit=FIN_OCBC_DU_selectedmonthresult.getString("OBR_OLD_BALANCE");
      var creditid=FIN_OCBC_DU_selectedmonthresult.getString("OBR_NO_OF_CREDITS");
      var debitid=FIN_OCBC_DU_selectedmonthresult.getString("OBR_NO_OF_DEBITS");
      var opendate=eilib.SqlDateFormat(FIN_OCBC_DU_selectedmonthresult.getString("OBR_POST_DATE"));
      var processdate=eilib.SqlDateFormat(FIN_OCBC_DU_selectedmonthresult.getString("OBR_TRANS_DATE"));
      var closedate=eilib.SqlDateFormat(FIN_OCBC_DU_selectedmonthresult.getString("OBR_VALUE_DATE"));
      var debits=FIN_OCBC_DU_selectedmonthresult.getString("OBR_D_AMOUNT");
      var debit_amt=FIN_OCBC_DU_selectedmonthresult.getString("OBR_DEBIT_AMOUNT");
      if(debit_amt==null){debit_amt="";}
      var credit_amt=FIN_OCBC_DU_selectedmonthresult.getString("OBR_CREDIT_AMOUNT");
      if(credit_amt==null){credit_amt=""}
      var trans_type=FIN_OCBC_DU_selectedmonthresult.getString("OCN_DATA");
      var client_ref=FIN_OCBC_DU_selectedmonthresult.getString("OBR_CLIENT_REFERENCE");
      if(client_ref==null)
      {
        client_ref=""; 
      }
      var trans_desc=FIN_OCBC_DU_selectedmonthresult.getString("OBR_TRANSACTION_DESC_DETAILS");
      var bank_ref=FIN_OCBC_DU_selectedmonthresult.getString("OBR_BANK_REFERENCE");
      if(bank_ref==null)
      {
        bank_ref="";
      }
      var trxtype=FIN_OCBC_DU_selectedmonthresult.getString("OBR_TRX_TYPE");
      if(trxtype==null)
      {
       trxtype=""; 
      }
      var update_ref=FIN_OCBC_DU_selectedmonthresult.getString("OBR_REFERENCE");
      var ocbc_records={OCBC_ID:sno,ACCNO:accno,TYPE:type,OPENBAL:open_bal,CLOSEBAL:close_bal,TODAYBAL:today_bal,CREDIT:credit,DEBIT:debit,CREDITID:creditid,DEBITID:debitid,OPENDATE:opendate,PROCESSDATE:processdate,CLOSEDATE:closedate,DEBITS:debits,DEBITAMOUNT:debit_amt,CREDITAMOUNT:credit_amt,TRANSACTIONTYPE:trans_type,CLIENTREF:client_ref,TRANSDESC:trans_desc,BANKREF:bank_ref,UPDATE:update_ref,TRXTYPE:trxtype};
      FIN_OCBC_DU_monthrecords_array.push(ocbc_records);
    }
    return FIN_OCBC_DU_monthrecords_array;
    FIN_OCBC_DU_conn.close();
  }
  ///////////OCBC_RECORD SAVE FUNCTION////////////
  function FIN_OCBC_recordssave(no,unit,customer,recver,payment,amount,amountflag,forperiod,comments)
  {
    var recverid=recver.split('/');
    var recver=recverid[3];
    var FIN_OCBC_DU_conn=eilib.db_GetConnection();
    if(comments!="")
    {
      comments=eilib.ConvertSpclCharString(comments);
    }
    var paiddate=null;
    var FIN_ENTRY_stmt=FIN_OCBC_DU_conn.createStatement();
    var FIN_ENTRY_query="CALL SP_OCBC_PAYMENT_DETAIL_INSERT("+unit+","+customer+","+recver+",'"+payment+"',"+amount+",'"+amountflag+"','"+forperiod+"','"+comments+"','"+UserStamp+"',"+no+",@FINAL_MESSAGE)";
    FIN_ENTRY_stmt.execute(FIN_ENTRY_query);
    var paymententryresult=FIN_ENTRY_stmt.executeQuery("SELECT @FINAL_MESSAGE");
    if(paymententryresult.next())
    {
      var errormessage=paymententryresult.getString(1);
    }
    paymententryresult.close();
    FIN_ENTRY_stmt.close();
    var return_array=[errormessage,no];
    return return_array;
    FIN_OCBC_DU_conn.close();
  }
   function FIN_OCBC_DU_commonvalues()
  {
    var FIN_OCBC_DU_conn=eilib.db_GetConnection();
    /////////////////UNIT////////////////////////
    var FIN_OCBC_DU_unit_array =eilib.GetActiveUnit(FIN_OCBC_DU_conn);
    ///////////////////PAYMENT/////////////////
    var FIN_OCBC_DU_payment_array =eilib.getPaymentProfile(FIN_OCBC_DU_conn);
        ///////////////////ERROR MESSAGES////////////////////////
    var FIN_OCBC_DU_errorstmt = FIN_OCBC_DU_conn.createStatement();
    var FIN_OCBC_DU_error_code='2,3,309';
    var FIN_OCBC_DU_error_array=eilib.GetErrorMessageList(FIN_OCBC_DU_conn, FIN_OCBC_DU_error_code);
    var FIN_OCBC_DU_RESULTS={unit:FIN_OCBC_DU_unit_array,payment:FIN_OCBC_DU_payment_array,error:FIN_OCBC_DU_error_array.errormsg}
    return FIN_OCBC_DU_RESULTS;
    FIN_OCBC_DU_conn.close();
  }
   function FIN_OCBC_FORPERIOD_validation(unit,customer,id)
  {
    var FIN_ENTRY_conn=eilib.db_GetConnection();
    var CUSTOMER_RECVER_array=eilib.Payment_forperiod_ActiveCustvalidation(FIN_ENTRY_conn,unit, customer);
    var return_array=[CUSTOMER_RECVER_array[0],CUSTOMER_RECVER_array[1],id];
    return return_array;
    FIN_ENTRY_conn.close();
  }
}
catch(err)
{
}
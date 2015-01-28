//**************************************PAYMENT ENTRY FOR ACTIVE CUSTOMER*********************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY:KUMAR
//VER 1.08- SD:20/10/2014 ED:20/10/2014,TRACKER NO:787,changed input parameter when calling save sp-changed comma instead of & operator
//DONE BY:PUNI
//VER 1.07- SD:07/10/2014 ED:07/10/2014,TRACKER NO:787,1.added script to hide preloader after menu n form loads,2.Corrected some preloader and msgbox position 
//DONE BY:KUMAR
//VER 1.06- SD:19/09/2014 ED:19/09/2014,TRACKER NO:787,Implemented preloader and msgbox position script 
//VER 1.05- SD:22/08/2014 ED:22/08/2014,TRACKER NO:787 Updated new jquery and css links and add autogrow line.
//VER 1.04- SD:28/06/2014 ED:28/06/2014,TRACKER NO:787 did delete row button validation and changed amount box maximum digits 4 to 5.
//VER 1.03- SD:18/06/2014 ED:18/06/2014,TRACKER NO:787 Cleared form validations issues and did paiddate validation in payment entry form.
//VER 1.02- SD:08/06/2014 ED:08/06/2014,TRACKER NO:787 cleared submit button validation issue.
//VER 1.01- SD:06/06/2014 ED:06/06/2014,TRACKER NO:787 Changed jquery and css link.
//VER 1.00- SD:16/04/2014 ED:16/04/2014,TRACKER NO:787 Cleared LP listbox issue and set DP for +2 years oly show in initially AND restricted DP manual inputs.
//VER 0.09- SD:25/03/2014 ED:25/03/2014,TRACKER NO:735 some forperiod DP not working properly so i changed DP.
//VER 0.08- SD:06/03/2014 ED:06/03/2014,TRACKER NO:735 changed ULD_ID,updated return flag and removed repeated queries in gs script and used array values in html script.
//VER 0.07- SD:21/02/2014 ED:21/02/2014,TRACKER NO 735 Updated comments.
//VER 0.06- SD:13/02/2014 ED:13/02/2014,TRACKER NO 735 Cleared all issues and did deposit refund validation,cleared reset form issue.
//VER 0.05-SD:12/01/2014 ED:12/01/2014,TRACKER NO 682,changed preloader image path,title alignment,identifier.
//VER 0.04- SD:31/12/2013 ED:01/01/2013,Removed sleep functiuons and multilple connectios
//VER 0.03- SD:18/12/2013 ED:18/12/2013,Did paiddate validation and set drop down for month and year in datepicker.
//VER 0.02- SD:13/12/2013 ED:13/12/2013,TRACKER NO:171Added Return function script in ver0.02
//VER 0.01-INITIAL VERSION-SD:13/09/2013 ED:14/09/2013,TRACKER NO:171
//*********************************************************************************************************//
try
{
  /*********************CUSTOMER NAME FOR SELECTED UNIT*********************/
  function FIN_ENTRY_Customer(unit,no)
  {
    var FIN_ENTRYcustomername_array=[];
    var FIN_ENTRY_conn=eilib.db_GetConnection();
    var FIN_ENTRYstmt = FIN_ENTRY_conn.createStatement();
    var FIN_ENTRYactivecustomerquery="SELECT DISTINCT UNIT_NO,CUSTOMER_ID,CUSTOMERNAME FROM VW_PAYMENT_CURRENT_ACTIVE_CUSTOMER WHERE UNIT_NO="+unit+" ORDER BY CUSTOMERNAME ASC"
    var FIN_ENTRY_customerresult = FIN_ENTRYstmt.executeQuery(FIN_ENTRYactivecustomerquery);
    while(FIN_ENTRY_customerresult.next())
    {
      FIN_ENTRYcustomername_array.push({unit:FIN_ENTRY_customerresult.getString("UNIT_NO"),customerid:FIN_ENTRY_customerresult.getString("CUSTOMER_ID"),customername:FIN_ENTRY_customerresult.getString("CUSTOMERNAME")});
    }
    var return_array=[FIN_ENTRYcustomername_array,no];
    return return_array;
    FIN_ENTRY_customerresult.close();
    FIN_ENTRYstmt.close();
    FIN_ENTRY_conn.close();
  }
  /*********************RENTAL DETAILS SAVING FUNCTION*********************/
  function FIN_ENTRY_input_details(rental)
  {
    var FIN_ENTRY_conn=eilib.db_GetConnection();
    var FIN_ENTRY_arrunitvalue=rental.FIN_ENTRY_lb_unit;
    var find=(FIN_ENTRY_arrunitvalue.toString()).search(',');
    if(find==-1)
    {
      var FIN_ENTRY_unitnovalue=[rental.FIN_ENTRY_lb_unit];
      var FIN_ENTRY_customervalue=[rental.FIN_ENTRY_lb_customer];
      var FIN_ENTRY_paymentvalue=[rental.FIN_ENTRY_lb_payment];
      var FIN_ENTRY_amountvalue=[rental.FIN_ENTRY_tb_amount];
      var FIN_ENTRY_forperiodvalue=[rental.FIN_ENTRY_db_period];
      var FIN_ENTRY_paiddatevalue=[rental.FIN_ENTRY_db_paiddate];
      var FIN_ENTRY_commentsvalue=[rental.FIN_ENTRY_ta_comments];
      var FIN_ENTRY_array_length=FIN_ENTRY_unitnovalue.length;
      var FIN_ENTRY_customerid=[rental.customerids];
      var FIN_ENTRY_amountflag=[rental.FIN_ENTRY_tb_checkboxamount];
      var FIN_ENTRY_recverflag=[rental.FIN_ENTRY_recheckinflag];
    }
    else
    {
      FIN_ENTRY_unitnovalue=rental.FIN_ENTRY_lb_unit;
      FIN_ENTRY_customervalue=rental.FIN_ENTRY_lb_customer;
      FIN_ENTRY_paymentvalue=rental.FIN_ENTRY_lb_payment;
      FIN_ENTRY_amountvalue=rental.FIN_ENTRY_tb_amount;
      FIN_ENTRY_forperiodvalue=rental.FIN_ENTRY_db_period;
      FIN_ENTRY_paiddatevalue=rental.FIN_ENTRY_db_paiddate;
      FIN_ENTRY_commentsvalue=rental.FIN_ENTRY_ta_comments;
      FIN_ENTRY_customerid=rental.customerids;
      FIN_ENTRY_recverflag=rental.FIN_ENTRY_recheckinflag;
      FIN_ENTRY_array_length=parseInt(FIN_ENTRY_unitnovalue.length);
      FIN_ENTRY_amountflag=rental.FIN_ENTRY_tb_checkboxamount;
    }
    if(FIN_ENTRY_amountflag==undefined)
    {
      var amount_flag=null;
    }
    for(var i=0;i<FIN_ENTRY_array_length;i++)
    {
      var amount_flag=FIN_ENTRY_amountflag[i];
      if(amount_flag==""|| amount_flag==undefined) {amount_flag=' ';}
      var customerid=FIN_ENTRY_customerid[i]
      var recverflag=FIN_ENTRY_recverflag[i].split('/');
      var recver=recverflag[3];
      if(i==0)
      {
        var units=FIN_ENTRY_unitnovalue[i];
        var customerids=customerid;
        var payments=FIN_ENTRY_paymentvalue[i];
        var amount=FIN_ENTRY_amountvalue[i];
        var forperiods=FIN_ENTRY_forperiodvalue[i];
        var paiddates=eilib.SqlDateFormat(FIN_ENTRY_paiddatevalue[i]);
        var comments=eilib.ConvertSpclCharString(FIN_ENTRY_commentsvalue[i]);
        var amountflags=amount_flag;
        var recvers=recver;
      }
      else
      {
        units=units+','+FIN_ENTRY_unitnovalue[i];
        customerids=customerids+','+customerid;
        payments=payments+','+FIN_ENTRY_paymentvalue[i];
        amount=amount+','+FIN_ENTRY_amountvalue[i];
        forperiods=forperiods+','+FIN_ENTRY_forperiodvalue[i];
        paiddates=paiddates+','+eilib.SqlDateFormat(FIN_ENTRY_paiddatevalue[i]);
        comments=comments+'^^'+eilib.ConvertSpclCharString(FIN_ENTRY_commentsvalue[i]);
        amountflags=amountflags+','+amount_flag;
        recvers=recvers+','+recver;
      }
    }
    var FIN_ENTRY_stmt=FIN_ENTRY_conn.createStatement();
    var FIN_ENTRY_query="CALL SP_PAYMENT_DETAIL_INSERT('"+units+"','"+customerids+"','"+payments+"','"+recvers+"','"+amount+"','"+forperiods+"','"+paiddates+"','"+amountflags+"','"+comments+"','"+UserStamp+"',"+null+",@OUTPUT_FINAL_MESSAGE)"
    FIN_ENTRY_stmt.execute(FIN_ENTRY_query);
    var paymententryresult=FIN_ENTRY_stmt.executeQuery("SELECT @OUTPUT_FINAL_MESSAGE");
    if(paymententryresult.next())
    {
      var errormessage=paymententryresult.getString(1);
      Logger.log(errormessage+":errormessage")
    }
    paymententryresult.close();
    FIN_ENTRY_stmt.close();
    return errormessage;
    FIN_ENTRY_conn.close();
  }
  function FIN_ENTRY_commonvalues()
  {
    var FIN_ENTRY_conn=eilib.db_GetConnection();
    /*********************UNIT*********************/
    var FIN_ENTRY_unit_array =eilib.GetActiveUnit(FIN_ENTRY_conn);
    /*********************PAYMENT*********************/
    var FIN_ENTRY_payment_array=eilib.getPaymentProfile(FIN_ENTRY_conn);
    /*********************ERROR MESSAGES*********************/
    var FIN_ENTRY_error_code ='2,3,248,309';
    var FIN_ENTRY_error_array=eilib.GetErrorMessageList(FIN_ENTRY_conn, FIN_ENTRY_error_code);
    var FIN_ENTRY_RESULTS={unit:FIN_ENTRY_unit_array,payment:FIN_ENTRY_payment_array,error:FIN_ENTRY_error_array.errormsg}
    return FIN_ENTRY_RESULTS;
    FIN_ENTRY_conn.close();
  }
  /*********************FOR PERIOD VALIDATION *********************/
  function FIN_ENTRY_FORPERIOD_validation(unit,customer,id)
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
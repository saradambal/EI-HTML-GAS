//**********************************************CHEQUE ENTRY**********************************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY:KUMAR
//VER 1.03- SD:19/09/2014 ED:19/09/2014,TRACKER NO:676,Implemented preloader and msgbox position script
//VER 1.02- SD:22/08/2014 ED:22/08/2014,TRACKER NO:676 Updated new jquery and css links and add autogrow line.
//VER 1.01- SD:20/06/2014 ED:20/06/2014,TRACKER NO:676,Removed Datebox when cheque status is cancelled.
//VER 1.00- SD:19/06/2016 ED:19/06/2014,TRACKER NO,676,Did cheque date validation(mindate as jan-2005 and maxdate as sysdate+2years)and added conn error message.
//VER 0.09- SD:06/06/2014 ED:06/06/2014,TRACKER NO:676,changed preloader and jquery,css links.
//VER 0.08- SD:19/04/2014 ED:19/04/2014,TRACKER NO :676 Restricted DP manual input using jquery common class.
//VER 0.07- SD:08/03/2014 ED:08/03/2014,TRACKER NO :676 Changed ULD id and fixed length for all text boxs.
//VER 0.06- SD:27/01/2014 ED:27/01/2014,TRACKER NO :171 Did Error messages getting from Eilib.
//VER 0.05- SD:30/12/2013 ED:30/12/2013,TRACKER NO :171 did unit no validation nw unitno textbox ll accept comma in ver 0.05
//VER 0.04- SD:17/12/2013 ED:17/12/2013,TRACKER NO :171 did cheque datevalidation.
//VER 0.03- SD:03/12/2013 ED:03/12/2013,TRACKER NO:171Added Return function script in ver0.03
//VER 0.02- SD:30/11/2013 ED:30/11/2013,TRACKER NO:171-changed html file name and gs file name in ver0.02
//VER 0.01-INITIAL VERSION-SD:14/09/2013 ED:17/09/2013,TRACKER NO:171
//*********************************************************************************************************//
try
{
  function CHEQUE_ENTRY_processFormSubmit(cheque_date,chequeno,chequeto,chequefor,chequeamount,chequeunit,chequecomments)
  {
    var CHEQUE_ENTRY_conn=eilib.db_GetConnection();
    var chequedate=eilib.SqlDateFormat(cheque_date);
    if(chequecomments!="")
    {
      chequecomments=eilib.ConvertSpclCharString(chequecomments);
    }
    var CHEQUE_ENTRY_stmt=CHEQUE_ENTRY_conn.createStatement();
    var CHEQUE_ENTRY_QUERY="CALL SP_CHEQUE_INSERT('"+chequedate+"','"+chequeto+"',"+chequeno+",'"+chequefor+"',"+chequeamount+",'"+chequeunit+"','"+chequecomments+"','"+UserStamp+"',@CHEQUEFLAG)";
    CHEQUE_ENTRY_stmt.execute(CHEQUE_ENTRY_QUERY);
    var CHEQUE_ENTRY_insertresult=CHEQUE_ENTRY_stmt.executeQuery("SELECT @CHEQUEFLAG");
    if(CHEQUE_ENTRY_insertresult.next())
    {
      var returnflag=CHEQUE_ENTRY_insertresult.getString(1);
    }
    CHEQUE_ENTRY_insertresult.close();
    CHEQUE_ENTRY_stmt.close();
    return returnflag;
    CHEQUE_ENTRY_conn.close()
  }
  function CHEQUE_ENTRY_commonvalues()
  {
    var CHEQUE_ENTRY_conn =eilib.db_GetConnection();
    ////////////ERROR MESSAGES/////////////
    var CHEQUE_ENTRY_error_code='2,3,400';
    var CHEQUE_ENTRY_error_array =eilib.GetErrorMessageList(CHEQUE_ENTRY_conn, CHEQUE_ENTRY_error_code); 
    var CHEQUE_ENTRY_RESULTS={errormessage:CHEQUE_ENTRY_error_array.errormsg};
    return CHEQUE_ENTRY_RESULTS;  
    CHEQUE_ENTRY_conn.close();
  }
}
catch(err)
{
}



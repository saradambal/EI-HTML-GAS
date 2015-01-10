//////////////PAYMENT FORPERIOD TERMINATED CUSTOMER VALIDATION//////////
function Payment_forperiod_TermCustvalidation(conn,unit,customer)
{
  var FIN_TERM_ENTRY_forperiodstmt=conn.createStatement();
  var FIN_TERM_ENTRY_forperiodquery="SELECT DISTINCT CED.CED_REC_VER,CTD.CLP_STARTDATE,CTD.CLP_ENDDATE,CTD.CLP_PRETERMINATE_DATE FROM CUSTOMER_LP_DETAILS CTD,CUSTOMER_ENTRY_DETAILS CED,CUSTOMER C WHERE CED.CUSTOMER_ID=CTD.CUSTOMER_ID AND CED.CED_REC_VER=CTD.CED_REC_VER AND C.CUSTOMER_ID=CED.CUSTOMER_ID AND C.CUSTOMER_ID='"+customer+"' AND CTD.CLP_GUEST_CARD IS NULL AND CED.UNIT_ID=(SELECT UNIT_ID FROM UNIT WHERE UNIT_NO='"+unit+"') ORDER BY CTD.CED_REC_VER ASC"
  var FIN_TERM_ENTRY_forperiodresult=FIN_TERM_ENTRY_forperiodstmt.executeQuery(FIN_TERM_ENTRY_forperiodquery);
  var CUSTOMER_RECVER_array=[];
  while(FIN_TERM_ENTRY_forperiodresult.next())
  {
    var startdate=FIN_TERM_ENTRY_forperiodresult.getString("CLP_STARTDATE");
    var startdateformat=FIN_TERM_ENTRY_forperiodresult.getDate("CLP_STARTDATE").getTime();
    var startdateformats=Utilities.formatDate(new Date(startdateformat), TimeZone, 'dd-MMM-yyyy');
    var preterminatedate=FIN_TERM_ENTRY_forperiodresult.getString("CLP_PRETERMINATE_DATE");
    if(preterminatedate==null && preterminatedate!="")
    {
      var enddate=FIN_TERM_ENTRY_forperiodresult.getString("CLP_ENDDATE");
      var enddateformat=FIN_TERM_ENTRY_forperiodresult.getDate("CLP_ENDDATE").getTime();
      var enddateformats=Utilities.formatDate(new Date(enddateformat), TimeZone, 'dd-MMM-yyyy');
    }
    else
    {
      enddate=FIN_TERM_ENTRY_forperiodresult.getString("CLP_PRETERMINATE_DATE");
      enddateformat=FIN_TERM_ENTRY_forperiodresult.getDate("CLP_PRETERMINATE_DATE").getTime();
      enddateformats=Utilities.formatDate(new Date(enddateformat), TimeZone, 'dd-MMM-yyyy'); 
    }
    var recver=FIN_TERM_ENTRY_forperiodresult.getString("CED_REC_VER");
    var CUSTOMER_RECVER_results={startdate:startdate,enddate:enddate,recver:recver,startdateformat:startdateformats,enddateformat:enddateformats};
    CUSTOMER_RECVER_array.push(CUSTOMER_RECVER_results);
  }
  var paidddate_startdate=FIN_paiddate_validation(conn,customer);
  var returnarray=[CUSTOMER_RECVER_array,customer,paidddate_startdate];
  return returnarray;
  FIN_TERM_ENTRY_forperiodresult.close();
  FIN_TERM_ENTRY_forperiodstmt.close();
}
//////////////PAYMENT FORPERIOD ACTIVE CUSTOMER VALIDATION//////////
function Payment_forperiod_ActiveCustvalidation(conn,unit,customerid)
{
  var FIN_ENTRY_forperiodstmt=conn.createStatement();
  var FIN_ENTRY_forperiodquery="SELECT *FROM VW_CURRENT_ACTIVE_CUSTOMER WHERE CUSTOMER_ID="+customerid+" AND UNIT_NO="+unit+" ORDER BY CED_REC_VER ASC"
  var FIN_ENTRY_forperiodresult=FIN_ENTRY_forperiodstmt.executeQuery(FIN_ENTRY_forperiodquery);
  var CUSTOMER_RECVER_array=[];
  while(FIN_ENTRY_forperiodresult.next())
  {
    var startdate=FIN_ENTRY_forperiodresult.getString("CLP_STARTDATE");
    var startdateformat=FIN_ENTRY_forperiodresult.getDate("CLP_STARTDATE").getTime();
    var startdateformats=Utilities.formatDate(new Date(startdateformat), TimeZone, 'dd-MMM-yyyy');
    var preterminatedate=FIN_ENTRY_forperiodresult.getString("CLP_PRETERMINATE_DATE");
    if(preterminatedate==null)
    {
      var enddate=FIN_ENTRY_forperiodresult.getString("CLP_ENDDATE");
      var enddateformat=FIN_ENTRY_forperiodresult.getDate("CLP_ENDDATE").getTime();
      var enddateformats=Utilities.formatDate(new Date(enddateformat), TimeZone, 'dd-MMM-yyyy');
    }
    else
    {
      enddate=FIN_ENTRY_forperiodresult.getString("CLP_PRETERMINATE_DATE");
      enddateformat=FIN_ENTRY_forperiodresult.getDate("CLP_PRETERMINATE_DATE").getTime();
      enddateformats=Utilities.formatDate(new Date(enddateformat), TimeZone, 'dd-MMM-yyyy');
    }
    var recver=FIN_ENTRY_forperiodresult.getString("CED_REC_VER");
    var CUSTOMER_RECVER_results={startdate:startdate,enddate:enddate,recver:recver,startdateformat:startdateformats,enddateformat:enddateformats};
    CUSTOMER_RECVER_array.push(CUSTOMER_RECVER_results);
  }
  FIN_ENTRY_forperiodresult.close();
  FIN_ENTRY_forperiodstmt.close();
  var paidddate_startdate=FIN_paiddate_validation(conn,customerid);
  var Return_forperiod=[CUSTOMER_RECVER_array,paidddate_startdate];
  return Return_forperiod;
}
function FIN_paiddate_validation(conn,customerid)
{
  var paiddate_mindate_stmt=conn.createStatement();
  var paiddate_mindate_result=paiddate_mindate_stmt.executeQuery("SELECT CLP_STARTDATE FROM CUSTOMER_LP_DETAILS WHERE CUSTOMER_ID="+customerid+" ORDER BY CED_REC_VER ASC LIMIT 1");
  if(paiddate_mindate_result.next())
  {
    var paidddate_startdate=paiddate_mindate_result.getString(1);
  }
  paiddate_mindate_result.close();
  paiddate_mindate_stmt.close();
  return paidddate_startdate;
}
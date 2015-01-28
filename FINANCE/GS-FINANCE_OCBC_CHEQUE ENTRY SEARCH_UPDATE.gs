//***********************************************CHEQUE SEARCH/UPDATE********************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY:PUNI
//VER 1.04- SD:07/10/2014 ED:07/10/2014,TRACKER NO:676,Corrected preloader position
//DONE BY:KUMAR
//VER 1.03- SD:19/09/2014 ED:19/09/2014,TRACKER NO:676,Implemented preloader and msgbox position script
//VER 1.02- SD:22/08/2014 ED:22/08/2014,TRACKER NO:786 Updated new jquery and css links and add autogrow line.
//VER 1.01- SD:20/06/2014 ED:20/06/2014,TRACKER NO:676,Removed Datebox when cheque status is cancelled.
//VER 1.00- SD:19/06/2016 ED:19/06/2014,TRACKER NO,676,Did cheque date validation(mindate as jan-2005 and maxdate as sysdate+2years)and added conn error message.
//VER 0.09- SD:06/06/2014 ED:06/06/2014,TRACKER NO:676,changed preloader and jquery,css links.
//VER 0.08- SD:19/04/2014 ED:19/04/2014,TRACKER NO :676 Restricted DP manual input using jquery common class.
//VER 0.07- SD:08/03/2014 ED:08/03/2014,TRACKER NO :676 Changed ULD id and fixed length for all text boxs.
//VER 0.06- SD:27/01/2014 ED:27/01/2014,TRACKER NO:676 Did new CR:Cheque status table merged to Bank tt configuration table and error msgs getting from config table.
//VER 0.05- SD:01/01/2014 ED:02/01/2014,TRACKER NO :676 did unit no validation nw unitno textbox ll accept comma,gave unit error msg and autocomplete error messag in ver 0.05
//VER 0.04- SD:16/12/2013 ED:16/12/2013,TRACKER NO:676 Did auto complete for cheque no seach,cleared update form button enable issue in ver 0.04
//VER 0.03- SD:03/12/2013 ED:03/12/2013,TRACKER NO:171Added Return function script in ver0.03
//VER 0.02- SD:30/11/2013 ED:30/11/2013,TRACKER NO:171-changed html file name and gs file name in ver0.04
//VER 0.01-INITIAL VERSION-SD:14/09/2013 ED:17/09/2013,TRACKER NO:171
//*********************************************************************************************************//
try
{
  function CHEQUE_SRC_autocompletesearchdetails(CHEQUE_SRC_OPTION)
  {
    var CHEQUE_SRC_conn=eilib.db_GetConnection();
    var CHEQUE_SRC_stmt = CHEQUE_SRC_conn.createStatement();
    var CHEQUE_SRC_autocompl_array =[];
    if(CHEQUE_SRC_OPTION==4)
    {
      var CHEQUE_SRC_autocompl_query = "SELECT DISTINCT CHEQUE_UNIT_NO FROM CHEQUE_ENTRY_DETAILS ORDER BY CHEQUE_UNIT_NO ASC"; 
    }
    if(CHEQUE_SRC_OPTION==2)
    {
      CHEQUE_SRC_autocompl_query="SELECT DISTINCT CHEQUE_NO FROM CHEQUE_ENTRY_DETAILS ORDER BY CHEQUE_NO ASC"; 
    }
    var CHEQUE_SRC_autocompl_result = CHEQUE_SRC_stmt.executeQuery(CHEQUE_SRC_autocompl_query);
    while(CHEQUE_SRC_autocompl_result.next())
    {
      if((CHEQUE_SRC_autocompl_result.getString(1)!=null)&&CHEQUE_SRC_autocompl_result.getString(1)!="")
      {
        CHEQUE_SRC_autocompl_array.push(CHEQUE_SRC_autocompl_result.getString(1));
      }
    }
    return CHEQUE_SRC_autocompl_array;
    CHEQUE_SRC_autocompl_result.close();
    CHEQUE_SRC_stmt.close();
    CHEQUE_SRC_conn.close();
  }
  function CHEQUE_SRC_commonvalues()
  {
    var CHEQUE_SRC_conn =eilib.db_GetConnection();
    //////////////SEARCH OPTION /////////////////////
    var CHEQUE_searchoptionstmt=CHEQUE_SRC_conn.createStatement();
    var CHEQUE_searchoptionquery="SELECT CQCN_ID,CQCN_DATA FROM CHEQUE_CONFIGURATION ORDER BY CQCN_DATA ASC";
    var CHEQUE_searchoptionresult=CHEQUE_searchoptionstmt.executeQuery(CHEQUE_searchoptionquery);
    var CHEQUE_searchoption_array=[];
    while(CHEQUE_searchoptionresult.next())
    {
      var CHEQUE_searchoptiondata= CHEQUE_searchoptionresult.getString("CQCN_DATA"); 
      var CHEQUE_searchoptionid= CHEQUE_searchoptionresult.getString("CQCN_ID"); 
      CHEQUE_searchoption_array.push({CHEQUEoptionid:CHEQUE_searchoptionid,CHEQUEoptiondata:CHEQUE_searchoptiondata})
    }
    CHEQUE_searchoptionresult.close();
    CHEQUE_searchoptionstmt.close();
    ////////////STATUS TABLE/////////////
    var CHEQUE_SRC_stmt = CHEQUE_SRC_conn.createStatement();
    var CHEQUE_SRC_status_array =[];
    var CHEQUE_SRC_status_query = "SELECT DISTINCT BCN_ID,BCN_DATA FROM BANKTT_CONFIGURATION WHERE CGN_ID=70 ORDER BY BCN_DATA ASC"; 
    var CHEQUE_SRC_status_result = CHEQUE_SRC_stmt.executeQuery(CHEQUE_SRC_status_query);
    while(CHEQUE_SRC_status_result.next())
    {
      var bcnid=CHEQUE_SRC_status_result.getString("BCN_ID")
      if(bcnid==11 || bcnid==15)continue;
      CHEQUE_SRC_status_array.push(CHEQUE_SRC_status_result.getString("BCN_DATA"));
    }
    CHEQUE_SRC_status_result.close();
    CHEQUE_SRC_stmt.close();
    ////////////ERROR MESSAGES/////////////
    var CHEQUE_SRC_errorstmt = CHEQUE_SRC_conn.createStatement();
    var CHEQUE_SRC_error_code='1,2,4,45,247,385,401';
    var CHEQUE_SRC_error_array=eilib.GetErrorMessageList(CHEQUE_SRC_conn,CHEQUE_SRC_error_code);
    var CHEQUE_SRC_RESULTS={Chequesearchoption:CHEQUE_searchoption_array,error:CHEQUE_SRC_error_array.errormsg,status:CHEQUE_SRC_status_array};
    return CHEQUE_SRC_RESULTS;
    CHEQUE_SRC_conn.close();
  }
  function CHEQUE_SRC_search(CHEQUE_INPUT_1,CHEQUE_UNPUT_2,searchoptionhead)
  {
    if(searchoptionhead==1)
    {
      var CHEQUE_SRC_QUERY="SELECT CED.CHEQUE_ID,CED.CHEQUE_DATE,CED.CHEQUE_NO,CED.CHEQUE_TO,CED.CHEQUE_FOR,CED.CHEQUE_AMOUNT,CED.CHEQUE_UNIT_NO,BC.BCN_DATA,CED.CHEQUE_DEBITED_RETURNED_DATE,CED.CHEQUE_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(CED.CHEQUE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS CED_TIME_STAMP FROM CHEQUE_ENTRY_DETAILS CED,BANKTT_CONFIGURATION BC,USER_LOGIN_DETAILS ULD WHERE CED.BCN_ID=BC.BCN_ID AND CED.CHEQUE_AMOUNT BETWEEN '"+CHEQUE_INPUT_1+"' AND '"+CHEQUE_UNPUT_2+"' AND ULD.ULD_ID=CED.ULD_ID ORDER BY CHEQUE_NO ASC";
    }
    if(searchoptionhead==2)
    {
      var CHEQUE_SRC_QUERY="SELECT CED.CHEQUE_ID,CED.CHEQUE_DATE,CED.CHEQUE_NO,CED.CHEQUE_TO,CED.CHEQUE_FOR,CED.CHEQUE_AMOUNT,CED.CHEQUE_UNIT_NO,BC.BCN_DATA,CED.CHEQUE_DEBITED_RETURNED_DATE,CED.CHEQUE_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(CED.CHEQUE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS CED_TIME_STAMP FROM CHEQUE_ENTRY_DETAILS CED,BANKTT_CONFIGURATION BC,USER_LOGIN_DETAILS ULD WHERE CED.BCN_ID=BC.BCN_ID AND CED.CHEQUE_NO ='"+CHEQUE_INPUT_1+"' AND ULD.ULD_ID=CED.ULD_ID ORDER BY CHEQUE_NO ASC";
    }
    if(searchoptionhead==4)
    {
      var CHEQUE_SRC_QUERY="SELECT CED.CHEQUE_ID,CED.CHEQUE_DATE,CED.CHEQUE_NO,CED.CHEQUE_TO,CED.CHEQUE_FOR,CED.CHEQUE_AMOUNT,CED.CHEQUE_UNIT_NO,BC.BCN_DATA,CED.CHEQUE_DEBITED_RETURNED_DATE,CED.CHEQUE_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(CED.CHEQUE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS CED_TIME_STAMP FROM CHEQUE_ENTRY_DETAILS CED,BANKTT_CONFIGURATION BC,USER_LOGIN_DETAILS ULD WHERE CED.BCN_ID=BC.BCN_ID AND CED.CHEQUE_UNIT_NO ='"+CHEQUE_INPUT_1+"' AND ULD.ULD_ID=CED.ULD_ID ORDER BY CHEQUE_UNIT_NO ASC";
    }
    if(searchoptionhead==3)
    {
      var CHEQUE_ENTRY_fromdate=eilib.SqlDateFormat(CHEQUE_INPUT_1);
      var CHEQUE_ENTRY_todate=eilib.SqlDateFormat(CHEQUE_UNPUT_2);
      var CHEQUE_SRC_QUERY="SELECT CED.CHEQUE_ID,CED.CHEQUE_DATE,CED.CHEQUE_NO,CED.CHEQUE_TO,CED.CHEQUE_FOR,CED.CHEQUE_AMOUNT,CED.CHEQUE_UNIT_NO,BC.BCN_DATA,CED.CHEQUE_DEBITED_RETURNED_DATE,CED.CHEQUE_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(CED.CHEQUE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS CED_TIME_STAMP FROM CHEQUE_ENTRY_DETAILS CED,BANKTT_CONFIGURATION BC,USER_LOGIN_DETAILS ULD WHERE CED.BCN_ID=BC.BCN_ID AND CED.CHEQUE_DATE BETWEEN '"+CHEQUE_ENTRY_fromdate+"' AND '"+CHEQUE_ENTRY_todate+"' AND ULD.ULD_ID=CED.ULD_ID ORDER BY CHEQUE_DATE ASC";
    }
    var CHEQUE_SRC_conn =eilib.db_GetConnection();
    var CHEQUE_SRC_searchstmt=CHEQUE_SRC_conn.createStatement();
    var CHEQUE_SRC_searchresult=CHEQUE_SRC_searchstmt.executeQuery(CHEQUE_SRC_QUERY);
    var CHEQUE_DETAILS_ARRAY=[];
    while(CHEQUE_SRC_searchresult.next())
    {
      var chequeid=CHEQUE_SRC_searchresult.getString("CHEQUE_ID");
      var chequedate=eilib.SqlDateFormat(CHEQUE_SRC_searchresult.getString("CHEQUE_DATE"));
      var chequeno=CHEQUE_SRC_searchresult.getString("CHEQUE_NO");
      var chequeto=CHEQUE_SRC_searchresult.getString("CHEQUE_TO");
      var chequefor=CHEQUE_SRC_searchresult.getString("CHEQUE_FOR");
      var chequeamount=CHEQUE_SRC_searchresult.getString("CHEQUE_AMOUNT");
      var chequeunit=CHEQUE_SRC_searchresult.getString("CHEQUE_UNIT_NO");
      if((chequeunit==null)||(chequeunit==""))
      {
        chequeunit="";
      }
      var chequestatus=CHEQUE_SRC_searchresult.getString("BCN_DATA");
      var checkdebited=CHEQUE_SRC_searchresult.getString("CHEQUE_DEBITED_RETURNED_DATE");
      if((checkdebited==null)||(checkdebited==""))
      {
        checkdebited="";
      }
      else
      {
        checkdebited=eilib.SqlDateFormat(CHEQUE_SRC_searchresult.getString("CHEQUE_DEBITED_RETURNED_DATE"));
      }
      var chequecomments=CHEQUE_SRC_searchresult.getString("CHEQUE_COMMENTS");
      if((chequecomments==null)||(chequecomments==""))
      {
        chequecomments="";
      }
      var chequeuserstamp=CHEQUE_SRC_searchresult.getString("ULD_LOGINID");
      var chequestimestamp=CHEQUE_SRC_searchresult.getString("CED_TIME_STAMP");
      var CHEQUE_SRC_RESULTS={"ID":chequeid,"DATE":chequedate,"CHEQUENO":chequeno,"CHEQUETO":chequeto,"CHEQUEFOR":chequefor,"CHEQUEAMOUNT":chequeamount,"UNIT":chequeunit,"STATUS":chequestatus,"DEBITED":checkdebited,"COMMENTS":chequecomments,"USERSTAMP":chequeuserstamp,"TIMESTAMP":chequestimestamp};
      CHEQUE_DETAILS_ARRAY.push(CHEQUE_SRC_RESULTS);
    }
    return CHEQUE_DETAILS_ARRAY;
    CHEQUE_SRC_searchresult.close();
    CHEQUE_SRC_searchstmt.close();
    CHEQUE_SRC_conn.close();
  }
  function CHEQUE_SRC_chequeupdation(chequeid,chequedate,chequeno,chequeto,chequefor,amount,unit,status,debited,comments)
  {
    var CHEQUE_SRC_conn =eilib.db_GetConnection();
    var CHEQUE_ENTRY_date=eilib.SqlDateFormat(chequedate);
    if(debited=="")
    { var CHEQUE_ENTRY_debited=null;}
    else
    {
      CHEQUE_ENTRY_debited=eilib.SqlDateFormat(debited);
      CHEQUE_ENTRY_debited="'"+CHEQUE_ENTRY_debited+"'"};
    if(comments!="")
    {  comments=eilib.ConvertSpclCharString(comments) }
    var CHEQUE_SRC_updationstmt=CHEQUE_SRC_conn.createStatement();
    CHEQUE_SRC_updationstmt.execute("CALL SP_CHEQUE_UPDATE("+chequeid+",'"+status+"','"+CHEQUE_ENTRY_date+"','"+chequeto+"',"+chequeno+",'"+chequefor+"',"+amount+",'"+unit+"',"+CHEQUE_ENTRY_debited+",'"+comments+"','"+UserStamp+"',@CHEQUEFLAG)");
    var CHEQUE_SRC_updateresult=CHEQUE_SRC_updationstmt.executeQuery("SELECT @CHEQUEFLAG");
    if(CHEQUE_SRC_updateresult.next())
    {
      var chequereturnflag=CHEQUE_SRC_updateresult.getString(1);
    }
    CHEQUE_SRC_updateresult.close();
    CHEQUE_SRC_updationstmt.close();
    return chequereturnflag;
    CHEQUE_SRC_conn.close();
  }
}
catch(err)
{
}
//*******************************************FILE DESCRIPTION*********************************************//
//***********************************************TICKLER HISTORY**********************************************//
//DONE BY:PUNITHA
//VER 1.5-SD:24/09/2014 ED:24/09/2014,TRACKER NO:694,changed preloader position,msgbox position
//VER 1.4-SD:24/09/2014 ED:24/09/2014,TRACKER NO:694,used function from jquery to replace<> tag in old val n new val,changed script as per corrected sp ,used droptable function from eilib,corrected sort by timestamp in query,changed preloader position,msgbox position
//DONE BY:SARADAMBAL
//VER 1.3-SD:22/08/2014 ED:22/08/2014,TRACKER NO:694,updated new links
//DONE BY:LALITHA
//VER 1.2-SD:14/07/2014 ED:15/07/2014,TRACKER NO:694,Changed failure funct,Inbetween record put comma,Select query ordered by timestamp desc,sp changed:added unsigned zero for unit nos
//VER 1.1-SD:07/06/2014 ED:07/06/2014,TRACKER NO:694,Changed jquery link 
//VER 1.0-SD:05/06/2014 ED:05/06/2014,Updated TimeZone Format
//VER 0.09-SD:05/06/2014 ED:05/06/2014,Increased flex table height 
//VER 0.08-SD:22/05/2014 ED:26/05/2014,Checked the sp again wth(splitted dynamic sp nd single quotes in cmmnts),Increased the flex tble height,Showned more records in flex tble,aftr drop query put return functn
//VER 0.07-SD:14/05/2014 ED:16/05/2014,Implemented dynamic sp,Changed return functn,put space in between frst nd last cust name,updated wrapping for new value nd width in shown flex table,After flex tble shown removed the cust name in txtbx,updated width for txtbx
//VER 0.06-SD:17/04/2014 ED:17/04/2014,added preloader in beginning form loading,atlast put return functn  
//VER 0.05-SD:17/03/2014 ED:03/04/2014,Sp changed for Loaded nly customer domain,added customer name header in tickler history,updated wrapping nd width in shown flex table
//VER 0.04-SD:04/03/2014 ED:04/03/2014,updated div fr flex table
//VER 0.03-SD:21/02/2014 ED:21/02/2014,implemented sp to shown the data in flex table,hide the err msg nd disable the button while key press function,changed div for flex table,shown empty space in flex table null field part 
//VER 0.02-SD:04/02/2014 ED:04/02/2014,implemented eilib for err msg,nd h3 tag
//VER 0.01-INITIAL VERSION, SD:02/01/2013 ED:07/01/2014,TRACKER NO:694
//*********************************************************************************************************//
try
{
  //FUNCTION FOR FETCHING ERROR MESSAGE FROM SQL TABLE
  function TH_get_err()
  {
    var TH_connection=eilib.db_GetConnection();
    var TH_errmsgids="46,368,369";
    var TH_errorMsg_array=[];
    TH_errorMsg_array=eilib.GetErrorMessageList(TH_connection,TH_errmsgids);
    var TH_result={"TH_errormsg":TH_errorMsg_array.errormsg};  
    TH_connection.close();
    return TH_result;
  }
  //FUNCTION FOR AUTOCOMPLETE CUSTOMER NAME
  function TH_customername_autocomplete()
  {
    var TH_conn=eilib.db_GetConnection();
    var TH_stmt=TH_conn.createStatement();
    var TH_temptblename=CallTicklerSP(TH_conn)
    var TH_dataArray=[];
    var TH_rs=TH_stmt.executeQuery("SELECT DISTINCT CONCAT(CUSTOMER_FIRST_NAME,'  ',CUSTOMER_LAST_NAME) AS CUSTOMERNAME FROM "+TH_temptblename+" ORDER BY CUSTOMER_FIRST_NAME ASC");
    while(TH_rs.next()) 
    {
      if(TH_rs.getString('CUSTOMERNAME')!=null)
        TH_dataArray.push(TH_rs.getString('CUSTOMERNAME'));
    }
    TH_rs.close();
    TH_stmt.close();
    eilib.DropTempTable(TH_conn, TH_temptblename)
    TH_conn.close();
    return TH_dataArray;
  }
function CallTicklerSP(TH_conn)
  {
    var TH_stmt=TH_conn.createStatement();
    TH_stmt.execute("CALL SP_CUSTOMER_TICKLER_DATA('"+UserStamp+"',@CUSTOMER_TICKLER_HISTORY_TMPTBL)");
    TH_stmt.close();
    var TH_stmt_temptble = TH_conn.createStatement();
    var TH_rs_temptble  = TH_stmt_temptble.executeQuery("SELECT @CUSTOMER_TICKLER_HISTORY_TMPTBL");
     while(TH_rs_temptble.next()){   
      var TH_temptblename= TH_rs_temptble.getString("@CUSTOMER_TICKLER_HISTORY_TMPTBL");
     }
    TH_rs_temptble.close();
    TH_stmt_temptble.close();
    return TH_temptblename;
  }
  // FUNCTION FOR SHOW THE DATA IN TABLE
  function TH_flextabel_getdatas(TH_customername)
  {
    var TH_conn=eilib.db_GetConnection();
    var TH_stmt=TH_conn.createStatement();
    var TH_flname=TH_customername.split('  ');
    var TH_fname=TH_flname[0];
    var TH_lname=TH_flname[1];
    var TH_tickler_list=[];
    var TH_temptblename=CallTicklerSP(TH_conn)
    var TH_stmt=TH_conn.createStatement();
    var TH_query="SELECT CUSTOMER_ID,UPDATION_DELETION,TABLE_NAME,TH_OLD_VALUE,TH_NEW_VALUE,TH_USERSTAMP,DATE_FORMAT(CONVERT_TZ(TH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T')  AS TIMESTAMP FROM "+TH_temptblename+" WHERE CUSTOMER_FIRST_NAME='"+TH_fname+"' AND CUSTOMER_LAST_NAME='"+TH_lname+"' ORDER BY TH_TIMESTAMP DESC";
    var TH_rs=TH_stmt.executeQuery(TH_query);
    while(TH_rs.next())
    {
      var TH_customerid=TH_rs.getString("CUSTOMER_ID");
      var TH_upddel=TH_rs.getString("UPDATION_DELETION");
      var TH_tablename=TH_rs.getString("TABLE_NAME");
      var TH_oldvalue=TH_rs.getString("TH_OLD_VALUE");
      var TH_newvalue=TH_rs.getString("TH_NEW_VALUE");
      if((TH_newvalue=='null')||(TH_newvalue==undefined))
      {
        TH_newvalue='';
      }
      var TH_userstamp=TH_rs.getString("TH_USERSTAMP");
      var TH_timestamp=TH_rs.getString("TIMESTAMP");
      var TH_ticklerlist={'customerid':TH_customerid,'customerfirstname':TH_fname,'customerlastname':TH_lname,'upddel':TH_upddel,'tablename':TH_tablename,'oldvalue':TH_oldvalue,'newvalue':TH_newvalue,'userstamp':TH_userstamp,'timestamp':TH_timestamp}
      TH_tickler_list.push(TH_ticklerlist) 
    }
    TH_rs.close();
    TH_stmt.close();
    eilib.DropTempTable(TH_conn, TH_temptblename);
    TH_conn.close();
    return TH_tickler_list;
  }
}
catch(err)
{
}
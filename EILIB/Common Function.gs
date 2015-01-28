//FUNCTION TO DROP TEMP TABLE
function DropTempTable(conn,tablename)  
{
  var temp_stmt= conn.createStatement();
  var temp_query = "DROP TABLE IF EXISTS "+tablename+""; 
  temp_stmt.execute(temp_query);
  temp_stmt.close();
}

//DD FILE SHARING FUNCTION//
function Deposit_Deduction_fileSharing(newsheetid,templatefolderid) {
  var year=Utilities.formatDate(new Date(), TimeZone,'yyyy');
  var lastyear=parseInt(year)-1
  var SSname='EI_DEPOSIT_DEDUCTIONS_'+lastyear;
  var Drivefiles=DriveApp.getFolderById(templatefolderid).getFiles();
  var SSexistflag=0;
  var Sexistflag=0;
  while(Drivefiles.hasNext())
  {
    var filename=Drivefiles.next();
    var fileid=filename.getId();
    if(SSname==filename)
    {
      SSexistflag=1;
      var SSfileid=fileid;
      break;
    }
  }
  //  var Drivefileeditors=DriveApp.getFileById(SSfileid).getEditors();
  var Drivefileeditors=DocsList.getFileById(SSfileid).getEditors();
  for(var j=0;j<Drivefileeditors.length;j++)
  {
    if(Drivefileeditors[j].getEmail()=="")continue;
    DriveApp.getFileById(newsheetid).addEditor(Drivefileeditors[j].getEmail());
  }
}
//////FUNCTION TO GET ALL UNITS

function getAllUunits(conn)
{
  var Allunitstmt = conn.createStatement();
  var Allunit_array =[];
  var Allunit_query = "SELECT UNIT_NO FROM UNIT ORDER BY UNIT_NO ASC"; 
  var Allunit_result = Allunitstmt.executeQuery(Allunit_query);
  while(Allunit_result.next())
  {
    Allunit_array.push(Allunit_result.getString("UNIT_NO"));
  }
  Allunit_result.close();
  Allunitstmt.close();
  return Allunit_array;
}
/////FUNCTION TO GET BANK_TRANSFER_MODELS
function getBankTransferModels(conn)
{
  var MODEL_stmt=conn.createStatement();
  var MODEL_query="SELECT BTM_ID,BTM_DATA FROM BANK_TRANSFER_MODELS ORDER BY BTM_DATA ASC"
  var MODEL_result=MODEL_stmt.executeQuery(MODEL_query);
  var BANKTT_modelarray=[];
  while(MODEL_result.next())
  {
    BANKTT_modelarray.push({modelid:MODEL_result.getString(1),modelname:MODEL_result.getString(2)}); 
  }
  MODEL_result.close();
  MODEL_stmt.close();
  return BANKTT_modelarray;
}
//FUNCTION TO GET PAYMENT OPTION VALUES
function getPaymentProfile(conn)
{
  var paymentstmt = conn.createStatement();
  var payment_array =[];
  var payment_query = "SELECT * FROM PAYMENT_PROFILE ORDER BY PP_DATA ASC"; 
  var payment_result = paymentstmt.executeQuery(payment_query);
  while(payment_result.next())
  {
    payment_array.push(payment_result.getString("PP_DATA"));
  }
  payment_result.close();
  paymentstmt.close();
  return payment_array;
}
//FUNCTION TO GET ID FOR GIVEN USERSTAMP
function getUserStampId(conn,UserStamp){
  var userstamp_selectquery = "SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID ='"+UserStamp+"'";
  var userstamp_stmt = conn.createStatement();
  var userstamp_rs = userstamp_stmt.executeQuery(userstamp_selectquery);
  while(userstamp_rs.next())
  {
    var userstamp_id = userstamp_rs.getString("ULD_ID");
  }
  userstamp_rs.close();userstamp_stmt.close();
  return userstamp_id;
}
//FUNCTION TO CHECK TRANSACTION OF A RECORD
function ChkTransactionBeforeDelete(conn,tableid,rowid)
{
  var chktrans_stmt=conn.createStatement();
  chktrans_stmt.execute("CALL SP_CHK_TRANSACTION("+tableid+","+rowid+",@DELETION_FLAG)");
  chktrans_stmt.close();
  var chktransflag_stmt=conn.createStatement();
  var chktransflag_query="SELECT @DELETION_FLAG";
  var chktransflag_rs=chktransflag_stmt.executeQuery(chktransflag_query);
  while(chktransflag_rs.next())
  {
    var transresult=chktransflag_rs.getString("@DELETION_FLAG");
  }
  chktransflag_rs.close();
  chktransflag_stmt.close();
  return transresult;
}
//FUNCTION TO DELETE A RECORD
function DeleteRecord(conn,tableid,rowid)
{
  var deletestmt=conn.createStatement();
  deletestmt.execute("CALL SP_SINGLE_TABLE_ROW_DELETION("+tableid+","+rowid+",'"+UserStamp+"',@DELETION_FLAG)");
  deletestmt.close();
  var deleteflag_stmt=conn.createStatement();
  var deleteflag_query="SELECT @DELETION_FLAG";
  var deleteflag_rs=deleteflag_stmt.executeQuery(deleteflag_query);
  while(deleteflag_rs.next())
  {
    var deleteflag=deleteflag_rs.getString("@DELETION_FLAG");
  }
  deleteflag_rs.close();
  deleteflag_stmt.close();
  return deleteflag;
}
//FUNCTION TO GET CALENDAR EVENT TIME FOR STARHUB N UNIT
function getStarHubUnitCalTime(conn)
{ 
  var  stmt_caltime = conn.createStatement();
  var  caltime_arr=[];
  var  select_caltime  = "SELECT ECN_DATA FROM EXPENSE_CONFIGURATION WHERE ECN_ID IN (193,194)";
  var  rs_caltime  =  stmt_caltime.executeQuery( select_caltime);
  while( rs_caltime .next())
  {
    caltime_arr.push(rs_caltime .getString("ECN_DATA"));   
  }  
  rs_caltime .close();
  stmt_caltime .close();
  return caltime_arr;
}
//FUNCTION TO CONVERT STRING TO PASS IN QUERY CONTAINS SPCL CHARS(SKIPPED FOR %,_ SAVES WITH \_,\% IN SQL)
function ConvertSpclCharString(str)
{
  var finalstr="";
  for(var i=0;i<str.toString().length;i++)
  {
    if(/^[%_a-zA-Z0-9- ]*$/.test(str[i]) == false)
    {
      finalstr+='\\'+str[i];
    }
    else
    {
      finalstr+=str[i];
    }
  }
  return finalstr;
}
//FUNCTION TO GET ERROR MESSAGE
function GetErrorMessageList(conn,errmsgids)
{
  var errstmt= conn.createStatement();
  var errcode =[],errmsg =[];
  var errquery= "SELECT EMC_ID,EMC_DATA FROM ERROR_MESSAGE_CONFIGURATION WHERE EMC_ID IN("+errmsgids+") ORDER BY EMC_ID ASC";
  var errres = errstmt.executeQuery(errquery);
  while(errres.next())
  {
    errcode.push(errres.getString("EMC_ID"));
    errmsg.push(errres.getString("EMC_DATA"));
  }
  var finalerrmsg={"errorcode":errcode,"errormsg":errmsg};
  errres.close();
  errstmt.close();
  return finalerrmsg;
}
// FUNCTION TO GET DATE FORMAT FOR PERIOD
function GetForperiodDateFormat(fromInputDate,toInputDate){  
  var splitFromInputDate=fromInputDate.split('-');
  var splitToInputDate=toInputDate.split('-');
  var monthArr=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var fromMonth=splitFromInputDate[0];
  var toMonth=splitToInputDate[0];
  for(var i=0;i<=monthArr.length;i++)
  {    if(monthArr[i]==fromMonth)
  {
    var getfromMonth=i;
  }
   if(monthArr[i]==toMonth)
   {
     var gettoMonth=i;
   }
  } 
  var getFromDate=Utilities.formatDate(new Date(splitFromInputDate[1],getfromMonth), TimeZone, 'yyyy-MM-dd');
  var endMonthDate=new Date(splitFromInputDate[1],parseInt(gettoMonth)+1).getDate();
  var getToDate=Utilities.formatDate(new Date(splitToInputDate[1],parseInt(gettoMonth)+1,endMonthDate-1), TimeZone, 'yyyy-MM-dd');
  var finalDateFormat={"frmdate":getFromDate,"todate":getToDate}
  return finalDateFormat;
}
//FUNCTION TO GET MAIL DISPLAY NAME
function Get_MailDisplayName(s){
  switch(s)
  {
    case 'BANK_TT':
      return 'BANK TT';
      break;
    case 'ERM':
      return 'ERM';
      break;
    case 'ACTIVE_CC_LIST':
      return 'ACTIVE CC LIST';
      break;
    case 'CUSTOMER_EXPIRY':
      return 'CUSTOMER EXPIRY LIST';
      break;
    case 'OUTSTANDING_PAYEES':
      return 'OUTSTANDING PAYEES LIST';
      break;
    case 'NON_PAYMENT_REMINDER':
      return 'NON PAYMENT REMINDER';
      break;
    case 'NON_PAYMENT_NON_INTIMATED_CC':
      return 'NON PAYMENT_NON INTIMATED CC LIST';
      break;
    case 'MONTHLY_PAYMENT_NON_INTIMATED_CC':
      return 'MONTHLY PAYMENT_NON INTIMATED CC LIST';
      break;
    case 'DEPOSIT_DEDUCTION':
      return 'DEPOSIT DEDUCTION';
      break;
    case 'INVOICE':
      return 'INVOICE';
      break;
    case 'CONTRACT':
      return 'CONTRACT';
      break;
    case 'INVOICE_N_CONTRACT':
      return 'INVOICE N CONTRACT';
      break;
    case 'MONTHLY_PAYMENT_REMINDER':
      return 'MONTHLY PAYMENT REMINDER';
      break;
    case 'DROP_TEMP_TABLE':
      return 'TEMPORARY TABLE LIST';
      break;
  }
}
//FUNCTION TO CHECK HOUSE KEEPING UNIT NO EXISTS OR NOT
function CheckHKPUnitnoExists(conn,unitno)
{
  var unitflag=false;
  var unostmt= conn.createStatement();
  var unoquery= "SELECT EHKU_UNIT_NO FROM EXPENSE_HOUSEKEEPING_UNIT WHERE EHKU_UNIT_NO="+unitno+""; 
  var unores = unostmt.executeQuery(unoquery);
  while(unores.next())
  {
    unitflag=true;
  }
  unores.close();
  unostmt.close();
  return unitflag;
}
//FUNCTION TO CHECK UNIT NO EXISTS OR NOT
function CheckUnitnoExists(conn,unitno)
{
  var unitflag=false;
  var unostmt= conn.createStatement();
  var unoquery= "SELECT * FROM UNIT WHERE UNIT_NO="+unitno+""; 
  var unores = unostmt.executeQuery(unoquery);
  while(unores.next())
  {
    unitflag=true;
  }
  unores.close();
  unostmt.close();
  return unitflag;
}
//FUNCTION TO GET ACTIVE UNIT NO
function GetActiveUnit(conn)
{
  var unostmt= conn.createStatement();
  var unoarray =[];
  var unoquery= "SELECT UNIT_NO FROM VW_ACTIVE_UNIT ORDER BY UNIT_NO ASC"; 
  var unores = unostmt.executeQuery(unoquery);
  while(unores.next())
  {
    var unitno=unores.getString("UNIT_NO");
    unoarray.push(unitno);
  }
  unores.close();
  unostmt.close();
  return unoarray;
}
//FUNCTION TO CHECK AIRCON SERVICED BY
function Check_ExistsAirconservicedby(conn,airconservice)
{
  var flag=false;
  var select_all_aircon_servicedby = "SELECT EASB_DATA FROM EXPENSE_AIRCON_SERVICE_BY WHERE EASB_DATA='"+airconservice+"'";
  var all_aircon_servicedby_stmt = conn.createStatement();
  var all_aircon_servicedby_rs = all_aircon_servicedby_stmt.executeQuery(select_all_aircon_servicedby);
  while(all_aircon_servicedby_rs.next())
  {
    flag=true;
  }
  all_aircon_servicedby_stmt.close();
  all_aircon_servicedby_rs.close();
  return flag;
}
//FUNCTION TO UNIQUE ARRAY VALUES
function unique(array){
  var unique = {};
  var distinct = [];
  for( var i in array ){
    if( typeof(unique[array[i]]) == "undefined"){
      distinct.push(array[i]);
    }
    unique[array[i]] = 0;
  }
  return distinct;
}
//FUNCTION TO CHECK ROOM TYPE EXISTS IN UNIT
function Check_ExistsRmType(conn,rmtype)
{
  var rmtypeunitno_query = "SELECT URTD_ROOM_TYPE FROM UNIT_ROOM_TYPE_DETAILS WHERE URTD_ROOM_TYPE='"+rmtype+"'"
  var stmt_rmtypestmt = conn.createStatement();
  var rmtype_rs = stmt_rmtypestmt.executeQuery(rmtypeunitno_query);
  var chkrmtype_flag=false;
  while(rmtype_rs.next())
  {
    chkrmtype_flag=true;
  }
  rmtype_rs.close();
  stmt_rmtypestmt.close();
  return chkrmtype_flag;
}
//FUNCTION TO CHECK STAMP DUTY TYPE EXISTS IN UNIT
function Check_ExistsStampduty(conn,stmpduty)
{
  var stmpdutyunitno_query ="SELECT USDT_DATA FROM UNIT_STAMP_DUTY_TYPE WHERE USDT_DATA='"+stmpduty+"'"
  var stmt_stmpdutystmt = conn.createStatement();
  var stmpduty_rs = stmt_stmpdutystmt.executeQuery(stmpdutyunitno_query);
  var chkstmpduty_flag=false;
  while(stmpduty_rs.next())
  {
    chkstmpduty_flag=true;
  }
  stmpduty_rs.close();
  stmt_stmpdutystmt.close();
  return chkstmpduty_flag;
}
//FUNCTION TO CHECK CARD EXISTS IN UNIT
function Check_ExistsCard(conn,cardno)
{
  var cardunitno_query = "SELECT * FROM UNIT_ACCESS_STAMP_DETAILS WHERE UASD_ACCESS_CARD="+cardno+""
  var stmt_cardnostmt = conn.createStatement();
  var card_rs = stmt_cardnostmt.executeQuery(cardunitno_query);
  var chkcard_flag=false;
  while(card_rs.next())
  {
    chkcard_flag=true;
  }
  card_rs.close();
  stmt_cardnostmt.close();
  return chkcard_flag;
}
////GET UNIT START DATE N END DATE
function GetUnitSdEdate(conn,unitno)
{
  var udatestmt=conn.createStatement();
  var udatequery="SELECT UD_START_DATE,UD_END_DATE FROM UNIT_DETAILS UD,UNIT U WHERE U.UNIT_ID=UD.UNIT_ID AND U.UNIT_NO="+unitno+"";
  var udaters=udatestmt.executeQuery(udatequery);
  while(udaters.next())
  {
    var sdate=udaters.getString(1);
    var edate=udaters.getString(2);
  }
  var unitdate={"unitsdate":sdate,"unitedate":edate}
  udaters.close();
  udatestmt.close();
  return unitdate;
}
////GET PRORATE LABEL
function CUST_GetProratelbl(conn)
{
  var prostmt=conn.createStatement();
  var selectproquery="SELECT CCN_DATA FROM CUSTOMER_CONFIGURATION WHERE CGN_ID=39";
  var proresult=prostmt.executeQuery(selectproquery);
  if(proresult.next())
  {
    var pro_lbl=proresult.getString(1);
  }
  proresult.close();
  prostmt.close();
  return pro_lbl;
}
//GET PRORATE LABEL LINE NO
function CUST_GetProrateLineno(conn)
{
  var proratedlinestmt=conn.createStatement();
  var selectproratedlinequery="SELECT CCN_DATA FROM CUSTOMER_CONFIGURATION WHERE CGN_ID=50";
  var proratedlineresult=proratedlinestmt.executeQuery(selectproratedlinequery);
  if(proratedlineresult.next())
  {
    var pro_rated_lineno=proratedlineresult.getString(1);
  }
  proratedlineresult.close();
  proratedlinestmt.close();
  return pro_rated_lineno;
}
//GET UNIT LOGIN DETAILS
function CUST_GetLogindtls(conn,unitno)
{
  var selectweblogin="SELECT ULDTL_WEBLOGIN FROM UNIT_LOGIN_DETAILS WHERE UNIT_ID=(SELECT UNIT_ID FROM UNIT WHERE UNIT_NO="+unitno+")";
  var webloginstmt=conn.createStatement();
  var webloginresult=webloginstmt.executeQuery(selectweblogin);
  while(webloginresult.next())
  {
    var weblogin =webloginresult.getString("ULDTL_WEBLOGIN");
  }
  webloginresult.close();
  webloginstmt.close();
  return weblogin;
}
///////////////////////////////GET INVOICE ID ,CONTRACT ID ,SERIAL NO,INVOIC DATE/////////
function CUST_invoice_contractreplacetext(conn)
{
  var cust_config_stmt=conn.createStatement();
  var cust_config_query="SELECT CCN_DATA FROM CUSTOMER_CONFIGURATION WHERE CCN_ID IN(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,35,37,43)";
  var cust_config_result=cust_config_stmt.executeQuery(cust_config_query);
  var cust_config_array=[];
  while(cust_config_result.next())
  {
    cust_config_array.push(cust_config_result.getString(1));   
  }
  cust_config_result.close();
  cust_config_stmt.close();
  return cust_config_array;
}
///////////////////////////////////GET DOCUMENT OWNER////////////////////
function CUST_documentowner(conn)
{
  var docstmt=conn.createStatement();
  var docid="";
  if((UserStamp).toString().toLowerCase().match("expatsint"))
  {
    docid=3;
  }
  else if((UserStamp).toString().toLowerCase().match("gmail"))
  {
    docid=7;
  }
  else if((UserStamp).toString().toLowerCase().match("ssomens"))
  {
    docid=8;
  }
  var docresult=docstmt.executeQuery("SELECT EL_EMAIL_ID FROM EMAIL_LIST WHERE EP_ID="+docid+"");
  if(docresult.next())
  {
    var docowner=docresult.getString(1);
  }
  docresult.close();
  docstmt.close();
  return docowner;
}
///////////////INVOICE AND CONTRACT EMAIL SUB AND BODY OF MESSAGE/////////////////
function CUST_emailsubandmessages(conn)
{
  var invoicecontractemail="SELECT ETD_EMAIL_SUBJECT,ETD_EMAIL_BODY FROM EMAIL_TEMPLATE_DETAILS WHERE ET_ID IN(2,5,8) ORDER BY ET_ID ASC";
  var invoicecontractstmt=conn.createStatement();
  var invoicecontractresult=invoicecontractstmt.executeQuery(invoicecontractemail);
  var invoicecontract_array=[]
  while(invoicecontractresult.next())
  {
    var subject_db=invoicecontractresult.getString("ETD_EMAIL_SUBJECT");
    var message_db=invoicecontractresult.getString("ETD_EMAIL_BODY");
    var invoicecontractresults={subject:subject_db,message:message_db};
    invoicecontract_array.push(invoicecontractresults);
  }
  invoicecontractresult.close();
  invoicecontractstmt.close();
  return invoicecontract_array;
}
/////////////////INVOICE SERIALNO UPDATION//////////////////
function CUST_invoicesearialnoupdation(conn,Slno)
{
  var updateinvoiceid="UPDATE CUSTOMER_CONFIGURATION SET CCN_DATA='"+Slno+"',ULD_ID=((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"')) WHERE CGN_ID=1"
  var invoicestmt=conn.createStatement();
  invoicestmt.execute(updateinvoiceid)
  invoicestmt.close();
}
//INVOICE DATE SERIAL
function CUST_invoiceserialandinvoicedateupdation(conn,Slno,cc_invoicedate)
{ 
  var updateinvoiceid="UPDATE CUSTOMER_CONFIGURATION SET CCN_DATA='"+Slno+"',ULD_ID=((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"')) WHERE CGN_ID=1"
  var updateinvoicedate="UPDATE CUSTOMER_CONFIGURATION SET CCN_DATA='"+cc_invoicedate+"',ULD_ID=((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"')) WHERE CGN_ID=2"
  var invoicestmt=conn.createStatement();
  invoicestmt.execute(updateinvoiceid);
  invoicestmt.execute(updateinvoicedate);
  invoicestmt.close();
}
//FUNCTION TO GET CALENDER ID
function CUST_getCalenderId(conn)
{
  var calstmt=conn.createStatement();
  var calresult=calstmt.executeQuery("SELECT CCN_DATA FROM  CUSTOMER_CONFIGURATION WHERE CCN_ID=9")
  if(calresult.next())
  {
    var calenderIDcode=calresult.getString(1); 
  }
  calresult.close();
  calstmt.close();
  return calenderIDcode;
}
//FUNCTION TO GET FOLDER ID TO PLACE CONTRACT OR INVOICE
function CUST_TargetFolderId(conn)
{
  var ccfolderidstmt=conn.createStatement();
  var ccfolderresult=ccfolderidstmt.executeQuery("SELECT CCN_DATA FROM CUSTOMER_CONFIGURATION WHERE CGN_ID=47");
  if(ccfolderresult.next())
  {
    var Folderid=ccfolderresult.getString(1);
  }
  ccfolderresult.close();
  ccfolderidstmt.close();
  return Folderid;
}
//FUNCTION TO GET ROOM TYPE FOR THE UNIT
function CUST_getRoomType(conn,unitno,roomtype)
{
  var roomtypestmt= conn.createStatement();
  var roomtypearray =[];
  var roomtypequery= "SELECT URTD.URTD_ROOM_TYPE FROM UNIT_ROOM_TYPE_DETAILS URTD,UNIT_ACCESS_STAMP_DETAILS UASD,UNIT U WHERE URTD.URTD_ID=UASD.URTD_ID AND U.UNIT_ID=UASD.UNIT_ID AND U.UNIT_NO="+unitno+" ORDER BY URTD.URTD_ROOM_TYPE ASC"; 
  var roomtyperes = roomtypestmt.executeQuery(roomtypequery);
  while(roomtyperes.next())
  {
    var rmtype=roomtyperes.getString("URTD_ROOM_TYPE");
    if(rmtype!=roomtype)
    {
      roomtypearray.push(rmtype);
    }
  }
  roomtyperes.close();
  roomtypestmt.close();
  return roomtypearray;
}
//FUNCTION TO GET INVENTORY CARD NOS
function CUST_getunitCardNo(conn,unit,firstname,lastname)
{
  var cardnoresult=[];
  var cardnostmt= conn.createStatement();
  var cardnolblval=[];
  var cardnoquery= "SELECT UASD.UASD_ACCESS_CARD FROM UNIT_ACCESS_STAMP_DETAILS UASD,UNIT U WHERE U.UNIT_ID=UASD.UNIT_ID AND U.UNIT_NO="+unit+" AND UASD.UASD_ACCESS_INVENTORY IS NOT NULL AND UASD.UASD_ACCESS_CARD IS NOT NULL ORDER BY UASD.UASD_ACCESS_CARD ASC"; 
  var cardnores = cardnostmt.executeQuery(cardnoquery);
  while(cardnores.next())
  {
    var cardno=cardnores.getString("UASD_ACCESS_CARD");
    cardnoresult.push(cardno);   
  }
  for(var i=0;i<cardnoresult.length;i++)
  {
    if(i<=3)
    {
      if(i==0)
      {
        cardnolblval.push(firstname+" "+lastname);
      }
      else
      {
        cardnolblval.push("GUEST "+i);
      }
    }
  }
  cardnoresult=[cardnoresult,cardnolblval];
  cardnores.close();
  cardnostmt.close();
  return cardnoresult;
}
//FUNCTION TO CHK PRORATED OR NOT
function CUST_chkProrated(db_chkindate,db_chkoutdate)
{
  var chkproflag="";
  var db_chkindate1=SqlDateFormat(db_chkindate).split('-');
  var db_chkoutdate1=SqlDateFormat(db_chkoutdate).split('-')
  var chkin =new Date(db_chkindate1[0],db_chkindate1[1]-1,db_chkindate1[2]); // to convert check in date
  var chkout=new Date(db_chkoutdate1[0],db_chkoutdate1[1]-1,db_chkoutdate1[2]); // to convert check out date
  if(db_chkoutdate=="")
  {
    chkproflag=false;
  }
  else
  {
    var Leaseperiod  = leasePeriodCalc(chkin,chkout);
    var yearchk=Leaseperiod.search('Year');
    var monthschk=Leaseperiod.search('Months');
    var monthchk=Leaseperiod.search('Month');
    var daychk=Leaseperiod.search('Day');
    if((yearchk>0)||(monthschk>0)||((monthchk>0)&&(daychk>0)))
    {
      chkproflag=true;
    }
    else if(((yearchk<0)&&(monthschk<0)&&(daychk>0)&&(monthchk<0))||((yearchk<0)&&(monthschk<0)&&(daychk<0)&&(monthchk>0)))
    {
      chkproflag=false;
    }
  }
  return chkproflag;
}
//FUNCTION TO GET CALENDAR TO TIME
function CUST_CalTotime(conn,endtime)
{
  var enddtimestmt=conn.createStatement();
  var time=[];
  var enddtimeresultset=enddtimestmt.executeQuery("SELECT DATE_FORMAT(CTP_DATA, '%H:%i') FROM CUSTOMER_TIME_PROFILE");
  while(enddtimeresultset.next())
  {
    var endtimeval=enddtimeresultset.getString(1);
    time.push(endtimeval);
  }
  enddtimeresultset.close();
  enddtimestmt.close();
  var timearray=[];
  for(var i=0;i<time.length;i++)
  {
    if(endtime==time[i])
    {
      var endtime_status=i;
      break;
    }
  } 
  if(endtime=="23:30")
  {
    timearray.push("23:59");
  }
  else if(endtime=="23:00")
  {
    timearray.push("23:30");
    timearray.push("23:59");
  }
  else
  {
    var length=endtime_status+2;
    for(var j=endtime_status+1;j<=length;j++)
    {
      timearray.push(time[j]);
    }
  }
  return timearray;
}
//FUNCTION TO GET CALENDAR FROM TIME
function CUST_getCalendarTime(conn)
{
  var timearray=[];
  var timestmt=conn.createStatement();
  var time=[];
  var timeresultset=timestmt.executeQuery("SELECT DATE_FORMAT(CTP_DATA, '%H:%i') FROM CUSTOMER_TIME_PROFILE");
  while(timeresultset.next())
  {
    if(timeresultset.getString(1)=="23:59")continue;
    timearray.push(timeresultset.getString(1));
  }
  timeresultset.close();
  timestmt.close();
  return timearray;
}
//FUNCTION TO GET PRORATED WAIVED VALUE
function CUST_getProratedWaivedValue(conn)
{
  var prowavstmt = conn.createStatement();
  var prowav_array =[];
  var prowav_query = "SELECT CCN_DATA FROM CUSTOMER_CONFIGURATION WHERE CCN_ID IN(7,8) ORDER BY CCN_ID ASC"; 
  var prowav_result = prowavstmt.executeQuery(prowav_query);
  while(prowav_result.next())
  {
    prowav_array.push(prowav_result.getString("CCN_DATA"));
  }
  prowav_result.close();
  prowavstmt.close();
  return prowav_array;
}
//FUNCTION TO GET PROFILE MAIL IDS 
function getProfileEmailId(conn,formname)
{
  var mailstmt = conn.createStatement();
  var mail_array =[];
  var formid=0;
  if(formname=="CREATION_UAT")//CUSTOMER CREATION UAT
  {
    formid=24;
  }  
  if(formname=="CREATION")//CUSTOMER CREATION
  {
    formid=1;
  }
  if(formname=="RECHECKIN")//CUSTOMER RECHECK IN
  {
    formid=13;
  }
  if(formname=="EXTENSION")//CUSTOMER EXTENSION
  {
    formid=14;
  }
  if(formname=="DD")//DEPOSIT EXTRACT PDF
  {
    formid=15;
  }
  if(formname=="EXPIRY")//EXPIRY LIST
  {
    formid=16;
  }
  if(formname=="OPL&ACTIVE CC")//OPL&ACTIVE CC LIST
  {
    formid=17;
  }
  if(formname=="REPORT")//REPORT
  {
    formid=20;
  }
  var mail_query = "SELECT DISTINCT EL_EMAIL_ID FROM EMAIL_LIST WHERE EP_ID="+formid+" ORDER BY EL_EMAIL_ID ASC"; 
  if(formname=="CSV"||formname=="ERM"||formname=="ACTIVE_CC_TRIGGER"||formname=="BANKTT"||formname=="DROPTABLE")
  {
    if(formname=="CSV")
    {
      formid="4,5,6";
    }
    if(formname=="ERM")
    {
      formid="9,10";
    }
    if(formname=="ACTIVE_CC_TRIGGER")
    {
      formid="18,19";
    }
    if(formname=="BANKTT")
    {
      formid="11,12";
    }
    if(formname=="DROPTABLE")
    {
      formid="22,23";
    }
    var mail_query="SELECT EL_EMAIL_ID FROM EMAIL_LIST WHERE EP_ID IN("+formid+") ORDER BY EP_ID ASC";
  }
  var mail_result = mailstmt.executeQuery(mail_query);
  while(mail_result.next())
  {
    mail_array.push(mail_result.getString("EL_EMAIL_ID"));
  }
  mail_result.close();
  mailstmt.close();
  return mail_array;
}
//FUNCTION TO GET NATIONALITY
function CUST_getNationality(conn)
{
  var nationstmt = conn.createStatement();
  var nation_array =[];
  var nation_query = "SELECT *FROM NATIONALITY_CONFIGURATION ORDER BY NC_DATA ASC"; 
  var nation_result = nationstmt.executeQuery(nation_query);
  while(nation_result.next())
  {
    nation_array.push(nation_result.getString("NC_DATA"));
  }
  nation_result.close();
  nationstmt.close();
  return nation_array;
}
//FUNCTION TO GET CONTRACT/INVOICE OPTION VALUE
function CUST_getOptionValue(conn)
{
  var optionstmt = conn.createStatement();
  var option_array =[];
  var option_query = "SELECT CCN_ID,CCN_DATA FROM CUSTOMER_CONFIGURATION WHERE CGN_ID=3 ORDER BY CCN_DATA ASC"; 
  var option_result = optionstmt.executeQuery(option_query);
  while(option_result.next())
  {
    option_array.push({optionid:option_result.getString("CCN_ID"),optionname:option_result.getString("CCN_DATA")});
  }
  option_result.close();
  optionstmt.close();
  return option_array;
}
//CONVERT DATE FORMAT
function SqlDateFormat(inputdate){
  if(inputdate!=undefined){
    var string  = inputdate.search("-")!=-1?inputdate.split("-"):inputdate.split("/");
    return string[2]+'-'+ string[1]+'-'+string[0];
  }
  return null;
}
///GET TIMEZONE
function getTimezone()
{
  return ("'+00:00','+08:00'");
}
///GET CALENDAR SD
function getCustomerStartdate(conn)
{
  var customerstartdatestmt=conn.createStatement();
  var customerstartdatequery="SELECT CCN_DATA FROM CUSTOMER_CONFIGURATION WHERE CGN_ID=76";
  var customerstartdateresult=customerstartdatestmt.executeQuery(customerstartdatequery);
  if(customerstartdateresult.next())
  {
    var customerSD=customerstartdateresult.getString(1);
  }
  customerstartdateresult.close();
  customerstartdatestmt.close();
  return customerSD;
}
//CHECK FOR ALREADY EXISTS FOR DOOR CODE AND WEB LOGIN
function Check_ExistsDoorcodeLogin(conn,value,flag)
{
  var USRC_UPDCODE_stmt_unit = conn.createStatement();
  if(flag=='UNIT_tb_doorcode')
    var USRC_UPDCODE_unitno_select="SELECT * FROM UNIT_LOGIN_DETAILS WHERE ULDTL_DOORCODE='"+value+"'";
  else if(flag=='UNIT_tb_weblogin')
    var USRC_UPDCODE_unitno_select="SELECT * FROM UNIT_LOGIN_DETAILS WHERE ULDTL_WEBLOGIN='"+value+"'";
  var USRC_UPDCODE_flag=1;
  var USRC_UPDCODE_unitno_rs=USRC_UPDCODE_stmt_unit.executeQuery(USRC_UPDCODE_unitno_select);
  while(USRC_UPDCODE_unitno_rs.next())
  {
    USRC_UPDCODE_flag=0;
  }
  USRC_UPDCODE_unitno_rs.close();USRC_UPDCODE_stmt_unit.close();
  return [USRC_UPDCODE_flag,flag];
}
//FUNCTION TO GET UNIT SDATE AND EDATE AND INVDATE ADDING AND SUBTR USING CONFIG MONTH
function GetUnitSdEdInvdate(conn,unitno)
{
  var BDLY_INPUT_sp_stmt = conn.createStatement();
  BDLY_INPUT_sp_stmt.execute("CALL SP_CONFIG_SDATE_EDATE((SELECT UNIT_ID FROM UNIT WHERE UNIT_NO="+unitno+"),@SDATE,@EDATE,@INVDATE)");
  BDLY_INPUT_sp_stmt.close();
  var BDLY_INPUT_sp_stmt = conn.createStatement();
  var BDLY_INPUT_sp_rs = BDLY_INPUT_sp_stmt.executeQuery("SELECT @SDATE,@EDATE,@INVDATE");
  while(BDLY_INPUT_sp_rs.next())
  {
    var BDLY_INPUT_getsdate=BDLY_INPUT_sp_rs.getString(1);
    var BDLY_INPUT_getedate=BDLY_INPUT_sp_rs.getString(2);
    var BDLY_INPUT_invdate=BDLY_INPUT_sp_rs.getString(3);
  }      
  var BDLY_INPUT_unitdate={"unitsdate":BDLY_INPUT_getsdate,"unitedate":BDLY_INPUT_getedate,"invdate":BDLY_INPUT_invdate}
  return BDLY_INPUT_unitdate;
}
//FUNCTION TO GET CURRENT TIMEZONE IN 24 HRS FORMAT
function gettimezone24HRS()
{
  var now = new Date();
  var month=(now.getMonth() + 1).toString();
  if(month.length==1){month='0'+month}
  var day=(now.getDate()).toString();
  if(day.length==1){day='0'+day}
  var hours=(now.getHours()).toString();
  if(hours.length==1){hours='0'+hours};
  var min=(now.getMinutes()).toString();
  if(min.length==1){min='0'+min};
  var sec=(now.getSeconds()).toString();
  if(sec.length==1){sec='0'+sec};
  return [day +'-'+month+'-'+now.getFullYear()+' '+hours+':'+min+':'+sec];
}    //GET THE INVOICE FROM THE EXPENSE UNIT TABLE//
function BDLY_getinvoicefrom(conn)
{
  var BDLY_dataArray=[];
  var BDLY_stmt=conn.createStatement();
  var BDLY_INPUT_expperquery="SELECT EU_INVOICE_FROM FROM EXPENSE_UNIT";
  var BDLY_rs = BDLY_stmt.executeQuery(BDLY_INPUT_expperquery);
  while(BDLY_rs.next()) {
    if((BDLY_rs.getString('EU_INVOICE_FROM')!=null)&&(BDLY_rs.getString('EU_INVOICE_FROM')!=''))
    BDLY_dataArray.push(BDLY_rs.getString('EU_INVOICE_FROM'));
  }
  BDLY_rs.close();
  BDLY_stmt.close();
  return BDLY_dataArray;
}
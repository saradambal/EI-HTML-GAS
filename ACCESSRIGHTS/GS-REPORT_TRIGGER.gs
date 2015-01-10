//*******************************************TRIGGER*********************************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY:KUMAR
//VER 2.05-SD:03/09/2014,ED:03/09/2014 TRACKER NO:changed old records select query and did exception mail part corrections and added one parameter in temp table drop call query.
//VER 2.04-SD:02/09/2014,ED:02/09/2014 TRACKER NO:updated maintainance mail id.
//VER 2.03-SD:02/09/2014,ED:02/09/2014 TRACKER NO:771,added condition if old bal amt is empty means 0 in updation part;
//VER 2.02-SD:01/09/2014,ED:01/09/2014 TRACKER NO:771,added condition if old bal amt is empty means 0;
//VER 2.01-SD:27/08/2014,ED:27/08/2014 TRACKER NO:771,Removed some repeated queries and script lines and i called trigger del function before conformation mail and after exception mail.
//VER 2.00-SD:26/08/2014,ED:26/08/2014 TRACKER NO:771,Updated getEffective user timestamp in all trigger script and tested.
//VER 1.09-SD:25/08/2014,ED:25/08/2014 TRACKER NO:771,changed trigger del function position in script and changed getScriptTriggers() to getProjectTriggers();
//VER 1.08-SD:22/08/2014 ED:22/08/2014 TRACKER NO:771,Updated new jquery and css links and implemented rollback and commit in csv updation script.
//VER 1.07-SD:14/08/2014,ED:14/08/2014 TRACKER NO:771,Added instance name and schema name in temp table drop trigger mail sub and body.
//VER 1.06-SD:07/08/2014,ED:07/08/2014 TRACKER NO:771,Cleared email template date replace issue.
//VER 1.05-SD:06/08/2014,ED:06/07/2014 TRACKER NO:771,set flag if temptable don't have any records means mail not send
//VER 1.04-SD:23/07/2014,ED:23/07/2014 TRACKER NO:771,updated temp table trigger script in trigger form.
//VER 1.03-SD:23/07/2014,ED:23/07/2014 TRACKER NO:771,updated new termination script.
//VER 1.02-SD:11/07/2014,ED:11/07/2014 TRACKER NO:771,Did new CR in csv updation script and erm leeds trigger added
//VER 1.01-SD:18/06/2014 ED:23/06/2014,TRACKER NO:771,Cnanged csv updation script,now ll accept any format asc or desc csv file.
//VER 1.00-SD:06/06/2014 ED:06/06/2014,TRACKER NO:771,changed preloader and jquery,css links.
//VER 0.09-SD:29/05/2014,ED:29/05/2014 TRACKER NO:771,added new trigger script after changing dynamic temp tables and changed table names.
//VER 0.08-SD:21/04/2014,ED:22/04/2014 TRACKER NO:771,Did New CR in Active customer list trigger.
//VER 0.07-SD:17/04/2014,ED:18/04/2014 TRACKER NO:771,Did New CR in CSV updation SCRipt and changed table name in payment reminders script.
//VER 0.06-SD:27/03/2014,ED:27/03/2014 TRACKER NO:771,Added menu script in Trigger form.
//VER 0.05-SD:21/0302014,ED:22/03/2014 TRACKER NO:744,Added purge doc function in trigger creation form.and termination function also.
//VER 0.04-SD:11/-2/2014,ED:11/03/2014 TRACKER NO:744,Changed ULD_ID in csv updation script.
//VER 0.03-SD:14/02/2014,ED:15/02/2014 TRACKER NO:744 Did new CR:removed radio buttons and used toggle buttons in trigger form.
//VER 0.02-SD:07/02/2014,ED:10/02/2014 TRACKER NO:  ,Did all CR(mail format changes and CSV records sorting in csv file format and added new date column in mail html table and merge same date in single cell,etc..)
//VER 0.01-INITIAL VERSION, SD:02/01/2014 ED:04/01/2014,TRACKER NO:171
//*********************************************************************************************************//
function CONFIG_commonvalues()
{
  var OCBC_CSV_conn=eilib.db_GetConnection();
  var CSV_TRIGGER_stmt = OCBC_CSV_conn.createStatement();
  var CSV_TRIGGER_array =[];
  var CSV_TRIGGER_query = "SELECT TC_ID,TC_DATA FROM TRIGGER_CONFIGURATION WHERE CGN_ID=31"; 
  var CSV_TRIGGER_result = CSV_TRIGGER_stmt.executeQuery(CSV_TRIGGER_query);
  while(CSV_TRIGGER_result.next())
  {
    if(CSV_TRIGGER_result.getString("TC_ID")!=8 && CSV_TRIGGER_result.getString("TC_ID")!=10 && CSV_TRIGGER_result.getString("TC_ID")!=11 && CSV_TRIGGER_result.getString("TC_ID")!=12 && CSV_TRIGGER_result.getString("TC_ID")!=14)
    {
      CSV_TRIGGER_array.push({tcid:CSV_TRIGGER_result.getString("TC_ID"),tcdata:CSV_TRIGGER_result.getString("TC_DATA")});
    }
  }
  CSV_TRIGGER_result.close();
  CSV_TRIGGER_stmt.close();
  return CSV_TRIGGER_array;
}
//////////////////TRIGGER CREATION AND DELETION AND TRIGGER STATUS FUNCTION/////////////////////
function CONFIG_TRIGGER_creation(CSV_TRIGGER_selectedtrigger,CSV_TRIGGER_radiooption)
{
  var n=CSV_TRIGGER_selectedtrigger.replace(/ /g,"");
  var selecteditem='MANUAL_'+n;
  if(CSV_TRIGGER_radiooption=='TRIGGER_ON')
  {
    if(CSV_TRIGGER_selectedtrigger=="NON PAYMENT REMINDER")
    {
      ScriptApp.newTrigger("MANUAL_NONPAYMENTREMINDER").timeBased().everyMinutes(5).create();
    }
    if(CSV_TRIGGER_selectedtrigger=="MONTHLY PAYMENT REMINDER")
    {
      ScriptApp.newTrigger('MANUAL_MONTHLYPAYMENTREMINDER').timeBased().everyMinutes(5).create();
    }
    else if(CSV_TRIGGER_selectedtrigger=="CUSTOMER EXPIRY X WEEK")
    {
      ScriptApp.newTrigger('MANUAL_CUSTOMEREXPIRYXWEEK').timeBased().everyMinutes(5).create();
    }
    if(CSV_TRIGGER_selectedtrigger=="CUSTOMER TERMINATION")
    {
      ScriptApp.newTrigger('MANUAL_CUSTOMERTERMINATION').timeBased().everyMinutes(5).create();
    }
    if(CSV_TRIGGER_selectedtrigger== "CSV UPDATION")
    {
      ScriptApp.newTrigger('MANUAL_CSVUPDATION').timeBased().everyMinutes(5).create();
    }
    if(CSV_TRIGGER_selectedtrigger== "PURGE DOC")
    {
      ScriptApp.newTrigger('MANUAL_PURGEDOC').timeBased().everyMinutes(5).create();
    }
    if(CSV_TRIGGER_selectedtrigger== "SITE ACCESS")
    {
      ScriptApp.newTrigger('MANUAL_SITEACCESS').timeBased().everyMinutes(1).create();
    }
    var csv_flag=0;
  }
  if(CSV_TRIGGER_radiooption=='TRIGGER_OFF')
  {
    var allTriggers = ScriptApp.getProjectTriggers();
    if(allTriggers.length!=0)
    {
      for(var i=0; i < allTriggers.length; i++)
      {
        var s=allTriggers[i].getHandlerFunction();
        if(s==selecteditem)
        {
          ScriptApp.deleteTrigger(allTriggers[i]);
        }
      }
    }
    csv_flag=1;
  }
  if(CSV_TRIGGER_radiooption=='TRIGGER_STATUS')
  {
    var allTriggers = ScriptApp.getProjectTriggers();
    if(allTriggers.length!=0)
    {
      for(var i=0; i < allTriggers.length; i++)
      {
        var s=allTriggers[i].getHandlerFunction();
        if(s==selecteditem)
        {
          csv_flag=2;////trigger on
        }
        else
        {
          csv_flag=3;
        }
      }
    }
    else
    {
      csv_flag=3;
    }
  }
  return csv_flag;
}
function MANUAL_PURGEDOC()
{
  PURGEDOC();
  Manual_TriggerDeletion('MANUAL_PURGEDOC')
}
function MANUAL_CUSTOMERTERMINATION()
{
  CUSTOMERTERMINATION();
  Manual_TriggerDeletion('MANUAL_CUSTOMERTERMINATION')
}
function MANUAL_CUSTOMEREXPIRYXWEEK()
{
  CUSTOMEREXPIRYXWEEK();
  Manual_TriggerDeletion('MANUAL_CUSTOMEREXPIRYXWEEK')
}
function MANUAL_NONPAYMENTREMINDER()
{
  NONPAYMENTREMINDER();
  Manual_TriggerDeletion('MANUAL_NONPAYMENTREMINDER')
}
function MANUAL_MONTHLYPAYMENTREMINDER()
{
  MONTHLYPAYMENTREMINDER();
  Manual_TriggerDeletion('MANUAL_MONTHLYPAYMENTREMINDER')
}
function MANUAL_SITEACCESS()
{
  SITEACCESS();
  Manual_TriggerDeletion('MANUAL_SITEACCESS');
}
function Manual_TriggerDeletion(manualtriggername)
{
  var allTriggers = ScriptApp.getProjectTriggers();
  for(var i=0; i < allTriggers.length; i++)
  {
    var triggername=allTriggers[i].getHandlerFunction();
    if(triggername==manualtriggername)
    {
      ScriptApp.deleteTrigger(allTriggers[i]);
    }
  }
}
function Trigger_Run_Time(conn,Triggername)
{
  var TriggertimeStmt=conn.createStatement();
  var Triggerdatetime=Utilities.formatDate(new Date(), TimeZone, 'yyyy-MM-dd hh:mm:ss')
  var TriggerRuntimequery="INSERT INTO TRIGGER_EXECUTION_DETAILS(TC_ID,TED_TIME,ULD_ID) VALUES((SELECT TC_ID FROM TRIGGER_CONFIGURATION WHERE TC_DATA='"+Triggername+"'),'"+Triggerdatetime+"',(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+trg_UserStamp+"'))";
  TriggertimeStmt.execute(TriggerRuntimequery);
  TriggertimeStmt.close();
}
/////////////////////CSV UPDATION FUNCTION///////////////////////////
function MANUAL_CSVUPDATION()
{
  try
  {
    var OCBC_CSV_conn=eilib.db_GetConnection();
    var maillistarray=eilib.getProfileEmailId(OCBC_CSV_conn,'CSV');
    var mailid=maillistarray[0];
    var ccmailid=maillistarray[1];
    var maintain_mailid=maillistarray[2];
    Trigger_Run_Time(OCBC_CSV_conn,'CSV UPDATION');
    var userstampidstmt=OCBC_CSV_conn.createStatement();
    var userstampquery="SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+trg_UserStamp+"'";
    var userstampidresult=userstampidstmt.executeQuery(userstampquery);
    if(userstampidresult.next())
    {
      var Userstamp_id=userstampidresult.getString(1);
    }
    userstampidresult.close();
    userstampidstmt.close();
    var OCBC_CSV_folderidstmt=OCBC_CSV_conn.createStatement();
    var OCBC_CSV_folderquery="SELECT OCN_DATA FROM OCBC_CONFIGURATION WHERE CGN_ID=29";
    var OCBC_CSV_folderresult=OCBC_CSV_folderidstmt.executeQuery(OCBC_CSV_folderquery);
    if(OCBC_CSV_folderresult.next())
    {
      var OCBC_CSV_folderid=OCBC_CSV_folderresult.getString(1);
    }
    OCBC_CSV_folderresult.close();
    OCBC_CSV_folderidstmt.close();
    var files= DriveApp.getFolderById(OCBC_CSV_folderid).getFiles();
    var filearray=[];
    while(files.hasNext())
    {
      var csvfilename=files.next().toString();
      var n = csvfilename.search(".CSV");
      if(n!=-1)
      {
        filearray.push(csvfilename);
      }
    }
    if(filearray.length==0)
    {
      MailApp.sendEmail(maintain_mailid, 'WARNING MESSAGE', "CSV FILE DOESN'T EXISTIN DRIVE SO TRIGGER IS OFF");
      CSVtriggerDeletion();
    }
    else
    {
      var filescheck= DriveApp.getFolderById(OCBC_CSV_folderid).getFiles();
      var filename_array=[];
      while(filescheck.hasNext())
      {
        var file_name=filescheck.next();
        filename_array.push(file_name);
        csvFile = file_name.getAs('text/plain').getDataAsString();
      }
      var csvFullData = CSVToArray(csvFile, ",");
      
      var csvmonth=filename_array[0].toString();
      var csv_syear=csvmonth.substring(0,4);
      var csv_smonth=csvmonth.substring(4,6);
      var csvfilemonth=csv_syear+'-'+csv_smonth;
      var selectedmonthcsv=csv_syear+''+csv_smonth;
      /**************************CURRENT MONTH CSV UPDATED RECORDS(DESC DETAILS AND CLIENT REFERENCE)************************************/ 
      var csv_dbrecords=[];
      var aftercsv_dbrecords=[];
      var updatedrecordstmt=OCBC_CSV_conn.createStatement();
      var updatedrecordquery="SELECT OBR_TRANSACTION_DESC_DETAILS,OBR_CLIENT_REFERENCE,OBR_REF_ID,OBR_BANK_REFERENCE,OBR_POST_DATE FROM OCBC_BANK_RECORDS WHERE OBR_REF_ID LIKE '"+selectedmonthcsv+"%' ORDER BY OBR_REF_ID ASC";
      var updatedrecordresult=updatedrecordstmt.executeQuery(updatedrecordquery);
      while(updatedrecordresult.next())
      {
        if(updatedrecordresult.getString(1)==null || updatedrecordresult.getString(1)=="")
        {var transactiondesc=""}
        else
        {transactiondesc=updatedrecordresult.getString(1);}
        if(updatedrecordresult.getString(2)==null || updatedrecordresult.getString(2)=="")
        {var clientref=""}
        else
        {clientref=updatedrecordresult.getString(2);}
        var refid=updatedrecordresult.getString(3);
        if(updatedrecordresult.getString(4)==null || updatedrecordresult.getString(4)=="")
        {var bankref=""}
        else
        {bankref=updatedrecordresult.getString(4);}
        var postdate=updatedrecordresult.getString(5);
        postdate=postdate.replace(/-/g,"");
        csv_dbrecords.push(refid+'!~'+postdate+"_"+clientref+"_"+transactiondesc+"_"+bankref);
        aftercsv_dbrecords.push(postdate+"_"+clientref+"_"+transactiondesc+"_"+bankref);
      }
      updatedrecordresult.close();
      updatedrecordstmt.close();
      var dbrecordscount=csv_dbrecords.length;
      /************************CSV FILE RECORDS***************************************/
      var csvData=[];
      var csvrecordsdate=[];
      for(var h=0;h<csvFullData.length;h++)
      {
        var CSV_array=csvFullData[h].toString();
        var array1=CSV_array.split(',');
        var csv_date3=array1[12];
        if(csv_date3!='undefined'&& csv_date3!="" && csv_date3!=undefined)
        {
          csvrecordsdate.push(csv_date3);
          csvData.push(csvFullData[h]) 
        }
      }
      csvrecordsdate.sort();
      csvrecordsdate=eilib.unique(csvrecordsdate);
      
      /************************CSV ARRAY COMPARISION************************************/
      var selectedmonthexistingrecords=[];
      var matchedcsvrecords=[];
      var csvrecordsupdatedarray=[];
      for(var b=0;b<csvData.length;b++)
      {
        var CSV=csvData[b].toString();
        var array1=CSV.split(',');
        var clientrefe=array1[16];
        if(clientrefe=='000000000001')
        {
          clientrefe=1;
        }
        
        var CSV_newRecord=(array1[11]+'_'+clientrefe+'_'+array1[17]+'_'+array1[18]).toString();
        for(var a=0;a<csv_dbrecords.length;a++)
        {
          var csvdb_record=csv_dbrecords[a].split('!~');
          var csvdbrecords=csvdb_record[1];
          if(CSV_newRecord==csvdbrecords)
          {
            var reference_id=csvdb_record[0];
            var csvrecordsupdated=array1[11]+'_'+clientrefe+'_'+array1[17]+'_'+array1[18]
            csvrecordsupdatedarray.push(csvrecordsupdated);
            matchedcsvrecords.push(CSV_newRecord);
            var csvRecordsobj={id:reference_id,accno:array1[0],currency:array1[1],previous:array1[2],openbal:array1[3],closebal:array1[4],lastbal:array1[5],noofcr:array1[6],transdate:array1[7],noofdeb:array1[8],oldbal:array1[9],debamt:array1[10],postdate:array1[11],valuedate:array1[12],debitamount:array1[13],creditamount:array1[14],trxcode:array1[15],clientrefer:array1[16],transdesc:array1[17],bankref:array1[18],trxtype:array1[19]};
            selectedmonthexistingrecords.push(csvRecordsobj);
          }
        }
      }
      var csvmatchingrecordcount=selectedmonthexistingrecords.length;
      if(dbrecordscount==csvmatchingrecordcount)
      {
        var insertflag=1;
        //**********************DB CURRENT MONTH RECORDS UPDATE*********************//
        if(selectedmonthexistingrecords.length!=0)
        {
          for(var old=0;old<selectedmonthexistingrecords.length;old++)
          {
            var oldrecord=selectedmonthexistingrecords[old];
            var oldref_id=oldrecord.id;
            var value_date=Dateconversion(oldrecord.valuedate);
            if(oldrecord.oldbal=="" || oldrecord.oldbal==" ")
            {
              var csvoldbal=0;
            }
            else
            {
              csvoldbal=oldrecord.oldbal;
            }
            var oldrecordupdatestmt=OCBC_CSV_conn.createStatement();
            var oldrecordupdatequery="UPDATE OCBC_BANK_RECORDS SET OBR_VALUE_DATE='"+value_date+"',OBR_LAST_BALANCE="+oldrecord.lastbal+",OBR_NO_OF_CREDITS="+oldrecord.noofcr+",OBR_NO_OF_DEBITS="+oldrecord.noofdeb+",OBR_OLD_BALANCE="+csvoldbal+",OBR_CLOSING_BALANCE="+oldrecord.closebal+",OBR_D_AMOUNT="+oldrecord.debamt+" WHERE OBR_REF_ID="+oldref_id+"";
            oldrecordupdatestmt.execute(oldrecordupdatequery);
            oldrecordupdatestmt.close();
          }
        }
        //*****************************************NEW CSV RECORDS******************************************************//
        var c=0;
        var newcsvfilerecords=[];
        var oldcsvcount=parseInt(csv_dbrecords.length)+1;
        for(var h=0;h<csvData.length;h++)
        {
          var CSV=csvData[h].toString();
          var array2=CSV.split(',');
          var reference_id=selectedmonthcsv+''+oldcsvcount;
          var clientrefe=array2[16];
          if(clientrefe=='000000000001')
          {
            clientrefe=1;
          }
          var CSV_newRecord=(array2[11]+'_'+clientrefe+'_'+array2[17]+'_'+array2[18]).toString();
          if(aftercsv_dbrecords.indexOf(CSV_newRecord)==-1)
          {
            var csvRecordsobject={id:reference_id,accno:array2[0],currency:array2[1],previous:array2[2],openbal:array2[3],closebal:array2[4],lastbal:array2[5],noofcr:array2[6],transdate:array2[7],noofdeb:array2[8],oldbal:array2[9],debamt:array2[10],postdate:array2[11],valuedate:array2[12],debitamount:array2[13],creditamount:array2[14],trxcode:array2[15],clientrefer:clientrefe,transdesc:array2[17],bankref:array2[18],trxtype:array2[19]};
            newcsvfilerecords.push(csvRecordsobject);
            oldcsvcount++;
          }
          c++;
        }
        newcsvfilerecords=newcsvfilerecords.sort(compare);
      }
      else
      {
        insertflag=0;
        
        var exception_array=[];
        for(var e=0;e<csv_dbrecords.length;e++)
        {
          var exp_csvdb_record=csv_dbrecords[e].split('!~');
          var csvdbrecords=exp_csvdb_record[1];
          if(csvrecordsupdatedarray.indexOf(csvdbrecords)==-1)
          {
            exception_array.push(exp_csvdb_record[0])
          }
        }
        var finalexceptionrecords="FOLLOWING SQL TABLE RECORD(S) NOT MATCHING TO CSV FILE RECORDS..."
        for(var t=0;t<exception_array.length;t++)
        {
          if(t==0)
          {
            var errorrecordrefid=exception_array[t];
          }
          else
          { 
            errorrecordrefid=errorrecordrefid+','+exception_array[t]; 
          }
        }
        var errstmt= OCBC_CSV_conn.createStatement();
        var errcode =[],errmsg =[];
        var errquery= "SELECT OCB.OCN_DATA AS ACCOUNT,OCA.OCN_DATA AS CURRENCY,OBR.OBR_OPENING_BALANCE,OBR.OBR_CLOSING_BALANCE,OBR.OBR_PREVIOUS_BALANCE,OBR.OBR_LAST_BALANCE,OBR.OBR_NO_OF_CREDITS,OBR.OBR_TRANS_DATE,OBR.OBR_NO_OF_DEBITS,OBR.OBR_OLD_BALANCE,OBR.OBR_D_AMOUNT,OBR.OBR_POST_DATE,OBR.OBR_VALUE_DATE,OBR.OBR_DEBIT_AMOUNT,OBR.OBR_CREDIT_AMOUNT,OCN.OCN_DATA,OBR.OBR_CLIENT_REFERENCE,OBR.OBR_TRANSACTION_DESC_DETAILS,OBR.OBR_BANK_REFERENCE,OBR.OBR_TRX_TYPE FROM OCBC_CONFIGURATION OCN,OCBC_BANK_RECORDS OBR LEFT JOIN OCBC_CONFIGURATION OCA ON OBR.OBR_CURRENCY=OCA.OCN_ID LEFT JOIN OCBC_CONFIGURATION OCB ON OBR.OBR_ACCOUNT_NUMBER=OCB.OCN_ID  WHERE OBR.OCN_ID=OCN.OCN_ID AND  OBR.OBR_REF_ID IN("+errorrecordrefid+") ORDER BY OBR.OBR_REF_ID ASC";
        var errres = errstmt.executeQuery(errquery);
        var final_exp_array=[];  
        var csverrorbodymessage="The Following DB CSV Records Wrong or Missing in CSV File Compare to Previous Day CSV File    ";
        var emptyspace="                                      ";
        while(errres.next())
        {
          var insidearray=[];
          for(var g=1;g<=20;g++)
          {
            insidearray.push(errres.getString(g));
          }
          final_exp_array.push(insidearray);
          var error=insidearray
          csverrorbodymessage=csverrorbodymessage+ '\n\n' +error;
        }
        MailApp.sendEmail(maintain_mailid, 'Exception CSV Records',csverrorbodymessage);
        CSVtriggerDeletion();
      }
      function compare(a,b) {
        if (a.valuedate < b.valuedate)
          return -1;
        if (a.valuedate > b.valuedate)
          return 1;
        return 0;
      }
      
      //************************ NEW RECORDS INSERT PART**********************************//
      if(insertflag==1)
      {
        OCBC_CSV_conn.setAutoCommit(false);
        if(newcsvfilerecords.length!=0)
        {
          var csvlength=1;
          var date_array=[];
          var Ref_array=[];
          var debit_array=[];
          var credit_array=[];
          var mailrecord_array=[];
          var newdatearray=[];
          var creditcount=0;
          var debitcount=0;
          var csv_timstamp=Utilities.formatDate(new Date(), TimeZone, 'dd-MM-yyyy hh:mm:ss');
          for(var csv=0;csv<newcsvfilerecords.length;csv++)
          {
            var mailflag=1;
            var CSV_array=newcsvfilerecords[csv];
            var transdate=Dateconversion(CSV_array.transdate);
            var postdate=Dateconversion(CSV_array.postdate);
            var valuedate=Dateconversion(CSV_array.valuedate);
            var refid=CSV_array.id;
            var debitamt=CSV_array.debitamount;;
            if(debitamt!="0.00" && debitamt!=0 && debitamt!=" " && debitamt!="" && debitamt!=undefined)
            {
              debitcount++;
            }
            debit_array.push(debitamt);
            var creditamt=CSV_array.creditamount;
            if(creditamt!="0.00" && creditamt!=0 && creditamt!=" " && creditamt!="" && creditamt!=undefined)
            {
              creditcount++;
            }
            credit_array.push(creditamt);
            var concat=CSV_array.clientrefer+'-'+CSV_array.transdesc+'-'+CSV_array.bankref;
            var csvmailrecord={date:value_date,debit:debitamt,credit:creditamt,concate:concat}
            mailrecord_array.push(csvmailrecord);
            Ref_array.push(concat);
            newdatearray.push(CSV_array.valuedate);
            var creditamt=CSV_array.creditamount;
            var debitamt=CSV_array.debitamount;
            var bankreff=CSV_array.clientrefer;
            if(bankreff=='000000000001')
            {
              bankreff=1;
            }
            if(bankreff!="" && bankreff!=1)
            {
              bankreff=eilib.ConvertSpclCharString(bankreff);
            }
            var transaction_details=CSV_array.transdesc;
            if(transaction_details!="")
            {
              transaction_details=eilib.ConvertSpclCharString(transaction_details);
            }
            var bankreference=CSV_array.bankref;
            if(bankreference!="")
            {
              bankreference=eilib.ConvertSpclCharString(bankreference);
            }
            if(creditamt==" " || creditamt=="" || creditamt==undefined)
            {
              creditamt=null;
            }
            if(debitamt==" " || debitamt=="" || debitamt==undefined)
            {
              debitamt=null;
            }
            if(CSV_array.oldbal=="" || CSV_array.oldbal==" ")
            {
              var csv_oldbal=0;
            }
            else
            {
              csv_oldbal=CSV_array.oldbal;
            }
            var OCBC_CSV_stmt=OCBC_CSV_conn.createStatement();
            var OCBC_CSV_insertquery="INSERT INTO OCBC_BANK_RECORDS(OBR_ACCOUNT_NUMBER,OBR_CURRENCY,OBR_PREVIOUS_BALANCE,OBR_OPENING_BALANCE,OBR_CLOSING_BALANCE,OBR_LAST_BALANCE,OBR_NO_OF_CREDITS,OBR_TRANS_DATE,OBR_NO_OF_DEBITS,OBR_OLD_BALANCE,OBR_D_AMOUNT,OBR_POST_DATE,OBR_VALUE_DATE,OBR_DEBIT_AMOUNT,OBR_CREDIT_AMOUNT,OCN_ID,OBR_CLIENT_REFERENCE,OBR_TRANSACTION_DESC_DETAILS,OBR_BANK_REFERENCE,OBR_TRX_TYPE,OBR_REF_ID,ULD_ID,OBR_TIMESTAMP) VALUES( (SELECT OCN_ID FROM OCBC_CONFIGURATION WHERE OCN_DATA="+CSV_array.accno+"),(SELECT OCN_ID FROM OCBC_CONFIGURATION WHERE OCN_DATA='"+CSV_array.currency+"'),"+CSV_array.previous+", "+CSV_array.openbal+", "+CSV_array.closebal+", "+CSV_array.lastbal+", "+CSV_array.noofcr+", '"+transdate+"', "+CSV_array.noofdeb+", "+csv_oldbal+", "+CSV_array.debamt+", '"+postdate+"', '"+valuedate+"', "+debitamt+", "+creditamt+",(SELECT OCN_ID FROM OCBC_CONFIGURATION WHERE OCN_DATA='"+CSV_array.trxcode+"'), '"+bankreff+"', '"+transaction_details+"', '"+bankreference+"', '"+CSV_array.trxtype+"', "+CSV_array.id+", "+Userstamp_id+",'"+csv_timstamp+"')";                                                                                       
            OCBC_CSV_stmt.execute(OCBC_CSV_insertquery);
            csvlength++;
          }
          //************************END OF NEW RECORD SAVE PART*************************//
          newdatearray.sort();
          for(var ar=0;ar<newdatearray.length;ar++)
          {
            var value_date=Dateconversionnewdateformat(newdatearray[ar]);
            var datesformat=Utilities.formatDate(new Date(value_date), TimeZone, 'dd-MMM-yyyy'); 
            date_array.push(datesformat);
          }
          var final_count=[];
          var current = null;
          var cnt = 0;
          for (var i = 0; i < date_array.length; i++) 
          {
            if (date_array[i] != current) {
              if (cnt > 0) {
                final_count.push(cnt);
              }
              current = date_array[i];
              cnt = 1;
            } else {
              cnt++;
            }
          }
          if (cnt > 0) {
            final_count.push(cnt);
          }
          mailrecord_array.sort(function(a,b){
            var c = new Date(a.date);
            var d = new Date(b.date);
            return c-d;
          });
          //MAIL SENDING PART
          var totalcount=creditcount+debitcount;
          var unique =eilib.unique(date_array);
          var d=unique+" = "+totalcount+" ( "+creditcount+" - CREDIT(S) ,"+debitcount+" - DEBIT(S) ) NEW RECORDS UPDATED SUCCESSFULLY";
          var message = '<body>'+'<br>'+'<h> '+d+'</h>'+'<br>'+'<br>'+'<table border="1"  width="800">'
          message+='<tr bgcolor="#6495ed" style="color:white" align="center" >'
          message+='<td width=12%><h3>DATE</h3></td>'+'<td width=9%><h3>CREDIT</h3></td>'+'<td width=9%><h3>DEBIT</h3></td>'+'<td width=50%><h3>BANK REFERENCE</h3></td>'+'</tr>' 
          var sum=0;
          for(var v=0;v<final_count.length;v++)
          {
            var limit=sum+final_count[v];
            for(var b=sum;b<limit;b++)
            {
              if(mailrecord_array[b].credit=="0.00" || mailrecord_array[b].credit==0)
              {
                var creditamount="";
              }
              else
              {
                creditamount=mailrecord_array[b].credit;
              }
              if(mailrecord_array[b].debit=="0.00" || mailrecord_array[b].debit==0)
              {
                var debitamount="";
              }
              else
              {
                debitamount=mailrecord_array[b].debit;
              }
              if(b==sum)
              {
                if(b!=0)
                {
                  message+='<tr align="center" >'+'<td align="center" style="font-weight:bold;border-top:2px solid blue;" width=12% rowspan='+final_count[v]+'>'+unique[v]+'</td>'+'<td width=9% style="border-top:2px solid blue;">'+creditamount+'</td>'+'<td width=9% style="border-top:2px solid blue;">'+debitamount+'</td>'+'<td width=50% style="border-top:2px solid blue;">'+mailrecord_array[b].concate+'</td>'+'</tr>';
                }
                else
                {
                  message+='<tr align="center" >'+'<td align="center" style="font-weight:bold;" width=12% rowspan='+final_count[v]+'>'+unique[v]+'</td>'+'<td width=9% >'+creditamount+'</td>'+'<td width=9%>'+debitamount+'</td>'+'<td width=50% >'+mailrecord_array[b].concate+'</td>'+'</tr>';
                }
              }
              else
              {
                message+='<tr align="center" >'+'<td width=9%>'+creditamount+'</td>'+'<td width=9%>'+debitamount+'</td>'+'<td width=50%>'+mailrecord_array[b].concate+'</td>'+'</tr>';
              }
            }
            sum=sum+final_count[v];
          }
        }
        message+='</table>'+'</body>';
        var subjectmess='DATABASE UPDATED-'+unique;
        var displayname="OCBC BANK RECORDS";
        var advancedArgs={cc:ccmailid,name:displayname,htmlBody:message};
        var main_advancedArgs={name:displayname};
        if(mailflag==1)
        {
          CSVtriggerDeletion();
          MailApp.sendEmail(mailid, subjectmess,message,advancedArgs);
          MailApp.sendEmail(maintain_mailid, subjectmess,d,main_advancedArgs);
          OCBC_CSV_conn.commit();
        } 
        if(mailflag!=1)
        {
          var advancedArgs1={name:displayname};
          var message1="NEW DATA NOT AVAILABLE IN CSV FILE SO TRIGGER IS OFF";
          CSVtriggerDeletion();
          MailApp.sendEmail(maintain_mailid, 'CONFORMATION',message1,advancedArgs1);
        }
      }
    }
  }
  catch(err)
  {
    if(err=='TypeError: Cannot call method "toString" of undefined.')
    {
      var message="EMPTY SPACE AVAILABLE IN CSV FILE.SO REMOVE EMPTY LINES AND RUN AGAIN!!!!!!!!!!!"
      }
    else
    {
      message=err;
    }
    MailApp.sendEmail(maintain_mailid, 'Exception', message);
    OCBC_CSV_conn.rollback();
    CSVtriggerDeletion();
  }
}
function CSVtriggerDeletion()
{
  var allTriggers = ScriptApp.getProjectTriggers();
  for(var i=0; i < allTriggers.length; i++)
  {
    var Triggername=allTriggers[i].getHandlerFunction();
    if(Triggername=='MANUAL_CSVUPDATION')
    {
      ScriptApp.deleteTrigger(allTriggers[i]);
    }
  }
}
function Dateconversion(inputdate)
{
  var csv_date3=inputdate.toString();//convert csv date number to string format
  var year_csv3=csv_date3.substring(0,4);
  var month_csv3=csv_date3.substring(4,6);
  var day_csv3=csv_date3.substring(6,8);
  var dategettime3=year_csv3+'-'+month_csv3+'-'+day_csv3; 
  return dategettime3;
}
function Dateconversionnewdateformat(inputdate)
{
  var csv_date3=inputdate.toString();//convert csv date number to string format
  var year_csv3=csv_date3.substring(0,4);
  var month_csv3=csv_date3.substring(4,6);
  var day_csv3=csv_date3.substring(6,8);
  var dategettime3=new Date(year_csv3,month_csv3-1,day_csv3); 
  return dategettime3;
}
function MONTHLYPAYMENTREMINDER()
{
  var OCBC_paymentreminder_conn=eilib.db_GetConnection();
  Trigger_Run_Time(OCBC_paymentreminder_conn,'MONTHLY PAYMENT REMINDER');
  var PAYMENT_reminderdisplayname=eilib.Get_MailDisplayName("MONTHLY_PAYMENT_REMINDER");
  var Reminder_emailtempstmt=OCBC_paymentreminder_conn.createStatement();
  var Reminder_emailtempquery="SELECT *FROM EMAIL_TEMPLATE_DETAILS WHERE ET_ID=11";
  var Reminder_emailtempresult=Reminder_emailtempstmt.executeQuery(Reminder_emailtempquery);
  if(Reminder_emailtempresult.next())
  {
    var emailsub=Reminder_emailtempresult.getString("ETD_EMAIL_SUBJECT");
    var emailmessage=Reminder_emailtempresult.getString("ETD_EMAIL_BODY");
  }
  Reminder_emailtempresult.close();
  Reminder_emailtempstmt.close();
  var CURRENT_MONTH=Utilities.formatDate(new Date(), TimeZone, 'MMMM-yyyy')
  var PAYMENT_reminderstmt=OCBC_paymentreminder_conn.createStatement();
  var PAYMENT_reminderquery="SELECT DISTINCT CUSTOMERNAME,PAYMENT,CPD_EMAIL,UNIT_NO FROM VW_PAYMENT_CURRENT_ACTIVE_CUSTOMER WHERE CLP_ENDDATE>CURDATE() AND CLP_STARTDATE<=CURDATE()AND(CLP_PRETERMINATE_DATE IS NULL OR CLP_PRETERMINATE_DATE>CURDATE())";
  var PAYMENT_reminderresult=PAYMENT_reminderstmt.executeQuery(PAYMENT_reminderquery);
  while(PAYMENT_reminderresult.next())
  {
    var subject=emailsub.replace('[CURRENT_MONTH]',CURRENT_MONTH).toUpperCase();
    var Message=emailmessage.replace('[CURRENT MONTH]',CURRENT_MONTH).toUpperCase();
    var customername=PAYMENT_reminderresult.getString("CUSTOMERNAME");
    Message=Message.replace('[CUSTOMER_NAME]',customername);
    var unit=PAYMENT_reminderresult.getString("UNIT_NO");
    Message=Message.replace("'[UNIT-NO]'",unit);
    var payment=PAYMENT_reminderresult.getString("PAYMENT");
    Message=Message.replace("'[RENTAL_AMOUNT]'",payment);
    var CustomerMailId=PAYMENT_reminderresult.getString("CPD_EMAIL");
    var advancedargs={name:PAYMENT_reminderdisplayname};
    MailApp.sendEmail(CustomerMailId, subject, Message,advancedargs);
  }
  PAYMENT_reminderresult.close();
  PAYMENT_reminderstmt.close();
  OCBC_paymentreminder_conn.close();
}
function NONPAYMENTREMINDER()
{
  try
  {
    var OCBC_nonpaymentreminder_conn=eilib.db_GetConnection();
    Trigger_Run_Time(OCBC_nonpaymentreminder_conn,'NON PAYMENT REMINDER');
    var CURRENT_MONTH=Utilities.formatDate(new Date(), TimeZone, 'MMMM-yyyy')
    var PAYMENT_nonreminderdisplayname=eilib.Get_MailDisplayName("NON PAYMENT REMINDER");
    var NonReminder_emailtempstmt=OCBC_nonpaymentreminder_conn.createStatement();
    var NonReminder_emailtempquery="SELECT *FROM EMAIL_TEMPLATE_DETAILS WHERE ET_ID=1";
    var NonReminder_emailtempresult=NonReminder_emailtempstmt.executeQuery(NonReminder_emailtempquery);
    if(NonReminder_emailtempresult.next())
    {
      var emailsub=NonReminder_emailtempresult.getString("ETD_EMAIL_SUBJECT");
      var emailmessage=NonReminder_emailtempresult.getString("ETD_EMAIL_BODY");
    }
    NonReminder_emailtempresult.close();
    NonReminder_emailtempstmt.close();
    var PAYMENT_reminderstmt=OCBC_nonpaymentreminder_conn.createStatement();
    var PAYMENT_reminderquery="SELECT DISTINCT CUSTOMERNAME,CUSTOMER_ID,CPD_EMAIL,UNIT_NO,CED_REC_VER,CLP_STARTDATE,PAYMENT FROM VW_PAYMENT_CURRENT_ACTIVE_CUSTOMER WHERE CLP_ENDDATE>CURDATE() AND CLP_STARTDATE<=CURDATE()AND(CLP_PRETERMINATE_DATE IS NULL OR CLP_PRETERMINATE_DATE>CURDATE())";
    var PAYMENT_reminderresult=PAYMENT_reminderstmt.executeQuery(PAYMENT_reminderquery);
    while(PAYMENT_reminderresult.next())
    {
      var Paid_Forperiod="";
      var PAYMENT_remindercustomername=PAYMENT_reminderresult.getString("CUSTOMERNAME");
      var PAYMENT_remindercustomermailid=PAYMENT_reminderresult.getString("CPD_EMAIL");
      var PAYMENT_remindercustomerid=PAYMENT_reminderresult.getString("CUSTOMER_ID");
      var PAYMENT_remindercustomerrent=PAYMENT_reminderresult.getString("PAYMENT");
      var PAYMENT_remindercustomerrecver=PAYMENT_reminderresult.getString("CED_REC_VER");
      var PAYMENT_remindercustomerunit=PAYMENT_reminderresult.getString("UNIT_NO");
      var PAYMENT_remindercustomerstartdate=PAYMENT_reminderresult.getDate("CLP_STARTDATE").getTime();
      var Customerstartdate=Utilities.formatDate(new Date(PAYMENT_remindercustomerstartdate), TimeZone, 'MMMM-yyyy');
      var subject1=emailsub;
      var customername=emailmessage.replace('[CUSTOMER_NAME]',PAYMENT_remindercustomername);
      var unitno=customername.replace('[UNIT-NO]',PAYMENT_remindercustomerunit);
      unitno=unitno.replace('[RENTAL_AMOUNT]',PAYMENT_remindercustomerrent)
      var message = '<body>'+'<br>'+'<h> '+unitno+'</h>'+'<br>'+'<br>'+'<table border="1" width="300" hieght="20">'+'<tr  bgcolor="#6495ed" style="color:white"  align="center" >'+'<td width=25%><h3>FORPERIOD</h3></td>'+'</tr>'+'</table>'+'</body>';
      var PAYMENT_Paidstmt=OCBC_nonpaymentreminder_conn.createStatement();
      var PAYMENT_Paidquery="SELECT PD_FOR_PERIOD FROM PAYMENT_DETAILS WHERE CUSTOMER_ID="+PAYMENT_remindercustomerid+" AND PP_ID=1 AND CED_REC_VER="+PAYMENT_remindercustomerrecver+" ORDER BY PD_FOR_PERIOD DESC LIMIT 1";
      var PAYMENT_Paidresult=PAYMENT_Paidstmt.executeQuery(PAYMENT_Paidquery);
      if(PAYMENT_Paidresult.next())
      {
        var lastforperiod=PAYMENT_Paidresult.getDate("PD_FOR_PERIOD").getTime();
        var Paid_Forperiod=Utilities.formatDate(new Date(PAYMENT_Paidresult.getDate("PD_FOR_PERIOD").getTime()), TimeZone, 'MMMM-yyyy')
        }
      else
      {
        Paid_Forperiod=""; 
      }
      PAYMENT_Paidresult.close();
      PAYMENT_Paidstmt.close();
      if(CURRENT_MONTH==Customerstartdate && Paid_Forperiod=="")
      {
        var lastdate=new Date(PAYMENT_remindercustomerstartdate);
        var lastpaidmonth=new Date(lastdate.getFullYear(),lastdate.getMonth()-1);
      }
      if(CURRENT_MONTH!=Customerstartdate)
      {
        if(Paid_Forperiod=="")
        {
          lastdate=new Date(PAYMENT_remindercustomerstartdate);
          lastpaidmonth=new Date(lastdate.getFullYear(),lastdate.getMonth()-1);
        }
        if(CURRENT_MONTH==Paid_Forperiod)
        {
          lastpaidmonth=undefined;
        }
        if(CURRENT_MONTH!=Paid_Forperiod)
        {
          lastdate=new Date(lastforperiod); 
          lastpaidmonth=new Date(lastdate.getFullYear(),lastdate.getMonth());
        }
      }
      var array=[];
      if(lastpaidmonth!=undefined)
      {
        var current_date=new Date();
        var month=current_date.getMonth();
        var year=current_date.getFullYear();
        var currentdate=new Date(year,month);
        var lastdbdatemonth=lastpaidmonth.getMonth();
        var lastdbdatetyear=lastpaidmonth.getFullYear();
        var dblastdate=new Date(lastdbdatetyear,lastdbdatemonth);
        if(currentdate.valueOf()!=dblastdate.valueOf())
        {
          for(var j=1;j<=12;j++)
          {
            var db_month=dblastdate.getMonth()+j;
            var db_year=dblastdate.getFullYear();
            var dbdate=new Date(db_year,db_month)
            if(dbdate<=currentdate)
            {
              array.push(Utilities.formatDate(new Date(dbdate), TimeZone, 'MMMM-yyyy'));
            }
          }
        }
      }
      if(array==undefined)continue;
      if(array.length==0)continue;
      for(var k=0;k<array.length;k++)
      {
        message += '<body>'+'<table border="1"width="300" hieght="20" color="white" >'+'<tr align="center"  >'+'<td width=25%>'+array[k]+'</td>'+'</tr>'+'</table>'+'</body>';
      }
      var displayname="NON PAYMENT REMINDER";
      var advancedArgs={name:displayname,htmlBody:message};
      MailApp.sendEmail(PAYMENT_remindercustomermailid, subject1, message,advancedArgs);
    }
    PAYMENT_reminderresult.close();
    PAYMENT_reminderstmt.close();
    OCBC_nonpaymentreminder_conn.close();
  }
  catch(err)
  {
  }
}
//DONE BY:SAFI
//VER 0.02 SD:28/05/2014 ED:28/05/2014;TRACKER NO: 363
//VER 0.01-INITIAL VERSION,SD:03/12/2013 ED:04/12/2013;TRACKER NO: 363;

function CUSTOMEREXPIRYXWEEK()
{
  var CWEXP_weekBefore=1;
  var CWEXP_conn = eilib.db_GetConnection(); 
  Trigger_Run_Time(CWEXP_conn,'CUSTOMER EXPIRY X WEEK');
  var CWEXP_emaildata_stmt = CWEXP_conn.createStatement(); 
  var CWEXP_select_emaildata="SELECT * from EMAIL_TEMPLATE_DETAILS WHERE ET_ID=10";    
  var CWEXP_emaildata_rs=CWEXP_emaildata_stmt.executeQuery(CWEXP_select_emaildata);
  while(CWEXP_emaildata_rs.next()){
    var CWEXP_subject_db=CWEXP_emaildata_rs.getString("ETD_EMAIL_SUBJECT");
    var CWEXP_message_db=CWEXP_emaildata_rs.getString("ETD_EMAIL_BODY");      
  }
  CWEXP_emaildata_rs.close();
  CWEXP_emaildata_stmt.close(); 
  var CWEXP_emaildata_stmt = CWEXP_conn.createStatement(); 
  var CWEXP_select_emaildata="SELECT * from EMAIL_TEMPLATE_DETAILS WHERE ET_ID=12";    
  var CWEXP_emaildata_rs=CWEXP_emaildata_stmt.executeQuery(CWEXP_select_emaildata);
  while(CWEXP_emaildata_rs.next()){
    var CWEXP_subject_db1=CWEXP_emaildata_rs.getString("ETD_EMAIL_SUBJECT");
    var CWEXP_message_db1=CWEXP_emaildata_rs.getString("ETD_EMAIL_BODY");      
  }
  CWEXP_emaildata_rs.close();
  CWEXP_emaildata_stmt.close();  
  var CWEXP_check_week_flag=0;
  var CWEXP_check_weekly_expiry_list;  
  var CEXP_temptable_weeklyexpiry_stmt = CWEXP_conn.createStatement();
  CEXP_temptable_weeklyexpiry_stmt.execute("CALL SP_CUSTOMER_WEEKLY_EXPIRY_ONE_WEEK('"+trg_UserStamp+"',@CEXP_EXPIRYFEETMPTBLNAM)");
  CEXP_temptable_weeklyexpiry_stmt.close();
  var CEXP_beforefeetemptbl_stmt=CWEXP_conn.createStatement();
  var CEXP_beforefeetemptbl_query="SELECT @CEXP_EXPIRYFEETMPTBLNAM";
  var CEXP_beforefeetemptblres=CEXP_beforefeetemptbl_stmt.executeQuery(CEXP_beforefeetemptbl_query);
  var CEXP_weeklytemptblname="";
  while(CEXP_beforefeetemptblres.next())
  {
    CEXP_weeklytemptblname=CEXP_beforefeetemptblres.getString(1);
  }
  CEXP_beforefeetemptblres.close();
  CEXP_beforefeetemptbl_stmt.close();
  var CWEXP_customerdetails_stmt = CWEXP_conn.createStatement();    
  var CEXP_select_customerdetails="select * from "+CEXP_weeklytemptblname+""    
  var CWEXP_customerdetails_result=CWEXP_customerdetails_stmt.executeQuery(CEXP_select_customerdetails);  
  while(CWEXP_customerdetails_result.next()){
    var CWEXP_unitno = CWEXP_customerdetails_result.getString("UNITNO");        
    var CWEXP_firstname = CWEXP_customerdetails_result.getString("CUSTOMERFIRSTNAME");
    var CWEXP_lastname = CWEXP_customerdetails_result.getString("CUSTOMERLASTNAME");        
    var CWEXP_rental = CWEXP_customerdetails_result.getString("PAYMENT");
    var CWEXP_emailid=CWEXP_customerdetails_result.getString("EMAILID");
    var mailId=CWEXP_emailid.toString();
    var index=mailId.indexOf('@')
    var CWEXP_mail_username=mailId.substring(0,index).toUpperCase();
    var CWEXP_cust_name=CWEXP_firstname+' '+CWEXP_lastname;
    var CWEXP_enddate = CWEXP_customerdetails_result.getString("ENDDATE");
    var CWEXP_ptddate=CWEXP_customerdetails_result.getString("PRETERMINATEDATE");
    var unitcustomer=CWEXP_unitno+"-"+CWEXP_cust_name;
    var subjectdb=CWEXP_subject_db1.replace("'[UNIT NO - CUSTOMER NAME]'", unitcustomer);            
    var subjectmail=subjectdb.replace("'X'",CWEXP_weekBefore);        
    if(CWEXP_ptddate==null){
      var CWEXP_newdate=eilib.SqlDateFormat(CWEXP_enddate);        
    }
    else{
      var CWEXP_newdate=eilib.SqlDateFormat(CWEXP_ptddate);        
    }    
    var CWEXP_subject=CWEXP_subject_db.replace("'X'",CWEXP_weekBefore);
    var message=CWEXP_message_db.replace("[MAILID_USERNAME]",CWEXP_mail_username);
    var message1=message.replace("'X'", CWEXP_weekBefore);          
    CWEXP_check_week_flag=1;
    var CWEXP_emailmessage = '<body>'+'<br>'+'<h> '+message1 +' </h>'+'<br>'+'<br>'+'<table border="1" style="color:white" width="700">'+'<tr  bgcolor="#498af3" align="center">'+'<td width=25% ><h3>UNIT</h3></td>'+'<td width=25%><h3>CUSTOMER NAME</h3></td>'+'<td width=25%><h3>END DATE</h3></td>'+'<td width=25%><h3>RENT</h3></td>'+'</tr>'+'</table>'+'</body>';
    CWEXP_emailmessage += '<body>'+'<table border="1" width="700" >'+'<tr align="center">'+'<td width=25%>'+CWEXP_unitno+'</td>'+'<td width=25%>'+CWEXP_cust_name+'</td>'+'<td width=25%>'+CWEXP_newdate+'</td>'+'<td width=25%>'+CWEXP_rental+'</td>'+'</tr>'+'</table>'+'</body>'; 
    var displayname=eilib.Get_MailDisplayName("CUSTOMER_EXPIRY");
    MailApp.sendEmail(CWEXP_emailid,CWEXP_subject,CWEXP_emailmessage,{htmlBody:CWEXP_emailmessage,name:displayname});
  }
  var CEXP_drop_stmt=CWEXP_conn.createStatement();
  var CEXP_drop_query="DROP TABLE "+CEXP_weeklytemptblname+" "
  CEXP_drop_stmt.execute(CEXP_drop_query);
  CEXP_drop_stmt.close()
  CWEXP_conn.close();  
  CWEXP_conn.close();
}
function PURGEDOC()
{
  var purge_conn = eilib.db_GetConnection();
  Trigger_Run_Time(purge_conn,'PURGE DOC');
  /*********************GETTING NO OF DAYS  FROM CONFIGURATION TABLE****************************/
  var durationstmt=purge_conn.createStatement();
  var durationquery="SELECT TC_DATA FROM TRIGGER_CONFIGURATION WHERE CGN_ID=74";
  var durationresult=durationstmt.executeQuery(durationquery);
  if(durationresult.next())
  {
    var No_of_days=durationresult.getString(1);
  }
  durationresult.close();
  durationstmt.close();
  /*********************GETTING FOLDER ID FROM FILE PROFILE****************************/
  var fileprofilestmt=purge_conn.createStatement();
  var fileprofileQuery="SELECT FP_FOLDER_ID FROM FILE_PROFILE WHERE FP_ID=6";
  var fileprofileresult=fileprofilestmt.executeQuery(fileprofileQuery);
  var fileid_array=[];
  while(fileprofileresult.next())
  {
    fileid_array.push(fileprofileresult.getString(1));
  }
  fileprofileresult.close();
  fileprofilestmt.close();
  for(var i=0;i<fileid_array.length;i++)
  {
    var files = DriveApp.getFolderById(fileid_array[i]).getFiles();
    while (files.hasNext()) 
    {
      var file = files.next();
      var recordsupdateddate=file.getLastUpdated();
      var currentdate=new Date();
      var day=currentdate.getDate()-No_of_days;//(getting from config table)
      var month=currentdate.getMonth();
      var year=currentdate.getFullYear();
      var updateddate=new Date(year,month,day);
      if(updateddate>=recordsupdateddate)
      {
        file.setTrashed(true);
      }
    }
  }
  purge_conn.close();
}
//DONE BY:PUNITHA
//VER 0.01-INITIAL VERSION,SD:11/01/2014 ED:13/01/2014,TRACKER NO:771
function CUSTOMERTERMINATION()
{
  try
  {
    var ATERM_tddate=eilib.gettimezone24HRS();
    var ATERM_triggerconn= eilib.db_GetConnection();
    Trigger_Run_Time(ATERM_triggerconn,'CUSTOMER TERMINATION'); 
    var ATERM_triggerstmt=ATERM_triggerconn.createStatement();
    var ATERM_spcallstmt="CALL SP_CUSTOMER_AUTO_TERMINATION('"+ATERM_tddate+"','"+trg_UserStamp+"')";
    ATERM_triggerstmt.execute(ATERM_spcallstmt);
    ATERM_triggerstmt.close();
    ATERM_triggerconn.close();
  }
  catch(err)
  {
    Logger.log(err)
  }
}
function ACTIVECUSTOMERLIST()
{
  try
  {
    var FIN_OPL_conn =eilib.db_GetConnection();
    Trigger_Run_Time(FIN_OPL_conn,'ACTIVE CUSTOMER LIST');
    var emaillistarray=eilib.getProfileEmailId(FIN_OPL_conn,"ACTIVE_CC_TRIGGER");
    var FIN_OPL_name=emaillistarray[0].toString();
    var FIN_OPL_acticecc_cclist=emaillistarray[1].toString();
    var FIN_OPL_index=FIN_OPL_name.indexOf("@");
    var FIN_OPL_username=FIN_OPL_name.substring(0,FIN_OPL_index).toUpperCase();
    var FIN_OPL_currmon_date=Utilities.formatDate(new Date(), TimeZone, "MMMM-yyyy");
    var FIN_ACT_tempstmt=FIN_OPL_conn.createStatement();
    var activecclist="CALL SP_ACTIVE_CUSTOMERLIST('"+FIN_OPL_currmon_date+"','"+trg_UserStamp+"',@TEMP_OPL_ACTIVECUSTOMER_TABLE,@TEMP_OPL_SORTEDACTIVECUSTOMER_TABLE)";
    FIN_ACT_tempstmt.execute(activecclist);
    var tempactivecustresult=FIN_ACT_tempstmt.executeQuery("SELECT @TEMP_OPL_ACTIVECUSTOMER_TABLE,@TEMP_OPL_SORTEDACTIVECUSTOMER_TABLE")
    while(tempactivecustresult.next())
    {
      var activelisttablename=tempactivecustresult.getString(1);
      var sortactivelisttablename=tempactivecustresult.getString(2);
    }
    tempactivecustresult.close();
    FIN_ACT_tempstmt.close();
    var FIN_ACT_tempstmt=FIN_OPL_conn.createStatement();
    var FIN_ACT_stmt=FIN_OPL_conn.createStatement();
    var FIN_ACT_activecustomer_arraylist=[];
    var FIN_ACT_activecustomerselectquery="SELECT *FROM "+activelisttablename+" ORDER BY UNIT_NO,CUSTOMERNAME";
    var FIN_ACT_resultset=FIN_ACT_stmt.executeQuery(FIN_ACT_activecustomerselectquery);
    while(FIN_ACT_resultset.next())
    {
      var FIN_ACT_cust_unit=FIN_ACT_resultset.getString("UNIT_NO");
      var FIN_ACT_cust_firstname=FIN_ACT_resultset.getString("CUSTOMERNAME");
      var FIN_ACT_cust_startdate=FIN_ACT_resultset.getString("STARTDATE");
      var FIN_ACT_cust_enddate=FIN_ACT_resultset.getString("ENDDATE");
      var FIN_ACT_cust_rental=FIN_ACT_resultset.getString("PAYMENT_AMOUNT");
      var FIN_ACT_cust_deposit=FIN_ACT_resultset.getString("DEPOSIT");
      var FIN_ACT_cust_process=FIN_ACT_resultset.getString("PROCESSING_FEE");
      var FIN_ACT_cust_terminate=FIN_ACT_resultset.getString("CLP_TERMINATE");
      var FIN_ACT_cust_preterminate=FIN_ACT_resultset.getString("PRETERMINATE");
      var FIN_ACT_cust_preterminatedate=FIN_ACT_resultset.getString("PRETERMINATEDATE");
      var FIN_ACT_cust_comments=FIN_ACT_resultset.getString("COMMENTS");
      var FIN_ACT_activecustomer=FIN_ACT_cust_unit+'^'+FIN_ACT_cust_firstname+'^'+FIN_ACT_cust_startdate+'^'+FIN_ACT_cust_enddate+'^'+FIN_ACT_cust_rental+'^'+FIN_ACT_cust_deposit+'^'+FIN_ACT_cust_process+'^'+FIN_ACT_cust_terminate+'^'+FIN_ACT_cust_preterminate+'^'+FIN_ACT_cust_preterminatedate+'^'+FIN_ACT_cust_comments;
      FIN_ACT_activecustomer_arraylist.push(FIN_ACT_activecustomer);
    }
    FIN_ACT_resultset.close();
    var FIN_ACT_activecustomerlistsort="SELECT *FROM "+sortactivelisttablename+" ORDER BY ENDDATE ASC"
    var FIN_ACT_sortresultset=FIN_ACT_stmt.executeQuery(FIN_ACT_activecustomerlistsort);
    var FIN_ACT_activecustomer_sortarraylist=[];
    while(FIN_ACT_sortresultset.next())
    {
      var S_FIN_ACT_cust_unit=FIN_ACT_sortresultset.getString("UNIT_NO");
      var S_FIN_ACT_cust_firstname=FIN_ACT_sortresultset.getString("CUSTOMERNAME");
      var S_FIN_ACT_cust_startdate=FIN_ACT_sortresultset.getString("STARTDATE");
      var S_FIN_ACT_cust_enddate=FIN_ACT_sortresultset.getString("ENDDATE");
      var S_FIN_ACT_cust_rental=FIN_ACT_sortresultset.getString("PAYMENT_AMOUNT");
      var S_FIN_ACT_cust_deposit=FIN_ACT_sortresultset.getString("DEPOSIT");
      var S_FIN_ACT_cust_process=FIN_ACT_sortresultset.getString("PROCESSING_FEE");
      var S_FIN_ACT_cust_terminate=FIN_ACT_sortresultset.getString("CLP_TERMINATE");
      var S_FIN_ACT_cust_preterminate=FIN_ACT_sortresultset.getString("PRETERMINATE");
      var S_FIN_ACT_cust_preterminatedate=FIN_ACT_sortresultset.getString("PRETERMINATEDATE");
      var S_FIN_ACT_cust_comments=FIN_ACT_sortresultset.getString("COMMENTS");
      var Sort_FIN_ACT_activecustomer=S_FIN_ACT_cust_unit+'^'+S_FIN_ACT_cust_firstname+'^'+S_FIN_ACT_cust_startdate+'^'+S_FIN_ACT_cust_enddate+'^'+S_FIN_ACT_cust_rental+'^'+S_FIN_ACT_cust_deposit+'^'+S_FIN_ACT_cust_process+'^'+S_FIN_ACT_cust_terminate+'^'+S_FIN_ACT_cust_preterminate+'^'+S_FIN_ACT_cust_preterminatedate+'^'+S_FIN_ACT_cust_comments;
      FIN_ACT_activecustomer_sortarraylist.push(Sort_FIN_ACT_activecustomer);
    }
    FIN_ACT_sortresultset.close();
    FIN_ACT_stmt.close();
    var FIN_ACT_customer_amount1=['UNIT,CUSTOMER,STARTDATE,ENDDATE,RENT,DEPOSIT,PROCESSING FEE,TERMINATE,PRE TERMINATE,PRE TERMINATE DATE,COMMENTS']
    var FIN_ACT_customer_amountsort=['UNIT,CUSTOMER,STARTDATE,ENDDATE,RENT,DEPOSIT,PROCESSING FEE,TERMINATE,PRE TERMINATE,PRE TERMINATE DATE,COMMENTS']
    if(FIN_ACT_activecustomer_arraylist.length!=0)
    {
      var FIN_ACT_monthyear=Utilities.formatDate(new Date(), TimeZone, "ddMMyyyy");
      var FIN_ACT_shheetname=Utilities.formatDate(new Date(), TimeZone, "MMMyyyy");
      FIN_ACT_shheetname.toUpperCase();
      var FIN_ACT_ssname='ACTIVE CUST LIST-'+FIN_ACT_monthyear;
      var FIN_ACT_newspread=SpreadsheetApp.create(FIN_ACT_ssname);
      var FIN_ACT_url=FIN_ACT_newspread.getUrl();
      var FIN_ACT_ssid=FIN_ACT_newspread.getId();
      var FIN_ACT_folstmt=FIN_OPL_conn.createStatement();
      var FIN_ACT_folresult=FIN_ACT_folstmt.executeQuery("SELECT PCN_DATA FROM PAYMENT_CONFIGURATION WHERE CGN_ID=49")
      if(FIN_ACT_folresult.next())
      {
        var FIN_ACT_targetFolderId=FIN_ACT_folresult.getString(1)
        }
      FIN_ACT_folresult.close();
      FIN_ACT_folstmt.close();
      var FIN_ACT_newSheet = FIN_ACT_newspread.getActiveSheet().setName(FIN_ACT_shheetname);
      FIN_ACT_newspread.setFrozenRows(1);
      FIN_ACT_newspread.deleteColumns(11, 10);
      /****************NORMAL SHEET**************************/
      for(var i=0;i<FIN_ACT_customer_amount1.length;i++)
      {
        var FIN_ACT_counter =FIN_ACT_newSheet.getLastRow()+1;
        var FIN_ACT_value=FIN_ACT_customer_amount1[i];
        var FIN_ACT_value1=FIN_ACT_value.split(',');
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,1).setValue(FIN_ACT_value1[0]);
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,2).setValue(FIN_ACT_value1[1]);
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,3).setValue(FIN_ACT_value1[2]);
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,4).setValue(FIN_ACT_value1[3]);
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,5).setValue(FIN_ACT_value1[4]);
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,6).setValue(FIN_ACT_value1[5]);
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,7).setValue(FIN_ACT_value1[6]);
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,8).setValue(FIN_ACT_value1[7]);
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,9).setValue(FIN_ACT_value1[8]);
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,10).setValue(FIN_ACT_value1[9]);
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,11).setValue(FIN_ACT_value1[10]);
        FIN_ACT_newSheet.setFrozenRows(1);
        FIN_ACT_newSheet.getRange(1, 1, 1, FIN_ACT_newSheet.getLastColumn()).setBackground('#498af3').setFontColor('white').setFontSize(12).setFontStyle('BOLD');
      }
      for(var i=0;i<FIN_ACT_activecustomer_arraylist.length;i++)
      {
        var FIN_ACT_counter =FIN_ACT_newSheet.getLastRow()+1;
        var FIN_ACT_value=FIN_ACT_activecustomer_arraylist[i];
        var FIN_ACT_value1=FIN_ACT_value.split('^');
        var FIN_ACT_unitvalue="'"+FIN_ACT_value1[0];
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,1).setValue(FIN_ACT_unitvalue);
        FIN_ACT_newSheet.setColumnWidth(1, 40)
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,2).setValue(FIN_ACT_value1[1]);
        FIN_ACT_newSheet.setColumnWidth(2, 300);
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,3).setValue(FIN_ACT_value1[2]);
        FIN_ACT_newSheet.setColumnWidth(3, 100);
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,4).setValue(FIN_ACT_value1[3]);
        FIN_ACT_newSheet.setColumnWidth(4, 80);
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,5).setValue(FIN_ACT_value1[4]);
        if(FIN_ACT_value1[5]=='null')
        {
          FIN_ACT_value1[5]="";
        }
        FIN_ACT_newSheet.setColumnWidth(5, 60)
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,6).setValue(FIN_ACT_value1[5]);
        if(FIN_ACT_value1[6]=='null')
        {
          FIN_ACT_value1[6]="";
        }
        FIN_ACT_newSheet.setColumnWidth(6,70)
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,7).setValue(FIN_ACT_value1[6]);
        if(FIN_ACT_value1[7]=='null')
        {
          FIN_ACT_value1[7]="";
        }
        FIN_ACT_newSheet.setColumnWidth(7,100)
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,8).setValue(FIN_ACT_value1[7]);
        if(FIN_ACT_value1[8]=='null')
        {
          FIN_ACT_value1[8]="";
        }
        FIN_ACT_newSheet.setColumnWidth(8, 100)
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,9).setValue(FIN_ACT_value1[8]);
        if(FIN_ACT_value1[9]=='null')
        {
          FIN_ACT_value1[9]="";
        }
        FIN_ACT_newSheet.setColumnWidth(9, 100)
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,10).setValue(FIN_ACT_value1[9]);
        if(FIN_ACT_value1[10]=='null')
        {
          FIN_ACT_value1[10]="";
        }
        FIN_ACT_newSheet.setColumnWidth(10, 100)
        FIN_ACT_newSheet.setColumnWidth(11, 500)
        FIN_ACT_newSheet.getRange(FIN_ACT_counter,11).setValue(FIN_ACT_value1[10]);
      }
      /*************************SORT SHEET****************************/
      var sorcustomersheet=FIN_ACT_newspread.insertSheet('SORTED')
      for(var i=0;i<FIN_ACT_customer_amountsort.length;i++)
      {
        var FIN_ACT_counter =sorcustomersheet.getLastRow()+1;
        var FIN_ACT_value=FIN_ACT_customer_amountsort[i];
        var FIN_ACT_value1=FIN_ACT_value.split(',');
        sorcustomersheet.getRange(FIN_ACT_counter,1).setValue(FIN_ACT_value1[0]);
        sorcustomersheet.getRange(FIN_ACT_counter,2).setValue(FIN_ACT_value1[1]);
        sorcustomersheet.getRange(FIN_ACT_counter,3).setValue(FIN_ACT_value1[2]);
        sorcustomersheet.getRange(FIN_ACT_counter,4).setValue(FIN_ACT_value1[3]);
        sorcustomersheet.getRange(FIN_ACT_counter,5).setValue(FIN_ACT_value1[4]);
        sorcustomersheet.getRange(FIN_ACT_counter,6).setValue(FIN_ACT_value1[5]);
        sorcustomersheet.getRange(FIN_ACT_counter,7).setValue(FIN_ACT_value1[6]);
        sorcustomersheet.getRange(FIN_ACT_counter,8).setValue(FIN_ACT_value1[7]);
        sorcustomersheet.getRange(FIN_ACT_counter,9).setValue(FIN_ACT_value1[8]);
        sorcustomersheet.getRange(FIN_ACT_counter,10).setValue(FIN_ACT_value1[9]);
        sorcustomersheet.getRange(FIN_ACT_counter,11).setValue(FIN_ACT_value1[10]);
        sorcustomersheet.setFrozenRows(1);
        sorcustomersheet.getRange(1, 1, 1, sorcustomersheet.getLastColumn()).setBackground('#498af3').setFontColor('white').setFontSize(12).setFontStyle('BOLD');
      }
      for(var a=0;a<FIN_ACT_activecustomer_sortarraylist.length;a++)
      {
        var FIN_ACT_counter =sorcustomersheet.getLastRow()+1;
        var FIN_ACT_value=FIN_ACT_activecustomer_sortarraylist[a];
        var FIN_ACT_value1=FIN_ACT_value.split('^');
        var FIN_ACT_unitvalue="'"+FIN_ACT_value1[0];
        sorcustomersheet.getRange(FIN_ACT_counter,1).setValue(FIN_ACT_unitvalue);
        sorcustomersheet.setColumnWidth(1, 40)
        sorcustomersheet.getRange(FIN_ACT_counter,2).setValue(FIN_ACT_value1[1]);
        sorcustomersheet.setColumnWidth(2, 300);
        sorcustomersheet.getRange(FIN_ACT_counter,3).setValue(FIN_ACT_value1[2]);
        sorcustomersheet.setColumnWidth(3, 100);
        sorcustomersheet.getRange(FIN_ACT_counter,4).setValue(FIN_ACT_value1[3]);
        sorcustomersheet.setColumnWidth(4, 80);
        sorcustomersheet.getRange(FIN_ACT_counter,5).setValue(FIN_ACT_value1[4]);
        if(FIN_ACT_value1[5]=='null')
        {
          FIN_ACT_value1[5]="";
        }
        sorcustomersheet.setColumnWidth(5, 60)
        sorcustomersheet.getRange(FIN_ACT_counter,6).setValue(FIN_ACT_value1[5]);
        if(FIN_ACT_value1[6]=='null')
        {
          FIN_ACT_value1[6]="";
        }
        sorcustomersheet.setColumnWidth(6,70)
        sorcustomersheet.getRange(FIN_ACT_counter,7).setValue(FIN_ACT_value1[6]);
        if(FIN_ACT_value1[7]=='null')
        {
          FIN_ACT_value1[7]="";
        }
        sorcustomersheet.setColumnWidth(7,100)
        sorcustomersheet.getRange(FIN_ACT_counter,8).setValue(FIN_ACT_value1[7]);
        if(FIN_ACT_value1[8]=='null')
        {
          FIN_ACT_value1[8]="";
        }
        sorcustomersheet.setColumnWidth(8, 100)
        sorcustomersheet.getRange(FIN_ACT_counter,9).setValue(FIN_ACT_value1[8]);
        if(FIN_ACT_value1[9]=='null')
        {
          FIN_ACT_value1[9]="";
        }
        sorcustomersheet.setColumnWidth(9, 100)
        sorcustomersheet.getRange(FIN_ACT_counter,10).setValue(FIN_ACT_value1[9]);
        if(FIN_ACT_value1[10]=='null')
        {
          FIN_ACT_value1[10]="";
        }
        sorcustomersheet.setColumnWidth(10, 100)
        sorcustomersheet.setColumnWidth(11, 500)
        sorcustomersheet.getRange(FIN_ACT_counter,11).setValue(FIN_ACT_value1[10]);
      } 
    }
    var docowner=eilib.CUST_documentowner(FIN_OPL_conn);
    eilib.CUST_moveFileToFolder(FIN_ACT_ssid,"",FIN_ACT_targetFolderId)
    eilib.SetDocOwner(FIN_ACT_ssid,docowner,emaillistarray[0]);
    DriveApp.getFileById(FIN_ACT_ssid).addEditor(FIN_OPL_acticecc_cclist);
    var displayname=eilib.Get_MailDisplayName('ACTIVE_CC_LIST');
    var body1 ="HELLO  "+FIN_OPL_username;
    var subject='ACTIVE CUST LIST-'+FIN_ACT_monthyear;
    MailApp.sendEmail(emaillistarray[0], subject, body1,{cc:FIN_OPL_acticecc_cclist,name:displayname,htmlBody: body1+'<br><br>, PLEASE FIND ATTACHED THE CURRENT : '+FIN_ACT_url});
    var activeliststmt=FIN_OPL_conn.createStatement();
    activeliststmt.execute("DROP TABLE "+activelisttablename+"");
    activeliststmt.execute("DROP TABLE "+sortactivelisttablename+"");
    activeliststmt.close();
    if((emaillistarray[0]!=trg_UserStamp)&&(docowner!=trg_UserStamp)&&(FIN_OPL_acticecc_cclist!=trg_UserStamp))
    {
      DriveApp.getFileById(FIN_ACT_ssid).removeEditor(trg_UserStamp);
    }
  }
  catch(err)
  {
    Logger.log(err)
  }
}

//VER 0.01 - INITIAL VERSION-SD:28/01/2014 ED:17/05/2014;TRACKER NO: 651
function URSRC_GetActive_Loginid(){
  
  var URSRC_conn = eilib.db_GetConnection();    
  var URSRC_logindetails_stmt = URSRC_conn.createStatement();
  var URSRC_logindetails_array=[];     
  var URSRC_select_logindetails='select * from VW_ACCESS_RIGHTS_TERMINATE_LOGINID where URC_DATA="USER"'
  var URSRC_logindetails_result=URSRC_logindetails_stmt.executeQuery(URSRC_select_logindetails);
  while(URSRC_logindetails_result.next()){
    URSRC_logindetails_array.push(URSRC_logindetails_result.getString("ULD_LOGINID"));
  }  
  return URSRC_logindetails_array 
  
}
function SITEGRANTTIME(){
  var URSRC_conn = eilib.db_GetConnection();
  Trigger_Run_Time(URSRC_conn,'SITE GRANT TIME');
  var URSRC_logindetails_array=URSRC_GetActive_Loginid()
  var site=URSRC_getSite()  
  var editors=site.getViewers()
  var neweditors=[];
  for(var k=0;k<editors.length;k++)
  {
    neweditors.push(editors[k].toString()) 
  } 
  var j=0;
  var URSRC_new_diff_array=[]
  for(var i=0; i<URSRC_logindetails_array.length;i++)
  {
    if(neweditors.indexOf(URSRC_logindetails_array[i]).toString()==-1)
    {
      URSRC_new_diff_array.push(URSRC_logindetails_array[i]);
    }  
    j++;
  }  
  for(var i=0;i<URSRC_new_diff_array.length;i++){      
    site.addViewer(URSRC_new_diff_array[i]);      
  }  
  Manual_TriggerDeletion('SITEGRANTTIME');
  URSRC_conn.close();
}
function SITEREVOKETIME(){  
  var URSRC_conn = eilib.db_GetConnection();
  Trigger_Run_Time(URSRC_conn,'SITE REVOKE TIME');
  var URSRC_logindetails_array=URSRC_GetActive_Loginid()  
  var site=URSRC_getSite()
  var neweditors=[];
  var editors=site.getViewers()
  for(var k=0;k<editors.length;k++)
  {
    neweditors.push(editors[k].toString()) 
  }
  var j=0;
  var URSRC_new_diff_array=[]
  for(var i=0; i<URSRC_logindetails_array.length;i++)
  {
    if(neweditors.indexOf(URSRC_logindetails_array[i]).toString()!=-1)
    {
      URSRC_new_diff_array.push(URSRC_logindetails_array[i]);
    }  
    j++;
  } 
  for(var i=0;i<URSRC_new_diff_array.length;i++){    
    site.removeViewer(URSRC_new_diff_array[i]);    
  }
  Manual_TriggerDeletion('SITEREVOKETIME');
  URSRC_conn.close();
}

function URSRC_getSite(){  
  var URSRC_conn = eilib.db_GetConnection(); 
  var sitelink
  var URSRC_getsitee_stmt=URSRC_conn.createStatement();
  var URSRC_select_site="SELECT * FROM USER_RIGHTS_CONFIGURATION WHERE CGN_ID =68"
  var URSRC_getsite_rs=URSRC_getsitee_stmt.executeQuery(URSRC_select_site)
  while(URSRC_getsite_rs.next()){
    sitelink=SitesApp.getSiteByUrl(URSRC_getsite_rs.getString("URC_DATA"))    
  }
  return sitelink
}
function SITEACCESS()
{
  var URSRC_conn = eilib.db_GetConnection(); 
  Trigger_Run_Time(URSRC_conn,'SITE ACCESS');
  var URSRC_triggertime_array=[]
  var URSRC_triggertime_stmt=URSRC_conn.createStatement();
  var URSRC_select_triggertime="SELECT * FROM USER_RIGHTS_CONFIGURATION WHERE CGN_ID in(66,67)"
  var URSRC_triggertime_rs=URSRC_triggertime_stmt.executeQuery(URSRC_select_triggertime)
  while(URSRC_triggertime_rs.next()){
    URSRC_triggertime_array.push(URSRC_triggertime_rs.getString("URC_DATA"))    
  }  
  var URSRC_grant_time=URSRC_triggertime_array[0];
  var URSRC_revoke_time=URSRC_triggertime_array[1]; 
  URSRC_grant_time=URSRC_grant_time.split(':');
  var URSRC_grant_time_hours=URSRC_grant_time[0];
  var URSRC_grant_time_min=URSRC_grant_time[1];
  URSRC_revoke_time=URSRC_revoke_time.split(':');
  var URSRC_revoke_time_hours=URSRC_revoke_time[0];
  var URSRC_revoke_time_min=URSRC_revoke_time[1];   
  var URSRC_check_flag=0
  var URSRC_check_public_holiday_stmt=URSRC_conn.createStatement();
  var URSRC_check_public_holiday="SELECT * FROM PUBLIC_HOLIDAY where PH_DATE=CURDATE()"
  var URSRC_check_public_holiday_rs=URSRC_check_public_holiday_stmt.executeQuery(URSRC_check_public_holiday);
  while(URSRC_check_public_holiday_rs.next()){    
    URSRC_check_flag=1;   
  }   
  var day=Utilities.formatDate(new Date, TimeZone, 'EEEE');
  if(day!="Sunday" ){
    if(URSRC_check_flag==0){
      ScriptApp.newTrigger("SITEGRANTTIME").timeBased().everyDays(1).atHour(URSRC_grant_time_hours).nearMinute(URSRC_grant_time_min).create();  
      ScriptApp.newTrigger("SITEREVOKETIME").timeBased().everyDays(1).atHour(URSRC_revoke_time_hours).nearMinute(URSRC_revoke_time_min).create();
      
    }
  }
}
/*******************TEMP TABLE DROP TRIGGER************************/
function TEMP_TABLE_TRIGGER()
{
  var temtable_schema_conn =eilib.db_GetConnection();
  Trigger_Run_Time(temtable_schema_conn,'DROP TEMP TABLES');
  var emaillistarray=eilib.getProfileEmailId(temtable_schema_conn,'DROPTABLE')
  var name=emaillistarray[0]; 
  var cclist=emaillistarray[1];
  name=name.toString();
  var username=name.split('@');
  var mailusername=username[0].toUpperCase();
  var emailtempstmt=temtable_schema_conn.createStatement();
  var emailtempquery="SELECT *FROM EMAIL_TEMPLATE_DETAILS WHERE ET_ID=14";
  var emailtempresult=emailtempstmt.executeQuery(emailtempquery);
  if(emailtempresult.next())
  {
    var emailsub=emailtempresult.getString(3);
    var subject=emailtempresult.getString(4);
  }
  emailtempresult.close();
  emailtempstmt.close();
  var CURRENT_MONTH=Utilities.formatDate(new Date(), TimeZone, 'dd-MMMM-yyyy')
  emailsub=emailsub.replace('CURRENTDATE',CURRENT_MONTH);
  emailsub=emailsub.replace('[INSTANCENAME]',InstanceName);
  emailsub=emailsub.replace('[SCHEMANAME]',schema_name);
  emailsub=emailsub.toUpperCase();
  subject=subject.replace('CURRENTDATE',CURRENT_MONTH);
  subject=subject.replace('[INSTANCENAME]',InstanceName);
  subject=subject.replace('[SCHEMANAME]',schema_name);
  subject=subject.toUpperCase();
  Logger.log(subject);
  Logger.log(emailsub);
  var message = '<body>'+'<br>'+'<h> '+subject+'</h>'+'<br>'+'<br>'+'<table border="1" width="500" hieght="20">'+'<tr  bgcolor="#6495ed" style="color:white"  align="center" >'+'<td width=25%><h3>TEMP TABLE NAME(S)</h3></td>'+'</tr>'+'</table>'+'</body>';
  var temtable_stmt=temtable_schema_conn.createStatement();
  temtable_stmt.execute("CALL SP_DROP_PROD_TEMP_TABLE('"+trg_UserStamp+"',@FINALTABLE)");
  var temtable_result=temtable_stmt.executeQuery("SELECT @FINALTABLE");
  if(temtable_result.next())
  {
    var temptablename=temtable_result.getString(1);
  }
  temtable_stmt.close();
  var temtableselect_stmt=temtable_schema_conn.createStatement();
  var temptableresult=temtableselect_stmt.executeQuery("SELECT *FROM "+temptablename+"");
  while(temptableresult.next())
  {
    var temptableflag=1;
    message += '<body>'+'<table border="1"width="500" >'+'<tr align="left" >'+'<td align="center" width=40%>'+temptableresult.getString(2)+'</td>'+'</tr>'+'</table>'+'</body>';
  }
  temptableresult.close();
  temtableselect_stmt.execute("DROP TABLE "+temptablename+"");
  temtableselect_stmt.close();
  var displayname=eilib.Get_MailDisplayName('DROP_TEMP_TABLE')
  var advancedArgs={cc:cclist,name:displayname,htmlBody:message};  
  if(temptableflag==1)
  {
    MailApp.sendEmail(name,emailsub,message ,advancedArgs);
  }
}
function ERMLEEDS()
{
  var currentdate=new Date();
  var currentdate=1;//currentdate.getDate();
  if(currentdate==1)
  {
    var REP_search_spreadsheetarray=[];
    var REP_spreadsheetheader=[];
    var REP_spreadsheetresult=[];
    var REP_count=0;
    var REP_conn=eilib.db_GetConnection();
    Trigger_Run_Time(REP_conn,'ERM LEEDS');
    var REP_stmt=REP_conn.createStatement();
    var REP_emailid_array=[];
    var REP_emailid_array=eilib.getProfileEmailId(REP_conn,"ERM");
    var REP_mailid=REP_emailid_array[0];
    var REP_ccmailid=REP_emailid_array[1];
    var REP_cu_month=new Date().getMonth();
    var REP_cu_year=new Date().getFullYear();
    var REP_currentmonth_s_date=new Date(REP_cu_year,REP_cu_month);
    var REP_current_date=REP_currentmonth_s_date.getDate();
    var REP_current_month=REP_currentmonth_s_date.getMonth();
    var REP_current_year=REP_currentmonth_s_date.getFullYear();
    var REP_pre_month_enddate=new Date(REP_current_year,REP_current_month,REP_current_date-1);
    var REP_pre_month_startdate=new Date(REP_pre_month_enddate.getFullYear(),REP_pre_month_enddate.getMonth());
    var REP_utstrdte=Utilities.formatDate(new Date(REP_pre_month_startdate), TimeZone,'yyyy-MM-dd');
    var REP_utenddte=Utilities.formatDate(new Date(REP_pre_month_enddate),TimeZone, 'yyyy-MM-dd');
    var REP_namemail=REP_emailid_array.toString();
    var REP_index=REP_namemail.indexOf("@");
    var REP_username=REP_namemail.substring(0,REP_index).toUpperCase();
    var REP_errormsg_exequery ="SELECT RCN_DATA FROM REPORT_CONFIGURATION WHERE CGN_ID=48";
    var REP_errormsg_rs = REP_stmt.executeQuery(REP_errormsg_exequery);
    if(REP_errormsg_rs.next())
    {
      var REP_folderid=REP_errormsg_rs.getString("RCN_DATA");
    }
    REP_errormsg_rs.close();
    REP_stmt.close();
    var REP_emlstmt=REP_conn.createStatement();
    var REP_emailtemp="SELECT * FROM EMAIL_TEMPLATE_DETAILS WHERE ETD_ID=13";
    var REP_emltemp_rs = REP_emlstmt.executeQuery(REP_emailtemp);
    if(REP_emltemp_rs.next())
    {
      var  REP_emlsub=REP_emltemp_rs.getString("ETD_EMAIL_SUBJECT");
      var  REP_emlbdy=REP_emltemp_rs.getString("ETD_EMAIL_BODY");
    }
    REP_emltemp_rs.close();
    REP_emlstmt.close();
    var REP_date=REP_currentmonth_s_date; 
    var REP_day=REP_date.getDate();
    var REP_month=REP_date.getMonth();
    var REP_year=REP_date.getFullYear();
    var REP_last=new Date(REP_year,REP_month);
    var REP_lastmonthdate=new Date(REP_year,REP_month+1).getTime();
    var REP_lastdate=new Date(REP_year,REP_month).getTime();
    var REP_monthname=new Date(REP_year,REP_month,REP_day);
    var REP_currentdateyear=Utilities.formatDate(new Date(REP_monthname),timeZoneFormat, 'yyyy')
    var REP_namesht='ERM LEEDS'+' '+REP_currentdateyear;
    var REP_lastname=new Date(REP_year,REP_month,REP_day-1);
    var REP_lastdate_year=Utilities.formatDate(new Date(REP_lastname),timeZoneFormat, 'yyyy');
    var REP_nameshts='ERM LEEDS'+' '+REP_lastdate_year;
    var REP_sheetnames=Utilities.formatDate(new Date(REP_monthname),timeZoneFormat, 'MMMM');
    var REP_sheetname=REP_sheetnames.toUpperCase();
    REP_namesht=REP_namesht;
    REP_namesht=REP_nameshts;
    if(REP_namesht==REP_nameshts)
    {
      var REP_files=DriveApp.getFolderById(REP_folderid).getFiles();
      while(REP_files.hasNext())
      {
        var REP_xy=REP_files.next();
        var REP_yx=DriveApp.getFilesByName(REP_xy).next().getId();
        if(REP_xy==REP_namesht)
        {
          var REP_ids=REP_yx;
          var REP_flag=1;
        } 
      }  
    } 
    if(REP_flag==1)
    {
      var REP_newspread=SpreadsheetApp.openById(REP_ids)
      var REP_ssheet=REP_newspread.getSheets();
      for(var j=0;j<REP_ssheet.length;j++)
      {
        if(REP_sheetname==REP_ssheet[j].getName())
        {
          var REP_activesheet=REP_ssheet[j].getName();
          var REP_flags=1;
        }
      }
      if(REP_flags==1)
      {
        var REP_Sheet=REP_newspread.getSheetByName(REP_sheetname);
      }
      else 
      {
        if(REP_flags==0){
          REP_Sheet=REP_newspread.insertSheet(REP_sheetname);
          REP_Sheet.setFrozenRows(1);
        }
        else{
          REP_Sheet=REP_newspread.insertSheet(REP_sheetname);
        }
      }
    }
    else
    {
      var REP_newspread=SpreadsheetApp.create(REP_namesht);
      var REP_ssids=REP_newspread.getId();
      REP_Sheet=REP_newspread.insertSheet(REP_sheetname);
      var REP_reportsheet=REP_newspread.getSheetByName('Sheet1');
      REP_newspread.deleteSheet(REP_reportsheet);
    }
    if(REP_namesht!=REP_nameshts)
    {
      var REP_newspread=SpreadsheetApp.create(REP_namesht);
      var REP_ssids=REP_newspread.getId();
      REP_Sheet=REP_newspread.insertSheet(REP_sheetname);
      REP_Sheet.setFrozenRows(1);
    }
    var REP_stmt=REP_conn.createStatement();
    var REP_flextable_query="SELECT ERM.ERM_CUST_NAME,ERM.ERM_RENT,DATE_FORMAT(ERM.ERM_MOVING_DATE,'%d/%m/%Y') AS ERM_MOVING_DATE,ERM.ERM_MIN_STAY,EOD.ERMO_DATA,NC.NC_DATA,ERM.ERM_NO_OF_GUESTS,ERM.ERM_AGE,ERM.ERM_CONTACT_NO,ERM.ERM_EMAIL_ID,ERM.ERM_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ERM.ERM_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM ERM_ENTRY_DETAILS ERM left join NATIONALITY_CONFIGURATION NC ON ERM.NC_ID=NC.NC_ID left join ERM_OCCUPATION_DETAILS EOD ON ERM.ERMO_ID=EOD.ERMO_ID left join USER_LOGIN_DETAILS ULD on ERM.ULD_ID=ULD.ULD_ID WHERE ERM.ERM_MOVING_DATE BETWEEN '"+REP_utstrdte+"' AND '"+REP_utenddte+"' ORDER BY ERM.ERM_CUST_NAME ASC";
    var REP_flex_rs=REP_stmt.executeQuery(REP_flextable_query);
    while (REP_flex_rs.next()) 
    {
      REP_count=1;
      var REP_custname=REP_flex_rs.getString("ERM_CUST_NAME");
      var REP_ermrent=REP_flex_rs.getString("ERM_RENT");
      var REP_movingdate=REP_flex_rs.getString("ERM_MOVING_DATE");
      var REP_minstay=REP_flex_rs.getString("ERM_MIN_STAY");
      var REP_ermodata=REP_flex_rs.getString("ERMO_DATA");
      var REP_ncdata=REP_flex_rs.getString("NC_DATA");
      var REP_noofguests=REP_flex_rs.getString("ERM_NO_OF_GUESTS");
      var REP_age=REP_flex_rs.getString("ERM_AGE");
      var REP_contactno=REP_flex_rs.getString("ERM_CONTACT_NO");
      var REP_emailid=REP_flex_rs.getString("ERM_EMAIL_ID");
      var REP_comments=REP_flex_rs.getString("ERM_COMMENTS");
      var REP_loginid=REP_flex_rs.getString("ULD_LOGINID");
      var REP_timestamp=REP_flex_rs.getString("TIMESTAMP");
      var REP_spreadsheetlist=REP_custname+'^'+REP_ermrent+'^'+REP_movingdate+'^'+REP_minstay+'^'+REP_ermodata+'^'+REP_ncdata+'^'+REP_noofguests+'^'+REP_age+'^'+REP_contactno+'^'+REP_emailid+'^'+REP_comments+'^'+REP_loginid+'^'+REP_timestamp;
      REP_search_spreadsheetarray.push(REP_spreadsheetlist) 
    }
    if(REP_count==1)
    {
      var REP_finaltable=REP_spreadsheetresult.concat(REP_search_spreadsheetarray);
      REP_finaltable.sort();
      var REP_custnamehead='CUSTOMER NAME';
      var REP_renthead='RENT';
      var REP_movingdatehead='MOVING DATE';
      var REP_minstayhead='MINIMUM STAY';
      var REP_ermdatahead='ERM DATA';
      var REP_nationalityconfighead='NATIONALITY CONFIGURATION';
      var REP_noofguestshead='NO OF GUESTS';
      var REP_agehead='AGE';
      var REP_contactnohead='CONTACT NO';
      var REP_emailidhead='EMAIL ID';
      var REP_commentshead='COMMENTS';
      var REP_userstamphead='USERSTAMP';
      var REP_timestamphead='TIMESTAMP';
      REP_spreadsheetheader.push(REP_custnamehead+','+REP_renthead+','+REP_movingdatehead+','+REP_minstayhead+','+REP_ermdatahead+','+REP_nationalityconfighead+','+REP_noofguestshead+','+REP_agehead+','+REP_contactnohead+','+REP_emailidhead+','+REP_commentshead+','+REP_userstamphead+','+REP_timestamphead)
      REP_Sheet.clear();
      var REP_spreadsheet_url=REP_newspread.getUrl();
      for(var i=0;i<REP_spreadsheetheader.length;i++)
      {
        var REP_counter=REP_Sheet.getLastRow()+1;
        var REP_value=REP_spreadsheetheader[i];
        var REP_valueset=REP_value.split(',');
        REP_Sheet.getRange(REP_counter,1).setValue(REP_valueset[0]);
        REP_Sheet.getRange(REP_counter,2).setValue(REP_valueset[1]);
        REP_Sheet.getRange(REP_counter,3).setValue(REP_valueset[2]);
        REP_Sheet.getRange(REP_counter,4).setValue(REP_valueset[3]);
        REP_Sheet.getRange(REP_counter,5).setValue(REP_valueset[4]);
        REP_Sheet.getRange(REP_counter,6).setValue(REP_valueset[5]);
        REP_Sheet.getRange(REP_counter,7).setValue(REP_valueset[6]);
        REP_Sheet.getRange(REP_counter,8).setValue(REP_valueset[7]);
        REP_Sheet.getRange(REP_counter,9).setValue(REP_valueset[8]);
        REP_Sheet.getRange(REP_counter,10).setValue(REP_valueset[9]);
        REP_Sheet.getRange(REP_counter,11).setValue(REP_valueset[10]);
        REP_Sheet.getRange(REP_counter,12).setValue(REP_valueset[11]);
        REP_Sheet.getRange(REP_counter,13).setValue(REP_valueset[12]);
        REP_Sheet.setFrozenRows(1);
        REP_Sheet.getRange(1, 1, 1, REP_Sheet.getLastColumn()).setBackground('#498af3').setFontColor('white').setFontSize(12).setFontFamily('BOLD');
      } 
      for(var i=0;i<REP_finaltable.length;i++)
      {
        var REP_counter=REP_Sheet.getLastRow()+1;
        var REP_value=REP_finaltable[i];
        var REP_valueset=REP_value.split('^');
        REP_Sheet.getRange(REP_counter,1).setValue(REP_valueset[0]);
        if(REP_valueset[1]=='null')
        {
          REP_valueset[1]="";
        }
        REP_Sheet.getRange(REP_counter,2).setValue(REP_valueset[1]);
        if(REP_valueset[2]=='null')
        {
          REP_valueset[2]="";
        }
        REP_Sheet.getRange(REP_counter,3).setValue(REP_valueset[2]);
        if(REP_valueset[3]=='null')
        {
          REP_valueset[3]="";
        }
        REP_Sheet.getRange(REP_counter,4).setValue(REP_valueset[3]);
        if(REP_valueset[4]=='null')
        {
          REP_valueset[4]="";
        }
        REP_Sheet.getRange(REP_counter,5).setValue(REP_valueset[4]);
        if(REP_valueset[5]=='null')
        {
          REP_valueset[5]="";
        } 
        REP_Sheet.getRange(REP_counter,6).setValue(REP_valueset[5]);
        if(REP_valueset[6]=='null')
        {
          REP_valueset[6]="";
        } 
        REP_Sheet.getRange(REP_counter,7).setValue(REP_valueset[6]);
        if(REP_valueset[7]=='null')
        {
          REP_valueset[7]="";
        } 
        REP_Sheet.getRange(REP_counter,8).setValue(REP_valueset[7]);
        if(REP_valueset[8]=='null')
        {
          REP_valueset[8]="";
        }
        REP_Sheet.getRange(REP_counter,9).setValue(REP_valueset[8]);
        if(REP_valueset[9]=='null')
        {
          REP_valueset[9]="";
        } 
        REP_Sheet.getRange(REP_counter,10).setValue(REP_valueset[9]);
        if(REP_valueset[10]=='null')
        {
          REP_valueset[10]="";
        }
        REP_Sheet.getRange(REP_counter,11).setValue(REP_valueset[10]);
        if(REP_valueset[11]=='null')
        {
          REP_valueset[11]="";
        }
        REP_Sheet.getRange(REP_counter,12).setValue(REP_valueset[11]);
        if(REP_valueset[12]=='null')
        {
          REP_valueset[12]="";
        }
        REP_Sheet.getRange(REP_counter,13).setValue(REP_valueset[12]);
        if(REP_valueset[13]=='null')
        {
          REP_valueset[13]="";
        }
      }
    }
    REP_flex_rs.close();
    REP_stmt.close();
    if(REP_count!=0)
    {
      var REP_filess=DriveApp.getFolderById(REP_folderid).getId();
      var REP_ssids=REP_newspread.getId();
      var docowner=eilib.CUST_documentowner(REP_conn)
      eilib.CUST_moveFileToFolder(REP_ssids,"",REP_filess)
      eilib.SetDocOwner(REP_ssids,docowner,REP_mailid)
      DriveApp.getFolderById(REP_ssids).addEditor(REP_ccmailid)
      var REP_spreadsheet_url=REP_newspread.getUrl();
      var REP_subject=REP_emlsub.replace("[REPORT NAME]",'ERM LEEDS');
      var REP_message=REP_emlbdy.replace("[MAILID_USERNAME]",REP_username);
      MailApp.sendEmail(REP_mailid, REP_subject, REP_message, {CC:REP_ccmailid,name:REP_subject,htmlBody: REP_message+': '+REP_spreadsheet_url});
      if((REP_mailid!=trg_UserStamp)&&(docowner!=trg_UserStamp)&&(REP_ccmailid!=trg_UserStamp))
      {
        DriveApp.getFileById(REP_ssids).removeEditor(trg_UserStamp);
      }
    }
    REP_conn.close();
  }
}
function CSVToArray( strData, strDelimiter ){
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = (strDelimiter || ",");
  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    (
      // Delimiters.
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
      
      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
      // Standard fields.
      "([^\"\\" + strDelimiter + "\\r\\n]*))"
    ),
    "gi"
  );
  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];
  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;
  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while (arrMatches = objPattern.exec( strData )){
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[ 1 ];
    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (
      strMatchedDelimiter.length &&
      (strMatchedDelimiter != strDelimiter)
      ){
        // Since we have reached a new row of data,
        // add an empty row to our data array.
        arrData.push( [] );
      }
    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[ 2 ]){
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      var strMatchedValue = arrMatches[ 2 ].replace(
        new RegExp( "\"\"", "g" ),
        "\""
      );
    } else {
      // We found a non-quoted value.
      var strMatchedValue = arrMatches[ 3 ];
    }
    // Now that we have our value string, let's add
    // it to the data array.
    arrData[ arrData.length - 1 ].push( strMatchedValue );
  }
  // Return the parsed data.
  return( arrData );
}
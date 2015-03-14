//*********************
//***********OPL AND ACTIVE CUSTOMER LIST**********************************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY PUNI
//VER 1.05  -SD:22/12/2014 ED:22/12/2014;TRACKER NO: 840//added droptemp table function from eilib for pf temp table issue
//VER 1.04  -SD:22/12/2014 ED:22/12/2014;TRACKER NO: 840//added droptemp table function from eilib for pf temp table issue
//DONE BY:KUMAR
//VER 1.03:SD:19/09/2014 ED:19/09/2014,TRACKER NO:748,Implemented preloader and msgbox position script and  changed conformation message
//VAR 1.02-SD:23/08/2014 ED:23/08/2014,TRACKER NO:748,OPL sp splited into 2 parts and sp name updated in script side.
//VER 1.01-SD:19/08/2014 ED:19/08/2014,TRACKER NO:748,Gave warning message for if opl list empty and updated new jquery and css links
//VER 1.00-SD:07/08/2014 ED:07/08/2014,TRACKER NO 748,changed template monthname and year;
//VER 0.09-SD:08/07/2014 ED:08/07/2014,TRACKER NO:748,Clered document shared id issue.
//VER 0.08-SD:28/06/2014 ED:28/06/2014,TRACKER NO:748,cleared active customer list sorted sheet max recver issue.
//VER 0.07-SD:19/06/2014 ED:19/06/2014,TRACKER NO:788,Implemented conn failure message.
//VER 0.06-SD:06/06/2014 ED:06/06/2014,TRACKER NO:788,changed preloader and jquery,css links and opl list issue.
//VER 0.05-SD:05/06/2014 ED:05/06/2014 TRACKER 788 passing empty('') sourcefolderid for moveolfolderid function. 
//VER 0.04-SD:09/04/2014 ED:11/04/2014 TRACKER 788:
//1.CHANGED OPL LIST CONDTION NOW OPL LIST CHECKING ACTIVE RECVER AND FUTURE RECVER FOR SELECTED MONTH 
//2.CHANGED ALL TEMP TABLES DYNAMICALLY.
//3.Changed Active Customer List SP dynamically.
//VER 0.03-SD:25/04/2012 ED:26/04/2014 TRACKER 727 :Tested OPL list with migration Records and Did NEW CR in Active Customer List.
//VER 0.02-SD:01/02/2014  ED:03/02/2014,TRACKER NO:727 Cleared conn issue and Wrote SP for calculating opl list.
//VER 0.01-INITIAL VERSION, SD:12/02/2014 ED:12/02/2014,TRACKER NO:171

//*********************************************************************************************************//

/////////////OUTSTANDING PAYEES LIST AND ACTIVE CC LIST FUNCTION/////////////////
function FIN_OPL_commonvalues()
{
  var FIN_OPL_conn=eilib.db_GetConnection();
  var FIN_OPL_mailarray=eilib.getProfileEmailId(FIN_OPL_conn,"OPL&ACTIVE CC");
  /**********************************ERROR MESSAGE*********************************************/
  var FIN_OPL_errormsg_code = "6"; 
  var FIN_OPL_error_array=eilib.GetErrorMessageList(FIN_OPL_conn, FIN_OPL_errormsg_code);
  var returnoplintial=[FIN_OPL_mailarray,FIN_OPL_error_array.errormsg];
  return returnoplintial;
}
function FIN_OPL_opllist(opl)
{
  try
  {
    var FIN_OPL_conn =eilib.db_GetConnection();
    var FIN_OPL_emailId =opl.FIN_OPL_lb_mailid;
    var FIN_OPL_name=FIN_OPL_emailId.toString();
    var FIN_OPL_index=FIN_OPL_name.indexOf("@");
    var FIN_OPL_username=FIN_OPL_name.substring(0,FIN_OPL_index).toUpperCase();
    var FIN_OPL_currmon_date=opl.FIN_OPL_db_period;
    var maildate=FIN_OPL_currmon_date.toUpperCase();
    
    /******************************OUSTANDING PAYEES LIST**************************************/
    if(opl.radio=='option1')
    {
      var FIN_OPL_date1= Utilities.formatDate(new Date(), TimeZone, 'MMMM-yyyy');
      var FIN_OPL_str = FIN_OPL_date1;
      var FIN_OPL_index = FIN_OPL_str.search('-');
      var FIN_OPL_m = FIN_OPL_str.substring(0,FIN_OPL_index);
      var FIN_OPL_withslash = FIN_OPL_str.replace(FIN_OPL_m,' '); 
      var FIN_OPL_y = FIN_OPL_withslash.replace('-',' ');
      var FIN_OPL_mm=FIN_OPL_date1.toUpperCase();
      var FIN_OPL_emailstmt=FIN_OPL_conn.createStatement();
      var FIN_OPL_emailQuery="SELECT ETD_EMAIL_SUBJECT,ETD_EMAIL_BODY FROM EMAIL_TEMPLATE_DETAILS WHERE ET_ID=6";
      var FIN_OPL_emailresult=FIN_OPL_emailstmt.executeQuery(FIN_OPL_emailQuery);
      if(FIN_OPL_emailresult.next())
      {
        var FIN_OPL_subj=FIN_OPL_emailresult.getString(1);
        var FIN_OPL_message2=FIN_OPL_emailresult.getString(2);
      }
      FIN_OPL_emailresult.close();
      FIN_OPL_emailstmt.close();
      var FIN_OPL_n=FIN_OPL_subj.replace('[MM-YYYY]', maildate);
      var FIN_OPL_mess=FIN_OPL_message2.replace('[MM-YYYY]',maildate);
      var FIN_OPL_d=FIN_OPL_mess.replace('[MAILID_USERNAME]',FIN_OPL_username);
      var FIN_OPL_subject =  FIN_OPL_n;
      var FIN_OPL_message = '<body>'+'<br>'+'<h> '+FIN_OPL_d+'</h>'+'<br>'+'<br>'+'<table border="1" style="color:white" width="800">'+'<tr  bgcolor=" #498af3" align="center" >'+'<td  width=50%><h3>UNIT-CUSTOMER</h3></td>'+'<td width=15%><h3>RENT</h3></td>'+'<td width=15%><h3>DEPOSIT</h3></td>'+'<td width=20%><h3>PROCESSING FEE</h3></td>'+'</tr>'+'</table>'+'</body>';
      
      var FIN_OPL_activecuststmt=FIN_OPL_conn.createStatement();
      var FIN_OPL_activecustspcallquery="CALL SP_OUTSTANDING_PAYMENTLIST('"+FIN_OPL_currmon_date+"','"+UserStamp+"',@TEMP_FINAL_NONPAIDCUSTOMER)";
      FIN_OPL_activecuststmt.execute(FIN_OPL_activecustspcallquery);
      var temptablenameresult=FIN_OPL_activecuststmt.executeQuery("SELECT @TEMP_FINAL_NONPAIDCUSTOMER");
      while(temptablenameresult.next())
      {
        var temptablename=temptablenameresult.getString(1);  
      }
      temptablenameresult.close();
      FIN_OPL_activecuststmt.close();
      var FIN_OPL_liststmt=FIN_OPL_conn.createStatement();
      var FIN_OPL_listquery="SELECT *FROM "+temptablename+" ORDER BY UNIT_NO,CUSTOMERNAME";
      var FIN_OPL_listresult=FIN_OPL_liststmt.executeQuery(FIN_OPL_listquery);
      while(FIN_OPL_listresult.next())
      {
        var flag=1;
        var unit=FIN_OPL_listresult.getString("UNIT_NO");
        var customername=FIN_OPL_listresult.getString("CUSTOMERNAME");
        var enddate=FIN_OPL_listresult.getString("FINAL_ENDDATE");
        var payment=FIN_OPL_listresult.getString("PAYMENT");
        if(payment=="NULL"){payment=" "};
        var deposit=FIN_OPL_listresult.getString("DEPOSIT");
        if(deposit=="NULL"){deposit=" "};
        var process=FIN_OPL_listresult.getString("PROCESSINGFEE");
        if(process=="NULL"){process=" "};
        if(enddate!=null)
        {
          enddate=eilib.SqlDateFormat(enddate);
          var opldataname=unit+'-'+customername+'  -   '+enddate;
        }
        else
        {
          opldataname=unit+'-'+customername;
        }
        opldataname=opldataname.replace('_',' ');
        if((payment=='X')&&(deposit=="X")&&(process=="X"))
        {
          FIN_OPL_message += '<body>'+'<table border="1"width="800" >'+'<tr>'+'<td bgcolor="#FF0000" width=50%>'+opldataname+'</td>'+'<td width=15% align="center">'+payment+'</td>'+'<td width=15% align="center">'+deposit+'</td>'+'<td width=20% align="center">'+process+'</td>'+'</tr>'+'</table>'+'</body>';
        }
        else
        {
          FIN_OPL_message += '<body>'+'<table border="1"width="800" >'+'<tr>'+'<td width=50%>'+opldataname+'</td>'+'<td width=15% align="center">'+payment+'</td>'+'<td width=15% align="center">'+deposit+'</td>'+'<td width=20% align="center">'+process+'</td>'+'</tr>'+'</table>'+'</body>';
        }
      }
      FIN_OPL_listresult.close();
      FIN_OPL_liststmt.close();
      if(flag==1)
      {
        var returnmsg="OPL";
        var displayname="OUTSTANDING PAYEES LIST ";
        var advancedArgs={name:displayname,htmlBody:FIN_OPL_message};
        MailApp.sendEmail(FIN_OPL_emailId, FIN_OPL_subject, FIN_OPL_message,advancedArgs);
      }
      else
      {
        returnmsg="EMPTYOPL";
      }
      eilib.DropTempTable(FIN_OPL_conn,temptablename);  
    }
    /***************************ACTIVE CUSTOMER LIST****************************************/
    if(opl.radio=='option2')
    {
      var FIN_ACT_tempstmt=FIN_OPL_conn.createStatement();
      var activecclist="CALL SP_ACTIVE_CUSTOMERLIST('"+FIN_OPL_currmon_date+"','"+UserStamp+"',@TEMP_OPL_ACTIVECUSTOMER_TABLE,@TEMP_OPL_SORTEDACTIVECUSTOMER_TABLE)";
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
        var FIN_ACT_shheetname=maildate;//Utilities.formatDate(new Date(), TimeZone, "MMMyyyy");
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
      eilib.SetDocOwner(FIN_ACT_ssid,docowner,FIN_OPL_emailId);
      var displayname=eilib.Get_MailDisplayName('ACTIVE_CC_LIST');
      var body1 ="HELLO  "+FIN_OPL_username;
      var subject='ACTIVE CUST LIST-'+FIN_ACT_monthyear;
      MailApp.sendEmaila(FIN_OPL_emailId, subject, body1, {name:displayname,htmlBody: body1+'<br><br>, PLEASE FIND ATTACHED THE CURRENT : '+FIN_ACT_url});
      eilib.DropTempTable(FIN_OPL_conn,activelisttablename);    
      eilib.DropTempTable(FIN_OPL_conn,sortactivelisttablename);    
      returnmsg="ACTIVECCLIST";
    }
  }
  catch(err)
  {
    Logger.log("SCRIPT EXCEPTION:"+err)
    if(temptablename!=null&&temptablename!=undefined)
    {
      eilib.DropTempTable(FIN_OPL_conn,temptablename); 
    }
    if(activelisttablename!=null&&activelisttablename!=undefined)
    {
      eilib.DropTempTable(FIN_OPL_conn,activelisttablename);    
    }
    if(sortactivelisttablename!=null&&sortactivelisttablename!=undefined)
    {
      eilib.DropTempTable(FIN_OPL_conn,sortactivelisttablename);
    }
    return (Logger.getLog()); 
  }
  FIN_OPL_conn.close();
  return returnmsg;
}

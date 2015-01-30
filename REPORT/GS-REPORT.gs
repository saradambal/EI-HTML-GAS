//*******************************************FILE DESCRIPTION*********************************************//
//*******************************************REPORT*******************************************************//
//DONE BY:PUNI
//VER 2.1-SD:06/10/2014,ED:06/10/2014,TRACKER NO:655,1.Changed script for preloader,msgbox position,2.corrected sort by for report name n report category
//DONE BY:SARADAMBAL
//VER 2.0-SD:22/08/2014 ED:22/08/2014,TRACKER NO:655,updated new links
//DONE BY:LALITHA
//VER 1.9-SD:31/07/2014 ED:31/07/2014,TRACKER NO:655,Updated to restrict the current mnth dp for expense nd erm leeds report,Atlast showned the emailid(changed validation),Changed alignmnt right side of amt nd date,Updated dp inside of same table(corrected alignment of dp),Removed repeated query
//VER 1.8-SD:30/07/2014 ED:30/07/2014,TRACKER NO:655,Updated mandatory symbol for dp
//VER 1.7-SD:30/07/2014 ED:30/07/2014,TRACKER NO:655,Changed Return Function,Changed the active unit expense spreadsheet for particular month wth dp,Updated parsefloat for amt,Changed validation,changed hypen for date 
//VER 1.6-SD:11/07/2014 ED:12/07/2014,TRACKER NO:655,Updated column width for all spread sheet
//VER 1.5-SD:03/07/2014 ED:04/07/2014,Added new report for Erm Leeds wth date picker funct(mnt nd yr),Added global var for timezone,utilities functn,Newly added err msg(script error)in failure funct,Added remove editors eilib funct,Changed return funct
//VER 1.4-SD:18/06/2014 ED:19/06/2014,TRACKER NO:655,Changed failure funct,Newly added header(comments),Removed headers(custid,uasdid),Removed the underscore of header(processingwaived),Changed dob spelling,Removed timing for all dateformats,Sorted by(unitno,custname,recrver),Arranged the full headers for all customer details
//VER 1.3-SD:06/06/2014 ED:06/06/2014,TRACKER NO:655,Changed jquery link 
//VER 1.2-SD:05/06/2014 ED:05/06/2014,Updated empty parameter passed in move file to folder eilib functn
//VER 1.1-SD:28/05/2014 ED:03/06/2014,Updated new report(NON ACTIVE UNTERMINATE UNIT and ALL CUTOMER DETAILS),Dont create the spreadsheet for empty records,Changed date format of preterminate date nd time zone format for current expiry list,changed select query(END DATE)for active unit,Updated doc owner,Cleared the issue first time data is not retrieved frm db
//VER 1.0-SD:12/05/2014 ED:14/05/2014,Changed return function,changed label name for category,Updated width for buttons,Added preloader aftr category change functn,Changed header name(record ver into lease period),Implemented dynamic sp
//VER 0.09-SD:17/04/2014 ED:28/04/2014,Dont send mail sheets nd refresh the sheet for empty records in db,Removed hard code for folder id nd subject nd body of mail,Changed data instead of id,Put title aftr file descrptn,Removed empty line from db of(ALL UNIT INVENTORY CARD),Added preloader in beginning form loading,Changed the header name of customerlpdetails
//VER 0.08-SD:12/03/2014 ED:12/03/2014,removed repeated queries,updated conn,stmt,rs close for each function
//VER 0.07-SD:04/03/2014 ED:04/03/2014,updated userstamp as uldid 
//VER 0.06-SD:19/01/2014 ED:03/02/2014,updated active unit unit report,On failure function,changed err msg from getting eilib,removed repeated function nd combined all,removed the hard code of url id and also listbox box option name
//VER 0.05-SD:28/12/2013 ED:31/12/2013,updated current month expiry list,connection,delete unknown columns,removed doget
//VER 0.04-SD:28/12/2013 ED:28/12/2013,updated title tag,connection,utilities,userstamp
//VER 0.03-SD:14/11/2013 ED:23/12/2013,changed link,try catch,script name
//VER 0.02-SD:14/11/2013 ED:23/12/2013,changed site name
//VER 0.01-INITIAL VERSION, SD:14/11/2013 ED:23/12/2013,TRACKER NO:655,pending current month expiry list sheet,error msg
//*********************************************************************************************************//
try
{
  //GET DOMAINS,ERROR MESSAGE
  function REP_getdomain_err()
  {
    var REP_conn=eilib.db_GetConnection();
    var REP_searchoptions_dataid=[];
    var REP_select_catagotyreport_name="SELECT CGN_ID,CGN_TYPE FROM CONFIGURATION WHERE CGN_ID IN(59,60,61,73,82) ORDER BY CGN_TYPE ASC";
    var REP_catagoryreport_name_stmt=REP_conn.createStatement();
    var REP_catagoryreport_name_rs=REP_catagoryreport_name_stmt.executeQuery( REP_select_catagotyreport_name);
    while(REP_catagoryreport_name_rs.next())
    {
      var REP_searchoptions_id=REP_catagoryreport_name_rs.getString(1);
      var REP_searchoptions_data=REP_catagoryreport_name_rs.getString(2);
      var REP_searchoptions_object={"REP_searchoption_id":REP_searchoptions_id,"REP_searchoption_data":REP_searchoptions_data};
      REP_searchoptions_dataid.push(REP_searchoptions_object);
    }
    REP_catagoryreport_name_rs.close();
    REP_catagoryreport_name_stmt.close();
    //REPORT NAME
    var REP_report_name_stmt=REP_conn.createStatement();
    var REP_report_name_arraydataid=[];
    var REP_select_report_name="SELECT RCN_ID,RCN_DATA FROM REPORT_CONFIGURATION WHERE RCN_INITIALIZE_FLAG='X' ORDER BY RCN_DATA ASC"; 
    var REP_report_name_rs=REP_report_name_stmt.executeQuery( REP_select_report_name);
    while(REP_report_name_rs.next())
    {
      var REP_reportname_id=REP_report_name_rs.getString(1);
      var REP_reportname_data=REP_report_name_rs.getString(2);
      var REP_reportname_object={"REP_reportnames_id":REP_reportname_id,"REP_reportnames_data":REP_reportname_data};
      REP_report_name_arraydataid.push(REP_reportname_object);  
    }
    REP_report_name_rs.close();
    REP_report_name_stmt.close();
    //EMAIL ID
    var REP_emailid_array=[];
    var REP_emailid_array=eilib.getProfileEmailId(REP_conn,"REPORT")
    //RETRIEVE MESSAGE FOR REPORT RECORD FROM ERROR TABLE
    var REP_errmsgids="282,341,395,459";
    var REP_errorMsg_array=[];
    REP_errorMsg_array=eilib.GetErrorMessageList(REP_conn,REP_errmsgids);
    var REP_result={"REP_catagoryreportname":REP_searchoptions_dataid,"REP_reportname":REP_report_name_arraydataid,"REP_emailid":REP_emailid_array,"REP_errormsg":REP_errorMsg_array.errormsg};      
    REP_conn.close();
    return REP_result;
  }
  //FUNCTION FOR ALL SEARCH BY CATAGORY REPORT
  function REP_func_load_searchby_option(REP_report_optionfetch)
  {
    var REP_conn=eilib.db_GetConnection();
    var REP_stmt=REP_conn.createStatement();
    var REP_loaddata_arrdataid=[];
    var REP_selectquery=[];
    REP_selectquery[59]='1,2,3,4,5,30';REP_selectquery[60]='6';REP_selectquery[61]='7,8,31';REP_selectquery[73]='28';REP_selectquery[82]='32';
    var REP_reportconfig="SELECT RCN_ID,RCN_DATA FROM REPORT_CONFIGURATION WHERE RCN_ID IN ("+REP_selectquery[REP_report_optionfetch]+") ORDER BY RCN_DATA ASC";
    var REP_separate_rs=REP_stmt.executeQuery(REP_reportconfig);
    while(REP_separate_rs.next())
    {
      var REP_seperatereportname_id=REP_separate_rs.getString(1);
      var REP_seperatereportname_data=REP_separate_rs.getString(2);
      var REP_seperatereportname_object={"REP_seperatereportnames_id":REP_seperatereportname_id,"REP_seperatereportnames_data":REP_seperatereportname_data};
      REP_loaddata_arrdataid.push(REP_seperatereportname_object);   
    }
    var REP_result_obj={"REP_loaddata_searchby":REP_loaddata_arrdataid,"REP_flag":REP_report_optionfetch}
    REP_separate_rs.close();
    REP_stmt.close();
    REP_conn.close();
    return REP_result_obj;
  }
  var REP_search_spreadsheetarray=[];
  var REP_spreadsheetheader=[];
  var REP_spreadsheetresult=[];
  var REP_count=0;
  // FUNCTION FOR SHOW THE DATA IN SS
  function REP_ss_getdatas(REP_id,REP_name,REP_emailid,REP_catagry,REP_dtepickmonth)
  {
    var REP_conn=eilib.db_GetConnection();
    var REP_stmt=REP_conn.createStatement();
    if(REP_id==32)//ERM LEEDS
    {
    if(REP_dtepickmonth!=null)
    {
      var REP_dtepickmonth=REP_dtepickmonth.split('-');
      var monthArr=['January','February','March','April','May','June','July','August','September','October','November','December'];
      var fromMonth=REP_dtepickmonth[0];
      var toMonth=REP_dtepickmonth[1];
      for(var i=0;i<=monthArr.length;i++)
      {
        if(monthArr[i]==fromMonth)
        {
          var getfromMonth=i;
        }
      }
      var newdate=new Date(toMonth,getfromMonth)
      var getdate=newdate.getDate();
      var endnewdate=new Date(toMonth,getfromMonth,getdate-1);
      var startdate=new Date(toMonth,getfromMonth-1);
      var REP_utstrdte=Utilities.formatDate(new Date(startdate), TimeZone,'yyyy-MM-dd');
      var REP_utenddte=Utilities.formatDate(new Date(endnewdate),TimeZone, 'yyyy-MM-dd');
    }
    }
    var REP_namemail=REP_emailid.toString();
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
    if(REP_id==32)//ERM LEEDS
    {
      var REP_date=newdate; 
      var REP_day=REP_date.getDate();
      var REP_month=REP_date.getMonth();
      var REP_year=REP_date.getFullYear();
      var REP_last=new Date(REP_year,REP_month);
      var REP_lastmonthdate=new Date(REP_year,REP_month+1).getTime();
      var REP_lastdate=new Date(REP_year,REP_month).getTime();
      var REP_monthname=new Date(REP_year,REP_month,REP_day);
      var REP_currentdateyear=Utilities.formatDate(new Date(REP_monthname),timeZoneFormat, 'yyyy')
      var REP_namesht=REP_name+' '+REP_currentdateyear;
      var REP_lastname=new Date(REP_year,REP_month,REP_day-1);
      var REP_lastdate_year=Utilities.formatDate(new Date(REP_lastname),timeZoneFormat, 'yyyy');
      var REP_nameshts=REP_name+' '+REP_lastdate_year;
      var REP_sheetnames=Utilities.formatDate(new Date(REP_monthname),timeZoneFormat, 'MMMM');
      var REP_sheetname=REP_sheetnames.toUpperCase();
    }
    if(REP_id==8)//CURRENT MONTH EXPIRY LIST
    {
      var REP_current_month_date=new Date();
      var REP_current_month_day=REP_current_month_date.getDate()-1;
      var REP_current_month_month=REP_current_month_date.getMonth();
      var REP_current_month_year=REP_current_month_date.getFullYear();
      var REP_date=new Date(REP_current_month_year,REP_current_month_month,REP_current_month_day);
      var REP_day=REP_date.getDate();
      var REP_month=REP_date.getMonth();
      var REP_year=REP_date.getFullYear();
      var REP_last=new Date(REP_year,REP_month);
      var REP_lastmonthdate=new Date(REP_year,REP_month+1).getTime();
      var REP_lastdate=new Date(REP_year,REP_month).getTime();
      var REP_monthname=new Date(REP_year,REP_month,REP_day);
      var REP_currentdateyear=Utilities.formatDate(new Date(REP_monthname),timeZoneFormat, 'yyyy')
      var REP_namesht=REP_name+' '+REP_currentdateyear;
      var REP_lastname=new Date(REP_year,REP_month,REP_day-1);
      var REP_lastdate_year=Utilities.formatDate(new Date(REP_lastname),timeZoneFormat, 'yyyy');
      var REP_nameshts=REP_name+' '+REP_lastdate_year;
      var REP_sheetnames=Utilities.formatDate(new Date(REP_monthname),timeZoneFormat, 'MMMM');
      var REP_sheetname=REP_sheetnames.toUpperCase();
    }
    if((REP_id==6)||(REP_id==7)||(REP_id==2)||(REP_id==4)||(REP_id==8)||(REP_id==5)||(REP_id==1)||(REP_id==3)||(REP_id==30)||(REP_id==31) || (REP_id==32))
    {
      if((REP_id==4)||(REP_id==5)||(REP_id==1)||(REP_id==3)||(REP_id==30))
      {
        REP_namesht=REP_catagry;
        REP_nameshts=REP_catagry;
      }
      else if((REP_id==8) || (REP_id==32))
      {
        REP_namesht=REP_namesht;
        REP_namesht=REP_nameshts;
      }
      else 
      {
        var REP_namesht=REP_name;
        var REP_nameshts=REP_name;
      }
      if((REP_id!=8) && (REP_id!=32) && (REP_id!=28))
      {
        var REP_sheetnames=REP_name;
        var REP_sheetname=REP_sheetnames.toUpperCase();
      }
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
          if(REP_id==6)//EMPLOYEE INVENTORY CARD
          {
            REP_employee(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
          }
          if(REP_id==7)//ACTIVE CUSTOMER
          {
            REP_activecustomer(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
          }
          if(REP_id==2)//LOGIN AND STARHUB DETAILS
          {
            REP_login(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
          }
          if(REP_id==4)//ACTIVE UNIT
          {
            REP_active(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
          }
          if(REP_id==8)//CURRENT MONTH EXPIRY LIST
          {
            REP_currentmonth(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
          }
          if(REP_id==5)//NON ACTIVE UNIT
          {
            REP_nonactive(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
          }
          if(REP_id==1)//UNIT INVENTORY CARD
          {
            REP_inventorycard(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
          }
          if(REP_id==3)//UNIT DOOR CODE
          {
            REP_doorcode(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
          }
          if(REP_id==30)//NON ACTIVE UNTERMINATE UNIT
          {
            REP_nonactiveunterminateunit(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
          }
          if(REP_id==31)//ALL CUSTOMER DETAILS
          {
            REP_customerdetails(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
          }
          if(REP_id==32)//ERM LEEDS
          {
            REP_ermleeds(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread,REP_utstrdte,REP_utenddte);
          }
          REP_Sheet.setFrozenRows(1);
        }
        else 
        {
          if(REP_flags==0){
            REP_Sheet=REP_newspread.insertSheet(REP_sheetname);
            REP_Sheet.setFrozenRows(1);
          }
          else{
            REP_Sheet=REP_newspread.insertSheet(REP_sheetname);
            if(REP_id==6)//EMPLOYEE INVENTORY CARD
            {
              REP_employee(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
            }
            if(REP_id==7)//ACTIVE CUSTOMER
            {
              REP_activecustomer(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
            }
            if(REP_id==2)//LOGIN AND STARHUB DETAILS
            {
              REP_login(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
            }
            if(REP_id==4)//ACTIVE UNIT
            {
              REP_active(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
            }
            if(REP_id==8)//CURRENT MONTH EXPIRY LIST
            {
              REP_currentmonth(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
            }
            if(REP_id==5)//NON ACTIVE UNIT
            {
              REP_nonactive(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
            }
            if(REP_id==1)//UNIT INVENTORY CARD
            {
              REP_inventorycard(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
            }
            if(REP_id==3)//UNIT DOOR CODE
            {
              REP_doorcode(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
            }
            if(REP_id==30)//NON ACTIVE UNTERMINATE UNIT
            {
              REP_nonactiveunterminateunit(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
            }
            if(REP_id==31)//ALL CUSTOMER DETAILS
            {
              REP_customerdetails(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
            }
            if(REP_id==32)//ERM LEEDS
            {
              REP_ermleeds(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread,REP_utstrdte,REP_utenddte);
            }
            REP_Sheet.setFrozenRows(1);
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
        if(REP_id==6)//EMPLOYEE INVENTORY CARD
        {
          REP_employee(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
        }
        if(REP_id==7)//ACTIVE CUSTOMER
        {
          REP_activecustomer(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
        }
        if(REP_id==2)//LOGIN AND STARHUB DETAILS
        {
          REP_login(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
        }
        if(REP_id==4)//ACTIVE UNIT
        {
          REP_active(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
        }
        if(REP_id==8)//CURRENT MONTH EXPIRY LIST
        {
          REP_currentmonth(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
        }
        if(REP_id==5)//NON ACTIVE UNIT
        {
          REP_nonactive(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
        }
        if(REP_id==1)//UNIT INVENTORY CARD
        {
          REP_inventorycard(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
        }
        if(REP_id==3)//UNIT DOOR CODE
        {
          REP_doorcode(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
        }
        if(REP_id==30)//NON ACTIVE UNTERMINATE UNIT
        {
          REP_nonactiveunterminateunit(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
        }
        if(REP_id==31)//ALL CUSTOMER DETAILS
        {
          REP_customerdetails(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
        }
        if(REP_id==32)//ERM LEEDS
        {
          REP_ermleeds(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread,REP_utstrdte,REP_utenddte);
        }
        REP_Sheet.setFrozenRows(1);
      }
      if(REP_namesht!=REP_nameshts)
      {
        var REP_newspread=SpreadsheetApp.create(REP_namesht);
        var REP_ssids=REP_newspread.getId();
        REP_Sheet=REP_newspread.insertSheet(REP_sheetname);
        REP_Sheet.setFrozenRows(1);
      }
    }
    if(REP_id==28)//ACTIVE UNIT EXPENSE
    {
      var REP_monthyearact=Utilities.formatDate(new Date(), TimeZone, "ddMMyyyy");
      REP_dtepickmonth.toUpperCase();
      var REP_ssnameact=REP_name+'-'+REP_monthyearact;
      var REP_newspread=SpreadsheetApp.create(REP_ssnameact);
      var REP_ssids=REP_newspread.getId();
      REP_Sheet=REP_newspread.insertSheet(REP_dtepickmonth);
      var REP_reportsheet=REP_newspread.getSheetByName('Sheet1');
      REP_newspread.deleteSheet(REP_reportsheet);
      var REP_spreadsheet_url=REP_newspread.getUrl();
      var REP_ssids=REP_newspread.getId();
      REP_Sheet.setFrozenRows(1);
      if(REP_id==28)//ACTIVE UNIT EXPENSE
       {
         REP_expense(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread,REP_dtepickmonth);
       }
    }
    if(REP_count!=0)
    {
      var REP_filess=DriveApp.getFolderById(REP_folderid).getId();
      var REP_ssids=REP_newspread.getId();
      var docowner=eilib.CUST_documentowner(REP_conn)
      eilib.CUST_moveFileToFolder(REP_ssids,"",REP_filess)
      eilib.SetDocOwner(REP_ssids,docowner,REP_emailid)
      var REP_spreadsheet_url=REP_newspread.getUrl();
      var REP_subject=REP_emlsub.replace("[REPORT NAME]",REP_name);
      var REP_message=REP_emlbdy.replace("[MAILID_USERNAME]",REP_username);
      MailApp.sendEmail(REP_emailid, REP_subject, REP_message, {name:REP_subject,htmlBody: REP_message+': '+REP_spreadsheet_url});
      eilib.RemoveEditors(REP_ssids,REP_emailid,docowner)
    }
    return REP_count;
  }
  //FUNCTION FOR EMPLOYEE INVENTORY CARD REPORT       
  function REP_employee(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
  {
    var REP_conn=eilib.db_GetConnection();
    var REP_stmt=REP_conn.createStatement();
    var REP_flextable_query="SELECT ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME,UASD.UASD_ACCESS_CARD FROM EMPLOYEE_DETAILS ED,UNIT_ACCESS_STAMP_DETAILS UASD,EMPLOYEE_CARD_DETAILS ECD WHERE ED.EMP_ID=ECD.EMP_ID AND ECD.UASD_ID=UASD.UASD_ID ORDER BY ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME";
    var REP_flex_rs=REP_stmt.executeQuery(REP_flextable_query);
    while (REP_flex_rs.next()) 
    {
      REP_count=1;
      var REP_firstname=REP_flex_rs.getString("EMP_FIRST_NAME");
      var REP_lastname=REP_flex_rs.getString("EMP_LAST_NAME");
      var STDTL_SEARCH_employeenameconcat=REP_firstname+' '+REP_lastname
      var REP_accesscard=REP_flex_rs.getString("UASD_ACCESS_CARD");
      var REP_spreadsheetlist=STDTL_SEARCH_employeenameconcat+'^'+REP_accesscard;
      REP_search_spreadsheetarray.push(REP_spreadsheetlist) 
    }
    if(REP_count==1)
    {
      var REP_finaltable=REP_spreadsheetresult.concat(REP_search_spreadsheetarray);
      REP_finaltable.sort();
      var REP_employeenamehead='EMPLOYEE NAME';
      var REP_accesscardhead='ACCESS CARD';
      REP_spreadsheetheader.push(REP_employeenamehead+','+REP_accesscardhead)
      REP_Sheet.clear();
      var REP_spreadsheet_url=REP_newspread.getUrl();
      for(var i=0;i<REP_spreadsheetheader.length;i++)
      {
        var REP_counter=REP_Sheet.getLastRow()+1;
        var REP_value=REP_spreadsheetheader[i];
        var REP_valueset=REP_value.split(',');
        REP_Sheet.getRange(REP_counter,1).setValue(REP_valueset[0]);
        REP_Sheet.getRange(REP_counter,2).setValue(REP_valueset[1]);
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
        REP_Sheet.setColumnWidth(1, 200);
        REP_Sheet.getRange(REP_counter,2).setValue(REP_valueset[1]);
        if(REP_valueset[2]=='null')
        {
          REP_valueset[2]="";
        }
        REP_Sheet.setColumnWidth(2, 120);
      }
    }
    REP_flex_rs.close();
    REP_stmt.close();
    REP_conn.close();
  }
  //FUNCTION FOR ACTIVE CUSTOMER REPORT
  function REP_activecustomer(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
  {
    var REP_conn=eilib.db_GetConnection();
    var REP_stmt=REP_conn.createStatement();
    var REP_tempstmt=REP_conn.createStatement();
    REP_tempstmt.execute("CALL SP_REPORT_CURRENT_ACTIVE_CUSTOMER('"+UserStamp+"',@REPORT_CURRENT_ACTIVE_CUSTOMER)");
    REP_tempstmt.close();
    var REP_stmt_temptble = REP_conn.createStatement();
    var REP_rs_temptble  = REP_stmt_temptble.executeQuery("SELECT @REPORT_CURRENT_ACTIVE_CUSTOMER");
    while(REP_rs_temptble.next()){   
      var REP_temptblename= REP_rs_temptble.getString("@REPORT_CURRENT_ACTIVE_CUSTOMER");
    }
    REP_rs_temptble.close();
    REP_stmt_temptble.close();
    var REP_stmt=REP_conn.createStatement();
    var REP_flextable_query= "SELECT CUSTOMER_FIRST_NAME,CUSTOMER_LAST_NAME,UNIT_NO,LEASE_PERIOD,CED_RECHECKIN,CED_EXTENSION,CED_PRETERMINATE,CC_PAYMENT_AMOUNT,CC_DEPOSIT,CC_PROCESSING_FEE,CC_AIRCON_FIXED_FEE,CC_ELECTRICITY_CAP,CC_DRYCLEAN_FEE,CC_AIRCON_QUARTERLY_FEE,CC_CHECKOUT_CLEANING_FEE,DATE_FORMAT(CLP_STARTDATE,'%d/%m/%Y') AS CLP_STARTDATE,DATE_FORMAT(CLP_ENDDATE,'%d/%m/%Y') AS CLP_ENDDATE,DATE_FORMAT(CLP_PRETERMINATE_DATE,'%d/%m/%Y') AS CLP_PRETERMINATE_DATE,CLP_TERMINATE FROM "+REP_temptblename+" ORDER BY UNIT_NO";
    var REP_flex_rs=REP_stmt.executeQuery(REP_flextable_query);
    while (REP_flex_rs.next()) 
    {
      REP_count=1;
      var REP_customerfirstname=REP_flex_rs.getString("CUSTOMER_FIRST_NAME");
      var REP_customerlastname=REP_flex_rs.getString("CUSTOMER_LAST_NAME");
      var REP_customernameconcat=REP_customerfirstname+' '+REP_customerlastname
      var REP_unitno=REP_flex_rs.getString("UNIT_NO");
      var REP_recver=REP_flex_rs.getString("LEASE_PERIOD");
      var REP_recheckin=REP_flex_rs.getString("CED_RECHECKIN");
      var REP_extension=REP_flex_rs.getString("CED_EXTENSION");
      var REP_preterminate=REP_flex_rs.getString("CED_PRETERMINATE");
      var REP_paymentamount=REP_flex_rs.getString("CC_PAYMENT_AMOUNT");
      var REP_deposit=REP_flex_rs.getString("CC_DEPOSIT");
      var REP_processingfee=REP_flex_rs.getString("CC_PROCESSING_FEE");
      var REP_airconfixedfee=REP_flex_rs.getString("CC_AIRCON_FIXED_FEE");
      var REP_electricitycap=REP_flex_rs.getString("CC_ELECTRICITY_CAP");
      var REP_drycleanfee=REP_flex_rs.getString("CC_DRYCLEAN_FEE");
      var REP_airconquarterlyfee=REP_flex_rs.getString("CC_AIRCON_QUARTERLY_FEE");
      var REP_checkoutcleaningfee=REP_flex_rs.getString("CC_CHECKOUT_CLEANING_FEE");
      var REP_startdate=REP_flex_rs.getString("CLP_STARTDATE");
      var REP_enddate=REP_flex_rs.getString("CLP_ENDDATE");
      var REP_preterminatedate=REP_flex_rs.getString("CLP_PRETERMINATE_DATE");
      var REP_terminate=REP_flex_rs.getString("CLP_TERMINATE");
      var REP_spreadsheetlist=REP_customernameconcat+'^'+REP_unitno+'^'+REP_recver+'^'+REP_recheckin+'^'+REP_extension+'^'+REP_preterminate+'^'+REP_paymentamount+'^'+REP_deposit+'^'+REP_processingfee+'^'+REP_airconfixedfee+'^'+REP_electricitycap+'^'+REP_drycleanfee+'^'+REP_airconquarterlyfee+'^'+REP_checkoutcleaningfee+'^'+REP_startdate+'^'+REP_enddate+'^'+REP_preterminatedate+'^'+REP_terminate;
      REP_search_spreadsheetarray.push(REP_spreadsheetlist) 
    }
    if(REP_count==1)
    {
      var REP_finaltable=REP_spreadsheetresult.concat(REP_search_spreadsheetarray);
      REP_finaltable.sort();
      var REP_customernamehead='CUSTOMER NAME';
      var REP_unitnohead='UNIT NO';
      var REP_recordversionhead='LEASE PERIOD'; 
      var REP_recheckinhead='RECHECKIN';
      var REP_extensionhead='EXTENSION';
      var REP_preterminatehead='PRETERMINATE';   
      var REP_paymentamounthead='PAYMENT AMOUNT';
      var REP_deposithead='DEPOSIT';
      var REP_processingfeehead='PROCESSING FEE';
      var REP_airconfixedfeehead='AIRCON FIXED FEE';
      var REP_electricitycaphead='ELECTRICITY CAP';
      var REP_drycleanfeehead='DRY CLEAN FEE';
      var REP_airconquarterlyfeehead='AIRCON QUARTERLY FEE';
      var REP_checkoutcleaningfeehead='CHECKOUT CLEANING FEE';
      var REP_startdatehead='START DATE';
      var REP_enddatehead='END DATE';
      var REP_preterminatedatehead='PRETERMINATE DATE';
      var REP_terminatehead='TERMINATE';
      REP_spreadsheetheader.push(REP_customernamehead+','+REP_unitnohead+','+REP_recordversionhead+','+REP_recheckinhead+','+REP_extensionhead+','+REP_preterminatehead+','+REP_paymentamounthead+','+REP_deposithead+','+REP_processingfeehead+','+REP_airconfixedfeehead+','+REP_electricitycaphead+','+REP_drycleanfeehead+','+REP_airconquarterlyfeehead+','+REP_checkoutcleaningfeehead+','+REP_startdatehead+','+REP_enddatehead+','+REP_preterminatedatehead+','+REP_terminatehead)
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
        REP_Sheet.getRange(REP_counter,14).setValue(REP_valueset[13]);
        REP_Sheet.getRange(REP_counter,15).setValue(REP_valueset[14]);
        REP_Sheet.getRange(REP_counter,16).setValue(REP_valueset[15]);
        REP_Sheet.getRange(REP_counter,17).setValue(REP_valueset[16]);
        REP_Sheet.getRange(REP_counter,18).setValue(REP_valueset[17]);
        REP_Sheet.setFrozenRows(1);
        REP_Sheet.getRange(1, 1, 1, REP_Sheet.getLastColumn()).setBackground('#498af3').setFontColor('white').setFontSize(12).setFontFamily('BOLD');
      } 
      for(var i=0;i<REP_finaltable.length;i++)
      {
        var REP_counter=REP_Sheet.getLastRow()+1;
        var REP_value=REP_finaltable[i];
        var REP_valueset=REP_value.split('^');
        var REP_unitvalue="'"+REP_valueset[1];
        REP_Sheet.getRange(REP_counter,1).setValue(REP_valueset[0]);
        if(REP_valueset[1]=='null')
        {
          REP_valueset[1]="";
        }
        REP_Sheet.setColumnWidth(1, 240);
        REP_Sheet.setColumnWidth(6, 300);
        REP_Sheet.getRange(REP_counter,2).setValue(REP_unitvalue);
        if(REP_valueset[2]=='null')
        {
          REP_valueset[2]="";
        }
        REP_Sheet.setColumnWidth(2, 70);
        REP_Sheet.getRange(REP_counter,3).setValue(REP_valueset[2]);
        if(REP_valueset[3]=='null')
        {
          REP_valueset[3]="";
        }
        REP_Sheet.setColumnWidth(3, 120);
        REP_Sheet.getRange(REP_counter,4).setValue(REP_valueset[3]);
        if(REP_valueset[4]=='null')
        {
          REP_valueset[4]="";
        }
        REP_Sheet.setColumnWidth(4, 100);
        REP_Sheet.getRange(REP_counter,5).setValue(REP_valueset[4]);
        if(REP_valueset[5]=='null')
        {
          REP_valueset[5]="";
        }
        REP_Sheet.setColumnWidth(5, 100);
        REP_Sheet.getRange(REP_counter,6).setValue(REP_valueset[5]);
        if(REP_valueset[6]=='null')
        {
          REP_valueset[6]="";
        }
        REP_Sheet.setColumnWidth(6, 130);
        REP_Sheet.getRange(REP_counter,7).setValue(REP_valueset[6]);
        if(REP_valueset[7]=='null')
        {
          REP_valueset[7]="";
        }
        REP_Sheet.setColumnWidth(7, 150);
        REP_Sheet.getRange(REP_counter,8).setValue(REP_valueset[7]);
        if(REP_valueset[8]=='null')
        {
          REP_valueset[8]="";
        }
        REP_Sheet.setColumnWidth(8, 70);
        REP_Sheet.getRange(REP_counter,9).setValue(REP_valueset[8]);
        if(REP_valueset[9]=='null')
        {
          REP_valueset[9]="";
        }
        REP_Sheet.setColumnWidth(9, 140);
        REP_Sheet.getRange(REP_counter,10).setValue(REP_valueset[9]);
        if(REP_valueset[10]=='null')
        {
          REP_valueset[10]="";
        }
        REP_Sheet.setColumnWidth(10, 160);
        REP_Sheet.getRange(REP_counter,11).setValue(REP_valueset[10]);
        if(REP_valueset[11]=='null')
        {
          REP_valueset[11]="";
        }
        REP_Sheet.setColumnWidth(11, 110);
        REP_Sheet.getRange(REP_counter,12).setValue(REP_valueset[11]);
        if(REP_valueset[12]=='null')
        {
          REP_valueset[12]="";
        }
        REP_Sheet.setColumnWidth(12, 130);
        REP_Sheet.getRange(REP_counter,13).setValue(REP_valueset[12]);
        if(REP_valueset[13]=='null')
        {
          REP_valueset[13]="";
        }
        REP_Sheet.setColumnWidth(13, 200);
        REP_Sheet.getRange(REP_counter,14).setValue(REP_valueset[13]);
        if(REP_valueset[14]=='null')
        {
          REP_valueset[14]="";
        }
        REP_Sheet.setColumnWidth(14, 220);
        REP_Sheet.getRange(REP_counter,15).setValue(REP_valueset[14]).setHorizontalAlignment("right");
        if(REP_valueset[15]=='null')
        {
          REP_valueset[15]="";
        }
        REP_Sheet.setColumnWidth(15, 100);
        REP_Sheet.getRange(REP_counter,16).setValue(REP_valueset[15]).setHorizontalAlignment("right");
        if(REP_valueset[16]=='null')
        {
          REP_valueset[16]="";
        }
        REP_Sheet.setColumnWidth(16, 80);
        REP_Sheet.getRange(REP_counter,17).setValue(REP_valueset[16]).setHorizontalAlignment("right");
        if(REP_valueset[17]=='null')
        {
          REP_valueset[17]="";
        }
        REP_Sheet.setColumnWidth(17, 170);
        REP_Sheet.getRange(REP_counter,18).setValue(REP_valueset[17]);
        if(REP_valueset[18]=='null')
        {
          REP_valueset[18]="";
        }
        REP_Sheet.setColumnWidth(18, 100);
      }
    }
    REP_flex_rs.close();
    REP_stmt.close();
    eilib.DropTempTable(REP_conn,REP_temptblename);  
    REP_conn.close();
  }
  //FUNCTION FOR LOGIN AND STARHUB DETAILS REPORT
  function REP_login(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
  {
    var REP_conn=eilib.db_GetConnection();
    var REP_stmt=REP_conn.createStatement();
    var REP_flextable_query="SELECT DISTINCT U.UNIT_NO,ULD.ULDTL_DOORCODE,ULD.ULDTL_WEBLOGIN,ULD.ULDTL_WEBPWD,EDSH.EDSH_SSID,EDSH.EDSH_PWD,USLD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ULD.ULDTL_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM UNIT_LOGIN_DETAILS ULD,UNIT U,USER_LOGIN_DETAILS USLD,EXPENSE_DETAIL_STARHUB EDSH WHERE USLD.ULD_ID=ULD.ULD_ID AND ULD.UNIT_ID=U.UNIT_ID AND U.UNIT_ID=EDSH.UNIT_ID ORDER BY U.UNIT_NO ASC";
    var REP_flex_rs=REP_stmt.executeQuery(REP_flextable_query);
    while (REP_flex_rs.next()) 
    {
      REP_count=1;
      var REP_unitno=REP_flex_rs.getString("UNIT_NO");
      var REP_doorcode=REP_flex_rs.getString("ULDTL_DOORCODE");
      var REP_weblogin=REP_flex_rs.getString("ULDTL_WEBLOGIN");
      var REP_webpwd=REP_flex_rs.getString("ULDTL_WEBPWD");
      var REP_ssid=REP_flex_rs.getString("EDSH_SSID");
      var REP_password=REP_flex_rs.getString("EDSH_PWD");
      var REP_userstamp=REP_flex_rs.getString("ULD_LOGINID");
      var REP_timestamp=REP_flex_rs.getString("TIMESTAMP");
      var REP_spreadsheetlist=REP_unitno+'^'+REP_doorcode+'^'+REP_weblogin+'^'+REP_webpwd+'^'+REP_ssid+'^'+REP_password+'^'+REP_userstamp+'^'+REP_timestamp;
      REP_search_spreadsheetarray.push(REP_spreadsheetlist) 
    }
    if(REP_count==1)
    {
      var REP_finaltable=REP_spreadsheetresult.concat(REP_search_spreadsheetarray);
      REP_finaltable.sort();
      var REP_unitnohead='UNIT NO';
      var REP_doorcodehead='DOOR CODE';
      var REP_webloginhead='WEB LOGIN';
      var REP_webpasswordhead='WEB PASSWORD';
      var REP_ssid='SSID';
      var REP_password='PWD';
      var REP_userstamphead='USERSTAMP';
      var REP_timestamphead='TIMESTAMP';
      REP_spreadsheetheader.push(REP_unitnohead+','+REP_doorcodehead+','+REP_webloginhead+','+REP_webpasswordhead+','+REP_ssid+','+REP_password+','+REP_userstamphead+','+REP_timestamphead)
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
        REP_Sheet.setFrozenRows(1);
        REP_Sheet.getRange(1, 1, 1, REP_Sheet.getLastColumn()).setBackground('#498af3').setFontColor('white').setFontSize(12).setFontFamily('BOLD');
      } 
      for(var i=0;i<REP_finaltable.length;i++)
      {
        var REP_counter=REP_Sheet.getLastRow()+1;
        var REP_value=REP_finaltable[i];
        var REP_valueset=REP_value.split('^');
        var REP_unitvalue="'"+REP_valueset[0];
        REP_Sheet.getRange(REP_counter,1).setValue(REP_unitvalue);
        if(REP_valueset[1]=='null')
        {
          REP_valueset[1]="";
        }
        REP_Sheet.setColumnWidth(1, 70);
        REP_Sheet.getRange(REP_counter,2).setValue(REP_valueset[1]);
        if(REP_valueset[2]=='null')
        {
          REP_valueset[2]="";
        }
        REP_Sheet.setColumnWidth(2, 100);
        REP_Sheet.getRange(REP_counter,3).setValue(REP_valueset[2]);
        if(REP_valueset[3]=='null')
        {
          REP_valueset[3]="";
        }
        REP_Sheet.setColumnWidth(3, 100);
        REP_Sheet.getRange(REP_counter,4).setValue(REP_valueset[3]);
        if(REP_valueset[4]=='null')
        {
          REP_valueset[4]="";
        }
        REP_Sheet.setColumnWidth(4, 130);
        REP_Sheet.getRange(REP_counter,5).setValue(REP_valueset[4]);
        if((REP_valueset[5]=='null')||(REP_valueset[5]=='undefined'))
        {
          REP_valueset[5]="";
        }
        REP_Sheet.setColumnWidth(5, 80);
        REP_Sheet.getRange(REP_counter,6).setValue(REP_valueset[5]);
        if(REP_valueset[6]=='null')
        {
          REP_valueset[6]="";
        }
        REP_Sheet.setColumnWidth(6, 80);
        REP_Sheet.getRange(REP_counter,7).setValue(REP_valueset[6]);
        REP_Sheet.setColumnWidth(7, 240);
        REP_Sheet.getRange(REP_counter,8).setValue(REP_valueset[7]);
        REP_Sheet.setColumnWidth(8, 120);
      }
    }
    REP_flex_rs.close();
    REP_stmt.close();
    REP_conn.close();
  }
  //FUNCTION FOR ACTIVE UNIT REPORT
  function REP_active(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
  {
    var REP_conn=eilib.db_GetConnection();
    var REP_stmt=REP_conn.createStatement();
    var REP_flextable_query="SELECT U.UNIT_NO,DATE_FORMAT(UD_START_DATE,'%d/%m/%Y') AS UD_START_DATE,DATE_FORMAT(UD_END_DATE,'%d/%m/%Y') AS UD_END_DATE FROM UNIT U,VW_ACTIVE_UNIT VAU,UNIT_DETAILS UD WHERE UD_OBSOLETE IS NULL AND U.UNIT_ID=UD.UNIT_ID AND VAU.UNIT_ID=U.UNIT_ID AND UD.UNIT_ID=VAU.UNIT_ID ORDER BY U.UNIT_NO";
    var REP_flex_rs=REP_stmt.executeQuery(REP_flextable_query);
    while (REP_flex_rs.next()) 
    {
      REP_count=1;
      var REP_unitno=REP_flex_rs.getString("UNIT_NO");
      var REP_startdate=REP_flex_rs.getString("UD_START_DATE");
      var REP_enddate=REP_flex_rs.getString("UD_END_DATE");
      var REP_spreadsheetlist=REP_unitno+'^'+REP_startdate+'^'+REP_enddate;
      REP_search_spreadsheetarray.push(REP_spreadsheetlist) 
    }
    if(REP_count==1)
    {
      var REP_finaltable=REP_spreadsheetresult.concat(REP_search_spreadsheetarray);
      REP_finaltable.sort();
      var REP_unitnohead='UNIT NO';
      var REP_startdatehead='START DATE';
      var REP_enddatehead='END DATE';
      REP_spreadsheetheader.push(REP_unitnohead+','+REP_startdatehead+','+REP_enddatehead)
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
        REP_Sheet.setFrozenRows(1);
        REP_Sheet.getRange(1, 1, 1, REP_Sheet.getLastColumn()).setBackground('#498af3').setFontColor('white').setFontSize(12).setFontFamily('BOLD');
      } 
      for(var i=0;i<REP_finaltable.length;i++)
      {
        var REP_counter=REP_Sheet.getLastRow()+1;
        var REP_value=REP_finaltable[i];
        var REP_valueset=REP_value.split('^');
        var REP_unitvalue="'"+REP_valueset[0];
        REP_Sheet.getRange(REP_counter,1).setValue(REP_unitvalue);
        if(REP_valueset[1]=='null')
        {
          REP_valueset[1]="";
        }
        REP_Sheet.setColumnWidth(1, 70);
        REP_Sheet.getRange(REP_counter,2).setValue(REP_valueset[1]).setHorizontalAlignment("right");
        if(REP_valueset[2]=='null')
        {
          REP_valueset[2]="";
        }
        REP_Sheet.setColumnWidth(2, 100);
        REP_Sheet.getRange(REP_counter,3).setValue(REP_valueset[2]).setHorizontalAlignment("right");
        if(REP_valueset[3]=='null')
        {
          REP_valueset[3]="";
        }
        REP_Sheet.setColumnWidth(3, 100);
      }
    }
    REP_flex_rs.close();
    REP_stmt.close();
    REP_conn.close();
  }
  //FUNCTION FOR CURRENT MONTH EXPIRY REPORT
  function REP_currentmonth(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
  {
    var REP_conn=eilib.db_GetConnection();
    var REP_stmt=REP_conn.createStatement();
    var REP_tempstmt=REP_conn.createStatement();
    var REP_spcurrentmonth=("CALL SP_CUSTOMER_CURRENT_MONTH_EXPIRY('"+UserStamp+"',@CUSTOMER_CURRENT_MONTH_EXPIRY)");
    REP_tempstmt.execute(REP_spcurrentmonth);   
    REP_tempstmt.close();
    var REP_stmt_temptble = REP_conn.createStatement();
    var REP_rs_temptble  = REP_stmt_temptble.executeQuery("SELECT @CUSTOMER_CURRENT_MONTH_EXPIRY");
    while(REP_rs_temptble.next()){   
      var REP_temptblename= REP_rs_temptble.getString("@CUSTOMER_CURRENT_MONTH_EXPIRY");
    }
    REP_rs_temptble.close();
    REP_stmt_temptble.close();
    var REP_stmt=REP_conn.createStatement();
    var REP_flextable_query="SELECT TCCME.CUSTOMERFIRSTNAME,TCCME.CUSTOMERLASTNAME,TCCME.LEASEPERIOD,TCCME.UNITNO,DATE_FORMAT(TCCME.STARTDATE,'%d/%m/%Y') AS STARTDATE,DATE_FORMAT(TCCME.ENDDATE,'%d/%m/%Y') AS ENDDATE,DATE_FORMAT(TCCME.PRETERMINATEDATE,'%d/%m/%Y') AS PRETERMINATEDATE,TCCME.ROOMTYPE,TCCME.EXTENSIONFLAG,TCCME.RECHECKINGFLAG,TCCME.PAYMENT,TCCME.DEPOSIT,TCCME.PROCESSINGFEE,TCCME.COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(TCCME.EXPIRY_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM "+REP_temptblename+" TCCME,USER_LOGIN_DETAILS ULD WHERE TCCME.ULD_ID=ULD.ULD_ID ORDER BY TCCME.UNITNO";
    var REP_flex_rs=REP_stmt.executeQuery(REP_flextable_query);
    while (REP_flex_rs.next()) 
    {
      REP_count=1;
      var REP_unitno=REP_flex_rs.getString("UNITNO");
      var REP_customerfirstname=REP_flex_rs.getString("CUSTOMERFIRSTNAME");
      var REP_customerlastname=REP_flex_rs.getString("CUSTOMERLASTNAME");
      var REP_customernameconcat=REP_customerfirstname+' '+REP_customerlastname
      var REP_startdate=REP_flex_rs.getString("STARTDATE");
      var REP_enddate=REP_flex_rs.getString("ENDDATE");
      var REP_recver=REP_flex_rs.getString("LEASEPERIOD");
      var REP_preterminatedate=REP_flex_rs.getString("PRETERMINATEDATE");
      var REP_roomtype=REP_flex_rs.getString("ROOMTYPE");
      var REP_extensionflag=REP_flex_rs.getString("EXTENSIONFLAG");
      var REP_recheckingflag=REP_flex_rs.getString("RECHECKINGFLAG");
      var REP_payment=REP_flex_rs.getString("PAYMENT");
      var REP_deposit=REP_flex_rs.getString("DEPOSIT");
      var REP_processingfee=REP_flex_rs.getString("PROCESSINGFEE");
      var REP_comments=REP_flex_rs.getString("COMMENTS");
      var REP_userstamp=REP_flex_rs.getString("ULD_LOGINID");
      var REP_expirytimestamp=REP_flex_rs.getString("TIMESTAMP");
      var REP_spreadsheetlist=REP_unitno+'^'+REP_customernameconcat+'^'+REP_startdate+'^'+REP_enddate+'^'+REP_recver+'^'+REP_preterminatedate+'^'+REP_roomtype+'^'+REP_extensionflag+'^'+REP_recheckingflag+'^'+REP_payment+'^'+REP_deposit+'^'+REP_processingfee+'^'+REP_comments+'^'+REP_userstamp+'^'+REP_expirytimestamp;
      REP_search_spreadsheetarray.push(REP_spreadsheetlist) 
    }
    if(REP_count==1)
    {
      var REP_finaltable=REP_spreadsheetresult.concat(REP_search_spreadsheetarray);
      REP_finaltable.sort();
      var REP_unitnohead='UNIT NO';
      var REP_customernamehead='CUSTOMER NAME';
      var REP_startdatehead='START DATE';
      var REP_recordversionhead='LEASE PERIOD';
      var REP_enddatehead='END DATE';
      var REP_preterminatedatehead='PRETERMINATE DATE';
      var REP_roomtypehead='ROOM TYPE';
      var REP_extensionflaghead='EXTENSION FLAG';
      var REP_recheckingflaghead='RECHECKING FLAG';
      var REP_paymenthead='PAYMENT';
      var REP_deposithead='DEPOSIT';
      var REP_processingfeehead='PROCESSING FEE';
      var REP_commentshead='COMMENTS';
      var REP_userstamphead='USERSTAMP';
      var REP_timestamphead='TIMESTAMP';
      REP_spreadsheetheader.push(REP_unitnohead+','+REP_customernamehead+','+REP_startdatehead+','+REP_enddatehead+','+REP_recordversionhead+','+REP_preterminatedatehead+','+REP_roomtypehead+','+REP_extensionflaghead+','+REP_recheckingflaghead+','+REP_paymenthead+','+REP_deposithead+','+REP_processingfeehead+','+REP_commentshead+','+REP_userstamphead+','+REP_timestamphead)
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
        REP_Sheet.getRange(REP_counter,14).setValue(REP_valueset[13]);
        REP_Sheet.getRange(REP_counter,15).setValue(REP_valueset[14]);
        REP_Sheet.setFrozenRows(1);
        REP_Sheet.getRange(1, 1, 1, REP_Sheet.getLastColumn()).setBackground('#498af3').setFontColor('white').setFontSize(12).setFontFamily('BOLD');
      } 
      for(var i=0;i<REP_finaltable.length;i++)
      {
        var REP_counter=REP_Sheet.getLastRow()+1;
        var REP_value=REP_finaltable[i];
        var REP_valueset=REP_value.split('^');
        var REP_unitvalue="'"+REP_valueset[0];
        REP_Sheet.getRange(REP_counter,1).setValue(REP_unitvalue);
        if(REP_valueset[1]=='null')
        {
          REP_valueset[1]="";
        }
        REP_Sheet.setColumnWidth(1, 70);
        REP_Sheet.getRange(REP_counter,2).setValue(REP_valueset[1]);
        if(REP_valueset[2]=='null')
        {
          REP_valueset[2]="";
        }
        REP_Sheet.setColumnWidth(2, 250);
        REP_Sheet.getRange(REP_counter,3).setValue(REP_valueset[2]).setHorizontalAlignment("right");
        if(REP_valueset[3]=='null')
        {
          REP_valueset[3]="";
        }
        REP_Sheet.setColumnWidth(3, 100);
        REP_Sheet.getRange(REP_counter,4).setValue(REP_valueset[3]).setHorizontalAlignment("right");
        if(REP_valueset[4]=='null')
        {
          REP_valueset[4]="";
        }
        REP_Sheet.setColumnWidth(4, 80);
        REP_Sheet.getRange(REP_counter,5).setValue(REP_valueset[4]);
        if(REP_valueset[5]=='null')
        {
          REP_valueset[5]="";
        }
        REP_Sheet.setColumnWidth(5, 120);
        REP_Sheet.getRange(REP_counter,6).setValue(REP_valueset[5]);
        if(REP_valueset[6]=='null')
        {
          REP_valueset[6]="";
        }
        REP_Sheet.setColumnWidth(6, 170);
        REP_Sheet.getRange(REP_counter,7).setValue(REP_valueset[6]);
        if(REP_valueset[7]=='null')
        {
          REP_valueset[7]="";
        }
        REP_Sheet.setColumnWidth(7, 110);
        REP_Sheet.getRange(REP_counter,8).setValue(REP_valueset[7]);
        if(REP_valueset[8]=='null')
        {
          REP_valueset[8]="";
        }
        REP_Sheet.setColumnWidth(8, 140);
        REP_Sheet.getRange(REP_counter,9).setValue(REP_valueset[8]);
        if(REP_valueset[9]=='null')
        {
          REP_valueset[9]="";
        }
        REP_Sheet.setColumnWidth(9, 160);
        REP_Sheet.getRange(REP_counter,10).setValue(REP_valueset[9]).setHorizontalAlignment("right");
        if(REP_valueset[10]=='null')
        {
          REP_valueset[10]="";
        }
        REP_Sheet.setColumnWidth(10, 80);
        REP_Sheet.getRange(REP_counter,11).setValue(REP_valueset[10]).setHorizontalAlignment("right");
        if(REP_valueset[11]=='null')
        {
          REP_valueset[11]="";
        }
        REP_Sheet.setColumnWidth(11, 80);
        REP_Sheet.getRange(REP_counter,12).setValue(REP_valueset[11]).setHorizontalAlignment("right");
        if(REP_valueset[12]=='null')
        {
          REP_valueset[12]="";
        }
        REP_Sheet.setColumnWidth(12, 140);
        REP_Sheet.getRange(REP_counter,13).setValue(REP_valueset[12]);
        if(REP_valueset[13]=='null')
        {
          REP_valueset[13]="";
        }
        REP_Sheet.setColumnWidth(13, 200);
        REP_Sheet.getRange(REP_counter,14).setValue(REP_valueset[13]);
        if(REP_valueset[14]=='null')
        {
          REP_valueset[14]="";
        }
        REP_Sheet.setColumnWidth(14, 240);
        REP_Sheet.getRange(REP_counter,15).setValue(REP_valueset[14]);
        if(REP_valueset[15]=='null')
        {
          REP_valueset[15]="";
        }
        REP_Sheet.setColumnWidth(15, 120);
      }
    }
    REP_flex_rs.close();
    REP_stmt.close();
    eilib.DropTempTable(REP_conn,REP_temptblename);    
    REP_conn.close();
  }
  //FUNCTION FOR NON ACTIVE UNIT REPORT
  function REP_nonactive(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
  {
    var REP_conn=eilib.db_GetConnection();
    var REP_stmt=REP_conn.createStatement();
    var REP_flextable_query="SELECT U.UNIT_NO,DATE_FORMAT(UD_START_DATE,'%d/%m/%Y') AS UD_START_DATE,DATE_FORMAT(UD_END_DATE,'%d/%m/%Y') AS UD_END_DATE FROM UNIT U,UNIT_DETAILS UD WHERE UD_OBSOLETE ='X' AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO";
    var REP_flex_rs=REP_stmt.executeQuery(REP_flextable_query);
    while (REP_flex_rs.next()) 
    {
      REP_count=1;
      var REP_unitno=REP_flex_rs.getString("UNIT_NO");
      var REP_startdate=REP_flex_rs.getString("UD_START_DATE");
      var REP_enddate=REP_flex_rs.getString("UD_END_DATE");
      var REP_spreadsheetlist=REP_unitno+'^'+REP_startdate+'^'+REP_enddate;
      REP_search_spreadsheetarray.push(REP_spreadsheetlist) 
    }
    if(REP_count==1)
    {
      var REP_finaltable=REP_spreadsheetresult.concat(REP_search_spreadsheetarray);
      REP_finaltable.sort();
      var REP_unitnohead='UNIT NO';
      var REP_startdatehead='START DATE';
      var REP_enddatehead='END DATE';
      REP_spreadsheetheader.push(REP_unitnohead+','+REP_startdatehead+','+REP_enddatehead)
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
        REP_Sheet.setFrozenRows(1);
        REP_Sheet.getRange(1, 1, 1, REP_Sheet.getLastColumn()).setBackground('#498af3').setFontColor('white').setFontSize(12).setFontFamily('BOLD');
      } 
      for(var i=0;i<REP_finaltable.length;i++)
      {
        var REP_counter=REP_Sheet.getLastRow()+1;
        var REP_value=REP_finaltable[i];
        var REP_valueset=REP_value.split('^');
        var REP_unitvalue="'"+REP_valueset[0];
        REP_Sheet.getRange(REP_counter,1).setValue(REP_unitvalue);
        if(REP_valueset[1]=='null')
        {
          REP_valueset[1]="";
        }
        REP_Sheet.setColumnWidth(1, 70);
        REP_Sheet.getRange(REP_counter,2).setValue(REP_valueset[1]).setHorizontalAlignment("right");
        if(REP_valueset[2]=='null')
        {
          REP_valueset[2]="";
        }
        REP_Sheet.setColumnWidth(2, 100);
        REP_Sheet.getRange(REP_counter,3).setValue(REP_valueset[2]).setHorizontalAlignment("right");
        if(REP_valueset[3]=='null')
        {
          REP_valueset[3]="";
        }
        REP_Sheet.setColumnWidth(3, 80);
      }
    }
    REP_flex_rs.close();
    REP_stmt.close();
    REP_conn.close();
  }
  //FUNCTION FOR UNIT INVENTORY CARD REPORT
  function REP_inventorycard(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
  {
    var REP_conn=eilib.db_GetConnection();
    var REP_stmt=REP_conn.createStatement();
    var REP_flextable_query="SELECT U.UNIT_NO,UASD.UASD_ACCESS_CARD FROM UNIT_ACCESS_STAMP_DETAILS UASD,UNIT U WHERE UASD.UASD_ACCESS_INVENTORY ='X' AND UASD.UASD_ACCESS_CARD IS NOT NULL AND UASD.UNIT_ID=U.UNIT_ID ORDER BY U.UNIT_NO ASC";
    var REP_flex_rs=REP_stmt.executeQuery(REP_flextable_query);
    while (REP_flex_rs.next()) 
    {
      REP_count=1;
      var REP_unitno=REP_flex_rs.getString("UNIT_NO");
      var REP_accesscard=REP_flex_rs.getString("UASD_ACCESS_CARD");
      var REP_spreadsheetlist=REP_unitno+'^'+REP_accesscard;
      REP_search_spreadsheetarray.push(REP_spreadsheetlist) 
    }
    if(REP_count==1)
    {
      var REP_finaltable=REP_spreadsheetresult.concat(REP_search_spreadsheetarray);
      REP_finaltable.sort();
      var REP_unitnohead='UNIT NO';
      var REP_accesscardhead='ACCESS CARD';
      REP_spreadsheetheader.push(REP_unitnohead+','+REP_accesscardhead)
      REP_Sheet.clear();
      var REP_spreadsheet_url=REP_newspread.getUrl();
      for(var i=0;i<REP_spreadsheetheader.length;i++)
      {
        var REP_counter=REP_Sheet.getLastRow()+1;
        var REP_value=REP_spreadsheetheader[i];
        var REP_valueset=REP_value.split(',');
        REP_Sheet.getRange(REP_counter,1).setValue(REP_valueset[0]);
        REP_Sheet.getRange(REP_counter,2).setValue(REP_valueset[1]);
        REP_Sheet.setFrozenRows(1);
        REP_Sheet.getRange(1, 1, 1, REP_Sheet.getLastColumn()).setBackground('#498af3').setFontColor('white').setFontSize(12).setFontFamily('BOLD');
      } 
      for(var i=0;i<REP_finaltable.length;i++)
      {
        var REP_counter=REP_Sheet.getLastRow()+1;
        var REP_value=REP_finaltable[i];
        var REP_valueset=REP_value.split('^');
        var REP_unitvalue="'"+REP_valueset[0];
        REP_Sheet.getRange(REP_counter,1).setValue(REP_unitvalue);
        if(REP_unitvalue[1]=='null')
        {
          REP_unitvalue[1]="";
        }
        REP_Sheet.setColumnWidth(1, 70);
        REP_Sheet.getRange(REP_counter,2).setValue(REP_valueset[1]);
        if(REP_valueset[2]=='null')
        {
          REP_valueset[2]="";
        }
        REP_Sheet.setColumnWidth(2, 110);
      } 
    }
    REP_flex_rs.close();
    REP_stmt.close();
    REP_conn.close();
  }
  //FUNCTION FOR UNIT DOORCODE REPORT
  function REP_doorcode(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
  {
    var REP_conn=eilib.db_GetConnection();
    var REP_stmt=REP_conn.createStatement();
    var REP_flextable_query="SELECT U.UNIT_NO,ULD.ULDTL_DOORCODE,ULD.ULDTL_WEBLOGIN,ULD.ULDTL_WEBPWD,USLD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ULD.ULDTL_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM UNIT_LOGIN_DETAILS ULD,UNIT U,USER_LOGIN_DETAILS USLD WHERE ULD.UNIT_ID=U.UNIT_ID AND USLD.ULD_ID=ULD.ULD_ID ORDER BY U.UNIT_NO ASC";
    var REP_flex_rs=REP_stmt.executeQuery(REP_flextable_query);
    while (REP_flex_rs.next()) 
    {
      REP_count=1;
      var REP_unitno=REP_flex_rs.getString("UNIT_NO");
      var REP_doorcode=REP_flex_rs.getString("ULDTL_DOORCODE");
      var REP_weblogin=REP_flex_rs.getString("ULDTL_WEBLOGIN");
      var REP_webpwd=REP_flex_rs.getString("ULDTL_WEBPWD");
      var REP_userstamp=REP_flex_rs.getString("ULD_LOGINID");
      var REP_timestamp=REP_flex_rs.getString("TIMESTAMP");
      var REP_spreadsheetlist=REP_unitno+'^'+REP_doorcode+'^'+REP_weblogin+'^'+REP_webpwd+'^'+REP_userstamp+'^'+REP_timestamp;
      REP_search_spreadsheetarray.push(REP_spreadsheetlist) 
    }
    if(REP_count==1)
    {
      var REP_finaltable=REP_spreadsheetresult.concat(REP_search_spreadsheetarray);
      REP_finaltable.sort();
      var REP_unitnohead='UNIT NO';
      var REP_doorcodehead='DOOR CODE';
      var REP_webloginhead='WEB LOGIN';
      var REP_webpasswordhead='WEB PASSWORD';
      var REP_userstamphead='USERSTAMP';
      var REP_timestamphead='TIMESTAMP';
      REP_spreadsheetheader.push(REP_unitnohead+','+REP_doorcodehead+','+REP_webloginhead+','+REP_webpasswordhead+','+REP_userstamphead+','+REP_timestamphead)
      if(REP_finaltable.length!=0)
      {
        REP_Sheet.clear();
        var REP_spreadsheet_url=REP_newspread.getUrl();
        var REP_ssid=REP_newspread.getId();
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
          REP_Sheet.setFrozenRows(1);
          REP_Sheet.getRange(1, 1, 1, REP_Sheet.getLastColumn()).setBackground('#498af3').setFontColor('white').setFontSize(12).setFontFamily('BOLD');
        }    
        for(var i=0;i<REP_finaltable.length;i++)
        {
          var REP_counter=REP_Sheet.getLastRow()+1;
          var REP_value=REP_finaltable[i];
          var REP_valueset=REP_value.split('^');
          var REP_unitvalue="'"+REP_valueset[0];
          REP_Sheet.getRange(REP_counter,1).setValue(REP_unitvalue);
          if(REP_valueset[1]=='null')
          {
            REP_valueset[1]="";
          }
          REP_Sheet.setColumnWidth(1, 70);
          REP_Sheet.getRange(REP_counter,2).setValue(REP_valueset[1]);
          if(REP_valueset[2]=='null')
          {
            REP_valueset[2]="";
          }
          REP_Sheet.setColumnWidth(2, 100);
          REP_Sheet.getRange(REP_counter,3).setValue(REP_valueset[2]);
          if(REP_valueset[3]=='null')
          {
            REP_valueset[3]="";
          }
          REP_Sheet.setColumnWidth(3, 100);
          REP_Sheet.getRange(REP_counter,4).setValue(REP_valueset[3]);
          if(REP_valueset[4]=='null')
          {
            REP_valueset[4]="";
          }
          REP_Sheet.setColumnWidth(4, 130);
          REP_Sheet.getRange(REP_counter,5).setValue(REP_valueset[4]);
          if(REP_valueset[5]=='null')
          {
            REP_valueset[5]="";
          }
          REP_Sheet.setColumnWidth(5, 240);
          REP_Sheet.getRange(REP_counter,6).setValue(REP_valueset[5]);
          if(REP_valueset[6]=='null')
          {
            REP_valueset[6]="";
          }
          REP_Sheet.setColumnWidth(6, 120);
        }
      }
    }
    REP_flex_rs.close();
    REP_stmt.close();
    REP_conn.close();
  }
  //FUNCTION FOR EXPENSE REPORT
  function REP_expense(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread,REP_dtepickmonth)
  {
    var REP_conn=eilib.db_GetConnection();
    var REP_stmt=REP_conn.createStatement();
    var REP_forperiod =eilib.GetForperiodDateFormat(REP_dtepickmonth,REP_dtepickmonth);
    var REP_startdate=REP_forperiod.frmdate;
    var  REP_enddate=REP_forperiod.todate;
    var REP_flextable_query="SELECT U.UNIT_NO,EC.ECN_DATA,CONCAT(C.CUSTOMER_FIRST_NAME,' ',C.CUSTOMER_LAST_NAME) AS NAME,DATE_FORMAT(EU.EU_INVOICE_DATE,'%d/%m/%Y') AS INVOICE,EU.EU_AMOUNT,EU.EU_INVOICE_ITEMS,EU.EU_INVOICE_FROM,EU.EU_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EU.EU_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP  FROM USER_LOGIN_DETAILS ULD,EXPENSE_UNIT AS EU JOIN VW_ACTIVE_UNIT U ON U.UNIT_ID=EU.UNIT_ID LEFT JOIN CUSTOMER C ON C.CUSTOMER_ID=EU.CUSTOMER_ID JOIN EXPENSE_CONFIGURATION EC ON EU.ECN_ID=EC.ECN_ID WHERE EU.ULD_ID=ULD.ULD_ID AND EU.EU_INVOICE_DATE BETWEEN '"+REP_startdate+"' AND '"+REP_enddate+"' ORDER BY U.UNIT_NO,EU.EU_INVOICE_DATE ASC";  
    var REP_flex_rs=REP_stmt.executeQuery(REP_flextable_query);
    while (REP_flex_rs.next()) 
    {
      REP_count=1;
      var REP_unitno=REP_flex_rs.getString("UNIT_NO");
      var REP_catagory=REP_flex_rs.getString("ECN_DATA");
      var REP_custname=REP_flex_rs.getString("NAME");
      var REP_invoicedate=REP_flex_rs.getString("INVOICE");
      var REP_invoiceamt=parseFloat(REP_flex_rs.getString("EU_AMOUNT")).toFixed(2);
      var REP_invoiceitems=REP_flex_rs.getString("EU_INVOICE_ITEMS");
      var REP_invoicefrom=REP_flex_rs.getString("EU_INVOICE_FROM");
      var REP_comments=REP_flex_rs.getString("EU_COMMENTS");
      var REP_userstamp=REP_flex_rs.getString("ULD_LOGINID");
      var REP_timestamp=REP_flex_rs.getString("TIMESTAMP");
      var REP_spreadsheetlist=REP_unitno+'^'+REP_catagory+'^'+REP_custname+'^'+REP_invoicedate+'^'+REP_invoiceamt+'^'+REP_invoiceitems+'^'+REP_invoicefrom+'^'+REP_comments+'^'+REP_userstamp+'^'+REP_timestamp;
      REP_search_spreadsheetarray.push(REP_spreadsheetlist) 
    }
    if(REP_count==1)
    {
      var REP_finaltable=REP_spreadsheetresult.concat(REP_search_spreadsheetarray);
      REP_finaltable.sort();
      var REP_unitnohead='UNIT NO';
      var REP_catagoryhead='CATEGORY';
      var REP_custnamehead='CUSTOMER NAME';
      var REP_invoicedatehead='INVOICE DATE';
      var REP_invoiceamounthead='INVOICE AMOUNT';
      var REP_invoiceitemshead='INVOICE ITEMS';
      var REP_invoicefromhead='INVOICE FROM';
      var REP_commentshead='COMMENTS';
      var REP_userstamphead='USERSTAMP';
      var REP_timestamphead='TIMESTAMP';
      REP_spreadsheetheader.push(REP_unitnohead+','+REP_catagoryhead+','+REP_custnamehead+','+REP_invoicedatehead+','+REP_invoiceamounthead+','+REP_invoiceitemshead+','+REP_invoicefromhead+','+REP_commentshead+','+REP_userstamphead+','+REP_timestamphead)
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
        REP_Sheet.setFrozenRows(1);
        REP_Sheet.getRange(1, 1, 1, REP_Sheet.getLastColumn()).setBackground('#498af3').setFontColor('white').setFontSize(12).setFontFamily('BOLD');
      } 
      for(var i=0;i<REP_finaltable.length;i++)
      {
        var REP_counter=REP_Sheet.getLastRow()+1;
        var REP_value=REP_finaltable[i];
        var REP_valueset=REP_value.split('^');
        var REP_unitvalue="'"+REP_valueset[0];
        REP_Sheet.getRange(REP_counter,1).setValue(REP_unitvalue);
        if(REP_valueset[1]=='null')
        {
          REP_valueset[1]="";
        }
        REP_Sheet.setColumnWidth(1, 70);
        REP_Sheet.getRange(REP_counter,2).setValue(REP_valueset[1]);
        if(REP_valueset[2]=='null')
        {
          REP_valueset[2]="";
        }
        REP_Sheet.setColumnWidth(2, 90);
        REP_Sheet.getRange(REP_counter,3).setValue(REP_valueset[2]);
        if(REP_valueset[3]=='null')
        {
          REP_valueset[3]="";
        }
        REP_Sheet.setColumnWidth(3, 230);
        REP_Sheet.getRange(REP_counter,4).setValue(REP_valueset[3]).setHorizontalAlignment("right");
        REP_Sheet.setColumnWidth(4, 120);
        var REP_unitamount="'"+REP_valueset[4];
        REP_Sheet.getRange(REP_counter,5).setValue(REP_unitamount).setHorizontalAlignment("right");
        REP_Sheet.setColumnWidth(5, 150);
        REP_Sheet.getRange(REP_counter,6).setValue(REP_valueset[5]);
        if(REP_valueset[6]=='null')
        {
          REP_valueset[6]="";
        }
        REP_Sheet.setColumnWidth(6, 300);
        REP_Sheet.getRange(REP_counter,7).setValue(REP_valueset[6]);
        if(REP_valueset[7]=='null')
        {
          REP_valueset[7]="";
        }
        REP_Sheet.setColumnWidth(7, 300);
        REP_Sheet.getRange(REP_counter,8).setValue(REP_valueset[7]);
        if(REP_valueset[8]=='null')
        {
          REP_valueset[8]="";
        }       
        REP_Sheet.setColumnWidth(8, 250);
        REP_Sheet.getRange(REP_counter,9).setValue(REP_valueset[8]);
        if(REP_valueset[9]=='null')
        {
          REP_valueset[9]="";
        }
        REP_Sheet.setColumnWidth(9, 240);
        REP_Sheet.getRange(REP_counter,10).setValue(REP_valueset[9]);
        if(REP_valueset[10]=='null')
        {
          REP_valueset[10]="";
        }
        REP_Sheet.setColumnWidth(10, 120);
      }
    }
    REP_flex_rs.close();
    REP_stmt.close();
    REP_conn.close();
  }
  //FUNCTION FOR NON ACTIVE UNTERMINATE UNIT REPORT
  function REP_nonactiveunterminateunit(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
  {
    var REP_conn=eilib.db_GetConnection();
    var REP_stmt=REP_conn.createStatement();
    var REP_flextable_query="SELECT U.UNIT_NO,DATE_FORMAT(UD.UD_START_DATE,'%d/%m/%Y') AS UD_START_DATE,DATE_FORMAT(UD.UD_END_DATE,'%d/%m/%Y') AS UD_END_DATE FROM UNIT U,UNIT_DETAILS UD WHERE UD.UD_END_DATE<CURDATE() AND UD.UD_OBSOLETE IS NULL AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO ASC"
    var REP_flex_rs=REP_stmt.executeQuery(REP_flextable_query);
    while (REP_flex_rs.next()) 
    {
      REP_count=1;
      var REP_unitno=REP_flex_rs.getString("UNIT_NO");
      var REP_startdate=REP_flex_rs.getString("UD_START_DATE");
      var REP_enddate=REP_flex_rs.getString("UD_END_DATE");
      var REP_spreadsheetlist=REP_unitno+'^'+REP_startdate+'^'+REP_enddate;
      REP_search_spreadsheetarray.push(REP_spreadsheetlist) 
    }
    if(REP_count==1)
    {
      var REP_finaltable=REP_spreadsheetresult.concat(REP_search_spreadsheetarray);
      REP_finaltable.sort();
      var REP_unitnohead='UNIT NO';
      var REP_startdatehead='START DATE';
      var REP_enddatehead='END DATE';
      REP_spreadsheetheader.push(REP_unitnohead+','+REP_startdatehead+','+REP_enddatehead)
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
        REP_Sheet.setFrozenRows(1);
        REP_Sheet.getRange(1, 1, 1, REP_Sheet.getLastColumn()).setBackground('#498af3').setFontColor('white').setFontSize(12).setFontFamily('BOLD');
      } 
      for(var i=0;i<REP_finaltable.length;i++)
      {
        var REP_counter=REP_Sheet.getLastRow()+1;
        var REP_value=REP_finaltable[i];
        var REP_valueset=REP_value.split('^');
        var REP_unitvalue="'"+REP_valueset[0];
        REP_Sheet.getRange(REP_counter,1).setValue(REP_unitvalue);
        if(REP_valueset[1]=='null')
        {
          REP_valueset[1]="";
        }
        REP_Sheet.setColumnWidth(1, 70);
        REP_Sheet.getRange(REP_counter,2).setValue(REP_valueset[1]).setHorizontalAlignment("right");
        if(REP_valueset[2]=='null')
        {
          REP_valueset[2]="";
        }
        REP_Sheet.setColumnWidth(2, 100);
        REP_Sheet.getRange(REP_counter,3).setValue(REP_valueset[2]).setHorizontalAlignment("right");
        if(REP_valueset[3]=='null')
        {
          REP_valueset[3]="";
        }
        REP_Sheet.setColumnWidth(3, 80);
      }
    }
    REP_flex_rs.close();
    REP_stmt.close();
    REP_conn.close();
  }
  //FUNCTION FOR CUSTOMER DETAILS REPORT
  function REP_customerdetails(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
  {
    var REP_conn=eilib.db_GetConnection();
    var REP_stmt=REP_conn.createStatement();
    var REP_tempstmt=REP_conn.createStatement();
    var REP_spallcustomerdetails=("CALL SP_ALL_CUSTOMER_SEARCH_TEMP_FEE_DETAIL('"+UserStamp+"',@CUSTOMER_SEARCH_FEE_TEMPTBLNAME)");
    REP_tempstmt.execute(REP_spallcustomerdetails);   
    REP_tempstmt.close();
    var REP_stmt_temptble = REP_conn.createStatement();
    var REP_rs_temptble  = REP_stmt_temptble.executeQuery("SELECT @CUSTOMER_SEARCH_FEE_TEMPTBLNAME");
    while(REP_rs_temptble.next()){   
      var REP_temptblename= REP_rs_temptble.getString("@CUSTOMER_SEARCH_FEE_TEMPTBLNAME");
    }
    REP_rs_temptble.close();
    REP_stmt_temptble.close();
    var REP_stmt=REP_conn.createStatement();
    var REP_flextable_query="SELECT DISTINCT U.UNIT_NO,CONCAT(C.CUSTOMER_FIRST_NAME,' ',C.CUSTOMER_LAST_NAME) AS CUSTNAME,CED.CED_REC_VER,CED.CED_LEASE_PERIOD,CED.CED_RECHECKIN,CED.CED_EXTENSION,CED.CED_PRORATED,CED.CED_PROCESSING_WAIVED,CED.CED_PRETERMINATE,DATE_FORMAT(CED.CED_NOTICE_START_DATE,'%d/%m/%Y') AS NOTICESTARTDATE,DATE_FORMAT(CED.CED_CANCEL_DATE,'%d/%m/%Y') AS CANCELDATE,CF.CC_DEPOSIT,CF.CC_ELECTRICITY_CAP,CF.CC_PAYMENT_AMOUNT,CF.CC_AIRCON_FIXED_FEE,CF.CC_AIRCON_QUARTERLY_FEE,CF.CC_DRYCLEAN_FEE,CF.CC_PROCESSING_FEE,CF.CC_CHECKOUT_CLEANING_FEE,DATE_FORMAT(CTD.CLP_STARTDATE,'%d/%m/%Y') AS STARTDATE,DATE_FORMAT(CTD.CLP_ENDDATE,'%d/%m/%Y') AS ENDDATE,CTD.CLP_TERMINATE,DATE_FORMAT(CTD.CLP_PRETERMINATE_DATE,'%d/%m/%Y') AS PRETERMINATEDATE,CTD.CLP_GUEST_CARD,UASD.UASD_ACCESS_CARD,DATE_FORMAT(CPD.CPD_PASSPORT_DATE,'%d/%m/%Y') AS PASSPORTDATE,DATE_FORMAT(CPD.CPD_EP_DATE,'%d/%m/%Y') AS EPDATE,DATE_FORMAT(CPD.CPD_DOB,'%d/%m/%Y') AS DOB,CPD.CPD_COMMENTS FROM  CUSTOMER_ENTRY_DETAILS CED LEFT JOIN CUSTOMER_COMPANY_DETAILS CCD on CED.CUSTOMER_ID=CCD.CUSTOMER_ID left join CUSTOMER_LP_DETAILS CTD on CED.CUSTOMER_ID=CTD.CUSTOMER_ID left join CUSTOMER_ACCESS_CARD_DETAILS CACD on CED.CUSTOMER_ID=CACD.CUSTOMER_ID and (CTD.UASD_ID=CACD.UASD_ID)left join UNIT_ACCESS_STAMP_DETAILS UASD on  (UASD.UASD_ID=CACD.UASD_ID) left join "+REP_temptblename+" CF on  CED.CUSTOMER_ID=CF.CUSTOMER_ID left join CUSTOMER C on CED.CUSTOMER_ID=C.CUSTOMER_ID left join  CUSTOMER_PERSONAL_DETAILS CPD on CED.CUSTOMER_ID=CPD.CUSTOMER_ID ,NATIONALITY_CONFIGURATION NC ,UNIT U,USER_LOGIN_DETAILS ULD  where  (CED.UNIT_ID=U.UNIT_ID) and(CPD.NC_ID=NC.NC_ID) and  (CED.CED_REC_VER=CF.CUSTOMER_VER) AND CED.CED_REC_VER=CTD.CED_REC_VER AND ULD.ULD_ID=CTD.ULD_ID AND ULD.ULD_ID=CTD.ULD_ID order by U.UNIT_NO,CUSTNAME,CED.CED_REC_VER ASC";
    var REP_flex_rs=REP_stmt.executeQuery(REP_flextable_query);
    while (REP_flex_rs.next()) 
    {
      REP_count=1;
      var REP_unitno=REP_flex_rs.getString("UNIT_NO");
      var REP_custname=REP_flex_rs.getString("CUSTNAME");
      var REP_strtdte=REP_flex_rs.getString("STARTDATE");
      var REP_enddte=REP_flex_rs.getString("ENDDATE");
      var REP_recver=REP_flex_rs.getString("CED_REC_VER");
      var REP_leaseperiod=REP_flex_rs.getString("CED_LEASE_PERIOD");
      var REP_accesscrd=REP_flex_rs.getString("UASD_ACCESS_CARD");
      var REP_gustcrd=REP_flex_rs.getString("CLP_GUEST_CARD");
      var REP_terminate=REP_flex_rs.getString("CLP_TERMINATE");
      var REP_preterminate=REP_flex_rs.getString("CED_PRETERMINATE");
      var REP_extension=REP_flex_rs.getString("CED_EXTENSION");
      var REP_recheckin=REP_flex_rs.getString("CED_RECHECKIN");
      var REP_prorated=REP_flex_rs.getString("CED_PRORATED");
      var REP_processingwaived=REP_flex_rs.getString("CED_PROCESSING_WAIVED");
      var REP_preterminatedte=REP_flex_rs.getString("PRETERMINATEDATE");
      var REP_noticesrtdte=REP_flex_rs.getString("NOTICESTARTDATE");
      var REP_canceldate=REP_flex_rs.getString("CANCELDATE");
      var REP_deposit=REP_flex_rs.getString("CC_DEPOSIT");
      var REP_electricitycap=REP_flex_rs.getString("CC_ELECTRICITY_CAP");
      var REP_paymentamt=REP_flex_rs.getString("CC_PAYMENT_AMOUNT");
      var REP_airconfxdfee=REP_flex_rs.getString("CC_AIRCON_FIXED_FEE");
      var REP_airconquartelyfee=REP_flex_rs.getString("CC_AIRCON_QUARTERLY_FEE");
      var REP_drycleanfee=REP_flex_rs.getString("CC_DRYCLEAN_FEE");
      var REP_processingfee=REP_flex_rs.getString("CC_PROCESSING_FEE");
      var REP_checkoutcleaningfee=REP_flex_rs.getString("CC_CHECKOUT_CLEANING_FEE");
      var REP_dob=REP_flex_rs.getString("DOB");
      var REP_pasprtdte=REP_flex_rs.getString("PASSPORTDATE");
      var REP_epdte=REP_flex_rs.getString("EPDATE");
      var REP_comments=REP_flex_rs.getString("CPD_COMMENTS");
      var REP_spreadsheetlist=REP_unitno+'^'+REP_custname+'^'+REP_strtdte+'^'+REP_enddte+'^'+REP_recver+'^'+REP_leaseperiod+'^'+REP_accesscrd+'^'+REP_gustcrd+'^'+REP_terminate+'^'+REP_preterminate+'^'+REP_extension+'^'+REP_recheckin+'^'+REP_prorated+'^'+REP_processingwaived+'^'+REP_preterminatedte+'^'+REP_noticesrtdte+'^'+REP_canceldate+'^'+REP_deposit+'^'+REP_electricitycap+'^'+REP_paymentamt+'^'+REP_airconfxdfee+'^'+REP_airconquartelyfee+'^'+REP_drycleanfee+'^'+REP_processingfee+'^'+REP_checkoutcleaningfee+'^'+REP_dob+'^'+REP_pasprtdte+'^'+REP_epdte+'^'+REP_comments;
      REP_search_spreadsheetarray.push(REP_spreadsheetlist) 
    }
    if(REP_count==1)
    {
      var REP_finaltable=REP_spreadsheetresult.concat(REP_search_spreadsheetarray);
      REP_finaltable.sort();
      var REP_unitnohead='UNIT NO';
      var REP_custnamehead='CUSTOMER NAME';
      var REP_strdtehead='STARTDATE';
      var REP_enddtehead='ENDDATE';
      var REP_recverhead='REC VER';
      var REP_leaseperiodhead='LEASE PERIOD';
      var REP_accesscrdhead='ACCESS CARD';
      var REP_guestcrdhead='GUEST CARD';
      var REP_terminatehead='TERMINATE';
      var REP_preterminatehead='PRETERMINATE';
      var REP_extensionhead='EXTENSION';
      var REP_recheckinhead='RECHECKIN';
      var REP_proratedhead='PRORATED';
      var REP_processingwaivedhead='PROCESSING WAIVED';
      var REP_preterminatedtehead='PRETERMINATE DATE';
      var REP_noticestrtdtehead='NOTICESTARTDATE';
      var REP_canceldtehead='CANCEL DATE';
      var REP_deposithead='DEPOSIT';
      var REP_electricitycaphead='ELECTRICITY CAP';
      var REP_paymentamthead='PAYMENT AMOUNT';
      var REP_aircnfxdfeehead='AIRCON FIXED FEE';
      var REP_aircnqrtlyfeehead='AIRCON QUARTERLY FEE';
      var REP_drycleanfeehead='DRY CLEAN FEE';
      var REP_processingfeehead='PROCESSING FEE';
      var REP_chckoutfeehead='CHECKOUT CLEANING FEE';
      var REP_dobhead='DATE OF BIRTH';
      var REP_passportdtehead='PASSPORT DATE';
      var REP_epdtehead='EP DATE';
      var REP_commentshead='COMMENTS';
      REP_spreadsheetheader.push(REP_unitnohead+','+REP_custnamehead+','+REP_strdtehead+','+REP_enddtehead+','+REP_recverhead+','+REP_leaseperiodhead+','+REP_accesscrdhead+','+REP_guestcrdhead+','+REP_terminatehead+','+REP_preterminatehead+','+REP_extensionhead+','+REP_recheckinhead+','+REP_proratedhead+','+REP_processingwaivedhead+','+REP_preterminatedtehead+','+REP_noticestrtdtehead+','+REP_canceldtehead+','+REP_deposithead+','+REP_electricitycaphead+','+REP_paymentamthead+','+REP_aircnfxdfeehead+','+REP_aircnqrtlyfeehead+','+REP_drycleanfeehead+','+REP_processingfeehead+','+REP_chckoutfeehead+','+REP_dobhead+','+REP_passportdtehead+','+REP_epdtehead+','+REP_commentshead)
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
        REP_Sheet.getRange(REP_counter,14).setValue(REP_valueset[13]);
        REP_Sheet.getRange(REP_counter,15).setValue(REP_valueset[14]);
        REP_Sheet.getRange(REP_counter,16).setValue(REP_valueset[15]);
        REP_Sheet.getRange(REP_counter,17).setValue(REP_valueset[16]);
        REP_Sheet.getRange(REP_counter,18).setValue(REP_valueset[17]);
        REP_Sheet.getRange(REP_counter,19).setValue(REP_valueset[18]);
        REP_Sheet.getRange(REP_counter,20).setValue(REP_valueset[19]);
        REP_Sheet.getRange(REP_counter,21).setValue(REP_valueset[20]);
        REP_Sheet.getRange(REP_counter,22).setValue(REP_valueset[21]);
        REP_Sheet.getRange(REP_counter,23).setValue(REP_valueset[22]);
        REP_Sheet.getRange(REP_counter,24).setValue(REP_valueset[23]);
        REP_Sheet.getRange(REP_counter,25).setValue(REP_valueset[24]);
        REP_Sheet.getRange(REP_counter,26).setValue(REP_valueset[25]);
        REP_Sheet.getRange(REP_counter,27).setValue(REP_valueset[26]);
        REP_Sheet.getRange(REP_counter,28).setValue(REP_valueset[27]);
        REP_Sheet.getRange(REP_counter,29).setValue(REP_valueset[28]);
        REP_Sheet.setFrozenRows(1);
        REP_Sheet.getRange(1, 1, 1, REP_Sheet.getLastColumn()).setBackground('#498af3').setFontColor('white').setFontSize(12).setFontFamily('BOLD');
      } 
      for(var i=0;i<REP_finaltable.length;i++)
      {
        var REP_counter=REP_Sheet.getLastRow()+1;
        var REP_value=REP_finaltable[i];
        var REP_valueset=REP_value.split('^');
        var REP_unitvalue="'"+REP_valueset[0];
        REP_Sheet.getRange(REP_counter,1).setValue(REP_unitvalue);
        if(REP_valueset[1]=='null')
        {
          REP_valueset[1]="";
        }
        REP_Sheet.setColumnWidth(1, 70);
        REP_Sheet.getRange(REP_counter,2).setValue(REP_valueset[1]);
        if(REP_valueset[2]=='null')
        {
          REP_valueset[2]="";
        }
        REP_Sheet.setColumnWidth(2, 240);
        REP_Sheet.getRange(REP_counter,3).setValue(REP_valueset[2]).setHorizontalAlignment("right");
        if(REP_valueset[3]=='null')
        {
          REP_valueset[3]="";
        }
        REP_Sheet.setColumnWidth(3, 100);
        REP_Sheet.getRange(REP_counter,4).setValue(REP_valueset[3]).setHorizontalAlignment("right");
        if(REP_valueset[4]=='null')
        {
          REP_valueset[4]="";
        }
        REP_Sheet.setColumnWidth(4, 80);
        REP_Sheet.getRange(REP_counter,5).setValue(REP_valueset[4]);
        if(REP_valueset[5]=='null')
        {
          REP_valueset[5]="";
        }
        REP_Sheet.setColumnWidth(5, 70);
        REP_Sheet.getRange(REP_counter,6).setValue(REP_valueset[5]);
        if(REP_valueset[6]=='null')
        {
          REP_valueset[6]="";
        }
        REP_Sheet.setColumnWidth(6, 120);
        REP_Sheet.getRange(REP_counter,7).setValue(REP_valueset[6]);
        if(REP_valueset[7]=='null')
        {
          REP_valueset[7]="";
        }
        REP_Sheet.setColumnWidth(7, 120);
        REP_Sheet.getRange(REP_counter,8).setValue(REP_valueset[7]);
        if(REP_valueset[8]=='null')
        {
          REP_valueset[8]="";
        }        
        REP_Sheet.setColumnWidth(8, 110);
        REP_Sheet.getRange(REP_counter,9).setValue(REP_valueset[8]);
        if(REP_valueset[9]=='null')
        {
          REP_valueset[9]="";
        }
        REP_Sheet.setColumnWidth(9, 100);
        REP_Sheet.getRange(REP_counter,10).setValue(REP_valueset[9]);
        if(REP_valueset[10]=='null')
        {
          REP_valueset[10]="";
        }
        REP_Sheet.setColumnWidth(10, 130);
        REP_Sheet.getRange(REP_counter,11).setValue(REP_valueset[10]);
        if(REP_valueset[11]=='null')
        {
          REP_valueset[11]="";
        }
        REP_Sheet.setColumnWidth(11, 100);
        REP_Sheet.getRange(REP_counter,12).setValue(REP_valueset[11]);
        if(REP_valueset[12]=='null')
        {
          REP_valueset[12]="";
        }
        REP_Sheet.setColumnWidth(12, 100);
        REP_Sheet.getRange(REP_counter,13).setValue(REP_valueset[12]);
        if(REP_valueset[13]=='null')
        {
          REP_valueset[13]="";
        }
        REP_Sheet.setColumnWidth(13, 100);
        REP_Sheet.getRange(REP_counter,14).setValue(REP_valueset[13]);
        if(REP_valueset[14]=='null')
        {
          REP_valueset[14]="";
        }
        REP_Sheet.setColumnWidth(14, 170);
        REP_Sheet.getRange(REP_counter,15).setValue(REP_valueset[14]).setHorizontalAlignment("right");
        if(REP_valueset[15]=='null')
        {
          REP_valueset[15]="";
        }
        REP_Sheet.setColumnWidth(15, 180);
        REP_Sheet.getRange(REP_counter,16).setValue(REP_valueset[15]).setHorizontalAlignment("right");
        if(REP_valueset[16]=='null')
        {
          REP_valueset[16]="";
        }
        REP_Sheet.setColumnWidth(16, 160);
        REP_Sheet.getRange(REP_counter,17).setValue(REP_valueset[16]).setHorizontalAlignment("right");
        if(REP_valueset[17]=='null')
        {
          REP_valueset[17]="";
        }
        REP_Sheet.setColumnWidth(17, 120);
        REP_Sheet.getRange(REP_counter,18).setValue(REP_valueset[17]);
        if(REP_valueset[18]=='null')
        {
          REP_valueset[18]="";
        }
        REP_Sheet.setColumnWidth(18, 70);
        REP_Sheet.getRange(REP_counter,19).setValue(REP_valueset[18]);
        if(REP_valueset[19]=='null')
        {
          REP_valueset[19]="";
        }
        REP_Sheet.setColumnWidth(19, 150);
        REP_Sheet.getRange(REP_counter,20).setValue(REP_valueset[19]);
        if(REP_valueset[20]=='null')
        {
          REP_valueset[20]="";
        }
        REP_Sheet.setColumnWidth(20, 160);
        REP_Sheet.getRange(REP_counter,21).setValue(REP_valueset[20]);
        if(REP_valueset[21]=='null')
        {
          REP_valueset[21]="";
        }
        REP_Sheet.setColumnWidth(21, 160);
        REP_Sheet.getRange(REP_counter,22).setValue(REP_valueset[21]);
        if(REP_valueset[22]=='null')
        {
          REP_valueset[22]="";
        }
        REP_Sheet.setColumnWidth(22, 200);
        REP_Sheet.getRange(REP_counter,23).setValue(REP_valueset[22]);
        if(REP_valueset[23]=='null')
        {
          REP_valueset[23]="";
        }
        REP_Sheet.setColumnWidth(23, 150);
        REP_Sheet.getRange(REP_counter,24).setValue(REP_valueset[23]);
        if(REP_valueset[24]=='null')
        {
          REP_valueset[24]="";
        }
        REP_Sheet.setColumnWidth(24, 140);
        REP_Sheet.getRange(REP_counter,25).setValue(REP_valueset[24]);
        if(REP_valueset[25]=='null')
        {
          REP_valueset[25]="";
        }
        REP_Sheet.setColumnWidth(25, 210);
        REP_Sheet.getRange(REP_counter,26).setValue(REP_valueset[25]);
        if(REP_valueset[26]=='null')
        {
          REP_valueset[26]="";
        }
        REP_Sheet.setColumnWidth(26, 130);
        REP_Sheet.getRange(REP_counter,27).setValue(REP_valueset[26]).setHorizontalAlignment("right");
        if(REP_valueset[27]=='null')
        {
          REP_valueset[27]="";
        }
        REP_Sheet.setColumnWidth(27, 130);
        REP_Sheet.getRange(REP_counter,28).setValue(REP_valueset[27]).setHorizontalAlignment("right");
        if(REP_valueset[28]=='null')
        {
          REP_valueset[28]="";
        }
        REP_Sheet.setColumnWidth(28, 80);
        REP_Sheet.getRange(REP_counter,29).setValue(REP_valueset[28]);
        if(REP_valueset[29]=='null')
        {
          REP_valueset[29]="";
        }
        REP_Sheet.setColumnWidth(29, 240);
      }
    }
    REP_flex_rs.close();
    REP_stmt.close();
    eilib.DropTempTable(REP_conn,REP_temptblename);  
    REP_conn.close();
  }
  //FUNCTION FOR ERM LEEDS REPORT
  function REP_ermleeds(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread,REP_utstrdte,REP_utenddte)
  {
    var REP_conn=eilib.db_GetConnection();
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
        REP_Sheet.setColumnWidth(1, 240);
        REP_Sheet.getRange(REP_counter,2).setValue(REP_valueset[1]).setHorizontalAlignment("right");
        if(REP_valueset[2]=='null')
        {
          REP_valueset[2]="";
        }
        REP_Sheet.setColumnWidth(2, 50);
        
        REP_Sheet.getRange(REP_counter,3).setValue(REP_valueset[2]).setHorizontalAlignment("right");
        if(REP_valueset[3]=='null')
        {
          REP_valueset[3]="";
        }
        REP_Sheet.setColumnWidth(3, 120);
        REP_Sheet.getRange(REP_counter,4).setValue(REP_valueset[3]);
        if(REP_valueset[4]=='null')
        {
          REP_valueset[4]="";
        }
        REP_Sheet.setColumnWidth(4, 130);
        REP_Sheet.getRange(REP_counter,5).setValue(REP_valueset[4]);
        if(REP_valueset[5]=='null')
        {
          REP_valueset[5]="";
        } 
        REP_Sheet.setColumnWidth(5, 120);
        REP_Sheet.getRange(REP_counter,6).setValue(REP_valueset[5]);
        if(REP_valueset[6]=='null')
        {
          REP_valueset[6]="";
        } 
        REP_Sheet.setColumnWidth(6, 110);
        REP_Sheet.getRange(REP_counter,7).setValue(REP_valueset[6]);
        if(REP_valueset[7]=='null')
        {
          REP_valueset[7]="";
        } 
        REP_Sheet.setColumnWidth(7, 120);
        REP_Sheet.getRange(REP_counter,8).setValue(REP_valueset[7]);
        if(REP_valueset[8]=='null')
        {
          REP_valueset[8]="";
        }
        REP_Sheet.setColumnWidth(8, 40);
        REP_Sheet.getRange(REP_counter,9).setValue(REP_valueset[8]);
        if(REP_valueset[9]=='null')
        {
          REP_valueset[9]="";
        } 
        REP_Sheet.setColumnWidth(9, 120);
        REP_Sheet.getRange(REP_counter,10).setValue(REP_valueset[9]);
        if(REP_valueset[10]=='null')
        {
          REP_valueset[10]="";
        }
        REP_Sheet.setColumnWidth(10, 240);
        REP_Sheet.getRange(REP_counter,11).setValue(REP_valueset[10]);
        if(REP_valueset[11]=='null')
        {
          REP_valueset[11]="";
        }
        REP_Sheet.setColumnWidth(11, 240);
        REP_Sheet.getRange(REP_counter,12).setValue(REP_valueset[11]);
        if(REP_valueset[12]=='null')
        {
          REP_valueset[12]="";
        }
        REP_Sheet.setColumnWidth(12, 240);
        REP_Sheet.getRange(REP_counter,13).setValue(REP_valueset[12]);
        if(REP_valueset[13]=='null')
        {
          REP_valueset[13]="";
        }
        REP_Sheet.setColumnWidth(13, 120);
      }
    }
    REP_flex_rs.close();
    REP_stmt.close();
    REP_conn.close();
  }
}
catch(err)
{
}
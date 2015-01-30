//*******************************************FILE DESCRIPTION*********************************************
//*******************************************DEPOSIT DEDUCTION EXTRACTS********************************************
//DONE BY PUNI
//VER 1.8  -SD:07/10/2014 ED:07/10/2014;TRACKER NO: 517//Corrected script for preloader,msgbox position
//DONE BY SARADAMBAL M
//VER 1.7  -SD:18/09/2014 ED:18/09/2014;TRACKER NO: 517//implemented script for preloader,msgbox,implemented script for style to submit button instead of div -style
//VER 1.6- SD:14/08/2014 ED:14/08/2014,TRACKER NO: 517//updated new links
//VER 1.5 -SD:08/07/2014 ED:10/07/2014;TRACKER NO: 517//updated err msg ,if any sheet err,removed hypen for duplicate customer,sorted lp expcept for group LP,hide cb for single lp
//VER 1.4 -SD:27/06/2014 ED:30/06/2014;TRACKER NO: 517//use single sheet for extraction,implemented script for wrap the text for rent row,removed script for getting sending email sheet
//VER 1.3 -SD:25/06/2014 ED:25/06/2014;TRACKER NO: 517//implemented err msg ,if no permission to access SS
//VER 1.2 -SD:14/06/2014 ED:14/06/2014;TRACKER NO: 517//updated failure function
//VER 1.1 -SD:07/06/2014 ED:07/06/2014;TRACKER NO: 517//updated new drive link,cleared issue while getting getrange,updated err msg
//VER 1.0 -SD:19/05/2014 ED:20/05/2014;TRACKER NO: 517//put docslist and driveapp ,now comment the driveapp,put radio btn for customer name with id and without id.put err msg for sheet not available to extract
//VER 0.09 -SD:17/04/2014 ED:20/04/2014;TRACKER NO: 517//put radio button for duplicate customer
//VER 0.08 -SD:28/03/2014 ED:28/03/2014;TRACKER NO: 517//cleared issue for userproperty and getproperty,changed sheetname,implemented folderid instead of getting ss id
//DONE BY:ELANGO S
//<!---  VER 0.07 -SD:28/01/2014 ED:29/01/2014;TRACKER NO: 517 //GETTING THE ERROR MESSAGE GETTING FROM THE  EILIB FUNCTION.
//<!---  VER 0.06 -SD:02/01/2014 ED:03/01/2014;TRACKER NO: 517 //CHANGE THE EILIB CONNECTION
//<!---  VER 0.05 -SD:26/12/2013 ED:26/12/2013;TRACKER NO: 517 //CHANGE THE HEADING TAG AND UNIQUE FUNCTION INSTEAD OD ARRAYLIB//
//<!---  VER 0.04 -SD:13/12/2013 ED:13/12/2013;TRACKER NO: 517 //CHANGE AS DOCLIST TO DRIVE APP IN THIS  SCRIPT//
//<!---  VER 0.03 -SD:13/12/2013 ED:13/12/2013;TRACKER NO: 517 //CHANGE THE SCRIPT NAME//
//<!---  VER 0.02 -SD:13/12/2013 ED:13/12/2013;TRACKER NO: 517 //REMOVE THE UNWANTED COMMENT LINES// 
//<!---  VER 0.01 - INITIAL VERSION-SD:20/8/2013 ED:4/12/2013;TRACKER NO: 517
//**********************************************************************************************************/
try
{
  //GET THE SHEET AND MONTH PRESENT IN THE SELECTED  SHEET  NAME.............
  function DDE_getmonth()
  {
    var DDE_conn=eilib.db_GetConnection();
    var DDE_stmt = DDE_conn.createStatement();
    var DDE_errorarray=[];
    var DDE_select_err_msg="263,264,265,266,267,268,269,270,271,282,381,449,452,459,468";
    DDE_errorarray=eilib.GetErrorMessageList(DDE_conn,DDE_select_err_msg);
    var srtemailarray =eilib.getProfileEmailId(DDE_conn,'DD');
    var DDE_month_array =[];
    var DDE_month_exequery ="SELECT DDC_DATA FROM DEPOSIT_DEDUCTION_CONFIGURATION WHERE CGN_ID=30";
    var DDE_errormsg_rs = DDE_stmt.executeQuery(DDE_month_exequery);
    if(DDE_errormsg_rs.next())
    {
      var  DDE_folderid=DDE_errormsg_rs.getString("DDC_DATA");
    }
    DDE_errormsg_rs.close();
    var DDE_currentdateyear=Utilities.formatDate(new Date(), TimeZone, 'MMMM-yyy').split('-')[1];
    var DDE_currentmonth=Utilities.formatDate(new Date(), TimeZone, 'MMMM-yyy').split('-')[0];
    var DDE_ssname_currentyear='EI_DEPOSIT_DEDUCTIONS_'+DDE_currentdateyear;
    var DDE_getfiles = DriveApp.getFolderById(DDE_folderid).getFiles();
    var DDE_flag_ss=0;
    while(DDE_getfiles.hasNext())
    {
      var DDE_oldfile=DDE_getfiles.next();
      var DDE_oldfile_id= DDE_oldfile.getId();//DriveApp.getFilesByName(DDE_oldfile).next().getId();
      if(DDE_oldfile==DDE_ssname_currentyear)
      {
        var DDE_currentfile_id=DDE_oldfile_id;
        DDE_flag_ss=1;
      }    
    } 
    if(DDE_flag_ss==0){
      return {'DDE_flag_noss':'DDE_flag_noss','DDE_errorAarray':DDE_errorarray.errormsg};
    }
    PropertiesService.getUserProperties().setProperty('shturl',DDE_currentfile_id);
    var ss = SpreadsheetApp.openById(DDE_currentfile_id);
    var deductionsheets = ss.getSheets();
    var sheetarray =[];
    for (var i in deductionsheets)
    {
      var sheetname =  deductionsheets[i].getSheetName();
      if(sheetname=='TEMPLATE' || sheetname =='PAYMENT HISTORY' || sheetname == 'SENDING EMAIL')continue;
      sheetarray.push(sheetname);
    }  
    var montharray=[];
    var sheetarray = sheetarray.toString();
    var  sheetarray=sheetarray.split(',');
    for(var i=0;i<sheetarray.length;i++)
    {
      if(sheetarray[i]!='')
      {
        var flag=1;
        montharray.push(sheetarray[i]);
      }
    } 
    montharray.reverse();
    var montherrmsg={'montharray':montharray,'DDE_errorAarray':DDE_errorarray.errormsg,'srtemailarray':srtemailarray};
    DDE_stmt.close();
    DDE_conn.close();
    return montherrmsg;
  }
  //SORTING THE MONTH PRESENT IN THE SHEET...............
  function DDE_Dep_Exct_monthstring(a,b)
  {
    var monthlistarray=[];
    for(var mlist=0; mlist<12; mlist++)
    {
      var currentmonth = Utilities.formatDate(new Date(2013,mlist,01), TimeZone,'MMM').toUpperCase();
      monthlistarray.push(currentmonth) 
    }
    var unique_monthlistarray = eilib.unique(monthlistarray);
    unique_monthlistarray= unique_monthlistarray.toString();
    unique_monthlistarray = unique_monthlistarray.split(',');
    a =a.toString();
    b =b.toString();
    return ((unique_monthlistarray.indexOf(a)- unique_monthlistarray.indexOf(b)));
  }
  //GET THE CUSTOMER NAME PRESENT IN THE SELECTED SHEET NAME..............
  function DDE_customername(unit,month)
  { 
    var sendcustname=[];var DDE_same_name=[];
    PropertiesService.getUserProperties().setProperty('unit',unit);
    var sht=PropertiesService.getUserProperties().getProperty('shturl')
    var ss = SpreadsheetApp.openById(sht);
    var selectedsheet =month;
    var selectedunit = unit;
    var selectedunit=parseFloat(selectedunit);
    var deductionsheet = ss.getSheetByName(selectedsheet);  
    var data= deductionsheet.getRange(1,2,deductionsheet.getLastRow(),1).getValues();
    var cusname_array=[];
    for ( var i in data)
    {
      data[i];
      if(data[i] == selectedunit)
      {
        var k =parseInt(i)+2;
        var cusname = deductionsheet.getRange(k,2,1,1).getValue();
        cusname_array.push(cusname);        
      }
    }
    var unique_name = eilib.unique(cusname_array);
    var unique_name=  unique_name.sort(DDE_Dep_Exct_string);
    var unique_name = unique_name.toString();
    var  unique_name=unique_name.split(',');
    for(var i=0;i<unique_name.length;i++)
    {if(unique_name[i].split('_')[1]!='')
      sendcustname.push(unique_name[i].split('_')[0]);
     else
       sendcustname.push(unique_name[i]);
     DDE_same_name.push(unique_name[i])
    }
    return [sendcustname,DDE_same_name];
  }
  //SORTING  THE  NAME  GETTING FROM THE SELECTED  SHEET ...................
  function DDE_Dep_Exct_string(a,b)
  {
    var str1 =a.toString();
    var str2 =b.toString();
    var str3 = str1.substring(0,1);
    var str4 = str2.substring(0,1);
    return ((str3 < str4) ? -1 : ((str3 > str4) ? 1 : 0));
  }
  //GET THE UNIT NO FROM THE SELECTED  SHEET NAME...............
  function DDE_getsheetunit(sheetname)
  {
    var selectedsheet=sheetname;
    PropertiesService.getUserProperties().setProperty('selectedsheet',selectedsheet);
    var sendunit=[];
    var sht=PropertiesService.getUserProperties().getProperty('shturl')
    var ss = SpreadsheetApp.openById(sht);
    var deductionsheet = ss.getSheetByName(selectedsheet);  
    var unitdata= deductionsheet.getRange(1,1,deductionsheet.getLastRow(),1).getValues();
    var newarray = [];   
    for ( var i in unitdata)
    {
      unitdata[i];
      if(unitdata[i] == 'Unit No')
      {
        var k =parseFloat(i)+1;
        var sheetunitnumbr = deductionsheet.getRange(k,2,1,1).getValue();   
        newarray.push(sheetunitnumbr);  
      }
    }  
    var unique_unit =eilib.unique(newarray);
    var unique_unit = unique_unit.toString();
    var unique_unit = unique_unit.split(',');
    var unique_unit = unique_unit.sort(DDE_Dep_Exct_numeric);
    for(var i=0;i<unique_unit.length;i++)
    {
      var unitnumbsize =unique_unit[i].length;
      if(unitnumbsize<4)
      {
        unique_unit[i]='0'+unique_unit[i];
      }
      sendunit.push(unique_unit[i].toString());
    }
    var unique_unit =eilib.unique(sendunit);
    return unique_unit;
  }
  //SORTING THE UNIT NO GETTING FROM THE  SELECTED SHEET...................
  function DDE_Dep_Exct_numeric(a,b)
  {
    return(a-b);
  }
  //GETTING CUSTOMER ID OF THE  SELECTED CUSTOMER NAME......................
  function DDE_getcustid(name,DDE_unit,DDE_month)
  {       
    PropertiesService.getUserProperties().setProperty('selectname',name);
    var sht=PropertiesService.getUserProperties().getProperty('shturl');
    var ss = SpreadsheetApp.openById(sht);
    var selectedsheet =DDE_month;
    var selectedunit=DDE_unit;
    var commentarray=[];
    var deductionsheet = ss.getSheetByName(selectedsheet); 
    var custname= deductionsheet.getRange(1,2,deductionsheet.getLastRow(),1).getValues();
    for ( var i=0; i<=custname.length; i++)
    {
      custname[i];
      if((custname[i] == selectedunit)&&(custname[parseInt(i)+1] == name)) 
      {
        var custrow =parseInt(i)+2;
        var comment = deductionsheet.getRange(custrow,2,1,1).getNote();
        commentarray.push(comment);
        commentarray.sort();
      }
    }
    if(commentarray[0]!="")
    {
      commentarray=commentarray;
    } else
    {
      commentarray="0";
    }
    PropertiesService.getUserProperties().setProperty('nocustid', '1');    
    return commentarray;
  }
  //GETTING THE  REC_VER ,START DATE ,END DATE FOR THE SELECTED UNIT NO  AND SELECTED CUSTOMER NAME............
  function DDE_Dep_Exct_recversionfun(getid,DDE_unit,DDE_month,name)
  {
    var conn=eilib.db_GetConnection();
    var sht=PropertiesService.getUserProperties().getProperty('shturl')
    var selectname=name;
    var ss = SpreadsheetApp.openById(sht);
    var selectedsheet =DDE_month;
    var selectedunit=DDE_unit;
    var deductionsheet = ss.getSheetByName(selectedsheet); 
    var start_end_date=[];
    var custid_date=[];
    start_end_date= deductionsheet.getRange(1,2,deductionsheet.getLastRow(),1).getValues();
    custid_date= deductionsheet.getRange(1,2,deductionsheet.getLastRow(),1).getNotes();
    var getalldata=[];
    for(var j=0;j<custid_date.length;j++)
    {
      start_end_date.push(custid_date[j]);
    }
    var recversion =0;
    var startarrary =[];
    var endarrary=[];
    var commentarray=[];
    var multiarray=[];
    var getsdate=[];
    var getedate=[];
    var mainarray=[];
    var single_array=[];
    var nocustid=PropertiesService.getUserProperties().getProperty('nocustid');
    for ( var i=0; i<=start_end_date.length; i++)
    {
      start_end_date[i];
      if(parseInt(nocustid)=='1')
      {
        if((start_end_date[i] == selectedunit)&&( start_end_date[parseInt(i)+1] == selectname))    //***DATA MATCHES NAME AND UNIT NUMBR   
        {
          var sdaterow =parseInt(i)+3;
          var edaterow=parseInt(i)+4;
          var sdate = deductionsheet.getRange(sdaterow,2,1,1).getValue();//sdaterow
          getsdate.push(sdate);
          var edate = deductionsheet.getRange(edaterow,2,1,1).getValue();//edaterow
          getedate.push(edate);
          var comment = deductionsheet.getRange(sdaterow,2,1,1).getComment();//sdaterow
          commentarray.push(comment);
          endarrary.push(edate);
          startarrary.push(sdate);
          var singlearray =[];
          var sd =Utilities.formatDate(new Date(sdate), TimeZone, "dd-MM-yyyy");                      //***START END DATE OF MATCHED DATA
          var ed =Utilities.formatDate(new Date(edate), TimeZone, "dd-MM-yyyy");
          singlearray.push({key:comment,startdate:sd,enddate:ed});
          single_array.push(comment,sd,ed);
          multiarray.push(singlearray);
          mainarray.push(single_array);
          recversion++
        }
      }
      else
      {
        if((start_end_date[i] == selectedunit)&&(start_end_date[parseInt(i)+1] == selectname)&&(start_end_date[parseInt(i)+1] == getid))    //***DATA MATCHES NAME AND UNIT NUMBR
        {
          var sdaterow =parseInt(i)+3;
          var edaterow=parseInt(i)+4;
          var sdate = deductionsheet.getRange(sdaterow,2,1,1).getValue();
          getsdate.push(sdate);
          var edate = deductionsheet.getRange(edaterow,2,1,1).getValue();
          getedate.push(edate);
          var comment = deductionsheet.getRange(sdaterow,2,1,1).getNode();
          commentarray.push(comment);
          endarrary.push(edate);
          startarrary.push(sdate);
          var singlearray =[];
          var sd =Utilities.formatDate(new Date(sdate), TimeZone, "dd-MM-yyyy");                      //***START END DATE OF MATCHED DATA
          var ed =Utilities.formatDate(new Date(edate), TimeZone, "dd-MM-yyyy");
          singlearray.push({key:comment,startdate:sd,enddate:ed});
          single_array.push(comment,sd,ed);
          multiarray.push(singlearray);
          mainarray.push(single_array);
          recversion++
        }
      }
    }
    PropertiesService.getUserProperties().setProperty('start_date',getsdate.join(','));
    PropertiesService.getUserProperties().setProperty('end_date',getedate.join(','));
    var unique_recver =uniqueObj(multiarray); 
    PropertiesService.getUserProperties().setProperty('xoption', 0);
    var recleng=commentarray.length;
    PropertiesService.getUserProperties().setProperty('recleng', recleng);
    unique_recver.sort(compare);
    var recveremail={'unique_recver':unique_recver}
    return recveremail;
    conn.close();
  }
  //FUNCTION FOR UNIQUE OBJECT ARRAY
  function uniqueObj(array){
    var unique = {};
    var distinct = [];
    for( var i in array ){
      if( typeof(unique[array[i][0].key]) == "undefined"){
        distinct.push(array[i]);
      }
      unique[array[i][0].key] = 0;
    }
    return distinct;
  }
  //GETTING THE  START DATE AND END DATE FOR THE SELECTED REC_VERSION.............
  function DDE_Dep_Exct_errmsgfun(getrec)
  {
    var getrever=[];
    getrever=getrec;
    PropertiesService.getUserProperties().setProperty('xoption', 0);
    var sht=PropertiesService.getUserProperties().getProperty('shturl');
    var selectname=PropertiesService.getUserProperties().getProperty('selectname');
    var ss = SpreadsheetApp.openById(sht);
    var selectedsheet =PropertiesService.getUserProperties().getProperty('selectedsheet');
    var selectedunit=PropertiesService.getUserProperties().getProperty('unit')
    var deductionsheet = ss.getSheetByName(selectedsheet);  
    var start_end_date=[];
    var custid_date=[];
    start_end_date= deductionsheet.getRange(1,2,deductionsheet.getLastRow(),1).getValues();
    custid_date= deductionsheet.getRange(1,2,deductionsheet.getLastRow(),1).getNotes();
    var getalldata=[];
    var rowno=[];
    var recversion =0;
    var startarrary =[];
    var endarrary=[];
    var commentarray=[];
    var multiarray=[];
    var getsdate=[];
    var getedate=[];
    var mainarray=[];
    var nocustid=PropertiesService.getUserProperties().getProperty('nocustid');
    for ( var i=0; i<=start_end_date.length; i++)
    {
      start_end_date[i];
      if(parseInt(nocustid)=='1')
      {
        if((start_end_date[i] == selectedunit)&&(start_end_date[parseInt(i)+1] == selectname))    //***DATA MATCHES NAME AND UNIT NUMBR  getalldata[i]  getalldata[parseInt(i)+1]
        {
          var sdaterow =parseInt(i)+3;
          var edaterow=parseInt(i)+4;
          var sdate = deductionsheet.getRange(sdaterow,2,1,1).getValue();//sdaterow
          getsdate.push(sdate);
          var edate = deductionsheet.getRange(edaterow,2,1,1).getValue();//edaterow
          getedate.push(edate);
          var comment = deductionsheet.getRange(sdaterow,2,1,1).getComment();//sdaterow
          var cmt=sdaterow;
          rowno.push(cmt);
          commentarray.push(comment);
          endarrary.push(edate);
          startarrary.push(sdate);
          var singlearray =[];
          var sd =Utilities.formatDate(new Date(sdate), TimeZone, "dd-MM-yyyy");                      //***START END DATE OF MATCHED DATA
          var ed =Utilities.formatDate(new Date(edate), TimeZone, "dd-MM-yyyy");
          singlearray.push(comment,sd,ed);
          multiarray.push(singlearray);
          mainarray.push(singlearray);
          for(var s=0; s<commentarray.length;s++)
          {                 
            if(getrever==commentarray[s])
            {
              var getstartrow=rowno[s];                    
              var startrow =getstartrow-1;                                                     //***FIRST ROW OF EXTRACTING DATA  
              break;
            }
          }
          recversion++
        }
      }
    }
    PropertiesService.getUserProperties().setProperty('start_date',getsdate.join(','));
    PropertiesService.getUserProperties().setProperty('end_date',getedate.join(','));
    var unique_recver = eilib.unique(multiarray);
    var unique_recver=  unique_recver.sort(DDE_Dep_Exct_mixing);
    var countrecver=PropertiesService.getUserProperties().getProperty('recleng');
    singlearray.push(countrecver);
    return singlearray;
  }
  //HERE MAIL SEND FOR THE SELECTED REC_VER  IN THE SINGLE  MAIL WITH ATTACHMENT OF FILES...........
  function DDE_Dep_Exct_submit(formallid)
  {
    var sht=PropertiesService.getUserProperties().getProperty('shturl');
    var ss = SpreadsheetApp.openById(sht);
    var checkarray=[];
    var selectedunit=formallid.DDE_lb_unitselect;
    var customername=formallid.DDE_lb_customerselect;
    var customernameid=formallid. DDE_customer_id_name;
    if(customernameid!=undefined)
      customername=customernameid;
    if(formallid.DDE_chk_checkboxinc!=undefined){
      if((Array.isArray(formallid.DDE_chk_checkboxinc))==true){
        checkarray=formallid.DDE_chk_checkboxinc;
      }    
      else
      {
        checkarray.push(formallid.DDE_chk_checkboxinc);
      }}
    else
      checkarray.push(formallid.DDE_tb_recdate);  
    var selectedsheet=formallid.DDE_lb_monthselect;    
    var customermail=formallid.DDE_LB_Emaillist;
    var customeridname=formallid.DDE_customer_id_nam;
    var deductionsheet = ss.getSheetByName(selectedsheet);
    var start_end_date= deductionsheet.getRange(1,2,deductionsheet.getLastRow(),1).getValues();
    var recversion =0;
    var startarrary =[];
    var endarrary=[];
    var commentarray=[];
    var multiarray=[];
    var rowno=[];
    var advancedArgs=[];
    for ( var i in start_end_date)
    {    
      start_end_date[i];
      if((start_end_date[i] == selectedunit)&&(start_end_date[parseInt(i)+1] == customername))    //***DATA MATCHES NAME AND UNIT NUMBR
      { 
        var sdaterow =parseInt(i)+3;
        var edaterow=parseInt(i)+4;
        var sdate = deductionsheet.getRange(sdaterow,2,1,1).getValue();
        var edate = deductionsheet.getRange(edaterow,2,1,1).getValue();
        var comment = deductionsheet.getRange(sdaterow,2,1,1).getComment();
        var cmt=sdaterow;
        rowno.push(cmt);
        commentarray.push(comment);
        endarrary.push(edate);
        startarrary.push(sdate);
        var singlearray =[];
        singlearray.push(comment,sdate,edate);
        multiarray.push(singlearray);
        recversion++
      }
    }
    var unique_recver = eilib.unique(multiarray);
    var unique_recver=  unique_recver.sort(DDE_Dep_Exct_mixing);
    var sheetdata = deductionsheet.getRange(1,2,deductionsheet.getLastRow(),1).getValues();
    var selection = parseInt(PropertiesService.getUserProperties().getProperty('xoption'));
    for(var k=0; k<checkarray.length;k++)
    {        
      for(var s=0; s<commentarray.length;s++)
      {   
        if((checkarray[k]==undefined)||(commentarray[k]==undefined)||(commentarray[s]==undefined)) continue
        if(selectedsheet!='DECEMBER'||selectedsheet!='NOVEMBER')
        {
          var  cgcheckarray = checkarray[k].replace('LEAST_PERIOD', 'REC_VER');
        }
        if(cgcheckarray==commentarray[s])
        {
          var getstartrow=rowno[s]; 
          var startrow =getstartrow-1;                                             //***FIRST ROW OF EXTRACTING DATA  
        }
      }
      var refund_row = deductionsheet.getRange(1,1,deductionsheet.getLastRow(),1).getValues();
      for ( var m=startrow; m<=deductionsheet.getLastRow(); m++)
      {
        var REFUND ="REFUND";
        if(refund_row[m] == REFUND)
        {
          var endrow =parseInt(m)+2;                                              //***LAST ROW OF EXTRACTING DATA
          break;      
        }   
      }
      var numberofrow = endrow- startrow;                                          //***CALCULATING NUMBER OF ROWS TO EXTRACT
      var deductionsheet = ss.getSheetByName(selectedsheet); 
      var mailsheet = ss.getSheetByName('TEMPLATE');  
      if(mailsheet==null)
        return 'DDC_flag_nosheet';
      var headingrow= deductionsheet.getRange(1,1,1,4);
      var customerdata= deductionsheet.getRange(startrow,1,numberofrow,4);
      var customerdatacolor= deductionsheet.getRange(startrow,1,numberofrow,4).getBackgroundColors();
      //NEW SCRIPT FOR FINDING SENDING EMAIL PART
      var DDE_range=mailsheet.getRange(1,1,mailsheet.getLastRow(),4).getValues();
      for(var i in DDE_range)
      {
        for(var j=0;j<DDE_range[i].length;j++)
        {
          var DDE_location_name=DDE_range[i][j];
          if(DDE_location_name=='SENDING MAIL')
          {
            var DDE_location=i
            }
        }
      }   
      var position=parseInt(DDE_location)+parseInt(5);
      mailsheet.getRange(position,1,mailsheet.getLastRow(),4).clear();
      mailsheet.deleteRows(position,mailsheet.getLastRow());
      var maildata= mailsheet.getRange(position,1,numberofrow,4);
      customerdata.copyTo(maildata); //maildata.
      customerdata=null;
      var conn=eilib.db_GetConnection();
      var unitnumbsize =selectedunit.toString().length;
      if(unitnumbsize<4)
      {
        selectedunit='0'+selectedunit;
      }
      var sheetName = "sheetname"; 
      var email = customermail; 
      var email = customermail; 
      var stmt = conn.createStatement();
      var sub_array =[];
      var sub_exequery ="SELECT ETD .ETD_EMAIL_SUBJECT,ETD. ETD_EMAIL_BODY FROM  EMAIL_TEMPLATE_DETAILS ETD ,EMAIL_TEMPLATE ET WHERE (ET .ET_ID=ETD .ET_ID) AND ET_EMAIL_SCRIPT='DEPOSIT DEDUCTION'";
      var sub_rs = stmt.executeQuery(sub_exequery);
      if(sub_rs.next())
      {
        var  subject_db=sub_rs.getString("ETD_EMAIL_SUBJECT");
        var  message_db=sub_rs.getString("ETD_EMAIL_BODY");
      }
      var newSpreadsheet = SpreadsheetApp.create("TEMPORARY SHEET");
      var mailsheet = ss.getSheetByName('TEMPLATE'); 
      mailsheet.copyTo(newSpreadsheet);
      var DDE_getTemplateSheet = newSpreadsheet.getSheetByName('Copy of TEMPLATE');
      var DDE_row=parseInt(DDE_location)+parseInt(2);
      DDE_getTemplateSheet.getRange(1,1,DDE_row,4).clear();
      DDE_getTemplateSheet.deleteRows(1,DDE_row);
      var rcontent = customername+ " - "+selectedunit;
      var subject =subject_db.replace('[UNIT_NO - CUSTOMER_NAME]',rcontent);
      var body =message_db.replace('[UNIT_NO-  CUSTOMER_NAME]',rcontent);
      var emailindex =  email.indexOf('@');
      var eusername = email.substring(0,emailindex).toUpperCase(); 
      body = body.replace('[MAILID_USERNAME]',eusername);
      newSpreadsheet.getSheetByName('sheet1').activate();
      var DDC_newspread_ssid=newSpreadsheet.getId();
      newSpreadsheet.deleteActiveSheet();
//      var contents = DriveApp.getFileById(newSpreadsheet.getId()).getAs('application/pdf').getBytes();
      var contents = DocsList.getFileById(newSpreadsheet.getId()).getAs('application/pdf').getBytes();
      var getattachfile={fileName:selectedunit+'-'+customername+".pdf", content:contents, mimeType:"application//pdf"};
      advancedArgs.push(getattachfile);
    }
    MailApp.sendEmail(email, subject, body, {name:eilib.Get_MailDisplayName('DEPOSIT_DEDUCTION'),attachments: advancedArgs});
    //DELETE "TEMPORARY SHEET" SHEET AFTER SENDING MAIL     
    stmt.close();
    conn.close();
    var DDE_files = DriveApp.getFiles();
    while (DDE_files.hasNext()) {
      var DDE_file = DDE_files.next();
      if(DDE_file.getName()=="TEMPORARY SHEET")
        DDE_file.setTrashed(true)
        }
    return 'DDC_flag_extract';
  }
  //SORTING THE REC_VER ,START DATE  AND END DATE....................
  function DDE_Dep_Exct_mixing(a,b)
  {
    return ((a[0] < b[0]) ? -1 : ((a[0] > b[0]) ? 1 : 0));
  }
  //FUNCTION FOR OBJECT ARR
  function compare(a,b) {
    if (a.key < b.key)
      return -1;
    if (a.key > b.key)
      return 1;
    return 0;
  }
}
catch(error){
}


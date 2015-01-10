//updated contract script to remove last line if no ep n pass port no,updated notice period part to place text instead of no n replace null if no notice period n reused function to remove editors n set owner all invoice n contract function,
//FUNCTION TO SET OWNER FOR A DOC
function SetDocOwner(docid,docowner,semailid)
{
  var editorfile= DocsList.getFileById(docid).getEditors();
  //  var editorfile= DriveApp.getFileById(docid).getEditors();
  for(var j=0;j<editorfile.length;j++)
  {
    if(editorfile[j].getEmail()=="")continue;
    var exsitmailid=(editorfile[j].getEmail()).toString();
    semailid=semailid.toString()
    if(exsitmailid!=semailid)
    {
      DriveApp.getFileById(docid).removeEditor(editorfile[j].getEmail());
    }
  }
  if(docowner!=semailid)
  {
    DriveApp.getFileById(docid).addEditor(semailid);
  }
  DriveApp.getFileById(docid).setOwner(docowner);
}
//FUNCTION TO REMOVE EDITORS IF SESSION ID NOT OWNER OR EDITOR
function RemoveEditors(docid,email_fetch,docowner)
{
  if((email_fetch!=UserStamp)&&(docowner!=UserStamp))
  {
//    DriveApp.getFileById(docid).removeEditor(UserStamp);
    DocsList.getFileById(docid).removeEditor(UserStamp);
  }
}
//CONTRACT MAIL
function CUST_contractmail(conn,unitno,checkindate,checkoutdate,companyname,customername,noticeperiod,passportno,passportdate,epno,epdate,noticedate,lp,cardno,rent,airquartfee,airfixedfee,electcap,dryclean,chkoutfee,procfee,deposit,waived,roomtype,rent_check,sendmailid,formname,targetFolderId,docowner)
{
  CUST_contract(conn,unitno,checkindate,checkoutdate,companyname,customername,noticeperiod,passportno,passportdate,epno,epdate,noticedate,lp,cardno,rent,airquartfee,airfixedfee,electcap,dryclean,chkoutfee,procfee,deposit,waived,roomtype,rent_check,formname,targetFolderId)
  conn.commit();
  var userPropertiesid = PropertiesService.getUserProperties();
  var contractidcopy = userPropertiesid.getProperty('contractid');
  var contractarray=[];
  contractarray=CUST_emailsubandmessages(conn);
  var unit_fetch =unitno;
  var tenant_fetch = customername;
  var email_fetch =sendmailid;
  var subject_db=contractarray[1].subject;
  var message_db=contractarray[1].message;
  var linkkk = DriveApp.getFileById(contractidcopy);
  var url = linkkk.getUrl();
  var sourceFolderId=getTemplatesFolderId(conn);
  CUST_moveFileToFolder(contractidcopy,sourceFolderId,targetFolderId);
  SetDocOwner(contractidcopy,docowner,email_fetch);
  var mail_username=email_fetch.split('@');
  var subcontent2 = '#'+" "+unit_fetch + " " + tenant_fetch;
  var subject2 =subject_db.replace('[UNIT NO - CUSTOMER_NAME]',subcontent2);
  var body2 =message_db.replace('[UNIT NO - CUSTOMER_NAME]',subcontent2); 
  body2=body2.replace('[MAILID_USERNAME]',mail_username[0].toUpperCase());
  MailApp.sendEmail(email_fetch, subject2, body2, {name:Get_MailDisplayName("CONTRACT"),htmlBody: body2+'<br><br>CONTRACT : '+url});
  RemoveEditors(contractidcopy,email_fetch,docowner)
}
//CONTRACT
function CUST_contract(conn,unitno,checkindate,checkoutdate,companyname,customername,noticeperiod,passportno,passportdate,epno,epdate,noticedate,lp,cardno,rent,airquartfee,airfixedfee,electcap,dryclean,chkoutfee,procfee,deposit,waived,roomtype,rent_check,formname,targetFolderId)
{
  var cust_config_array=[];
  cust_config_array=CUST_invoice_contractreplacetext(conn);
  var contractidcode =cust_config_array[10];
  var rentstring = rent;//.toString();
  var RENTword  = currencyToWord(rentstring)
  var quartaircon_fetch=airquartfee;
  var fixedaircon_fetch=airfixedfee;
  var electricity=electcap;
  if(electricity==null)
  {
    var elec_fetch="00.00" 
    }
  else
  {
    elec_fetch=electricity; 
  }
  var dryclean=dryclean;
  if(dryclean==null)
  {
    var dryclean_fetch="00.00";
  }
  else
  {
    dryclean_fetch=dryclean;
  }
  var checkout=chkoutfee;
  if(checkout==null)
  {
    var checkoutfee_fetch="00.00";
  }
  else
  {
    checkoutfee_fetch=checkout;
  }
  if(procfee ==null)
  {
    var PROCESSno="00.00";
    var PROCESSword = "  ";
  }
  else
  {
    PROCESSno=procfee;
    var prostring = PROCESSno;//.toString();
    PROCESSword = currencyToWord(prostring);
  }
  if(deposit == null)
  {
    var DEPOSITno="00.00";
    var DEPOSITEword="  ";
  }
  else
  {
    DEPOSITno=deposit;
    var depstring = DEPOSITno;//.toString();
    DEPOSITEword= currencyToWord(depstring);
  }
  var todaysDate =  Utilities.formatDate(new Date(), TimeZone, "yyyyMMdd"); 
  var todaydat = Utilities.formatDate(new Date(), TimeZone, "dd/MM/yyyy"); 
  var todaydatR = Utilities.formatDate(new Date(), TimeZone, "MM/dd/yyyy");
  var checkindate=checkindate.split("-");//split check in date
  var date=checkindate[2];
  var month=checkindate[1]-1;
  var year=checkindate[0];
  var check_in_date= new Date(year,month,date); 
  var check_in_dated = Utilities.formatDate(check_in_date, TimeZone, "dd-MMM-yyyy");
  var datecheckedin =check_in_date.getDate();
  var checkoutdate=checkoutdate.split("-");//split check out date
  var date1=checkoutdate[2];
  var month1=checkoutdate[1]-1;
  var year1=checkoutdate[0];
  var check_out_date = new Date(year1,month1,date1); 
  var cexdd =  Utilities.formatDate(check_out_date,TimeZone, "dd-MMM-yyyy");
  // to generate last date of a month
  //start
  var curr_date = 0;
  var curr_month =check_in_date.getMonth();
  curr_month++;
  var curr_year = check_in_date.getYear(); 
  var LastMonth = new Date(curr_year,curr_month,curr_date);
  var LastMonthformat = Utilities.formatDate(new Date(LastMonth), TimeZone, "dd-MMM-yyyy");
  //end
  var contractidcopy = DriveApp.getFileById(contractidcode).makeCopy("CONTRACT"+"-"+" "+unitno+" "+ "-"+ " "+customername).getId();
  var docId1 = DocumentApp.openById(contractidcopy);
  var para1 =docId1.getParagraphs();
  var docIdbody1 = docId1.getActiveSection();
  //  *************************************************************
  if(noticedate!="")
  {
    var noticedate=noticedate.split("-");//split notice date
    var ntc_date = new Date(noticedate[2],noticedate[1]-1,noticedate[0]);
    var ntc_date1 = Utilities.formatDate(new Date(ntc_date), TimeZone, "dd/MM/yyyy");
    var noticeSt=cust_config_array[11];
    docIdbody1.replaceText("NOTICESTATEMENT",noticeSt);
  }
  else
  {    
    docIdbody1.replaceText("NOTICESTATEMENT"," ");
  }
  var webloginfetch1 =CUST_GetLogindtls(conn,unitno);
  if (webloginfetch1!=null)
  {
    var indext1=webloginfetch1.search('T1');
    var indext2=webloginfetch1.search('T2');
  }
  if((indext1>=0)||(indext2>=0))
  {
    if(indext1>=0)
    {
      var address1value=cust_config_array[12]
      docIdbody1.replaceText("UNITADDRESS",address1value);
    }
    else if(indext2>=0)
    {
      var address2value=cust_config_array[13]
      docIdbody1.replaceText("UNITADDRESS",address2value);
    }
  }
  else
  {
    var address3value=cust_config_array[14]
    docIdbody1.replaceText("UNITADDRESS",address3value);
  }
  if(waived != "")
  {
    var waived = "(WAIVED)";
    docIdbody1.replaceText("Waived",waived);
  }
  else
  {
    var notwaived = " ";
    docIdbody1.replaceText("Waived",notwaived);
  }
  if(cardno == "")
  {
    docIdbody1.replaceText("ACES","        ");
  }
  else
  {
    docIdbody1.replaceText("ACES",cardno);// Access card number
  }
  if(fixedaircon_fetch!=null)
  { 
    var fixedstmtfetch=cust_config_array[16];
    fixedstmtfetch=fixedstmtfetch.replace("AIRFIXED",fixedaircon_fetch)
    docIdbody1.replaceText("AIRCONSTATEMENT",fixedstmtfetch);
  }
  else if(quartaircon_fetch!=null)
  { 
    var quartstmtfetch=cust_config_array[15]
    quartstmtfetch=quartstmtfetch.replace("AIRQ",quartaircon_fetch)
    docIdbody1.replaceText("AIRCONSTATEMENT",quartstmtfetch);
  }
  else
  {
    docIdbody1.replaceText("AIRCONSTATEMENT","$00.00");
  }
  var finalep_pass = "";
  if((epno =="") && (passportno ==""))
  {
    epno="";                           
    passportno="";
    finalep_pass ="";
    var noepcontlineno=cust_config_array[19];
    para1[noepcontlineno].removeFromParent(); //REMOVE LINE IF NO EP N PASSPORT NO
  }
  else if(epno =="")
  {
    epno="";
    finalep_pass ="PASSPORT NO: "+passportno;
  }
  else if(passportno=="")
  {
    passportno="";                            
    finalep_pass ="EP NO: "+epno;
  }
  if((epno != "") && (passportno !="")) 
  {finalep_pass = "EP NO: "+epno;
  }
  if(passportdate=="")
  {
    passportdate="";
  }
  if(epdate=="")
  {
    epdate="";
  }
  if(noticeperiod==null)
  {
    noticeperiod="";
  }
  if(passportdate!="")
  {
    passportdate=passportdate.split("-");//split passport date
    passportdate = new Date(passportdate[2],passportdate[1]-1,passportdate[0]);
    passportdate = Utilities.formatDate(new Date(passportdate), TimeZone, "dd/MM/yyyy");
  }
  if(epdate!="")
  {
    epdate=epdate.split("-");//split ep date
    epdate = new Date(epdate[2],epdate[1]-1,epdate[0]);
    epdate = Utilities.formatDate(new Date(epdate), TimeZone, "dd/MM/yyyy");
  }
  if(noticeperiod=="")
  {
    docIdbody1.replaceText('"NOTI"',"") // notice period
  }
  else
  {
    var noticeperiod=converter(noticeperiod);
    docIdbody1.replaceText("NOTI",noticeperiod)    
  }  
  docIdbody1.replaceText("nname",customername)
  .replaceText("eepno",epno)// EP number     
  .replaceText("expep",epdate) // EP expire date
  .replaceText("ppass",passportno) // passport number
  .replaceText("passda",passportdate) // passport expire date
  .replaceText("roomtype",roomtype) // room type
  .replaceText("unitno",unitno) // Unit Number
  .replaceText("checkin",check_in_dated) // customer check in date
  .replaceText("checkout",cexdd)// customer check out date
  .replaceText("prochkout",LastMonthformat)
  .replaceText("RENTALAMOUNT",RENTword) // Rental amount in words
  .replaceText("RRENT",rent) // rental amount in numbers
  .replaceText("cusss",customername) // name
  .replaceText("uunni",unitno) // unit no
  .replaceText("ECP",elec_fetch)  //Electricity capped
  .replaceText("PRWORD",PROCESSword) // processing cost in words
  .replaceText("PCO",PROCESSno) // processing cost in numbers
  .replaceText("DEPPOSI",DEPOSITEword) // deposite amount in words
  .replaceText("DDEE",DEPOSITno)  // deposite amount in numbers
  .replaceText("DRI",dryclean_fetch)// dry clean amount 
  .replaceText("NoticStDate",ntc_date1)
  .replaceText("TDAYDATE",todaydat)// today's date
  .replaceText("TYMPERIOD",lp) // period between start date and end date
  .replaceText("epnoandpassno",finalep_pass)
  .replaceText("CKCLE",checkoutfee_fetch); // checkout cleaning fee  
  var pro_lbl=cust_config_array[17];//get prorated label
  var pro_rated_lineno=parseInt(cust_config_array[18]);//get prorated label line no
  var prlbl1=pro_lbl.replace("checkin",check_in_dated);
  var prlbl2=prlbl1.replace("prochkout",LastMonthformat);
  //CHECK LESS THAN A MONTH OR GREATER THAN A MONTH
  var yearchk=lp.search('Year');
  var monthschk=lp.search('Months');
  var monthchk=lp.search('Month');
  var daychk=lp.search('Day');
  var rent_check=rent_check;
  if(formname=="EXTENSION")
  {
    if(((yearchk>0)||(monthschk>0)||((monthchk>0)&&(daychk>0)))&&(rent_check=='true'))//greater than a month,prorated
    {
      var proratedrent=sMonthProratedCalc(check_in_date,rent);
      if(proratedrent!=0) 
      {
        docIdbody1.replaceText("PRORATED",'$'+proratedrent); // prorated rent calculation
        docIdbody1.replaceText("prochkout",LastMonthformat);
      }
      else
      {
        para1[pro_rated_lineno].removeFromParent();
      }
    }
    else if(((yearchk>0)||(monthschk>0)||((monthchk>0)&&(daychk>0)))&&(rent_check=='false'))//greater than a month,non prorated
    {
      para1[pro_rated_lineno].removeFromParent();
    }
    else if((((yearchk<0)&&(monthschk<0)&&(daychk>0)&&(monthchk<0))||((yearchk<0)&&(monthschk<0)&&(daychk<0)&&(monthchk>0)))&&(rent_check=='true'))//less than a month,prorated
    {
      if((check_in_date.getFullYear()==check_out_date.getFullYear())&&(check_in_date.getMonth()==check_out_date.getMonth()))
      {
        var proratedrent=wMonthProratedCalc(check_in_date,check_out_date,rent);
        if(proratedrent!='0.00') 
        {
          docIdbody1.replaceText("PRORATED",'$'+proratedrent);//prorated rent replacement
          docIdbody1.replaceText("prochkout",cexdd);
        }
        else
        {
          para1[pro_rated_lineno].removeFromParent();
        }
      }
      else if((check_in_date.getFullYear()!=check_out_date.getFullYear())||(check_in_date.getMonth()!=check_out_date.getMonth()))
      {
        var proratedsmonth=sMonthProratedCalc(check_in_date,rent);
        var proratedemonth=eMonthProratedCalc(check_out_date,rent);
        var proratedrent=(parseFloat(proratedsmonth)+parseFloat(proratedemonth)).toFixed(2);
        if(proratedrent!='0.00') 
        {
          docIdbody1.replaceText("PRORATED",'$'+proratedrent); // prorated rent calculation
          docIdbody1.replaceText("prochkout",cexdd);
        }
        else
        {
          para1[pro_rated_lineno].removeFromParent();
        }
      }
    }
  }
  else
  {
    var prlbl1=pro_lbl.replace("checkin",check_in_dated);
    var prlbl2=prlbl1.replace("prochkout",LastMonthformat);
    //LESS THAN EQUAL TO A MONTH
    if((((yearchk<0)&&(monthschk<0)&&(daychk>0)&&(monthchk<0))||((yearchk<0)&&(monthschk<0)&&(daychk<0)&&(monthchk>0))))
    {
      if(rent_check=='false')
      {
        para1[pro_rated_lineno].removeFromParent();
      }
    }
    //GREATER THAN A MONTH
    else
    {
      var proratedrent= sMonthProratedCalc(check_in_date,rent);
      if(proratedrent!=0) 
      {
        if(rent_check=='true')
        {
          docIdbody1.replaceText("PRORATED",'$'+proratedrent);
        }
        else if(rent_check=='false')
        {
          para1[pro_rated_lineno].removeFromParent();
        }
      }
      else
      {
        para1[pro_rated_lineno].removeFromParent();
      }
    }
  }
  docId1.saveAndClose();
  var userPropertiescontractid = PropertiesService.getUserProperties();
  userPropertiescontractid.setProperty('contractid',contractidcopy);
}
//FUNCTION TO CREATE INVOICE
function CUST_invoice(conn,unit,customername,companyname,invoiceid,invoicesno,invoicedate,rent,process,deposit,sdate,edate,roomtype,Leaseperiod,mailid,Folderid,rentcheck,docowner,formname,waived,custid)
{
  var invoiceidcode=invoiceid
  var Slno=invoicesno;
  var Sdate=invoicedate;
  var tenant_fetch=customername;
  var unit_fetch=unit;
  var company_fetch=companyname;
  if(company_fetch==null||company_fetch=="")
  { company_fetch=' '}
  var checkin_fetch=sdate;
  var checkout_fetch=edate;
  var deposit=deposit;
  if(deposit==null)
  {  var A3='00.00';  }  else  {    A3=deposit;  }
  var process=process;
  if(process==null||waived!="")
  {var A4='00.00';}else{A4=process}
  var A5=rent;
  var lease_fetch=Leaseperiod;
  var SdateD = Sdate;
  var sysdate = new Date();
  var todaydatc =  Utilities.formatDate(new Date(sysdate), TimeZone, "yyyy/MM/dd");
  var todaysDate =  Utilities.formatDate(new Date(), TimeZone, "yyyyMMdd"); 
  var todaydat = Utilities.formatDate(new Date(), TimeZone, "dd/MM/yyyy"); 
  var todaydatR = Utilities.formatDate(new Date(), TimeZone, "MM/dd/yyyy");
  if(new Date(SdateD).valueOf() == new Date(todaydatc).valueOf())
  {
    Slno++;
    if(0>=Slno<=9){
      Slno= ("00"+Slno).toString();
    }
    else if(10>=Slno<=99){
      Slno= "0"+Slno;
    }
    CUST_invoicesearialnoupdation(conn,Slno)
  }
  else 
  {
    Slno = 1;
    if(Slno==1){
      Slno= ("00"+Slno).toString();
    }
    
    var todaydatc =  Utilities.formatDate(new Date(sysdate), TimeZone, "dd/MM/yyyy");
    var cc_invoicedate =  Utilities.formatDate(new Date(sysdate), TimeZone, "yyyy/MM/dd");
    CUST_invoiceserialandinvoicedateupdation(conn,Slno, cc_invoicedate);
  }
  var todaydatestring =  Utilities.formatDate(new Date(), TimeZone, "dd-MMM-yyyy");
  var pc = parseFloat(A3); // processing cost to float
  var ren = parseFloat(A5); // rent amount to float
  var das = parseFloat(A4); // deposite amount to float
  var check_in_fetch=checkin_fetch.split("-")
  var check_in_date= new Date(check_in_fetch[0],check_in_fetch[1]-1,check_in_fetch[2]); 
  var y=new Date(check_in_date).getYear();
  var d=new Date(check_in_date).getDate();
  var m=new Date(check_in_date).getMonth()+1;
  var check_in_date1 = Utilities.formatDate(check_in_date, TimeZone, "dd/MMM/yyyy");
  var datecheckedin =check_in_date.getDate();
  var check_out_fetch=checkout_fetch.split("-")
  var check_out_date= new Date(check_out_fetch[0],check_out_fetch[1]-1,check_out_fetch[2]); 
  var check_out_date1 = Utilities.formatDate(check_out_date, TimeZone, "dd/MMM/yyyy"); 
  // to generate last date of a month
  var curr_date = 0;
  var curr_month =check_in_date.getMonth();
  curr_month++;
  var curr_year = check_in_date.getYear(); 
  var cdate1="";
  var cdate2="";
  var yearchk=lease_fetch.search('Year');
  var monthschk=lease_fetch.search('Months');
  var monthchk=lease_fetch.search('Month');
  var daychk=lease_fetch.search('Day');
  var LastMonth = new Date(curr_year,curr_month,curr_date)
  var rent_check=rentcheck;
  if(formname=="CREATION" || formname=="RECHECKIN")
  {
    if((yearchk>0)||(monthschk>0)||((monthchk>0)&&(daychk>0)))
    {
      if(rent_check=='false')
      {
        var proratedrentflag=1;
        var month_calculation=nonproratedmonthcalculation(check_in_date,check_out_date);
        var startdate_array=month_calculation[0];
        var enddate_array=month_calculation[1];
        var length=startdate_array.length; 
      }
      else
      {
        proratedrentflag=2;
        var month_calculation=proratedmonthcalculation(check_in_date,check_out_date);
        var startdate_array=month_calculation[0];
        var enddate_array=month_calculation[1];
        var length=startdate_array.length; 
      }
    }
    else
    {
      var length=1;
      proratedrentflag=0
      cdate1=check_in_date1;
      cdate2=check_out_date1;
      var sum1 = das+pc+parseFloat(A5); 
      var sum = sum1.toFixed(2); 
    }
  }
  else if(formname=="EXTENSION")//extension....
  {
    if(((yearchk>0)||(monthschk>0)||((monthchk>0)&&(daychk>0)))&&(rent_check=='true'))//greater than a month-rent check true
    {
      proratedrentflag=2;
      var month_calculation=proratedmonthcalculation(check_in_date,check_out_date);
      var startdate_array=month_calculation[0];
      var enddate_array=month_calculation[1];
      var length=startdate_array.length; 
    }
    else if(((yearchk>0)||(monthschk>0)||((monthchk>0)&&(daychk>0)))&&(rent_check=='false'))//greater than a month-rent check false
    {
      var proratedrentflag=1;
      var month_calculation=nonproratedmonthcalculation(check_in_date,check_out_date);
      var startdate_array=month_calculation[0];
      var enddate_array=month_calculation[1];
      var length=startdate_array.length; 
    }
    
    else if((((yearchk<0)&&(monthschk<0)&&(daychk>0)&&(monthchk<0))||((yearchk<0)&&(monthschk<0)&&(daychk<0)&&(monthchk>0)))&&(rent_check=='true'))//less than or equal to a month
    {
      var length=1;
      proratedrentflag=0
      cdate1=check_in_date1;
      cdate2=check_out_date1;
      if((check_in_date.getFullYear()==check_out_date.getFullYear())&&(check_in_date.getMonth()==check_out_date.getMonth()))
      {
        var proratedrent=wMonthProratedCalc(check_in_date,check_out_date,A5);
        var sum1 = das+pc+parseFloat(proratedrent); 
        var sum = sum1.toFixed(2);
      }
      else if((check_in_date.getFullYear()!=check_out_date.getFullYear())||(check_in_date.getMonth()!=check_out_date.getMonth()))
      {
        var proratedsmonth=sMonthProratedCalc(check_in_date,A5);
        var proratedemonth=eMonthProratedCalc(check_out_date,A5);
        var proratedrent=(parseFloat(proratedsmonth)+parseFloat(proratedemonth)).toFixed(2);
        if(proratedrent!='0.00') 
        {
          var sum1 = das+pc+parseFloat(proratedrent); 
          var sum = sum1.toFixed(2);
        }
        else
        {
          var sum1 = das+pc+ren; 
          var sum = sum1.toFixed(2);
        }
      }
    }
  }
  var doc1 =DriveApp.getFileById(invoiceid).makeCopy("INVOICE"+"   -"+" "+unit_fetch+" "+ "-"+ " "+tenant_fetch+"_INV"+todaysDate+Slno).getId();
  var doc = DocumentApp.openById(doc1);
  var body = doc.getBody();
  var docIdbody1 = doc.getActiveSection();
  //Add a table in document
  var table = body.getTables();
  for(var i=0; i<length; i++){
    var tr = table[0].appendTableRow();
    var td = tr.appendTableCell('Rent CHECKIN to FINAL');
    var checkindatechange="customer"+i+"start";
    var checkoutdatechange="customer"+i+"end";
    docIdbody1.replaceText("CHECKIN",checkindatechange).replaceText("FINAL",checkoutdatechange)
    var td = tr.appendTableCell('AMOUNT');
    var amountchange="rent"+i+"amount";
    docIdbody1.replaceText("AMOUNT",amountchange)
    var td = tr.appendTableCell("$");
    if(i==0 && length!=1)
    {
      var tr = table[0].appendTableRow();
      var td = tr.appendTableCell('TOTAL');
      var td = tr.appendTableCell('singlemonth');
      var td = tr.appendTableCell("$");
    }
    
  }
  alignright(doc,length)
  function alignright(doc,length)
  {
    var body = doc.getBody();//.getTables();
    var docIdbody1 = doc.getActiveSection();
    if(length!=1)
    {var addition=3}else{addition=2}
    //Add a table in document
    var table = body.getTables();
    for(var i=0; i<length+addition; i++){
      var par3 = table[0].getCell(i, 1).getChild(0).asParagraph();
      // right align
      par3.setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
    }
  }
  if(length>1)
  {
    //make bold n to set background color in TOTAL row
    table[0].getRow(3).editAsText().setBold(true);//make bold
    table[0].getRow(3).getCell(0).setBackgroundColor("#efefef")//set backgroundcolor
    table[0].getRow(3).getCell(1).setBackgroundColor("#efefef")//set backgroundcolor
    table[0].getRow(3).getCell(2).setBackgroundColor("#efefef")//set backgroundcolor
  }
  var docId = DocumentApp.openById(doc1);
  var docIdbody = docId.getActiveSection();
  var sourceFolderId=getTemplatesFolderId(conn);
  CUST_moveFileToFolder(doc1,sourceFolderId, Folderid);
  docIdbody.replaceText("todayssll",todaysDate+Slno);
  // parseInt is used to convert string to integer
  /////////////////creation,recheckin/////////////
  if(proratedrentflag==0)///rent check false Less than one month
  {
    if(formname=="EXTENSION")
    {
      docIdbody.replaceText("rent0amount",proratedrent);
      docIdbody.replaceText("customer0start",cdate1)
      docIdbody.replaceText("customer0end",cdate2)
      docIdbody.replaceText("sum",sum)
    }
    else
    {
      docIdbody.replaceText("rent0amount",A5);
      docIdbody.replaceText("customer0start",cdate1)
      docIdbody.replaceText("customer0end",cdate2)
      var pcanddep=parseFloat(das)+parseFloat(pc)+parseFloat(A5);
      docIdbody.replaceText("sum",pcanddep.toFixed(2));
    }
  }
  if(proratedrentflag==2)  /////////rent check true greater than month PRORATED
  {
    var sumamount=das+pc;
    var reminingmonths=0;
    for(var i=0;i<length;i++)
    {
      var startdate=startdate_array[i];
      var enddate=enddate_array[i];
      if(startdate.getDate()!=1 && i==0){var amount=sMonthProratedCalc(check_in_date,A5)}else{amount=A5}
      if(i==length-1)
      {
        var finaldate=new Date(enddate.getFullYear(),enddate.getMonth()+1);
        if(enddate.getDate()==finaldate.getDate()-1)
        {amount=A5}else{amount=eMonthProratedCalc(check_out_date,A5)}
      }
      var checkdate1=Utilities.formatDate(new Date(startdate), TimeZone, "dd/MMM/yyyy");
      var checkdate2=Utilities.formatDate(new Date(enddate), TimeZone, "dd/MMM/yyyy");
      docIdbody.replaceText("rent"+i+"amount",amount);
      docIdbody.replaceText("customer"+i+"start",checkdate1)
      docIdbody.replaceText("customer"+i+"end",checkdate2)
      if(i==0)
      {
        var singlemonth= (parseFloat(sumamount)+parseFloat(amount)).toFixed(2);
        docIdbody.replaceText("singlemonth",singlemonth);
      }
      else
      {
        reminingmonths=parseFloat(reminingmonths)+parseFloat(amount);
        reminingmonths= reminingmonths.toFixed(2);
      }
    }
  }
  if(proratedrentflag==1)   ////NONPRORATED
  {
    var sumamount=das+pc;
    var reminingmonths=0;
    for(var i=0;i<length;i++)
    {
      var startdate=startdate_array[i];
      var enddate=enddate_array[i];
      amount=A5
      if(i==length-1)
      {
        if((startdate.getFullYear()==enddate.getFullYear())&&(startdate.getMonth()==enddate.getMonth()))
        {
          var amount=wMonthProratedCalc(startdate,enddate,A5);
        }
        else if((startdate.getFullYear()!=enddate.getFullYear())||(startdate.getMonth()!=enddate.getMonth()))
        {
          var proratedsmonth=sMonthProratedCalc(startdate,A5);
          var proratedemonth=eMonthProratedCalc(enddate,A5);
          var amount=(parseFloat(proratedsmonth)+parseFloat(proratedemonth)).toFixed(2);
        }
      }
      var checkdate1=Utilities.formatDate(new Date(startdate), TimeZone, "dd/MMM/yyyy");
      var checkdate2=Utilities.formatDate(new Date(enddate), TimeZone, "dd/MMM/yyyy");
      docIdbody.replaceText("rent"+i+"amount",amount);
      docIdbody.replaceText("customer"+i+"start",checkdate1)
      docIdbody.replaceText("customer"+i+"end",checkdate2)
      var sum = sumamount.toFixed(2);
      if(i==0)
      {
        var singlemonth= (parseFloat(sumamount)+parseFloat(amount)).toFixed(2)
        docIdbody.replaceText("singlemonth",singlemonth);
      }
      else
      {
        reminingmonths=(parseFloat(reminingmonths)+parseFloat(amount)).toFixed(2);
      }
    }
  }
  if(company_fetch==" ")
  {
    docIdbody.replaceText("company/",company_fetch);
  }
  else
  {
    docIdbody.replaceText("company",company_fetch); 
  }
  docIdbody.replaceText("name",tenant_fetch)
  .replaceText("custid",custid)
  .replaceText("Todaydate",todaydat)
  .replaceText("customerdate",todaydatestring)
  .replaceText("deposite",A3)
  .replaceText("proces",A4)
  .replaceText("sum",reminingmonths)
  .replaceText("roM",roomtype)
  .replaceText("unit",unit_fetch)
  .replaceText("checkin",cdate1)
  .replaceText("CUST_NAME",tenant_fetch)
  .replaceText("UNIT_NO",unit)
  .replaceText("final",cdate2);
  docId.saveAndClose();
  var userPropertiesinvoiceid = PropertiesService.getUserProperties();
  userPropertiesinvoiceid.setProperty('invoiceid',doc1);
  var userPropertiesinvoicesno = PropertiesService.getUserProperties();
  userPropertiesinvoiceid.setProperty('InvoiceNo',Slno);
}
function getTemplatesFolderId(conn)
{
  var tempfoldidstmt = conn.createStatement();
  var tempfoldid_query = "SELECT FP_FOLDER_ID FROM FILE_PROFILE WHERE FP_ID=1"; 
  var tempfoldid_result = tempfoldidstmt.executeQuery(tempfoldid_query);
  while(tempfoldid_result.next())
  {
    var folderid=(tempfoldid_result.getString("FP_FOLDER_ID"));
  }
  tempfoldid_result.close();
  tempfoldidstmt.close();
  return folderid;
}
//MOVE GENERATED DOC TO TARGET FOLDER
function CUST_moveFileToFolder(fileId,sourceFolderId, targetFolderId) 
{
  var targetFolder = DriveApp.getFolderById(targetFolderId);
  var file = DriveApp.getFileById(fileId);
  targetFolder.addFile(file);
  if(sourceFolderId=="")
  {
    DriveApp.removeFile(file)
  }
  else
  {
    DriveApp.getFolderById(sourceFolderId).removeFile(file)
  }
}
//FUNCTION TO SEND INVOICE MAIL
function CUST_invoicemail(conn,unit,customername,companyname,invoiceid,invoicesno,invoicedate,rent,process,deposit,sdate,edate,roomtype,Leaseperiod,mailid,Folderid,rentcheck,docowner,formname,waived,custid)
{
  var invoicecontect=CUST_invoice(conn,unit,customername,companyname,invoiceid,invoicesno,invoicedate,rent,process,deposit,sdate,edate,roomtype,Leaseperiod,mailid,Folderid,rentcheck,docowner,formname,waived,custid)
  conn.commit();
  var userPropertiesid = PropertiesService.getUserProperties();
  var invoiceidcopy = userPropertiesid.getProperty('invoiceid');
  var userPropertiessno = PropertiesService.getUserProperties();
  var Slno = userPropertiessno.getProperty('InvoiceNo');
  var unit_fetch=unit;
  var tenant_fetch=customername;
  var email_fetch=mailid;
  var invoicearray=CUST_emailsubandmessages(conn);
  var emailsub=invoicearray[2].subject;
  var emailmessage=invoicearray[2].message;
  var mail_username=email_fetch.split('@');
  var linkkk = DriveApp.getFileById(invoiceidcopy);
  var url = linkkk.getUrl(); 
  var sourceFolderId=getTemplatesFolderId(conn);
  CUST_moveFileToFolder(invoiceidcopy,sourceFolderId,Folderid);
  SetDocOwner(invoiceidcopy,docowner,email_fetch);
  var todaysDate =  Utilities.formatDate(new Date(), TimeZone, "yyyyMMdd"); 
  var subcontent1 =  '#'+" "+unit_fetch+" "+ "-"+ " "+tenant_fetch+" "+"- INV"+ todaysDate +Slno;
  var bodycontent1 = '#'+" "+unit_fetch+" "+ "-"+ " "+tenant_fetch+" "+ "- INV"+todaysDate+Slno;
  var subject1 =emailsub.replace('[UNIT NO- CUSTOMER_NAME - INVOICE_NO]',subcontent1);
  var body1 =emailmessage.replace('[UNIT NO - CUSTOMER_NAME]',bodycontent1); 
  body1=body1.replace('[MAILID_USERNAME]',mail_username[0].toUpperCase());
  MailApp.sendEmail(email_fetch, subject1, body1, {name:Get_MailDisplayName("INVOICE"),htmlBody: body1+'<br><br>INVOICE : '+url});
  RemoveEditors(invoiceidcopy,email_fetch,docowner)
}
//FUNCTION TO CALCULATE PRORATED RENT
function proratedmonthcalculation(startdate,enddate) {
  var e_day=enddate.getDate();
  var e_month=enddate.getMonth();
  var e_year=enddate.getFullYear();
  var s_day=startdate.getDate();
  var s_month=startdate.getMonth();
  var s_year=startdate.getFullYear();
  var newstartdate=new Date(s_year,s_month+1,0)
  var startdate_array=[]
  var enddate_array=[];
  if((e_month!=s_month)||(e_year!=s_year))
  {
    var startdates=startdate;
    for(var i=0;i<100;i++)
    {
      startdates=new Date(s_year,s_month+i)
      if(startdates<=enddate)
      {
        if(s_day!=1 && i==0)
        {startdate_array.push(new Date(startdate))}else{startdate_array.push(new Date(startdates))}
        var monthenddate=new Date(s_year,s_month+i+1);
        var month_enddate=(new Date(monthenddate.getFullYear(),monthenddate.getMonth(),monthenddate.getDate()-1));
        if(e_month!=month_enddate.getMonth() || e_year!=month_enddate.getFullYear())
        {enddate_array.push(new Date(s_year,s_month+i+1,monthenddate.getDate()-1))}else{enddate_array.push(new Date(enddate))}
      }
      else
      {
        break;
      }
    }
  }
  else
  {
    startdate_array.push(new Date(startdate))
    enddate_array.push(new Date(enddate)) 
  }
  var return_array=[startdate_array,enddate_array]
  return return_array;
}
//FUNCTION TO CALCULATE NON PRORATED RENT
function nonproratedmonthcalculation(startdate,enddate) 
{
  var e_day=enddate.getDate();
  var e_month=enddate.getMonth();
  var e_year=enddate.getFullYear();
  var s_day=startdate.getDate();
  var s_month=startdate.getMonth();
  var s_year=startdate.getFullYear();
  var newstartdate=new Date(s_year,s_month+1,e_day)
  var startdate_array=[]
  var enddate_array=[];
  var startdates=startdate;
  for(var i=0;i<100;i++)
  {
    startdates=new Date(s_year,s_month+i,s_day)
    if(startdates<=enddate)
    {
      if(s_day!=1 && i==0)
      {
        startdate_array.push(new Date(startdate))
      }
      else
      {
        startdate_array.push(new Date(startdates))
      }
      var monthenddate=new Date(s_year,s_month+i+1,s_day);
      if(monthenddate<enddate)
      {
        enddate_array.push(new Date(s_year,s_month+i+1,monthenddate.getDate()-1))
      }
      else
      {
        enddate_array.push(new Date(enddate))
      }
    }
    else
    {
      break;
    }
  }
  var return_array=[startdate_array,enddate_array];
  return return_array;
}
function CUST_invoicecontractmail(conn,unit,invoiceid,startdate,enddate,compname,customername,invoicesno,invoicedate,noticeno,passportno,passportdate,epno,epdate,noticedate,Leaseperiod,cardno,rent,quarterlyfee,airconfixed,electricity,drycleaning,cleaning,process,deposit,waived,roomtype,Folderid,rentcheck,docowner,mailid,formname,custid)
{
  CUST_invoice(conn,unit,customername,compname,invoiceid,invoicesno,invoicedate,rent,process,deposit,startdate,enddate,roomtype,Leaseperiod,mailid,Folderid,rentcheck,docowner,formname,waived,custid)
  CUST_contract (conn,unit,startdate,enddate,compname,customername,noticeno,passportno,passportdate,epno,epdate,noticedate,Leaseperiod,cardno,rent,quarterlyfee,airconfixed,electricity,drycleaning,cleaning,process,deposit,waived,roomtype,rentcheck,formname,Folderid)
  conn.commit();
  var userPropertiesid = PropertiesService.getUserProperties();
  var invoiceidcopy = userPropertiesid.getProperty('invoiceid');
  var userPropertiessno = PropertiesService.getUserProperties();
  var Slno = userPropertiessno.getProperty('InvoiceNo');
  var userPropertiescontractid = PropertiesService.getUserProperties();
  var contractidcopy = userPropertiescontractid.getProperty('contractid');
  var pdf1 = DriveApp.getFileById(contractidcopy);
  var pdf = DriveApp.getFileById(invoiceidcopy);
  var invoicecontractarray=CUST_emailsubandmessages(conn);
  var emailsub=invoicecontractarray[0].subject;
  var emailmessage=invoicecontractarray[0].message;
  var unit_fetch =unit;
  var customername =customername;
  var email_fetch =mailid;
  var linkkk = DriveApp.getFileById(invoiceidcopy)
  var url = linkkk.getUrl();
  var linkkk1 = DriveApp.getFileById(contractidcopy);
  var url1 = linkkk1.getUrl();
  var sourceFolderId=getTemplatesFolderId(conn);
  CUST_moveFileToFolder(invoiceidcopy,sourceFolderId,Folderid);
  CUST_moveFileToFolder(contractidcopy,sourceFolderId, Folderid);
  SetDocOwner(invoiceidcopy,docowner,email_fetch);
  SetDocOwner(contractidcopy,docowner,email_fetch);
  var mail_username=email_fetch.split('@');
  var todaysDate =  Utilities.formatDate(new Date(), TimeZone, "yyyyMMdd"); 
  var subcontent3 = '#'+" "+ unit_fetch+" "+ "-"+ " "+customername+" "+"- INV"+ todaysDate +Slno;
  var bodycontent3 = '#'+" "+unit_fetch+" "+ "-"+ " "+customername+" "+ "- INV"+todaysDate+Slno;
  var subject3 =emailsub.replace('[UNIT NO - CUSTOMER NAME - INVOICE NO]',subcontent3);
  var body3 =emailmessage.replace('[UNIT NO - CUSTOMER_NAME]',bodycontent3); 
  body3=body3.replace('[MAILID_USERNAME]',mail_username[0].toUpperCase());
  MailApp.sendEmail(email_fetch, subject3, body3, {name:Get_MailDisplayName('INVOICE_N_CONTRACT'),htmlBody: body3+'<br><br>INVOICE : '+url+'<br><br>CONTRACT : '+url1});
  RemoveEditors(invoiceidcopy,email_fetch,docowner);
  RemoveEditors(contractidcopy,email_fetch,docowner)
}
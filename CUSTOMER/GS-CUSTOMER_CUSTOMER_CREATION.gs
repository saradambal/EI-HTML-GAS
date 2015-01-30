//*******************************************FILE DESCRIPTION*********************************************//
//*******************************************CUSTOMER CREATION*********************************************//
//DONE BY:PUNI
//VER 2.1-SD:22/12/2014 ED:22/12/2014;TRACKER NO:833;added droptemp table function from eilib
//VER 2.0-SD:08/10/2014 ED:08/10/2014,TRACKER NO:833-changed proloader position.
//DONE BY:KUMAR
//VER 1.09-SD:06/10/2014 ED:06/10/2014,TRACKER NO:833-updated proloader and message box position.
//VER 1.08-SD:13/09/2014 ED:13/09/2014,TRACKER NO:833-Did notice period validation.
//VER 1.07- SD:28/08/2014 ED:28/08/2014,TRACKER NO:833- in catch block get log method implemented.
//VER 1.06- SD:11/08/2014 ED:11/08/2014,TRACKER NO:814-implemented rollback and commit comment in script side.
//VER 1.05- SD:31/07/2014 ED:31/07/2014,TRACKER NO:814-Cleared Checkout date equal to unit enddate issue.
//VER 1.04- SD:03/07/2014 ED:03/07/2014,TRACKER NO:814-changed processing fee amount text box max digits 5 to 4.
//VER 1.03- SD:17/06/2014 ED:17/06/2014,TRACKER NO:814-Updated error msg if calendar or inv or contract doc id wrong means and updated new email id validation script And ep date and passport date validation.
//VER 1.02- SD:05/06/2014 ED:05/06/2014,TRACKER NO:814-updated new common jquery link and set max date for epdate and passport date.
//VER 1.01- SD:24/05/2014 ED:24/05/2013.TRACKER NO:814-Changed Customer SD getting from Customer Configuration table.
//VER 1.00- SD:10/04/2014 ED:10/04/2014.TRACKER NO:814-Restricted manual inputs in DP using common jquery class.customerTerminationDetails table name changes tested sp in script side
//and did Passport date and EP date validation
//VER 0.09- SD:19/03/2014 ED:19/03/2014.TRACKER NO:728-Did changes in Invoice Document.
//VER 0.08- SD:04/03/2014 ED:05/03/2014.TRACKER NO:728-Did new CR checkin date should  less than 6 months and checkout should hide if checkin date is null.and changed ULD_ID in creation form.
// and Removed endtime gs cal function and used array concept,Changed userperties to PropertiesService in invoice and contract
//VER 0.07- SD:04/02/2014 ED:04/02/2014.TRACKER NO:728-Did accesscard print null value in contract issue and resized all textbox width after clear form. 
//VER 0.06- SD:20/01/2014 ED:20/01/2014.TRACKER NO:697-chnaged conformation msg,did checkout date validation,did button validation in ver0.06 
//VER 0.05- SD:09.01.2014 ED:09/01/2014,TRACKER NO:697-Did checkout validation issue and customer undefined issue and preloader image in ver0.05
//VER 0.04- SD:28/12/2013 ED:28/12/2013,TRACKER NO:300-Did new CR in ver0.04 
//VER 0.03- SD:09/12/2013 ED:13/12/2013,TRACKER NO:300-Did new CR in ver0.03
//VER 0.02- SD:03/12/2013 ED:03/12/2013,TRACKER NO:300Added Return function script in ver0.02
//VER 0.01-INITIAL VERSION-SD:31/09/2013 ED:02/09/2013,TRACKER NO:300
//*********************************************************************************************************//
try
{ 
  var customer_id;
  var calendarname;
  var checkstatusflag;
  var invoiceflag;
  var CCRE_expconn;
  var temptablename;
  var calevent_array;
//  function doGet()
//  {
//    return HtmlService.createTemplateFromFile('HTML-CUSTOMER_CUSTOMER_CREATION').evaluate();
//  }
  /************************FUNCTION TO GET ROOMTYPE FOR SELECTED UNIT*****************************/
  function CCRE_Roomtype(CCRE_unit,CCRE_nullpara)
  {
    var CCRE_conn = eilib.db_GetConnection();
    var CCRE_roomtypearray =[];
    CCRE_roomtypearray=eilib.CUST_getRoomType(CCRE_conn,CCRE_unit, CCRE_nullpara);
    var CCRE_unitstart_enddate=eilib.GetUnitSdEdate(CCRE_conn,CCRE_unit);
    var startdate=eilib.SqlDateFormat(CCRE_unitstart_enddate.unitsdate)
    var enddate=eilib.SqlDateFormat(CCRE_unitstart_enddate.unitedate)
    var CCRE_unitstart_enddate_array=[startdate,enddate]
    var return_array=[CCRE_roomtypearray,CCRE_unitstart_enddate_array];
    return return_array;
    CCRE_conn.close();
  }
  /************************FUNCTION TO GET ACCESSCARD FOR SELECTED UNIT*****************************/
  function CCRE_CardNumber(CCRE_unit,CCRE_firstname,CCRE_lastname)
  {
    var CCRE_conn = eilib.db_GetConnection();
    var CCRE_cardnoresult=[];
    CCRE_cardnoresult=eilib.CUST_getunitCardNo(CCRE_conn,CCRE_unit, CCRE_firstname, CCRE_lastname);
    return CCRE_cardnoresult;
    CCRE_conn.close();
  }
  /************************FUNCTION TO CALCULATE PRORATED BASED ON STARTDATE AND ENDDATE*****************************/
  function CCRE_prorated(CCRE_startdate,CCRE_enddate)
  {
    var CCRE_chkproflag="";
    CCRE_chkproflag=eilib.CUST_chkProrated(CCRE_startdate, CCRE_enddate);
    return CCRE_chkproflag;
  }
  
  function CCRE_customercreation_commonvalues()
  {
    var CCRE_conn = eilib.db_GetConnection();
    /************************ERROR MESSAGE*****************************/
    var CCRE_error_code ='1,2,6,33,34,35,36,37,321,324,339,342,343,344,345,346,347,348,400,443,444,458,459,460,461';
    var CCRE_error_array=eilib.GetErrorMessageList(CCRE_conn, CCRE_error_code);
    var CCRE_nation_array =eilib.CUST_getNationality(CCRE_conn);
    var CCRE_option_array =eilib.CUST_getOptionValue(CCRE_conn);
    var CCRE_mail_array =eilib.getProfileEmailId(CCRE_conn,'CREATION');
    var CCRE_timearray=eilib.CUST_getCalendarTime(CCRE_conn);
    var proratedwaived=eilib.CUST_getProratedWaivedValue(CCRE_conn);
    var CCRE_unit_array=eilib.GetActiveUnit(CCRE_conn);
    var CCRE_customerSD=eilib.getCustomerStartdate(CCRE_conn);
    var CCRE_RESULTS={prorated:proratedwaived,unit:CCRE_unit_array,time:CCRE_timearray,email:CCRE_mail_array,ccoption:CCRE_option_array,nation:CCRE_nation_array,error:CCRE_error_array.errormsg,CustomerSD:CCRE_customerSD}
    return CCRE_RESULTS;
    CCRE_conn.close();
  }
}
catch (err)
{
}
/************************CUSTOMER CREATION SAVING PART*****************************/
function CCRE_processFormSubmit(customercreation)
{
  try
  {
    var CCRE_card_array=customercreation.temptex;
    var CCRE_accesscard="";
    var CCRE_guestcard="";
    if(CCRE_card_array==undefined)
    { var flag=1; }
    var CCRE_firstname=customercreation.CCRE_tb_firstname;
    var CCRE_lastname=customercreation.CCRE_tb_lastname;
    var CCRE_custname=CCRE_firstname+' '+CCRE_lastname;
    if(CCRE_card_array!=undefined)
    {
      var CCRE_find=(CCRE_card_array.toString()).search(',');
      if(CCRE_find!=-1)
      {
        flag=0;
        for(var i=0;i<CCRE_card_array.length;i++)
        {
          if(CCRE_card_array[i]=="")continue;
          var CCRE_card=CCRE_card_array[i].split('/');
          if(CCRE_card[1]==CCRE_custname)
          {
            if(CCRE_accesscard=="")
            {
              CCRE_accesscard=CCRE_card[0];
              CCRE_guestcard=CCRE_card[0]+','+' ';
              var cardno=CCRE_card[0];
            }
            else
            {
              CCRE_accesscard=CCRE_accesscard+','+CCRE_card[0];
              CCRE_guestcard=CCRE_guestcard+','+CCRE_card[0]+', ';
              cardno=CCRE_card[0];
            }
          }
          else
          {
            if(CCRE_accesscard=="")
            {
              CCRE_guestcard=CCRE_card[0]+',X';
              CCRE_accesscard=CCRE_card[0];
            }
            else
            {
              CCRE_accesscard=CCRE_accesscard+','+CCRE_card[0];
              CCRE_guestcard=CCRE_guestcard+','+CCRE_card[0]+',X';
            }
          }
        }
      }
      else
      {
        flag=0;
        var CCRE_singleard=CCRE_card_array.split('/');
        CCRE_accesscard=CCRE_singleard[0];
        CCRE_guestcard=CCRE_singleard[0]+', ';
        cardno=CCRE_singleard[0];
      }
    }
    else
    { cardno=""; }
    var CCRE_conn =eilib.db_GetConnection();
    CCRE_expconn=CCRE_conn;
    CCRE_conn.setAutoCommit(false);
    var CCRE_firstname=customercreation.CCRE_tb_firstname;
    var CCRE_lastname=customercreation.CCRE_tb_lastname;
    var CCRE_name=CCRE_firstname+' '+CCRE_lastname;
    var CCRE_customermailid=customercreation.CCRE_tb_custmailid;
    var CCRE_dateofbirth=customercreation.CCRE_db_BirthDate;
    if(CCRE_dateofbirth=="")
    {    CCRE_dateofbirth=null;  }else{CCRE_dateofbirth="'"+eilib.SqlDateFormat(CCRE_dateofbirth)+"'";}
    var CCRE_nationality=eilib.ConvertSpclCharString(customercreation.CCRE_lb_nationselect);
    var CCRE_passportno=customercreation.CCRE_tb_passportno;
    if(CCRE_passportno=="")
    {  CCRE_passportno=null;var passportno="";  }else{passportno=CCRE_passportno;CCRE_passportno="'"+CCRE_passportno+"'";}
    var CCRE_passportdate=customercreation.CCRE_db_passportdate;
    if(CCRE_passportdate=="")
    {    CCRE_passportdate=null; var passportdate="";  }else{passportdate=CCRE_passportdate;CCRE_passportdate="'"+eilib.SqlDateFormat(CCRE_passportdate)+"'";}
    var CCRE_companyname=customercreation.CCRE_tb_companyname;
    if(CCRE_companyname=="")
    {    CCRE_companyname=null;var CCRE_compname="";  }else{CCRE_compname=CCRE_companyname;CCRE_companyname="'"+CCRE_companyname+"'";}
    var CCRE_companyaddress=customercreation.CCRE_tb_companyaddress;
    if(CCRE_companyaddress=="")
    {    CCRE_companyaddress=null;  }else{CCRE_companyaddress="'"+CCRE_companyaddress+"'";}
    var CCRE_companypostalcode=customercreation.CCRE_tb_companypostalcode;
    if(CCRE_companypostalcode=="")
    {    CCRE_companypostalcode=null;  }else{CCRE_companypostalcode="'"+CCRE_companypostalcode+"'";}
    var CCRE_mobile=customercreation.CCRE_tb_mobile;
    if(CCRE_mobile=="")
    {    CCRE_mobile=null;var cal_mobile="";}else{cal_mobile=CCRE_mobile;CCRE_mobile="'"+CCRE_mobile+"'";}
    var CCRE_intmobile=customercreation.CCRE_tb_intmobile;
    if(CCRE_intmobile=="")
    {    CCRE_intmobile=null;var cal_intmobile=""}else{cal_intmobile=CCRE_intmobile;CCRE_intmobile="'"+CCRE_intmobile+"'";}
    var CCRE_office=customercreation.CCRE_tb_office;
    if(CCRE_office=="")
    {    CCRE_office=null;var cal_office="";}else{cal_office=CCRE_office;CCRE_office="'"+CCRE_office+"'";}
    var CCRE_epno=customercreation.CCRE_tb_epno;
    if(CCRE_epno=="")
    {    CCRE_epno=null;var epno=""; }else{epno=CCRE_epno;CCRE_epno="'"+CCRE_epno+"'";}
    var CCRE_epdate=customercreation.CCRE_db_epdate;
    if(CCRE_epdate=="")
    {    CCRE_epdate=null;var epdate=""}else{epdate=CCRE_epdate;CCRE_epdate="'"+eilib.SqlDateFormat(CCRE_epdate)+"'";}
    var CCRE_unit=customercreation.CCRE_lb_unitselect;
    var CCRE_roomtype=customercreation.CCRE_lb_roomselect;
    var CCRE_startdate=eilib.SqlDateFormat(customercreation.CCRE_db_startdate);
    var CCRE_enddate=eilib.SqlDateFormat(customercreation.CCRE_db_enddate);
    var CCRE_noticeno=customercreation.CCRE_tb_noticeno;
    if(CCRE_noticeno=="")
    {    CCRE_noticeno=null;var noticeno="";}else{noticeno=CCRE_noticeno;CCRE_noticeno="'"+CCRE_noticeno+"'"}
    var CCRE_noticedate=customercreation.CCRE_db_noticedate;
    if(CCRE_noticedate=="" || CCRE_noticedate==undefined)
    {    CCRE_noticedate=null;var noticedate="";  }else{noticedate=CCRE_noticedate;CCRE_noticedate="'"+eilib.SqlDateFormat(CCRE_noticedate)+"'";}
    var CCRE_quarterlyfee=customercreation.CCRE_tb_quarterlyfee;
    if(CCRE_quarterlyfee=="")
    { CCRE_quarterlyfee=null; }
    var CCRE_airconfixed=customercreation.CCRE_tb_aircon_fixed;
    if(CCRE_airconfixed=="")
    {  CCRE_airconfixed=null;}
    var CCRE_electricity=customercreation.CCRE_tb_electricity;
    if(CCRE_electricity=="")
    { CCRE_electricity=null;}
    var CCRE_drycleaning=customercreation.CCRE_tb_drycleaning;
    if(CCRE_drycleaning=="")
    {  CCRE_drycleaning=null;}
    var CCRE_cleaning=customercreation.CCRE_tb_cleaning;
    if(CCRE_cleaning=="")
    {  CCRE_cleaning=null;}
    var CCRE_deposit=customercreation.CCRE_tb_deposit;
    if(CCRE_deposit=="")
    {  CCRE_deposit=null;}
    var CCRE_rent=customercreation.CCRE_tb_rent;
    var CCRE_process=customercreation.CCRE_tb_process;
    if(CCRE_process=="")
    {  CCRE_process=null}
    var CCRE_ccoption=customercreation.CCRE_lb_ccoptionselect;
    var CCRE_mailid=customercreation.CCRE_lb_mailselect;
    var CCRE_comments=customercreation.CCRE_ta_comments;
    if(CCRE_comments!="")
    { CCRE_comments=eilib.ConvertSpclCharString(CCRE_comments);}
    var CCRE_startdate_starttime=customercreation.CCRE_lb_startselect;
    var CCRE_startdate_endtime=customercreation.CCRE_lb_startselect1;
    var CCRE_enddate_starttime=customercreation.CCRE_lb_endselect
    var CCRE_enddate_endtime=customercreation.CCRE_lb_endselect1;
    var CCRE_check='X';
    var CCRE_process_check=customercreation.CCRE_waivedchkbox;
    if(CCRE_process_check==undefined)
    { var waived=""; CCRE_process_check=null; }
    else
    { waived=CCRE_check; CCRE_process_check="'"+CCRE_check+"'";}
    var CCRE_prorated=customercreation.tempcheckbox2;
    var CCRE_PRORATED=customercreation.CCRE_proratedcheckbox;
    if((CCRE_prorated==undefined)&&(CCRE_PRORATED==undefined))
    { var rentcheck='false'; CCRE_prorated=null;}
    else
    { rentcheck='true'; CCRE_prorated="'"+CCRE_check+"'";}
    var CCRE_sdate=eilib.SqlDateFormat(CCRE_startdate).split('-');
    var CCRE_edate=eilib.SqlDateFormat(CCRE_enddate).split('-');
    var startdate_ccre=new Date(CCRE_sdate[2],CCRE_sdate[1]-1,CCRE_sdate[0]);
    var enddate_ccre=new Date(CCRE_edate[2],CCRE_edate[1]-1,CCRE_edate[0]);
    var CCRE_quators  = eilib.quarterCalc(new Date(CCRE_sdate[2],CCRE_sdate[1]-1,CCRE_sdate[0]),new Date(CCRE_edate[2],CCRE_edate[1]-1,CCRE_edate[0])); 
    var CCRE_Leaseperiod  = eilib.leasePeriodCalc(new Date(CCRE_sdate[2],CCRE_sdate[1]-1,CCRE_sdate[0]),new Date(CCRE_edate[2],CCRE_edate[1]-1,CCRE_edate[0]));
    var CCRE_customerstmt=CCRE_conn.createStatement();
    var CCRE_insertquery="CALL SP_CUSTOMER_CREATION_INSERT('"+CCRE_firstname+"','"+CCRE_lastname+"',"+CCRE_companyname+","+CCRE_companyaddress+","+CCRE_companypostalcode+","+CCRE_office+","+CCRE_unit+",'"+CCRE_roomtype+"','"+CCRE_startdate_starttime+"','"+CCRE_startdate_endtime+"','"+CCRE_enddate_starttime+"','"+CCRE_enddate_endtime+"','"+CCRE_Leaseperiod+"',"+CCRE_quators+","+CCRE_process_check+","+CCRE_prorated+","+CCRE_noticeno+","+CCRE_noticedate+","+CCRE_rent+","+CCRE_deposit+","+CCRE_process+","+CCRE_airconfixed+","+CCRE_quarterlyfee+","+CCRE_electricity+","+CCRE_cleaning+","+CCRE_drycleaning+",'"+CCRE_accesscard+"','"+CCRE_startdate+"','"+UserStamp+"','"+CCRE_startdate+"','"+CCRE_enddate+"','"+CCRE_guestcard+"','"+CCRE_nationality+"',"+CCRE_mobile+","+CCRE_intmobile+",'"+CCRE_customermailid+"',"+CCRE_passportno+","+CCRE_passportdate+","+CCRE_dateofbirth+","+CCRE_epno+","+CCRE_epdate+",'"+CCRE_comments+"',@CUSTOMER_CREATION_TEMPTBLNAME,@CUSTOMER_SUCCESSFLAG)";
    CCRE_customerstmt.execute(CCRE_insertquery);
    var returnflagresult=CCRE_customerstmt.executeQuery("SELECT @CUSTOMER_CREATION_TEMPTBLNAME,@CUSTOMER_SUCCESSFLAG");
    if(returnflagresult.next())
    {
      var temp_tablename=returnflagresult.getString(1);
      var returnflag=returnflagresult.getString(2);
    }
    returnflagresult.close();
    CCRE_customerstmt.close();
    temptablename=temp_tablename;
    if(returnflag==1)
    {
      var CCRE_customername=CCRE_firstname+' '+CCRE_lastname;
      var CCRE_cccustidstmt=CCRE_conn.createStatement();
      var CCRE_custidquery="SELECT *FROM CUSTOMER ORDER BY CUSTOMER_ID DESC LIMIT 1";
      var CCRE_custidresult=CCRE_cccustidstmt.executeQuery(CCRE_custidquery);
      if(CCRE_custidresult.next())
      {
        var CCRE_customerflag=1;
        var CCRE_custid=CCRE_custidresult.getString("CUSTOMER_ID");
        var CCRE_cust_name=CCRE_custidresult.getString("CUSTOMER_FIRST_NAME")+' '+CCRE_custidresult.getString("CUSTOMER_LAST_NAME");
      }
      CCRE_custidresult.close();
      CCRE_cccustidstmt.close();
      customer_id=CCRE_custid;
      //////////////INVOICE AND CONTRACT DETAILS///////////////
      var cust_config_array=eilib.CUST_invoice_contractreplacetext(CCRE_conn);
      var CCRE_invoiceid=cust_config_array[9];
      var CCRE_contractid=cust_config_array[10];
      var CCRE_invoicesno=cust_config_array[0];
      var CCRE_invoicedate=cust_config_array[1];
      var calenderIDcode=eilib.CUST_getCalenderId(CCRE_conn);
      calendarname=calenderIDcode;
      eilib.CUST_customercalendercreation(CCRE_custid, calenderIDcode, CCRE_startdate, CCRE_startdate_starttime, CCRE_startdate_endtime, CCRE_enddate, CCRE_enddate_starttime, CCRE_enddate_endtime, CCRE_firstname, CCRE_lastname, cal_mobile, cal_intmobile, cal_office, CCRE_customermailid, CCRE_unit,CCRE_roomtype,' ')
      checkstatusflag=1;
      calevent_array=[[CCRE_startdate, CCRE_startdate_starttime, CCRE_startdate_endtime],[CCRE_enddate, CCRE_enddate_starttime, CCRE_enddate_endtime]];
      if((CCRE_customerflag==1)&&(CCRE_custname==CCRE_cust_name))
      {
        if(CCRE_ccoption==4 || CCRE_ccoption==5 || CCRE_ccoption==6)
        {
          var CCRE_docowner=eilib.CUST_documentowner(CCRE_conn);
          var Folderid=eilib.CUST_TargetFolderId(CCRE_conn);
          if(CCRE_ccoption==4)
          {
            eilib.CUST_invoicemail(CCRE_conn,CCRE_unit,CCRE_customername,CCRE_compname,CCRE_invoiceid,CCRE_invoicesno,CCRE_invoicedate,CCRE_rent,CCRE_process,CCRE_deposit,CCRE_startdate,CCRE_enddate,CCRE_roomtype,CCRE_Leaseperiod,CCRE_mailid,Folderid,rentcheck,CCRE_docowner,'CREATION',waived,CCRE_custid)
          }
          if(CCRE_ccoption==5)
          {
            eilib.CUST_contractmail(CCRE_conn,CCRE_unit,CCRE_startdate,CCRE_enddate,CCRE_compname,CCRE_customername,noticeno,passportno,passportdate,epno,epdate,noticedate,CCRE_Leaseperiod,cardno,CCRE_rent,CCRE_quarterlyfee,CCRE_airconfixed,CCRE_electricity,CCRE_drycleaning,CCRE_cleaning,CCRE_process,CCRE_deposit,waived,CCRE_roomtype,rentcheck,CCRE_mailid,'CREATION',Folderid,CCRE_docowner)
          }
          if(CCRE_ccoption==6)
          {
            eilib.CUST_invoicecontractmail(CCRE_conn,CCRE_unit,CCRE_invoiceid,CCRE_startdate,CCRE_enddate,CCRE_compname,CCRE_customername,CCRE_invoicesno,CCRE_invoicedate,noticeno,passportno,passportdate,epno,epdate,noticedate,CCRE_Leaseperiod,cardno,CCRE_rent,CCRE_quarterlyfee,CCRE_airconfixed,CCRE_electricity,CCRE_drycleaning,CCRE_cleaning,CCRE_process,CCRE_deposit,waived,CCRE_roomtype,Folderid,rentcheck,CCRE_docowner,CCRE_mailid,'CREATION',CCRE_custid)
          }
        }
      }
      returnflag=1;
    }
    if(temptablename!=null || temptablename!=undefined)
    {
      eilib.DropTempTable(CCRE_expconn,temptablename);       
    }
    CCRE_conn.commit();
   return returnflag;
   CCRE_conn.close();
  }
  catch(err)
  {
    Logger.log("SCRIPT EXCEPTION:"+err)
    CCRE_expconn.rollback();
    if(temptablename!=null || temptablename!=undefined)
    {
      eilib.DropTempTable(CCRE_expconn,temptablename);   
    }
    if(checkstatusflag==1)
    {
      eilib.CUST_CREATION_customercalenderdeletion(customer_id,calendarname,calevent_array);
    }   
    var invoice=eilib.invoiceid();
    var contract=eilib.contractid();
    if(invoice!=undefined)
    {
      eilib.CUST_UNSHARE_FILE(invoice);
    }
    if(contract!=undefined)
    {
      eilib.CUST_UNSHARE_FILE(contract);
    }
    return (Logger.getLog());
  }
}

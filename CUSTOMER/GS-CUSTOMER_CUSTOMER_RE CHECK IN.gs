//******************************************CUSTOMER RECHECK IN*************************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY:PUNI
//VER 2.3-SD:7/03/2015 ED:07/03/2015-updated autocommit false for new connection string
//VER 2.2-SD:22/12/2014 ED:22/12/2014;TRACKER NO:833;added droptemp table function from eilib
//VER 2.1-SD:08/10/2014 ED:08/10/2014,TRACKER NO:833-corrected preloader position
//DONE BY:KUMAR
//VER 2.00-SD:06/10/2014 ED:06/10/2014,TRACKER NO:833-updated proloader and message box position.
//VER 1.09-SD:13/09/2014 ED:13/09/2014,TRACKER NO:833-Did notice period validation.
//VER 1.08- sd:06/09/2014 ed:06/09/2014,TRACKER updated card error message in recheck in form
//VER 1.07- SD:28/08/2014 ED:28/08/2014,TRACKER NO:833- in catch block get log method implemented.
//VER 1.06- SD:11/08/2014 ED:11/08/2014,TRACKER NO:814-implemented rollback and commit comment in script side.
//VER 1.05- SD:03/07/2014 ED:03/07/2014,TRACKER NO:681-changed processing fee amount text box max digits 5 to 4.
//VER 1.04- SD:17/06/2014 ED:17/06/2014,TRACKER NO:681-Updated error msg if calendar or inv or contract doc id wrong means and updated new email id validation script And ep date and passport date validation.
//VER 1.03- SD:05/06/2014 ED:05/06/2014,TRACKER NO:681-updated new common jquery link and set max date for epdate and passport date.
//VER 1.02- SD:24/05/2014 ED:24/05/2013.TRACKER NO:681-Changed Customer SD getting from Customer Configuration table.
//VER 1.01- SD:10/04/2014 ED:10/04/2014.TRACKER NO:681-Restricted manual inputs in DP using common jquery class.customerTerminationDetails table name changes tested sp in script side
//and did Passport date and EP date validation
//VER 1.00- SD:22/03/2014 ED:22/03/2014.TRACKER NO:681-Removed extra return functions in Return function script and Did passportdate and ep date validation.
//VER 0.09- SD:04/03/2014 ED:06/03/2014.TRACKER NO:681-Did new CR checkin date should  less than 6 months and checkout should hide if checkin date is null.and changed ULD_ID in creation form.
// and Removed endtime gs cal function and used array concept,Changed userperties to PropertiesService in invoice and contract
//VER 0.08- SD:22-02-2014 ED:22/02/2014,TRACKER NO:681-Updated comments in gs file.
//VER 0.07- SD:06/02/2014 ED:06/02/2014,TRACKER NO:681-did all personal details and company details showing in recheckin form.
//VER 0.06- SD:02/02/2014 ED:04/02/2014,TRACKER NO:681-Did new CR(error msg geting from eilib and creation form issues cleared in recheckin alos like validation etc..)
//VER 0.05- SD:29/12/2013 ED:29/12/2013,TRACKER NO:681-Removed multiple conn and delivered in ver 0.05
//VER 0.04- SD:17/12/2013 ED:17/17/2013,TRACKER NO:681-Fixed header issue in ver 0.04
//VER 0.03- SD:09/12/2013 ED:13/12/2013,TRACKER NO:317-Did new CR in ver0.03
//VER 0.02- SD:03/12/2013 ED:03/12/2013,TRACKER NO:317Added Return function script in ver0.02
//VER 0.01-INITIAL VERSION-SD:31/07/2013 ED:04/09/2013,TRACKER NO:317
//*********************************************************************************************************//
try
{
  var CR_customer_id;
  var CR_calendarname;
  var CR_checkstatusflag;
  var CR_invoiceflag;
  var CR_CCRE_expconn;
  var CR_temptablename;
  var CR_calevent_array;
  /**********************************FUNCTION TO GET TERMINATED CUSTOMER FOR SELECTED UNIT*********************************************/
  function CRCHK_Customer(unit)
  {
    var CRCHK_conn =eilib.db_GetConnection();
    var CRCHK_customer_array =[];
    var CRCHK_customerstmt = CRCHK_conn.createStatement();
    var CRCHK_allrecheckinunit="SELECT UNIT_NO,CUSTOMER_ID,CUSTOMERNAME,CED_REC_VER FROM VW_RECHECKIN_CUSTOMER ORDER BY UNIT_NO";
    var CRCHK_customerquery = "SELECT UNIT_NO,CUSTOMER_ID,CUSTOMERNAME,CED_REC_VER FROM VW_RECHECKIN_CUSTOMER WHERE UNIT_NO="+unit+" ORDER BY CUSTOMERNAME ASC";
    if(unit=='nounit')
    {  var CRCHK_customerresult = CRCHK_customerstmt.executeQuery(CRCHK_allrecheckinunit);  }
    else
    {  var CRCHK_customerresult = CRCHK_customerstmt.executeQuery(CRCHK_customerquery);    }
    while(CRCHK_customerresult.next())
    {
      CRCHK_customer_array.push({unit:CRCHK_customerresult.getString("UNIT_NO"),customerid:CRCHK_customerresult.getString("CUSTOMER_ID"),name:CRCHK_customerresult.getString("CUSTOMERNAME"),recver:CRCHK_customerresult.getString("CED_REC_VER")});
    }
    CRCHK_customerresult.close();
    CRCHK_customerstmt.close();
    return CRCHK_customer_array;
    CRCHK_conn.close();
  }
  /**********************************FUNCTION TO GET FULL DETAILS OF SELECTED CUSTOMER*********************************************/
  function CRCHK_olddetails(id,cust_rec_ver)
  {
    var CRCHK_conn =eilib.db_GetConnection();
    var CRCHK_detailsstmt=CRCHK_conn.createStatement();
    var CRCHK_details_array=[];
    var CRCHK_detailsquery="SELECT C.CUSTOMER_FIRST_NAME,C.CUSTOMER_LAST_NAME,CCD.CCD_COMPANY_NAME,CCD.CCD_COMPANY_ADDR,CCD.CCD_POSTAL_CODE,CCD.CCD_OFFICE_NO,CPD.CPD_MOBILE,CPD.CPD_INTL_MOBILE,CPD.CPD_PASSPORT_NO,CPD.CPD_PASSPORT_DATE,CPD.CPD_DOB,CPD.CPD_EMAIL,NC.NC_DATA,C.CUSTOMER_ID,CPD.CPD_COMMENTS,CPD.CPD_EP_NO,CPD.CPD_EP_DATE from CUSTOMER_ENTRY_DETAILS CED left join CUSTOMER_COMPANY_DETAILS CCD on CED.CUSTOMER_ID=CCD.CUSTOMER_ID left join CUSTOMER C on CED.CUSTOMER_ID=C.CUSTOMER_ID left join CUSTOMER_PERSONAL_DETAILS CPD on CED.CUSTOMER_ID=CPD.CUSTOMER_ID ,NATIONALITY_CONFIGURATION NC where (C.CUSTOMER_ID='"+id+"') AND (CPD.NC_ID=NC.NC_ID) AND CED.CED_REC_VER="+cust_rec_ver+"";
    var CRCHK_detailsresult=CRCHK_detailsstmt.executeQuery(CRCHK_detailsquery);
    if(CRCHK_detailsresult.next())
    {
      var CRCHK_firstname=CRCHK_detailsresult.getString(1);
      var CRCHK_lastname=CRCHK_detailsresult.getString(2);
      var CRCHK_companyname=CRCHK_detailsresult.getString(3);
      if(CRCHK_companyname==null){CRCHK_companyname="";}
      var CRCHK_companyaddress=CRCHK_detailsresult.getString(4);
      if(CRCHK_companyaddress==null) {CRCHK_companyaddress="";}
      var CRCHK_postalcode=CRCHK_detailsresult.getString(5);
      if(CRCHK_postalcode==null){CRCHK_postalcode="";}
      var CRCHK_office=CRCHK_detailsresult.getString(6);
      if(CRCHK_office==null){CRCHK_office="";}
      var CRCHK_mobile=CRCHK_detailsresult.getString(7);
      if(CRCHK_mobile==null){CRCHK_mobile="";}
      var CRCHK_intmobile=CRCHK_detailsresult.getString(8);
      if(CRCHK_intmobile==null){CRCHK_intmobile="";}
      var CRCHK_passportno=CRCHK_detailsresult.getString(9);
      if(CRCHK_passportno==null){CRCHK_passportno="";}
      var CRCHK_passportdate=CRCHK_detailsresult.getString(10);
      if(CRCHK_passportdate==null){CRCHK_passportdate="";}
      var CRCHK_dob=CRCHK_detailsresult.getString(11);
      if(CRCHK_dob==null){CRCHK_dob="";}
      var CRCHK_mail=CRCHK_detailsresult.getString(12);
      var CRCHK_nation=CRCHK_detailsresult.getString(13);
      var CRCHK_custid=CRCHK_detailsresult.getString(14);
      var CRCHK_comments=CRCHK_detailsresult.getString(15);
      var CRCHK_epno=CRCHK_detailsresult.getString(16);
      if(CRCHK_epno==null){CRCHK_epno="";}
      var CRCHK_epdate=CRCHK_detailsresult.getString(17);
      if(CRCHK_epdate==null) {CRCHK_epdate="";}
      CRCHK_details_array.push({firstname:CRCHK_firstname,lastname:CRCHK_lastname,company:CRCHK_companyname,address:CRCHK_companyaddress,postal:CRCHK_postalcode,office:CRCHK_office,mobile:CRCHK_mobile,intmobile:CRCHK_intmobile,passportno:CRCHK_passportno,passportdate:CRCHK_passportdate,dob:CRCHK_dob,mailid:CRCHK_mail,nationality:CRCHK_nation,customerid:CRCHK_custid,comments:CRCHK_comments,epno:CRCHK_epno,epdate:CRCHK_epdate})
    }
    CRCHK_detailsresult.close();
    CRCHK_detailsstmt.close();
    var pre_recverenddatequery="SELECT CLP_ENDDATE,CLP_PRETERMINATE_DATE FROM CUSTOMER_LP_DETAILS WHERE CUSTOMER_ID="+id+" AND CED_REC_VER="+cust_rec_ver+" AND CLP_GUEST_CARD IS NULL"
    var pre_recverenddatestmt=CRCHK_conn.createStatement();
    var pre_recverenddateres=pre_recverenddatestmt.executeQuery(pre_recverenddatequery);    
    if(pre_recverenddateres.next())
    {
      var pre_terminate=pre_recverenddateres.getString(2)
      if(pre_terminate==null)
      {  var pre_enddate=eilib.SqlDateFormat(pre_recverenddateres.getString(1)); }
      else
      {  pre_enddate=eilib.SqlDateFormat(pre_terminate); }
    }
    else
    {    pre_enddate=""; }
    pre_recverenddateres.close();
    pre_recverenddatestmt.close();
    var returnoldvalues=[CRCHK_details_array,pre_enddate];
    return returnoldvalues;
    CRCHK_conn.close();
  }
  /**********************************FUNCTION TO GET ROOMTYPE FOR SELECTED UNIT*********************************************/
  function CRCHK_Roomtype(CRCHK_unit,CRCHK_nullpara)
  {
    var CRCHK_conn =eilib.db_GetConnection();
    var CRCHK_roomtypearray =[];
    CRCHK_roomtypearray=eilib.CUST_getRoomType(CRCHK_conn,CRCHK_unit, CRCHK_nullpara);
    var CRCHK_unitstart_enddate=eilib.GetUnitSdEdate(CRCHK_conn,CRCHK_unit);
    var startdate=eilib.SqlDateFormat(CRCHK_unitstart_enddate.unitsdate)
    var enddate=eilib.SqlDateFormat(CRCHK_unitstart_enddate.unitedate)
    var CRCHK_unitstart_enddate_array=[startdate,enddate]
    var return_array=[CRCHK_roomtypearray,CRCHK_unitstart_enddate_array];
    return return_array;
    CRCHK_conn.close();
  }
  /**********************************FUNCTION TO GET ACCESSCARD FOR SELECTED UNIT*********************************************/
  function CRCHK_CardNumber(CRCHK_unit,CRCHK_firstname,CRCHK_lastname)
  {
    var CRCHK_conn =eilib.db_GetConnection();
    var CRCHK_cardnoresult=[];
    CRCHK_cardnoresult=eilib.CUST_getunitCardNo(CRCHK_conn,CRCHK_unit, CRCHK_firstname, CRCHK_lastname)
    CRCHK_conn.close();
    return CRCHK_cardnoresult;
  }
  /**********************************FUNCTION TO CALCULATE PRORATED BASED ON STARTDATE AND ENDDATE*********************************************/
  function CRCHK_prorated(CRCHK_startdate,CRCHK_enddate)
  {
    var CRCHK_chkproflag="";
    CRCHK_chkproflag=eilib.CUST_chkProrated(CRCHK_startdate, CRCHK_enddate)
    return CRCHK_chkproflag;
  }
  function CRCHK_customerrecheckin_commonvalues(nounit)
  {
    var CRCHK_conn=eilib.db_GetConnection();
    /**********************************ERROR MESSAGE*********************************************/
    var CRCHK_error_code ='1,2,6,33,34,35,36,37,38,321,324,248,339,342,343,344,345,346,347,348,400,443,444,458,459,460,461';
    var CRCHK_error_array=eilib.GetErrorMessageList(CRCHK_conn, CRCHK_error_code);
    var CRCHK_nation_array =eilib.CUST_getNationality(CRCHK_conn);
    var CRCHK_option_array =eilib.CUST_getOptionValue(CRCHK_conn);
    var CRCHK_mail_array =eilib.getProfileEmailId(CRCHK_conn,'RECHECKIN');
    var CRCHK_timearray=eilib.CUST_getCalendarTime(CRCHK_conn);
    var proratedwaived=eilib.CUST_getProratedWaivedValue(CRCHK_conn);
    /**********************************UNIT*********************************************/
    var CRCHK_unit_array=CRCHK_Customer('nounit')
    /********************************** ACTIVE UNIT LIST*********************************************/
    var CRCHK_active_unit_array=eilib.GetActiveUnit(CRCHK_conn);
    var CRCHK_customerSD=eilib.getCustomerStartdate(CRCHK_conn);
    var CRCHK_RESULTS={prorated:proratedwaived,activeunit:CRCHK_active_unit_array,unit:CRCHK_unit_array,time:CRCHK_timearray,email:CRCHK_mail_array,ccoption:CRCHK_option_array,nation:CRCHK_nation_array,error:CRCHK_error_array.errormsg,CustomerSD:CRCHK_customerSD}
    CRCHK_conn.close();
    return CRCHK_RESULTS;
  }
}
catch(err)
{
}
/**********************************CUSTOMER CREATION SAVING PART*********************************************/
function CRCHK_processFormSubmit(recheckin)
{
  try
  {
    var CRCHK_conn = eilib.db_GetConnection();
    CRCHK_conn.setAutoCommit(false);
    var CRCHK_name1=recheckin.CRCHK_tb_firstname;
    var CRCHK_name2=recheckin.CRCHK_tb_lastname;
    var CRCHK_custname=CRCHK_name1+' '+CRCHK_name2;
    var CRCHK_customermailid=recheckin.CRCHK_tb_custmailid;
    var CRCHK_dateofbirth=recheckin.CRCHK_db_BirthDate;
    if(CRCHK_dateofbirth=="")
    {    CRCHK_dateofbirth=null;  }else{CRCHK_dateofbirth="'"+eilib.SqlDateFormat(CRCHK_dateofbirth)+"'";}
    var CRCHK_nationality=eilib.ConvertSpclCharString(recheckin.CRCHK_lb_nationselect);
    var CRCHK_passportno=recheckin.CRCHK_tb_passportno;
    if(CRCHK_passportno=="")
    {  CRCHK_passportno=null;var passportno=""; }else{passportno=CRCHK_passportno;CRCHK_passportno="'"+CRCHK_passportno+"'";}
    var CRCHK_passportdate=recheckin.CRCHK_db_passportdate;
    if(CRCHK_passportdate=="")
    {    CRCHK_passportdate=null;var passportdate="";  }else{passportdate=CRCHK_passportdate;CRCHK_passportdate="'"+eilib.SqlDateFormat(CRCHK_passportdate)+"'";}
    var CRCHK_companyname=recheckin.CRCHK_tb_comanyname;
    if(CRCHK_companyname=="")
    {    CRCHK_companyname=null; var CRCHK_compname="";  }else{CRCHK_compname=CRCHK_companyname;CRCHK_companyname="'"+CRCHK_companyname+"'";}
    var CRCHK_companyaddress=recheckin.CRCHK_tb_companyaddress;
    if(CRCHK_companyaddress=="")
    {    CRCHK_companyaddress=null;  }else{CRCHK_companyaddress="'"+CRCHK_companyaddress+"'";}
    var CRCHK_companypostalcode=recheckin.CRCHK_tb_companypostalcode;
    if(CRCHK_companypostalcode=="")
    {    CRCHK_companypostalcode=null;  }else{CRCHK_companypostalcode="'"+CRCHK_companypostalcode+"'";}
    var CRCHK_mobile=recheckin.CRCHK_tb_mobile;
    if(CRCHK_mobile=="")
    {    CRCHK_mobile=null; var cal_mobile="" }else{cal_mobile=CRCHK_mobile;CRCHK_mobile="'"+CRCHK_mobile+"'";}
    var CRCHK_intmobile=recheckin.CRCHK_tb_intmobile;
    if(CRCHK_intmobile=="")
    {    CRCHK_intmobile=null;var cal_intmobile=""  }else{cal_intmobile=CRCHK_intmobile;CRCHK_intmobile="'"+CRCHK_intmobile+"'";}
    var CRCHK_office=recheckin.CRCHK_tb_office;
    if(CRCHK_office=="")
    {    CRCHK_office=null; var cal_office="" }else{cal_office=CRCHK_office;CRCHK_office="'"+CRCHK_office+"'";}
    var CRCHK_epno=recheckin.CRCHK_tb_epno;
    if(CRCHK_epno=="")
    {    CRCHK_epno=null;var epno=""; }else{epno=CRCHK_epno;CRCHK_epno="'"+CRCHK_epno+"'";}
    var CRCHK_epdate=recheckin.CRCHK_db_epdate;
    if(CRCHK_epdate=="")
    {    CRCHK_epdate=null;var epdate="";  }else{epdate=CRCHK_epdate;CRCHK_epdate="'"+eilib.SqlDateFormat(CRCHK_epdate)+"'";}
    var CRCHK_unit=recheckin.CRCHK_lb_unitselect;
    var CRCHK_roomtype=recheckin.CRCHK_lb_roomselect;
    var CRCHK_startdate=eilib.SqlDateFormat(recheckin.CRCHK_db_startdate);
    var CRCHK_enddate=eilib.SqlDateFormat(recheckin.CRCHK_db_enddate);
    var CRCHK_noticeno=recheckin.CRCHK_tb_noticeno;
    if(CRCHK_noticeno=="")
    {    CRCHK_noticeno=null;var noticeno="";}else{noticeno=CRCHK_noticeno;CRCHK_noticeno="'"+CRCHK_noticeno+"'"}
    var CRCHK_noticedate=recheckin.CRCHK_db_noticedate;
    if(CRCHK_noticedate=="" || CRCHK_noticedate==undefined) 
    {    CRCHK_noticedate=null; var noticedate=""; }else{noticedate=CRCHK_noticedate;CRCHK_noticedate="'"+eilib.SqlDateFormat(CRCHK_noticedate)+"'";}
    var CRCHK_quarterlyfee=recheckin.CRCHK_tb_quarterlyfee;
    if(CRCHK_quarterlyfee=="")
    { CRCHK_quarterlyfee=null;}
    var CRCHK_airconfixed=recheckin.CRCHK_tb_aircon_fixed;
    if(CRCHK_airconfixed=="")
    { CRCHK_airconfixed=null;}
    var CRCHK_electricity=recheckin.CRCHK_tb_electricity;
    if(CRCHK_electricity=="")
    { CRCHK_electricity=null;}
    var CRCHK_drycleaning=recheckin.CRCHK_tb_drycleaning;
    if(CRCHK_drycleaning=="")
    {  CRCHK_drycleaning=null;}
    var CRCHK_cleaning=recheckin.CRCHK_tb_cleaning;
    if(CRCHK_cleaning=="")
    { CRCHK_cleaning=null;}
    var CRCHK_deposit=recheckin.CRCHK_tb_deposit;
    if(CRCHK_deposit=="")
    { CRCHK_deposit=null;}
    var CRCHK_rent=recheckin.CRCHK_tb_rent;
    var CRCHK_process=recheckin.CRCHK_tb_process;
    if(CRCHK_process=="")
    {  CRCHK_process=null;}
    var CRCHK_check='X';
    var CRCHK_prorated=recheckin.CRCHK_rentprorated_tempcheckbox2;
    var CRCHK_PRORATED=recheckin.CRCHK_rentprorated_checkbox;
    if((CRCHK_prorated==undefined)&&(CRCHK_PRORATED==undefined))
    {
      var rentcheck='false';
      CRCHK_prorated=null;
    }
    else
    {
      rentcheck='true';
      CRCHK_prorated="'"+CRCHK_check+"'";
    }
    var CRCHK_process_check=recheckin.CRF_checkbox1;
    if(CRCHK_process_check==undefined)
    {
      var waived="";
      CRCHK_process_check=null;
    }
    else
    {
      waived=CRCHK_check;
      CRCHK_process_check="'"+CRCHK_check+"'";
    }
    var CRCHK_ccoption=recheckin.CRCHK_lb_ccoptionselect;
    var CRCHK_mailid=recheckin.CRCHK_lb_mailselect;
    var CRCHK_comments=recheckin.CRCHK_ta_comments;
    if(CRCHK_comments!="" && CRCHK_comments!=" " )
    {
      CRCHK_comments=eilib.ConvertSpclCharString(CRCHK_comments);
    }
    var CRCHK_startdate_starttime=recheckin.CRCHK_lb_startselect;
    var CRCHK_startdate_endtime=recheckin.CRCHK_lb_startselect1;
    var CRCHK_enddate_starttime=recheckin.CRCHK_lb_endselect;
    var CRCHK_enddate_endtime=recheckin.CRCHK_lb_endselect1;
    var CRCHK_customerid=recheckin.CRF_id;
    var CRCHK_namearray=recheckin.temptext;
    var CRCHK_accesscard="";
    var CRCHK_guestcard="";
    if(CRCHK_namearray==undefined)
    { var flag=1;}
    if(CRCHK_namearray!=undefined && CRCHK_namearray!='undefined')
    {
      var CRCHK_find=(CRCHK_namearray.toString()).search(',');
      if(CRCHK_find!=-1)
      {
        var flag=0;
        for(var i=0;i<CRCHK_namearray.length;i++)
        {
          if(CRCHK_namearray[i]=="")continue;
          var card=CRCHK_namearray[i].split('/');
          if(card[1]==CRCHK_custname)
          {
            if(CRCHK_accesscard=="")
            {
              CRCHK_accesscard=card[0];
              CRCHK_guestcard=card[0]+','+' ';
              var cardno=card[0];
            }
            else
            {
              CRCHK_accesscard=CRCHK_accesscard+','+card[0];
              CRCHK_guestcard=CRCHK_guestcard+','+card[0]+', ';
              cardno=card[0];
            }
          }
          else
          {
            if(CRCHK_accesscard=="")
            {
              CRCHK_guestcard=card[0]+',X';
              CRCHK_accesscard=card[0];
            }
            else
            {
              CRCHK_accesscard=CRCHK_accesscard+','+card[0];
              CRCHK_guestcard=CRCHK_guestcard+','+card[0]+',X';
            }
          }
        }
      }
      else
      {
        flag=0;
        var CRCHK_singleard=CRCHK_namearray.split('/');
        CRCHK_accesscard=CRCHK_singleard[0];
        CRCHK_guestcard=CRCHK_singleard[0]+', ';
        cardno=CRCHK_singleard[0];
      }
    }
    else
    { cardno= " ";  }
    var CRCHK_sdate=CRCHK_startdate.split('-');
    var CRCHK_edate=CRCHK_enddate.split('-');
    var CRCHK_quators  = eilib.quarterCalc(new Date(CRCHK_sdate[0],CRCHK_sdate[1]-1,CRCHK_sdate[2]),new Date(CRCHK_edate[0],CRCHK_edate[1]-1,CRCHK_edate[2])); 
    var CRCHK_Leaseperiod  = eilib.leasePeriodCalc(new Date(CRCHK_sdate[0],CRCHK_sdate[1]-1,CRCHK_sdate[2]),new Date(CRCHK_edate[0],CRCHK_edate[1]-1,CRCHK_edate[2]));
    var CRCHK_customerstmt=CRCHK_conn.createStatement();
    var CRCHK_recheckininsertquery="CALL SP_CUSTOMER_RECHECKIN_INSERT("+CRCHK_customerid+",'"+CRCHK_name1+"','"+CRCHK_name2+"',"+CRCHK_companyname+","+CRCHK_companyaddress+","+CRCHK_companypostalcode+","+CRCHK_office+","+CRCHK_unit+",'"+CRCHK_roomtype+"','"+CRCHK_startdate_starttime+"','"+CRCHK_startdate_endtime+"','"+CRCHK_enddate_starttime+"','"+CRCHK_enddate_endtime+"','"+CRCHK_Leaseperiod+"',"+CRCHK_quators+","+CRCHK_process_check+","+CRCHK_prorated+","+CRCHK_noticeno+","+CRCHK_noticedate+","+CRCHK_rent+","+CRCHK_deposit+","+CRCHK_process+","+CRCHK_airconfixed+","+CRCHK_quarterlyfee+","+CRCHK_electricity+","+CRCHK_cleaning+","+CRCHK_drycleaning+",'"+CRCHK_accesscard+"','"+CRCHK_startdate+"','"+UserStamp+"','"+CRCHK_startdate+"','"+CRCHK_enddate+"','"+CRCHK_guestcard+"','"+CRCHK_nationality+"',"+CRCHK_mobile+","+CRCHK_intmobile+",'"+CRCHK_customermailid+"',"+CRCHK_passportno+","+CRCHK_passportdate+","+CRCHK_dateofbirth+","+CRCHK_epno+","+CRCHK_epdate+",'"+CRCHK_comments+"',@CUSTOMER_RECHECKIN_TEMPTBLNAME,@CUSTOMER_RECHECKIN_FLAG)"
    CRCHK_customerstmt.execute(CRCHK_recheckininsertquery);
    var returnflagresult=CRCHK_customerstmt.executeQuery("SELECT @CUSTOMER_RECHECKIN_TEMPTBLNAME,@CUSTOMER_RECHECKIN_FLAG");
    if(returnflagresult.next())
    {
      var returnflag=returnflagresult.getString(2);
      var temptablename=returnflagresult.getString(1);
    }
    returnflagresult.close();
    CRCHK_customerstmt.close();
    if(returnflag==1)
    {
      CR_CCRE_expconn=CRCHK_conn;
      CR_temptablename=temptablename;
      CR_customer_id=CRCHK_customerid;
      var CRCHK_customername=CRCHK_name1+' '+CRCHK_name2;
      var calenderIDcode=eilib.CUST_getCalenderId(CRCHK_conn);
      CR_calendarname=calenderIDcode
      eilib.CUST_customercalendercreation(CRCHK_customerid, calenderIDcode, CRCHK_startdate, CRCHK_startdate_starttime, CRCHK_startdate_endtime, CRCHK_enddate, CRCHK_enddate_starttime, CRCHK_enddate_endtime, CRCHK_name1, CRCHK_name2, cal_mobile, cal_intmobile, cal_office, CRCHK_customermailid, CRCHK_unit,CRCHK_roomtype,' ')
      CR_checkstatusflag=1;
      CR_calevent_array=[[CRCHK_startdate, CRCHK_startdate_starttime, CRCHK_startdate_endtime],[CRCHK_enddate, CRCHK_enddate_starttime, CRCHK_enddate_endtime]]
      var cust_config_array=eilib.CUST_invoice_contractreplacetext(CRCHK_conn);
      var CRCHK_invoiceid=cust_config_array[9];
      var CRCHK_contractid=cust_config_array[10];
      var CRCHK_invoicesno=cust_config_array[0];
      var CRCHK_invoicedate=cust_config_array[1];
      var Folderid=eilib.CUST_TargetFolderId(CRCHK_conn);
      var CRCHK_docowner=eilib.CUST_documentowner(CRCHK_conn);
      if(CRCHK_ccoption==4)
      {
        eilib.CUST_invoicemail(CRCHK_conn,CRCHK_unit,CRCHK_customername,CRCHK_compname,CRCHK_invoiceid,CRCHK_invoicesno,CRCHK_invoicedate,CRCHK_rent,CRCHK_process,CRCHK_deposit,CRCHK_startdate,CRCHK_enddate,CRCHK_roomtype,CRCHK_Leaseperiod,CRCHK_mailid,Folderid,rentcheck,CRCHK_docowner,'RECHECKIN',waived,CRCHK_customerid)
      }
      if(CRCHK_ccoption==5)
      {
        eilib.CUST_contractmail(CRCHK_conn,CRCHK_unit,CRCHK_startdate,CRCHK_enddate,CRCHK_compname,CRCHK_customername,noticeno,passportno,passportdate,epno,epdate,noticedate,CRCHK_Leaseperiod,cardno,CRCHK_rent,CRCHK_quarterlyfee,CRCHK_airconfixed,CRCHK_electricity,CRCHK_drycleaning,CRCHK_cleaning,CRCHK_process,CRCHK_deposit,waived,CRCHK_roomtype,rentcheck,CRCHK_mailid,'RECHECKIN',Folderid,CRCHK_docowner)
      }
      if(CRCHK_ccoption==6)
      {
        eilib.CUST_invoicecontractmail(CRCHK_conn,CRCHK_unit,CRCHK_invoiceid,CRCHK_startdate,CRCHK_enddate,CRCHK_compname,CRCHK_customername,CRCHK_invoicesno,CRCHK_invoicedate,noticeno,passportno,passportdate,epno,epdate,noticedate,CRCHK_Leaseperiod,cardno,CRCHK_rent,CRCHK_quarterlyfee,CRCHK_airconfixed,CRCHK_electricity,CRCHK_drycleaning,CRCHK_cleaning,CRCHK_process,CRCHK_deposit,waived,CRCHK_roomtype,Folderid,rentcheck,CRCHK_docowner,CRCHK_mailid,'RECHECKIN',CRCHK_customerid)
      }
    }
    var CRCHK_unit_array=CRCHK_Customer('nounit');
    var recheckin_returnvalues=[returnflag,CRCHK_unit_array];
    eilib.DropTempTable(CRCHK_conn,temptablename);   
    CRCHK_conn.commit();
    return recheckin_returnvalues;
    CRCHK_conn.close();
  }
  catch(err)
  {
    Logger.log("SCRIPT EXCEPTION:"+err)
    CR_CCRE_expconn.rollback();
    eilib.DropTempTable(CR_CCRE_expconn,CR_temptablename); 
    if(CR_checkstatusflag==1)
    {
     eilib.CUST_CREATION_customercalenderdeletion(CR_customer_id,CR_calendarname,CR_calevent_array);
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

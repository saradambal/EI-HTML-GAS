//*******************************************FILE DESCRIPTION*********************************************//
//*******************************************CUSTOMER TERMINATION*****************************************//
//DONE BY:PUNITHA
//VER 1.4-SD:08/10/2014 ED:08/10/2014,TRACKER NO:732,Changed preloader n msgbox position
//VER 1.3-SD:01/08/2014 ED:25/08/2014,TRACKER NO:732,,updated new links n AG,implemented commit n rollback n updated  sp to ptd for null card ptd for unterm sp n in active customer term option  BY PUNI
//VER 1.2-SD:22/07/2014 ED:22/07/2014,TRACKER NO:732,ADDED CALL FUNCTION TO PASS FROM EILIB TO PASS TIMESTAMP IN 24 HRS FORMAT FOR UPDATION WITH COMTS FOR UNTERMINATION OPTION BY PUNI
//VER 1.1-SD:17/06/2014 ED:19/06/2014,TRACKER NO:732,ADDED FAILURE ERR MSG FOR INCORRECT USER NAME N PW N CHKED CORRECTED SP FOR USERSTAMP N TIMESTAMP UPDATION N CHANGED VW NAMES BY PUNI
//VER 1.0-SD:06/06/2014 ED:6/06/2014,TRACKER NO:732,ADDED ERR MSG IF CAL NAME IS WRONG,CHANGED NEW DRIVE LINK IN HTML FILE BY PUNI
//VER 0.09-SD:30/05/2014 ED:31/05/2014,TRACKER NO:732,CHANGED SCRIPT TO DROP TEMP TABLE CREATING IN SP N CHECKED CORRECTED SP BY PUNI
//DONE BY:SAFI
//VER 0.08-SD:09/05/2014 ED:10/05/2014,TRACKER NO:732,CHANGED TEMP TABLE DYNAMICALLY AND CHECK SPLITTED SP BY SAFI
//DONE BY:PUNITHA
//VER 0.07-SD:12/04/2014 ED:22/04/2014,TRACKER NO:732,checked with guest record for manual term sp n updated cal event n lp n quarters script n chked with changed views n extn form changes BY PUNI
//VER 0.06-SD:24/03/2014 ED:12/04/2014,TRACKER NO:732,updated form validation as per new changes in manual term sp,changed table name as per new changes,updated calendar event script n checked with new manual term sp BY PUNI
//VER 0.05-SD:20/01/2014 ED:24/03/2014,updated array concept to get calendar time,trimed script,updated return flag from sp,updated some validation when ptd not between sd n edate,checked tickler history data to id updation in manual term sp BY PUNI 
//VER 0.04-SD:29/12/2013 ED:20/01/2014,TRACKER NO:308,UPDATED FORM DESIGN TO CHK CUST ALSO IF GST IS CLICKED IF CUST PTD>=SD,UPDATED LP,QUARTOR PART AS PER NULL PTD IN PREV RV,updated script for DROP temp table,passing active rv to sp,change title h1 tag to h3 tag BY PUNI
//VER 0.03-SD:03/12/2013 ED:29/12/2013,TRACKER NO:308,UPDATED EILIB CONN FUNCTION N PARTIAL DELIVERY TO TERMINATE FOR SINGLE LP ONLY BY PUNI
//VER 0.02-SD:03/12/2013 ED:03/12/2013,TRACKER NO:667,UPDATED SCRIPT TO CALL SP BY PUNI
//VER 0.01-INITIAL VERSION, SD:24/09/2013 ED:3/12/2013,TRACKER NO:308 BY PUNI
//*********************************************************************************************************//-->
try
{ 
  //FUNCTION TO GET CALENDAR TIME N ERROR MESSAGES
  function CTERM_getErrMsgCalTime()
  {
    var CTERM_errcon =eilib.db_GetConnection();
    CTERM_errcon.setAutoCommit(false);
    var CEXTN_timearray=[];
    CEXTN_timearray=eilib.CUST_getCalendarTime(CTERM_errcon);
    var CTERM_errarray =[];
    var CTERM_errmsgids='42,43,47,97,329,356,401,458';
    CTERM_errarray=eilib.GetErrorMessageList(CTERM_errcon,CTERM_errmsgids);
    var CTERM_temptable=CTERM_Calluntermcustsp(CTERM_errcon);
    var CTERM_cnamestmt= CTERM_errcon.createStatement();
    var CTERM_namearray =[];
    var CTERM_cnamequery="";
    CTERM_cnamequery= "SELECT DISTINCT CUSTOMERNAME FROM VW_TERMINATION_ACTIVE_CUSTOMER UNION SELECT DISTINCT CUSTOMERNAME FROM "+CTERM_temptable[1]+" UNION SELECT DISTINCT CUSTOMERNAME FROM VW_TERMINATION_TERMINATED_CUSTOMER ORDER BY CUSTOMERNAME ASC";
    var CTERM_cnameres = CTERM_cnamestmt.executeQuery(CTERM_cnamequery);
    while(CTERM_cnameres.next())
    {
      CTERM_namearray.push(CTERM_cnameres.getString("CUSTOMERNAME"));
    }
    CTERM_cnameres.close();
    CTERM_cnamestmt.close();
    //DROP UNTERM CUSTOMER TEMP TABLES
    DropUntermTables(CTERM_errcon,CTERM_temptable);
    CTERM_errcon.commit();
    CTERM_errcon.close();
    var CTERM_errmsgntime={"errormsg":CTERM_errarray.errormsg,"calfrmtime":CEXTN_timearray,"namelen":CTERM_namearray.length};
    return CTERM_errmsgntime;
  }
  //FUNCTION TO GET ACTIVE CUSTOMER
  function CTERM_getCustomerName(CTERM_form)
  {
    var CTERM_form_option=CTERM_form.CTERM_radio_termoption
    var CTERM_cnamecon =eilib.db_GetConnection();
    var CTERM_cnamestmt= CTERM_cnamecon.createStatement();
    var CTERM_namearray =[];
    var CTERM_cnamequery="";    
    if(CTERM_form_option=='CTERM_radio_activecust')
    {
      CTERM_cnamequery= "SELECT DISTINCT CUSTOMERNAME FROM VW_TERMINATION_ACTIVE_CUSTOMER ORDER BY CUSTOMERNAME ASC";
    }
    else if(CTERM_form_option=='CTERM_radio_untermnonactive')
    {
      var CTERM_temptable=CTERM_Calluntermcustsp(CTERM_cnamecon);
      CTERM_cnamequery= "SELECT DISTINCT CUSTOMERNAME FROM "+CTERM_temptable[1]+" WHERE CUSTOMERID NOT IN(SELECT CUSTOMERID FROM VW_TERMINATION_TERMINATED_CUSTOMER) ORDER BY CUSTOMERNAME ASC";
    }
    else
    {
      CTERM_cnamequery= "SELECT DISTINCT CUSTOMERNAME FROM VW_TERMINATION_TERMINATED_CUSTOMER ORDER BY CUSTOMERNAME ASC";
    }
    var CTERM_cnameres = CTERM_cnamestmt.executeQuery(CTERM_cnamequery);
    while(CTERM_cnameres.next())
    {
      CTERM_namearray.push(CTERM_cnameres.getString("CUSTOMERNAME"));
    }
    CTERM_cnameres.close();
    CTERM_cnamestmt.close();
    if(CTERM_form_option=='CTERM_radio_untermnonactive')
    {
      DropUntermTables(CTERM_cnamecon,CTERM_temptable);
    }
    CTERM_cnamecon.close();
    return CTERM_namearray;
  }
  //FUNCTION TO GET CUSTOMER ID FOR THE SELECTED CUSTOMER NAME
  function CTERM_getCustomerId(CTERM_form)
  {
    var CTERM_cname=CTERM_form.CTERM_lb_custname;
    var CTERM_firstname=CTERM_cname.split('_')[0];
    var CTERM_lastname=CTERM_cname.split('_')[1];
    var CTERM_form_option=CTERM_form.CTERM_radio_termoption
    var CTERM_cidcon =eilib.db_GetConnection();
    var CTERM_cidstmt= CTERM_cidcon.createStatement();
    var CTERM_cidarray =[];
    var CTERM_cidquery= "";    
    if(CTERM_form_option=='CTERM_radio_activecust')
    {
      CTERM_cidquery= "SELECT CUSTOMERID FROM VW_TERMINATION_ACTIVE_CUSTOMER WHERE CUSTOMERNAME ='"+CTERM_cname+"' GROUP BY CUSTOMERID";
    }
    else if(CTERM_form_option=='CTERM_radio_untermnonactive')
    {   
      var CTERM_temptable=CTERM_Calluntermcustsp(CTERM_cidcon);
      CTERM_cidquery= "SELECT CUSTOMERID FROM "+CTERM_temptable[1]+"  WHERE CUSTOMERNAME ='"+CTERM_cname+"' GROUP BY CUSTOMERID";
    }
    else
    {
      CTERM_cidquery= "SELECT CUSTOMERID FROM VW_TERMINATION_TERMINATED_CUSTOMER WHERE CUSTOMERNAME ='"+CTERM_cname+"' GROUP BY CUSTOMERID" ;
    }
    var CTERM_cidres = CTERM_cidstmt.executeQuery(CTERM_cidquery);
    while(CTERM_cidres.next())
    {
      CTERM_cidarray.push(CTERM_cidres.getString("CUSTOMERID"));
    }
    CTERM_cidres.close();
    CTERM_cidstmt.close();
    if(CTERM_form_option=='CTERM_radio_untermnonactive')
    {
      DropUntermTables(CTERM_cidcon,CTERM_temptable);
    }
    CTERM_cidcon.close();
    return CTERM_cidarray;
  }
  //FUNCTION TO GET CUSTOMER DETAILS FOR THE SELECTED CUSTOMER NAME
  function CTERM_getCustomerdtls(CTERM_custid,CTERM_radio_termoption)
  {
    var CTERM_final_dtls_result=[];
    var CTERM_custdtlsconn= eilib.db_GetConnection()
    var CTERM_tempstmt=CTERM_custdtlsconn.createStatement();   
    CTERM_tempstmt.execute("CALL SP_CUSTOMER_TERMINATION_TEMP_FEE_DETAIL("+CTERM_custid+",'"+UserStamp+"',@CTERM_FEETMPTBLNAM)");
    CTERM_tempstmt.close();
    var CTERM_feetemptbl_stmt=CTERM_custdtlsconn.createStatement();
    var CTERM_feetemptbl_query="SELECT @CTERM_FEETMPTBLNAM";
    var CTERM_feetemptblres=CTERM_feetemptbl_stmt.executeQuery(CTERM_feetemptbl_query);
    var CTERM_tempfeetblname="";
    while(CTERM_feetemptblres.next())
    {
      CTERM_tempfeetblname=CTERM_feetemptblres.getString(1);
    }
    CTERM_feetemptblres.close();
    CTERM_feetemptbl_stmt.close();
    var CTERM_count=0;
    var CTERM_custdtlsstmt = CTERM_custdtlsconn.createStatement();  
    if(CTERM_radio_termoption=="CTERM_radio_activecust")
    {
      var CTERM_custdtlsquery="SELECT  CED.UASD_ID,CACD.CACD_VALID_TILL,CED.CED_LEASE_PERIOD,CED.CED_QUARTERS,CED.CED_RECHECKIN,CED.CED_PRETERMINATE,CTD.CLP_TERMINATE,U.UNIT_NO,UASD.UASD_ACCESS_CARD,CTD.CLP_GUEST_CARD,C.CUSTOMER_FIRST_NAME,C.CUSTOMER_LAST_NAME,CTD.CLP_STARTDATE,CTD.CLP_ENDDATE,NC.NC_DATA,TF.CC_DEPOSIT,TF.CC_PAYMENT_AMOUNT,CCD.CCD_COMPANY_NAME,CCD.CCD_COMPANY_ADDR,CCD.CCD_POSTAL_CODE,TF.CC_ELECTRICITY_CAP,TF.CC_AIRCON_FIXED_FEE,TF.CC_AIRCON_QUARTERLY_FEE,TF.CC_DRYCLEAN_FEE,TF.CC_PROCESSING_FEE,TF.CC_CHECKOUT_CLEANING_FEE,CPD.CPD_EP_NO,CPD.CPD_EP_DATE,CPD.CPD_PASSPORT_NO,CPD.CPD_PASSPORT_DATE,CED.CED_NOTICE_PERIOD,CED.CED_NOTICE_START_DATE,CPD.CPD_DOB,CPD.CPD_MOBILE,CPD.CPD_INTL_MOBILE,CPD.CPD_EMAIL,CCD.CCD_OFFICE_NO,CED.CED_EXTENSION,CED.CED_REC_VER,CED.CED_CANCEL_DATE,CPD.CPD_COMMENTS,ULD.ULD_LOGINID,CTD.CLP_PRETERMINATE_DATE,DATE_FORMAT(CONVERT_TZ(CTD.CLP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS CTDTIMESTAMP FROM  CUSTOMER_ENTRY_DETAILS CED  LEFT JOIN CUSTOMER_LP_DETAILS CTD ON CED.CUSTOMER_ID=CTD.CUSTOMER_ID AND(CTD.CED_REC_VER=CED.CED_REC_VER)LEFT JOIN CUSTOMER_COMPANY_DETAILS CCD ON CED.CUSTOMER_ID=CCD.CUSTOMER_ID LEFT JOIN CUSTOMER_ACCESS_CARD_DETAILS CACD ON CED.CUSTOMER_ID=CACD.CUSTOMER_ID AND   CTD.UASD_ID=CACD.UASD_ID LEFT JOIN "+CTERM_tempfeetblname+" TF ON  CED.CUSTOMER_ID=TF.CUSTOMER_ID LEFT JOIN CUSTOMER C ON CED.CUSTOMER_ID=C.CUSTOMER_ID LEFT JOIN  CUSTOMER_PERSONAL_DETAILS CPD ON CED.CUSTOMER_ID=CPD.CUSTOMER_ID LEFT JOIN UNIT_ACCESS_STAMP_DETAILS UASD ON CACD.UASD_ID=UASD.UASD_ID ,NATIONALITY_CONFIGURATION NC ,UNIT U,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=CTD.ULD_ID AND (CED.UNIT_ID=U.UNIT_ID) AND (CED.CUSTOMER_ID="+CTERM_custid+") AND (CPD.NC_ID=NC.NC_ID) AND (CED.CED_REC_VER=TF.CUSTOMER_VER) AND (CLP_STARTDATE<=CURDATE() OR CLP_STARTDATE>=CURDATE()) AND CED.CED_CANCEL_DATE IS NULL ORDER BY CED.CED_REC_VER, CTD.CLP_GUEST_CARD ASC"
    }
    if(CTERM_radio_termoption=="CTERM_radio_untermnonactive")
    {     
      var CTERM_custdtlsquery="SELECT  CED.UASD_ID,CACD.CACD_VALID_TILL,CED.CED_LEASE_PERIOD,CED.CED_QUARTERS,CED.CED_RECHECKIN,CED.CED_PRETERMINATE,CTD.CLP_TERMINATE,U.UNIT_NO,UASD.UASD_ACCESS_CARD,CTD.CLP_GUEST_CARD,C.CUSTOMER_FIRST_NAME,C.CUSTOMER_LAST_NAME,CTD.CLP_STARTDATE,CTD.CLP_ENDDATE,NC.NC_DATA,TF.CC_DEPOSIT,TF.CC_PAYMENT_AMOUNT,CCD.CCD_COMPANY_NAME,CCD.CCD_COMPANY_ADDR,CCD.CCD_POSTAL_CODE,TF.CC_ELECTRICITY_CAP,TF.CC_AIRCON_FIXED_FEE,TF.CC_AIRCON_QUARTERLY_FEE,TF.CC_DRYCLEAN_FEE,TF.CC_PROCESSING_FEE,TF.CC_CHECKOUT_CLEANING_FEE,CPD.CPD_EP_NO,CPD.CPD_EP_DATE,CPD.CPD_PASSPORT_NO,CPD.CPD_PASSPORT_DATE,CED.CED_NOTICE_PERIOD,CED.CED_NOTICE_START_DATE,CPD.CPD_DOB,CPD.CPD_MOBILE,CPD.CPD_INTL_MOBILE,CPD.CPD_EMAIL,CCD.CCD_OFFICE_NO,CED.CED_EXTENSION,CED.CED_REC_VER,CED.CED_CANCEL_DATE,CPD.CPD_COMMENTS,ULD.ULD_LOGINID,CTD.CLP_PRETERMINATE_DATE,DATE_FORMAT(CONVERT_TZ(CTD.CLP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS CTDTIMESTAMP FROM  CUSTOMER_ENTRY_DETAILS CED  LEFT JOIN CUSTOMER_LP_DETAILS CTD ON CED.CUSTOMER_ID=CTD.CUSTOMER_ID AND(CTD.CED_REC_VER=CED.CED_REC_VER)LEFT JOIN CUSTOMER_COMPANY_DETAILS CCD ON CED.CUSTOMER_ID=CCD.CUSTOMER_ID LEFT JOIN CUSTOMER_ACCESS_CARD_DETAILS CACD ON CED.CUSTOMER_ID=CACD.CUSTOMER_ID AND   CTD.UASD_ID=CACD.UASD_ID LEFT JOIN "+CTERM_tempfeetblname+" TF ON  CED.CUSTOMER_ID=TF.CUSTOMER_ID LEFT JOIN CUSTOMER C ON CED.CUSTOMER_ID=C.CUSTOMER_ID LEFT JOIN  CUSTOMER_PERSONAL_DETAILS CPD ON CED.CUSTOMER_ID=CPD.CUSTOMER_ID LEFT JOIN UNIT_ACCESS_STAMP_DETAILS UASD ON CACD.UASD_ID=UASD.UASD_ID ,NATIONALITY_CONFIGURATION NC ,UNIT U,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=CTD.ULD_ID AND (CED.UNIT_ID=U.UNIT_ID) AND (CED.CUSTOMER_ID="+CTERM_custid+") AND (CPD.NC_ID=NC.NC_ID) AND (CED.CED_REC_VER=TF.CUSTOMER_VER) AND (CLP_STARTDATE<=CURDATE() OR CLP_STARTDATE>=CURDATE()) AND CED.CED_CANCEL_DATE IS NULL AND IF(CTD.CLP_PRETERMINATE_DATE IS NOT NULL,CLP_PRETERMINATE_DATE<=CURDATE(),CLP_ENDDATE<=CURDATE()) ORDER BY CED.CED_REC_VER,CTD.CLP_GUEST_CARD ASC"
    }
    if(CTERM_radio_termoption=="CTERM_radio_reactivecust")
    {
      var CTERM_custdtlsquery="SELECT CED.UASD_ID,CACD.CACD_VALID_TILL,CED.CED_LEASE_PERIOD,CED.CED_QUARTERS,CED.CED_RECHECKIN,CED.CED_PRETERMINATE,CTD.CLP_TERMINATE,U.UNIT_NO,UASD.UASD_ACCESS_CARD,CTD.CLP_GUEST_CARD,C.CUSTOMER_FIRST_NAME,C.CUSTOMER_LAST_NAME,CTD.CLP_STARTDATE,CTD.CLP_ENDDATE,NC.NC_DATA,TF.CC_DEPOSIT,TF.CC_PAYMENT_AMOUNT,CCD.CCD_COMPANY_NAME,CCD.CCD_COMPANY_ADDR,CCD.CCD_POSTAL_CODE,TF.CC_ELECTRICITY_CAP,TF.CC_AIRCON_FIXED_FEE,TF.CC_AIRCON_QUARTERLY_FEE,TF.CC_DRYCLEAN_FEE,TF.CC_PROCESSING_FEE,TF.CC_CHECKOUT_CLEANING_FEE,CPD.CPD_EP_NO,CPD.CPD_EP_DATE,CPD.CPD_PASSPORT_NO,CPD.CPD_PASSPORT_DATE,CED.CED_NOTICE_PERIOD,CED.CED_NOTICE_START_DATE,CPD.CPD_DOB,CPD.CPD_MOBILE,CPD.CPD_INTL_MOBILE,CPD.CPD_EMAIL,CCD.CCD_OFFICE_NO,CED.CED_EXTENSION,CED.CED_REC_VER,CED.CED_CANCEL_DATE,CPD.CPD_COMMENTS,ULD.ULD_LOGINID,CTD.CLP_PRETERMINATE_DATE,DATE_FORMAT(CONVERT_TZ(CTD.CLP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS CTDTIMESTAMP FROM  CUSTOMER_ENTRY_DETAILS CED  LEFT JOIN CUSTOMER_LP_DETAILS CTD ON CED.CUSTOMER_ID=CTD.CUSTOMER_ID AND(CTD.CED_REC_VER=CED.CED_REC_VER)LEFT JOIN CUSTOMER_COMPANY_DETAILS CCD ON CED.CUSTOMER_ID=CCD.CUSTOMER_ID LEFT JOIN CUSTOMER_ACCESS_CARD_DETAILS CACD ON CED.CUSTOMER_ID=CACD.CUSTOMER_ID   AND CTD.UASD_ID=CACD.UASD_ID LEFT JOIN UNIT_ACCESS_STAMP_DETAILS UASD ON CACD.UASD_ID=UASD.UASD_ID LEFT JOIN "+CTERM_tempfeetblname+" TF ON  CED.CUSTOMER_ID=TF.CUSTOMER_ID LEFT JOIN CUSTOMER C ON CED.CUSTOMER_ID=C.CUSTOMER_ID LEFT JOIN  CUSTOMER_PERSONAL_DETAILS CPD ON CED.CUSTOMER_ID=CPD.CUSTOMER_ID ,NATIONALITY_CONFIGURATION NC ,UNIT U,VW_RECHECKIN_CUSTOMER VRC,USER_LOGIN_DETAILS ULD  WHERE   ULD.ULD_ID=CTD.ULD_ID AND CED.CUSTOMER_ID=VRC.CUSTOMER_ID AND CED.CED_REC_VER=VRC.CED_REC_VER AND (CED.UNIT_ID=U.UNIT_ID) AND (CED.CUSTOMER_ID="+CTERM_custid+") AND (CPD.NC_ID=NC.NC_ID) AND (CED.CED_REC_VER=TF.CUSTOMER_VER) AND (CLP_STARTDATE<=CURDATE() OR CLP_STARTDATE>=CURDATE()) AND  CTD.CLP_TERMINATE IS NOT NULL AND CED.CED_CANCEL_DATE IS NULL AND IF(CTD.CLP_PRETERMINATE_DATE IS NOT NULL,CLP_PRETERMINATE_DATE<=CURDATE(),CLP_ENDDATE<=CURDATE()) ORDER BY CED.CED_REC_VER,CTD.CLP_GUEST_CARD ASC"
    }
    var CTERM_custdtlsrs = CTERM_custdtlsstmt.executeQuery(CTERM_custdtlsquery);
    while(CTERM_custdtlsrs.next())
    {
      var CTERM_chkkenddate = CTERM_custdtlsrs.getDate("CLP_ENDDATE").getTime();
      var CTERM_chkkptd = CTERM_custdtlsrs.getString("CLP_PRETERMINATE_DATE");
      if(CTERM_chkkptd!=null)
      {
        var CTERM_chkkptd = CTERM_custdtlsrs.getDate("CLP_PRETERMINATE_DATE").getTime();
        CTERM_chkkenddate=CTERM_chkkptd
      }
      var CTERM_cardno = CTERM_custdtlsrs.getString("UASD_ACCESS_CARD");
      if(CTERM_cardno==null){CTERM_cardno=""}
      var CTERM_validtill=CTERM_custdtlsrs.getString("CACD_VALID_TILL");
      if(CTERM_validtill==null){ CTERM_validtill=""; }   
      var CTERM_term = CTERM_custdtlsrs.getString("CLP_TERMINATE");
      if(CTERM_term==null){ CTERM_term=""; }   
      if((CTERM_radio_termoption=="CTERM_radio_activecust"&&CTERM_validtill==""&&new Date(Utilities.formatDate(new Date(CTERM_chkkenddate), TimeZone, 'yyyy/MM/dd 00:00:00'))>new Date(Utilities.formatDate(new Date(),TimeZone, 'yyyy/MM/dd 00:00:00')))||(CTERM_radio_termoption=="CTERM_radio_untermnonactive"&&(CTERM_cardno==""||(CTERM_cardno!=""&&CTERM_validtill=="")))||(CTERM_radio_termoption=="CTERM_radio_reactivecust"))
      {
        var CTERM_rmtypid=CTERM_custdtlsrs.getString("UASD_ID");
        var CTERM_unitno = CTERM_custdtlsrs.getString("UNIT_NO");
        var CTERM_firstname = CTERM_custdtlsrs.getString("CUSTOMER_FIRST_NAME");
        var CTERM_lastname = CTERM_custdtlsrs.getString("CUSTOMER_LAST_NAME");
        var CTERM_startdate = CTERM_custdtlsrs.getString("CLP_STARTDATE"); 
        var CTERM_enddate = CTERM_custdtlsrs.getString("CLP_ENDDATE");
        var CTERM_rental = CTERM_custdtlsrs.getString("CC_PAYMENT_AMOUNT");
        var CTERM_stmt = CTERM_custdtlsconn.createStatement();
        var CTERM_select_roomtype="SELECT URTD.URTD_ROOM_TYPE from UNIT_ROOM_TYPE_DETAILS URTD, UNIT_ACCESS_STAMP_DETAILS UASD,UNIT U,CUSTOMER_ENTRY_DETAILS CED WHERE U.UNIT_ID=UASD.UNIT_ID AND U.UNIT_ID=CED.UNIT_ID AND U.UNIT_NO="+CTERM_unitno+" AND (CED.CUSTOMER_ID="+CTERM_custid+") and(UASD.UASD_ID=CED.UASD_ID)AND CED.UASD_ID="+CTERM_rmtypid+" and(UASD.URTD_ID=URTD.URTD_ID)";
        var CTERM_rs = CTERM_stmt.executeQuery(CTERM_select_roomtype);
        if(CTERM_rs.next()){  
          var CTERM_roomtype = CTERM_rs.getString("URTD_ROOM_TYPE");
        }
        CTERM_rs.close();
        CTERM_stmt.close();
        
        var CTERM_gstcard= CTERM_custdtlsrs.getString("CLP_GUEST_CARD");
        if(CTERM_gstcard==null){ CTERM_gstcard=""; } 
        var CTERM_extension= CTERM_custdtlsrs.getString("CED_EXTENSION");
        if(CTERM_extension==null){ CTERM_extension=""; }      
        var CTERM_redver = CTERM_custdtlsrs.getString("CED_REC_VER");
        if(CTERM_count==0){
          var userProperties = PropertiesService.getUserProperties().setProperty('cterm_activerv',CTERM_redver);
        }
        var CTERM_comments = CTERM_custdtlsrs.getString("CPD_COMMENTS");
        if(CTERM_comments==null){ CTERM_comments=""; }      
        var CTERM_userstamp = CTERM_custdtlsrs.getString("ULD_LOGINID");
        var CTERM_timestamp = (CTERM_custdtlsrs.getString("CTDTIMESTAMP"))      
        var CTERM_preterminatedate = CTERM_custdtlsrs.getString("CLP_PRETERMINATE_DATE");
        if(CTERM_preterminatedate==null){ CTERM_preterminatedate=""; }    
        var CTERM_lp = CTERM_custdtlsrs.getString("CED_LEASE_PERIOD");
        if(CTERM_lp==null){ CTERM_lp=""; }
        var CTERM_qtrs = CTERM_custdtlsrs.getString("CED_QUARTERS");
        if(CTERM_qtrs==null){ CTERM_qtrs=""; }
        var CTERM_rechk = CTERM_custdtlsrs.getString("CED_RECHECKIN");
        if(CTERM_rechk==null){ CTERM_rechk=""; }    
        var CTERM_preterm = CTERM_custdtlsrs.getString("CED_PRETERMINATE");
        if(CTERM_preterm==null){ CTERM_preterm=""; }    
        var CTERM_final_result={'unitno':CTERM_unitno,'firstname':CTERM_firstname,'lastname':CTERM_lastname,'roomtype':CTERM_roomtype,'cardno':CTERM_cardno,'extension':CTERM_extension,'rental':CTERM_rental,'comments':CTERM_comments,'userstamp':CTERM_userstamp,'timestamp':CTERM_timestamp,'startdate':CTERM_startdate,'enddate':CTERM_enddate,'preterminatedate':CTERM_preterminatedate,'redver':CTERM_redver,'guestcard':CTERM_gstcard,'lp':CTERM_lp,'quartors':CTERM_qtrs,'rechk':CTERM_rechk,'preterm':CTERM_preterm,'term':CTERM_term};
        CTERM_final_dtls_result.push(CTERM_final_result)  
        CTERM_count++;
      }     
    }
    CTERM_custdtlsrs.close();
    CTERM_custdtlsstmt.close();
    //DROP TEMP TABLE FOR FEE DETAILS
    eilib.DropTempTable(CTERM_custdtlsconn, CTERM_tempfeetblname);
    CTERM_custdtlsconn.close();   
    var CTERM_final_resultdts={"finaldts":CTERM_final_dtls_result};
    return CTERM_final_resultdts;
  }
  
  //FUNCTION TO GET MIN PTD AFTER FULL PTD A GUEST IN SELECTED RV N TO CHK EXTN LPS FOR PTD<=SD
  function CTERM_getMinPTD(CTERM_custid,CTERM_radio_termoption,CTERM_custrv)
  {
    CTERM_custid=CTERM_custid.split("@")[0];
    var CTERM_custptdempty=false;
    var CTERM_allptddate=[]
    var CTERM_final_dtls_result=[];
    var CTERM_custdtlsconn= eilib.db_GetConnection()
    var CTERM_custdtls_lastptdstmt = CTERM_custdtlsconn.createStatement(); 
    var CTERM_custdtlsquery="SELECT CTD.CLP_STARTDATE,CTD.CLP_ENDDATE,CTD.CLP_PRETERMINATE_DATE,CACD.CACD_VALID_TILL,CTD.CLP_GUEST_CARD FROM  CUSTOMER_ENTRY_DETAILS CED  LEFT JOIN CUSTOMER_LP_DETAILS CTD ON CED.CUSTOMER_ID=CTD.CUSTOMER_ID AND(CTD.CED_REC_VER=CED.CED_REC_VER) LEFT JOIN CUSTOMER_ACCESS_CARD_DETAILS CACD ON CED.CUSTOMER_ID=CACD.CUSTOMER_ID AND   CTD.UASD_ID=CACD.UASD_ID  LEFT JOIN CUSTOMER C ON CED.CUSTOMER_ID=C.CUSTOMER_ID LEFT JOIN UNIT_ACCESS_STAMP_DETAILS UASD ON CACD.UASD_ID=UASD.UASD_ID ,UNIT U  WHERE   (CED.UNIT_ID=U.UNIT_ID) AND (CED.CUSTOMER_ID="+CTERM_custid+")  AND CED.CED_REC_VER="+CTERM_custrv+" AND (CLP_STARTDATE<=CURDATE() OR CLP_STARTDATE>=CURDATE()) AND CED.CED_CANCEL_DATE IS NULL ORDER BY CED.CED_REC_VER, CTD.CLP_GUEST_CARD ASC"
    var CTERM_custdtls_lastptdrs = CTERM_custdtls_lastptdstmt.executeQuery(CTERM_custdtlsquery);
    while(CTERM_custdtls_lastptdrs.next())
    {
      var CTERM_chkkenddate = CTERM_custdtls_lastptdrs.getDate("CLP_ENDDATE").getTime();
      var CTERM_chkksddate = CTERM_custdtls_lastptdrs.getDate("CLP_STARTDATE").getTime();
      var CTERM_chkkptd = CTERM_custdtls_lastptdrs.getString("CLP_PRETERMINATE_DATE"); 
      var CTERM_ctdguestflag=CTERM_custdtls_lastptdrs.getString("CLP_GUEST_CARD");
      if(CTERM_chkkptd!=null)
      {
        var CTERM_ptddtime=CTERM_custdtls_lastptdrs.getDate("CLP_PRETERMINATE_DATE").getTime();
        if(CTERM_ctdguestflag!=null&&new Date(Utilities.formatDate(new Date(CTERM_ptddtime), TimeZone, 'yyyy/MM/dd 00:00:00'))<=new Date(Utilities.formatDate(new Date(),TimeZone, 'yyyy/MM/dd 00:00:00')))
        {
          CTERM_allptddate.push(CTERM_ptddtime);
        }
        if(CTERM_ctdguestflag==null&&new Date(Utilities.formatDate(new Date(CTERM_ptddtime),TimeZone, 'yyyy/MM/dd 00:00:00'))<=new Date(Utilities.formatDate(new Date(CTERM_chkksddate),TimeZone, 'yyyy/MM/dd 00:00:00')))
        {
          CTERM_custptdempty=true;
        }
      }
    }
    CTERM_custdtls_lastptdrs.close();
    CTERM_custdtls_lastptdstmt.close();
    CTERM_custdtlsconn.close();
    var CTERM_minptd="";
    if(CTERM_allptddate.length>0)
    {
      CTERM_allptddate.sort(function(a,b){return a-b});
      CTERM_minptd=CTERM_allptddate[CTERM_allptddate.length-1];
      CTERM_minptd= Utilities.formatDate(new Date(CTERM_minptd),TimeZone, 'dd-MM-yyyy');
    }
    var CTERM_finalptdncustptdchk={"cterm_mincustptd":CTERM_minptd,"cterm_custptdchk":CTERM_custptdempty};
    return CTERM_finalptdncustptdchk;
  }  
  //FUNCTION TO UPDATE PTD DTLS
  function CTERM_UpdatePtd(CTERM_form,CTERM_result_array)
  {   
    var CTERM_lb_custname=CTERM_form.CTERM_lb_custname;
    var CTERM_radio_termoption=CTERM_form.CTERM_radio_termoption;
    var CTERM_ta_comments=CTERM_form.CTERM_ta_comments;
    if(CTERM_ta_comments!="")
    {
      CTERM_ta_comments=eilib.ConvertSpclCharString(CTERM_ta_comments);
    }
    var CTERM_custidrv=CTERM_form.CTERM_hidden_custid;
    var CTERM_custid=CTERM_custidrv.split("@")[0];
    var CTERM_recver=CTERM_custidrv.split("@")[1];
    var CTERM_unitno=CTERM_form.CTERM_unitno
    var CTERM_cb_cardnos=[];
    var CTERM_hidden_finalcards=CTERM_form.CTERM_hidden_finalcards;
    try
    {
      var CTERM_custdtlsconn= eilib.db_GetConnection();
      CTERM_custdtlsconn.setAutoCommit(false);
      var CTERM_UserStampId=eilib.getUserStampId(CTERM_custdtlsconn,UserStamp);
      var CTERM_tddate=eilib.gettimezone24HRS();   
      if(CTERM_radio_termoption=="CTERM_radio_reactivecust")
      {
        var CTERM_savestmt=CTERM_custdtlsconn.createStatement();
        CTERM_savestmt.execute("CALL SP_CUSTOMER_REACTIVE_UPDATE("+CTERM_custid+",'"+UserStamp+"',@TERMRESULT_FLAG)");
        CTERM_savestmt.close();
      }
      else if(CTERM_radio_termoption=="CTERM_radio_untermnonactive")
      {
        var CTERM_savestmt=CTERM_custdtlsconn.createStatement();
        CTERM_savestmt.execute("CALL SP_CUSTOMER_UNTERMINATED_NON_ACTIVE_UPDATE("+CTERM_custid+",'"+UserStamp+"','"+CTERM_tddate+"',@TERMRESULT_FLAG)");
        CTERM_savestmt.close();
      }
      else if(CTERM_radio_termoption=="CTERM_radio_activecust")
      {
        var CTERM_find=(CTERM_hidden_finalcards.toString()).search(',');
        if(CTERM_find!=-1)
        {
          var finalarray=CTERM_hidden_finalcards.split(",")
          for(var i=0;i<finalarray.length;i++)
          {
            CTERM_cb_cardnos.push(finalarray[i])
          }
        }
        else
        {
          CTERM_cb_cardnos=CTERM_hidden_finalcards
        }
        var CTERM_db_ptddate=CTERM_form.CTERM_db_ptddate
        var CTERM_lb_ptdfrmtime=CTERM_form.CTERM_lb_ptdfrmtime;
        var CTERM_lb_ptdtotime=CTERM_form.CTERM_lb_ptdtotime;
        var CTERM_customename=CTERM_lb_custname.split("_")[0]+" "+CTERM_lb_custname.split("_")[1]
        CTERM_lb_custname=CTERM_lb_custname.replace(/ /g,"_");
        var CTERM_ptddate="";
        var CTERM_customerptd="";
        var CTERM_ptdsttime="";
        var CTERM_ptdedtime="";
        var CTERM_accesscard="";
        var CTERM_guestcard="";
        var CTERM_ptdcalstime="";
        var CTERM_ptdcaletime="";
        if(CTERM_cb_cardnos!=undefined)
        {
          var CTERM_find=(CTERM_cb_cardnos.toString()).search(',');
          if(CTERM_find!=-1)
          {
            for(var i=0;i<CTERM_cb_cardnos.length;i++)
            {
              var CTERM_cardno=CTERM_cb_cardnos[i].split("$")[0]
              var CTERM_cardlbl=(CTERM_cb_cardnos[i].split("$")[1]).split("@")[0];
              var CTERM_ptd=eilib.SqlDateFormat((CTERM_cb_cardnos[i].split("$")[1]).split("@")[1]);
              if(CTERM_cardlbl==CTERM_lb_custname)
              {
                CTERM_customerptd=CTERM_ptd;
                var CTERM_findtime=(CTERM_lb_ptdfrmtime.toString()).search(',');
                if(CTERM_findtime!=-1)
                {
                  for(var ll=0;ll<CTERM_lb_ptdfrmtime.length;ll++)
                  {
                    if(CTERM_lb_ptdfrmtime[ll]!="SELECT")
                    {
                      CTERM_ptdsttime="'"+CTERM_lb_ptdfrmtime[ll]+"'";
                      CTERM_ptdcalstime=CTERM_lb_ptdfrmtime[ll];
                      var CTERM_findtotime=(CTERM_lb_ptdtotime.toString()).search(',');
                      if(CTERM_findtotime!=-1)
                      {
                        CTERM_ptdedtime="'"+CTERM_lb_ptdtotime[ll]+"'";
                        CTERM_ptdcaletime=CTERM_lb_ptdtotime[ll];
                      }
                      else
                      {
                        CTERM_ptdedtime="'"+CTERM_lb_ptdtotime+"'";
                        CTERM_ptdcaletime=CTERM_lb_ptdtotime;
                      }
                    }
                  }
                }
                else
                {
                  if(CTERM_lb_ptdfrmtime!="SELECT")
                  {
                    CTERM_ptdsttime="'"+CTERM_lb_ptdfrmtime+"'";
                    CTERM_ptdedtime="'"+CTERM_lb_ptdtotime+"'";
                    CTERM_ptdcalstime=CTERM_lb_ptdfrmtime;
                    CTERM_ptdcaletime=CTERM_lb_ptdtotime;
                  }
                }
                if(CTERM_accesscard=="")
                {
                  CTERM_accesscard=CTERM_cardno;
                  CTERM_guestcard=CTERM_cardno+','+' ';
                  CTERM_ptddate=CTERM_cardno+','+CTERM_ptd;
                }
                else
                {
                  CTERM_accesscard=CTERM_accesscard+','+CTERM_cardno;
                  CTERM_accesscard=CTERM_guestcard+','+CTERM_cardno+', ';
                  CTERM_ptddate+=CTERM_cardno+','+CTERM_ptd;
                }
              }
              else
              {
                if(CTERM_ptdsttime=="")
                {
                  CTERM_ptdsttime=null; 
                  CTERM_ptdedtime=null;
                }
                if(CTERM_accesscard=="")
                {
                  CTERM_guestcard=CTERM_cardno+',X';
                  CTERM_accesscard=CTERM_cardno;
                  CTERM_ptddate=CTERM_cardno+','+CTERM_ptd;
                }
                else
                {
                  CTERM_accesscard=CTERM_accesscard+','+CTERM_cardno;
                  CTERM_guestcard=CTERM_guestcard+','+CTERM_cardno+',X';
                  CTERM_ptddate+=','+CTERM_cardno+','+CTERM_ptd;
                }
              }
            }
          }
          else
          {
            var CTERM_ptddate=CTERM_db_ptddate;
            var CTERM_cardno=CTERM_cb_cardnos.split("$")[0]
            var CTERM_cardlbl=(CTERM_cb_cardnos.split("$")[1]).split("@")[0];
            var CTERM_ptd=eilib.SqlDateFormat((CTERM_cb_cardnos.split("$")[1]).split("@")[1]);
            if(CTERM_cardlbl==CTERM_lb_custname)
            {
              CTERM_customerptd=CTERM_ptd;
              var CTERM_findtime=(CTERM_lb_ptdfrmtime.toString()).search(',');
              if(CTERM_findtime!=-1)
              {
                for(var ll=0;ll<CTERM_lb_ptdfrmtime.length;ll++)
                {
                  if(CTERM_lb_ptdfrmtime[ll]!="SELECT")
                  {
                    CTERM_ptdsttime="'"+CTERM_lb_ptdfrmtime[ll]+"'";
                    CTERM_ptdcalstime=CTERM_lb_ptdfrmtime[ll];
                    var CTERM_findtotime=(CTERM_lb_ptdtotime.toString()).search(',');
                    if(CTERM_findtotime!=-1)
                    {
                      CTERM_ptdedtime="'"+CTERM_lb_ptdtotime[ll]+"'";
                      CTERM_ptdcaletime=CTERM_lb_ptdtotime[ll];
                    }
                    else
                    {
                      CTERM_ptdedtime="'"+CTERM_lb_ptdtotime+"'";
                      CTERM_ptdcaletime=CTERM_lb_ptdtotime
                    }
                  }
                }
                
              }
              else
              {
                if(CTERM_lb_ptdfrmtime!="SELECT")
                {
                  CTERM_ptdsttime="'"+CTERM_lb_ptdfrmtime+"'";
                  CTERM_ptdedtime="'"+CTERM_lb_ptdtotime+"'";
                  CTERM_ptdcalstime=CTERM_lb_ptdfrmtime
                  CTERM_ptdcaletime=CTERM_lb_ptdtotime
                }
              }
              if(CTERM_accesscard=="")
              {
                if(CTERM_cardno=="")//null card customer
                {
                  CTERM_cardno=0 
                }
                CTERM_accesscard=CTERM_cardno;
                CTERM_guestcard=CTERM_cardno+','+' ';
                CTERM_ptddate=CTERM_cardno+','+CTERM_ptd;
              }
              else
              {
                CTERM_accesscard=CTERM_accesscard+','+CTERM_cardno;
                CTERM_accesscard=CTERM_guestcard+','+CTERM_cardno+', ';
                CTERM_ptddate+=','+CTERM_cardno+','+CTERM_ptd;
              }
            }
            else
            {
              if(CTERM_ptdsttime=="")
              {
                CTERM_ptdsttime=null;
                CTERM_ptdedtime=null;
              }
              if(CTERM_accesscard=="")
              {
                CTERM_guestcard=CTERM_cardno+',X';
                CTERM_accesscard=CTERM_cardno;
                CTERM_ptddate=CTERM_cardno+','+CTERM_ptd;
              }
              else
              {
                CTERM_accesscard=CTERM_accesscard+','+CTERM_cardno;
                CTERM_guestcard=CTERM_guestcard+','+CTERM_cardno+',X';
                CTERM_ptddate+=','+CTERM_cardno+','+CTERM_ptd;
              }
            }
          }
        }
        
        //CALCULATE LP N QUARTERS START
        var CTERM_lpqrts=[];
        var CTERM_rvlpqrts="";
        var CTERM_calptd=[];
        var CTERM_allfincustdetails=[];
        var CTERM_prevrvdtls=[];
        if(CTERM_customerptd!="")
        {
          var CTERM_lp="",CTERM_qrtrs="";
          var CTERM_lpqrtrsstmt= CTERM_custdtlsconn.createStatement();
          var CTERM_lpqrtrsquery="SELECT CED.CED_REC_VER,U.UNIT_NO,CTD.CLP_STARTDATE,CTD.CLP_ENDDATE,CTD.CLP_PRETERMINATE_DATE FROM  CUSTOMER_ENTRY_DETAILS CED,CUSTOMER_LP_DETAILS CTD,CUSTOMER C,UNIT U   WHERE CED.CED_REC_VER=CTD.CED_REC_VER AND CED.CUSTOMER_ID=CTD.CUSTOMER_ID AND(CTD.CED_REC_VER=CED.CED_REC_VER) AND CED.CUSTOMER_ID=C.CUSTOMER_ID AND   (CED.UNIT_ID=U.UNIT_ID) AND (CED.CUSTOMER_ID="+CTERM_custid+")  AND (CTD.CLP_STARTDATE<=CURDATE() OR CTD.CLP_STARTDATE>=CURDATE()) AND CED.CED_CANCEL_DATE IS NULL AND IF(CTD.CLP_PRETERMINATE_DATE IS NOT NULL,CTD.CLP_PRETERMINATE_DATE>CURDATE(),CTD.CLP_ENDDATE>CURDATE()) AND CTD.CLP_GUEST_CARD IS NULL ORDER BY CED.CED_REC_VER, CTD.CLP_GUEST_CARD ASC"
          var CTERM_lpqrtrsres = CTERM_lpqrtrsstmt.executeQuery(CTERM_lpqrtrsquery);
          var iv=0;
          while(CTERM_lpqrtrsres.next())
          {
            var CTERM_chkedflag=0,CTERM_chkpdflag=0,CTERM_chksdflag=0;
            var CTERM_recversion=CTERM_lpqrtrsres.getString("CED_REC_VER");
            var CTERM_nextrv=0;
            CTERM_nextrv=parseInt(CTERM_recversion)+1;
            var CTERM_stdate=CTERM_lpqrtrsres.getString("CLP_STARTDATE");
            var CTERM_eddate=CTERM_lpqrtrsres.getString("CLP_ENDDATE");
            var CTERM_endddate=CTERM_eddate
            var CTERM_ptddddate=CTERM_lpqrtrsres.getString("CLP_PRETERMINATE_DATE");
            var CTERM_Leaseperiod="";var CTERM_quators="";
            if(parseInt(CTERM_recversion)<parseInt(CTERM_recver))
            {
              var CTERM_lpqrtrsnextrv_edstmt= CTERM_custdtlsconn.createStatement();
              var CTERM_lpqrtrsnextrv_edquery="SELECT CLP_STARTDATE FROM CUSTOMER_LP_DETAILS WHERE CED_REC_VER="+CTERM_nextrv+" AND CLP_STARTDATE='"+CTERM_eddate+"' AND CUSTOMER_ID="+CTERM_custid+" AND CLP_GUEST_CARD IS NULL ";
              var CTERM_lpqrtrsnextrv_edres = CTERM_lpqrtrsnextrv_edstmt.executeQuery(CTERM_lpqrtrsnextrv_edquery);
              while(CTERM_lpqrtrsnextrv_edres.next())
              {
                CTERM_chkedflag=1;
                CTERM_prevrvdtls.push({'recver':CTERM_recversion,'startdate':CTERM_stdate,'enddate':CTERM_eddate});
              }
              if(CTERM_chkedflag==0 )
              {
                if(CTERM_ptddddate!=null)
                {
                  CTERM_eddate=CTERM_ptddddate;
                  CTERM_prevrvdtls.push({'recver':CTERM_recversion,'startdate':CTERM_stdate,'enddate':CTERM_eddate});
                }
                else 
                {
                  CTERM_prevrvdtls.push({'recver':CTERM_recversion,'startdate':CTERM_stdate,'enddate':CTERM_eddate});
                }
              }
            }
            if(CTERM_ptddddate!=null)
            {
              CTERM_eddate=CTERM_ptddddate;
            }
            if(CTERM_chkedflag==0)
            {
              var CTERM_lpqrtrsnextrv_ptdstmt= CTERM_custdtlsconn.createStatement();
              if(CTERM_ptddddate !=null)
              {
                if(new Date(Utilities.formatDate(new Date(CTERM_stdate.split('-')[0],CTERM_stdate.split('-')[1]-1,CTERM_stdate.split('-')[2]),TimeZone, 'yyyy/MM/dd 00:00:00'))<new Date(Utilities.formatDate(new Date(CTERM_eddate.split('-')[0],CTERM_eddate.split('-')[1]-1,CTERM_eddate.split('-')[2]),TimeZone, 'yyyy/MM/dd 00:00:00')))
                {
                  var CTERM_lpqrtrsnextrv_ptdquery="SELECT CLP_STARTDATE FROM CUSTOMER_LP_DETAILS WHERE CLP_GUEST_CARD IS NULL AND CED_REC_VER="+CTERM_nextrv+" AND CLP_ENDDATE>'"+CTERM_ptddddate+"' AND (CLP_STARTDATE>'"+CTERM_ptddddate+"' OR CLP_STARTDATE<'"+CTERM_ptddddate+"') AND IF(CLP_PRETERMINATE_DATE IS NOT NULL,CLP_PRETERMINATE_DATE>CURDATE(),CLP_ENDDATE>CURDATE()) AND CUSTOMER_ID="+CTERM_custid+"";
                  var CTERM_lpqrtrsnextrv_ptdres = CTERM_lpqrtrsnextrv_ptdstmt.executeQuery(CTERM_lpqrtrsnextrv_ptdquery);
                  while(CTERM_lpqrtrsnextrv_ptdres.next())
                  {
                    CTERM_prevrvdtls.push({'recver':CTERM_nextrv,'startdate':CTERM_ptddddate,'enddate':CTERM_eddate});
                    var chkrecverflag=0;
                    for(var ij=0;ij<CTERM_prevrvdtls.length;ij++)
                    {
                      if(CTERM_prevrvdtls[ij].recver==CTERM_recversion)
                      {
                        chkrecverflag=1;
                      }
                    }
                    if(chkrecverflag==0)
                    {
                      CTERM_prevrvdtls.push({'recver':CTERM_recversion,'startdate':CTERM_stdate,'enddate':CTERM_eddate});
                    }
                    CTERM_chkpdflag=1;
                  }
                }
              }
              else
              {
                var CTERM_lpqrtrsnextrv_sdquery="SELECT CLP_STARTDATE FROM CUSTOMER_LP_DETAILS WHERE CLP_GUEST_CARD IS NULL AND CED_REC_VER="+CTERM_nextrv+" AND CLP_ENDDATE>'"+CTERM_eddate+"' AND (CLP_STARTDATE>'"+CTERM_eddate+"' OR CLP_STARTDATE<'"+CTERM_eddate+"') AND IF(CLP_PRETERMINATE_DATE IS NOT NULL,CLP_PRETERMINATE_DATE>CURDATE(),CLP_ENDDATE>CURDATE()) AND CUSTOMER_ID="+CTERM_custid+"";
                var CTERM_lpqrtrsnextrv_sdres = CTERM_lpqrtrsnextrv_ptdstmt.executeQuery(CTERM_lpqrtrsnextrv_sdquery);
                while(CTERM_lpqrtrsnextrv_sdres.next())
                {
                  CTERM_prevrvdtls.push({'recver':CTERM_nextrv,'startdate':CTERM_eddate,'enddate':CTERM_eddate});
                  var chkrecverflag=0;
                  for(var ij=0;ij<CTERM_prevrvdtls.length;ij++)
                  {
                    if(CTERM_prevrvdtls[ij].recver==CTERM_recversion)
                    {
                      chkrecverflag=1;
                    }
                  }
                  if(chkrecverflag==0)
                  {
                    CTERM_prevrvdtls.push({'recver':CTERM_recversion,'startdate':CTERM_stdate,'enddate':CTERM_eddate});
                  }
                  CTERM_chksdflag=1;
                }
              }
              if(CTERM_chkpdflag==0&&CTERM_chkedflag==0)
              {
                if(CTERM_ptddddate!=null)
                {
                  CTERM_eddate=CTERM_ptddddate;
                }
              }
              var chkrecverflag=0;
              for(var ij=0;ij<CTERM_prevrvdtls.length;ij++)
              {
                if(CTERM_prevrvdtls[ij].recver==CTERM_recversion)
                {
                  chkrecverflag=1;
                }
              }
              if(chkrecverflag==0)
              {
                CTERM_prevrvdtls.push({'recver':CTERM_recversion,'startdate':CTERM_stdate,'enddate':CTERM_eddate});
              }  
            }
          }//END FIRST WHILE
        }//END FIRST IF WITH CUST PTD !=""
        for(var l=0;l<CTERM_prevrvdtls.length;l++)
        {
          CTERM_calptd.push({"calrv":CTERM_prevrvdtls[l].recver,"calptd":CTERM_prevrvdtls[l].enddate});
          //QUATORS N LEASE PERIOD CALC
          var CTERM_sdate=(CTERM_prevrvdtls[l].startdate).split('-');
          var CTERM_edate=(CTERM_prevrvdtls[l].enddate).split('-');
          if(parseInt(CTERM_prevrvdtls[l].recver)>=parseInt(CTERM_recver))
          {
            CTERM_edate=CTERM_customerptd.split('-');
          }
          if(new Date(Utilities.formatDate(new Date(CTERM_edate[0],CTERM_edate[1]-1,CTERM_edate[2]),TimeZone, 'yyyy/MM/dd 00:00:00'))>new Date(Utilities.formatDate(new Date(CTERM_sdate[0],CTERM_sdate[1]-1,CTERM_sdate[2]),TimeZone, 'yyyy/MM/dd 00:00:00')))
          {
            CTERM_quators  = eilib.quarterCalc(new Date(CTERM_sdate[0],CTERM_sdate[1]-1,CTERM_sdate[2]),new Date(CTERM_edate[0],CTERM_edate[1]-1,CTERM_edate[2])); 
            CTERM_Leaseperiod  = eilib.leasePeriodCalc(new Date(CTERM_sdate[0],CTERM_sdate[1]-1,CTERM_sdate[2]),new Date(CTERM_edate[0],CTERM_edate[1]-1,CTERM_edate[2]));
          }
          else
          {
            CTERM_Leaseperiod=" ";
            CTERM_quators=" ";
          }
          if(CTERM_rvlpqrts=="")
          {
            CTERM_rvlpqrts=CTERM_prevrvdtls[l].recver+",&"+CTERM_Leaseperiod+",&"+CTERM_quators;
          }
          else
          {
            CTERM_rvlpqrts+=",&"+CTERM_prevrvdtls[l].recver+",&"+CTERM_Leaseperiod+",&"+CTERM_quators;
          }
        }
        //CALCULATE LP N QUARTERS END
        var calenderIDcode=eilib.CUST_getCalenderId(CTERM_custdtlsconn);//get calendar name from eilib
        //cal calendar event function if cust is ptd
        if(CTERM_customerptd!="")
        {
          var CALEVENTS=eilib.CTermExtn_GetCalevent(CTERM_custdtlsconn,CTERM_custid);
        }
        var CTERM_activervvalue=parseInt(PropertiesService.getUserProperties().getProperty("cterm_activerv"));
        var CTERM_savestmt=CTERM_custdtlsconn.createStatement();
        CTERM_savestmt.execute("CALL SP_CUSTOMER_MANUAL_TERMINATION_INSERT("+CTERM_custid+","+CTERM_recver+","+CTERM_activervvalue+",'"+CTERM_accesscard+"','"+CTERM_guestcard+"','"+CTERM_ptddate+"','"+CTERM_rvlpqrts+"',"+CTERM_ptdsttime+","+CTERM_ptdedtime+",'"+CTERM_ta_comments+"','"+UserStamp+"',@TERMRESULT_FLAG)");
        CTERM_savestmt.close();      
      }
      var CTERM_updateflag=0;
      var CTERM_updateflag_stmt=CTERM_custdtlsconn.createStatement();
      var CTERM_updateflag_query="SELECT @TERMRESULT_FLAG";
      var CTERM_updateflag_rs=CTERM_updateflag_stmt.executeQuery(CTERM_updateflag_query);
      while(CTERM_updateflag_rs.next())
      {
        CTERM_updateflag=CTERM_updateflag_rs.getString(1);
      }      
      if(CTERM_updateflag==1&&(CTERM_radio_termoption=="CTERM_radio_activecust"))
      {
        if(CTERM_customerptd!="")
        {
          for(var ijk=0;ijk<CALEVENTS.length;ijk++)
          {
            eilib.CUST_customerTermcalenderdeletion(CTERM_custid,calenderIDcode,CALEVENTS[ijk].sddate,CALEVENTS[ijk].sdtimein,CALEVENTS[ijk].sdtimeout,CALEVENTS[ijk].eddate,CALEVENTS[ijk].edtimein,CALEVENTS[ijk].edtimeout,"")
          }
          eilib.CTermExtn_Calevent(CTERM_custdtlsconn,CTERM_custid,CTERM_recver,calenderIDcode,"TERMINATION",CTERM_updateflag);    
        }
      }
      CTERM_updateflag_rs.close();
      CTERM_updateflag_stmt.close();
      CTERM_custdtlsconn.commit();
      CTERM_custdtlsconn.close();
      return CTERM_updateflag;
    }
    catch(err)
    {
      Logger.log("SCRIPT EXCEPTION:"+err)
      CTERM_custdtlsconn.rollback();
      if(CTERM_customerptd!=""&&CTERM_customerptd!=undefined)
      {  
        eilib.CTermExtn_Calevent(CTERM_custdtlsconn,CTERM_custid,CTERM_recver,calenderIDcode,"TERMINATION",0);    
      }  
      return (Logger.getLog());
    }   
  }
  // FUNCTION TO CALL UNTERM CUST SP
  function CTERM_Calluntermcustsp(CTERM_callspcon)
  {
    var CTERM_callspstmt=CTERM_callspcon.createStatement();
    var CTERM_callspquery="CALL SP_NON_TERMINATED_CUSTOMER('"+UserStamp+"',@TEMP_TERMINATED_CUSTOMER,@TEMP_ACTIVE_CUSTOMER,@FINAL_TERMINATED_CUSTOMER,@NON_TERMINATED_CUSTOMER)";
    CTERM_callspstmt.execute(CTERM_callspquery);
    var CTERM_feetemptbl_stmt=CTERM_callspcon.createStatement();
    var CTERM_feetemptbl_query="SELECT @FINAL_TERMINATED_CUSTOMER,@NON_TERMINATED_CUSTOMER,@TEMP_TERMINATED_CUSTOMER,@TEMP_ACTIVE_CUSTOMER";
    var CTERM_feetemptblres=CTERM_feetemptbl_stmt.executeQuery(CTERM_feetemptbl_query);
    var CTERM_temptblname_array=[];
    var CTERM_temptblname1="",CTERM_temptblname2="",CTERM_temptblname3="",CTERM_temptblname4="";
    while(CTERM_feetemptblres.next())
    {
      CTERM_temptblname1=CTERM_feetemptblres.getString('@FINAL_TERMINATED_CUSTOMER');
      CTERM_temptblname2=CTERM_feetemptblres.getString('@NON_TERMINATED_CUSTOMER');
      CTERM_temptblname3=CTERM_feetemptblres.getString('@TEMP_TERMINATED_CUSTOMER');
      CTERM_temptblname4=CTERM_feetemptblres.getString('@TEMP_ACTIVE_CUSTOMER');
    }
    CTERM_temptblname_array=[CTERM_temptblname1,CTERM_temptblname2,CTERM_temptblname3,CTERM_temptblname4];
    CTERM_feetemptblres.close();
    CTERM_feetemptbl_stmt.close();
    CTERM_callspstmt.close();
    return CTERM_temptblname_array;
  }
  //FUNCTION TO DROP TEMP TABLES FOR UNTERMINATION CUSTOMER OPTION
  function DropUntermTables(CTERM_custdtlsconn,CTERM_temptable)
  {
    eilib.DropTempTable(CTERM_custdtlsconn,CTERM_temptable[0]);
    eilib.DropTempTable(CTERM_custdtlsconn,CTERM_temptable[1]);
    eilib.DropTempTable(CTERM_custdtlsconn,CTERM_temptable[2]);
    eilib.DropTempTable(CTERM_custdtlsconn,CTERM_temptable[3]);
  }
  
}
catch(err)
{
}
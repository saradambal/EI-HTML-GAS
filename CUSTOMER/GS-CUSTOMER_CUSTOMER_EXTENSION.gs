//*******************************************FILE DESCRIPTION*********************************************//
/**********************************************CUSTOMER EXTENSION******************************************/
//DONE BY:PUNITHA,KUMAR
//VER 1.1-SD:03/07/2014 ED:03/07/2014,TRACKER NO:813,changed processing cost 5 digits real to 4 digits for amt validation,added numbers only tooltip for amt fields by PUNI
//VER 1.0-SD:18/06/2014 ED:19/06/2014,TRACKER NO:813,added passport date n ep date validation greater than chk out date n checked userstamp n timestamp updation by PUNI
//VER 0.09-SD:04/06/2014 ED:04/06/2014,TRACKER NO:813,ep date n pass date max date is fixed,added err msg if cal name is wrong n doc id is wrong,changed new drive link BY PUNI
//VER 0.08-SD:28/05/2014 ED:28/05/2014,TRACKER NO:813,corrected checkout date DP format,changed query to set max check out date after ptd in between lp n extnd because of card assign view changes by PUNI
//VER 0.07-SD:29/04/2014 ED:29/04/2014,TRACKER NO:813,Added one input parameter in Extension fee temp table.done by kumar
//VER 0.06-SD:12/04/2014 ED:22/04/2014,TRACKER NO:813,updated validation to clear dp when diff unit is selected n chked tickler table updation sp n updated script to show error msg if active card is assigned returned from sp n checked with corrected term sp BY PUNI
//VER 0.05-SD:17/03/2014 ED:12/04/2014,TRACKER NO:813,updated validation for passport no,ep no if expiry date entered n updated some form validation to set check out date after ptd in the middle of some lps,changed extension sp to reorder lps when extn after ptd,changed table name as per new changes BY PUNI
//VER 0.04-SD:17/03/2014 ED:17/03/2014,TRACKER NO:731,issue fixed n cr updated-updated uld id,taken err msg from eilib,changed eilib cal event to cal time from id,implemented array concept,added flag to show confirm mesg,updatd mobile,office,ep no,pass no validation BY PUNI
//VER 0.03-SD:20/01/2013 ED:20/01/2013,TRACKER NO:713,updated err msg for no diff unit as per issue 713,calling calendar event function from eilib becas of changes in ptd null in termination,reusing cal event function in both form,updated drop table instead of delete for temp table,changed title tag h1 to h2 in html BY PUNI
//VER 0.02-SD:30/11/2013 ED:29/12/2013,TRACKER NO:318,changed eilib function calling to pass conn,updated invoice to pass cust id,updated amt,contact no validation BY PUNI
//VER 0.01-INITIAL VERSION, SD:02/08/2013 ED:30/11/2013,TRACKER NO:318 BY PUNI
//*********************************************************************************************************//
try
{  
  //FUNCTION TO GET ALL EXTENSION UNIT NOS
  function CEXTN_getExtnUnitNo()
  {
    var CEXTN_extndtscon =eilib.db_GetConnection();
    var CEXTN_extndtsstmt= CEXTN_extndtscon.createStatement();
    var CEXTN_extndtsarray =[];
    var CEXTN_extndtsquery= "SELECT UNIT_NO FROM VW_EXTENSION_CUSTOMER ORDER BY UNIT_NO ASC"; 
    var CEXTN_extndtsres = CEXTN_extndtsstmt.executeQuery(CEXTN_extndtsquery);
    while(CEXTN_extndtsres.next())
    {
      CEXTN_extndtsarray.push({unitnum:CEXTN_extndtsres.getString("UNIT_NO")});
    }
    CEXTN_extndtsres.close();
    CEXTN_extndtsstmt.close();
    CEXTN_extndtscon.close()
    return CEXTN_extndtsarray;
  }
  //FUNCTION TO GET CUSTOMER NAME N CUSTOMER ID
  function CEXTN_getCustomerNameId(CEXTN_lb_unitno)
  {
    var CEXTN_extndtscon =eilib.db_GetConnection();
    var CEXTN_extndtsstmt= CEXTN_extndtscon.createStatement();
    var CEXTN_extndtsarray =[];
    var CEXTN_extndtsquery= "SELECT CUSTOMER_ID,CUSTOMERNAME FROM VW_EXTENSION_CUSTOMER WHERE UNIT_NO="+CEXTN_lb_unitno+" ORDER BY CUSTOMERNAME ASC"; 
    var CEXTN_extndtsres = CEXTN_extndtsstmt.executeQuery(CEXTN_extndtsquery);
    while(CEXTN_extndtsres.next())
    {
      CEXTN_extndtsarray.push({customerid:CEXTN_extndtsres.getString("CUSTOMER_ID"),customername:CEXTN_extndtsres.getString("CUSTOMERNAME")});
    }
    CEXTN_extndtsres.close();
    CEXTN_extndtsstmt.close();
    CEXTN_extndtscon.close()
    return CEXTN_extndtsarray;
  }
  //FUNCTION TO GET UNIT NOS,ERROR MSGS,PRORATED N WAIVED VALUE,ALL EXTN DETAILS
  function CEXTN_getCommonvalues()
  { 
    //GET CALENDAR TIME
    var CEXTN_timearray=[];
    var CEXTN_errconn = eilib.db_GetConnection();
    CEXTN_timearray=eilib.CUST_getCalendarTime(CEXTN_errconn);
    //GET MAIL IDS
    var mail_array=[];
    mail_array=eilib.getProfileEmailId(CEXTN_errconn,"EXTENSION");
    var CEXTN_errids="1,2,33,34,35,36,76,77,97,282,331,332,339,342,343,344,345,346,347,348,386,400,443,444,447,458,459,460,461"
    var CEXTN_errmsgs=eilib.GetErrorMessageList(CEXTN_errconn,CEXTN_errids);
    var CEXTN_error_array =[];
    CEXTN_error_array=CEXTN_errmsgs.errormsg;
    //GET PRORATED WAIVED VALUE
    var prowav_array =[];
    prowav_array=eilib.CUST_getProratedWaivedValue(CEXTN_errconn);
    //GET EXTN DETAILS
    var CEXTN_allextndetails =[];
    CEXTN_allextndetails=CEXTN_getExtnUnitNo();
    CEXTN_errconn.close();
    var CEXTN_finalcommonresult={"error":CEXTN_error_array,"mail":mail_array,"prowaiv":prowav_array,"allextndts":CEXTN_allextndetails,"caltime":CEXTN_timearray};
    return CEXTN_finalcommonresult;
  }
  //FUNCTION TO GET CUSTOMER DETAILS FOR THE SELECTED CUSTOMER ID
  function CEXTN_getCustomerdtls(CEXTN_custid,CEXTN_unitno)
  {
    var CEXTN_cdtlscon =eilib.db_GetConnection();
    var CEXTN_custamtstmt=CEXTN_cdtlscon.createStatement();
    CEXTN_custamtstmt.execute("CALL SP_CUSTOMER_EXTENSION_TEMP_FEE_DETAIL("+CEXTN_custid+",'"+UserStamp+"',@EXTN_FEETMPTBLNAM)");
    CEXTN_custamtstmt.close();
    var CEXTN_feetemptbl_stmt=CEXTN_cdtlscon.createStatement();
    var CEXTN_feetemptbl_query="SELECT @EXTN_FEETMPTBLNAM";
    var CEXTN_feetemptblres=CEXTN_feetemptbl_stmt.executeQuery(CEXTN_feetemptbl_query);
    var CExtntblname="";
    while(CEXTN_feetemptblres.next())
    {
      CExtntblname=CEXTN_feetemptblres.getString(1);
    }
    CEXTN_feetemptblres.close();
    CEXTN_feetemptbl_stmt.close();
    //READ CUST MIN RV
    var CTermExtn_tempstmt=CEXTN_cdtlscon.createStatement();
    CTermExtn_tempstmt.execute("CALL SP_CUSTOMER_MIN_MAX_RV('"+UserStamp+"',"+CEXTN_custid+",@MNMAXTBLNAME)");
    CTermExtn_tempstmt.close();
    var CTermExtn_temptbl_stmt=CEXTN_cdtlscon.createStatement();
    var CTermExtn_temptbl_query="SELECT @MNMAXTBLNAME";
    var CTermExtn_temptblres=CTermExtn_temptbl_stmt.executeQuery(CTermExtn_temptbl_query);
    var CTermExtntblname="";
    while(CTermExtn_temptblres.next())
    {
      CTermExtntblname=CTermExtn_temptblres.getString("@MNMAXTBLNAME");
    }
    CTermExtn_temptblres.close();
    CTermExtn_temptbl_stmt.close();
    var CExtn_minlp_stmt=CEXTN_cdtlscon.createStatement();
    var CExtn_minlp_query="(SELECT TCMM_MINRV FROM "+CTermExtntblname+" WHERE TCMM_CUSTOMERID="+CEXTN_custid+")";
    var CTermExtn_minlplres=CExtn_minlp_stmt.executeQuery(CExtn_minlp_query);
    var CExtnminlpval="";
    while(CTermExtn_minlplres.next())
    {
      CExtnminlpval=CTermExtn_minlplres.getString("TCMM_MINRV");
    }
    CTermExtn_minlplres.close();
    CExtn_minlp_stmt.close();
    var CEXTN_custdtlsstmt= CEXTN_cdtlscon.createStatement();
    var CEXTN_cidarray =[];
    var CEXTN_currentcheckoutdate="";
    var CEXTN_custdtlsquery="SELECT CED.CED_REC_VER,C.CUSTOMER_FIRST_NAME,C.CUSTOMER_LAST_NAME,CCD.CCD_COMPANY_NAME,CCD.CCD_COMPANY_ADDR,CCD.CCD_POSTAL_CODE,CPD.CPD_EMAIL,CPD.CPD_MOBILE,CPD.CPD_INTL_MOBILE,CCD.CCD_OFFICE_NO,CPD.CPD_DOB,NC.NC_DATA,CPD.CPD_PASSPORT_NO,CPD.CPD_PASSPORT_DATE,CPD.CPD_EP_NO,CPD.CPD_EP_DATE,URTD.URTD_ROOM_TYPE,UASD.UASD_ACCESS_CARD,CTD.CLP_ENDDATE,EF.CC_AIRCON_QUARTERLY_FEE,EF.CC_AIRCON_FIXED_FEE,EF.CC_DEPOSIT,EF.CC_PAYMENT_AMOUNT,EF.CC_PROCESSING_FEE,EF.CC_ELECTRICITY_CAP,EF.CC_DRYCLEAN_FEE,EF.CC_CHECKOUT_CLEANING_FEE,CED.CED_PRORATED,CED.CED_PROCESSING_WAIVED,CED.CED_NOTICE_START_DATE,CED.CED_NOTICE_PERIOD,CPD.CPD_COMMENTS,CTD.CLP_PRETERMINATE_DATE,CTPA.CTP_DATA AS CED_SD_STIME, CTPB.CTP_DATA AS CED_SD_ETIME,CTPC.CTP_DATA AS CED_ED_STIME, CTPD.CTP_DATA AS CED_ED_ETIME FROM CUSTOMER_ENTRY_DETAILS CED LEFT JOIN CUSTOMER_TIME_PROFILE CTPA ON CED.CED_SD_STIME = CTPA.CTP_ID LEFT JOIN CUSTOMER_TIME_PROFILE CTPB ON CED.CED_SD_ETIME = CTPB.CTP_ID LEFT JOIN CUSTOMER_TIME_PROFILE CTPC ON CED.CED_ED_STIME = CTPC.CTP_ID LEFT JOIN CUSTOMER_TIME_PROFILE CTPD ON CED.CED_ED_ETIME = CTPD.CTP_ID LEFT JOIN CUSTOMER_COMPANY_DETAILS CCD ON CED.CUSTOMER_ID=CCD.CUSTOMER_ID LEFT JOIN CUSTOMER_PERSONAL_DETAILS CPD ON CED.CUSTOMER_ID=CPD.CUSTOMER_ID LEFT JOIN CUSTOMER C ON CED.CUSTOMER_ID=C.CUSTOMER_ID LEFT JOIN CUSTOMER_LP_DETAILS CTD ON CED.CUSTOMER_ID=CTD.CUSTOMER_ID LEFT JOIN "+CExtntblname+" EF ON CED.CUSTOMER_ID=EF.CUSTOMER_ID,NATIONALITY_CONFIGURATION NC,UNIT_ACCESS_STAMP_DETAILS UASD,UNIT U,UNIT_ROOM_TYPE_DETAILS URTD,VW_EXTENSION_CUSTOMER TEC WHERE TEC.CUSTOMER_ID=CTD.CUSTOMER_ID AND CPD.NC_ID=NC.NC_ID AND UASD.UASD_ID=CED.UASD_ID AND UASD.URTD_ID=URTD.URTD_ID AND U.UNIT_ID=UASD.UNIT_ID AND CED.UNIT_ID=U.UNIT_ID AND CTD.CED_REC_VER=CED.CED_REC_VER AND C.CUSTOMER_ID="+CEXTN_custid+" AND CED.CED_REC_VER =TEC.CED_REC_VER AND CED.CED_REC_VER=EF.CUSTOMER_VER AND CTD.CLP_TERMINATE IS NULL AND CTD.CLP_GUEST_CARD IS NULL AND U.UNIT_NO="+CEXTN_unitno+""
    var CEXTN_custdtlsres = CEXTN_custdtlsstmt.executeQuery(CEXTN_custdtlsquery);
    while(CEXTN_custdtlsres.next())
    {
      var CEXTN_customerrecver=CEXTN_custdtlsres.getString("CED_REC_VER");
      CEXTN_customerrecver=parseInt(CEXTN_customerrecver)+1      
      var CEXTN_custrvstmt= CEXTN_cdtlscon.createStatement();
      var CEXTN_custrvquery="SELECT CLP_STARTDATE FROM CUSTOMER_LP_DETAILS WHERE CUSTOMER_ID="+CEXTN_custid+" AND CED_REC_VER="+CEXTN_customerrecver+" AND IF (CLP_PRETERMINATE_DATE IS NOT NULL ,CLP_PRETERMINATE_DATE>CURDATE(),CLP_ENDDATE>CURDATE())";
      var CEXTN_custrvres = CEXTN_custrvstmt.executeQuery(CEXTN_custrvquery);
      while(CEXTN_custrvres.next())
      {
        CEXTN_currentcheckoutdate=CEXTN_custrvres.getString("CLP_STARTDATE");
      }     
      var CEXTN_firstname=CEXTN_custdtlsres.getString("CUSTOMER_FIRST_NAME");
      var CEXTN_lastname=CEXTN_custdtlsres.getString("CUSTOMER_LAST_NAME");
      var CEXTN_compname=CEXTN_custdtlsres.getString("CCD_COMPANY_NAME");
      if(CEXTN_compname==null)
      {
        CEXTN_compname="";
      }
      var CEXTN_compaddr=CEXTN_custdtlsres.getString("CCD_COMPANY_ADDR");
      if(CEXTN_compaddr==null)
      {
        CEXTN_compaddr="";
      }
      var CEXTN_comppostcode=CEXTN_custdtlsres.getString("CCD_POSTAL_CODE");
      if(CEXTN_comppostcode==null)
      {
        CEXTN_comppostcode="";
      }
      var CEXTN_email=CEXTN_custdtlsres.getString("CPD_EMAIL");
      var CEXTN_mobile=CEXTN_custdtlsres.getString("CPD_MOBILE");
      if(CEXTN_mobile==null)
      {
        CEXTN_mobile="";
      }
      var CEXTN_intlmobile=CEXTN_custdtlsres.getString("CPD_INTL_MOBILE");
      if(CEXTN_intlmobile==null)
      {
        CEXTN_intlmobile="";
      }
      var CEXTN_compofficeno=CEXTN_custdtlsres.getString("CCD_OFFICE_NO");
      if(CEXTN_compofficeno==null)
      {
        CEXTN_compofficeno="";
      }
      var CEXTN_dob=CEXTN_custdtlsres.getString("CPD_DOB");
      if(CEXTN_dob==null)
      {
        CEXTN_dob="";
      }
      var CEXTN_nation=CEXTN_custdtlsres.getString("NC_DATA");
      var CEXTN_passno=CEXTN_custdtlsres.getString("CPD_PASSPORT_NO");
      if(CEXTN_passno==null)
      {
        CEXTN_passno="";
      }
      var CEXTN_passdate=CEXTN_custdtlsres.getString("CPD_PASSPORT_DATE");
      if(CEXTN_passdate==null)
      {
        CEXTN_passdate="";
      }
      var CEXTN_epno=CEXTN_custdtlsres.getString("CPD_EP_NO");
      if(CEXTN_epno==null)
      {
        CEXTN_epno="";
      }
      var CEXTN_epdate=CEXTN_custdtlsres.getString("CPD_EP_DATE");
      if(CEXTN_epdate==null)
      {
        CEXTN_epdate="";
      }
      var CEXTN_rmtype=CEXTN_custdtlsres.getString("URTD_ROOM_TYPE");
      var CEXTN_custcard=CEXTN_custdtlsres.getString("UASD_ACCESS_CARD");
      var CEXTN_custminrvstmt=CEXTN_cdtlscon.createStatement();
      //GET PREV CHECK IN DATE
      var CEXTN_custminrvquery="SELECT CLP_STARTDATE FROM CUSTOMER_LP_DETAILS CTD,CUSTOMER_ENTRY_DETAILS CED WHERE CED.CED_REC_VER=CTD.CED_REC_VER AND CED.CUSTOMER_ID = CTD.CUSTOMER_ID AND CED.CED_REC_VER=(SELECT CED_REC_VER FROM CUSTOMER_LP_DETAILS WHERE CUSTOMER_ID="+CEXTN_custid+" AND CLP_TERMINATE IS NULL AND IF(CLP_PRETERMINATE_DATE IS NOT NULL,CLP_STARTDATE<CLP_PRETERMINATE_DATE,CLP_STARTDATE<CLP_ENDDATE) AND CED_REC_VER="+CExtnminlpval+" AND CLP_GUEST_CARD IS NULL)AND CED.CUSTOMER_ID="+CEXTN_custid+" AND CTD.CLP_GUEST_CARD IS NULL";
      
      var CEXTN_custminrvres = CEXTN_custminrvstmt.executeQuery(CEXTN_custminrvquery);
      while(CEXTN_custminrvres.next())
      {
        var CEXTN_chkindate=CEXTN_custminrvres.getString("CLP_STARTDATE");
      }
      var CEXTN_chkoutdate=CEXTN_custdtlsres.getString("CLP_ENDDATE");
      var CEXTN_airconfee="";
      var CEXTN_airconquartelyfee = CEXTN_custdtlsres.getString("CC_AIRCON_QUARTERLY_FEE");
      if(CEXTN_airconquartelyfee==null)
      {
        CEXTN_airconquartelyfee="";
      }
      var CEXTN_airconfixedfee = CEXTN_custdtlsres.getString("CC_AIRCON_FIXED_FEE");
      if(CEXTN_airconfixedfee==null)
      {
        CEXTN_airconfixedfee="";
      }
      var CEXTN_deposit = CEXTN_custdtlsres.getString("CC_DEPOSIT"); 
      if(CEXTN_deposit==null)
      {
        CEXTN_deposit="";
      }
      var CEXTN_rental = CEXTN_custdtlsres.getString("CC_PAYMENT_AMOUNT");   
      var CEXTN_processingfee = CEXTN_custdtlsres.getString("CC_PROCESSING_FEE");
      if(CEXTN_processingfee==null)
      {
        CEXTN_processingfee="";
      }
      var CEXTN_electricitycap = CEXTN_custdtlsres.getString("CC_ELECTRICITY_CAP"); 
      if(CEXTN_electricitycap==null)
      {
        CEXTN_electricitycap="";
      }
      var CEXTN_drycleanfee = CEXTN_custdtlsres.getString("CC_DRYCLEAN_FEE");
      if(CEXTN_drycleanfee==null)
      {
        CEXTN_drycleanfee="";
      }
      var CEXTN_checkoutcleaningfee = CEXTN_custdtlsres.getString("CC_CHECKOUT_CLEANING_FEE");
      if(CEXTN_checkoutcleaningfee==null)
      {
        CEXTN_checkoutcleaningfee="";
      }
      var CEXTN_prorated = CEXTN_custdtlsres.getString("CED_PRORATED");
      if(CEXTN_prorated==null)
      {
        CEXTN_prorated="";
      }
      var CEXTN_waived = CEXTN_custdtlsres.getString("CED_PROCESSING_WAIVED");
      if(CEXTN_waived==null)
      {
        CEXTN_waived="";
      }
      var CEXTN_noticedate= CEXTN_custdtlsres.getString("CED_NOTICE_START_DATE");
      if(CEXTN_noticedate==null)
      {
        CEXTN_noticedate="";
      }
      var CEXTN_stfrmtime=CEXTN_custdtlsres.getString("CED_SD_STIME");
      var CEXTN_sttotime=CEXTN_custdtlsres.getString("CED_SD_ETIME");
      var CEXTN_edfrmtime=CEXTN_custdtlsres.getString("CED_ED_STIME");
      var CEXTN_edtotime=CEXTN_custdtlsres.getString("CED_ED_ETIME");
      var CEXTN_noticeperiod=CEXTN_custdtlsres.getString("CED_NOTICE_PERIOD");
      var CEXTN_comments=CEXTN_custdtlsres.getString("CPD_COMMENTS");
      if(CEXTN_comments==null)
      {
        CEXTN_comments="";
      }
      if(CEXTN_noticeperiod==null)
      {
        CEXTN_noticeperiod="";
      }
      var CEXTN_preterminatedate = CEXTN_custdtlsres.getString("CLP_PRETERMINATE_DATE");
      if(CEXTN_preterminatedate==null){ CEXTN_preterminatedate=""; }   
      var CEXTN_custdtls={"cust_firstname":CEXTN_firstname,"cust_lastname":CEXTN_lastname,"cust_compname":CEXTN_compname,"cust_compaddr":CEXTN_compaddr,"cust_comppostcode":CEXTN_comppostcode,"cust_email":CEXTN_email,"cust_mobile":CEXTN_mobile,"cust_intlmobile":CEXTN_intlmobile,"cust_officeno":CEXTN_compofficeno,"cust_dob":CEXTN_dob,"cust_nation":CEXTN_nation,"cust_passno":CEXTN_passno,"cust_passdate":CEXTN_passdate,"cust_epno":CEXTN_epno,"cust_epdate":CEXTN_epdate,"cust_rmtype":CEXTN_rmtype,"cust_chkindate":CEXTN_chkindate,"cust_chkoutdate":CEXTN_chkoutdate,"cust_airconquarterfee":CEXTN_airconquartelyfee,"cust_airconfixedfee":CEXTN_airconfixedfee,"cust_deposit":CEXTN_deposit,"cust_rental":CEXTN_rental,"cust_procfee":CEXTN_processingfee,"cust_electcapfee":CEXTN_electricitycap,"cust_dryclean":CEXTN_drycleanfee,"cust_chkoutfee":CEXTN_checkoutcleaningfee,"cust_prorated":CEXTN_prorated,"cust_waived":CEXTN_waived,"cust_noticedate":CEXTN_noticedate,"cust_stfrmtime":CEXTN_stfrmtime,"cust_sttotime":CEXTN_sttotime,"cust_edfrmtime":CEXTN_edfrmtime,"cust_edtotime":CEXTN_edtotime,"cust_noticeperiod":CEXTN_noticeperiod,"cust_preterminatedate":CEXTN_preterminatedate,"cust_comts":CEXTN_comments}
      }
    CEXTN_custdtlsres.close();
    CEXTN_custdtlsstmt.close();
    //GET CUSTOMER CARDS
    var CEXTN_custcardstmt= CEXTN_cdtlscon.createStatement();
    var CEXTN_cardarray =[];
    var CEXTN_custcardquery= "SELECT UASD.UASD_ACCESS_CARD,CTD.CLP_GUEST_CARD,CTD.CLP_PRETERMINATE_DATE FROM UNIT_ACCESS_STAMP_DETAILS UASD,UNIT U,CUSTOMER C,CUSTOMER_ENTRY_DETAILS CED,CUSTOMER_LP_DETAILS CTD,CUSTOMER_ACCESS_CARD_DETAILS CACD,VW_EXTENSION_CUSTOMER TEC WHERE TEC.CUSTOMER_ID=CTD.CUSTOMER_ID AND CED.CED_REC_VER =TEC.CED_REC_VER AND CACD.CUSTOMER_ID=CTD.CUSTOMER_ID AND CTD.UASD_ID=CACD.UASD_ID AND CACD.ACN_ID IS NULL AND UASD.UASD_ID=CACD.UASD_ID AND UASD.UASD_ID=CTD.UASD_ID AND CED.CED_REC_VER=CTD.CED_REC_VER AND CTD.CLP_TERMINATE IS NULL AND C.CUSTOMER_ID=CED.CUSTOMER_ID AND C.CUSTOMER_ID=CTD.CUSTOMER_ID AND CED.CUSTOMER_ID=CTD.CUSTOMER_ID AND U.UNIT_ID=CED.UNIT_ID  AND C.CUSTOMER_ID="+CEXTN_custid+" AND CTD.UASD_ID IS NOT NULL AND UASD.UASD_ACCESS_CARD IS NOT NULL AND U.UNIT_NO="+CEXTN_unitno+" ORDER BY CTD.CLP_GUEST_CARD ASC"; 
    var CEXTN_custcardres = CEXTN_custcardstmt.executeQuery(CEXTN_custcardquery);
    while(CEXTN_custcardres.next())
    {
      var CEXTN_cgstcard=CEXTN_custcardres.getString("CLP_GUEST_CARD");
      var CEXTN_cptddate=CEXTN_custcardres.getString("CLP_PRETERMINATE_DATE")
      var CEXTN_custcard=CEXTN_custcardres.getString("UASD_ACCESS_CARD");
      if((CEXTN_cptddate==null&&CEXTN_cgstcard!=null)||(CEXTN_cgstcard==null))
      {
        CEXTN_cardarray.push(CEXTN_custcard)
      }
    }
    CEXTN_custcardres.close();
    CEXTN_custcardstmt.close();
    var CEXTN_temp_stmt= CEXTN_cdtlscon.createStatement();
    var CEXTN_delete_temp = "DROP TABLE IF EXISTS "+CExtntblname+"";
    CEXTN_temp_stmt.execute(CEXTN_delete_temp);
    CEXTN_temp_stmt.close();
    var CTermExtn_temp_stmt= CEXTN_cdtlscon.createStatement();
    var CTermExtn_delete_temp = "DROP TABLE IF EXISTS "+CTermExtntblname+""; 
    CTermExtn_temp_stmt.execute(CTermExtn_delete_temp);
    CTermExtn_temp_stmt.close();
    var CEXTN_diffunittno=[];
    var CEXTN_unitdate=eilib.GetUnitSdEdate(CEXTN_cdtlscon,CEXTN_unitno);//call function to get unit start n end date
    var CEXTN_unitsdate=CEXTN_unitdate.unitsdate;//get unit start date
    var CEXTN_unitedate=CEXTN_unitdate.unitedate;//get unit end date
    CEXTN_diffunittno=CEXTN_getdiffUnitNo(CEXTN_unitno);
    var CEXTN_finaldtls={"currentcheckoutdate":CEXTN_currentcheckoutdate,"custdtls":CEXTN_custdtls,"cardarray":CEXTN_cardarray,"unitno":CEXTN_diffunittno,"unitsdate":CEXTN_unitsdate,"unitedate":CEXTN_unitedate};
    CEXTN_cdtlscon.close();
    return CEXTN_finaldtls;
  }
  //FUNCTION TO GET ROOM TYPE FOR SAME UNIT
  function CEXTN_getRoomType(CEXTN_unitno,CEXTN_roomtype)
  {
    var CEXTN_roomtypearray =[];
    var CEXTN_cdtlscon =eilib.db_GetConnection();
    CEXTN_roomtypearray=eilib.CUST_getRoomType(CEXTN_cdtlscon,CEXTN_unitno,CEXTN_roomtype);
    var unitdate=eilib.GetUnitSdEdate(CEXTN_cdtlscon,CEXTN_unitno);//call function to get unit start n end date
    var unitsdate=unitdate.unitsdate;//get unit start date
    var unitedate=unitdate.unitedate;//get unit end date
    var CEXTN_rmtypenunitdate={"unitsdate":unitsdate,"unitedate":unitedate,"roomtype":CEXTN_roomtypearray};
    CEXTN_cdtlscon.close();
    return CEXTN_rmtypenunitdate;
  }
  //FUNCTION TO GET UNIT NO EXCEPT SELECTED UNIT NO
  function CEXTN_getdiffUnitNo(CEXTN_unitno)
  {
    var CEXTN_unocon =eilib.db_GetConnection();
    var CEXTN_unostmt= CEXTN_unocon.createStatement();
    var CEXTN_unoarray =[];
    var CEXTN_unoquery= "SELECT UNIT_NO FROM VW_ACTIVE_UNIT ORDER BY UNIT_NO ASC"; 
    var CEXTN_unores = CEXTN_unostmt.executeQuery(CEXTN_unoquery);
    while(CEXTN_unores.next())
    {
      var unitno=CEXTN_unores.getString("UNIT_NO");
      if(CEXTN_unitno!=unitno)
      {
        CEXTN_unoarray.push(unitno);
      }
    }
    return CEXTN_unoarray;
    CEXTN_unores.close();
    CEXTN_unostmt.close();
    CEXTN_unocon.close();
  }
  //FUNCTION TO GET CARD NOS
  function CEXTN_getdiffunitCardNo(CEXTN_unit,CEXTN_firstname,CEXTN_lastname)
  {
    var CEXTN_cdtlscon =eilib.db_GetConnection();
    var CEXTN_cardnoresult=[];
    CEXTN_cardnoresult=eilib.CUST_getunitCardNo(CEXTN_cdtlscon,CEXTN_unit, CEXTN_firstname, CEXTN_lastname)
    CEXTN_cdtlscon.close();
    return CEXTN_cardnoresult;
  }
  //FUNCTION TO CHK PRORATED OR NOT
  function CEXTN_chkProrated(CEXTN_db_chkindate,CEXTN_db_chkoutdate)
  {
    var CEXTN_chkproflag="";
    CEXTN_chkproflag=eilib.CUST_chkProrated(CEXTN_db_chkindate, CEXTN_db_chkoutdate)
    return CEXTN_chkproflag;
  }
  //FUNCTION TO SAVE CUSTOMER DETAILS
  function CEXTN_SaveDetails(CEXTN_dts)
  {
    var CEXTN_formname="EXTENSION";    
    var CEXTN_lb_emailid=CEXTN_dts.CEXTN_lb_emailid;
    var CEXTN_hidden_custid=CEXTN_dts.CEXTN_hidden_custid;
    var CEXTN_lb_unitno=CEXTN_dts.CEXTN_lb_unitno;
    var CEXTN_lb_custname=CEXTN_dts.CEXTN_lb_custname;
    var CEXTN_tb_firstname=CEXTN_dts.CEXTN_tb_firstname;
    var CEXTN_tb_lastname=CEXTN_dts.CEXTN_tb_lastname;
    var CEXTN_customename=CEXTN_lb_custname;
    var CEXTN_continvoicecustomename=CEXTN_tb_firstname+" "+CEXTN_tb_lastname;
    var CEXTN_tb_contrpassno,CEXTN_tb_contrepno,CEXTN_tb_contrepdate,CEXTN_tb_contrpassdate,CEXTN_tb_contrnoticedate,CEXTN_tb_contrcompname;
    //COMPANY DETAILS
    var CEXTN_tb_compname=CEXTN_dts.CEXTN_tb_compname;
    CEXTN_tb_contrcompname=CEXTN_tb_compname//company name for contract
    if(CEXTN_tb_compname=="")
    {  CEXTN_tb_compname=null;  }else{CEXTN_tb_compname='"'+CEXTN_tb_compname+'"';}
    var CEXTN_tb_compaddr=CEXTN_dts.CEXTN_tb_compaddr;
    if(CEXTN_tb_compaddr=="")
    {  CEXTN_tb_compaddr=null;  }else{CEXTN_tb_compaddr='"'+CEXTN_tb_compaddr+'"';}
    var CEXTN_tb_comppostcode=CEXTN_dts.CEXTN_tb_comppostcode;
    if(CEXTN_tb_comppostcode=="")
    {  CEXTN_tb_comppostcode=null;  }else{CEXTN_tb_comppostcode='"'+CEXTN_tb_comppostcode+'"';}
    var CEXTN_tb_officeno=CEXTN_dts.CEXTN_tb_officeno;
    if(CEXTN_tb_officeno=="")
    {  CEXTN_tb_officeno=null;  }else{CEXTN_tb_officeno='"'+CEXTN_tb_officeno+'"';}
    //PERSONAL DETAILS
    var CEXTN_tb_emailid=(CEXTN_dts.CEXTN_tb_emailid).toString().toLowerCase();
    var CEXTN_tb_mobileno=CEXTN_dts.CEXTN_tb_mobileno;
    if(CEXTN_tb_mobileno=="")
    {  CEXTN_tb_mobileno=null;  }else{CEXTN_tb_mobileno='"'+CEXTN_tb_mobileno+'"';}
    var CEXTN_tb_intmobileno=CEXTN_dts.CEXTN_tb_intmobileno;
    if(CEXTN_tb_intmobileno=="")
    {  CEXTN_tb_intmobileno=null;  }else{CEXTN_tb_intmobileno='"'+CEXTN_tb_intmobileno+'"';}
    var CEXTN_db_dob=CEXTN_dts.CEXTN_db_dob;
    if(CEXTN_db_dob=="")
    {  CEXTN_db_dob=null;  }else{CEXTN_db_dob='"'+eilib.SqlDateFormat(CEXTN_db_dob)+'"';}
    var CEXTN_tb_nation=CEXTN_dts.CEXTN_tb_nation;
    var CEXTN_tb_passno=CEXTN_dts.CEXTN_tb_passno;
    CEXTN_tb_contrpassno=CEXTN_tb_passno;//passport no for contract
    if(CEXTN_tb_passno=="")
    {  CEXTN_tb_passno=null;}else{CEXTN_tb_passno='"'+CEXTN_tb_passno+'"';}
    var CEXTN_db_passdate=CEXTN_dts.CEXTN_db_passdate;
    CEXTN_tb_contrpassdate=CEXTN_db_passdate;//passport date for contract
    if(CEXTN_db_passdate=="")
    {  CEXTN_db_passdate=null;  }else{CEXTN_db_passdate='"'+eilib.SqlDateFormat(CEXTN_db_passdate)+'"';}
    var CEXTN_tb_epno=CEXTN_dts.CEXTN_tb_epno;
    CEXTN_tb_contrepno=CEXTN_tb_epno;//ep no for contract
    if(CEXTN_tb_epno=="")
    {  CEXTN_tb_epno=null;  }else{CEXTN_tb_epno='"'+CEXTN_tb_epno+'"';}
    var CEXTN_db_epdate=CEXTN_dts.CEXTN_db_epdate;
    CEXTN_tb_contrepdate=CEXTN_db_epdate;////ep date for contract
    if(CEXTN_db_epdate=="")
    {  CEXTN_db_epdate=null;  }else{CEXTN_db_epdate='"'+eilib.SqlDateFormat(CEXTN_db_epdate)+'"';}
    var CEXTN_ta_comments=CEXTN_dts.CEXTN_ta_comments;
    if(CEXTN_ta_comments!="")
    {
      CEXTN_ta_comments=eilib.ConvertSpclCharString(CEXTN_ta_comments);
    }
    //UNIT OPTION
    var CEXTN_radio_unit=CEXTN_dts.CEXTN_radio_unit;
    //SAME UNIT N SAME ROOM
    var CEXTN_tb_sameunitsamermuno=CEXTN_dts.CEXTN_tb_sameunitsamermuno;
    var CEXTN_tb_sameunitsamermrmtype=CEXTN_dts.CEXTN_tb_sameunitsamermrmtype;
    //SAME UNIT N DIFFERENT ROOM
    var CEXTN_tb_sameunitdiffrmuno=CEXTN_dts.CEXTN_tb_sameunitdiffrmuno;
    var CEXTN_lb_sameunitdiffrmrmtype=CEXTN_dts.CEXTN_lb_sameunitdiffrmrmtype;
    var CEXTN_tb_sameunitdiffrmcustcard=CEXTN_dts.CEXTN_tb_sameunitdiffrmcustcard;
    //DIFFERENT UNIT
    var CEXTN_lb_diffunituno=CEXTN_dts.CEXTN_lb_diffunituno;
    var CEXTN_lb_diffunitrmtype=CEXTN_dts.CEXTN_lb_diffunitrmtype;
    var CEXTN_radio_difunitcard=CEXTN_dts.CEXTN_radio_difunitcard;
    //ENTRY DETAILS
    var CEXTN_db_prevchkindate=CEXTN_dts.CEXTN_db_prevchkindate;
    var CEXTN_hidden_prechkinfromtime=CEXTN_dts.CEXTN_hidden_prechkinfromtime;
    var CEXTN_hidden_prechkintotime=CEXTN_dts.CEXTN_hidden_prechkintotime;
    var CEXTN_db_chkindate=eilib.SqlDateFormat(CEXTN_dts.CEXTN_db_chkindate);
    var CEXTN_hidden_chkinfromtime=CEXTN_dts.CEXTN_hidden_chkinfromtime;
    var CEXTN_hidden_chkintotime=CEXTN_dts.CEXTN_hidden_chkintotime;
    var CEXTN_lb_chkinfromtime=CEXTN_dts.CEXTN_lb_chkinfromtime;
    var CEXTN_lb_chkintotime=CEXTN_dts.CEXTN_lb_chkintotime;
    var CEXTN_db_chkoutdate=eilib.SqlDateFormat(CEXTN_dts.CEXTN_db_chkoutdate);
    var CEXTN_lb_chkoutfromtime=CEXTN_dts.CEXTN_lb_chkoutfromtime;
    var CEXTN_lb_chkouttotime=CEXTN_dts.CEXTN_lb_chkouttotime;
    var CEXTN_tb_noticeperiod=CEXTN_dts.CEXTN_tb_noticeperiod;
    var CEXTN_contractnoticeperiod=CEXTN_tb_noticeperiod;
    if(CEXTN_tb_noticeperiod=="")
    {    CEXTN_tb_noticeperiod=null;  }else{CEXTN_tb_noticeperiod='"'+CEXTN_tb_noticeperiod+'"'}
    var CEXTN_db_noticeperioddate=CEXTN_dts.CEXTN_db_noticeperioddate;
    CEXTN_tb_contrnoticedate=CEXTN_db_noticeperioddate;//notice date for contract
    if(CEXTN_tb_contrnoticedate==undefined){CEXTN_tb_contrnoticedate="";}
    if(CEXTN_db_noticeperioddate==""||CEXTN_db_noticeperioddate==undefined)
    {  CEXTN_db_noticeperioddate=null;}else{CEXTN_db_noticeperioddate='"'+eilib.SqlDateFormat(CEXTN_db_noticeperioddate)+'"';}
    var CEXTN_cb_sameamtprorated=CEXTN_dts.CEXTN_cb_sameamtprorated;
    var CEXTN_cb_sameamtwaived=CEXTN_dts.CEXTN_cb_sameamtwaived;
    var CEXTN_cb_diffamtprorated=CEXTN_dts.CEXTN_cb_diffamtprorated;
    var CEXTN_cb_diffamtwaived=CEXTN_dts.CEXTN_cb_diffamtwaived;
    //FEE DETAILS
    var CEXTN_radio_airconfee=CEXTN_dts.CEXTN_radio_airconfee;
    var CEXTN_radio_amt=CEXTN_dts.CEXTN_radio_amt;
    var CEXTN_tb_airquarterfee=CEXTN_dts.CEXTN_tb_airquarterfee;
    var CEXTN_tb_fixedairfee=CEXTN_dts.CEXTN_tb_fixedairfee;
    //CHECK AIRCON FEE
    if(CEXTN_radio_airconfee=="CEXTN_radio_quartairconfee")
    {
      if(CEXTN_tb_airquarterfee=="")
      {  
        CEXTN_tb_airquarterfee=null;
      }
      CEXTN_tb_fixedairfee=null;
    }
    else
    {
      CEXTN_tb_airquarterfee=null;
      if(CEXTN_tb_fixedairfee=="")
      { 
        CEXTN_tb_fixedairfee=null;
      }
    }
    var CEXTN_tb_electcapfee=CEXTN_dts.CEXTN_tb_electcapfee;
    if(CEXTN_tb_electcapfee=="")
    {  CEXTN_tb_electcapfee=null;}
    var CEXTN_tb_curtaindryfee=CEXTN_dts.CEXTN_tb_curtaindryfee;
    if(CEXTN_tb_curtaindryfee=="")
    {  CEXTN_tb_curtaindryfee=null;}
    var CEXTN_tb_chkoutcleanfee=CEXTN_dts.CEXTN_tb_chkoutcleanfee;
    if(CEXTN_tb_chkoutcleanfee=="")
    {  CEXTN_tb_chkoutcleanfee=null;}
    //SAME AMOUNT
    var CEXTN_tb_sameamtdep=CEXTN_dts.CEXTN_tb_sameamtdep;
    var CEXTN_tb_sameamtrent=CEXTN_dts.CEXTN_tb_sameamtrent;
    var CEXTN_tb_sameamtprocost=CEXTN_dts.CEXTN_tb_sameamtprocost;
    //DIFFERENT AMOUNT
    var CEXTN_tb_diffamtdep=CEXTN_dts.CEXTN_tb_diffamtdep;
    if(CEXTN_tb_diffamtdep=="")
    {  CEXTN_tb_diffamtdep=null;}
    var CEXTN_tb_diffamtrent=CEXTN_dts.CEXTN_tb_diffamtrent;
    var CEXTN_tb_diffamtprocost=CEXTN_dts.CEXTN_tb_diffamtprocost;
    if(CEXTN_tb_diffamtprocost=="")
    {  CEXTN_tb_diffamtprocost=null;}
    //TO READ CUST ID
    var CEXTN_radiocustid=CEXTN_dts.CEXTN_radiocustid;
    //TO READ CARD NOS
    var CEXTN_cb_diffunitcard=CEXTN_dts.CEXTN_cb_diffunitcard;
    var CEXTN_lb_diffunitcard=CEXTN_dts.CEXTN_lb_diffunitcard;
    var CEXTN_tb_diffunitcard=CEXTN_dts.CEXTN_tb_diffunitcard;
    //PRORATED OR WAIVED VALUE
    var CEXTN_hidden_sameamtprorated=CEXTN_dts.CEXTN_hidden_sameamtprorated;
    var CEXTN_hidden_sameamtwaived=CEXTN_dts.CEXTN_hidden_sameamtwaived;
    var CEXTN_hidden_diffamtprorated=CEXTN_dts.CEXTN_hidden_diffamtprorated;
    var CEXTN_hidden_diffamtwaived=CEXTN_dts.CEXTN_hidden_diffamtwaived;
    //QUATORS N LEASE PERIOD CALC
    var CEXTN_sdate=CEXTN_db_chkindate.split('-');
    var CEXTN_edate=CEXTN_db_chkoutdate.split('-');
    var CEXTN_quators  = eilib.quarterCalc(new Date(CEXTN_sdate[0],CEXTN_sdate[1]-1,CEXTN_sdate[2]),new Date(CEXTN_edate[0],CEXTN_edate[1]-1,CEXTN_edate[2])); 
    var CEXTN_Leaseperiod  = eilib.leasePeriodCalc(new Date(CEXTN_sdate[0],CEXTN_sdate[1]-1,CEXTN_sdate[2]),new Date(CEXTN_edate[0],CEXTN_edate[1]-1,CEXTN_edate[2]));
    //SET UNIT NO N ROOM TYPE
    var CEXTN_unitno="";
    var CEXTN_roomtype="";
    var CEXTN_waivedvalue="";
    var CEXTN_proratedvalue="";
    var CEXTN_rentamt="";
    var CEXTN_depositamt="";
    var CEXTN_profeeamt="";
    var CEXTN_chkoutcleanamt="";
    var CEXTN_drycleanamt="";
    var CEXTN_electamt="";
    var CEXTN_quartamt="";
    var CEXTN_fixedamt="";
    var CEXTN_chksameunit="";
    var CEXTN_card_array=[];
    var CEXTN_card_lbl=[];
    var CEXTN_accesscard="";
    var CEXTN_guestcard="";
    if(CEXTN_radio_unit=="CEXTN_radio_diffunit")
    {
      CEXTN_unitno=CEXTN_lb_diffunituno;
      CEXTN_roomtype=CEXTN_lb_diffunitrmtype;
      CEXTN_chksameunit="";
    }
    else
    {
      CEXTN_unitno=CEXTN_lb_unitno;
      CEXTN_chksameunit="X";
    }
    if(CEXTN_chksameunit=="")
    {    CEXTN_chksameunit=null;  }else{CEXTN_chksameunit='"'+CEXTN_chksameunit+'"'}
    
    if(CEXTN_radio_unit=="CEXTN_radio_sameunit")
    {
      CEXTN_roomtype=CEXTN_tb_sameunitsamermrmtype;
      CEXTN_lb_chkinfromtime=CEXTN_hidden_chkinfromtime;
      CEXTN_lb_chkintotime=CEXTN_hidden_chkintotime;
      CEXTN_card_array= CEXTN_dts.CEXTN_tb_sameunitsamermcustcard//getcardno
      CEXTN_card_lbl=CEXTN_dts.CEXTN_hidden_sameunitsamermcustcard//get customer label
    }
    if(CEXTN_radio_unit=="CEXTN_radio_sameunitdiffroom")
    {
      CEXTN_roomtype=CEXTN_lb_sameunitdiffrmrmtype;
      CEXTN_card_array= CEXTN_dts.CEXTN_tb_sameunitdiffrmcustcard//get customer card
      CEXTN_card_lbl=CEXTN_dts.CEXTN_hidden_sameunitdiffrmcustcard//get customer label
    }
    var CEXTN_rent_check="";
    //CHECK SAME OR DIFF AMOUNT
    if(CEXTN_radio_amt=="CEXTN_radio_sameamt")
    {
      CEXTN_waivedvalue=CEXTN_hidden_sameamtwaived;
      CEXTN_proratedvalue=CEXTN_hidden_sameamtprorated;
      CEXTN_rent_check=CEXTN_hidden_sameamtprorated;
      CEXTN_rentamt=CEXTN_tb_sameamtrent;
      CEXTN_depositamt=CEXTN_tb_sameamtdep;
      CEXTN_depositamt=null
      if(CEXTN_waivedvalue!="")
      {
        CEXTN_profeeamt=CEXTN_tb_sameamtprocost;
      }
      else
      {
        CEXTN_profeeamt=null;
      }
    }
    else
    {
      CEXTN_waivedvalue=CEXTN_hidden_diffamtwaived;
      CEXTN_proratedvalue=CEXTN_hidden_diffamtprorated;
      CEXTN_rent_check=CEXTN_hidden_diffamtprorated;
      CEXTN_rentamt=CEXTN_tb_diffamtrent;
      CEXTN_depositamt=CEXTN_tb_diffamtdep;
      CEXTN_profeeamt=CEXTN_tb_diffamtprocost;
    }
    //GET CARD NOS
    var accessflag=0;
    if(CEXTN_card_array==undefined)
    {
      var accessflag=1;
    }
    if(CEXTN_radio_unit=="CEXTN_radio_diffunit"&&CEXTN_radio_difunitcard=="CEXTN_radio_difunitcardno")
    {
      CEXTN_card_array=CEXTN_cb_diffunitcard;
      var card_lbl=CEXTN_dts.CEXTN_slctcustlbl;
      var CEXTN_find=(card_lbl.toString()).search(',');
      if(CEXTN_find!=-1)
      {
        var finalarray=card_lbl.split(",")
        for(var i=0;i<finalarray.length;i++)
        {
          CEXTN_card_lbl.push(finalarray[i])
        }
      }
      else
      {
        CEXTN_card_lbl=card_lbl
      }
    }
    var CEXTN_customercard="";
    if(CEXTN_card_array!=undefined)
    {
      var CEXTN_find=(CEXTN_card_array.toString()).search(',');
      if(CEXTN_find!=-1)
      {
        accessflag=0;
        for(var i=0;i<CEXTN_card_array.length;i++)
        {
          if(CEXTN_card_array[i]=="")continue;
          var CEXTN_cardnos=CEXTN_card_array[i]
          var CEXTN_cardlbl=CEXTN_card_lbl[i].replace(/ /g,"_");
          CEXTN_customename=CEXTN_customename.replace(/ /g,"_");
          if(CEXTN_cardlbl==CEXTN_customename)
          {
            if(CEXTN_accesscard=="")
            {
              CEXTN_accesscard=CEXTN_cardnos;
              CEXTN_customercard=CEXTN_cardnos
              CEXTN_guestcard=CEXTN_cardnos+","+" ";
            }
            else
            {
              CEXTN_accesscard=CEXTN_accesscard+","+CEXTN_cardnos;
              CEXTN_guestcard=CEXTN_guestcard+","+CEXTN_cardnos+", ";
              CEXTN_customercard=CEXTN_cardnos;
            }
          }
          else
          {
            if(CEXTN_accesscard=="")
            {
              CEXTN_guestcard=CEXTN_cardnos+",X";
              CEXTN_accesscard=CEXTN_cardnos;
            }
            else
            {
              CEXTN_accesscard=CEXTN_accesscard+","+CEXTN_cardnos;
              CEXTN_guestcard=CEXTN_guestcard+","+CEXTN_cardnos+",X";
            }
          }
        }
      }
      else
      {
        accessflag=1;
        CEXTN_accesscard=CEXTN_card_array;
        CEXTN_customercard=CEXTN_card_array
        CEXTN_guestcard=CEXTN_card_array+", ";
      }
    }
    else
    {
      CEXTN_accesscard=""
      CEXTN_guestcard=CEXTN_accesscard+", ";
    }
    //CALENDAR DATE N TIME
    var CEXTN_prevchkoutdate=eilib.SqlDateFormat(CEXTN_db_chkindate);
    var CEXTN_prevchkoutdatefromtime=CEXTN_hidden_chkinfromtime;
    var CEXTN_prevchkoutdatetotime=CEXTN_hidden_chkintotime;
    var CEXTN_prevchkinfromtime=CEXTN_hidden_prechkinfromtime;
    var CEXTN_prevchkintotime=CEXTN_hidden_prechkintotime;
    //CALL SAVE SP
    var CEXTN_saveconn =eilib.db_GetConnection();
    var CEXTN_savestmt=CEXTN_saveconn.createStatement();
    CEXTN_savestmt.execute("CALL SP_CUSTOMER_EXTENSION_INSERT("+CEXTN_hidden_custid+","+CEXTN_tb_compname+","+CEXTN_tb_compaddr+","+CEXTN_tb_comppostcode+","+CEXTN_tb_officeno+","+CEXTN_unitno+","+CEXTN_chksameunit+",'"+CEXTN_roomtype+"','"+CEXTN_lb_chkinfromtime+"','"+CEXTN_lb_chkintotime+"','"+CEXTN_lb_chkoutfromtime+"','"+CEXTN_lb_chkouttotime+"','"+CEXTN_Leaseperiod+"',"+CEXTN_quators+",'"+CEXTN_waivedvalue+"','"+CEXTN_proratedvalue+"',"+CEXTN_tb_noticeperiod+","+CEXTN_db_noticeperioddate+","+CEXTN_rentamt+","+CEXTN_depositamt+","+CEXTN_profeeamt+","+CEXTN_tb_fixedairfee+","+CEXTN_tb_airquarterfee+","+CEXTN_tb_electcapfee+","+CEXTN_tb_chkoutcleanfee+","+CEXTN_tb_curtaindryfee+",'"+CEXTN_accesscard+"','"+CEXTN_db_chkindate+"','"+UserStamp+"','"+CEXTN_db_chkindate+"','"+CEXTN_db_chkoutdate+"','"+CEXTN_guestcard+"','"+CEXTN_tb_nation+"',"+CEXTN_tb_mobileno+","+CEXTN_tb_intmobileno+",'"+CEXTN_tb_emailid+"',"+CEXTN_tb_passno+","+CEXTN_db_passdate+","+CEXTN_db_dob+","+CEXTN_tb_epno+","+CEXTN_db_epdate+",'"+CEXTN_ta_comments+"',@EXTNFLAG)");
    CEXTN_savestmt.close();
    var saveflag_stmt=CEXTN_saveconn.createStatement();
    var saveflag_query="SELECT @EXTNFLAG";
    var saveflag_rs=saveflag_stmt.executeQuery(saveflag_query);
    var CEXTN_saveflag=0;
    while(saveflag_rs.next())
    {
      CEXTN_saveflag=saveflag_rs.getString("@EXTNFLAG");
    }
    saveflag_rs.close();
    saveflag_stmt.close();
    if(CEXTN_saveflag==1)
    {
      var CEXTN_calenderIDcode =eilib.CUST_getCalenderId(CEXTN_saveconn);//GET CALENDAR ID
      var CEXTN_TargetFolderId=eilib.CUST_TargetFolderId(CEXTN_saveconn);//GET TARGER FOLDER ID
      var docowner=eilib.CUST_documentowner(CEXTN_saveconn);//get doc owner
      //CALL CALENDAR EVENT FUNCTION FROM EILIB
      eilib.CTermExtn_Calevent(CEXTN_saveconn,CEXTN_hidden_custid,"",CEXTN_calenderIDcode,"","","","",CEXTN_formname);    
      var cust_config_array=[];
      cust_config_array=eilib.CUST_invoice_contractreplacetext(CEXTN_saveconn);
      var CEXTN_invoiceid=cust_config_array[9];
      var CEXTN_invoicesno=cust_config_array[0];
      var CEXTN_invoicedate=cust_config_array[1];
      if(CEXTN_rent_check!="")
      {
        CEXTN_rent_check='true';
      }
      else
      {
        CEXTN_rent_check='false';
      }
      //CONTRACT N INVOICE
      if(CEXTN_radio_amt=="CEXTN_radio_sameamt")
      {
        eilib.CUST_contractmail(CEXTN_saveconn,CEXTN_unitno,CEXTN_db_chkindate,CEXTN_db_chkoutdate,CEXTN_tb_contrcompname,CEXTN_continvoicecustomename,CEXTN_contractnoticeperiod,CEXTN_tb_contrpassno,CEXTN_tb_contrpassdate,CEXTN_tb_contrepno,CEXTN_tb_contrepdate,CEXTN_tb_contrnoticedate,CEXTN_Leaseperiod,CEXTN_customercard,CEXTN_rentamt,CEXTN_tb_airquarterfee,CEXTN_tb_fixedairfee,CEXTN_tb_electcapfee,CEXTN_tb_curtaindryfee,CEXTN_tb_chkoutcleanfee,CEXTN_profeeamt,CEXTN_depositamt,CEXTN_waivedvalue,CEXTN_roomtype,CEXTN_rent_check,CEXTN_lb_emailid,"EXTENSION",CEXTN_TargetFolderId,docowner)
      }
      else
      {
        eilib.CUST_invoicecontractmail(CEXTN_saveconn,CEXTN_unitno,CEXTN_invoiceid,CEXTN_db_chkindate,CEXTN_db_chkoutdate,CEXTN_tb_contrcompname,CEXTN_continvoicecustomename,CEXTN_invoicesno,CEXTN_invoicedate,CEXTN_contractnoticeperiod,CEXTN_tb_contrpassno,CEXTN_tb_contrpassdate,CEXTN_tb_contrepno,CEXTN_tb_contrepdate,CEXTN_tb_contrnoticedate,CEXTN_Leaseperiod,CEXTN_customercard,CEXTN_rentamt,CEXTN_tb_airquarterfee,CEXTN_tb_fixedairfee,CEXTN_tb_electcapfee,CEXTN_tb_curtaindryfee,CEXTN_tb_chkoutcleanfee,CEXTN_profeeamt,CEXTN_depositamt,CEXTN_waivedvalue,CEXTN_roomtype,CEXTN_TargetFolderId,CEXTN_rent_check,docowner,CEXTN_lb_emailid,"EXTENSION",CEXTN_hidden_custid)
      }
    }
    CEXTN_saveconn.close();
    return CEXTN_saveflag;
  }  
}catch(err)
{
}
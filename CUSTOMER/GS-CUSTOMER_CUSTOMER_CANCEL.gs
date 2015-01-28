//<!--//*******************************************FILE DESCRIPTION*********************************************//
////************************************CUSTOMER CANCEL***********************************************//
////DONE BY:PUNI
////VER 1.1-SD:08/10/2014 ED:08/10/2014;TRACKER NO:790;CHANGED PRELOADER N MSGBOX POSITION
////DONE BY:SAFIYULLAH.M
////VER 1.0-31/07/2014 ED:04/08/2014;TRACKER NO:790;UPDATED SCRIPT SIDE ROLLBACK AND COMMIT
////VER 0.09-SD:09/07/2014 ED:10/07/2014;TRACKER NO:790;UPDATED ALIGNMENT AND UPADTED EILIB CALENDER EVENT FUNCTION FOR UNCANCEL
////VER 0.08-SD:17/06/2014 ED:17/06/2014;TRACKER NO:790;updated CALENDER ERROR MSG AND updated failure msg
//VER 0.07-SD:06/06/2014 ED:06/06/2014;TRACKER NO:770;CHANGED JQUERY LINK
////VER 0.06-SD:20/05/2014 ED:20/05/2014:TRACKER NO:770;UPDATED RETURN FUNCTION
////VER 0.05- SD:06/05/2014 ED:08/05/2014:TRACKER NO:770;UPDATED TEMP TABLE DYNAMICALLY.
//VER 0.04-SD:04/02/2014 ED:04/02/2014;TRACKER NO: 331;updated error msg getting from eilib,updated query as per entry details table updated and added convert function for spl char.
//VER 0.03- SD:30/12/2013 ED:30/12/2013;TRACKER NO: 331;updated Eilib functions
//VER 0.02 - SD:05/11/2013 ED:28/11/2013;TRACKER NO: 331;CHANGED SP ,FORM DESIGN AND CONNECTION STRING AND REMOVED SCRIPLET 
//VER 0.01 - INITIAL VERSION-SD:28/08/2013 ED:13/09/2013;TRACKER NO: 331
////*********************************************************************************************************//

try{ 
  var CCAN_finalconn;
  var CCAN_temptable1;
  var CCAN_temptable2;
  var CCAN_uncancel_temptable1;
  var CCAN_uncancel_temptable2;
  var CCAN_uncancel_temptable3;
  var CCAN_uncancel_temptable4;
  //FUNCTION TO CHECK CUSTOMER AVAILABLE
  function CCAN_getcustomer(){    
    var CCAN_conn = eilib.db_GetConnection();
    var CCAN_cust_values_stmt = CCAN_conn.createStatement();
    var CCAN_cust_values;
    var CCAN_select_cust_values="SELECT * FROM VW_CANCEL_CUSTOMER UNION SELECT * FROM VW_UNCANCEL_CUSTOMER"
    var CCAN_cust_values_result=CCAN_cust_values_stmt.executeQuery(CCAN_select_cust_values);   
    if(CCAN_cust_values_result.next()){
      CCAN_cust_values='true'
    }
    else{
      CCAN_cust_values='false'      
    }
    CCAN_cust_values_result.close();
    CCAN_cust_values_stmt.close()     
    var CCAN_errorAarray=[];
    var CCAN_select_err_msg='44,90,248,328,330,401,458'
    CCAN_errorAarray=eilib.GetErrorMessageList(CCAN_conn, CCAN_select_err_msg)    
    var CCAN_initial_values_array=[];
    var CCAN_initial_values={'CCAN_error_msg':CCAN_errorAarray.errormsg,'CCAN_cust_values':CCAN_cust_values}
    CCAN_initial_values_array.push(CCAN_initial_values)
    CCAN_conn.close()    
    return CCAN_initial_values_array  
  }  
  function CCAN_allcustomerdetails(CCAN_select_type){
    var CCAN_conn =eilib.db_GetConnection();
    var CCAN_customer_array =[];
    var CCAN_customerstmt = CCAN_conn.createStatement();    
    if(CCAN_select_type=="CANCEL CUSTOMER"){
      var CCAN_allcancelunit="SELECT UNIT_NO,CUSTOMER_ID,CUSTOMERNAME,CED_REC_VER FROM VW_CANCEL_CUSTOMER ORDER BY UNIT_NO ASC,CUSTOMERNAME ASC";
    }
    else{      
      var CCAN_allcancelunit="SELECT UNIT_NO,CUSTOMER_ID,CUSTOMERNAME,CED_REC_VER FROM VW_UNCANCEL_CUSTOMER ORDER BY UNIT_NO ASC,CUSTOMERNAME ASC";      
    }  
    var CCAN_customerresult = CCAN_customerstmt.executeQuery(CCAN_allcancelunit);
    while(CCAN_customerresult.next())
    {
      CCAN_customer_array.push({unit:CCAN_customerresult.getString("UNIT_NO"),customerid:CCAN_customerresult.getString("CUSTOMER_ID"),name:CCAN_customerresult.getString("CUSTOMERNAME"),recver:CCAN_customerresult.getString("CED_REC_VER")});
    }
    CCAN_customerresult.close();
    CCAN_customerstmt.close();
    CCAN_conn.close();   
    return CCAN_customer_array;    
  } 
  //*************FUNCTION TO RETURN UNIT NO  *************************//
  function CCAN_getcustomer_details(CCAN_select_type)
  { 
    return CCAN_allcustomerdetails(CCAN_select_type)
  }  
  //*************************** FUNCTION TO GET CUSTOMER DETAIL'S*****************************************************//
  function CCAN_get_customervalues(id,CCAN_select_type,CCAN_recver)
  {  
    var CCAN_custid=id;
    var CCAN_guest_array=[];
    PropertiesService.getUserProperties().setProperty('CCAN_custid',CCAN_custid )
    var CCAN_conn = eilib.db_GetConnection(); 
    var CCAN_roomtype_stmt = CCAN_conn.createStatement();
    var CCAN_select_roomtype="SELECT URTD.URTD_ROOM_TYPE FROM UNIT_ROOM_TYPE_DETAILS URTD, UNIT_ACCESS_STAMP_DETAILS UASD,CUSTOMER_ENTRY_DETAILS CED WHERE (CED.CUSTOMER_ID="+CCAN_custid+") AND(UASD.UASD_ID=CED.UASD_ID) AND(UASD.URTD_ID=URTD.URTD_ID) AND(CED.CED_REC_VER="+CCAN_recver+")";//6.UASD
    var CCAN_roomtype_result = CCAN_roomtype_stmt.executeQuery(CCAN_select_roomtype);
    if(CCAN_roomtype_result.next()){  
      var CCAN_roomtype = CCAN_roomtype_result.getString("URTD_ROOM_TYPE");
    }
    CCAN_roomtype_result.close();
    CCAN_roomtype_stmt.close();    
    var tempstmt=CCAN_conn.createStatement();
    tempstmt.execute("CALL SP_CUSTOMER_CANCEL_TEMP_FEE_DETAIL("+CCAN_custid+",'"+UserStamp+"',@CCAN_FEETMPTBLNAM)");
    tempstmt.close();
    var CCAN_feetemptbl_stmt=CCAN_conn.createStatement();
    var CCAN_feetemptbl_query="SELECT @CCAN_FEETMPTBLNAM";
    var CCAN_feetemptblres=CCAN_feetemptbl_stmt.executeQuery(CCAN_feetemptbl_query);
    var CCAN_temptblname="";
    while(CCAN_feetemptblres.next())
    {
      CCAN_temptblname=CCAN_feetemptblres.getString(1);
    }
    CCAN_feetemptblres.close();
    CCAN_feetemptbl_stmt.close();
    var CCAN_alldata_stmt = CCAN_conn.createStatement();
    if(CCAN_select_type=="CANCEL CUSTOMER"){
      var CCAN_alldata="SELECT  * FROM  CUSTOMER_ENTRY_DETAILS CED LEFT JOIN CUSTOMER_COMPANY_DETAILS CCD on CED.CUSTOMER_ID=CCD.CUSTOMER_ID left join CUSTOMER_LP_DETAILS CLP on CED.CUSTOMER_ID=CLP.CUSTOMER_ID left join CUSTOMER_ACCESS_CARD_DETAILS CACD on CED.CUSTOMER_ID=CACD.CUSTOMER_ID and (CLP.UASD_ID=CACD.UASD_ID)left join UNIT_ACCESS_STAMP_DETAILS UASD on  (UASD.UASD_ID=CACD.UASD_ID) left join "+CCAN_temptblname+" CF on  CED.CUSTOMER_ID=CF.CUSTOMER_ID left join CUSTOMER C on CED.CUSTOMER_ID=C.CUSTOMER_ID left join  CUSTOMER_PERSONAL_DETAILS CPD on CED.CUSTOMER_ID=CPD.CUSTOMER_ID ,NATIONALITY_CONFIGURATION NC ,UNIT U  where   (CED.UNIT_ID=U.UNIT_ID)AND (CED.CUSTOMER_ID="+CCAN_custid+") and(CPD.NC_ID=NC.NC_ID)and(CLP.CLP_TERMINATE is null) and  (CED.CED_REC_VER=CF.CUSTOMER_VER)  and(CED.CED_REC_VER="+CCAN_recver+") AND CED.CED_REC_VER=CLP.CED_REC_VER order by CED.CED_REC_VER "
    }
    if(CCAN_select_type=="UNCANCEL CUSTOMER"){
      var CCAN_alldata="SELECT  * FROM  CUSTOMER_ENTRY_DETAILS CED LEFT JOIN CUSTOMER_COMPANY_DETAILS CCD on CED.CUSTOMER_ID=CCD.CUSTOMER_ID left join CUSTOMER_LP_DETAILS CLP on CED.CUSTOMER_ID=CLP.CUSTOMER_ID left join CUSTOMER_ACCESS_CARD_DETAILS CACD on CED.CUSTOMER_ID=CACD.CUSTOMER_ID and (CLP.UASD_ID=CACD.UASD_ID) AND CACD.ACN_ID IS NULL left join UNIT_ACCESS_STAMP_DETAILS UASD on  (UASD.UASD_ID=CACD.UASD_ID) left join "+CCAN_temptblname+" CF on  CED.CUSTOMER_ID=CF.CUSTOMER_ID left join CUSTOMER C on CED.CUSTOMER_ID=C.CUSTOMER_ID left join  CUSTOMER_PERSONAL_DETAILS CPD on CED.CUSTOMER_ID=CPD.CUSTOMER_ID ,NATIONALITY_CONFIGURATION NC ,UNIT U  where   (CED.UNIT_ID=U.UNIT_ID)AND (CED.CUSTOMER_ID="+CCAN_custid+") and(CPD.NC_ID=NC.NC_ID)and(CLP.CLP_TERMINATE is null) and (CED.CED_CANCEL_DATE is not null) and  (CED.CED_REC_VER=CF.CUSTOMER_VER)  and(CED.CED_REC_VER="+CCAN_recver+") AND CED.CED_REC_VER=CLP.CED_REC_VER  order by CED.CED_REC_VER "
    }
    var CCAN_alldata_rs = CCAN_alldata_stmt.executeQuery(CCAN_alldata);    
    while(CCAN_alldata_rs.next()){ 
      var CCAN_cardno2 = CCAN_alldata_rs.getString("UASD_ACCESS_CARD");      
      if(CCAN_cardno2!=null)
      {
        var CCAN_guest = CCAN_alldata_rs.getString("CLP_GUEST_CARD");        
        if(CCAN_guest!='X')
        {   
          var CCAN_cardno = CCAN_alldata_rs.getString("UASD_ACCESS_CARD");
          var CCAN_startdate = CCAN_alldata_rs.getString("CLP_STARTDATE");
          var CCAN_enddate = CCAN_alldata_rs.getString("CLP_ENDDATE");
        }
        else
        {         
          var CCAN_cardno1 = CCAN_alldata_rs.getString("UASD_ACCESS_CARD");         
          CCAN_guest_array.push(CCAN_cardno1); 
        }
      }
      else{
        var CCAN_startdate = CCAN_alldata_rs.getString("CLP_STARTDATE");
        var CCAN_enddate = CCAN_alldata_rs.getString("CLP_ENDDATE");         
      }
      var CCAN_company = CCAN_alldata_rs.getString("CCD_COMPANY_NAME");
      var CCAN_firstname = CCAN_alldata_rs.getString("CUSTOMER_FIRST_NAME");
      var CCAN_lastname = CCAN_alldata_rs.getString("CUSTOMER_LAST_NAME");      
      var CCAN_deposit = CCAN_alldata_rs.getString("CC_DEPOSIT");        
      var CCAN_rental = CCAN_alldata_rs.getString("CC_PAYMENT_AMOUNT");        
      var CCAN_electricitycap = CCAN_alldata_rs.getString("CC_ELECTRICITY_CAP");        
      var CCAN_airconfixedfee = CCAN_alldata_rs.getString("CC_AIRCON_FIXED_FEE");
      var CCAN_airconquartelyfee = CCAN_alldata_rs.getString("CC_AIRCON_QUARTERLY_FEE");        
      var CCAN_epno = CCAN_alldata_rs.getString("CPD_EP_NO");
      var CCAN_epdate = CCAN_alldata_rs.getString("CPD_EP_DATE");
      var CCAN_passportno = CCAN_alldata_rs.getString("CPD_PASSPORT_NO");
      var CCAN_passportdate = CCAN_alldata_rs.getString("CPD_PASSPORT_DATE");
      var CCAN_drycleanfee = CCAN_alldata_rs.getString("CC_DRYCLEAN_FEE");
      var CCAN_processingfee = CCAN_alldata_rs.getString("CC_PROCESSING_FEE");
      var CCAN_checkoutcleaningfee = CCAN_alldata_rs.getString("CC_CHECKOUT_CLEANING_FEE");
      var CCAN_noticeperiod = CCAN_alldata_rs.getString("CED_NOTICE_PERIOD");
      var CCAN_noticedate = CCAN_alldata_rs.getString("CED_NOTICE_START_DATE");
      var CCAN_nationality = CCAN_alldata_rs.getString("NC_DATA");
      var CCAN_dob= CCAN_alldata_rs.getString("CPD_DOB");
      var CCAN_lease=CCAN_alldata_rs.getString("CED_LEASE_PERIOD");
      var CCAN_mobile = CCAN_alldata_rs.getString("CPD_MOBILE");
      var CCAN_mobile1 = CCAN_alldata_rs.getString("CPD_INTL_MOBILE");
      var CCAN_officeno = CCAN_alldata_rs.getString("CCD_OFFICE_NO");
      var CCAN_email = CCAN_alldata_rs.getString("CPD_EMAIL");
      var CCAN_extension= CCAN_alldata_rs.getString("CED_EXTENSION");
      var CCAN_redver = CCAN_alldata_rs.getString("CED_REC_VER");
      var CCAN_canceldate = CCAN_alldata_rs.getString("CED_CANCEL_DATE");
      var CCAN_comments = CCAN_alldata_rs.getString("CPD_COMMENTS");
      var CCAN_QUARTERS=CCAN_alldata_rs.getString("CED_QUARTERS");      
    }     
    var values_array={'firstname':CCAN_firstname,'lastname':CCAN_lastname,'email':CCAN_email,'mobile1':CCAN_mobile,'mobile2':CCAN_mobile1,'officeno':CCAN_officeno,'dob':CCAN_dob,'passportno':CCAN_passportno,'passportdate':CCAN_passportdate,'epno':CCAN_epno,'epdate':CCAN_epdate,'roomtype':CCAN_roomtype,'cardno':CCAN_cardno,'startdate':CCAN_startdate,'enddate':CCAN_enddate,'lease':CCAN_lease,'QUARTERS':CCAN_QUARTERS,'noticeperiod':CCAN_noticeperiod,'noticedate':CCAN_noticedate,'electricitycap':CCAN_electricitycap,'drycleanfee':CCAN_drycleanfee,'checkoutcleaningfee':CCAN_checkoutcleaningfee,'deposit':CCAN_deposit,'rental':CCAN_rental,'processingfee':CCAN_processingfee,'comments':CCAN_comments,'company':CCAN_company,'nationality':CCAN_nationality,'airconfixedfee':CCAN_airconfixedfee,'airconquartelyfee':CCAN_airconquartelyfee}
    CCAN_guest_array= eilib.unique(CCAN_guest_array) 
    var CCAN_data_array=[];
    CCAN_data_array.push(values_array)
    CCAN_data_array.push(CCAN_guest_array)  
    PropertiesService.getUserProperties().setProperty('CCAN_rec_ver',CCAN_redver);
    CCAN_alldata_rs.close()
    CCAN_alldata_stmt.close()
    var CCAN_drop_stmt=CCAN_conn.createStatement();
    var CCAN_drop_query=("DROP TABLE IF EXISTS "+CCAN_temptblname+"")
    CCAN_drop_stmt.execute(CCAN_drop_query)
    CCAN_drop_stmt.close()
    CCAN_conn.close();   
    return CCAN_data_array; 
  }
  
  //Function to cancel customer
  function CCAN_cancel(cancelform)
  {
    try{
      var CCAN_unit_value=cancelform.CCAN_unitnumber;
      var CCAN_firstname = cancelform.CCAN_tb_firstname; 
      var CCAN_lastname  = cancelform.CCAN_tb_lastname;
      var CCAN_comments_fetch = cancelform.CCAN_ta_comments;
      var card_array=[];
      var CCAN_custid=PropertiesService.getUserProperties().getProperty('CCAN_custid');
      var CCAN_rec_ver=PropertiesService.getUserProperties().getProperty('CCAN_rec_ver')
      var CCAN_userStamp=UserStamp;    
      if(CCAN_comments_fetch!=''){
        CCAN_comments_fetch=eilib.ConvertSpclCharString(CCAN_comments_fetch)
      } 
      var type="CANCEL"
      var CCAN_conn = eilib.db_GetConnection();
      CCAN_finalconn=CCAN_conn;
      CCAN_conn.setAutoCommit(false);
      var CCAN_save_stmt=CCAN_conn.createStatement();
      CCAN_save_stmt.execute("CALL SP_CUSTOMER_CANCEL_INSERT("+CCAN_custid+","+CCAN_rec_ver+",'"+UserStamp+"','"+CCAN_comments_fetch+"',@cancel_temptable1,@cancel_temptable2,@cancel_flag)")
      CCAN_save_stmt.close();
      var CCAN_return_flag_stmt=CCAN_conn.createStatement();
      var CCAN_getresult= CCAN_return_flag_stmt.executeQuery("SELECT @cancel_temptable1,@cancel_temptable2,@cancel_flag");
      while(CCAN_getresult.next()){
        CCAN_temptable1=CCAN_getresult.getString("@cancel_temptable1");
        CCAN_temptable2=CCAN_getresult.getString("@cancel_temptable2")
        var CCAN_chkcancelflag=CCAN_getresult.getString("@cancel_flag");
      }
      if(CCAN_chkcancelflag==1){     
        var CCAN_customerevent="SELECT CED.CUSTOMER_ID, b.CTP_DATA as CED_SD_STIME, c.CTP_DATA as CED_SD_ETIME, d.CTP_DATA as CED_ED_STIME ,e.CTP_DATA as CED_ED_ETIME ,CLP.CLP_STARTDATE,CLP.CLP_ENDDATE FROM CUSTOMER_ENTRY_DETAILS CED LEFT JOIN CUSTOMER_TIME_PROFILE b ON CED.CED_SD_STIME = b.CTP_ID LEFT JOIN CUSTOMER_TIME_PROFILE c ON CED.CED_SD_ETIME = c.CTP_ID LEFT JOIN CUSTOMER_TIME_PROFILE d ON CED.CED_ED_STIME = d.CTP_ID LEFT JOIN CUSTOMER_TIME_PROFILE e ON CED.CED_ED_ETIME = e.CTP_ID ,CUSTOMER_LP_DETAILS CLP  WHERE    (CED.CUSTOMER_ID="+CCAN_custid+")AND (CLP.CUSTOMER_ID=CED.CUSTOMER_ID) AND (CED.CED_REC_VER=CLP.CED_REC_VER) AND (CLP.CLP_GUEST_CARD IS NULL) and CED.CED_REC_VER>="+CCAN_rec_ver+" AND CLP.CLP_TERMINATE IS NULL"
        var CCAN_custevent_stmt = CCAN_conn.createStatement();
        var CCAN_custeventrs = CCAN_custevent_stmt.executeQuery(CCAN_customerevent);  
        while( CCAN_custeventrs.next())
        { 
          var CCAN_checkin_date = CCAN_custeventrs.getString("CLP_STARTDATE");          
          var CCAN_checkout_date = CCAN_custeventrs.getString("CLP_ENDDATE");
          var CCAN_calenderIDcode= eilib.CUST_getCalenderId(CCAN_conn);
          var CCAN_cal = CalendarApp.getCalendarsByName(CCAN_calenderIDcode)[0] ; 
          var CCAN_start_time_in=CCAN_custeventrs.getString("CED_SD_STIME");
          var CCAN_start_time_out=CCAN_custeventrs.getString("CED_SD_ETIME");
          var CCAN_end_time_in=CCAN_custeventrs.getString("CED_ED_STIME");
          var CCAN_end_time_out=CCAN_custeventrs.getString("CED_ED_ETIME");                        
          eilib.CUST_customercalenderdeletion(CCAN_custid,CCAN_calenderIDcode,CCAN_checkin_date,CCAN_start_time_in,CCAN_start_time_out,CCAN_checkout_date,CCAN_end_time_in,CCAN_end_time_out,"")      
        }      
      }   
      eilib.DropTempTable(CCAN_conn,CCAN_temptable1)
      eilib.DropTempTable(CCAN_conn,CCAN_temptable2)
      CCAN_conn.commit();
      CCAN_conn.close();
      return CCAN_chkcancelflag 
    }
    catch(err){
      
      CCAN_finalconn.rollback();
      eilib.DropTempTable(CCAN_finalconn,CCAN_temptable1)
      eilib.DropTempTable(CCAN_finalconn,CCAN_temptable2)
      Logger.log(err)
      return Logger.getLog();
      
    }
  } 
  //Function to Uncancel customer
  function CCAN_uncancel(uncancelform){
    try{
      var CCAN_unit_value=uncancelform.CCAN_unitnumber;
      var CCAN_firstname = uncancelform.CCAN_tb_firstname; 
      var CCAN_lastname  = uncancelform.CCAN_tb_lastname;
      var CCAN_comments_fetch = uncancelform.CCAN_ta_comments;
      var CCAN_roomType=uncancelform.CCAN_tb_roomtype;
      var CCAN_custid=PropertiesService.getUserProperties().getProperty('CCAN_custid');
      var CCAN_rec_ver=PropertiesService.getUserProperties().getProperty('CCAN_rec_ver')
      var CCAN_userStamp=UserStamp;
      var CCAN_conn = eilib.db_GetConnection();
      CCAN_conn.setAutoCommit(false);
      var CCAN_customerevent="SELECT  URTD.URTD_ROOM_TYPE,U.UNIT_NO,CPD.CPD_EMAIL,CCD.CCD_OFFICE_NO,CLP.CLP_STARTDATE,CLP.CLP_ENDDATE,CED.CED_REC_VER,CED.CED_CANCEL_DATE,CED.CUSTOMER_ID, b.CTP_DATA as CED_SD_STIME, c.CTP_DATA as CED_SD_ETIME, d.CTP_DATA as CED_ED_STIME ,e.CTP_DATA as CED_ED_ETIME,CPD.CPD_MOBILE,CPD.CPD_INTL_MOBILE FROM  CUSTOMER_ENTRY_DETAILS CED LEFT JOIN CUSTOMER_TIME_PROFILE b ON CED.CED_SD_STIME = b.CTP_ID LEFT JOIN CUSTOMER_TIME_PROFILE c ON CED.CED_SD_ETIME = c.CTP_ID LEFT JOIN CUSTOMER_TIME_PROFILE d ON CED.CED_ED_STIME = d.CTP_ID LEFT JOIN CUSTOMER_TIME_PROFILE e ON CED.CED_ED_ETIME = e.CTP_ID LEFT JOIN CUSTOMER_COMPANY_DETAILS CCD ON CED.CUSTOMER_ID=CCD.CUSTOMER_ID LEFT JOIN  CUSTOMER_PERSONAL_DETAILS CPD ON CED.CUSTOMER_ID=CPD.CUSTOMER_ID,CUSTOMER_LP_DETAILS CLP,UNIT_ROOM_TYPE_DETAILS URTD, UNIT_ACCESS_STAMP_DETAILS UASD ,UNIT U  WHERE  CED.UNIT_ID=U.UNIT_ID AND (CED.CUSTOMER_ID="+CCAN_custid+")AND (CLP.CUSTOMER_ID=CED.CUSTOMER_ID) AND (CED.CED_REC_VER=CLP.CED_REC_VER) AND (CLP.CLP_GUEST_CARD IS NULL) AND CED.CED_CANCEL_DATE IS  NOT NULL AND(UASD.UASD_ID=CED.UASD_ID) AND(UASD.URTD_ID=URTD.URTD_ID)and CED.CED_REC_VER>="+CCAN_rec_ver+" order by CED.CED_REC_VER"
      var CCAN_custevent_stmt = CCAN_conn.createStatement();
      var CCAN_custeventrs = CCAN_custevent_stmt.executeQuery(CCAN_customerevent); 
      var count=0;
      var type='UNCANCEL'    
      var lease_period_array=[];
      var quaters_array=[];
      var recver_array=[];
      var cancel_date_array=[]
      var unit_no_array=[];
      while( CCAN_custeventrs.next())
      {     
        var CCAN_checkin_date = CCAN_custeventrs.getString("CLP_STARTDATE");          
        var CCAN_checkout_date = CCAN_custeventrs.getString("CLP_ENDDATE");
        var recver=CCAN_custeventrs.getString("CED_REC_VER");
        var CCAN_sdate=CCAN_checkin_date.split('-');
        var CCAN_edate=CCAN_checkout_date.split('-');
        var CCAN_Leaseperiod  = eilib.leasePeriodCalc(new Date(CCAN_sdate[0],CCAN_sdate[1]-1,CCAN_sdate[2]),new Date(CCAN_edate[0],CCAN_edate[1]-1,CCAN_edate[2]));
        var CCAN_quators  = eilib.quarterCalc(new Date(CCAN_sdate[0],CCAN_sdate[1]-1,CCAN_sdate[2]),new Date(CCAN_edate[0],CCAN_edate[1]-1,CCAN_edate[2]));
        lease_period_array.push(CCAN_Leaseperiod)
        quaters_array.push(CCAN_quators)
        recver_array.push(recver)     
      }       
      var lease_quaters=''
      for(var k=0;k<recver_array.length;k++){
        lease_quaters+=recver_array[k]+',&'+lease_period_array[k]+',&'+quaters_array[k]      
        if(k==recver_array.length-1)break; 
        lease_quaters+=',&';
      }   
      if(CCAN_comments_fetch!=''){
        CCAN_comments_fetch=eilib.ConvertSpclCharString(CCAN_comments_fetch)
      }    
      var CCAN_save_stmt=CCAN_conn.createStatement();
      CCAN_save_stmt.execute("CALL SP_CUSTOMER_UNCANCEL_INSERT("+CCAN_custid+","+CCAN_rec_ver+",'"+CCAN_comments_fetch+"','"+lease_quaters+"','"+UserStamp+"',@uncancel_temptable1,@uncancel_temptable2,@uncancel_temptable3,@uncancel_temptable4,@uncancel_flag)")
      CCAN_save_stmt.close();
      var CCAN_return_flag_stmt=CCAN_conn.createStatement();
      var CCAN_getresult= CCAN_return_flag_stmt.executeQuery("SELECT @uncancel_temptable1,@uncancel_temptable2,@uncancel_temptable3,@uncancel_temptable4,@uncancel_flag");
      while(CCAN_getresult.next()){
        CCAN_uncancel_temptable1=CCAN_getresult.getString("@uncancel_temptable1");
        CCAN_uncancel_temptable2=CCAN_getresult.getString("@uncancel_temptable2");
        CCAN_uncancel_temptable3=CCAN_getresult.getString("@uncancel_temptable3");
        CCAN_uncancel_temptable4=CCAN_getresult.getString("@uncancel_temptable4");
        var CCAN_chkuncancelflag=CCAN_getresult.getString("@uncancel_flag");
      }
      if(CCAN_chkuncancelflag==1){        
        var CCAN_customerevent="SELECT  URTD.URTD_ROOM_TYPE,U.UNIT_NO,CPD.CPD_EMAIL,CCD.CCD_OFFICE_NO,CLP.CLP_STARTDATE,CLP.CLP_ENDDATE,CED.CED_REC_VER,CED.CED_CANCEL_DATE,CED.CUSTOMER_ID, b.CTP_DATA as CED_SD_STIME, c.CTP_DATA as CED_SD_ETIME, d.CTP_DATA as CED_ED_STIME ,e.CTP_DATA as CED_ED_ETIME,CPD.CPD_MOBILE,CPD.CPD_INTL_MOBILE FROM  CUSTOMER_ENTRY_DETAILS CED LEFT JOIN CUSTOMER_TIME_PROFILE b ON CED.CED_SD_STIME = b.CTP_ID LEFT JOIN CUSTOMER_TIME_PROFILE c ON CED.CED_SD_ETIME = c.CTP_ID LEFT JOIN CUSTOMER_TIME_PROFILE d ON CED.CED_ED_STIME = d.CTP_ID LEFT JOIN CUSTOMER_TIME_PROFILE e ON CED.CED_ED_ETIME = e.CTP_ID LEFT JOIN CUSTOMER_COMPANY_DETAILS CCD ON CED.CUSTOMER_ID=CCD.CUSTOMER_ID LEFT JOIN  CUSTOMER_PERSONAL_DETAILS CPD ON CED.CUSTOMER_ID=CPD.CUSTOMER_ID,CUSTOMER_LP_DETAILS CLP,UNIT_ROOM_TYPE_DETAILS URTD, UNIT_ACCESS_STAMP_DETAILS UASD ,UNIT U  WHERE  CED.UNIT_ID=U.UNIT_ID AND (CED.CUSTOMER_ID="+CCAN_custid+")AND (CLP.CUSTOMER_ID=CED.CUSTOMER_ID) AND (CED.CED_REC_VER=CLP.CED_REC_VER) AND (CLP.CLP_GUEST_CARD IS NULL) AND CED.CED_CANCEL_DATE IS   NULL AND(UASD.UASD_ID=CED.UASD_ID) AND(UASD.URTD_ID=URTD.URTD_ID)and CED.CED_REC_VER>="+CCAN_rec_ver+" order by CED.CED_REC_VER"
        var CCAN_custevent_stmt = CCAN_conn.createStatement();
        var CCAN_custeventrs = CCAN_custevent_stmt.executeQuery(CCAN_customerevent); 
        var count=0;
        var type='UNCANCEL'    
        var cancel_date_array=[]
        var unit_no_array=[];
        while( CCAN_custeventrs.next())
        { 
          count++;      
          var CCAN_checkin_date = CCAN_custeventrs.getString("CLP_STARTDATE");          
          var CCAN_checkout_date = CCAN_custeventrs.getString("CLP_ENDDATE");
          var recver=CCAN_custeventrs.getString("CED_REC_VER");
          var CCAN_calenderIDcode= eilib.CUST_getCalenderId(CCAN_conn);
          var CCAN_cal = CalendarApp.getCalendarsByName(CCAN_calenderIDcode)[0] ; 
          var CCAN_CANCEL_date=CCAN_custeventrs.getString("CED_CANCEL_DATE");
          cancel_date_array.push(CCAN_CANCEL_date)
          var CCAN_start_time_in=CCAN_custeventrs.getString("CED_SD_STIME");
          var CCAN_start_time_out=CCAN_custeventrs.getString("CED_SD_ETIME");
          var CCAN_end_time_in=CCAN_custeventrs.getString("CED_ED_STIME");
          var CCAN_end_time_out=CCAN_custeventrs.getString("CED_ED_ETIME"); 
          var CCAN_mobile=CCAN_custeventrs.getString("CPD_MOBILE");
          var CCAN_intmoblie=CCAN_custeventrs.getString("CPD_INTL_MOBILE");
          var CCAN_office=CCAN_custeventrs.getString("CCD_OFFICE_NO");
          var CCAN_emailid=CCAN_custeventrs.getString("CPD_EMAIL");
          var CCAN_unitno=CCAN_custeventrs.getString("UNIT_NO");
          unit_no_array.push(CCAN_unitno)
          var CCAN_roomtype=CCAN_custeventrs.getString("URTD_ROOM_TYPE");
          if(CCAN_unitno==CCAN_unit_value && CCAN_roomtype==CCAN_roomType){
            if(count==1){ 
              eilib.CUST_customercalendercreation(CCAN_custid, CCAN_calenderIDcode, CCAN_checkin_date, CCAN_start_time_in, CCAN_start_time_out, CCAN_checkout_date, CCAN_end_time_in, CCAN_end_time_out, CCAN_firstname, CCAN_lastname, CCAN_mobile, CCAN_intmoblie, CCAN_office, CCAN_emailid, CCAN_unitno, CCAN_roomtype,"")
              eilib.CUST_customercalenderdeletion(CCAN_custid,CCAN_calenderIDcode,"","","",CCAN_checkout_date,CCAN_end_time_in,CCAN_end_time_out,type)
            }
            else{ 
              eilib.CUST_customercalendercreation(CCAN_custid, CCAN_calenderIDcode, CCAN_checkin_date, CCAN_start_time_in, CCAN_start_time_out, CCAN_checkout_date, CCAN_end_time_in, CCAN_end_time_out, CCAN_firstname, CCAN_lastname, CCAN_mobile, CCAN_intmoblie, CCAN_office, CCAN_emailid, CCAN_unitno, CCAN_roomtype,"")
              eilib.CUST_customercalenderdeletion(CCAN_custid,CCAN_calenderIDcode,CCAN_checkin_date,CCAN_start_time_in,CCAN_start_time_out,"","","",type)
            }
          }
          if(CCAN_roomtype!=CCAN_roomType&&CCAN_unitno==CCAN_unit_value){
            var CCAN_custunittype="DIFF RM";
            eilib.CUST_customercalenderdeletion(CCAN_custid,CCAN_calenderIDcode,CCAN_checkin_date,CCAN_start_time_in,CCAN_start_time_out,"","","",type)
            eilib.CUST_customercalendercreation(CCAN_custid, CCAN_calenderIDcode, CCAN_checkin_date, CCAN_start_time_in, CCAN_start_time_out, CCAN_checkout_date, CCAN_end_time_in, CCAN_end_time_out, CCAN_firstname, CCAN_lastname, CCAN_mobile, CCAN_intmoblie, CCAN_office, CCAN_emailid, CCAN_unitno, CCAN_roomtype, CCAN_custunittype)
          }
          if(CCAN_unitno!=CCAN_unit_value){
            var CCAN_custunittype="DIFF UNIT";
            eilib.CUST_customercalenderdeletion(CCAN_custid,CCAN_calenderIDcode,CCAN_checkin_date,CCAN_start_time_in,CCAN_start_time_out,"","","",type)
            eilib.CUST_customercalendercreation(CCAN_custid, CCAN_calenderIDcode, CCAN_checkin_date, CCAN_start_time_in, CCAN_start_time_out, CCAN_checkout_date, CCAN_end_time_in, CCAN_end_time_out, CCAN_firstname, CCAN_lastname, CCAN_mobile, CCAN_intmoblie, CCAN_office, CCAN_emailid, CCAN_unitno, CCAN_roomtype, CCAN_custunittype)
          }      
        }
        if(count==1){
          eilib.CUST_customercalendercreation(CCAN_custid, CCAN_calenderIDcode, "", "", "", CCAN_checkout_date, CCAN_end_time_in, CCAN_end_time_out, CCAN_firstname, CCAN_lastname, CCAN_mobile, CCAN_intmoblie, CCAN_office, CCAN_emailid, CCAN_unitno, CCAN_roomtype,"")
        }    
        
      }
      if(CCAN_uncancel_temptable1!=null){
        eilib.DropTempTable(CCAN_conn,CCAN_uncancel_temptable1)
      }
      if(CCAN_uncancel_temptable2!=null){
        eilib.DropTempTable(CCAN_conn,CCAN_uncancel_temptable2)
      }
      if(CCAN_uncancel_temptable3!=null){
        eilib.DropTempTable(CCAN_conn,CCAN_uncancel_temptable3)
      }
      if(CCAN_uncancel_temptable4!=null){
        eilib.DropTempTable(CCAN_conn,CCAN_uncancel_temptable4)
      }
      CCAN_conn.commit();
      CCAN_conn.close();
      return CCAN_chkuncancelflag  
    }
    catch(err){
      
      CCAN_conn.rollback();      
      if(CCAN_uncancel_temptable1!=null){
        eilib.DropTempTable(CCAN_conn,CCAN_uncancel_temptable1)
      }
      if(CCAN_uncancel_temptable2!=null){
        eilib.DropTempTable(CCAN_conn,CCAN_uncancel_temptable2)
      }
      if(CCAN_uncancel_temptable3!=null){
        eilib.DropTempTable(CCAN_conn,CCAN_uncancel_temptable3)
      }
      if(CCAN_uncancel_temptable4!=null){
        eilib.DropTempTable(CCAN_conn,CCAN_uncancel_temptable4)
      }
      Logger.log(err)
      return Logger.getLog();
      
    }
  }
}
catch(err){}
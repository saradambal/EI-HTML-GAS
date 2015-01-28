//*******************************************FILE DESCRIPTION*********************************************//
//************************************CUSTOMER EXPIRY LIST***********************************************//
//DONE BY:PUNI
//VER 1.4-SD:09/10/2014 ED:09/10/2014,TRACKER NO:690;changed preloader n msgbox position
//VER 1.3-SD:26/08/2014 ED:26/08/2014,TRACKER NO:690;updated new links BY PUNI.
//DONE BY:SAFIYULLAH.M
//VER 1.2-SD:11/06/2014 ED:11/06/2014;TRACKER NO:690;updated failure msg
//VER 1.1-SD:06/06/2014 ED:06/06/2014;TRACKER NO:690;CHANGED JQUERY LINK
//VER 1.0-SD:15/05/2014 ED:15/04/2014:TRACKER NO:690:changed form for dyanamic temp table
//VER 0.09-SD:28/04/2014 ED:28/04/2014:TRACKER NO:690:CHANGED SP NAME AND APLLY MAX DATE FOR DATE PICKER:
//VER 0.08 -SD:07/03/2014 ED:07/03/2014;TRACKER NO: 690;droped temp table 
//VER 0.07 -SD:05/03/2014 ED:06/03/2014;TRACKER NO: 690;implement error msg getting from eilib 
//VER 0.06 -SD:31/12/2013 ED:31/12/2013;TRACKER NO: 690;update the error msg,when no customer available 
//VER 0.05 -SD:28/12/2013 ED:28/12/2013;TRACKER NO: 363;Update eilib function 
//VER 0.04 -SD:03/12/2013 ED:04/12/2013;TRACKER NO: 363;Update Email_id List from email profile 
//VER 0.03 - SD:04/11/2013 ED:08/11/2013;TRACKER NO: 363;Applied Sp and Changes done in  design
//VER 0.02 - SD:21/09/2013 ED:01/10/2013;TRACKER NO: 363;CHANGED CONNECTION STRING AND REMOVED SCRIPLET AND CHANGED DATE FORMAT
//VER 0.01 - INITIAL VERSION-SD:12/08/2013 ED:02/09/2013;TRACKER NO:363;
//*********************************************************************************************************//

//FUNCTION TO GET INITIAL VALUES
try{
  
  function CEXP_get_initial_values(){    
    var CEXP_conn = eilib.db_GetConnection();    
    var CEXP_error_msg_stmt = CEXP_conn.createStatement();
    var CEXP_errorAarray=[];
    var CEXP_select_err_msg="80,81,82,83,84,85,86,87,88,89,282,256"
    CEXP_errorAarray=eilib.GetErrorMessageList(CEXP_conn, CEXP_select_err_msg)    
    var CEXP_select_customer_stmt= CEXP_conn.createStatement();
    var CEXP_select_customer="SELECT * FROM CUSTOMER"
    var CEXP_custAarray=[];
    var CEXP_select_customer_rs=CEXP_select_customer_stmt.executeQuery(CEXP_select_customer)
    if(CEXP_select_customer_rs.next()){
      CEXP_custAarray.push(CEXP_select_customer_rs.getString("CUSTOMER_ID"))      
    }  
    var CEXP_max_date_array=[];
    CEXP_select_customer_rs.close();
    CEXP_select_customer_stmt.close();
    var CEXP_select_maxdate_stmt=CEXP_conn.createStatement();
    var CEXP_select_max_date="SELECT MAX(CLP_ENDDATE) as CLP_ENDDATE FROM CUSTOMER_LP_DETAILS";
    var CEXP_select_maxdate_rs=CEXP_select_maxdate_stmt.executeQuery(CEXP_select_max_date);
    if(CEXP_select_maxdate_rs.next()){
      CEXP_max_date_array.push(CEXP_select_maxdate_rs.getString("CLP_ENDDATE"))      
    }    
    //-----------------CODING TO GET EMAIL LIST FROM DATABASE----------------------------//     
    var CWEXP_email_array=eilib.getProfileEmailId(CEXP_conn,'EXPIRY')    
    var CEXP_initial_values_array=[];
    var CEXP_initial_values={'CEXP_error_msg':CEXP_errorAarray.errormsg,'CEXP_emailid':CWEXP_email_array,'CEXP_custAarray':CEXP_custAarray,'CEXP_max_date_array':CEXP_max_date_array}
    CEXP_initial_values_array.push(CEXP_initial_values)
    CEXP_conn.close();
    return CEXP_initial_values_array   
  }
  //FUNCTION TO GET CUSTOMER DATA'S FROM DATABASE---------------------
  function CEXP_get_customer_details(fromdate,todate,radiovalue){    
    var CEXP_fromdate=eilib.SqlDateFormat(fromdate);
    var CEXP_todate=eilib.SqlDateFormat(todate);
    var CEXP_check_radio_value=radiovalue;
    var CEXP_cust_id_array=[]; 
    var CEXP_conn = eilib.db_GetConnection();
    var CEXP_final_expiry_result=[];
    //TO CHECK EQUAL DATE
    if(CEXP_check_radio_value=="EQUAL"){
      var CEXP_temptable_equal_stmt = CEXP_conn.createStatement();
      CEXP_temptable_equal_stmt.execute("CALL SP_CUSTOMER_EXPIRY('1','"+CEXP_fromdate+"',NULL,'"+UserStamp+"',@CEXP_EQUALFEETMPTBLNAM)");
      CEXP_temptable_equal_stmt.close();
      var CEXP_equalfeetemptbl_stmt=CEXP_conn.createStatement();
      var CEXP_equalfeetemptbl_query="SELECT @CEXP_EQUALFEETMPTBLNAM";
      var CEXP_equalfeetemptblres=CEXP_equalfeetemptbl_stmt.executeQuery(CEXP_equalfeetemptbl_query);
      var CEXP_equaltemptblname="";
      while(CEXP_equalfeetemptblres.next())
      {
        CEXP_equaltemptblname=CEXP_equalfeetemptblres.getString(1);
      }
      CEXP_equalfeetemptblres.close();
      CEXP_equalfeetemptbl_stmt.close();
      var CEXP_alldata_equal_stmt=CEXP_conn.createStatement();
      var CEXP_select_expirylist_equaldate="SELECT UNITNO,CUSTOMERFIRSTNAME,CUSTOMERLASTNAME,STARTDATE,ENDDATE,DEPOSIT,PAYMENT,PROCESSINGFEE,ROOMTYPE,EXTENSIONFLAG,RECHECKINGFLAG,COMMENTS,PRETERMINATEDATE,USERSTAMP,DATE_FORMAT(CONVERT_TZ(EXPIRY_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EXPIRY_TIMESTAMP from  "+CEXP_equaltemptblname+""
      var CEXP_expirylist_rs = CEXP_alldata_equal_stmt.executeQuery(CEXP_select_expirylist_equaldate);
      var tablename=CEXP_equaltemptblname
      } 
    //TO CHECK ON OR BEFORE DATE
    if(CEXP_check_radio_value=="BEFORE"){      
      var CEXP_temptable_before_stmt = CEXP_conn.createStatement();
      CEXP_temptable_before_stmt.execute("CALL SP_CUSTOMER_EXPIRY('2','"+CEXP_fromdate+"',NULL,'"+UserStamp+"',@CEXP_BEFOREFEETMPTBLNAM)");
      CEXP_temptable_before_stmt.close();
      var CEXP_beforefeetemptbl_stmt=CEXP_conn.createStatement();
      var CEXP_beforefeetemptbl_query="SELECT @CEXP_BEFOREFEETMPTBLNAM";
      var CEXP_beforefeetemptblres=CEXP_beforefeetemptbl_stmt.executeQuery(CEXP_beforefeetemptbl_query);
      var CEXP_beforetemptblname="";
      while(CEXP_beforefeetemptblres.next())
      {
        CEXP_beforetemptblname=CEXP_beforefeetemptblres.getString(1);
      }
      CEXP_beforefeetemptblres.close();
      CEXP_beforefeetemptbl_stmt.close();
      var CEXP_alldata_before_stmt = CEXP_conn.createStatement();
      var CEXP_select_expirylist_beforedate="SELECT UNITNO,CUSTOMERFIRSTNAME,CUSTOMERLASTNAME,STARTDATE,ENDDATE,DEPOSIT,PAYMENT,PROCESSINGFEE,ROOMTYPE,EXTENSIONFLAG,RECHECKINGFLAG,COMMENTS,PRETERMINATEDATE,USERSTAMP,DATE_FORMAT(CONVERT_TZ(EXPIRY_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EXPIRY_TIMESTAMP from  "+CEXP_beforetemptblname+""
      var CEXP_expirylist_rs = CEXP_alldata_before_stmt.executeQuery(CEXP_select_expirylist_beforedate);
      var tablename=CEXP_beforetemptblname;
    }
    //TO CHECK BETWEEN DATE
    if(CEXP_check_radio_value=="BETWEEN"){      
      var CEXP_temptable_between_stmt = CEXP_conn.createStatement();
      CEXP_temptable_between_stmt.execute("CALL SP_CUSTOMER_EXPIRY('3','"+CEXP_fromdate+"','"+CEXP_todate+"','"+UserStamp+"',@CEXP_BETWEENFEETMPTBLNAM)");
      CEXP_temptable_between_stmt.close();
      var CEXP_betweenfeetemptbl_stmt=CEXP_conn.createStatement();
      var CEXP_betweenfeetemptbl_query="SELECT @CEXP_BETWEENFEETMPTBLNAM";
      var CEXP_betweenfeetemptblres=CEXP_betweenfeetemptbl_stmt.executeQuery(CEXP_betweenfeetemptbl_query);
      var CEXP_betweentemptblname="";
      while(CEXP_betweenfeetemptblres.next())
      {
        CEXP_betweentemptblname=CEXP_betweenfeetemptblres.getString(1);
      }
      CEXP_betweenfeetemptblres.close();
      CEXP_betweenfeetemptbl_stmt.close();
      var CEXP_alldata_between_stmt = CEXP_conn.createStatement();
      var CEXP_expiryquery="SELECT UNITNO,CUSTOMERFIRSTNAME,CUSTOMERLASTNAME,STARTDATE,ENDDATE,DEPOSIT,PAYMENT,PROCESSINGFEE,ROOMTYPE,EXTENSIONFLAG,RECHECKINGFLAG,COMMENTS,PRETERMINATEDATE,USERSTAMP,DATE_FORMAT(CONVERT_TZ(EXPIRY_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EXPIRY_TIMESTAMP from  "+CEXP_betweentemptblname+""
      var CEXP_expirylist_rs = CEXP_alldata_between_stmt.executeQuery(CEXP_expiryquery); 
      var tablename=CEXP_betweentemptblname;
    }    
    while(CEXP_expirylist_rs.next())
    {
      var CEXP_unitno = CEXP_expirylist_rs.getString("UNITNO");
      var CEXP_firstname = CEXP_expirylist_rs.getString("CUSTOMERFIRSTNAME");
      var CEXP_lastname = CEXP_expirylist_rs.getString("CUSTOMERLASTNAME");
      var CEXP_startdate = CEXP_expirylist_rs.getString("STARTDATE");      
      var CEXP_enddate = CEXP_expirylist_rs.getString("ENDDATE");      
      var CEXP_deposit = CEXP_expirylist_rs.getString("DEPOSIT");
      if(CEXP_deposit==null){ CEXP_deposit=""; }      
      var CEXP_rental = CEXP_expirylist_rs.getString("PAYMENT");
      var CEXP_processingfee = CEXP_expirylist_rs.getString("PROCESSINGFEE");
      if(CEXP_processingfee==null){ CEXP_processingfee=""; }      
      var CEXP_roomtype = CEXP_expirylist_rs.getString("ROOMTYPE");
      var CEXP_extension= CEXP_expirylist_rs.getString("EXTENSIONFLAG");
      if(CEXP_extension==null){ CEXP_extension=""; }      
      var CEXP_rechk = CEXP_expirylist_rs.getString("RECHECKINGFLAG");
      if(CEXP_rechk==null){ CEXP_rechk=""; }      
      var CEXP_comments = CEXP_expirylist_rs.getString("COMMENTS");
      if(CEXP_comments==null){ CEXP_comments=""; }      
      var CEXP_userstamp = CEXP_expirylist_rs.getString("USERSTAMP");
      var CEXP_timestamp = (CEXP_expirylist_rs.getString("EXPIRY_TIMESTAMP"))      
      var CEXP_preterminatedate = CEXP_expirylist_rs.getString("PRETERMINATEDATE");
      if(CEXP_preterminatedate==null){ CEXP_preterminatedate=""; }      
      var CEXP_expiry_result={'unitno':CEXP_unitno,'firstname':CEXP_firstname,'lastname':CEXP_lastname,'roomtype':CEXP_roomtype,'extension':CEXP_extension,'rechecking':CEXP_rechk,'rental':CEXP_rental,'comments':CEXP_comments,'userstamp':CEXP_userstamp,'timestamp':CEXP_timestamp,'startdate':CEXP_startdate,'enddate':CEXP_enddate,'preterminatedate':CEXP_preterminatedate,'deposit':CEXP_deposit}
      CEXP_final_expiry_result.push(CEXP_expiry_result)    
    }
    CEXP_droptemptable(CEXP_conn,tablename)
    CEXP_conn.close();
    return CEXP_final_expiry_result 
  }
  //FUNCTION TO SEND WEEKLY CUSTOMER EXPIRY LIST-----------//
  function CWEXP_get_customerdetails(CWEXP_weeklyexpirylist_form){    
    var CWEXP_weekBefore=CWEXP_weeklyexpirylist_form.CWEXP_TB_weekBefore;
    var CWEXP_email_id=CWEXP_weeklyexpirylist_form.CWEXP_email;  
    var CWEXP_mail_username=CWEXP_email_id.split('@');
    var CWEXP_conn = eilib.db_GetConnection();    
    var CWEXP_emaildata_stmt = CWEXP_conn.createStatement(); 
    var CWEXP_select_emaildata="SELECT * from EMAIL_TEMPLATE_DETAILS WHERE ET_ID=3";    
    var CWEXP_emaildata_rs=CWEXP_emaildata_stmt.executeQuery(CWEXP_select_emaildata);
    while(CWEXP_emaildata_rs.next()){
      var CWEXP_subject_db=CWEXP_emaildata_rs.getString("ETD_EMAIL_SUBJECT");
      var CWEXP_message_db=CWEXP_emaildata_rs.getString("ETD_EMAIL_BODY");      
    }
    CWEXP_emaildata_rs.close();
    CWEXP_emaildata_stmt.close();  
    var CWEXP_subject=CWEXP_subject_db.replace("[WEEKS_AHEAD]", CWEXP_weekBefore);            
    var CWEXP_message=CWEXP_message_db.replace("'[WEEK_AHEAD]'",CWEXP_weekBefore);   
    if(CWEXP_weekBefore==1){
      var CWEXP_subject=CWEXP_subject.replace("WEEKS", 'WEEK'); 
      var CWEXP_message=CWEXP_message.replace("WEEKS", 'WEEK');
    }
    CWEXP_message=CWEXP_message.replace('[MAILID_USERNAME]',CWEXP_mail_username[0].toUpperCase());
    var CWEXP_emailmessage = '<body>'+'<br>'+'<h> '+CWEXP_message +' </h>'+'<br>'+'<br>'+'<table border="1" style="color:white" width="700">'+'<tr  bgcolor="#498af3" align="center">'+'<td width=25% ><h3>UNIT NO</h3></td>'+'<td width=25%><h3>CUSTOMER NAME</h3></td>'+'<td width=25%><h3>END DATE</h3></td>'+'<td width=25%><h3>RENT</h3></td>'+'</tr>'+'</table>'+'</body>';
    var CWEXP_check_week_flag=0;
    var CWEXP_check_weekly_expiry_list;  
    var CEXP_temptable_weeklyexpiry_stmt = CWEXP_conn.createStatement();
    CEXP_temptable_weeklyexpiry_stmt.execute("CALL SP_CUSTOMER_WEEKLY_EXPIRY('"+CWEXP_weekBefore+"','"+UserStamp+"',@CEXP_WEEKLYFEETMPTBLNAM)");
    CEXP_temptable_weeklyexpiry_stmt.close();
    var CEXP_beforefeetemptbl_stmt=CWEXP_conn.createStatement();
    var CEXP_beforefeetemptbl_query="SELECT @CEXP_WEEKLYFEETMPTBLNAM";
    var CEXP_beforefeetemptblres=CEXP_beforefeetemptbl_stmt.executeQuery(CEXP_beforefeetemptbl_query);
    var CEXP_weeklytemptblname="";
    while(CEXP_beforefeetemptblres.next())
    {
      CEXP_weeklytemptblname=CEXP_beforefeetemptblres.getString(1);
    }
    CEXP_beforefeetemptblres.close();
    CEXP_beforefeetemptbl_stmt.close();
    var CWEXP_customerdetails_stmt = CWEXP_conn.createStatement();
    var CEXP_select_customerdetails="SELECT * FROM "+CEXP_weeklytemptblname+""
    var CWEXP_customerdetails_result=CWEXP_customerdetails_stmt.executeQuery(CEXP_select_customerdetails);  
    while(CWEXP_customerdetails_result.next()){
      var CWEXP_unitno = CWEXP_customerdetails_result.getString("UNITNO");
      var CWEXP_firstname = CWEXP_customerdetails_result.getString("CUSTOMERFIRSTNAME");
      var CWEXP_lastname = CWEXP_customerdetails_result.getString("CUSTOMERLASTNAME");
      var CWEXP_rental = CWEXP_customerdetails_result.getString("PAYMENT");
      var CWEXP_cust_name=CWEXP_firstname+' '+CWEXP_lastname;
      var CWEXP_enddate = CWEXP_customerdetails_result.getString("ENDDATE");
      var CWEXP_ptddate=CWEXP_customerdetails_result.getString("PRETERMINATEDATE");      
      if(CWEXP_ptddate==null){
        var CWEXP_newdate=eilib.SqlDateFormat(CWEXP_enddate);
      }
      else{
        var CWEXP_newdate=eilib.SqlDateFormat(CWEXP_ptddate);       
      }
      CWEXP_check_week_flag=1;
      CWEXP_emailmessage += '<body>'+'<table border="1" width="700" >'+'<tr align="center">'+'<td width=25%>'+CWEXP_unitno+'</td>'+'<td width=25%>'+CWEXP_cust_name+'</td>'+'<td width=25%>'+CWEXP_newdate+'</td>'+'<td width=25%>'+CWEXP_rental+'</td>'+'</tr>'+'</table>'+'</body>';      
    }    
    CEXP_droptemptable(CWEXP_conn,CEXP_weeklytemptblname)
    CWEXP_conn.close();
    if(CWEXP_check_week_flag==0){ 
      CWEXP_check_weekly_expiry_list='false'
      return CWEXP_check_weekly_expiry_list;
    }
    else{  
      var displayname=eilib.Get_MailDisplayName('CUSTOMER_EXPIRY')
      MailApp.sendEmail(CWEXP_email_id,CWEXP_subject,CWEXP_emailmessage,{name:displayname,htmlBody:CWEXP_emailmessage});
      CWEXP_check_weekly_expiry_list='true'      
      return CWEXP_check_weekly_expiry_list;
    }    
  }  
  function CEXP_droptemptable(conn,tablename)
  {
    var CEXP_temp_stmt= conn.createStatement();
    var CEXP_HKunitnospquery="DROP TABLE IF EXISTS "+tablename+"";
    CEXP_temp_stmt.execute(CEXP_HKunitnospquery);
    CEXP_temp_stmt.close();
  }  
}
catch(err){}
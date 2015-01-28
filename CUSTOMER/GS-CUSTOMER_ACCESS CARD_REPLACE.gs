/********************************************FILE DESCRIPTION*********************************************
*******************************************REPLACE OF ACCESS CARD***************************************************
//  DONE BY PUNI
//  VER 1.1-SD:09/10/2014 ED:09/10/2014;TRACKER NO:791;1.added script to hide preloader after menu n form loads,2.Changed preloader n msgbox position
//  VER 1.0-SD:15/09/2014 ED:15/09/2014;TRACKER NO:791;CHANGED HTML SCRIPT TO SHOW MSG IF ACTIVE CARD IS ASSIGNED,CHANGED GS TO FILTER DATE>CURDATE
//  DONE BY:SARADAMBAL.M
//  VER 0.09-SD:26/08/2014 ED:27/08/2014;TRACKER NO:791;UPDATED NEW LINKS,AUTOGROW,CHECKED TICKLER PART
//  DONE BY:SAFIYULLAH.M
//  VER 0.08-SD:11/06/2014 ED:12/06/2014;TRACKER NO:791;UPDATED FAILURE MSG
//  VER 0.07-SD:06/06/2014 ED:06/06/2014;TRACKER NO:791;CHANGED JQUERY LINK
//  VER 0.06 -SD:11/04/2014 ED:28/04/2014;TRACKER NO: 791-update the query  for future customer not come in replace of access card.
//  VER 0.05 - SD:07/03/2014 ED:07/03/2014;TRACKER NO: 530-implement error msg getting from eilib,implement array concept.
//  VER 0.04 - SD:28/12/2013 ED:28/12/2013;TRACKER NO: 530-include style for header msg and change identifier
//  VER 0.03 - SD:02/12/2013 ED:09/12/2013;TRACKER NO: 530-Updated SP
//  VER 0.02 - SD:05/11/2013 ED:30/11/2013;TRACKER NO: 530-Tickler Table Updation
//  VER 0.01 - INITIAL VERSION-SD:04/09/2013 ED:01/10/2013;TRACKER NO: 530
*********************************************************************************************************
*/
//****************FUNCTION TO RETURN COMMON VALUES***************************88
try{  
  function CACS_REP_get_initial_values(){    
    var CACS_REP_conn = eilib.db_GetConnection();    
    var CACS_REP_err_msg_stmt = CACS_REP_conn.createStatement();
    var CACS_REP_errorAarray=[];
    var CACS_REP_select_err_msg='100,99,28,401'
    CACS_REP_errorAarray=eilib.GetErrorMessageList(CACS_REP_conn, CACS_REP_select_err_msg)
    var CACS_REP_customer_array=CACS_REP_allcustomer_details();
    var CACS_REP_reason_stmt = CACS_REP_conn.createStatement();
    var CACS_REP_select_reason="SELECT * FROM ACCESS_CONFIGURATION WHERE ACN_ID BETWEEN 1 AND 3 ORDER BY ACN_DATA";
    var CACS_REP_reason_result=CACS_REP_reason_stmt.executeQuery(CACS_REP_select_reason);
    var CACS_REP_reason_array=[]
    while(CACS_REP_reason_result.next()){
      CACS_REP_reason_array.push(CACS_REP_reason_result.getString("ACN_DATA"));
    }     
    CACS_REP_reason_result.close();
    CACS_REP_reason_stmt.close();
    CACS_REP_conn.close();    
    var CACS_REP_initial_values_array=[];
    var CACS_REP_initial_values={'CACS_REP_error_msg':CACS_REP_errorAarray.errormsg,'CACS_REP_reason':CACS_REP_reason_array,CACS_REP_customerdetails:CACS_REP_customer_array}
    CACS_REP_initial_values_array.push(CACS_REP_initial_values);  
    return CACS_REP_initial_values_array;  
  }  
  function CACS_REP_allcustomer_details(){    
    var CACS_REP_conn = eilib.db_GetConnection();
    var CACS_REP_all_customer_stmt = CACS_REP_conn.createStatement();
    var CACS_REP_customer_array=[]
    var CACS_REP_select_all_customer="SELECT  U.UNIT_NO,C.CUSTOMER_FIRST_NAME,C.CUSTOMER_LAST_NAME,C.CUSTOMER_ID,UASD.UASD_ACCESS_CARD,CPD.CPD_COMMENTS  FROM UNIT U,UNIT_ACCESS_STAMP_DETAILS UASD,CUSTOMER C,CUSTOMER_ACCESS_CARD_DETAILS CACD,CUSTOMER_LP_DETAILS CLP,CUSTOMER_ENTRY_DETAILS CED,CUSTOMER_PERSONAL_DETAILS CPD WHERE CED.CUSTOMER_ID=CPD.CUSTOMER_ID AND U.UNIT_ID=UASD.UNIT_ID AND U.UNIT_ID=CED.UNIT_ID AND CED.CUSTOMER_ID=CLP.CUSTOMER_ID AND CED.CED_REC_VER=CLP.CED_REC_VER AND CED.CUSTOMER_ID=CACD.CUSTOMER_ID AND  C.CUSTOMER_ID=CED.CUSTOMER_ID and CLP.CLP_TERMINATE IS NULL AND CACD.ACN_ID IS NULL AND UASD.UASD_ID=CACD.UASD_ID AND CLP.UASD_ID=CACD.UASD_ID  AND CED_CANCEL_DATE IS NULL AND CLP.CLP_STARTDATE<=CURDATE() AND IF(CLP.CLP_PRETERMINATE_DATE IS NOT NULL,CLP.CLP_PRETERMINATE_DATE>CURDATE(),CLP.CLP_ENDDATE>CURDATE()) AND C.CUSTOMER_ID NOT IN(SELECT CUSTOMERID FROM  VW_TERMINATION_TERMINATED_CUSTOMER) ORDER BY U.UNIT_NO ASC,C.CUSTOMER_FIRST_NAME ASC";
    var CACS_REP_customerresult = CACS_REP_all_customer_stmt.executeQuery(CACS_REP_select_all_customer);
    while(CACS_REP_customerresult.next())
    {
      var CACS_REP_firstname=CACS_REP_customerresult.getString("CUSTOMER_FIRST_NAME");
      var CACS_REP_lastname=CACS_REP_customerresult.getString("CUSTOMER_LAST_NAME");
      var CACS_REP_customername=CACS_REP_firstname+"_"+CACS_REP_lastname;
      CACS_REP_customer_array.push({unit:CACS_REP_customerresult.getString("UNIT_NO"),customerid:CACS_REP_customerresult.getString("CUSTOMER_ID"),name:CACS_REP_customername,cardno:CACS_REP_customerresult.getString("UASD_ACCESS_CARD"),comments:CACS_REP_customerresult.getString("CPD_COMMENTS")});
    }
    CACS_REP_all_customer_stmt.close();
    CACS_REP_customerresult.close(); 
    return CACS_REP_customer_array    
  }  
  //****************FUNCTION TO RETURN CUSTOMER NAME AND AVAILABLE CARD FOR SELECTED UNIT NO*******************
  function CACS_REP_get_avialablecard(unitno){
    var CACS_REP_conn = eilib.db_GetConnection();   
    var CACS_REP_newcardno_stmt = CACS_REP_conn.createStatement();
    var CACS_REP_select_newcard="SELECT UASD.UASD_ACCESS_CARD FROM UNIT_ACCESS_STAMP_DETAILS UASD,UNIT U WHERE U.UNIT_ID=UASD.UNIT_ID AND UASD.UASD_ACCESS_INVENTORY='X' AND U.UNIT_NO="+unitno+" ORDER BY UASD_ACCESS_CARD ASC";
    var CACS_REP_newcardno_result=CACS_REP_newcardno_stmt.executeQuery(CACS_REP_select_newcard);
    var CACS_REP_newcard_array=[]
    while(CACS_REP_newcardno_result.next()){
      CACS_REP_newcard_array.push(CACS_REP_newcardno_result.getString("UASD_ACCESS_CARD"));
    }     
    CACS_REP_newcardno_result.close();
    CACS_REP_newcardno_stmt.close();    
    CACS_REP_conn.close(); 
    return CACS_REP_newcard_array;
  }
  //**************FUNCTION TO REPLACE CARD****************// 
  function CACS_REP_saveform(CACS_REP_replaceform)
  {
    var CACS_REP_conn = eilib.db_GetConnection();    
    var CACS_REP_custid=CACS_REP_replaceform.CACS_REP_custid;
    var CACS_REP_currentcard=CACS_REP_replaceform.CACS_REP_cust_cardno;
    var CACS_REP_newcard=CACS_REP_replaceform.CACS_REP_new_cardno;
    var CACS_REP_reason=CACS_REP_replaceform.CACS_REP_reason;
    var CACS_REP_comments=CACS_REP_replaceform.CACS_REP_comments;
    var CACS_REP_unit_no=CACS_REP_replaceform.CACS_REP_unitno;
    var CACS_REP_valid_till=Utilities.formatDate(new Date(),TimeZone, 'yyyy-MM-dd') 
    //    //SAVE ACCESS CARD
    var CACS_REP_save_stmt=CACS_REP_conn.createStatement();
    if(CACS_REP_comments!=''){
      CACS_REP_comments=eilib.ConvertSpclCharString(CACS_REP_comments)
    }
    CACS_REP_save_stmt.execute("CALL SP_REPLACE_ACCESS_CARD_UPDATE("+CACS_REP_custid+","+CACS_REP_currentcard+","+CACS_REP_newcard+",'"+CACS_REP_reason+"','"+CACS_REP_comments+"','"+UserStamp+"',@replace_flag)");
    CACS_REP_save_stmt.close(); 
    var CACS_REP_return_flag_stmt=CACS_REP_conn.createStatement();
    var CACS_REP_getresult= CACS_REP_return_flag_stmt.executeQuery("SELECT @replace_flag");
    while(CACS_REP_getresult.next()){
      var CACS_REP_chkreplaceflag=CACS_REP_getresult.getString("@replace_flag");
    }
    CACS_REP_conn.close();
    var CACS_REP_allcust_details=CACS_REP_allcustomer_details();
    var final_result=[CACS_REP_chkreplaceflag,CACS_REP_allcust_details]
    return final_result  
  }
}
catch(err) {   
}
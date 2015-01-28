/*//*******************************************FILE DESCRIPTION*********************************************
//*******************************************ACCESS CARD SEARCH AND UPDATE***************************************************
//DONE BY:PUNI
VER 1.0-SD:09/10/2014 ED:09/10/2014;TRACKER NO:781;1.added script to hide preloader after menu n form loads,2.Changed preloader n msgbox position
//DONE BY:SARADAMBAL.M
VER 0.09-SD:27/08/2014 ED:27/08/2014;TRACKER NO:781;UPDATED NEW LINKS,AUTOGROW,CHECKED TICKLER PART
//DONE BY:SAFIYULLAH.M
VER 0.08-SD:09/06/2014 ED:09/06/2014;TRACKER NO:781;UPDATED SQL ENHANCEMENT and updated reset function 
VER 0.07-SD:06/06/2014 ED:06/06/2014;TRACKER NO:781;CHANGED JQUERY LINK
VER 0.06- SD:05/05/2013 ED:07/05/2013;TRACKER NO:781-UPDATED SCRIPT COMMENTS ONLY ALSO WILL UPDATE AND TERMINATED CUSTOMER NOT TO SHOW.
VER 0.05 - SD:07/03/2014 ED:07/03/2014;TRACKER NO: 530-implement error msg getting from eilib,implement array concept.
VER 0.04 - SD:28/12/2013 ED:28/12/2013;TRACKER NO: 530-include style for header msg and change identifier
VER 0.03 - SD:02/12/2013 ED:09/12/2013;TRACKER NO: 530-Updated Coding(Removed Doget function)
VER 0.02 - SD:05/11/2013 ED:30/11/2013;TRACKER NO: 530-Tickler Table Updation
<!---  VER 0.01 - INITIAL VERSION-SD:04/09/2013 ED:21/09/2013;TRACKER NO: 530
*********************************************************************************************************
*/
//****************FUNCTION TO RETURN INITIAL VALUE'S*****************************//
try{ 
  function CACS_SRC_get_initial_values(){    
    var CACS_SRC_conn =eilib.db_GetConnection();
    var CACS_SRC_errorAarray=[];    
    var CACS_SRC_select_err_msg='94,95,401'
    CACS_SRC_errorAarray=eilib.GetErrorMessageList(CACS_SRC_conn, CACS_SRC_select_err_msg)
    var CACS_SRC_allcustdetails=CACS_SRC_allcustomer_details();
    var CACS_SRC_reason_stmt = CACS_SRC_conn.createStatement();
    var CACS_SRC_select_reason="SELECT * FROM ACCESS_CONFIGURATION WHERE ACN_ID BETWEEN 1 AND 3 ORDER BY ACN_DATA";
    var CACS_SRC_reason_result=CACS_SRC_reason_stmt.executeQuery(CACS_SRC_select_reason);
    var CACS_SRC_reason_array=[]
    while(CACS_SRC_reason_result.next()){
      CACS_SRC_reason_array.push(CACS_SRC_reason_result.getString("ACN_DATA"));
    }     
    CACS_SRC_reason_result.close();
    CACS_SRC_reason_stmt.close();
    CACS_SRC_conn.close();    
    var CACS_SRC_initial_values_array=[];
    var CACS_SRC_initial_values={'CACS_SRC_error_msg':CACS_SRC_errorAarray.errormsg,'CACS_SRC_allcustdetails':CACS_SRC_allcustdetails,'CACS_SRC_reason':CACS_SRC_reason_array}
    CACS_SRC_initial_values_array.push(CACS_SRC_initial_values);  
    CACS_SRC_conn.close();
    return CACS_SRC_initial_values_array;   
  }
  function CACS_SRC_allcustomer_details(){    
    var CACS_SRC_conn = eilib.db_GetConnection();
    var CACS_SRC_all_customer_stmt = CACS_SRC_conn.createStatement();
    var CACS_SRC_customer_array=[]
    var CACS_SRC_select_all_customer= "SELECT DISTINCT U.UNIT_NO,C.CUSTOMER_FIRST_NAME,C.CUSTOMER_LAST_NAME,C.CUSTOMER_ID,UASD.UASD_ACCESS_CARD,CACD.CACD_VALID_FROM,CACD.CACD_VALID_TILL,AC.ACN_DATA ,CPD.CPD_COMMENTS FROM UNIT U,CUSTOMER C,UNIT_ACCESS_STAMP_DETAILS UASD,CUSTOMER_ACCESS_CARD_DETAILS CACD,CUSTOMER_LP_DETAILS CLP,CUSTOMER_ENTRY_DETAILS CED,ACCESS_CONFIGURATION AC,CUSTOMER_PERSONAL_DETAILS CPD WHERE U.UNIT_ID=UASD.UNIT_ID AND  C.CUSTOMER_ID=CED.CUSTOMER_ID AND U.UNIT_ID=CED.UNIT_ID AND CED.CUSTOMER_ID=CLP.CUSTOMER_ID AND CED.CED_REC_VER=CLP.CED_REC_VER AND CED.CUSTOMER_ID=CACD.CUSTOMER_ID AND CLP.CLP_TERMINATE IS NULL AND UASD.UASD_ID=CACD.UASD_ID AND AC.ACN_ID=CACD.ACN_ID AND CED.CUSTOMER_ID=CPD.CUSTOMER_ID and C.CUSTOMER_ID NOT IN(SELECT CUSTOMERID FROM  VW_TERMINATION_TERMINATED_CUSTOMER) AND  CACD.ACN_ID BETWEEN 1 AND 3 ORDER BY U.UNIT_NO ASC,C.CUSTOMER_FIRST_NAME ASC"
    var CACS_SRC_customerresult = CACS_SRC_all_customer_stmt.executeQuery(CACS_SRC_select_all_customer);
    while(CACS_SRC_customerresult.next())
    {
      var CACS_SRC_firstname=CACS_SRC_customerresult.getString("CUSTOMER_FIRST_NAME");
      var CACS_SRC_lastname=CACS_SRC_customerresult.getString("CUSTOMER_LAST_NAME");
      var CACS_SRC_customername=CACS_SRC_firstname+"_"+CACS_SRC_lastname;
      CACS_SRC_customer_array.push({unit:CACS_SRC_customerresult.getString("UNIT_NO"),customerid:CACS_SRC_customerresult.getString("CUSTOMER_ID"),name:CACS_SRC_customername,cardno:CACS_SRC_customerresult.getString("UASD_ACCESS_CARD"),comments:CACS_SRC_customerresult.getString("CPD_COMMENTS"),validfrom:CACS_SRC_customerresult.getString("CACD_VALID_FROM"),validtill:CACS_SRC_customerresult.getString("CACD_VALID_TILL"),'reason':CACS_SRC_customerresult.getString("ACN_DATA")});
    }
    CACS_SRC_all_customer_stmt.close();
    CACS_SRC_customerresult.close();
    return CACS_SRC_customer_array    
  } 
  //FUNCTION TO SAVE DETAILS
  function CACS_SRC_saveform(CACS_SRC_details)
  {    
    var CACS_SRC_conn = eilib.db_GetConnection();
    var CACS_SRC_custid=CACS_SRC_details.CACS_SRC_custid;
    var CACS_SRC_comment=CACS_SRC_details.CACS_SRC_comments;
    var CACS_SRC_cardno=CACS_SRC_details.CACS_SRC_cust_cardno;    
    var CACS_SRC_reason=CACS_SRC_details.CACS_SRC_reason;
    if(CACS_SRC_comment!=''){
      CACS_SRC_comment=eilib.ConvertSpclCharString(CACS_SRC_comment)      
    }
    var CACS_SRC_savedetails_stmt = CACS_SRC_conn.createStatement(); 
    CACS_SRC_savedetails_stmt.execute("CALL SP_ACCESS_CARD_UPDATE("+CACS_SRC_custid+","+CACS_SRC_cardno+",'"+CACS_SRC_reason+"','"+CACS_SRC_comment+"','"+UserStamp+"',@replace_search_flag)");
    CACS_SRC_savedetails_stmt.close();
    var CACS_SRC_return_flag_stmt=CACS_SRC_conn.createStatement();
    var CACS_SRC_getresult= CACS_SRC_return_flag_stmt.executeQuery("SELECT @replace_search_flag");
    while(CACS_SRC_getresult.next()){
      var CACS_SRC_chkreplaceflag=CACS_SRC_getresult.getString("@replace_search_flag");
    }
    CACS_SRC_conn.close();
    var CACS_SRC_allcust_details=CACS_SRC_allcustomer_details();
    var final_result=[CACS_SRC_chkreplaceflag,CACS_SRC_allcust_details]    
    return final_result    
  }
}
catch(err){}
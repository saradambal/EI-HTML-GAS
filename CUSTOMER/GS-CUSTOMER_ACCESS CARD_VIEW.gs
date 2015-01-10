//*******************************************FILE DESCRIPTION*********************************************//
//************************************VIEW ALL CARD***********************************************//
//DONE BY:SAFIYULLAH.M
//VER 1.0-SD:12/06/2014 ED:12/06/2014;TRACKER NO:780;UPDATED FAILURE MSG
//VER 0.09-SD:06/06/2014 ED:06/06/2014;TRACKER NO:780;CHANGED JQUERY LINK
//VER 0.08-SD:26/05/2014 ED:26/05/2014:TRACKER NO: 780;SEARCH BY CARD FLEX TABLE HEIGHTS UPDATED, AND ISSUE CORRCTED IN ERROR MSG SHOWING.SP UPDTAED TO SHOW TERMINATED CUSTOMER CARD DETAILS ALSO
//VER 0.07 - SD:06/05/2014 ED:07/05/2014 ;TRACKER NO: 780:UPDATE THE HEIGHT OF FLEX TABLE AND UPDATED TEMP TABLE DYNAMIC IN FORM
//VER 0.06 -SD:05/03/2014 ED:05/03/2014;TRACKER NO: 716;implement error msg getting from eilib 
//VER 0.05 - SD:21/01/2014 ED:22/01/2014;TRACKER NO: 716-Added Auto complete for search by customer
//VER 0.04 - SD:28/12/2013 ED:28/12/2013;TRACKER NO: 530-update style for header msg and change identifier
//VER 0.03 - SD:02/12/2013 ED:09/12/2013;TRACKER NO: 530-Updated SP(Removed Doget function)
//VER 0.02 - SD:05/11/2013 ED:30/11/2013;TRACKER NO: 530-Design Changed,Tickler Table updated
//VER 0.01 - INITIAL VERSION-SD:04/09/2013 ED:01/10/2013;TRACKER NO: 530
//*********************************************************************************************************//

try{  
  
  function CACS_VIEW_get_initial_values()
  {     
    var CACS_VIEW_conn =eilib.db_GetConnection();    
    var CACS_VIEW_err_msg_stmt = CACS_VIEW_conn.createStatement();
    var CACS_VIEW_errorAarray=[];    
    var CACS_VIEW_select_err_msg='51,47,18,96,97,98,248,327,249,369'
    CACS_VIEW_errorAarray=eilib.GetErrorMessageList(CACS_VIEW_conn, CACS_VIEW_select_err_msg)
    var CACS_VIEW_unitno_stmt = CACS_VIEW_conn.createStatement();
    var CACS_VIEW_unitarray=[]
    var CACS_VIEW_select_unitno="SELECT UNIT_NO FROM UNIT ORDER BY UNIT_NO ASC";
    var CACS_VIEW_unitno_rs=CACS_VIEW_unitno_stmt.executeQuery(CACS_VIEW_select_unitno);
    while(CACS_VIEW_unitno_rs.next()){
      CACS_VIEW_unitarray.push(CACS_VIEW_unitno_rs.getString("UNIT_NO"));
    }     
    CACS_VIEW_unitno_rs.close();
    CACS_VIEW_unitno_stmt.close();
    var CACS_VIEW_accesscard_stmt = CACS_VIEW_conn.createStatement();
    var CACS_VIEW_card_array=[];
    var CACS_VIEW_select_accesscard="SELECT UASD.UASD_ACCESS_CARD FROM UNIT_ACCESS_STAMP_DETAILS UASD,UNIT U WHERE U.UNIT_ID=UASD.UNIT_ID AND UASD.UASD_ACCESS_CARD IS NOT NULL ORDER BY UASD.UASD_ACCESS_CARD ASC";
    var CACS_VIEW_accesscard_rs=CACS_VIEW_accesscard_stmt.executeQuery(CACS_VIEW_select_accesscard);
    while(CACS_VIEW_accesscard_rs.next()){
      CACS_VIEW_card_array.push(CACS_VIEW_accesscard_rs.getString("UASD_ACCESS_CARD"));
    }     
    CACS_VIEW_accesscard_rs.close();
    CACS_VIEW_accesscard_stmt.close();
    var CACS_VIEW_config_stmt = CACS_VIEW_conn.createStatement();
    var CACS_VIEW_cust_config=[];
    var CACS_VIEW_select_cust_config="SELECT concat(CCN_ID,'_',CCN_DATA) as DATA FROM CUSTOMER_CONFIGURATION WHERE CCN_ID IN (18,21,31,40) ORDER BY CCN_DATA ASC"
    var CACS_VIEW_config_rs=CACS_VIEW_config_stmt.executeQuery(CACS_VIEW_select_cust_config);
    while(CACS_VIEW_config_rs.next()){
      CACS_VIEW_cust_config.push(CACS_VIEW_config_rs.getString("DATA"));
    }     
    CACS_VIEW_config_rs.close();
    CACS_VIEW_config_stmt.close();    
    var CACS_VIEW_initial_values_array=[];
    var CACS_VIEW_initial_values={'CACS_VIEW_error_msg':CACS_VIEW_errorAarray.errormsg,'CACS_VIEW_unitno':CACS_VIEW_unitarray,'CACS_VIEW_card':CACS_VIEW_card_array,'CACS_VIEW_config':CACS_VIEW_cust_config}
    CACS_VIEW_initial_values_array.push(CACS_VIEW_initial_values);  
    CACS_VIEW_conn.close();
    return CACS_VIEW_initial_values_array;  
  }  
  //FUNCTION TO RETURN CARD NO DETAILS  
  function CACS_VIEW_get_cardno_details(unitno,cardno,option)
  {
    if(option==18)
    {      
      var CACS_VIEW_conn = eilib.db_GetConnection();
      var CACS_VIEW_carddetails_stmt=CACS_VIEW_conn.createStatement();
      CACS_VIEW_carddetails_stmt.execute("CALL SP_ACCESS_CARD_STATUS('"+cardno+"','"+UserStamp+"',@CARDSTATUSTMPTBLNAM)")
      var CACS_VIEW_feetemptbl_stmt=CACS_VIEW_conn.createStatement();
      var CACS_VIEW_feetemptbl_query="SELECT @CARDSTATUSTMPTBLNAM";
      var CACS_VIEW_feetemptblres=CACS_VIEW_feetemptbl_stmt.executeQuery(CACS_VIEW_feetemptbl_query);
      var CACS_VIEW_temptblname="";
      while(CACS_VIEW_feetemptblres.next())
      {
        CACS_VIEW_temptblname=CACS_VIEW_feetemptblres.getString(1);
      }
      CACS_VIEW_feetemptblres.close();
      CACS_VIEW_feetemptbl_stmt.close();
      var CACS_VIEW_select_carddetails="SELECT * FROM "+CACS_VIEW_temptblname+""
      var CACS_VIEW_carddetails_array=[];      
      var CACS_VIEW_carddetails_rs=CACS_VIEW_carddetails_stmt.executeQuery(CACS_VIEW_select_carddetails);
      if(CACS_VIEW_carddetails_rs.next())
      {
        var CACS_VIEW_access_unitno=CACS_VIEW_carddetails_rs.getString("UNITNO")
        var CACS_VIEW_access_active=CACS_VIEW_carddetails_rs.getString("ACTIVE_ACCESS_CARD")
        if(CACS_VIEW_access_active==null){ CACS_VIEW_access_active=""}
        var CACS_VIEW_access_inventory=CACS_VIEW_carddetails_rs.getString("INVENTORY_ACCESS_CARD");
        if(CACS_VIEW_access_inventory==null){ CACS_VIEW_access_inventory=""}
        var CACS_VIEW_access_lost=CACS_VIEW_carddetails_rs.getString("LOST_ACCESS_CARD");
        if(CACS_VIEW_access_lost==null){ CACS_VIEW_access_lost=""}
        var CACS_VIEW_access_reason=CACS_VIEW_carddetails_rs.getString("ACCESS_REASON");
        if(CACS_VIEW_access_reason==null){CACS_VIEW_access_reason=""}
        var CACS_VIEW_access_comment=CACS_VIEW_carddetails_rs.getString("ACCESS_COMMENTS"); 
        if(CACS_VIEW_access_comment==null){CACS_VIEW_access_comment=""}        
        var CACS_VIEW_carddetails={'unitno':CACS_VIEW_access_unitno,'active':CACS_VIEW_access_active,'inventory':CACS_VIEW_access_inventory,'lost':CACS_VIEW_access_lost,'reason':CACS_VIEW_access_reason,'comments':CACS_VIEW_access_comment}
        CACS_VIEW_carddetails_array.push(CACS_VIEW_carddetails)        
      }
      CACS_VIEW_carddetails_rs.close() 
      CACS_VIEW_carddetails_stmt.close()
      var CCARD_drop_stmt=CACS_VIEW_conn.createStatement();
      var CCARD_drop_query=("DROP TABLE IF EXISTS "+CACS_VIEW_temptblname+"")
      CCARD_drop_stmt.execute(CCARD_drop_query)
      CCARD_drop_stmt.close()
      CACS_VIEW_conn.close();
      return CACS_VIEW_carddetails_array;      
    }
    else if(option==31)
    {
      var CACS_VIEW_active_array=[]
      var CACS_VIEW_inventory_array=[]
      var CACS_VIEW_lost_array=[] 
      var CACS_VIEW_CHECKFLAG;
      var CACS_VIEW_conn = eilib.db_GetConnection();
      var CACS_VIEW_unit_carddetails_stmt=CACS_VIEW_conn.createStatement();
      CACS_VIEW_unit_carddetails_stmt.execute("CALL SP_ACCESS_CARD_SEARCH_BY_UNIT("+unitno+",'"+UserStamp+"',@BYUNITTMPTBLNAM,@checkflag)");
      var CACS_VIEW_feetemptbl_stmt=CACS_VIEW_conn.createStatement();
      var CACS_VIEW_feetemptbl_query="SELECT @BYUNITTMPTBLNAM,@checkflag";
      var CACS_VIEW_feetemptblres=CACS_VIEW_feetemptbl_stmt.executeQuery(CACS_VIEW_feetemptbl_query);
      var CACS_VIEW_temptblname="";
      while(CACS_VIEW_feetemptblres.next())
      {
        CACS_VIEW_temptblname=CACS_VIEW_feetemptblres.getString(1);
        CACS_VIEW_CHECKFLAG=CACS_VIEW_feetemptblres.getString(2);        
      }
      CACS_VIEW_feetemptblres.close();
      CACS_VIEW_feetemptbl_stmt.close();
      var CACS_VIEW_select_unit_carddetails="SELECT * FROM "+CACS_VIEW_temptblname+""
      var CACS_VIEW_unit_carddetails_rs=CACS_VIEW_unit_carddetails_stmt.executeQuery(CACS_VIEW_select_unit_carddetails);
      var CACS_VIEW_finalarray=[];
      var CACS_VIEW_lostcard_array1=[]
      var CACS_VIEW_lostcard_array2=[]
      var CACS_VIEW_lostcard_array=[]
      var CACS_VIEW_lostcard1_array=[]
      var CACS_VIEW_activecard_array=[]
      var CACS_VIEW_inventorycard_array=[]
      var CACS_VIEW_reason_array=[]      
      while(CACS_VIEW_unit_carddetails_rs.next())
      {        
        var CACS_VIEW_access_active=CACS_VIEW_unit_carddetails_rs.getString("ACTIVE_CARD");
        if(CACS_VIEW_access_active!=null){ CACS_VIEW_activecard_array.push(CACS_VIEW_access_active)}        
        var CACS_VIEW_access_inventory=CACS_VIEW_unit_carddetails_rs.getString("INVENTORY_CARD");
        if(CACS_VIEW_access_inventory!=null){CACS_VIEW_inventorycard_array.push(CACS_VIEW_access_inventory)}        
        var CACS_VIEW_access_customer_lost=CACS_VIEW_unit_carddetails_rs.getString("CUSTOMER_OLD_CARD");
        if(CACS_VIEW_access_customer_lost!=null){ CACS_VIEW_lostcard_array.push(CACS_VIEW_access_customer_lost)} 
        var CACS_VIEW_access_employee_lost=CACS_VIEW_unit_carddetails_rs.getString("EMPLOYEE_LOST_CARD");
        if(CACS_VIEW_access_employee_lost!=null){ CACS_VIEW_lostcard1_array.push(CACS_VIEW_access_employee_lost)}              
        var CACS_VIEW_access_reason=CACS_VIEW_unit_carddetails_rs.getString("REASON");
        if(CACS_VIEW_access_reason!=null){CACS_VIEW_reason_array.push(CACS_VIEW_access_reason)}         
      }
      if(CACS_VIEW_lostcard1_array.length!=0){
        CACS_VIEW_lostcard_array.push(CACS_VIEW_lostcard1_array)
      }
      if(CACS_VIEW_activecard_array.length!=0||CACS_VIEW_inventorycard_array.length!=0||CACS_VIEW_lostcard_array.length!=0||CACS_VIEW_reason_array.length!=0){
        CACS_VIEW_finalarray=[CACS_VIEW_activecard_array,CACS_VIEW_inventorycard_array,CACS_VIEW_lostcard_array,CACS_VIEW_reason_array]
      }
      CACS_VIEW_unit_carddetails_rs.close();
      CACS_VIEW_unit_carddetails_stmt.close();
      var CACS_VIEW_final_array=[];
      CACS_VIEW_final_array.push(CACS_VIEW_finalarray)
      CACS_VIEW_final_array.push(CACS_VIEW_CHECKFLAG);      
      var CCARD_drop_stmt=CACS_VIEW_conn.createStatement();
      var CCARD_drop_query=("DROP TABLE IF EXISTS "+CACS_VIEW_temptblname+"")
      CCARD_drop_stmt.execute(CCARD_drop_query)
      CCARD_drop_stmt.close();
      CACS_VIEW_conn.close();
      return CACS_VIEW_final_array    
    }
    else if(option==40){
      var CACS_VIEW_conn = eilib.db_GetConnection();
      var CACS_VIEW_unit_carddetails_stmt=CACS_VIEW_conn.createStatement();
      CACS_VIEW_unit_carddetails_stmt.execute("CALL SP_ACCESS_CARD_SEARCH_BY_ALL_UNIT('"+UserStamp+"',@BYALLUNITTMPTBLNAM,@checkflag)");
      var CACS_VIEW_feetemptbl_stmt=CACS_VIEW_conn.createStatement();
      var CACS_VIEW_feetemptbl_query="SELECT @BYALLUNITTMPTBLNAM,@checkflag";
      var CACS_VIEW_feetemptblres=CACS_VIEW_feetemptbl_stmt.executeQuery(CACS_VIEW_feetemptbl_query);
      var CACS_VIEW_temptblname="";
      var CACS_VIEW_CHECKFLAG;
      while(CACS_VIEW_feetemptblres.next())
      {
        CACS_VIEW_temptblname=CACS_VIEW_feetemptblres.getString(1);
        CACS_VIEW_CHECKFLAG=CACS_VIEW_feetemptblres.getString(2);
      }
      CACS_VIEW_feetemptblres.close();
      CACS_VIEW_feetemptbl_stmt.close();
      var CACS_VIEW_select_unit_carddetails="SELECT * FROM "+CACS_VIEW_temptblname+""
      var CACS_VIEW_unit_carddetails_rs=CACS_VIEW_unit_carddetails_stmt.executeQuery(CACS_VIEW_select_unit_carddetails);
      var CACS_VIEW_finalarray=[];
      var CACS_VIEW_final_array=[];
      while(CACS_VIEW_unit_carddetails_rs.next())
      { 
        var CACS_VIEW_access_unitno=CACS_VIEW_unit_carddetails_rs.getString("UNITNO")
        var CACS_VIEW_access_active=CACS_VIEW_unit_carddetails_rs.getString("ACTIVE_CARD");
        if(CACS_VIEW_access_active==null){CACS_VIEW_access_active=''}
        var CACS_VIEW_access_inventory=CACS_VIEW_unit_carddetails_rs.getString("INVENTORY_CARD");
        if(CACS_VIEW_access_inventory==null){ CACS_VIEW_access_inventory=''}        
        var CACS_VIEW_access_customer_lost=CACS_VIEW_unit_carddetails_rs.getString("CUSTOMER_LOST_CARD");
        if(CACS_VIEW_access_customer_lost==null){ CACS_VIEW_access_customer_lost=''}
        var CACS_VIEW_access_employee_lost=CACS_VIEW_unit_carddetails_rs.getString("EMPLOYEE_LOST_CARD");
        if(CACS_VIEW_access_employee_lost==null){ CACS_VIEW_access_employee_lost=''}        
        var CACS_VIEW_access_reason=CACS_VIEW_unit_carddetails_rs.getString("REASON");        
        if(CACS_VIEW_access_reason==null){CACS_VIEW_access_reason=''}        
        var CACS_VIEW_carddetails={'unitno':CACS_VIEW_access_unitno,'active':CACS_VIEW_access_active,'inventory':CACS_VIEW_access_inventory,'customer_lost':CACS_VIEW_access_customer_lost,'employee_lost':CACS_VIEW_access_employee_lost,'reason':CACS_VIEW_access_reason}
        CACS_VIEW_finalarray.push(CACS_VIEW_carddetails)        
      }
      CACS_VIEW_unit_carddetails_stmt.close();
      CACS_VIEW_unit_carddetails_rs.close();
      CACS_VIEW_final_array.push(CACS_VIEW_finalarray)
      CACS_VIEW_final_array.push(CACS_VIEW_CHECKFLAG); 
      var CCARD_drop_stmt=CACS_VIEW_conn.createStatement();
      var CCARD_drop_query=("DROP TABLE IF EXISTS "+CACS_VIEW_temptblname+"")
      CCARD_drop_stmt.execute(CCARD_drop_query)
      CCARD_drop_stmt.close();
      CACS_VIEW_conn.close(); 
      return CACS_VIEW_final_array       
    }
  }  
  //******************FUNCTION TO GET CUSTOMER ID***********************  
  function CACS_VIEW_CustomerId(custname)
  {
    var CACS_VIEW_conn = eilib.db_GetConnection(); 
    var CACS_VIEW_customername=custname.split('  ');
    var CACS_VIEW_firstname=CACS_VIEW_customername[0];
    var CACS_VIEW_lastname=CACS_VIEW_customername[1];
    var CACS_VIEW_custid=[];
    var CACS_VIEW_custid_stmt = CACS_VIEW_conn.createStatement();
    var CACS_VIEW_select_cust_id="SELECT C.CUSTOMER_ID FROM CUSTOMER C WHERE C.CUSTOMER_FIRST_NAME='"+CACS_VIEW_firstname+"' AND C.CUSTOMER_LAST_NAME='"+CACS_VIEW_lastname+"' ORDER BY C.CUSTOMER_ID ASC";
    var CACS_VIEW_custid_result=CACS_VIEW_custid_stmt.executeQuery(CACS_VIEW_select_cust_id);
    while(CACS_VIEW_custid_result.next()){      
      CACS_VIEW_custid.push(CACS_VIEW_custid_result.getString("CUSTOMER_ID"));
    } 
    CACS_VIEW_custid_result.close();
    CACS_VIEW_custid_stmt.close()
    CACS_VIEW_conn.close();
    return CACS_VIEW_custid   
  }  
  //FUNCTION TO GET CARD DETAILS FOR CUSTOMER  
  function CACS_VIEW_get_customervalues(custid)
  {     
    var CACS_VIEW_return_array=[];
    var  CACS_VIEW_finalreturn_array=[];
    var CACS_VIEW_conn = eilib.db_GetConnection();
    var CACS_VIEW_custcard_details_stmt=CACS_VIEW_conn.createStatement();
    CACS_VIEW_custcard_details_stmt.execute("CALL SP_ACCESS_CARD_SEARCH_BY_CUSTOMER('"+custid+"','"+UserStamp+"',@BYCUSTOMERTMPTBLNAM,@cust_checkflag)");
    var CACS_VIEW_feetemptbl_stmt=CACS_VIEW_conn.createStatement();
    var CACS_VIEW_feetemptbl_query="SELECT @BYCUSTOMERTMPTBLNAM,@cust_checkflag";
    var CACS_VIEW_feetemptblres=CACS_VIEW_feetemptbl_stmt.executeQuery(CACS_VIEW_feetemptbl_query);
    var CACS_VIEW_temptblname="";
    var CACS_VIEW_CHECKFLAG;
    while(CACS_VIEW_feetemptblres.next())
    {
      CACS_VIEW_temptblname=CACS_VIEW_feetemptblres.getString(1);
      CACS_VIEW_CHECKFLAG=CACS_VIEW_feetemptblres.getString(2);
    }
    CACS_VIEW_feetemptblres.close();
    CACS_VIEW_feetemptbl_stmt.close();
    var CACS_VIEW_select_cust_card="SELECT * FROM "+CACS_VIEW_temptblname+" order by UNITNO" 
    var CACS_VIEW_cust_card_rs=CACS_VIEW_custcard_details_stmt.executeQuery(CACS_VIEW_select_cust_card);
    while(CACS_VIEW_cust_card_rs.next())
    {
      var CACS_VIEW_access_unitno=CACS_VIEW_cust_card_rs.getString("UNITNO")
      var CACS_VIEW_access_active=CACS_VIEW_cust_card_rs.getString("ACTIVE_CARD");
      if(CACS_VIEW_access_active==null){ CACS_VIEW_access_active=""}
      var CACS_VIEW_access_lost=CACS_VIEW_cust_card_rs.getString("OLD_CARD");
      if(CACS_VIEW_access_lost==null){ CACS_VIEW_access_lost=""}
      var CACS_VIEW_access_reason=CACS_VIEW_cust_card_rs.getString("REASON");
      if(CACS_VIEW_access_reason==null){CACS_VIEW_access_reason=""}     
      var CACS_VIEW_access_comment=CACS_VIEW_cust_card_rs.getString("COMMENTS"); 
      if(CACS_VIEW_access_comment==null){CACS_VIEW_access_comment=""}     
      var CACS_VIEW_cust_carddetails={'unitno':CACS_VIEW_access_unitno,'active':CACS_VIEW_access_active,'lost':CACS_VIEW_access_lost,'reason':CACS_VIEW_access_reason,'comments':CACS_VIEW_access_comment}
      CACS_VIEW_return_array.push(CACS_VIEW_cust_carddetails)     
    }
    CACS_VIEW_cust_card_rs.close();
    CACS_VIEW_custcard_details_stmt.close();
    var CCARD_drop_stmt=CACS_VIEW_conn.createStatement();
    var CCARD_drop_query=("DROP TABLE IF EXISTS "+CACS_VIEW_temptblname+"")
    CCARD_drop_stmt.execute(CCARD_drop_query)
    CACS_VIEW_conn.close();
    CACS_VIEW_finalreturn_array.push(CACS_VIEW_return_array)
    CACS_VIEW_finalreturn_array.push(CACS_VIEW_CHECKFLAG)    
    return CACS_VIEW_finalreturn_array;    
  }
  //FUNCTION FOR AUTOCOMPLETE CUSTOMER NAME
  function CACS_VIEW_customername_autocomplete()
  {
    var CACS_VIEW_conn=eilib.db_GetConnection();
    var CACS_VIEW_stmt=CACS_VIEW_conn.createStatement();
    var CACS_VIEW_dataArray=[];
    var CACS_VIEW_select_custname="SELECT DISTINCT CONCAT(C.CUSTOMER_FIRST_NAME,'  ',C.CUSTOMER_LAST_NAME) AS CUSTOMERNAME FROM CUSTOMER C GROUP BY C.CUSTOMER_FIRST_NAME,C.CUSTOMER_ID";
    var CACS_VIEW_rs=CACS_VIEW_stmt.executeQuery(CACS_VIEW_select_custname)
    while(CACS_VIEW_rs.next()) 
    {
      if(CACS_VIEW_rs.getString('CUSTOMERNAME')!=null)
        CACS_VIEW_dataArray.push(CACS_VIEW_rs.getString('CUSTOMERNAME'));
    }    
    CACS_VIEW_rs.close();
    CACS_VIEW_stmt.close();
    CACS_VIEW_conn.close();
    return CACS_VIEW_dataArray;
  }  
}
catch(err){}
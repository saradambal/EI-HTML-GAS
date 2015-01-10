//*******************************************FILE DESCRIPTION*********************************************//
//*******************************************UNIT SEARCH/UPDATE*********************************************//
//DONE BY:SARADAMBAL 
//VER 0.09-TRACKER NO:723,SD:12/06/2014 ED:11/07/2014,implemented script for commit and failure function,implement script in refresh func ,implemented check transaction sp for dp
//VER 0.08-TRACKER NO:723,SD:07/06/2014,SD:07/06/2014,updated new drive link,put date format for timestamp
//VER 0.07-TRACKER NO:723,SD:23/04/2014,ED:26/04/2014,add class for datepicker,put dp validation for unit min(sd-1 month) and max(sysdate+2 year)
//VER 0.06-TRACKER NO:723,SD:27/03/2014,ED:27/03/2014,closed head tag
//VER 0.05-TRACKER NO:723,SD:06/02/2014,ED:10/03/2014,cleared issue,implemented eilib for general fields to remove special character and eilib for error msg,included another flex table for search by unit,put disable for access card if card is empty,removed repeated script,implemented uldid instead of using userstamp,add lb for active,inventory and lost and add cb for inventory,implemented flag for success msg
//VER 0.04-SD:28/12/2013,ED:30/12/2013,TRACKER NO:692,cleared issue for showing two error msg,implemented h3 tag for title,corrected errormsg,restrict repeated roomtype,stamptype for single unit
//VER 0.03-SD:28/12/2013,ED:30/12/2013,changed form alignment tag,removed utilities syntax,implemented conn for eilib function
//VER 0.02-SD:10/12/2013,ED:11/12/2013,updated sp for Access-stamp-detail form,view for active customer
//VER 0.01-INITIAL VERSION,TRACKER NO:245,SD:11/10/2013,ED:30/11/2013-->
//*********************************************************************************************************//
//DO GET FUNCTION
try{
  //----------LOAD ERROR MESSAGE FROM ERROR TABLE--------------------
  function USRC_errormsg_data_unitno()
  {
    var USRC_conn =eilib.db_GetConnection();
    var USRC_result=[];
    var USRC_errorarray=[];
    var USRC_stmterr = USRC_conn.createStatement();
    var USRC_errorarray =  eilib.GetErrorMessageList(USRC_conn,'1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,45,52,98,248,307,308,317,318,319,322,323,324,325,326,333,334,401,101,402,403,457,458');
    var USRC_stmtunitno_check = USRC_conn.createStatement();
    var USRC_queryunitno_check = "SELECT * FROM UNIT ORDER BY UNIT_NO ASC";
    var USRC_rsunitno_check = USRC_stmtunitno_check.executeQuery(USRC_queryunitno_check);
    var USRC_loaddata_arr=[];
    while(USRC_rsunitno_check.next())
    {
      USRC_loaddata_arr.push(USRC_rsunitno_check.getString(2));
    }
    USRC_rsunitno_check.close();
    USRC_stmtunitno_check.close();
    var USRC_unitoptions_dataid=[];
    if(USRC_loaddata_arr!=''){
      var USRC_select_query_unitoptions= "SELECT * FROM UNIT_CONFIGURATION WHERE UCN_ID IN (1,2,3,4,5,6,7,8,9,10,11,12) ORDER BY UCN_DATA ASC"
      var USRC_stmt_unitoption = USRC_conn.createStatement();
      var USRC_unitoption_rs = USRC_stmt_unitoption.executeQuery(USRC_select_query_unitoptions);
      while(USRC_unitoption_rs.next())
      {
        var USRC_unitoptions_id = USRC_unitoption_rs.getString(1);
        var USRC_unitoptions_data = USRC_unitoption_rs.getString(3);
        var USRC_unitoptions_object={"USRC_unitoption_id":USRC_unitoptions_id,"USRC_unitoption_data":USRC_unitoptions_data};
        USRC_unitoptions_dataid.push(USRC_unitoptions_object);
      }}
    USRC_result={"USRC_errormsg":USRC_errorarray.errormsg,"USRC_unitoption":USRC_unitoptions_dataid,"USRC_obj_unitno":USRC_loaddata_arr}
    return USRC_result;
    USRC_unitoption_rs.close();USRC_stmt_unitoption.close();
    USRC_conn.close();
  }
  /*-----------------------------------------------FUNCTION FOR ALL SEARCH BY UNIT TYPES-------------------------------------------------*/
  function USRC_func_load_searchby_option(USRC_unit_optionfetch,USRC_parentfunc,USRC_load_lb)
  { 
    var USRC_conn =eilib.db_GetConnection();
    var USRC_stmt = USRC_conn.createStatement();
    var USRC_loaddata_arr=[];
    if((USRC_unit_optionfetch==9)||(USRC_unit_optionfetch==8)||(USRC_unit_optionfetch==5))
    {
      if(USRC_unit_optionfetch==9)//ROOM TYPE WITH UNIT
        var USRC_select_query_roomtype_separate = "SELECT URTD_ROOM_TYPE FROM UNIT_ROOM_TYPE_DETAILS WHERE URTD_ID IN(SELECT URTD_ID FROM UNIT_ACCESS_STAMP_DETAILS) ORDER BY URTD_ROOM_TYPE ASC";
      else if(USRC_unit_optionfetch==8)//STAMP TYPE
        var USRC_select_query_roomtype_separate = "SELECT USDT_DATA FROM UNIT_STAMP_DUTY_TYPE WHERE USDT_DATA IS NOT NULL ORDER BY USDT_DATA ASC"; 
      else if(USRC_unit_optionfetch==5)//ROOM TYPE
        var USRC_select_query_roomtype_separate = "SELECT URTD_ROOM_TYPE FROM UNIT_ROOM_TYPE_DETAILS WHERE URTD_ROOM_TYPE IS NOT NULL ORDER BY URTD_ROOM_TYPE ASC"; 
      var USRC_separate_roomtype_rs = USRC_stmt.executeQuery(USRC_select_query_roomtype_separate);
      while(USRC_separate_roomtype_rs.next())
      {
        var USRC_all_roomtypeseparate  = USRC_separate_roomtype_rs.getString(1);
        USRC_loaddata_arr.push(USRC_all_roomtypeseparate);
      }USRC_separate_roomtype_rs.close();
    }
    else if((USRC_unit_optionfetch==1)||(USRC_unit_optionfetch==7))
    {
      if(USRC_unit_optionfetch==1)
        USRC_loaddata_arr=eilib.GetActiveUnit(USRC_conn);
      else if(USRC_unit_optionfetch==7)
        USRC_loaddata_arr=USRC_errormsg_data_unitno().USRC_obj_unitno;
    } 
    var USRC_result_obj={"USRC_loaddata_searchby":USRC_loaddata_arr,"USRC_flag":USRC_unit_optionfetch,"USRC_parentfunc_obj":USRC_parentfunc,"USRC_loadlb_obj":USRC_load_lb}
    USRC_stmt.close();
    USRC_conn.close();
    return USRC_result_obj;
  }
  /*-------------------------------------FUNCTION FOR FETCHING DATA FOR FLEX TABLE------------------------------------*/
  function USRC_func_flex(USRC_form_unit_searchnupdate)
  {
    var USRC_stamp_rowarray_val=[];var j=0;
    var USRC_conn =eilib.db_GetConnection();
    var USRC_unit_searchby = USRC_form_unit_searchnupdate.USRC_lb_selectoption_unit;
    var USRC_dutyamt_fromamt = USRC_form_unit_searchnupdate.USRC_tb_dutyamt_fromamt;
    var USRC_dutyamt_toamt = USRC_form_unit_searchnupdate.USRC_tb_dutyamt_toamt;
    var USRC_payment_frmamt = USRC_form_unit_searchnupdate.USRC_tb_payment_fromamt;
    var USRC_payment_toamt = USRC_form_unit_searchnupdate.USRC_tb_payment_toamt;
    var USRC_frmdate = USRC_form_unit_searchnupdate.USRC_db_frmdate;
    var USRC_enddate = USRC_form_unit_searchnupdate.USRC_db_todate;
    var USRC_all_searchby=USRC_form_unit_searchnupdate.USRC_lb_all_searchby;
    var USRC_accesscard = USRC_form_unit_searchnupdate.USRC_lb_inventory_cardno;
    if((USRC_frmdate!=undefined)&&(USRC_enddate!=undefined))
    {
      var USRC_frmdate = eilib.SqlDateFormat(USRC_frmdate);
      var USRC_enddate = eilib.SqlDateFormat(USRC_enddate);
    }
    var USRC_selectoption_unit = USRC_form_unit_searchnupdate.USRC_lb_selectoption_unit;
    var USRC_flex_arr =[];
    var USRC_flex_twodimens_arr=[];
    if((USRC_unit_searchby==2)||(USRC_unit_searchby==1)||(USRC_unit_searchby==9))
    { 
      if(USRC_unit_searchby==2)//SEARCH BY STAMP DUTY AMOUNT
      {
        var USRC_select_dutyamt_room_inventory ="SELECT U.UNIT_NO,U.UNIT_ID,URTD.URTD_ID,URTD.URTD_ROOM_TYPE,UASD.UASD_ID,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(UASD.UASD_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,UASD.UASD_COMMENTS,UASD.UASD_ACCESS_CARD,UASD.UASD_ACCESS_ACTIVE,UASD.UASD_ACCESS_INVENTORY,UASD.UASD_ACCESS_LOST, DATE_FORMAT(UASD.UASD_STAMPDUTYDATE,'%d-%m-%Y') AS UASD_STAMPDUTYDATE,UASD.UASD_STAMPDUTYAMT,USDT.USDT_DATA FROM UNIT_ACCESS_STAMP_DETAILS UASD LEFT JOIN UNIT_ROOM_TYPE_DETAILS URTD ON (UASD.URTD_ID = URTD.URTD_ID) LEFT JOIN UNIT_STAMP_DUTY_TYPE USDT ON (USDT.USDT_ID = UASD.USDT_ID),UNIT U,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=UASD.ULD_ID AND (U.UNIT_ID = UASD.UNIT_ID) AND (UASD.UASD_STAMPDUTYAMT  BETWEEN "+USRC_dutyamt_fromamt+" AND "+USRC_dutyamt_toamt+") ORDER BY U.UNIT_NO,UASD.UASD_STAMPDUTYAMT";
      }
      else if(USRC_unit_searchby==1){//SEARCH BY INVENTORY CARD
        var USRC_select_dutyamt_room_inventory ="SELECT U.UNIT_NO,U.UNIT_ID,URTD.URTD_ID,URTD.URTD_ROOM_TYPE,UASD.UASD_ID,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(UASD.UASD_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,UASD.UASD_COMMENTS,UASD.UASD_ACCESS_CARD,UASD.UASD_ACCESS_ACTIVE,UASD.UASD_ACCESS_INVENTORY,UASD.UASD_ACCESS_LOST,DATE_FORMAT(UASD.UASD_STAMPDUTYDATE,'%d-%m-%Y') AS UASD_STAMPDUTYDATE,UASD.UASD_STAMPDUTYAMT,USDT.USDT_DATA FROM UNIT_ACCESS_STAMP_DETAILS UASD LEFT JOIN UNIT_ROOM_TYPE_DETAILS URTD ON (UASD.URTD_ID = URTD.URTD_ID) LEFT JOIN UNIT_STAMP_DUTY_TYPE USDT ON (USDT.USDT_ID = UASD.USDT_ID),UNIT U ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=UASD.ULD_ID AND  (U.UNIT_ID = UASD.UNIT_ID) AND (UASD.UASD_ACCESS_CARD="+USRC_accesscard+")";
      }
      else if(USRC_unit_searchby==9){//SEARCH BY ROOMTYPE WITH UNIT
        var USRC_select_dutyamt_room_inventory = "SELECT U.UNIT_NO,U.UNIT_ID,URTD.URTD_ID,URTD.URTD_ROOM_TYPE,UASD.UASD_ID,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(UASD.UASD_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,UASD.UASD_COMMENTS,UASD.UASD_ACCESS_CARD,UASD.UASD_ACCESS_ACTIVE,UASD.UASD_ACCESS_INVENTORY,UASD.UASD_ACCESS_LOST,DATE_FORMAT(UASD.UASD_STAMPDUTYDATE,'%d-%m-%Y') AS UASD_STAMPDUTYDATE,UASD.UASD_STAMPDUTYAMT,USDT.USDT_DATA,USDT.USDT_ID FROM UNIT U,UNIT_ACCESS_STAMP_DETAILS UASD LEFT JOIN UNIT_ROOM_TYPE_DETAILS URTD  ON UASD.URTD_ID = URTD.URTD_ID  LEFT JOIN UNIT_STAMP_DUTY_TYPE USDT ON USDT.USDT_ID = UASD.USDT_ID ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=UASD.ULD_ID AND  U.UNIT_ID = UASD.UNIT_ID AND URTD.URTD_ROOM_TYPE ='"+USRC_all_searchby+"' ORDER BY U.UNIT_NO,URTD.URTD_ROOM_TYPE"
      }      
      var USRC_stmt = USRC_conn.createStatement();
      var USRC_flex_rs = USRC_stmt.executeQuery(USRC_select_dutyamt_room_inventory);
      while (USRC_flex_rs.next()) 
      {
        var USRC_flex_arr=[];
        USRC_flex_arr.push(USRC_flex_rs.getString("UASD_ID"));
        USRC_flex_arr.push(USRC_flex_rs.getString("UNIT_NO"));
        USRC_flex_arr.push(USRC_flex_rs.getString("UASD_ACCESS_CARD"));
        USRC_flex_arr.push(USRC_flex_rs.getString("UASD_ACCESS_ACTIVE"));
        USRC_flex_arr.push(USRC_flex_rs.getString("UASD_ACCESS_INVENTORY"));
        USRC_flex_arr.push(USRC_flex_rs.getString("UASD_ACCESS_LOST"));
        USRC_flex_arr.push(USRC_flex_rs.getString("URTD_ROOM_TYPE"));
        USRC_flex_arr.push(USRC_flex_rs.getString("UASD_STAMPDUTYDATE"));
        USRC_flex_arr.push(USRC_flex_rs.getString("USDT_DATA"));
        USRC_flex_arr.push(USRC_flex_rs.getString("UASD_STAMPDUTYAMT"));
        USRC_flex_arr.push(USRC_flex_rs.getString("UASD_COMMENTS"));
        USRC_flex_arr.push(USRC_flex_rs.getString("ULD_LOGINID"));
        USRC_flex_arr.push(USRC_flex_rs.getString("TIMESTAMP"));
        USRC_flex_twodimens_arr.push(USRC_flex_arr);
      }
      USRC_flex_rs.close();USRC_stmt.close();
    }
    else if((USRC_unit_searchby==3)||(USRC_unit_searchby==6)||(USRC_unit_searchby==4)||(USRC_unit_searchby==7))
    {   
      if(USRC_unit_searchby==3)//SEARCH BY ENDDATE
      {
        var USRC_select_unit_startenddate = "SELECT U.UNIT_NO,U.UNIT_ID, UAD.UACD_ACC_NO, UAD.UACD_ACC_NAME, UAD.UACD_BANK_CODE, UAD.UACD_BRANCH_CODE,UAD.UACD_BANK_ADDRESS,DATE_FORMAT(CONVERT_TZ(UD.UD_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP, ULD.ULD_LOGINID,UD.UD_NON_EI,DATE_FORMAT(UD.UD_START_DATE,'%d-%m-%Y') AS UD_START_DATE,DATE_FORMAT(UD.UD_END_DATE,'%d-%m-%Y') AS UD_END_DATE,UD.UD_OBSOLETE,UD.UD_PAYMENT, UD.UD_DEPOSIT,UD.UD_COMMENTS FROM UNIT U LEFT JOIN UNIT_ACCOUNT_DETAILS UAD ON (U.UNIT_ID = UAD.UNIT_ID) LEFT JOIN UNIT_DETAILS UD ON (U.UNIT_ID = UD.UNIT_ID),USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=UD.ULD_ID AND  UD.UD_END_DATE BETWEEN '"+USRC_frmdate+"' AND '"+USRC_enddate+"' ORDER BY U.UNIT_NO,UD.UD_END_DATE";
      }
      else if(USRC_unit_searchby==6){// SEARCH BY START DATE
        var USRC_select_unit_startenddate = "SELECT U.UNIT_NO,U.UNIT_ID, UAD.UACD_ACC_NO, UAD.UACD_ACC_NAME, UAD.UACD_BANK_CODE, UAD.UACD_BRANCH_CODE,UAD.UACD_BANK_ADDRESS,DATE_FORMAT(CONVERT_TZ(UD.UD_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP, ULD.ULD_LOGINID,UD.UD_NON_EI,DATE_FORMAT(UD.UD_START_DATE,'%d-%m-%Y') AS UD_START_DATE,DATE_FORMAT(UD.UD_END_DATE,'%d-%m-%Y') AS UD_END_DATE,UD.UD_OBSOLETE,UD.UD_PAYMENT, UD.UD_DEPOSIT,UD.UD_COMMENTS FROM UNIT U LEFT JOIN UNIT_ACCOUNT_DETAILS UAD ON (U.UNIT_ID = UAD.UNIT_ID) LEFT JOIN UNIT_DETAILS UD ON (U.UNIT_ID = UD.UNIT_ID) ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=UD.ULD_ID AND  UD.UD_START_DATE BETWEEN '"+USRC_frmdate+"' AND '"+USRC_enddate+"' ORDER BY U.UNIT_NO,UD.UD_START_DATE";
      }
      else if(USRC_unit_searchby==7){//SEARCH BY UNIT
        var USRC_stmt_unit_stampdetail = USRC_conn.createStatement();
        var USRC_select_unit_startenddate = "SELECT U.UNIT_NO,U.UNIT_ID, UAD.UACD_ACC_NO, UAD.UACD_ACC_NAME, UAD.UACD_BANK_CODE, UAD.UACD_BRANCH_CODE,UAD.UACD_BANK_ADDRESS,DATE_FORMAT(CONVERT_TZ(UD.UD_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP, ULD.ULD_LOGINID,UD.UD_NON_EI,DATE_FORMAT(UD.UD_START_DATE,'%d-%m-%Y') AS UD_START_DATE,DATE_FORMAT(UD.UD_END_DATE,'%d-%m-%Y') AS UD_END_DATE,UD.UD_OBSOLETE,UD.UD_PAYMENT, UD.UD_DEPOSIT,UD.UD_COMMENTS FROM UNIT U LEFT JOIN UNIT_ACCOUNT_DETAILS UAD ON (U.UNIT_ID = UAD.UNIT_ID) LEFT JOIN UNIT_DETAILS UD ON (U.UNIT_ID = UD.UNIT_ID) ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=UD.ULD_ID AND U.UNIT_NO ="+USRC_all_searchby+"" ;
        var USRC_select_unit_stampdetail="SELECT UASD.UASD_ACCESS_CARD,UASD.UASD_ACCESS_ACTIVE,UASD.UASD_ACCESS_INVENTORY,UASD.UASD_ACCESS_LOST,URTD.URTD_ROOM_TYPE,DATE_FORMAT(UASD.UASD_STAMPDUTYDATE,'%d-%m-%Y') AS UASD_STAMPDUTYDATE,UASD.UASD_STAMPDUTYAMT,USDT.USDT_DATA,UASD.UASD_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(UASD.UASD_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM  UNIT_ACCESS_STAMP_DETAILS UASD LEFT JOIN UNIT_ROOM_TYPE_DETAILS URTD ON (UASD.URTD_ID = URTD.URTD_ID) LEFT JOIN UNIT_STAMP_DUTY_TYPE USDT ON (USDT.USDT_ID = UASD.USDT_ID),UNIT U ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=UASD.ULD_ID AND (UASD.UNIT_ID = U.UNIT_ID) AND (U.UNIT_NO="+USRC_all_searchby+")";
        var USRC_rs_unit_stampdetail = USRC_stmt_unit_stampdetail.executeQuery(USRC_select_unit_stampdetail);
        while(USRC_rs_unit_stampdetail.next()){
          j=j+1;         
          for (var x=1; x<=11; x++){
            USRC_stamp_rowarray_val.push(USRC_rs_unit_stampdetail.getString(x))
          }}
        USRC_rs_unit_stampdetail.close();
        USRC_stmt_unit_stampdetail.close();
      }
      else if(USRC_unit_searchby==4){//SEARCH BY PAYMENT
        var USRC_select_unit_startenddate = "SELECT U.UNIT_NO,U.UNIT_ID, UAD.UACD_ACC_NO, UAD.UACD_ACC_NAME, UAD.UACD_BANK_CODE, UAD.UACD_BRANCH_CODE,UAD.UACD_BANK_ADDRESS,DATE_FORMAT(CONVERT_TZ(UD.UD_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP, ULD.ULD_LOGINID,UD.UD_NON_EI,DATE_FORMAT(UD.UD_START_DATE,'%d-%m-%Y') AS UD_START_DATE,DATE_FORMAT(UD.UD_END_DATE,'%d-%m-%Y') AS UD_END_DATE,UD.UD_OBSOLETE,UD.UD_PAYMENT, UD.UD_DEPOSIT,UD.UD_COMMENTS FROM UNIT U LEFT JOIN UNIT_ACCOUNT_DETAILS UAD ON (U.UNIT_ID = UAD.UNIT_ID) LEFT JOIN UNIT_DETAILS UD ON (U.UNIT_ID = UD.UNIT_ID) ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=UD.ULD_ID AND  UD.UD_PAYMENT BETWEEN "+USRC_payment_frmamt+" and "+USRC_payment_toamt+" ORDER BY U.UNIT_NO,UD.UD_PAYMENT";
      }
      var USRC_stmt_startend_unitno = USRC_conn.createStatement();
      var USRC_rs_startend_unitno = USRC_stmt_startend_unitno.executeQuery(USRC_select_unit_startenddate);
      while (USRC_rs_startend_unitno.next()) 
      {
        var USRC_flex_arr=[];
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("UNIT_ID"));
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("UNIT_NO"));
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("UD_START_DATE"));
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("UD_END_DATE"));
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("UD_OBSOLETE"));
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("UD_NON_EI"));
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("UD_PAYMENT"));
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("UD_DEPOSIT"));
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("UACD_ACC_NO"));
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("UACD_ACC_NAME"));
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("UACD_BANK_CODE"));
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("UACD_BRANCH_CODE"));
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("UACD_BANK_ADDRESS"));
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("UD_COMMENTS"));
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("ULD_LOGINID")); 
        USRC_flex_arr.push(USRC_rs_startend_unitno.getString("TIMESTAMP"));
        USRC_flex_twodimens_arr.push(USRC_flex_arr);
      } 
      USRC_rs_startend_unitno.close();USRC_stmt_startend_unitno.close();
    }
    else if(USRC_unit_searchby==8)//SEARCH BY STAMP TYPE
    {          
      var USRC_select_stamptype = "SELECT USDT.USDT_ID,USDT.USDT_DATA,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(USDT.USDT_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM UNIT_STAMP_DUTY_TYPE USDT,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=USDT.ULD_ID ORDER BY USDT.USDT_DATA ASC"; 
      var USRC_stmt_stamptype = USRC_conn.createStatement();
      var USRC_rs_stamptype = USRC_stmt_stamptype.executeQuery(USRC_select_stamptype);
      while(USRC_rs_stamptype.next()) 
      {
        var USRC_flex_arr=[];
        var USRC_stamp_id =USRC_rs_stamptype.getString("USDT_ID");
        var USRC_stamp_type =USRC_rs_stamptype.getString("USDT_DATA");
        var USRC_userstamp_stamp = USRC_rs_stamptype.getString("ULD_LOGINID");
        var USRC_timestamp_stamp  =  USRC_rs_stamptype.getString("TIMESTAMP");
        USRC_flex_arr.push(USRC_stamp_id);
        USRC_flex_arr.push(USRC_stamp_type);
        USRC_flex_arr.push(USRC_userstamp_stamp);
        USRC_flex_arr.push(USRC_timestamp_stamp); 
        USRC_flex_twodimens_arr.push(USRC_flex_arr);
      }  
      USRC_rs_stamptype.close();USRC_stmt_stamptype.close();
    }
    else if(USRC_unit_searchby==5)//SEARCH BY ROOM TYPE
    {
      var USRC_select_roomtype = "SELECT URTD.URTD_ID,URTD.URTD_ROOM_TYPE,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(URTD.URTD_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM UNIT_ROOM_TYPE_DETAILS URTD,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=URTD.ULD_ID ORDER BY URTD.URTD_ROOM_TYPE ASC"; 
      var USRC_stmt_roomtype = USRC_conn.createStatement();
      var USRC_rs_roomtype = USRC_stmt_roomtype.executeQuery(USRC_select_roomtype);
      while(USRC_rs_roomtype.next()) 
      {
        var USRC_flex_arr=[];
        USRC_flex_arr.push(USRC_rs_roomtype.getString("URTD_ID"));
        USRC_flex_arr.push(USRC_rs_roomtype.getString("URTD_ROOM_TYPE"));
        USRC_flex_arr.push(USRC_rs_roomtype.getString("ULD_LOGINID"));
        USRC_flex_arr.push(USRC_rs_roomtype.getString("TIMESTAMP")); 
        USRC_flex_twodimens_arr.push(USRC_flex_arr);
      }
      USRC_rs_roomtype.close();USRC_stmt_roomtype.close();
    } 
    var USRC_flex_result ={"USRC_flag":USRC_unit_searchby,"USRC_flex_values":USRC_flex_twodimens_arr,"USRC_parentfunc_obj":USRC_form_unit_searchnupdate.USRC_parent_updation,"USRC_obj_stamp_rowarray_val":[USRC_stamp_rowarray_val,j]}
    USRC_conn.close();
    return USRC_flex_result;
  }
  /*----------------------------------FUNCTION FOR ALREADY EXISTS FOR ROOMTYPE,STAMPTYPE,ACCESS CARD,UNIT NO,ACTIVE CUSTOMER-------------------------------------*/
  function USRC_Data_AlreadyExists(USRC_inventory_unitno,USRC_typeofcard,USRC_flag_card_unitno,USRC_parent_func)
  {
    var USRC_conn =eilib.db_GetConnection();
    var USRC_cardarray =[];
    var USRC_loadunitno=[];
    var USRC_flag_unitno=false;var USRC_arr_custexpense=[];
    var USRC_stmt_cardno = USRC_conn.createStatement();
    if((USRC_flag_card_unitno==5)||(USRC_flag_card_unitno==8)||(USRC_flag_card_unitno=='USRC_flag_check_accesscard')){
      if(USRC_flag_card_unitno==5) //SEARCH BY ROOM TYPE
        USRC_flag_unitno=eilib.Check_ExistsRmType(USRC_conn,USRC_inventory_unitno)
        else if(USRC_flag_card_unitno==8)//SEARCH BY STAMP TYPE
          USRC_flag_unitno=eilib.Check_ExistsStampduty(USRC_conn,USRC_inventory_unitno)
          else if(USRC_flag_card_unitno=='USRC_flag_check_accesscard')
            USRC_flag_unitno=eilib.Check_ExistsCard(USRC_conn,USRC_inventory_unitno)}
    else{
      if(USRC_flag_card_unitno=='USRC_flag_check_unitno'){
        var USRC_cardunitno_query="SELECT * FROM UNIT WHERE UNIT_NO="+USRC_inventory_unitno+"";     
      }
      else if(USRC_flag_card_unitno=='USRC_flag_check_cardunitno'){
        var USRC_twodim_card={10:['UASD.UASD_ACCESS_ACTIVE'],11:['UASD.UASD_ACCESS_LOST'],12:['UASD.UASD_ACCESS_INVENTORY']}
        var USRC_cardunitno_query = "SELECT DISTINCT UASD.UASD_ACCESS_CARD FROM UNIT_ACCESS_STAMP_DETAILS UASD, UNIT U, UNIT_DETAILS UD WHERE (U.UNIT_ID = UD.UNIT_ID) AND (U.UNIT_ID = UASD.UNIT_ID) AND "+USRC_twodim_card[USRC_typeofcard][0]+" ='X' AND U.UNIT_ID = (SELECT UNIT_ID FROM UNIT WHERE UNIT_NO ="+USRC_inventory_unitno+") ORDER BY UASD.UASD_ACCESS_CARD ASC"
      }
      else if(USRC_flag_card_unitno=='USRC_transac_check_accesscard'){
        var USRC_cardunitno_query="SELECT UASD_ACCESS_CARD FROM UNIT_ACCESS_STAMP_DETAILS WHERE UASD_ID IN (SELECT UASD_ID FROM CUSTOMER_ACCESS_CARD_DETAILS WHERE UASD_ID=(SELECT UASD_ID FROM UNIT_ACCESS_STAMP_DETAILS WHERE UASD_ACCESS_CARD='"+USRC_inventory_unitno+"'))OR UASD_ID IN (SELECT UASD_ID FROM CUSTOMER_LP_DETAILS WHERE UASD_ID=(SELECT UASD_ID FROM UNIT_ACCESS_STAMP_DETAILS WHERE UASD_ACCESS_CARD='"+USRC_inventory_unitno+"'))OR UASD_ACCESS_CARD IN (SELECT EPNC_NUMBER FROM EXPENSE_PURCHASE_NEW_CARD WHERE EPNC_NUMBER='"+USRC_inventory_unitno+"')OR UASD_ID IN (SELECT UASD_ID FROM EMPLOYEE_CARD_DETAILS WHERE UASD_ID=(SELECT UASD_ID FROM UNIT_ACCESS_STAMP_DETAILS WHERE UASD_ACCESS_CARD='"+USRC_inventory_unitno+"'))";
      }
      else if(USRC_flag_card_unitno=='USRC_transac_check_roomtype'){
        var USRC_cardunitno_query="SELECT * FROM CUSTOMER_ENTRY_DETAILS WHERE UASD_ID IN (SELECT UASD_ID FROM UNIT_ACCESS_STAMP_DETAILS WHERE UASD_ACCESS_CARD='"+USRC_inventory_unitno+"')"
      }
      else if((USRC_flag_card_unitno=='USRC_flag_transac_check_enddate')||(USRC_flag_card_unitno=='USRC_flag_transac_check_unitno')){
        if(USRC_flag_card_unitno=='USRC_flag_transac_check_unitno')
          USRC_loadunitno=USRC_errormsg_data_unitno().USRC_obj_unitno;
        var USRC_enddate_query="CALL SP_UNIT_CHECK_TRANSACTION((SELECT UNIT_ID FROM UNIT WHERE UNIT_NO="+USRC_inventory_unitno+"),'"+UserStamp+"',@SDATE,@EDATE,@TEMPTABLE)";
        USRC_stmt_cardno.execute(USRC_enddate_query);
        USRC_stmt_cardno.close();
        var USRC_stmt_cardno = USRC_conn.createStatement();
        var USRC_cardunitno_query="SELECT @SDATE,@EDATE,@TEMPTABLE";
      }
      var USRC_card_rs = USRC_stmt_cardno.executeQuery(USRC_cardunitno_query);
      while(USRC_card_rs.next())
      { var USRC_flag_unitno=true;
       USRC_cardarray.push(USRC_card_rs.getString(1));
       if(USRC_flag_card_unitno=='USRC_flag_transac_check_unitno'){
         USRC_arr_custexpense.push(USRC_card_rs.getString(1))
         USRC_arr_custexpense.push(USRC_card_rs.getString(2)); 
         var USRC_stmt_temptble = USRC_conn.createStatement();
         USRC_stmt_temptble.execute("DROP TABLE "+USRC_card_rs.getString(3)+"");
         USRC_stmt_temptble.close();
       }}
      USRC_card_rs.close();USRC_stmt_cardno.close();
    }
    var USRC_flag_results={"USRC_obj_loadunitno":USRC_loadunitno,"USRC_flag_check":USRC_flag_card_unitno,"USRC_loaddata_searchby":USRC_cardarray,"USRC_truefalse_flag":USRC_flag_unitno,"USRC_loadlb_obj":'USRC_loadlb_inventory',"USRC_parentfunc_obj":USRC_parent_func,"USRC_objarr_custexpense":USRC_arr_custexpense}
    return USRC_flag_results;
    USRC_conn.close();
  }
  /*-------------------------------------FUNCTION TO FETCH UNIQUE ROOM TYPE OR STAMP TYPE FOR GIVEN UNIT NO------------------------------------*/
  function USRC_roomstamp_unitno(USRC_unitno){
    var USRC_conn =eilib.db_GetConnection();
    var USRC_stmt_room = USRC_conn.createStatement();
    var USRC_TB_roombox=[];
    var USRC_TB_stampbox=[];
    var USRC_select_query_room_type = "SELECT * FROM UNIT_ROOM_TYPE_DETAILS WHERE URTD_ROOM_TYPE IS NOT NULL AND URTD_ID NOT IN(SELECT distinct URTD_ID FROM UNIT_ACCESS_STAMP_DETAILS WHERE UNIT_ID=(SELECT UNIT_ID FROM UNIT WHERE UNIT_NO="+USRC_unitno+") AND URTD_ID IS NOT NULL) ORDER BY URTD_ROOM_TYPE ASC";  
    var USRC_roomtype_rs = USRC_stmt_room.executeQuery(USRC_select_query_room_type);
    while(USRC_roomtype_rs.next())
    {
      USRC_TB_roombox.push(USRC_roomtype_rs.getString("URTD_ROOM_TYPE"));
    }
    USRC_roomtype_rs.close();USRC_stmt_room.close();
    var USRC_stmt_stamp = USRC_conn.createStatement();
    var USRC_select_query_stamp_type="SELECT USDT_DATA FROM UNIT_STAMP_DUTY_TYPE WHERE USDT_DATA IS NOT NULL AND USDT_ID NOT IN(SELECT distinct USDT_ID FROM UNIT_ACCESS_STAMP_DETAILS WHERE UNIT_ID=(SELECT UNIT_ID FROM UNIT WHERE UNIT_NO="+USRC_unitno+") AND USDT_ID IS NOT NULL) ORDER BY USDT_DATA ASC";  
    var USRC_stamptype_rs = USRC_stmt_stamp.executeQuery(USRC_select_query_stamp_type);
    while(USRC_stamptype_rs.next())
    {
      USRC_TB_stampbox.push(USRC_stamptype_rs.getString("USDT_DATA"));
    }
    USRC_stamptype_rs.close();USRC_stmt_stamp.close();
    var USRC_result_stamproom_obj={"USRC_roomtype":USRC_TB_roombox,"USRC_stamptype":USRC_TB_stampbox}
    return USRC_result_stamproom_obj;
  }
  /*-----------------------------------FUNCTION FOR UPDATION-----------------------------------------*/
  function USRC_func_update(USRC_form_values,USRC_obj_rowvalue,USRC_obj_flex)
  {
    var USRC_conn =eilib.db_GetConnection();
    var USRC_upd_selectoption_unit=  USRC_form_values.USRC_lb_selectoption_unit;
    var USRC_upd_unitid_stampid = USRC_form_values.USRC_radio_flex;
    var USRC_upd_startdate_update = USRC_form_values.USRC_db_startdate_update;
    var USRC_upd_unitno = USRC_form_values.USRC_tb_unitno;
    var USRC_upd_enddate_update = USRC_form_values.USRC_db_enddate_update;
    if((USRC_upd_startdate_update!=undefined)||(USRC_upd_enddate_update!=undefined))
    {
      var USRC_upd_startdate_update = eilib.SqlDateFormat(USRC_upd_startdate_update)
      var USRC_upd_enddate_update = eilib.SqlDateFormat(USRC_upd_enddate_update)
      }
    var USRC_upd_unitdeposit = USRC_form_values.USRC_tb_unitdeposit;
    var USRC_upd_obsolete = USRC_form_values.USRC_hidden_obsolete;
    if(USRC_upd_obsolete=='')
      USRC_upd_obsolete=null;
    else
      USRC_upd_obsolete="'X'";
    if(USRC_upd_unitdeposit=='')
      USRC_upd_unitdeposit=null;  
    var USRC_upd_unitpayment = USRC_form_values.USRC_tb_unitreltal;
    var USRC_upd_accnoid = USRC_form_values.USRC_tb_accnoid;
    var USRC_upd_accname = USRC_form_values.USRC_tb_accname;
    var USRC_upd_bankcodeid = USRC_form_values.USRC_tb_bankcodeid;
    var USRC_upd_branchcode = USRC_form_values.USRC_tb_branchcode;
    var USRC_upd_nonei = USRC_form_values.USRC_cb_nonei;
    var USRC_upd_bankaddr = USRC_form_values.USRC_tb_bankaddr;
    var USRC_upd_comments = USRC_form_values.USRC_ta_comments;
    var USRC_upd_roomtype = USRC_form_values.USRC_tb_sep_roomtype;
    var USRC_update_stamptype = USRC_form_values.USRC_tb_sep_stamptype;
    var USRC_upd_lb_stamptype = USRC_form_values.USRC_lb_stamptype;
    var USRC_upd_access = USRC_form_values.USRC_tb_access;
    var USRC_upd_access_comments = USRC_form_values.USRC_ta_accesscomment;
    if((USRC_upd_nonei!='')&&(USRC_upd_nonei!=undefined)){
      var USRC_upd_nonei_event='X';
      USRC_upd_nonei="'X'"}
    else {USRC_upd_nonei = null
    var USRC_upd_nonei_event=null;}   
    var USRC_upd_accunitno = USRC_form_values.USRC_tb_accunitno;
    var USRC_stmt_upd= USRC_conn.createStatement();   
    var USRC_rowval_flex=USRC_form_values.USRC_hidden_flexrowval;
    var USRC_sep_upd_roomtype = USRC_form_values.USRC_tb_sep_roomtype;
    var USRC_sep_update_stamptype = USRC_form_values.USRC_tb_sep_stamptype;
    var USRC_upd_lost = USRC_form_values.USRC_cb_lost;
    var USRC_upd_inventory = USRC_form_values.USRC_cb_inventory;
    var USRC_conn =eilib.db_GetConnection();  
    if((USRC_upd_selectoption_unit==3)||(USRC_upd_selectoption_unit==4)||(USRC_upd_selectoption_unit==6)||(USRC_upd_selectoption_unit==7))
    {  
      /*------------------------------------UPDATION FOR SEARCH BY END DATE,PAYMENT,START DATE & UNIT-----------------------*/  
      if(USRC_upd_accname!='')
        USRC_upd_accname=eilib.ConvertSpclCharString(USRC_upd_accname);
      if(USRC_upd_bankaddr!='')
        USRC_upd_bankaddr=eilib.ConvertSpclCharString(USRC_upd_bankaddr);
      if(USRC_upd_comments!='')
        USRC_upd_comments=eilib.ConvertSpclCharString(USRC_upd_comments);
      var USRC_upd_sp ="CALL SP_UNIT_UPDATE("+USRC_upd_unitid_stampid+","+USRC_upd_unitno+",'"+USRC_upd_startdate_update+"','"+USRC_upd_enddate_update+"',"+USRC_upd_unitpayment+","+USRC_upd_unitdeposit+","+USRC_upd_obsolete+","+USRC_upd_nonei+",'"+USRC_upd_comments+"','"+USRC_upd_accnoid+"','"+USRC_upd_accname+"','"+USRC_upd_bankcodeid+"','"+USRC_upd_branchcode+"','"+USRC_upd_bankaddr+"','"+UserStamp+"',@FLAG_UPDATE)";
      USRC_stmt_upd.execute(USRC_upd_sp);
    }      
    else if((USRC_upd_selectoption_unit==2)||(USRC_upd_selectoption_unit==1)||(USRC_upd_selectoption_unit==9))
    {
      /*--------------------------------UPDATION SEARCH BY STAMP DUTY AMT,INVENTORY CARD NO,ROOM TYPE WITH UNIT--------------------------*/
      if((USRC_upd_lb_stamptype=='SELECT')||(USRC_upd_lb_stamptype==undefined))
      var USRC_upd_lb_stamptype='';
      var USRC_update_lb_roomtype = USRC_form_values.USRC_lb_roomtype;
      if((USRC_update_lb_roomtype=='SELECT')||(USRC_update_lb_roomtype==undefined))
      var USRC_update_lb_roomtype='';
      var USRC_upd_tb_stampamt = USRC_form_values.USRC_tb_stampamt;
      var USRC_update_lb_stampdate = USRC_form_values.USRC_db_stampdate;
      if((USRC_update_lb_stampdate=="")||(USRC_update_lb_stampdate==undefined)){
        var USRC_upd_stampdate=null;  
        var USRC_tickler_newval_stampdate='';  }
      else
      { 
        var USRC_tickler_newval_stampdate = eilib.SqlDateFormat(USRC_update_lb_stampdate)
        USRC_upd_stampdate="'"+USRC_tickler_newval_stampdate+"'";
      }
      if(USRC_upd_access=='')
        USRC_upd_access=null;
      if(USRC_upd_tb_stampamt==''){
        USRC_upd_tb_stampamt=null;
        var USRC_upd_tickler_stampamt='';}
      else
        USRC_upd_tickler_stampamt=USRC_upd_tb_stampamt;
      if((USRC_upd_lost!='')&&(USRC_upd_lost!=undefined)){
        USRC_upd_lost="'X'"}
      else {USRC_upd_lost = null}
      if((USRC_upd_inventory!='')&&(USRC_upd_inventory!=undefined)){
        USRC_upd_inventory="'X'"}
      else {USRC_upd_inventory = null}
      if((USRC_obj_rowvalue.USRC_tr_second!=USRC_upd_access)&&(USRC_upd_access!='')){
        var USRC_sep_upd_flag_access=USRC_Data_AlreadyExists(USRC_upd_access,'','USRC_flag_check_accesscard','USRC_upd_flag_accesscard')
        if(USRC_sep_upd_flag_access.USRC_truefalse_flag==true)
          return {"USRC_parentfunc_obj":USRC_sep_upd_flag_access.USRC_truefalse_flag}}
      if((USRC_upd_access_comments!='')&&(USRC_upd_access_comments!=null))
      USRC_upd_access_comments=eilib.ConvertSpclCharString(USRC_upd_access_comments);
      if(USRC_upd_selectoption_unit==1)
        var USRC_upd_typeofcard = USRC_form_values.USRC_typeofCard;
      var USRC_upd_sp ="CALL SP_UNIT_STAMP_DETAILS_UPDATE("+USRC_upd_accunitno+","+USRC_upd_unitid_stampid+","+USRC_upd_access+",'"+USRC_update_lb_roomtype+"',"+USRC_upd_stampdate+",'"+USRC_upd_lb_stamptype+"',"+USRC_upd_tb_stampamt+",'"+USRC_upd_access_comments+"','"+UserStamp+"',"+USRC_upd_lost+","+USRC_upd_inventory+",@FLAG_UPDATE)";
      USRC_stmt_upd.execute(USRC_upd_sp);
    }
    else if(USRC_upd_selectoption_unit==5){// UPDATION FOR ROOM TYPE
      USRC_sep_upd_roomtype=eilib.ConvertSpclCharString(USRC_sep_upd_roomtype);
      var USRC_upd_sp ="CALL SP_UNIT_ROOM_TYPE_UPDATE("+USRC_upd_unitid_stampid+",'"+USRC_sep_upd_roomtype+"','"+UserStamp+"',@FLAG_UPDATE)";
      USRC_stmt_upd.execute(USRC_upd_sp);
    }
    else if(USRC_upd_selectoption_unit==8)//UPDATION FOR STAMP TYPE
    {    
      USRC_sep_update_stamptype=eilib.ConvertSpclCharString(USRC_sep_update_stamptype);    
      var USRC_upd_sp ="CALL SP_UNIT_STAMP_DUTY_TYPE_UPDATE("+USRC_upd_unitid_stampid+",'"+USRC_sep_update_stamptype+"','"+UserStamp+"',@FLAG_UPDATE)"; 
      USRC_stmt_upd.execute(USRC_upd_sp);
    }
    var USRC_stmt_flag = USRC_conn.createStatement();
    var USRC_flag_rs=USRC_stmt_flag.executeQuery("SELECT @FLAG_UPDATE");
    while(USRC_flag_rs.next())
      var USRC_flag_flag_update= USRC_flag_rs.getString("@FLAG_UPDATE")
      USRC_flag_rs.close();USRC_stmt_flag.close();
    if(USRC_flag_flag_update==0)
      return {"USRC_parentfunc_obj":0}
      USRC_stmt_upd.close();  
    if((USRC_upd_selectoption_unit==3)||(USRC_upd_selectoption_unit==4)||(USRC_upd_selectoption_unit==6)||(USRC_upd_selectoption_unit==7)){
      var USRC_calenderIDcode=eilib.CUST_getCalenderId(USRC_conn);
      var  USRC_sh_arr= eilib.getStarHubUnitCalTime(USRC_conn);
      var USRC_oldvalues_sdate = eilib.SqlDateFormat(USRC_obj_rowvalue.USRC_tr_second)
      var USRC_oldvalues_edate = eilib.SqlDateFormat(USRC_obj_rowvalue.USRC_tr_third)
      eilib. StarHubUnit_DeleteCalEvent(USRC_upd_unitno,USRC_calenderIDcode,USRC_oldvalues_sdate,USRC_sh_arr[0],USRC_sh_arr[1],USRC_oldvalues_edate,USRC_sh_arr[0],USRC_sh_arr[1],'UNIT')
      eilib. StarHubUnit_CreateCalEvent(USRC_calenderIDcode,USRC_upd_startdate_update,USRC_sh_arr[0],USRC_sh_arr[1],USRC_upd_enddate_update,USRC_sh_arr[0],USRC_sh_arr[1],'',USRC_upd_unitno,'','START DATE','END DATE',USRC_upd_nonei_event,USRC_upd_unitpayment)
    }
    ///*-------------------------------------REFRESH DATA AFTER UPDATION--------------------------------------------------------------*/    
    if(((USRC_upd_selectoption_unit==1)&&(USRC_obj_rowvalue.USRC_tr_second!=USRC_upd_access))||((USRC_upd_selectoption_unit==1)&&(USRC_obj_rowvalue.USRC_tr_second==USRC_upd_access)&&(USRC_obj_rowvalue.USRC_tr_four!=USRC_form_values.USRC_cb_inventory))||((USRC_upd_selectoption_unit==1)&&(USRC_obj_rowvalue.USRC_tr_second==USRC_upd_access)&&(USRC_obj_rowvalue.USRC_tr_five!=USRC_form_values.USRC_cb_lost))||((USRC_upd_selectoption_unit==7)&&(USRC_obj_rowvalue.USRC_tr_first!=USRC_upd_unitno))){
      if(USRC_upd_selectoption_unit==1)
        var USRC_refresh= USRC_Data_AlreadyExists(USRC_obj_rowvalue.USRC_tr_first,USRC_upd_typeofcard,'USRC_flag_check_cardunitno','USRC_parent_updation')
        else   
          var USRC_refresh= USRC_func_load_searchby_option(USRC_upd_selectoption_unit,'USRC_parent_updation','USRC_load_lb');}
    else
      var USRC_refresh= USRC_func_flex(USRC_obj_flex);
    if((USRC_upd_selectoption_unit==9)&&(USRC_obj_rowvalue.USRC_tr_six!=USRC_update_lb_roomtype)&&(USRC_refresh.USRC_flex_values.length==0))
    var USRC_refresh= USRC_func_load_searchby_option(USRC_upd_selectoption_unit,'USRC_parent_updation','USRC_load_lb');
    if((USRC_upd_selectoption_unit==1)&&(USRC_refresh.USRC_flex_values!=undefined)&&(USRC_refresh.USRC_flex_values.length==0))
    var USRC_refresh= USRC_Data_AlreadyExists(USRC_obj_rowvalue.USRC_tr_first,'USRC_flag_check_cardunitno','USRC_parent_updation');
    return USRC_refresh;
    USRC_conn.close();
  }
}
catch(err) 
{
}  
//*******************************************FILE DESCRIPTION*********************************************//
//*******************************************EMPLOYEE DETAIL:SEARCH/UPDATE/DELETE*************************//
//DONE BY:PUNI
//VER 1.4-SD:09/10/2014 ED:09/10/2014,TRACKER NO:705:1.added script to hide preloader after menu n form loads,2.changed preloader n msgbox position
//VER 1.3-SD:29/09/2014 ED:30/09/2014,TRACKER NO:705,1.corrected flex table to show radio button once for each employee,2.corrected btn validation when no card n show err msg,3.corrected close of undefined issue when clicking search button to show update form
//DONE BY:SARADAMBAL
//VER 1.2-SD:23/08/2014 ED:23/08/2014,TRACKER NO:705,updated new links,autogrow,put preloader for reloading updated n deleted one,filter active unit in treeview query
//DONE BY:LALITHA
//VER 1.1-SD:04/08/2014 ED:05/08/2014,TRACKER NO:705,updated script to show error msg if active card is assigned returned from sp,Passed varchar for mobile no,Updated err msg(recrd nt updated),Tested sp wth auto cmmt
//VER 1.0 SD:16/06/2014 ED:17/06/2014,TRACKER NO:705,Changed return function,Changed failure funct,Changed the email id to lowercase for only valid email id ,Hide the flex tble thn nly shown err msg for update nd delete,After updating the(comments,emailid,mobileno)call the auto complete funct,(Increased the flex tble width for more datas,Starting itself hide the search,delete btns(seen tht issue in int site nly))
//VER 0.09 SD:07/06/2014 ED:07/06/2014,Changed jquery link,Updated maxlength for(cust frst,last name,emailid),After reset btn clicked hide the card details nd resized the(cust last,frst name,email id),Updated parseInt for mobile number,Increased flex tble width
//VER 0.08 SD:17/05/2014 ED:22/05/2014,Implemented dynamic sp,Implemented eilib special charater for comments,Removed the mandatory symbol for select the card,Hide the card details aftr shown the flex tble,Asc the emp lst bx,Changed msg box title,Removed the underscore for emp name,Put space in b/w emp frst nd last name,Update the emp name means hide the flex tble nd refresh the emp lst box nd hide the no data err msg,update the othr fields means refresh the flex tble,delete the record means hide the no data err msg nd refresh the list box
//VER 0.07 SD:16/04/2014 ED:23/04/2014,Removed the tickler updation for(UPDATION ND DELETION)in manually written coding,userstamp getting from eilib functn,the check transaction sp in script side,the entry word in title,div tag in title,flag passed in updation part,tree view validation,Added cleaner employ name in employee listbox nd distinct the name,Removed(search by)word from err msg shown in search option,Fixed width for flex table,Hide the card details while chosen cleaner desig nd select option,Chngd aftr clicked the auto complt search bttn shown the flx tbl datas,Hide the invalid class nd err msg of(mobileno,email)aftr reset,Removed(no card available)err msg,Changed validation,Aftr file dscrptn put title,Updated(numbersonly)nd changed(alphabets)replaced in success func tool tip nd record can't be deleted while transaction time err msg shown,Put comments for all functions,Checked wth data aftr SP changed(added tickler part in updtn),Implemnted KeyPress function for autocomplete of(commnts,email,mobile)
//DONE BY:SARADAMBAL M
//VER 0.06 SD:11/02/2014 ED:12/02/2014 TRACKER NO:705//IMPLEMENTED SP FOR TRANSACTION,REPLACE USERSTAMP INTO ULD_LOGIN ID IN ALL SELECT QUERY,
//DONE BY:ELANGO
//VER 0.05 SD:27/02/2014 ED:27/02/2014 TRACKER NO:147//REPLACE USERSTAMP INTO ULD_ID IN SP USING EILIB FUNCTION
//VER 0.04 SD:26/01/2014 ED:28/01/2014 TRACKER NO:147//REDUCE THE CODING AND SCRIPT AND CHECK THE VALIDATION AND TICKLERATION PART. 
//VER 0.03 SD:31/12/2013 ED:31/12/2013TRACKER NO:147//CHANGE THE HEADING TAG AND EILIB CONNECTION
//VER 0.02 SD:21/12/2013 ED:23/12/2013,TRACKER NO:147//CHANGES LOADING OF CARD IN THE FORM AS PER THE CARD ACCESS MODEL.
//VER 0.01-INITIAL VERSION, SD:04/12/2013 ED:18/12/2013,TRACKER NO:147
//*********************************************************************************************************//
try
{
  //FUNCTION TO GET SEARCH OPTION 
  function EMPSRC_UPD_DEL_searchoption()
  {
    var EMPSRC_UPD_DEL_connection =eilib.db_GetConnection();
    var EMPSRC_UPD_DEL_select_searchoptions="SELECT * FROM EXPENSE_CONFIGURATION  WHERE  ECN_ID IN (90,94,95,96,99) OR CGN_ID=35 ORDER BY ECN_ID ASC";
    var EMPSRC_UPD_DEL_expconfigmsg_stmt = EMPSRC_UPD_DEL_connection.createStatement();
    var EMPSRC_UPD_DEL_searchoption_rs = EMPSRC_UPD_DEL_expconfigmsg_stmt.executeQuery(EMPSRC_UPD_DEL_select_searchoptions);
    var EMPSRC_UPD_DEL_searchoptions_dataid=[];
    while(EMPSRC_UPD_DEL_searchoption_rs.next())
    {
      var EMPSRC_UPD_DEL_searchoptions_id = EMPSRC_UPD_DEL_searchoption_rs.getString(1);
      var EMPSRC_UPD_DEL_searchoptions_data = EMPSRC_UPD_DEL_searchoption_rs.getString(3);
      var EMPSRC_UPD_DEL_searchoptions_object={"EMPSRC_UPD_DEL_searchoption_id":EMPSRC_UPD_DEL_searchoptions_id,"EMPSRC_UPD_DEL_searchoption_data":EMPSRC_UPD_DEL_searchoptions_data};
      EMPSRC_UPD_DEL_searchoptions_dataid.push(EMPSRC_UPD_DEL_searchoptions_object);
    }
    EMPSRC_UPD_DEL_searchoption_rs.close();
    var EMPSRC_UPD_DEL_employeename_array =[];
    var EMPSRC_UPD_DEL_select_employee_name="SELECT DISTINCT EMP_FIRST_NAME,EMP_LAST_NAME FROM EMPLOYEE_DETAILS WHERE ECN_ID=74 OR ECN_ID=75 ORDER BY EMP_FIRST_NAME,EMP_LAST_NAME ASC";
    var EMPSRC_UPD_DEL_employee_name_rs = EMPSRC_UPD_DEL_expconfigmsg_stmt.executeQuery(EMPSRC_UPD_DEL_select_employee_name);
    while(EMPSRC_UPD_DEL_employee_name_rs.next())
    {
      EMPSRC_UPD_DEL_employeename_array.push( EMPSRC_UPD_DEL_employee_name_rs.getString("EMP_FIRST_NAME")+'_'+EMPSRC_UPD_DEL_employee_name_rs.getString("EMP_LAST_NAME"));
    }
    EMPSRC_UPD_DEL_employee_name_rs.close();
    var EMPSRC_UPD_DEL_flexheader_array =[];
    var EMPSRC_UPD_errmsgids="1,2,34,71,135,136,153,155,157,158,163,164,165,166,167,168,169,248,315,339,401,446";
    var EMPSRC_UPD_DEL_flexheader_array=[];
    EMPSRC_UPD_DEL_flexheader_array=eilib.GetErrorMessageList(EMPSRC_UPD_DEL_connection,EMPSRC_UPD_errmsgids);
    var EMPSRC_UPD_DEL_unitArray = [];
    var EMPSRC_UPD_DEL_unitquery = "SELECT * FROM UNIT";
    var EMPSRC_UPD_DEL_unitres = EMPSRC_UPD_DEL_expconfigmsg_stmt.executeQuery(EMPSRC_UPD_DEL_unitquery);
    while(EMPSRC_UPD_DEL_unitres.next())
    {
      var EMPSRC_UPD_DEL_unitresdate = EMPSRC_UPD_DEL_unitres.getString("UNIT_ID");
      EMPSRC_UPD_DEL_unitArray.push(EMPSRC_UPD_DEL_unitresdate);
    }  
    var EMPSRC_UPD_DEL_employeedetailArray = [];
    var EMPSRC_UPD_DEL_employeedetailquery = "SELECT * FROM EMPLOYEE_DETAILS";
    var EMPSRC_UPD_DEL_employeedetailres = EMPSRC_UPD_DEL_expconfigmsg_stmt.executeQuery(EMPSRC_UPD_DEL_employeedetailquery);
    while(EMPSRC_UPD_DEL_employeedetailres.next())
    {
      var EMPSRC_UPD_DEL_employeedetailresdate = EMPSRC_UPD_DEL_employeedetailres.getString("EMP_ID");
      EMPSRC_UPD_DEL_employeedetailArray.push(EMPSRC_UPD_DEL_employeedetailresdate);
    }  
    var EMPSRC_UPD_DEL_result={"EMPSRC_UPD_DEL_employeedetailArray":EMPSRC_UPD_DEL_employeedetailArray,"EMPSRC_UPD_DEL_unitArray":EMPSRC_UPD_DEL_unitArray,"EMPSRC_UPD_DEL_flexheader_array":EMPSRC_UPD_DEL_flexheader_array.errormsg,"EMPSRC_UPD_DEL_searchoption":EMPSRC_UPD_DEL_searchoptions_dataid,"EMPSRC_UPD_DEL_employeename":EMPSRC_UPD_DEL_employeename_array};  
    EMPSRC_UPD_DEL_expconfigmsg_stmt.close();
    EMPSRC_UPD_DEL_connection.close();
    return EMPSRC_UPD_DEL_result
  }
  //FUNCTION FOR AUTOCOMPLETE FOR COMMENTS,EMAIL,MOBILENO
  function EMPSRC_UPD_DEL_autocomplts_autocomplete(EMPSRC_UPD_DEL_expense_searchoptions)
  {
    var EMPSRC_UPD_DEL_conn = eilib.db_GetConnection();
    var EMPSRC_UPD_DEL_stmt=EMPSRC_UPD_DEL_conn.createStatement();
    var EMPSRC_UPD_DEL_dataArray=[];
    var EMPSRC_UPD_DEL_query=[];
    EMPSRC_UPD_DEL_query[94]="SELECT DISTINCT EMP_COMMENTS FROM EMPLOYEE_DETAILS";
    EMPSRC_UPD_DEL_query[96]="SELECT DISTINCT EMP_EMAIL FROM EMPLOYEE_DETAILS";
    EMPSRC_UPD_DEL_query[99]="SELECT DISTINCT EMP_MOBILE FROM EMPLOYEE_DETAILS";
    var EMPSRC_UPD_DEL_rs = EMPSRC_UPD_DEL_stmt.executeQuery(EMPSRC_UPD_DEL_query[EMPSRC_UPD_DEL_expense_searchoptions]);
    while(EMPSRC_UPD_DEL_rs.next()) {
      if(EMPSRC_UPD_DEL_rs.getString(1)!=null)
        EMPSRC_UPD_DEL_dataArray.push(EMPSRC_UPD_DEL_rs.getString(1));
    }
    var EMPSRC_UPD_DEL_final_autocomplts={"EMPSRC_UPD_DEL_flag_autocomplts":EMPSRC_UPD_DEL_expense_searchoptions,"EMPSRC_UPD_DEL_searchvalue_autocomplts":EMPSRC_UPD_DEL_dataArray};
    EMPSRC_UPD_DEL_rs.close();
    EMPSRC_UPD_DEL_stmt.close();
    EMPSRC_UPD_DEL_conn.close();
    return EMPSRC_UPD_DEL_final_autocomplts;
  }  
  // FUNCTION FOR SHOW THE DATA IN TABLE
  function EMPSRC_UPD_DEL_flextabel_getdatas(EMPSRC_UPD_DEL_flexresponse)
  {
    var EMPSRC_UPD_DEL_search_employeelistarray = [];
    var EMPSRC_UPD_DEL_connection =eilib.db_GetConnection();
    var EMPSRC_UPD_DEL_stmt_flex = EMPSRC_UPD_DEL_connection.createStatement();
    var EMPSRC_UPD_DEL_flextable_option = EMPSRC_UPD_DEL_flexresponse.EMPSRC_UPD_DEL_lb_searchoption;
    var EMPSERACH_LB_designation=EMPSRC_UPD_DEL_flexresponse.EMPSRC_UPD_DEL_lb_designation_listbox;
    var EMPSRC_UPD_DEL_flextable_query=[];
    var EMPSRC_UPD_DEL_designation=EMPSRC_UPD_DEL_flexresponse.EMPSRC_UPD_DEL_lb_designation_listbox;
    EMPSRC_UPD_DEL_flextable_query[95]="SELECT ED.EMP_ID, ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME,ED.EMP_MOBILE,ED.EMP_EMAIL,EXPCONFIG.ECN_DATA,ED.EMP_COMMENTS,ULD.ULD_LOGINID,UASD.UASD_ACCESS_CARD,DATE_FORMAT(CONVERT_TZ(ED.EMP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,U.UNIT_NO FROM EMPLOYEE_DETAILS ED LEFT JOIN EMPLOYEE_CARD_DETAILS ECD ON (ED.EMP_ID=ECD.EMP_ID)left join UNIT_ACCESS_STAMP_DETAILS UASD  on (ECD.UASD_ID=UASD.UASD_ID)left join UNIT U on (UASD.UNIT_ID=U.UNIT_ID) ,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ED.ULD_ID AND (EXPCONFIG.ECN_DATA ='"+EMPSERACH_LB_designation+"') AND (ED.ECN_ID=EXPCONFIG.ECN_ID)  ORDER BY ED.EMP_FIRST_NAME ASC";
    var EMPSRC_UPD_DEL_comments=EMPSRC_UPD_DEL_flexresponse.EMPSRC_UPD_DEL_ta_comments;
    EMPSRC_UPD_DEL_flextable_query[94] ="SELECT ED.EMP_ID, ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME,ED.EMP_MOBILE,ED.EMP_EMAIL,EXPCONFIG.ECN_DATA,ED.EMP_COMMENTS,ULD.ULD_LOGINID,UASD.UASD_ACCESS_CARD,DATE_FORMAT(CONVERT_TZ(ED.EMP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,U.UNIT_NO FROM EMPLOYEE_DETAILS ED LEFT JOIN EMPLOYEE_CARD_DETAILS ECD ON (ED.EMP_ID=ECD.EMP_ID)left join UNIT_ACCESS_STAMP_DETAILS UASD  on (ECD.UASD_ID=UASD.UASD_ID)left join UNIT U on (UASD.UNIT_ID=U.UNIT_ID) ,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ED.ULD_ID AND (ED.EMP_COMMENTS ='"+EMPSRC_UPD_DEL_comments+"') AND (ED.ECN_ID=EXPCONFIG.ECN_ID)  ORDER BY ED.EMP_FIRST_NAME ASC";
    var EMPSRC_UPD_DEL_emailid=EMPSRC_UPD_DEL_flexresponse.EMPSRC_UPD_DEL_ta_email;
    EMPSRC_UPD_DEL_flextable_query[96] = "SELECT ED.EMP_ID, ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME,ED.EMP_MOBILE,ED.EMP_EMAIL,EXPCONFIG.ECN_DATA,ED.EMP_COMMENTS,ULD.ULD_LOGINID,UASD.UASD_ACCESS_CARD,DATE_FORMAT(CONVERT_TZ(ED.EMP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,U.UNIT_NO FROM EMPLOYEE_DETAILS ED LEFT JOIN EMPLOYEE_CARD_DETAILS ECD ON (ED.EMP_ID=ECD.EMP_ID)left join UNIT_ACCESS_STAMP_DETAILS UASD  on (ECD.UASD_ID=UASD.UASD_ID)left join UNIT U on (UASD.UNIT_ID=U.UNIT_ID) ,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ED.ULD_ID AND (ED.EMP_EMAIL ='"+EMPSRC_UPD_DEL_emailid+"') AND (ED.ECN_ID=EXPCONFIG.ECN_ID)  ORDER BY ED.EMP_FIRST_NAME ASC";
    var EMPSRC_UPD_DEL_mobileno=EMPSRC_UPD_DEL_flexresponse.EMPSRC_UPD_DEL_ta_mobile;
    EMPSRC_UPD_DEL_flextable_query[99]="SELECT ED.EMP_ID, ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME,ED.EMP_MOBILE,ED.EMP_EMAIL,EXPCONFIG.ECN_DATA,ED.EMP_COMMENTS,ULD.ULD_LOGINID,UASD.UASD_ACCESS_CARD,DATE_FORMAT(CONVERT_TZ(ED.EMP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,U.UNIT_NO FROM EMPLOYEE_DETAILS ED LEFT JOIN EMPLOYEE_CARD_DETAILS ECD ON (ED.EMP_ID=ECD.EMP_ID)left join UNIT_ACCESS_STAMP_DETAILS UASD  on (ECD.UASD_ID=UASD.UASD_ID)left join UNIT U on (UASD.UNIT_ID=U.UNIT_ID) ,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ED.ULD_ID AND (ED.EMP_MOBILE ='"+EMPSRC_UPD_DEL_mobileno+"') AND (ED.ECN_ID=EXPCONFIG.ECN_ID)  ORDER BY ED.EMP_FIRST_NAME ASC";
    var EMPSRC_UPD_DEL_employeename=EMPSRC_UPD_DEL_flexresponse.EMPSRC_UPD_DEL_lb_employeename_listbox;
    var EMPSRC_UPD_DEL_splitempname = EMPSRC_UPD_DEL_employeename.split("_");
    var EMPSRC_UPD_DEL_firstname = EMPSRC_UPD_DEL_splitempname[0];
    var EMPSRC_UPD_DEL_lastname = EMPSRC_UPD_DEL_splitempname[1];
    EMPSRC_UPD_DEL_flextable_query[90]="SELECT ED.EMP_ID, ED.EMP_FIRST_NAME,ED.EMP_LAST_NAME,ED.EMP_MOBILE,ED.EMP_EMAIL,EXPCONFIG.ECN_DATA,ED.EMP_COMMENTS,ULD.ULD_LOGINID,UASD.UASD_ACCESS_CARD,DATE_FORMAT(CONVERT_TZ(ED.EMP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTMP,U.UNIT_NO FROM EMPLOYEE_DETAILS ED LEFT JOIN EMPLOYEE_CARD_DETAILS ECD ON (ED.EMP_ID=ECD.EMP_ID)left join UNIT_ACCESS_STAMP_DETAILS UASD  on (ECD.UASD_ID=UASD.UASD_ID)left join UNIT U on (UASD.UNIT_ID=U.UNIT_ID) ,EXPENSE_CONFIGURATION EXPCONFIG ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ED.ULD_ID AND (ED.EMP_FIRST_NAME ='"+EMPSRC_UPD_DEL_firstname+"' AND ED.EMP_LAST_NAME ='"+EMPSRC_UPD_DEL_lastname+"') AND (ED.ECN_ID=EXPCONFIG.ECN_ID)  ORDER BY ED.EMP_FIRST_NAME ASC";
    var EMPSRC_UPD_DEL_flex_rs=EMPSRC_UPD_DEL_stmt_flex.executeQuery( EMPSRC_UPD_DEL_flextable_query[EMPSRC_UPD_DEL_flextable_option]);
    while (EMPSRC_UPD_DEL_flex_rs.next()) 
    {
      var EMPSRC_UPD_DEL_employeenamefirst = EMPSRC_UPD_DEL_flex_rs.getString("EMP_FIRST_NAME");
      var EMPSRC_UPD_DEL_employeenamelast = EMPSRC_UPD_DEL_flex_rs.getString("EMP_LAST_NAME");
      var EMPSRC_UPD_DEL_mobile = EMPSRC_UPD_DEL_flex_rs.getString("EMP_MOBILE");
      var EMPSRC_UPD_DEL_email = EMPSRC_UPD_DEL_flex_rs.getString("EMP_EMAIL");
      if((EMPSRC_UPD_DEL_email==null)||(EMPSRC_UPD_DEL_email==undefined))
      {
        EMPSRC_UPD_DEL_email='';
      }
      var EMPSRC_UPD_DEL_designation=EMPSRC_UPD_DEL_flex_rs.getString("ECN_DATA");
      var EMPSRC_UPD_DEL_cardnumber =EMPSRC_UPD_DEL_flex_rs.getString("UASD_ACCESS_CARD");
      if((EMPSRC_UPD_DEL_cardnumber==null)||(EMPSRC_UPD_DEL_cardnumber==undefined))
      {
        EMPSRC_UPD_DEL_cardnumber='';
      }
      var EMPSRC_UPD_DEL_comments = EMPSRC_UPD_DEL_flex_rs.getString("EMP_COMMENTS");
      if((EMPSRC_UPD_DEL_comments==null)||(EMPSRC_UPD_DEL_comments==undefined))
      {
        EMPSRC_UPD_DEL_comments='';
      }
      var EMPSRC_UPD_DEL_unitno = EMPSRC_UPD_DEL_flex_rs.getString("UNIT_NO");
      if((EMPSRC_UPD_DEL_unitno==null)||(EMPSRC_UPD_DEL_unitno==undefined))
      {
        EMPSRC_UPD_DEL_unitno='';
      }
      var EMPSRC_UPD_DEL_userstamp=EMPSRC_UPD_DEL_flex_rs.getString("ULD_LOGINID");
      var EMPSRC_UPD_DEL_timestamp=EMPSRC_UPD_DEL_flex_rs.getString("TIMESTMP");
      var EMPSRC_UPD_DEL_el_id=EMPSRC_UPD_DEL_flex_rs.getString("EMP_ID");
      var EMPSRC_UPD_DEL_employeelist={'empno':EMPSRC_UPD_DEL_el_id,'Femployeename':EMPSRC_UPD_DEL_employeenamefirst,'Lemployeename':EMPSRC_UPD_DEL_employeenamelast,'mobile':EMPSRC_UPD_DEL_mobile,'email':EMPSRC_UPD_DEL_email,'designation':EMPSRC_UPD_DEL_designation,'comments':EMPSRC_UPD_DEL_comments,'userstamp':EMPSRC_UPD_DEL_userstamp,'timestamp':EMPSRC_UPD_DEL_timestamp,'cardnumber':EMPSRC_UPD_DEL_cardnumber,"EMPSRC_UPD_DEL_unitno":EMPSRC_UPD_DEL_unitno}
      EMPSRC_UPD_DEL_search_employeelistarray.push(EMPSRC_UPD_DEL_employeelist) 
    }
    EMPSRC_UPD_DEL_flex_rs.close();
    EMPSRC_UPD_DEL_stmt_flex.close();
    EMPSRC_UPD_DEL_connection.close();
    return EMPSRC_UPD_DEL_search_employeelistarray 
  }
  //FUNCTION TO RETURN AVAILABLE CARD'S 
  function EMPSRC_UPD_DEL_getempid()
  {
    //TREEVIEW  UNIT NO//
    var EMPSRC_UPD_DEL_connection =eilib.db_GetConnection();
    var EMPSRC_UPD_DEL_main_menu_stmt = EMPSRC_UPD_DEL_connection.createStatement();
    var EMPSRC_UPD_DEL_main_menu_array=[];
    var EMPSRC_UPD_DEL_multi_array=[];
    var EMPSRC_UPD_DEL_select_main_menu="SELECT DISTINCT U.UNIT_NO FROM UNIT U,UNIT_ACCESS_STAMP_DETAILS UASD,UNIT_DETAILS UD ,VW_ACTIVE_UNIT VAU WHERE VAU.UNIT_ID=U.UNIT_ID AND  U.UNIT_ID=UASD.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID AND UASD.UASD_ACCESS_INVENTORY IS NOT NULL AND UD.UD_OBSOLETE IS NULL AND UASD.UASD_ACCESS_CARD IS NOT NULL AND  UASD.UASD_ID NOT IN(SELECT ECD.UASD_ID FROM EMPLOYEE_CARD_DETAILS ECD)"
    var EMPSRC_UPD_DEL_main_menu_result=EMPSRC_UPD_DEL_main_menu_stmt.executeQuery(EMPSRC_UPD_DEL_select_main_menu);
    while(EMPSRC_UPD_DEL_main_menu_result.next()){
      EMPSRC_UPD_DEL_main_menu_array.push(EMPSRC_UPD_DEL_main_menu_result.getString("UNIT_NO"));
    }
    EMPSRC_UPD_DEL_multi_array.push(EMPSRC_UPD_DEL_main_menu_array)
    for(var i=0;i<EMPSRC_UPD_DEL_multi_array[0].length;i++){
      var menu=EMPSRC_UPD_DEL_multi_array[0][i];
      var EMPSRC_UPD_DEL_sub_menu_array=[];
      var EMPSRC_UPD_DEL_select_sub_menu="SELECT UASD.UASD_ACCESS_CARD FROM UNIT_ACCESS_STAMP_DETAILS UASD,UNIT U WHERE U.UNIT_ID=UASD.UNIT_ID AND U.UNIT_NO='"+menu+"' AND UASD.UASD_ID NOT IN(SELECT ECD.UASD_ID FROM EMPLOYEE_CARD_DETAILS ECD)AND UASD.UASD_ACCESS_INVENTORY IS NOT NULL AND UASD.UASD_ACCESS_CARD IS NOT NULL ORDER BY UASD.UASD_ACCESS_CARD ASC";       
      var EMPSRC_UPD_DEL_sub_menu_result=EMPSRC_UPD_DEL_main_menu_stmt.executeQuery(EMPSRC_UPD_DEL_select_sub_menu);
      while(EMPSRC_UPD_DEL_sub_menu_result.next()){ 
        EMPSRC_UPD_DEL_sub_menu_array.push(EMPSRC_UPD_DEL_sub_menu_result.getString("UASD_ACCESS_CARD"));
      }
      EMPSRC_UPD_DEL_multi_array.push(EMPSRC_UPD_DEL_sub_menu_array)
    }
    Logger.log("EMPSRC_UPD_DEL_multi_array:"+EMPSRC_UPD_DEL_multi_array)
    EMPSRC_UPD_DEL_main_menu_result.close();
    EMPSRC_UPD_DEL_main_menu_stmt.close();
    EMPSRC_UPD_DEL_connection.close();
    return EMPSRC_UPD_DEL_multi_array  
  }
  //FUNTION FOR GETTING CARDNO ND UNITNO
  function EMPSRC_UPD_DEL_getcardnoandunitno(EMPSRC_UPD_DEL_id)
  {
    var EMPSRC_UPD_DEL_cardunitnoarray=[];
    var EMPSRC_UPD_DEL_connection =eilib.db_GetConnection();
    var EMPSRC_UPD_DEL_card_stmt = EMPSRC_UPD_DEL_connection.createStatement();
    var EMPSRC_UPD_DEL_getcardnoandunitno ="select DISTINCT U.UNIT_NO,UASD.UASD_ACCESS_CARD  from EMPLOYEE_DETAILS ED left join EMPLOYEE_CARD_DETAILS ECD on (ECD.EMP_ID=ED.EMP_ID) left join UNIT_ACCESS_STAMP_DETAILS UASD on (UASD.UASD_ID=ECD.UASD_ID) left join UNIT U on (UASD.UNIT_ID=U.UNIT_ID) where ED.EMP_ID='"+EMPSRC_UPD_DEL_id+"'";
    var EMPSRC_UPD_DEL_sub_card_result=EMPSRC_UPD_DEL_card_stmt.executeQuery(EMPSRC_UPD_DEL_getcardnoandunitno);
    var EMPSRC_UPD_DEL_unitno_array=[];
    var EMPSRC_UPD_DEL_cardno_array=[];
    while(EMPSRC_UPD_DEL_sub_card_result.next()){ 
      EMPSRC_UPD_DEL_unitno_array.push(EMPSRC_UPD_DEL_sub_card_result.getString("UNIT_NO"));
      EMPSRC_UPD_DEL_cardno_array.push(EMPSRC_UPD_DEL_sub_card_result.getString("UASD_ACCESS_CARD"));
    }
    EMPSRC_UPD_DEL_sub_card_result.close();
    EMPSRC_UPD_DEL_cardunitnoarray.push(EMPSRC_UPD_DEL_unitno_array);
    EMPSRC_UPD_DEL_cardunitnoarray.push(EMPSRC_UPD_DEL_cardno_array);
    var EMPSRC_UPD_DEL_multi_array=EMPSRC_UPD_DEL_gettreeviewunit(EMPSRC_UPD_DEL_id);
    EMPSRC_UPD_DEL_cardunitnoarray.push(EMPSRC_UPD_DEL_multi_array);
    EMPSRC_UPD_DEL_card_stmt.close();
    EMPSRC_UPD_DEL_connection.close();
    return EMPSRC_UPD_DEL_cardunitnoarray;
  }
  //UPDATE THE FORM DATAS//
  function EMPSRC_UPD_DEL_updateform(EMPSRC_UPD_DEL_updateformelement,EMPSRC_UPD_DEL_expense_searchoptions)
  {
    var EMPSRC_UPD_DEL_conn =eilib.db_GetConnection();
    var EMPSRC_UPD_DEL_stmt =EMPSRC_UPD_DEL_conn.createStatement();
    var EMPSRC_UPD_DEL_tb_updateid= EMPSRC_UPD_DEL_updateformelement.EMPSRC_UPD_DEL_tb_updateid;  
    var EMPSRC_UPD_DEL_cardno= EMPSRC_UPD_DEL_updateformelement.submenu;
    var EMPSRC_UPD_DEL_carcunitarray=EMPSRC_UPD_DEL_updateformelement.EMPSRC_UPD_DEL_carcunitarray;
    var EMPSRC_UPD_DEL_getcardnoarray=[];
    var EMPSRC_UPD_DEL_firstname = EMPSRC_UPD_DEL_updateformelement.EMPSRC_UPD_DEL_tb_firstname; 
    var EMPSRC_UPD_DEL_lastname = EMPSRC_UPD_DEL_updateformelement.EMPSRC_UPD_DEL_tb_lastname; 
    var EMPSRC_UPD_DEL_empdesigname = EMPSRC_UPD_DEL_updateformelement.EMPSRC_UPD_DEL_lb_empdesig;
    var EMPSRC_UPD_DEL_mobilenumber = EMPSRC_UPD_DEL_updateformelement.EMPSRC_UPD_DEL_tb_mobile; 
    var EMPSRC_UPD_DEL_email = EMPSRC_UPD_DEL_updateformelement.EMPSRC_UPD_DEL_tb_email; 
    var EMPSRC_UPD_DEL_comments = EMPSRC_UPD_DEL_updateformelement.EMPSRC_UPD_DEL_ta_comments;
    var EMPSRC_UPD_DEL_selectcardradio = EMPSRC_UPD_DEL_updateformelement.EMPSRC_UPD_DEL_radio_null;
    var EMPSRC_UPD_DEL_cardunitnoarray=EMPSRC_UPD_DEL_getcardnoandunitno(EMPSRC_UPD_DEL_tb_updateid)
    var finalarray = [];
    if(EMPSRC_UPD_DEL_selectcardradio=='NULL')
    {
      EMPSRC_UPD_DEL_cardno="";
      var EMPSRC_UPD_DEL_getcardnoarray =EMPSRC_UPD_DEL_cardunitnoarray[1];
    }
    else
    {
      var j=0; 
      for(var i=0; i<=EMPSRC_UPD_DEL_cardunitnoarray[1].length-1;i++)
      {
        if(EMPSRC_UPD_DEL_cardno.indexOf(EMPSRC_UPD_DEL_cardunitnoarray[1][i])==-1)
        {
          finalarray[j]=EMPSRC_UPD_DEL_cardunitnoarray[1][i];
          j++;
        }
        var EMPSRC_UPD_DEL_getcardnoarray = finalarray;
      }
    }
    if(EMPSRC_UPD_DEL_comments=="")
    {
      EMPSRC_UPD_DEL_comments=null;
    }
    else
    {
      EMPSRC_UPD_DEL_comments='"'+eilib.ConvertSpclCharString(EMPSRC_UPD_DEL_comments)+'"';    
    }
    var EMPSRC_UPD_DEL_lastupdatecard=EMPSRC_UPD_DEL_cardno;
    var EMPSRC_UPD_DEL_updateempdetail ="CALL SP_EMPDTL_UPDATE("+EMPSRC_UPD_DEL_tb_updateid+",'"+EMPSRC_UPD_DEL_firstname+"','"+EMPSRC_UPD_DEL_lastname+"','"+EMPSRC_UPD_DEL_empdesigname+"','"+EMPSRC_UPD_DEL_mobilenumber+"','"+EMPSRC_UPD_DEL_email+"',"+EMPSRC_UPD_DEL_comments+",'"+UserStamp+"','"+EMPSRC_UPD_DEL_getcardnoarray+"','"+EMPSRC_UPD_DEL_lastupdatecard+"',@FLAG_UPDATEEMP)";
    EMPSRC_UPD_DEL_stmt.execute(EMPSRC_UPD_DEL_updateempdetail);
    var EMPSRC_UPD_DEL_getresultflg= EMPSRC_UPD_DEL_stmt.executeQuery("SELECT @FLAG_UPDATEEMP");
    while(EMPSRC_UPD_DEL_getresultflg.next()){
      var EMPSRC_UPD_DEL_getresultdateflg=EMPSRC_UPD_DEL_getresultflg.getString("@FLAG_UPDATEEMP");
    }
    var EMPSRC_UPD_DEL_multi_array=EMPSRC_UPD_DEL_gettreeviewunit(EMPSRC_UPD_DEL_tb_updateid);
    var EMPSRC_UPD_DEL_commentsupdate=[];
    if((EMPSRC_UPD_DEL_expense_searchoptions==94)||(EMPSRC_UPD_DEL_expense_searchoptions==96)||(EMPSRC_UPD_DEL_expense_searchoptions==99))
    {
      EMPSRC_UPD_DEL_commentsupdate=EMPSRC_UPD_DEL_autocomplts_autocomplete(EMPSRC_UPD_DEL_expense_searchoptions);
    }
    EMPSRC_UPD_DEL_stmt.close();
    EMPSRC_UPD_DEL_conn.close();
    return [EMPSRC_UPD_DEL_multi_array,EMPSRC_UPD_DEL_commentsupdate,EMPSRC_UPD_DEL_getresultdateflg];
  }
  //DELETE THE  RECORD IN THE TABLE
  function EMPSRC_UPD_DEL_deleterow(EMPSRC_UPD_DEL_deleteid)
  {
    var EMPSRC_UPD_DEL_conn=eilib.db_GetConnection();
    var EMPSRC_UPD_DEL_DEL_stmt= EMPSRC_UPD_DEL_conn.createStatement();
    var EMPSRC_UPD_DEL_DELQUERY="CALL SP_EMPDTL_DELETE("+EMPSRC_UPD_DEL_deleteid+",'"+UserStamp+"',@EMPLOYEEDELETE_FLAG)";
    EMPSRC_UPD_DEL_DEL_stmt.execute(EMPSRC_UPD_DEL_DELQUERY);
    EMPSRC_UPD_DEL_DEL_stmt.close();
    var EMPSRC_UPD_DEL_stmt_flag=EMPSRC_UPD_DEL_conn.createStatement();
    var EMPSRC_UPD_DEL_flag_select="SELECT @EMPLOYEEDELETE_FLAG";
    var EMPSRC_UPD_DEL_flag_rs=EMPSRC_UPD_DEL_stmt_flag.executeQuery(EMPSRC_UPD_DEL_flag_select);
    while(EMPSRC_UPD_DEL_flag_rs.next())
      var EMPSRC_UPD_DEL_flag_insert=EMPSRC_UPD_DEL_flag_rs.getString("@EMPLOYEEDELETE_FLAG");
    EMPSRC_UPD_DEL_flag_rs.close();
    EMPSRC_UPD_DEL_stmt_flag.close();
    EMPSRC_UPD_DEL_conn.close();
    return EMPSRC_UPD_DEL_flag_insert;
  }
  //GET THE TREEVIEW UNIT AND CARD VALUES// 
  function EMPSRC_UPD_DEL_gettreeviewunit(EMPSRC_UPD_DEL_tb_updateid)
  {
    var EMPSRC_UPD_DEL_conn =eilib.db_GetConnection();
    var EMPSRC_UPD_DEL_stmt =EMPSRC_UPD_DEL_conn.createStatement();
    //TREEVIEW  UNIT NO//
    var EMPSRC_UPD_DEL_main_menu_array=[];
    var EMPSRC_UPD_DEL_multi_array=[];
    var EMPSRC_UPD_DEL_select_main_menu="SELECT DISTINCT U.UNIT_NO FROM UNIT U,UNIT_ACCESS_STAMP_DETAILS UASD,UNIT_DETAILS UD,VW_ACTIVE_UNIT VAU WHERE VAU.UNIT_ID=U.UNIT_ID AND U.UNIT_ID=UASD.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID AND UASD.UASD_ACCESS_INVENTORY IS NOT NULL AND UD.UD_OBSOLETE IS NULL AND UASD.UASD_ACCESS_CARD IS NOT NULL AND UASD.UASD_ID NOT IN(SELECT ECD.UASD_ID FROM EMPLOYEE_CARD_DETAILS ECD WHERE ECD.EMP_ID !="+EMPSRC_UPD_DEL_tb_updateid+")";
    var EMPSRC_UPD_DEL_main_menu_result=EMPSRC_UPD_DEL_stmt.executeQuery(EMPSRC_UPD_DEL_select_main_menu);
    while(EMPSRC_UPD_DEL_main_menu_result.next()){
      EMPSRC_UPD_DEL_main_menu_array.push(EMPSRC_UPD_DEL_main_menu_result.getString("UNIT_NO"));
    }
    EMPSRC_UPD_DEL_main_menu_result.close();
    EMPSRC_UPD_DEL_stmt.close();
    EMPSRC_UPD_DEL_multi_array.push(EMPSRC_UPD_DEL_main_menu_array);
    var EMPSRC_UPD_DEL_stmt =EMPSRC_UPD_DEL_conn.createStatement();
    for(var i=0;i<EMPSRC_UPD_DEL_multi_array[0].length;i++){
      var menu=EMPSRC_UPD_DEL_multi_array[0][i];
      var EMPSRC_UPD_DEL_sub_menu_array=[];
      var EMPSRC_UPD_DEL_select_sub_menu="SELECT UASD.UASD_ACCESS_CARD FROM UNIT_ACCESS_STAMP_DETAILS UASD,UNIT U WHERE U.UNIT_ID=UASD.UNIT_ID AND U.UNIT_NO="+menu+" AND UASD.UASD_ACCESS_INVENTORY IS NOT NULL AND UASD.UASD_ACCESS_CARD IS NOT NULL AND UASD.UASD_ID NOT IN(SELECT ECD.UASD_ID FROM EMPLOYEE_CARD_DETAILS ECD WHERE ECD.EMP_ID!="+EMPSRC_UPD_DEL_tb_updateid+") ORDER BY UASD.UASD_ACCESS_CARD ASC ";
      var EMPSRC_UPD_DEL_sub_menu_result=EMPSRC_UPD_DEL_stmt.executeQuery(EMPSRC_UPD_DEL_select_sub_menu);
      while(EMPSRC_UPD_DEL_sub_menu_result.next()){ 
        EMPSRC_UPD_DEL_sub_menu_array.push(EMPSRC_UPD_DEL_sub_menu_result.getString("UASD_ACCESS_CARD"));
      }
      EMPSRC_UPD_DEL_multi_array.push(EMPSRC_UPD_DEL_sub_menu_array);
      EMPSRC_UPD_DEL_sub_menu_result.close();
    }
    EMPSRC_UPD_DEL_stmt.close();
    EMPSRC_UPD_DEL_conn.close();
    return EMPSRC_UPD_DEL_multi_array;
  }
}
catch(err)
{
}
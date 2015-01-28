//*******************************************CONFIGURATION SEARCH/UPDATE/DELETE*********************************************//
//DONE BY:PUNI
//VER 1.9-SD:03/10/2014 ED:03/10/2014 TRACKER NO;689:1.updated html script to hide preloader after menu n form loads,2.changed preloader n msgbox position
//DONE BY:SARADAMBAL,SAFI,PUNI
//VER 1.8-SD:13/08/2014 ED:13/08/2014 TRACKER NO;689 ; Implemented rollback script,logger script to show err in msg box,new jquery,css links- SARADAMBAL
//VER 1.7-SD:21/07/2014 ED:21/07/2014 TRACKER NO;689 ; UPDATED DRIVEAPP AS DOCSLIST FOR SHARING/UNSHARING DOCS
//VER 1.6-SD:04/07/2014 ED:05/07/2014 TRACKER NO:689:given err message if cal name is wrong n fake folder /file is given without updation in db n give acess and added cond. do not chk own acs level for calender by PUNI
//VER 1.5-SD:24/06/2014 ED:26/06/2014 TRACKER NO:689:REMOVED ALERT IN HTML
//VER 1.4-SD:21/06/2014 ED21/06/2014:TRACKER NO:689:UPDATED THE DRIVE LINK 
//VER 1.3-SD:09/06/2014 ED:12/06/2014,TRACKER NO:689,implemented script for commit and failure function BY SARADHA ,IMPLEMENTED DOCS SHARING,CALENDER SHARING,SITE WEHN UPDATE MADE.ADDED UNIT MONTH
//VER 1.2-SD:07/06/2014 ED:07/06/2014,TRACKER NO:689,updated new drive link
//VER 1.1-SD:28/05/2014 ED:28/05/2014,implemented dd amt as 3 digit,customer sd enter only 1 to 48 
//VER 1.0-SD:06/03/2014 ED:07/03/2014,implemented arr concept for already exist data and reduced coding using twodimension array,checked transaction sp for config and also trigger
//VER 0.09-SD:12/02/2014 ED:15/02/2014,implemented eilb for errormsg and for special character,implemented delete btn validation for data if there is any transaction for all table,implemented script for deletion sp,implemented one function to get table id for deletion
//VER 0.08-SD:13/01/2014 ED:20/01/2014,remove uppercase for folder ids,include uppercase for some other data,corrected return function,create tb for data using jquery instead of html,changed h3 tag  
//VER 0.07-SD:02/12/2013 ED:07/01/2014,included sub type for deposit deduction,include textbox for dd amt,done amt validation while save btn validation,included report configuration data
//VER 0.06-SD:28/12/2013 ED:28/12/2013,changed form alignment tag & userstamp syntax,changed file name
//VER 0.05-SD:10/12/2013 ED:10/12/2013,updated failure function
//VER 0.04-SD:06/11/2013 ED:14/11/2013,updated flex table width & highlight row for flex table,removed profile name for not having type,updated primary id instead of using data,updated delete btn confirmation msg,included erm,banktt & check module,updated tickler table for deletion
//VER 0.03-SD:08/10/2013 ED:08/10/2013,updated head tag links & implement return function
//VER 0.02-SD:03/10/2013 ED:03/10/2013,updated eilib connection,message box,preloader,removed scriplet,convert blur function for all change function
//VER 0.01-INITIAL VERSION,TRACKER NO:271,SD:31/07/2013,ED:21/8/2013
//*********************************************************************************************************//
try
{ 
  /*---------------------------------FETCH THE ERROR MESSAGE AND LOAD MODULE NAME -------------------------------------------------------------------------------*/
  function CONFSRC_UPD_DEL_module_errormsg()
  {
    var CONFSRC_UPD_DEL_conn =eilib.db_GetConnection();
    var CONFSRC_UPD_DEL_stmt = CONFSRC_UPD_DEL_conn.createStatement();
    var CONFSRC_UPD_DEL_module_name_array =[];
    var CONFSRC_UPD_DEL_select_module_name = "SELECT CNP_ID,CNP_DATA FROM CONFIGURATION_PROFILE WHERE CNP_ID NOT IN (12,13,1) ORDER BY CNP_DATA ASC"; 
    var CONFSRC_UPD_DEL_module_name_rs = CONFSRC_UPD_DEL_stmt.executeQuery(CONFSRC_UPD_DEL_select_module_name);
    while(CONFSRC_UPD_DEL_module_name_rs.next())
    {var CONFSRC_UPD_DEL_module_id = CONFSRC_UPD_DEL_module_name_rs.getString(1);
     var CONFSRC_UPD_DEL_module_data = CONFSRC_UPD_DEL_module_name_rs.getString(2);
     var CONFSRC_UPD_DEL_module_object={"CONFSRC_UPD_DEL_module_id":CONFSRC_UPD_DEL_module_id,"CONFSRC_UPD_DEL_module_data":CONFSRC_UPD_DEL_module_data};
     CONFSRC_UPD_DEL_module_name_array.push(CONFSRC_UPD_DEL_module_object);
    }
    CONFSRC_UPD_DEL_module_name_rs.close();CONFSRC_UPD_DEL_stmt.close();
    var CONFSRC_UPD_DEL_errorMsg_array =  eilib.GetErrorMessageList(CONFSRC_UPD_DEL_conn,'170,273,275,272,274,276,287,289,315,320,453,454,455,458,465');
    var CONFSRC_UPD_DEL_result={"CONFSRC_UPD_DEL_module":CONFSRC_UPD_DEL_module_name_array,"CONFSRC_UPD_DEL_errormsg":CONFSRC_UPD_DEL_errorMsg_array.errormsg}
    CONFSRC_UPD_DEL_conn.close();
    return CONFSRC_UPD_DEL_result;
  }
  /*-------------------------------GET THE CGN_ID FROM CONFIGURATION USING CNP_DATA (PROFILE NAME) & RETURN TYPES OF THE MODULE----------------------------------*/
  function CONFSRC_UPD_DEL_selectModule(CONFSRC_UPD_DEL_profileName)
  {  
    var CONFSRC_UPD_DEL_conn =eilib.db_GetConnection();
    var CONFSRC_UPD_DEL_types_stmt = CONFSRC_UPD_DEL_conn.createStatement();
    var CONFSRC_UPD_DEL_types_array=[];
    var CONFSRC_UPD_DEL_select_types = "SELECT * FROM CONFIGURATION WHERE CNP_ID="+CONFSRC_UPD_DEL_profileName+" AND (CGN_NON_IP_FLAG != 'XX' or CGN_NON_IP_FLAG is null) ORDER BY CGN_TYPE ASC";
    var CONFSRC_UPD_DEL_types_rs = CONFSRC_UPD_DEL_types_stmt.executeQuery(CONFSRC_UPD_DEL_select_types);
    while(CONFSRC_UPD_DEL_types_rs.next())
    {
      var CONFSRC_UPD_DEL_Typearr_id = CONFSRC_UPD_DEL_types_rs.getString(1);
      var CONFSRC_UPD_DEL_Typearr = CONFSRC_UPD_DEL_types_rs.getString(3);
      var CONFSRC_UPD_DEL_type_object={"CONFSRC_UPD_DEL_type_object_id":CONFSRC_UPD_DEL_Typearr_id,"CONFSRC_UPD_DEL_type_object_data":CONFSRC_UPD_DEL_Typearr};
      CONFSRC_UPD_DEL_types_array.push(CONFSRC_UPD_DEL_type_object)
    }
    CONFSRC_UPD_DEL_types_rs.close();CONFSRC_UPD_DEL_types_stmt.close(); 
    CONFSRC_UPD_DEL_conn.close();
    return CONFSRC_UPD_DEL_types_array;
  }
  /*--------------------------------FUNCTION FOR SHOW THE DATA IN TABLE----------------------------*/
  function CONFSRC_UPD_DEL_selectData(CONFSRC_UPD_DEL_selProfile,CONFSRC_UPD_DEL_selType,CONFSRC_UPD_DEL_parentFunction,CONFSRC_UPD_DEL_flagdd)
  {
    var CONFSRC_UPD_DEL_conn =eilib.db_GetConnection();
    var CONFSRC_UPD_DEL_profile= CONFSRC_UPD_DEL_selProfile;
    var configuration_types = CONFSRC_UPD_DEL_selType;
    var CONFSRC_UPD_DEL_types_stmt = CONFSRC_UPD_DEL_conn.createStatement();
    var CONFSRC_UPD_DEL_data_array=[];
    var CONFSRC_UPD_DEL_tablename=CONFSRC_UPD_DEL_gettablename(CONFSRC_UPD_DEL_selProfile);
    /*------------------------------CODING TO RETRIEVE FROM CUSTOMER_CONFIGURATION TABLE-------------------------------------*/ 
    if(CONFSRC_UPD_DEL_profile==3)
    {
      var CONFSRC_UPD_DEL_select_data = "SELECT CC.CCN_ID,CC.CCN_DATA,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(CC.CCN_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,CC.CCN_INITIALIZE_FLAG FROM CUSTOMER_CONFIGURATION CC,CONFIGURATION C,CONFIGURATION_PROFILE CP,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=CC.ULD_ID AND CP.CNP_ID="+CONFSRC_UPD_DEL_profile+" AND CC.CGN_ID=C.CGN_ID AND C.CGN_TYPE= '"+configuration_types+"' ORDER BY CC.CCN_DATA ASC";
      var CONFSRC_UPD_DEL_data_rs = CONFSRC_UPD_DEL_types_stmt.executeQuery(CONFSRC_UPD_DEL_select_data);
      while(CONFSRC_UPD_DEL_data_rs.next())
      {        
        var CONFSRC_UPD_DEL_id = CONFSRC_UPD_DEL_data_rs.getString("CCN_ID");
        var CONFSRC_UPD_DEL_data = CONFSRC_UPD_DEL_data_rs.getString("CCN_DATA");
        var CONFSRC_UPD_DEL_userstamp = CONFSRC_UPD_DEL_data_rs.getString("ULD_LOGINID");
        var CONFSRC_UPD_DEL_timestamp = CONFSRC_UPD_DEL_data_rs.getString("TIMESTAMP");
        var CONFSRC_UPD_DEL_flag = CONFSRC_UPD_DEL_data_rs.getString("CCN_INITIALIZE_FLAG");
        var CONFSRC_UPD_DEL_data_result={"CONFSRC_UPD_DEL_id":CONFSRC_UPD_DEL_id,"CONFSRC_UPD_DEL_data":CONFSRC_UPD_DEL_data,"CONFSRC_UPD_DEL_userstamp":CONFSRC_UPD_DEL_userstamp,"CONFSRC_UPD_DEL_timestamp":CONFSRC_UPD_DEL_timestamp,"CONFSRC_UPD_DEL_flag":CONFSRC_UPD_DEL_flag}; 
        CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_data_result);
      }
      CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_parentFunction);
      CONFSRC_UPD_DEL_data_rs.close();
    }
    /*------------------------------CODING TO RETRIEVE FROM ACCESS_CONFIGURATION TABLE-------------------------------------*/  
    if(CONFSRC_UPD_DEL_profile==5)
    {
      var CONFSRC_UPD_DEL_select_data = "SELECT ACN.ACN_ID,ACN.ACN_DATA,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ACN.ACN_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,ACN.ACN_INITIALIZE_FLAG FROM ACCESS_CONFIGURATION ACN,CONFIGURATION C,CONFIGURATION_PROFILE CP,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ACN.ULD_ID AND CP.CNP_ID="+CONFSRC_UPD_DEL_profile+" AND ACN.CGN_ID=C.CGN_ID AND C.CGN_TYPE= '"+configuration_types+"' ORDER BY ACN.ACN_DATA ASC";
      var CONFSRC_UPD_DEL_data_rs = CONFSRC_UPD_DEL_types_stmt.executeQuery(CONFSRC_UPD_DEL_select_data);
      while(CONFSRC_UPD_DEL_data_rs.next())
      {       
        var CONFSRC_UPD_DEL_id = CONFSRC_UPD_DEL_data_rs.getString("ACN_ID");
        var CONFSRC_UPD_DEL_data = CONFSRC_UPD_DEL_data_rs.getString("ACN_DATA");
        var CONFSRC_UPD_DEL_userstamp = CONFSRC_UPD_DEL_data_rs.getString("ULD_LOGINID");
        var CONFSRC_UPD_DEL_timestamp = CONFSRC_UPD_DEL_data_rs.getString("TIMESTAMP");
        var CONFSRC_UPD_DEL_flag = CONFSRC_UPD_DEL_data_rs.getString("ACN_INITIALIZE_FLAG");
        var CONFSRC_UPD_DEL_trans_stmt = CONFSRC_UPD_DEL_conn.createStatement();
        var CONFSRC_UPD_DEL_data_result={"CONFSRC_UPD_DEL_id":CONFSRC_UPD_DEL_id,"CONFSRC_UPD_DEL_data":CONFSRC_UPD_DEL_data,"CONFSRC_UPD_DEL_userstamp":CONFSRC_UPD_DEL_userstamp,"CONFSRC_UPD_DEL_timestamp":CONFSRC_UPD_DEL_timestamp,"CONFSRC_UPD_DEL_flag":CONFSRC_UPD_DEL_flag}; 
        CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_data_result);
      }
      CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_parentFunction);
      CONFSRC_UPD_DEL_data_rs.close();
    }  
    /*-------------------------------CODING TO RETRIEVE FROM DEPOSIT_DEDUCTION_CONFIGURATION TABLE---------------------------------------*/  
    if(CONFSRC_UPD_DEL_profile==8)
    {
      var CONFSRC_UPD_DEL_select_data = "SELECT DDC.DDC_ID,DDC.DDC_DATA,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(DDC.DDC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,DDC.DDC_INITIALIZE_FLAG,DDC.DDC_SUB_DATA FROM DEPOSIT_DEDUCTION_CONFIGURATION DDC,CONFIGURATION C,CONFIGURATION_PROFILE CP ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=DDC.ULD_ID AND CP.CNP_ID="+CONFSRC_UPD_DEL_profile+" AND DDC.CGN_ID=C.CGN_ID AND C.CGN_TYPE='"+configuration_types+"' ORDER BY DDC.DDC_DATA ASC";
      var CONFSRC_UPD_DEL_data_rs = CONFSRC_UPD_DEL_types_stmt.executeQuery(CONFSRC_UPD_DEL_select_data);
      while(CONFSRC_UPD_DEL_data_rs.next())
      {
        var CONFSRC_UPD_DEL_id = CONFSRC_UPD_DEL_data_rs.getString("DDC_ID");
        var CONFSRC_UPD_DEL_data = CONFSRC_UPD_DEL_data_rs.getString("DDC_DATA");
        var CONFSRC_UPD_DEL_subdata = CONFSRC_UPD_DEL_data_rs.getString("DDC_SUB_DATA");
        var CONFSRC_UPD_DEL_userstamp = CONFSRC_UPD_DEL_data_rs.getString("ULD_LOGINID");
        var CONFSRC_UPD_DEL_timestamp = CONFSRC_UPD_DEL_data_rs.getString("TIMESTAMP");
        var CONFSRC_UPD_DEL_flag = CONFSRC_UPD_DEL_data_rs.getString("DDC_INITIALIZE_FLAG");
        var CONFSRC_UPD_DEL_data_result={"CONFSRC_UPD_DEL_id":CONFSRC_UPD_DEL_id,"CONFSRC_UPD_DEL_data":CONFSRC_UPD_DEL_data,"CONFSRC_UPD_DEL_userstamp":CONFSRC_UPD_DEL_userstamp,"CONFSRC_UPD_DEL_timestamp":CONFSRC_UPD_DEL_timestamp,"CONFSRC_UPD_DEL_flag":CONFSRC_UPD_DEL_flag,"CONFSRC_UPD_DEL_subdata":CONFSRC_UPD_DEL_subdata}; 
        CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_data_result);
      }
      CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_parentFunction);
      CONFSRC_UPD_DEL_data_rs.close();
    }
    /*--------------------------CODING FOR RETRIEVE DATA FROM EXPENSE_CONFIGURATION TABLE-------------------------------------------------*/  
    if(CONFSRC_UPD_DEL_profile==7)
    {    
      var CONFSRC_UPD_DEL_select_data = "SELECT ECN.ECN_ID,ECN.ECN_DATA,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ECN.ECN_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,ECN.ECN_INITIALIZE_FLAG FROM EXPENSE_CONFIGURATION ECN,CONFIGURATION C,CONFIGURATION_PROFILE CP ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ECN.ULD_ID AND CP.CNP_ID="+CONFSRC_UPD_DEL_profile+" AND ECN.CGN_ID=C.CGN_ID AND C.CGN_TYPE= '"+configuration_types+"' ORDER BY ECN.ECN_DATA ASC";
      var CONFSRC_UPD_DEL_data_rs = CONFSRC_UPD_DEL_types_stmt.executeQuery(CONFSRC_UPD_DEL_select_data);
      while(CONFSRC_UPD_DEL_data_rs.next())
      {       
        var CONFSRC_UPD_DEL_id = CONFSRC_UPD_DEL_data_rs.getString("ECN_ID");
        var CONFSRC_UPD_DEL_data = CONFSRC_UPD_DEL_data_rs.getString("ECN_DATA");
        var CONFSRC_UPD_DEL_userstamp = CONFSRC_UPD_DEL_data_rs.getString("ULD_LOGINID");
        var CONFSRC_UPD_DEL_timestamp = CONFSRC_UPD_DEL_data_rs.getString("TIMESTAMP");
        var CONFSRC_UPD_DEL_flag = CONFSRC_UPD_DEL_data_rs.getString("ECN_INITIALIZE_FLAG");
        var CONFSRC_UPD_DEL_data_result={"CONFSRC_UPD_DEL_id":CONFSRC_UPD_DEL_id,"CONFSRC_UPD_DEL_data":CONFSRC_UPD_DEL_data,"CONFSRC_UPD_DEL_userstamp":CONFSRC_UPD_DEL_userstamp,"CONFSRC_UPD_DEL_timestamp":CONFSRC_UPD_DEL_timestamp,"CONFSRC_UPD_DEL_flag":CONFSRC_UPD_DEL_flag}; 
        CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_data_result);
      }
      CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_parentFunction);
      CONFSRC_UPD_DEL_data_rs.close();
    }
    /*-------------------------------CODING TO RETRIEVE FROM NATIONALITY_CONFIGURATION TABLE---------------------------------------*/  
    if(CONFSRC_UPD_DEL_profile==10)
    {       
      var CONFSRC_UPD_DEL_select_data = "SELECT NC.NC_ID,NC.NC_DATA,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(NC.NC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,NC.NC_INITIALIZE_FLAG FROM NATIONALITY_CONFIGURATION NC,CONFIGURATION C,CONFIGURATION_PROFILE CP ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=NC.ULD_ID AND  CP.CNP_ID="+CONFSRC_UPD_DEL_profile+" AND NC.CGN_ID=C.CGN_ID AND C.CGN_TYPE= '"+configuration_types+"' ORDER BY NC.NC_DATA ASC";
      var CONFSRC_UPD_DEL_data_rs = CONFSRC_UPD_DEL_types_stmt.executeQuery(CONFSRC_UPD_DEL_select_data);
      while(CONFSRC_UPD_DEL_data_rs.next())
      {        
        var CONFSRC_UPD_DEL_id = CONFSRC_UPD_DEL_data_rs.getString("NC_ID");
        var CONFSRC_UPD_DEL_data = CONFSRC_UPD_DEL_data_rs.getString("NC_DATA");
        var CONFSRC_UPD_DEL_userstamp = CONFSRC_UPD_DEL_data_rs.getString("ULD_LOGINID");
        var CONFSRC_UPD_DEL_timestamp = CONFSRC_UPD_DEL_data_rs.getString("TIMESTAMP");
        var CONFSRC_UPD_DEL_flag = CONFSRC_UPD_DEL_data_rs.getString("NC_INITIALIZE_FLAG");
        var CONFSRC_UPD_DEL_data_result={"CONFSRC_UPD_DEL_id":CONFSRC_UPD_DEL_id,"CONFSRC_UPD_DEL_data":CONFSRC_UPD_DEL_data,"CONFSRC_UPD_DEL_userstamp":CONFSRC_UPD_DEL_userstamp,"CONFSRC_UPD_DEL_timestamp":CONFSRC_UPD_DEL_timestamp,"CONFSRC_UPD_DEL_flag":CONFSRC_UPD_DEL_flag}; 
        CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_data_result);
      }
      CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_parentFunction);
      CONFSRC_UPD_DEL_data_rs.close();
    }
    /*-------------------------------CODING TO RETRIEVE FROM OCBC_CONFIGURATION TABLE---------------------------------------*/ 
    if(CONFSRC_UPD_DEL_profile==6)
    {       
      var CONFSRC_UPD_DEL_select_data = "SELECT OCN.OCN_ID,OCN.OCN_DATA,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(OCN.OCN_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,OCN.OCN_INITIALIZE_FLAG FROM OCBC_CONFIGURATION OCN,CONFIGURATION C,CONFIGURATION_PROFILE CP ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=OCN.ULD_ID AND CP.CNP_ID="+CONFSRC_UPD_DEL_profile+" AND OCN.CGN_ID=C.CGN_ID AND C.CGN_TYPE= '"+configuration_types+"' ORDER BY OCN.OCN_DATA ASC";
      var CONFSRC_UPD_DEL_data_rs = CONFSRC_UPD_DEL_types_stmt.executeQuery(CONFSRC_UPD_DEL_select_data);
      while(CONFSRC_UPD_DEL_data_rs.next())
      {        
        var CONFSRC_UPD_DEL_id = CONFSRC_UPD_DEL_data_rs.getString("OCN_ID");
        var CONFSRC_UPD_DEL_data = CONFSRC_UPD_DEL_data_rs.getString("OCN_DATA");
        var CONFSRC_UPD_DEL_userstamp = CONFSRC_UPD_DEL_data_rs.getString("ULD_LOGINID");
        var CONFSRC_UPD_DEL_timestamp = CONFSRC_UPD_DEL_data_rs.getString("TIMESTAMP");
        var CONFSRC_UPD_DEL_flag = CONFSRC_UPD_DEL_data_rs.getString("OCN_INITIALIZE_FLAG");
        var CONFSRC_UPD_DEL_data_result={"CONFSRC_UPD_DEL_id":CONFSRC_UPD_DEL_id,"CONFSRC_UPD_DEL_data":CONFSRC_UPD_DEL_data,"CONFSRC_UPD_DEL_userstamp":CONFSRC_UPD_DEL_userstamp,"CONFSRC_UPD_DEL_timestamp":CONFSRC_UPD_DEL_timestamp,"CONFSRC_UPD_DEL_flag":CONFSRC_UPD_DEL_flag}; 
        CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_data_result);
      }
      CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_parentFunction);
      CONFSRC_UPD_DEL_data_rs.close();
    }  
    /*-------------------------------CODING TO RETRIEVE FROM RENTAL_CONFIGURATION TABLE---------------------------------------------*/  
    if(CONFSRC_UPD_DEL_profile==4)
    {    
      var CONFSRC_UPD_DEL_select_data = "SELECT PCN.PCN_ID,PCN.PCN_DATA,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(PCN.PCN_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,PCN.PCN_INITIALIZE_FLAG FROM PAYMENT_CONFIGURATION PCN,CONFIGURATION C,CONFIGURATION_PROFILE CP ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=PCN.ULD_ID AND  CP.CNP_ID="+CONFSRC_UPD_DEL_profile+" AND PCN.CGN_ID=C.CGN_ID AND C.CGN_TYPE= '"+configuration_types+"' ORDER BY PCN.PCN_DATA ASC";
      var CONFSRC_UPD_DEL_data_rs = CONFSRC_UPD_DEL_types_stmt.executeQuery(CONFSRC_UPD_DEL_select_data);
      while(CONFSRC_UPD_DEL_data_rs.next())
      {
        var CONFSRC_UPD_DEL_id = CONFSRC_UPD_DEL_data_rs.getString("PCN_ID");
        var CONFSRC_UPD_DEL_data = CONFSRC_UPD_DEL_data_rs.getString("PCN_DATA");
        var CONFSRC_UPD_DEL_userstamp = CONFSRC_UPD_DEL_data_rs.getString("ULD_LOGINID");
        var CONFSRC_UPD_DEL_timestamp = CONFSRC_UPD_DEL_data_rs.getString("TIMESTAMP");
        var CONFSRC_UPD_DEL_flag = CONFSRC_UPD_DEL_data_rs.getString("PCN_INITIALIZE_FLAG");
        var CONFSRC_UPD_DEL_data_result={"CONFSRC_UPD_DEL_id":CONFSRC_UPD_DEL_id,"CONFSRC_UPD_DEL_data":CONFSRC_UPD_DEL_data,"CONFSRC_UPD_DEL_userstamp":CONFSRC_UPD_DEL_userstamp,"CONFSRC_UPD_DEL_timestamp":CONFSRC_UPD_DEL_timestamp,"CONFSRC_UPD_DEL_flag":CONFSRC_UPD_DEL_flag}; 
        CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_data_result);
      }
      CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_parentFunction);
      CONFSRC_UPD_DEL_data_rs.close();
    }
    /*-------------------------------CODING TO RETRIEVE FROM TRIGGER_CONFIGURATION TABLE----------------------------------------------------*/ 
    if(CONFSRC_UPD_DEL_profile==9)
    {
      var CONFSRC_UPD_DEL_select_data = "SELECT TC.TC_ID,TC.TC_DATA,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(TC.TC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,TC.TC_INITIALIZE_FLAG FROM TRIGGER_CONFIGURATION TC,CONFIGURATION C,CONFIGURATION_PROFILE CP ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=TC.ULD_ID AND CP.CNP_ID="+CONFSRC_UPD_DEL_profile+" AND TC.CGN_ID=C.CGN_ID AND C.CGN_TYPE= '"+configuration_types+"' ORDER BY TC.TC_DATA ASC";
      var CONFSRC_UPD_DEL_data_rs = CONFSRC_UPD_DEL_types_stmt.executeQuery(CONFSRC_UPD_DEL_select_data);
      while(CONFSRC_UPD_DEL_data_rs.next())
      {        
        var CONFSRC_UPD_DEL_id = CONFSRC_UPD_DEL_data_rs.getString("TC_ID");
        var CONFSRC_UPD_DEL_data = CONFSRC_UPD_DEL_data_rs.getString("TC_DATA");
        var CONFSRC_UPD_DEL_userstamp = CONFSRC_UPD_DEL_data_rs.getString("ULD_LOGINID");
        var CONFSRC_UPD_DEL_timestamp = CONFSRC_UPD_DEL_data_rs.getString("TIMESTAMP");
        var CONFSRC_UPD_DEL_flag = CONFSRC_UPD_DEL_data_rs.getString("TC_INITIALIZE_FLAG");
        var CONFSRC_UPD_DEL_data_result={"CONFSRC_UPD_DEL_id":CONFSRC_UPD_DEL_id,"CONFSRC_UPD_DEL_data":CONFSRC_UPD_DEL_data,"CONFSRC_UPD_DEL_userstamp":CONFSRC_UPD_DEL_userstamp,"CONFSRC_UPD_DEL_timestamp":CONFSRC_UPD_DEL_timestamp,"CONFSRC_UPD_DEL_flag":CONFSRC_UPD_DEL_flag}; 
        CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_data_result);
      }
      CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_parentFunction);
      CONFSRC_UPD_DEL_data_rs.close();
    }  
    /*-------------------------------CODING TO RETRIEVE FROM UNIT_CONFIGURATION TABLE-------------------------------------------------*/ 
    if(CONFSRC_UPD_DEL_profile==2)
    {     
      var CONFSRC_UPD_DEL_select_data = "SELECT UCN.UCN_ID,UCN.UCN_DATA,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(UCN.UCN_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,UCN.UCN_INITIALIZE_FLAG FROM UNIT_CONFIGURATION UCN,CONFIGURATION C,CONFIGURATION_PROFILE CP ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=UCN.ULD_ID AND CP.CNP_ID="+CONFSRC_UPD_DEL_profile+" AND UCN.CGN_ID=C.CGN_ID AND C.CGN_TYPE= '"+configuration_types+"' ORDER BY UCN.UCN_DATA ASC";
      var CONFSRC_UPD_DEL_data_rs = CONFSRC_UPD_DEL_types_stmt.executeQuery(CONFSRC_UPD_DEL_select_data);
      while(CONFSRC_UPD_DEL_data_rs.next())
      {        
        var CONFSRC_UPD_DEL_id = CONFSRC_UPD_DEL_data_rs.getString("UCN_ID");
        var CONFSRC_UPD_DEL_data = CONFSRC_UPD_DEL_data_rs.getString("UCN_DATA");
        var CONFSRC_UPD_DEL_userstamp = CONFSRC_UPD_DEL_data_rs.getString("ULD_LOGINID");
        var CONFSRC_UPD_DEL_timestamp = CONFSRC_UPD_DEL_data_rs.getString("TIMESTAMP");
        var CONFSRC_UPD_DEL_flag = CONFSRC_UPD_DEL_data_rs.getString("UCN_INITIALIZE_FLAG");
        var CONFSRC_UPD_DEL_data_result={"CONFSRC_UPD_DEL_id":CONFSRC_UPD_DEL_id,"CONFSRC_UPD_DEL_data":CONFSRC_UPD_DEL_data,"CONFSRC_UPD_DEL_userstamp":CONFSRC_UPD_DEL_userstamp,"CONFSRC_UPD_DEL_timestamp":CONFSRC_UPD_DEL_timestamp,"CONFSRC_UPD_DEL_flag":CONFSRC_UPD_DEL_flag}; 
        CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_data_result);
      }
      CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_parentFunction);
      CONFSRC_UPD_DEL_data_rs.close();
    }
    /*------------------------------CODING TO RETRIEVE FROM BANKTT_CONFIGURATION TABLE-------------------------------------*/ 
    if(CONFSRC_UPD_DEL_profile==11)
    {
      var CONFSRC_UPD_DEL_select_data = "SELECT BC.BCN_ID,BC.BCN_DATA,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(BC.BCN_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,BC.BCN_INITIALIZE_FLAG FROM BANKTT_CONFIGURATION BC,CONFIGURATION C,CONFIGURATION_PROFILE CP ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=BC.ULD_ID AND  CP.CNP_ID="+CONFSRC_UPD_DEL_profile+" AND BC.CGN_ID=C.CGN_ID AND C.CGN_TYPE= '"+configuration_types+"' ORDER BY BC.BCN_DATA ASC";
      var CONFSRC_UPD_DEL_data_rs = CONFSRC_UPD_DEL_types_stmt.executeQuery(CONFSRC_UPD_DEL_select_data);
      while(CONFSRC_UPD_DEL_data_rs.next())
      {        
        var CONFSRC_UPD_DEL_id = CONFSRC_UPD_DEL_data_rs.getString("BCN_ID");
        var CONFSRC_UPD_DEL_data = CONFSRC_UPD_DEL_data_rs.getString("BCN_DATA");
        var CONFSRC_UPD_DEL_userstamp = CONFSRC_UPD_DEL_data_rs.getString("ULD_LOGINID");
        var CONFSRC_UPD_DEL_timestamp = CONFSRC_UPD_DEL_data_rs.getString("TIMESTAMP");
        var CONFSRC_UPD_DEL_flag = CONFSRC_UPD_DEL_data_rs.getString("BCN_INITIALIZE_FLAG");
        var CONFSRC_UPD_DEL_data_result={"CONFSRC_UPD_DEL_id":CONFSRC_UPD_DEL_id,"CONFSRC_UPD_DEL_data":CONFSRC_UPD_DEL_data,"CONFSRC_UPD_DEL_userstamp":CONFSRC_UPD_DEL_userstamp,"CONFSRC_UPD_DEL_timestamp":CONFSRC_UPD_DEL_timestamp,"CONFSRC_UPD_DEL_flag":CONFSRC_UPD_DEL_flag}; 
        CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_data_result);
      }
      CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_parentFunction);
      CONFSRC_UPD_DEL_data_rs.close();
    }
    /*-------------------------------CODING TO RETRIEVE FROM USER RIGHTS TABLE-------------------------------------------------*/ 
    if(CONFSRC_UPD_DEL_profile==14)
    {        
      var CONFSRC_UPD_DEL_select_data = "SELECT URC.URC_ID,URC.URC_DATA,URC.URC_USERSTAMP,DATE_FORMAT(CONVERT_TZ(URC.URC_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,URC.URC_INITIALIZE_FLAG FROM USER_RIGHTS_CONFIGURATION URC,CONFIGURATION C,CONFIGURATION_PROFILE CP WHERE CP.CNP_ID="+CONFSRC_UPD_DEL_profile+" AND URC.CGN_ID=C.CGN_ID AND C.CGN_TYPE= '"+configuration_types+"' ORDER BY URC.URC_DATA ASC";
      var CONFSRC_UPD_DEL_data_rs = CONFSRC_UPD_DEL_types_stmt.executeQuery(CONFSRC_UPD_DEL_select_data);
      while(CONFSRC_UPD_DEL_data_rs.next())
      {        
        var CONFSRC_UPD_DEL_id = CONFSRC_UPD_DEL_data_rs.getString("URC_ID");
        var CONFSRC_UPD_DEL_data = CONFSRC_UPD_DEL_data_rs.getString("URC_DATA");
        var CONFSRC_UPD_DEL_userstamp = CONFSRC_UPD_DEL_data_rs.getString("URC_USERSTAMP");
        var CONFSRC_UPD_DEL_timestamp = CONFSRC_UPD_DEL_data_rs.getString("TIMESTAMP");
        var CONFSRC_UPD_DEL_flag = CONFSRC_UPD_DEL_data_rs.getString("URC_INITIALIZE_FLAG");
        var CONFSRC_UPD_DEL_data_result={"CONFSRC_UPD_DEL_id":CONFSRC_UPD_DEL_id,"CONFSRC_UPD_DEL_data":CONFSRC_UPD_DEL_data,"CONFSRC_UPD_DEL_userstamp":CONFSRC_UPD_DEL_userstamp,"CONFSRC_UPD_DEL_timestamp":CONFSRC_UPD_DEL_timestamp,"CONFSRC_UPD_DEL_flag":CONFSRC_UPD_DEL_flag}; 
        CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_data_result);
      }
      CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_parentFunction);
      CONFSRC_UPD_DEL_data_rs.close();
    }
    /*------------------------------CODING TO RETRIEVE FROM ERM_CONFIGURATION TABLE-------------------------------------*/ 
    if(CONFSRC_UPD_DEL_profile==15)
    {
      var CONFSRC_UPD_DEL_data_array=[]; 
      var CONFSRC_UPD_DEL_select_data = "SELECT ERM.ERMCN_ID,ERM.ERMCN_DATA,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ERM.ERMCN_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,ERM.ERMCN_INITIALIZE_FLAG FROM ERM_CONFIGURATION ERM,CONFIGURATION C,CONFIGURATION_PROFILE CP ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=ERM.ULD_ID AND  CP.CNP_ID="+CONFSRC_UPD_DEL_profile+" AND ERM.CGN_ID=C.CGN_ID AND C.CGN_TYPE= '"+configuration_types+"' ORDER BY ERM.ERMCN_DATA ASC";
      var CONFSRC_UPD_DEL_data_rs = CONFSRC_UPD_DEL_types_stmt.executeQuery(CONFSRC_UPD_DEL_select_data);
      while(CONFSRC_UPD_DEL_data_rs.next())
      {        
        var CONFSRC_UPD_DEL_id = CONFSRC_UPD_DEL_data_rs.getString("ERMCN_ID");
        var CONFSRC_UPD_DEL_data = CONFSRC_UPD_DEL_data_rs.getString("ERMCN_DATA");
        var CONFSRC_UPD_DEL_userstamp = CONFSRC_UPD_DEL_data_rs.getString("ULD_LOGINID");
        var CONFSRC_UPD_DEL_timestamp = CONFSRC_UPD_DEL_data_rs.getString("TIMESTAMP");
        var CONFSRC_UPD_DEL_flag = CONFSRC_UPD_DEL_data_rs.getString("ERMCN_INITIALIZE_FLAG");
        var CONFSRC_UPD_DEL_data_result={"CONFSRC_UPD_DEL_id":CONFSRC_UPD_DEL_id,"CONFSRC_UPD_DEL_data":CONFSRC_UPD_DEL_data,"CONFSRC_UPD_DEL_userstamp":CONFSRC_UPD_DEL_userstamp,"CONFSRC_UPD_DEL_timestamp":CONFSRC_UPD_DEL_timestamp,"CONFSRC_UPD_DEL_flag":CONFSRC_UPD_DEL_flag}; 
        CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_data_result);
      }
      CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_parentFunction);
      CONFSRC_UPD_DEL_data_rs.close();
    }
    /*------------------------------CODING TO RETRIEVE FROM CHEQUE_CONFIGURATION TABLE-------------------------------------*/ 
    if(CONFSRC_UPD_DEL_profile==16)
    {
      var CONFSRC_UPD_DEL_data_array=[]; 
      var CONFSRC_UPD_DEL_select_data = "SELECT CQCN.CQCN_ID,CQCN.CQCN_DATA,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(CQCN.CQCN_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,CQCN.CQCN_INITIALIZE_FLAG FROM CHEQUE_CONFIGURATION CQCN,CONFIGURATION C,CONFIGURATION_PROFILE CP ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=CQCN.ULD_ID AND  CP.CNP_ID="+CONFSRC_UPD_DEL_profile+" AND CQCN.CGN_ID=C.CGN_ID AND C.CGN_TYPE= '"+configuration_types+"' ORDER BY CQCN.CQCN_DATA ASC";
      var CONFSRC_UPD_DEL_data_rs = CONFSRC_UPD_DEL_types_stmt.executeQuery(CONFSRC_UPD_DEL_select_data);
      while(CONFSRC_UPD_DEL_data_rs.next())
      {        
        var CONFSRC_UPD_DEL_id = CONFSRC_UPD_DEL_data_rs.getString("CQCN_ID");
        var CONFSRC_UPD_DEL_data = CONFSRC_UPD_DEL_data_rs.getString("CQCN_DATA");
        var CONFSRC_UPD_DEL_userstamp = CONFSRC_UPD_DEL_data_rs.getString("ULD_LOGINID");
        var CONFSRC_UPD_DEL_timestamp = CONFSRC_UPD_DEL_data_rs.getString("TIMESTAMP");
        var CONFSRC_UPD_DEL_flag = CONFSRC_UPD_DEL_data_rs.getString("CQCN_INITIALIZE_FLAG");
        var CONFSRC_UPD_DEL_data_result={"CONFSRC_UPD_DEL_id":CONFSRC_UPD_DEL_id,"CONFSRC_UPD_DEL_data":CONFSRC_UPD_DEL_data,"CONFSRC_UPD_DEL_userstamp":CONFSRC_UPD_DEL_userstamp,"CONFSRC_UPD_DEL_timestamp":CONFSRC_UPD_DEL_timestamp,"CONFSRC_UPD_DEL_flag":CONFSRC_UPD_DEL_flag}; 
        CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_data_result);
      }
      CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_parentFunction);
      CONFSRC_UPD_DEL_data_rs.close();
    }
    /*------------------------------CODING TO RETRIEVE FROM REPORT_CONFIGURATION TABLE-------------------------------------*/ 
    if(CONFSRC_UPD_DEL_profile==17)
    {
      var CONFSRC_UPD_DEL_data_array=[]; 
      var CONFSRC_UPD_DEL_select_data = "SELECT RCN.RCN_ID,RCN.RCN_DATA,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(RCN.RCN_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP,RCN.RCN_INITIALIZE_FLAG FROM REPORT_CONFIGURATION RCN,CONFIGURATION C,CONFIGURATION_PROFILE CP ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=RCN.ULD_ID AND  CP.CNP_ID="+CONFSRC_UPD_DEL_profile+" AND RCN.CGN_ID=C.CGN_ID AND C.CGN_TYPE= '"+configuration_types+"' ORDER BY RCN.RCN_DATA ASC";
      var CONFSRC_UPD_DEL_data_rs = CONFSRC_UPD_DEL_types_stmt.executeQuery(CONFSRC_UPD_DEL_select_data);
      while(CONFSRC_UPD_DEL_data_rs.next())
      {        
        var CONFSRC_UPD_DEL_id = CONFSRC_UPD_DEL_data_rs.getString("RCN_ID");
        var CONFSRC_UPD_DEL_data = CONFSRC_UPD_DEL_data_rs.getString("RCN_DATA");
        var CONFSRC_UPD_DEL_userstamp = CONFSRC_UPD_DEL_data_rs.getString("ULD_LOGINID");
        var CONFSRC_UPD_DEL_timestamp = CONFSRC_UPD_DEL_data_rs.getString("TIMESTAMP");
        var CONFSRC_UPD_DEL_flag = CONFSRC_UPD_DEL_data_rs.getString("RCN_INITIALIZE_FLAG");
        var CONFSRC_UPD_DEL_data_result={"CONFSRC_UPD_DEL_id":CONFSRC_UPD_DEL_id,"CONFSRC_UPD_DEL_data":CONFSRC_UPD_DEL_data,"CONFSRC_UPD_DEL_userstamp":CONFSRC_UPD_DEL_userstamp,"CONFSRC_UPD_DEL_timestamp":CONFSRC_UPD_DEL_timestamp,"CONFSRC_UPD_DEL_flag":CONFSRC_UPD_DEL_flag}; 
        CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_data_result);
      }
      CONFSRC_UPD_DEL_data_array.push(CONFSRC_UPD_DEL_parentFunction);
      CONFSRC_UPD_DEL_data_rs.close();
    }
    CONFSRC_UPD_DEL_types_stmt.close(); 
    CONFSRC_UPD_DEL_conn.close();
    return [CONFSRC_UPD_DEL_data_array,CONFSRC_UPD_DEL_flagdd];
  }
  /*----------------------------------------FUNCTION TO RETRIEVE TABLE ID AND MAXIMUM OF PRIMAY ID-------------------------------*/
  function CONFSRC_UPD_DEL_gettablename(CONFSRC_UPD_DEL_selProfile){
    var CONFSRC_UPD_DEL_twodimen={3:['CCN_ID','CUSTOMER_CONFIGURATION','CCN_DATA',25,[2,3,5]],5:['ACN_ID','ACCESS_CONFIGURATION','ACN_DATA',28],
                                  8:['DDC_ID','DEPOSIT_DEDUCTION_CONFIGURATION','DDC_DATA',31,1],7:['ECN_ID','EXPENSE_CONFIGURATION','ECN_DATA',30],
                                  10:['NC_ID','NATIONALITY_CONFIGURATION','NC_DATA',34],6:['OCN_ID','OCBC_CONFIGURATION','OCN_DATA',29,4],
                                  4:['PCN_ID','PAYMENT_CONFIGURATION','PCN_DATA',27,6],9:['TC_ID','TRIGGER_CONFIGURATION','TC_DATA',33],
                                  2:['UCN_ID','UNIT_CONFIGURATION','UCN_DATA',26],14:['URC_ID','USER_RIGHTS_CONFIGURATION','URC_DATA',35],
                                  11:['BCN_ID','BANKTT_CONFIGURATION','BCN_DATA',37],15:['ERMCN_ID','ERM_CONFIGURATION','ERMCN_DATA',36],
                                  16:['CQCN_ID','CHEQUE_CONFIGURATION','CQCN_DATA',38],17:['RCN_ID','REPORT_CONFIGURATION','RCN_DATA',89,7]                                      
                                 }
    return [CONFSRC_UPD_DEL_twodimen[CONFSRC_UPD_DEL_selProfile][3],CONFSRC_UPD_DEL_twodimen[CONFSRC_UPD_DEL_selProfile][1],CONFSRC_UPD_DEL_twodimen[CONFSRC_UPD_DEL_selProfile][2],CONFSRC_UPD_DEL_twodimen[CONFSRC_UPD_DEL_selProfile][0],CONFSRC_UPD_DEL_twodimen[CONFSRC_UPD_DEL_selProfile][4]]}    
  /*------------------------------------------FUNCTION FOR INSERT THE CONFIGURATION_ENTRY FORM--------------------------*/
  function CONFSRC_UPD_DEL_updateData(CONFSRC_UPD_DEL_selProfile,CONFSRC_UPD_DEL_updateData,CONFSRC_UPD_DEL_tb_UpdSubtype,CONFSRC_UPD_DEL_dataId,CONFSRC_UPD_DEL_lbType,CONFSRC_UPD_DEL_flagData,CONFSRC_UPD_DEL_lb_Typeid,CONFSCR_UPD_DEL_data){
    try{
      var CONFSRC_UPD_DEL_conn =eilib.db_GetConnection();
      CONFSRC_UPD_DEL_conn.setAutoCommit(false);
      var CONFSRC_UPD_DEL_arr_data=[]
      var CONFSRC_UPD_DEL_detailsData=CONFSRC_UPD_DEL_gettablename(CONFSRC_UPD_DEL_selProfile)
      /*-----------------------CODING TO UPDATE-----------------------------------------*/ 
      var CONFSRC_UPD_DEL_stmt_ = CONFSRC_UPD_DEL_conn.createStatement();
      if(CONFSRC_UPD_DEL_lb_Typeid!=42)      
        CONFSRC_UPD_DEL_updateData=eilib.ConvertSpclCharString(CONFSRC_UPD_DEL_updateData);
      if(CONFSRC_UPD_DEL_flagData=='CONFSRC_UPD_DEL_checkData')
      {   
        if(CONFSRC_UPD_DEL_lb_Typeid==42)
          var CONFSRC_UPD_DEL_select="SELECT DDC_SUB_DATA FROM DEPOSIT_DEDUCTION_CONFIGURATION ";
        else
          var CONFSRC_UPD_DEL_select="SELECT "+CONFSRC_UPD_DEL_detailsData[2]+" FROM "+CONFSRC_UPD_DEL_detailsData[1]+" CCN WHERE CCN.CGN_ID=(SELECT C.CGN_ID FROM CONFIGURATION C WHERE C.CGN_TYPE='"+CONFSRC_UPD_DEL_lbType+"') ";
        var CONFSRC_UPD_DEL_rs=CONFSRC_UPD_DEL_stmt_.executeQuery(CONFSRC_UPD_DEL_select);
        while(CONFSRC_UPD_DEL_rs.next())
        {
          CONFSRC_UPD_DEL_arr_data.push(CONFSRC_UPD_DEL_rs.getString(1))
        }
        CONFSRC_UPD_DEL_rs.close();  CONFSRC_UPD_DEL_stmt_.close();
        CONFSRC_UPD_DEL_conn.commit();
        CONFSRC_UPD_DEL_conn.close();    
        return CONFSRC_UPD_DEL_arr_data;
      }          
      if(CONFSRC_UPD_DEL_flagData=='CONFSRC_UPD_DEL_updateData')
      { 
        if(CONFSRC_UPD_DEL_lb_Typeid==42)
          var CONFSRC_UPD_DEL_update = "UPDATE DEPOSIT_DEDUCTION_CONFIGURATION SET DDC_DATA="+CONFSRC_UPD_DEL_updateData+",DDC_SUB_DATA='"+CONFSRC_UPD_DEL_tb_UpdSubtype+"',ULD_ID=(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"') WHERE DDC_ID="+CONFSRC_UPD_DEL_dataId+"";
        else if(CONFSRC_UPD_DEL_selProfile==14)
          var CONFSRC_UPD_DEL_update = "UPDATE  "+CONFSRC_UPD_DEL_detailsData[1]+" SET "+CONFSRC_UPD_DEL_detailsData[2]+"='"+CONFSRC_UPD_DEL_updateData+"',URC_USERSTAMP='"+UserStamp+"' WHERE URC_ID="+CONFSRC_UPD_DEL_dataId+"";
        else
          var CONFSRC_UPD_DEL_update = "UPDATE "+CONFSRC_UPD_DEL_detailsData[1]+" SET "+CONFSRC_UPD_DEL_detailsData[2]+"='"+CONFSRC_UPD_DEL_updateData+"',ULD_ID=(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"') WHERE "+CONFSRC_UPD_DEL_detailsData[3]+"="+CONFSRC_UPD_DEL_dataId+"";
        var CONFSRC_UPD_DEL_stmt_customer_execute=CONFSRC_UPD_DEL_stmt_.execute(CONFSRC_UPD_DEL_update);
        var new_data=CONFSRC_UPD_DEL_updateData
        if((CONFSRC_UPD_DEL_dataId==36&&CONFSRC_UPD_DEL_lbType=='CC FOLDER ID')||(CONFSRC_UPD_DEL_dataId==11&&CONFSRC_UPD_DEL_lbType=='CC CONTRACT TEMPLATE ID')||(CONFSRC_UPD_DEL_dataId==10&&CONFSRC_UPD_DEL_lbType=='CC INVOICE TEMPLATE ID')||(CONFSRC_UPD_DEL_dataId==29&&CONFSRC_UPD_DEL_lbType=='REPORT FOLDER ID')||(CONFSRC_UPD_DEL_dataId==1&&CONFSRC_UPD_DEL_lbType=='DEPOSIT CALCULATION FOLDER ID')||(CONFSRC_UPD_DEL_dataId==1&&CONFSRC_UPD_DEL_lbType=='ALIST FOLDER ID')||(CONFSRC_UPD_DEL_dataId==1&&CONFSRC_UPD_DEL_lbType=='OCBC CSV FOLDER ID')){
          if(CONFSRC_UPD_DEL_dataId==11){
            var fp_id=CONFSRC_UPD_DEL_detailsData[4][0];  
            var update_file_profile="UPDATE FILE_PROFILE SET FP_FILE_ID='"+new_data+"' WHERE FP_ID="+fp_id+"";
          }
          else if(CONFSRC_UPD_DEL_dataId==10){
            var fp_id=CONFSRC_UPD_DEL_detailsData[4][1]; 
            var update_file_profile="UPDATE FILE_PROFILE SET FP_FILE_ID='"+new_data+"' WHERE FP_ID="+fp_id+""
          }
          else {
            if(CONFSRC_UPD_DEL_dataId==36){         
              var fp_id=CONFSRC_UPD_DEL_detailsData[4][2];
            }
            else{         
              var fp_id=CONFSRC_UPD_DEL_detailsData[4];
            }
            if(CONFSRC_UPD_DEL_dataId==1&&CONFSRC_UPD_DEL_lbType=='DEPOSIT CALCULATION FOLDER ID')
            {
              var update_file_profile="UPDATE FILE_PROFILE SET FP_FOLDER_ID='"+new_data+"' WHERE FP_FOLDER_ID='"+CONFSCR_UPD_DEL_data+"'";
            }
            else
            {
              var update_file_profile="UPDATE FILE_PROFILE SET FP_FOLDER_ID='"+new_data+"' WHERE FP_ID="+fp_id+"";
            }
          }
          var CONFSRC_UPD_DEL_stmt_FILE_PROFILE_execute=CONFSRC_UPD_DEL_stmt_.execute(update_file_profile);
          var old_file_editors=[];
          var new_file_editors=[];
          var file_type=DriveApp.getFileById(CONFSCR_UPD_DEL_data).getMimeType();
          if(file_type.match('folder')){
            var old_Folder_editor=DocsList.getFolderById(CONFSCR_UPD_DEL_data).getEditors();
          }
          else{            
            var old_Folder_editor=DocsList.getFileById(CONFSCR_UPD_DEL_data).getEditors(); 
          }
          //        var old_Folder_editor=DriveApp.getFileById(CONFSCR_UPD_DEL_data).getEditors();
          for(var l=0;l<old_Folder_editor.length;l++){
            old_file_editors.push(old_Folder_editor[l].getEmail().toLowerCase());
          }  
          DriveApp.getFolderById(new_data).getEditors();
          for(var i=0;i<old_file_editors.length;i++){
            if(old_file_editors[i]==''||old_file_editors[i]==UserStamp)continue;
            var remov_Folder=DriveApp.getFileById(CONFSCR_UPD_DEL_data).removeEditor(old_file_editors[i]);
            var shar_Folder=DriveApp.getFolderById(new_data).addEditor(old_file_editors[i]);
          } 
          DriveApp.getFileById(CONFSCR_UPD_DEL_data).removeEditor(UserStamp);
        }     
        if((CONFSRC_UPD_DEL_detailsData[1]=='USER_RIGHTS_CONFIGURATION')&&(CONFSRC_UPD_DEL_lbType=='SITE LINK')){
          var old_sitelink=SitesApp.getSiteByUrl(CONFSCR_UPD_DEL_data); 
          var new_sitelink=SitesApp.getSiteByUrl(new_data); 
          var viewer=old_sitelink.getViewers();
          for(var j=0;j<viewer.length;j++){       
            old_sitelink.removeViewer(viewer[j]);
            new_sitelink.addViewer(viewer[j]);
          }
        }
        if(((CONFSRC_UPD_DEL_detailsData[1]=='CUSTOMER_CONFIGURATION')&&(CONFSRC_UPD_DEL_lbType=='CALENDER ID'))||((CONFSRC_UPD_DEL_detailsData[1]=='CUSTOMER_CONFIGURATION')&&(CONFSRC_UPD_DEL_lbType=='CALENDER NAME'))){
          var URSRC_loginid_stmt = CONFSRC_UPD_DEL_conn.createStatement();
          var URSRC_loginid_array=[];     
          var URSRC_select_loginid='select * from VW_ACCESS_RIGHTS_TERMINATE_LOGINID ORDER BY ULD_LOGINID'
          var URSRC_loginid_result=URSRC_loginid_stmt.executeQuery(URSRC_select_loginid);
          while(URSRC_loginid_result.next()){
            URSRC_loginid_array.push(URSRC_loginid_result.getString("ULD_LOGINID"));
          } 
          URSRC_loginid_result.close();
          URSRC_loginid_stmt.close();
          if((CONFSRC_UPD_DEL_detailsData[1]=='CUSTOMER_CONFIGURATION')&&(CONFSRC_UPD_DEL_lbType=='CALENDER ID')){
            var CONFSCR_UPD_DEL_data=CONFSCR_UPD_DEL_data;
          }
          else{
            CONFSCR_UPD_DEL_data = CalendarApp.getCalendarsByName(CONFSCR_UPD_DEL_data)[0].getId();  
            new_data=CalendarApp.getCalendarsByName(new_data)[0].getId();
          }
          var oldowncalid=CalendarApp.getOwnedCalendarById(CONFSCR_UPD_DEL_data);
          var newowncalid=CalendarApp.getOwnedCalendarById(new_data);
          for(var k=0;k<URSRC_loginid_array.length;k++){
            if(oldowncalid!=null&&URSRC_loginid_array[k]==UserStamp)continue;
            var acl = {
              scope: {
                type: 'user',
                value:URSRC_loginid_array[k]
              },
              role:'none'
            };
            Calendar.Acl.insert(acl,CONFSCR_UPD_DEL_data);  
          }      
          for(var k=0;k<URSRC_loginid_array.length;k++){
            if(oldowncalid!=null&&URSRC_loginid_array[k]==UserStamp)continue;
            var acl = {
              scope: {
                type: 'user',
                value:URSRC_loginid_array[k]
              },
              role: 'writer'
            };
            Calendar.Acl.insert(acl, new_data);  
          }
        }      
        /*--------------------------------------------REFRESH FORM AFTER UPDATION---------------------------------------------------*/
        var CONFSRC_UPD_DEL_parentFunction="CONFSRC_UPD_DEL_update";
        CONFSRC_UPD_DEL_stmt_.close();
        CONFSRC_UPD_DEL_conn.commit();
        CONFSRC_UPD_DEL_conn.close();    
        var CONFSRC_UPD_DEL_ref= CONFSRC_UPD_DEL_selectData(CONFSRC_UPD_DEL_selProfile,CONFSRC_UPD_DEL_lbType,CONFSRC_UPD_DEL_parentFunction,'CONFSRC_UPD_DEL_flagupdate');
        return CONFSRC_UPD_DEL_ref;      
      }}
    catch(err){
      CONFSRC_UPD_DEL_conn.rollback();
      CONFSRC_UPD_DEL_conn.close();
      Logger.log("SCRIPT ERROR:"+err);
      return Logger.getLog();
    }
  }
  /*-------------------------------------------DELETE DATA FROM THE TABLE-----------------------------------------------------------------*/
  function CONFSRC_UPD_DEL_deleteData(CONFSRC_UPD_DEL_selProfile,CONFSRC_UPD_DEL_lbType,CONFSRC_UPD_DEL_dataId,CONFSRC_UPD_DEL_UpdData,CONFSRC_UPD_DEL_Updsubdata)
  {
    var CONFSRC_UPD_DEL_tablename=CONFSRC_UPD_DEL_gettablename(CONFSRC_UPD_DEL_selProfile)    
    var CONFSRC_UPD_DEL_conn =eilib.db_GetConnection();
    var CONFSRC_UPD_DEL_flag_delete= eilib.DeleteRecord(CONFSRC_UPD_DEL_conn,CONFSRC_UPD_DEL_tablename[0],CONFSRC_UPD_DEL_dataId)
    var CONFSRC_UPD_DEL_parentFunction='CONFSRC_UPD_DEL_parentFunction_delete';
    var CONFSRC_UPD_DEL_ref= CONFSRC_UPD_DEL_selectData(CONFSRC_UPD_DEL_selProfile,CONFSRC_UPD_DEL_lbType,CONFSRC_UPD_DEL_parentFunction,CONFSRC_UPD_DEL_flag_delete);
    return CONFSRC_UPD_DEL_ref;
    CONFSRC_UPD_DEL_conn.close();
  }
  /*-------------------------------------------CHECKING TRANSACTION-----------------------------------------------------------------*/
  function CONFSRC_UPD_DEL_checktransaction(CONFSRC_UPD_DEL_selProfile,CONFSRC_UPD_DEL_rowid)
  {
    var CONFSRC_UPD_DEL_conn =eilib.db_GetConnection();
    var CONFSRC_UPD_DEL_trans_stmt = CONFSRC_UPD_DEL_conn.createStatement();
    var CONFSRC_UPD_DEL_tablename=CONFSRC_UPD_DEL_gettablename(CONFSRC_UPD_DEL_selProfile)
    var CONFSRC_UPD_DEL_transaction = "CALL SP_CONFIG_CHECK_TRANSACTION("+CONFSRC_UPD_DEL_tablename[0]+","+CONFSRC_UPD_DEL_rowid+",@FLAG)";
    CONFSRC_UPD_DEL_trans_stmt.execute(CONFSRC_UPD_DEL_transaction);
    CONFSRC_UPD_DEL_trans_stmt.close();
    var CONFSRC_UPD_DEL_stmt_flag = CONFSRC_UPD_DEL_conn.createStatement();
    var CONFSRC_UPD_DEL_flag_rs=CONFSRC_UPD_DEL_stmt_flag.executeQuery("SELECT @FLAG");
    while(CONFSRC_UPD_DEL_flag_rs.next())
      var CONFSRC_UPD_DEL_flag_upd=CONFSRC_UPD_DEL_flag_rs.getString("@FLAG");
    CONFSRC_UPD_DEL_flag_rs.close(); CONFSRC_UPD_DEL_stmt_flag.close();
    CONFSRC_UPD_DEL_conn.close();
    return CONFSRC_UPD_DEL_flag_upd;    
  }
}
catch(err)
{
}
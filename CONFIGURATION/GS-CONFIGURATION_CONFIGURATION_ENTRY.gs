//*******************************************FILE DESCRIPTION*********************************************//
//*******************************************CONFIGURATION ENTRY*********************************************//
//DONE BY:SARADAMBAL
//VER 1.2-SD:09/06/2014 ED:12/06/2014,TRACKER NO:689,implemented script for commit and failure function,add trim function  
//VER 1.1-SD:07/06/2014 ED:07/06/2014,TRACKER NO:689,updated new drive link
//VER 1.0-SD:28/05/2014 ED:28/05/2014,TRACKER NO:689,implemented dd amt as 3 digit
//VER 0.09-SD:06/03/2014 ED:06/03/2014,TRACKER NO:689,reduced coding and implemented array concept for already exists data
//VER 0.08-SD:11/02/2014 ED:15/02/2014,TRACKER NO:689,implemented eilib function for errormsg and special character for data,implemented script flag for whether the data are inserted or not,again checked all configuration,included one function to retrieve tableid 
//VER 0.07-SD:13/01/2014 ED:20/01/2014,TRACKER NO:689,remove uppercase for folder ids,include uppercase for some other data,creating textbox through jquery not html for data,changed h3 tag
//VER 0.06-SD:28/12/2013 ED:07/01/2014,TRACKER NO:689,changed form alignment tag & userstamp syntax,included hidden textbox for dd amt,done amt validation while save btn validation,included report configuration data
//VER 0.05-SD:10/12/2013 ED:10/12/2013,updated failure function
//VER 0.04-SD:08/11/2013 ED:14/11/2013,updated sub type for deposit deduction,already exists for sub type,remove module name which are not having type,implemented validation for save button,updated primary id instead of using data
//VER 0.03-SD:08/10/2013 ED:08/10/2013,updated head tag links & implement return function
//VER 0.02-SD:28/09/2013 ED:30/09/2013,updated eilib connection,message box,preloader,removed scriplet,change table name for payment
//VER 0.01-INITIAL VERSION, TRACKER NO:271,SD:31/07/2013,ED:21/8/2013
try{
  /*---------------------------------FETCH THE ERROR MESSAGE AND LOAD MODULE NAME -------------------------------------------------------------------------------*/
  function CONF_ENTRY_module_errormsg()
  {
    var CONF_ENTRY_conn =eilib.db_GetConnection();
    var CONF_ENTRY_stmt = CONF_ENTRY_conn.createStatement();
    var CONF_ENTRY_module_name_array =[];
    var CONF_ENTRY_select_module_name = "SELECT * FROM CONFIGURATION_PROFILE WHERE CNP_ID NOT IN (12,13,6,14,1) ORDER BY CNP_DATA ASC"; 
    var CONF_ENTRY_module_name_rs = CONF_ENTRY_stmt.executeQuery(CONF_ENTRY_select_module_name);
    while(CONF_ENTRY_module_name_rs.next())
    { var CONF_ENTRY_module_id = CONF_ENTRY_module_name_rs.getString(1);
     var CONF_ENTRY_module_data = CONF_ENTRY_module_name_rs.getString(2);
     var CONF_ENTRY_module_object={"CONF_ENTRY_module_id":CONF_ENTRY_module_id,"CONF_ENTRY_module_data":CONF_ENTRY_module_data};
     CONF_ENTRY_module_name_array.push(CONF_ENTRY_module_object);
    }
    CONF_ENTRY_module_name_rs.close();CONF_ENTRY_stmt.close();
    var CONF_ENTRY_errorMsg_array =  eilib.GetErrorMessageList(CONF_ENTRY_conn,'277,287,289,320,400');
    var CONF_ENTRY_result={"CONF_ENTRY_module":CONF_ENTRY_module_name_array,"CONF_ENTRY_errormsg":CONF_ENTRY_errorMsg_array.errormsg}
    CONF_ENTRY_conn.close();
    return CONF_ENTRY_result;
  }
  /*-------------------------------GET THE CGN_ID FROM CONFIGURATION USING CNP_DATA (PROFILE NAME) & RETURN TYPES OF THE MODULE----------------------------------*/
  function CONF_ENTRY_selectModule(CONF_ENTRY_profileName)
  {
    var CONF_ENTRY_conn =eilib.db_GetConnection();
    var CONF_ENTRY_types_stmt = CONF_ENTRY_conn.createStatement();
    var CONF_ENTRY_types_array=[];
    var CONF_ENTRY_select_types = "SELECT * FROM CONFIGURATION WHERE CNP_ID="+CONF_ENTRY_profileName+" AND (CGN_NON_IP_FLAG is null) ORDER BY CGN_TYPE ASC ";
    var CONF_ENTRY_types_rs = CONF_ENTRY_types_stmt.executeQuery(CONF_ENTRY_select_types);
    while(CONF_ENTRY_types_rs.next())
    {
      var CONF_ENTRY_type_id = CONF_ENTRY_types_rs.getString(1);
      var CONF_ENTRY_type_data = CONF_ENTRY_types_rs.getString(3);
      var CONF_ENTRY_types_object={"CONF_ENTRY_type_id":CONF_ENTRY_type_id,"CONF_ENTRY_type_data":CONF_ENTRY_type_data};
      CONF_ENTRY_types_array.push(CONF_ENTRY_types_object);
    }
    CONF_ENTRY_types_rs.close();
    CONF_ENTRY_types_stmt.close(); 
    CONF_ENTRY_conn.close();
    return CONF_ENTRY_types_array;
  }
  /*--------------------------------------FUNCTION TO CHECK WHETHER THE DATA INSERTED OR NOT---------------------------------------*/
  function CONF_ENTRY_getmaxprimaryid(CONF_ENTRY_profile_names){
    var CONF_ENTRY_conn =eilib.db_GetConnection();
    var CONF_ENTRY_twodim_details=CONF_ENTRY_twodimdata(CONF_ENTRY_profile_names)
    var CONF_ENTRY_stmt_primaryid = CONF_ENTRY_conn.createStatement();
    var CONF_ENTRY_select="SELECT MAX("+CONF_ENTRY_twodim_details[0]+") AS PRIMARY_ID FROM "+CONF_ENTRY_twodim_details[1]+"";
    var CONF_ENTRY_rs_primaryid=CONF_ENTRY_stmt_primaryid.executeQuery(CONF_ENTRY_select);
    while(CONF_ENTRY_rs_primaryid.next())
      var CONF_ENTRY_primaryid=CONF_ENTRY_rs_primaryid.getString("PRIMARY_ID");
    CONF_ENTRY_rs_primaryid.close();CONF_ENTRY_stmt_primaryid.close();
    CONF_ENTRY_conn.close();
    return CONF_ENTRY_primaryid;        
  }
  /*------------------------------------------FUNCTION FOR TWO DIMENSION ARRAY----------------------------------------------*/
  function CONF_ENTRY_twodimdata(CONF_ENTRY_profileName){
    var CONF_ENTRY_twodimen={3:['CCN_ID','CUSTOMER_CONFIGURATION','CCN_DATA','CCN_DATA'],5:['ACN_ID','ACCESS_CONFIGURATION','ACN_DATA'],
                             8:['DDC_ID','DEPOSIT_DEDUCTION_CONFIGURATION','DDC_DATA'],7:['ECN_ID','EXPENSE_CONFIGURATION','ECN_DATA'],
                             10:['NC_ID','NATIONALITY_CONFIGURATION','NC_DATA'],6:['OCN_ID','OCBC_CONFIGURATION','OCN_DATA'],
                             4:['PCN_ID','PAYMENT_CONFIGURATION','PCN_DATA'],9:['TC_ID','TRIGGER_CONFIGURATION','TC_DATA'],
                             2:['UCN_ID','UNIT_CONFIGURATION','UCN_DATA'],14:['URC_ID','USER_RIGHTS_CONFIGURATION','URC_DATA'],
                             11:['BCN_ID','BANKTT_CONFIGURATION','BCN_DATA'],15:['ERMCN_ID','ERM_CONFIGURATION','ERMCN_DATA'],
                             16:['CQCN_ID','CHEQUE_CONFIGURATION','CQCN_DATA'],17:['RCN_ID','REPORT_CONFIGURATION','RCN_DATA']                                      
                            }
    return [CONF_ENTRY_twodimen[CONF_ENTRY_profileName][0],CONF_ENTRY_twodimen[CONF_ENTRY_profileName][1],CONF_ENTRY_twodimen[CONF_ENTRY_profileName][2]]
  }
  /*------------------------------------------FUNCTION FOR INSERT THE CONFIGURATION_ENTRY FORM--------------------------*/
  function CONF_ENTRY_save(CONF_ENTRY_profileName,CONF_ENTRY_types,CONF_ENTRY_data,CONF_ENTRY_flag,CONF_ENTRY_subtype_dd,CONF_ENTRY_typesid){
    var CONF_ENTRY_conn =eilib.db_GetConnection();
    CONF_ENTRY_conn.setAutoCommit(false);
    var CONF_ENTRY_arr_data=[]
    var configuration_types = CONF_ENTRY_types;
    var CONF_ENTRY_profile_names = CONF_ENTRY_profileName;
    var CONF_ENTRY_twodim_details=CONF_ENTRY_twodimdata(CONF_ENTRY_profileName);
    /*-----------------------CODING TO SAVE IN REQUIRED CONFIGURATION TABLE-----------------------------------------*/ 
    var CONF_ENTRY_stmt_customer = CONF_ENTRY_conn.createStatement();
    if(CONF_ENTRY_flag=='CONF_ENTRY_flagdata')
    {   
      if(CONF_ENTRY_typesid==42)
        var CONF_ENTRY_select="SELECT DDC_SUB_DATA FROM DEPOSIT_DEDUCTION_CONFIGURATION ";
      else
        var CONF_ENTRY_select="SELECT "+CONF_ENTRY_twodim_details[2]+" FROM "+CONF_ENTRY_twodim_details[1]+" CCN WHERE CCN.CGN_ID=(SELECT C.CGN_ID FROM CONFIGURATION C WHERE C.CGN_TYPE='"+CONF_ENTRY_types+"') ";
      var CONF_ENTRY_rs=CONF_ENTRY_stmt_customer.executeQuery(CONF_ENTRY_select);
      while(CONF_ENTRY_rs.next())
      {
        CONF_ENTRY_arr_data.push(CONF_ENTRY_rs.getString(1));
      }
      CONF_ENTRY_rs.close();  CONF_ENTRY_stmt_customer.close();
    }          
    if(CONF_ENTRY_flag=='CONF_ENTRY_flagsave')
    {   
      CONF_ENTRY_data=eilib.ConvertSpclCharString(CONF_ENTRY_data);
      var CONF_ENTRY_primaryid_before=CONF_ENTRY_getmaxprimaryid(CONF_ENTRY_profile_names) ;   
      if(CONF_ENTRY_typesid==42)
        var CONF_ENTRY_insert = "INSERT INTO DEPOSIT_DEDUCTION_CONFIGURATION(CGN_ID,DDC_DATA,DDC_SUB_DATA,ULD_ID) VALUES("+CONF_ENTRY_typesid+",'"+CONF_ENTRY_data+"','"+CONF_ENTRY_subtype_dd+"',(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'))";
      else
        var CONF_ENTRY_insert= "INSERT INTO "+CONF_ENTRY_twodim_details[1]+"(CGN_ID,"+CONF_ENTRY_twodim_details[2]+",ULD_ID) VALUES("+CONF_ENTRY_typesid+",'"+CONF_ENTRY_data+"',(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'))";      
      var CONF_ENTRY_stmt_customer_execute=CONF_ENTRY_stmt_customer.execute(CONF_ENTRY_insert);
      CONF_ENTRY_stmt_customer.close();
      CONF_ENTRY_conn.commit();
      CONF_ENTRY_conn.close();
      var CONF_ENTRY_primaryid_after=CONF_ENTRY_getmaxprimaryid(CONF_ENTRY_profile_names)
      if(CONF_ENTRY_primaryid_before<CONF_ENTRY_primaryid_after)
        CONF_ENTRY_arr_data=true;
      else
        CONF_ENTRY_arr_data=false;
    }     
    return CONF_ENTRY_arr_data;
  }
}
catch(err)
{
}
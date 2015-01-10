//*******************************************FILE DESCRIPTION*********************************************//
//************************************************BIZ EXPENSE DETAIL:SEARCH/UPDATE/DELETE********************************************//
//DONE BY:SARADAMBAL
//VER 0.08 -SD:21/06/2014 ED:21/06/2014,TRACKER NO:469,updated class for comments to trim the values,updated failure function and commit, and err msg if any issue in calendar ,removed arr concept for already exists data and implement script for already exist from db
//VER 0.07 -SD:07/06/2014 ED:07/06/2014,TRACKER NO:469,updated new link
//VER 0.06-SD:10/03/2014 ED:10/03/2014,TRACKER NO:469,changed preloader for int
//VER 0.05-SD:06/03/2014 ED:08/03/2014,TRACKER NO:469,implemented array concept to reduced query and using twodimension to reduced coding,removed eilib function for aircon serviced by ,using array to check the already exists data
//VER 0.04-SD:17/02/2014 ED:17/02/2014,TRACKER NO:469,implemented eilib for errormsg,and special character for general data,implemented sp for deletion and implemented script for update whether the data is update or not,implmented keypress event for search by comments,implemented one function to get primary id,reduced script using array 
//VER 0.03-SD:30/12/2013 ED:30/12/2013,TRACKER NO:469,removed utilities function,implement connection open & close function for eilib function,changed alignment for form title
//VER 0.02-SD:20/11/2013 ED:02/12/2013,TRACKER NO:469,updated primary id instead of using data,implemented update validation to checking old values new values,implemented calendar event fro creation,deletion,,change name for addtnl channel,implemented failure function,Implemented date validation for sdate & edate
//VER 0.01-INITIAL VERSION,TRACKER NO:469,SD:13/09/2013,ED:08/10/2013
//*********************************************************************************************************//
try{
  /*----------------------------------------FUNCTION TO GET EXPENSE TYPES ------------------------------------------------------------*/
  function BTDTL_SEARCH_expensetypes()
  {
    var BTDTL_SEARCH_conn =eilib.db_GetConnection();
    var BTDTL_SEARCH_stmt = BTDTL_SEARCH_conn.createStatement();
    var BTDTL_SEARCH_bizdetail_search_expense_type_query = "SELECT ECN_ID,ECN_DATA FROM EXPENSE_CONFIGURATION WHERE  ECN_ID IN(16,17,15,13,14,196,19,20,21,193,194,100,101,195,102,103,106,107,108,109,104,105,110,111,112,113,114,115,116,117,118,119,120,121,122,123,191,200) ORDER BY ECN_DATA ASC";
    var BTDTL_SEARCH_expensetype_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_bizdetail_search_expense_type_query);
    var BTDTL_SEARCH_expense_type_array = []; 
    var BTDTL_SEARCH_arr_invoiceto=[];
    var BTDTL_SEARCH_arr_starhubid=[];  var BTDTL_SEARCH_aircon_configmon=[];  
    while(BTDTL_SEARCH_expensetype_rs.next())
    {if((BTDTL_SEARCH_expensetype_rs.getString(1)==196)||(BTDTL_SEARCH_expensetype_rs.getString(1)==200))
    BTDTL_SEARCH_aircon_configmon.push(BTDTL_SEARCH_expensetype_rs.getString(2));
     else if((BTDTL_SEARCH_expensetype_rs.getString(1)==19)||(BTDTL_SEARCH_expensetype_rs.getString(1)==20)||(BTDTL_SEARCH_expensetype_rs.getString(1)==21))
     BTDTL_SEARCH_arr_invoiceto.push({"BTDTL_SEARCH_expensetypes_id":BTDTL_SEARCH_expensetype_rs.getString(1),"BTDTL_SEARCH_expensetypes_data":BTDTL_SEARCH_expensetype_rs.getString(2)})
     else if((BTDTL_SEARCH_expensetype_rs.getString(1)==193)||(BTDTL_SEARCH_expensetype_rs.getString(1)==194))
     BTDTL_SEARCH_arr_starhubid.push(BTDTL_SEARCH_expensetype_rs.getString(2))
     else{
       var BTDTL_SEARCH_expensetypes_id = BTDTL_SEARCH_expensetype_rs.getString(1);
       var BTDTL_SEARCH_expensetypes_data = BTDTL_SEARCH_expensetype_rs.getString(2);
       var BTDTL_SEARCH_expensetypes_object={"BTDTL_SEARCH_expensetypes_id":BTDTL_SEARCH_expensetypes_id,"BTDTL_SEARCH_expensetypes_data":BTDTL_SEARCH_expensetypes_data};
       BTDTL_SEARCH_expense_type_array.push(BTDTL_SEARCH_expensetypes_object);
     }}
    BTDTL_SEARCH_expensetype_rs.close(); BTDTL_SEARCH_stmt.close();
    var BTDTL_SEARCH_stmt_err = BTDTL_SEARCH_conn.createStatement();
    var BTDTL_SEARCH_errormsg_array = eilib.GetErrorMessageList(BTDTL_SEARCH_conn,'1,2,224,174,18,176,236,184,180,182,179,185,197,199,195,191,201,200,203,202,178,193,189,187,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,107,106,170,175,177,181,183,186,188,190,192,194,196,198,103,315,204,205,206,207,208,335,369,401,458')
    var BTDTL_SEARCH_notable_flag=false;
    var BTDTL_SEARCH_stmt_unit = BTDTL_SEARCH_conn.createStatement();
    var BTDTL_SEARCH_notable_select = "SELECT UNIT_ID FROM EXPENSE_DETAIL_STARHUB UNION SELECT UNIT_ID FROM  EXPENSE_DETAIL_ELECTRICITY UNION SELECT UNIT_ID FROM EXPENSE_DETAIL_DIGITAL_VOICE UNION SELECT UNIT_ID FROM EXPENSE_DETAIL_AIRCON_SERVICE UNION SELECT UNIT_ID FROM EXPENSE_DETAIL_CARPARK";
    var BTDTL_SEARCH_notable_rs = BTDTL_SEARCH_stmt_unit.executeQuery(BTDTL_SEARCH_notable_select);
    while(BTDTL_SEARCH_notable_rs.next())
    {
      BTDTL_SEARCH_notable_flag=true;
    }
    BTDTL_SEARCH_notable_rs.close(); BTDTL_SEARCH_stmt_unit.close(); 
    var BTDTL_SEARCH_flag_aircon=false; var BTDTL_SEARCH_flag_carpark=false;var BTDTL_SEARCH_flag_digital=false; var BTDTL_SEARCH_flag_electricity=false; var BTDTL_SEARCH_flag_starhub=false;
    var BTDTL_SEARCH_select_flag = "SELECT EDAS_ID FROM EXPENSE_DETAIL_AIRCON_SERVICE"; 
    var BTDTL_SEARCH_stmt_detail= BTDTL_SEARCH_conn.createStatement();
    var BTDTL_SEARCH_rs_detail = BTDTL_SEARCH_stmt_detail.executeQuery(BTDTL_SEARCH_select_flag);
    while(BTDTL_SEARCH_rs_detail.next())
      BTDTL_SEARCH_flag_aircon=true
      BTDTL_SEARCH_rs_detail.close(); BTDTL_SEARCH_stmt_detail.close();
    var BTDTL_SEARCH_select_flag = "SELECT EDCP_ID FROM EXPENSE_DETAIL_CARPARK"; 
    var BTDTL_SEARCH_stmt_detail= BTDTL_SEARCH_conn.createStatement();
    var BTDTL_SEARCH_rs_detail = BTDTL_SEARCH_stmt_detail.executeQuery(BTDTL_SEARCH_select_flag);
    while(BTDTL_SEARCH_rs_detail.next())
      BTDTL_SEARCH_flag_carpark=true
      BTDTL_SEARCH_rs_detail.close(); BTDTL_SEARCH_stmt_detail.close();
    var BTDTL_SEARCH_select_flag = "SELECT EDE_ID FROM EXPENSE_DETAIL_ELECTRICITY"; 
    var BTDTL_SEARCH_stmt_detail= BTDTL_SEARCH_conn.createStatement();
    var BTDTL_SEARCH_rs_detail = BTDTL_SEARCH_stmt_detail.executeQuery(BTDTL_SEARCH_select_flag);
    while(BTDTL_SEARCH_rs_detail.next())
      BTDTL_SEARCH_flag_electricity=true
      BTDTL_SEARCH_rs_detail.close(); BTDTL_SEARCH_stmt_detail.close();
    var BTDTL_SEARCH_select_flag = "SELECT EDDV_ID FROM EXPENSE_DETAIL_DIGITAL_VOICE"; 
    var BTDTL_SEARCH_stmt_detail= BTDTL_SEARCH_conn.createStatement();
    var BTDTL_SEARCH_rs_detail = BTDTL_SEARCH_stmt_detail.executeQuery(BTDTL_SEARCH_select_flag);
    while(BTDTL_SEARCH_rs_detail.next())
      BTDTL_SEARCH_flag_digital=true
      BTDTL_SEARCH_rs_detail.close(); BTDTL_SEARCH_stmt_detail.close();
    var BTDTL_SEARCH_select_flag = "SELECT EDSH_ID FROM EXPENSE_DETAIL_STARHUB"; 
    var BTDTL_SEARCH_stmt_detail= BTDTL_SEARCH_conn.createStatement();
    var BTDTL_SEARCH_rs_detail = BTDTL_SEARCH_stmt_detail.executeQuery(BTDTL_SEARCH_select_flag);
    while(BTDTL_SEARCH_rs_detail.next())
      BTDTL_SEARCH_flag_starhub=true
      BTDTL_SEARCH_rs_detail.close(); BTDTL_SEARCH_stmt_detail.close();
    BTDTL_SEARCH_conn.close();
    return {"BTDTL_SEARCH_expense":BTDTL_SEARCH_expense_type_array,"BTDTL_SEARCH_errormsg":BTDTL_SEARCH_errormsg_array.errormsg,"BTDTL_SEARCH_aircon_errmsg":BTDTL_SEARCH_aircon_configmon,"BTDTL_SEARCH_notable_obj":BTDTL_SEARCH_notable_flag,"BTDTL_SEARCH_obj_invoiceto":BTDTL_SEARCH_arr_invoiceto,"BTDTL_SEARCH_obj_starhubid":BTDTL_SEARCH_arr_starhubid,"BTDTL_SEARCH_aircondetail_obj":BTDTL_SEARCH_flag_aircon,"BTDTL_SEARCH_cardetail_obj":BTDTL_SEARCH_flag_carpark,"BTDTL_SEARCH_elecdetail_obj":BTDTL_SEARCH_flag_electricity,"BTDTL_SEARCH_digitaldetail_obj":BTDTL_SEARCH_flag_digital,"BTDTL_SEARCH_stardetail_obj":BTDTL_SEARCH_flag_starhub};
  }
  /*----------------------------------------FUNCTION FOR AUTOCOMPLETE FOR COMMENTS--------------------------------------------*/
  function BTDTL_SEARCH_comments_autocomplete(BTDTL_SEARCH_expense_searchoptions)
  {
    var BTDTL_SEARCH_conn =eilib.db_GetConnection();
    var BTDTL_SEARCH_stmt=BTDTL_SEARCH_conn.createStatement();
    var BTDTL_SEARCH_dataArray=[];
    var BTDTL_SEARCH_twodim_expense={101:['EXPENSE_DETAIL_AIRCON_SERVICE','EDAS_COMMENTS'],103:['EXPENSE_DETAIL_CARPARK','EDCP_COMMENTS'],108:['EXPENSE_DETAIL_DIGITAL_VOICE','EDDV_COMMENTS']
                                     ,104:['EXPENSE_DETAIL_ELECTRICITY','EDE_COMMENTS'],122:['EXPENSE_DETAIL_STARHUB','EDSH_COMMENTS'],110:['EXPENSE_DETAIL_STARHUB','EDSH_ADDTNL_CH'],112:['EXPENSE_DETAIL_STARHUB','EDSH_BASIC_GROUP']}
    var BTDTL_SEARCH_rs = BTDTL_SEARCH_stmt.executeQuery("SELECT "+BTDTL_SEARCH_twodim_expense[BTDTL_SEARCH_expense_searchoptions][1]+" FROM "+BTDTL_SEARCH_twodim_expense[BTDTL_SEARCH_expense_searchoptions][0]+" WHERE UNIT_ID IN(SELECT UNIT_ID FROM VW_ACTIVE_UNIT)");
    while(BTDTL_SEARCH_rs.next()) {
      if(BTDTL_SEARCH_rs.getString(BTDTL_SEARCH_twodim_expense[BTDTL_SEARCH_expense_searchoptions][1])!=null)
        BTDTL_SEARCH_dataArray.push(BTDTL_SEARCH_rs.getString(BTDTL_SEARCH_twodim_expense[BTDTL_SEARCH_expense_searchoptions][1]));
    } BTDTL_SEARCH_rs.close();   
    BTDTL_SEARCH_stmt.close();
    var BTDTL_SEARCH_final_comments={"BTDTL_SEARCH_flag_comments":BTDTL_SEARCH_expense_searchoptions,"BTDTL_SEARCH_searchvalue_comments":BTDTL_SEARCH_dataArray};
    BTDTL_SEARCH_conn.close();
    return BTDTL_SEARCH_final_comments;
  }
  /*---------------------------------FUNCTION FOR SEARCH BY AIRCON,CARPARK,ELECTRICITY,STARHUB,DIGITALVOICE-----------------*/
  function BTDTL_SEARCH_expense_searchby(BTDTL_SEARCH_search_option,BTDTL_SEARCH_expense_types,BTDTL_SEARCH_flag_searchby)
  {   
    var BTDTL_SEARCH_conn =eilib.db_GetConnection();
    var BTDTL_SEARCH_stmt = BTDTL_SEARCH_conn.createStatement();
    var BTDTL_SEARCH_searcharray=[];
    var BTDTL_SEARCH_id=[];
    if(BTDTL_SEARCH_search_option==191)//UNIT NO
    {
      if(BTDTL_SEARCH_expense_types==16)//AIRCON SERVICES
      {
        var BTDTL_SEARCH_airconunitno_selectquery = "SELECT DISTINCT U.UNIT_NO FROM UNIT U,EXPENSE_DETAIL_AIRCON_SERVICE EDAS WHERE (U.UNIT_ID=EDAS.UNIT_ID) ORDER BY U.UNIT_NO ASC";
        var BTDTL_SEARCH_unitno_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_airconunitno_selectquery);     
      }
      else if(BTDTL_SEARCH_expense_types==17)//CARPARK
      {
        var BTDTL_SEARCH_carparkunitno_selectquery = "SELECT UNIT_NO FROM UNIT WHERE UNIT_ID IN (SELECT DISTINCT UNIT_ID FROM EXPENSE_DETAIL_CARPARK) ORDER BY UNIT_NO ASC";
        var BTDTL_SEARCH_unitno_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_carparkunitno_selectquery); 
      }       
      else if(BTDTL_SEARCH_expense_types==15)//DIGITAL VOICE
      {
        var BTDTL_SEARCH_digitalunitno_selectquery = "SELECT UNIT_NO FROM UNIT WHERE UNIT_ID IN (SELECT DISTINCT UNIT_ID FROM EXPENSE_DETAIL_DIGITAL_VOICE) ORDER BY UNIT_NO ASC";
        var BTDTL_SEARCH_unitno_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_digitalunitno_selectquery);     
      }
      else if(BTDTL_SEARCH_expense_types==13)//ELECTRICITY
      {
        var BTDTL_SEARCH_electricityunitno_selectquery = "SELECT UNIT_NO FROM UNIT WHERE UNIT_ID IN (SELECT DISTINCT UNIT_ID FROM EXPENSE_DETAIL_ELECTRICITY) ORDER BY UNIT_NO ASC";
        var BTDTL_SEARCH_unitno_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_electricityunitno_selectquery);       
      }
      else if(BTDTL_SEARCH_expense_types==14)//STARHUB
      {
        var BTDTL_SEARCH_starhubunitno_selectquery = "SELECT UNIT_NO FROM UNIT WHERE UNIT_ID IN (SELECT DISTINCT UNIT_ID FROM EXPENSE_DETAIL_STARHUB) ORDER BY UNIT_NO ASC";
        var BTDTL_SEARCH_unitno_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_starhubunitno_selectquery); 
      }
      while(BTDTL_SEARCH_unitno_rs.next())
      {
        BTDTL_SEARCH_searcharray.push(BTDTL_SEARCH_unitno_rs.getString(1));
      }
      BTDTL_SEARCH_unitno_rs.close();
    }
    else if((BTDTL_SEARCH_search_option==101)||(BTDTL_SEARCH_search_option==108)||(BTDTL_SEARCH_search_option==103)||(BTDTL_SEARCH_search_option==104)||(BTDTL_SEARCH_search_option==122)||(BTDTL_SEARCH_search_option==110)||(BTDTL_SEARCH_search_option==111)||(BTDTL_SEARCH_search_option==112)||(BTDTL_SEARCH_search_option==115)||(BTDTL_SEARCH_search_option==114)||(BTDTL_SEARCH_search_option==117)||(BTDTL_SEARCH_search_option==116))
    {
      BTDTL_SEARCH_searcharray='BTDTL_SEARCH_empty';
    }
    else if(BTDTL_SEARCH_search_option==100)//-AIRCON SERVICED BY
    {   
      var BTDTL_SEARCH_data=[];
      var BTDTL_SEARCH_airconserviced_selectquery = "SELECT EASB.EASB_ID,EASB.EASB_DATA,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EASB.EASB_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EASB_TIMESTAMP FROM EXPENSE_AIRCON_SERVICE_BY EASB,USER_LOGIN_DETAILS ULD WHERE EASB.ULD_ID=ULD.ULD_ID AND EASB_DATA!='' ORDER BY EASB_DATA ASC";
      var BTDTL_SEARCH_airconservicedby_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_airconserviced_selectquery);
      while(BTDTL_SEARCH_airconservicedby_rs.next())
      {
        var BTDTL_SEARCH_airconid=BTDTL_SEARCH_airconservicedby_rs.getString("EASB_ID");
        var BTDTL_SEARCH_arr=[];       
        BTDTL_SEARCH_arr.push(BTDTL_SEARCH_airconservicedby_rs.getString("EASB_DATA"));
        BTDTL_SEARCH_arr.push(BTDTL_SEARCH_airconservicedby_rs.getString("ULD_LOGINID"));
        BTDTL_SEARCH_arr.push(BTDTL_SEARCH_airconservicedby_rs.getString("EASB_TIMESTAMP"));
        BTDTL_SEARCH_id.push(BTDTL_SEARCH_airconid)
        BTDTL_SEARCH_data.push(BTDTL_SEARCH_arr)
        BTDTL_SEARCH_searcharray.push({"BTDTL_SEARCH_obj_id":BTDTL_SEARCH_airconservicedby_rs.getString("EASB_ID"),"BTDTL_SEARCH_obj_data":BTDTL_SEARCH_airconservicedby_rs.getString("EASB_DATA")});
      }
      BTDTL_SEARCH_data.push(BTDTL_SEARCH_flag_searchby)
      BTDTL_SEARCH_airconservicedby_rs.close();
    }
    else if(BTDTL_SEARCH_search_option==195)//AIRCON SERVICED WITH UNIT
    {   
      var BTDTL_SEARCH_airconserviced_selectquery = "SELECT DISTINCT EASB_DATA FROM EXPENSE_DETAIL_AIRCON_SERVICE EDAS,EXPENSE_AIRCON_SERVICE_BY EASB,VW_ACTIVE_UNIT VAU WHERE EDAS.EASB_ID=EASB.EASB_ID AND VAU.UNIT_ID=EDAS.UNIT_ID ORDER BY EASB.EASB_DATA ASC";
      var BTDTL_SEARCH_airconservicedby_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_airconserviced_selectquery);
      while(BTDTL_SEARCH_airconservicedby_rs.next())
      {
        BTDTL_SEARCH_searcharray.push(BTDTL_SEARCH_airconservicedby_rs.getString("EASB_DATA"));
      }
      BTDTL_SEARCH_airconservicedby_rs.close();
    }
    else if(BTDTL_SEARCH_search_option==102)//CAR NO
    {
      var BTDTL_SEARCH_select_carpark_carno = "SELECT DISTINCT EDCP_CAR_NO FROM EXPENSE_DETAIL_CARPARK EDC,VW_ACTIVE_UNIT VAU WHERE EDCP_CAR_NO IS NOT NULL AND EDCP_CAR_NO!=''AND EDC.UNIT_ID=VAU.UNIT_ID ORDER BY EDCP_CAR_NO ASC";
      var BTDTL_SEARCH_select_carno_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_select_carpark_carno);
      while(BTDTL_SEARCH_select_carno_rs.next())
      {
        BTDTL_SEARCH_searcharray.push(BTDTL_SEARCH_select_carno_rs.getString('EDCP_CAR_NO'));
      }
      BTDTL_SEARCH_select_carno_rs.close();
    }
    else if(BTDTL_SEARCH_search_option==123)//STARHUB ACCOUNT NO
    {
      var BTDTL_SEARCH_accno_selectquery = "SELECT DISTINCT EDSH_ACCOUNT_NO FROM EXPENSE_DETAIL_STARHUB EDS,VW_ACTIVE_UNIT VAU WHERE EDSH_ACCOUNT_NO IS NOT NULL AND EDSH_ACCOUNT_NO!=''AND EDS.UNIT_ID=VAU.UNIT_ID ORDER BY EDSH_ACCOUNT_NO ASC";
      var BTDTL_SEARCH_accountno_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_accno_selectquery);
      while(BTDTL_SEARCH_accountno_rs.next())
      {
        BTDTL_SEARCH_searcharray.push(BTDTL_SEARCH_accountno_rs.getString("EDSH_ACCOUNT_NO"));
      }
      BTDTL_SEARCH_accountno_rs.close();
    }
    else if(BTDTL_SEARCH_search_option==109)//DIGITAL ACCOUNT NO
    {
      var BTDTL_SEARCH_select_digitalacctno = "SELECT DISTINCT EDDV_DIGITAL_ACCOUNT_NO FROM EXPENSE_DETAIL_DIGITAL_VOICE EDDV,VW_ACTIVE_UNIT VAU WHERE EDDV_DIGITAL_ACCOUNT_NO IS NOT NULL AND EDDV_DIGITAL_ACCOUNT_NO!='' AND EDDV.UNIT_ID=VAU.UNIT_ID ORDER BY EDDV_DIGITAL_ACCOUNT_NO ASC";
      var BTDTL_SEARCH_digitalacctno_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_select_digitalacctno);
      while(BTDTL_SEARCH_digitalacctno_rs.next())
      {
        BTDTL_SEARCH_searcharray.push(BTDTL_SEARCH_digitalacctno_rs.getString("EDDV_DIGITAL_ACCOUNT_NO"));
      } 
      BTDTL_SEARCH_digitalacctno_rs.close();
    }   
    else if((BTDTL_SEARCH_search_option==107)||(BTDTL_SEARCH_search_option==105)||(BTDTL_SEARCH_search_option==118))
    {
      BTDTL_SEARCH_searcharray='BTDTL_SEARCH_empty';
    }
    else if(BTDTL_SEARCH_search_option==106)//DIGITAL VOICE NO
    {
      var BTDTL_SEARCH_digitalvoiceno_selectquery = "SELECT DISTINCT EDDV_DIGITAL_VOICE_NO FROM EXPENSE_DETAIL_DIGITAL_VOICE EDDV,VW_ACTIVE_UNIT VAU WHERE EDDV_DIGITAL_VOICE_NO IS NOT NULL AND EDDV_DIGITAL_VOICE_NO!='' AND EDDV.UNIT_ID=VAU.UNIT_ID ORDER BY EDDV_DIGITAL_VOICE_NO";
      var BTDTL_SEARCH_digitalvoiceno_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_digitalvoiceno_selectquery);
      while(BTDTL_SEARCH_digitalvoiceno_rs.next())
      {
        BTDTL_SEARCH_searcharray.push(BTDTL_SEARCH_digitalvoiceno_rs.getString("EDDV_DIGITAL_VOICE_NO"));
      }
      BTDTL_SEARCH_digitalvoiceno_rs.close();
    }
    else if(BTDTL_SEARCH_search_option==113)//STARHUB CABLE BOX SERIAL NO
    {
      var BTDTL_SEARCH_starhubcableboxno_selectquery = "SELECT DISTINCT EDSH_CABLE_BOX_SERIAL_NO FROM EXPENSE_DETAIL_STARHUB EDSH,VW_ACTIVE_UNIT VAU WHERE EDSH_CABLE_BOX_SERIAL_NO IS NOT NULL AND EDSH_CABLE_BOX_SERIAL_NO!='' AND EDSH.UNIT_ID=VAU.UNIT_ID ORDER BY EDSH_CABLE_BOX_SERIAL_NO ASC";
      var BTDTL_SEARCH_starhubcableboxno_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_starhubcableboxno_selectquery);
      while(BTDTL_SEARCH_starhubcableboxno_rs.next())
      {
        BTDTL_SEARCH_searcharray.push(BTDTL_SEARCH_starhubcableboxno_rs.getString("EDSH_CABLE_BOX_SERIAL_NO"));
      }
      BTDTL_SEARCH_starhubcableboxno_rs.close(); 
    }
    else if(BTDTL_SEARCH_search_option==119)//STARHUB MODEM SERIAL NO
    {
      var BTDTL_SEARCH_modelserialno_selectquery = "SELECT DISTINCT EDSH_MODEM_SERIAL_NO FROM EXPENSE_DETAIL_STARHUB EDSH,VW_ACTIVE_UNIT VAU WHERE EDSH_MODEM_SERIAL_NO IS NOT NULL AND EDSH_MODEM_SERIAL_NO!='' AND EDSH.UNIT_ID=VAU.UNIT_ID ORDER BY EDSH_MODEM_SERIAL_NO ASC";
      var BTDTL_SEARCH_modelserialno_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_modelserialno_selectquery);
      while(BTDTL_SEARCH_modelserialno_rs.next())
      {
        BTDTL_SEARCH_searcharray.push(BTDTL_SEARCH_modelserialno_rs.getString("EDSH_MODEM_SERIAL_NO"));
      }
      BTDTL_SEARCH_modelserialno_rs.close(); 
    }
    else if(BTDTL_SEARCH_search_option==121)//STARHUB PWD
    {
      var BTDTL_SEARCH_starhubpwd_selectquery = "SELECT DISTINCT EDSH_PWD FROM EXPENSE_DETAIL_STARHUB EDSH,VW_ACTIVE_UNIT VAU WHERE EDSH_PWD IS NOT NULL AND EDSH_PWD!='' AND EDSH.UNIT_ID=VAU.UNIT_ID ORDER BY EDSH_PWD ASC";
      var BTDTL_SEARCH_starhubpwd_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_starhubpwd_selectquery);
      while(BTDTL_SEARCH_starhubpwd_rs.next())
      {
        BTDTL_SEARCH_searcharray.push(BTDTL_SEARCH_starhubpwd_rs.getString("EDSH_PWD"));
      }
      BTDTL_SEARCH_starhubpwd_rs.close(); 
    }
    else if(BTDTL_SEARCH_search_option==120)//STARHUB SSID
    {
      var BTDTL_SEARCH_starhubssid_selectquery = "SELECT DISTINCT EDSH_SSID FROM EXPENSE_DETAIL_STARHUB EDSH,VW_ACTIVE_UNIT VAU WHERE EDSH_SSID IS NOT NULL AND EDSH_SSID!='' AND EDSH.UNIT_ID=VAU.UNIT_ID ORDER BY EDSH_SSID ASC";
      var BTDTL_SEARCH_starhubssid_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_starhubssid_selectquery);
      while(BTDTL_SEARCH_starhubssid_rs.next())
      {
        BTDTL_SEARCH_searcharray.push(BTDTL_SEARCH_starhubssid_rs.getString("EDSH_SSID"));
      }
      BTDTL_SEARCH_starhubssid_rs.close(); 
    }  
    BTDTL_SEARCH_stmt.close();
    var BTDTL_SEARCH_final={"BTDTL_SEARCH_searchvalue":BTDTL_SEARCH_searcharray,"BTDTL_SEARCH_parentfunction":BTDTL_SEARCH_flag_searchby,"BTDTL_SEARCH_search_flag":BTDTL_SEARCH_search_option,"BTDTL_SEARCH_id":BTDTL_SEARCH_id,"BTDTL_SEARCH_aircondata":BTDTL_SEARCH_data};
    BTDTL_SEARCH_conn.close();
    return BTDTL_SEARCH_final;
  }
  /*------------------------------------FUNCTION FOR FETCHING FLEX TABLE FOR AIRCON-------------------------------------------------*/
  function BTDTL_SEARCH_flex_aircon(BTDTL_SEARCH_searchval,BTDTL_SEARCH_searchby,BTDTL_SEARCH_parentfunc)
  {
    PropertiesService.getUserProperties().setProperty('BTDTL_SEARCH_value', BTDTL_SEARCH_searchval)
    var BTDTL_SEARCH_conn =eilib.db_GetConnection();
    var BTDTL_SEARCH_stmt = BTDTL_SEARCH_conn.createStatement();
    var BTDTL_SEARCH_array=[];
    var BTDTL_SEARCH_id=[];
    if(BTDTL_SEARCH_searchby==101)//SEARCH BY AIRCON COMMENTS
    {      
      BTDTL_SEARCH_searchval=eilib.ConvertSpclCharString(BTDTL_SEARCH_searchval);
      var BTDTL_SEARCH_search_aircon = " SELECT EDAS.EDAS_ID,U.UNIT_ID,U.UNIT_NO,EASB.EASB_DATA,EDAS.EDAS_REC_VER,EDAS.EDAS_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDAS.EDAS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM EXPENSE_AIRCON_SERVICE_BY EASB, EXPENSE_DETAIL_AIRCON_SERVICE EDAS,UNIT U,VW_ACTIVE_UNIT VAU,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EDAS.ULD_ID AND EDAS.UNIT_ID=U.UNIT_ID AND EDAS.UNIT_ID=VAU.UNIT_ID AND EDAS.EDAS_COMMENTS='"+BTDTL_SEARCH_searchval+"' AND EDAS.EASB_ID=EASB.EASB_ID  ORDER BY EDAS.EDAS_COMMENTS,U.UNIT_NO";
    }
    else if(BTDTL_SEARCH_searchby==195)//SEARCH BY AIRCON SERVICED BY UNIT
    {     
      var BTDTL_SEARCH_search_aircon = "SELECT EDAS.EDAS_ID,U.UNIT_ID,U.UNIT_NO,EASB.EASB_DATA,EDAS.EDAS_REC_VER,EDAS.EDAS_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDAS.EDAS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM EXPENSE_DETAIL_AIRCON_SERVICE EDAS,EXPENSE_AIRCON_SERVICE_BY EASB,UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EDAS.ULD_ID AND EASB.EASB_ID=EDAS.EASB_ID AND U.UNIT_ID=EDAS.UNIT_ID AND EDAS.UNIT_ID=VAU.UNIT_ID AND EASB.EASB_DATA='"+BTDTL_SEARCH_searchval+"' ORDER BY U.UNIT_NO,EASB.EASB_DATA";
    }
    else if(BTDTL_SEARCH_searchby==191)//SEARCH BY UNIT NO
    {
      var BTDTL_SEARCH_search_aircon = "SELECT EDAS.EDAS_ID,U.UNIT_ID,U.UNIT_NO,EASB.EASB_DATA,EDAS.EDAS_REC_VER,EDAS.EDAS_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDAS.EDAS_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM EXPENSE_DETAIL_AIRCON_SERVICE EDAS, EXPENSE_AIRCON_SERVICE_BY EASB, UNIT U ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EDAS.ULD_ID AND U.UNIT_ID=(SELECT UNIT_ID FROM UNIT WHERE UNIT_NO="+BTDTL_SEARCH_searchval+") AND  EDAS.EASB_ID=EASB.EASB_ID AND U.UNIT_ID=EDAS.UNIT_ID ORDER BY U.UNIT_NO ASC";  
    }       
    var BTDTL_SEARCH_aircon_rs= BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_search_aircon);
    while(BTDTL_SEARCH_aircon_rs.next())
    {
      var arr=[];       
      var BTDTL_SEARCH_aircon_autoid = BTDTL_SEARCH_aircon_rs.getString('EDAS_ID')+'_'+BTDTL_SEARCH_aircon_rs.getString('U.UNIT_ID');
      var BTDTL_SEARCH_aircon_unitno = BTDTL_SEARCH_aircon_rs.getString('UNIT_NO');
      var BTDTL_SEARCH_aircon_data = BTDTL_SEARCH_aircon_rs.getString('EASB_DATA');
      var BTDTL_SEARCH_aircon_comments = BTDTL_SEARCH_aircon_rs.getString('EDAS_COMMENTS');
      var BTDTL_SEARCH_aircon_userstamp = BTDTL_SEARCH_aircon_rs.getString('ULD_LOGINID');
      var BTDTL_SEARCH_aircon_timestamp = BTDTL_SEARCH_aircon_rs.getString('TIMESTAMP');   
      BTDTL_SEARCH_id.push(BTDTL_SEARCH_aircon_autoid)
      arr.push(BTDTL_SEARCH_aircon_unitno)
      arr.push(BTDTL_SEARCH_aircon_data)
      arr.push(BTDTL_SEARCH_aircon_comments)
      arr.push(BTDTL_SEARCH_aircon_userstamp)
      arr.push(BTDTL_SEARCH_aircon_timestamp)
      BTDTL_SEARCH_array.push(arr);
    }  
    BTDTL_SEARCH_array.push(BTDTL_SEARCH_parentfunc)
    var BTDTL_SEARCH_result={"BTDTL_SEARCH_expenseflex":BTDTL_SEARCH_array,"BTDTL_SEARCH_id":BTDTL_SEARCH_id}; 
    BTDTL_SEARCH_aircon_rs.close();BTDTL_SEARCH_stmt.close();
    BTDTL_SEARCH_conn.close();
    return BTDTL_SEARCH_result;
  }
  /*-----------------------------------------------FUNCTION FOR CARPARK SHOWING FLEX TABLE--------------------------------------------------*/
  function BTDTL_SEARCH_show_carpark(BTDTL_SEARCH_searchval,BTDTL_SEARCH_searchby,BTDTL_SEARCH_parentfunc)
  {
    PropertiesService.getUserProperties().setProperty('BTDTL_SEARCH_value', BTDTL_SEARCH_searchval)
    var BTDTL_SEARCH_conn =eilib.db_GetConnection();
    var BTDTL_SEARCH_array=[];
    var BTDTL_SEARCH_id=[];
    var BTDTL_SEARCH_stmt = BTDTL_SEARCH_conn.createStatement(); 
    if(BTDTL_SEARCH_searchby==102){//CAR NO
      var BTDTL_SEARCH_search_carpark = "SELECT EDCP.EDCP_ID,U.UNIT_ID,U.UNIT_NO,EDCP.EDCP_CAR_NO,EDCP.EDCP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDCP.EDCP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM UNIT U, EXPENSE_DETAIL_CARPARK EDCP,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EDCP.ULD_ID AND U.UNIT_ID= EDCP.UNIT_ID AND EDCP.EDCP_CAR_NO ='"+BTDTL_SEARCH_searchval+"' AND EDCP.UNIT_ID=VAU.UNIT_ID ORDER BY U.UNIT_NO, EDCP.EDCP_CAR_NO";
    } 
    else if(BTDTL_SEARCH_searchby==103){//CARPARK COMMENTS
      BTDTL_SEARCH_searchval=eilib.ConvertSpclCharString(BTDTL_SEARCH_searchval);
      var BTDTL_SEARCH_search_carpark = "SELECT EDCP.EDCP_ID,U.UNIT_ID,U.UNIT_NO,EDCP.EDCP_CAR_NO,EDCP.EDCP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDCP.EDCP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM UNIT U, EXPENSE_DETAIL_CARPARK EDCP,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EDCP.ULD_ID AND U.UNIT_ID=EDCP.UNIT_ID AND EDCP.EDCP_COMMENTS='"+BTDTL_SEARCH_searchval+"' AND EDCP.UNIT_ID=VAU.UNIT_ID ORDER BY U.UNIT_NO,EDCP.EDCP_COMMENTS";
    }
    else if(BTDTL_SEARCH_searchby==191)//UNIT No
    {
      var BTDTL_SEARCH_search_carpark = "SELECT EDCP.EDCP_ID,U.UNIT_ID,U.UNIT_NO,EDCP.EDCP_CAR_NO,EDCP.EDCP_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDCP.EDCP_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM UNIT U, EXPENSE_DETAIL_CARPARK EDCP ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EDCP.ULD_ID AND U.UNIT_ID= (SELECT UNIT_ID FROM UNIT WHERE UNIT_NO="+BTDTL_SEARCH_searchval+") AND U.UNIT_ID=EDCP.UNIT_ID ORDER BY U.UNIT_NO ASC";
    }
    var BTDTL_SEARCH_carpark_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_search_carpark);
    while(BTDTL_SEARCH_carpark_rs.next())
    {
      var BTDTL_SEARCH_caraprk_autoid = BTDTL_SEARCH_carpark_rs.getString('EDCP_ID')+'_'+BTDTL_SEARCH_carpark_rs.getString('U.UNIT_ID');
      var BTDTL_SEARCH_arr=[];       
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_carpark_rs.getString('UNIT_NO'));
      BTDTL_SEARCH_arr.push( BTDTL_SEARCH_carpark_rs.getString('EDCP_CAR_NO'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_carpark_rs.getString('EDCP_COMMENTS'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_carpark_rs.getString('ULD_LOGINID'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_carpark_rs.getString('TIMESTAMP'));
      BTDTL_SEARCH_array.push(BTDTL_SEARCH_arr);
      BTDTL_SEARCH_id.push(BTDTL_SEARCH_caraprk_autoid)
    }
    BTDTL_SEARCH_array.push(BTDTL_SEARCH_parentfunc) 
    BTDTL_SEARCH_carpark_rs.close();BTDTL_SEARCH_stmt.close();
    var BTDTL_SEARCH_result={"BTDTL_SEARCH_expenseflex":BTDTL_SEARCH_array,"BTDTL_SEARCH_id":BTDTL_SEARCH_id};
    BTDTL_SEARCH_conn.close();
    return BTDTL_SEARCH_result;
  }
  /*--------------------------------------------FETCHING ELECTRICITY FOR LOADING FLEX TABLE--------------------------------------------------*/
  function BTDTL_SEARCH_show_electricity(BTDTL_SEARCH_searchval,BTDTL_SEARCH_searchby,BTDTL_SEARCH_parentfunc)
  {
    PropertiesService.getUserProperties().setProperty('BTDTL_SEARCH_value', BTDTL_SEARCH_searchval)
    var BTDTL_SEARCH_conn =eilib.db_GetConnection();
    var BTDTL_SEARCH_stmt = BTDTL_SEARCH_conn.createStatement();
    var BTDTL_SEARCH_array=[];
    var BTDTL_SEARCH_id=[];
    if(BTDTL_SEARCH_searchby==104)//SEARCH BY ELECTRICITY COMMENTS
    {
      BTDTL_SEARCH_searchval=eilib.ConvertSpclCharString(BTDTL_SEARCH_searchval);
      var BTDTL_SEARCH_select_electricity="SELECT EDE.EDE_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDE.EDE_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDE.EDE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP  FROM EXPENSE_DETAIL_ELECTRICITY EDE,EXPENSE_CONFIGURATION EC,UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EDE.ULD_ID AND EDE.EDE_COMMENTS='"+BTDTL_SEARCH_searchval+"' AND EDE.ECN_ID=EC.ECN_ID AND EDE.UNIT_ID=U.UNIT_ID AND EDE.UNIT_ID=VAU.UNIT_ID ORDER BY U.UNIT_NO,EDE.EDE_COMMENTS";    
    }  
    else if(BTDTL_SEARCH_searchby==105)//SEARCH BY ELECTRICITY INVOICE TO
    {
      var BTDTL_SEARCH_select_electricity="SELECT EDE.EDE_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDE.EDE_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDE.EDE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP  FROM EXPENSE_DETAIL_ELECTRICITY EDE,EXPENSE_CONFIGURATION EC,UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EDE.ULD_ID AND EDE.ECN_ID ="+BTDTL_SEARCH_searchval+" AND EDE.ECN_ID=EC.ECN_ID AND EDE.UNIT_ID=U.UNIT_ID AND EDE.UNIT_ID=VAU.UNIT_ID ORDER BY U.UNIT_NO,EC.ECN_DATA";
    }
    else if(BTDTL_SEARCH_searchby==191)//SEARCH BY UNIT NO
    {
      var BTDTL_SEARCH_select_electricity ="SELECT EDE.EDE_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDE.EDE_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDE.EDE_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP  FROM EXPENSE_DETAIL_ELECTRICITY EDE,EXPENSE_CONFIGURATION EC,UNIT U,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EDE.ULD_ID AND EDE.UNIT_ID=(SELECT UNIT_ID FROM UNIT WHERE UNIT_NO="+BTDTL_SEARCH_searchval+") AND EDE.ECN_ID=EC.ECN_ID AND EDE.UNIT_ID=U.UNIT_ID ORDER BY U.UNIT_NO ASC";
    }     
    var BTDTL_SEARCH_electricity_rs=BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_select_electricity);
    while(BTDTL_SEARCH_electricity_rs.next())          
    {
      var BTDTL_SEARCH_electricity_autoid = BTDTL_SEARCH_electricity_rs.getString('EDE_ID')+'_'+BTDTL_SEARCH_electricity_rs.getString('U.UNIT_ID');
      var BTDTL_SEARCH_arr=[];       
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_electricity_rs.getString('UNIT_NO'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_electricity_rs.getString('ECN_DATA'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_electricity_rs.getString('EDE_COMMENTS'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_electricity_rs.getString('ULD_LOGINID'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_electricity_rs.getString('TIMESTAMP')); 
      BTDTL_SEARCH_array.push(BTDTL_SEARCH_arr);
      BTDTL_SEARCH_id.push(BTDTL_SEARCH_electricity_autoid)
    }
    BTDTL_SEARCH_array.push(BTDTL_SEARCH_parentfunc)
    BTDTL_SEARCH_electricity_rs.close();BTDTL_SEARCH_stmt.close();
    var BTDTL_SEARCH_result={"BTDTL_SEARCH_expenseflex":BTDTL_SEARCH_array,"BTDTL_SEARCH_id":BTDTL_SEARCH_id}; 
    BTDTL_SEARCH_conn.close();
    return BTDTL_SEARCH_result;
  }
  /*---------------------------------------FUNCTION FOR DIGITAL SHOWING FLEX TABLE-----------------------------------------------------------*/
  function BTDTL_SEARCH_show_digital(BTDTL_SEARCH_searchval,BTDTL_SEARCH_searchby,BTDTL_SEARCH_parentfunc)
  {
    PropertiesService.getUserProperties().setProperty('BTDTL_SEARCH_value', BTDTL_SEARCH_searchval)
    var BTDTL_SEARCH_conn =eilib.db_GetConnection();
    var BTDTL_SEARCH_array=[];
    var BTDTL_SEARCH_id=[];
    var BTDTL_SEARCH_stmt = BTDTL_SEARCH_conn.createStatement();
    if(BTDTL_SEARCH_searchby==109)//SEARCH BY DIGITAL ACCOUNT NO
    {
      var BTDTL_SEARCH_select_digital = "SELECT EDDV.EDDV_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDDV.EDDV_DIGITAL_VOICE_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO,EDDV.EDDV_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDDV.EDDV_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM EXPENSE_DETAIL_DIGITAL_VOICE EDDV LEFT JOIN EXPENSE_CONFIGURATION EC ON EDDV.ECN_ID=EC.ECN_ID,UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EDDV.ULD_ID AND EDDV.EDDV_DIGITAL_ACCOUNT_NO='"+BTDTL_SEARCH_searchval+"' AND EDDV.UNIT_ID=U.UNIT_ID  AND EDDV.UNIT_ID=VAU.UNIT_ID ORDER BY U.UNIT_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO";
    }
    else if(BTDTL_SEARCH_searchby==108)//SEARCH BY DIGITAL COMMENTS
    {
      BTDTL_SEARCH_searchval=eilib.ConvertSpclCharString(BTDTL_SEARCH_searchval);
      var BTDTL_SEARCH_select_digital = "SELECT EDDV.EDDV_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDDV.EDDV_DIGITAL_VOICE_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO,EDDV.EDDV_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDDV.EDDV_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM EXPENSE_DETAIL_DIGITAL_VOICE EDDV LEFT JOIN EXPENSE_CONFIGURATION EC ON EDDV.ECN_ID=EC.ECN_ID,UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EDDV.ULD_ID AND EDDV.EDDV_COMMENTS='"+BTDTL_SEARCH_searchval+"' AND EDDV.UNIT_ID=U.UNIT_ID  AND EDDV.UNIT_ID=VAU.UNIT_ID ORDER BY U.UNIT_NO,EDDV.EDDV_COMMENTS";
    }
    else if(BTDTL_SEARCH_searchby==107)//SEARCH BY DIGITAL INVOICE TO
    {
      var BTDTL_SEARCH_select_digital = "SELECT EDDV.EDDV_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDDV.EDDV_DIGITAL_VOICE_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO,EDDV.EDDV_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDDV.EDDV_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM EXPENSE_CONFIGURATION EC,UNIT U,EXPENSE_DETAIL_DIGITAL_VOICE EDDV,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EDDV.ULD_ID AND EDDV.ECN_ID ="+BTDTL_SEARCH_searchval+" AND EDDV.UNIT_ID=U.UNIT_ID AND EDDV.ECN_ID=EC.ECN_ID AND EDDV.UNIT_ID=VAU.UNIT_ID ORDER BY U.UNIT_NO,EC.ECN_DATA";
    }
    else if(BTDTL_SEARCH_searchby==106)//SEARCH BY DIGITAL VOICE NO
    {
      var BTDTL_SEARCH_select_digital = "SELECT EDDV.EDDV_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDDV.EDDV_DIGITAL_VOICE_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO,EDDV.EDDV_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDDV.EDDV_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM EXPENSE_DETAIL_DIGITAL_VOICE EDDV LEFT JOIN EXPENSE_CONFIGURATION EC ON EDDV.ECN_ID=EC.ECN_ID,UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EDDV.ULD_ID AND EDDV.EDDV_DIGITAL_VOICE_NO='"+BTDTL_SEARCH_searchval+"' AND EDDV.UNIT_ID=U.UNIT_ID AND EDDV.UNIT_ID=VAU.UNIT_ID ORDER BY U.UNIT_NO,EDDV.EDDV_DIGITAL_VOICE_NO";
    }
    else if(BTDTL_SEARCH_searchby==191)//SEARCH BY UNIT NO
    {
      var BTDTL_SEARCH_select_digital = "SELECT EDDV.EDDV_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDDV.EDDV_DIGITAL_VOICE_NO,EDDV.EDDV_DIGITAL_ACCOUNT_NO,EDDV.EDDV_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDDV.EDDV_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS TIMESTAMP FROM EXPENSE_DETAIL_DIGITAL_VOICE EDDV LEFT JOIN EXPENSE_CONFIGURATION EC ON EDDV.ECN_ID=EC.ECN_ID,UNIT U ,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_ID=EDDV.ULD_ID AND EDDV.UNIT_ID=(SELECT UNIT_ID FROM UNIT WHERE UNIT_NO ="+BTDTL_SEARCH_searchval+") AND EDDV.UNIT_ID=U.UNIT_ID ORDER BY U.UNIT_NO ASC";   
    }
    var BTDTL_SEARCH_digital_rs=BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_select_digital);
    while(BTDTL_SEARCH_digital_rs.next())
    {
      var BTDTL_SEARCH_arr=[];    
      var BTDTL_SEARCH_digital_autoid = BTDTL_SEARCH_digital_rs.getString('EDDV_ID')+'_'+BTDTL_SEARCH_digital_rs.getString('U.UNIT_ID');
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_digital_rs.getString('UNIT_NO'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_digital_rs.getString('ECN_DATA'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_digital_rs.getString('EDDV_DIGITAL_VOICE_NO'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_digital_rs.getString('EDDV_DIGITAL_ACCOUNT_NO'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_digital_rs.getString('EDDV_COMMENTS'));  
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_digital_rs.getString('ULD_LOGINID'));  
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_digital_rs.getString('TIMESTAMP'));  
      BTDTL_SEARCH_array.push(BTDTL_SEARCH_arr);
      BTDTL_SEARCH_id.push(BTDTL_SEARCH_digital_autoid)
    }  
    BTDTL_SEARCH_array.push(BTDTL_SEARCH_parentfunc);
    var BTDTL_SEARCH_result={"BTDTL_SEARCH_expenseflex":BTDTL_SEARCH_array,"BTDTL_SEARCH_id":BTDTL_SEARCH_id}; 
    BTDTL_SEARCH_digital_rs.close();BTDTL_SEARCH_stmt.close();
    BTDTL_SEARCH_conn.close();
    return BTDTL_SEARCH_result;
  }
  /*---------------------------------------------FUNCTION FOR STARHUB SHOWING FLEX TABLE-----------------------------------------------------------*/
  function BTDTL_SEARCH_show_starhub(BTDTL_SEARCH_date,BTDTL_SEARCH_searchval,BTDTL_SEARCH_searchby,BTDTL_SEARCH_parentfunc)
  {
    var BTDTL_SEARCH_conn =eilib.db_GetConnection();
    PropertiesService.getUserProperties().setProperty('BTDTL_SEARCH_value', BTDTL_SEARCH_searchval)
    if(BTDTL_SEARCH_date==null)
      BTDTL_SEARCH_date='';
    PropertiesService.getUserProperties().setProperty('BTDTL_SEARCH_datevalue', BTDTL_SEARCH_date)
    var BTDTL_SEARCH_array=[];
    var BTDTL_SEARCH_id=[];
    var BTDTL_SEARCH_stmt = BTDTL_SEARCH_conn.createStatement();
    if(BTDTL_SEARCH_searchby==123)//SEARCH BY STARTHUB ACCOUNT NO
    {
      var BTDTL_SEARCH_select_starhub = "SELECT UD.UD_START_DATE,UD.UD_END_DATE,EDSH.EDSH_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(EDSH.EDSH_APPL_DATE,'%d-%m-%Y') AS EDSH_APPL_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_START_DATE,'%d-%m-%Y') AS EDSH_CABLE_START_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_END_DATE,'%d-%m-%Y') AS EDSH_CABLE_END_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_START_DATE,'%d-%m-%Y') AS EDSH_INTERNET_START_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_END_DATE,'%d-%m-%Y') AS EDSH_INTERNET_END_DATE,EDSH.EDSH_SSID,EDSH.EDSH_PWD,EDSH.EDSH_CABLE_BOX_SERIAL_NO,EDSH.EDSH_MODEM_SERIAL_NO,EDSH.EDSH_BASIC_GROUP,EDSH.EDSH_ADDTNL_CH,EDSH.EDSH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSH.EDSH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSH_TIMESTAMP FROM EXPENSE_DETAIL_STARHUB EDSH LEFT JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID, UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD,UNIT_DETAILS UD WHERE ULD.ULD_ID=EDSH.ULD_ID AND EDSH.EDSH_ACCOUNT_NO='"+BTDTL_SEARCH_searchval+"' AND U.UNIT_ID=EDSH.UNIT_ID AND EDSH.UNIT_ID=VAU.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO,EDSH.EDSH_ACCOUNT_NO";
    }
    else if(BTDTL_SEARCH_searchby==113)//SEARCH BY STARTHUB CABLE BOX SERIAL NO
    {      
      var BTDTL_SEARCH_select_starhub = "SELECT UD.UD_START_DATE,UD.UD_END_DATE,EDSH.EDSH_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(EDSH.EDSH_APPL_DATE,'%d-%m-%Y') AS EDSH_APPL_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_START_DATE,'%d-%m-%Y') AS EDSH_CABLE_START_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_END_DATE,'%d-%m-%Y') AS EDSH_CABLE_END_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_START_DATE,'%d-%m-%Y') AS EDSH_INTERNET_START_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_END_DATE,'%d-%m-%Y') AS EDSH_INTERNET_END_DATE,EDSH.EDSH_SSID,EDSH.EDSH_PWD,EDSH.EDSH_CABLE_BOX_SERIAL_NO,EDSH.EDSH_MODEM_SERIAL_NO,EDSH.EDSH_BASIC_GROUP,EDSH.EDSH_ADDTNL_CH,EDSH.EDSH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSH.EDSH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSH_TIMESTAMP FROM EXPENSE_DETAIL_STARHUB EDSH LEFT JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID,UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD,UNIT_DETAILS UD WHERE ULD.ULD_ID=EDSH.ULD_ID AND EDSH.EDSH_CABLE_BOX_SERIAL_NO='"+BTDTL_SEARCH_searchval+"' AND U.UNIT_ID=EDSH.UNIT_ID AND EDSH.UNIT_ID=VAU.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO,EDSH.EDSH_CABLE_BOX_SERIAL_NO";
    }    
    else if(BTDTL_SEARCH_searchby==118)//SEARCH BY STARTHUB INVOICE TO
    {   
      var BTDTL_SEARCH_select_starhub = "SELECT UD.UD_START_DATE,UD.UD_END_DATE,EDSH.EDSH_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(EDSH.EDSH_APPL_DATE,'%d-%m-%Y') AS EDSH_APPL_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_START_DATE,'%d-%m-%Y') AS EDSH_CABLE_START_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_END_DATE,'%d-%m-%Y') AS EDSH_CABLE_END_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_START_DATE,'%d-%m-%Y') AS EDSH_INTERNET_START_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_END_DATE,'%d-%m-%Y') AS EDSH_INTERNET_END_DATE,EDSH.EDSH_SSID,EDSH.EDSH_PWD,EDSH.EDSH_CABLE_BOX_SERIAL_NO,EDSH.EDSH_MODEM_SERIAL_NO,EDSH.EDSH_BASIC_GROUP,EDSH.EDSH_ADDTNL_CH,EDSH.EDSH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSH.EDSH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSH_TIMESTAMP FROM VW_ACTIVE_UNIT VAU,UNIT U JOIN EXPENSE_DETAIL_STARHUB EDSH ON U.UNIT_ID=EDSH.UNIT_ID JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID,USER_LOGIN_DETAILS ULD,UNIT_DETAILS UD WHERE ULD.ULD_ID=EDSH.ULD_ID AND EDSH.ECN_ID="+BTDTL_SEARCH_searchval+" AND EDSH.UNIT_ID=VAU.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO,EC.ECN_DATA";
    }
    else if(BTDTL_SEARCH_searchby==119)//SEARCH BY STARTHUB MODEM SERIAL NO
    {
      var BTDTL_SEARCH_select_starhub = "SELECT UD.UD_START_DATE,UD.UD_END_DATE,EDSH.EDSH_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(EDSH.EDSH_APPL_DATE,'%d-%m-%Y') AS EDSH_APPL_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_START_DATE,'%d-%m-%Y') AS EDSH_CABLE_START_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_END_DATE,'%d-%m-%Y') AS EDSH_CABLE_END_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_START_DATE,'%d-%m-%Y') AS EDSH_INTERNET_START_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_END_DATE,'%d-%m-%Y') AS EDSH_INTERNET_END_DATE,EDSH.EDSH_SSID,EDSH.EDSH_PWD,EDSH.EDSH_CABLE_BOX_SERIAL_NO,EDSH.EDSH_MODEM_SERIAL_NO,EDSH.EDSH_BASIC_GROUP,EDSH.EDSH_ADDTNL_CH,EDSH.EDSH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSH.EDSH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSH_TIMESTAMP FROM EXPENSE_DETAIL_STARHUB EDSH LEFT JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID,UNIT U,VW_ACTIVE_UNIT VAU  ,USER_LOGIN_DETAILS ULD,UNIT_DETAILS UD WHERE ULD.ULD_ID=EDSH.ULD_ID AND EDSH.EDSH_MODEM_SERIAL_NO='"+BTDTL_SEARCH_searchval+"' AND U.UNIT_ID=EDSH.UNIT_ID AND EDSH.UNIT_ID=VAU.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO,EDSH.EDSH_MODEM_SERIAL_NO";  
    }
    else if(BTDTL_SEARCH_searchby==121)//SEARCH BY STARTHUB PWD
    {
      var BTDTL_SEARCH_select_starhub = "SELECT UD.UD_START_DATE,UD.UD_END_DATE,EDSH.EDSH_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(EDSH.EDSH_APPL_DATE,'%d-%m-%Y') AS EDSH_APPL_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_START_DATE,'%d-%m-%Y') AS EDSH_CABLE_START_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_END_DATE,'%d-%m-%Y') AS EDSH_CABLE_END_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_START_DATE,'%d-%m-%Y') AS EDSH_INTERNET_START_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_END_DATE,'%d-%m-%Y') AS EDSH_INTERNET_END_DATE,EDSH.EDSH_SSID,EDSH.EDSH_PWD,EDSH.EDSH_CABLE_BOX_SERIAL_NO,EDSH.EDSH_MODEM_SERIAL_NO,EDSH.EDSH_BASIC_GROUP,EDSH.EDSH_ADDTNL_CH,EDSH.EDSH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSH.EDSH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSH_TIMESTAMP FROM EXPENSE_DETAIL_STARHUB EDSH LEFT JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID,UNIT U,VW_ACTIVE_UNIT VAU  ,USER_LOGIN_DETAILS ULD,UNIT_DETAILS UD WHERE ULD.ULD_ID=EDSH.ULD_ID AND EDSH.EDSH_PWD='"+BTDTL_SEARCH_searchval+"' AND U.UNIT_ID=EDSH.UNIT_ID AND EDSH.UNIT_ID=VAU.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO,EDSH.EDSH_PWD"; 
    }
    else if(BTDTL_SEARCH_searchby==120)//SEARCH BY STARTHUB SSID
    {
      var BTDTL_SEARCH_select_starhub = "SELECT UD.UD_START_DATE,UD.UD_END_DATE,EDSH.EDSH_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(EDSH.EDSH_APPL_DATE,'%d-%m-%Y') AS EDSH_APPL_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_START_DATE,'%d-%m-%Y') AS EDSH_CABLE_START_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_END_DATE,'%d-%m-%Y') AS EDSH_CABLE_END_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_START_DATE,'%d-%m-%Y') AS EDSH_INTERNET_START_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_END_DATE,'%d-%m-%Y') AS EDSH_INTERNET_END_DATE,EDSH.EDSH_SSID,EDSH.EDSH_PWD,EDSH.EDSH_CABLE_BOX_SERIAL_NO,EDSH.EDSH_MODEM_SERIAL_NO,EDSH.EDSH_BASIC_GROUP,EDSH.EDSH_ADDTNL_CH,EDSH.EDSH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSH.EDSH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSH_TIMESTAMP FROM EXPENSE_DETAIL_STARHUB EDSH LEFT JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID,UNIT U,VW_ACTIVE_UNIT VAU  ,USER_LOGIN_DETAILS ULD,UNIT_DETAILS UD WHERE ULD.ULD_ID=EDSH.ULD_ID AND EDSH.EDSH_SSID='"+BTDTL_SEARCH_searchval+"' AND U.UNIT_ID=EDSH.UNIT_ID AND EDSH.UNIT_ID=VAU.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO,EDSH.EDSH_SSID";
    }
    else if(BTDTL_SEARCH_searchby==191)//SEARCH BY UNIT NO
    {
      var BTDTL_SEARCH_select_starhub = "SELECT UD.UD_START_DATE,UD.UD_END_DATE,EDSH.EDSH_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(EDSH.EDSH_APPL_DATE,'%d-%m-%Y') AS EDSH_APPL_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_START_DATE,'%d-%m-%Y') AS EDSH_CABLE_START_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_END_DATE,'%d-%m-%Y') AS EDSH_CABLE_END_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_START_DATE,'%d-%m-%Y') AS EDSH_INTERNET_START_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_END_DATE,'%d-%m-%Y') AS EDSH_INTERNET_END_DATE,EDSH.EDSH_SSID,EDSH.EDSH_PWD,EDSH.EDSH_CABLE_BOX_SERIAL_NO,EDSH.EDSH_MODEM_SERIAL_NO,EDSH.EDSH_BASIC_GROUP,EDSH.EDSH_ADDTNL_CH,EDSH.EDSH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSH.EDSH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSH_TIMESTAMP FROM EXPENSE_DETAIL_STARHUB EDSH LEFT JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID,UNIT U ,USER_LOGIN_DETAILS ULD,UNIT_DETAILS UD WHERE ULD.ULD_ID=EDSH.ULD_ID AND U.UNIT_ID=EDSH.UNIT_ID AND  EDSH.UNIT_ID=(SELECT UNIT_ID FROM UNIT WHERE UNIT_NO="+BTDTL_SEARCH_searchval+") AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO";
    }
    else if(BTDTL_SEARCH_searchby==111)//SEARCH BY STARTHUB APPL DATE
    {     
      var BTDTL_SEARCH_select_starhub = "SELECT UD.UD_START_DATE,UD.UD_END_DATE,EDSH.EDSH_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(EDSH.EDSH_APPL_DATE,'%d-%m-%Y') AS EDSH_APPL_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_START_DATE,'%d-%m-%Y') AS EDSH_CABLE_START_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_END_DATE,'%d-%m-%Y') AS EDSH_CABLE_END_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_START_DATE,'%d-%m-%Y') AS EDSH_INTERNET_START_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_END_DATE,'%d-%m-%Y') AS EDSH_INTERNET_END_DATE,EDSH.EDSH_SSID,EDSH.EDSH_PWD,EDSH.EDSH_CABLE_BOX_SERIAL_NO,EDSH.EDSH_MODEM_SERIAL_NO,EDSH.EDSH_BASIC_GROUP,EDSH.EDSH_ADDTNL_CH,EDSH.EDSH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSH.EDSH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSH_TIMESTAMP FROM EXPENSE_DETAIL_STARHUB EDSH LEFT JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID,UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD,UNIT_DETAILS UD WHERE ULD.ULD_ID=EDSH.ULD_ID AND U.UNIT_ID=EDSH.UNIT_ID AND EDSH.EDSH_APPL_DATE BETWEEN '"+BTDTL_SEARCH_date+"' AND '"+BTDTL_SEARCH_searchval+"' AND EDSH.UNIT_ID=VAU.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO,EDSH.EDSH_APPL_DATE";
    } 
    else if(BTDTL_SEARCH_searchby==115)//SEARCH BY STARTHUB CABLE START DATE
    {               
      var BTDTL_SEARCH_select_starhub = "SELECT UD.UD_START_DATE,UD.UD_END_DATE,EDSH.EDSH_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(EDSH.EDSH_APPL_DATE,'%d-%m-%Y') AS EDSH_APPL_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_START_DATE,'%d-%m-%Y') AS EDSH_CABLE_START_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_END_DATE,'%d-%m-%Y') AS EDSH_CABLE_END_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_START_DATE,'%d-%m-%Y') AS EDSH_INTERNET_START_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_END_DATE,'%d-%m-%Y') AS EDSH_INTERNET_END_DATE,EDSH.EDSH_SSID,EDSH.EDSH_PWD,EDSH.EDSH_CABLE_BOX_SERIAL_NO,EDSH.EDSH_MODEM_SERIAL_NO,EDSH.EDSH_BASIC_GROUP,EDSH.EDSH_ADDTNL_CH,EDSH.EDSH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSH.EDSH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSH_TIMESTAMP FROM EXPENSE_DETAIL_STARHUB EDSH LEFT JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID,UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD,UNIT_DETAILS UD WHERE ULD.ULD_ID=EDSH.ULD_ID AND U.UNIT_ID=EDSH.UNIT_ID AND EDSH.EDSH_CABLE_START_DATE BETWEEN '"+BTDTL_SEARCH_date+"' AND '"+BTDTL_SEARCH_searchval+"' AND EDSH.UNIT_ID=VAU.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO,EDSH.EDSH_CABLE_START_DATE";
    }
    else if(BTDTL_SEARCH_searchby==114)//SEARCH BY STARTHUB CABLE END DATE
    {               
      var BTDTL_SEARCH_select_starhub = "SELECT UD.UD_START_DATE,UD.UD_END_DATE,EDSH.EDSH_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(EDSH.EDSH_APPL_DATE,'%d-%m-%Y') AS EDSH_APPL_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_START_DATE,'%d-%m-%Y') AS EDSH_CABLE_START_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_END_DATE,'%d-%m-%Y') AS EDSH_CABLE_END_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_START_DATE,'%d-%m-%Y') AS EDSH_INTERNET_START_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_END_DATE,'%d-%m-%Y') AS EDSH_INTERNET_END_DATE,EDSH.EDSH_SSID,EDSH.EDSH_PWD,EDSH.EDSH_CABLE_BOX_SERIAL_NO,EDSH.EDSH_MODEM_SERIAL_NO,EDSH.EDSH_BASIC_GROUP,EDSH.EDSH_ADDTNL_CH,EDSH.EDSH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSH.EDSH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSH_TIMESTAMP FROM EXPENSE_DETAIL_STARHUB EDSH LEFT JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID,UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD,UNIT_DETAILS UD WHERE ULD.ULD_ID=EDSH.ULD_ID AND U.UNIT_ID=EDSH.UNIT_ID AND EDSH.EDSH_CABLE_END_DATE BETWEEN '"+BTDTL_SEARCH_date+"' AND '"+BTDTL_SEARCH_searchval+"' AND EDSH.UNIT_ID=VAU.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO,EDSH.EDSH_CABLE_END_DATE";
    }
    else if(BTDTL_SEARCH_searchby==117)//SEARCH BY STARTHUB INTERNET START DATE
    {      
      var BTDTL_SEARCH_select_starhub = "SELECT UD.UD_START_DATE,UD.UD_END_DATE,EDSH.EDSH_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(EDSH.EDSH_APPL_DATE,'%d-%m-%Y') AS EDSH_APPL_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_START_DATE,'%d-%m-%Y') AS EDSH_CABLE_START_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_END_DATE,'%d-%m-%Y') AS EDSH_CABLE_END_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_START_DATE,'%d-%m-%Y') AS EDSH_INTERNET_START_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_END_DATE,'%d-%m-%Y') AS EDSH_INTERNET_END_DATE,EDSH.EDSH_SSID,EDSH.EDSH_PWD,EDSH.EDSH_CABLE_BOX_SERIAL_NO,EDSH.EDSH_MODEM_SERIAL_NO,EDSH.EDSH_BASIC_GROUP,EDSH.EDSH_ADDTNL_CH,EDSH.EDSH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSH.EDSH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSH_TIMESTAMP FROM EXPENSE_DETAIL_STARHUB EDSH LEFT JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID,UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD,UNIT_DETAILS UD WHERE ULD.ULD_ID=EDSH.ULD_ID AND U.UNIT_ID=EDSH.UNIT_ID AND EDSH.EDSH_INTERNET_START_DATE BETWEEN '"+BTDTL_SEARCH_date+"' AND '"+BTDTL_SEARCH_searchval+"' AND EDSH.UNIT_ID=VAU.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO,EDSH.EDSH_INTERNET_START_DATE";
    } 
    else if(BTDTL_SEARCH_searchby==116)//SEARCH BY STARTHUB INTERNET END DATE
    {      
      var BTDTL_SEARCH_select_starhub = "SELECT UD.UD_START_DATE,UD.UD_END_DATE,EDSH.EDSH_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(EDSH.EDSH_APPL_DATE,'%d-%m-%Y') AS EDSH_APPL_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_START_DATE,'%d-%m-%Y') AS EDSH_CABLE_START_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_END_DATE,'%d-%m-%Y') AS EDSH_CABLE_END_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_START_DATE,'%d-%m-%Y') AS EDSH_INTERNET_START_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_END_DATE,'%d-%m-%Y') AS EDSH_INTERNET_END_DATE,EDSH.EDSH_SSID,EDSH.EDSH_PWD,EDSH.EDSH_CABLE_BOX_SERIAL_NO,EDSH.EDSH_MODEM_SERIAL_NO,EDSH.EDSH_BASIC_GROUP,EDSH.EDSH_ADDTNL_CH,EDSH.EDSH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSH.EDSH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSH_TIMESTAMP FROM EXPENSE_DETAIL_STARHUB EDSH LEFT JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID,UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD,UNIT_DETAILS UD WHERE ULD.ULD_ID=EDSH.ULD_ID AND U.UNIT_ID=EDSH.UNIT_ID AND EDSH.EDSH_INTERNET_END_DATE BETWEEN '"+BTDTL_SEARCH_date+"' AND '"+BTDTL_SEARCH_searchval+"' AND EDSH.UNIT_ID=VAU.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO,EDSH.EDSH_INTERNET_END_DATE";
    } 
    else if(BTDTL_SEARCH_searchby==122)//SEARCH BY STARTHUB COMMENTS
    {    
      BTDTL_SEARCH_searchval=eilib.ConvertSpclCharString(BTDTL_SEARCH_searchval);
      var BTDTL_SEARCH_select_starhub = "SELECT UD.UD_START_DATE,UD.UD_END_DATE,EDSH.EDSH_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(EDSH.EDSH_APPL_DATE,'%d-%m-%Y') AS EDSH_APPL_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_START_DATE,'%d-%m-%Y') AS EDSH_CABLE_START_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_END_DATE,'%d-%m-%Y') AS EDSH_CABLE_END_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_START_DATE,'%d-%m-%Y') AS EDSH_INTERNET_START_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_END_DATE,'%d-%m-%Y') AS EDSH_INTERNET_END_DATE,EDSH.EDSH_SSID,EDSH.EDSH_PWD,EDSH.EDSH_CABLE_BOX_SERIAL_NO,EDSH.EDSH_MODEM_SERIAL_NO,EDSH.EDSH_BASIC_GROUP,EDSH.EDSH_ADDTNL_CH,EDSH.EDSH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSH.EDSH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSH_TIMESTAMP FROM EXPENSE_DETAIL_STARHUB EDSH LEFT JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID, UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD,UNIT_DETAILS UD WHERE ULD.ULD_ID=EDSH.ULD_ID AND U.UNIT_ID=EDSH.UNIT_ID AND EDSH.EDSH_COMMENTS='"+BTDTL_SEARCH_searchval+"' AND EDSH.UNIT_ID=VAU.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO,EDSH.EDSH_COMMENTS";
    }  
    else if(BTDTL_SEARCH_searchby==112)//SEARCH BY STARTHUB BASIC GROUP
    {    
      var BTDTL_SEARCH_select_starhub = "SELECT UD.UD_START_DATE,UD.UD_END_DATE,EDSH.EDSH_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(EDSH.EDSH_APPL_DATE,'%d-%m-%Y') AS EDSH_APPL_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_START_DATE,'%d-%m-%Y') AS EDSH_CABLE_START_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_END_DATE,'%d-%m-%Y') AS EDSH_CABLE_END_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_START_DATE,'%d-%m-%Y') AS EDSH_INTERNET_START_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_END_DATE,'%d-%m-%Y') AS EDSH_INTERNET_END_DATE,EDSH.EDSH_SSID,EDSH.EDSH_PWD,EDSH.EDSH_CABLE_BOX_SERIAL_NO,EDSH.EDSH_MODEM_SERIAL_NO,EDSH.EDSH_BASIC_GROUP,EDSH.EDSH_ADDTNL_CH,EDSH.EDSH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSH.EDSH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSH_TIMESTAMP FROM EXPENSE_DETAIL_STARHUB EDSH LEFT JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID, UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD,UNIT_DETAILS UD WHERE ULD.ULD_ID=EDSH.ULD_ID AND U.UNIT_ID=EDSH.UNIT_ID AND  EDSH.EDSH_BASIC_GROUP='"+BTDTL_SEARCH_searchval+"' AND EDSH.UNIT_ID=VAU.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO,EDSH.EDSH_BASIC_GROUP";   
    } 
    else if(BTDTL_SEARCH_searchby==110)//SEARCH BY STARTHUB ADDTNL CH
    {    
      var BTDTL_SEARCH_select_starhub = "SELECT UD.UD_START_DATE,UD.UD_END_DATE,EDSH.EDSH_ID,U.UNIT_ID,U.UNIT_NO,EC.ECN_DATA,EDSH.EDSH_ACCOUNT_NO,DATE_FORMAT(EDSH.EDSH_APPL_DATE,'%d-%m-%Y') AS EDSH_APPL_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_START_DATE,'%d-%m-%Y') AS EDSH_CABLE_START_DATE,DATE_FORMAT(EDSH.EDSH_CABLE_END_DATE,'%d-%m-%Y') AS EDSH_CABLE_END_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_START_DATE,'%d-%m-%Y') AS EDSH_INTERNET_START_DATE,DATE_FORMAT(EDSH.EDSH_INTERNET_END_DATE,'%d-%m-%Y') AS EDSH_INTERNET_END_DATE,EDSH.EDSH_SSID,EDSH.EDSH_PWD,EDSH.EDSH_CABLE_BOX_SERIAL_NO,EDSH.EDSH_MODEM_SERIAL_NO,EDSH.EDSH_BASIC_GROUP,EDSH.EDSH_ADDTNL_CH,EDSH.EDSH_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(EDSH.EDSH_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS EDSH_TIMESTAMP FROM EXPENSE_DETAIL_STARHUB EDSH LEFT JOIN EXPENSE_CONFIGURATION EC ON EC.ECN_ID=EDSH.ECN_ID, UNIT U,VW_ACTIVE_UNIT VAU ,USER_LOGIN_DETAILS ULD,UNIT_DETAILS UD WHERE ULD.ULD_ID=EDSH.ULD_ID AND U.UNIT_ID=EDSH.UNIT_ID AND EDSH.EDSH_ADDTNL_CH='"+BTDTL_SEARCH_searchval+"' AND EDSH.UNIT_ID=VAU.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID ORDER BY U.UNIT_NO,EDSH.EDSH_ADDTNL_CH"; 
    } 
    var BTDTL_SEARCH_starhub_rs = BTDTL_SEARCH_stmt.executeQuery(BTDTL_SEARCH_select_starhub);
    while(BTDTL_SEARCH_starhub_rs.next())
    {
      var BTDTL_SEARCH_starhub_autoid = BTDTL_SEARCH_starhub_rs.getString('EDSH_ID')+'_'+BTDTL_SEARCH_starhub_rs.getString('U.UNIT_ID')+'_'+BTDTL_SEARCH_starhub_rs.getString('UD.UD_START_DATE')+'_'+BTDTL_SEARCH_starhub_rs.getString('UD.UD_END_DATE');
      var BTDTL_SEARCH_arr=[];       
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_starhub_rs.getString('UNIT_NO'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_starhub_rs.getString('ECN_DATA'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_starhub_rs.getString("EDSH_ACCOUNT_NO"));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_starhub_rs.getString('EDSH_APPL_DATE'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_starhub_rs.getString('EDSH_CABLE_START_DATE'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_starhub_rs.getString('EDSH_CABLE_END_DATE'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_starhub_rs.getString('EDSH_INTERNET_START_DATE'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_starhub_rs.getString('EDSH_INTERNET_END_DATE'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_starhub_rs.getString('EDSH_SSID'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_starhub_rs.getString('EDSH_PWD'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_starhub_rs.getString('EDSH_CABLE_BOX_SERIAL_NO'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_starhub_rs.getString('EDSH_MODEM_SERIAL_NO'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_starhub_rs.getString('EDSH_BASIC_GROUP'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_starhub_rs.getString('EDSH_ADDTNL_CH'));
      BTDTL_SEARCH_arr.push(BTDTL_SEARCH_starhub_rs.getString('EDSH_COMMENTS'));
      BTDTL_SEARCH_arr.push( BTDTL_SEARCH_starhub_rs.getString('ULD_LOGINID'));
      BTDTL_SEARCH_arr.push( BTDTL_SEARCH_starhub_rs.getString('EDSH_TIMESTAMP'));
      BTDTL_SEARCH_array.push(BTDTL_SEARCH_arr);
      BTDTL_SEARCH_id.push(BTDTL_SEARCH_starhub_autoid);
    }
    BTDTL_SEARCH_array.push(BTDTL_SEARCH_parentfunc)
    BTDTL_SEARCH_starhub_rs.close();BTDTL_SEARCH_stmt.close();
    var BTDTL_SEARCH_result={"BTDTL_SEARCH_expenseflex":BTDTL_SEARCH_array,"BTDTL_SEARCH_id":BTDTL_SEARCH_id}; 
    BTDTL_SEARCH_conn.close();
    return BTDTL_SEARCH_result;
  }
  /*----------------------------------------------------------------FUNCTION FOR UPDATION-------------------------------------------------------*/
  function BTDTL_SEARCH_updatForm(BTDTL_SEARCH_form_bizdetail,BTDTL_SEARCH_cable_sdate,BTDTL_SEARCH_cable_edate,BTDTL_SEARCH_internet_sdate,BTDTL_SEARCH_internet_edate,BTDTL_SEARCH_radiovalue,BTDTL_SEARCH_sh_arr)
  {
    var BTDTL_SEARCH_conn= eilib.db_GetConnection();
    BTDTL_SEARCH_conn.setAutoCommit(false);
    var BTDTL_SEARCH_searchvalue=PropertiesService.getUserProperties().getProperty('BTDTL_SEARCH_value')
    var BTDTL_SEARCH_searchdatevalue=PropertiesService.getUserProperties().getProperty('BTDTL_SEARCH_datevalue')
    var BTDTL_SEARCH_upd_expense_aircon=BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_radio_expense;
    var BTDTL_SEARCH_upd_ariconname=BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_tb_update_airconname;
    var BTDTL_SEARCH_expensetypes =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_lb_expense_type;
    var BTDTL_SEARCH_searchoption =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_lb_searchoptions;
    var BTDTL_SEARCH_unitno =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_tb_upd_unitno;
    var BTDTL_SEARCH_aircon_servicedby=BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_lb_oldaircon;
    var BTDTL_SEARCH_aircon_comments=BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_ta_upd_airconcomments;
    var BTDTL_SEARCH_carpark_carno =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_tb_upd_carno;
    var BTDTL_SEARCH_carpark_comments =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_ta_upd_carparkcomments;
    var BTDTL_SEARCH_electricity_comments =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_ta_upd_electricitycomments;
    var BTDTL_SEARCH_digital_voiceno =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_tb_upd_digital_voiceno;
    var BTDTL_SEARCH_digital_acctno =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_tb_upd_digitalacctno;
    var BTDTL_SEARCH_digital_comments =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_ta_upd_digitalcomments;
    var BTDTL_SEARCH_starhub_acctno =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_tb_upd_starhub_acctno;
    var BTDTL_SEARCH_starhub_appldate =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_db_upd_starhubappldate;
    var BTDTL_SEARCH_starhub_cablestartdate =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_db_upd_cablestartdate;
    var BTDTL_SEARCH_starhub_cableenddate =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_db_upd_cableenddate;
    var BTDTL_SEARCH_starhub_internetstartdate =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_db_upd_internetstartdate;
    var BTDTL_SEARCH_starhub_internetenddate =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_db_upd_internetenddate;
    var BTDTL_SEARCH_starhub_ssid =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_tb_upd_ssid;
    var BTDTL_SEARCH_starhub_pwd =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_tb_upd_pwd;
    var BTDTL_SEARCH_starhub_cableboxno =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_tb_upd_cableboxno;
    var BTDTL_SEARCH_starhub_modemno=BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_tb_upd_modemno;
    var BTDTL_SEARCH_starhub_basicgroup =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_ta_upd_basicgroup;
    var BTDTL_SEARCH_starhub_addtnl=BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_ta_upd_addtnl;
    var BTDTL_SEARCH_starhub_comments =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_ta_upd_starhubcomments;  
    var BTDTL_SEARCH_stmt =BTDTL_SEARCH_conn.createStatement();
    if(BTDTL_SEARCH_searchoption!=100)
      var BTDTL_SEARCH_beforeprimaryid=BTDTL_SEARCH_getmaxprimaryid(BTDTL_SEARCH_expensetypes)
      if(BTDTL_SEARCH_searchoption==100){//AIRCON SERVICED BY
        var BTDTL_SEARCH_insert="UPDATE EXPENSE_AIRCON_SERVICE_BY SET EASB_DATA='"+BTDTL_SEARCH_upd_ariconname+"',ULD_ID=(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"') WHERE EASB_ID="+BTDTL_SEARCH_upd_expense_aircon+"";}
    else{  
      if((BTDTL_SEARCH_starhub_appldate=="")||(BTDTL_SEARCH_starhub_appldate==undefined))
      BTDTL_SEARCH_starhub_appldate=null;  
      else
      {
        BTDTL_SEARCH_starhub_appldate=eilib.SqlDateFormat(BTDTL_SEARCH_starhub_appldate)
        BTDTL_SEARCH_starhub_appldate="'"+BTDTL_SEARCH_starhub_appldate+"'";
      }  
      if((BTDTL_SEARCH_starhub_cablestartdate=="")||(BTDTL_SEARCH_starhub_cablestartdate==undefined))
      BTDTL_SEARCH_starhub_cablestartdate=null;  
      else
      {
        var BTDTL_SEARCH_starhub_cablestartdate_shtime=BTDTL_SEARCH_starhub_cablestartdate;
        var BTDTL_SEARCH_starhub_cablestartdate = eilib.SqlDateFormat(BTDTL_SEARCH_starhub_cablestartdate)
        BTDTL_SEARCH_starhub_cablestartdate="'"+BTDTL_SEARCH_starhub_cablestartdate+"'";
      }
      if((BTDTL_SEARCH_starhub_cableenddate=="")||(BTDTL_SEARCH_starhub_cableenddate==undefined))
      BTDTL_SEARCH_starhub_cableenddate=null;  
      else
      {
        var BTDTL_SEARCH_starhub_cableenddate_shtime=BTDTL_SEARCH_starhub_cableenddate;
        var BTDTL_SEARCH_starhub_cableenddate = eilib.SqlDateFormat(BTDTL_SEARCH_starhub_cableenddate)
        BTDTL_SEARCH_starhub_cableenddate="'"+BTDTL_SEARCH_starhub_cableenddate+"'";
      }   
      if((BTDTL_SEARCH_starhub_internetstartdate=="")||(BTDTL_SEARCH_starhub_internetstartdate==undefined))
      BTDTL_SEARCH_starhub_internetstartdate=null;  
      else
      {
        var BTDTL_SEARCH_starhub_internetstartdate_shtime=BTDTL_SEARCH_starhub_internetstartdate;
        var BTDTL_SEARCH_starhub_internetstartdate = eilib.SqlDateFormat(BTDTL_SEARCH_starhub_internetstartdate)
        BTDTL_SEARCH_starhub_internetstartdate="'"+BTDTL_SEARCH_starhub_internetstartdate+"'";
      } 
      if((BTDTL_SEARCH_starhub_internetenddate=="")||(BTDTL_SEARCH_starhub_internetenddate==undefined))
      BTDTL_SEARCH_starhub_internetenddate=null;  
      else
      {
        var BTDTL_SEARCH_starhub_internetenddate_shtime=BTDTL_SEARCH_starhub_internetenddate;
        var BTDTL_SEARCH_starhub_internetenddate = eilib.SqlDateFormat(BTDTL_SEARCH_starhub_internetenddate)
        BTDTL_SEARCH_starhub_internetenddate="'"+BTDTL_SEARCH_starhub_internetenddate+"'";
      } 
      var BTDTL_SEARCH_unitid =BTDTL_SEARCH_radiovalue.split('_')
      var BTDTL_SEARCH_stmt_rec =BTDTL_SEARCH_conn.createStatement();
      var BTDTL_SEARCH_detailData=BTDTL_SEARCH_func_twodimen(BTDTL_SEARCH_expensetypes)
      var BTDTL_SEARCH_select_recordversion = "SELECT MAX("+BTDTL_SEARCH_detailData[3]+") AS "+BTDTL_SEARCH_detailData[3]+" FROM "+BTDTL_SEARCH_detailData[1]+" WHERE UNIT_ID="+BTDTL_SEARCH_unitid[1]+"";
      var BTDTL_SEARCH_recordversion_rs = BTDTL_SEARCH_stmt_rec.executeQuery(BTDTL_SEARCH_select_recordversion);
      if(BTDTL_SEARCH_recordversion_rs.next())
      {
        var BTDTL_SEARCH_recordversion = BTDTL_SEARCH_recordversion_rs.getString(BTDTL_SEARCH_detailData[3]);
      } 
      BTDTL_SEARCH_recordversion_rs.close();BTDTL_SEARCH_stmt_rec.close();
      if(BTDTL_SEARCH_recordversion==null)
        var BTDTL_SEARCH_recordversion=1;         
      else     
        var BTDTL_SEARCH_recordversion = parseInt(BTDTL_SEARCH_recordversion)+1;
      if(BTDTL_SEARCH_expensetypes==16)//AIRCON SERVICES
      {   
        if(BTDTL_SEARCH_aircon_comments=="")//COMMENTS
        {  BTDTL_SEARCH_aircon_comments=null;}else{
          BTDTL_SEARCH_aircon_comments='"'+eilib.ConvertSpclCharString(BTDTL_SEARCH_aircon_comments)+'"';}
        var BTDTL_SEARCH_insert = "INSERT INTO EXPENSE_DETAIL_AIRCON_SERVICE(UNIT_ID,EASB_ID,EDAS_REC_VER,EDAS_COMMENTS,ULD_ID)VALUES("+BTDTL_SEARCH_unitid[1]+","+BTDTL_SEARCH_aircon_servicedby+","+BTDTL_SEARCH_recordversion+","+BTDTL_SEARCH_aircon_comments+",(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'))"
      }      
      else if(BTDTL_SEARCH_expensetypes==17)//CARPARK
      { 
        if(BTDTL_SEARCH_carpark_comments=="")//COMMENTS
        {  BTDTL_SEARCH_carpark_comments=null;}else{
          BTDTL_SEARCH_carpark_comments='"'+eilib.ConvertSpclCharString(BTDTL_SEARCH_carpark_comments)+'"';}
        var BTDTL_SEARCH_insert = "INSERT INTO EXPENSE_DETAIL_CARPARK (UNIT_ID,EDCP_REC_VER,EDCP_CAR_NO,EDCP_COMMENTS,ULD_ID) VALUES("+BTDTL_SEARCH_unitid[1]+","+BTDTL_SEARCH_recordversion+",'"+BTDTL_SEARCH_carpark_carno+"',"+BTDTL_SEARCH_carpark_comments+",(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'))"
      }    
      else if(BTDTL_SEARCH_expensetypes==15)//DIGITAL VOICE
      {
        var BTDTL_SEARCH_invoiceto =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_upd_digital_invoiceto;
        if((BTDTL_SEARCH_invoiceto=='SELECT')||(BTDTL_SEARCH_invoiceto==''))
        BTDTL_SEARCH_invoiceto=null;
        if(BTDTL_SEARCH_carpark_comments=="")//COMMENTS
        {  BTDTL_SEARCH_digital_comments=null;}else{
          BTDTL_SEARCH_digital_comments='"'+eilib.ConvertSpclCharString(BTDTL_SEARCH_digital_comments)+'"';}
        var BTDTL_SEARCH_insert = "INSERT INTO EXPENSE_DETAIL_DIGITAL_VOICE(UNIT_ID,ECN_ID,EDDV_REC_VER,EDDV_DIGITAL_VOICE_NO,EDDV_DIGITAL_ACCOUNT_NO,EDDV_COMMENTS,ULD_ID)VALUES("+BTDTL_SEARCH_unitid[1]+","+BTDTL_SEARCH_invoiceto+",'"+BTDTL_SEARCH_recordversion+"','"+BTDTL_SEARCH_digital_voiceno+"','"+BTDTL_SEARCH_digital_acctno+"',"+BTDTL_SEARCH_digital_comments+",(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'))";
      }
      else if(BTDTL_SEARCH_expensetypes==13)//ELECTRICITY
      {    
        var BTDTL_SEARCH_invoiceto =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_upd_elec_invoiceto;
        if(BTDTL_SEARCH_electricity_comments=="")//COMMENTS
        {  BTDTL_SEARCH_electricity_comments=null;}else{
          BTDTL_SEARCH_electricity_comments='"'+eilib.ConvertSpclCharString(BTDTL_SEARCH_electricity_comments)+'"';}
        var BTDTL_SEARCH_insert="INSERT INTO EXPENSE_DETAIL_ELECTRICITY(UNIT_ID,ECN_ID,EDE_REC_VER,EDE_COMMENTS,ULD_ID)VALUES("+BTDTL_SEARCH_unitid[1]+","+BTDTL_SEARCH_invoiceto+","+BTDTL_SEARCH_recordversion+","+BTDTL_SEARCH_electricity_comments+",(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'))";
      }
      else if(BTDTL_SEARCH_expensetypes==14)//STARHUB
      {
        var BTDTL_SEARCH_invoiceto =BTDTL_SEARCH_form_bizdetail.BTDTL_SEARCH_lb_upd_starhub_invoiceto;
        if((BTDTL_SEARCH_invoiceto=='SELECT')||(BTDTL_SEARCH_invoiceto==''))
        BTDTL_SEARCH_invoiceto=null;
        if(BTDTL_SEARCH_starhub_ssid=="")//SSID
        {  BTDTL_SEARCH_starhub_ssid=null;}else{
          BTDTL_SEARCH_starhub_ssid='"'+eilib.ConvertSpclCharString(BTDTL_SEARCH_starhub_ssid)+'"';}
        if(BTDTL_SEARCH_starhub_pwd=="")//PSWD
        {  BTDTL_SEARCH_starhub_pwd=null;}else{
          BTDTL_SEARCH_starhub_pwd='"'+eilib.ConvertSpclCharString(BTDTL_SEARCH_starhub_pwd)+'"';}
        if(BTDTL_SEARCH_starhub_cableboxno=="")//CABLE SLNO
        {  BTDTL_SEARCH_starhub_cableboxno=null;}else{
          BTDTL_SEARCH_starhub_cableboxno='"'+eilib.ConvertSpclCharString(BTDTL_SEARCH_starhub_cableboxno)+'"';}
        if(BTDTL_SEARCH_starhub_modemno=="")//MODEM SLNO
        {  BTDTL_SEARCH_starhub_modemno=null;}else{
          BTDTL_SEARCH_starhub_modemno='"'+eilib.ConvertSpclCharString(BTDTL_SEARCH_starhub_modemno)+'"';}
        if(BTDTL_SEARCH_starhub_basicgroup=="")//BASIC GROUP 
        {  BTDTL_SEARCH_starhub_basicgroup=null;}else{
          BTDTL_SEARCH_starhub_basicgroup='"'+eilib.ConvertSpclCharString(BTDTL_SEARCH_starhub_basicgroup)+'"';}  
        if(BTDTL_SEARCH_starhub_addtnl=="")//ADDLN 
        {  BTDTL_SEARCH_starhub_addtnl=null;}else{
          BTDTL_SEARCH_starhub_addtnl='"'+eilib.ConvertSpclCharString(BTDTL_SEARCH_starhub_addtnl)+'"';}       
        if(BTDTL_SEARCH_starhub_comments=="")//COMMENTS 
        {  BTDTL_SEARCH_starhub_comments=null;}else{
          BTDTL_SEARCH_starhub_comments='"'+eilib.ConvertSpclCharString(BTDTL_SEARCH_starhub_comments)+'"';}    
        var BTDTL_SEARCH_insert="INSERT INTO EXPENSE_DETAIL_STARHUB(UNIT_ID,ECN_ID,EDSH_REC_VER,EDSH_ACCOUNT_NO,EDSH_APPL_DATE,EDSH_CABLE_START_DATE,EDSH_CABLE_END_DATE,EDSH_INTERNET_START_DATE,EDSH_INTERNET_END_DATE,EDSH_SSID,EDSH_PWD,EDSH_CABLE_BOX_SERIAL_NO,EDSH_MODEM_SERIAL_NO,EDSH_BASIC_GROUP,EDSH_ADDTNL_CH,EDSH_COMMENTS,ULD_ID)VALUES("+BTDTL_SEARCH_unitid[1]+","+BTDTL_SEARCH_invoiceto+","+BTDTL_SEARCH_recordversion+",'"+BTDTL_SEARCH_starhub_acctno+"',"+BTDTL_SEARCH_starhub_appldate+","+BTDTL_SEARCH_starhub_cablestartdate+","+BTDTL_SEARCH_starhub_cableenddate+","+BTDTL_SEARCH_starhub_internetstartdate+","+BTDTL_SEARCH_starhub_internetenddate+","+BTDTL_SEARCH_starhub_ssid+","+BTDTL_SEARCH_starhub_pwd+", "+BTDTL_SEARCH_starhub_cableboxno+","+BTDTL_SEARCH_starhub_modemno+","+BTDTL_SEARCH_starhub_basicgroup+","+BTDTL_SEARCH_starhub_addtnl+","+BTDTL_SEARCH_starhub_comments+",(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'))";       
        var BTDTL_SEARCH_sh_starttime=BTDTL_SEARCH_sh_arr[0];
        var BTDTL_SEARCH_sh_endtime=BTDTL_SEARCH_sh_arr[1];
        if((BTDTL_SEARCH_starhub_cablestartdate_shtime!='')&&(BTDTL_SEARCH_starhub_cableenddate_shtime!='')&&(BTDTL_SEARCH_starhub_cablestartdate_shtime!=undefined)&&(BTDTL_SEARCH_starhub_cableenddate_shtime!=undefined))
        {     
          var calenderIDcode=eilib.CUST_getCalenderId(BTDTL_SEARCH_conn);
          if((BTDTL_SEARCH_cable_sdate!='')&&(BTDTL_SEARCH_cable_edate!='')){
            eilib.StarHubUnit_DeleteCalEvent(BTDTL_SEARCH_unitno,calenderIDcode,BTDTL_SEARCH_cable_sdate,BTDTL_SEARCH_sh_starttime,BTDTL_SEARCH_sh_endtime,BTDTL_SEARCH_cable_edate,BTDTL_SEARCH_sh_starttime,BTDTL_SEARCH_sh_endtime,'STARHUB')
          }
          eilib.StarHubUnit_CreateCalEvent(calenderIDcode,BTDTL_SEARCH_starhub_cablestartdate_shtime,BTDTL_SEARCH_sh_starttime,BTDTL_SEARCH_sh_endtime,BTDTL_SEARCH_starhub_cableenddate_shtime,BTDTL_SEARCH_sh_starttime,BTDTL_SEARCH_sh_endtime,'STARHUB',BTDTL_SEARCH_unitno,BTDTL_SEARCH_starhub_acctno,'CABLE START DATE','CABLE END DATE','','')
        } 
        if((BTDTL_SEARCH_starhub_internetstartdate_shtime!='')&&(BTDTL_SEARCH_starhub_internetenddate_shtime!='')&&(BTDTL_SEARCH_starhub_internetstartdate_shtime!=undefined)&&(BTDTL_SEARCH_starhub_internetenddate_shtime!=undefined))
        {       
          var calenderIDcode=eilib.CUST_getCalenderId(BTDTL_SEARCH_conn);
          if((BTDTL_SEARCH_internet_sdate!='')&&(BTDTL_SEARCH_internet_edate!='')){
            eilib.StarHubUnit_DeleteCalEvent(BTDTL_SEARCH_unitno,calenderIDcode,BTDTL_SEARCH_internet_sdate,BTDTL_SEARCH_sh_starttime,BTDTL_SEARCH_sh_endtime,BTDTL_SEARCH_internet_edate,BTDTL_SEARCH_sh_starttime,BTDTL_SEARCH_sh_endtime,'STARHUB')
          }
          eilib.StarHubUnit_CreateCalEvent(calenderIDcode,BTDTL_SEARCH_starhub_internetstartdate_shtime,BTDTL_SEARCH_sh_starttime,BTDTL_SEARCH_sh_endtime,BTDTL_SEARCH_starhub_internetenddate_shtime,BTDTL_SEARCH_sh_starttime,BTDTL_SEARCH_sh_endtime,'STARHUB',BTDTL_SEARCH_unitno,BTDTL_SEARCH_starhub_acctno,'INTERNET START DATE','INTERNET END DATE','','')
        } 
      } }
    BTDTL_SEARCH_stmt.execute(BTDTL_SEARCH_insert);
    BTDTL_SEARCH_stmt.close();
    BTDTL_SEARCH_conn.commit();
    if(BTDTL_SEARCH_searchoption!=100){
      var BTDTL_SEARCH_afterprimaryid=BTDTL_SEARCH_getmaxprimaryid(BTDTL_SEARCH_expensetypes)
      if(BTDTL_SEARCH_afterprimaryid[0]>BTDTL_SEARCH_beforeprimaryid[0])
        var BTDTL_SEARCH_flag_update='BTDTL_SEARCH_flag_update'
        else
          var BTDTL_SEARCH_flag_update='BTDTL_SEARCH_flag_notupdate';
    }
    var BTDTL_SEARCH_refresh=[];
    if(BTDTL_SEARCH_expensetypes==16){
      if(BTDTL_SEARCH_searchoption==100)
        var BTDTL_SEARCH_refresh= BTDTL_SEARCH_expense_searchby(BTDTL_SEARCH_searchoption,BTDTL_SEARCH_expensetypes,'BTDTL_SEARCH_flag_aircon_update');
      else
        var BTDTL_SEARCH_refresh= BTDTL_SEARCH_flex_aircon(BTDTL_SEARCH_searchvalue,BTDTL_SEARCH_searchoption,BTDTL_SEARCH_flag_update);}
    else if(BTDTL_SEARCH_expensetypes==17)
      var BTDTL_SEARCH_refresh= BTDTL_SEARCH_show_carpark(BTDTL_SEARCH_searchvalue,BTDTL_SEARCH_searchoption,BTDTL_SEARCH_flag_update);
    else if(BTDTL_SEARCH_expensetypes==13)
      var BTDTL_SEARCH_refresh= BTDTL_SEARCH_show_electricity(BTDTL_SEARCH_searchvalue,BTDTL_SEARCH_searchoption,BTDTL_SEARCH_flag_update);
    else if(BTDTL_SEARCH_expensetypes==15)
      var BTDTL_SEARCH_refresh= BTDTL_SEARCH_show_digital(BTDTL_SEARCH_searchvalue,BTDTL_SEARCH_searchoption,BTDTL_SEARCH_flag_update);
    else if(BTDTL_SEARCH_expensetypes==14)
      var BTDTL_SEARCH_refresh = BTDTL_SEARCH_show_starhub(BTDTL_SEARCH_searchdatevalue,BTDTL_SEARCH_searchvalue,BTDTL_SEARCH_searchoption,BTDTL_SEARCH_flag_update)
      if((BTDTL_SEARCH_refresh.BTDTL_SEARCH_id.length==0) &&(BTDTL_SEARCH_searchoptions!=101)&&(BTDTL_SEARCH_searchoptions!=103)&&(BTDTL_SEARCH_searchoptions!=108)&&(BTDTL_SEARCH_searchoptions!=104)&&(BTDTL_SEARCH_searchoptions!=110)&&(BTDTL_SEARCH_searchoptions!=112)&&(BTDTL_SEARCH_searchoptions!=122))
      var BTDTL_SEARCH_refresh= BTDTL_SEARCH_expense_searchby(BTDTL_SEARCH_searchoption,BTDTL_SEARCH_expensetypes,'BTDTL_SEARCH_update_listbox');
    BTDTL_SEARCH_conn.close();
    return BTDTL_SEARCH_refresh;  
  }
  /*-------------------------------------FUNCTION FOR RADIO BUTTON CLICK-------------------------------*/
  function BTDTL_SEARCH_radio_delete(BTDTL_SEARCH_expenseid,BTDTL_SEARCH_expensetypes,BTDTL_SEARCH_searchoptions)
  {  
    var BTDTL_SEARCH_conn =eilib.db_GetConnection();
    var BTDTL_SEARCH_id=BTDTL_SEARCH_expenseid.split('_')
    if(BTDTL_SEARCH_searchoptions==100)
      var BTDTL_SEARCH_id=BTDTL_SEARCH_searchoptions
      var BTDTL_SEARCH_tableid=BTDTL_SEARCH_func_twodimen(BTDTL_SEARCH_expensetypes);
    var BTDTL_SEARCH_flag_delete=eilib.ChkTransactionBeforeDelete(BTDTL_SEARCH_conn,BTDTL_SEARCH_tableid[2],BTDTL_SEARCH_id[0])
    BTDTL_SEARCH_conn.close();
    return BTDTL_SEARCH_flag_delete;}
  /*------------------------------------------------------------------FUNCTION FOR DELETION----------------------------------------------------------------------------*/
  function BTDTL_SEARCH_delete(BTDTL_SEARCH_expenseid,BTDTL_SEARCH_expensetypes,BTDTL_SEARCH_searchoptions,BTDTL_SEARCH_obj,BTDTL_SEARCH_sh_arr){
    var BTDTL_SEARCH_conn =eilib.db_GetConnection();
    var BTDTL_SEARCH_flag_delete=true;
    var BTDTL_SEARCH_searchvalue=PropertiesService.getUserProperties().getProperty('BTDTL_SEARCH_value')
    var BTDTL_SEARCH_searchdatevalue=PropertiesService.getUserProperties().getProperty('BTDTL_SEARCH_datevalue')
    BTDTL_SEARCH_expenseid=BTDTL_SEARCH_expenseid.split('_')
    if(BTDTL_SEARCH_searchoptions==100)
      var BTDTL_SEARCH_arryid=BTDTL_SEARCH_searchoptions
      var BTDTL_SEARCH_postid=BTDTL_SEARCH_func_twodimen(BTDTL_SEARCH_expensetypes)
      var BTDTL_SEARCH_deleteflag=eilib.DeleteRecord(BTDTL_SEARCH_conn,BTDTL_SEARCH_postid[2],BTDTL_SEARCH_expenseid[0]);
    if(BTDTL_SEARCH_deleteflag==1)
      var BTDTL_SEARCH_flag_del='BTDTL_SEARCH_flag_delete';
    else
      var BTDTL_SEARCH_flag_del=0; 
    var calenderIDcode=eilib.CUST_getCalenderId(BTDTL_SEARCH_conn);
    if((BTDTL_SEARCH_obj.BTDTL_SEARCH_objfive!='')&&(BTDTL_SEARCH_obj.BTDTL_SEARCH_objsix!='')){
      eilib.StarHubUnit_DeleteCalEvent(BTDTL_SEARCH_obj.BTDTL_SEARCH_objfirst,calenderIDcode,BTDTL_SEARCH_obj.BTDTL_SEARCH_objfive,BTDTL_SEARCH_sh_arr[0],BTDTL_SEARCH_sh_arr[1],BTDTL_SEARCH_obj.BTDTL_SEARCH_objsix,BTDTL_SEARCH_sh_arr[0],BTDTL_SEARCH_sh_arr[1])
    }
    if((BTDTL_SEARCH_obj.BTDTL_SEARCH_objseven!='')&&(BTDTL_SEARCH_obj.BTDTL_SEARCH_objeight!='')){
      eilib.StarHubUnit_DeleteCalEvent(BTDTL_SEARCH_obj.BTDTL_SEARCH_objfirst,calenderIDcode,BTDTL_SEARCH_obj.BTDTL_SEARCH_objseven,BTDTL_SEARCH_sh_arr[0],BTDTL_SEARCH_sh_arr[1],BTDTL_SEARCH_obj.BTDTL_SEARCH_objeight,BTDTL_SEARCH_sh_arr[0],BTDTL_SEARCH_sh_arr[1])
    }
    var BTDTL_SEARCH_refresh=[];
    if(BTDTL_SEARCH_expensetypes==16){
      if(BTDTL_SEARCH_searchoptions==100)
        var BTDTL_SEARCH_refresh= BTDTL_SEARCH_expense_searchby(BTDTL_SEARCH_searchoptions,BTDTL_SEARCH_expensetypes,BTDTL_SEARCH_flag_del);
      else
        var BTDTL_SEARCH_refresh= BTDTL_SEARCH_flex_aircon(BTDTL_SEARCH_searchvalue,BTDTL_SEARCH_searchoptions,BTDTL_SEARCH_flag_del);}
    else if(BTDTL_SEARCH_expensetypes==17)
      var BTDTL_SEARCH_refresh= BTDTL_SEARCH_show_carpark(BTDTL_SEARCH_searchvalue,BTDTL_SEARCH_searchoptions,BTDTL_SEARCH_flag_del);
    else if(BTDTL_SEARCH_expensetypes==13)
      var BTDTL_SEARCH_refresh= BTDTL_SEARCH_show_electricity(BTDTL_SEARCH_searchvalue,BTDTL_SEARCH_searchoptions,BTDTL_SEARCH_flag_del);
    else if(BTDTL_SEARCH_expensetypes==15)
      var BTDTL_SEARCH_refresh= BTDTL_SEARCH_show_digital(BTDTL_SEARCH_searchvalue,BTDTL_SEARCH_searchoptions,BTDTL_SEARCH_flag_del);
    else if(BTDTL_SEARCH_expensetypes==14)
      var BTDTL_SEARCH_refresh = BTDTL_SEARCH_show_starhub(BTDTL_SEARCH_searchdatevalue,BTDTL_SEARCH_searchvalue,BTDTL_SEARCH_searchoptions,BTDTL_SEARCH_flag_del)
      if((BTDTL_SEARCH_refresh.BTDTL_SEARCH_id.length==0) &&(BTDTL_SEARCH_searchoptions!=101)&&(BTDTL_SEARCH_searchoptions!=103)&&(BTDTL_SEARCH_searchoptions!=108)&&(BTDTL_SEARCH_searchoptions!=104)&&(BTDTL_SEARCH_searchoptions!=110)&&(BTDTL_SEARCH_searchoptions!=112)&&(BTDTL_SEARCH_searchoptions!=122)){
        var BTDTL_SEARCH_refresh= BTDTL_SEARCH_expense_searchby(BTDTL_SEARCH_searchoptions,BTDTL_SEARCH_expensetypes,'BTDTL_SEARCH_flag_delete');
      }
    BTDTL_SEARCH_conn.close();  
    return BTDTL_SEARCH_refresh;  
  }
  /*-------------------------------------------------FUNCTION FOR TOWDIMENSION ARRAY TO GET DETAILS--------------------------------------*/
  function BTDTL_SEARCH_func_twodimen(BTDTL_SEARCH_profile_names)
  {
    var BTDTL_SEARCH_twodimen={100:['EASB_ID','EXPENSE_AIRCON_SERVICE_BY',45,'EDAS_REC_VER'],16:['EDAS_ID','EXPENSE_DETAIL_AIRCON_SERVICE',49,'EDAS_REC_VER'],17:['EDCP_ID','EXPENSE_DETAIL_CARPARK',50,'EDCP_REC_VER'],15:['EDDV_ID','EXPENSE_DETAIL_DIGITAL_VOICE',48,'EDDV_REC_VER'],
                               13:['EDE_ID','EXPENSE_DETAIL_ELECTRICITY',47,'EDE_REC_VER'],14:['EDSH_ID','EXPENSE_DETAIL_STARHUB',46,'EDSH_REC_VER']                                     
                              }
    return [BTDTL_SEARCH_twodimen[BTDTL_SEARCH_profile_names][0],BTDTL_SEARCH_twodimen[BTDTL_SEARCH_profile_names][1],BTDTL_SEARCH_twodimen[BTDTL_SEARCH_profile_names][2],BTDTL_SEARCH_twodimen[BTDTL_SEARCH_profile_names][3]];    
  }
  /*--------------------------------------FUNCTION TO CHECK WHETHER THE DATA INSERTED OR NOT---------------------------------------*/
  function BTDTL_SEARCH_getmaxprimaryid(BTDTL_SEARCH_profile_names){
    var BTDTL_SEARCH_conn =eilib.db_GetConnection();
    var BTDTL_SEARCH_detailData=BTDTL_SEARCH_func_twodimen(BTDTL_SEARCH_profile_names)
    var BTDTL_SEARCH_stmt_primaryid = BTDTL_SEARCH_conn.createStatement();
    var BTDTL_SEARCH_select="SELECT MAX("+BTDTL_SEARCH_detailData[0]+") AS PRIMARY_ID FROM "+BTDTL_SEARCH_detailData[1]+"";
    var BTDTL_SEARCH_rs_primaryid=BTDTL_SEARCH_stmt_primaryid.executeQuery(BTDTL_SEARCH_select);
    while(BTDTL_SEARCH_rs_primaryid.next())
      var BTDTL_SEARCH_primaryid=BTDTL_SEARCH_rs_primaryid.getString("PRIMARY_ID");
    BTDTL_SEARCH_rs_primaryid.close();BTDTL_SEARCH_stmt_primaryid.close();    
    return [BTDTL_SEARCH_primaryid];        
  }
  /*------------------------------------CODING TO CHECK AIRCONSERVICE BY IN TABLE------------------------------------------------------*/
  function BTDTL_SEARCH_airconservicedby_check(BTDTL_SEARCH_alreadyexists)
  {
    var BTDTL_SEARCH_conn =eilib.db_GetConnection();
    var BTDTL_SEARCH_flag=eilib.Check_ExistsAirconservicedby(BTDTL_SEARCH_conn,BTDTL_SEARCH_alreadyexists)
    return BTDTL_SEARCH_flag;
    BTDTL_SEARCH_conn.close();
  }}
catch(err)
{
}
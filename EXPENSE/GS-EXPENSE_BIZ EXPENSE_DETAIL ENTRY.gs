//**********************************************FILE DESCRIPTION*********************************************//
//*******************************************BIZ EXPENSE DETAIL ENTRY*********************************************//
//DONE BY:SARADAMBAL
//VER 1.4-SD:11/06/2014 ED:11/06/2014,TRACKER NO:479,implemented script for commit and failure function ,put err msg for calendar,retrieve month from config db and updated in dp,removed arr concept for already exist and put eilib function (aircon service by)
//VER 1.3 -SD:07/06/2014 ED:07/06/2014,TRACKER NO:479,updated new link
//VER 1.2-SD:22/04/2014 ED:23/04/2014,TRACKER NO:479,implemented dp validation for cable sdate and edate,appl date and internet sdate and edate
//VER 1.1-SD:08/03/2014 ED:08/03/2014,TRACKER NO:479,implemented array concept to reduced same query and removed script for already exist data for airconserived by ,implement arr to find already exists,removed two function
//VER 1.0-SD:03/03/2014 ED:03/03/2014,TRACKER NO:479,implemented uldid instead of userstamp,reduced coding for getting ecn_id and getting unitid using two dimenstion array
//VER 0.09-SD:14/02/2014 ED:17/02/2013,TRACKER NO:479,updated sp for returning flag,updated errormsg,implemented script for insertion whether the data is saved or not,implemented sp for aircon details
//VER 0.08-SD:22/01/2014 ED:05/02/2013,TRACKER NO:479,implemented stmt close for one function,cleared datepicker issue while save btn validation,implemented eilib for error msg , also for all general field(special character) and for getStarHubUnitCalTime
//VER 0.07-SD:02/01/2014 ED:03/01/2013,TRACKER NO:479,cleared issue included to show errormsg,implemented validation for carno,starhub acc no,digital acc no
//VER 0.06-SD:30/12/2013 ED:30/12/2013,TRACKER NO:479,removed utilities function,implement connection open & close function for eilib function,changed alignment for form title
//VER 0.05-SD:13/12/2013 ED:13/12/2013,TRACKER NO:479,corrected file name
//VER 0.04-SD:08/11/2013 ED:28/11/2013,TRACKER NO:479,updated primary id instead of using data,implement calendar event,change name for addtnl channel,form design changed for aircon,implemented eilib for aircon serviced by,implemented failure function,done validation for start end date,updated failure function,implemented min date max date for cable,internet sdate edate
//VER 0.03-SD:08/10/2013 ED:08/10/2013,TRACKER NO:479,updated head tag links & implement return function
//VER 0.02-SD:04/10/2013 ED:04/10/2013,TRACKER NO:479,updated eilib connection,message box,preloader,removed scriplet,change date format,change reset to clear all elements nd make it intial size nd width,change lowercase for comments,center the save & reset btn,change uppercase for airconserviced by
//VER 0.01-INITIAL VERSION,TRACKER NO:479,SD:05/09/2013,ED:11/09/2013
//*********************************************************************************************************//
try{
  /*------------------------------------------FUNCTION FOR FETCHING ERROR MESSAGE ,EXPENSE TYPES AND INVOICE --------------------------------------*/
  function BDTL_INPUT_expense_err_invoice()
  {
    var BDTL_INPUT_conn =eilib.db_GetConnection();
    var BDTL_INPUT_biz_expense_type_array = [];
    var BDTL_INPUT_bizexp_invoiceto_array = [];
    var BDTL_INPUT_arr_aircon=[];
    var BDTL_INPUT_biz_detail_error_array =  eilib.GetErrorMessageList(BDTL_INPUT_conn,'1,2,103,105,238,248,400,458');
    var BDTL_INPUT_check_unitflag=false;
    var BDTL_INPUT_check_unitno= 'SELECT UNIT_ID FROM UNIT';
    var BDTL_INPUT_check_stmt =BDTL_INPUT_conn.createStatement();
    var BDTL_INPUT_checkunit_rs = BDTL_INPUT_check_stmt.executeQuery(BDTL_INPUT_check_unitno)
    while(BDTL_INPUT_checkunit_rs.next())
      BDTL_INPUT_check_unitflag=true;
    BDTL_INPUT_checkunit_rs.close(); BDTL_INPUT_check_stmt.close();
    if(BDTL_INPUT_check_unitflag==true){
      var BDTL_INPUT_lb_expense_type_stmt = BDTL_INPUT_conn.createStatement();
      var BDTL_INPUT_lb_expense_type_query = "SELECT ECN_ID,ECN_DATA FROM EXPENSE_CONFIGURATION WHERE  ECN_ID IN(16,17,15,13,14,19,20,21,200) ORDER BY ECN_DATA ASC";
      var BDTL_INPUT_type_rs = BDTL_INPUT_lb_expense_type_stmt.executeQuery(BDTL_INPUT_lb_expense_type_query);
      while(BDTL_INPUT_type_rs.next()){
        if(BDTL_INPUT_type_rs.getString(1)==200)
          var BDTL_INPUT_configmonth=BDTL_INPUT_type_rs.getString(2);
        else if((BDTL_INPUT_type_rs.getString(1)==19)||(BDTL_INPUT_type_rs.getString(1)==20)||(BDTL_INPUT_type_rs.getString(1)==21))
        BDTL_INPUT_bizexp_invoiceto_array.push({"BDTL_INPUT_expensetypes_id":BDTL_INPUT_type_rs.getString(1),"BDTL_INPUT_expensetypes_data":BDTL_INPUT_type_rs.getString(2)})
        else{
          BDTL_INPUT_biz_expense_type_array.push({"BDTL_INPUT_expensetypes_id":BDTL_INPUT_type_rs.getString(1),"BDTL_INPUT_expensetypes_data":BDTL_INPUT_type_rs.getString(2)});
        }}    
      BDTL_INPUT_type_rs.close(); BDTL_INPUT_lb_expense_type_stmt.close();
      BDTL_INPUT_arr_aircon=BDTL_INPUT_aircon_list();
    }
    var BDTL_INPUT_result=[];    
    BDTL_INPUT_result={"BDTL_INPUT_error":BDTL_INPUT_biz_detail_error_array.errormsg,"BDTL_INPUT_expense":BDTL_INPUT_biz_expense_type_array,"BDTL_INPUT_invoice":BDTL_INPUT_bizexp_invoiceto_array,"BDTL_INPUT_obj_unitflag":BDTL_INPUT_check_unitflag,"BDTL_INPUT_obj_aircon":BDTL_INPUT_arr_aircon,"BDTL_INPUT_obj_configmonth":BDTL_INPUT_configmonth};      
    return BDTL_INPUT_result;
    BDTL_INPUT_conn.close();
  }
  /*-----------------------------------------CODING TO GET UNIT NO FROM UNIT TABLE------------------------------------------------------------------*/
  function BDTL_INPUT_all_exp_types_unitno(BDTL_INPUT_all_expense_types)
  {
    var BDTL_INPUT_bizexp_alltypes;
    var BDTL_INPUT_conn =eilib.db_GetConnection();    
    var BDTL_INPUT_unitno_stmt = BDTL_INPUT_conn.createStatement();
    var BDTL_INPUT_bizexp_unitno_array = [];
    var BDTL_INPUT_twodimen={16:['EDAS_ID','EXPENSE_DETAIL_AIRCON_SERVICE'],17:['EDCP_ID','EXPENSE_DETAIL_CARPARK'],15:['EDDV_ID','EXPENSE_DETAIL_DIGITAL_VOICE'],
                             13:['EDE_ID','EXPENSE_DETAIL_ELECTRICITY'],14:['EDSH_ID','EXPENSE_DETAIL_STARHUB']                                     
                            }    
    var BDTL_INPUT_expunitnumbers = "SELECT UNIT_ID,UNIT_NO FROM UNIT WHERE UNIT_ID NOT IN (SELECT UNIT_ID FROM "+BDTL_INPUT_twodimen[BDTL_INPUT_all_expense_types][1]+") ORDER BY UNIT_NO ASC";
    var BDTL_INPUT_expense_unitno_rs = BDTL_INPUT_unitno_stmt.executeQuery(BDTL_INPUT_expunitnumbers);
    while(BDTL_INPUT_expense_unitno_rs.next())
    {
      BDTL_INPUT_bizexp_unitno_array.push({"BDTL_INPUT_obj_unitid":BDTL_INPUT_expense_unitno_rs.getString(1),"BDTL_INPUT_obj_unitno":BDTL_INPUT_expense_unitno_rs.getString(2)});
    }
    return BDTL_INPUT_bizexp_unitno_array;
    BDTL_INPUT_expense_unitno_rs.close(); BDTL_INPUT_unitno_stmt.close();
    BDTL_INPUT_conn.close();
  }
  /*----------------------------------------------CODING TO GET AIRCON SERVICED BY DATA LIST-------------------------------------------------*/
  function BDTL_INPUT_aircon_list()
  {    
    var BDTL_INPUT_conn =eilib.db_GetConnection();
    var BDTL_INPUT_aircon_data_array = [];
    var BDTL_INPUT_selectaircon_data = "SELECT EASB_DATA FROM EXPENSE_AIRCON_SERVICE_BY WHERE EASB_DATA  IS NOT NULL ORDER BY EASB_DATA ASC";
    var BDTL_INPUT_aircon_datas_stmt = BDTL_INPUT_conn.createStatement();
    var BDTL_INPUT_aircon_datas_rs = BDTL_INPUT_aircon_datas_stmt.executeQuery(BDTL_INPUT_selectaircon_data);
    while(BDTL_INPUT_aircon_datas_rs.next())
    {
      BDTL_INPUT_aircon_data_array.push(BDTL_INPUT_aircon_datas_rs.getString("EASB_DATA"));
    }
    return BDTL_INPUT_aircon_data_array;
    BDTL_INPUT_aircon_datas_rs.close(); BDTL_INPUT_aircon_datas_stmt.close();
    BDTL_INPUT_conn.close();
  }
  /*--------------------------------------FUNCTION TO CHECK WHETHER THE DATA INSERTED OR NOT---------------------------------------*/
  function BDTL_INPUT_getmaxprimaryid(BDTL_INPUT_profile_names){
    var BDTL_INPUT_conn =eilib.db_GetConnection();
    var BDTL_INPUT_twodimen={17:['EDCP_ID','EXPENSE_DETAIL_CARPARK'],15:['EDDV_ID','EXPENSE_DETAIL_DIGITAL_VOICE'],
                             13:['EDE_ID','EXPENSE_DETAIL_ELECTRICITY'],14:['EDSH_ID','EXPENSE_DETAIL_STARHUB']                                     
                            }
    var BDTL_INPUT_stmt_primaryid = BDTL_INPUT_conn.createStatement();
    var BDTL_INPUT_select="SELECT MAX("+BDTL_INPUT_twodimen[BDTL_INPUT_profile_names][0]+") AS PRIMARY_ID FROM "+BDTL_INPUT_twodimen[BDTL_INPUT_profile_names][1]+"";
    var BDTL_INPUT_rs_primaryid=BDTL_INPUT_stmt_primaryid.executeQuery(BDTL_INPUT_select);
    while(BDTL_INPUT_rs_primaryid.next())
      var BDTL_INPUT_primaryid=BDTL_INPUT_rs_primaryid.getString("PRIMARY_ID");
    BDTL_INPUT_rs_primaryid.close();BDTL_INPUT_stmt_primaryid.close();
    return BDTL_INPUT_primaryid;        
  }
  /*-----------------------------CODING TO SAVE THE AIRCON DETAIL,CARPARK,ELECTRICITY,DIGITAL VOICE,STARHUB IN DATABASE----------------------------------------------------------*/
  function BDTL_INPUT_save(BDTL_INPUT_form_biz_detail)
  {
    var BDTL_INPUT_conn =eilib.db_GetConnection();
    BDTL_INPUT_conn.setAutoCommit(false);
    var BDTL_INPUT_aircon_list_ref=[];
    var BDTL_INPUT_expensetypes = BDTL_INPUT_form_biz_detail.BDTL_INPUT_lb_expense_type;
    var BDTL_INPUT_unitno =BDTL_INPUT_form_biz_detail.BDTL_INPUT_lb_unitno_list;
    var BDTL_INPUT_unitnoaircon =BDTL_INPUT_form_biz_detail.BDTL_INPUT_hidden_unitno;
    var BDTL_INPUT_aircon_oldservice = BDTL_INPUT_form_biz_detail.BDTL_INPUT_lb_airconservicedby;
    var BDTL_INPUT_aircon_newservice = BDTL_INPUT_form_biz_detail.BDTL_INPUT_tb_newaircon;
    var BDTL_INPUT_aircon_comments= BDTL_INPUT_form_biz_detail.BDTL_INPUT_ta_aircon_comments;
    var BDTL_INPUT_carno= BDTL_INPUT_form_biz_detail.BDTL_INPUT_tb_exp_carno;
    var BDTL_INPUT_car_comments= BDTL_INPUT_form_biz_detail.BDTL_INPUT_ta_carpark_comments;
    var BDTL_INPUT_digital_invoiceto= BDTL_INPUT_form_biz_detail.BDTL_INPUT_lb_digital_invoiceto;
    var BDTL_INPUT_digital_voice= BDTL_INPUT_form_biz_detail.BDTL_INPUT_tb_exp_digivoiceno;
    var BDTL_INPUT_digital_acctno= BDTL_INPUT_form_biz_detail.BDTL_INPUT_tb_exp_digiaccno;
    var BDTL_INPUT_digital_comments=BDTL_INPUT_form_biz_detail.BDTL_INPUT_ta_digitalvoice_comments;
    var BDTL_INPUT_electricity_invoice= BDTL_INPUT_form_biz_detail.BDTL_INPUT_lb_bizdetail_electricity_invoiceto;
    var BDTL_INPUT_electricity_comments=BDTL_INPUT_form_biz_detail.BDTL_INPUT_ta_ectricity_comments;
    var BDTL_INPUT_starhub_invoiceto= BDTL_INPUT_form_biz_detail.BDTL_INPUT_lb_starhub_invoiceto;
    var BDTL_INPUT_starhub_acctno= BDTL_INPUT_form_biz_detail.BDTL_INPUT_tb_starhub_account_no;  
    var BDTL_INPUT_starhub_appldate= BDTL_INPUT_form_biz_detail.BDTL_INPUT_db_appl_date;
    var BDTL_INPUT_starhub_cable_startdate= BDTL_INPUT_form_biz_detail.BDTL_INPUT_db_cable_startdate;
    var BDTL_INPUT_starhub_cable_enddate= BDTL_INPUT_form_biz_detail.BDTL_INPUT_db_cable_enddate;
    var BDTL_INPUT_starhub_internet_startdate= BDTL_INPUT_form_biz_detail.BDTL_INPUT_db_internet_startdate;
    var BDTL_INPUT_starhub_internet_enddate= BDTL_INPUT_form_biz_detail.BDTL_INPUT_db_internet_enddate;
    var BDTL_INPUT_starhub_ssid=BDTL_INPUT_form_biz_detail.BDTL_INPUT_tb_ssid;
    var BDTL_INPUT_starhub_pwd=BDTL_INPUT_form_biz_detail.BDTL_INPUT_tb_pwd;
    var BDTL_INPUT_starhub_cable_serialno=BDTL_INPUT_form_biz_detail.BDTL_INPUT_tb_cablebox_sno;
    var BDTL_INPUT_starhub_modem_serialno=BDTL_INPUT_form_biz_detail.BDTL_INPUT_tb_modem_sno;
    var BDTL_INPUT_starhub_basicgroup=BDTL_INPUT_form_biz_detail.BDTL_INPUT_ta_basic_group;
    var BDTL_INPUT_starhub_addtnlch=BDTL_INPUT_form_biz_detail.BDTL_INPUT_ta_addtl_ch;
    var BDTL_INPUT_starhub_comments=BDTL_INPUT_form_biz_detail.BDTL_INPUT_ta_starhub_comments;
    if(BDTL_INPUT_expensetypes!=16)
      var BDTL_INPUT_primaryid_before=BDTL_INPUT_getmaxprimaryid(BDTL_INPUT_expensetypes)
      var BDTL_INPUT_aircon_finalservice ='';
    if((BDTL_INPUT_aircon_newservice!='')&&(BDTL_INPUT_aircon_newservice!=undefined))
    BDTL_INPUT_aircon_finalservice=BDTL_INPUT_aircon_newservice;
    else
      BDTL_INPUT_aircon_finalservice=BDTL_INPUT_aircon_oldservice; 
    if(BDTL_INPUT_digital_invoiceto=='SELECT')
    {
      BDTL_INPUT_digital_invoiceto=null;
      var BDTL_INPUT_digitalvoice_ecnsno=null;
    }
    else
      BDTL_INPUT_digital_invoiceto="'"+BDTL_INPUT_digital_invoiceto+"'";
    if(BDTL_INPUT_electricity_invoice=='SELECT')
      BDTL_INPUT_electricity_invoice=null;
    else
      BDTL_INPUT_electricity_invoice="'"+BDTL_INPUT_electricity_invoice+"'";
    if(BDTL_INPUT_starhub_invoiceto=='SELECT')
    {
      BDTL_INPUT_starhub_invoiceto=null;
      var BDTL_INPUT_starhub_ecnid=null;
    }
    else
      BDTL_INPUT_starhub_invoiceto="'"+BDTL_INPUT_starhub_invoiceto+"'";
    if(BDTL_INPUT_starhub_appldate=="")
      BDTL_INPUT_starhub_appldate=null;  
    else
    {
      BDTL_INPUT_starhub_appldate = eilib.SqlDateFormat(BDTL_INPUT_starhub_appldate)
      BDTL_INPUT_starhub_appldate="'"+BDTL_INPUT_starhub_appldate+"'";
    }  
    if(BDTL_INPUT_starhub_cable_startdate=="")
      BDTL_INPUT_starhub_cable_startdate=null;  
    else
    {
      var BDTL_INPUT_starhub_cablestartdate_shtime=BDTL_INPUT_starhub_cable_startdate;
      BDTL_INPUT_starhub_cable_startdate = eilib.SqlDateFormat(BDTL_INPUT_starhub_cable_startdate)
      BDTL_INPUT_starhub_cable_startdate="'"+BDTL_INPUT_starhub_cable_startdate+"'";
    }
    if(BDTL_INPUT_starhub_cable_enddate=="")
      BDTL_INPUT_starhub_cable_enddate=null;  
    else
    {
      var BDTL_INPUT_starhub_cableenddate_shtime=BDTL_INPUT_starhub_cable_enddate;
      BDTL_INPUT_starhub_cable_enddate = eilib.SqlDateFormat(BDTL_INPUT_starhub_cable_enddate)
      BDTL_INPUT_starhub_cable_enddate="'"+BDTL_INPUT_starhub_cable_enddate+"'";
    }   
    if(BDTL_INPUT_starhub_internet_startdate=="")
      BDTL_INPUT_starhub_internet_startdate=null;  
    else
    {
      var BDTL_INPUT_starhub_internetstartdate_shtime=BDTL_INPUT_starhub_internet_startdate;
      BDTL_INPUT_starhub_internet_startdate = eilib.SqlDateFormat(BDTL_INPUT_starhub_internet_startdate)
      BDTL_INPUT_starhub_internet_startdate="'"+BDTL_INPUT_starhub_internet_startdate+"'";
    } 
    if(BDTL_INPUT_starhub_internet_enddate=="")
      BDTL_INPUT_starhub_internet_enddate=null;  
    else
    {
      var BDTL_INPUT_starhub_internetenddate_shtime=BDTL_INPUT_starhub_internet_enddate;
      BDTL_INPUT_starhub_internet_enddate = eilib.SqlDateFormat(BDTL_INPUT_starhub_internet_enddate)
      BDTL_INPUT_starhub_internet_enddate="'"+BDTL_INPUT_starhub_internet_enddate+"'";
    } 
    var BDTL_INPUT_stmt_ins =BDTL_INPUT_conn.createStatement();    
    /*-----------------------------------INSERT CODING FOR AIRCON----------------------------------------*/
    if(BDTL_INPUT_expensetypes==16)
    {     
      var BDTL_INPUT_aircon_sp = "CALL SP_BIZDTL_AIRCON_SERVICE_BY_INSERT("+BDTL_INPUT_unitnoaircon+",'"+BDTL_INPUT_aircon_finalservice+"','"+BDTL_INPUT_aircon_comments+"','"+UserStamp+"',@FLAG)";
      BDTL_INPUT_stmt_ins.execute(BDTL_INPUT_aircon_sp);
      var BDTL_INPUT_stmt_flag = BDTL_INPUT_conn.createStatement();
      var BDTL_INPUT_flag_rs=BDTL_INPUT_stmt_flag.executeQuery("SELECT @FLAG");
      while(BDTL_INPUT_flag_rs.next())
        var BDTL_INPUT_saveflag=BDTL_INPUT_flag_rs.getString("@FLAG")
        BDTL_INPUT_flag_rs.close();BDTL_INPUT_stmt_flag.close();
      BDTL_INPUT_aircon_list_ref=BDTL_INPUT_aircon_list();
      BDTL_INPUT_stmt_ins.close();
      BDTL_INPUT_conn.commit();
    }
    /*-----------------------------------INSERT CODING FOR CARPARK----------------------------------------*/
    else if(BDTL_INPUT_expensetypes==17)
    {
      if(BDTL_INPUT_car_comments=="")//COMMENTS
      { 
        BDTL_INPUT_car_comments=null;}else{
          BDTL_INPUT_car_comments='"'+eilib.ConvertSpclCharString(BDTL_INPUT_car_comments)+'"';}
      var BDTL_INPUT_carpark_insert = "INSERT INTO EXPENSE_DETAIL_CARPARK(ULD_ID,UNIT_ID,EDCP_REC_VER,EDCP_CAR_NO,EDCP_COMMENTS) VALUES((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'),"+BDTL_INPUT_unitno+",'"+1+"','"+BDTL_INPUT_carno+"',"+BDTL_INPUT_car_comments+")";
      BDTL_INPUT_stmt_ins.execute(BDTL_INPUT_carpark_insert);
      BDTL_INPUT_stmt_ins.close();
      BDTL_INPUT_conn.commit();
    }
    /*-----------------------------------INSERT CODING FOR DIGITAL VOICE----------------------------------------*/
    else if(BDTL_INPUT_expensetypes==15)
    {
      if(BDTL_INPUT_digital_comments=="")//COMMENTS
      { 
        BDTL_INPUT_digital_comments=null;}else{
          BDTL_INPUT_digital_comments='"'+eilib.ConvertSpclCharString(BDTL_INPUT_digital_comments)+'"';}
      if((BDTL_INPUT_digital_invoiceto=='SELECT')||(BDTL_INPUT_digital_invoiceto==''))
      var BDTL_INPUT_digitalvoice_ecnsno =null;
      var BDTL_INPUT_insert_digitalvoice = "INSERT INTO EXPENSE_DETAIL_DIGITAL_VOICE(UNIT_ID,ECN_ID,EDDV_REC_VER,EDDV_DIGITAL_VOICE_NO,EDDV_DIGITAL_ACCOUNT_NO,EDDV_COMMENTS,ULD_ID) VALUES("+BDTL_INPUT_unitno+","+BDTL_INPUT_digital_invoiceto+",'"+1+"',"+BDTL_INPUT_digital_voice+",'"+BDTL_INPUT_digital_acctno+"',"+BDTL_INPUT_digital_comments+",(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'))";
      BDTL_INPUT_stmt_ins.execute(BDTL_INPUT_insert_digitalvoice);
      BDTL_INPUT_stmt_ins.close();
      BDTL_INPUT_conn.commit();
    }
    /*-----------------------------------INSERT CODING FOR ELECTRICITY----------------------------------------*/
    else if(BDTL_INPUT_expensetypes==13)
    {
      if(BDTL_INPUT_electricity_comments=="")//COMMENTS
      { 
        BDTL_INPUT_electricity_comments=null;}else{
          BDTL_INPUT_electricity_comments='"'+eilib.ConvertSpclCharString(BDTL_INPUT_electricity_comments)+'"';}
      var BDTL_INPUT_insert_electricity = "INSERT INTO EXPENSE_DETAIL_ELECTRICITY(ULD_ID,UNIT_ID,EDE_REC_VER,ECN_ID,EDE_COMMENTS) VALUES((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'),"+BDTL_INPUT_unitno+",'"+1+"',"+BDTL_INPUT_electricity_invoice+","+BDTL_INPUT_electricity_comments+")";
      BDTL_INPUT_stmt_ins.execute(BDTL_INPUT_insert_electricity);
      BDTL_INPUT_stmt_ins.close();
      BDTL_INPUT_conn.commit();
    }
    /*-----------------------------------INSERT CODING FOR STARHUB----------------------------------------*/
    else if(BDTL_INPUT_expensetypes==14)
    {
      if((BDTL_INPUT_starhub_invoiceto=='SELECT')||(BDTL_INPUT_starhub_invoiceto==''))
      var BDTL_INPUT_starhub_invoiceto = null
      if(BDTL_INPUT_starhub_ssid=="")//COMMENTS
      { 
        BDTL_INPUT_starhub_ssid=null;}else{
          BDTL_INPUT_starhub_ssid='"'+eilib.ConvertSpclCharString(BDTL_INPUT_starhub_ssid)+'"';}
      if(BDTL_INPUT_starhub_pwd=="")//COMMENTS
      { 
        BDTL_INPUT_starhub_pwd=null;}else{
          BDTL_INPUT_starhub_pwd='"'+eilib.ConvertSpclCharString(BDTL_INPUT_starhub_pwd)+'"';}
      if(BDTL_INPUT_starhub_cable_serialno=="")//COMMENTS
      { 
        BDTL_INPUT_starhub_cable_serialno=null;}else{
          BDTL_INPUT_starhub_cable_serialno='"'+eilib.ConvertSpclCharString(BDTL_INPUT_starhub_cable_serialno)+'"';}
      if(BDTL_INPUT_starhub_comments=="")//COMMENTS
      { 
        BDTL_INPUT_starhub_comments=null;}else{
          BDTL_INPUT_starhub_comments='"'+eilib.ConvertSpclCharString(BDTL_INPUT_starhub_comments)+'"';}
      if(BDTL_INPUT_starhub_addtnlch=="")//COMMENTS
      { 
        BDTL_INPUT_starhub_addtnlch=null;}else{
          BDTL_INPUT_starhub_addtnlch='"'+eilib.ConvertSpclCharString(BDTL_INPUT_starhub_addtnlch)+'"';}
      if(BDTL_INPUT_starhub_modem_serialno=="")//COMMENTS
      { 
        BDTL_INPUT_starhub_modem_serialno=null;}else{
          BDTL_INPUT_starhub_modem_serialno='"'+eilib.ConvertSpclCharString(BDTL_INPUT_starhub_modem_serialno)+'"';}
      if(BDTL_INPUT_starhub_basicgroup=="")//COMMENTS
      { 
        BDTL_INPUT_starhub_basicgroup=null;}else{
          BDTL_INPUT_starhub_basicgroup='"'+eilib.ConvertSpclCharString(BDTL_INPUT_starhub_basicgroup)+'"';}
      var BDTL_INPUT_insert_starhub = "INSERT INTO EXPENSE_DETAIL_STARHUB(UNIT_ID,ECN_ID,EDSH_REC_VER,EDSH_ACCOUNT_NO,EDSH_APPL_DATE,EDSH_CABLE_START_DATE,EDSH_CABLE_END_DATE,EDSH_INTERNET_START_DATE,EDSH_INTERNET_END_DATE,EDSH_SSID,EDSH_PWD,EDSH_CABLE_BOX_SERIAL_NO,EDSH_MODEM_SERIAL_NO,EDSH_BASIC_GROUP,EDSH_ADDTNL_CH,EDSH_COMMENTS,ULD_ID) VALUES("+BDTL_INPUT_unitno+","+BDTL_INPUT_starhub_invoiceto+",'"+1+"','"+BDTL_INPUT_starhub_acctno+"',"+BDTL_INPUT_starhub_appldate+","+BDTL_INPUT_starhub_cable_startdate+","+BDTL_INPUT_starhub_cable_enddate+","+BDTL_INPUT_starhub_internet_startdate+","+BDTL_INPUT_starhub_internet_enddate+","+BDTL_INPUT_starhub_ssid+","+BDTL_INPUT_starhub_pwd+","+BDTL_INPUT_starhub_cable_serialno+","+BDTL_INPUT_starhub_modem_serialno+","+BDTL_INPUT_starhub_basicgroup+","+BDTL_INPUT_starhub_addtnlch+","+BDTL_INPUT_starhub_comments+",(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'))";
      BDTL_INPUT_stmt_ins.execute(BDTL_INPUT_insert_starhub);
      BDTL_INPUT_stmt_ins.close();
      BDTL_INPUT_conn.commit();
      /*-------------------------------CREATING CALENDAR EVENT FUNCTION FOR STARHUB------------------------*/
      var  BDTL_INPUT_sh_arr= eilib.getStarHubUnitCalTime(BDTL_INPUT_conn);
      var BDTL_INPUT_sh_starttime=BDTL_INPUT_sh_arr[0];
      var BDTL_INPUT_sh_endtime=BDTL_INPUT_sh_arr[1];
      if((BDTL_INPUT_starhub_cablestartdate_shtime!='')&&(BDTL_INPUT_starhub_cableenddate_shtime!='')&&(BDTL_INPUT_starhub_cablestartdate_shtime!=undefined)&&(BDTL_INPUT_starhub_cableenddate_shtime!=undefined))
      {            
        var calenderIDcode=eilib.CUST_getCalenderId(BDTL_INPUT_conn);
        eilib.StarHubUnit_CreateCalEvent(calenderIDcode,BDTL_INPUT_starhub_cablestartdate_shtime,BDTL_INPUT_sh_starttime,BDTL_INPUT_sh_endtime,BDTL_INPUT_starhub_cableenddate_shtime,BDTL_INPUT_sh_starttime,BDTL_INPUT_sh_endtime,'STARHUB',BDTL_INPUT_unitnoaircon,BDTL_INPUT_starhub_acctno,'CABLE START DATE','CABLE END DATE','','')       
      } 
      if((BDTL_INPUT_starhub_internetstartdate_shtime!='')&&(BDTL_INPUT_starhub_internetenddate_shtime!='')&&(BDTL_INPUT_starhub_internetstartdate_shtime!=undefined)&&(BDTL_INPUT_starhub_internetenddate_shtime!=undefined))
      {       
        var calenderIDcode=eilib.CUST_getCalenderId(BDTL_INPUT_conn);
        eilib.StarHubUnit_CreateCalEvent(calenderIDcode,BDTL_INPUT_starhub_internetstartdate_shtime,BDTL_INPUT_sh_starttime,BDTL_INPUT_sh_endtime,BDTL_INPUT_starhub_internetenddate_shtime,BDTL_INPUT_sh_starttime,BDTL_INPUT_sh_endtime,'STARHUB',BDTL_INPUT_unitnoaircon,BDTL_INPUT_starhub_acctno,'INTERNET START DATE','INTERNET END DATE','','')
      } 
    }     
    if(BDTL_INPUT_expensetypes!=16){
      var BDTL_INPUT_primaryid_after=BDTL_INPUT_getmaxprimaryid(BDTL_INPUT_expensetypes)
      if(BDTL_INPUT_primaryid_before<BDTL_INPUT_primaryid_after)
        var BDTL_INPUT_saveflag= 1;
      else
        var BDTL_INPUT_saveflag= 0;}
    return [BDTL_INPUT_aircon_list_ref,BDTL_INPUT_saveflag];
    BDTL_INPUT_conn.close();
  }
  //FUNCTION TO GET UNIT SDATE AND EDATE
  function BDTL_INPUT_get_SDate_EDate(BDTL_INPUT_unitno)
  {
    var BDTL_INPUT_conn =eilib.db_GetConnection();
    return  eilib.GetUnitSdEdate(BDTL_INPUT_conn,BDTL_INPUT_unitno);
  }
  /*------------------------------------CODING TO CHECK AIRCONSERVICE BY IN TABLE------------------------------------------------------*/
  function BDTL_INPUT_airconservicedby_check(BDTL_INPUT_alreadyexists)
  {
    var BDTL_INPUT_conn =eilib.db_GetConnection();
    var BDTL_INPUT_airconservicedby_array = [];
    var BDTL_INPUT_flag=eilib.Check_ExistsAirconservicedby(BDTL_INPUT_conn,BDTL_INPUT_alreadyexists)
    return BDTL_INPUT_flag;
    BDTL_INPUT_conn.close();
  }
}
catch(err)
{
}
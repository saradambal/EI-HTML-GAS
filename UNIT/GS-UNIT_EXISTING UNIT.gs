//*******************************************FILE DESCRIPTION*********************************************//
//********************************************EXISTING UNIT***********************************************//
//DONE BY:SARADAMBAL
//VER 1.2 -SD:12/06/2014 ED:12/06/2014,TRACKER NO:244,updated failure function,implemented doorcode & login validation,checked tickler after removed trigger for login details
//VER 1.1 -SD:06/06/2014 ED:06/06/2014,TRACKER NO:244,updated new link 
//VER 1.0 -SD:09/04/2014 ED:09/04/2014,TRACKER NO:244,implemented class for stampdutydate
//VER 0.09-SD:15/02/2014 ED:01/03/2014,TRACKER NO:244,updated sp for returning flag and updated erormsg for not updating data,checked sp after changing the uldid instead of userstamp
//VER 0.08-SD:08/02/2014 ED:11/02/2014,TRACKER NO:244,included non-active unit form,implemented eilib for errormsg and eilib(remove special character) for general fields
//VER 0.07-SD:21/01/2014 ED:22/01/2014,TRACKER NO:244,cleared issue for stamp and room type saving as undefined,changed acc no as number only
//VER 0.06-SD:28/12/2013 ED:03/01/2014,TRACKER NO:244,removed utilities function,implement connection open & close function for eilib function,changed alignment for form title,,changed textarea for bank address,implemented validation for amt while updation,cleared issue-issued occured becoz calling two gs function at a time,updated reset function for bank address 
//VER 0.05-SD:30/11/2013 ED:30/11/2013,TRACKER NO:244,changed prefix name for UEXST_getroomstamp_err into UEXST_getroomstamp_err,implemented utilities function  
//VER 0.04-SD:13/11/2013 ED:23/11/2013,TRACKER NO:244,changed sp name,updated rdonly class name for css color,changed access card as integer,removed title when tb is disabled.removed rdonly class when tb is enabled,implemented eilib function for roomtype,stamptype & accesscard alreadyexists,implemented dynamic width setting for tb,implemented update validation for disable update btn when form having old values
//VER 0.03-SD:08/10/2013 ED:08/10/2013,TRACKER NO:244,updated head tag links & implement return function
//VER 0.03-SD:08/10/2013 ED:08/10/2013,TRACKER NO:244,updated head tag links & implement return function
//VER 0.02-SD:01/10/2013 ED:05/10/2013,TRACKER NO:244,updated eilib connection,message box,preloader,removed scriplet,convert blur function,change reset coding,change alignment
//VER 0.01-INITIAL VERSION,TRACKER NO:244,SD:24/08/2013,ED:04/09/2013
//*********************************************************************************************************//
try
{
  /*-----------------------------------------FUNCTION FOR FETCHING ERROR MESSAGE,ROOMTYPE AND STAMPTYPE FROM SQL TABLE----------------------------------------------*/
  function UEXST_getroomstamp_err(UEXST_unitno,UEXST_flag_unitno_err_roomstamp) {
    var UEXST_conn =eilib.db_GetConnection();
    var UEXST_stmterr = UEXST_conn.createStatement();
    var UEXST_TB_roombox=[];
    var UEXST_TB_stampbox=[];
    var UEXST_arr_nonactive=[];
    var UEXST_errorarray=[];
    if(UEXST_flag_unitno_err_roomstamp=='UEXST_flag_unitno_errormsg'){
      var UEXST_errorarray=eilib.GetErrorMessageList(UEXST_conn,'2,8,10,3,14,30,308,316,324,399,401,463,464,466,467');
      var UEXST_unitnoarr=[];
      UEXST_unitnoarr=eilib.GetActiveUnit(UEXST_conn);
      var UEXST_stmt_nonactive = UEXST_conn.createStatement();
      var UEXST_select_nonactive = "SELECT * FROM VW_NON_ACTIVE_UNIT ORDER BY UNIT_NO ASC";  
      var UEXST_rs_nonactive = UEXST_stmt_nonactive.executeQuery(UEXST_select_nonactive);
      while(UEXST_rs_nonactive.next())
      {
        UEXST_arr_nonactive.push(UEXST_rs_nonactive.getString("UNIT_NO"));
      }
      UEXST_rs_nonactive.close();UEXST_stmt_nonactive.close();
    }
    else if((UEXST_flag_unitno_err_roomstamp=='UEXST_flag_roomstamp')||(UEXST_flag_unitno_err_roomstamp=='UEXST_flag_deposit_roomstamp')||(UEXST_flag_unitno_err_roomstamp=='UEXST_flag_roomtype')||(UEXST_flag_unitno_err_roomstamp=='UEXST_flag_stamptype')){
      var UEXST_stmt_room = UEXST_conn.createStatement();
      var UEXST_select_query_room_type = "SELECT URTD_ROOM_TYPE FROM UNIT_ROOM_TYPE_DETAILS WHERE URTD_ROOM_TYPE IS NOT NULL AND URTD_ID NOT IN(SELECT distinct URTD_ID FROM UNIT_ACCESS_STAMP_DETAILS WHERE UNIT_ID=(SELECT UNIT_ID FROM UNIT WHERE UNIT_NO="+UEXST_unitno+") AND URTD_ID IS NOT NULL) ORDER BY URTD_ROOM_TYPE ASC";  
      var UEXST_roomtype_rs = UEXST_stmt_room.executeQuery(UEXST_select_query_room_type);
      while(UEXST_roomtype_rs.next())
      {
        var UEXST_all_room_type = UEXST_roomtype_rs.getString("URTD_ROOM_TYPE");
        UEXST_TB_roombox.push(UEXST_all_room_type);
      }
      UEXST_roomtype_rs.close();UEXST_stmt_room.close();
      var UEXST_stmt_stamp = UEXST_conn.createStatement();
      var UEXST_select_query_stamp_type="SELECT USDT_DATA FROM UNIT_STAMP_DUTY_TYPE WHERE USDT_DATA IS NOT NULL AND USDT_ID NOT IN(SELECT distinct USDT_ID FROM UNIT_ACCESS_STAMP_DETAILS WHERE UNIT_ID=(SELECT UNIT_ID FROM UNIT WHERE UNIT_NO="+UEXST_unitno+") AND USDT_ID IS NOT NULL) ORDER BY USDT_DATA ASC";  
      var UEXST_stamptype_rs = UEXST_stmt_stamp.executeQuery(UEXST_select_query_stamp_type);
      while(UEXST_stamptype_rs.next())
      {
        var UEXST_all_stamp_type = UEXST_stamptype_rs.getString("USDT_DATA");
        UEXST_TB_stampbox.push(UEXST_all_stamp_type);
      }
      UEXST_stamptype_rs.close();UEXST_stmt_stamp.close();
    }
    var UEXST_result={"UEXST_errarray":UEXST_errorarray.errormsg,"UEXST_roomtype":UEXST_TB_roombox,"UEXST_stamp":UEXST_TB_stampbox,"UEXST_unitno":UEXST_unitnoarr,"UEXST_nonactive":UEXST_arr_nonactive,"UEXST_unitno_flag":UEXST_unitno,"UEXST_unitno_err_roomstamp_flag":UEXST_flag_unitno_err_roomstamp};      
    return [UEXST_result];
    UEXST_conn.close();
  }     
  /*------------------------------------FUNCTION FOR UPDATING LOGIN,ACCOUNTS AND OTHERS DETAILS------------------*/
  function UEXST_updateForm(UEXST_existingUnit){
    var UEXST_unitnumber = UEXST_existingUnit.UEXST_lb_unitnumber;
    var UEXST_flag=UEXST_existingUnit.UEXST_hidden_flag;
    var UEXST_doorcode = UEXST_existingUnit.UEXST_tb_doorcode;
    var UEXST_weblogin = UEXST_existingUnit.UEXST_tb_weblogin;
    var UEXST_webpass = UEXST_existingUnit.UEXST_tb_webpass;
    var UEXST_accntnumber = UEXST_existingUnit.UEXST_tb_accntnumber;
    var UEXST_accntname = UEXST_existingUnit.UEXST_tb_accntname;
    var UEXST_bankcode = UEXST_existingUnit.UEXST_tb_bankcode;
    var UEXST_branchcode =UEXST_existingUnit.UEXST_tb_branchcode;
    var UEXST_bankaddrs = UEXST_existingUnit.UEXST_tb_bankaddrs;
    var UEXST_unitdeposite = UEXST_existingUnit.UEXST_tb_unitdeposite;
    var UEXST_accesscard = UEXST_existingUnit.UEXST_tb_accesscard;
    var UEXST_oldroomtype = UEXST_existingUnit.UEXST_lb_oldroomtype;
    var UEXST_newroomtype = UEXST_existingUnit.UEXST_tb_newroomtype;
    var UEXST_stampdutydate = UEXST_existingUnit.UEXST_db_stampdutydate;
    var UEXST_oldstamptype = UEXST_existingUnit.UEXST_lb_oldstamptype;
    var UEXST_newstamptype = UEXST_existingUnit.UEXST_tb_newstamptype;
    var UEXST_stampamount = UEXST_existingUnit.UEXST_tb_stampamount;
    var UEXST_comments = UEXST_existingUnit.UEXST_ta_comments;
    if(UEXST_newroomtype!=undefined){
      var UEXST_finalroomtype =UEXST_newroomtype;
    }
    else if(UEXST_oldroomtype!=undefined)
      var UEXST_finalroomtype =UEXST_oldroomtype; 
    if(UEXST_newstamptype!=undefined){
      var UEXST_finalstamptype =UEXST_newstamptype;
    }
    else if(UEXST_oldstamptype!=undefined)
      var UEXST_finalstamptype =UEXST_oldstamptype;
    if((UEXST_finalroomtype=='SELECT')||(UEXST_finalroomtype==''))
    UEXST_finalroomtype=null;
    else{
      UEXST_finalroomtype=eilib.ConvertSpclCharString(UEXST_finalroomtype);
      UEXST_finalroomtype="'"+UEXST_finalroomtype+"'";
    }
    if((UEXST_finalstamptype=='SELECT')||(UEXST_finalstamptype==''))
    UEXST_finalstamptype=null;
    else{
      UEXST_finalstamptype=eilib.ConvertSpclCharString(UEXST_finalstamptype);
      UEXST_finalstamptype="'"+UEXST_finalstamptype+"'";
    }
    if(UEXST_stampdutydate=="")
      UEXST_stampdutydate=null;  
    else
    {
      var UEXST_stampdate_string = UEXST_stampdutydate.split("-");
      UEXST_stampdutydate=UEXST_stampdate_string[2]+'-'+ UEXST_stampdate_string[1]+'-'+UEXST_stampdate_string[0];
      UEXST_stampdutydate="'"+UEXST_stampdutydate+"'";
    }
    if(UEXST_unitdeposite=='')
      UEXST_unitdeposite=null;
    if(UEXST_stampamount=='')
      UEXST_stampamount=null;    
    if((UEXST_newroomtype!='')&&(UEXST_newroomtype!=undefined))
    var UEXST_alreadyexist_flag_room=UEXST_alreadyexists(UEXST_newroomtype,'UEXST_tb_newroomtype')
    if((UEXST_newstamptype!='')&&(UEXST_newstamptype!=undefined))
    var UEXST_alreadyexist_flag_stamp=UEXST_alreadyexists(UEXST_newstamptype,'UEXST_tb_newstamptype')
    if(UEXST_accesscard=='')
      UEXST_accesscard=null;
    else
      var UEXST_alreadyexist_flag_card=UEXST_alreadyexists(UEXST_accesscard,'UEXST_tb_accesscard') ;
    if(UEXST_weblogin!='')
      var UEXST_alreadyexist_flag_login=UEXST_alreadyexists(UEXST_weblogin,'UNIT_tb_weblogin') ;
    if(UEXST_doorcode!='')
      var UEXST_alreadyexist_flag_code=UEXST_alreadyexists(UEXST_doorcode,'UNIT_tb_doorcode') ;
    if((UEXST_alreadyexist_flag_card==true)||(UEXST_alreadyexist_flag_stamp==true)||(UEXST_alreadyexist_flag_room==true)||(UEXST_alreadyexist_flag_login!=undefined && UEXST_alreadyexist_flag_login[0]==0)||(UEXST_alreadyexist_flag_code!=undefined && UEXST_alreadyexist_flag_code[0]==0)){
      var UEXST_alreadyexist_flag=true;
      return {"UEXST_obj_flag_existing":UEXST_alreadyexist_flag};
    }
    var UEXST_conn =eilib.db_GetConnection();
    var UEXST_stmt = UEXST_conn.createStatement();
    if(UEXST_comments!='')
      UEXST_comments=eilib.ConvertSpclCharString(UEXST_comments);
    if(UEXST_accntname!='')
      UEXST_accntname=eilib.ConvertSpclCharString(UEXST_accntname);
    if(UEXST_bankaddrs!='')
      UEXST_bankaddrs=eilib.ConvertSpclCharString(UEXST_bankaddrs);
    if(UEXST_weblogin!='')
      UEXST_weblogin=eilib.ConvertSpclCharString(UEXST_weblogin);
    if(UEXST_flag=='UEXST_doorlogpwd')
    {
      var UEXST_creatstmtLogin ="CALL SP_EXISTING_UNIT_LOGIN_DETAILS_INSERT("+UEXST_unitnumber+",'"+UEXST_doorcode+"','"+UEXST_weblogin+"','"+UEXST_webpass+"','"+UserStamp+"',@FLAG)";
      UEXST_stmt.execute(UEXST_creatstmtLogin);     
    }
    if(UEXST_flag=='UEXST_acctdetails')
    {
      var UEXST_creatstmtAccount ="CALL SP_EXISTING_UNIT_ACCOUNT_DETAILS_INSERT("+UEXST_unitnumber+",'"+UEXST_accntnumber+"','"+UEXST_accntname+"','"+UEXST_bankcode+"','"+UEXST_branchcode+"','"+UEXST_bankaddrs+"','"+UserStamp+"',@FLAG)";
      UEXST_stmt.execute(UEXST_creatstmtAccount);
    }
    if(UEXST_flag=='UEXST_others')
    {
      var UEXST_creatstmtAccessStamp ="CALL SP_EXISTING_UNIT_ACCESS_STAMP_DETAILS_INSERT("+UEXST_unitnumber+","+UEXST_accesscard+","+UEXST_finalroomtype+","+UEXST_stampdutydate+","+UEXST_finalstamptype+","+UEXST_stampamount+",'"+UserStamp+"',"+UEXST_unitdeposite+",'"+UEXST_comments+"',@FLAG)";
      UEXST_stmt.execute(UEXST_creatstmtAccessStamp);
    }
    var UEXST_stmt_flag = UEXST_conn.createStatement();
    var UEXST_flag_rs=UEXST_stmt_flag.executeQuery("SELECT @FLAG");
    while(UEXST_flag_rs.next())
      if(UEXST_flag_rs.getString("@FLAG")==0)
        return {"UEXST_obj_flag":0}
        else
          return {"UEXST_obj_flag":1,"UEXST_obj_no":UEXST_unitnumber,"UEXST_obj_flag_existing":false}  
          UEXST_flag_rs.close();UEXST_stmt_flag.close();
    UEXST_stmt.close();
    UEXST_conn.close();
  }
  /*-----------------------------FUNCTION FOR RETRIEVE LOGIN,OTHERS AND ACCOUNTS DETAILS FROM TABLE-----------------------------*/
  function UEXST_login_acct_others(UEXST_unitnumber,UEXST_source){  
    var UEXST_conn =eilib.db_GetConnection();
    var UEXST_stmt = UEXST_conn.createStatement();
    var UEXST_stmt_unitno = UEXST_conn.createStatement();
    var UEXST_unitno_select="SELECT * FROM UNIT WHERE UNIT_NO="+UEXST_unitnumber+"";
    var UEXST_unitno_rs=UEXST_stmt_unitno.executeQuery(UEXST_unitno_select);
    while(UEXST_unitno_rs.next())
    {
      var UEXST_unitno=UEXST_unitno_rs.getString("UNIT_ID");
    }
    UEXST_stmt_unitno.close(); UEXST_unitno_rs.close();
    if(UEXST_source=='UEXST_radio_doorloginpswd')
    {
      var UEXST_doorcode=null;var UEXST_weblogin=null; var UEXST_webpass=null;
      var UEXST_login_select="SELECT * FROM UNIT_LOGIN_DETAILS WHERE UNIT_ID="+UEXST_unitno+"";
      var UEXST_login_rs=UEXST_stmt.executeQuery(UEXST_login_select);
      var UEXST_array_login='';
      while(UEXST_login_rs.next())
      {
        var UEXST_doorcode = UEXST_login_rs.getString("ULDTL_DOORCODE");
        var UEXST_weblogin = UEXST_login_rs.getString("ULDTL_WEBLOGIN");
        var UEXST_webpass = UEXST_login_rs.getString("ULDTL_WEBPWD");
      }
      UEXST_array_login={"UEXST_dcode":UEXST_doorcode,"UEXST_weblogin":UEXST_weblogin,"UEXST_webpass":UEXST_webpass}; 
      UEXST_login_rs.close();
      return UEXST_array_login;
    }
    else if(UEXST_source=='UEXST_radio_acctdetails')
    {
      var UEXST_array_acct=[];
      var UEXST_acctno=null;var UEXST_acctname=null; var UEXST_bankcode=null; var UEXST_branchcode=null; var UEXST_bankaddrs=null;
      var UEXST_radio_select="SELECT * FROM UNIT_ACCOUNT_DETAILS WHERE UNIT_ID="+UEXST_unitno+"";
      var UEXST_radio_rs=UEXST_stmt.executeQuery(UEXST_radio_select);
      while(UEXST_radio_rs.next())
      {
        UEXST_acctno = UEXST_radio_rs.getString("UACD_ACC_NO");
        UEXST_acctname = UEXST_radio_rs.getString("UACD_ACC_NAME");
        UEXST_bankcode = UEXST_radio_rs.getString("UACD_BANK_CODE");
        UEXST_branchcode = UEXST_radio_rs.getString("UACD_BRANCH_CODE");
        UEXST_bankaddrs = UEXST_radio_rs.getString("UACD_BANK_ADDRESS");
      }
      UEXST_array_acct={"UEXST_acctnum":UEXST_acctno,"UEXST_acctname":UEXST_acctname,"UEXST_bankcode":UEXST_bankcode,"UEXST_branchcode":UEXST_branchcode,"UEXST_bankaddress":UEXST_bankaddrs}; 
      UEXST_radio_rs.close();
      return UEXST_array_acct;
    }
    else if(UEXST_source=='UEXST_radio_others')
    {
      var UEXST_others_select="SELECT * FROM UNIT_DETAILS WHERE UNIT_ID="+UEXST_unitno+"";
      var UEXST_others_rs=UEXST_stmt.executeQuery(UEXST_others_select);
      var UEXST_deposit='';
      while(UEXST_others_rs.next())
      {
        UEXST_deposit = UEXST_others_rs.getString("UD_DEPOSIT");
        if(UEXST_deposit==null)
          UEXST_deposit='';
      }
      UEXST_others_rs.close();
      var UEXST_deposit_roomstamp=UEXST_getroomstamp_err(UEXST_unitnumber,'UEXST_flag_deposit_roomstamp')
      return [UEXST_deposit_roomstamp[0],UEXST_deposit];
    }
    UEXST_stmt.close();
    UEXST_conn.close();
  }
  /*-----------------------------------FUNCTION FOR CHECKING ALREADY EXISTS DATA FOR ACCESS CARD, ROOM TYPE AND STAMP TYPE-----------------------*/
  function UEXST_alreadyexists(UEXST_alreadyexist,UEXST_source)
  {
    var UEXST_conn =eilib.db_GetConnection();
    var UEXST_flag=[];
    if(UEXST_source=="UEXST_tb_accesscard")
      UEXST_flag=eilib.Check_ExistsCard(UEXST_conn,UEXST_alreadyexist)
      else if(UEXST_source=="UEXST_tb_newroomtype") 
        UEXST_flag=eilib.Check_ExistsRmType(UEXST_conn,UEXST_alreadyexist)
        else if(UEXST_source=="UEXST_tb_newstamptype") 
          UEXST_flag=eilib.Check_ExistsStampduty(UEXST_conn,UEXST_alreadyexist);
    else if((UEXST_source=="UNIT_tb_doorcode")||(UEXST_source=="UNIT_tb_weblogin")){
      UEXST_flag[0]=1;
      UEXST_flag=eilib.Check_ExistsDoorcodeLogin(UEXST_conn,UEXST_alreadyexist,UEXST_source)}
    UEXST_conn.close();
    return UEXST_flag;
  }  
}
catch(err)
{
}
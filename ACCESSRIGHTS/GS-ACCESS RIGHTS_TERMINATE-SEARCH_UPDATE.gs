//*******************************************FILE DESCRIPTION*********************************************//
//************************************ACCESS RIGHTS_TERMINATE-SEARCH/UPDATE***********************************************//
//DONE BY PUNI
//VER 1.1 -SD:22/12/2014,ED:22/12/2014,TRACKER NO:840,added drop table function from eilib to avoid temp table drop issue for pf
//VER 1.0-SD:24/09/2014 ED:26/09/2014;TRACKER NO 465;1.trimmed script fr the repeatd functions,2.corrected validation in search /update option,3.corrected search update query,4.implemented rollback n commit,5.changed driveapp to docslist to remove editors,6.changed preloader n msgbox position,7.changed new lib links,8.added AG fr textarea
//DONE BY SAFI,SARADA
//VER 0.09-SD:21/07/2014 ED:21/07/2014;TRACKER NO 465;UPDATED DRIVEAPP AS DOCSLIST FOR SHARING/UNSHARING DOCS
//VER 0.08-SD:05/07/2014 ED:05/07/2014;TRACKER NO:465;UPDATED CUSTOMER MSG AND SHARED TEMPLATE FOLDER 
//VER 0.07-SD:11/06/2014 ED:12/06/2014:TRACKER NO:465;UPDATED FAILURE HANDLER AND IMPLEMENT SUPER ADMIN NOT TO TERMINATE
//VER 0.06-SD:06/06/2014 ED:06/06/2014;TRACKER NO:465;CHANGED JQUERY LINK
//VER 0.05-SD:27/05/2014 ED:31/05/2014;TRACKER NO:465-IMPLEMENT UNSHARE CAL,DOCS,SITE WHILE LONGIN TERMINATE
//ver 0.04- SD:15/05/2014,ED:15/05/2014;TRACKER NO:465-IMPLEMENT CALENDER SHARING AND DYANAMIC SP-SAFI
//VER 0.03-TRACKER NO:465,SD:12/03/2014,ED:13/01/2014-implement sql enhancement.apply sp for rejoin and terminate login id by safiyullah
//VER 0.02 TRACKER NO:465,SD:13/01/2014,ED:13/01/2014-Added Custom role wile rejoin by safiyullah
//VER 0.01-INITIAL VERSION,TRACKER NO:465,SD:03/12/2013,ED:10/12/2013-sarada
//*********************************************************************************************************//
try
{ 
  /*---------------------------------FUNCTION TO FETCH ERROR MSG & LOAD LOGIN ID----------------------*/
  function URT_SRC_errormsg_loginid(URT_SRC_source){
    var URT_SRC_conn =eilib.db_GetConnection();
    var URT_SRC_errorarray =[];
    var USRC_arr_loginid =[];
    var USRC_arr_uldid =[];
    var URT_SRC_stmt_uldtable = URT_SRC_conn.createStatement();
    var URT_SRC_data_uld_tble=false;
    var URT_SRC_select_uldtble = "SELECT * FROM USER_LOGIN_DETAILS";
    var URT_SRC_rs_uld_tble = URT_SRC_stmt_uldtable.executeQuery(URT_SRC_select_uldtble);
    if(URT_SRC_rs_uld_tble.next())
      URT_SRC_data_uld_tble=true;
    URT_SRC_rs_uld_tble.close(); URT_SRC_stmt_uldtable.close();
    var URT_SRC_errormsg_query = "349,350,351,352,353,354,355,401,454,455,458,465";
    URT_SRC_errorarray=eilib.GetErrorMessageList(URT_SRC_conn, URT_SRC_errormsg_query)
    var URT_SRC_stmt_loginid = URT_SRC_conn.createStatement();
    if((URT_SRC_source=='URT_SRC_radio_loginterminate')||(URT_SRC_source=='URT_SRC_radio_rejoin')){
      if(URT_SRC_source=='URT_SRC_radio_loginterminate')
        var URT_SRC_select_loginid = "SELECT * FROM VW_ACCESS_RIGHTS_TERMINATE_LOGINID  WHERE URC_DATA!='SUPER ADMIN' ORDER BY ULD_LOGINID";
      else if(URT_SRC_source=='URT_SRC_radio_rejoin')
        var URT_SRC_select_loginid = "SELECT * FROM VW_ACCESS_RIGHTS_REJOIN_LOGINID ORDER BY ULD_LOGINID";
      var URT_SRC_rs_loginid = URT_SRC_stmt_loginid.executeQuery(URT_SRC_select_loginid);
      while(URT_SRC_rs_loginid.next()){
        USRC_arr_loginid.push(URT_SRC_rs_loginid.getString(1));
      }
      URT_SRC_rs_loginid.close();    } 
    else if(URT_SRC_source=='URT_SRC_radio_optsrcupd'){
      var URT_SRC_select_loginid = "SELECT * FROM VW_ACCESS_RIGHTS_REJOIN_LOGINID ORDER BY ULD_LOGINID"
      var URT_SRC_rs_loginid = URT_SRC_stmt_loginid.executeQuery(URT_SRC_select_loginid);
      while(URT_SRC_rs_loginid.next())
      {
        USRC_arr_loginid.push(URT_SRC_rs_loginid.getString(1));
      }
      URT_SRC_rs_loginid.close();}     
    URT_SRC_stmt_loginid.close();
    var URT_SRC_customrole_stmt = URT_SRC_conn.createStatement();
    var URT_SRC_customrole_array=[];
    var URT_SRC_select_customrole_menu="SELECT * FROM ROLE_CREATION ORDER BY RC_NAME"
    var URT_SRC_customrole_result=URT_SRC_customrole_stmt.executeQuery(URT_SRC_select_customrole_menu);
    while(URT_SRC_customrole_result.next()){
      URT_SRC_customrole_array.push(URT_SRC_customrole_result.getString("RC_NAME"));      
    } 
    URT_SRC_customrole_result.close()
    URT_SRC_customrole_stmt.close()
    var URT_SRC_result={"URT_SRC_obj_errmsg":URT_SRC_errorarray.errormsg,"URT_SRC_obj_loginid":USRC_arr_loginid,"URT_SRC_obj_source":URT_SRC_source,"URT_SRC_obj_flg_login":URT_SRC_data_uld_tble,"URT_SRC_customerole":URT_SRC_customrole_array}
    return URT_SRC_result;
    URT_SRC_conn.close();
  }
  /*-------------------------------------------FUNCTION TO TERMINATE LOGIN DETAILS-----------------------------*/
  function URT_SRC_func_terminate(URT_SRC_emailid,URT_SRC_enddate,URT_SRC_reason,URT_SRC_flg_terminate){ 
    try{
      URSRC_sharedocflag=0,URSRC_sharecalflag=0,URSRC_sharesiteflag=0;
      var URT_SRC_enddate= eilib.SqlDateFormat(URT_SRC_enddate);
      var URT_SRC_conn =eilib.db_GetConnection();
      URT_SRC_conn.setAutoCommit(false);
      var URT_SRC_stmt_terminate = URT_SRC_conn.createStatement();
      var URT_SRC_select_terminate="SELECT UA_ID,UA_REASON FROM USER_ACCESS where ULD_ID=(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+URT_SRC_emailid+"') AND UA_REC_VER=(SELECT MAX(UA_REC_VER) FROM USER_ACCESS where ULD_ID=(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+URT_SRC_emailid+"'))";
      var URT_SRC_rs_terminate=URT_SRC_stmt_terminate.executeQuery(URT_SRC_select_terminate);
      while(URT_SRC_rs_terminate.next())
      {
        var URT_SRC_userpro_id=URT_SRC_rs_terminate.getString(1);
        var URT_SRC_old_reason=URT_SRC_rs_terminate.getString(2);
      }
      URT_SRC_rs_terminate.close();URT_SRC_stmt_terminate.close();
      var URT_SRC_stmt_terminateupd = URT_SRC_conn.createStatement();
      var URT_SRC_insert_terminate ="CALL SP_LOGIN_TERMINATE_SAVE('"+URT_SRC_emailid+"','"+URT_SRC_enddate+"','"+URT_SRC_reason+"','"+UserStamp+"',@TERM_FLAG,@TEMPTBL_OUT_LOGINID)";
      URT_SRC_stmt_terminateupd.execute(URT_SRC_insert_terminate);
      URT_SRC_stmt_terminateupd.close();
      var URT_SRC_sucess_flag=0;
      var URT_SRC_return_flag_stmt=URT_SRC_conn.createStatement();
      var URT_SRC_getresult= URT_SRC_return_flag_stmt.executeQuery("SELECT @TERM_FLAG,@TEMPTBL_OUT_LOGINID");
      while(URT_SRC_getresult.next()){
        var URT_SRC_sucess_flag=URT_SRC_getresult.getString(1);
        var URT_SRC_terminatetemplogidtbl=URT_SRC_getresult.getString(2);
      }
      if(URT_SRC_sucess_flag==1)
      {
        /*---------------------------------UNSHARE THE FILE & FOLDER---------------------------------------------*/   
        URSRC_sharedocflag=URSRC_unshareDocuments(URT_SRC_conn,"",URT_SRC_emailid)
        //********************** UNSHARE CALENDAR     
        URSRC_sharecalflag=USRC_shareUnSharecalender(URT_SRC_conn,URT_SRC_emailid,'none')
        //*************UNSHARE SITE
        var sitermoveflag=URSRC_removeViewer(URT_SRC_conn,URT_SRC_emailid);
      }
      var URT_SRC_success_flag=[];
      URT_SRC_success_flag=[URT_SRC_flg_terminate,URT_SRC_sucess_flag];
      URT_SRC_conn.commit();
      if(URT_SRC_terminatetemplogidtbl!=null&&URT_SRC_terminatetemplogidtbl!=undefined){
        eilib.DropTempTable(URT_SRC_conn,URT_SRC_terminatetemplogidtbl);}
      URT_SRC_conn.close();
      return URT_SRC_success_flag; 
    }catch(err)
    {
      Logger.log("SCRIPT EXCEPTION:"+err)
      URT_SRC_conn.rollback();
      if(URT_SRC_terminatetemplogidtbl!=null&&URT_SRC_terminatetemplogidtbl!=undefined){
        eilib.DropTempTable(URT_SRC_conn,URT_SRC_terminatetemplogidtbl);}
      //********************** RESHARE CALENDAR 
      if(URSRC_sharecalflag==1){
        USRC_shareUnSharecalender(URT_SRC_conn,URT_SRC_emailid,'writer');
      }
      //********************** RESHARE SITE
      if(sitermoveflag==1){
        URSRC_addViewer(URT_SRC_conn,URT_SRC_emailid);}
      //************RESHARE DOCS
      if(URSRC_sharedocflag==1){
        URSRC_shareDocuments(URT_SRC_conn,"",URT_SRC_emailid)};
      URT_SRC_conn.commit();
      URT_SRC_conn.close();
      return Logger.getLog();
    }
  }
  /*-------------------------------------------FUNCTION TO TERMINATE LOGIN DETAILS-----------------------------*/
  function URT_SRC_func_enddate(URT_SRC_lb_loginid,URT_SRC_recdver,URT_SRC_flag_srcupd,URT_SRC_flg_reverlen) { 
    var URT_SRC_conn =eilib.db_GetConnection();
    var URT_SRC_stmt_enddate = URT_SRC_conn.createStatement();
    if(URT_SRC_flag_srcupd=='URT_SRC_check_enddate')
      var URT_SRC_select_enddate="(SELECT DISTINCT UA_JOIN_DATE,UA_REASON,UA_END_DATE,UA_JOIN FROM USER_ACCESS UA WHERE UA.ULD_ID =(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+URT_SRC_lb_loginid+"') AND UA.UA_REC_VER=(SELECT MAX(UA_REC_VER) FROM USER_ACCESS WHERE ULD_ID=UA.ULD_ID))";
    else if(URT_SRC_flag_srcupd=='URT_SRC_check_rejoindate')
      var URT_SRC_select_enddate="SELECT DISTINCT UA_JOIN_DATE,UA_REASON,UA_END_DATE,UA_JOIN FROM USER_ACCESS UA WHERE UA.ULD_ID =(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+URT_SRC_lb_loginid+"') AND UA.UA_REC_VER=(SELECT MAX(UA_REC_VER) FROM USER_ACCESS WHERE ULD_ID=UA.ULD_ID)";
    else if(URT_SRC_flag_srcupd=='URT_SRC_srcupd')
      var URT_SRC_select_enddate="SELECT DISTINCT UA_JOIN_DATE,UA_REASON,UA_END_DATE,UA_JOIN FROM USER_ACCESS UA WHERE UA.ULD_ID =(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+URT_SRC_lb_loginid+"') AND UA.UA_REC_VER="+URT_SRC_recdver+"";
    var URT_SRC_rs_enddate=URT_SRC_stmt_enddate.executeQuery(URT_SRC_select_enddate);
    while(URT_SRC_rs_enddate.next())
    {   
      var URT_SRC_joindate=URT_SRC_rs_enddate.getString(1);
      var URT_SRC_reason=URT_SRC_rs_enddate.getString(2);
      var URT_SRC_enddate=URT_SRC_rs_enddate.getString(3);
      var URT_SRC_join=URT_SRC_rs_enddate.getString(4);
    }
    URT_SRC_rs_enddate.close();URT_SRC_stmt_enddate.close();
    if(URT_SRC_flg_reverlen=='URT_SRC_recvrsion_more'){     
      var URT_SRC_stmt_next_jdate = URT_SRC_conn.createStatement();
      URT_SRC_recdver=parseInt(URT_SRC_recdver)+1
      var URT_SRC_select_next_jdate="SELECT UA_JOIN_DATE FROM USER_ACCESS UA WHERE UA.ULD_ID =(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+URT_SRC_lb_loginid+"') AND UA.UA_REC_VER="+URT_SRC_recdver+"";
      var URT_SRC_rs_next_jdate=URT_SRC_stmt_next_jdate.executeQuery(URT_SRC_select_next_jdate);
      if(URT_SRC_rs_next_jdate.next())
        var URT_SRC_next_jdate=URT_SRC_rs_next_jdate.getString(1);
      else
        var URT_SRC_next_jdate='URT_SRC_nomore_recver';
      URT_SRC_rs_next_jdate.close();URT_SRC_stmt_next_jdate.close();
      var URT_SRC_result={"URT_SRC_obj_next_jdate":URT_SRC_next_jdate,"URT_SRC_obj_joindate":URT_SRC_joindate,"URT_SRC_obj_endate":URT_SRC_enddate,"URT_SRC_obj_reason":URT_SRC_reason,"URT_SRC_obj_srcupd":URT_SRC_flag_srcupd}
      }
    else
      var URT_SRC_result={"URT_SRC_obj_joindate":URT_SRC_joindate,"URT_SRC_obj_endate":URT_SRC_enddate,"URT_SRC_obj_reason":URT_SRC_reason,"URT_SRC_obj_srcupd":URT_SRC_flag_srcupd}
      return URT_SRC_result;
    URT_SRC_conn.close();  }
  var URSRC_sharedocflag=0,URSRC_sharecalflag=0,URSRC_sharesiteflag=0;
  
  /*-------------------------------------------FUNCTION TO REJOIN LOGIN DETAILS-----------------------------*/
  function URT_SRC_func_rejoin(URT_SRC_upd_emailid,URT_SRC_upd_rejoindate,URT_SRC_upd_customrole,URT_SRC_flg_rejoin) { 
    try{
      URSRC_sharedocflag=0,URSRC_sharecalflag=0,URSRC_sharesiteflag=0;
      var URT_SRC_temptable;
      var URT_SRC_conn =eilib.db_GetConnection();
      URT_SRC_conn.setAutoCommit(false);
      var URT_SRC_upd_rejoindate= eilib.SqlDateFormat(URT_SRC_upd_rejoindate);
      var URT_SRC_stmt_rejoin_id = URT_SRC_conn.createStatement();
      URT_SRC_upd_customrole=URT_SRC_upd_customrole.replace("_"," ")
      var URT_SRC_select_rejoin_id="SELECT UA_ID,RC_ID,MAX(UA.UA_REC_VER),ULD_ID FROM USER_ACCESS UA WHERE UA.ULD_ID =(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+URT_SRC_upd_emailid+"')";
      var URT_SRC_rs_rejoin_id=URT_SRC_stmt_rejoin_id.executeQuery(URT_SRC_select_rejoin_id);
      while(URT_SRC_rs_rejoin_id.next())
      {
        var URT_SRC_autoinc_id=URT_SRC_rs_rejoin_id.getInt(1);
        var URT_SRC_userpro_maxrec=URT_SRC_rs_rejoin_id.getInt(3);
        var URT_SRC_userpro_uldid=URT_SRC_rs_rejoin_id.getString(4);
      }
      URT_SRC_rs_rejoin_id.close();URT_SRC_stmt_rejoin_id.close();
      var URT_SRC_stmt_rc_id = URT_SRC_conn.createStatement();
      var URT_SRC_select_rc_id="SELECT RC_ID FROM ROLE_CREATION where RC_NAME='"+URT_SRC_upd_customrole+"'";
      var URT_SRC_rs_rc_id=URT_SRC_stmt_rc_id.executeQuery(URT_SRC_select_rc_id);
      while(URT_SRC_rs_rc_id.next()){
        var URT_SRC_rc_id=URT_SRC_rs_rc_id.getString("RC_ID")
        }
      var URT_SRC_stmt_rejoin = URT_SRC_conn.createStatement();
      var URT_SRC_select_rejoin="CALL SP_LOGIN_CREATION_INSERT('"+URT_SRC_upd_emailid+"','"+URT_SRC_upd_customrole+"','"+URT_SRC_upd_rejoindate+"','"+UserStamp+"',@TEMPTABLE,@LOGIN_CREATIONFLAG)";
      URT_SRC_stmt_rejoin.execute(URT_SRC_select_rejoin);
      URT_SRC_stmt_rejoin.close();   
      var URT_SRC_stmt_lgncreflag=URT_SRC_conn.createStatement();
      var URT_SRC_flag_lgncreselect="SELECT @TEMPTABLE,@LOGIN_CREATIONFLAG";
      var URT_SRC_flag_lgncrers=URT_SRC_stmt_lgncreflag.executeQuery(URT_SRC_flag_lgncreselect);
      while(URT_SRC_flag_lgncrers.next())
      {
        URT_SRC_temptable=URT_SRC_flag_lgncrers.getString("@TEMPTABLE");
        var URT_SRC_flag_lgncreinsert=URT_SRC_flag_lgncrers.getString("@LOGIN_CREATIONFLAG");
      }
      URT_SRC_flag_lgncrers.close();
      URT_SRC_stmt_lgncreflag.close();
      if(URT_SRC_flag_lgncreinsert==1){
        URSRC_sharedocflag=URSRC_shareDocuments(URT_SRC_conn,URT_SRC_upd_customrole,URT_SRC_upd_emailid)
        URSRC_sharesiteflag=URSRC_addViewer(URT_SRC_conn,URT_SRC_upd_emailid) 
        URSRC_sharecalflag=USRC_shareUnSharecalender(URT_SRC_conn,URT_SRC_upd_emailid,'writer');
      }
      if(URT_SRC_temptable!='null'){
        eilib.DropTempTable(URT_SRC_conn,URT_SRC_temptable)}
      URT_SRC_conn.commit();
      URT_SRC_conn.close();
      var URT_SRC_success_flag=[];
      URT_SRC_success_flag=[URT_SRC_flg_rejoin,URT_SRC_flag_lgncreinsert]
      return URT_SRC_success_flag;  
    }catch(err)
    {
      Logger.log("SCRIPT EXCEPTION:"+err)
      URT_SRC_conn.rollback();
      if(URT_SRC_temptable!='null'){
        eilib.DropTempTable(URT_SRC_conn,URT_SRC_temptable)
      }
      if(URSRC_sharedocflag==1)
      {
        URSRC_unshareDocuments(URT_SRC_conn,URT_SRC_upd_customrole,URT_SRC_upd_emailid)
      }
      if(URSRC_sharesiteflag==1)
      {
        URSRC_removeViewer(URT_SRC_conn,URT_SRC_upd_emailid)
      }
      if(URSRC_sharecalflag==1)
      {
        USRC_shareUnSharecalender(URT_SRC_conn,URT_SRC_upd_emailid,'none');
      }
      URT_SRC_conn.commit();
      URT_SRC_conn.close();
      return Logger.getLog();
    }
  } 
  /*-------------------------------------------FUNCTION TO GET LOGIN ID REC VER-----------------------------*/
  function URT_SRC_func_recordversion(URT_SRC_lb_loginid_rec,URT_SRC_flag_recver) { 
    var URT_SRC_conn =eilib.db_GetConnection();
    var URT_SRC_stmt_rec = URT_SRC_conn.createStatement();
    var URT_SRC_select_rec="SELECT UA_REC_VER FROM USER_ACCESS WHERE ULD_ID =(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+URT_SRC_lb_loginid_rec+"') AND UA_TERMINATE='X'";
    var URT_SRC_rs_rec=URT_SRC_stmt_rec.executeQuery(URT_SRC_select_rec);
    var URT_SRC_recordversion=[];
    while(URT_SRC_rs_rec.next())
    {   
      URT_SRC_recordversion.push(URT_SRC_rs_rec.getString(1));
    }
    URT_SRC_rs_rec.close();URT_SRC_stmt_rec.close();
    if(URT_SRC_recordversion.length==1){
      var URT_SRC_upd_val=URT_SRC_func_enddate(URT_SRC_lb_loginid_rec,URT_SRC_recordversion[0],'URT_SRC_srcupd','URT_SRC_recvrsion_one')
      URT_SRC_upd_val={"URT_SRC_obj_endate":URT_SRC_upd_val.URT_SRC_obj_endate,"URT_SRC_obj_reason":URT_SRC_upd_val.URT_SRC_obj_reason,"URT_SRC_obj_srcupd":URT_SRC_upd_val.URT_SRC_obj_srcupd,"URT_SRC_obj_recordversion":URT_SRC_recordversion,"URT_SRC_obj_joindate":URT_SRC_upd_val.URT_SRC_obj_joindate}
    }
    else{
      var URT_SRC_upd_val={"URT_SRC_obj_recordversion":URT_SRC_recordversion,"URT_SRC_obj_srcupd":URT_SRC_flag_recver}
      }  
    return URT_SRC_upd_val;
    URT_SRC_conn.close();  
  }
  /*-------------------------------------------FUNCTION TO UPDATE LOGIN DETAILS-----------------------------*/
  function URT_SRC_func_update(URT_SRC_upd_loginid,URT_SRC_upd_recver,URT_SRC_upd_edate,URT_SRC_upd_reason,URT_SRC_flg_updation,URT_SRC_oldval_edate,URT_SRC_oldval_rson) { 
    var URT_SRC_conn =eilib.db_GetConnection();  
    var URT_SRC_stmt_terminate = URT_SRC_conn.createStatement();
    var URT_SRC_upd_enddate= eilib.SqlDateFormat(URT_SRC_upd_edate);
    var URT_SRC_sucess_flag=0;
    if (URT_SRC_upd_recver==null||URT_SRC_upd_recver=="SELECT")
    {
      var URT_SRC_update_terminate =" UPDATE USER_ACCESS SET UA_END_DATE='"+URT_SRC_upd_enddate+"',UA_REASON='"+URT_SRC_upd_reason+"',UA_USERSTAMP='"+UserStamp+"' WHERE ULD_ID=(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+URT_SRC_upd_loginid+"') AND UA_REC_VER=1";
    }
    else
    {
      var URT_SRC_update_terminate =" UPDATE USER_ACCESS SET UA_END_DATE='"+URT_SRC_upd_enddate+"',UA_REASON='"+URT_SRC_upd_reason+"',UA_USERSTAMP='"+UserStamp+"' WHERE ULD_ID=(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+URT_SRC_upd_loginid+"') AND UA_REC_VER="+URT_SRC_upd_recver+"";
    }
    URT_SRC_stmt_terminate.execute(URT_SRC_update_terminate);
    URT_SRC_sucess_flag=1;
    URT_SRC_stmt_terminate.close();
    var URT_SRC_success_flag=[];
    URT_SRC_success_flag=[URT_SRC_flg_updation,URT_SRC_sucess_flag]
    URT_SRC_conn.close();
    return URT_SRC_success_flag;    
  }    
}
catch(err)
{
}
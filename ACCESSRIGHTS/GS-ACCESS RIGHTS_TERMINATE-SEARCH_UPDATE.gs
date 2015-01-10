//*******************************************FILE DESCRIPTION*********************************************//
//************************************ACCESS RIGHTS_TERMINATE-SEARCH/UPDATE***********************************************//
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
    var URT_SRC_enddate= eilib.SqlDateFormat(URT_SRC_enddate);
    var URT_SRC_conn =eilib.db_GetConnection();
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
    var URT_SRC_insert_terminate ="CALL SP_LOGIN_TERMINATE_SAVE('"+URT_SRC_emailid+"','"+URT_SRC_enddate+"','"+URT_SRC_reason+"','"+UserStamp+"',@TERM_FLAG)";
    URT_SRC_stmt_terminateupd.execute(URT_SRC_insert_terminate);
    URT_SRC_stmt_terminateupd.close();
    /*---------------------------------UNSHARE THE FILE & FOLDER---------------------------------------------*/    
    var URT_SRC_stmt_file = URT_SRC_conn.createStatement();
    var URT_SRC_arr_file=[];
    var URT_SRC_select_file="SELECT * FROM FILE_PROFILE FP,USER_FILE_DETAILS UFD,USER_ACCESS UA,USER_LOGIN_DETAILS ULD WHERE ULD.ULD_LOGINID='"+URT_SRC_emailid+"'  AND ULD.ULD_ID=UA.ULD_ID AND UA.RC_ID=UFD.RC_ID AND UA.UA_REC_VER=(select max(UA_REC_VER) from USER_ACCESS UA,USER_LOGIN_DETAILS ULD where ULD.ULD_ID=UA.ULD_ID and ULD_LOGINID='"+URT_SRC_emailid+"' and UA_JOIN is  null) AND FP.FP_ID=UFD.FP_ID";
    var URT_SRC_rs_file=URT_SRC_stmt_file.executeQuery(URT_SRC_select_file);
    while(URT_SRC_rs_file.next())
    {
      var URT_SRC_arr_fileid=URT_SRC_rs_file.getString("FP_FILE_ID")
      if(URT_SRC_arr_fileid!=null){
        URT_SRC_arr_file.push(URT_SRC_arr_fileid)
      }
      if(URT_SRC_arr_fileid==null||URT_SRC_arr_fileid!=null){
        URT_SRC_arr_file.push(URT_SRC_rs_file.getString("FP_FOLDER_ID"))      
      }
    }
    URT_SRC_rs_file.close();
    URT_SRC_stmt_file.close();
    URT_SRC_arr_file=eilib.unique(URT_SRC_arr_file);
    for(var k=0;k<URT_SRC_arr_file.length;k++) {      
      var editors=DriveApp.getFileById(URT_SRC_arr_file[k]).getEditors();
      for(var i=0;i<editors.length;i++)
      {
        if(editors[i].getEmail()==URT_SRC_emailid){ 
          DriveApp.getFileById(URT_SRC_arr_file[k]).removeEditor(URT_SRC_emailid);
        }}     
      var viewers=DriveApp.getFileById(URT_SRC_arr_file[k]).getViewers();
      for(var i=0;i<viewers.length;i++)
      {
        if(viewers[i].getEmail()==URT_SRC_emailid){
          DriveApp.getFileById(URT_SRC_arr_file[k]).removeViewer(URT_SRC_emailid);
        }
      }
    }
    var URT_SRC_return_flag_stmt=URT_SRC_conn.createStatement();
    var URT_SRC_getresult= URT_SRC_return_flag_stmt.executeQuery("SELECT @TERM_FLAG");
    while(URT_SRC_getresult.next()){
      var URT_SRC_sucess_flag=URT_SRC_getresult.getString("@TERM_FLAG");
    }    
    ShareUnshareCalender(URT_SRC_emailid,'none')
    URSRC_removeViewer(URT_SRC_emailid);
    var URT_SRC_success_flag=[];
    URT_SRC_success_flag=[URT_SRC_flg_terminate,URT_SRC_sucess_flag]   
    URT_SRC_conn.close();
    return URT_SRC_success_flag;     
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
  /*-------------------------------------------FUNCTION TO REJOIN LOGIN DETAILS-----------------------------*/
  function URT_SRC_func_rejoin(URT_SRC_upd_emailid,URT_SRC_upd_rejoindate,URT_SRC_upd_customrole,URT_SRC_flg_rejoin) { 
    var URT_SRC_conn =eilib.db_GetConnection();
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
    var URT_SRC_select_rejoin="CALL SP_LOGIN_CREATION_INSERT('"+URT_SRC_upd_emailid+"','"+URT_SRC_upd_customrole+"','"+URT_SRC_upd_rejoindate+"','"+UserStamp+"',@UR_FLAG)";
    URT_SRC_stmt_rejoin.execute(URT_SRC_select_rejoin);
    URT_SRC_stmt_rejoin.close();
    ShareUnshareCalender(URT_SRC_upd_emailid,'writer');
    URSRC_addViewer(URT_SRC_upd_emailid)
    var URT_SRC_stmt_file = URT_SRC_conn.createStatement();
    var URT_SRC_arr_file=[];  
    var URSRC_folderid_array=[];
    var URSRC_fileid=[];
    var URT_SRC_select_file='SELECT * from USER_FILE_DETAILS UFD,FILE_PROFILE  FP where UFD.RC_ID=(select RC_ID from ROLE_CREATION where RC_NAME="'+URT_SRC_upd_customrole+'") and UFD.FP_ID=FP.FP_ID'
    var URT_SRC_rs_file=URT_SRC_stmt_file.executeQuery(URT_SRC_select_file);
    while(URT_SRC_rs_file.next())
    {
      var URT_SRC_arr_fileid=URT_SRC_rs_file.getString("FP_FILE_ID")
      var folderid=URT_SRC_rs_file.getString("FP_FOLDER_ID");
      if(URT_SRC_arr_fileid!=null){
        URT_SRC_arr_file.push(URT_SRC_arr_fileid)
        URSRC_folderid_array.push(folderid)
        URSRC_fileid.push(URT_SRC_arr_fileid)
      }
      if(URT_SRC_arr_fileid==null||URT_SRC_arr_fileid!=null){
        URT_SRC_arr_file.push(URT_SRC_rs_file.getString("FP_FOLDER_ID"))      
      }}
    URSRC_folderid_array=eilib.unique(URSRC_folderid_array);
    URT_SRC_arr_file=eilib.unique(URT_SRC_arr_file);
    URT_SRC_rs_file.close();URT_SRC_stmt_file.close();
    for(var k=0;k<URT_SRC_arr_file.length;k++) {      
      DriveApp.getFileById(URT_SRC_arr_file[k]).addEditor(URT_SRC_upd_emailid);
    }    
    var allid_array=[]
    if(URSRC_folderid_array.length!=0){
      var folder=URSRC_folderid_array[0];
      var all_files=DriveApp.getFolderById(folder).getFiles();
      while(all_files.hasNext()){        
        var id=all_files.next().getId();
        allid_array.push(id)     
      }
    }
    var j=0;
    var URSRC_new_diff_array=[]
    if(URSRC_fileid.length!=0){
      for(var i=0; i<=allid_array.length-1;i++)
      {
        if(URSRC_fileid.indexOf(allid_array[i])==-1)
        {
          URSRC_new_diff_array[j]=allid_array[i];
          j++;
        }         
      }
      for(var k=0;k< URSRC_new_diff_array.length;k++){
        var foldereditors=DriveApp.getFileById(URSRC_new_diff_array[k]).getEditors()        
        for(var l=0;l<foldereditors.length;l++){ 
          if(foldereditors[l].getEmail()=='')continue;              
          if(URT_SRC_upd_emailid==foldereditors[l].getEmail())
          var remov_Folder=DriveApp.getFileById(URSRC_new_diff_array[k]).removeEditor(URT_SRC_upd_emailid); 
        }
      } 
    }    
    var URT_SRC_return_flag_stmt=URT_SRC_conn.createStatement();
    var URT_SRC_getresult= URT_SRC_return_flag_stmt.executeQuery("SELECT @UR_FLAG");
    while(URT_SRC_getresult.next()){
      var URT_SRC_sucess_flag=URT_SRC_getresult.getString("@UR_FLAG");
    }
    var URT_SRC_success_flag=[];
    URT_SRC_success_flag=[URT_SRC_flg_rejoin,URT_SRC_sucess_flag]
    URT_SRC_conn.close();
    return URT_SRC_success_flag;    
  } 
  /*-------------------------------------------FUNCTION TO TERMINATE LOGIN DETAILS-----------------------------*/
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
    URT_SRC_conn.close();  }
  /*-------------------------------------------FUNCTION TO UPDATE LOGIN DETAILS-----------------------------*/
  function URT_SRC_func_update(URT_SRC_upd_loginid,URT_SRC_upd_recver,URT_SRC_upd_edate,URT_SRC_upd_reason,URT_SRC_flg_updation,URT_SRC_oldval_edate,URT_SRC_oldval_rson) { 
    var URT_SRC_conn =eilib.db_GetConnection();  
    var URT_SRC_stmt_terminate = URT_SRC_conn.createStatement();
    var URT_SRC_upd_enddate= eilib.SqlDateFormat(URT_SRC_upd_edate);
    var URT_SRC_sucess_flag=0;
    var URT_SRC_update_terminate =" UPDATE USER_ACCESS SET UA_END_DATE='"+URT_SRC_upd_enddate+"',UA_REASON='"+URT_SRC_upd_reason+"',UA_USERSTAMP='"+UserStamp+"' WHERE ULD_ID=(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+URT_SRC_upd_loginid+"') AND UA_REC_VER="+URT_SRC_upd_recver+"";
    URT_SRC_stmt_terminate.execute(URT_SRC_update_terminate);
    URT_SRC_sucess_flag=1;
    URT_SRC_stmt_terminate.close();
    var URT_SRC_success_flag=[];
    URT_SRC_success_flag=[URT_SRC_flg_updation,URT_SRC_sucess_flag]
    URT_SRC_conn.close();
    return URT_SRC_success_flag;    
  }    
  function ShareUnshareCalender(URSRC_loginid,roles){
    var URSRC_conn = eilib.db_GetConnection(); 
    var URSRC_calenderid_stmt = URSRC_conn.createStatement();
    var URSRC_select_calenderid='SELECT CCN_DATA from CUSTOMER_CONFIGURATION where CGN_ID=75'
    var URSRC_select_calenderid_rs=URSRC_calenderid_stmt.executeQuery(URSRC_select_calenderid);
    while(URSRC_select_calenderid_rs.next()){    
      var calendarId=URSRC_select_calenderid_rs.getString("CCN_DATA")
      }
    var acl = {
      scope: {
        type: 'user',
        value:URSRC_loginid
      },
      role: roles
    };
    Calendar.Acl.insert(acl, calendarId);    
  }   
  function URT_SRC_getSite(){  
    var URSRC_conn = eilib.db_GetConnection(); 
    var sitelink
    var URSRC_getsitee_stmt=URSRC_conn.createStatement();
    var URSRC_select_site="SELECT * FROM USER_RIGHTS_CONFIGURATION WHERE CGN_ID =68"
    var URSRC_getsite_rs=URSRC_getsitee_stmt.executeQuery(URSRC_select_site)
    while(URSRC_getsite_rs.next()){
      sitelink=SitesApp.getSiteByUrl(URSRC_getsite_rs.getString("URC_DATA"))
    }
    return sitelink
  } 
  function URSRC_removeViewer(URT_SRC_emailid){  
    var URSRC_conn = eilib.db_GetConnection();  
    var site=URT_SRC_getSite();
    site.removeViewer(URT_SRC_emailid);  
    URSRC_conn.close();
  }  
  function URSRC_addViewer(URT_SRC_emailid){  
    var URSRC_conn = eilib.db_GetConnection();  
    var site=URT_SRC_getSite();
    site.addViewer(URT_SRC_emailid);  
    URSRC_conn.close();
  }
}
catch(err)
{
}
//*******************************************FILE DESCRIPTION*********************************************//
//********************************************UNIT CREATION***********************************************//
//DONE BY:SARADAMBAL
//VER 1.6-TRACKER NO:724,SD:08/07/2014 ED:08/07/2014,implemented eilib for already exists for doorcode and weblogin and then set min data,change id name for doorcode & weblogin
//VER 1.5-TRACKER NO:724,SD:09/06/2014 ED:09/06/2014,implemented script for failure function
//VER 1.4-TRACKER NO:724,SD:07/06/2014 ED:07/06/2014,Updated new link
//VER 1.3-TRACKER NO:724,SD:09/04/2014 ED:09/04/2014,changed dp for startdate and enddate validation(min:-1M of sysdate,max:+2Y of sysdate,sd>=ed),implemented class for dp(mandatory and non-mandatory)
//VER 1.2-TRACKER NO:724,SD:18/02/2014 ED:01/03/2014,implemented sp(returning flag) and added errormsg for not saving data,checked sp after changing uldid instead of userstamp and uldtlid for web login details
//VER 1.1-TRACKER NO:724,SD:04/02/2014 ED:07/02/2014,implemented calendar event for unit creation,cleared issue for disable submit btn when clear btn enable,give autosize to bank addr ta and give maxlength using jquery
//VER 1.0-SD:22/01/2014 ED:22/01/2014,converted acc no as number only,converted h3 tag
//VER 0.09-SD:01/01/2014 ED:03/01/2014,removed repeated function,cleared listbox loading issue for stamptype for no data,implemented all amt validation for save part
//VER 0.08-SD:28/12/2013 ED:30/12/2013,removed utilities function,implement connection open & close function for eilib function,changed alignment for form title
//VER 0.07-SD:30/11/2013 ED:30/11/2013,changed syntax for array length check,changed reset function coding to reduce time consumption,implemented utilities.sleep function
//VER 0.06-SD:20/11/2013 ED:25/11/2013,implemented errormsg for roomtype & stamptype for no data available from table,updated failure function,implemented eilib for unit no already exists  
//VER 0.05-SD:19/11/2013 ED:19/11/2013,changed access card as integer
//VER 0.04-SD:09/11/2013 ED:10/11/2013,change sp name,change parameters in sp,change maxlength for doorcode,remove already exists coding in form blur function,implement eilib function for accesscard,roomtype and stamptype
//VER 0.03-SD:07/10/2013 ED:07/10/2013,change prefix for userstamp,implement return function,change head tag links
//VER 0.02-SD:01/10/2013 ED:04/10/2013,updated eilib connection,message box,preloader,removed scriplet,convert blur function for all change function,fix add btn width for auto grow text,change reset coding,change comments nd EI/NON EI check.
//VER 0.01-INITIAL VERSION,TRACKER NO:243, SD:12/08/2013,ED:03/09/2013
//*********************************************************************************************************//
//DO GET FUNCTION
try
{
  /*-----------------------------------------FUNCTION FOR FETCHING ERROR MESSAGE,ROOMTYPE AND STAMPTYPE FROM SQL TABLE----------------------------------------------*/
  function UCRE_getroomstamp_err(UCRE_flag)
  {
    var UCRE_result=[];
    var UCRE_conn =eilib.db_GetConnection();
    var UCRE_errorarray =  eilib.GetErrorMessageList(UCRE_conn,'1,2,7,8,9,10,11,30,308,400,463,464,466,467');
    var UCRE_stmt_room= UCRE_conn.createStatement();
    var UCRE_select_query_room_type = "SELECT DISTINCT URTD_ROOM_TYPE FROM UNIT_ROOM_TYPE_DETAILS WHERE URTD_ROOM_TYPE IS NOT NULL ORDER BY URTD_ROOM_TYPE ASC"
    var UCRE_roomtype_rs = UCRE_stmt_room.executeQuery(UCRE_select_query_room_type);
    var UCRE_TB_roombox=[];
    while(UCRE_roomtype_rs.next())
    {
      var UCRE_all_room_type = UCRE_roomtype_rs.getString("URTD_ROOM_TYPE");
      UCRE_TB_roombox.push(UCRE_all_room_type);
    } 
    UCRE_roomtype_rs.close(); UCRE_stmt_room.close();  
    var UCRE_stmt_stamp = UCRE_conn.createStatement();
    var UCRE_select_query_stamp_type = "SELECT DISTINCT USDT_DATA FROM UNIT_STAMP_DUTY_TYPE WHERE USDT_DATA IS NOT NULL ORDER BY USDT_DATA ASC "
    var UCRE_stamptype_rs = UCRE_stmt_stamp.executeQuery(UCRE_select_query_stamp_type);
    var UCRE_TB_stampbox=[];
    while(UCRE_stamptype_rs.next())
    {
      var UCRE_all_stamp_type = UCRE_stamptype_rs.getString("USDT_DATA");
      UCRE_TB_stampbox.push(UCRE_all_stamp_type);
    }
    UCRE_stamptype_rs.close();UCRE_stmt_stamp.close();
    var UCRE_result={"UCRE_errorarray":UCRE_errorarray.errormsg,"UCRE_room":UCRE_TB_roombox,"UCRE_stamp":UCRE_TB_stampbox,"UCRE_obj_flag":UCRE_flag};      
    UCRE_conn.close();
    return UCRE_result;
  }     
  /*----------------------------------------FUNCTION FOR INSERTING THE UNIT CREATION USING SP-------------------------------------------*/
  function UCRE_processForm(UCRE_unitcreation)
  {
    var UCRE_unitnumber = UCRE_unitcreation.UCRE_tb_unitnumber;
    var UCRE_unitrental = UCRE_unitcreation.UCRE_tb_unitrentalamt;
    var UCRE_startdate = UCRE_unitcreation.UCRE_db_startdate;
    var UCRE_enddate = UCRE_unitcreation.UCRE_db_enddate;
    var UCRE_nonei= UCRE_unitcreation.UCRE_cb_nonEI;
    var UCRE_unitdeposite = UCRE_unitcreation.UCRE_tb_unitdeposite;
    var UCRE_accesscard = UCRE_unitcreation.UCRE_tb_accesscard;
    var UCRE_oldroomtype = UCRE_unitcreation.UCRE_lb_oldroomtype;
    var UCRE_newroomtype = UCRE_unitcreation.UCRE_tb_newroomtype;
    var UCRE_stampdutydate = UCRE_unitcreation.UCRE_db_stampdutydate;
    var UCRE_oldstamptype = UCRE_unitcreation.UCRE_lb_oldstamptype;
    var UCRE_newstamptype = UCRE_unitcreation.UCRE_tb_newstamptype;
    var UCRE_stampamount = UCRE_unitcreation.UCRE_tb_stampamount;
    var UCRE_doorcode = UCRE_unitcreation.UNIT_tb_doorcode;
    var UCRE_weblogin = UCRE_unitcreation.UNIT_tb_weblogin;
    var UCRE_webpass = UCRE_unitcreation.UCRE_tb_webpass;
    var UCRE_comments =UCRE_unitcreation.UCRE_ta_comments;
    var UCRE_accntnumber = UCRE_unitcreation.UCRE_tb_accntnumber;
    var UCRE_accntname = UCRE_unitcreation.UCRE_tb_accntname;
    var UCRE_bankcode = UCRE_unitcreation.UCRE_tb_bankcode;
    var UCRE_branchcode = UCRE_unitcreation.UCRE_tb_branchcode;
    var UCRE_bankaddrs = UCRE_unitcreation.UCRE_tb_bankaddrs;
    if(UCRE_comments!='')
      UCRE_comments=eilib.ConvertSpclCharString(UCRE_comments);
    if(UCRE_accntname!='')
      UCRE_accntname=eilib.ConvertSpclCharString(UCRE_accntname);
    if(UCRE_bankaddrs!='')
      UCRE_bankaddrs=eilib.ConvertSpclCharString(UCRE_bankaddrs);
    if(UCRE_newroomtype!=undefined){
      var UCRE_finalroomtype =UCRE_newroomtype;
      var UCRE_alreadyexist_flag_room=UCRE_checkExistingUnit('UCRE_tb_newroomtype',UCRE_finalroomtype)
      }
    else if(UCRE_oldroomtype!=undefined)
      var UCRE_finalroomtype =UCRE_oldroomtype; 
    if(UCRE_newstamptype!=undefined){
      var UCRE_finalstamptype =UCRE_newstamptype;
      var UCRE_alreadyexist_flag_stamp=UCRE_checkExistingUnit('UCRE_tb_newstamptype',UCRE_finalstamptype)
      }
    else if(UCRE_oldstamptype!=undefined)
      var UCRE_finalstamptype =UCRE_oldstamptype;
    var UCRE_nonei_calendar=UCRE_nonei;
    if(UCRE_nonei=='X')
      UCRE_nonei="'X'";
    else
      UCRE_nonei=null;
    if(UCRE_stampdutydate=="")
      UCRE_stampdutydate=null;  
    else
    {
      UCRE_stampdutydate = eilib.SqlDateFormat(UCRE_stampdutydate)
      UCRE_stampdutydate="'"+UCRE_stampdutydate+"'";
    }
    if(UCRE_finalroomtype=='SELECT')
      UCRE_finalroomtype=null;
    else{
      UCRE_finalroomtype=eilib.ConvertSpclCharString(UCRE_finalroomtype);
      UCRE_finalroomtype="'"+UCRE_finalroomtype+"'";}
    if(UCRE_finalstamptype=='SELECT')
      UCRE_finalstamptype=null;
    else{
      UCRE_finalstamptype=eilib.ConvertSpclCharString(UCRE_finalstamptype);
      UCRE_finalstamptype="'"+UCRE_finalstamptype+"'";}
    var UCRE_alreadyexist_flag_unit=UCRE_checkExistingUnit('UCRE_tb_unitnumber',UCRE_unitnumber)
    if(UCRE_accesscard=='')
      UCRE_accesscard=null;
    else
      var UCRE_alreadyexist_flag_card=UCRE_checkExistingUnit('UCRE_tb_accesscard',UCRE_accesscard)
      if(UCRE_unitdeposite=='')
        UCRE_unitdeposite=null;
    if(UCRE_stampamount=='')
      UCRE_stampamount=null;            
    UCRE_startdate=eilib.SqlDateFormat(UCRE_startdate)
    UCRE_enddate=eilib.SqlDateFormat(UCRE_enddate)
    if((UCRE_alreadyexist_flag_unit==true)||(UCRE_alreadyexist_flag_card==true)||(UCRE_alreadyexist_flag_stamp==true)||(UCRE_alreadyexist_flag_room==true)){
      var UCRE_alreadyexist_flag=true; 
      return {"UCRE_obj_flag":UCRE_alreadyexist_flag};
    }
    var UCRE_conn =eilib.db_GetConnection();
    var UCRE_stmt = UCRE_conn.createStatement();
    var UCRE_creatstmt ="CALL SP_UNIT_CREATION_INSERT("+UCRE_unitnumber+","+UCRE_unitrental+",'"+UCRE_startdate+"','"+UCRE_enddate+"',"+UCRE_nonei+","+UCRE_unitdeposite+",'"+UserStamp+"',"+UCRE_accesscard+","+UCRE_finalroomtype+","+UCRE_stampdutydate+","+UCRE_finalstamptype+","+UCRE_stampamount+",'"+UCRE_comments+"','"+UCRE_doorcode+"','"+UCRE_weblogin+"','"+UCRE_webpass+"','"+UCRE_accntnumber+"','"+UCRE_accntname+"','"+UCRE_bankcode+"','"+UCRE_branchcode+"','"+UCRE_bankaddrs+"',@FLAG)";
    UCRE_stmt.execute(UCRE_creatstmt);
    var UCRE_stmt_flag = UCRE_conn.createStatement();
    var UCRE_flag_rs=UCRE_stmt_flag.executeQuery("SELECT @FLAG");
    while(UCRE_flag_rs.next())
      if(UCRE_flag_rs.getString("@FLAG")==1) 
        var UCRE_flag_created='UCRE_flag_created';
    else
      var UCRE_flag_created=0;
    UCRE_flag_rs.close();UCRE_stmt_flag.close();
    var UCRE_calenderIDcode=eilib.CUST_getCalenderId(UCRE_conn);
    var  UCRE_sh_arr= eilib.getStarHubUnitCalTime(UCRE_conn);
    eilib. StarHubUnit_CreateCalEvent(UCRE_calenderIDcode,UCRE_startdate,UCRE_sh_arr[0],UCRE_sh_arr[1],UCRE_enddate,UCRE_sh_arr[0],UCRE_sh_arr[1],'',UCRE_unitnumber,'','START DATE','END DATE',UCRE_nonei_calendar,UCRE_unitrental)
    var UCRE_getroomstamp=[];
    /*------------------------------------------FUNCTION FOR REFRESH THE ROOM TYPE & STAMP TYPE------------------------------------------*/
    UCRE_getroomstamp=UCRE_getroomstamp_err(UCRE_flag_created);
    UCRE_stmt.close();
    UCRE_conn.close();
    return UCRE_getroomstamp;
  }
  /*------------------------------------------FUNCTION FOR ALREADY EXIST FOR UNIT NUMBER & ACCESS CARD-------------------------------------*/
  function UCRE_checkExistingUnit(UCRE_source,UCRE_unitacc_roomstamp) { 
    var UCRE_conn =eilib.db_GetConnection();
    var  UCRE_flag=[];
    if(UCRE_source=="UCRE_tb_unitnumber")
      UCRE_flag=eilib.CheckUnitnoExists(UCRE_conn,UCRE_unitacc_roomstamp)
      else if(UCRE_source=="UCRE_tb_accesscard")
        UCRE_flag=eilib.Check_ExistsCard(UCRE_conn,UCRE_unitacc_roomstamp)
        else if(UCRE_source=="UCRE_tb_newroomtype") {
          UCRE_unitacc_roomstamp=eilib.ConvertSpclCharString(UCRE_unitacc_roomstamp);
          UCRE_flag=eilib.Check_ExistsRmType(UCRE_conn,UCRE_unitacc_roomstamp)}
    else if(UCRE_source=="UCRE_tb_newstamptype") {
      UCRE_unitacc_roomstamp=eilib.ConvertSpclCharString(UCRE_unitacc_roomstamp);
      UCRE_flag=eilib.Check_ExistsStampduty(UCRE_conn,UCRE_unitacc_roomstamp)}
    else if((UCRE_source=="UNIT_tb_doorcode")||(UCRE_source=="UNIT_tb_weblogin")){
      UCRE_flag[0]=1;
      UCRE_flag=eilib.Check_ExistsDoorcodeLogin(UCRE_conn,UCRE_unitacc_roomstamp,UCRE_source)}
    UCRE_conn.close();
    return UCRE_flag; 
  }
}
catch(err)
{
}
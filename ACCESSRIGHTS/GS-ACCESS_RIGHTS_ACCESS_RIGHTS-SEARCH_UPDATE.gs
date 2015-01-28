//*******************************************FILE DESCRIPTION*********************************************
//************************************ACCESS_RIGHTS_ACCESS_RIGHTS-SEARCH/UPDATE***********************************************//
//DONE BY:PUNI
//VER 1.6-SD:25/10/2014 ED:25/10/2014;TRACKER NO :465;COMMENT 51,1.corrected sharing n unshare doc query with max rv by matching login id
//VER 1.5-SD:20/10/2014 ED:20/10/2014;TRACKER NO :465;COMMENT 47,1.CORRECTED WRONG FUNCTION NAME UR_GETSITE REUSED FOR AR SEARCH/UPDATE N AR TERMINATE SRCH/UPDATE
//VER 1.4-SD:28/08/2014 ED:01/10/2014;TRACKER NO :651;COMMENT 57,1.trimmed repeated functions n script,2.added new lib links,3.changed preloader n msgbox position,4.corrected btn validation,5.changed driveapp to docslist for remove editors
//DONE BY:SAFIYULLAH.M
//VER 1.3-SD:21/07/2014 ED:21/07/2014;TRACKER NO :651;UPDATED DRIVEAPP AS DOCSLIST FOR SHARING/UNSHARING DOCS.
//VER 1.2-SD:16/07/2014 ED:17/07/2014;TRACKER NO:651;CLEARED ISSUE FOR-NO SUCH USER AND GET EMAIL IF UNDEFINED.
//VER 1.1-SD:01/06/2014 ED:04/06/2014;TRACKER NO:651;updated customised error for script error.
//VER 1.0-SD:08/06/2014 ED:10/06/2014;TRACKER NO:651;issue corrected and updated failure msg
//VER 0.09-SD:06/06/2014 ED:06/06/2014;TRACKER NO:651;updated file description
//VER 0.08-SD:06/06/2014 ED:06/06/2014;TRACKER NO:651;CHANGED JQUERY LINK
//VER 0.07-31/05/2014 ED:3/06/2014-TRACKER NO:651-issues corrected
//VER 0.06 -31/05/2014 ED:31/05/2014-TRACKER NO :609- INCLUDE CONFIRM MENU
//VER 0.05-20/05/2014 ED:21/05/2015:TRACKER NO:651-INCLUDE SITE MAINTENANCE IN MENU
// VER 0.04- 12/05/2014 ED:17/05/2014;TRACKER NO:651-UPDATED ERROR MSG FROM EILIB,UPDATE RETIURN FLAG IN SCRIPT BY LL AND UPDATE SHARING CALENDER WHILE LOGIN CREATION
//APPLIED PLATFORM MANAGEMENT  IN SP
// VER 0.03-SD:22/01/2014 ED:22/01/2014;TRACKER NO:651-Corrected variable names
// VER 0.02- SD;08/01/2014 ED:13/01/2014:TRACKER NO: 651 -Added form for Basic role menu creation and search/update
// VER 0.01 - INITIAL VERSION-SD:09/11/2013 ED:07/01/2014;TRACKER NO: 651
try{ 
  function URSRC_getintialvalue()  
  {    
    var URSRC_conn = eilib.db_GetConnection();    
    var URSRC_error_msg_stmt = URSRC_conn.createStatement();
    var URSRC_errorAarray=[];
    var URSRC_select_err_msg="36,354,360,361,362,363,364,365,366,367,370,371,372,373,374,376,401,454,455,458,465";
    URSRC_errorAarray=eilib.GetErrorMessageList(URSRC_conn,URSRC_select_err_msg);
    var URSRC_userright_stmt = URSRC_conn.createStatement();
    var URSRC_userrights_array=[];
    var URSRC_select_userrights="select * from  USER_RIGHTS_CONFIGURATION URC,BASIC_ROLE_PROFILE BRP,ROLE_CREATION RC,USER_LOGIN_DETAILS ULD,USER_ACCESS UA where BRP.BRP_BR_ID=URC.URC_ID  and ULD.ULD_ID=UA.ULD_ID and RC.RC_ID=UA.RC_ID and RC.URC_ID=BRP.URC_ID and ULD.ULD_LOGINID='"+UserStamp+"' ORDER BY URC_DATA ASC"
    var URSRC_userrights_result=URSRC_userright_stmt.executeQuery(URSRC_select_userrights);
    while(URSRC_userrights_result.next()){
      URSRC_userrights_array.push(URSRC_userrights_result.getString("URC_DATA"));
    }     
    URSRC_userrights_result.close();
    URSRC_userright_stmt.close();    
    //------------
    var URSRC_select_basicroles_stmt = URSRC_conn.createStatement();
    var URSRC_basicroles_array=[];
    var URSRC_select_basicroles="SELECT * FROM USER_RIGHTS_CONFIGURATION WHERE CGN_ID=43 ORDER BY URC_DATA ASC"
    var URSRC_select_basicroles_result=URSRC_select_basicroles_stmt.executeQuery(URSRC_select_basicroles);
    while(URSRC_select_basicroles_result.next()){
      URSRC_basicroles_array.push(URSRC_select_basicroles_result.getString("URC_DATA"));
    }     
    URSRC_select_basicroles_result.close();
    URSRC_select_basicroles_stmt.close();
    //------------------------------- 
    var URSRC_select_basicrole_stmt = URSRC_conn.createStatement();
    var URSRC_select_basicrole="select * from  USER_RIGHTS_CONFIGURATION URC,ROLE_CREATION RC,USER_LOGIN_DETAILS ULD,USER_ACCESS UA where    ULD.ULD_ID=UA.ULD_ID and RC.RC_ID=UA.RC_ID and RC.URC_ID=URC.URC_ID and ULD.ULD_LOGINID='"+UserStamp+"' ORDER BY URC_DATA ASC"
    var URSRC_select_basicrole_result=URSRC_select_basicrole_stmt.executeQuery(URSRC_select_basicrole);
    if(URSRC_select_basicrole_result.next()){
      var URSRC_basicrole=URSRC_select_basicrole_result.getString("URC_DATA")
      }
    URSRC_select_basicrole_result.close();
    URSRC_select_basicrole_stmt.close();    
    ////--------------------
    var URSRC_basicroleid_stmt=URSRC_conn.createStatement();
    var URSRC_basicroleid_array=[];
    var select_basicrole_id="select * from USER_RIGHTS_CONFIGURATION URC,BASIC_ROLE_PROFILE BRP where URC.URC_DATA='"+URSRC_basicrole+"' and URC.URC_ID=BRP.URC_ID"
    var URSRC_basicroleid_rs=URSRC_basicroleid_stmt.executeQuery(select_basicrole_id)
    while(URSRC_basicroleid_rs.next()){     
      URSRC_basicroleid_array.push(URSRC_basicroleid_rs.getString("BRP_BR_ID"))     
    }
    URSRC_basicroleid_rs.close()
    URSRC_basicroleid_stmt.close()
    var URSRC_basicrole_profile_array=[];
    var URSRC_basicrole_stmt=URSRC_conn.createStatement();
    for(var i=0;i<URSRC_basicroleid_array.length;i++){      
      var select_basicrole="select * from USER_RIGHTS_CONFIGURATION URC,BASIC_ROLE_PROFILE BRP where  BRP.BRP_BR_ID=URC.URC_ID and BRP.BRP_BR_ID='"+URSRC_basicroleid_array[i]+"' order by URC_DATA asc "
      var URSRC_basicrole_rs=URSRC_basicrole_stmt.executeQuery(select_basicrole)
      while(URSRC_basicrole_rs.next()){     
        URSRC_basicrole_profile_array.push(URSRC_basicrole_rs.getString("URC_DATA"))        
      }
      URSRC_basicrole_rs.close()
    }
    URSRC_basicrole_profile_array=eilib.unique(URSRC_basicrole_profile_array)
    URSRC_basicrole_profile_array.sort()
    URSRC_basicrole_stmt.close()     
    //-------------------------
    var URSRC_logindetails_stmt = URSRC_conn.createStatement();
    var URSRC_logindetails_array=[];     
    var URSRC_select_logindetails='select * from VW_ACCESS_RIGHTS_TERMINATE_LOGINID'
    var URSRC_logindetails_result=URSRC_logindetails_stmt.executeQuery(URSRC_select_logindetails);
    while(URSRC_logindetails_result.next()){
      URSRC_logindetails_array.push(URSRC_logindetails_result.getString("ULD_LOGINID"));
    }     
    URSRC_logindetails_result.close();
    URSRC_logindetails_stmt.close();    
    var URSRC_role_stmt = URSRC_conn.createStatement();
    var URSRC_role_array=[];
    var URSRC_select_role_menu="SELECT * FROM ROLE_CREATION ORDER BY RC_NAME"
    var URSRC_role_result=URSRC_role_stmt.executeQuery(URSRC_select_role_menu);
    while(URSRC_role_result.next()){
      URSRC_role_array.push(URSRC_role_result.getString("RC_NAME"));      
    } 
    URSRC_role_result.close()
    URSRC_role_stmt.close()
    var CCAN_initial_values_array=[];
    var CCAN_initial_values={'URSRC_userrights':URSRC_userrights_array,'URSRC_role_array':URSRC_role_array,'URSRC_loginid_array':URSRC_logindetails_array,'URSRC_errorAarray':URSRC_errorAarray.errormsg,'URSRC_basicroles_array':URSRC_basicroles_array,'URSRC_basicrole':URSRC_basicrole,'URSRC_basicrole_profile_array':URSRC_basicrole_profile_array,'UserStamp':UserStamp}
    CCAN_initial_values_array.push(CCAN_initial_values)
    URSRC_conn.close();
    return CCAN_initial_values_array     
  }
  function URSRC_check_basicrolemenu(basicrole){
    var URSRC_conn = eilib.db_GetConnection();  
    var URSRC_check_basicrole_menu_stmt=URSRC_conn.createStatement();
    var URSRC_select_check_basicrole_menu="select * from BASIC_MENU_PROFILE BMP,USER_RIGHTS_CONFIGURATION URC where URC.URC_ID=BMP.URC_ID and URC.URC_DATA='"+basicrole+"'"
    var URSRC_check_basicrole_menu_rs=URSRC_check_basicrole_menu_stmt.executeQuery(URSRC_select_check_basicrole_menu)
    if(URSRC_check_basicrole_menu_rs.next()){
      var URSRC_check_basicrole_menu="true"      
      }
    else{      
      var URSRC_check_basicrole_menu="false"     
      }
    URSRC_check_basicrole_menu_rs.close()
    URSRC_check_basicrole_menu_stmt.close();
    URSRC_conn.close();
    return URSRC_check_basicrole_menu   
  }  
  //FUNCTION to get basic role menus
  function URSRC_getbasicrole_menu(basicrole,URSRC_basic_role){
    var URSRC_conn = eilib.db_GetConnection();  
    var URSRC_basicrole_menu_stmt=URSRC_conn.createStatement()
    var URSRC_basicrole_menu_array=[];
    var URSRC_select_basicrole_menu="select * from USER_RIGHTS_CONFIGURATION URC,BASIC_MENU_PROFILE BMP where URC.URC_ID=BMP.URC_ID and URC.URC_DATA='"+basicrole+"'"
    var URSRC_basicrole_menu_rs=URSRC_basicrole_menu_stmt.executeQuery(URSRC_select_basicrole_menu);
    while(URSRC_basicrole_menu_rs.next()){      
      URSRC_basicrole_menu_array.push(URSRC_basicrole_menu_rs.getString("MP_ID"));      
    }
    URSRC_basicrole_menu_rs.close();
    URSRC_basicrole_menu_stmt.close();
    var URSRC_basicroleid_stmt=URSRC_conn.createStatement();
    var URSRC_basicroleid_array=[];
    var select_basicrole_id="select * from USER_RIGHTS_CONFIGURATION URC,BASIC_ROLE_PROFILE BRP where URC.URC_DATA='"+basicrole+"' and URC.URC_ID=BRP.URC_ID"
    var URSRC_basicroleid_rs=URSRC_basicroleid_stmt.executeQuery(select_basicrole_id)
    while(URSRC_basicroleid_rs.next()){     
      URSRC_basicroleid_array.push(URSRC_basicroleid_rs.getString("BRP_BR_ID"))     
    }
    URSRC_basicroleid_rs.close()
    URSRC_basicroleid_stmt.close()
    var URSRC_basicrole_array=[];
    for(var i=0;i<URSRC_basicroleid_array.length;i++){      
      var URSRC_basicrole_stmt=URSRC_conn.createStatement();
      var select_basicrole="select * from USER_RIGHTS_CONFIGURATION URC,BASIC_ROLE_PROFILE BRP where  BRP.BRP_BR_ID=URC.URC_ID and BRP.BRP_BR_ID='"+URSRC_basicroleid_array[i]+"' ORDER BY URC_DATA ASC "
      var URSRC_basicrole_rs=URSRC_basicrole_stmt.executeQuery(select_basicrole)
      while(URSRC_basicrole_rs.next()){     
        URSRC_basicrole_array.push(URSRC_basicrole_rs.getString("URC_DATA"))        
      }
      URSRC_basicrole_rs.close() 
      URSRC_basicrole_stmt.close()    
    }
    URSRC_basicrole_array=eilib.unique(URSRC_basicrole_array)    
    var URSRC_basicrole_values={'URSRC_basicrole_menu':URSRC_basicrole_menu_array,'URSRC_basicrole_array':URSRC_basicrole_array}
    var URSRC_basicrole_values_array=[]
    URSRC_basicrole_values_array.push(URSRC_basicrole_values)
    var URSRC_basic_menu=URSRC_getmenu_folder(URSRC_basic_role)
    URSRC_basicrole_values_array.push(URSRC_basic_menu)
    URSRC_conn.close();
    return URSRC_basicrole_values_array    
  }  
  //FUNCTION TO LOAD LOGIN ID
  function URSRC_get_loginid(){
    var URSRC_conn = eilib.db_GetConnection();  
    var URSRC_loginid_stmt = URSRC_conn.createStatement();
    var URSRC_loginid_array=[];     
    var URSRC_select_loginid='select * from VW_ACCESS_RIGHTS_TERMINATE_LOGINID ORDER BY ULD_LOGINID'
    var URSRC_loginid_result=URSRC_loginid_stmt.executeQuery(URSRC_select_loginid);
    while(URSRC_loginid_result.next()){
      URSRC_loginid_array.push(URSRC_loginid_result.getString("ULD_LOGINID"));
    }     
    URSRC_loginid_result.close();
    URSRC_loginid_stmt.close();  
    return URSRC_loginid_array  
  }  
  function URSRC_getmenu_folder(basicrole){
    /////////////////////////menu tree-------------------//
    var URSRC_conn = eilib.db_GetConnection();    
    var URSRC_basicrole=basicrole.replace("_"," ")
    var URSRC_mainmenu_stmt = URSRC_conn.createStatement();
    var URSRC_finalmenu=[];
    var URSRC_main_main=[];
    var URSRC_first_submenu=[]
    var URSRC_second_sub_menu=[]
    var URSRC_fp_id_array=[]
    var URSRC_select_mainmenu ="SELECT DISTINCT MP_MNAME FROM MENU_PROFILE MP,BASIC_MENU_PROFILE BMP,USER_RIGHTS_CONFIGURATION URC where BMP.MP_ID=MP.MP_ID and BMP.URC_ID=URC.URC_ID and URC.URC_DATA='"+URSRC_basicrole+"' ORDER BY MP_MNAME ASC"
    var URSRC_mainmenu_rs= URSRC_mainmenu_stmt.executeQuery(URSRC_select_mainmenu);
    while(URSRC_mainmenu_rs.next())//get main menu
    {
      var URSRC_mainmenu=URSRC_mainmenu_rs.getString("MP_MNAME");
      URSRC_main_main.push(URSRC_mainmenu)
      var URSRC_submenu_stmt = URSRC_conn.createStatement();
      var URSRC_submenu_array =[];
      var URSRC_select_submenu = "SELECT DISTINCT MP_MSUB FROM MENU_PROFILE MP,BASIC_MENU_PROFILE BMP,USER_RIGHTS_CONFIGURATION URC where BMP.MP_ID=MP.MP_ID and BMP.URC_ID=URC.URC_ID and URC.URC_DATA='"+URSRC_basicrole+"' and MP.MP_MNAME='"+URSRC_mainmenu+"' AND MP.MP_MSUB IS NOT NULL ORDER BY MP.MP_MSUB ASC"
      var URSRC_submenu_rs= URSRC_submenu_stmt.executeQuery(URSRC_select_submenu);
      while(URSRC_submenu_rs.next())//get sub menu1
      {
        var URSRC_submenu=URSRC_submenu_rs.getString("MP_MSUB");
        if(URSRC_submenu!="")
        {         
          var URSRC_mp_id_stmt = URSRC_conn.createStatement();         
          var URSRC_select_mpid="SELECT MP.MP_ID,MP.FP_ID FROM MENU_PROFILE MP,BASIC_MENU_PROFILE BMP,USER_RIGHTS_CONFIGURATION URC where BMP.MP_ID=MP.MP_ID and BMP.URC_ID=URC.URC_ID and URC.URC_DATA='"+URSRC_basicrole+"' and MP_MNAME='"+URSRC_mainmenu+"'  AND MP_MSUB='"+URSRC_submenu+"'"
          var URSRC_mp_id_rs=URSRC_mp_id_stmt.executeQuery(URSRC_select_mpid)
          if(URSRC_mp_id_rs.next()){
            var mp_id=URSRC_mp_id_rs.getString("MP_ID");
            var fp_id=URSRC_mp_id_rs.getString("FP_ID");
            if(fp_id!=null){
              fp_id=fp_id
              URSRC_fp_id_array.push(fp_id)
            }
            else{
              fp_id=""
            }          
            var final_submenu=URSRC_submenu+"_"+mp_id+"_"+fp_id          
            URSRC_submenu_array.push(final_submenu);
          }
          URSRC_mp_id_rs.close();
          URSRC_mp_id_stmt.close();
          var URSRC_sub_submenu_stmt = URSRC_conn.createStatement();
          var URSRC_sub_submenu_array =[];          
          var URSRC_select_sub_submenu = "SELECT DISTINCT MP_MSUBMENU FROM MENU_PROFILE MP,BASIC_MENU_PROFILE BMP,USER_RIGHTS_CONFIGURATION URC where BMP.MP_ID=MP.MP_ID and BMP.URC_ID=URC.URC_ID and URC.URC_DATA='"+URSRC_basicrole+"' and MP.MP_MNAME='"+URSRC_mainmenu+"' AND  MP.MP_MSUB='"+URSRC_submenu+"' AND MP.MP_MSUBMENU IS NOT NULL ORDER BY MP_MSUBMENU ASC"
          var URSRC_sub_submenu_rs= URSRC_sub_submenu_stmt.executeQuery(URSRC_select_sub_submenu);
          while(URSRC_sub_submenu_rs.next())//get sub menu2
          {
            var URSRC_sub_submenu=URSRC_sub_submenu_rs.getString("MP_MSUBMENU")
            if(URSRC_sub_submenu!="")
            {
              var mp_id_stmt = URSRC_conn.createStatement();
              var separate_fpid;
              var select_mpid=" SELECT MP.MP_ID,MP.FP_ID FROM MENU_PROFILE MP,BASIC_MENU_PROFILE BMP,USER_RIGHTS_CONFIGURATION URC where BMP.MP_ID=MP.MP_ID and BMP.URC_ID=URC.URC_ID and URC.URC_DATA='"+URSRC_basicrole+"' and MP.MP_MNAME='"+URSRC_mainmenu+"' AND  MP.MP_MSUB='"+URSRC_submenu+"' AND MP.MP_MSUBMENU='"+URSRC_sub_submenu+"'"
              var mp_id_rs=mp_id_stmt.executeQuery(select_mpid)
              while(mp_id_rs.next()){
                var mp_id=mp_id_rs.getString("MP_ID");
                var fp_id=mp_id_rs.getString("FP_ID");
                if(fp_id!=null){
                  fp_id=fp_id
                  separate_fpid=fp_id.split(',')
                  for(var i=0;i<separate_fpid.length;i++)
                    URSRC_fp_id_array.push(separate_fpid[i])
                    }else{fp_id=""} 
                
                URSRC_sub_submenu=URSRC_sub_submenu+"_"+mp_id+"_"+fp_id
                URSRC_sub_submenu_array.push(URSRC_sub_submenu);                
              } 
              mp_id_rs.close()
              mp_id_stmt.close()
            }
          }
          URSRC_sub_submenu_rs.close();
          URSRC_sub_submenu_stmt.close();
          URSRC_second_sub_menu.push(URSRC_sub_submenu_array)
        }
      }
      URSRC_submenu_rs.close();
      URSRC_submenu_stmt.close();    
      URSRC_first_submenu.push(URSRC_submenu_array)
    } 
    URSRC_mainmenu_rs.close();
    URSRC_mainmenu_stmt.close();   
    URSRC_fp_id_array=eilib.unique(URSRC_fp_id_array)
    var URSRC_mainfolder=[]
    var URSRC_finalfolder=[]
    var URSRC_file_array=[]
    var URSRC_folder_id_array=[]
    var URSRC_folder_stmt=URSRC_conn.createStatement();
    for(var i=0;i<URSRC_fp_id_array.length;i++){
      var URSRC_select_folder ="SELECT DISTINCT FP_FOLDER_ID FROM FILE_PROFILE WHERE FP_FILE_FLAG IS NULL and FP_ID='"+URSRC_fp_id_array[i]+"' ORDER BY FP_FOLDER_ID ASC"; 
      var URSRC_folder_rs= URSRC_folder_stmt.executeQuery(URSRC_select_folder);
      while(URSRC_folder_rs.next())//get main menu
      {
        var URSRC_folder_id=URSRC_folder_rs.getString("FP_FOLDER_ID");
        URSRC_folder_id_array.push(URSRC_folder_id)       
      }
      URSRC_folder_rs.close() 
    }
    URSRC_folder_stmt.close()
    URSRC_folder_id_array=eilib.unique(URSRC_folder_id_array)   
    for(var j=0;j<URSRC_folder_id_array.length;j++){
      var URSRC_fp_id_stmt = URSRC_conn.createStatement();         
      var URSRC_select_fpid="SELECT FP_ID FROM FILE_PROFILE WHERE FP_FOLDER_ID='"+URSRC_folder_id_array[j]+"' "
      var URSRC_fp_id_rs=URSRC_fp_id_stmt.executeQuery(URSRC_select_fpid)
      if(URSRC_fp_id_rs.next()){
        var fp_id=URSRC_fp_id_rs.getString("FP_ID");       
        var URSRC_folder_name=DocsList.getFolderById(URSRC_folder_id_array[j]).getName()
        URSRC_mainfolder.push(URSRC_folder_name+"_"+fp_id)
      }
      URSRC_fp_id_rs.close()
      URSRC_fp_id_stmt.close()      
    }
    for(var i=0;i<URSRC_folder_id_array.length;i++){
      var URSRC_file_stmt = URSRC_conn.createStatement();
      var URSRC_file=[];
      var URSRC_select_file = "SELECT DISTINCT FP_FILE_ID FROM FILE_PROFILE WHERE FP_FOLDER_ID='"+URSRC_folder_id_array[i]+"' and FP_FILE_ID is not null ORDER BY FP_FILE_ID ASC"; 
      var URSRC_file_rs= URSRC_file_stmt.executeQuery(URSRC_select_file);
      while(URSRC_file_rs.next())//get sub menu1
      {     
        var URSRC_file_id=URSRC_file_rs.getString("FP_FILE_ID");      
        if(URSRC_file_id!=""){       
          var URSRC_file_name=DocsList.getFileById(URSRC_file_id).getName()
          }     
        var URSRC_fp_id_stmt = URSRC_conn.createStatement();
        if(URSRC_file_id!=""){
          var URSRC_select_fpid="SELECT FP_ID FROM FILE_PROFILE WHERE FP_FOLDER_ID='"+URSRC_folder_id_array[i]+"' AND FP_FILE_ID='"+URSRC_file_id+"'"
          var URSRC_fp_id_rs=URSRC_fp_id_stmt.executeQuery(URSRC_select_fpid)
          if(URSRC_fp_id_rs.next()){
            var fp_id=URSRC_fp_id_rs.getString("FP_ID");
            if(URSRC_file_id!=null){
              var final_filename=URSRC_file_name+"&&"+fp_id
            }            
            URSRC_file.push(final_filename);
          }
          URSRC_fp_id_rs.close()
          URSRC_fp_id_stmt.close()
        }        
      }
      URSRC_file_rs.close();
      URSRC_file_stmt.close()
      URSRC_file_array.push(URSRC_file) 
    }   
    URSRC_finalfolder=[URSRC_mainfolder,URSRC_file_array]
    URSRC_finalmenu=[URSRC_main_main,URSRC_first_submenu,URSRC_second_sub_menu]
    var URSRC_basicroleid_stmt=URSRC_conn.createStatement();
    var URSRC_basicroleid_array=[];
    var select_basicrole_id="select * from USER_RIGHTS_CONFIGURATION URC,BASIC_ROLE_PROFILE BRP where URC.URC_DATA='"+basicrole+"' and URC.URC_ID=BRP.URC_ID"
    var URSRC_basicroleid_rs=URSRC_basicroleid_stmt.executeQuery(select_basicrole_id)
    while(URSRC_basicroleid_rs.next()){     
      URSRC_basicroleid_array.push(URSRC_basicroleid_rs.getString("BRP_BR_ID"))     
    }
    URSRC_basicroleid_rs.close()
    URSRC_basicroleid_stmt.close()
    var URSRC_basicrole_profile_array=[];
    var URSRC_basicrole_stmt=URSRC_conn.createStatement();
    for(var i=0;i<URSRC_basicroleid_array.length;i++){      
      var select_basicrole="select * from USER_RIGHTS_CONFIGURATION URC,BASIC_ROLE_PROFILE BRP where  BRP.BRP_BR_ID=URC.URC_ID and BRP.BRP_BR_ID='"+URSRC_basicroleid_array[i]+"' order by URC_DATA asc "
      var URSRC_basicrole_rs=URSRC_basicrole_stmt.executeQuery(select_basicrole)
      while(URSRC_basicrole_rs.next()){     
        URSRC_basicrole_profile_array.push(URSRC_basicrole_rs.getString("URC_DATA"))        
      }
      URSRC_basicrole_rs.close()
    }
    URSRC_basicrole_profile_array=eilib.unique(URSRC_basicrole_profile_array)
    URSRC_basicrole_profile_array.sort()
    URSRC_basicrole_stmt.close()       
    var URSRC_values_array=[];
    var URSRC_values={'URSRC_multi_array':URSRC_finalmenu,'URSRC_folder_array':URSRC_finalfolder,'URSRC_basicrole_profile_array':URSRC_basicrole_profile_array}
    URSRC_values_array.push(URSRC_values)
    URSRC_conn.close();
    return URSRC_values_array   
  }  
  //FUNCTION TO LOAD CUSTOM ROLE
  function URSRC_get_customrole(){  
    var URSRC_conn = eilib.db_GetConnection();    
    var URSRC_customerole_stmt = URSRC_conn.createStatement();
    var URSRC_customrole_array=[];
    var URSRC_select_customerole="SELECT * FROM ROLE_CREATION ORDER BY RC_NAME"
    var URSRC_customrole_result=URSRC_customerole_stmt.executeQuery(URSRC_select_customerole);
    while(URSRC_customrole_result.next()){
      URSRC_customrole_array.push(URSRC_customrole_result.getString("RC_NAME"));
    }     
    URSRC_customrole_result.close();
    URSRC_customerole_stmt.close();
    URSRC_conn.close()
    return URSRC_customrole_array;    
  }  
  //Function to get custom role details
  function URSRC_get_roledetails(custome_role){    
    var URSRC_conn = eilib.db_GetConnection();  
    var URSRC_roledetails_stmt = URSRC_conn.createStatement();
    var URSRC_roledetails_array=[];
    var URSRC_select_roledetails='SELECT * FROM ROLE_CREATION RC,USER_RIGHTS_CONFIGURATION URC where URC.URC_ID=RC.URC_ID and RC_NAME="'+custome_role+'" ORDER BY URC_DATA'
    var URSRC_roledetails_result=URSRC_roledetails_stmt.executeQuery(URSRC_select_roledetails);
    if(URSRC_roledetails_result.next()){
      URSRC_roledetails_array=(URSRC_roledetails_result.getString("URC_DATA"));      
    }
    URSRC_roledetails_result.close();
    URSRC_roledetails_stmt.close();
    var URSRC_menu_folder=URSRC_getmenu_folder(URSRC_roledetails_array)
    var URSRC_usermenudetails_stmt = URSRC_conn.createStatement();
    var URSRC_usermenudetails_array=[];
    var URSRC_main_menu=[]
    var URSRC_sub_menu=[]
    var URSRC_select_usermenudetails='SELECT * FROM ROLE_CREATION RC,USER_MENU_DETAILS  UMD,MENU_PROFILE MP where MP.MP_ID=UMD.MP_ID and UMD.RC_ID=RC.RC_ID and RC_NAME="'+custome_role+'"'
    var URSRC_usermenudetails_result=URSRC_usermenudetails_stmt.executeQuery(URSRC_select_usermenudetails);
    while(URSRC_usermenudetails_result.next()){        
      var MP_ID=URSRC_usermenudetails_result.getString("MP_ID");
      URSRC_usermenudetails_array.push(MP_ID)    
    }  
    URSRC_usermenudetails_result.close();
    URSRC_usermenudetails_stmt.close();  
    var URSRC_fileid_stmt = URSRC_conn.createStatement();
    var URSRC_fileid_array=[];
    var URSRC_select_fileid='SELECT * FROM ROLE_CREATION RC,USER_FILE_DETAILS UFD where UFD.RC_ID=RC.RC_ID and RC_NAME="'+custome_role+'"'
    var URSRC_filedid_result=URSRC_fileid_stmt.executeQuery(URSRC_select_fileid);
    while(URSRC_filedid_result.next()){
      URSRC_fileid_array.push(URSRC_filedid_result.getString("FP_ID"));      
    }    
    URSRC_filedid_result.close();
    URSRC_fileid_stmt.close(); 
    var final_value=[URSRC_roledetails_array,URSRC_usermenudetails_array,URSRC_fileid_array,URSRC_menu_folder]      
    URSRC_conn.close()
    return final_value 
  }
  //Function to get custom roles
  function URSRC_get_roles(){
    var URSRC_conn = eilib.db_GetConnection();  
    var URSRC_role_stmt = URSRC_conn.createStatement();
    var URSRC_role_array=[];
    var URSRC_select_role_menu="SELECT * FROM ROLE_CREATION ORDER BY RC_NAME "
    var URSRC_role_result=URSRC_role_stmt.executeQuery(URSRC_select_role_menu);
    while(URSRC_role_result.next()){
      URSRC_role_array.push(URSRC_role_result.getString("RC_NAME"));    
    }   
    URSRC_role_result.close()
    URSRC_role_stmt.close()
    URSRC_conn.close()
    return URSRC_role_array
  }
  //Function to check login id
  function URSRC_check_loginid(login_id){
    var URSRC_conn = eilib.db_GetConnection();    
    var URSRC_already_exist_flag;
    var URSRC_check_loginid_stmt=URSRC_conn.createStatement();
    var URSRC_select_login_id='select * from USER_LOGIN_DETAILS where ULD_LOGINID="'+login_id+'"'
    var URSRC_login_id_result=URSRC_check_loginid_stmt.executeQuery(URSRC_select_login_id);
    if(URSRC_login_id_result.next()){
      URSRC_already_exist_flag=1;     
    }
    else{      
      URSRC_already_exist_flag=0;
    }   
    URSRC_login_id_result.close()
    URSRC_check_loginid_stmt.close()
    var URSRC_role_array=[];
    URSRC_role_array=URSRC_get_roles()
    var URSRC_final_array=[URSRC_already_exist_flag,URSRC_role_array]
    URSRC_conn.close()
    return URSRC_final_array    
  }
  //Function to check custom role
  function URSRC_checkcustome_role(role){
    var URSRC_conn = eilib.db_GetConnection();
    var URSRC_check_customrole_stmt=URSRC_conn.createStatement();
    var URSRC_check_customerole;
    var URSRC_select_custome_role='SELECT * FROM ROLE_CREATION where RC_NAME="'+role+'"'
    var URSRC_custome_role_rs=URSRC_check_customrole_stmt.executeQuery(URSRC_select_custome_role)
    if(!URSRC_custome_role_rs.next()){
      URSRC_check_customerole='true';    
    }
    else
    {
      URSRC_check_customerole='false' 
    }
    URSRC_custome_role_rs.close();
    URSRC_check_customrole_stmt.close()
    URSRC_conn.close()
    return URSRC_check_customerole
  }
  //function to get login id details
  function URSRC_get_logindetails(loginid){
    var URSRC_conn = eilib.db_GetConnection();  
    var URSRC_details_stmt = URSRC_conn.createStatement();
    var URSRC_details_array=[];
    var URSRC_select_details="select * from USER_LOGIN_DETAILS ULD,USER_ACCESS UA ,USER_RIGHTS_CONFIGURATION URC,ROLE_CREATION RC where ULD.ULD_ID=UA.ULD_ID and URC.URC_ID=RC.URC_ID and RC.RC_ID=UA.RC_ID and ULD_LOGINID='"+loginid+"' and UA.UA_REC_VER=(select max(UA_REC_VER) from USER_ACCESS UA,USER_LOGIN_DETAILS ULD where ULD.ULD_ID=UA.ULD_ID and ULD_LOGINID='"+loginid+"' and UA_JOIN is not null) ORDER BY RC_NAME"
    var URSRC_details_result=URSRC_details_stmt.executeQuery(URSRC_select_details);
    while(URSRC_details_result.next()){
      URSRC_details_array.push(eilib.SqlDateFormat(URSRC_details_result.getString("UA_JOIN_DATE")));
      URSRC_details_array.push(URSRC_details_result.getString("RC_NAME"));
      var URSRC_role_name=URSRC_details_result.getString("RC_NAME");
    } 
    PropertiesService.getUserProperties().setProperty('URSRC_role_name',URSRC_role_name )    
    URSRC_details_result.close();
    URSRC_details_stmt.close(); 
    var URSRC_role_array=URSRC_get_roles()
    var URSRC_loginid_details_array=[URSRC_details_array,URSRC_role_array];
    URSRC_conn.close();
    return URSRC_loginid_details_array
  }
  //Role creation save and update & Basic role menu creation save and update 
  function URSRC_role_creation_save(user_rigths_form){
    URSRC_sharedocflag=0;
    try{
      var URSRC_mainradiobutton=user_rigths_form.URSRC_mainradiobutton  
      var URSRC_menu=user_rigths_form.menu;
      var URSRC_menuid;
      var URSRC_sub_submenu=user_rigths_form.Sub_menu1;
      var URSRC_submenu=user_rigths_form.Sub_menu;   
      var URSRC_userstamp=UserStamp;
      var URSRC_conn = eilib.db_GetConnection();
      URSRC_conn.setAutoCommit(false);
      var URSRC_sub_submenu_array=[]
      var submenu_array=[]
      var menu_array=[]
      if((Array.isArray(user_rigths_form.Sub_menu1))==true){
        URSRC_sub_submenu_array=user_rigths_form.Sub_menu1;
      }    
      else{
        URSRC_sub_submenu_array.push(user_rigths_form.Sub_menu1);    
      }
      if((Array.isArray(user_rigths_form.Sub_menu))==true){
        submenu_array=user_rigths_form.Sub_menu;
      }    
      else{
        submenu_array.push(user_rigths_form.Sub_menu);    
      }
      if((Array.isArray(user_rigths_form.menu))==true){
        menu_array=user_rigths_form.menu;
      }    
      else{
        menu_array.push(user_rigths_form.menu);    
      }   
      var menu_files=[]
      for(var j=0;j<menu_array.length;j++){
        if(menu_array[j].match("%%")){
          var sub=menu_array[j].split("%%")
          menu_files.push(sub[0])
        }
      }
      var sub_menu_files=[]
      var sub_menu_menus=[]
      for(var j=0;j<submenu_array.length;j++){    
        if( !((submenu_array[j]).toString().match("&&")))
          if(submenu_array[j].match("%%")){
            var sub=submenu_array[j].split("%%")        
            menu_files.push(sub[0])        
          }
        else{      
          sub_menu_menus.push(submenu_array[j])
        }    
      }
      if(URSRC_sub_submenu_array!=''){
        for(var i=0;i<URSRC_sub_submenu_array.length;i++){
          
          sub_menu_menus.push(URSRC_sub_submenu_array[i])
        }
      }    
      var sub_menuid;
      for(var i=0;i<sub_menu_menus.length;i++){
        if(i==0){
          URSRC_menuid=sub_menu_menus[i]
        }
        else{
          URSRC_menuid+=','+sub_menu_menus[i]
        }    
      }  
      var fileid;
      menu_files=eilib.unique(menu_files)
      for(var i=0;i<menu_files.length;i++){
        if(i==0){
          fileid=menu_files[i]
        }
        else{
          fileid+=','+menu_files[i]
        }     
      } 
      if(menu_files.length==0){
        fileid=null     
      }
      else{
        fileid="'"+fileid+"'"      
      } 
      var URSRC_rolecreation_stmt = URSRC_conn.createStatement();
      if(URSRC_mainradiobutton=="ROLE CREATION"){
        var URSRC_basicrole=user_rigths_form.basicroles;
        URSRC_basicrole=URSRC_basicrole.replace("_"," ")
        var URSRC_customrolename=user_rigths_form.URSRC_tb_customrole;
        URSRC_rolecreation_stmt.execute("CALL SP_ROLE_CREATION_INSERT('"+URSRC_customrolename+"','"+URSRC_basicrole+"','"+URSRC_menuid+"',"+fileid+",'"+UserStamp+"','"+schema_name+"',@ROLE_CRTNINSRTFLAG)");
        var URSRC_stmt_rolecrinsrtflag=URSRC_conn.createStatement();
        var URSRC_flag_rolecrinsrtselect="SELECT @ROLE_CRTNINSRTFLAG";
        var URSRC_flag_rolecrinsrtrs=URSRC_stmt_rolecrinsrtflag.executeQuery(URSRC_flag_rolecrinsrtselect);
        while(URSRC_flag_rolecrinsrtrs.next())
          var URSRC_flag_rolecrinsrtinsert=URSRC_flag_rolecrinsrtrs.getString("@ROLE_CRTNINSRTFLAG");
        URSRC_flag_rolecrinsrtrs.close();
        URSRC_stmt_rolecrinsrtflag.close();
        return URSRC_flag_rolecrinsrtinsert;
      }
      else if(URSRC_mainradiobutton=="BASIC ROLE MENU CREATION"||URSRC_mainradiobutton=="BASIC ROLE MENU SEARCH UPDATE"){
        var URSRC_basicrole_menu_creation_stmt=URSRC_conn.createStatement();
        var URSRC_checkbox_basicrole=[]
        var URSRC_radio_basicrole=user_rigths_form.URSRC_radio_basicroles1
        URSRC_radio_basicrole=URSRC_radio_basicrole.replace("_"," ")
        if((Array.isArray(user_rigths_form.URSRC_cb_basicroles1))==true){
          URSRC_checkbox_basicrole=user_rigths_form.URSRC_cb_basicroles1;
        } 
        else{        
          URSRC_checkbox_basicrole.push(user_rigths_form.URSRC_cb_basicroles1)
        }
        var URSRC_checkbox_basicrole_array=[]
        for(var i=0;i<URSRC_checkbox_basicrole.length;i++){
          URSRC_checkbox_basicrole_array.push(URSRC_checkbox_basicrole[i].replace("_"," "))        
        }
        if(URSRC_mainradiobutton=="BASIC ROLE MENU CREATION"){
          URSRC_basicrole_menu_creation_stmt.execute("CALL SP_USER_RIGHTS_BASIC_PROFILE_SAVE ('"+UserStamp+"','"+URSRC_radio_basicrole+"','"+URSRC_checkbox_basicrole_array+"', '"+URSRC_menuid+"',@BASIC_PROFILESAVEFLAG)");
          URSRC_basicrole_menu_creation_stmt.close()
          var URSRC_stmt_bscprfsveflag=URSRC_conn.createStatement();
          var URSRC_flag_bscprfsveselect="SELECT @BASIC_PROFILESAVEFLAG";
          var URSRC_flag_bscprfsvers=URSRC_stmt_bscprfsveflag.executeQuery(URSRC_flag_bscprfsveselect);
          while(URSRC_flag_bscprfsvers.next())
            var URSRC_flag_bscprfsveinsert=URSRC_flag_bscprfsvers.getString("@BASIC_PROFILESAVEFLAG");
          URSRC_flag_bscprfsvers.close();
          URSRC_stmt_bscprfsveflag.close();
          return URSRC_flag_bscprfsveinsert;
        }      
        else if(URSRC_mainradiobutton=="BASIC ROLE MENU SEARCH UPDATE"){
          URSRC_basicrole_menu_creation_stmt.execute("CALL SP_USER_RIGHTS_BASIC_PROFILE_UPDATE ('"+UserStamp+"','"+URSRC_radio_basicrole+"','"+URSRC_checkbox_basicrole_array+"', '"+URSRC_menuid+"',@BASIC_PRFUPDATE)");
          URSRC_basicrole_menu_creation_stmt.close();
          var URSRC_stmt_bscprfupdflag=URSRC_conn.createStatement();
          var URSRC_flag_bscprfupdselect="SELECT @BASIC_PRFUPDATE";
          var URSRC_flag_bscprfupdrs=URSRC_stmt_bscprfupdflag.executeQuery(URSRC_flag_bscprfupdselect);
          while(URSRC_flag_bscprfupdrs.next())
            var URSRC_flag_bscprfupdinsert=URSRC_flag_bscprfupdrs.getString("@BASIC_PRFUPDATE");
          URSRC_flag_bscprfupdrs.close();
          URSRC_stmt_bscprfupdflag.close();
          return URSRC_flag_bscprfupdinsert;
        }
      }    
      else{
        var URSRC_customrolename=user_rigths_form.URSRC_lb_rolename;
        var URSRC_basicrole=user_rigths_form.basicroles;
        URSRC_basicrole=URSRC_basicrole.replace("_"," ") 
        URSRC_rolecreation_stmt.execute("CALL SP_ROLE_CREATION_UPDATE('"+URSRC_customrolename+"','"+URSRC_basicrole+"','"+URSRC_menuid+"',"+fileid+",'"+UserStamp+"','"+schema_name+"',@ROLE_CREATIONUPDATE,@TEMP_OUT_INSERT_MENU,@TEMP_OUT_REMOVE_MENU,@TEMP_OUT_INSERT_FILE,@TEMP_OUT_REMOVE_FILE)");
        URSRC_rolecreation_stmt.close();  
        var URSRC_stmt_rolecreflag=URSRC_conn.createStatement();
        var URSRC_flag_rolecreselect="SELECT @ROLE_CREATIONUPDATE,@TEMP_OUT_INSERT_MENU,@TEMP_OUT_REMOVE_MENU,@TEMP_OUT_INSERT_FILE,@TEMP_OUT_REMOVE_FILE";
        var URSRC_flag_rolecrers=URSRC_stmt_rolecreflag.executeQuery(URSRC_flag_rolecreselect);
        if(URSRC_flag_rolecrers.next())
        {
          var URSRC_flag_rolecreinsert=URSRC_flag_rolecrers.getString("@ROLE_CREATIONUPDATE");
          var URSRC_roleupd_insertmenutemptable=URSRC_flag_rolecrers.getString("@TEMP_OUT_INSERT_MENU");
          var URSRC_roleupd_removemenutemptable=URSRC_flag_rolecrers.getString("@TEMP_OUT_REMOVE_MENU");
          var URSRC_roleupd_insertfiletemptable=URSRC_flag_rolecrers.getString("@TEMP_OUT_INSERT_FILE");
          var URSRC_roleupd_removefiletemptable=URSRC_flag_rolecrers.getString("@TEMP_OUT_REMOVE_FILE");
        }
        URSRC_flag_rolecrers.close();
        URSRC_stmt_rolecreflag.close();
        if(URSRC_flag_rolecreinsert==1){ URSRC_sharedocflag=URSRC_updateSharedDocuments(URSRC_conn,URSRC_customrolename,'');}
        URSRC_conn.commit();
        if(URSRC_roleupd_insertmenutemptable!=null&&URSRC_roleupd_insertmenutemptable!=undefined)
          eilib.DropTempTable(URSRC_conn,URSRC_roleupd_insertmenutemptable);
        if(URSRC_roleupd_removemenutemptable!=null&&URSRC_roleupd_removemenutemptable!=undefined)
          eilib.DropTempTable(URSRC_conn,URSRC_roleupd_removemenutemptable);
        if(URSRC_roleupd_insertfiletemptable!=null&&URSRC_roleupd_insertfiletemptable!=undefined)
          eilib.DropTempTable(URSRC_conn,URSRC_roleupd_insertfiletemptable);
        if(URSRC_roleupd_removefiletemptable!=null&&URSRC_roleupd_removefiletemptable!=undefined)
          eilib.DropTempTable(URSRC_conn,URSRC_roleupd_removefiletemptable);
        URSRC_conn.close();
        return URSRC_flag_rolecreinsert;
      }
    }catch(err)
    {
      Logger.log("SCRIPT EXCEPTION:"+err)
      URSRC_conn.rollback();
      if(URSRC_roleupd_insertmenutemptable!=null&&URSRC_roleupd_insertmenutemptable!=undefined)
        eilib.DropTempTable(URSRC_conn,URSRC_roleupd_insertmenutemptable);
      if(URSRC_roleupd_removemenutemptable!=null&&URSRC_roleupd_removemenutemptable!=undefined)
        eilib.DropTempTable(URSRC_conn,URSRC_roleupd_removemenutemptable);
      if(URSRC_roleupd_insertfiletemptable!=null&&URSRC_roleupd_insertfiletemptable!=undefined)
        eilib.DropTempTable(URSRC_conn,URSRC_roleupd_insertfiletemptable);
      if(URSRC_roleupd_removefiletemptable!=null&&URSRC_roleupd_removefiletemptable!=undefined)
        eilib.DropTempTable(URSRC_conn,URSRC_roleupd_removefiletemptable);
      if(URSRC_sharedocflag==1)
      {
        URSRC_updateSharedDocuments(URSRC_conn,URSRC_customrolename,'');
      }
      URSRC_conn.commit();
      URSRC_conn.close();
      return (Logger.getLog())
    }
  }
  var sitelink
  var URSRC_sharedocflag=0,URSRC_sharecalflag=0,URSRC_sharesiteflag=0;
  //Login Creation save
  var radiobutton;
  function URSRC_login_creation_save(user_rigths_form){
    URSRC_sharedocflag=0,URSRC_sharecalflag=0,URSRC_sharesiteflag=0;
    try{
      
      var URSRC_temptable;
      var URSRC_temptable1;
      var URSRC_temptable2;
      var loginid;
      var custom_role;
      var URSRC_mainradiobutton=user_rigths_form.URSRC_mainradiobutton 
      radiobutton=URSRC_mainradiobutton;
      var URSRC_joindate=user_rigths_form.URSRC_tb_joindate;
      URSRC_joindate=eilib.SqlDateFormat(URSRC_joindate)
      var URSRC_custom_role=user_rigths_form.roles1
      custom_role=URSRC_custom_role;
      URSRC_custom_role=URSRC_custom_role.replace("_"," ")
      var URSRC_conn = eilib.db_GetConnection();  
      URSRC_conn.setAutoCommit(false);
      var URSRC_logincreation_stmt = URSRC_conn.createStatement();
      if(URSRC_mainradiobutton=="LOGIN CREATION"){
        var URSRC_loginid=user_rigths_form.URSRC_tb_loginid;
        loginid=URSRC_loginid;
        URSRC_logincreation_stmt.execute("CALL SP_LOGIN_CREATION_INSERT('"+URSRC_loginid+"','"+URSRC_custom_role+"','"+URSRC_joindate+"','"+UserStamp+"',@TEMPTABLE,@LOGIN_CREATIONFLAG)");
        var URSRC_stmt_lgncreflag=URSRC_conn.createStatement();
        var URSRC_flag_lgncreselect="SELECT @TEMPTABLE,@LOGIN_CREATIONFLAG";
        var URSRC_flag_lgncrers=URSRC_stmt_lgncreflag.executeQuery(URSRC_flag_lgncreselect);
        while(URSRC_flag_lgncrers.next())
        {
          URSRC_temptable=URSRC_flag_lgncrers.getString("@TEMPTABLE");
          var URSRC_flag_lgncreinsert=URSRC_flag_lgncrers.getString("@LOGIN_CREATIONFLAG");
        }
        URSRC_flag_lgncrers.close();
        URSRC_stmt_lgncreflag.close();
        if(URSRC_flag_lgncreinsert==1){
          URSRC_shareDocuments(URSRC_conn,URSRC_custom_role,URSRC_loginid)
          URSRC_sharesiteflag=URSRC_addViewer(URSRC_conn,URSRC_loginid) 
          URSRC_sharecalflag=USRC_shareUnSharecalender(URSRC_conn,URSRC_loginid,'writer');
        }
        if(URSRC_temptable!='null'){
          eilib.DropTempTable(URSRC_conn,URSRC_temptable)
        }
        URSRC_conn.commit();
        URSRC_conn.close();
        return URSRC_flag_lgncreinsert;
      }
      else{
        var URSRC_loginid=user_rigths_form.URSRC_lb_loginid
        loginid=URSRC_loginid;
        var URSRC_role_name=PropertiesService.getUserProperties().getProperty('URSRC_role_name')  //old role
        URSRC_logincreation_stmt.execute("CALL SP_LOGIN_UPDATE('"+URSRC_loginid+"','"+URSRC_custom_role+"','"+URSRC_joindate+"','"+UserStamp+"',@TEMPTABLE1,@TEMPTABLE2,@LOGIN_UPDATEFLAG)")
        var URSRC_stmt_lgnupdflag=URSRC_conn.createStatement();
        var URSRC_flag_lgnupdselect="SELECT @TEMPTABLE1,@TEMPTABLE2,@LOGIN_UPDATEFLAG";
        var URSRC_flag_lgnupdrs=URSRC_stmt_lgnupdflag.executeQuery(URSRC_flag_lgnupdselect);
        while(URSRC_flag_lgnupdrs.next()){
          var URSRC_flag_lgnupdinsert=URSRC_flag_lgnupdrs.getString("@LOGIN_UPDATEFLAG");
          URSRC_temptable1=URSRC_flag_lgnupdrs.getString("@TEMPTABLE1");
          URSRC_temptable2=URSRC_flag_lgnupdrs.getString("@TEMPTABLE2");
        }
        if(URSRC_flag_lgnupdinsert==1){
          if(URSRC_role_name!==URSRC_custom_role){
            URSRC_updateSharedDocuments(URSRC_conn,URSRC_custom_role,URSRC_loginid) 
          }
        }
        URSRC_flag_lgnupdrs.close();
        URSRC_stmt_lgnupdflag.close();
        URSRC_logincreation_stmt.close()
        if(URSRC_temptable1!=null&&URSRC_temptable1!=undefined){
          eilib.DropTempTable(URSRC_conn,URSRC_temptable1);}
        if(URSRC_temptable2!=null&&URSRC_temptable2!=undefined){
          eilib.DropTempTable(URSRC_conn,URSRC_temptable2) ;}
        URSRC_conn.commit();
        URSRC_conn.close() 
        return URSRC_flag_lgnupdinsert;
      }  
    }
    catch(err){
      Logger.log("SCRIPT EXCEPTION:"+err)
      URSRC_conn.rollback();
      if(radiobutton=="LOGIN CREATION"){
        if(URSRC_temptable!='null'){
          eilib.DropTempTable(URSRC_conn,URSRC_temptable)
        }
        if(URSRC_sharedocflag==1)
        {
          URSRC_unshareDocuments(URSRC_conn,custom_role,loginid);
        }
        if(URSRC_sharesiteflag==1)
        {
          URSRC_removeViewer(URSRC_conn,loginid)
        }
        if(URSRC_sharecalflag==1)
        {
          USRC_shareUnSharecalender(URSRC_conn,loginid,'none');
        }
      }
      else{
        if(URSRC_temptable1!=null&&URSRC_temptable1!=undefined){
          eilib.DropTempTable(URSRC_conn,URSRC_temptable1);}
        if(URSRC_temptable2!=null&&URSRC_temptable2!=undefined){
          eilib.DropTempTable(URSRC_conn,URSRC_temptable2) ;}
        if(URSRC_sharedocflag==1)
        {
          URSRC_updateSharedDocuments(URSRC_conn,URSRC_custom_role,URSRC_loginid) 
        }       
      }
      return (Logger.getLog());    
    }
  }
  //FUNCTION TO GET CALENDAR ID
  function GetEICalendarId(conn)
  {
    var URSRC_calenderid_stmt = conn.createStatement();
    var URSRC_select_calenderid='SELECT CCN_DATA from CUSTOMER_CONFIGURATION where CGN_ID=75'
    var URSRC_select_calenderid_rs=URSRC_calenderid_stmt.executeQuery(URSRC_select_calenderid);
    while(URSRC_select_calenderid_rs.next()){    
      var calendarId=URSRC_select_calenderid_rs.getString("CCN_DATA")
      }
    URSRC_select_calenderid_rs.close();
    URSRC_calenderid_stmt.close();
    return calendarId;
  }
  //FUNCTION TO GET SITE LINK
  function UR_getSite(URSRC_conn){  
    var sitelink
    var URSRC_getsitee_stmt=URSRC_conn.createStatement();
    var URSRC_select_site="SELECT * FROM USER_RIGHTS_CONFIGURATION WHERE CGN_ID =68"
    var URSRC_getsite_rs=URSRC_getsitee_stmt.executeQuery(URSRC_select_site)
    while(URSRC_getsite_rs.next()){
      sitelink=SitesApp.getSiteByUrl(URSRC_getsite_rs.getString("URC_DATA"))
    }
    URSRC_getsite_rs.close();
    URSRC_getsitee_stmt.close();
    return sitelink;
  } 
  //FUNCTION TO REMOVE SITE ACCESS
  function URSRC_removeViewer(URSRC_conn,URT_SRC_emailid){ 
    var site=UR_getSite(URSRC_conn);
    site.removeViewer(URT_SRC_emailid); 
    return 1;
  }
  //FUNCTION TO ADD SITE ACCESS
  function URSRC_addViewer(URSRC_conn,URT_SRC_emailid){
    var site=UR_getSite(URSRC_conn);
    site.addViewer(URT_SRC_emailid);  
    return 1;
  }
  //FUNCTION TO SHARE/UNSHARE CALENDAR
  function USRC_shareUnSharecalender(URSRC_conn,URSRC_loginid,role){
    var calendarId=GetEICalendarId(URSRC_conn);
    var acl = {
      scope: {
        type: 'user',
        value:URSRC_loginid
      },
      role: role
    };
    Calendar.Acl.insert(acl, calendarId);  
    return 1;
  }
  //FUNCTION TO SHARE DOCS FOR THE LOGIN ID
  function URSRC_shareDocuments(URSRC_conn,URSRC_custom_role,URSRC_loginid){
    var URSRC_usermenu_array=[];
    var URSRC_fileid_array=[]
    var URSRC_folderid_array=[]
    var URSRC_new_folder_array=[];
    var URSRC_fileid=[]
    var URSRC_select_files_stmt=URSRC_conn.createStatement();
    if(URSRC_custom_role==""){
      var URSRC_select_files='SELECT * from USER_FILE_DETAILS UFD,FILE_PROFILE  FP where UFD.RC_ID=(select RC_ID from ROLE_CREATION where RC_NAME=(SELECT RC.RC_NAME FROM USER_ACCESS UA,USER_LOGIN_DETAILS ULD,ROLE_CREATION RC WHERE RC.RC_ID=UA.RC_ID AND ULD.ULD_ID=UA.ULD_ID AND ULD_LOGINID="'+URSRC_loginid+'" AND UA.UA_REC_VER=(SELECT MAX(UA.UA_REC_VER) FROM USER_ACCESS UA,USER_LOGIN_DETAILS ULD,ROLE_CREATION RC WHERE RC.RC_ID=UA.RC_ID AND ULD.ULD_ID=UA.ULD_ID AND ULD_LOGINID="'+URSRC_loginid+'"))) and UFD.FP_ID=FP.FP_ID'
    }else{
      var URSRC_select_files='SELECT * from USER_FILE_DETAILS UFD,FILE_PROFILE  FP where UFD.RC_ID=(select RC_ID from ROLE_CREATION where RC_NAME="'+URSRC_custom_role+'") and UFD.FP_ID=FP.FP_ID'
    }
    var URSRC_select_files_rs=URSRC_select_files_stmt.executeQuery(URSRC_select_files);
    while(URSRC_select_files_rs.next()){
      var fileid=URSRC_select_files_rs.getString("FP_FILE_ID"); 
      var folderid=URSRC_select_files_rs.getString("FP_FOLDER_ID");
      if(fileid!=null){
        URSRC_fileid_array.push(fileid)
        URSRC_folderid_array.push(folderid)
        URSRC_fileid.push(fileid)
      }
      if(fileid==null ||fileid!=null){
        URSRC_fileid_array.push(URSRC_select_files_rs.getString("FP_FOLDER_ID"))      
      }
      if(fileid==null){        
        URSRC_new_folder_array.push(URSRC_select_files_rs.getString("FP_FOLDER_ID"))  
      }
    }  
    URSRC_select_files_rs.close()
    URSRC_select_files_stmt.close()
    URSRC_fileid_array=eilib.unique(URSRC_fileid_array)
    URSRC_folderid_array=eilib.unique(URSRC_folderid_array)
    var URSRC_all_fileid_array=[]  
    var URSRC_select_allfiles_stmt=URSRC_conn.createStatement();
    var URSRC_select_allfiles='SELECT * from FILE_PROFILE where FP_FILE_FLAG is null'
    var URSRC_select_allfiles_rs=URSRC_select_allfiles_stmt.executeQuery(URSRC_select_allfiles);
    while(URSRC_select_allfiles_rs.next()){
      var fileid=URSRC_select_allfiles_rs.getString("FP_FILE_ID")
      if(fileid!=null){
        URSRC_all_fileid_array.push(fileid)
      }
      if(fileid==null || fileid!=null){
        URSRC_all_fileid_array.push(URSRC_select_allfiles_rs.getString("FP_FOLDER_ID"))      
      }      
    }
    URSRC_select_allfiles_rs.close();
    URSRC_select_allfiles_stmt.close()
    URSRC_all_fileid_array=eilib.unique(URSRC_all_fileid_array)
    for(var i=0;i<URSRC_all_fileid_array.length;i++){
      var file_type=DriveApp.getFileById(URSRC_all_fileid_array[i]).getMimeType();
      var Folder_editor1=URSRC_GetAllEditors(file_type,URSRC_all_fileid_array[i])
      for(var j=0;j<Folder_editor1.length;j++){
        if(URSRC_loginid==Folder_editor1[j].getEmail().toLowerCase())
        {
          URSRC_RemoveEditor(file_type,URSRC_all_fileid_array[i],URSRC_loginid) 
          URSRC_sharedocflag=1;
        }        
      }    
    }
    for(var i=0;i<URSRC_fileid_array.length;i++)
    {       
      var shar_Folder=DriveApp.getFolderById(URSRC_fileid_array[i]).addEditor(URSRC_loginid);
    }
    var get_files_array=[];
    for(var a=0;a<URSRC_new_folder_array.length;a++){
      var get_files=DriveApp.getFolderById(URSRC_new_folder_array[a]).getFiles();
      while(get_files.hasNext()){
        var get_files_id=get_files.next().getId();
        get_files_array.push(get_files_id);
      }      
    }    
    for(var h=0;h<get_files_array.length;h++){
      var file_type=DriveApp.getFileById(get_files_array[h]).getMimeType();
      var new_fileeditors=URSRC_GetAllEditors(file_type,get_files_array[h]);
      for(var j=0;j<new_fileeditors.length;j++){
        if(URSRC_loginid==new_fileeditors[j].getEmail().toLowerCase()){
          URSRC_RemoveEditor(file_type,get_files_array[h],URSRC_loginid)        
        }
      }     
    }    
    var allid_array=[]
    if(URSRC_folderid_array.length!=0){
      var folder=URSRC_folderid_array[0];
      allid_array= URSRC_getAllFiles(folder);//TO GET FOLDER FILES
    }
    var URSRC_new_diff_array=[]
    if(URSRC_fileid.length!=0){
      URSRC_new_diff_array=getDifferenceArray(URSRC_fileid,allid_array);
      for(var k=0;k< URSRC_new_diff_array.length;k++){
        var mimetype=DriveApp.getFileById(URSRC_new_diff_array[k]).getMimeType();
        var foldereditors=URSRC_GetAllEditors(mimetype,URSRC_new_diff_array[k]);        
        for(var l=0;l<foldereditors.length;l++){ 
          if(foldereditors[l].getEmail()=='')continue;              
          if(URSRC_loginid==foldereditors[l].getEmail().toLowerCase())
          {
            URSRC_RemoveEditor(mimetype,URSRC_new_diff_array[k],URSRC_loginid);        
          }
        }
      }      
    } 
    return URSRC_sharedocflag;
  }
  //FUNCTION TO UNSHARE DOCS
  function URSRC_unshareDocuments(URSRC_conn,URSRC_custom_role,URSRC_loginid){
    var URSRC_fileid_array=[]
    var URSRC_old_fileid_array=[];
    var URSRC_select_files_stmt=URSRC_conn.createStatement();
    if(URSRC_custom_role==""){
      var URSRC_select_files='SELECT * from USER_FILE_DETAILS UFD,FILE_PROFILE  FP where UFD.RC_ID=(select RC_ID from ROLE_CREATION where RC_NAME=(SELECT RC.RC_NAME FROM USER_ACCESS UA,USER_LOGIN_DETAILS ULD,ROLE_CREATION RC WHERE RC.RC_ID=UA.RC_ID AND ULD.ULD_ID=UA.ULD_ID AND ULD_LOGINID="'+URSRC_loginid+'" AND UA.UA_REC_VER=(SELECT MAX(UA.UA_REC_VER) FROM USER_ACCESS UA,USER_LOGIN_DETAILS ULD,ROLE_CREATION RC WHERE RC.RC_ID=UA.RC_ID AND ULD.ULD_ID=UA.ULD_ID AND ULD_LOGINID="'+URSRC_loginid+'"))) and UFD.FP_ID=FP.FP_ID'
    }else{
      var URSRC_select_files='SELECT * from USER_FILE_DETAILS UFD,FILE_PROFILE  FP where UFD.RC_ID=(select RC_ID from ROLE_CREATION where RC_NAME="'+URSRC_custom_role+'") and UFD.FP_ID=FP.FP_ID'
    }
    var URSRC_select_files_rs=URSRC_select_files_stmt.executeQuery(URSRC_select_files);
    while(URSRC_select_files_rs.next()){
      var fileid=URSRC_select_files_rs.getString("FP_FILE_ID"); 
      var folderid=URSRC_select_files_rs.getString("FP_FOLDER_ID");
      if(fileid!=null){
        URSRC_fileid_array.push(fileid)       
      }
      if(fileid==null ||fileid!=null){
        URSRC_fileid_array.push(URSRC_select_files_rs.getString("FP_FOLDER_ID"))      
      }    
    }
    for(var i=0;i<URSRC_fileid_array.length;i++)
    { 
      var mimetype=DriveApp.getFileById(URSRC_fileid_array[i]).getMimeType();
      var Folder_editor1=URSRC_GetAllEditors(mimetype,URSRC_fileid_array[i]);        
      for(var j=0;j<Folder_editor1.length;j++){
        if(URSRC_loginid==Folder_editor1[j].getEmail().toLowerCase())
        { 
          URSRC_RemoveEditor(mimetype,URSRC_fileid_array[i],URSRC_loginid);  
          URSRC_sharedocflag=1;
        }        
      }   
      if(mimetype.match('folder')){
        var viewers=DocsList.getFolderById(URSRC_fileid_array[i]).getViewers();
      }
      else
      {
        var viewers=DocsList.getFileById(URSRC_fileid_array[i]).getViewers();
      }
      //    var viewers=DriveApp.getFileById(URT_SRC_arr_file[k]).getViewers();
      for(var k=0;k<viewers.length;k++)
      {
        if(viewers[k].getEmail().toLowerCase()==URSRC_loginid){
          if(mimetype.match('folder')){
            DocsList.getFolderById(viewers[k]).removeViewer(URSRC_loginid);
            URSRC_sharedocflag=1;
          }
          else
          {
            DocsList.getFileById(viewers[k]).removeViewer(URSRC_loginid);
            URSRC_sharedocflag=1;
          }
          //          DriveApp.getFileById(viewers[k]).removeViewer(URSRC_loginid);
        }
      }
    }  
    return URSRC_sharedocflag;
  }
  //FUNCTION TO GET FILE/FOLDER EDITORS
  function URSRC_GetAllEditors(file_type,filefoldid)
  {
    if(file_type.match('folder')){
      var filefoldeditors=DocsList.getFolderById(filefoldid).getEditors() 
      }
    else{
      var filefoldeditors=DocsList.getFileById(filefoldid).getEditors()   
      }
    //  DriveApp.getFileById(filefoldid).getEditors()   
    return filefoldeditors;
  }
  //FUNCTION TO REMOVE FILE/FOLDER EDITOR
  function URSRC_RemoveEditor(file_type,filefoldid,URSRC_loginid)
  {
    if(file_type.match('folder')){
      var remov_Folder=DocsList.getFolderById(filefoldid).removeEditor(URSRC_loginid);
    }
    else
    {
      var remov_Folder=DocsList.getFileById(filefoldid).removeEditor(URSRC_loginid);
    }
    //        DriveApp.getFileById(filefoldid).removeEditor(URSRC_loginid);
  }
  //FUNCTION TO GET FOLDER FILES
  function URSRC_getAllFiles(folder)
  {
    var allid_array=[];
    var file_type=DriveApp.getFileById(folder).getMimeType();
    if(file_type.match('folder')){
      var all_files=DriveApp.getFolderById(folder).getFiles();
      while(all_files.hasNext()){        
        var id=all_files.next().getId();
        allid_array.push(id)     
      }
    }
    return allid_array;
  }
  //FUNCTION TO GET DIFFERENCE ARRAY
  function getDifferenceArray(URSRC_fileid,allid_array)
  {
    var j=0;
    var URSRC_new_diff_array=[];
    for(var i=0; i<=allid_array.length-1;i++)
    {
      if(URSRC_fileid.indexOf(allid_array[i])==-1)
      {
        URSRC_new_diff_array[j]=allid_array[i];
        j++;
      }         
    }
    return URSRC_new_diff_array;
  }
  //----------------------------------------------------------------------------------
  
  //FUNCTION TO SHARE DOCUMENTS WHEN ROLE UPDATED IN LOGIN ID UPDATION
  function URSRC_updateSharedDocuments(URSRC_conn,URSRC_customrolename,LOGINID){
    var URSRC_select_fileid_stmt=URSRC_conn.createStatement();
    var URSRC_fileid_array=[]
    var URSRC_loginid_array=[]
    var URSRC_folderid_array=[];
    var URSRC_fileid=[];
    var URSRC_loginid_array1=[]
    var URSRC_select_fileid="select * from ROLE_CREATION RC,USER_FILE_DETAILS UFD,FILE_PROFILE FP where  FP.FP_ID=UFD.FP_ID and RC_NAME='"+URSRC_customrolename+"' and UFD.RC_ID=RC.RC_ID";
    var URSRC_select_fileid_rs=URSRC_select_fileid_stmt.executeQuery(URSRC_select_fileid)
    while(URSRC_select_fileid_rs.next()){      
      var fileid=URSRC_select_fileid_rs.getString("FP_FILE_ID")
      var folderid=URSRC_select_fileid_rs.getString("FP_FOLDER_ID");
      if(fileid!=null){
        URSRC_fileid_array.push(fileid)
        URSRC_folderid_array.push(folderid)
        URSRC_fileid.push(fileid)
      }
      if(fileid==null ||fileid!=null){
        URSRC_fileid_array.push(URSRC_select_fileid_rs.getString("FP_FOLDER_ID"))      
      }       
    }
    URSRC_fileid_array=eilib.unique(URSRC_fileid_array)
    URSRC_folderid_array=eilib.unique(URSRC_folderid_array)
    var URSRC_selected_loginid_stmt=URSRC_conn.createStatement();
    var URSRC_selected_loginid="select * from USER_LOGIN_DETAILS ULD,ROLE_CREATION RC,USER_ACCESS UA WHERE UA.RC_ID=RC.RC_ID  and ULD.ULD_ID=UA.ULD_ID AND RC_NAME='"+URSRC_customrolename+"' AND ULD.ULD_LOGINID NOT IN (SELECT ULD_LOGINID FROM VW_ACCESS_RIGHTS_REJOIN_LOGINID)";
    var URSRC_selected_loginid_rs=URSRC_selected_loginid_stmt.executeQuery(URSRC_selected_loginid)
    while(URSRC_selected_loginid_rs.next()){      
      URSRC_loginid_array.push(URSRC_selected_loginid_rs.getString("ULD_LOGINID"))      
    }
    URSRC_loginid_array=eilib.unique(URSRC_loginid_array)
    var URSRC_all_fileid_array=[]  
    var URSRC_select_allfiles_stmt=URSRC_conn.createStatement();
    var URSRC_select_allfiles='SELECT * from FILE_PROFILE where FP_FILE_FLAG is null'
    var URSRC_select_allfiles_rs=URSRC_select_allfiles_stmt.executeQuery(URSRC_select_allfiles);
    while(URSRC_select_allfiles_rs.next()){
      var fileid=URSRC_select_allfiles_rs.getString("FP_FILE_ID")      
      if(fileid!=null){
        URSRC_all_fileid_array.push(fileid)
      }
      if(fileid==null ||fileid!=null){
        URSRC_all_fileid_array.push(URSRC_select_allfiles_rs.getString("FP_FOLDER_ID"))      
      }      
    } 
    URSRC_all_fileid_array=eilib.unique(URSRC_all_fileid_array)
    var URSRC_diff_array= [];
    URSRC_diff_array=getDifferenceArray(URSRC_fileid_array,URSRC_all_fileid_array);    
    var URSRC_new_fileid_array=[];
    //OLD FOLDER /FILE LL BE REMOVED FROM ALL THE FOLDERS/FILES
    if(LOGINID==''){
      for(var j=0;j<URSRC_loginid_array.length;j++){
        for(var i=0;i<URSRC_diff_array.length;i++){
          var filename=DriveApp.getFileById(URSRC_diff_array[i])
          var file_type=DriveApp.getFileById(URSRC_diff_array[i]).getMimeType();
          var Folder_editor1=URSRC_GetAllEditors(file_type,URSRC_diff_array[i]);
          for(var k=0;k<Folder_editor1.length;k++){
            if(Folder_editor1[k].getEmail()=='')continue;
            if(URSRC_loginid_array[j]==Folder_editor1[k].getEmail().toLowerCase()){
              URSRC_RemoveEditor(file_type,URSRC_diff_array[i],URSRC_loginid_array[j]);
              URSRC_sharedocflag=1;
            }
          }
        }
      }
    }
    else{
      for(var i=0;i<URSRC_diff_array.length;i++){
        var filename=DriveApp.getFileById(URSRC_diff_array[i])
        var file_type=DriveApp.getFileById(URSRC_diff_array[i]).getMimeType()
        var Folder_editor1=URSRC_GetAllEditors(file_type,URSRC_diff_array[i]);
        for(var k=0;k<Folder_editor1.length;k++){
          if(Folder_editor1[k].getEmail()=='')continue;
          if(LOGINID==Folder_editor1[k].getEmail().toLowerCase()){
            URSRC_RemoveEditor(file_type,URSRC_diff_array[i],LOGINID)
            URSRC_sharedocflag=1;
          }
        }
      }      
    }
    //GET CURRENT FOLDER OR FILE FOR THE SELECTED ROLE FOR THE LOGIN ID
    //IF ROLE UPDATED
    if(LOGINID==''){
      for(var k=0;k<URSRC_fileid_array.length;k++){
        var file_type=DriveApp.getFileById(URSRC_fileid_array[k]).getMimeType();
        var Folder_editor=URSRC_GetAllEditors(file_type,URSRC_fileid_array[k]);
        for(var l=0;l<Folder_editor.length;l++){          
          for(var m=0;m<URSRC_loginid_array.length;m++){
            if(Folder_editor[l].getEmail()=='')continue;
            if(URSRC_loginid_array[m]==Folder_editor[l].getEmail().toLowerCase()){
              URSRC_new_fileid_array.push(URSRC_fileid_array[k])
            }
          }          
        }       
      }
    }
    else{
      for(var k=0;k<URSRC_fileid_array.length;k++){
        var file_type=DriveApp.getFileById(URSRC_fileid_array[k]).getMimeType();
        var Folder_editor=URSRC_GetAllEditors(file_type,URSRC_fileid_array[k]);
        //GET FOLDER/FILE IF CURRENT FOLDER/FILE SHARED TO LOGIN ID
        for(var l=0;l<Folder_editor.length;l++){      
          if(Folder_editor[l].getEmail()=='')continue;
          if(LOGINID==Folder_editor[l].getEmail().toLowerCase()){
            URSRC_new_fileid_array.push(URSRC_fileid_array[k])
          }          
        }       
      }      
    }    
    URSRC_new_fileid_array=eilib.unique(URSRC_new_fileid_array)
    //GET FOLDER/FILE IF CURRENT FOLDER/FILE NOT SHARED TO LOGIN ID
    var URSRC_new_diff_array=[]
    URSRC_new_diff_array=getDifferenceArray(URSRC_new_fileid_array,URSRC_fileid_array)
    //IF ROLE UPDATED
    if(LOGINID==''){
      for(var j=0;j<URSRC_loginid_array.length;j++){
        for(var m=0;m<parseInt(URSRC_new_diff_array.length);m++){ 
          var filename=DriveApp.getFolderById(URSRC_new_diff_array[m]).getName()
          var shar_Folder=DriveApp.getFolderById(URSRC_new_diff_array[m]).addEditor(URSRC_loginid_array[j]);     
        }
      } 
    }
    else{
      for(var m=0;m<parseInt(URSRC_new_diff_array.length);m++){ 
        var filename=DriveApp.getFolderById(URSRC_new_diff_array[m]).getName()
        var shar_Folder=DriveApp.getFolderById(URSRC_new_diff_array[m]).addEditor(LOGINID);
      }     
    }
    var allid_array=[]
    if(URSRC_folderid_array.length!=0){
      var folder=URSRC_folderid_array[0];
      allid_array=URSRC_getAllFiles(folder);
    }
    var URSRC_new_diff_array1=[]
    if(URSRC_fileid.length!=0){
      URSRC_new_diff_array1=getDifferenceArray(URSRC_fileid,allid_array);
      //IF LOGIN ID ROLE N DATE UPDATED
      if(LOGINID!=''){
        for(k=0;k< URSRC_new_diff_array1.length;k++){
          var file_type=DriveApp.getFileById(URSRC_new_diff_array1[k]).getMimeType();
          var filefoldeditors=URSRC_GetAllEditors(file_type,URSRC_new_diff_array1[k]);
          for(var l=0;l<filefoldeditors.length;l++){
            if(filefoldeditors[l].getEmail()=='')continue;
            if(LOGINID==filefoldeditors[l].getEmail().toLowerCase()){
              URSRC_RemoveEditor(file_type,URSRC_new_diff_array1[k],LOGINID)
            }
          }     
        }
      }
      else{
        for(k=0;k< URSRC_new_diff_array1.length;k++){ 
          var file_type=DriveApp.getFileById(URSRC_new_diff_array1[k]).getMimeType();
          var foldereditors=URSRC_GetAllEditors(file_type,URSRC_new_diff_array1[k]);
          for(var l=0;l<foldereditors.length;l++){
            for(var m=0;m<URSRC_loginid_array.length;m++){
              if(foldereditors[l].getEmail()=='')continue;
              if(URSRC_loginid_array[m]==foldereditors[l].getEmail().toLowerCase()){
                URSRC_RemoveEditor(file_type,URSRC_new_diff_array1[k],URSRC_loginid_array[m])
              }
            }            
          }          
        }
      }
    }
  }  
}
catch(err){
}
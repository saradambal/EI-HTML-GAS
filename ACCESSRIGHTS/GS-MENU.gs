/* REPORT - Mb4vVcwu3nksAE2QwxnN2Jb2-f0eBq96R - REPORT
UNIT     - M1vnRrN_IXW5TX0oHI5N-J72-f0eBq96R - UNIT
CUSTOMER - MnUZ6z0jxolfESCHe5JSHyurKGMnPQbcl - CUSTOMER
EXPENSE  - MwXp2D3XU3miH8kcohze3kerKGMnPQbcl - EXP 

CONFIGURATION - MKmBK8pSgXpLpx8INlAWpNL2-f0eBq96R - CONFG
FINANCE  - Mr0TkeaqHWR-0pzxw_e4SaOrKGMnPQbcl - FINANCE
EILIB    - MP5ZcIutkLeN81_aMqv9userKGMnPQbcl - eilib

ACCESS RIGHTS - MCuOmI8N4lZMoTQzotfQG2urKGMnPQbcl
*/
//*****************************************************GLOBAL DECLARATION*********************************//
//var Connparam   = eilib.db_Connect();
//Jdbc.getCloudSqlConnection("jdbc:google:rdbms://"+Connparam[0],Connparam[1],Connparam[2]); 
var timeZoneFormat=eilib.getTimezone();
var TimeZone=Session.getScriptTimeZone();
var UserStamp=Session.getActiveUser().getEmail();
var schema_name=eilib.getSchemaName();
var InstanceName=eilib.getInstanceName();
var trg_UserStamp= Session.getEffectiveUser().getEmail();
//*******************************************FILE DESCRIPTION*********************************************
//************************************************MENU***********************************************//
//DONE BY:PUNI
 //VER 1.4-SD:18/10/2014 ED:18/10/2014;TRACKER NO :651;maskpanel added when clicking the menu n showing confirm message box
 //VER 1.3-SD:15/10/2014 ED:16/10/2014;TRACKER NO :651;1.added dialoog box for menu confirmation to avoid issue of other form confirmation message box.
 //VER 1.2-SD:28/08/2014 ED:29/08/2014;TRACKER NO :651;COMMENT 57,1.Added new lib links,2.updated script to show new confirm msg,3.changed preloader n msgbox position,4.added script to hide preloader after form loads
//DONE BY:SAFIYULLAH.M
////VER 1.1-SD:01/06/2014 ED:04/06/2014;TRACKER NO:651;updated customised error for script error
// VER 1.0-SD:08/06/2014 ED:10/06/2014;TRACKER NO:651;issue corrected and updated failure msg
// VER 0.09-SD:06/06/2014 ED:06/06/2014;TRACKER NO:651;updated file description
// VER 0.08-SD:06/06/2014 ED:06/06/2014;TRACKER NO:651;CHANGED JQUERY LINK
// VER 0.07-31/05/2014 ED:3/06/2014-TRACKER NO:651-issues corrected
// VER 0.06 -31/05/2014 ED:31/05/2014-TRACKER NO :609- INCLUDE CONFIRM MENU
// VER 0.05-20/05/2014 ED:21/05/2015:TRACKER NO:651-INCLUDE SITE MAINTENANCE IN MENU
// VER 0.04- 12/05/2014 ED:17/05/2014;TRACKER NO:651-UPDATED ERROR MSG FROM EILIB,UPDATE RETIURN FLAG IN SCRIPT BY LL AND UPDATE SHARING CALENDER WHILE LOGIN CREATION
//     APPLIED PLATFORM MANAGEMENT  IN SP
// VER 0.03-SD:22/01/2014 ED:22/01/2014;TRACKER NO:651-Corrected variable names
// VER 0.02-SD;08/01/2014 ED:13/01/2014:TRACKER NO: 651-Added form for Basic role menu creation and search/update
// VER 0.01 - INITIAL VERSION-SD:09/11/2013 ED:07/01/2014;TRACKER NO: 651-->
try
{
  //DO GET FUNCTION
  function doGet(e) {
    if (!e.parameter.page) {
      // When no specific page requested, return new"home page"
      return HtmlService.createTemplateFromFile('HTML-MENU').evaluate().setSandboxMode(HtmlService.SandboxMode.EMULATED);
    }
    // else, use page parameter to pick an html file from the script
    return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate().setSandboxMode(HtmlService.SandboxMode.EMULATED);
  }  
  /**
  * Get the URL for the Google Apps Script running as a WebApp.
  */
  function getScriptUrl() {
    var url = ScriptApp.getService().getUrl();
    return url;
  }
  //INCLUDE THE HTML FILE
  function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).setSandboxMode(HtmlService.SandboxMode.NATIVE)
    .getContent();
  }
  //FUNCTION TO GET ALL MENU
  function ACRMENU_getallmenu()
  {
    var UserStamp=Session.getActiveUser().getEmail();
    var ACRMENU_conn = eilib.db_GetConnection();
    var ACRMENU_mainmenu_stmt = ACRMENU_conn.createStatement();
    var ACRMENU_finalmenu=[];//stores mainmenu menu,submenu1,submenu 2
    var ACRMENU_mainmenu=[];//stores mainmenu menu
    var ACRMENU_first_submenu=[];//stores submenu1
    var ACRMENU_second_submenu=[];//stores submenu2
    var ARCMENU_filelist=[];
    var ARCMENU_scriptflag=[];
    var ACRMENU_select_mainmenu_query = "SELECT DISTINCT MP_MNAME FROM USER_LOGIN_DETAILS ULD,USER_ACCESS UA,USER_MENU_DETAILS UMP,MENU_PROFILE MP where ULD_LOGINID='"+UserStamp+"' and UA.ULD_ID=ULD.ULD_ID and UA.RC_ID=UMP.RC_ID and MP.MP_ID=UMP.MP_ID AND UA.UA_TERMINATE IS NULL ORDER BY MP_MNAME ASC"; 
    var ACRMENU_mainmenu_rs= ACRMENU_mainmenu_stmt.executeQuery(ACRMENU_select_mainmenu_query);
    while(ACRMENU_mainmenu_rs.next())//get mainmenu
    {
      var ARCMENU_mainmenuname=ACRMENU_mainmenu_rs.getString("MP_MNAME");
      if(ARCMENU_mainmenuname==null||ARCMENU_mainmenuname=="")continue;
      ACRMENU_mainmenu.push(ARCMENU_mainmenuname)
      var ARCMENU_submenu_stmt = ACRMENU_conn.createStatement();
      var ARCMENU_submenu =[];    
      var ARCMENU_select_submenu_query = "SELECT DISTINCT MP_MSUB  from USER_LOGIN_DETAILS ULD,USER_ACCESS UA,USER_MENU_DETAILS UMP,MENU_PROFILE MP where ULD_LOGINID='"+UserStamp+"' and UA.ULD_ID=ULD.ULD_ID and UA.RC_ID=UMP.RC_ID and MP.MP_ID=UMP.MP_ID and MP.MP_MNAME='"+ARCMENU_mainmenuname+"' ORDER BY MP_MSUB ASC"; 
      var ARCMENU_submenu_rs= ARCMENU_submenu_stmt.executeQuery(ARCMENU_select_submenu_query);
      while(ARCMENU_submenu_rs.next())//get sub menu1
      {
        var ARCMENU_sub_menu=ARCMENU_submenu_rs.getString("MP_MSUB");    
        if(ARCMENU_sub_menu==null||ARCMENU_sub_menu=="")continue;
        if(ARCMENU_sub_menu!="")
        {
          ARCMENU_submenu.push(ARCMENU_sub_menu);       
          var ARCMENU_sub_sub_menu_stmt = ACRMENU_conn.createStatement();
          var ARCMENU_sub_sub_menu =[];
          var ARCMENU_file=[];
          var ARCMENU_flag=[];
          var ARCMENU_select_sub_sub_menu_query = "SELECT DISTINCT MP_MSUBMENU,MP_MFILENAME,MP_SCRIPT_FLAG FROM USER_LOGIN_DETAILS ULD,USER_ACCESS UA,USER_MENU_DETAILS UMP,MENU_PROFILE MP where ULD_LOGINID='"+UserStamp+"' and UA.ULD_ID=ULD.ULD_ID and UA.RC_ID=UMP.RC_ID and MP.MP_ID=UMP.MP_ID and MP.MP_MNAME='"+ARCMENU_mainmenuname+"' AND MP_MSUB='"+ARCMENU_sub_menu+"'  ORDER BY MP_MSUBMENU ASC"; 
          var ARCMENU_sub_sub_menu_rs= ARCMENU_sub_sub_menu_stmt.executeQuery(ARCMENU_select_sub_sub_menu_query);
          while(ARCMENU_sub_sub_menu_rs.next())//get sub menu2
          {
            var ARCMENU_sub_submenu=ARCMENU_sub_sub_menu_rs.getString("MP_MSUBMENU");
            var ARCMENU_filename=ARCMENU_sub_sub_menu_rs.getString("MP_MFILENAME");
            var ARCMENU_script_flag=ARCMENU_sub_sub_menu_rs.getString("MP_SCRIPT_FLAG")
            ARCMENU_filename=ARCMENU_filename.replace(/ /g,"_")
            ARCMENU_file.push(ARCMENU_filename);
            ARCMENU_flag.push(ARCMENU_script_flag)
            if(ARCMENU_sub_submenu!="")
            {
              if(ARCMENU_sub_submenu==null||ARCMENU_sub_submenu=="")continue;
              ARCMENU_sub_sub_menu.push(ARCMENU_sub_submenu);            
            }
          }
          ARCMENU_filelist.push(ARCMENU_file)
          ARCMENU_scriptflag.push(ARCMENU_flag)
          ACRMENU_second_submenu.push(ARCMENU_sub_sub_menu)
          ARCMENU_sub_sub_menu_rs.close();
          ARCMENU_sub_sub_menu_stmt.close()
        }
      }
      ACRMENU_first_submenu.push(ARCMENU_submenu)
      ARCMENU_submenu_rs.close()
      ARCMENU_submenu_stmt.close()
    }
    ACRMENU_mainmenu_rs.close();
    ACRMENU_mainmenu_stmt.close();
    var ACRMENU_error_msg_stmt = ACRMENU_conn.createStatement();
    var ACRMENU_errorAarray=[];
    var ACRMENU_select_err_msg="456";
    ACRMENU_errorAarray=eilib.GetErrorMessageList(ACRMENU_conn,ACRMENU_select_err_msg);
    ACRMENU_conn.close();
    ACRMENU_finalmenu.push(ACRMENU_mainmenu,ACRMENU_first_submenu,ACRMENU_second_submenu,ARCMENU_filelist,ARCMENU_scriptflag)  //return final menu
    var scripturl=getScriptUrl();//get script url
    var ACRMENU_finalmenuurl={"url":scripturl,"menu":ACRMENU_finalmenu,"ACRMENU_errorAarray":ACRMENU_errorAarray.errormsg,"UserStamp":UserStamp}
    return ACRMENU_finalmenuurl;
  }
}catch(err)
{
}

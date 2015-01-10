/* REPORT - MbmkDg_ARM5CSwCcr4bBr1-rKGMnPQbcl - REPORT
UNIT     - MuLnmcM2IRHXXri_scGtIGurKGMnPQbcl - UNIT
CUSTOMER - MoB56RqBnbEMVnvWFLji2zerKGMnPQbcl - CUSTOMER
EXPENSE  - MBWM1cR-C8yKsom21vFRS6erKGMnPQbcl - EXP 

CONFIGURATION - MtSVMT1Stv4dpslC19iek6OrKGMnPQbcl - CONFG
FINANCE  - MLhmnL37wzRXhH4qb6Kz1qurKGMnPQbcl - FINANCE
EILIB    - MSijAvAvjjnegbeuDUb0m-urKGMnPQbcl - eilib

ACCESS RIGHTS - 
*/
//*****************************************************GLOBAL DECLARATION*********************************//
//var Connparam   = eilib.db_Connect();
//Jdbc.getCloudSqlConnection("jdbc:google:rdbms://"+Connparam[0],Connparam[1],Connparam[2]); 
var timeZoneFormat=eilib.getTimezone();
var TimeZone=Session.getScriptTimeZone();
var UserStamp=Session.getActiveUser().getEmail();
var trg_UserStamp= Session.getEffectiveUser().getEmail();
var schema_name=eilib.getSchemaName();
var InstanceName=eilib.getInstanceName();

try
{
  function doGet(e) {
    //  Logger.log( Utilities.jsonStringify(e) );
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
  function include(filename) {
    //Logger.log(filename);
    return HtmlService.createHtmlOutputFromFile(filename).setSandboxMode(HtmlService.SandboxMode.EMULATED)
    .getContent();
  }
  
  
  //FUNCTION TO GET ALL MENU
  function ACRMENU_getallmenu()
  {
    var UserStamp=Session.getActiveUser().getEmail()
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
      var ARCMENU_select_submenu_query = "SELECT DISTINCT MP_MSUB,MP_SCRIPT_FLAG  from USER_LOGIN_DETAILS ULD,USER_ACCESS UA,USER_MENU_DETAILS UMP,MENU_PROFILE MP where ULD_LOGINID='"+UserStamp+"' and UA.ULD_ID=ULD.ULD_ID and UA.RC_ID=UMP.RC_ID and MP.MP_ID=UMP.MP_ID and MP.MP_MNAME='"+ARCMENU_mainmenuname+"' ORDER BY MP_MSUB ASC"; 
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
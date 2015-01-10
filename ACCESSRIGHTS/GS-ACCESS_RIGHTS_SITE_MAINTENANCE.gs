//*******************************************FILE DESCRIPTION*********************************************//
//*******************************************SITE MAINTENANCE*********************************************//
//DONE BY:LALITHA
//VER 1.0-SD:15/07/2014 ED:15/07/2014,TRACKER NO:683,Deleted the access rights menu,Replaced the btn name
//VER 0.09-SD:14/06/2014 ED:14/06/2014,TRACKER NO:683,Changed failure funct,Removed the btn disabling functn,after updating the record reload the tree view function,Put condition for(frst form reloaded nd thn shown err msg)
//VER 0.08-SD:06/06/2014 ED:06/06/2014,Changed jquery link 
//VER 0.07 SD:26/05/2014 ED:27/05/2014,Updated correct forloop(checked sub menu loaded in integrated site),Removed return functn file
//VER 0.06-SD:14/03/2014 ED:14/03/2014,changed id fr updating,updated prefix for new validation part
//VER 0.05-SD:26/02/2012 ED:27/02/2014,TRACKER NO:683,Did Tree View Validation in ver0.05 DONE BY KUMAR.
//VER 0.04-SD:04/02/2014 ED:04/02/2014,implemented eilib for err msg,h3 tag,implemented grant,revoke label nd err msg in button validation,updated On failure function
//VER 0.03-SD:17/01/2014,ED:18/01/2014,updated prefix name,pending submit button nd err msg bec need to discuss wth sn sr nd tl
//VER 0.02-SD:13/01/2014,ED:14/01/2014,removed doget function,updated the int links
//VER 0.01-INITIAL VERSION, SD:09/12/2013 ED:23/12/2013,TRACKER NO:683,pending validation
//*********************************************************************************************************//
try
{
  //RETRIEVE MESSAGE FOR SITE MAINTENANCE FROM ERROR TABLE
  function USR_SITE_get_err()
  {
    var USR_SITE_conn=eilib.db_GetConnection();
    var USR_SITE_errmsgids="397,398";
    var USR_SITE_errorMsg_array=[];
    USR_SITE_errorMsg_array=eilib.GetErrorMessageList(USR_SITE_conn,USR_SITE_errmsgids);
    var USR_SITE_result={"USR_SITE_errormsg":USR_SITE_errorMsg_array.errormsg};      
    return USR_SITE_result;
    USR_SITE_conn.close();
  }
  // FUNCTION FOR SHOW THE DATA IN TREE VIEW LIST
  function USR_SITE_getintialvalue()
  {
    var USR_SITE_conn=eilib.db_GetConnection();
    var USR_SITE_usermenudetails_stmt=USR_SITE_conn.createStatement();
    var USR_SITE_usermenudetails_array=[];
    var USR_SITE_main_menu=[]
    var USR_SITE_sub_menu=[]
    var USR_SITE_select_usermenudetails='SELECT MP_ID FROM MENU_PROFILE WHERE MP_SCRIPT_FLAG IS NOT NULL';
    var USR_SITE_usermenudetails_result=USR_SITE_usermenudetails_stmt.executeQuery(USR_SITE_select_usermenudetails);
    while(USR_SITE_usermenudetails_result.next())
    {
      var USR_SITE_MP_ID=USR_SITE_usermenudetails_result.getString("MP_ID");
      USR_SITE_usermenudetails_array.push(USR_SITE_MP_ID)
    }
    USR_SITE_usermenudetails_result.close();
    USR_SITE_usermenudetails_stmt.close();
    var USR_SITE_menustmt=USR_SITE_conn.createStatement();
    var USR_SITE_finalmenu=[];
    var USR_SITE_main=[];
    var USR_SITE_submain=[];
    var USR_SITE_subsubmain=[];
    var USR_SITE_menuquery="SELECT DISTINCT MP_MNAME FROM MENU_PROFILE WHERE MP_ID NOT IN(53,54,55,56) ORDER BY MP_MNAME ASC"; 
    var USR_SITE_menurs= USR_SITE_menustmt.executeQuery(USR_SITE_menuquery);
    while(USR_SITE_menurs.next())//get main menu
    {
      var USR_SITE_mname=USR_SITE_menurs.getString("MP_MNAME");
      USR_SITE_main.push(USR_SITE_mname)
      var USR_SITE_submenustmt = USR_SITE_conn.createStatement();
      var USR_SITE_subsubmenu=[];
      var USR_SITE_submenuquery= "SELECT DISTINCT MP_MSUB FROM MENU_PROFILE WHERE MP_MNAME='"+USR_SITE_mname+"' AND MP_MSUB IS NOT NULL ORDER BY MP_MSUB ASC"; 
      var USR_SITE_menusubmenurs= USR_SITE_submenustmt.executeQuery(USR_SITE_submenuquery);
      while(USR_SITE_menusubmenurs.next())//get sub menu1
      {
        var USR_SITE_menusub=USR_SITE_menusubmenurs.getString("MP_MSUB");
        if(USR_SITE_menusub!="")
        {
          var USR_SITE_mpid_stmt= USR_SITE_conn.createStatement();         
          var USR_SITE_select_mpid="SELECT MP_ID FROM MENU_PROFILE WHERE MP_MNAME='"+USR_SITE_mname+"' AND MP_MSUB='"+USR_SITE_menusub+"'"
          var USR_SITE_mpid_rs=USR_SITE_mpid_stmt.executeQuery(USR_SITE_select_mpid)
          if(USR_SITE_mpid_rs.next()){
            var USR_SITE_mp_id=USR_SITE_mpid_rs.getString("MP_ID");
            var USR_SITE_menusubmenu=USR_SITE_menusub+"_"+USR_SITE_mp_id
            USR_SITE_subsubmenu.push(USR_SITE_menusubmenu);
          }
          var USR_SITE_subsubmenustmt= USR_SITE_conn.createStatement();
          var USR_SITE_menusubmenuarray=[];
          var USR_SITE_menusubmenuquery= "SELECT DISTINCT MP_MSUBMENU FROM MENU_PROFILE WHERE MP_MNAME='"+USR_SITE_mname+"' AND MP_MSUB='"+USR_SITE_menusub+"' AND MP_MSUBMENU IS NOT NULL ORDER BY MP_MSUBMENU ASC"; 
          var USR_SITE_subsubmenurs= USR_SITE_subsubmenustmt.executeQuery(USR_SITE_menusubmenuquery);
          while(USR_SITE_subsubmenurs.next())//get sub menu2
          {
            var USR_SITE_menusubmenu=USR_SITE_subsubmenurs.getString("MP_MSUBMENU");
            if(USR_SITE_menusubmenu!="")
            {
              var USR_SITE_mp_id_stmt = USR_SITE_conn.createStatement();                      
              var USR_SITE_select_mpid="SELECT MP_ID FROM MENU_PROFILE WHERE MP_MNAME='"+USR_SITE_mname+"' AND MP_MSUB='"+USR_SITE_menusub+"' AND MP_MSUBMENU='"+USR_SITE_menusubmenu+"'"
              var USR_SITE_mp_id_rs=USR_SITE_mp_id_stmt.executeQuery(USR_SITE_select_mpid)
              while(USR_SITE_mp_id_rs.next()){
                var USR_SITE_mp_id=USR_SITE_mp_id_rs.getString("MP_ID");
                USR_SITE_menusubmenu=USR_SITE_menusubmenu+"_"+USR_SITE_mp_id
                USR_SITE_menusubmenuarray.push(USR_SITE_menusubmenu);
              }  
            }
          }
          USR_SITE_subsubmenurs.close();
          USR_SITE_subsubmenustmt.close();
          USR_SITE_subsubmain.push(USR_SITE_menusubmenuarray)
        }
      }
      USR_SITE_menusubmenurs.close();
      USR_SITE_submenustmt.close();
      USR_SITE_submain.push(USR_SITE_subsubmenu)
    }
    USR_SITE_menurs.close();
    USR_SITE_menustmt.close();
    USR_SITE_finalmenu=[USR_SITE_main,USR_SITE_submain,USR_SITE_subsubmain]//return final menu
    var USR_SITE_initial_values_array=[];
    var USR_SITE_initial_values={'USR_SITE_multi_array':USR_SITE_finalmenu,'USR_SITE_menuarray':USR_SITE_usermenudetails_array}
    USR_SITE_initial_values_array.push(USR_SITE_initial_values)
    USR_SITE_conn.close();
    return USR_SITE_initial_values_array  
  }
  //FUNCTION FOR TO UPDATE THE MENU PROFILE
  function USR_SITE_update(USR_SITE_site_form)
  {
    var USR_SITE_conn=eilib.db_GetConnection();
    var USR_SITE_usermenu_stmt = USR_SITE_conn.createStatement();
    var USR_SITE_menu=USR_SITE_site_form.USR_SITE_menu_arry;
    var USR_SITE_subsubmenu=USR_SITE_site_form.USR_SITE_subsubmenu_arry;
    var USR_SITE_submenu=USR_SITE_site_form.USR_SITE_submenu_arry;
    var USR_SITE_menuid;
    if(USR_SITE_menu==undefined && USR_SITE_submenu==undefined && USR_SITE_subsubmenu==undefined && USR_SITE_menuid==USR_SITE_menuid)
    {
      USR_SITE_menuid=null;
      USR_SITE_usermenu_stmt.execute("CALL SP_ACCESS_RIGHTS_SITE_MAINTANENCE("+USR_SITE_menuid+")");
    }
    else
    {
      var USR_SITE_subsubmenu_array=[]
      var USR_SITE_submenu_array=[]
      var USR_SITE_menu_array=[]
      if((Array.isArray(USR_SITE_site_form.USR_SITE_subsubmenu_arry))==true){
        USR_SITE_subsubmenu_array=USR_SITE_site_form.USR_SITE_subsubmenu_arry;
      }    
      else
      {
        USR_SITE_subsubmenu_array.push(USR_SITE_site_form.USR_SITE_subsubmenu_arry);
      }
      if((Array.isArray(USR_SITE_site_form.USR_SITE_submenu_arry))==true){
        USR_SITE_submenu_array=USR_SITE_site_form.USR_SITE_submenu_arry;
      }    
      else
      {
        USR_SITE_submenu_array.push(USR_SITE_site_form.USR_SITE_submenu_arry);
      }
      if((Array.isArray(USR_SITE_site_form.USR_SITE_menu_arry))==true){
        USR_SITE_menu_array=USR_SITE_site_form.USR_SITE_menu_arry;
      }    
      else
      {
        USR_SITE_menu_array.push(USR_SITE_site_form.USR_SITE_menu_arry);    
      }
      var USR_SITE_menu_files=[]
      var USR_SITE_sub_menu_menus=[]
      for(var j=0;j<USR_SITE_submenu_array.length;j++){
        if( !((USR_SITE_submenu_array[j]).toString().match("&&")))    
          USR_SITE_sub_menu_menus.push(USR_SITE_submenu_array[j])
          }
      if(USR_SITE_subsubmenu_array!=''){
        for(var i=0;i<USR_SITE_subsubmenu_array.length;i++){
          USR_SITE_sub_menu_menus.push(USR_SITE_subsubmenu_array[i])
        }
      }
      var USR_SITE_sub_menuid;
      for(var i=0;i<USR_SITE_sub_menu_menus.length;i++){
        if(i==0){
          USR_SITE_menuid=USR_SITE_sub_menu_menus[i]
        }
        else{
          USR_SITE_menuid+=','+USR_SITE_sub_menu_menus[i]
        }
      }
      USR_SITE_menuid="'"+USR_SITE_menuid+"'";
      USR_SITE_usermenu_stmt.execute("CALL SP_ACCESS_RIGHTS_SITE_MAINTANENCE("+USR_SITE_menuid+")");
    }
    USR_SITE_usermenu_stmt.close();
    USR_SITE_conn.close();
  }
}
catch(err)
{
}
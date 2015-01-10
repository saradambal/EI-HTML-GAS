//*******************************************FILE DESCRIPTION*********************************************//
//*******************************************EMPLOYEE DETAIL ENTRY****************************************//
//DONE BY:LALITHA
//VER 0.09-SD:14/06/2014 ED:17/06/2014,TRACKER NO:705,Changed failure funct,Removed mandatory symbol,Changed btn name(submit to save),Changed the email id to lowercase for only valid emailid 
//VER 0.08 SD:07/06/2014 ED:07/06/2014,TRACKER NO:705,Changed jquery link,Updated parseInt for mobile number,Updated autosize for email id,Hide the invalid email err msg,After reset nd submit clicked means resize the(cust frst name,last name,emailid txt bxs),After reset nd submit btn clicked hide the card details,Updated maxlength for cust frst nd last name
//VER 0.07 SD:22/05/2014 ED:22/05/2014,Updated the space in b/w emp frst nd last name,Removed the bold tag for title
//VER 0.06 SD:21/04/2014 ED:25/04/2014,Updated tree view validation,Updated(numbersonly)nd changed(alphabets)replaced in success func tool tip err msg,Hide the card details while chosen cleaner desig nd select option nd beginning form loading,Hide the invalid class nd err msg of(mobileno,email)aftr reset,Removed(no card available)err msg,Changed validation,Aftr file dscrptn put title,Put comments for all function,Checked whether the data are inserted or not nd update the error msg for not-saved record
//DONE BY:ELANGO
//VER 0.05 SD:27/02/2014 ED:27/02/2014 TRACKER NO:147//REPLACE USERSTAMP INTO ULD_ID IN SP USING EILIB FUNCTION
//VER 0.04 SD:25/01/2014 ED:25/01/2014 TRACKER NO:147//REDUCE THE CODING AND SCRIPT AND CHECK THE VALIDATION. 
//VER 0.03 SD:31/12/2013 ED:31/12/2013 TRACKER NO:147//CHANGE THE HEADING TAG AND EILIB CONNECTION 
//VER 0.02 SD:22/12/2013 ED:21/12/2013 TRACKER NO:147//CHANGE THE LOADING OF CARD IN THE FORM AS PER THE CARD ASSIGN FORM MODEL
//VER 0.01-INITIAL VERSION, SD:06/12/2013 ED:18/12/2013 TRACKER NO:147
//*********************************************************************************************************//
try
{
  //FUNCTION FOR FETCHING EMPLOYEE DESIGNATION NAME,ERROR MESSAGE FROM SQL TABLE
  function EMP_ENTRY_getempdomain_err()
  {
    var EMP_ENTRY_conn =eilib.db_GetConnection();
    var EMP_ENTRY_employee_stmt = EMP_ENTRY_conn.createStatement();
    var EMP_ENTRY_employee_name_array =[];
    var EMP_ENTRY_select_employee_name = "SELECT ECN_DATA FROM EXPENSE_CONFIGURATION WHERE CGN_ID=35"; 
    var EMP_ENTRY_employee_name_rs = EMP_ENTRY_employee_stmt.executeQuery( EMP_ENTRY_select_employee_name);
    while(EMP_ENTRY_employee_name_rs.next())
    {
      EMP_ENTRY_employee_name_array.push( EMP_ENTRY_employee_name_rs.getString("ECN_DATA"));
    }
    EMP_ENTRY_employee_name_rs.close();
    var EMP_ENTRY_erroRmsg_id = "34,2,153,154,1,339,248,400";
    var EMP_ENTRY_errorMsg_array=[];
    EMP_ENTRY_errorMsg_array=eilib.GetErrorMessageList(EMP_ENTRY_conn,EMP_ENTRY_erroRmsg_id);
    var EMP_ENTRY_multi_array=EMP_ENTRY_gettreeviewunit();
    var EMP_ENTRY_unitArray = [];
    var EMP_ENTRY_unitquery = "SELECT * FROM UNIT";
    var EMP_ENTRY_unitres = EMP_ENTRY_employee_stmt.executeQuery(EMP_ENTRY_unitquery);
    while(EMP_ENTRY_unitres.next())
    {
      var EMP_ENTRY_unitresdate = EMP_ENTRY_unitres.getString("UNIT_ID");
      EMP_ENTRY_unitArray.push(EMP_ENTRY_unitresdate);
    }  
    var EMP_ENTRY_result={"EMP_ENTRY_unitArray":EMP_ENTRY_unitArray,"EMP_ENTRY_employeename":EMP_ENTRY_employee_name_array,"EMP_ENTRY_errormsg":EMP_ENTRY_errorMsg_array.errormsg,"EMP_ENTRY_multi_array":EMP_ENTRY_multi_array};      
    EMP_ENTRY_employee_stmt.close();
    EMP_ENTRY_conn.close();
    return EMP_ENTRY_result;
  }
  //FUNCTION TO RETURN AVAILABLE CARD'S 
  function EMP_INPUT_getempid(unitno)
  {
    //TREEVIEW  UNIT NO//
    var EMP_ENTRY_connection =eilib.db_GetConnection();
    var EMP_ENTRY_main_menu_stmt = EMP_ENTRY_connection.createStatement();
    var EMP_ENTRY_main_menu_array=[];
    var EMP_ENTRY_multi_array=[]
    var EMP_ENTRY_select_main_menu="SELECT DISTINCT UNIT_NO FROM UNIT U,UNIT_ACCESS_STAMP_DETAILS UASD,UNIT_DETAILS UD WHERE U.UNIT_ID=UASD.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID AND UASD.UASD_ACCESS_INVENTORY IS NOT NULL AND UD.UD_OBSOLETE IS NULL AND UASD.UASD_ACCESS_CARD IS NOT NULL AND  UASD.UASD_ID NOT IN(SELECT ECD.UASD_ID FROM EMPLOYEE_CARD_DETAILS ECD)"
    var EMP_ENTRY_main_menu_result=EMP_ENTRY_main_menu_stmt.executeQuery(EMP_ENTRY_select_main_menu);
    while(EMP_ENTRY_main_menu_result.next()){
      EMP_ENTRY_main_menu_array.push(EMP_ENTRY_main_menu_result.getString("UNIT_NO"));
    }
    EMP_ENTRY_multi_array.push(EMP_ENTRY_main_menu_array)
    for(var i=0;i<EMP_ENTRY_multi_array[0].length;i++){
      var menu=EMP_ENTRY_multi_array[0][i];
      var EMP_ENTRY_sub_menu_array=[];
      var EMP_ENTRY_select_sub_menu="SELECT UASD.UASD_ACCESS_CARD FROM UNIT_ACCESS_STAMP_DETAILS UASD,UNIT U WHERE U.UNIT_ID=UASD.UNIT_ID AND U.UNIT_NO='"+menu+"' AND UASD.UASD_ID NOT IN(SELECT ECD.UASD_ID FROM EMPLOYEE_CARD_DETAILS ECD)AND UASD.UASD_ACCESS_INVENTORY IS NOT NULL AND UASD.UASD_ACCESS_CARD IS NOT NULL ORDER BY UASD.UASD_ACCESS_CARD ASC";       
      var EMP_ENTRY_sub_menu_result=EMP_ENTRY_main_menu_stmt.executeQuery(EMP_ENTRY_select_sub_menu);
      while(EMP_ENTRY_sub_menu_result.next()){ 
        EMP_ENTRY_sub_menu_array.push(EMP_ENTRY_sub_menu_result.getString("UASD_ACCESS_CARD"));
      }
      EMP_ENTRY_multi_array.push(EMP_ENTRY_sub_menu_array)
    }
    EMP_ENTRY_connection.close();
    EMP_ENTRY_main_menu_stmt.close();
    return EMP_ENTRY_multi_array  
  }
  //FUNCTION FOR TO SAVE THE EMAIL ID
  function EMP_ENTRY_save(EMP_ENTRY_form_employeename) 
  {
    var EMP_ENTRY_conn =eilib.db_GetConnection();
    var EMP_ENTRY_stmt =EMP_ENTRY_conn.createStatement()
    var EMP_ENTRY_cardno= EMP_ENTRY_form_employeename.submenu;
    var EMP_ENTRY_firstname = EMP_ENTRY_form_employeename.EMP_ENTRY_tb_firstname; 
    var EMP_ENTRY_lastname = EMP_ENTRY_form_employeename.EMP_ENTRY_tb_lastname; 
    var EMP_ENTRY_empdesigname = EMP_ENTRY_form_employeename.EMP_ENTRY_lb_empdesig;  
    var EMP_ENTRY_mobilenumber = EMP_ENTRY_form_employeename.EMP_ENTRY_tb_mobile; 
    var EMP_ENTRY_email = EMP_ENTRY_form_employeename.EMP_ENTRY_tb_email; 
    var EMP_ENTRY_comments = EMP_ENTRY_form_employeename.EMP_ENTRY_ta_comments; 
    var EMP_ENTRY_radio_null = EMP_ENTRY_form_employeename.EMP_ENTRY_radio_null; 
    if(EMP_ENTRY_cardno==undefined||EMP_ENTRY_radio_null=='NULL')
    {
      EMP_ENTRY_cardno="";
    }
    else
    {
      EMP_ENTRY_cardno=EMP_ENTRY_cardno;
    }
    var EMP_ENTRY_insertstaffexpense ="CALL SP_EMPDTL_INSERT('"+EMP_ENTRY_firstname+"','"+EMP_ENTRY_lastname+"','"+EMP_ENTRY_empdesigname+"',"+EMP_ENTRY_mobilenumber+",'"+EMP_ENTRY_email+"','"+EMP_ENTRY_comments+"','"+UserStamp+"','"+EMP_ENTRY_cardno+"',@FLAG_ENTRYEMP)";
    EMP_ENTRY_stmt.execute(EMP_ENTRY_insertstaffexpense);
    var EMP_ENTRY_getresult= EMP_ENTRY_stmt.executeQuery("SELECT @FLAG_ENTRYEMP");
    while(EMP_ENTRY_getresult.next()){
      var EMP_ENTRY_getresultdate=EMP_ENTRY_getresult.getString("@FLAG_ENTRYEMP");
    }
    var EMP_ENTRY_multi_array=EMP_ENTRY_gettreeviewunit();
    var EMP_ENTRY_result={"EMP_ENTRY_multi_arrayre":EMP_ENTRY_multi_array,"EMP_ENTRY_getresultdate":EMP_ENTRY_getresultdate}
    EMP_ENTRY_stmt.close();
    EMP_ENTRY_conn.close();
    return EMP_ENTRY_result;
  }
  //FUNCTION FOR GET TREE VIEW UNIT
  function EMP_ENTRY_gettreeviewunit()
  {
    var EMP_ENTRY_conn =eilib.db_GetConnection();
    var EMP_ENTRY_stmt =EMP_ENTRY_conn.createStatement()
    var EMP_ENTRY_main_menu_array=[];
    var EMP_ENTRY_multi_array=[]
    var EMP_ENTRY_select_main_menu="SELECT DISTINCT UNIT_NO FROM UNIT U,UNIT_ACCESS_STAMP_DETAILS UASD,UNIT_DETAILS UD WHERE U.UNIT_ID=UASD.UNIT_ID AND U.UNIT_ID=UD.UNIT_ID AND UASD.UASD_ACCESS_INVENTORY IS NOT NULL AND UD.UD_OBSOLETE IS NULL AND UASD.UASD_ACCESS_CARD IS NOT NULL AND  UASD.UASD_ID NOT IN(SELECT ECD.UASD_ID FROM EMPLOYEE_CARD_DETAILS ECD)"
    var EMP_ENTRY_main_menu_result=EMP_ENTRY_stmt.executeQuery(EMP_ENTRY_select_main_menu);
    while(EMP_ENTRY_main_menu_result.next()){
      EMP_ENTRY_main_menu_array.push(EMP_ENTRY_main_menu_result.getString("UNIT_NO"));
    }
    EMP_ENTRY_multi_array.push(EMP_ENTRY_main_menu_array)
    for(var i=0;i<EMP_ENTRY_multi_array[0].length;i++){
      var menu=EMP_ENTRY_multi_array[0][i];
      var EMP_ENTRY_sub_menu_array=[];
      var EMP_ENTRY_select_sub_menu="SELECT UASD.UASD_ACCESS_CARD FROM UNIT_ACCESS_STAMP_DETAILS UASD,UNIT U WHERE U.UNIT_ID=UASD.UNIT_ID AND U.UNIT_NO='"+menu+"' AND UASD.UASD_ID NOT IN(SELECT ECD.UASD_ID FROM EMPLOYEE_CARD_DETAILS ECD)AND UASD.UASD_ACCESS_INVENTORY IS NOT NULL AND UASD.UASD_ACCESS_CARD IS NOT NULL ORDER BY UASD.UASD_ACCESS_CARD ASC";       
      var EMP_ENTRY_sub_menu_result=EMP_ENTRY_stmt.executeQuery(EMP_ENTRY_select_sub_menu);
      while(EMP_ENTRY_sub_menu_result.next()){ 
        EMP_ENTRY_sub_menu_array.push(EMP_ENTRY_sub_menu_result.getString("UASD_ACCESS_CARD"));
      }
      EMP_ENTRY_multi_array.push(EMP_ENTRY_sub_menu_array)
    }
    EMP_ENTRY_stmt.close();
    EMP_ENTRY_conn.close();  
    return EMP_ENTRY_multi_array;
  }
}
catch(err)
{
}
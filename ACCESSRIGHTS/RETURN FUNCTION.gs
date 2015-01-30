
//********************CONFIG ENTRY START*********************
//FETCH THE ERROR MESSAGE AND LOAD MODULE NAME
function CONF_ENTRY_module_errormsg() 
{
  return CONFG.CONF_ENTRY_module_errormsg();
}
//GET THE CGN_ID FROM CONFIGURATION USING CNP_DATA (PROFILE NAME) & RETURN TYPES OF THE MODULE
function CONF_ENTRY_selectModule(CONF_ENTRY_profileName)
{
  return CONFG.CONF_ENTRY_selectModule(CONF_ENTRY_profileName);
}
//FUNCTION FOR INSERT THE CONFIGURATION_ENTRY FORM
function CONF_ENTRY_save(CONF_ENTRY_profileName,CONF_ENTRY_types,CONF_ENTRY_data,CONF_ENTRY_flag,CONF_ENTRY_subtype_dd,CONF_ENTRY_typesid)
{
  return CONFG.CONF_ENTRY_save(CONF_ENTRY_profileName,CONF_ENTRY_types,CONF_ENTRY_data,CONF_ENTRY_flag,CONF_ENTRY_subtype_dd,CONF_ENTRY_typesid);
}
//FUNCTION TO GET PRIMARY ID ,TABLE NAME
function CONF_ENTRY_getmaxprimaryid(CONF_ENTRY_profile_names)
{
  return CONFG.CONF_ENTRY_getmaxprimaryid(CONF_ENTRY_profile_names);
}
//FUNCTION TWO DIMENSION ARRAY
function CONF_ENTRY_twodimdata(CONF_ENTRY_profileName)
{
  return CONFG.CONF_ENTRY_twodimdata(CONF_ENTRY_profileName);
}
//********************CONFG ENTRY END*********************
//********************CONFG ENTRY SEARCH UPDATE START*******************
//FETCH THE ERROR MESSAGE AND LOAD MODULE NAME
function CONFSRC_UPD_DEL_module_errormsg()
{
  return CONFG.CONFSRC_UPD_DEL_module_errormsg();  
}
//GET THE CGN_ID FROM CONFIGURATION USING CNP_DATA (PROFILE NAME) & RETURN TYPES OF THE MODULE
function CONFSRC_UPD_DEL_selectModule(CONFSRC_UPD_DEL_profileName)
{
  return CONFG.CONFSRC_UPD_DEL_selectModule(CONFSRC_UPD_DEL_profileName);
}
//FUNCTION FOR SHOW THE DATA IN TABLE
function CONFSRC_UPD_DEL_selectData(CONFSRC_UPD_DEL_selProfile,CONFSRC_UPD_DEL_selType,CONFSRC_UPD_DEL_parentFunction,CONFSRC_UPD_DEL_flagdd)
{
  return CONFG.CONFSRC_UPD_DEL_selectData(CONFSRC_UPD_DEL_selProfile,CONFSRC_UPD_DEL_selType,CONFSRC_UPD_DEL_parentFunction,CONFSRC_UPD_DEL_flagdd);
}
//UPDATE AND CHECK DATA ALREADY EXISTS
function CONFSRC_UPD_DEL_updateData(CONFSRC_UPD_DEL_selProfile,CONFSRC_UPD_DEL_updateData,CONFSRC_UPD_DEL_tb_UpdSubtype,CONFSRC_UPD_DEL_dataId,CONFSRC_UPD_DEL_lbType,CONFSRC_UPD_DEL_flagData,CONFSRC_UPD_DEL_lb_Typeid,CONFSCR_UPD_DEL_data)
{
return CONFG.CONFSRC_UPD_DEL_updateData(CONFSRC_UPD_DEL_selProfile,CONFSRC_UPD_DEL_updateData,CONFSRC_UPD_DEL_tb_UpdSubtype,CONFSRC_UPD_DEL_dataId,CONFSRC_UPD_DEL_lbType,CONFSRC_UPD_DEL_flagData,CONFSRC_UPD_DEL_lb_Typeid,CONFSCR_UPD_DEL_data);
}
//DELETE DATA FROM THE TABLE
function CONFSRC_UPD_DEL_deleteData(CONFSRC_UPD_DEL_selProfile,CONFSRC_UPD_DEL_lbType,CONFSRC_UPD_DEL_dataId,CONFSRC_UPD_DEL_UpdData,CONFSRC_UPD_DEL_Updsubdata)
{
  return CONFG.CONFSRC_UPD_DEL_deleteData(CONFSRC_UPD_DEL_selProfile,CONFSRC_UPD_DEL_lbType,CONFSRC_UPD_DEL_dataId,CONFSRC_UPD_DEL_UpdData,CONFSRC_UPD_DEL_Updsubdata);
}
//DYNAMIC FUNCTION TO GET POSTID FOR ALL TABLE
function CONFSRC_UPD_DEL_gettablename(CONFSRC_UPD_DEL_selProfile)
{
  return CONFG.CONFSRC_UPD_DEL_gettablename(CONFSRC_UPD_DEL_selProfile);
}
//FUNCTION TO CHECK TRANSACTION
function CONFSRC_UPD_DEL_checktransaction(CONFSRC_UPD_DEL_selProfile,CONFSRC_UPD_DEL_rowid)
{
  return CONFG.CONFSRC_UPD_DEL_checktransaction(CONFSRC_UPD_DEL_selProfile,CONFSRC_UPD_DEL_rowid);
}
//********************CONFG ENTRY SEARCH UPDATE END*******************
//********************EMAIL PROFILE START*********************
//FUNCTION FOR FETCHING EMAIL DOMAIN NAME,ERROR MESSAGE FROM SQL TABLE
function EP_ENTRY_getdomain_err()
{
  return CONFG.EP_ENTRY_getdomain_err();
}
//FUNCTION TO CHECK WHETHER THE DATA INSERTED OR NOT
function EP_ENTRY_getmaxprimaryid()
{
  return CONFG.EP_ENTRY_getmaxprimaryid();
}  
//FUNCTION FOR TO SAVE THE EMAIL ID
function EP_ENTRY_save(EP_ENTRY_profilename,EP_ENTRY_emailid)																		
{																			
  return CONFG.EP_ENTRY_save(EP_ENTRY_profilename,EP_ENTRY_emailid);																		
}
//FUNCTION FOR ALREADY EXIST FOR EMAIL ID
function EP_ENTRY_already(EP_ENTRY_profilename,EP_ENTRY_email_id)
{																			
  return CONFG.EP_ENTRY_already(EP_ENTRY_profilename,EP_ENTRY_email_id);																		
}
//********************EMAIL PROFILE END*********************
//********************EMAIL PROFILE SEARCH / UPDATE START*********************
//FUNCTION TO FETCHING EMAIL PROFILE,EMAIL LIST TABLE,ERROR MESSAGE FROM SQL TABLE
function EP_SRC_UPD_DEL_searchoption()
{
  return CONFG.EP_SRC_UPD_DEL_searchoption();
}
//FUNCTION FOR SHOW THE DATA IN TABLE
function EP_SRC_UPD_DEL_srch(EP_SRC_UPD_DEL_id)
{																	
  return CONFG.EP_SRC_UPD_DEL_srch(EP_SRC_UPD_DEL_id);																		
}
//UPDATE DATA FOR EMAIL PROFILE TABLE
function EP_SRC_UPD_DEL_update(EP_SRC_UPD_DEL_profilename,EP_SRC_UPD_DEL_email_dataId,EP_SRC_UPD_DEL_id)
{
  return CONFG.EP_SRC_UPD_DEL_update(EP_SRC_UPD_DEL_profilename,EP_SRC_UPD_DEL_email_dataId,EP_SRC_UPD_DEL_id);
}
//FUNCTION FOR ALREADY EXIST FOR EMAIL ID
function EP_SRC_UPD_DEL_already(EP_SRC_UPD_DEL_profilename,EP_SRC_UPD_DEL_emailid)
{																			
  return CONFG.EP_SRC_UPD_DEL_already(EP_SRC_UPD_DEL_profilename,EP_SRC_UPD_DEL_emailid);																		
}
//DELETE DATA FROM EMAIL LIST TABLE ND INSERT TO TICKLER HISTORY TABLE
function EP_SRC_UPD_DEL_delete(EP_SRC_UPD_DEL_id)
{
  return CONFG.EP_SRC_UPD_DEL_delete(EP_SRC_UPD_DEL_id);
}
//********************EMAIL PROFILE SEARCH / UPDATE END*********************
//********************EMAIL TEMPLATE ENTRY START *********************
//FUNCTION FOR FETCHING ERROR MESSAGE FROM SQL TABLE
function ET_ENTRY_geterrmsg()
{
  return CONFG.ET_ENTRY_geterrmsg();
}
//FUNCTION FOR TO SAVE THE EMAIL TEMPLATE
function ET_ENTRY_insert(ET_ENTRY_template)
{																		
  return CONFG.ET_ENTRY_insert(ET_ENTRY_template);																		
}
//FUNCTION FOR ALREADY EXIST FOR SCRIPT NAME
function ET_ENTRY_already(ET_ENTRY_scriptname)
{																		
  return CONFG.ET_ENTRY_already(ET_ENTRY_scriptname);																		
}
//********************EMAIL TEMPLATE ENTRY END *********************
//********************EMAIL TEMPLATE SEARCH / UPDATE START *********************
//FUNCTION TO FETCHING EMAIL TEMPLATE SCRIPT NAME NAME,ERROR MESSAGE FROM SQL TABLE
function ET_SRC_UPD_DEL_getscriptname_err()
{
  return CONFG.ET_SRC_UPD_DEL_getscriptname_err();
}
//FUNCTION FOR SHOW THE DATA IN TABLE
function ET_SRC_UPD_DEL_srch(ET_SRC_UPD_DEL_scriptname)
{																
  return CONFG.ET_SRC_UPD_DEL_srch(ET_SRC_UPD_DEL_scriptname);																		
}
//UPDATE DATA FOR EMAIL TEMPLATE TABLE
function ET_SRC_UPD_DEL_update(ET_SRC_UPD_DEL_scriptname,ET_SRC_UPD_DEL_subject,ET_SRC_UPD_DEL_body,ET_SRC_UPD_DEL_id)
{
  return CONFG.ET_SRC_UPD_DEL_update(ET_SRC_UPD_DEL_scriptname,ET_SRC_UPD_DEL_subject,ET_SRC_UPD_DEL_body,ET_SRC_UPD_DEL_id);
}
//********************EMAIL TEMPLATE SEARCH / UPDATE END *********************
//********************UNIT CREATION START*********************
//FUNCTION FOR FETCHING ERROR MESSAGE,ROOMTYPE AND STAMPTYPE FROM SQL TABLE
function UCRE_getroomstamp_err(UCRE_flag)																			
{																			
  return UNIT.UCRE_getroomstamp_err(UCRE_flag);																		
}	
//FUNCTION FOR INSERTING THE UNIT CREATION USING SP
function UCRE_processForm(UCRE_unitcreation)																		
{																			
  return UNIT.UCRE_processForm(UCRE_unitcreation);																		
}	
//FUNCTION FOR ALREADY EXIST FOR UNIT NUMBER & ACCESS CARD
function UCRE_checkExistingUnit(UCRE_source,UCRE_unitacc_roomstamp)																			
{																			
  return UNIT.UCRE_checkExistingUnit(UCRE_source,UCRE_unitacc_roomstamp);																		
}	
//********************UNIT CREATION END*********************
//********************EXITSTING UNIT START*********************
//FUNCTION FOR FETCHING ERROR MESSAGE,ROOMTYPE AND STAMPTYPE FROM SQL TABLE
function UEXST_getroomstamp_err(UEXST_unitno,UEXST_flag_unitno_err_roomstamp)
{
  return UNIT.UEXST_getroomstamp_err(UEXST_unitno,UEXST_flag_unitno_err_roomstamp);  
}
//FUNCTION FOR UPDATING LOGIN,ACCOUNTS AND OTHERS DETAILS
function UEXST_updateForm(UEXST_existingUnit)
{
  return UNIT.UEXST_updateForm(UEXST_existingUnit);
}
//FUNCTION FOR RETRIEVE LOGIN,OTHERS AND ACCOUNTS DETAILS FROM TABLE
function UEXST_login_acct_others(UEXST_unitnumber,UEXST_source)
{
  return UNIT.UEXST_login_acct_others(UEXST_unitnumber,UEXST_source);
}

//FUNCTION FOR CHECKING ALREADY EXISTS DATA FOR ACCESS CARD, ROOM TYPE AND STAMP TYPE
function UEXST_alreadyexists(UEXST_alreadyexist,UEXST_source)
{
  return UNIT.UEXST_alreadyexists(UEXST_alreadyexist,UEXST_source);
}
//********************EXITSTING UNIT END*********************  
//******************* DOOR CODE START***********************
//FUNCTION FOR FETCHING ERROR MESSAGE,UNIT NO FROM SQL TABLE
function USRC_UPDCODE_getunitno_err()
{
  return UNIT.USRC_UPDCODE_getunitno_err();
}
//FUNCTION TO GET DOOR CODE FROM LOGIN_DETAILS TABLE
function USRC_UPDCODE_logindetails(USRC_UPDCODE_unitnumber,USRC_UPDCODE_flag)
{
  return UNIT.USRC_UPDCODE_logindetails(USRC_UPDCODE_unitnumber,USRC_UPDCODE_flag);
}
//FUNCTION FOR UPDATE DOORCODE,WEBLOGIN AND WEBPASSWORD
function USRC_UPDCODE_updateDoorcode(USRC_UPDCODE_login_id,USRC_UPDCODE_unitnumber,USRC_UPDCODE_doorcode,USRC_UPDCODE_weblogin,USRC_UPDCODE_webpass)
{
  return UNIT.USRC_UPDCODE_updateDoorcode(USRC_UPDCODE_login_id,USRC_UPDCODE_unitnumber,USRC_UPDCODE_doorcode,USRC_UPDCODE_weblogin,USRC_UPDCODE_webpass);
}
//FUNCTION FOR FETCHING ERROR MESSAGE,UNIT NO FROM SQL TABLE----------------------------------------------*/
  function USRC_UPDCODE_ExistsDoorcode(USRC_UPDCODE_doorcode,USRC_UPDCODE_flag_doorCodeLogin)
  {
     return UNIT.USRC_UPDCODE_ExistsDoorcode(USRC_UPDCODE_doorcode,USRC_UPDCODE_flag_doorCodeLogin);
  }
//******************* DOOR CODE END***********************
//******************* UNIT SEARCH/UPDATE START****************
//FETCHING ERRORMSG & SEARCH BY OPTION
function USRC_errormsg_data_unitno()																			
{																			
  return UNIT.USRC_errormsg_data_unitno();																		
}	
//FUNCTION FOR LOADING SEARCH OPTION VALUES
function USRC_func_load_searchby_option(USRC_unit_optionfetch,USRC_parentfunc,USRC_load_lb)																		
{																			
  return UNIT.USRC_func_load_searchby_option(USRC_unit_optionfetch,USRC_parentfunc,USRC_load_lb);																		
}	
//FUNCTION FOR SHOWING FLEX TABLE
function USRC_func_flex(USRC_form_unit_searchnupdate)																			
{																			
  return UNIT.USRC_func_flex(USRC_form_unit_searchnupdate);																	
}	
//FUNCTION FOR ALREADY EXIST FOR UNIT NUMBER & ACCESS CARD,ROOM TYPE,STAMP TYPE
function USRC_Data_AlreadyExists(USRC_inventory_unitno,USRC_typeofcard,USRC_flag_card_unitno,USRC_parent_func)																
{																			
  return UNIT.USRC_Data_AlreadyExists(USRC_inventory_unitno,USRC_typeofcard,USRC_flag_card_unitno,USRC_parent_func);																		
}	
//FUNCTION FOR GETTING UNIQUE ROOM TYPE AND STAMP TYPE FOR UNIT
function USRC_roomstamp_unitno(USRC_unitno)																
{																			
  return UNIT.USRC_roomstamp_unitno(USRC_unitno);																		
}	
//FUNCTION FOR UPDATION USING SP
function USRC_func_update(USRC_form_values,USRC_obj_rowvalue,USRC_obj_flex)																		
{																			
  return UNIT.USRC_func_update(USRC_form_values,USRC_obj_rowvalue,USRC_obj_flex);																		
}	
//******************* UNIT SEARCH/UPDATE END****************
//******************* UNIT TERMINATION START ***********************
//FUNCTION FOR FETCHING ERROR MESSAGE AND UNIT NO FROM SQL TABLE
function UTERM_get_errormsg_unitno()
{
  return UNIT.UTERM_get_errormsg_unitno();
}
//FUNCTION FOR RETRIEVE UNIT DETAILS FROM UNIT_DETAILS TABLE, CHECK CUSTOMER ID AND UPDATE OBSOLETE
function UTERM_unitdetails(UTERM_unitnumber,UTERM_flag_selectcheck,UTERM_comments)
{
  return UNIT.UTERM_unitdetails(UTERM_unitnumber,UTERM_flag_selectcheck,UTERM_comments);
}
//******************* UNIT TERMINATION END ***********************
//******************* CUSTOMER CREATION START ***********************
function CCRE_Roomtype(CCRE_unit,CCRE_nullpara)
{
  return CUSTOMER.CCRE_Roomtype(CCRE_unit,CCRE_nullpara);
}
function CCRE_CardNumber(CCRE_unit,CCRE_firstname,CCRE_lastname)
{
  return CUSTOMER.CCRE_CardNumber(CCRE_unit,CCRE_firstname,CCRE_lastname);
}
function CCRE_prorated(CCRE_startdate,CCRE_enddate)
{
  return CUSTOMER.CCRE_prorated(CCRE_startdate,CCRE_enddate);
}
function CCRE_processFormSubmit(customercreation)
{
  return CUSTOMER.CCRE_processFormSubmit(customercreation);
}
function CCRE_customercreation_commonvalues()
{
  return CUSTOMER.CCRE_customercreation_commonvalues();
}
function CUST_CREATION_customercalenderdeletion(customer_id,calenderIDcode,calevent_array)
{
  return CUSTOMER.CUST_CREATION_customercalenderdeletion(customer_id,calenderIDcode,calevent_array)
}
//******************* CUSTOMER CREATION END ***********************
//******************* CUSTOMER CREATION UAT START ***********************
function UAT_CCRE_Roomtype(UAT_CCRE_unit,UAT_CCRE_nullpara)
{
  return CUSTOMER.UAT_CCRE_Roomtype(UAT_CCRE_unit,UAT_CCRE_nullpara);
}
function UAT_CCRE_CardNumber(UAT_CCRE_unit,UAT_CCRE_firstname,UAT_CCRE_lastname)
{
  return CUSTOMER.UAT_CCRE_CardNumber(UAT_CCRE_unit,UAT_CCRE_firstname,UAT_CCRE_lastname);
}
function UAT_CCRE_prorated(UAT_CCRE_startdate,UAT_CCRE_enddate)
{
  return CUSTOMER.UAT_CCRE_prorated(UAT_CCRE_startdate,UAT_CCRE_enddate);
}
function UAT_CCRE_processFormSubmit(customercreation)
{
  return CUSTOMER.UAT_CCRE_processFormSubmit(customercreation);
}
function UAT_CCRE_customercreation_commonvalues()
{
  return CUSTOMER.UAT_CCRE_customercreation_commonvalues();
}
//******************* CUSTOMER CREATION UAT END ***********************
//******************* CUSTOMER RECHECK IN START *******************
function CRCHK_Customer(unit)
{
  return CUSTOMER.CRCHK_Customer(unit);
}
function CRCHK_olddetails(id,cust_rec_ver)
{
  return CUSTOMER.CRCHK_olddetails(id,cust_rec_ver);
}
function CRCHK_Roomtype(CRCHK_unit,CRCHK_nullpara)
{
  return CUSTOMER.CRCHK_Roomtype(CRCHK_unit,CRCHK_nullpara);
}
function CRCHK_CardNumber(CRCHK_unit,CRCHK_firstname,CRCHK_lastname)
{
  return CUSTOMER.CRCHK_CardNumber(CRCHK_unit,CRCHK_firstname,CRCHK_lastname);
}
function CRCHK_prorated(CRCHK_startdate,CRCHK_enddate)
{
  return CUSTOMER.CRCHK_prorated(CRCHK_startdate,CRCHK_enddate);
}
function CRCHK_processFormSubmit(recheckin)
{
  return CUSTOMER.CRCHK_processFormSubmit(recheckin);
}
function CRCHK_customerrecheckin_commonvalues(nounit)
{
  return CUSTOMER.CRCHK_customerrecheckin_commonvalues(nounit);
}
//******************* CUSTOMER RECHECK IN END *******************
//******************* CUSTOMER CANCEL START *******************
//////FUNCTION TO CHECK CUSTOMER AVAILABLE
//////FUNCTION TO CHECK CUSTOMER AVAILABLE
function CCAN_getcustomer(){
  
  return CUSTOMER.CCAN_getcustomer();  
}
 // //FUNCTION TO GET ALL CANCEL /UNCANCEL CUSTOMER DETAILS
function CCAN_allcustomerdetails(CCAN_select_type){
  
  return CUSTOMER.CCAN_allcustomerdetails(CCAN_select_type);
}
////FUNCTION TO RETURN UNIT NO
function CCAN_getcustomer_details(CCAN_select_type){
  
  return CUSTOMER.CCAN_getcustomer_details(CCAN_select_type);
  
}
//FUNCTION TO GET CUSTOMER DETAIL'S
function CCAN_get_customervalues(id,CCAN_select_type,CCAN_recver){
  
  return CUSTOMER.CCAN_get_customervalues(id,CCAN_select_type,CCAN_recver);
  
}
//Function to cancel customer
function CCAN_cancel(cancelform){
  
  return CUSTOMER.CCAN_cancel(cancelform);
  
}
//Function to Uncancel customer
function CCAN_uncancel(uncancelform){
  
  return CUSTOMER.CCAN_uncancel(uncancelform);
  
}
//******************* CUSTOMER CANCEL END *******************
//******************* CUSTOMER EXTENSOIN START***************
//FUNCTION TO GET ALL EXTENSION UNIT NOS
function CEXTN_getExtnUnitNo()
{
  return CUSTOMER.CEXTN_getExtnUnitNo();
}
//FUNCTION TO GET CUSTOMER NAME N CUSTOMER ID
function CEXTN_getCustomerNameId(CEXTN_lb_unitno)
{
  return CUSTOMER.CEXTN_getCustomerNameId(CEXTN_lb_unitno);
}
//FUNCTION TO GET CUSTOMER DETAILS FOR THE SELECTED CUSTOMER ID
function CEXTN_getCustomerdtls(CEXTN_custid,CEXTN_unitno)
{
  return CUSTOMER.CEXTN_getCustomerdtls(CEXTN_custid,CEXTN_unitno);
}
//FUNCTION TO GET ROOM TYPE FOR SAME UNIT
function CEXTN_getRoomType(CEXTN_unitno,CEXTN_roomtype)
{
  return CUSTOMER.CEXTN_getRoomType(CEXTN_unitno,CEXTN_roomtype);
}
//FUNCTION TO GET UNIT NO EXCEPT SELECTED UNIT NO
function CEXTN_getdiffUnitNo(CEXTN_unitno)
{
  return CUSTOMER.CEXTN_getdiffUnitNo(CEXTN_unitno);
}
//FUNCTION TO GET CARD NOS
function CEXTN_getdiffunitCardNo(CEXTN_unit,CEXTN_firstname,CEXTN_lastname)
{
  return CUSTOMER.CEXTN_getdiffunitCardNo(CEXTN_unit,CEXTN_firstname,CEXTN_lastname);
}
//FUNCTION TO CHK PRORATED OR NOT
function CEXTN_chkProrated(CEXTN_db_chkindate,CEXTN_db_chkoutdate)
{
  return CUSTOMER.CEXTN_chkProrated(CEXTN_db_chkindate,CEXTN_db_chkoutdate);
}
//FUNCTION TO GET UNIT NOS,ERROR MSGS,PRORATED N WAIVED VALUE,ALL EXTN DETAILS
function CEXTN_getCommonvalues()
{ 
  return CUSTOMER.CEXTN_getCommonvalues();
}
//FUNCTION TO SAVE CUSTOMER DETAILS
function CEXTN_SaveDetails(CEXTN_dts)
{
  return CUSTOMER.CEXTN_SaveDetails(CEXTN_dts);
}
//******************* CUSTOMER EXTENSOIN END***************
//******************* CUSTOMER TERMINATION START*********
//FUNCTION TO GET CUSTOMER NAME
function CTERM_getCustomerName(CTERM_form)
{
  return CUSTOMER.CTERM_getCustomerName(CTERM_form);
}
//FUNCTION TO GET CUSTOMER ID FOR THE SELECTED CUSTOMER NAME
function CTERM_getCustomerId(CTERM_form)
{
  return CUSTOMER.CTERM_getCustomerId(CTERM_form);
}
//FUNCTION TO GET CUSTOMER DETAILS FOR THE SELECTED CUSTOMER NAME
function CTERM_getCustomerdtls(CTERM_custid,CTERM_radio_termoption)
{
  return CUSTOMER.CTERM_getCustomerdtls(CTERM_custid,CTERM_radio_termoption);
}
//FUNCTION TO GET MIN PTD AFTER FULL PTD A GUEST IN SELECTED RV
function CTERM_getMinPTD(CTERM_custid,CTERM_radio_termoption,CTERM_custrv)
{
  return CUSTOMER.CTERM_getMinPTD(CTERM_custid,CTERM_radio_termoption,CTERM_custrv);
}
//FUNCTION TO GET CALENDAR TIME N ERROR MESSAGES
function CTERM_getErrMsgCalTime()
{
  return CUSTOMER.CTERM_getErrMsgCalTime();
}
//FUNCTION TO SAVE TERMINATION DETAILS
function CTERM_UpdatePtd(CTERM_form)
{
  return CUSTOMER.CTERM_UpdatePtd(CTERM_form);
}
//******************* CUSTOMER TERMINATION END*********
//******************* CUSTOMER ERM ENTRY START*********
function CERM_ENTRY_processFormSubmit(ERM_ENTRY_details)
{
  return CUSTOMER.CERM_ENTRY_processFormSubmit(ERM_ENTRY_details);
}
function CERM_ENTRY_commonvalues()
{
  return CUSTOMER.CERM_ENTRY_commonvalues();
}
//******************* CUSTOMER ERM ENTRY END*********
//******************* CUSTOMER ERM SEARCH UPDATE START *********
function CERM_SRC_searchdetails(CERM_SRC_ermoption,CERM_SRC_input1,CERM_SRC_input2)
{
  return CUSTOMER.CERM_SRC_searchdetails(CERM_SRC_ermoption,CERM_SRC_input1,CERM_SRC_input2); 
}
function CERM_SRC_ERMupdationrecord(id,customer,rent,movingdate,minimumstay,occupation,others,nationality,guests,age,contact,mailid,comments,CERM_oldarrayvalue)
{
  return CUSTOMER.CERM_SRC_ERMupdationrecord(id,customer,rent,movingdate,minimumstay,occupation,others,nationality,guests,age,contact,mailid,comments,CERM_oldarrayvalue)
}
function CERM_SRC_commonvalues()
{
  return CUSTOMER.CERM_SRC_commonvalues();
}
function CERM_SRC_ERMdeletionrecord(id)
{
  return CUSTOMER.CERM_SRC_ERMdeletionrecord(id);
}
function CERM_SRC_customernameautocomplete()
{
  return CUSTOMER.CERM_SRC_customernameautocomplete();
}
function CERM_SRC_contactautocomplete()
{
  return CUSTOMER.CERM_SRC_contactautocomplete();
}
//******************* CUSTOMER ERM SEARCH UPDATE END *********
//******************* CUSTOMER EXPIRY START*********
//FUNCTION TO GET INITIAL VALUES
function CEXP_get_initial_values(){
  return CUSTOMER.CEXP_get_initial_values();
}
//FUNCTION TO GET CUSTOMER DATA'S FROM DATABASE
function CEXP_get_customer_details(fromdate,todate,radiovalue){
  return CUSTOMER.CEXP_get_customer_details(fromdate,todate,radiovalue);
}
//FUNCTION TO SEND WEEKLY CUSTOMER EXPIRY LIST
function CWEXP_get_customerdetails(CWEXP_weeklyexpirylist_form){
  return CUSTOMER.CWEXP_get_customerdetails(CWEXP_weeklyexpirylist_form);
}
function CEXP_droptemptable(conn,tablename)
{
  return  CUSTOMER.CEXP_droptemptable(conn,tablename);
}
//******************* CUSTOMER EXPIRY END*********
//******************* CUSTOMER CARD ASSIGN START***********
//FUNCTION TO RETURN UNIT NO
function CCARD_getinitial_values(){
  
  return CUSTOMER.CCARD_getinitial_values(); 
}
//FUNCTION TO RETURN ALL CUSTOMER DETAILS
function CCARD_allcustomerdetails(){
  return  CUSTOMER.CCARD_allcustomerdetails();
}
//FUNCTION TO RETURN CUSTOMER DETAIL'S
function CCARD_get_customerdetails(recver,CCARD_unit,CCARD_cust_id){
  return CUSTOMER.CCARD_get_customerdetails(recver,CCARD_unit,CCARD_cust_id);  
}
//FUNCTION TO RETURN AVAILABLE CARD'S AND CUSTOMER CARD'S
function CCARD_show_availablecards(unit,fname,lname,recver,CCARD_custid){
  return CUSTOMER.CCARD_show_availablecards(unit,fname,lname,recver,CCARD_custid);
}
//FUNCTION TO SAVE CARD
function CCARD_cardassign_save(cardassign_form){
  return CUSTOMER.CCARD_cardassign_save(cardassign_form);
}
//******************* CUSTOMER CARD ASSIGN END***********
//******************* CUSTOMER SEARCH UPDATE START***********
function CSRC_prorated(CSRC_startdate,CSRC_enddate)
{
  return CUSTOMER.CSRC_prorated(CSRC_startdate,CSRC_enddate);
}
function CSRC_Roomtype(CSRC_unit,CSRC_nullpara)
{
  return CUSTOMER.CSRC_Roomtype(CSRC_unit,CSRC_nullpara);  
}
function CSRC_autocompletesearchdetails(searchoptionid)
{
  return CUSTOMER.CSRC_autocompletesearchdetails(searchoptionid);
}
function CSRC_customersearch_commonvalues()
{
  return CUSTOMER.CSRC_customersearch_commonvalues();
}
function CSRC_searchdetails(CSRC_searchoption,CSRC_customerid1,CSRC_customerid2)
{
  return CUSTOMER.CSRC_searchdetails(CSRC_searchoption,CSRC_customerid1,CSRC_customerid2);
}
function CSRC_selectedcustomerrecverdetails(CSRC_customerid,CSRC_customerrecver,CSRC_unit)
{
  return CUSTOMER.CSRC_selectedcustomerrecverdetails(CSRC_customerid,CSRC_customerrecver,CSRC_unit)
}
function CSRC_customer_update_getvalues(CSRC_updation)
{
  return CUSTOMER.CSRC_customer_update_getvalues(CSRC_updation);
}
function CSRC_customerrecord_delete(CSRC_customerid)
{
  return CUSTOMER.CSRC_customerrecord_delete(CSRC_customerid);
}
function CUST_customercalenderdeletion(CSRC_conn,CSRC_customerid, calenderIDcode,CSRC_beforetable)
{
  return CUSTOMER.CUST_customercalenderdeletion(CSRC_conn,CSRC_customerid, calenderIDcode,CSRC_beforetable);
}
function  CUST_customercalendercreation(CSRC_conn,CSRC_customerid, calenderIDcode,CSRC_firstname, CSRC_lastname, CSRC_mobile, CSRC_intmobile, CSRC_office, CSRC_customermailid, CSRC_unit,CSRC_roomtype,CSRC_aftertable)
{
return CUSTOMER.CUST_customercalendercreation(CSRC_conn,CSRC_customerid, calenderIDcode,CSRC_firstname, CSRC_lastname, CSRC_mobile, CSRC_intmobile, CSRC_office, CSRC_customermailid, CSRC_unit,CSRC_roomtype,CSRC_aftertable);  
}
function CAL_DEL_CREATE(CSRC_conn,CSRC_customerid,status)
{
  return CUSTOMER.CAL_DEL_CREATE(CSRC_conn,CSRC_customerid,status);
}
//******************* CUSTOMER SEARCH UPDATE END***********
//******************* ACCESS REPLACE CARD START********
////FUNCTION TO RETURN COMMON VALUES
function CACS_REP_get_initial_values(){
  
  return CUSTOMER.CACS_REP_get_initial_values();
  
}
////FUNCTION TO RETURN CUSTOMER NAME
function CACS_REP_allcustomer_details(){
  
  return CUSTOMER.CACS_REP_allcustomer_details();
  
}
//FUNCTION TO RETURN CUSTOMER ID
function CACS_REP_get_avialablecard(unitno){
  
  return CUSTOMER.CACS_REP_get_avialablecard(unitno);
  
}
//FUNCTION TO REPLACE CARD
function CACS_REP_saveform(CACS_REP_replaceform){
  
  return CUSTOMER.CACS_REP_saveform(CACS_REP_replaceform);
  
}
//******************* ACCESS REPLACE CARD END********
//******************* ACCESS SEARCH UPDATE START********
//FUNCTION TO RETURN COMMON VALUES
function CACS_SRC_get_initial_values(){
  return CUSTOMER.CACS_SRC_get_initial_values();
}
//FUNCTION TO RETURN all customer details
function CACS_SRC_allcustomer_details(){
  return CUSTOMER.CACS_SRC_allcustomer_details();
}
//FUNCTION TO SAVE 
function CACS_SRC_saveform(CACS_SRC_details){
  return CUSTOMER.CACS_SRC_saveform(CACS_SRC_details);
}
//******************* ACCESS SEARCH UPDATE END********
//******************* ACCESS CARD VIEW START********
//FUNCTION TO RETURN COMMON VALUES
function CACS_VIEW_get_initial_values(){
  return CUSTOMER.CACS_VIEW_get_initial_values();
}
//FUNCTION TO RETURN CARD NO DETAILS
function CACS_VIEW_get_cardno_details(unitno,cardno,option){
  return CUSTOMER.CACS_VIEW_get_cardno_details(unitno,cardno,option);
}
//FUNCTION TO RETURN CUSTOMER ID
function CACS_VIEW_CustomerId(custname){
  return CUSTOMER.CACS_VIEW_CustomerId(custname);
}
//FUNCTION TO GET CARD DETAILS FOR CUSTOMER
function CACS_VIEW_get_customervalues(custid){
  return CUSTOMER.CACS_VIEW_get_customervalues(custid); 
}
function CACS_VIEW_customername_autocomplete(){
  return CUSTOMER.CACS_VIEW_customername_autocomplete(); 
}
//******************* ACCESS CARD VIEW END********

//******************* BIZ DAILY ENTRY START********
//FUNCTION TO LOAD ALL INITIAL VALUE'S
function BDLY_INPUT_get_initialvalue()
{
  return EXP.BDLY_INPUT_get_initialvalue();
}
//GET THE UNIT NUMBER//
function BDLY_INPUT_get_unitno(BDLY_INPUT_type)
{
  return EXP.BDLY_INPUT_get_unitno(BDLY_INPUT_type);
}
/*------------------------------------------EILIB FUNCTION TO GET UNIT SDATE,EDATE AND INVDATE -----------------------------------------------------*/
  function BDLY_SRC_getUnitDate(BDLY_SRC_unitno){
      return EXP.BDLY_SRC_getUnitDate(BDLY_SRC_unitno);
  }
//FUNCTION FOR GET THE PETTY CASH BALANCE
function BDLY_INPUT_get_balance()
{
  return EXP.BDLY_INPUT_get_balance();
}
//GET THE PAYMENT  VALUES//
function BDLY_INPUT_get_invoiceto(unitno)
{
  return EXP.BDLY_INPUT_get_invoiceto(unitno);
}
//GET THE CATEGORY FROM EXPENSE_CONFIGURATION//
function BDLY_INPUT_get_category(unitno) 
{
  return EXP.BDLY_INPUT_get_category(unitno);
}
//GET THE VALUES FOR LOADING IN THE FORM//
function BDLY_INPUT_get_values(unitno,type)
{
  return EXP.BDLY_INPUT_get_values(unitno,type);
}
//GET THE ACCESS CARD VALUE//
function BDLY_INPUT_checkcardno(cardno)
{
  return EXP.BDLY_INPUT_checkcardno(cardno);
}
//FUNCTION TO GET STAR HUB VALUES//
function BDLY_INPUT_get_accno(unitno)
{
  return EXP.BDLY_INPUT_get_accno(unitno);
}
//GET CLEANER NAME//
function BDLY_INPUT_get_cleanername()
{
  return EXP.BDLY_INPUT_get_cleanername();
}
//SAVE ALL  FORM DATA IN THE TABLE//
function BDLY_INPUT_save_values(BDLY_INPUT_form_values)
{
  return EXP.BDLY_INPUT_save_values(BDLY_INPUT_form_values);
}
//CHECK THE CUSTOMER NAME HAVING  MORE ID'S//
function BDLY_INPUT_custvalidation(unit,customer,id)
{
  return EXP.BDLY_INPUT_custvalidation(unit,customer,id);
}
//GET ALL UNIT NO//
function BDLY_INPUT_get_allunitno()
{
  return EXP.BDLY_INPUT_get_allunitno();
}
//CHECK UNIT NO
function BDLY_INPUT_checkexistunit(BDLY_INPUT_unitval)
{
  return EXP.BDLY_INPUT_checkexistunit(BDLY_INPUT_unitval);
}
//GET SDATE AND EDATE
function BDLY_INPUT_get_SEdate(BDLY_INPUT_unitno)
{
  return EXP.BDLY_INPUT_get_SEdate(BDLY_INPUT_unitno);
}
//******************* BIZ DAILY ENTRY END********
//******************* BIZ DAILY SEARCHY UPDATE START********
/*-------------------------------GET INITIAL VALUE EXPENSE TYPE,UNIT EXP CATEGORY,ERROR MESSAGES--------------------------------------*/
function BDLY_SRC_getInitialvalue()
{
  return EXP.BDLY_SRC_getInitialvalue();
}
/*------------------------------------------To GET UNIT EXP CATEGORY------------------------------------------------------*/
function BDLY_SRC_getUnitexp_catg(BDLY_SRC_startdate,BDLY_SRC_enddate,BDLY_SRC_chkcat)
{
  return EXP.BDLY_SRC_getUnitexp_catg(BDLY_SRC_startdate,BDLY_SRC_enddate,BDLY_SRC_chkcat)
}
/*------------------------------------------To GET BIZ DAILY EXPENSE SEARCH OPTIONS FROM DB------------------------------------------------------*/
function BDLY_SRC_getSearchOptions(selectedexpense)
{
  return EXP.BDLY_SRC_getSearchOptions(selectedexpense);
}
/*------------------------------------------To GET ALL TYPE OF AUTOCOMPLTE RESULTS IN BIZ DAILY--------------------------------------------------*/
function BDLY_SRC_get_autocomplete(searchform)
{
  return EXP.BDLY_SRC_get_autocomplete(searchform);
}
/*------------------------------------------TO GET PURCHASE CARD NO------------------------------------------------------*/
function BDLY_SRC_getPurchase_card(BDLY_SRC_startdate,BDLY_SRC_enddate)
{
  return EXP.BDLY_SRC_getPurchase_card(BDLY_SRC_startdate,BDLY_SRC_enddate);
}
/*------------------------------------------TO GET CUSTOMER NAME--------------------------------------------------------*/
function BDLY_SRC_get_cusname(unitno,startdate,enddate)
{
  return EXP.BDLY_SRC_get_cusname(unitno,startdate,enddate);
}
/*------------------------------------------TO GET DIGITAL VOICE N STARHUB ACCOUNT NO--------------------------------------------------------*/
function BDLY_SRC_get_accountno(selectedexpense,BDLY_SRC_startdate,BDLY_SRC_enddate)
{
  return EXP.BDLY_SRC_get_accountno(selectedexpense,BDLY_SRC_startdate,BDLY_SRC_enddate);
}
/*------------------------------------------TO GET CLEANER NAME--------------------------------------------------------*/
function BDLY_SRC_get_cleanername(BDLY_SRC_startdate,BDLY_SRC_enddate,selectedSearchopt)
{
  return EXP.BDLY_SRC_get_cleanername(BDLY_SRC_startdate,BDLY_SRC_enddate,selectedSearchopt);
}
/*------------------------------------------TO GET UNIT NO BASED THE DATE RANGE OR GET HOUSEKPEEING UNIT NO--------------------------------------------------------*/
function BDLY_SRC_getUnitList(selectedexpense,selectedSearchopt,startdate,endate)
{
  return EXP.BDLY_SRC_getUnitList(selectedexpense,selectedSearchopt,startdate,endate);
}
/*------------------------------------------TO GET SERVICE BY LIST------------------------------------------------------*/
function BDLY_SRC_getServiceByList(BDLY_SRC_startdate,BDLY_SRC_enddate)
{
  return EXP.BDLY_SRC_getServiceByList(BDLY_SRC_startdate,BDLY_SRC_enddate);
}
/*------------------------------------------TO GET CAR NO LIST--------------------------------------------------------*/
function BDLY_SRC_getCarNoList(BDLY_SRC_startdate,BDLY_SRC_enddate)
{
  return EXP.BDLY_SRC_getCarNoList(BDLY_SRC_startdate,BDLY_SRC_enddate);
}
/*------------------------------------------GET DIGITAL VOICE NO TO LIST---------------------------------------------------------*/
function BDLY_SRC_getDigitalVoiceNo(BDLY_SRC_startdate,BDLY_SRC_enddate)
{
  return EXP.BDLY_SRC_getDigitalVoiceNo(BDLY_SRC_startdate,BDLY_SRC_enddate);
}
/*------------------------------------------TO GET DIGITAL INVOICE TO LIST--------------------------------------------------------*/
function BDLY_SRC_invoiceto(selectedexpense,selectedSearchopt,BDLY_SRC_startdate,BDLY_SRC_enddate)
{
  return EXP.BDLY_SRC_invoiceto(selectedexpense,selectedSearchopt,BDLY_SRC_startdate,BDLY_SRC_enddate);
}
/*------------------------------------------WILL FETCH RESULT FROM DB AND WILL SHOW IN DATA TABLE -----------------------------------------------------*/
function BDLY_SRC_getAnyTypeExpData(SearchFormData)
{
  return EXP.BDLY_SRC_getAnyTypeExpData(SearchFormData);
}
/*------------------------------------------WILL CHK FOR EXISTING ACCESS CARD OR UNIT NO -----------------------------------------------------*/
function BDLY_SRC_check_access_cardOrUnitno(BDLY_SCR_DT_access_cardrunit,BDLY_SRC_selectedexptype)
{
  return EXP.BDLY_SRC_check_access_cardOrUnitno(BDLY_SCR_DT_access_cardrunit,BDLY_SRC_selectedexptype);
}
/*------------------------------------------WILL UPDATE DATA TABLE ROW IN DB -------------------------------------------------*/
function BDLY_SRC_UpdaterowData(BDLY_new_values,BDLY_old_values,expense,selectedSearchopt)
{
  return EXP.BDLY_SRC_UpdaterowData(BDLY_new_values,BDLY_old_values,expense,selectedSearchopt);
}
/*------------------------------------------WILL DELETE  DATA TABLE VALUE ROW BY ROW IN DB -------------------------------------------------*/
function  BDLY_SRC_DeleteRowData(BDLY_Delete_key,selectedexpense)
{
  return EXP.BDLY_SRC_DeleteRowData(BDLY_Delete_key,selectedexpense);
}
//******************* BIZ DAILY SEARCHY UPDATE END********
//******************* BIZ DETIAL ENTRY START********
//FUNCTION FOR FETCHING ERROR MESSAGE,EXPENSE TYPES AND INVOICE 
function BDTL_INPUT_expense_err_invoice()
{
  return EXP.BDTL_INPUT_expense_err_invoice();
}
//CODING TO GET UNIT NO FROM UNIT TABLE
function BDTL_INPUT_all_exp_types_unitno(BDTL_INPUT_all_expense_types)
{
  return EXP.BDTL_INPUT_all_exp_types_unitno(BDTL_INPUT_all_expense_types); 
}
//CODING TO GET AIRCON SERVICED BY DATA LIST
function BDTL_INPUT_aircon_list()
{
  return EXP.BDTL_INPUT_aircon_list();
}
//CODING TO CHECK AIRCONSERVICE BY IN TABLE
function BDTL_INPUT_airconservicedby_check(BDTL_INPUT_alreadyexists)
{
  return EXP.BDTL_INPUT_airconservicedby_check(BDTL_INPUT_alreadyexists);
}
//CODING TO SAVE THE AIRCON DETAIL,CARPARK,ELECTRICITY,DIGITAL VOICE,STARHUB IN DATABASE
function BDTL_INPUT_save(BDTL_INPUT_form_biz_detail)
{
  return EXP.BDTL_INPUT_save(BDTL_INPUT_form_biz_detail);
}
//CODING TO GET UNIT SDATE AND EDATE
function BDTL_INPUT_get_SDate_EDate(BDTL_INPUT_unitno)
{
  return EXP.BDTL_INPUT_get_SDate_EDate(BDTL_INPUT_unitno);
}
//******************* BIZ DETIAL ENTRY END********
//******************* BIZ DETIAL SEARCH UPDATE START********
//FUNCTION TO GET EXPENSE TYPES 
function BTDTL_SEARCH_expensetypes()
{
  return EXP.BTDTL_SEARCH_expensetypes();
}
//FUNCTION FOR AUTOCOMPLETE FOR COMMENTS
function BTDTL_SEARCH_comments_autocomplete(BTDTL_SEARCH_expense_searchoptions)
{
  return EXP.BTDTL_SEARCH_comments_autocomplete(BTDTL_SEARCH_expense_searchoptions); 
}
//FUNCTION FOR SEARCH BY AIRCON,CARPARK,ELECTRICITY,STARHUB,DIGITALVOICE
function BTDTL_SEARCH_expense_searchby(BTDTL_SEARCH_search_option,BTDTL_SEARCH_expense_types,BTDTL_SEARCH_flag_searchby)
{
  return EXP.BTDTL_SEARCH_expense_searchby(BTDTL_SEARCH_search_option,BTDTL_SEARCH_expense_types,BTDTL_SEARCH_flag_searchby);
}
//FUNCTION FOR FETCHING FLEX TABLE FOR AIRCON
function BTDTL_SEARCH_flex_aircon(BTDTL_SEARCH_searchval,BTDTL_SEARCH_searchby,BTDTL_SEARCH_parentfunc)
{
  return EXP.BTDTL_SEARCH_flex_aircon(BTDTL_SEARCH_searchval,BTDTL_SEARCH_searchby,BTDTL_SEARCH_parentfunc); 
}
//FUNCTION FOR CARPARK SHOWING FLEX TABL
function BTDTL_SEARCH_show_carpark(BTDTL_SEARCH_searchval,BTDTL_SEARCH_searchby,BTDTL_SEARCH_parentfunc)
{
  return EXP.BTDTL_SEARCH_show_carpark(BTDTL_SEARCH_searchval,BTDTL_SEARCH_searchby,BTDTL_SEARCH_parentfunc); 
}
//FETCHING ELECTRICITY FOR LOADING FLEX TABLE
function BTDTL_SEARCH_show_electricity(BTDTL_SEARCH_searchval,BTDTL_SEARCH_searchby,BTDTL_SEARCH_parentfunc)
{
  return EXP.BTDTL_SEARCH_show_electricity(BTDTL_SEARCH_searchval,BTDTL_SEARCH_searchby,BTDTL_SEARCH_parentfunc);
}
//FUNCTION FOR DIGITAL SHOWING FLEX TABLE
function BTDTL_SEARCH_show_digital(BTDTL_SEARCH_searchval,BTDTL_SEARCH_searchby,BTDTL_SEARCH_parentfunc)
{
  return EXP.BTDTL_SEARCH_show_digital(BTDTL_SEARCH_searchval,BTDTL_SEARCH_searchby,BTDTL_SEARCH_parentfunc); 
}
//FUNCTION FOR STARHUB SHOWING FLEX TABLE
function BTDTL_SEARCH_show_starhub(BTDTL_SEARCH_date,BTDTL_SEARCH_searchval,BTDTL_SEARCH_searchby,BTDTL_SEARCH_parentfunc)
{
  return EXP.BTDTL_SEARCH_show_starhub(BTDTL_SEARCH_date,BTDTL_SEARCH_searchval,BTDTL_SEARCH_searchby,BTDTL_SEARCH_parentfunc);  
}
//FUNCTION FOR UPDATION
function BTDTL_SEARCH_updatForm(BTDTL_SEARCH_form_bizdetail,BTDTL_SEARCH_cable_sdate,BTDTL_SEARCH_cable_edate,BTDTL_SEARCH_internet_sdate,BTDTL_SEARCH_internet_edate,BTDTL_SEARCH_radiovalue,BTDTL_SEARCH_sh_arr)
{
  return EXP.BTDTL_SEARCH_updatForm(BTDTL_SEARCH_form_bizdetail,BTDTL_SEARCH_cable_sdate,BTDTL_SEARCH_cable_edate,BTDTL_SEARCH_internet_sdate,BTDTL_SEARCH_internet_edate,BTDTL_SEARCH_radiovalue,BTDTL_SEARCH_sh_arr); 
}
//FUNCTION FOR DELETION HIDE OR SHOW
function BTDTL_SEARCH_radio_delete(BTDTL_SEARCH_expenseid,BTDTL_SEARCH_expensetypes,BTDTL_SEARCH_searchoptions)
{
  return EXP.BTDTL_SEARCH_radio_delete(BTDTL_SEARCH_expenseid,BTDTL_SEARCH_expensetypes,BTDTL_SEARCH_searchoptions); 
}
//FUNCTION FOR DELETION
function BTDTL_SEARCH_delete(BTDTL_SEARCH_expenseid,BTDTL_SEARCH_expensetypes,BTDTL_SEARCH_searchoptions,BTDTL_SEARCH_obj,BTDTL_SEARCH_sh_arr)
{
  return EXP.BTDTL_SEARCH_delete(BTDTL_SEARCH_expenseid,BTDTL_SEARCH_expensetypes,BTDTL_SEARCH_searchoptions,BTDTL_SEARCH_obj,BTDTL_SEARCH_sh_arr); 
}
//FUNCTION FOR ALREADY EXISTS FOR AIRCON SERVICED_BY
function BTDTL_SEARCH_func_twodimen(BTDTL_SEARCH_profile_names)
{
  return EXP.BTDTL_SEARCH_func_twodimen(BTDTL_SEARCH_profile_names); 
}
//FUNCTION TO GET PRIMARY ID AND TABLE ID
function BTDTL_SEARCH_getmaxprimaryid(BTDTL_SEARCH_profile_names)
{
  return EXP.BTDTL_SEARCH_getmaxprimaryid(BTDTL_SEARCH_profile_names); 
}
//CODING TO CHECK AIRCONSERVICE BY IN TABLE------------------------------------------------------*
function BTDTL_SEARCH_airconservicedby_check(BTDTL_SEARCH_alreadyexists)
{
  return EXP.BTDTL_SEARCH_airconservicedby_check(BTDTL_SEARCH_alreadyexists); 
}
//******************* BIZ DETIAL SEARCH UPDATE END********
//******************* STAFF  DETIAL ENTRY START********
//FUNCTION FOR FETCHING STAFF EMPLOYEE NAME,ERROR MESSAGE FROM SQL TABLE
function STDTL_INPUT_getempname_err()
{
  return EXP.STDTL_INPUT_getempname_err();
}
//FUNCTION TO CHECK WHETHER THE DATA INSERTED OR NOT
function STDTL_INPUT_getmaxprimaryid()
{
  return EXP.STDTL_INPUT_getmaxprimaryid();
}
//FUNCTION FOR TO SAVE THE STAFF DETAILS
function STDTL_INPUT_save(STDTL_INPUT_form_employeename)
{																		
  return EXP.STDTL_INPUT_save(STDTL_INPUT_form_employeename);																		
}
//FUNCTION FOR ALREADY EXIST FOR CPF NUMBER
function STDTL_INPUT_already(STDTL_INPUT_employeename,STDTL_INPUT_tb_cpfnumber)
{																	
  return EXP.STDTL_INPUT_already(STDTL_INPUT_employeename,STDTL_INPUT_tb_cpfnumber);																		
}
//******************* STAFF  DETAIL ENTRY END********
//******************* STAFF  DETAIL SEARCH UPDATE START********
//FUNCTION FOR FETCHING STAFF EMPLOYEE NAME,CPF NUMBER,ERROR MESSAGE FROM SQL TABLE
function STDTL_SEARCH_searchoption()
{
  return EXP.STDTL_SEARCH_searchoption();
}
//FUNCTION FOR AUTOCOMPLETE FOR STAFF COMMENTS
function STDTL_SEARCH_comments_autocomplete()
{
  return EXP.STDTL_SEARCH_comments_autocomplete();
}
// FUNCTION FOR SHOW THE DATA IN TABLE
function STDTL_SEARCH_flextabel_getdatas(STDTL_SEARCH_flexresponse)
{																	
  return EXP.STDTL_SEARCH_flextabel_getdatas(STDTL_SEARCH_flexresponse);																		
}
//UPDATE DATA FOR STAFF DETAIL TABLE
function STDTL_SEARCH_update(STDTL_SEARCH_form_employeelist)
{
  return EXP.STDTL_SEARCH_update(STDTL_SEARCH_form_employeelist);
}
//FUNCTION FOR ALREADY EXIST FOR CPF NUMBER
function STDTL_SEARCH_already(STDTL_SEARCH_lb_updemployeename,STDTL_SEARCH_tb_cpfnumber)
{																
  return EXP.STDTL_SEARCH_already(STDTL_SEARCH_lb_updemployeename,STDTL_SEARCH_tb_cpfnumber);																		
}
//FUNCTION FOR RADIO BUTTON CLICK
function STDTL_SEARCH_radio_delete(STDTL_SEARCH_expenseid)
{
  return EXP.STDTL_SEARCH_radio_delete(STDTL_SEARCH_expenseid);																		
}
//DELETE DATA FROM THE EXPENSE_DETAIL_STAFF_SALARY TABLE
function STDTL_SEARCH_delete(STDTL_SEARCH_id)
{
  return EXP.STDTL_SEARCH_delete(STDTL_SEARCH_id);
}
//******************* STAFF  DETIAL SEARCH UPDATE END********
//******************* STAFF  DAILY ENTRY START********
//.............AGENT COMMISSION SAVE PART.........................
function STDLY_INPUT_savedata(STDLY_INPUT_formallid)
{
  return EXP.STDLY_INPUT_savedata(STDLY_INPUT_formallid);
}
//SAVE THE STAFF DETAILS............................
function STDLY_INPUT_savestaff(STDLY_INPUT_formallid)
{ 
  return EXP.STDLY_INPUT_savestaff(STDLY_INPUT_formallid);
}
//change the scriptlet.........................
function STDLY_INPUT_loadfistlistbox()
{
  return EXP.STDLY_INPUT_loadfistlistbox();
}
//******************* STAFF  DAILY ENTRY END********
//******************* STAFF  DAILY SEARCH UPDATE START********
function STDLY_SEARCH_searchbyagentcommission(STDLY_SEARCH_searchoptionmatch,STDLY_SEARCH_getstartdate,STDLY_SEARCH_getenddate,STDLY_SEARCH_fromamount,STDLY_SEARCH_toamount,STDLY_SEARCH_searchcomments)
{
  return EXP.STDLY_SEARCH_searchbyagentcommission(STDLY_SEARCH_searchoptionmatch,STDLY_SEARCH_getstartdate,STDLY_SEARCH_getenddate,STDLY_SEARCH_fromamount,STDLY_SEARCH_toamount,STDLY_SEARCH_searchcomments);
}
//GET THE CPF NO FOR SEARCHING.................. 
function STDLY_SEARCH_loadcpfno(STDLY_SEARCH_salarysearchoption)
{
  return EXP.STDLY_SEARCH_loadcpfno(STDLY_SEARCH_salarysearchoption);
}
//UPDATE SALARY ENTRY FORM  DATAS........................... 
function STDLY_SEARCH_savealldetails(STDLY_SEARCH_updateformid)
{
  return EXP.STDLY_SEARCH_savealldetails(STDLY_SEARCH_updateformid);
}
//DELETE THE  RECORD IN THE TABLE...........................
function STDLY_SEARCH_deleterow(STDLY_SEARCH_deleteid,STDLY_SEARCH_typrval,STDLY_SEARCH_db_startdate,STDLY_SEARCH_db_enddate,STDLY_SEARCH_srchoption)
{
  return EXP.STDLY_SEARCH_deleterow(STDLY_SEARCH_deleteid,STDLY_SEARCH_typrval,STDLY_SEARCH_db_startdate,STDLY_SEARCH_db_enddate,STDLY_SEARCH_srchoption);
}
//GET DATA FOR SALARY SEARCH OPTIONS.................................FROM SALARY ENTRY...........
function STDLY_SEARCH_searchbysalaryentry(STDLY_SEARCH_salaryoptionvalmatch,STDLY_SEARCH_getstartdate,STDLY_SEARCH_getenddate,STDLY_SEARCH_fromamount,STDLY_SEARCH_toamount,STDLY_SEARCH_selectedcpfno,STDLY_SEARCH_selectedempname,STDLY_SEARCH_searchcomments)
{ 
  return EXP.STDLY_SEARCH_searchbysalaryentry(STDLY_SEARCH_salaryoptionvalmatch,STDLY_SEARCH_getstartdate,STDLY_SEARCH_getenddate,STDLY_SEARCH_fromamount,STDLY_SEARCH_toamount,STDLY_SEARCH_selectedcpfno,STDLY_SEARCH_selectedempname,STDLY_SEARCH_searchcomments);
} 
//GET THE STAFF FLEX TABLE  DATAS FOR LOADING..................
function STDLY_SEARCH_searchbystaff(STDLY_SEARCH_staffoptionvalmatch,STDLY_SEARCH_getstartdate,STDLY_SEARCH_getenddate,STDLY_SEARCH_staffexpansecategory,STDLY_SEARCH_fromamount,STDLY_SEARCH_toamount,STDLY_SEARCH_searchcomments,STDLY_SEARCH_invitemcom,STDLY_SEARCH_invfromcomt)
{
  return EXP.STDLY_SEARCH_searchbystaff(STDLY_SEARCH_staffoptionvalmatch,STDLY_SEARCH_getstartdate,STDLY_SEARCH_getenddate,STDLY_SEARCH_staffexpansecategory,STDLY_SEARCH_fromamount,STDLY_SEARCH_toamount,STDLY_SEARCH_searchcomments,STDLY_SEARCH_invitemcom,STDLY_SEARCH_invfromcomt);
}
//FUNCTION FOR COMMENTS FILTER BY DATE.............
function STDLY_SEARCH_func_comments(STDLY_SEARCH_db_startdate,STDLY_SEARCH_db_enddate,STDLY_SEARCH_lb_typelist,STDLY_SEARCH_lb_salarysearchoption)
{
  return EXP.STDLY_SEARCH_func_comments(STDLY_SEARCH_db_startdate,STDLY_SEARCH_db_enddate,STDLY_SEARCH_lb_typelist,STDLY_SEARCH_lb_salarysearchoption);
}
//GET THE EMPLOYEE NAME FROM THE TABLE..................
function STDLY_INPUT_loademployeename()
{
  return EXP.STDLY_INPUT_loademployeename();
}
//******************* STAFF  DAILY SEARCH UPDATE END********
//******************* STAFF  EMPLOYEE ENTRY START********
//FUNCTION FOR FETCHING EMPLOYEE DESIGNATION NAME,ERROR MESSAGE FROM SQL TABLE
function EMP_ENTRY_getempdomain_err()
{
  return EXP.EMP_ENTRY_getempdomain_err();
}
//FUNCTION TO RETURN AVAILABLE CARD'S
function EMP_INPUT_getempid(unitno)
{
  return EXP.EMP_INPUT_getempid(unitno);
}
//FUNCTION FOR TO SAVE THE EMAIL ID
function EMP_ENTRY_save(EMP_ENTRY_form_employeename) 
{
  return EXP.EMP_ENTRY_save(EMP_ENTRY_form_employeename);
}
//FUNCTION FOR GET TREE VIEW UNIT
function EMP_ENTRY_gettreeviewunit()
{
  return EXP.EMP_ENTRY_gettreeviewunit();
}
//******************* STAFF  EMPLOYEE ENTRY END********
//******************* STAFF  EMPLOYEE SEARCH UPDATE START********
//FUNCTION TO GET SEARCH OPTION 
function EMPSRC_UPD_DEL_searchoption()
{
  return EXP.EMPSRC_UPD_DEL_searchoption();
}
//FUNCTION FOR AUTOCOMPLETE FOR COMMENTS,EMAIL,MOBILENO
function EMPSRC_UPD_DEL_autocomplts_autocomplete(EMPSRC_UPD_DEL_expense_searchoptions)
{
  return EXP.EMPSRC_UPD_DEL_autocomplts_autocomplete(EMPSRC_UPD_DEL_expense_searchoptions);
}
// FUNCTION FOR SHOW THE DATA IN TABLE
function EMPSRC_UPD_DEL_flextabel_getdatas(EMPSRC_UPD_DEL_flexresponse)
{
  return EXP.EMPSRC_UPD_DEL_flextabel_getdatas(EMPSRC_UPD_DEL_flexresponse);
}
//FUNCTION TO RETURN AVAILABLE CARD'S 
function EMPSRC_UPD_DEL_getempid()
{
  return EXP.EMPSRC_UPD_DEL_getempid();
}
//GET CARD NO AND UNIT NO//
function EMPSRC_UPD_DEL_getcardnoandunitno(EMPSRC_UPD_DEL_id)
{
  return EXP.EMPSRC_UPD_DEL_getcardnoandunitno(EMPSRC_UPD_DEL_id);
}
//UPDATE THE FORM DATAS//
function EMPSRC_UPD_DEL_updateform(EMPSRC_UPD_DEL_updateformelement,EMPSRC_UPD_DEL_expense_searchoptions)
{
  return EXP.EMPSRC_UPD_DEL_updateform(EMPSRC_UPD_DEL_updateformelement,EMPSRC_UPD_DEL_expense_searchoptions);
}
//DELETE THE  RECORD IN THE TABLE
function EMPSRC_UPD_DEL_deleterow(EMPSRC_UPD_DEL_deleteid)
{
  return EXP.EMPSRC_UPD_DEL_deleterow(EMPSRC_UPD_DEL_deleteid);
}
//GET THE TREEVIEW UNIT AND CARD VALUES//
function EMPSRC_UPD_DEL_gettreeviewunit(EMPSRC_UPD_DEL_tb_updateid)
{
  return EXP.EMPSRC_UPD_DEL_gettreeviewunit(EMPSRC_UPD_DEL_tb_updateid);
}
//******************* STAFF  EMPLOYEE SEARCH UPDATE END********

//******************* PERSONAL DAILY ENTRY START********
//GET THE TYPE OF EXPENSE//
function PDLY_INPUT_gettypofexpense()
{
  return EXP.PDLY_INPUT_gettypofexpense();
}
//SAVE THE MULTIROW DATAS//
function PDLY_INPUT_savebabypersonal(PDLY_INPUT_formallid)
{
  return EXP.PDLY_INPUT_savebabypersonal(PDLY_INPUT_formallid);
}
//SAVING PART FOR CAR EXPENSE AND CAR LOAN//
function PDLY_INPUT_savecardetails(PDLY_INPUT_formallid)
{
  return EXP.PDLY_INPUT_savecardetails(PDLY_INPUT_formallid);
}
//GET THE  CATEGORY OF EXPENSE IN THE MULTIROW LISTBOX FOR//
function PDLY_INPUT_getinvoicefrom()
{
  return EXP.PDLY_INPUT_getinvoicefrom();
}
//******************* PERSONAL DAILY ENTRY END********
//******************* PERSONAL DAILY SEARCH UPDATE START***********************
//GET THE INITIAL LOADING  DATAS //
function PDLY_SEARCH_gettypofexpense()
{
  return EXP.PDLY_SEARCH_gettypofexpense();
}
//DATAS SEARCH BY BABY EXPENSE FOR DISPLAY IN THE FLEX TABLE//
function PDLY_SEARCH_searchbybaby(PDLY_SEARCH_typelistvalue,PDLY_SEARCH_startdate,PDLY_SEARCH_enddate,PDLY_SEARCH_babysearch,PDLY_SEARCH_fromamount,PDLY_SEARCH_toamount,PDLY_SEARCH_searchcomments,PDLY_SEARCH_invitemcom,PDLY_SEARCH_invfromcomt,PDLY_SEARCH_babycategory)
{ 
  return EXP.PDLY_SEARCH_searchbybaby(PDLY_SEARCH_typelistvalue,PDLY_SEARCH_startdate,PDLY_SEARCH_enddate,PDLY_SEARCH_babysearch,PDLY_SEARCH_fromamount,PDLY_SEARCH_toamount,PDLY_SEARCH_searchcomments,PDLY_SEARCH_invitemcom,PDLY_SEARCH_invfromcomt,PDLY_SEARCH_babycategory);
}
//GET THE TYPE OF CATEGORY VALUE//
function PDLY_SEARCH_getbabycategoryvalue(PDLY_SEARCH_lb_babysearchoptionvalue)
{
  return EXP.PDLY_SEARCH_getbabycategoryvalue(PDLY_SEARCH_lb_babysearchoptionvalue);
}
//UPDATE ALL DATAS IN  CHANGES IN THE UPDATE FORM//
function PDLY_SEARCH_updatealldetails(PDLY_SEARCH_updateformid)
{ 
  return EXP.PDLY_SEARCH_updatealldetails(PDLY_SEARCH_updateformid);
}
// AUTO COMPLETION  FOR   COMMENTS SEARCH//
function PDLY_SEARCH_getMatchText(PDLY_SEARCH_lb_typelistvalue,PDLY_SEARCH_lb_getstartvaluevalue,PDLY_SEARCH_lb_getendvaluevalue)
{
  return EXP.PDLY_SEARCH_getMatchText(PDLY_SEARCH_lb_typelistvalue,PDLY_SEARCH_lb_getstartvaluevalue,PDLY_SEARCH_lb_getendvaluevalue);
}
//GET THE INVOICE FROM DATA FROM THE DB...................
function PDLY_SEARCH_invfroandamtmgetMatchText(PDLY_SEARCH_lb_typelistvalue,PDLY_SEARCH_lb_getstartvaluevalue,PDLY_SEARCH_lb_getendvaluevalue,PDLY_SEARCH_lb_babysearchoptionvalue)
{
  return EXP.PDLY_SEARCH_invfroandamtmgetMatchText(PDLY_SEARCH_lb_typelistvalue,PDLY_SEARCH_lb_getstartvaluevalue,PDLY_SEARCH_lb_getendvaluevalue,PDLY_SEARCH_lb_babysearchoptionvalue);
}
// CODING FOR PERSONAL EXPENSE  DELETE //
function  PDLY_SEARCH_delete(PDLY_SEARCH_lb_typelistvalue,PDLY_SEARCH_radiovalue)
{
  return EXP.PDLY_SEARCH_delete(PDLY_SEARCH_lb_typelistvalue,PDLY_SEARCH_radiovalue);
}
//******************* PERSONAL DAILY SEARCH UPDATE END***************

//******************* FINANCE ACTIVE CUSTOMER ENTRY START**************************
function FIN_ENTRY_Customer(unit,no)
{
  return FINANCE.FIN_ENTRY_Customer(unit,no);
}
function FIN_ENTRY_input_details(rental)
{
 return FINANCE.FIN_ENTRY_input_details(rental); 
}
function FIN_ENTRY_commonvalues()
{
  return FINANCE.FIN_ENTRY_commonvalues();
}
function FIN_ENTRY_FORPERIOD_validation(unit,customer,id)
{
  return FINANCE.FIN_ENTRY_FORPERIOD_validation(unit,customer,id)
}
//******************* FINANCE ACTIVE CUSTOMER ENTRY END***************************
//******************* FINANCE TERMINATED CUST ENTRY START***************************
function FIN_TERM_ENTRY_payment_commonvalues()
{
  return FINANCE.FIN_TERM_ENTRY_payment_commonvalues();  
}
function FIN_payment_Customer(unit)
{
  return FINANCE.FIN_payment_Customer(unit)
}
function FIN_TERM_ENTRY_forperiod_validation(unit,customer)
{
  return FINANCE.FIN_TERM_ENTRY_forperiod_validation(unit,customer);
}
function FIN_TERM_ENTRY_input_details(termination)
{
  return FINANCE.FIN_TERM_ENTRY_input_details(termination)
}
//******************* FINANCE TERMINATED CUST ENTRY END***************************
//******************* FINANCE SEARCH UPDATE START***************************

function FIN_SRC_paymentsearchoptions(searchinput1,searchinput2,searchinput3,searchinput4,searchinput5,label)
{
  return FINANCE.FIN_SRC_paymentsearchoptions(searchinput1,searchinput2,searchinput3,searchinput4,searchinput5,label);
}
function FIN_SRC_unitcustomerlist(unit)
{
  return FINANCE.FIN_SRC_unitcustomerlist(unit); 
}
function FIN_SRC_Paymentupdationdetails(rentalid,recver,custid)
{
  return FINANCE.FIN_SRC_Paymentupdationdetails(rentalid,recver,custid);
}
function FIN_SRC_paymentupdation(id,unit,customer,leaseperiod,payment,amount,period,paiddate,comments,flag)
{
  return FINANCE.FIN_SRC_paymentupdation(id,unit,customer,leaseperiod,payment,amount,period,paiddate,comments,flag);
}
function FIN_SRC_paymentdeletion(id)
{
  return FINANCE.FIN_SRC_paymentdeletion(id);
}
function FIN_SRC_commonvalues()
{
  return FINANCE.FIN_SRC_commonvalues();
}
function FIN_SRC_CustomerPaymentDetails(customerdetails)
{
  return FINANCE.FIN_SRC_CustomerPaymentDetails(customerdetails);
}
//******************* FINANCE SEARCH UPDATE END***************************
//******************* FINANCE CHEQUE ENTRY START*******************
function CHEQUE_ENTRY_processFormSubmit(cheque_date,chequeno,chequeto,chequefor,chequeamount,chequeunit,chequecomments)
{
  return FINANCE.CHEQUE_ENTRY_processFormSubmit(cheque_date,chequeno,chequeto,chequefor,chequeamount,chequeunit,chequecomments);
}
function CHEQUE_ENTRY_commonvalues()
{
  return FINANCE.CHEQUE_ENTRY_commonvalues();
}
//******************* FINANCE CHEQUE ENTRY END*******************
//******************* FINANCE CHEQUE SEARCH UPDATE START********
function CHEQUE_SRC_commonvalues()
{
 return FINANCE.CHEQUE_SRC_commonvalues(); 
}
function CHEQUE_SRC_autocompletesearchdetails(CHEQUE_SRC_OPTION)
{
 return FINANCE.CHEQUE_SRC_autocompletesearchdetails(CHEQUE_SRC_OPTION);
}
function CHEQUE_SRC_search(CHEQUE_INPUT_1,CHEQUE_UNPUT_2,searchoptionhead)
{
  return FINANCE.CHEQUE_SRC_search(CHEQUE_INPUT_1,CHEQUE_UNPUT_2,searchoptionhead);
}
function CHEQUE_SRC_chequeupdation(chequeid,chequedate,chequeno,chequeto,chequefor,amount,unit,status,debited,comments)
{
  return FINANCE.CHEQUE_SRC_chequeupdation(chequeid,chequedate,chequeno,chequeto,chequefor,amount,unit,status,debited,comments);
}

//******************* FINANCE CHEQUE SEARCH UPDATE END********
//******************* FINANCE MODEL ENTRY START ********
function MODEL_ENTRY_existingmodels(modelname)
{
  return FINANCE.MODEL_ENTRY_existingmodels(modelname); 
}
function FIN_OCBC_MODEL_ENTRY_processFormSubmit(MODEL_ENTRY_details)
{
  return FINANCE.FIN_OCBC_MODEL_ENTRY_processFormSubmit(MODEL_ENTRY_details);
}
//******************* FINANCE MODEL ENTRY END ********
//******************* FINANCE MODEL SEARCH UPDATE START********
function MODEL_SRC_commonvalues()
{
  return FINANCE.MODEL_SRC_commonvalues(); 
}
function MODEL_SRC_processFormSubmit(modelname)
{
  return FINANCE.MODEL_SRC_processFormSubmit(modelname);
}
function MODEL_SRC_existingmodels(modelname)
{
  return FINANCE.MODEL_SRC_existingmodels(modelname);
}
function MODEL_SRC_modelupdation(modelname,modelid,obsolute)
{
  return FINANCE.MODEL_SRC_modelupdation(modelname,modelid,obsolute);
}
function MODEL_SRC_modeldeletion(id)
{
  return FINANCE.MODEL_SRC_modeldeletion(id);
}
//******************* FINANCE MODEL SEARCH UPDATE END********
//******************* FINANCE BANK TT ENTRY START ********
function BANKTT_ENTRY_Customer(unit)
{
  return FINANCE.BANKTT_ENTRY_Customer(unit);
}
function BANKTT_ENTRY_commonvalues()
{
  return FINANCE.BANKTT_ENTRY_commonvalues();
}
function BANKTT_ENTRY_processFormSubmit(BANKTT_ENTRY_DETAILS)
{
  return FINANCE.BANKTT_ENTRY_processFormSubmit(BANKTT_ENTRY_DETAILS);
}
//******************* FINANCE BANK TT ENTRY END ********
//******************* FINANCE BANK TT SEARCH UPDATE START********
function BANKTT_SRC_Customer(unit)
{
  return FINANCE.BANKTT_SRC_Customer(unit);
}
function BANKTT_SRC_accountnamesearch()
{
  return FINANCE.BANKTT_SRC_accountnamesearch();
}
function BANKTT_SRC_commonvalues()
{
  return FINANCE.BANKTT_SRC_commonvalues();
}
function BANKTT_SRC_searchoption(BANKTT_SRC_input1,BANKTT_SRC_input2,option)
{
  return FINANCE.BANKTT_SRC_searchoption(BANKTT_SRC_input1,BANKTT_SRC_input2,option);
}
function BANKTT_SRC_processFormUpdate(updationrecords)
{
  return FINANCE.BANKTT_SRC_processFormUpdate(updationrecords);
}
//******************* FINANCE BANK TT SEARCH UPDATE END********
//******************* FINANCE DEPOSIT DEDUCTION CALCULATION START********
//GET THE UNIT  FOR LOAD IN THE  FORM//
function DDC_getunitlistbox(DDC_flag)
{
  return FINANCE.DDC_getunitlistbox(DDC_flag);
}
//GET THE REC_VER , START DATE AND END DATE FOR THE SELECTED CUSTOMER NAME AND UNIT NO    
function DDC_loaddatebox(DDC_getcustid,DDC_name,DDC_unitno)
{ 
  return FINANCE.DDC_loaddatebox(DDC_getcustid,DDC_name,DDC_unitno);
}
//CALCULATION FUNCTION//
function DDC_Dep_Cal_submit(formallid)
{
  return FINANCE.DDC_Dep_Cal_submit(formallid);
}
//******************* FINANCE DEPOSIT DEDUCTION CALCULATION END********
//******************* FINANCE DEPOSIT DEDUCTION EXTRACT PDF START********
//GET THE SHEET AND MONTH PRESENT IN THE SELECTED  SHEET  NAME.............
function DDE_getmonth()
{
  return FINANCE.DDE_getmonth();
}
//SORTING THE MONTH PRESENT IN THE SHEET...............
function DDE_Dep_Exct_monthstring(a,b)
{
  return FINANCE.DDE_Dep_Exct_monthstring(a,b);
}
//GET THE CUSTOMER NAME PRESENT IN THE SELECTED SHEET NAME..............
function DDE_customername(unit,month)
{ 
  return FINANCE.DDE_customername(unit,month);
}
//SORTING  THE  NAME  GETTING FROM THE SELECTED  SHEET ...................
function DDE_Dep_Exct_string(a,b)
{
  return FINANCE.DDE_Dep_Exct_string(a,b);
}
//GET THE UNIT NO FROM THE SELECTED  SHEET NAME...............
function DDE_getsheetunit(sheetname)
{
  return FINANCE.DDE_getsheetunit(sheetname);
}
function DDE_Dep_Exct_numeric(a,b)
{
  return FINANCE.DDE_Dep_Exct_numeric(a,b);
}
//GETTING CUSTOMER ID OF THE  SELECTED CUSTOMER NAME......................
function DDE_getcustid(name,DDE_unit,DDE_month)
{ 
  return FINANCE.DDE_getcustid(name,DDE_unit,DDE_month);
}
//GETTING THE  REC_VER ,START DATE ,END DATE FOR THE SELECTED UNIT NO  AND SELECTED CUSTOMER NAME............
function DDE_Dep_Exct_recversionfun(getid,DDE_unit,DDE_month,name)
{
  return FINANCE.DDE_Dep_Exct_recversionfun(getid,DDE_unit,DDE_month,name);
}
//GETTING THE  START DATE AND END DATE FOR THE SELECTED REC_VERSION.............
function DDE_Dep_Exct_errmsgfun(getrec)
{
  return FINANCE.DDE_Dep_Exct_errmsgfun(getrec);
}
// MAIL SEND FOR THE SELECTED REC_VER  IN THE SINGLE  MAIL WITH ATTACHMENT OF FILES...........
function DDE_Dep_Exct_submit(formallid)
{  
  return FINANCE.DDE_Dep_Exct_submit(formallid);
}
//SORTING THE REC_VER ,START DATE  AND END DATE//
function DDE_Dep_Exct_mixing(a,b)
{
  return FINANCE.DDE_Dep_Exct_mixing(a,b);
}
//******************* FINANCE DEPOSIT DEDUCTION EXTRACT PDF END********
//******************* FINANCE OCBC START********
function FIN_OCBC_Customer(unit,no)
{
  return FINANCE.FIN_OCBC_Customer(unit,no);
}
function FIN_OCBC_DU_selectedmonthdetails(date)
{
  return FINANCE.FIN_OCBC_DU_selectedmonthdetails(date);
}
function FIN_OCBC_recordssave(no,unit,customer,recver,payment,amount,amountflag,forperiod,comments)
{
  return FINANCE.FIN_OCBC_recordssave(no,unit,customer,recver,payment,amount,amountflag,forperiod,comments);
}
function FIN_OCBC_DU_commonvalues()
{
  return FINANCE.FIN_OCBC_DU_commonvalues();
}
function FIN_OCBC_FORPERIOD_validation(unit,customer,id)
{
  return FINANCE.FIN_OCBC_FORPERIOD_validation(unit,customer,id);
}
//******************* FINANCE OCBC END********
//******************* FINANCE OPL  START********IZ
function FIN_OPL_opllist(opl)
{
  return FINANCE.FIN_OPL_opllist(opl); 
}
function FIN_OPL_moveFileToFolder(fileId, targetFolderId) 
{
  return FINANCE.FIN_OPL_moveFileToFolder(fileId, targetFolderId);
}
function FIN_OPL_commonvalues()
{
  return FINANCE.FIN_OPL_commonvalues();
}
//******************* FINANCE OPL  END********
//******************* REPORT START********
//FUNCTION TO FETCHING ERROR MESSAGE FROM SQL TABLE
function REP_getdomain_err()
{
return REPORT.REP_getdomain_err();
}
//FUNCTION FOR ALL SEARCH BY CATAGORY REPORT
function REP_func_load_searchby_option(REP_report_optionfetch)
{																	
return  REPORT.REP_func_load_searchby_option(REP_report_optionfetch);																		
}
// FUNCTION FOR SHOW THE DATA IN SS
function REP_ss_getdatas(REP_id,REP_name,REP_emailid,REP_catagry,REP_dtepickmonth)
{
  return REPORT.REP_ss_getdatas(REP_id,REP_name,REP_emailid,REP_catagry,REP_dtepickmonth);
}
//FUNCTION FOR EMPLOYEE INVENTORY CARD REPORT       
function REP_employee(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
{
  return REPORT.REP_employee(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
}
//FUNCTION FOR ACTIVE CUSTOMER REPORT
function REP_activecustomer(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
{
  return REPORT.REP_activecustomer(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
}
//FUNCTION FOR LOGIN AND STARHUB DETAILS REPORT
function REP_login(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
{
  return REPORT.REP_login(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
}
//FUNCTION FOR ACTIVE UNIT REPORT
function REP_active(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
{
  return REPORT.REP_active(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
}
//FUNCTION FOR CURRENT MONTH EXPIRY REPORT
function REP_currentmonth(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
{
  return REPORT.REP_currentmonth(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
}
//FUNCTION FOR NON ACTIVE UNIT REPORT
function REP_nonactive(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
{
  return REPORT.REP_nonactive(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
}
//FUNCTION FOR UNIT INVENTORY CARD REPORT
function REP_inventorycard(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
{
  return REPORT.REP_inventorycard(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
}
//FUNCTION FOR UNIT DOORCODE REPORT
function REP_doorcode(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
{
  return REPORT.REP_doorcode(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
}
//FUNCTION FOR EXPENSE REPORT
function REP_expense(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread,REP_dtepickmonth)
{
  return REPORT.REP_expense(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread,REP_dtepickmonth);
}
//FUNCTION FOR NON ACTIVE UNTERMINATE UNIT REPORT
function REP_nonactiveunterminateunit(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
{
  return REPORT.REP_nonactiveunterminateunit(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
}
//FUNCTION FOR CUSTOMER DETAILS REPORT
function REP_customerdetails(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread)
{
  return REPORT.REP_customerdetails(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread);
}
//FUNCTION FOR ERM LEEDS REPORT
function REP_ermleeds(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread,REP_utstrdte,REP_utenddte)
{
  return REPORT.REP_ermleeds(REP_id,REP_name,REP_emailid,REP_Sheet,REP_newspread,REP_utstrdte,REP_utenddte);
}
//******************* REPORT END********
//******************* REPORT TICKLER HISTORY START********
//FUNCTION FOR FETCHING ERROR MESSAGE FROM SQL TABLE
function TH_get_err()
{
  return REPORT.TH_get_err();
}
//FUNCTION FOR AUTOCOMPLETE CUSTOMER NAME
function TH_customername_autocomplete()
{
  return REPORT.TH_customername_autocomplete();
}
// FUNCTION FOR SHOW THE DATA IN TABLE
function TH_flextabel_getdatas(TH_customername)
{																	
  return REPORT.TH_flextabel_getdatas(TH_customername);																		
}
//******************* REPORT TICKLER HISTORY END********
//******************* REPORT CHART START********
//FUNCTION TO RETURN SEARCH OPTION
function CHART_func_srchtype_errmsg()
{
  return REPORT.CHART_func_srchtype_errmsg(); 
}
//FUNCTION TO RETURN COMMON VALUES
function CHART_func_srchopt_type(CHART_srchtype_val)
{
  return REPORT.CHART_func_srchopt_type(CHART_srchtype_val); 
}
//FUNCTION TO RETURN COMMON VALUES
function CHART_func_expense_perunit(CHART_unitno,CHART_unit_fdate,CHART_unit_tdate,CHART_srchdata,CHART_flag_date)
{
  return REPORT.CHART_func_expense_perunit(CHART_unitno,CHART_unit_fdate,CHART_unit_tdate,CHART_srchdata,CHART_flag_date); 
}
//******************* REPORT CHART END********
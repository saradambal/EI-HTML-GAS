//<!--*********************************************************************************************************//-->
//<!--//*******************************************FILE DESCRIPTION*********************************************//
//<!--***********************************************CHARTS***********************************************//-->
//<!--DONE BY:PUNI
//VER 1.1- TRACKER NO:585,SD:06/10/2014,ED:06/10/2014,corrected some preloader n msgbox position
//<!--DONE BY:SARADAMBAL
//VER 1.0- TRACKER NO:585,SD:20/09/2014 ED:20/09/2014,implemented script for preloader,msgbox 
//VER 0.09-TRACKER NO:585,SD:14/08/2014 ED:14/08/2014,updated new links,cheked sp after changed in decimal (10,2)
//VER 0.08-TRACKER NO:585,SD:03/07/2014,ED:03/07/2014,checked biz net revenue sp and implemented script for adding header 
//VER 0.07-TRACKER NO:585,SD:19/06/2014,ED:19/06/2014,Updated failure function
//VER 0.06-TRACKER NO:585,SD:07/06/2014,ED:07/06/2014,Updated new link
//VER 0.05-TRACKER NO:585,SD:31/05/2014,ED:31/05/2014 give class name for dp,cleared personal net revenue issue(show net instead of gross)
//VER 0.04-TRACKER NO:585,SD:14/05/2014,ED:21/05/2014 CHECKED TEMP TABLE SP THROUGH FORM,cleared issue for chart and data table for second time coming
//VER 0.03-TRACKER NO:585,SD:08/05/2014,ED:08/05/2014 ADDED RETURN FUNCTION
//VER 0.02-TRACKER NO:585,SD:21/02/2014,ED:25/02/2014 add the google api for chart and data table
//VER 0.01-INITIAL VERSION,TRACKER NO:585,SD:03/12/2013,ED:05/09/2013-->
try
{
  /*-----------------------------------FUNCTION TO GET SEARCH TYPE,DATA,UNIT NO & ERROR MSG---------------------*/
  function CHART_func_srchtype_errmsg(){
    var CHART_arr_unitno =[];    
    var CHART_Searchoption_array=[];  
    var CHART_conn =eilib.db_GetConnection()
    var CHART_arr_errmsg =eilib.GetErrorMessageList(CHART_conn, "391,394");
    var CHART_stmt_unitno = CHART_conn.createStatement();
    var CHART_select_unitno = "SELECT UNIT_NO FROM VW_ACTIVE_UNIT WHERE UD_NON_EI IS NULL ORDER BY UNIT_NO ASC";
    var CHART_rs_unitno = CHART_stmt_unitno.executeQuery(CHART_select_unitno);
    while(CHART_rs_unitno.next())
      CHART_arr_unitno.push(CHART_rs_unitno.getString(1));
    var CHART_creatStatement = CHART_conn.createStatement()     
    var CHART_config_select= "SELECT CGN_ID,CGN_TYPE FROM CONFIGURATION WHERE CGN_ID IN (62,63,64,65) ORDER BY CGN_TYPE ASC";
    var CHART_Searchoption_rs = CHART_creatStatement.executeQuery(CHART_config_select);
    while(CHART_Searchoption_rs.next())
      CHART_Searchoption_array.push({CHART_key:CHART_Searchoption_rs.getString(1),CHART_value:CHART_Searchoption_rs.getString(2)})
      var CHART_res_err_srchtype={"CHART_obj_errmsg":CHART_arr_errmsg.errormsg,"CHART_obj_unitno":CHART_arr_unitno,"CHART_obj_srchtype":CHART_Searchoption_array}
      CHART_creatStatement.close();CHART_stmt_unitno.close(); CHART_conn.close();
    return CHART_res_err_srchtype;
  }
  /*--------------------------------------FUNCTION TO FETCH THE DATE FOR TYPE SEARCHOPTION----------------------*/
  function CHART_func_srchopt_type(CHART_srchtype_val){
    var CHART_conn =eilib.db_GetConnection(),CHART_stmt_data = CHART_conn.createStatement();
    var CHART_opt_key = {62:"9,10,11,12,13",63:"14,15,16,17,18",64:"19,20,21,22",65:"23,24,25,26,27"}; 
    var CHART_select_reportconf= "SELECT RCN_ID,RCN_DATA FROM REPORT_CONFIGURATION WHERE RCN_ID IN ("+CHART_opt_key[CHART_srchtype_val]+") ORDER BY RCN_DATA ASC";
    var  CHART_arr_srchdata=[]; 
    var CHART_rs_data = CHART_stmt_data.executeQuery(CHART_select_reportconf);
    while(CHART_rs_data.next())
      CHART_arr_srchdata.push({CHART_key:CHART_rs_data.getString(1),CHART_value:CHART_rs_data.getString(2)})
      CHART_stmt_data.close(); CHART_conn.close();
    return CHART_arr_srchdata;
  }
  /*-------------------------------------FUNCTION TO FETCH THE EXPENSE PER UNIT--------------------------*/
  function CHART_func_expense_perunit(CHART_unitno,CHART_unit_fdate,CHART_unit_tdate,CHART_srchdata,CHART_flag_date){
    var CHART_conn =eilib.db_GetConnection();
    var CHART_flex_twodimens_arr=[];
    if((CHART_flag_date=='CHART_flag_month_allunit')||(CHART_flag_date=='CHART_flag_daterange_allunit')){
      var CHART_dateamt_unitno={
        9:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_BIZ_EXPENSE_ALLUNIT','UNITNO^CARPARK^DIGITAL VOICE^ELECTRICITY^FACILITY USE^MOVING IN AND OUT^STARHUB^UNIT EXPENSE',"SP_CHARTS_BIZ_EXPENSE_ALLUNIT('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        10:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_BIZ_EXPENSE_ALLUNIT','UNITNO^CARPARK^DIGITAL VOICE^ELECTRICITY^FACILITY USE^MOVE IN OUT^STARHUB^UNIT EXPENSE',"SP_CHARTS_BIZ_EXPENSE_ALLUNIT('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        11:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_SINGLE_EXPENSE_ALLUNIT','UNITNO^ELECTRICITY',"SP_CHARTS_SINGLE_EXPENSE_ALL_UNIT('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','EXPENSE_DETAIL_ELECTRICITY','EXPENSE_ELECTRICITY','EE.EE_AMOUNT','EE.EE_INVOICE_DATE','EDE_ID','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        12:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_SINGLE_EXPENSE_ALLUNIT','UNITNO^STARHUB',"SP_CHARTS_SINGLE_EXPENSE_ALL_UNIT('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','EXPENSE_DETAIL_STARHUB','EXPENSE_STARHUB','EE.ESH_AMOUNT','EE.ESH_INVOICE_DATE','EDSH_ID','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        13:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_SINGLE_EXPENSE_ALLUNIT','UNITNO^UNIT EXPENSE',"SP_CHARTS_SINGLE_EXPENSE_ALL_UNIT('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','','EXPENSE_UNIT','EXP.EU_AMOUNT','EXP.EU_INVOICE_DATE','EU_ID','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        19:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_SINGLE_PERSONAL_EXPENSE','MONTH^BABY EXPENSE',"SP_CHARTS_SINGLE_PERSONAL_EXPENSE('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','EXPENSE_BABY','EB_AMOUNT','EB_INVOICE_DATE','EB_ID','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        20:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_SINGLE_PERSONAL_EXPENSE','MONTH^CAR EXPENSE',"SP_CHARTS_SINGLE_PERSONAL_EXPENSE('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','EXPENSE_CAR','EC_AMOUNT','EC_INVOICE_DATE','EC_ID','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        23:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_SINGLE_PERSONAL_EXPENSE','MONTH^AGENT',"SP_CHARTS_SINGLE_PERSONAL_EXPENSE('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','EXPENSE_AGENT','EA_COMM_AMOUNT','EA_DATE','EA_ID','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        24:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_SINGLE_PERSONAL_EXPENSE','MONTH^SALARY',"SP_CHARTS_SINGLE_PERSONAL_EXPENSE('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','EXPENSE_STAFF_SALARY','ESS_SALARY_AMOUNT','ESS_INVOICE_DATE','ESS_ID','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        25:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_SINGLE_PERSONAL_EXPENSE','MONTH^STAFF',"SP_CHARTS_SINGLE_PERSONAL_EXPENSE('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','EXPENSE_STAFF','ES_INVOICE_AMOUNT','ES_INVOICE_DATE','ES_ID','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        26:['MONTH-YEAR,AGENT COMMISSION,SALARY ENTRY,STAFF EXPENSE','TEMP_CHARTS_STAFF_EXPENSE','MONTH^AGENT COMMISSION^SALARY ENTRY^STAFF EXPENSE',"SP_CHARTS_STAFF_EXPENSE('"+CHART_unit_fdate+"' ,'"+CHART_unit_tdate+"','"+UserStamp+"',@TEMP_TABLE_CHART)"],                       
        27:['MONTH-YEAR,AGENT COMMISSION,SALARY ENTRY,STAFF EXPENSE','TEMP_CHARTS_STAFF_EXPENSE','MONTH^AGENT COMMISSION^SALARY ENTRY^STAFF EXPENSE',"SP_CHARTS_STAFF_EXPENSE('"+CHART_unit_fdate+"' ,'"+CHART_unit_tdate+"','"+UserStamp+"',@TEMP_TABLE_CHART)"],                       
        15:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_GROSS_REVEUE_ALLUNIT','UNITNO^GROSS REVENUE',"SP_CHARTS_GROSS_REVENUE_ALLUNIT('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        14:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_BIZ_NET_REVENUE_ALLUNIT','UNITNO^GROSS REVENUE^TOTAL RENTAL BIZ^NET REVENUE^UNIT RENTAL^TOTAL BIZ',"SP_CHARTS_BIZ_NET_REVENUE_ALLUNIT('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        17:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_PERSONAL_NET_REVENUE','MONTH^GROSS REVENUE^RENTAL AND EXPENSE^NET REVENUE^UNIT RENTAL^BIZ^STAFF^PERSONAL',"SP_CHARTS_PERSONAL_NET_REVENUE('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        16:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_GROSS_REVENUE_AND_NET_REVENUE','MONTH^GROSS REVENUE^RENTAL AND EXPENSE^NET REVENUE^UNIT RENTAL^BIZ^STAFF^PERSONAL',"SP_CHARTS_GROSS_REVENUE_AND_NET_REVENUE('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        21:['MONTH-YEAR,BABY_EXPENSES,CAR_EXPENSES,CAR_LOAN,PERSONAL_EXPENSES','TEMP_CHARTS_PERSONAL_EXPENSE','MONTH^BABY^CAR^CAR LOAN^PERSONAL EXPENSE',"SP_CHARTS_PERSONAL_EXPENSE('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        22:['MONTH-YEAR,BABY_EXPENSES,CAR_EXPENSES,CAR_LOAN,PERSONAL_EXPENSES','TEMP_CHARTS_PERSONAL_EXPENSE','MONTH^BABY^CAR^CAR LOAN^PERSONAL EXPENSE',"SP_CHARTS_PERSONAL_EXPENSE('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        18:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_UNIT_GROSS_NET_REVENUE_ALLUNIT','UNIT NUMBER^GROSS REVENUE^TOTAL RENTAL BIZ^NET REVENUE^UNIT RENTAL^TOTAL BIZ',"SP_CHARTS_UNIT_GROSS_NET_REVENUE_ALLUNIT('"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','"+UserStamp+"',@TEMP_TABLE_CHART)"]     
      }}
    else{
      var CHART_dateamt_unitno={
        11:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_SINGLE_EXPENSE_PERUNIT','MONTH^ELECTRICITY',"SP_CHARTS_SINGLE_EXPENSE_PERUNIT("+CHART_unitno+",'"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','EXPENSE_DETAIL_ELECTRICITY','EXPENSE_ELECTRICITY','EE.EE_AMOUNT','EE.EE_INVOICE_DATE','EDE_ID','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        12:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_SINGLE_EXPENSE_PERUNIT','MONTH^STARHUB',"SP_CHARTS_SINGLE_EXPENSE_PERUNIT("+CHART_unitno+",'"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','EXPENSE_DETAIL_STARHUB','EXPENSE_STARHUB','EE.ESH_AMOUNT','EE.ESH_INVOICE_DATE','EDSH_ID','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        13:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_SINGLE_EXPENSE_PERUNIT','MONTH^UNIT EXPENSE',"SP_CHARTS_SINGLE_EXPENSE_PERUNIT("+CHART_unitno+",'"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','EXPENSE_DETAIL_ELECTRICITY','EXPENSE_UNIT','EXP.EU_AMOUNT','EXP.EU_INVOICE_DATE','EU_ID','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        26:['MONTH-YEAR,AGENT COMMISSION,SALARY ENTRY,STAFF EXPENSE','TEMP_CHARTS_STAFF_EXPENSE','AGENT COMMISSION^SALARY ENTRY^STAFF EXPENSE',"SP_CHARTS_STAFF_EXPENSE("+CHART_unit_fdate+","+CHART_unit_tdate+",'"+UserStamp+"',@TEMP_TABLE_CHART)"],
        9:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_BIZ_EXPENSE_PERUNIT','MONTH^CARPARK^DIGITAL VOICE^ELECTRICITY^FACILITY USE^MOVING IN AND OUT^STARHUB^UNIT EXPENSE',"SP_CHARTS_BIZ_EXPENSE_PERUNIT("+CHART_unitno+",'"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        15:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_GROSS_REVEUE_PERUNIT','MONTH^GROSS REVENUE',"SP_CHARTS_GROSS_REVENUE_PERUNIT("+CHART_unitno+",'"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        14:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_BIZ_NET_REVENUE_PERUNIT','MONTH^GROSS REVENUE^TOTAL RENTAL BIZ^NET REVENUE^UNIT RENTAL^TOTAL BIZ',"SP_CHARTS_BIZ_NET_REVENUE_PERUNIT("+CHART_unitno+",'"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','"+UserStamp+"',@TEMP_TABLE_CHART)"],
        18:['UNIT_NO,INVOICE_DATE,AMOUNT','TEMP_CHARTS_UNIT_GROSS_NET_REVENUE_PERUNIT','MONTH^GROSS REVENUE^TOTAL RENTAL BIZ^NET REVENUE^UNIT RENTAL^TOTAL BIZ',"SP_CHARTS_UNIT_GROSS_AND_NET_REVENUE_PERUNIT("+CHART_unitno+",'"+CHART_unit_fdate+"','"+CHART_unit_tdate+"','"+UserStamp+"',@TEMP_TABLE_CHART)"]     
      }}   
    /*----------------------------------------CALLING SP AND SELECT QUERY TO GET DATAS--------------------------------------------*/
    var CHART_select_reportconf= "CALL "+CHART_dateamt_unitno[CHART_srchdata][3]+"";
    var CHART_stmt_data = CHART_conn.createStatement(); 
    CHART_stmt_data.execute(CHART_select_reportconf);    
    CHART_stmt_data.close();
    var CHART_stmt_temptble = CHART_conn.createStatement();
    var CHART_rs_temptble  = CHART_stmt_temptble.executeQuery("SELECT @TEMP_TABLE_CHART");
    while(CHART_rs_temptble.next()){   
      var CHART_temptblename= CHART_rs_temptble.getString("@TEMP_TABLE_CHART");
    }
    CHART_rs_temptble.close();CHART_stmt_temptble.close();
    var CHART_select_unit= "SELECT * FROM "+CHART_temptblename+"";
    var CHART_stmt_sel = CHART_conn.createStatement();
    var CHART_rs_unit = CHART_stmt_sel.executeQuery(CHART_select_unit);  
    var CHART_tbleheader=CHART_dateamt_unitno[CHART_srchdata][2].split('^');
    CHART_flex_twodimens_arr.push(CHART_tbleheader);
    while(CHART_rs_unit.next()){      
      var CHART_flex_arr=[],CHART_Totalcolumns=CHART_tbleheader.length; 
      for(var x=1; x<=CHART_Totalcolumns; x++){  
        if(x==1)
          CHART_flex_arr.push(CHART_rs_unit.getString(x)); 
        else              
          CHART_flex_arr.push(parseFloat(CHART_rs_unit.getString(x)));        
      }
      CHART_flex_twodimens_arr.push(CHART_flex_arr);
    }  
    CHART_rs_unit.close();CHART_stmt_sel.close();
    var CHART_res_invoice_exp={"CHART_obj_flexarr":CHART_flex_twodimens_arr};
    var CHART_temp_stmt= CHART_conn.createStatement();
    CHART_temp_stmt.execute("DROP TABLE "+CHART_temptblename+"");
    CHART_temp_stmt.close();
    return CHART_res_invoice_exp;
  }
}
catch(err){
}
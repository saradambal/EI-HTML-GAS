//*******************************************FILE DESCRIPTION*********************************************//
//*******************************************PERSONAL EXPENSE ENTRY*********************************************//
//DONE BY PUNI
//VER 1.6-SD:09/10/2014 ED:09/10/2014,TRACKER NO:736,1.added script to hide preloader after menu n form loads,2.changed preloader n msgbox position
//DONE BY SARADAMBAL
//VER 1.5-SD:21/09/2014 ED:21/09/2014,TRACKER NO:736,changed script for db validation n removed trime function invitem n comments except inv from n removed preloader position script
//VER 1.4-SD:05/08/2014 ED:01/09/2014,TRACKER NO:736,implemented script for inv from and inv item by adding ^^ & pass in sp,updated new links,script for autogrow
//VER 1.3-SD:11/06/2014 ED:11/06/2014,TRACKER NO:736,implemented script for commit and failure function 
//VER 1.2-SD:06/06/2014 ED:06/06/2014,TRACKER NO:736,updated new link
//VER 1.1-SD:28/05/2014 ED:29/05/2014,TRACKER NO:736//cleared issue (http network connection) changed type=submit as type=button
//VER 1.0-SD:19/04/2014 ED:19/04/2014,TRACKER NO:736//cleared script error issue in personal type of invoice from ,and refresh that data after insertion
//VER 0.09-SD:05/04/2014 ED:07/04/2014,TRACKER NO:736//cleared alignment,implement eilib for errormsg,implement uldid instead of userstamp,show one row after insertion in multirow and implemented sp for multirow creation,implemented datemantory class for date picker,implemented flag for insertion whether the data is saved or not
//VER 0.08 SD:27/02/2014 ED:27/02/2014 TRACKER NO:395//REPLACE USERSTAMP INTO ULD_ID USING EILIB FUNCTION
//DONE BY:ELANGO
//VER 0.07-SD:09/01/2014 ED:23/01/2014,TRACKER NO:395//REDUCE THE CODING AND QUERY AND CHECK THE VALIDATION.
//VER 0.06-SD:28/12/2013 ED:28/12/2013,TRACKER NO:395//CHANGE THE HEADER TAG AND CONNECTION FORMATE.
//VER 0.05-SD:18/12/2013 ED:19/12/2013,TRACKER NO:395//CHECK THE SUBMITBUTTON VALIDATION AND CLEAR THE MULTIROW.
//VER 0.04-SD:30/11/2013 ED:30/11/2013,TRACKER NO:395//UPDATE THE VER COMMENDS.
//VER 0.03-SD:05/10/2013 ED:08/11/2013,TRACKER NO:395-UPDATE CHANGE THE SIZE OF CREATED ELEMENTS IN REQUIRED SIZE,CHANGED THE VALIDATION IN ALL FORMS .
//VER 0.02-SD:02/10/2013 ED:03/10/2013,TRACKER NO:395-UPDATE DATEFORMATE.
//VER 0.01-INITIAL VERSION, SD:16/09/2013 ED:18/9/2013,TRACKER NO:395
//*********************************************************************************************************//
try
{
  //GET THE TYPE OF EXPENSE//
  function PDLY_INPUT_gettypofexpense()
  {
    var PDLY_INPUT_allarrayexpenseArray=[];
    var PDLY_INPUT_expenseArray=[];
    var PDLY_INPUT_conn=eilib.db_GetConnection();
    var PDLY_INPUT_selectecn_data =" SELECT ECN_ID, ECN_DATA FROM EXPENSE_CONFIGURATION WHERE CGN_ID IN (21,22,24,25)";
    var PDLY_INPUT_personalstmt = PDLY_INPUT_conn.createStatement();
    var PDLY_INPUT_expenseList = PDLY_INPUT_personalstmt.executeQuery(PDLY_INPUT_selectecn_data);
    while(PDLY_INPUT_expenseList.next())
    {
      var PDLY_INPUT_personalExpenseid = PDLY_INPUT_expenseList.getString("ECN_ID");
      var PDLY_INPUT_personalExpensedata = PDLY_INPUT_expenseList.getString("ECN_DATA");
      var   PDLY_INPUT_personalExpense={"PDLY_INPUT_personalExpenseid":PDLY_INPUT_personalExpenseid,"PDLY_INPUT_personalExpensedata":PDLY_INPUT_personalExpensedata}
      PDLY_INPUT_expenseArray.push(PDLY_INPUT_personalExpense);
    }
    PDLY_INPUT_allarrayexpenseArray.push(PDLY_INPUT_expenseArray);
    PDLY_INPUT_expenseList.close();   PDLY_INPUT_personalstmt.close();
    var PDLY_INPUT_conformmsgArray=[];
    PDLY_INPUT_conformmsgArray=eilib.GetErrorMessageList(PDLY_INPUT_conn,'105,400');    
    PDLY_INPUT_allarrayexpenseArray.push(PDLY_INPUT_conformmsgArray.errormsg);    
    PDLY_INPUT_conn.close();
    return PDLY_INPUT_allarrayexpenseArray;
  }
  //SAVE THE MULTIROW DATAS//
  function PDLY_INPUT_savebabypersonal(PDLY_INPUT_formallid)
  {
    var PDLY_INPUT_conn=eilib.db_GetConnection();
    var  PDLY_INPUT_typelistdb=PDLY_INPUT_formallid.PDLY_INPUT_lb_typelist;
    var PDLY_INPUT_expenselistdb=PDLY_INPUT_formallid.PDLY_INPUT_lb_category;
    var PDLY_INPUT_expenselist=PDLY_INPUT_formallid.PDLY_INPUT_lb_category;
    var PDLY_INPUT_invoiceDate=PDLY_INPUT_formallid.PDLY_INPUT_db_invdate;
    var PDLY_INPUT_in_items=PDLY_INPUT_formallid.PDLY_INPUT_ta_invitem;
    var PDLY_INPUT_invoiceAmount=PDLY_INPUT_formallid.PDLY_INPUT_tb_incamtrp;
    var PDLY_INPUT_inv_from=PDLY_INPUT_formallid.PDLY_INPUT_tb_invfrom;
    var PDLY_INPUT_comments1=PDLY_INPUT_formallid.PDLY_INPUT_tb_comments;
    var PDLY_INPUT_comments_split='';var PDLY_INPUT_invfrom_split='';var PDLY_INPUT_invitem_split='';
    var PDLY_INPUT_ref_invoicefrom=[];
    if((Array.isArray(PDLY_INPUT_inv_from))==true){
      for(var i=0;i<PDLY_INPUT_inv_from.length;i++)
      {
        if(PDLY_INPUT_comments1[i]==''){
          if(i==0)
            PDLY_INPUT_comments_split +=' '
            else
              PDLY_INPUT_comments_split +='^^'+' '; }
        else{
          if(i==0){
            PDLY_INPUT_comments_split +=eilib.ConvertSpclCharString(PDLY_INPUT_comments1[i]);
          }
          else{
            PDLY_INPUT_comments_split +='^^'+eilib.ConvertSpclCharString(PDLY_INPUT_comments1[i]);
          }  }
        if(i==0){
          PDLY_INPUT_invitem_split +=eilib.ConvertSpclCharString(PDLY_INPUT_in_items[i]);
          PDLY_INPUT_invfrom_split +=eilib.ConvertSpclCharString(PDLY_INPUT_inv_from[i]);
        }
        else{
          PDLY_INPUT_invitem_split +='^^'+eilib.ConvertSpclCharString(PDLY_INPUT_in_items[i]);
          PDLY_INPUT_invfrom_split +='^^'+eilib.ConvertSpclCharString(PDLY_INPUT_inv_from[i]);
        }
        PDLY_INPUT_invoiceDate[i]=eilib.SqlDateFormat(PDLY_INPUT_invoiceDate[i]);
      }}
    else
    {
      if(PDLY_INPUT_comments1=='')
        PDLY_INPUT_comments_split='';
      else
        PDLY_INPUT_comments_split=eilib.ConvertSpclCharString(PDLY_INPUT_comments1);
      PDLY_INPUT_invfrom_split=eilib.ConvertSpclCharString(PDLY_INPUT_inv_from);
      PDLY_INPUT_invitem_split=eilib.ConvertSpclCharString(PDLY_INPUT_in_items);
      PDLY_INPUT_invoiceDate=eilib.SqlDateFormat(PDLY_INPUT_invoiceDate);
    }
    if(PDLY_INPUT_typelistdb==36)
    {       
      var PDLY_INPUT_insertintoExpense_Baby_withComment = "CALL SP_PERSONALBABY_INSERT('"+PDLY_INPUT_expenselist+"','"+PDLY_INPUT_invoiceDate+"','"+PDLY_INPUT_invoiceAmount+"','"+PDLY_INPUT_invitem_split+"','"+PDLY_INPUT_invfrom_split+"','"+PDLY_INPUT_comments_split+"','"+UserStamp+"',@FLAG_INSERT)";
      var PDLY_INPUT_stmtstaff = PDLY_INPUT_conn.createStatement();
      PDLY_INPUT_stmtstaff.execute(PDLY_INPUT_insertintoExpense_Baby_withComment);
      PDLY_INPUT_stmtstaff.close();
    }
    if(PDLY_INPUT_typelistdb==37)
    {
      var  PDLY_INPUT_ExpensePersonal_withComment = "CALL SP_PERSONAL_INSERT('"+PDLY_INPUT_expenselist+"','"+PDLY_INPUT_invoiceDate+"','"+PDLY_INPUT_invoiceAmount+"','"+PDLY_INPUT_invitem_split+"','"+PDLY_INPUT_invfrom_split+"','"+PDLY_INPUT_comments_split+"','"+UserStamp+"',@FLAG_INSERT)";
      var PDLY_INPUT_stmtstaff = PDLY_INPUT_conn.createStatement();
      PDLY_INPUT_stmtstaff.execute(PDLY_INPUT_ExpensePersonal_withComment);
      PDLY_INPUT_stmtstaff.close();
      PDLY_INPUT_ref_invoicefrom=PDLY_INPUT_getinvoicefrom();
    }
    var PDLY_INPUT_stmtstaff_select = PDLY_INPUT_conn.createStatement();    
    var PDLY_INPUT_rs_flag = PDLY_INPUT_stmtstaff_select.executeQuery("SELECT @FLAG_INSERT");
    if(PDLY_INPUT_rs_flag.next())
      var  PDLY_INPUT_flag_staff= PDLY_INPUT_rs_flag.getString("@FLAG_INSERT");
    PDLY_INPUT_rs_flag.close();
    PDLY_INPUT_stmtstaff_select.close();
    PDLY_INPUT_conn.close();
    return [PDLY_INPUT_flag_staff,PDLY_INPUT_ref_invoicefrom];
  }
  //SAVING PART FOR CAR EXPENSE AND CAR LOAN//
  function PDLY_INPUT_savecardetails(PDLY_INPUT_formallid)
  {
    var PDLY_INPUT_conn=eilib.db_GetConnection();
    PDLY_INPUT_conn.setAutoCommit(false);
    var PDLY_INPUT_typelist=PDLY_INPUT_formallid.PDLY_INPUT_lb_typelist;
    if(PDLY_INPUT_typelist==35)
    {
      var PDLY_INPUT_expenselist=PDLY_INPUT_formallid.PDLY_INPUT_lb_carcategory;
      var PDLY_INPUT_invoiceDate=PDLY_INPUT_formallid.PDLY_INPUT_db_carinvdate;
      PDLY_INPUT_invoiceDate=eilib.SqlDateFormat(PDLY_INPUT_invoiceDate);
      var PDLY_INPUT_in_items=PDLY_INPUT_formallid.PDLY_INPUT_ta_carinvitem;
      var PDLY_INPUT_invoiceAmount=PDLY_INPUT_formallid.PDLY_INPUT_tb_carincamtrp;
      var PDLY_INPUT_invfrom=PDLY_INPUT_formallid.PDLY_INPUT_tb_carinvfrom;
      var PDLY_INPUT_comments=PDLY_INPUT_formallid.PDLY_INPUT_tb_carcomments;
      if(PDLY_INPUT_comments=="")//COMMENTS
      {  PDLY_INPUT_comments=null;}else{
        PDLY_INPUT_comments='"'+eilib.ConvertSpclCharString(PDLY_INPUT_comments)+'"';}
      var PDLY_INPUT_insertintocarexpense = "INSERT INTO EXPENSE_CAR(ULD_ID,ECN_ID,EC_INVOICE_DATE,EC_AMOUNT,EC_INVOICE_ITEMS,EC_INVOICE_FROM,EC_COMMENTS) VALUES((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'),"+PDLY_INPUT_expenselist+",'"+PDLY_INPUT_invoiceDate+"','"+PDLY_INPUT_invoiceAmount+"','"+PDLY_INPUT_in_items+"','"+PDLY_INPUT_invfrom+"',"+PDLY_INPUT_comments+")";
      var  PDLY_INPUT_carexpstm = PDLY_INPUT_conn.createStatement();
      PDLY_INPUT_carexpstm.execute(PDLY_INPUT_insertintocarexpense);       
      PDLY_INPUT_carexpstm.close();
    }
    if(PDLY_INPUT_typelist==38)
    {
      var PDLY_INPUT_carpaiddate=PDLY_INPUT_formallid.PDLY_INPUT_db_carpaiddate;
      PDLY_INPUT_carpaiddate= eilib.SqlDateFormat(PDLY_INPUT_carpaiddate);
      var PDLY_INPUT_carfromdate=PDLY_INPUT_formallid.PDLY_INPUT_db_carfromdate;
      PDLY_INPUT_carfromdate= eilib.SqlDateFormat(PDLY_INPUT_carfromdate);
      var PDLY_INPUT_cartodate=PDLY_INPUT_formallid.PDLY_INPUT_db_cartodate;
      PDLY_INPUT_cartodate= eilib.SqlDateFormat(PDLY_INPUT_cartodate);
      var PDLY_INPUT_loanamt=PDLY_INPUT_formallid.PDLY_INPUT_tb_carloanamt;
      var PDLY_INPUT_carloancmt=PDLY_INPUT_formallid.PDLY_INPUT_ta_carloancmt;
      if(PDLY_INPUT_carloancmt=="")//COMMENTS
      {  PDLY_INPUT_carloancmt=null;}else{
        PDLY_INPUT_carloancmt='"'+eilib.ConvertSpclCharString(PDLY_INPUT_carloancmt)+'"';}
      var PDLY_INPUT_insertIntocarloanExpense ="INSERT INTO EXPENSE_CAR_LOAN(ULD_ID,ECL_PAID_DATE,ECL_FROM_PERIOD,ECL_TO_PERIOD,ECL_AMOUNT,ECL_COMMENTS) VALUES((SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'),'"+PDLY_INPUT_carpaiddate+"','"+PDLY_INPUT_carfromdate+"','"+PDLY_INPUT_cartodate+"','"+PDLY_INPUT_loanamt+"',"+PDLY_INPUT_carloancmt+")";
      var PDLY_INPUT_carloan = PDLY_INPUT_conn.createStatement();
      PDLY_INPUT_carloan.execute(PDLY_INPUT_insertIntocarloanExpense);
      PDLY_INPUT_carloan.close();
    }
    PDLY_INPUT_conn.commit();
    PDLY_INPUT_conn.close();
    return 1;
  }
  //GET THE INVOICE FROM THE PERSONAL TABLE//
  function PDLY_INPUT_getinvoicefrom()
  {
    var PDLY_INPUT_conn=eilib.db_GetConnection();
    var PDLY_INPUT_dataArray=[];
    var PDLY_INPUT_stmt=PDLY_INPUT_conn.createStatement();
    var PDLY_INPUT_expperquery="SELECT EP_INVOICE_FROM FROM EXPENSE_PERSONAL";
    var PDLY_INPUT_rs = PDLY_INPUT_stmt.executeQuery(PDLY_INPUT_expperquery);
    while(PDLY_INPUT_rs.next()) {
      if((PDLY_INPUT_rs.getString('EP_INVOICE_FROM')!=null)&&(PDLY_INPUT_rs.getString('EP_INVOICE_FROM')!=''))
      PDLY_INPUT_dataArray.push(PDLY_INPUT_rs.getString('EP_INVOICE_FROM'));
    }
    PDLY_INPUT_rs.close();
    PDLY_INPUT_stmt.close();
    PDLY_INPUT_conn.close();
    return PDLY_INPUT_dataArray;
  }
}
catch(err)
{
}

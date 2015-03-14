//<!--//*******************************************FILE DESCRIPTION*********************************************
//*******************************************DEPOSIT DEDUCTION CALCULATIONS*********************************************
//DONE BY PUNI
//VER 2.0  -SD:10/03/2015 ED:10/03/2015;CORRECTED SCRIPT TO CREATE NEW SS N INSERT CUR MONTH SHEET.
//VER 1.9  -SD:22/12/2014 ED:22/12/2014;TRACKER NO: 840//added droptemp table function from eilib for pf temp table issue
//VER 1.8  -SD:07/10/2014 ED:07/10/2014;TRACKER NO: 517//Corrected script for some preloader pos n updated prod lib links
//DONE BY SARADAMBAL M
//VER 1.7  -SD:18/09/2014 ED:18/09/2014;TRACKER NO: 517//implemented script for preloader,msgbox,implemented script for style to submit button instead of div -style
//VER 1.6- SD:14/08/2014 ED:14/08/2014,TRACKER NO: 517//updated new links
//VER 1.5 -SD:10/07/2014 ED:10/07/2014;TRACKER NO: 517//updated err msg ,if any sheet err,removed hypen for duplicate customer,hide cb for one lp
//VER 1.4 -SD:27/06/2014 ED:05/07/2014;TRACKER NO: 517//implemented script for add editors (from the old ss)if new SS created,if current SS not having template and sending email sheet means it ll create from the old SS,implemented eilib for add editors and script for wrap func,changed aircon,chkout and dryclean functionalities,for quater fee implemnted script to groupthe rec ver
//VER 1.3 -SD:25/06/2014 ED:25/06/2014;TRACKER NO: 517//implemented err msg ,if no permission to access SS
//VER 1.2 -SD:14/06/2014 ED:14/06/2014;TRACKER NO: 517//updated failure function,commit for update query
//VER 1.1 -SD:05/06/2014 ED:07/06/2014;TRACKER NO: 517//cleared elec excess issue,showed lp details for aircon ,use array with obj for showing cap by amt wise and invoice amt,put jquery link,implemented docowner script,changed query to get the sdate and edate,implemented sp ,updated new drive link
//VER 1.0 -SD:22/05/2014 ED:22/05/2014;TRACKER NO: 517//cleared issue for using same variable name in for loop so tht loop is not ending
//VER 0.09 -SD:17/05/2014 ED:17/05/2014;TRACKER NO: 517//implemented errormsg  which old spreadsheets not available 
//VER 0.08 -SD:28/04/2014 ED:14/05/2014;TRACKER NO: 517//implemented dynamic sp ,changed sp for dd-charges,electricity cap,access card,dd-calculation,changed date format as per sheet format,implemented script for quater aircon and fixed aircon,implemented error msg if template and sending email sheet not available,update file id while create new spread sheet
//VER 0.07 -SD:17/04/2014 ED:20/04/2014;TRACKER NO: 517//implemented script for unpaid rent in sheet,changed CTD into CLP (table name),checked all sp with migration data,cleared issue in electricity cap,changed script for creating ssheets for templates and sending email
//VER 0.06 -SD:24/03/2014 ED:29/03/2014;TRACKER NO: 517//implemented arr concept to reduced coding,reduced two function,corrected query for getting unit no,customer which is having transaction records,cleared cr for ss (automatically create sheet for the year with template and sending mail sheets),corrected invoice amt column for showing amt in ss,getting folderid instead of sheet id,reload the arr after calculation of dd,excluded generalcategory,implemented view for getting unitno,custid and name
//DONE BY:ELANGO S
//VER 0.05 -SD:27/01/2014 ED:29/01/2014;TRACKER NO: 517//GETTING THE ERROR MESSAGE GETTING FROM THE  EILIB FUNCTION.
//VER 0.04 -SD:02/01/2014 ED:02/01/2014;TRACKER NO: 517//CHANGE THE EILIB CONNECTION AND  HEADER TAG LINE
//VER 0.03 -SD:13/12/2013 ED:13/12/2013;TRACKER NO: 517//CHANGE THE SCRIPT NAME//
//VER 0.02 -SD:13/12/2013 ED:13/12/2013;TRACKER NO: 517//REMOVE THE UNWANTED COMMENT LINES// 
//VER 0.01 - INITIAL VERSION-SD:22/7/2013 ED:4/12/2013;TRACKER NO: 517
//**********************************************************************************************************/
try
{
  //GET THE UNIT  FOR LOAD IN THE  FORM//
  function DDC_getunitlistbox(DDC_flag)
  {
    var DDC_conn=eilib.db_GetConnection();
    var DDC_all_array =[];
    var DDC_stmt = DDC_conn.createStatement();
    var DDC_unit_array =[];
    var DDC_sp_unitcustomer = "CALL SP_DD_GET_UNIT_CUSTNAME('"+UserStamp+"',@TEMP_DD_DYNAMICTBLE)";
    var DDC_stmt = DDC_conn.createStatement();
    DDC_stmt.execute(DDC_sp_unitcustomer);
    DDC_stmt.close();
    var DDC_stmt = DDC_conn.createStatement();
    var DDC_rs_temptble=DDC_stmt.executeQuery("SELECT @TEMP_DD_DYNAMICTBLE");
    if(DDC_rs_temptble.next())
      var DDC_temptble_name=DDC_rs_temptble.getString("@TEMP_DD_DYNAMICTBLE");
    DDC_stmt.close();
    var DDC_unitcust_selectquery="SELECT DISTINCT UNIT_NO,CUSTOMER_ID,CUSTOMER_NAME FROM "+DDC_temptble_name+""
    var DDC_stmt = DDC_conn.createStatement();
    var DDC_unitvalue = DDC_stmt.executeQuery(DDC_unitcust_selectquery);
    while(DDC_unitvalue.next())
    {
      var  DDC_unitno=DDC_unitvalue.getString("UNIT_NO");
      DDC_unit_array.push({DDC_unitno:DDC_unitno,DDC_customerid:DDC_unitvalue.getString("CUSTOMER_ID"),DDC_customername:DDC_unitvalue.getString("CUSTOMER_NAME")});
    }
    DDC_unitvalue.close();DDC_stmt.close();  
    eilib.DropTempTable(DDC_conn,DDC_temptble_name);    
    var DDC_select_err_msg="248,251,252,253,254,255,256,257,258,259,260,261,262,271,380,449,450,451,459,468"
    var DDC_errorAarray=[];
    DDC_errorAarray=eilib.GetErrorMessageList(DDC_conn,DDC_select_err_msg);
    var DDC_stmt = DDC_conn.createStatement();
    var DDC_cusentryarray=[];var DDC_unitarray=[];var DDC_paymentarray=[]; var DDC_expunitarray=[]; var DDC_customerarray=[];var DDC_customertrmdtlarray=[];
    var DDC_cusentry_msg="SELECT CED_ID FROM CUSTOMER_ENTRY_DETAILS"
    var DDC_cusentryresult=DDC_stmt.executeQuery(DDC_cusentry_msg);
    while(DDC_cusentryresult.next()){
      DDC_cusentryarray.push(DDC_cusentryresult.getString("CED_ID"));
    }     
    DDC_cusentryresult.close();DDC_stmt.close();
    var DDC_stmt = DDC_conn.createStatement();
    var DDC_unit_msg="SELECT UNIT_ID FROM UNIT"
    var DDC_unitresult=DDC_stmt.executeQuery(DDC_unit_msg);
    while(DDC_unitresult.next()){
      DDC_unitarray.push(DDC_unitresult.getString("UNIT_ID"));
    }   
    DDC_unitresult.close();DDC_stmt.close();
    var DDC_stmt = DDC_conn.createStatement();
    var DDC_payment_msg="SELECT PD_ID FROM PAYMENT_DETAILS"
    var DDC_paymentresult=DDC_stmt.executeQuery(DDC_payment_msg);
    while(DDC_paymentresult.next()){
      DDC_paymentarray.push(DDC_paymentresult.getString("PD_ID"));
    }  
    DDC_paymentresult.close();DDC_stmt.close();
    var DDC_stmt = DDC_conn.createStatement();
    var DDC_expunit_msg="SELECT EU_ID FROM EXPENSE_UNIT"
    var DDC_expunitresult=DDC_stmt.executeQuery(DDC_expunit_msg);
    while(DDC_expunitresult.next()){
      DDC_expunitarray.push(DDC_expunitresult.getString("EU_ID"));
    }  
    DDC_expunitresult.close();DDC_stmt.close();
    var DDC_stmt = DDC_conn.createStatement();
    var DDC_customer_msg="SELECT CUSTOMER_ID FROM CUSTOMER"
    var DDC_customerresult=DDC_stmt.executeQuery(DDC_customer_msg);
    while(DDC_customerresult.next()){
      DDC_customerarray.push(DDC_customerresult.getString("CUSTOMER_ID"));
    } 
    DDC_customerresult.close();DDC_stmt.close();
    var DDC_stmt = DDC_conn.createStatement();
    var DDC_customertrmdtl_msg="SELECT CLP_ID FROM CUSTOMER_LP_DETAILS"
    var DDC_customertrmdtlresult=DDC_stmt.executeQuery(DDC_customertrmdtl_msg);
    while(DDC_customertrmdtlresult.next()){
      DDC_customertrmdtlarray.push(DDC_customertrmdtlresult.getString("CLP_ID"));
    }    
    DDC_customertrmdtlresult.close();DDC_stmt.close();
    var DDC_RESULTS={'DDC_cusentryarray':DDC_cusentryarray,'DDC_customerarray':DDC_customerarray,'DDC_expunitarray':DDC_expunitarray,'DDC_paymentarray':DDC_paymentarray,'DDC_unitarray':DDC_unitarray,'DDC_errorAarray':DDC_errorAarray.errormsg,'DDC_unit_array':DDC_unit_array,'DDC_customertrmdtlarray':DDC_customertrmdtlarray}
    DDC_all_array.push(DDC_RESULTS);
    DDC_conn.close();
    return DDC_all_array;
  }
  //GET THE REC_VER , START DATE AND END DATE FOR THE SELECTED CUSTOMER NAME AND UNIT NO    
  function DDC_loaddatebox(DDC_getcustid,DDC_name,DDC_unitno)
  {  
    var DDC_custid=[];
    DDC_custid=DDC_getcustid;
    var DDC_conn=eilib.db_GetConnection();
    var DDC_index=DDC_name.split(' ');
    var DDC_firstname=DDC_index[0];
    var DDC_lastname=DDC_index[1];
    var datestmt = DDC_conn.createStatement();
    var startarrary =[];
    var endarrary =[];
    var pendarrary =[];
    var recverarray=[];
    var custidarray=[];
    var customer_data="SELECT DISTINCT CTD.CLP_STARTDATE,CTD.CLP_ENDDATE,CED.CED_REC_VER,CTD.CLP_PRETERMINATE_DATE FROM CUSTOMER_ENTRY_DETAILS CED LEFT JOIN CUSTOMER C ON  (C.CUSTOMER_ID=CED.CUSTOMER_ID)   LEFT JOIN CUSTOMER_LP_DETAILS CTD ON (CTD.CUSTOMER_ID=CED.CUSTOMER_ID),UNIT U WHERE (U.UNIT_ID=CED.UNIT_ID) AND  (CED.CUSTOMER_ID='"+DDC_custid+"') AND (U.UNIT_NO='"+DDC_unitno+"')  AND   (CED.CED_REC_VER=CTD.CED_REC_VER) AND CTD.CLP_GUEST_CARD IS NULL AND IF(CLP_PRETERMINATE_DATE IS NOT NULL,CTD.CLP_STARTDATE<CTD.CLP_PRETERMINATE_DATE,CTD.CLP_ENDDATE>CTD.CLP_STARTDATE) ORDER BY CED.CED_REC_VER ASC";//AND (CED.CED_CANCEL_DATE IS NULL) 
    var getcustomer_data= datestmt.executeQuery(customer_data);
    while(getcustomer_data.next())
    {
      var sdate = getcustomer_data.getString("CLP_STARTDATE");
      var edate = getcustomer_data.getString("CLP_ENDDATE");
      var recversion = getcustomer_data.getString("CED_REC_VER");
      var pedate=getcustomer_data.getString("CLP_PRETERMINATE_DATE");
      recverarray.push(recversion);
      startarrary.push(sdate); 
      endarrary.push(edate); 
      pendarrary.push(pedate);
    }
    var joinarray=[];
    custidarray.push(DDC_custid);
    joinarray.push(recverarray);
    joinarray.push(startarrary);
    joinarray.push(endarrary);
    joinarray.push(pendarrary);
    joinarray.push(custidarray);
    datestmt.close();
    DDC_conn.close();
    return joinarray;
  }
  //CALCULATION FOR DD
  function DDC_Dep_Cal_submit(formallid)
  {
    var conn=eilib.db_GetConnection();
    var stmt = conn.createStatement();
    var unit_value=formallid.DDC_lb_unitselect;
    var name=formallid.DDC_lb_customerselect;
    var chkbox=formallid.DDC_chk_checkboxinc;
    var radio=formallid.DDC_radio_idradiobtn;
    if(radio!=undefined)
      name=name+'_'+radio
      else
        name=name
        var startdate=formallid.DDC_db_startdate;
    var enddate=formallid.DDC_db_enddate;
    var dep_custid=formallid.DDC_tb_hidecustid;
    var DDC_recverlgth=formallid.DDC_tb_hiderecverlength;
    var index=name.split(' ');
    var firstname=index[0];
    var lastname=index[1];
    var errormessage_array =[];
    var errormsg_exequery ="SELECT DDC_DATA FROM DEPOSIT_DEDUCTION_CONFIGURATION WHERE CGN_ID=30";
    var errormsg_rs = stmt.executeQuery(errormsg_exequery);
    if(errormsg_rs.next())
    {
      var  DDC_folderid=errormsg_rs.getString("DDC_DATA");
    }errormsg_rs.close();stmt.close();
    var selectdate=[];
    var unique_id=[];
    var rbuttonX1=[];
    if(chkbox!=undefined){
      if((Array.isArray(chkbox))==true){
        rbuttonX1=chkbox;
      }    
      else
      {
        rbuttonX1.push(chkbox);
      }}
    else
      rbuttonX1.push(formallid.DDC_tb_recdate);   
    var DDC_alllengdate=rbuttonX1.length;
    var DDC_recverarray=[];
    for(var i=0;i<rbuttonX1.length;i++)
    {
      var DDC_splitalvalue=rbuttonX1[i].split('^');
      var DDC_id=DDC_splitalvalue[0];
      var DDC_recver=DDC_splitalvalue[1].split(',');
      var DDC_startdate=DDC_splitalvalue[2];
      var DDC_enddate=DDC_splitalvalue[3];
      DDC_recverarray.push(DDC_recver)
      var selectedrecverlength=DDC_recverarray.length;
    }
    var flag='X';
    if(DDC_recverlgth==selectedrecverlength)
    {
      flag=""; 
    }
    if(DDC_recverlgth!=selectedrecverlength)
    {
      flag="X"; 
    }
    if(flag=="")
    {
      var DDC_recver=DDC_recverarray;
      var DDC_nooftimescalculat=1;
    }
    if(flag=="X")
    {
      var DDC_nooftimescalculat=selectedrecverlength;
    }
    var DDC_currentdateyear=Utilities.formatDate(new Date(), TimeZone, 'MMMM-yyy').split('-')[1];
    var DDC_currentmonth=Utilities.formatDate(new Date(), TimeZone, 'MMMM-yyy').split('-')[0];
    var DDC_ssname_currentyear='EI_DEPOSIT_DEDUCTIONS_'+DDC_currentdateyear;
    var DDC_getfiles = DriveApp.getFolderById(DDC_folderid).getFiles();
    var DDC_flag_ss=0;
    while(DDC_getfiles.hasNext())
    {
      var DDC_oldfile=DDC_getfiles.next();
      DDC_oldfile.getId();
      var DDC_oldfile_id= DDC_oldfile.getId();//DriveApp.getFilesByName(DDC_oldfile).next().getId();
      if(DDC_oldfile==DDC_ssname_currentyear)
      {
        var DDC_currentfile_id=DDC_oldfile_id;
        DDC_flag_ss=1;
      }       
      var DDC_olddateyear=Utilities.formatDate(new Date(), TimeZone, 'MMMM-yyy').split('-')[1]-1;
      var DDC_ssname_oldyear='EI_DEPOSIT_DEDUCTIONS_'+DDC_olddateyear;
      if(DDC_ssname_oldyear==DDC_oldfile){
        var DDC_ssname_getid=DDC_oldfile_id;
      }      
    } 
    if(DDC_flag_ss!=1){
      if(DDC_ssname_getid==undefined)
      {
        var DDC_getfiles = DriveApp.getFolderById(DDC_folderid).getFiles();
        while(DDC_getfiles.hasNext())
        {
          var DDC_oldfile=DDC_getfiles.next();
          if(DDC_oldfile==DDC_ssname_currentyear)
          {
            DDC_oldfile.setTrashed(true);
          }} 
        return ['DDC_flag_nosheet',DDC_ssname_oldyear];
      }
      var DDC_newspread=SpreadsheetApp.create(DDC_ssname_currentyear);  
      var DDC_newspread_ssid=DDC_newspread.getId();
      var DDC_targetFolderId=DDC_folderid;
      eilib.CUST_moveFileToFolder(DDC_newspread_ssid,"",DDC_targetFolderId);
      conn.setAutoCommit(false);
      //CREATE TEMPLATE FOR NEW SS
      var DDC_source = SpreadsheetApp.openById(DDC_ssname_getid);
      var DDC_templatesheet = DDC_source.getSheets();
      var DDC_flg_tempsht=0;
      for(var i=0;i<DDC_templatesheet.length;i++){
        if(DDC_templatesheet[i].getSheetName()=='TEMPLATE'){
          DDC_flg_tempsht=1;
          var DDC_sh=DDC_source.getSheets()[i];
          DDC_sh.copyTo(SpreadsheetApp.openById(DDC_newspread_ssid)); 
        }} 
      //RETURN ERR MSG
      if(DDC_flg_tempsht==0 ){
        var DDC_getfiles = DriveApp.getFolderById(DDC_folderid).getFiles();
        while(DDC_getfiles.hasNext())
        {
          var DDC_oldfile=DDC_getfiles.next();
          if(DDC_oldfile==DDC_ssname_currentyear)
          {
            DDC_oldfile.setTrashed(true);
          }}    
        return [DDC_flg_tempsht];}
      var DDC_stmt = conn.createStatement();
      DDC_stmt.execute("UPDATE FILE_PROFILE SET FP_FILE_ID='"+DDC_newspread_ssid+"' WHERE FP_ID=1");
      DDC_stmt.close();
      conn.commit();
      var DDC_docowner=eilib.CUST_documentowner(conn);
      eilib.SetDocOwner(DDC_newspread_ssid,DDC_docowner,DDC_docowner);
      //GIVE PERMISSION TO EDITORS WHEN NEW SS CREATED USING EILIB
      eilib.Deposit_Deduction_fileSharing(DDC_newspread_ssid, DDC_folderid)
      var DDC_rename=SpreadsheetApp.openById(DDC_newspread_ssid).getSheets();
      for(var k=0;k<DDC_rename.length;k++){
        if(DDC_rename[k].getSheetName()=='Copy of TEMPLATE'){
          DDC_rename[k].setName('TEMPLATE');
        }}
      var DDC_destination = SpreadsheetApp.openById(DDC_newspread_ssid);
      var DDC_newspread_delete=DDC_destination.getSheetByName('Sheet1');
      DDC_newspread.deleteSheet(DDC_newspread_delete);    
      var DDC_rename=SpreadsheetApp.openById(DDC_newspread_ssid).getSheets();
      for(var k=0;k<DDC_rename.length;k++){
       if(DDC_rename[k].getSheetName()!=DDC_currentmonth){
         SpreadsheetApp.openById(DDC_newspread_ssid).insertSheet(DDC_currentmonth);
         break;
        }
        }
      DDC_currentfile_id=DDC_newspread_ssid;
    } 
    //IF CURRENT SS NOT HAVING TEMPLATE SHEET IT LL CREATE THEM TEMPLATE AND SENDING EMAIL
    else{
      var temp_sheet = SpreadsheetApp.openById(DDC_currentfile_id).getSheetByName('TEMPLATE');
      if(temp_sheet==null){
        if(DDC_ssname_getid==undefined)
          return ['DDC_flag_nosheet',DDC_ssname_oldyear];
        var DDC_source = SpreadsheetApp.openById(DDC_ssname_getid);
        var DDC_templatesheet = DDC_source.getSheets();
        for(var F=0;F<DDC_templatesheet.length;F++){
          if((temp_sheet==null)&&(DDC_templatesheet[F].getSheetName()=='TEMPLATE')){
            var DDC_sh=DDC_source.getSheets()[F];
            DDC_sh.copyTo(SpreadsheetApp.openById(DDC_currentfile_id)); 
          }
        }  
        var DDC_rename=SpreadsheetApp.openById(DDC_currentfile_id).getSheets();
        for(var W=0;W<DDC_rename.length;W++){
          if(DDC_rename[W].getSheetName()=='Copy of TEMPLATE'){
            DDC_rename[W].setName('TEMPLATE');
          }}
      }}
    var temp_sheet = SpreadsheetApp.openById(DDC_currentfile_id).getSheetByName('TEMPLATE');
    if(temp_sheet==null)
      return [0,1]
      var currntyear = new Date().getYear();
    var temp_header = temp_sheet.getRange(1,1,1,4);
    var head_color = temp_sheet.getRange(1,1,1,temp_sheet.getLastColumn()).getBackgroundColor();
    var ur = 2;  
    var unit_temp = temp_sheet.getRange(ur,1,1,1);
    var output_sheet = SpreadsheetApp.openById(DDC_currentfile_id).getSheetByName(DDC_currentmonth);
    if(output_sheet == null)
    { 
      var output_sheet = SpreadsheetApp.openById(DDC_currentfile_id).insertSheet(DDC_currentmonth);
    } 
    var stmt = conn.createStatement();
    var DDC_callstorepcedurquery="CALL SP_DD_CALCULATION('"+unit_value+"','"+dep_custid+"','"+DDC_recverarray+"','"+flag+"','"+UserStamp+"',@TEMP_DD_DYNAMICTBLE)";
    var DDC_getallspvalues= stmt.execute(DDC_callstorepcedurquery);
    stmt.close();
    var DDC_stmt = conn.createStatement();
    var DDC_rs_temptble=DDC_stmt.executeQuery("SELECT @TEMP_DD_DYNAMICTBLE");
    if(DDC_rs_temptble.next())
      var DDC_temptble_name=DDC_rs_temptble.getString("@TEMP_DD_DYNAMICTBLE");
    DDC_rs_temptble.close();DDC_stmt.close();
    for (var i=0;i<DDC_nooftimescalculat;i++)
    {
      var DDC_chargtype=[];
      var DDC_chargamount=[];
      var DDC_electrcap=[];
      var DDC_sprecverarray=[];
      var DDC_startdatearrary=[];
      var DDC_enddatearrary=[];
      var DDC_no_ofdivision=[];
      var DDC_cardcount=[];
      var DDC_cardamount=[];
      var DDC_dryclean = [];
      var DDC_checkoutclean = [];
      var DDC_aircon = [];
      var DDC_airconquater = [];
      var DDC_quaters = [];
      var DDC_depositeunpaid = [];
      var DDC_depositeamount = [];
      var DDC_proratedunpaid = [];
      var DDC_payunpaiddate = [];
      var DDC_paymentrecver = [];
      var DDC_custpaymentid = [];
      var DDC_unitinvoiceitem = [];
      var DDC_unitdivamount = [];
      var DDC_unitamount = [];
      var DDC_unitinvoicedate = [];
      var DDC_eledivamount = [];
      var DDC_eleamount = [];
      var DDC_invoicedate = [];
      var DDC_cardtilldate = [];
      var DDC_custid=[];
      var DDC_sumofquater=[];
      var DDC_quatertotal='';
      var DDC_fixedaircon='';
      var stmt = conn.createStatement();
      if(flag=="")
      {
        var DDC_calltemptable="SELECT * FROM "+DDC_temptble_name+"";
      }
      if(flag=="X")
      {
        var DDC_calltemptable="SELECT * FROM "+DDC_temptble_name+" where DDRECVER="+DDC_recverarray[i]+"";
      }  
      var DDC_temptblresult=stmt.executeQuery(DDC_calltemptable);
      while(DDC_temptblresult.next())
      {
        if(DDC_temptblresult.getString("DDCUSTOMERID")!=null)
        {
          DDC_custid=DDC_temptblresult.getString("DDCUSTOMERID");
        }
        if(DDC_temptblresult.getString("DDRECVER")!=null)
        {
          DDC_sprecverarray = DDC_temptblresult.getString("DDRECVER");
        }
        if(DDC_temptblresult.getString("DDSTARTDATE")!=null)
        {
          if((Array.isArray( DDC_temptblresult.getString("DDSTARTDATE")))==true){
            DDC_startdatearrary=DDC_temptblresult.getString("DDSTARTDATE");
          }    
          else
          {
            DDC_startdatearrary.push(DDC_temptblresult.getString("DDSTARTDATE"));
          }
        }        
        if(DDC_temptblresult.getString("DDENDDATE")!=null)
        {
          if((Array.isArray( DDC_temptblresult.getString("DDENDDATE")))==true){
            DDC_enddatearrary=DDC_temptblresult.getString("DDENDDATE");
          }    
          else
          {
            DDC_enddatearrary.push(DDC_temptblresult.getString("DDENDDATE"));
          }
        }
        if(DDC_temptblresult.getString("DDNOOFDIVISION")!=null)
        {
          DDC_no_ofdivision = DDC_temptblresult.getString("DDNOOFDIVISION");
        }
        if(DDC_temptblresult.getString("DDCARDCOUNT")!=null)
        {
          DDC_cardcount = DDC_temptblresult.getString("DDCARDCOUNT");
        }
        if(DDC_temptblresult.getString("DDCARDAMOUNT")!=null)
        {
          DDC_cardamount = DDC_temptblresult.getString("DDCARDAMOUNT");
        }
        if(DDC_temptblresult.getString("DDCARDTILLDATE")!=null)
        {
          DDC_cardtilldate = DDC_temptblresult.getString("DDCARDTILLDATE");
        }
        if(DDC_temptblresult.getString("DDEEINVOICEDATE")!=null)
        {
          DDC_invoicedate.push({value:DDC_temptblresult.getString("DDEEINVOICEDATE"),key:DDC_temptblresult.getString("DDRECVER")});
        }        
        if(DDC_temptblresult.getString("DDEEAMOUNT")!=null)
        {
          if((Array.isArray(DDC_temptblresult.getString("DDEEAMOUNT")))==true){
            DDC_eleamount=DDC_temptblresult.getString("DDEEAMOUNT");
          }    
          else
          {
            DDC_eleamount.push(DDC_temptblresult.getString("DDEEAMOUNT"));
          }
        }
        if(DDC_temptblresult.getString("DDEEDIVAMOUNT")!=null)
        {
          if((Array.isArray( DDC_temptblresult.getString("DDEEDIVAMOUNT")))==true){
            DDC_eledivamount= DDC_temptblresult.getString("DDEEDIVAMOUNT");
          }    
          else
          {
            DDC_eledivamount.push( DDC_temptblresult.getString("DDEEDIVAMOUNT"));
          }
        }
        if(DDC_temptblresult.getString("DDUNITINVOICEDATE")!=null)
        {
          if((Array.isArray( DDC_temptblresult.getString("DDUNITINVOICEDATE")))==true){
            DDC_unitinvoicedate= DDC_temptblresult.getString("DDUNITINVOICEDATE");
          }    
          else
          {
            DDC_unitinvoicedate.push( DDC_temptblresult.getString("DDUNITINVOICEDATE"));
          }
        }
        if(DDC_temptblresult.getString("DDUNITAMOUNT")!=null)
        {
          if((Array.isArray( DDC_temptblresult.getString("DDUNITAMOUNT")))==true){
            DDC_unitamount= DDC_temptblresult.getString("DDUNITAMOUNT");
          }    
          else
          {
            DDC_unitamount.push( DDC_temptblresult.getString("DDUNITAMOUNT"));
          }
        }
        if(DDC_temptblresult.getString("DDUNITDIVAMOUNT")!=null)
        {
          if((Array.isArray( DDC_temptblresult.getString("DDUNITDIVAMOUNT")))==true){
            DDC_unitdivamount= DDC_temptblresult.getString("DDUNITDIVAMOUNT");
          }    
          else
          {
            DDC_unitdivamount.push(DDC_temptblresult.getString("DDUNITDIVAMOUNT"));
          }
        }
        if(DDC_temptblresult.getString("DDUNITINVOICEITEM")!=null)
        {
          if((Array.isArray( DDC_temptblresult.getString("DDUNITINVOICEITEM")))==true){
            DDC_unitinvoiceitem= DDC_temptblresult.getString("DDUNITINVOICEITEM");
          }    
          else
          {
            DDC_unitinvoiceitem.push(DDC_temptblresult.getString("DDUNITINVOICEITEM"));
          }
        }
        if(DDC_temptblresult.getString("DDCPPID")!=null)
        {
          DDC_custpaymentid=DDC_temptblresult.getString("DDCPPID");
        }        
        if(DDC_temptblresult.getString("DDPAYMENTUNPAIDDATE")!=null)
        {
          DDC_payunpaiddate.push(DDC_temptblresult.getString("DDPAYMENTUNPAIDDATE")+'(LP:'+DDC_sprecverarray+') ');
        }
        if(DDC_temptblresult.getString("DDEECAP")!=null)
        {
          DDC_electrcap.push({value:DDC_temptblresult.getString("DDEECAP"),key:DDC_temptblresult.getString("DDRECVER")});
        }
        if(DDC_temptblresult.getString("DDPROCUNPAID")!=null)
        {
          DDC_proratedunpaid=DDC_temptblresult.getString("DDPROCUNPAID");
        }
        if(DDC_temptblresult.getString("DDDEPOAMOUNT")!=null)
        {          
          DDC_depositeamount.push(DDC_temptblresult.getString("DDDEPOAMOUNT"));     
          
        }  //CHARGE AMOUNT//
        if(DDC_temptblresult.getString("DDCHARGETYPE")!=null)
        {
          if((Array.isArray(DDC_temptblresult.getString("DDCHARGETYPE")))==true){
            DDC_chargtype=DDC_temptblresult.getString("DDCHARGETYPE");
          }    
          else
          {
            DDC_chargtype.push(DDC_temptblresult.getString("DDCHARGETYPE"));
          }
        }
        if(DDC_temptblresult.getString("DDCHARGE")!=null)
        {
          if((Array.isArray(DDC_temptblresult.getString("DDCHARGE")))==true){
            DDC_chargamount=DDC_temptblresult.getString("DDCHARGE");
          }    
          else
          {
            DDC_chargamount.push(DDC_temptblresult.getString("DDCHARGE"));
          }
        }
        if(DDC_temptblresult.getString("DDDEPOUNPAID")!=null)
        {
          DDC_depositeunpaid.push({value:DDC_temptblresult.getString("DDDEPOUNPAID"),key:DDC_temptblresult.getString("DDRECVER")});
        }
        if(DDC_temptblresult.getString("DDQUATERS")!=null)
        {          
          DDC_quaters.push({value:DDC_temptblresult.getString("DDQUATERS"),key:DDC_temptblresult.getString("DDRECVER")});
        }
        if(DDC_temptblresult.getString("DDAIRCONQ")!=null)
        {
          DDC_airconquater.push({value:DDC_temptblresult.getString("DDAIRCONQ"),key:DDC_temptblresult.getString("DDRECVER")});
        }
        if(DDC_temptblresult.getString("DDAIRCON")!=null)
        {if(DDC_temptblresult.getString("DDAIRCONQ")==null)
          DDC_fixedaircon={value:DDC_temptblresult.getString("DDAIRCON"),key:DDC_temptblresult.getString("DDRECVER")}
          else
            DDC_aircon.push({valueDiff:DDC_temptblresult.getString("DDAIRCON"),value:DDC_temptblresult.getString("DDAIRCONQ"),key:DDC_temptblresult.getString("DDRECVER"),quater:DDC_temptblresult.getString("DDQUATERS")});
        }
        if(DDC_temptblresult.getString("DDCHECKOUTCLEAN")!=null)
        {
          DDC_checkoutclean={value:DDC_temptblresult.getString("DDCHECKOUTCLEAN"),key:DDC_temptblresult.getString("DDRECVER")};
        }
        if(DDC_temptblresult.getString("DDQUATERTOTAL")!=null)
        {
          DDC_sumofquater.push({value:DDC_temptblresult.getString("DDPERQUATER"),quater:DDC_temptblresult.getString("DDSUMOFQUATER"),total:DDC_temptblresult.getString("DDQUATERTOTAL")});
        }
        if(DDC_temptblresult.getString("DDDRYCLEAN")!=null)
        {
          DDC_dryclean={value:DDC_temptblresult.getString("DDDRYCLEAN"),key:DDC_temptblresult.getString("DDRECVER")};
        }
        var  DDC_electsubtotal=DDC_temptblresult.getString("DDSUBTOTAL_ONE");
        if(DDC_electsubtotal==null)
        {
          DDC_electsubtotal="";
        }
        var  DDC_airconsubtotal=DDC_temptblresult.getString("DDSUBTOTAL_TWO");
        if(DDC_airconsubtotal==null)
        {
          DDC_airconsubtotal="";
        }
        var  DDC_unitsubtotal=DDC_temptblresult.getString("DDSUBTOTAL_THREE");
        if(DDC_unitsubtotal==null)
        {
          DDC_unitsubtotal="";
        }
        var  DDC_totalallsubtl=DDC_temptblresult.getString("DDTOTAL_DD");
        if(DDC_totalallsubtl==null)
        {
          DDC_totalallsubtl="";
        }
        var  DDC_tefundtotal=DDC_temptblresult.getString("DDTOTAL_REFUND");
        if(DDC_tefundtotal==null)
        {
          DDC_tefundtotal="";
        }
      }
      DDC_temptblresult.close(); stmt.close();
      output_sheet.setColumnWidth(1, 600).setFrozenRows(1);
      output_sheet.setColumnWidth(2,300);
      var output_header = output_sheet.getRange(1,1,1,4);  
      temp_header.copyTo(output_header);
      var starting_row=output_sheet.getLastRow()+3;
      var unit_row = output_sheet.getRange(starting_row,1,1,1);
      unit_temp.copyTo(unit_row);
      //SET THE UNIT NUMBER IN THE SHEET//
      var unit_row1 = output_sheet.getRange(output_sheet.getLastRow(),2,1,1).setValue("'"+unit_value);
      var cust_temp = temp_sheet.getRange(ur+1,1,1,1);
      var cust_row = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1);
      cust_temp.copyTo(cust_row);
      //SET THE  CUSTOMER NAME IN THE SHEET//
      var cust_row1 = output_sheet.getRange(output_sheet.getLastRow(),2,1,1).setValue(name);
      var start_temp = temp_sheet.getRange(ur+2,1,1,1);
      var start_date = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1);
      start_temp.copyTo(start_date);
      //SET THE START DATE//
      if(flag=="")
      {
        DDC_startdatearrary=DDC_startdatearrary[0];
        DDC_enddatearrary=DDC_enddatearrary[(DDC_enddatearrary.length)-1]
      }
      if(DDC_recverlgth==selectedrecverlength)
      {
        var start_date1 = output_sheet.getRange(output_sheet.getLastRow(),2,1,1).setValue(DDC_startdatearrary).setComment('LEASE_PERIOD '+DDC_recverarray);//recverarray[itm]
      }
      else
      {
        var start_date1 = output_sheet.getRange(output_sheet.getLastRow(),2,1,1).setValue(DDC_startdatearrary[0]).setComment('LEASE_PERIOD '+DDC_recverarray[i]);//recverarray[itm]
      }
      //SET THE END DATE//
      var end_temp = temp_sheet.getRange(ur+3,1,1,1);
      var end_date = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1);
      end_temp.copyTo(end_date);
      if(DDC_recverlgth==selectedrecverlength)
      {
        var end_date1 = output_sheet.getRange(output_sheet.getLastRow(),2,1,1).setValue(DDC_enddatearrary);
      }
      else
      {
        var end_date1 = output_sheet.getRange(output_sheet.getLastRow(),2,1,1).setValue(DDC_enddatearrary[0]);
      }
      //DEPOSITE VALUE FILL IN THE SHEET//
      var DDC_depositeunpaid_rec=[];
      var dep_value = DDC_depositeamount;
      if(flag=="X"){   
        if(DDC_depositeamount==0)
        { 
          var dep_value = 0;
        }if(DDC_depositeunpaid.length!=0){
          if(DDC_depositeamount==0 && DDC_depositeunpaid[0].value=="UNPAID")
          {
            var rentalcase=3;
            var dep_value = 0;
            var depcomment="DEPO NT PAID";
          }}}
      else if(flag=="")
      {    
        var sum=0;
        for(var D=0;D<DDC_depositeamount.length;D++){
          sum+=parseInt(DDC_depositeamount[D])
          dep_value=sum  
        }
        for(var k=0;k<DDC_depositeunpaid.length;k++){              
          DDC_depositeunpaid_rec[k]= DDC_depositeunpaid[k].key;
          var rentalcase=3;
        }
        var depcomment="DEPO NT PAID FR LEASE PERIOD "+DDC_depositeunpaid_rec
      }
      var dep_temp = temp_sheet.getRange(ur+4,1,1,1);
      var dep_row = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1);
      dep_temp.copyTo(dep_row);
      var dep_row1 = output_sheet.getRange(output_sheet.getLastRow(),4,1,1).setValue(dep_value);
      if(DDC_payunpaiddate!="")
      {
        var cell = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1);
        cell.setWrap(true);
        var rentcard_row = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1).setValue("RENT  = UNPAID FR "+DDC_payunpaiddate).setBackgroundRGB(255, 242, 204).setFontWeight("bold");
      }
      if(DDC_proratedunpaid=="UNPAID")
      {
        var pccard_row = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1).setValue("PC ="+DDC_proratedunpaid).setBackgroundRGB(255, 242, 204).setFontWeight("bold");
      }
      //LOST CARD AMOUNT ,TILL DATE STORED IN THE SHEET//
      var lastcarddate="ACCESS CARD LOST = "+DDC_cardtilldate;
      if(DDC_cardcount!=0)
      {
        var lastcard_row = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1).setValue(lastcarddate).setBackgroundRGB(255, 242, 204).setFontWeight("bold");
        var lastcard_rowcrg1 = output_sheet.getRange(output_sheet.getLastRow(),4,1,1).setValue(DDC_cardamount);
      }else
      {
        var lastcard_row = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1).setValue("ACCESS CARD LOST").setBackgroundRGB(255, 242, 204).setFontWeight("bold");
        var lastcard_rowcrg1 = output_sheet.getRange(output_sheet.getLastRow(),4,1,1).setValue(DDC_cardamount);
      }
      if(rentalcase==3)
      {
        dep_row1.setComment(depcomment).setBackgroundColor('RED');
      }
      //CHECK ABOUT THE ELECTRICITY AMOUNT//
      var DDC_cap ='';
      var DDC_cap_flag =1;
      var DDC_sheet_range='';
      for(var C=0;C<DDC_electrcap.length;C++){
        if(C==0)
          var DDC_chk_cap=DDC_electrcap[C].value;
        if(DDC_chk_cap!=DDC_electrcap[C].value){
          DDC_cap_flag =0;
          break;
        }}
      if(DDC_cap_flag==1)
        DDC_cap ='$'+DDC_chk_cap +' Capped ';
      else
        DDC_cap='';        
      var elec_temp = temp_sheet.getRange(ur+5,1,1,1);
      var elec_row = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1);
      elec_temp.copyTo(elec_row);
      var elec_row1 = output_sheet.getRange(output_sheet.getLastRow(),2,1,1).setValue(DDC_cap);
      //SET THE NO OF DIVISION VALUE IN THE SHEET//
      var div_val = output_sheet.getRange(output_sheet.getLastRow(),3,1,1).setValue('No of Div  '+DDC_no_ofdivision);
      var elec_beginrow = output_sheet.getLastRow()+2;  
      var elec_counter=elec_beginrow;
      var DDC_electdatecount=DDC_invoicedate.length;
      //SET THE ELECTRICITY VALUES IN THE SHEET//
      DDC_electrcap=DDC_electrcap.sort(compare);
      var DDC_cap_rec=[];
      var DDC_cap_rec=DDC_electrcap[0].key;
      for(var c=0;c<DDC_electrcap.length;c++){
        var cap='$'+DDC_electrcap[c].value+' CAP  LP :'+DDC_electrcap[c].key;           
        if(c!=0)
        {  var modify='';      
         if(DDC_electrcap[c].value==DDC_electrcap[c-1].value){
           DDC_cap_rec +=','+ DDC_electrcap[c].key;
           var modify='$'+DDC_electrcap[c].value+' CAP  LP :'+DDC_cap_rec;
           var cap='';}
         else{
           var cap=' $'+DDC_electrcap[c].value+' CAP  LP :'+DDC_electrcap[c].key;
           DDC_cap_rec=''
           var DDC_cap_rec=DDC_electrcap[c].key;}
        }
        if(DDC_cap_flag==0){        
          output_sheet.getRange(elec_counter,1).setValue(cap)
          if(cap!='')
            DDC_sheet_range=elec_counter;
          if((c!=0)&&(modify!=''))
          output_sheet.getRange(DDC_sheet_range,1).setValue(modify)          
        }
        for(var j=0;j<DDC_invoicedate.length;j++){
          if(DDC_electrcap[c].key==DDC_invoicedate[j].key){
            output_sheet.getRange(elec_counter,2).setValue(DDC_invoicedate[j].value).setFontWeight("bold"); 
            output_sheet.getRange(elec_counter,3).setValue(DDC_eleamount[j]);
            output_sheet.getRange(elec_counter,4).setValue(DDC_eledivamount[j]); 
            elec_counter++;
          }
        }
      }
      var DDC_cap_position=0;
      //SET THE  TOTAL VALUES UPTO ELECTRICITY//
      var sub_temp = temp_sheet.getRange(ur+17,1,1,4);
      var sub_row = output_sheet.getRange(output_sheet.getLastRow()+2,1,1,4);
      sub_temp.copyTo(sub_row);
      var sub_row1 = output_sheet.getRange(output_sheet.getLastRow(),4,1,1).setValue(parseFloat(DDC_electsubtotal)).setFontWeight("bold");
      var aircon_temp = temp_sheet.getRange(ur+20,1,1,1);
      var aircon_row = output_sheet.getRange(output_sheet.getLastRow()+2,1,1,1);
      aircon_temp.copyTo(aircon_row);      
      //SET  THE  AIRCON FEE//   
      if((DDC_fixedaircon!='')&&(DDC_fixedaircon!=undefined)){
        var aircon_row1 = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1).setValue('Fixed Aircon Fee ');
        var aircon_row1 = output_sheet.getRange(output_sheet.getLastRow(),4,1,1).setValue(DDC_fixedaircon.value);
      }
      if(DDC_sumofquater.length!=0 && DDC_sumofquater.length<DDC_aircon.length){  
        DDC_sumofquater=DDC_sumofquater.sort(compare);
        for(var a=0;a<DDC_sumofquater.length;a++){
          var chat=1;var Quaterlp='';var LP='';
          for(var b=0;b<DDC_aircon.length;b++){                      
            if(parseInt(DDC_sumofquater[a].value)==parseInt(DDC_aircon[b].value)){ 
              if(chat==1){var LP =DDC_aircon[b].key;var Quaterlp ='Quater for LP'+DDC_aircon[b].key+' :'+DDC_aircon[b].quater;}
              else{LP +=','+DDC_aircon[b].key;Quaterlp +='+ LP'+DDC_aircon[b].key+' :'+DDC_aircon[b].quater;}
              chat ++;}
          }if(chat==2){Quaterlp=Quaterlp.replace(Quaterlp,'Quater')}
          var quarter_row = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1).setValue('LP '+ LP +': $'+DDC_sumofquater[a].value+' Per Quater');
          var cell_quarter_row = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1);cell_quarter_row.setWrap(true);        
          var quarter_row = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1).setValue('$'+DDC_sumofquater[a].value+' *'+DDC_sumofquater[a].quater+' ('+Quaterlp+')');
          var aircon_row1 = output_sheet.getRange(output_sheet.getLastRow(),4,1,1).setValue(DDC_sumofquater[a].total);  
        }
      }
      else{
        for(var l=0; l<DDC_aircon.length;l++){
          if(flag=='X')
            var DDC_lp_rec='';
          else
            var DDC_lp_rec='- LP:'+DDC_aircon[l].key
            var quarter_row = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1).setValue(DDC_quaters[l].value+' Quarters');
          var aircon_row1 = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1).setValue('$'+DDC_airconquater[l].value+' Per Quarter '+DDC_lp_rec);
          var aircon_row1 = output_sheet.getRange(output_sheet.getLastRow(),4,1,1).setValue(DDC_aircon[l].valueDiff);     
        }}
      var sub1_temp = temp_sheet.getRange(ur+23,1,1,4);  
      var sub1_row = output_sheet.getRange(output_sheet.getLastRow()+2,1,1,4);
      sub1_temp.copyTo(sub1_row);
      var sub1_row1 = output_sheet.getRange(output_sheet.getLastRow(),4,1,1).setValue(DDC_airconsubtotal).setFontWeight("bold");
      var main_temp = temp_sheet.getRange(ur+25,1,1,1);
      var maint_row = output_sheet.getRange(output_sheet.getLastRow()+2,1,1,1);  
      main_temp.copyTo(maint_row);
      var beginrow = output_sheet.getLastRow()+2;
      var counter=beginrow;
      var DDC_maintenancelength=DDC_unitinvoicedate.length;
      for ( var u=0;u<parseInt(DDC_maintenancelength);u++)
      {
        output_sheet.getRange(counter,1).setValue(DDC_unitinvoiceitem[u]);
        output_sheet.getRange(counter,2).setValue(DDC_unitinvoicedate[u]);
        output_sheet.getRange(counter,3).setValue(DDC_unitamount[u]); 
        output_sheet.getRange(counter,4).setValue(DDC_unitdivamount[u]); 
        counter++       
      }
      var checkout_clean=DDC_checkoutclean.value;
      if((DDC_checkoutclean!=="")&&(checkout_clean!=undefined))
      {
        var checkout_clean_temp = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1).setValue("Checkout Cleaning");
        var checkout_clean_row = output_sheet.getRange(output_sheet.getLastRow(),4,1,1).setValue(checkout_clean);//parseFloat()
      }
      var drycleaning=DDC_dryclean.value;
      if((drycleaning!="")&&(drycleaning!=undefined))
      {
        var dry_clean_temp = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,1).setValue("Curtain Dry Cleaning");
        var dry_clean_row = output_sheet.getRange(output_sheet.getLastRow(),4,1,1).setValue(drycleaning);//parseFloat()
      }
      var crgbeginrow = output_sheet.getLastRow()+1;
      var crgcounter=crgbeginrow;
      var DDC_chargelength=DDC_chargamount.length;
      for ( var c=0;c<parseInt(DDC_chargelength);c++)
      {
        output_sheet.getRange(crgcounter,1).setValue(DDC_chargtype[c]).setFontWeight("bold");
        output_sheet.getRange(crgcounter,4).setValue(DDC_chargamount[c]); 
        crgcounter++       
      }
      var sub2_temp = temp_sheet.getRange(ur+33,1,1,4);
      var sub2_row = output_sheet.getRange(output_sheet.getLastRow()+2,1,1,4);
      sub2_temp.copyTo(sub2_row);
      var sub2_row1 = output_sheet.getRange(output_sheet.getLastRow(),4,1,1).setValue(DDC_unitsubtotal).setFontWeight("bold");
      var tded_temp = temp_sheet.getRange(ur+37,1,1,4);
      var tded_row = output_sheet.getRange(output_sheet.getLastRow()+2,1,1,4);
      tded_temp.copyTo(tded_row); 
      var tded_row1 = output_sheet.getRange(output_sheet.getLastRow(),4,1,1).setValue(DDC_totalallsubtl);
      var refun_temp = temp_sheet.getRange(ur+38,1,1,4);  
      var refun_row = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,4);
      refun_temp.copyTo(refun_row);
      var refun_row1 = output_sheet.getRange(output_sheet.getLastRow(),4,1,1).setValue(DDC_tefundtotal);
      var end_row =output_sheet.getLastRow();
      var no_of_row = end_row-starting_row+1;
      output_sheet.getRange(starting_row,1,no_of_row,4).setBorder(true,true,true,true,true,true);
      output_sheet.getRange(starting_row,2,end_row,1).setHorizontalAlignment("left");
      var black_row1 = output_sheet.getRange(output_sheet.getLastRow()+1,1,1,4).setBackgroundColor('black');
      output_sheet.insertRows(output_sheet.getLastRow()+5, 50) 
    }
    eilib.DropTempTable(conn,DDC_temptble_name);
    var DDC_ref_unitcustomer=DDC_getunitlistbox('DDC_flag_refresh')
    return DDC_ref_unitcustomer;
  }
  //FUNCTION FOR OBJECT ARR
  function compare(a,b) {
    if (a.value < b.value)
      return -1;
    if (a.value > b.value)
      return 1;
    return 0;
  }
}
catch(err)
{ 
}

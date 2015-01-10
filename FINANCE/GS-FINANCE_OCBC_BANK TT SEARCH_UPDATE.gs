//***************************************BANK TT SEARCH/UPDATE********************************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY:KUMAR
//VER 1.05- SD:23/07/2014 ED:23/07/2014,TRACKER NO:674,showing all customer name in customer list for selected unit and all units.
//VER 1.04- SD:15/07/2014 ED:15/07/2014,TRACKER NO:675,droped temp tables in script side.
//VER 1.03- SD:21/06/2014 ED:21/06/2014,TRACKER NO:675,SET min and max date for banktt DP(MIN DATE AS old banktt date-1 YEAR AND MAX DATE AS SYSDATE) AND implemented connection error message.
//VER 1.02- SD:06/06/2014 ED:06/06/2014,TRACKER NO:675,changed preloader and jquery,css links.
//VER 1.01- SD:01/06/2014 ED:01/06/2014,TRACKER NO:675,Changed customer name search option now showing customer name search option oly banktt entry customer oly in list box.
//VER 1.00- SD:15/05/2014 ED:15/04/2014,TRACKER NO:675,Changed dynamic temp table name in script side.
//VER 0.09- SD:19/04/2014 ED:19/04/2014,TRACKER NO:675,Rstricted DP manual inputs and Did New CR as per tracker 319 comment#7
//VER 0.08- SD:07/03/2014 ED:07/03/2014,TRACKER NO:675,Did ULD ID and removed repeated queries and return flag updated 
//VER 0.07- SD:25/01/2014 ED:27/01/2014,TRACKER NO 675,Did TT TYPE,CREATED BY,CHARGES TO,STATUS tables merged to banktt configuration table and Error mesaages getting from Eilib.
//VER 0.06- SD:05/01/2014 ED:06/01/2014,TRACKER NO 675,did New CR in ver0.06
//VER 0.05- SD:30/12/2013 ED:30/12/2013,TRACKER NO 675,Removed sleep function and multiple conn in ver0.05
//VER 0.04- SD:30/11/2013 ED:30/11/2013,TRACKER NO:675 -gave error msg no customers in sellected unit,changed datepicker for change month and year dropdown box and did account no auto complete newly in ver0.04
//VER 0.03- SD:30/11/2013 ED:30/11/2013,TRACKER NO:171-changed html file name and gs file name in ver0.03
//VER 0.02- SD:03/12/2013 ED:03/12/2013,TRACKER NO:171Added Return function script in ver0.02
//VER 0.01-INITIAL VERSION-SD:14/09/2013 ED:17/09/2013,TRACKER NO:171
//*********************************************************************************************************//
try
{
  function BANKTT_SRC_Customer(unit)
  {
    var BANKTT_SRCcustomername_array=[];
    var BANKTT_SRC_conn=eilib.db_GetConnection();
    var BANKTT_SRCstmt = BANKTT_SRC_conn.createStatement();
    var BANKTT_SRCactivecustomerquery="SELECT DISTINCT CONCAT(C.CUSTOMER_FIRST_NAME,'_',C.CUSTOMER_LAST_NAME)AS CUSTOMERNAME FROM CUSTOMER C,BANK_TRANSFER_DETAIL BTD WHERE BTD.CUSTOMER_ID=C.CUSTOMER_ID AND BTD.UNIT_ID=(SELECT UNIT_ID FROM UNIT WHERE UNIT_NO="+unit+") ORDER BY C.CUSTOMER_FIRST_NAME ASC "
    var BANKTT_SRC_customerresult = BANKTT_SRCstmt.executeQuery(BANKTT_SRCactivecustomerquery);//3.CUSTOMER
    while(BANKTT_SRC_customerresult.next())
    {
      BANKTT_SRCcustomername_array.push(BANKTT_SRC_customerresult.getString("CUSTOMERNAME"));
    }
    return BANKTT_SRCcustomername_array;
    BANKTT_SRC_customerresult.close();
    BANKTT_SRCstmt.close();
    BANKTT_SRC_conn.close();
  }
  function BANKTT_SRC_accountnamesearch()
  {
    var BANKTT_SRC_conn=eilib.db_GetConnection();
    var BANKTT_SRC_accnamestmt = BANKTT_SRC_conn.createStatement();
    var BANKTT_SRC_accname_array =[];
    var BANKTT_SRC_accname_query = "SELECT DISTINCT BT_ACC_NAME FROM BANK_TRANSFER ORDER BY BT_ACC_NAME ASC"; 
    var BANKTT_SRC_accname_result = BANKTT_SRC_accnamestmt.executeQuery(BANKTT_SRC_accname_query);
    while(BANKTT_SRC_accname_result.next())
    {
      if(BANKTT_SRC_accname_result.getString("BT_ACC_NAME")==null)continue;
      BANKTT_SRC_accname_array.push(BANKTT_SRC_accname_result.getString("BT_ACC_NAME"));
    }
    return BANKTT_SRC_accname_array;
    BANKTT_SRC_accname_result.close();
    BANKTT_SRC_accnamestmt.close();
    BANKTT_SRC_conn.close();
  }
  function BANKTT_SRC_commonvalues()
  {
    var BANKTT_SRC_conn =eilib.db_GetConnection();
    ////////////UNIT NO TABLE/////////////
    var BANKTT_SRC_unitstmt = BANKTT_SRC_conn.createStatement();
    var BANKTT_SRC_unit_array =[];
    var BANKTT_SRC_unit_query = "SELECT DISTINCT U.UNIT_NO FROM UNIT U,BANK_TRANSFER_DETAIL BTD WHERE BTD.UNIT_ID=U.UNIT_ID ORDER BY UNIT_NO ASC"; 
    var BANKTT_SRC_unit_result = BANKTT_SRC_unitstmt.executeQuery(BANKTT_SRC_unit_query);
    while(BANKTT_SRC_unit_result.next())
    {
      BANKTT_SRC_unit_array.push(BANKTT_SRC_unit_result.getString("UNIT_NO"));
    }
    BANKTT_SRC_unit_result.close();
    BANKTT_SRC_unitstmt.close();
    ////////////MODELNAME DETAILS TABLE/////////////
    var BANKTT_SRC_modelstmt = BANKTT_SRC_conn.createStatement();
    var BANKTT_SRC_model_array =[];
    var BANKTT_SRC_model_query = "SELECT BTM_DATA FROM BANK_TRANSFER_MODELS ORDER BY BTM_DATA ASC"; 
    var BANKTT_SRC_model_result = BANKTT_SRC_modelstmt.executeQuery(BANKTT_SRC_model_query);
    while(BANKTT_SRC_model_result.next())
    {
      BANKTT_SRC_model_array.push(BANKTT_SRC_model_result.getString("BTM_DATA"));
    }
    BANKTT_SRC_model_result.close();
    BANKTT_SRC_modelstmt.close();
    /*******************OCBC_BANK_CONFIG_DETAILS***********************/
    var BANKTT_SRC_configstmt = BANKTT_SRC_conn.createStatement();
    var BANKTT_SRC_status_array =[];
    var BANKTT_SRC_charge_array =[];
    var BANKTT_SRC_createdby_array=[];
    var BANKTT_searchoption_array=[];
    var BANKTT_SRC_configtype_query = "SELECT BCN_ID,CGN_ID,BCN_DATA FROM BANKTT_CONFIGURATION WHERE CGN_ID IN(56,70,71,72)order by BCN_DATA ASC"; 
    var BANKTT_SRC_configtype_result = BANKTT_SRC_configstmt.executeQuery(BANKTT_SRC_configtype_query);
    while(BANKTT_SRC_configtype_result.next())
    {
      if(BANKTT_SRC_configtype_result.getString("CGN_ID")==56)
      {
        var BANKTT_searchoptiondata= BANKTT_SRC_configtype_result.getString("BCN_DATA"); 
        var BANKTT_searchoptionid= BANKTT_SRC_configtype_result.getString("BCN_ID"); 
        BANKTT_searchoption_array.push({BANKTToptionid:BANKTT_searchoptionid,BANKTToptiondata:BANKTT_searchoptiondata})
      }
      if(BANKTT_SRC_configtype_result.getString("CGN_ID")==70)
      {
        var bcn_id=BANKTT_SRC_configtype_result.getString("BCN_ID")
        if(bcn_id!=13 && bcn_id!=14)
        {
          BANKTT_SRC_status_array.push(BANKTT_SRC_configtype_result.getString("BCN_DATA"));
        }
      }
      if(BANKTT_SRC_configtype_result.getString("CGN_ID")==71)
      {
        BANKTT_SRC_charge_array.push(BANKTT_SRC_configtype_result.getString("BCN_DATA"));
      }
      if(BANKTT_SRC_configtype_result.getString("CGN_ID")==72)
      {
        BANKTT_SRC_createdby_array.push(BANKTT_SRC_configtype_result.getString("BCN_DATA"));
      }
    }
    BANKTT_SRC_configtype_result.close();
    BANKTT_SRC_configstmt.close();
    ////////////ERROR MESSAGES/////////////
    var BANKTT_SRC_error_code ='1,2,4,6,45,247,385,401';
    var BANKTT_SRC_error_array=eilib.GetErrorMessageList(BANKTT_SRC_conn, BANKTT_SRC_error_code);
    var emailname=eilib.getProfileEmailId(BANKTT_SRC_conn,'BANKTT_TO_MAILID')
    ///////////BANK TT ENTRY TABLE RECORDS//////////////
    var BANKTT_SRC_entrydetailsstmt=BANKTT_SRC_conn.createStatement();
    var BANKTT_SRC_entrydetailsquery="SELECT BT_ID FROM BANK_TRANSFER"
    var BANKTT_SRC_entrydetailsresult=BANKTT_SRC_entrydetailsstmt.executeQuery(BANKTT_SRC_entrydetailsquery);
    if(BANKTT_SRC_entrydetailsresult.next())
    {
      var BANKTT_Records=BANKTT_SRC_entrydetailsresult.getString(1);
    }
    BANKTT_SRC_entrydetailsresult.close();
    BANKTT_SRC_entrydetailsstmt.close();
    var BANKTT_SRC_RESULTS={BANKTTsearchoption:BANKTT_searchoption_array,unit:BANKTT_SRC_unit_array,model:BANKTT_SRC_model_array,charges:BANKTT_SRC_charge_array,status:BANKTT_SRC_status_array,created:BANKTT_SRC_createdby_array,error:BANKTT_SRC_error_array.errormsg,emailname:emailname,Records:BANKTT_Records};
    return BANKTT_SRC_RESULTS;
    BANKTT_SRC_conn.close();
  }
  function BANKTT_SRC_searchoption(BANKTT_SRC_input1,BANKTT_SRC_input2,option)
  {
    var BANKTT_SRC_conn =eilib.db_GetConnection();
    if(option==1)
    {
      var optionflag=1;
      var BANKTT_SRC_QUERY="SELECT BT.BT_ID,TBST.BANK_TRANSFER_TYPE,TBST.TRANSACTION_STATUS,TBST.BANK_TRANSFER_CHARGES_TO,TBST.BANK_TRANSFER_CREATED_BY,U.UNIT_NO,CONCAT(C.CUSTOMER_FIRST_NAME,' ',CUSTOMER_LAST_NAME)AS CUSTOMERNAME,BT.BT_DATE,BT.BT_AMOUNT,BT.BT_ACC_NAME,BT.BT_ACC_NO,BT.BT_BANK_CODE,BT.BT_BRANCH_CODE,BT.BT_BANK_ADDRESS,BT.BT_SWIFT_CODE,BT.BT_CUST_REF,BT.BT_INV_DETAILS,BT.BT_DEBITED_ON,BT.BT_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(BT.BT_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS BT_TIME_STAMP FROM BANK_TRANSFER BT,BANK_TRANSFER_DETAIL BTD,UNIT U,CUSTOMER C,TEMP_BANKTTSEARCHTABLE TBST,USER_LOGIN_DETAILS ULD WHERE BT.BT_ID=BTD.BT_ID AND U.UNIT_ID=BTD.UNIT_ID AND C.CUSTOMER_ID=BTD.CUSTOMER_ID AND TBST.BT_ID=BTD.BT_ID AND ULD.ULD_ID=BT.ULD_ID"
    }
    if(option==2)
    {
      optionflag=1;
      BANKTT_SRC_QUERY="SELECT BT.BT_ID,TBST.BANK_TRANSFER_TYPE,TBST.TRANSACTION_STATUS,TBST.BANK_TRANSFER_CHARGES_TO,TBST.BANK_TRANSFER_CREATED_BY,U.UNIT_NO,CONCAT(C.CUSTOMER_FIRST_NAME,' ',CUSTOMER_LAST_NAME)AS CUSTOMERNAME,BT.BT_DATE,BT.BT_AMOUNT,BT.BT_ACC_NAME,BT.BT_ACC_NO,BT.BT_BANK_CODE,BT.BT_BRANCH_CODE,BT.BT_BANK_ADDRESS,BT.BT_SWIFT_CODE,BT.BT_CUST_REF,BT.BT_INV_DETAILS,BT.BT_DEBITED_ON,BT.BT_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(BT.BT_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS BT_TIME_STAMP FROM BANK_TRANSFER BT,BANK_TRANSFER_DETAIL BTD,UNIT U,CUSTOMER C,TEMP_BANKTTSEARCHTABLE TBST,USER_LOGIN_DETAILS ULD WHERE BT.BT_ID=BTD.BT_ID AND U.UNIT_ID=BTD.UNIT_ID AND C.CUSTOMER_ID=BTD.CUSTOMER_ID AND TBST.BT_ID=BTD.BT_ID AND ULD.ULD_ID=BT.ULD_ID"
    }
    if(option==4)
    {
      optionflag=1;
      BANKTT_SRC_QUERY="SELECT BT.BT_ID,TBST.BANK_TRANSFER_TYPE,TBST.TRANSACTION_STATUS,TBST.BANK_TRANSFER_CHARGES_TO,TBST.BANK_TRANSFER_CREATED_BY,U.UNIT_NO,CONCAT(C.CUSTOMER_FIRST_NAME,' ',CUSTOMER_LAST_NAME)AS CUSTOMERNAME,BT.BT_DATE,BT.BT_AMOUNT,BT.BT_ACC_NAME,BT.BT_ACC_NO,BT.BT_BANK_CODE,BT.BT_BRANCH_CODE,BT.BT_BANK_ADDRESS,BT.BT_SWIFT_CODE,BT.BT_CUST_REF,BT.BT_INV_DETAILS,BT.BT_DEBITED_ON,BT.BT_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(BT.BT_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS BT_TIME_STAMP FROM BANK_TRANSFER BT,BANK_TRANSFER_DETAIL BTD,UNIT U,CUSTOMER C,TEMP_BANKTTSEARCHTABLE TBST,USER_LOGIN_DETAILS ULD WHERE BT.BT_ID=BTD.BT_ID AND U.UNIT_ID=BTD.UNIT_ID AND C.CUSTOMER_ID=BTD.CUSTOMER_ID AND TBST.BT_ID=BTD.BT_ID AND ULD.ULD_ID=BT.ULD_ID"
    }
    if(option==3)
    {
      optionflag=1;
      BANKTT_SRC_input1 =eilib.SqlDateFormat(BANKTT_SRC_input1);
      BANKTT_SRC_input2=eilib.SqlDateFormat(BANKTT_SRC_input2)
      BANKTT_SRC_QUERY="SELECT BT_ID,BANK_TRANSFER_TYPE,BT_DATE,UNIT_NO,CUSTOMERNAME,BT_ACC_NO,BT_ACC_NAME,BT_AMOUNT,TRANSACTION_STATUS,BT_DEBITED_ON,BT_BANK_CODE,BT_BRANCH_CODE,BT_BANK_ADDRESS,BT_SWIFT_CODE,BANK_TRANSFER_CHARGES_TO,BT_CUST_REF,BT_INV_DETAILS,BANK_TRANSFER_CREATED_BY,BT_COMMENTS,ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(BT_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS BT_TIME_STAMP FROM BANKTT_SEARCH_TABLE ORDER BY BT_DATE ASC";
    }
    if(option==5)
    {
      optionflag=1;
      BANKTT_SRC_QUERY="SELECT BT_ID,BANK_TRANSFER_TYPE,BT_DATE,UNIT_NO,CUSTOMERNAME,BT_ACC_NO,BT_ACC_NAME,BT_AMOUNT,TRANSACTION_STATUS,BT_DEBITED_ON,BT_BANK_CODE,BT_BRANCH_CODE,BT_BANK_ADDRESS,BT_SWIFT_CODE,BANK_TRANSFER_CHARGES_TO,BT_CUST_REF,BT_INV_DETAILS,BANK_TRANSFER_CREATED_BY,BT_COMMENTS,ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(BT_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS BT_TIME_STAMP FROM BANKTT_SEARCH_TABLE ORDER BY BT_DATE ASC";
    }
    if(option==6)
    {
      optionflag=1;
      BANKTT_SRC_QUERY="SELECT BT_ID,BANK_TRANSFER_TYPE,BT_DATE,UNIT_NO,CUSTOMERNAME,BT_ACC_NO,BT_ACC_NAME,BT_AMOUNT,TRANSACTION_STATUS,BT_DEBITED_ON,BT_BANK_CODE,BT_BRANCH_CODE,BT_BANK_ADDRESS,BT_SWIFT_CODE,BANK_TRANSFER_CHARGES_TO,BT_CUST_REF,BT_INV_DETAILS,BANK_TRANSFER_CREATED_BY,BT_COMMENTS,ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(BT_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS BT_TIME_STAMP FROM BANKTT_SEARCH_TABLE ORDER BY BT_DATE ASC";
    }
    var BANKTT_TEMPTABLEQUERY="CALL SP_TEMP_TABLE_BANKTT('"+BANKTT_SRC_input1+"','"+BANKTT_SRC_input2+"',"+option+",'"+UserStamp+"',@BANKTT_SEARCH_TEMPTBLNAME,@BANKTT_TEMP_TABLE_NAME)"
    var BANKTT_ENTRYstmt=BANKTT_SRC_conn.createStatement();
    BANKTT_ENTRYstmt.execute(BANKTT_TEMPTABLEQUERY);
    var banktttemptableresult=BANKTT_ENTRYstmt.executeQuery("SELECT @BANKTT_SEARCH_TEMPTBLNAME,@BANKTT_TEMP_TABLE_NAME");
    while(banktttemptableresult.next())
    {
      var banktttmptablename1=banktttemptableresult.getString(1);
      var banktttmptablename2=banktttemptableresult.getString(2);
    }
    banktttemptableresult.close();
    BANKTT_ENTRYstmt.close();
    if(option==3 || option==5 || option==6)
    {
      BANKTT_SRC_QUERY=BANKTT_SRC_QUERY.replace("BANKTT_SEARCH_TABLE",banktttmptablename2);
    }
    else
    {
      BANKTT_SRC_QUERY=BANKTT_SRC_QUERY.replace("TEMP_BANKTTSEARCHTABLE",banktttmptablename1);
    }
    var BANKTT_SRC_searchstmt=BANKTT_SRC_conn.createStatement();
    var BANKTT_SRC_searchresult=BANKTT_SRC_searchstmt.executeQuery(BANKTT_SRC_QUERY);
    var BANKTT_SRC_SEARCHRESULTS_ARRAY=[];
    if(optionflag==1)
    {
      while(BANKTT_SRC_searchresult.next())
      {
        var btid=BANKTT_SRC_searchresult.getString("BT_ID");
        var transaction=BANKTT_SRC_searchresult.getString("BANK_TRANSFER_TYPE");
        var date=BANKTT_SRC_searchresult.getString("BT_DATE");
        date=eilib.SqlDateFormat(date);
        var unit=BANKTT_SRC_searchresult.getString("UNIT_NO");
        if(unit==null){unit=""}
        var customer=BANKTT_SRC_searchresult.getString("CUSTOMERNAME");
        if(customer==null){customer=""}
        var accountno=BANKTT_SRC_searchresult.getString("BT_ACC_NO")
        if(accountno==null){accountno=""}
        var accountname=BANKTT_SRC_searchresult.getString("BT_ACC_NAME");
        if(accountname==null){accountname=""}
        var amount=BANKTT_SRC_searchresult.getString("BT_AMOUNT");
        var status=BANKTT_SRC_searchresult.getString("TRANSACTION_STATUS");
        var debiteddate=BANKTT_SRC_searchresult.getString("BT_DEBITED_ON");
        if(debiteddate==null){debiteddate=""}
        else
        {debiteddate=eilib.SqlDateFormat(debiteddate)}
        var bankcode=BANKTT_SRC_searchresult.getString("BT_BANK_CODE");
        if(bankcode==null){bankcode=""}
        var branchcode=BANKTT_SRC_searchresult.getString("BT_BRANCH_CODE");
        if(branchcode==null){branchcode=""}
        var bankaddress=BANKTT_SRC_searchresult.getString("BT_BANK_ADDRESS");
        if(bankaddress==null){bankaddress=""}
        var swiftcode=BANKTT_SRC_searchresult.getString("BT_SWIFT_CODE");
        if(swiftcode==null){swiftcode=""}
        var chargesto=BANKTT_SRC_searchresult.getString("BANK_TRANSFER_CHARGES_TO");
        if(chargesto==null){chargesto=""}
        var custref=BANKTT_SRC_searchresult.getString("BT_CUST_REF");
        if(custref==null){custref=""}
        var invdetails=BANKTT_SRC_searchresult.getString("BT_INV_DETAILS");
        if(invdetails==null){invdetails=""}
        var createdby=BANKTT_SRC_searchresult.getString("BANK_TRANSFER_CREATED_BY");
        if(createdby==null){createdby=""}
        var comments=BANKTT_SRC_searchresult.getString("BT_COMMENTS");
        if(comments==null){comments=""}
        var userstamp=BANKTT_SRC_searchresult.getString("ULD_LOGINID");
        var timestamp=BANKTT_SRC_searchresult.getString("BT_TIME_STAMP");
        var BANKTT_SRC_RESULTS={"BTID":btid,"TYPE":transaction,"DATE":date,"UNIT":unit,"CUSTOMER":customer,"ACCNO":accountno,"ACCNAME":accountname,"AMOUNT":amount,"STATUS":status,"DEBITED":debiteddate,"BANKCODE":bankcode,"BRANCHCODE":branchcode,"BANKADDRESS":bankaddress,"SWIFTCODE":swiftcode,"CHARGESTO":chargesto,"INVDETAILS":invdetails,"CUSTREF":custref,"CREATEDBY":createdby,"COMMENTS":comments,"USERSTAMP":userstamp,"TIMESTAMP":timestamp};
        BANKTT_SRC_SEARCHRESULTS_ARRAY.push(BANKTT_SRC_RESULTS);
      }
    }
    BANKTT_SRC_searchresult.close();
    BANKTT_SRC_searchstmt.close();
    var BANKTT_temptabledeletestmt=BANKTT_SRC_conn.createStatement();
    var BANKTT_tempdeletequery1="DROP TABLE "+banktttmptablename1+"";
    var BANKTT_tempdeletequery2="DROP TABLE "+banktttmptablename2+"";
    if(banktttmptablename1!=null)
    {
      BANKTT_temptabledeletestmt.execute(BANKTT_tempdeletequery1);
    }
    if(banktttmptablename2!=null)
    {
      BANKTT_temptabledeletestmt.execute(BANKTT_tempdeletequery2);
    }
    BANKTT_temptabledeletestmt.close();
    return BANKTT_SRC_SEARCHRESULTS_ARRAY;
    BANKTT_SRC_conn.close();
  }
  function BANKTT_SRC_processFormUpdate(updationrecords)
  {
    var id=updationrecords.BANKTT_SRC_tb_id;
    var unit=updationrecords.BANKTT_SRC_tb_tempunit;
    if(unit=="" || unit==undefined)
    {unit==""}
    var customer=updationrecords.BANKTT_SRC_tb_tempcustomer;
    if(customer=="" || customer==undefined)
    {customer==""}
    var tttype=updationrecords.BANKTT_SRC_tb_temptttype;
    var modelname=updationrecords.BANKTT_SRC_lb_modelname;
    if(modelname=="SELECT" ||modelname==undefined)
    {    modelname=null;var model='';  }
    else
    {  model=modelname;  modelname="'"+modelname+"'";  }
    var date1=updationrecords.BANKTT_SRC_db_date;
    var string = date1.split("-");
    var date=string[2]+'-'+ string[1]+'-'+string[0];
    var accountname=updationrecords.BANKTT_SRC_tb_accountname;
    if(accountname=="" || accountname==undefined)
    {    var accname=''; accountname=null;  }
    else
    {   accname=accountname; accountname="'"+accountname+"'";  }
    var accountno=updationrecords.BANKTT_SRC_tb_accountno;
    if(accountno=="" || accountno==undefined)
    {   var accno="";  accountno=null;   }
    else
    { accno=accountno;   accountno="'"+accountno+"'"  }
    var amount=updationrecords.BANKTT_SRC_tb_amount;
    var status=updationrecords.BANKTT_SRC_lb_status;
    var debiteddate=updationrecords.BANKTT_SRC_db_debited;
    if(debiteddate=="" || debiteddate==undefined)
    { debiteddate=null; var debited=''; }
    else
    {
      var string = debiteddate.split("-");
      var debit_date=string[2]+'-'+ string[1]+'-'+string[0];
      debited=debiteddate
      debiteddate="'"+debit_date+"'"; 
    }
    var bankcode=updationrecords.BANKTT_SRC_tb_bankcode;
    if(bankcode=="" || bankcode==undefined)
    {    var bank=""; bankcode=null; }
    else
    {  bank=bankcode;   bankcode="'"+bankcode+"'"; }
    var branchcode=updationrecords.BANKTT_SRC_tb_branchcode;
    
    if(branchcode=="" || branchcode==undefined)
    {   var branch=""; branchcode=null;}
    else
    {   var branch= branchcode; branchcode="'"+branchcode+"'"; }
    var bankaddress=updationrecords.BANKTT_SRC_ta_bankaddress;
    if(bankaddress!="")
    {
      bankaddress=eilib.ConvertSpclCharString(bankaddress);
    }
    var mailbankaddress=updationrecords.BANKTT_SRC_ta_bankaddress;
    var swiftcode=updationrecords.BANKTT_SRC_tb_swiftcode;
    if(swiftcode=="" || swiftcode==undefined)
    {    var swift=""; swiftcode=null;}
    else
    {   swift=swiftcode;  swiftcode="'"+swiftcode+"'"; }
    var chargesto=updationrecords.BANKTT_SRC_lb_chargesto;
    if(chargesto=="SELECT" || chargesto==undefined)
    {  var charge="";   chargesto=' '; }
    else
    {  charge=chargesto ;  chargesto=chargesto; }
    var custref=updationrecords.BANKTT_SRC_tb_custref;
    var invdetails=updationrecords.BANKTT_SRC_ta_invdetails;
    if(invdetails!="")
    { invdetails=eilib.ConvertSpclCharString(invdetails);}
    var mailinvdetails=updationrecords.BANKTT_SRC_ta_invdetails;
    var comments=updationrecords.BANKTT_SRC_ta_comments;
    var mailcomments=updationrecords.BANKTT_SRC_ta_comments;
    if(comments!="")
    {  comments=eilib.ConvertSpclCharString(comments); }
    var created=updationrecords.BANKTT_SRC_lb_created;
    if(created=="SELECT" || created==undefined)
    {  var create="";   created=' '; }
    else
    {  create=created ;  created=created; }
    if(chargesto!=' ' && created!=' '){var configdatas=status+','+created+','+chargesto}
    else if(chargesto!=' '){configdatas=status+','+chargesto}
    else if(created!=' '){configdatas=status+','+created}
    else{configdatas=status}
    var BANKTT_SRC_conn =eilib.db_GetConnection();
    var BANKTT_SRC_updatestmt=BANKTT_SRC_conn.createStatement();
    var BANKTT_SRC_updatequery="CALL SP_BANK_TT_UPDATE("+id+",'"+configdatas+"',"+modelname+",'"+date+"',"+amount+","+accountname+","+accountno+","+bankcode+","+branchcode+",'"+bankaddress+"',"+swiftcode+",'"+custref+"','"+invdetails+"',"+debiteddate+",'"+comments+"','"+UserStamp+"',@BANK_SUCCESSFLAG)";
    BANKTT_SRC_updatestmt.execute(BANKTT_SRC_updatequery);
    var BANKTT_SRC_updateresult=BANKTT_SRC_updatestmt.executeQuery("SELECT @BANK_SUCCESSFLAG");
    if(BANKTT_SRC_updateresult.next())
    { var returnflag=BANKTT_SRC_updateresult.getString(1);}
    BANKTT_SRC_updateresult.close();
    BANKTT_SRC_updatestmt.close();
    if(returnflag==1)
    {
      var bankttmailid=eilib.getProfileEmailId(BANKTT_SRC_conn,"BANKTT")
      var banktttomailid=bankttmailid[0].toString();
      var username=banktttomailid.split('@');
      var mailusername=username[0].toUpperCase();
      var headerarray=['DATE','TRANSACTION TYPE','MODEL NAME','ACC NAME','ACC NO','AMOUNT','UNIT','CUSTOMER','STATUS','DEBITED/REJECTED DATE','BANK CODE','BRANCH CODE','BANK ADDRESS','SWIFT CODE','CHARGES TO','CUST REF','INV DETAILS','DONE BY','COMMENTS'];
      var dataarray=[date1,tttype,model,accname,accno,amount,unit,customer,status,debited,bank,branch,mailbankaddress,swift,charge,custref,mailinvdetails,create,mailcomments];
      var subject="HELLO "+" <font color='gray'>"+"</font>"+"<font color='#498af3'><b>"+mailusername+"</b> </font>"+"<br>"+" PLEASE FIND ATTACHED NEW TRANSACTION DETAILS FROM BANK TT: "+"<br>";
      var message = '<body>'+'<br>'+'<h> '+subject+'</h>'+'<br>'+'</body>';
      for(var i=0;i<dataarray.length;i++)
      {
        var value=dataarray[i];
        if(customer!=null){customer=customer.replace('_',' ')}
        if(value=="" || value=="SELECT" || value==null)continue;
        if(value!='REJECTED')
        {
          message += '<body>'+'<table border="1"width="600" >'+'<tr align="left" >'+'<td width=40%>'+headerarray[i]+'</td>'+'<td width=60%>'+value+'</td>'+'</tr>'+'</table>'+'</body>';
        }
        else
        {
          message += '<body>'+'<table border="1"width="600" >'+'<tr align="left" >'+'<td width=40%>'+headerarray[i]+'</td>'+'<td width=60%><span style="background-color:#FF0000">'+value+'</span></td>'+'</tr>'+'</table>'+'</body>';
        }
      }
      if(status!='REJECTED')
      {
        var emailsubject="BANK TRANSFER";
      }
      else
      {
        emailsubject="BANK TRANSFER-REJECTED";
      }
      var displayname ='BANK TT' ;
      var advancedArgs={cc:bankttmailid[1],name:displayname,htmlBody:message};
      MailApp.sendEmail(banktttomailid,emailsubject,message ,advancedArgs);
    }
    return returnflag;
    BANKTT_SRC_conn.close();
  }
}
catch(err)
{
}
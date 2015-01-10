//*****************************************************BANK TT*********************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY:KUMAR
//VER 1.03- SD:13/08/2014 ED:13/08/2014,TRACKER NO:674,changed bankcode and branch code prefix accepting zero.
//VER 1.02- SD:23/07/2014 ED:23/07/2014,TRACKER NO:674,showing all customer name in customer list for selected unit and all units.
//VER 1.01- SD:21/06/2014 ED:21/06/2014,TRACKER NO:674,SET min and max date for banktt DP(MIN DATE AS SYSDATE-1 YEAR AND MAX DATE AS SYSDATE) AND implemented connection error message.
//VER 1.00- SD:06/06/2014 ED:06/06/2014,TRACKER NO:674,Changed preloader and jquery,css links.
//VER 0.09- SD:19/04/2014 ED:19/04/2014,TRACKER NO:674,Changed table name and Restricted manual inputs in DP.
//VER 0.08- SD:07/03/2014 ED:07/03/2014,TRACKER NO:674,Did ULD ID and removed repeated queries and return flag updated 
//VER 0.07- SD:25/01/2014 ED:27/01/2014,TRACKER NO 674,Did TT TYPE,CREATED BY,CHARGES TO,STATUS tables merged to banktt configuration table and Error mesaages getting from Eilib.
//VER 0.06- SD:05/01/2014 ED:06/01/2014,TRACKER NO 674,did New CR in ver0.06
//VER 0.05- SD:30/12/2013 ED:30/12/2013,TRACKER NO 674,Removed sleep function and multiple conn in ver0.05
//VER 0.04- SD:30/11/2013 ED:30/11/2013,TRACKER NO:674 -gave error msg no customers in sellected unit and changed datepicker for change month and year dropdown box in ver0.04
//VER 0.03- SD:30/11/2013 ED:30/11/2013,TRACKER NO:171-changed html file name and gs file name in ver0.03
//VER 0.02- SD:03/12/2013 ED:03/12/2013,TRACKER NO:171Added Return function script in ver0.02
//VER 0.01-INITIAL VERSION-SD:14/09/2013 ED:17/09/2013,TRACKER NO:171
//*********************************************************************************************************//
try
{
  function BANKTT_ENTRY_Customer(unit)
  {
    var BANKTT_ENTRYcustomername_array=[];
    var BANKTT_ENTRY_conn=eilib.db_GetConnection();
    var BANKTT_ENTRYstmt = BANKTT_ENTRY_conn.createStatement();
    var BANKTT_ENTRYactivecustomerquery="SELECT DISTINCT C.CUSTOMER_ID,CONCAT(CUSTOMER_FIRST_NAME,' ',CUSTOMER_LAST_NAME)AS CUSTOMERNAME FROM UNIT U,CUSTOMER_ENTRY_DETAILS CED,CUSTOMER C WHERE C.CUSTOMER_ID=CED.CUSTOMER_ID AND CED.UNIT_ID=U.UNIT_ID AND U.UNIT_NO="+unit+""
    var BANKTT_ENTRY_customerresult = BANKTT_ENTRYstmt.executeQuery(BANKTT_ENTRYactivecustomerquery);//3.CUSTOMER
    while(BANKTT_ENTRY_customerresult.next())
    {
      BANKTT_ENTRYcustomername_array.push({customername:BANKTT_ENTRY_customerresult.getString("CUSTOMERNAME"),customerid:BANKTT_ENTRY_customerresult.getString("CUSTOMER_ID")});
    }
    return BANKTT_ENTRYcustomername_array;
    BANKTT_ENTRY_customerresult.close();
    BANKTT_ENTRYstmt.close();
    BANKTT_ENTRY_conn.close();
  }
  function BANKTT_ENTRY_commonvalues()
  {
    var BANKTT_ENTRY_conn =eilib.db_GetConnection();
    ////////////UNIT NO TABLE/////////////
    var BANKTT_ENTRY_unit_array =eilib.getAllUunits(BANKTT_ENTRY_conn);
    /*******************BANKTT_CONFIGURATION***********************/
    var BANKTT_ENTRY_configstmt = BANKTT_ENTRY_conn.createStatement();
    var BANKTT_ENTRY_type_array =[];
    var BANKTT_ENTRY_charge_array =[];
    var BANKTT_ENTRY_configtype_query = "SELECT CGN_ID,BCN_DATA FROM BANKTT_CONFIGURATION WHERE CGN_ID IN(69,71)order by BCN_DATA ASC"; 
    var BANKTT_ENTRY_configtype_result = BANKTT_ENTRY_configstmt.executeQuery(BANKTT_ENTRY_configtype_query);
    while(BANKTT_ENTRY_configtype_result.next())
    {
      if(BANKTT_ENTRY_configtype_result.getString("CGN_ID")==69)
      {
        BANKTT_ENTRY_type_array.push(BANKTT_ENTRY_configtype_result.getString("BCN_DATA"));
      }
      if(BANKTT_ENTRY_configtype_result.getString("CGN_ID")==71)
      {
        BANKTT_ENTRY_charge_array.push(BANKTT_ENTRY_configtype_result.getString("BCN_DATA"));
      }
    }
    BANKTT_ENTRY_configtype_result.close();
    BANKTT_ENTRY_configstmt.close();
    ////////////MODELNAME DETAILS TABLE/////////////
    var BANKTT_ENTRY_modelstmt = BANKTT_ENTRY_conn.createStatement();
    var BANKTT_ENTRY_model_array =[];
    var BANKTT_ENTRY_model_query = "SELECT BTM_DATA FROM BANK_TRANSFER_MODELS WHERE BTM_OBSOLETE IS NULL ORDER BY BTM_DATA ASC"; 
    var BANKTT_ENTRY_model_result = BANKTT_ENTRY_modelstmt.executeQuery(BANKTT_ENTRY_model_query);
    while(BANKTT_ENTRY_model_result.next())
    {
      BANKTT_ENTRY_model_array.push(BANKTT_ENTRY_model_result.getString("BTM_DATA"));
    }
    BANKTT_ENTRY_model_result.close();
    BANKTT_ENTRY_modelstmt.close();
    ////////////ERROR MESSAGES/////////////
    var BANKTT_ENTRY_error_code ='1,2,3,6,247,248,400';
    var BANKTT_ENTRY_error_array=eilib.GetErrorMessageList(BANKTT_ENTRY_conn,BANKTT_ENTRY_error_code);
    var emailname=eilib.getProfileEmailId(BANKTT_ENTRY_conn,"BANKTT");
    var BANKTT_ENTRY_RESULTS={unit:BANKTT_ENTRY_unit_array,type:BANKTT_ENTRY_type_array,model:BANKTT_ENTRY_model_array,charges:BANKTT_ENTRY_charge_array,error:BANKTT_ENTRY_error_array.errormsg,emailname:emailname[0]};
    return BANKTT_ENTRY_RESULTS;
    BANKTT_ENTRY_conn.close();
  }
  function BANKTT_ENTRY_processFormSubmit(BANKTT_ENTRY_DETAILS)
  {
    var BANKTT_ENTRY_conn =eilib.db_GetConnection();
    var tttype=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_lb_tttype;
    var modelname=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_lb_modelname;
    if(modelname=="SELECT")    { var mailmodelname='';   modelname=null;  }
    else
    { mailmodelname=modelname;  modelname="'"+modelname+"'";}
    var bankttdate=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_db_date;
    var date=eilib.SqlDateFormat(bankttdate);
    var accountname=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_tb_accountname;
    if(accountname=="")    {    var accname=''; accountname=null;  }    else    {   accname=accountname; accountname="'"+accountname+"'";    }
    var accountno=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_tb_accountno;
    if(accountno=="")    {   var accno="";  accountno=null;   }    else    { accno=accountno;   accountno="'"+accountno+"'"  }
    var amount=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_tb_amount;
    var unit=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_lb_unit;
    if(unit=="SELECT")    {    unit=null;  }
    var customerid=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_tb_customerid;
    if(customerid=="" ||customerid==undefined)
    {customerid=null;}
    var customer=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_lb_customer;
    if(customer=="SELECT" ||customer==undefined)
    {    customer='';  }
    var bankcode=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_tb_bankcode;
    if(bankcode=="")
    {    var bank=""; bankcode=null; }
    else
    {  bank=bankcode;   bankcode="'"+bankcode+"'"; }
    var branchcode=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_tb_branchcode;
    if(branchcode=="")
    {   var branch=""; branchcode=null;}
    else
    {   var branch= branchcode; branchcode="'"+branchcode+"'"; }
    var bankaddress=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_ta_bankaddress;
    if(bankaddress!="")
    {
      bankaddress=eilib.ConvertSpclCharString(bankaddress);
    }
    var mailbankaddress=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_ta_bankaddress;
    var swiftcode=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_tb_swiftcode;
    if(swiftcode=="")
    {    var swift=""; swiftcode=null;}
    else
    {   swift=swiftcode;  swiftcode="'"+swiftcode+"'"; }
    var chargesto=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_lb_chargesto;
    if(chargesto=="SELECT")
    {  var charge="";   chargesto=' '; }
    else
    {  charge=chargesto ;  chargesto=chargesto; }
    var custref=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_tb_custref;
    var invdetails=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_ta_invdetails;
    if(invdetails!="")
    { invdetails=eilib.ConvertSpclCharString(invdetails); }
    var mailinvdetails=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_ta_invdetails;
    var comments=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_ta_comments
    var mailcomments=BANKTT_ENTRY_DETAILS.BANKTT_ENTRY_ta_comments;
    if(comments!="")
    { comments=eilib.ConvertSpclCharString(comments); }
    var bankttstatus="ENTERED";
    var configdatas=tttype+','+bankttstatus+','+chargesto;
    var BANKTT_ENTRY_conn =eilib.db_GetConnection();
    var BANKTT_ENTRY_insertstmt=BANKTT_ENTRY_conn.createStatement();
    var BANKTT_ENTRY_insertquery="CALL SP_BANK_TT_INSERT('"+configdatas+"',"+modelname+","+unit+","+customerid+",'"+date+"',"+amount+","+accountname+","+accountno+","+bankcode+","+branchcode+",'"+bankaddress+"',"+swiftcode+",'"+custref+"','"+invdetails+"','"+comments+"','"+UserStamp+"',@BANK_SUCCESSFLAG)";
    BANKTT_ENTRY_insertstmt.execute(BANKTT_ENTRY_insertquery);
    var BANKTT_SRC_insertresult=BANKTT_ENTRY_insertstmt.executeQuery("SELECT @BANK_SUCCESSFLAG");
    if(BANKTT_SRC_insertresult.next())
    {
      var returnflag=BANKTT_SRC_insertresult.getString(1);
    }
    BANKTT_SRC_insertresult.close();
    BANKTT_ENTRY_insertstmt.close();
    if(returnflag==1)
    {
      var bankttmailid=eilib.getProfileEmailId(BANKTT_ENTRY_conn,"BANKTT")
      var banktttomailid=bankttmailid[0].toString();
      var username=banktttomailid.split('@');
      var mailusername=username[0].toUpperCase();
      var headerarray=['DATE','TRANSACTION TYPE','MODEL NAME','ACC NAME','ACC NO','AMOUNT','UNIT','CUSTOMER','BANK CODE','BRANCH CODE','BANK ADDRESS','SWIFT CODE','CHARGES TO','CUST REF','INV DETAILS','COMMENTS'];
      var dataarray=[bankttdate,tttype,mailmodelname,accname,accno,amount,unit,customer,bank,branch,mailbankaddress,swift,charge,custref,mailinvdetails,mailcomments];
      var subject="HELLO "+" <font color='gray'>"+"</font>"+"<font color='#498af3'><b>"+mailusername+"</b> </font>"+"<br>"+" PLEASE FIND ATTACHED NEW TRANSACTION DETAILS FROM BANK TT: "+"<br>";
      var message = '<body>'+'<br>'+'<h> '+subject+'</h>'+'<br>'+'</body>';
      for(var i=0;i<dataarray.length;i++)
      {
        var value=dataarray[i];
        if(value!=null){value=value.replace('_',' ')}
        if(value=="" || value=="SELECT" || value==null)continue;
        message += '<body>'+'<table border="1"width="600" >'+'<tr align="left" >'+'<td width=40%>'+headerarray[i]+'</td>'+'<td width=60%>'+value+'</td>'+'</tr>'+'</table>'+'</body>';
      }
      var emailsubject="BANK TRANSFER";
      var displayname =eilib.Get_MailDisplayName('BANK_TT');
      var advancedArgs={cc:bankttmailid[1],name:displayname,htmlBody:message};
      MailApp.sendEmail(banktttomailid,emailsubject,message ,advancedArgs);
    }
    return returnflag;
    BANKTT_ENTRY_conn.close();
  }
}
catch(err)
{
}
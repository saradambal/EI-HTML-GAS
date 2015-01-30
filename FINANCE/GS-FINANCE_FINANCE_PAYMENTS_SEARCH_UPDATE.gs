//********************************************PAYMENT SEARCH/UPDATE*********************************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY:PUNI
//VER 2.02- SD:07/10/2014 ED:07/10/2014,TRACKER NO:786,Corrected preloader and msgbox position
//DONE BY:KUMAR
//VER 2.01- SD:19/09/2014 ED:19/09/2014,TRACKER NO:786,Implemented preloader and msgbox position script
//VER 2.00- SD:22/08/2014 ED:22/08/2014,TRACKER NO:786 Updated new jquery and css links and add autogrow line and reduced payment extract function script lines.
//VER 1.09- SD:11/08/2014 ED:11/08/2014,TRACKER NO 786 Cleared for period search button validation issue.
//VER 1.08- SD:25/07/2014 ED:25/07/2014,TRACKER NO 786 partial amount hightlighted in payment history spreadsheet.
//VER 1.07- SD:11/07/2014 ED:11/07/2014,TRACKER NO 786 Cleared paiddate search max date issue and amountrange search validation issue
//VER 1.06- SD:30/06/2014 ED:30/06/2014,TRACKER NO 786 added filesharing function and amount box max digits 4 to 5.
//VER 1.05- SD:18/06/2014 ED:18/06/2014,TRACKER NO 786 Added conn error message and did paiddate validation(set paiddate min date as customer 1st recver date - 1year)
//VER 1.04- SD:09/06/2014 ED:09/06/2014,TRACKER NO 786 Added commit() command after updating filefolder id in file access table.
//VER 1.03- SD:05/06/2014 ED:05/06/2014,TRACKER NO 786 Added empty parameter in move to folder function and updated new jquery and css link;
//VER 1.02- SD:01/06/2014 ED:01/06/2014,TRACKER NO 786 Did button alignments and added preterminate conditions in Updation form.
//VER 1.01- SD:24/05/2014 ED:24/05/2014,TRACKER NO 786 changed paid date DP format now showing drop down for month and year and set paiddate maxdate is sysdate.
//VER 1.00- SD:21/05/2014 ED:21/05/2014,TRACKER NO 786 Cleared payment details extract header issue in SS side and SS name also changed removed HTML bofore ss name.
//VER 0.09- SD:13/05/2014 ED:13/05/2014,TRACKER NO:786 Cleared updation form preloader issue and button validation issues.
//VER 0.08- SD:23/04/2014 ED:26/03/2014,TRACKER NO:786 Restricted DP manual inputs,clered form title and fromamt and to amt error msg issues.
//VER 0.07- SD:14/03/2014 ED:14/03/2014,TRACKER NO:673 used payment search dynamic temp table sp and changed forperiod dp format
//VER 0.06- SD:10/03/2014 ED:11/01/2014,TRACKER NO:673 changed uld id removed repeated queires;
//VER 0.05- SD:23/01/2014 ED:23/01/2014,TRACKER NO:673 changed proloader path and changed title alignment in ver 0.05
//VER 0.04- SD:31/12/2013 ED:01/01/2014,TRACKER NO:673 removed  sleep functions and gave unit and customer error messages
//VER 0.03- SD:17/12/2013 ED:17/12/2013,TRACKER NO:673 gave error msg for no customer in selected unit and forperiod date convertion all r getting from eilib 
//VER 0.02- SD:13/12/2013 ED:13/12/2013,TRACKER NO:171Added Return function script and Did Paid date vaidation in ver0.02
//VER 0.01-INITIAL VERSION-SD:13/09/2013 ED:14/09/2013,TRACKER NO:171
//*********************************************************************************************************//
try
{
  ////////////UNIT SEARCH FUNCTION///////////////
  function FIN_SRC_paymentsearchoptions(searchinput1,searchinput2,searchinput3,searchinput4,searchinput5,label)
  {
    var FIN_SRC_UPD_DEL_conn=eilib.db_GetConnection();
    var emptyinput=null;
    if(label==2)
    {
      var temptablequery="CALL SP_PAYMENT_SEARCH_TEMP_TABLE('"+searchinput1+"',"+emptyinput+","+emptyinput+","+emptyinput+","+emptyinput+","+label+",'"+UserStamp+"',@FINALTABLENAME)";
      var FIN_SRC_searchquery="SELECT RD.PP_ID,RD.PD_ID,U.UNIT_NO,RD.CUSTOMER_ID,RD.CED_REC_VER,C.CUSTOMER_FIRST_NAME,C.CUSTOMER_LAST_NAME,RUFD.PD_PAYMENT,RD.PD_HIGHLIGHT_FLAG,RUFD.PD_DEPOSIT,RUFD.PD_PROCESSING_FEE,RUFD.PD_CLEANING_FEE,RUFD.PD_DEPOSIT_REFUND,RD.PD_FOR_PERIOD,RD.PD_PAID_DATE,RD.PD_COMMENTS,ULD.ULD_lOGINID,DATE_FORMAT(CONVERT_TZ(RD.PD_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS RD_TIME_STAMP FROM TEMP_PAYMENT_FEE_DETAIL RUFD,PAYMENT_DETAILS RD ,UNIT U,CUSTOMER C,USER_LOGIN_DETAILS ULD WHERE RUFD.PD_ID=RD.PD_ID AND C.CUSTOMER_ID=RD.CUSTOMER_ID AND RD.CUSTOMER_ID=RUFD.CUSTOMER_ID AND RD.UNIT_ID=U.UNIT_ID AND RUFD.UNIT_ID=RD.UNIT_ID AND U.UNIT_NO='"+searchinput1+"' AND RD.ULD_ID=ULD.ULD_ID ORDER BY U.UNIT_NO,C.CUSTOMER_FIRST_NAME,PD_FOR_PERIOD"; 
    }
    if(label==3)
    {
      var temptablequery="CALL SP_PAYMENT_SEARCH_TEMP_TABLE("+searchinput1+",'"+searchinput2+"',"+emptyinput+","+emptyinput+","+emptyinput+","+label+",'"+UserStamp+"',@FINALTABLENAME)";
      FIN_SRC_searchquery="SELECT RD.PP_ID,RD.PD_ID,U.UNIT_NO,RD.CUSTOMER_ID,RD.CED_REC_VER,C.CUSTOMER_FIRST_NAME,C.CUSTOMER_LAST_NAME,RUFD.PD_PAYMENT,RD.PD_HIGHLIGHT_FLAG,RUFD.PD_DEPOSIT,RUFD.PD_PROCESSING_FEE,RUFD.PD_CLEANING_FEE,RUFD.PD_DEPOSIT_REFUND,RD.PD_FOR_PERIOD,RD.PD_PAID_DATE,RD.PD_COMMENTS,ULD.ULD_lOGINID,DATE_FORMAT(CONVERT_TZ(RD.PD_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS RD_TIME_STAMP FROM TEMP_PAYMENT_FEE_DETAIL RUFD,PAYMENT_DETAILS RD ,UNIT U,CUSTOMER C,USER_LOGIN_DETAILS ULD WHERE RUFD.PD_ID=RD.PD_ID AND C.CUSTOMER_ID=RD.CUSTOMER_ID AND RD.CUSTOMER_ID=RUFD.CUSTOMER_ID AND RD.UNIT_ID=U.UNIT_ID AND RUFD.UNIT_ID=RD.UNIT_ID AND RD.ULD_ID=ULD.ULD_ID ORDER BY U.UNIT_NO,C.CUSTOMER_FIRST_NAME,PD_FOR_PERIOD"; 
    }
    if(label==4)
    {
      var forperiodreturnvalues=eilib.GetForperiodDateFormat(searchinput1,searchinput2)
      var temptablequery="CALL SP_PAYMENT_SEARCH_TEMP_TABLE('"+forperiodreturnvalues.frmdate+"','"+forperiodreturnvalues.todate+"',"+emptyinput+","+emptyinput+","+emptyinput+","+label+",'"+UserStamp+"',@FINALTABLENAME)";
      FIN_SRC_searchquery="SELECT RD.PP_ID,RD.PD_ID,U.UNIT_NO,RD.CUSTOMER_ID,RD.CED_REC_VER,C.CUSTOMER_FIRST_NAME,C.CUSTOMER_LAST_NAME,RUFD.PD_PAYMENT,RD.PD_HIGHLIGHT_FLAG,RUFD.PD_DEPOSIT,RUFD.PD_PROCESSING_FEE,RUFD.PD_CLEANING_FEE,RUFD.PD_DEPOSIT_REFUND,RD.PD_FOR_PERIOD,RD.PD_PAID_DATE,RD.PD_COMMENTS,ULD.ULD_lOGINID,DATE_FORMAT(CONVERT_TZ(RD.PD_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS RD_TIME_STAMP FROM TEMP_PAYMENT_FEE_DETAIL RUFD,PAYMENT_DETAILS RD ,UNIT U,CUSTOMER C,USER_LOGIN_DETAILS ULD WHERE RUFD.PD_ID=RD.PD_ID AND C.CUSTOMER_ID=RD.CUSTOMER_ID AND RD.CUSTOMER_ID=RUFD.CUSTOMER_ID AND RD.UNIT_ID=U.UNIT_ID AND RUFD.UNIT_ID=RD.UNIT_ID AND RD.ULD_ID=ULD.ULD_ID  ORDER BY U.UNIT_NO,C.CUSTOMER_FIRST_NAME,PD_FOR_PERIOD"; 
    }
    if(label==5)
    {
      var PAYMENT_fromdate =eilib.SqlDateFormat(searchinput1);
      var PAYMENT_todate =eilib.SqlDateFormat(searchinput2);
      var temptablequery="CALL SP_PAYMENT_SEARCH_TEMP_TABLE('"+PAYMENT_fromdate+"','"+PAYMENT_todate+"',"+emptyinput+","+emptyinput+","+emptyinput+","+label+",'"+UserStamp+"',@FINALTABLENAME)";
      FIN_SRC_searchquery="SELECT RD.PP_ID,RD.PD_ID,U.UNIT_NO,RD.CUSTOMER_ID,RD.CED_REC_VER,C.CUSTOMER_FIRST_NAME,C.CUSTOMER_LAST_NAME,RUFD.PD_PAYMENT,RD.PD_HIGHLIGHT_FLAG,RUFD.PD_DEPOSIT,RUFD.PD_PROCESSING_FEE,RUFD.PD_CLEANING_FEE,RUFD.PD_DEPOSIT_REFUND,RD.PD_FOR_PERIOD,RD.PD_PAID_DATE,RD.PD_COMMENTS,ULD.ULD_lOGINID,DATE_FORMAT(CONVERT_TZ(RD.PD_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS RD_TIME_STAMP FROM TEMP_PAYMENT_FEE_DETAIL RUFD,PAYMENT_DETAILS RD ,UNIT U,CUSTOMER C,USER_LOGIN_DETAILS ULD WHERE RUFD.PD_ID=RD.PD_ID AND C.CUSTOMER_ID=RD.CUSTOMER_ID AND RD.CUSTOMER_ID=RUFD.CUSTOMER_ID AND RD.UNIT_ID=U.UNIT_ID AND RUFD.UNIT_ID=RD.UNIT_ID AND RD.ULD_ID=ULD.ULD_ID ORDER BY U.UNIT_NO,C.CUSTOMER_FIRST_NAME,PD_FOR_PERIOD"; 
    }
    if(label==6)
    {
      var forperiodreturnvalues=eilib.GetForperiodDateFormat(searchinput2,searchinput3)
      var temptablequery="CALL SP_PAYMENT_SEARCH_TEMP_TABLE("+searchinput1+",'"+forperiodreturnvalues.frmdate+"','"+forperiodreturnvalues.todate+"','"+searchinput4+"','"+searchinput5+"',"+label+",'"+UserStamp+"',@FINALTABLENAME)";
      FIN_SRC_searchquery="SELECT RD.PP_ID,RD.PD_ID,U.UNIT_NO,RD.CUSTOMER_ID,RD.CED_REC_VER,C.CUSTOMER_FIRST_NAME,C.CUSTOMER_LAST_NAME,RUFD.PD_PAYMENT,RD.PD_HIGHLIGHT_FLAG,RUFD.PD_DEPOSIT,RUFD.PD_PROCESSING_FEE,RUFD.PD_CLEANING_FEE,RUFD.PD_DEPOSIT_REFUND,RD.PD_FOR_PERIOD,RD.PD_PAID_DATE,RD.PD_COMMENTS,ULD.ULD_lOGINID,DATE_FORMAT(CONVERT_TZ(RD.PD_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS RD_TIME_STAMP FROM TEMP_PAYMENT_FEE_DETAIL RUFD,PAYMENT_DETAILS RD ,UNIT U,CUSTOMER C,USER_LOGIN_DETAILS ULD WHERE RUFD.PD_ID=RD.PD_ID AND C.CUSTOMER_ID=RD.CUSTOMER_ID AND RD.CUSTOMER_ID=RUFD.CUSTOMER_ID AND RD.UNIT_ID=U.UNIT_ID AND RUFD.UNIT_ID=RD.UNIT_ID AND RD.ULD_ID=ULD.ULD_ID ORDER BY U.UNIT_NO,C.CUSTOMER_FIRST_NAME,PD_FOR_PERIOD"; 
    }
    var FIN_SRC_unittempstmt=FIN_SRC_UPD_DEL_conn.createStatement();
    FIN_SRC_unittempstmt.execute(temptablequery);
    FIN_SRC_unittempstmt.close();
    var FIN_temptablestmt=FIN_SRC_UPD_DEL_conn.createStatement();
    var FIN_temptableresult=FIN_temptablestmt.executeQuery('SELECT @FINALTABLENAME');
    if(FIN_temptableresult.next())
    {
      var FIN_TEMPTABLENAME=FIN_temptableresult.getString(1);
    }
    FIN_temptableresult.close();
    FIN_temptablestmt.close();
    FIN_SRC_searchquery=FIN_SRC_searchquery.replace('TEMP_PAYMENT_FEE_DETAIL',FIN_TEMPTABLENAME);
    var FIN_SRC_unitstmt=FIN_SRC_UPD_DEL_conn.createStatement();
    var FIN_SRC_unitsearchresult=FIN_SRC_unitstmt.executeQuery(FIN_SRC_searchquery);
    var FIN_SRC_unitsearcharray=[];
    while(FIN_SRC_unitsearchresult.next())
    {
      var paymentid=FIN_SRC_unitsearchresult.getString("PP_ID");
      var FIN_SRC_id=FIN_SRC_unitsearchresult.getString("PD_ID");
      var FIN_SRC_rec_ver=FIN_SRC_unitsearchresult.getString("CED_REC_VER");
      var FIN_SRC_custid=FIN_SRC_unitsearchresult.getString("CUSTOMER_ID");
      var FIN_SRC_unit=FIN_SRC_unitsearchresult.getString("UNIT_NO");
      var FIN_SRC_customer=FIN_SRC_unitsearchresult.getString("CUSTOMER_FIRST_NAME")+' '+FIN_SRC_unitsearchresult.getString("CUSTOMER_LAST_NAME");
      var FIN_SRC_rental=FIN_SRC_unitsearchresult.getString("PD_PAYMENT");
      if(FIN_SRC_rental==null)
      {      FIN_SRC_rental='';    }
      var FIN_SRC_deposit=FIN_SRC_unitsearchresult.getString("PD_DEPOSIT");
      if(FIN_SRC_deposit==null)
      { FIN_SRC_deposit="";}
      var FIN_SRC_process=FIN_SRC_unitsearchresult.getString("PD_PROCESSING_FEE");
      if(FIN_SRC_process==null)
      { FIN_SRC_process='';}
      var FIN_SRC_cleaning=FIN_SRC_unitsearchresult.getString("PD_CLEANING_FEE");
      if(FIN_SRC_cleaning==null)
      { FIN_SRC_cleaning='';}
      var FIN_SRC_refund=FIN_SRC_unitsearchresult.getString("PD_DEPOSIT_REFUND");
      if(FIN_SRC_refund==null)
      { FIN_SRC_refund='';}
      var amount_flag=FIN_SRC_unitsearchresult.getString("PD_HIGHLIGHT_FLAG");
      var FIN_SRC_forperiod=FIN_SRC_unitsearchresult.getDate("PD_FOR_PERIOD").getTime();
      FIN_SRC_forperiod =Utilities.formatDate(new Date(FIN_SRC_forperiod), TimeZone, 'MMMM-yyyy');
      var FIN_SRC_paiddate=Utilities.formatDate(new Date(FIN_SRC_unitsearchresult.getDate("PD_PAID_DATE").getTime()), TimeZone, 'dd-MM-yyyy');
      var FIN_SRC_comments=FIN_SRC_unitsearchresult.getString("PD_COMMENTS");
      if((FIN_SRC_comments==null)||(FIN_SRC_comments==""))
      {  FIN_SRC_comments="";  }
      var FIN_SRC_userstamp=FIN_SRC_unitsearchresult.getString("ULD_LOGINID");
      var FIN_SRC_timestamp=FIN_SRC_unitsearchresult.getString("RD_TIME_STAMP");
      var FIN_SRC_unitresult={PPID:paymentid,RENTALID:FIN_SRC_id,UNIT:FIN_SRC_unit,CUSTOMER_ID:FIN_SRC_custid,REC_VER:FIN_SRC_rec_ver,CUSTOMER:FIN_SRC_customer,RENTAL:FIN_SRC_rental,DEPOSIT:FIN_SRC_deposit,PROCESS:FIN_SRC_process,CLEAN:FIN_SRC_cleaning,REFUND:FIN_SRC_refund,amountflag:amount_flag,FORPERIOD:FIN_SRC_forperiod,PAIDDATE:FIN_SRC_paiddate,COMMENTS:FIN_SRC_comments,USER:FIN_SRC_userstamp,TIME:FIN_SRC_timestamp};
      FIN_SRC_unitsearcharray.push(FIN_SRC_unitresult);
    }
    FIN_SRC_unitsearchresult.close();
    FIN_SRC_unitstmt.close();
    eilib.DropTempTable(FIN_SRC_UPD_DEL_conn,FIN_TEMPTABLENAME);
    var FIN_SRC_unitarray=[2]
    var FIN_SRC_returnarray=[FIN_SRC_unitsearcharray,label,FIN_SRC_unitarray];
    return FIN_SRC_returnarray;
    FIN_SRC_UPD_DEL_conn.close();
  }
  //////////////CUSTOMER NAME FOR SELECTED UNIT///////////
  function FIN_SRC_unitcustomerlist(unit)
  {
    var FIN_SRC_UPD_DEL_conn=eilib.db_GetConnection();
    if(unit!="SELECT")
    {
      var FIN_SRC_customername_array=[];
      var FIN_SRC_customerstmt = FIN_SRC_UPD_DEL_conn.createStatement();
      var FIN_SRC_activecustomerquery="SELECT DISTINCT CONCAT(C.CUSTOMER_FIRST_NAME,'_',C.CUSTOMER_LAST_NAME)AS CUSTOMERNAME FROM UNIT U,CUSTOMER C,CUSTOMER_ENTRY_DETAILS CED,CUSTOMER_LP_DETAILS CTD WHERE U.UNIT_ID=CED.UNIT_ID AND C.CUSTOMER_ID=CED.CUSTOMER_ID AND CTD.CUSTOMER_ID=C.CUSTOMER_ID AND U.UNIT_NO="+unit+" ORDER BY U.UNIT_NO,C.CUSTOMER_FIRST_NAME"
      var FIN_SRC_customerresult = FIN_SRC_customerstmt.executeQuery(FIN_SRC_activecustomerquery);//3.CUSTOMER
      while(FIN_SRC_customerresult.next())
      {
        FIN_SRC_customername_array.push(FIN_SRC_customerresult.getString("CUSTOMERNAME"));
      }
      FIN_SRC_customername_array=eilib.unique(FIN_SRC_customername_array);
      return FIN_SRC_customername_array;
      FIN_SRC_customerresult.close();
      FIN_SRC_customerstmt.close();
    }
  }
  ////////////////UPDATION RECORDS FUNCTION/////////////////////////
  function FIN_SRC_Paymentupdationdetails(rentalid,recver,custid)
  {
    var FIN_SRC_UPD_DEL_conn=eilib.db_GetConnection();
    var FIN_SRC_UPD_udstmt=FIN_SRC_UPD_DEL_conn.createStatement();
    var FIN_SRC_UPD_udquery="SELECT PD.CUSTOMER_ID,PD.PD_ID,U.UNIT_NO,C.CUSTOMER_FIRST_NAME,C.CUSTOMER_LAST_NAME,PP.PP_DATA,PD.PD_AMOUNT,PD.PD_HIGHLIGHT_FLAG,PD.PD_FOR_PERIOD,PD.PD_PAID_DATE,PD.PD_COMMENTS FROM PAYMENT_DETAILS PD,UNIT U,CUSTOMER C,PAYMENT_PROFILE PP WHERE PD_ID='"+rentalid+"' AND U.UNIT_ID=PD.UNIT_ID AND C.CUSTOMER_ID=PD.CUSTOMER_ID AND PP.PP_ID=PD.PP_ID"
    var FIN_SRC_UPD_udresult=FIN_SRC_UPD_udstmt.executeQuery(FIN_SRC_UPD_udquery);
    var FIN_SRC_UPD_udrecordarray=[];
    while(FIN_SRC_UPD_udresult.next())
    {
      var FIN_SRC_UPD_id=FIN_SRC_UPD_udresult.getString("PD_ID");
      var FIN_SRC_UPD_unit=FIN_SRC_UPD_udresult.getString("UNIT_NO");
      var FIN_SRC_UPD_customer=FIN_SRC_UPD_udresult.getString("CUSTOMER_FIRST_NAME")+'_'+FIN_SRC_UPD_udresult.getString("CUSTOMER_LAST_NAME");
      var FIN_SRC_UPD_payment=FIN_SRC_UPD_udresult.getString("PP_DATA");
      var FIN_SRC_UPD_amount=FIN_SRC_UPD_udresult.getString("PD_AMOUNT");
      var FIN_SRC_UPD_flag=FIN_SRC_UPD_udresult.getString("PD_HIGHLIGHT_FLAG");
      var FIN_SRC_UPD_forperiod=FIN_SRC_UPD_udresult.getDate("PD_FOR_PERIOD").getTime();
      FIN_SRC_UPD_forperiod =Utilities.formatDate(new Date(FIN_SRC_UPD_forperiod), TimeZone, 'MMMM-yyyy');
      var FIN_SRC_UPD_paiddate=FIN_SRC_UPD_udresult.getString("PD_PAID_DATE");
      var FIN_SRC_UPD_comments=FIN_SRC_UPD_udresult.getString("PD_COMMENTS");
      var FIN_SRC_UPD_customerid=FIN_SRC_UPD_udresult.getString("CUSTOMER_ID");
      if((FIN_SRC_UPD_comments==null)||(FIN_SRC_UPD_comments==""))
      {
        FIN_SRC_UPD_comments="";
      }
      FIN_SRC_UPD_udrecordarray.push({customerid:FIN_SRC_UPD_customerid,paymentid:FIN_SRC_UPD_id,paymentunit:FIN_SRC_UPD_unit,paymentcustomer:FIN_SRC_UPD_customer,paymenttype:FIN_SRC_UPD_payment,paymentamount:FIN_SRC_UPD_amount,paymentflag:FIN_SRC_UPD_flag,paymentperiod:FIN_SRC_UPD_forperiod,paymentpaiddate:FIN_SRC_UPD_paiddate,paymentcomments:FIN_SRC_UPD_comments})
    }
    FIN_SRC_UPD_udresult.close();
    FIN_SRC_UPD_udstmt.close()
    var FIN_SRC_UPD_recordsstmt=FIN_SRC_UPD_DEL_conn.createStatement();
    var FIN_SRC_UPD_recordquery="SELECT CED.CUSTOMER_ID,CED.CED_REC_VER,CLP.CLP_STARTDATE,CLP.CLP_ENDDATE,CLP.CLP_PRETERMINATE_DATE FROM CUSTOMER_LP_DETAILS CLP,CUSTOMER_ENTRY_DETAILS CED WHERE CLP.CUSTOMER_ID="+custid+" AND CLP.CLP_GUEST_CARD IS NULL AND CED.CUSTOMER_ID=CLP.CUSTOMER_ID AND CLP.CED_REC_VER=CED.CED_REC_VER AND UNIT_ID=(SELECT UNIT_ID FROM UNIT WHERE UNIT_NO="+FIN_SRC_UPD_unit+") ORDER BY CED.CED_REC_VER";
    var FIN_SRC_UPD_recordresult=FIN_SRC_UPD_recordsstmt.executeQuery(FIN_SRC_UPD_recordquery);
    var recverdate_array=[];
    var CURRENT_RECVER_DETAILS=[];
    while(FIN_SRC_UPD_recordresult.next())
    {
      var recverid=FIN_SRC_UPD_recordresult.getString("CED_REC_VER");
      var startdate=FIN_SRC_UPD_recordresult.getString("CLP_STARTDATE");
      var custenddate=FIN_SRC_UPD_recordresult.getString("CLP_ENDDATE");
      var preterminatedate=FIN_SRC_UPD_recordresult.getString("CLP_PRETERMINATE_DATE");
      if(preterminatedate!=null)
      {
       var enddate=preterminatedate;
       var lpenddate=Utilities.formatDate(new Date(FIN_SRC_UPD_recordresult.getDate("CLP_PRETERMINATE_DATE").getTime()), TimeZone, 'dd-MMM-yyyy');
      }
      else
      {
        var enddate=custenddate;
        lpenddate=Utilities.formatDate(new Date(FIN_SRC_UPD_recordresult.getDate("CLP_ENDDATE").getTime()), TimeZone, 'dd-MMM-yyyy');
      }
      var lpstartdate=Utilities.formatDate(new Date(FIN_SRC_UPD_recordresult.getDate("CLP_STARTDATE").getTime()), TimeZone, 'dd-MMM-yyyy');
      
      if(recver==recverid)
      {
        CURRENT_RECVER_DETAILS.push({start:startdate,end:enddate,recver:recverid,lpstartdate:lpstartdate,lpenddate:lpenddate});
      }
      recverdate_array.push({rec_start:startdate,rec_end:enddate,rec_recver:recverid,lpstartdate:lpstartdate,lpenddate:lpenddate});
    }
    FIN_SRC_UPD_recordresult.close();
    FIN_SRC_UPD_recordsstmt.close();
    var paiddate_startdate=eilib.FIN_paiddate_validation(FIN_SRC_UPD_DEL_conn, custid)
    var RECVER_DETAILS=[FIN_SRC_UPD_udrecordarray,CURRENT_RECVER_DETAILS,recverdate_array,paiddate_startdate];
    return RECVER_DETAILS;
    FIN_SRC_UPD_DEL_conn.close();
  }
  /////////////UPDATE FUNCTION//////////////////////
  function FIN_SRC_paymentupdation(id,unit,customer,leaseperiod,payment,amount,period,paiddate,comments,flag)
  {
    var lp=leaseperiod.split('/');
    var amountflag='X';
    if(flag==false){var paymentflag=null}else{paymentflag="'"+amountflag+"'"};
    var FIN_SRC_UPD_DEL_conn=eilib.db_GetConnection();
    var fin_paiddate=eilib.SqlDateFormat(paiddate);
    if(comments!="")
    {
    comments=eilib.ConvertSpclCharString(comments);
    }
    var FIN_SRC_UPD_DEL_updatestmt=FIN_SRC_UPD_DEL_conn.createStatement();
    var FIN_SRC_UPD_DEL_updatequery="CALL SP_PAYMENT_DETAIL_UPDATE("+id+","+unit+","+customer+",'"+payment+"',"+lp[2]+","+amount+",'"+period+"','"+fin_paiddate+"',"+paymentflag+",'"+comments+"','"+UserStamp+"',@ERRORMSG)";
    FIN_SRC_UPD_DEL_updatestmt.execute(FIN_SRC_UPD_DEL_updatequery);
    FIN_SRC_UPD_DEL_updatestmt.close();
    var updateconformstmt=FIN_SRC_UPD_DEL_conn.createStatement();
    var updateconformquery="SELECT @ERRORMSG";
    var updateconformresult=updateconformstmt.executeQuery(updateconformquery);
    while(updateconformresult.next())
    {
      var errormsg=updateconformresult.getString(1);
    }
    updateconformresult.close();
    updateconformstmt.close();
    if(errormsg!="")
    { return errormsg; }
    else
    { return "UPDATION" }
    FIN_SRC_UPD_DEL_conn.close();
  }
  function FIN_SRC_paymentdeletion(id)
  {
    var FIN_SRC_UPD_DEL_conn=eilib.db_GetConnection();
    var returnflag=eilib.DeleteRecord(FIN_SRC_UPD_DEL_conn, 18, id);
    return returnflag;
    FIN_SRC_UPD_DEL_conn.close();
  }
  function FIN_SRC_commonvalues()
  {
    var FIN_SRC_conn=eilib.db_GetConnection();
    /////////////////UNIT////////////////////////
    var FIN_SRC_unit_array =eilib.getAllUunits(FIN_SRC_conn);
    ///////////////////PAYMENT DETAILS/////////////////
    var FIN_SRC_paymentdetailsstmt = FIN_SRC_conn.createStatement();
    var FIN_SRC_paymentdetails_array =[];
    var FIN_SRC_paymentdetails_query = "SELECT PD_ID FROM PAYMENT_DETAILS WHERE PD_ID LIMIT 1"; 
    var FIN_SRC_paymentdetails_result = FIN_SRC_paymentdetailsstmt.executeQuery(FIN_SRC_paymentdetails_query);
    if(FIN_SRC_paymentdetails_result.next())
    {
      var FIN_SRC_paymentdetails=(FIN_SRC_paymentdetails_result.getString("PD_ID"));
    }
    FIN_SRC_paymentdetails_result.close();
    FIN_SRC_paymentdetailsstmt.close();
    ///////////////////PAYMENT/////////////////
    var FIN_SRC_payment_array=eilib.getPaymentProfile(FIN_SRC_conn)
    ///////////////////ERROR MESSAGES////////////////////////
    var FIN_SRC_errorstmt = FIN_SRC_conn.createStatement();
    var FIN_SRC_error_code ='2,5,45,93,247,248,315';
    var FIN_SRC_error_array=eilib.GetErrorMessageList(FIN_SRC_conn, FIN_SRC_error_code);
    var FIN_SRC_optionstmt = FIN_SRC_conn.createStatement();
    var FIN_SRC_option_array =[];
    var FIN_SRC_option_query = "SELECT *FROM PAYMENT_CONFIGURATION WHERE CGN_ID=58 order by PCN_DATA ASC"; 
    var FIN_SRC_option_result = FIN_SRC_optionstmt.executeQuery(FIN_SRC_option_query);
    while(FIN_SRC_option_result.next())
    {
      FIN_SRC_option_array.push({optiondata:FIN_SRC_option_result.getString("PCN_DATA"),optionid:FIN_SRC_option_result.getString("PCN_ID")});
    }
    FIN_SRC_option_result.close();
    FIN_SRC_optionstmt.close();
    var FIN_SRC_RESULTS={option:FIN_SRC_option_array,unit:FIN_SRC_unit_array,payment:FIN_SRC_payment_array,error:FIN_SRC_error_array.errormsg,Record:FIN_SRC_paymentdetails}
    return FIN_SRC_RESULTS;
    FIN_SRC_conn.close();
  }
  function FIN_SRC_CustomerPaymentDetails(customerdetails)
  {
    var FIN_SRC_conn=eilib.db_GetConnection();
    /*****************************GETTING FOLDER ID FROM DEPOSIT DEDUCTION CONFIGURATION TABLE*********************/
    var FIN_SRC_DDsheetstmt=FIN_SRC_conn.createStatement();
    var FIN_SRC_DDsheetquery="SELECT DDC_DATA FROM DEPOSIT_DEDUCTION_CONFIGURATION WHERE CGN_ID=30";
    var FIN_SRC_DDsheetresult=FIN_SRC_DDsheetstmt.executeQuery(FIN_SRC_DDsheetquery);
    if(FIN_SRC_DDsheetresult.next())
    {
      var DDsheetid=FIN_SRC_DDsheetresult.getString(1);
    }
    FIN_SRC_DDsheetresult.close();
    FIN_SRC_DDsheetstmt.close();
    var widtharray=[50,250,150,75,150,130,150,100,100,300,150,250];
    /*********************CHECKING FOR SS ALREADY EXISTING OR NOT IN FOLDER***********************/
    var year=Utilities.formatDate(new Date(), TimeZone,'yyyy');
    var SSname='EI_DEPOSIT_DEDUCTIONS_'+year;
    var Drivefiles=DriveApp.getFolderById(DDsheetid).getFiles();
    var SSexistflag=0;
    var Sexistflag=0;
    while(Drivefiles.hasNext())
    {
      var filename=Drivefiles.next();
      var fileid=filename.getId();
      if(SSname==filename)
      {
        SSexistflag=1;
        var SSfileid=fileid;
        break;
      }
    }
    if(SSexistflag==1)
    {
      var SSsheet=SpreadsheetApp.openById(SSfileid).getSheets();
      for(var i=0;i<SSsheet.length;i++)
      {
        if(SSsheet[i].getName()=='PAYMENT HISTORY')
        {
          Sexistflag=1;
        }
      }
    }
    var ssheaders=['UNIT','CUSTOMER NAME','PAYMENT AMOUNT','DEPOSIT','PROCESSING FEE','CLEANINGFEE','DEPOSIT REFUND','FORPERIOD','PAIDDATE','COMMENTS','TIMESTAMP','USERSTAMP']
    /*************************ALREADY EXISTING SS DELETE OLD RECORDS AND RELOAD ALL DETAILS*****************************/
    if(SSexistflag==1 && Sexistflag==1)
    {
      var Spreadsheetid=SSfileid;
      var ex_unit=customerdetails[0].UNIT;
      var ex_customer=customerdetails[0].CUSTOMER;
      var paymentsheet=SpreadsheetApp.openById(SSfileid).getSheetByName('PAYMENT HISTORY');
      var paymentrecordschk=paymentsheet.getRange(1, 1, paymentsheet.getLastRow(), 2).getValues();
      var deleterowflag=0;
      var rowid_array=[];
      for(var row in paymentrecordschk)
      {
        var unit=paymentrecordschk[row][0];
        var customer=paymentrecordschk[row][1];
        if(unit==ex_unit && customer==ex_customer)
        {
          var existflag=1;
          var startrow=row;
          break;
        }
      }
      for(var row in paymentrecordschk)
      {
        var unit=paymentrecordschk[row][0];
        var customer=paymentrecordschk[row][1];
        if(unit==ex_unit && customer==ex_customer)
        {
          var endrow=row;
        }
      }
      if(existflag==1)
      {
        var counting=parseInt(endrow-startrow)+2;
        paymentsheet.deleteRows(startrow,counting);
      }
    }
    /************************EXISTING SS CREATE PAYMENT DETAILS SHEET AND CREATING SS HEADERS************************************/
    else if(SSexistflag==1 && Sexistflag==0)
    {
      Spreadsheetid=SSfileid;
      
      var paymentsheetcreate=SpreadsheetApp.openById(SSfileid)
      var paymentsheet=paymentsheetcreate.insertSheet('PAYMENT HISTORY');
      var newddsheetlastrow=paymentsheet.getLastRow()+1;
      for(var k=0;k<ssheaders.length;k++)
      {
        paymentsheet.getRange(newddsheetlastrow,k+1).setValue(ssheaders[k]);
        paymentsheet.setColumnWidth(k+1,widtharray[k]);
      }
      PaymentHeaderbgcolorsetting(paymentsheet)
    }
    /**********************************CREATE NEW SS AND SHEET AND INSERTING HEADERS****************************/
    else if(SSexistflag==0 && Sexistflag==0)
    {
      var paymentsheet_create=SpreadsheetApp.create(SSname);
      var paymentsheet=paymentsheet_create.getActiveSheet().setName('PAYMENT HISTORY');
      var paymentsheetid=paymentsheet_create.getId();
      Spreadsheetid=paymentsheetid;
      var DDC_stmt = FIN_SRC_conn.createStatement();
      DDC_stmt.execute("UPDATE FILE_PROFILE SET FP_FILE_ID='"+paymentsheetid+"' WHERE FP_ID=1");
      DDC_stmt.close();
      FIN_SRC_conn.commit();
      eilib.CUST_moveFileToFolder(paymentsheetid,'',DDsheetid);
      var CCRE_docowner=eilib.CUST_documentowner(FIN_SRC_conn);
      var newddsheetlastrow=paymentsheet.getLastRow()+1;
      for(var k=0;k<ssheaders.length;k++)
      {
        paymentsheet.getRange(newddsheetlastrow,k+1).setValue(ssheaders[k]);
        paymentsheet.setColumnWidth(k+1,widtharray[k]);
      }
      PaymentHeaderbgcolorsetting(paymentsheet);
      eilib.Deposit_Deduction_fileSharing(paymentsheetid,DDsheetid);
      eilib.SetDocOwner(paymentsheetid,CCRE_docowner,UserStamp);
    }
    /**********************INSERTING PAYMENT DETAILS IN SS***************************/
    var paymentsheet=SpreadsheetApp.openById(Spreadsheetid).getSheetByName('PAYMENT HISTORY');
    for(var i=0;i<customerdetails.length;i++)
    {
      var paymentlastrow=paymentsheet.getLastRow()+1;
      var rowvalue=customerdetails[i];
      paymentsheet.getRange(paymentlastrow,1).setValue("'"+rowvalue.UNIT);
      paymentsheet.getRange(paymentlastrow,2).setValue(rowvalue.CUSTOMER);
      var amountflagvalue=rowvalue.amountflag;
      var paymentid=rowvalue.PPID;
      paymentsheet.getRange(paymentlastrow,3).setValue(rowvalue.RENTAL);
      paymentsheet.getRange(paymentlastrow,4).setValue(rowvalue.DEPOSIT);
      paymentsheet.getRange(paymentlastrow,5).setValue(rowvalue.PROCESS);
      paymentsheet.getRange(paymentlastrow,6).setValue(rowvalue.CLEAN);
      paymentsheet.getRange(paymentlastrow,7).setValue(rowvalue.REFUND);
      paymentsheet.getRange(paymentlastrow,8).setValue("'"+rowvalue.FORPERIOD);
      paymentsheet.getRange(paymentlastrow,9).setValue("'"+rowvalue.PAIDDATE);
      paymentsheet.getRange(paymentlastrow,10).setValue(rowvalue.COMMENTS);
      paymentsheet.getRange(paymentlastrow,11).setValue("'"+rowvalue.TIME);
      paymentsheet.getRange(paymentlastrow,12).setValue(rowvalue.USER);
      if(rowvalue.amountflag=='X')
      {
        var coumnnumber=parseInt(paymentid)+2;
        paymentsheet.getRange(paymentlastrow,coumnnumber).setBackground('#FF0000').setFontColor('white'); 
      }
    }
    paymentsheet
    var paymentlastrow1=paymentsheet.getLastRow()+1;
    paymentsheet.getRange(paymentlastrow1,1).setValue('end');
    paymentsheet.getRange(paymentlastrow1, 1, 1, 12).setBackground('#000000');
    var totalcolumns=paymentsheet.getLastColumn();
    FIN_SRC_conn.close();
  }
  function PaymentHeaderbgcolorsetting(paymentsheet)
  {
      var paymentlastrow1=paymentsheet.getLastRow()+1;
      paymentsheet.getRange(paymentlastrow1,1).setValue('end');
      paymentsheet.getRange(paymentlastrow1, 1, 1, 12).setBackground('#000000');
      paymentsheet.setFrozenRows(1);
      paymentsheet.getRange(1, 1, 1, paymentsheet.getLastColumn()).setBackground('#498af3').setFontColor('white').setFontSize(12).setFontStyle('BOLD');
  }
}
catch(err)
{
}
//-*******************************************FILE DESCRIPTION*********************************************
//*******************************************CUSTOMER CREATION UAT*********************************************//
//DONE BY:PUNITHA
//VER 0.03-ISSUE:828,COMMENT #8,UPDATED ANOTHER EMAIL PROFILE FOR EMAIL ID LIST -FUNCTION TAKEN FROM EILIB BY PUNI
//VER 0.02-ISSUE:828,COMMENT #4,TOOK COPY OF LATEST VERSION 1.04 OF CUSTOMER CREATION,REMOVED CAL EVENT CALL FUNCTION BY PUNI
//VER 0.01-INITIAL VERSION-ISSUE:828,TOOK COPY OF LATEST VERSION 1.03 OF CUSTOMER CREATION,ADDED PREFIX AS UAT,ADDED ONE FUNCTION TO GET UAT CONNECTION N REPLACED CONN FN IN GS BY PUNI
//*********************************************************************************************************-->

try
{ 
  /************************FUNCTION TO GET ROOMTYPE FOR SELECTED UNIT*****************************/
  function UAT_CCRE_Roomtype(UAT_CCRE_unit,UAT_CCRE_nullpara)
  {
    var UAT_CCRE_conn = eilib.db_GetUATConnection();
    var UAT_CCRE_roomtypearray =[];
    UAT_CCRE_roomtypearray=eilib.CUST_getRoomType(UAT_CCRE_conn,UAT_CCRE_unit, UAT_CCRE_nullpara);
    var UAT_CCRE_unitstart_enddate=eilib.GetUnitSdEdate(UAT_CCRE_conn,UAT_CCRE_unit);
    var startdate=eilib.SqlDateFormat(UAT_CCRE_unitstart_enddate.unitsdate)
    var enddate=eilib.SqlDateFormat(UAT_CCRE_unitstart_enddate.unitedate)
    var UAT_CCRE_unitstart_enddate_array=[startdate,enddate]
    var return_array=[UAT_CCRE_roomtypearray,UAT_CCRE_unitstart_enddate_array];
    return return_array;
    UAT_CCRE_conn.close();
  }
  /************************FUNCTION TO GET ACCESSCARD FOR SELECTED UNIT*****************************/
  function UAT_CCRE_CardNumber(UAT_CCRE_unit,UAT_CCRE_firstname,UAT_CCRE_lastname)
  {
    var UAT_CCRE_conn = eilib.db_GetUATConnection();
    var UAT_CCRE_cardnoresult=[];
    UAT_CCRE_cardnoresult=eilib.CUST_getunitCardNo(UAT_CCRE_conn,UAT_CCRE_unit, UAT_CCRE_firstname, UAT_CCRE_lastname);
    return UAT_CCRE_cardnoresult;
    UAT_CCRE_conn.close();
  }
  /************************FUNCTION TO CALCULATE PRORATED BASED ON STARTDATE AND ENDDATE*****************************/
  function UAT_CCRE_prorated(UAT_CCRE_startdate,UAT_CCRE_enddate)
  {
    var UAT_CCRE_chkproflag="";
    UAT_CCRE_chkproflag=eilib.CUST_chkProrated(UAT_CCRE_startdate, UAT_CCRE_enddate);
    return UAT_CCRE_chkproflag;
  }
  /************************CUSTOMER CREATION SAVING PART*****************************/
  function UAT_CCRE_processFormSubmit(customercreation)
  {
    var UAT_CCRE_card_array=customercreation.temptex;
    var UAT_CCRE_accesscard="";
    var UAT_CCRE_guestcard="";
    if(UAT_CCRE_card_array==undefined)
    { var flag=1; }
    var UAT_CCRE_firstname=customercreation.UAT_CCRE_tb_firstname;
    var UAT_CCRE_lastname=customercreation.UAT_CCRE_tb_lastname;
    var UAT_CCRE_custname=UAT_CCRE_firstname+' '+UAT_CCRE_lastname;
    if(UAT_CCRE_card_array!=undefined)
    {
      var UAT_CCRE_find=(UAT_CCRE_card_array.toString()).search(',');
      if(UAT_CCRE_find!=-1)
      {
        flag=0;
        for(var i=0;i<UAT_CCRE_card_array.length;i++)
        {
          if(UAT_CCRE_card_array[i]=="")continue;
          var UAT_CCRE_card=UAT_CCRE_card_array[i].split('/');
          if(UAT_CCRE_card[1]==UAT_CCRE_custname)
          {
            if(UAT_CCRE_accesscard=="")
            {
              UAT_CCRE_accesscard=UAT_CCRE_card[0];
              UAT_CCRE_guestcard=UAT_CCRE_card[0]+','+' ';
              var cardno=UAT_CCRE_card[0];
            }
            else
            {
              UAT_CCRE_accesscard=UAT_CCRE_accesscard+','+UAT_CCRE_card[0];
              UAT_CCRE_guestcard=UAT_CCRE_guestcard+','+UAT_CCRE_card[0]+', ';
              cardno=UAT_CCRE_card[0];
            }
          }
          else
          {
            if(UAT_CCRE_accesscard=="")
            {
              UAT_CCRE_guestcard=UAT_CCRE_card[0]+',X';
              UAT_CCRE_accesscard=UAT_CCRE_card[0];
            }
            else
            {
              UAT_CCRE_accesscard=UAT_CCRE_accesscard+','+UAT_CCRE_card[0];
              UAT_CCRE_guestcard=UAT_CCRE_guestcard+','+UAT_CCRE_card[0]+',X';
            }
          }
        }
      }
      else
      {
        flag=0;
        var UAT_CCRE_singleard=UAT_CCRE_card_array.split('/');
        UAT_CCRE_accesscard=UAT_CCRE_singleard[0];
        UAT_CCRE_guestcard=UAT_CCRE_singleard[0]+', ';
        cardno=UAT_CCRE_singleard[0];
      }
    }
    else
    { cardno=""; }
    var UAT_CCRE_conn =eilib.db_GetUATConnection();
    var UAT_CCRE_firstname=customercreation.UAT_CCRE_tb_firstname;
    var UAT_CCRE_lastname=customercreation.UAT_CCRE_tb_lastname;
    var UAT_CCRE_name=UAT_CCRE_firstname+' '+UAT_CCRE_lastname;
    var UAT_CCRE_customermailid=customercreation.UAT_CCRE_tb_custmailid;
    var UAT_CCRE_dateofbirth=customercreation.UAT_CCRE_db_BirthDate;
    if(UAT_CCRE_dateofbirth=="")
    {    UAT_CCRE_dateofbirth=null;  }else{UAT_CCRE_dateofbirth="'"+eilib.SqlDateFormat(UAT_CCRE_dateofbirth)+"'";}
    var UAT_CCRE_nationality=eilib.ConvertSpclCharString(customercreation.UAT_CCRE_lb_nationselect);
    var UAT_CCRE_passportno=customercreation.UAT_CCRE_tb_passportno;
    if(UAT_CCRE_passportno=="")
    {  UAT_CCRE_passportno=null;var passportno="";  }else{passportno=UAT_CCRE_passportno;UAT_CCRE_passportno="'"+UAT_CCRE_passportno+"'";}
    var UAT_CCRE_passportdate=customercreation.UAT_CCRE_db_passportdate;
    if(UAT_CCRE_passportdate=="")
    {    UAT_CCRE_passportdate=null; var passportdate="";  }else{passportdate=UAT_CCRE_passportdate;UAT_CCRE_passportdate="'"+eilib.SqlDateFormat(UAT_CCRE_passportdate)+"'";}
    var UAT_CCRE_companyname=customercreation.UAT_CCRE_tb_companyname;
    if(UAT_CCRE_companyname=="")
    {    UAT_CCRE_companyname=null;var UAT_CCRE_compname="";  }else{UAT_CCRE_compname=UAT_CCRE_companyname;UAT_CCRE_companyname="'"+UAT_CCRE_companyname+"'";}
    var UAT_CCRE_companyaddress=customercreation.UAT_CCRE_tb_companyaddress;
    if(UAT_CCRE_companyaddress=="")
    {    UAT_CCRE_companyaddress=null;  }else{UAT_CCRE_companyaddress="'"+UAT_CCRE_companyaddress+"'";}
    var UAT_CCRE_companypostalcode=customercreation.UAT_CCRE_tb_companypostalcode;
    if(UAT_CCRE_companypostalcode=="")
    {    UAT_CCRE_companypostalcode=null;  }else{UAT_CCRE_companypostalcode="'"+UAT_CCRE_companypostalcode+"'";}
    var UAT_CCRE_mobile=customercreation.UAT_CCRE_tb_mobile;
    if(UAT_CCRE_mobile=="")
    {    UAT_CCRE_mobile=null;  }else{UAT_CCRE_mobile="'"+UAT_CCRE_mobile+"'";}
    var UAT_CCRE_intmobile=customercreation.UAT_CCRE_tb_intmobile;
    if(UAT_CCRE_intmobile=="")
    {    UAT_CCRE_intmobile=null;  }else{UAT_CCRE_intmobile="'"+UAT_CCRE_intmobile+"'";}
    var UAT_CCRE_office=customercreation.UAT_CCRE_tb_office;
    if(UAT_CCRE_office=="")
    {    UAT_CCRE_office=null;  }else{UAT_CCRE_office="'"+UAT_CCRE_office+"'";}
    var UAT_CCRE_epno=customercreation.UAT_CCRE_tb_epno;
    if(UAT_CCRE_epno=="")
    {    UAT_CCRE_epno=null;var epno=""; }else{epno=UAT_CCRE_epno;UAT_CCRE_epno="'"+UAT_CCRE_epno+"'";}
    var UAT_CCRE_epdate=customercreation.UAT_CCRE_db_epdate;
    if(UAT_CCRE_epdate=="")
    {    UAT_CCRE_epdate=null;var epdate=""}else{epdate=UAT_CCRE_epdate;UAT_CCRE_epdate="'"+eilib.SqlDateFormat(UAT_CCRE_epdate)+"'";}
    var UAT_CCRE_unit=customercreation.UAT_CCRE_lb_unitselect;
    var UAT_CCRE_roomtype=customercreation.UAT_CCRE_lb_roomselect;
    var UAT_CCRE_startdate=eilib.SqlDateFormat(customercreation.UAT_CCRE_db_startdate);
    var UAT_CCRE_enddate=eilib.SqlDateFormat(customercreation.UAT_CCRE_db_enddate);
    var UAT_CCRE_noticeno=customercreation.UAT_CCRE_tb_noticeno;
    if(UAT_CCRE_noticeno=="")
    {    UAT_CCRE_noticeno=null;var noticeno="";}else{noticeno=UAT_CCRE_noticeno;UAT_CCRE_noticeno="'"+UAT_CCRE_noticeno+"'"}
    var UAT_CCRE_noticedate=customercreation.UAT_CCRE_db_noticedate;
    if(UAT_CCRE_noticedate=="")
    {    UAT_CCRE_noticedate=null;var noticedate="";  }else{noticedate=UAT_CCRE_noticedate;UAT_CCRE_noticedate="'"+eilib.SqlDateFormat(UAT_CCRE_noticedate)+"'";}
    var UAT_CCRE_quarterlyfee=customercreation.UAT_CCRE_tb_quarterlyfee;
    if(UAT_CCRE_quarterlyfee=="")
    { UAT_CCRE_quarterlyfee=null; }
    var UAT_CCRE_airconfixed=customercreation.UAT_CCRE_tb_aircon_fixed;
    if(UAT_CCRE_airconfixed=="")
    {  UAT_CCRE_airconfixed=null;}
    var UAT_CCRE_electricity=customercreation.UAT_CCRE_tb_electricity;
    if(UAT_CCRE_electricity=="")
    { UAT_CCRE_electricity=null;}
    var UAT_CCRE_drycleaning=customercreation.UAT_CCRE_tb_drycleaning;
    if(UAT_CCRE_drycleaning=="")
    {  UAT_CCRE_drycleaning=null;}
    var UAT_CCRE_cleaning=customercreation.UAT_CCRE_tb_cleaning;
    if(UAT_CCRE_cleaning=="")
    {  UAT_CCRE_cleaning=null;}
    var UAT_CCRE_deposit=customercreation.UAT_CCRE_tb_deposit;
    if(UAT_CCRE_deposit=="")
    {  UAT_CCRE_deposit=null;}
    var UAT_CCRE_rent=customercreation.UAT_CCRE_tb_rent;
    var UAT_CCRE_process=customercreation.UAT_CCRE_tb_process;
    if(UAT_CCRE_process=="")
    {  UAT_CCRE_process=null}
    var UAT_CCRE_ccoption=customercreation.UAT_CCRE_lb_ccoptionselect;
    var UAT_CCRE_mailid=customercreation.UAT_CCRE_lb_mailselect;
    var UAT_CCRE_comments=customercreation.UAT_CCRE_ta_comments;
    if(UAT_CCRE_comments!="")
    { UAT_CCRE_comments=eilib.ConvertSpclCharString(UAT_CCRE_comments);}
    var UAT_CCRE_startdate_starttime=customercreation.UAT_CCRE_lb_startselect;
    var UAT_CCRE_startdate_endtime=customercreation.UAT_CCRE_lb_startselect1;
    var UAT_CCRE_enddate_starttime=customercreation.UAT_CCRE_lb_endselect
    var UAT_CCRE_enddate_endtime=customercreation.UAT_CCRE_lb_endselect1;
    var UAT_CCRE_check='X';
    var UAT_CCRE_process_check=customercreation.UAT_CCRE_waivedchkbox;
    if(UAT_CCRE_process_check==undefined)
    { var waived=""; UAT_CCRE_process_check=null; }
    else
    { waived=UAT_CCRE_check; UAT_CCRE_process_check="'"+UAT_CCRE_check+"'";}
    var UAT_CCRE_prorated=customercreation.tempcheckbox2;
    var UAT_CCRE_PRORATED=customercreation.UAT_CCRE_proratedcheckbox;
    if((UAT_CCRE_prorated==undefined)&&(UAT_CCRE_PRORATED==undefined))
    { var rentcheck='false'; UAT_CCRE_prorated=null;}
    else
    { rentcheck='true'; UAT_CCRE_prorated="'"+UAT_CCRE_check+"'";}
    var UAT_CCRE_sdate=eilib.SqlDateFormat(UAT_CCRE_startdate).split('-');
    var UAT_CCRE_edate=eilib.SqlDateFormat(UAT_CCRE_enddate).split('-');
    var startdate_ccre=new Date(UAT_CCRE_sdate[2],UAT_CCRE_sdate[1]-1,UAT_CCRE_sdate[0]);
    var enddate_ccre=new Date(UAT_CCRE_edate[2],UAT_CCRE_edate[1]-1,UAT_CCRE_edate[0]);
    var UAT_CCRE_quators  = eilib.quarterCalc(new Date(UAT_CCRE_sdate[2],UAT_CCRE_sdate[1]-1,UAT_CCRE_sdate[0]),new Date(UAT_CCRE_edate[2],UAT_CCRE_edate[1]-1,UAT_CCRE_edate[0])); 
    var UAT_CCRE_Leaseperiod  = eilib.leasePeriodCalc(new Date(UAT_CCRE_sdate[2],UAT_CCRE_sdate[1]-1,UAT_CCRE_sdate[0]),new Date(UAT_CCRE_edate[2],UAT_CCRE_edate[1]-1,UAT_CCRE_edate[0]));
    var UAT_CCRE_customerstmt=UAT_CCRE_conn.createStatement();
    var UAT_CCRE_insertquery="CALL SP_CUSTOMER_CREATION_INSERT('"+UAT_CCRE_firstname+"','"+UAT_CCRE_lastname+"',"+UAT_CCRE_companyname+","+UAT_CCRE_companyaddress+","+UAT_CCRE_companypostalcode+","+UAT_CCRE_office+","+UAT_CCRE_unit+",'"+UAT_CCRE_roomtype+"','"+UAT_CCRE_startdate_starttime+"','"+UAT_CCRE_startdate_endtime+"','"+UAT_CCRE_enddate_starttime+"','"+UAT_CCRE_enddate_endtime+"','"+UAT_CCRE_Leaseperiod+"',"+UAT_CCRE_quators+","+UAT_CCRE_process_check+","+UAT_CCRE_prorated+","+UAT_CCRE_noticeno+","+UAT_CCRE_noticedate+","+UAT_CCRE_rent+","+UAT_CCRE_deposit+","+UAT_CCRE_process+","+UAT_CCRE_airconfixed+","+UAT_CCRE_quarterlyfee+","+UAT_CCRE_electricity+","+UAT_CCRE_cleaning+","+UAT_CCRE_drycleaning+",'"+UAT_CCRE_accesscard+"','"+UAT_CCRE_startdate+"','"+UserStamp+"','"+UAT_CCRE_startdate+"','"+UAT_CCRE_enddate+"','"+UAT_CCRE_guestcard+"','"+UAT_CCRE_nationality+"',"+UAT_CCRE_mobile+","+UAT_CCRE_intmobile+",'"+UAT_CCRE_customermailid+"',"+UAT_CCRE_passportno+","+UAT_CCRE_passportdate+","+UAT_CCRE_dateofbirth+","+UAT_CCRE_epno+","+UAT_CCRE_epdate+",'"+UAT_CCRE_comments+"',@CUSTOMER_SUCCESSFLAG)";
    UAT_CCRE_customerstmt.execute(UAT_CCRE_insertquery);
    var returnflagresult=UAT_CCRE_customerstmt.executeQuery("SELECT @CUSTOMER_SUCCESSFLAG");
    if(returnflagresult.next())
    {
      var returnflag=returnflagresult.getString(1);
    }
    returnflagresult.close();
    UAT_CCRE_customerstmt.close();
    if(returnflag==1)
    {
      var UAT_CCRE_customername=UAT_CCRE_firstname+' '+UAT_CCRE_lastname;
      var UAT_CCRE_cccustidstmt=UAT_CCRE_conn.createStatement();
      var UAT_CCRE_custidquery="SELECT *FROM CUSTOMER ORDER BY CUSTOMER_ID DESC LIMIT 1";
      var UAT_CCRE_custidresult=UAT_CCRE_cccustidstmt.executeQuery(UAT_CCRE_custidquery);
      if(UAT_CCRE_custidresult.next())
      {
        var UAT_CCRE_customerflag=1;
        var UAT_CCRE_custid=UAT_CCRE_custidresult.getString("CUSTOMER_ID");
        var UAT_CCRE_cust_name=UAT_CCRE_custidresult.getString("CUSTOMER_FIRST_NAME")+' '+UAT_CCRE_custidresult.getString("CUSTOMER_LAST_NAME");
      }
      UAT_CCRE_custidresult.close();
      UAT_CCRE_cccustidstmt.close();
      //////////////INVOICE AND CONTRACT DETAILS///////////////
      var cust_config_array=eilib.CUST_invoice_contractreplacetext(UAT_CCRE_conn);
      var UAT_CCRE_invoiceid=cust_config_array[9];
      var UAT_CCRE_contractid=cust_config_array[10];
      var UAT_CCRE_invoicesno=cust_config_array[0];
      var UAT_CCRE_invoicedate=cust_config_array[1];   
      if((UAT_CCRE_customerflag==1)&&(UAT_CCRE_custname==UAT_CCRE_cust_name))
      {
        if(UAT_CCRE_ccoption==4 || UAT_CCRE_ccoption==5 || UAT_CCRE_ccoption==6)
        {
          var UAT_CCRE_docowner=eilib.CUST_documentowner(UAT_CCRE_conn);
          var Folderid=eilib.CUST_TargetFolderId(UAT_CCRE_conn);
          if(UAT_CCRE_ccoption==4)
          {
            eilib.CUST_invoicemail(UAT_CCRE_conn,UAT_CCRE_unit,UAT_CCRE_customername,UAT_CCRE_compname,UAT_CCRE_invoiceid,UAT_CCRE_invoicesno,UAT_CCRE_invoicedate,UAT_CCRE_rent,UAT_CCRE_process,UAT_CCRE_deposit,UAT_CCRE_startdate,UAT_CCRE_enddate,UAT_CCRE_roomtype,UAT_CCRE_Leaseperiod,UAT_CCRE_mailid,Folderid,rentcheck,UAT_CCRE_docowner,'CREATION',waived,UAT_CCRE_custid)
          }
          if(UAT_CCRE_ccoption==5)
          {
            eilib.CUST_contractmail(UAT_CCRE_conn,UAT_CCRE_unit,UAT_CCRE_startdate,UAT_CCRE_enddate,UAT_CCRE_compname,UAT_CCRE_customername,noticeno,passportno,passportdate,epno,epdate,noticedate,UAT_CCRE_Leaseperiod,cardno,UAT_CCRE_rent,UAT_CCRE_quarterlyfee,UAT_CCRE_airconfixed,UAT_CCRE_electricity,UAT_CCRE_drycleaning,UAT_CCRE_cleaning,UAT_CCRE_process,UAT_CCRE_deposit,waived,UAT_CCRE_roomtype,rentcheck,UAT_CCRE_mailid,'CREATION',Folderid,UAT_CCRE_docowner)
          }
          if(UAT_CCRE_ccoption==6)
          {
            eilib.CUST_invoicecontractmail(UAT_CCRE_conn,UAT_CCRE_unit,UAT_CCRE_invoiceid,UAT_CCRE_startdate,UAT_CCRE_enddate,UAT_CCRE_compname,UAT_CCRE_customername,UAT_CCRE_invoicesno,UAT_CCRE_invoicedate,noticeno,passportno,passportdate,epno,epdate,noticedate,UAT_CCRE_Leaseperiod,cardno,UAT_CCRE_rent,UAT_CCRE_quarterlyfee,UAT_CCRE_airconfixed,UAT_CCRE_electricity,UAT_CCRE_drycleaning,UAT_CCRE_cleaning,UAT_CCRE_process,UAT_CCRE_deposit,waived,UAT_CCRE_roomtype,Folderid,rentcheck,UAT_CCRE_docowner,UAT_CCRE_mailid,'CREATION',UAT_CCRE_custid)
          }
        }
      }
      return returnflag;
    }
    UAT_CCRE_conn.close();
  }
  function UAT_CCRE_customercreation_commonvalues()
  {
    var UAT_CCRE_conn = eilib.db_GetUATConnection();
    /************************ERROR MESSAGE*****************************/
    var UAT_CCRE_error_code ='1,2,6,33,34,35,36,37,321,324,339,342,343,344,345,346,347,348,400,443,444,458,459,460,461';
    var UAT_CCRE_error_array=eilib.GetErrorMessageList(UAT_CCRE_conn, UAT_CCRE_error_code);
    var UAT_CCRE_nation_array =eilib.CUST_getNationality(UAT_CCRE_conn);
    var UAT_CCRE_option_array =eilib.CUST_getOptionValue(UAT_CCRE_conn);
    var UAT_CCRE_mail_array =eilib.getProfileEmailId(UAT_CCRE_conn,'CREATION_UAT');
    var UAT_CCRE_timearray=eilib.CUST_getCalendarTime(UAT_CCRE_conn);
    var proratedwaived=eilib.CUST_getProratedWaivedValue(UAT_CCRE_conn);
    var UAT_CCRE_unit_array=eilib.GetActiveUnit(UAT_CCRE_conn);
    var UAT_CCRE_customerSD=eilib.getCustomerStartdate(UAT_CCRE_conn);
    var UAT_CCRE_RESULTS={prorated:proratedwaived,unit:UAT_CCRE_unit_array,time:UAT_CCRE_timearray,email:UAT_CCRE_mail_array,ccoption:UAT_CCRE_option_array,nation:UAT_CCRE_nation_array,error:UAT_CCRE_error_array.errormsg,CustomerSD:UAT_CCRE_customerSD}
    UAT_CCRE_conn.close();
    return UAT_CCRE_RESULTS;
  }
}
catch (err)
{
}
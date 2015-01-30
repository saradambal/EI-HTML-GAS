//*******************************************FILE DESCRIPTION*********************************************//
//************************************CARD ASSIGN***********************************************//
//DONE BY:PUNI
//VER 1.4-SD:22/12/2014 ED:22/12/2014;TRACKER NO:779;added droptemp table function from eilib
//VER 1.3-SD:08/10/2014 ED:08/10/2014;TRACKER NO:779;changed preloader n msgbox position
//VER 1.2-SD:25/08/2014 ED:25/08/2014;TRACKER NO:779;updated new links n AG
//DONE BY:SAFIYULLAH.M
//VER 1.1-SD:07/07/2014 ED:09/06/2014;TRACKER NO:779;UPDTAED RESET FUNCTION
//VER 1.0-SD:11/06/2014 ED:11/06/2014;TRACKER NO:779;updated failure msg
//VER 0.09-SD:06/06/2014 ED:06/06/2014;TRACKER NO:779;CHANGED JQUERY LINK
//VER 0.08-SD:05/05/2014 ED:06/05/2014:TRACKER NO:779;UPDATED DYNAMIC TEMP TABLE 
//VER 0.07-SD;21/04/2014 ED:23/04/2014;TRACKER NO:779;updated script to show error msg if active card is assigned returned from sp,alignment corrected
//VER 0.06-SD;10/03/2014 ED:12/03/2014;TRACKER NO:730;implement array concept.
//VER 0.05-SD;31/01/2014 ED:04/02/2014;TRACKER NO:730;Issues corrected,updated error msg getting from eilib and added convert function for spl char.
//VER 0.04-SD;20/01/2014 ED:21/01/2014;TRACKER NO:712;Added the failure handler when assign card and added SD and Ed for Rec ver;
//VER 0.03-SD:20/12/2013 ED:28/12/2013;TRACKER NO: 339;Applied SP and changes made in design and change identifier
//VER 0.02 - SD:21/09/2013 ED:01/10/2013;TRACKER NO: 339;CHANGED CONNECTION STRING AND REMOVED SCRIPLET
//VER 0.01 - INITIAL VERSION-SD:31/07/2013 ED:03/09/2013;TRACKER NO: 339
//*********************************************************************************************************//

//*************FUNCTION AND CUSTOMER DETAILS ERROR MSG*************************//
try{
   function CCARD_getinitial_values()
  {    
    var CCARD_conn = eilib.db_GetConnection();
    var CCARD_all_cust_values=[];
    CCARD_all_cust_values=CCARD_allcustomerdetails();
    var CCARD_errorAarray=[];    
    var CCARD_select_err_msg='256,34,41,40,91,401,448'    
    CCARD_errorAarray=eilib.GetErrorMessageList(CCARD_conn, CCARD_select_err_msg)
    var CCARD_initial_values_array=[];
    var CCARD_initial_values={'CCARD_error_msg':CCARD_errorAarray.errormsg,'CCARD_allcust_values':CCARD_all_cust_values}
    CCARD_initial_values_array.push(CCARD_initial_values)
    CCARD_conn.close();
    return CCARD_initial_values_array    
  }
  //FUNCTION TO RETURN ALL CUSTOMER DETAILS
  function CCARD_allcustomerdetails(){
    var CCARD_conn =eilib.db_GetConnection();
    var CCARD_customer_array =[];
    var CCARD_customerstmt = CCARD_conn.createStatement();    
    var CCARD_select_allcustomer_details="SELECT *  FROM VW_CARDASSIGN ORDER BY UNIT_NO ASC,CUSTOMERNAME ASC,CED_REC_VER ASC"
    var CCARD_customerresult = CCARD_customerstmt.executeQuery(CCARD_select_allcustomer_details);
    while(CCARD_customerresult.next())
    {
      var rec_ver=CCARD_customerresult.getString("CED_REC_VER")+"_"+eilib.SqlDateFormat(CCARD_customerresult.getString("CLP_STARTDATE"))+"_"+eilib.SqlDateFormat(CCARD_customerresult.getString("CLP_ENDDATE"))
      CCARD_customer_array.push({unit:CCARD_customerresult.getString("UNIT_NO"),customerid:CCARD_customerresult.getString("CUSTOMER_ID"),name:CCARD_customerresult.getString("CUSTOMERNAME"),recver:rec_ver});
    }
    CCARD_customerresult.close();
    CCARD_customerstmt.close();
    CCARD_conn.close();   
    return CCARD_customer_array;    
  } 
  //********************FUNCTION TO RETURN CUSTOMER DETAIL'S ***************************//
  function CCARD_get_customerdetails(recver,CCARD_unit,CCARD_cust_id)
  {
    var CCARD_custid=CCARD_cust_id;
    PropertiesService.getUserProperties().setProperty('CCARD_custid',CCARD_custid )
    var CCARD_recver=recver
    var CCARD_guest_array=[];  
    var flag=0;
    var CCARD_conn = eilib.db_GetConnection();
    var CCARD_checkcard_stmt=CCARD_conn.createStatement();
    var CCARD_checkcard_select="SELECT CLP.UASD_ID FROM CUSTOMER_LP_DETAILS CLP,CUSTOMER_ENTRY_DETAILS CED WHERE CLP.CUSTOMER_ID="+CCARD_custid+" AND CED.CED_REC_VER="+(CCARD_recver-1)+" and CLP.CUSTOMER_ID=CED.CUSTOMER_ID AND CLP.CED_REC_VER=CED.CED_REC_VER AND CED.CED_PRETERMINATE IS NOT NULL AND CLP.UASD_ID IS NULL and CLP.CED_REC_VER in (select CED_REC_VER  FROM VW_CARDASSIGN)";
    var CCARD_checkcard_rs=CCARD_checkcard_stmt.executeQuery(CCARD_checkcard_select);
    if(CCARD_checkcard_rs.next()){
      flag=1;
      var prev_recver=recver-1;
    }
    if(flag==1){
      var CCARD_checkcard_stmt=CCARD_conn.createStatement();
    var CCARD_checkcard_select="SELECT CLP.UASD_ID FROM CUSTOMER_LP_DETAILS CLP,CUSTOMER_ENTRY_DETAILS CED WHERE CLP.CUSTOMER_ID="+CCARD_custid+" AND CED.CED_REC_VER="+(prev_recver-1)+" and CLP.CUSTOMER_ID=CED.CUSTOMER_ID AND CLP.CED_REC_VER=CED.CED_REC_VER AND CED.CED_PRETERMINATE IS NOT NULL AND CLP.UASD_ID IS NULL and CLP.CED_REC_VER in (select CED_REC_VER  FROM VW_CARDASSIGN)";
    var CCARD_checkcard_rs=CCARD_checkcard_stmt.executeQuery(CCARD_checkcard_select);
      if(CCARD_checkcard_rs.next()){      
        var prev_recver=prev_recver-1;
    }      
    }
    var CCARD_today_date=Utilities.formatDate(new Date(),TimeZone, 'yyyy-MM-dd')    
    var CCARD_roomtype_stmt = CCARD_conn.createStatement();
    var CCARD_select_roomtype="SELECT URTD.URTD_ROOM_TYPE FROM UNIT_ROOM_TYPE_DETAILS URTD, UNIT_ACCESS_STAMP_DETAILS UASD,CUSTOMER_ENTRY_DETAILS CED WHERE (CED.CUSTOMER_ID="+CCARD_custid+") and (CED.CED_REC_VER="+CCARD_recver+") AND(UASD.UASD_ID=CED.UASD_ID) AND(UASD.URTD_ID=URTD.URTD_ID)";//6.UASD
    var CCARD_roomtype_rs = CCARD_roomtype_stmt.executeQuery(CCARD_select_roomtype);
    if(CCARD_roomtype_rs.next()){  
      var CCARD_roomtype = CCARD_roomtype_rs.getString("URTD_ROOM_TYPE");
    }
    CCARD_roomtype_rs.close();
    CCARD_roomtype_stmt.close();    
    var tempstmt=CCARD_conn.createStatement();
    tempstmt.execute("CALL SP_CUSTOMER_CARD_ASSIGN_TEMP_FEE_DETAIL("+CCARD_custid+",'"+UserStamp+"',@CARD_FEETMPTBLNAM)");
    tempstmt.close();
    var CCARD_feetemptbl_stmt=CCARD_conn.createStatement();
    var CCARD_feetemptbl_query="SELECT @CARD_FEETMPTBLNAM";
    var CCARD_feetemptblres=CCARD_feetemptbl_stmt.executeQuery(CCARD_feetemptbl_query);
    var CCARD_temptblname="";
    while(CCARD_feetemptblres.next())
    {
      CCARD_temptblname=CCARD_feetemptblres.getString(1);
    }
    CCARD_feetemptblres.close();
    CCARD_feetemptbl_stmt.close();
    var CCARD_alldetails_stmt = CCARD_conn.createStatement();
    var CCARD_select_alldetails="SELECT * FROM CUSTOMER_ENTRY_DETAILS CED LEFT JOIN CUSTOMER_COMPANY_DETAILS CCD ON CED.CUSTOMER_ID=CCD.CUSTOMER_ID left join CUSTOMER_LP_DETAILS CLP ON CED.CUSTOMER_ID=CLP.CUSTOMER_ID LEFT JOIN CUSTOMER_ACCESS_CARD_DETAILS CACD ON  CLP.CUSTOMER_ID=CACD.CUSTOMER_ID  AND CLP.UASD_ID=CACD.UASD_ID LEFT JOIN UNIT_ACCESS_STAMP_DETAILS UASD ON CLP.UASD_ID=UASD.UASD_ID AND CACD.UASD_ID=UASD.UASD_ID LEFT JOIN "+CCARD_temptblname+" CF ON  CED.CUSTOMER_ID=CF.CUSTOMER_ID LEFT JOIN CUSTOMER C ON CED.CUSTOMER_ID=C.CUSTOMER_ID LEFT JOIN  CUSTOMER_PERSONAL_DETAILS CPD ON CED.CUSTOMER_ID=CPD.CUSTOMER_ID ,NATIONALITY_CONFIGURATION NC,UNIT U WHERE U.UNIT_ID=CED.UNIT_ID AND CLP.CUSTOMER_ID=CED.CUSTOMER_ID AND CLP.CED_REC_VER=CED.CED_REC_VER AND CLP.CLP_TERMINATE IS NULL  AND CACD.CACD_VALID_TILL IS NULL  and(CED.UNIT_ID=U.UNIT_ID)AND (CED.CUSTOMER_ID="+CCARD_custid+")AND(CPD.NC_ID=NC.NC_ID) AND(CED.CED_REC_VER=CF.CUSTOMER_VER)AND(CED.CED_REC_VER="+CCARD_recver+")and CED.CED_REC_VER=CLP.CED_REC_VER ORDER BY CED.CED_REC_VER "
    var CCARD_alldetails_rs = CCARD_alldetails_stmt.executeQuery(CCARD_select_alldetails);    
    while(CCARD_alldetails_rs.next()){
      var CCARD_cardno2 = CCARD_alldetails_rs.getString("UASD_ACCESS_CARD");      
      if(CCARD_cardno2!=null){
        var CCARD_guestcardno = CCARD_alldetails_rs.getString("CLP_GUEST_CARD");
        if(CCARD_guestcardno!='X'){           
          var CCARD_cardno = CCARD_alldetails_rs.getString("UASD_ACCESS_CARD"); 
          var CCARD_startdate = CCARD_alldetails_rs.getString("CLP_STARTDATE");
          var CCARD_enddate = CCARD_alldetails_rs.getString("CLP_ENDDATE");
        }
        else {         
          var CCARD_cardno1 = CCARD_alldetails_rs.getString("UASD_ACCESS_CARD");         
          CCARD_guest_array.push(CCARD_cardno1);          
        }
      }
      else{        
        var CCARD_startdate = CCARD_alldetails_rs.getString("CLP_STARTDATE");
        var CCARD_enddate = CCARD_alldetails_rs.getString("CLP_ENDDATE");  
      }
      var CCARD_company = CCARD_alldetails_rs.getString("CCD_COMPANY_NAME");
      var CCARD_firstname = CCARD_alldetails_rs.getString("CUSTOMER_FIRST_NAME");
      var CCARD_lastname = CCARD_alldetails_rs.getString("CUSTOMER_LAST_NAME");      
      var CCARD_deposit = CCARD_alldetails_rs.getString("CC_DEPOSIT");        
      var CCARD_rental = CCARD_alldetails_rs.getString("CC_PAYMENT_AMOUNT");        
      var CCARD_electricitycap = CCARD_alldetails_rs.getString("CC_ELECTRICITY_CAP");        
      var CCARD_airconfixedfee = CCARD_alldetails_rs.getString("CC_AIRCON_FIXED_FEE");
      var CCARD_airconquartelyfee = CCARD_alldetails_rs.getString("CC_AIRCON_QUARTERLY_FEE");        
      var CCARD_epno = CCARD_alldetails_rs.getString("CPD_EP_NO");
      var CCARD_epdate = CCARD_alldetails_rs.getString("CPD_EP_DATE");
      var CCARD_passportno = CCARD_alldetails_rs.getString("CPD_PASSPORT_NO");
      var CCARD_passportdate = CCARD_alldetails_rs.getString("CPD_PASSPORT_DATE");
      var CCARD_drycleanfee = CCARD_alldetails_rs.getString("CC_DRYCLEAN_FEE");
      var CCARD_processingfee = CCARD_alldetails_rs.getString("CC_PROCESSING_FEE");
      var CCARD_checkoutcleaningfee = CCARD_alldetails_rs.getString("CC_CHECKOUT_CLEANING_FEE");
      var CCARD_noticeperiod = CCARD_alldetails_rs.getString("CED_NOTICE_PERIOD");
      var CCARD_noticedate = CCARD_alldetails_rs.getString("CED_NOTICE_START_DATE");
      var CCARD_nationality = CCARD_alldetails_rs.getString("NC_DATA");
      var CCARD_dob= CCARD_alldetails_rs.getString("CPD_DOB");
      var CCARD_lease=CCARD_alldetails_rs.getString("CED_LEASE_PERIOD");
      var CCARD_mobile = CCARD_alldetails_rs.getString("CPD_MOBILE");
      var CCARD_mobile1 = CCARD_alldetails_rs.getString("CPD_INTL_MOBILE");
      var CCARD_officeno = CCARD_alldetails_rs.getString("CCD_OFFICE_NO");
      var CCARD_email = CCARD_alldetails_rs.getString("CPD_EMAIL");
      var CCARD_extension= CCARD_alldetails_rs.getString("CED_EXTENSION");
      var CCARD_redver = CCARD_alldetails_rs.getString("CED_REC_VER");         
      var CCARD_canceldate = CCARD_alldetails_rs.getString("CED_CANCEL_DATE");
      var CCARD_comments = CCARD_alldetails_rs.getString("CPD_COMMENTS");
      var CCARD_QUARTERS=CCARD_alldetails_rs.getString("CED_QUARTERS");
    }   
    var CCARD_alldetails_array={'firstname':CCARD_firstname,'lastname':CCARD_lastname,'email':CCARD_email,'mobile1':CCARD_mobile,'mobile2':CCARD_mobile1,'officeno':CCARD_officeno,'dob':CCARD_dob,'passportno':CCARD_passportno,'passportdate':CCARD_passportdate,'epno':CCARD_epno,'epdate':CCARD_epdate,'roomtype':CCARD_roomtype,'cardno':CCARD_cardno,'startdate':CCARD_startdate,'enddate':CCARD_enddate,'lease':CCARD_lease,'QUARTERS':CCARD_QUARTERS,'noticeperiod':CCARD_noticeperiod,'noticedate':CCARD_noticedate,'electricitycap':CCARD_electricitycap,'drycleanfee':CCARD_drycleanfee,'checkoutcleaningfee':CCARD_checkoutcleaningfee,'deposit':CCARD_deposit,'rental':CCARD_rental,'processingfee':CCARD_processingfee,'comments':CCARD_comments,'company':CCARD_company,'nationality':CCARD_nationality,'airconfixedfee':CCARD_airconfixedfee,'airconquartelyfee':CCARD_airconquartelyfee}
    CCARD_guest_array= eilib.unique(CCARD_guest_array) 
    var CCARD_alldata_array=[];
    var CCARD_available_cards=CCARD_show_availablecards(CCARD_unit,CCARD_firstname,CCARD_lastname,recver,CCARD_custid)
    CCARD_alldata_array.push(CCARD_alldetails_array)
    CCARD_alldata_array.push(CCARD_guest_array) 
    CCARD_alldata_array.push(CCARD_available_cards)
    CCARD_alldata_array.push(flag)
    CCARD_alldata_array.push(prev_recver)
    PropertiesService.getUserProperties().setProperty('rec_ver',CCARD_redver)
    CCARD_alldetails_rs.close()
    CCARD_alldetails_stmt.close();
    eilib.DropTempTable(CCARD_conn,CCARD_temptblname);    
    return CCARD_alldata_array; 
  }  
  //*******************FUNCTION TO RETURN AVAILABLE CARD'S AND CUSTOMER CARD'S*****************************//
  function CCARD_show_availablecards(unit,firstname,lastname,recver,CCARD_custid)
  {
    var CCARD_avail_cardarray=[];
    var CCARD_cust_cardarray=[];
    var CCARD_returnarray=[];
    var CCARD_custid=CCARD_custid;
    var CCARD_first_name=firstname;
    var CCARD_last_name=lastname;
    var CCARD_customername=CCARD_first_name+' '+CCARD_last_name
    var CCARD_customername1=CCARD_first_name+'_'+CCARD_last_name  
    CCARD_customername1=CCARD_customername1.replace(/ /g,"__")
    var CCARD_conn = eilib.db_GetConnection();  
    var CCARD_cust_access_card_stmt = CCARD_conn.createStatement();
    var CCARD_select_cust_access_card="SELECT DISTINCT  * FROM UNIT_ACCESS_STAMP_DETAILS UASD LEFT JOIN CUSTOMER_LP_DETAILS CLP ON (UASD.UASD_ID=CLP.UASD_ID) LEFT JOIN CUSTOMER C ON CLP.CUSTOMER_ID=C.CUSTOMER_ID left Join CUSTOMER_ACCESS_CARD_DETAILS CACD ON CLP.CUSTOMER_ID=CACD.CUSTOMER_ID AND (UASD.UASD_ID=CACD.UASD_ID) WHERE ( CLP.CUSTOMER_ID="+CCARD_custid+")   AND (CLP.CLP_TERMINATE IS NULL) AND CACD.ACN_ID IS NULL AND CLP.CED_REC_VER="+recver+" GROUP BY UASD_ACCESS_CARD ORDER BY CLP_GUEST_CARD ASC";//7.UASD
    var CCARD_cust_access_card_rs = CCARD_cust_access_card_stmt.executeQuery(CCARD_select_cust_access_card);
    while(CCARD_cust_access_card_rs.next()){
      var CCARD_cardno = CCARD_cust_access_card_rs.getString("UASD_ACCESS_CARD");
      var first_name=CCARD_cust_access_card_rs.getString("CUSTOMER_FIRST_NAME");
      var second_name=CCARD_cust_access_card_rs.getString("CUSTOMER_LAST_NAME");
      var guest_card=CCARD_cust_access_card_rs.getString("CLP_GUEST_CARD")
      first_name=first_name.replace(/ /g,"__")
      second_name=second_name.replace(/ /g,"__")
      if(CCARD_cardno=="")continue;
      else
      {
        if(guest_card!='X'){        
          CCARD_cust_cardarray.push(CCARD_cardno+'/'+first_name+'_'+second_name);
        }
        else{            
          CCARD_cust_cardarray.push(CCARD_cardno+'/'+"GUEST")           
        }         
      }
    }    
    CCARD_cust_access_card_rs.close();
    CCARD_cust_access_card_stmt.close();
    var CCARD_stmt = CCARD_conn.createStatement();
    var CCARD_select_access_card="SELECT UASD_ACCESS_CARD FROM UNIT_ACCESS_STAMP_DETAILS  WHERE UNIT_ID IN (SELECT UNIT_ID FROM UNIT WHERE UNIT_NO='"+unit+"')AND UASD_ACCESS_INVENTORY='X' AND UASD_ACCESS_CARD IS NOT NULL ORDER BY UASD_ACCESS_CARD ASC" ;//9.UASD
    var CCARD_result=CCARD_stmt.executeQuery(CCARD_select_access_card);   
    while(CCARD_result.next()){ 
      CCARD_avail_cardarray.push(CCARD_result.getString("UASD_ACCESS_CARD"));
    }  
    if(CCARD_cust_cardarray.length==0){        
      var CCARD_cardlbl_array=[];
      for(var i=0;i<CCARD_avail_cardarray.length;i++)
      {
        if(i==0)
        {
          CCARD_cardlbl_array.push(CCARD_customername1)
        }
        else if(i>0)
        {
          CCARD_cardlbl_array.push("GUEST "+i);
        }
        if(i>2)break;
      }    
    }  
    else {
      var CCARD_cardlbl_array=[];
      var CCARD_total_card_lenth=CCARD_cust_cardarray.length+ CCARD_avail_cardarray.length       
      for(var k=0;k<CCARD_total_card_lenth;k++)
      {      
        if(k==0)
        {
          CCARD_cardlbl_array.push(CCARD_customername1)
        }
        else if(k>0)
        {
          CCARD_cardlbl_array.push("GUEST"+k);
        }
        if(k>2)break;     
      }      
    }      
    CCARD_returnarray=[CCARD_cust_cardarray,CCARD_avail_cardarray,CCARD_cardlbl_array];
    CCARD_conn.close();
    return CCARD_returnarray  
  }  
  ////Function to save data's
  function CCARD_cardassign_save(cardassign_form)
  {    
    var CCARD_conn = eilib.db_GetConnection();
    var CCARD_custid= PropertiesService.getUserProperties().getProperty('CCARD_custid');
    var CCARD_todaydate=Utilities.formatDate(new Date(),TimeZone, 'yyyy-MM-dd ');   
    var CCARD_comment=cardassign_form.CCARD_ta_comments;
    var CCARD_unitno=cardassign_form.CCARD_unitnumber;
    var CCARD_fname=cardassign_form.CCARD_tb_firstname;
    var CCARD_lname=cardassign_form.CCARD_tb_lastname;
    var CCARD_CLP_rec_ver=cardassign_form.CCARD_recver;
    var CCARD_card_value=cardassign_form.CCARD_tb_cardno;
    var CCARD_startdate=cardassign_form.CCARD_tb_startdate
    CCARD_startdate=eilib.SqlDateFormat(CCARD_startdate)
    var CCARD_enddate=cardassign_form.CCARD_tb_enddate;
    CCARD_enddate=eilib.SqlDateFormat(CCARD_enddate)
    if(CCARD_startdate>CCARD_todaydate){      
      var CCARD_startdate_new=CCARD_startdate
      }
    else{
      var CCARD_startdate_new=CCARD_todaydate      
      }
    var CCARD_userstamp=UserStamp;
    var CCARD_accesscard="";
    var CCARD_guestcard="";
    var CCARD_cust_name=(CCARD_fname+"_"+CCARD_lname).toString().toUpperCase();
    
    CCARD_cust_name=CCARD_cust_name.replace(/ /g,"__")
    var CCARD_cardclick = cardassign_form.CCARD_selectcard;
    var old_card_array=[];
    var final_array=[]
    if(cardassign_form.CCARD_tb_cardno!=""){
      if((Array.isArray(cardassign_form.CCARD_tb_cardno))==true){
        old_card_array=cardassign_form.CCARD_tb_cardno;
      }    
      else
      {
        old_card_array.push(cardassign_form.CCARD_tb_cardno);      
      }
    }
    if(CCARD_cardclick!="NULL")
    {
      var CCARD_cardlist_box=[]
      if((Array.isArray(cardassign_form.CCARD_selectnamelist1))==true){
        CCARD_cardlist_box=cardassign_form.CCARD_selectnamelist1;
      }    
      else
      {
        CCARD_cardlist_box.push(cardassign_form.CCARD_selectnamelist1);        
      }
      var new_card_array=[]
      var cust_card;
      var guest_card=[]
      var name=[];
      var g_card=[]
      for(var i=0;i<CCARD_cardlist_box.length;i++)
      {
        if(CCARD_cardlist_box[i]=="")continue;
        var card=CCARD_cardlist_box[i].split('/');
        
        if(card[1]==CCARD_cust_name)
        {
          if(CCARD_accesscard=="")
          {
            CCARD_accesscard=card[0];
            CCARD_guestcard=card[0]+','+' ';
          }
          else
          {
            CCARD_accesscard=CCARD_accesscard+','+card[0];
            CCARD_guestcard=CCARD_guestcard+','+card[0]+', ';
          }
          cust_card=(card[0])
        }
        else
        {
          if(old_card_array.length!=0){
            var guest1
            if(card[1]=="GUEST1"){
              
              guest1 =card[0]
            }
            var guest2
            if(card[1]=="GUEST2"){
              
              guest2=card[0]
            }
            var guest3
            if(card[1]=="GUEST3"){
              
              guest3=card[0]
            }
          }
          else{
            guest_card.push(card[0])
            
          }
          if(CCARD_accesscard=="")
          {
            CCARD_guestcard=card[0]+',X';
            CCARD_accesscard=card[0];
          }
          else
          {
            CCARD_accesscard=CCARD_accesscard+','+card[0];
            CCARD_guestcard=CCARD_guestcard+','+card[0]+',X';
          }
          g_card.push(card[0])
          
        }
      }
      var new_array=[];
      new_array.push(cust_card)
      for(var i=0;i<g_card.length;i++){
        new_array.push(g_card[i])       
      }    
      if(old_card_array.length!=0){
        if(guest1==undefined)guest1=' '
        if(guest2==undefined)guest2=' '
        if(guest3==undefined)guest3=' '
        guest_card.push(guest1)
        if(old_card_array.length==3)
          guest_card.push(guest2)
          if(old_card_array.length==4)
            guest_card.push(guest2)
            guest_card.push(guest3)
      }
      new_card_array.push(cust_card)
      for(var i=0;i<guest_card.length;i++){
        
        new_card_array.push(guest_card[i])        
      }      
      if(old_card_array.length>new_array.length){
        new_card_array=new_card_array      
      }
      else{      
        new_card_array=new_array      
      }      
      var new_card = [];
      var j=0; 
      for(var i=0; i<=new_card_array.length-1;i++)
      {
        if(old_card_array.indexOf(new_card_array[i])==-1)
        {
          new_card[j]=new_card_array[i];
          j++;
        }
        var newvalues = new_card;
      }
      var old_card=[];
      var oldvalues=[]
      for(var i=0; i<=old_card_array.length-1;i++)
      {
        if(new_card_array.indexOf(old_card_array[i])==-1)
        {
          old_card[j]=old_card_array[i];
          j++;
        }
        oldvalues = old_card;
      }
    }
    if(CCARD_comment!=''){
      CCARD_comment=eilib.ConvertSpclCharString(CCARD_comment)
    }     
    if(old_card_array.length!=0){      
      var card=''
      }
    else{      
      var card=' '
      }    
    if(CCARD_cardclick!="NULL"){
      
      if(new_card_array.length>=old_card_array.length){
        
        for(var j=0; j<new_card_array.length;j++)
        {
          if(old_card_array[j]==undefined){
            old_card_array[j]=' ';
            
          }
          card+=old_card_array[j]+','+new_card_array[j];
          
          if(j==new_card_array.length-1)break;
          {
            card+=',';
          }
        }
      }      
    } 
    var CCARD_save_stmt = CCARD_conn.createStatement();    
    if(CCARD_cardclick=='CARD'){     

      CCARD_save_stmt.execute("CALL SP_CUSTOMER_CARDASSIGN_INSERT("+CCARD_custid+","+CCARD_unitno+","+CCARD_CLP_rec_ver+",'"+card+"','"+CCARD_startdate_new+"','"+CCARD_guestcard+"','"+CCARD_startdate_new+"','"+CCARD_enddate+"','"+CCARD_comment+"','"+CCARD_userstamp+"',@card_flag)");
    }
    else{ 

      CCARD_save_stmt.execute("CALL SP_CUSTOMER_CARDASSIGN_INSERT("+CCARD_custid+","+CCARD_unitno+","+CCARD_CLP_rec_ver+",' ','"+CCARD_startdate_new+"',' ','"+CCARD_startdate_new+"','"+CCARD_enddate+"','"+CCARD_comment+"','"+CCARD_userstamp+"',@card_flag)");
      
    }
    CCARD_save_stmt.close();
    var CCARD_return_flag_stmt=CCARD_conn.createStatement();
    var CCARD_getresult= CCARD_return_flag_stmt.executeQuery("SELECT @card_flag");
    while(CCARD_getresult.next()){
      var CCAN_chkcardflag=CCARD_getresult.getString("@card_flag");
    }
    CCARD_conn.close(); 
    return CCAN_chkcardflag   
  }
}
catch(err){ 
}
//****************************************ERM SEARCH/UPDATE*********************************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY:PUNI
//VER 1.09-SD:7/03/2015 ED:07/03/2015-updated autocommit false for new connection string
//VER 1.08 -SD:09/10/2014 ED:09/10/2014,TRACKER NO:709-1.corrected proloader and message box position,2.corrected moving date DP max date as sysdate+3 months
//DONE BY:KUMAR
//VER 1.07-SD:06/10/2014 ED:06/10/2014,TRACKER NO:709-updated proloader and message box position.
//VER 1.06- SD:28/08/2014 ED:28/08/2014,TRACKER NO:709 Changed contact no input value format
//VER 1.05- SD:08/08/2014 ED:08/08/2014,TRACKER NO:709 implemented rollback and commit in script side and updated jquery and css links.
//VER 1.04- SD:22/07/2014 ED:22/07/2014,TRACKER NO 709 converted spl characters(erm form age,guests,minimum fields )in entry form and updation form.
//VER 1.03- SD:19/07/2014 ED:19/07/2014,TRACKER NO:709 Did sorting for all search option and set timestamp min and max date.
//VER 1.02- SD:16/07/2014 ED:16/07/2014,TRACKER NO:709 changed ERM_CONTACT_NO datatype bigint(20) to varchar(20) and prefix accept 000.
//VER 1.01- SD:28/06/2014 ED:28/06/2014,TRACKER NO:709 cleared email id button vlaidation issue and chenaged erm rent maximum digit 4 to 5 
//VER 1.00- SD:18/06/2014 ED:18/06/2014,TRACKER NO:709 Added conn error mesaage and did moving date min and max date validation.and updated new email id validation.
//VER 0.09- SD:06/06/2014 ED:06/06/2014,TRACKER NO:709 Changed jquery common link and css link.
//ver 0.08- SD:02/06/2014 ED:02/06/2014,TRACKER NO:709 Some nationality have spl character so used eilib splchar conversion function in UPDATION part.
//VER 0.07- SD:17/04/2014 ED:17/04/2014,TRACKER NO:709 Restricted DP manual inputs and Removed Mantatory Field for Email id.
//VER 0.06- SD:27/02/2014 ED:27/02/2014,TRACKER NO:709 did userstamp id convrsion changes and return flags;
//VER 0.05- SD:12/01/2014 ED:12/01/2014,TRACKER NO:709 changed preloder image,conformation msg,did autocomplete
//VER O.O4- SD:30/12/2013 ED:30/12/2013,TRACKER NO:171 Removed multiple conn in same function.in ver 0.04
//VER 0.03- SD:03/12/2013 ED:03/12/2013,TRACKER NO:171Added Return function script in ver0.03
//VER 0.02- SD:30/11/2013 ED:30/11/2013,TRACKER NO:171-changed html file name and gs file name in ver0.02
//VER 0.01-INITIAL VERSION-SD:14/09/2013 ED:17/09/2013,TRACKER NO:171
//*********************************************************************************************************//
try
{
  var CERM_SRCconn;
  /******************************GETTING ERM CUSTOMER FOR AUTOCOMPLETE****************************/
  function CERM_SRC_customernameautocomplete()
  {
    var CERM_SRC_conn =eilib.db_GetConnection();
    var CERM_SRC_customerstmt = CERM_SRC_conn.createStatement();
    var CERM_SRC_customer_array =[];
    var CERM_SRC_customer_query = "SELECT DISTINCT ERM_CUST_NAME FROM ERM_ENTRY_DETAILS ORDER BY ERM_CUST_NAME ASC"; 
    var CERM_SRC_customer_result = CERM_SRC_customerstmt.executeQuery(CERM_SRC_customer_query);
    while(CERM_SRC_customer_result.next())
    {
      CERM_SRC_customer_array.push(CERM_SRC_customer_result.getString(1));
    }
    return CERM_SRC_customer_array;
    CERM_SRC_customer_result.close();
    CERM_SRC_customerstmt.close();
    CERM_SRC_conn.close();
  }
   /******************************GETTING ERM CONTACT NO'S FOR AUTOCOMPLETE****************************/
  function CERM_SRC_contactautocomplete()
  {
    var CERM_SRC_conn =eilib.db_GetConnection();
    var CERM_SRC_contactstmt = CERM_SRC_conn.createStatement();
    var CERM_SRC_contact_array =[];
    var CERM_SRC_contact_query = "SELECT DISTINCT ERM_CONTACT_NO FROM ERM_ENTRY_DETAILS ORDER BY ERM_CONTACT_NO ASC"; 
    var CERM_SRC_contact_result = CERM_SRC_contactstmt.executeQuery(CERM_SRC_contact_query);
    while(CERM_SRC_contact_result.next())
    {
      if(CERM_SRC_contact_result.getString("ERM_CONTACT_NO")==null)continue;
      CERM_SRC_contact_array.push(CERM_SRC_contact_result.getString("ERM_CONTACT_NO"));
    }
    return CERM_SRC_contact_array;
    CERM_SRC_contact_result.close();
    CERM_SRC_contactstmt.close();
    CERM_SRC_conn.close();
  }
   /******************************GETTING ERM DETAILS SELECTED OPTIONS AND SEARCH INPUT****************************/
  function CERM_SRC_searchdetails(CERM_SRC_ermoption,CERM_SRC_input1,CERM_SRC_input2)
  {
    var CERM_SRC_conn =eilib.db_GetConnection();
    var CERM_SRC_searchstmt=CERM_SRC_conn.createStatement();
    if(CERM_SRC_ermoption==2)
    {
      var CERM_SRC_QUERY="SELECT ERM.ERM_ID,NC.NC_DATA,ERM.ERM_CUST_NAME,ERM.ERM_RENT,ERM.ERM_MOVING_DATE,ERM.ERM_MIN_STAY,EOD.ERMO_DATA,ERM.ERM_NO_OF_GUESTS,ERM.ERM_AGE,ERM.ERM_CONTACT_NO,ERM.ERM_EMAIL_ID,ERM.ERM_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ERM.ERM_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS ERM_TIME_STAMP FROM ERM_ENTRY_DETAILS ERM left join NATIONALITY_CONFIGURATION NC ON ERM.NC_ID=NC.NC_ID left join ERM_OCCUPATION_DETAILS EOD ON ERM.ERMO_ID=EOD.ERMO_ID left join USER_LOGIN_DETAILS ULD on ERM.ULD_ID=ULD.ULD_ID WHERE ERM.ERM_CUST_NAME='"+CERM_SRC_input1+"' ORDER BY ERM.ERM_MOVING_DATE ASC"; 
    }
    if(CERM_SRC_ermoption==1)
    {
      CERM_SRC_QUERY="SELECT ERM.ERM_ID,NC.NC_DATA,ERM.ERM_CUST_NAME,ERM.ERM_RENT,ERM.ERM_MOVING_DATE,ERM.ERM_MIN_STAY,EOD.ERMO_DATA,ERM.ERM_NO_OF_GUESTS,ERM.ERM_AGE,ERM.ERM_CONTACT_NO,ERM.ERM_EMAIL_ID,ERM.ERM_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ERM.ERM_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS ERM_TIME_STAMP FROM ERM_ENTRY_DETAILS ERM left join NATIONALITY_CONFIGURATION NC ON ERM.NC_ID=NC.NC_ID left join ERM_OCCUPATION_DETAILS EOD ON ERM.ERMO_ID=EOD.ERMO_ID left join USER_LOGIN_DETAILS ULD on ERM.ULD_ID=ULD.ULD_ID WHERE ERM.ERM_RENT BETWEEN '"+CERM_SRC_input1+"' AND '"+CERM_SRC_input2+"' ORDER BY ERM.ERM_MOVING_DATE,ERM.ERM_CUST_NAME"
    }
    if(CERM_SRC_ermoption==3)
    {
      var CERM_SRC_QUERY="SELECT ERM.ERM_ID,NC.NC_DATA,ERM.ERM_CUST_NAME,ERM.ERM_RENT,ERM.ERM_MOVING_DATE,ERM.ERM_MIN_STAY,EOD.ERMO_DATA,ERM.ERM_NO_OF_GUESTS,ERM.ERM_AGE,ERM.ERM_CONTACT_NO,ERM.ERM_EMAIL_ID,ERM.ERM_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ERM.ERM_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS ERM_TIME_STAMP FROM ERM_ENTRY_DETAILS ERM left join NATIONALITY_CONFIGURATION NC ON ERM.NC_ID=NC.NC_ID left join ERM_OCCUPATION_DETAILS EOD ON ERM.ERMO_ID=EOD.ERMO_ID left join USER_LOGIN_DETAILS ULD on ERM.ULD_ID=ULD.ULD_ID WHERE ERM.ERM_CONTACT_NO='"+CERM_SRC_input1+"' ORDER BY ERM.ERM_MOVING_DATE,ERM.ERM_CUST_NAME"; 
    }
    if(CERM_SRC_ermoption==4)
    {
      var ERM_SRC_nationstmt=CERM_SRC_conn.createStatement();
      var ERM_nationality=eilib.ConvertSpclCharString(CERM_SRC_input1);
      var CERM_SRC_QUERY="SELECT ERM.ERM_ID,NC.NC_DATA,ERM.ERM_CUST_NAME,ERM.ERM_RENT,ERM.ERM_MOVING_DATE,ERM.ERM_MIN_STAY,EOD.ERMO_DATA,ERM.ERM_NO_OF_GUESTS,ERM.ERM_AGE,ERM.ERM_CONTACT_NO,ERM.ERM_EMAIL_ID,ERM.ERM_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ERM.ERM_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS ERM_TIME_STAMP FROM ERM_ENTRY_DETAILS ERM left join NATIONALITY_CONFIGURATION NC ON ERM.NC_ID=NC.NC_ID left join ERM_OCCUPATION_DETAILS EOD ON ERM.ERMO_ID=EOD.ERMO_ID left join USER_LOGIN_DETAILS ULD on ERM.ULD_ID=ULD.ULD_ID WHERE NC_DATA='"+ERM_nationality+"' ORDER BY ERM.ERM_MOVING_DATE,ERM.ERM_CUST_NAME"; 
    }
    if(CERM_SRC_ermoption==6)
    {
      var CERM_SRC_QUERY="SELECT ERM.ERM_ID,NC.NC_DATA,ERM.ERM_CUST_NAME,ERM.ERM_RENT,ERM.ERM_MOVING_DATE,ERM.ERM_MIN_STAY,EOD.ERMO_DATA,ERM.ERM_NO_OF_GUESTS,ERM.ERM_AGE,ERM.ERM_CONTACT_NO,ERM.ERM_EMAIL_ID,ERM.ERM_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ERM.ERM_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS ERM_TIME_STAMP FROM ERM_ENTRY_DETAILS ERM left join NATIONALITY_CONFIGURATION NC ON ERM.NC_ID=NC.NC_ID left join ERM_OCCUPATION_DETAILS EOD ON ERM.ERMO_ID=EOD.ERMO_ID left join USER_LOGIN_DETAILS ULD on ERM.ULD_ID=ULD.ULD_ID WHERE ULD.ULD_LOGINID='"+CERM_SRC_input1+"' ORDER BY ERM.ERM_MOVING_DATE,ERM.ERM_CUST_NAME"; 
    }
    if(CERM_SRC_ermoption==5)
    {
      CERM_SRC_input1=eilib.SqlDateFormat(CERM_SRC_input1);
      var CERM_SRC_toinput=CERM_SRC_input2.split('-');
      var CERM_SRC_toinputdate=new Date(CERM_SRC_toinput[2],CERM_SRC_toinput[1]-1,CERM_SRC_toinput[0]);
      var CERM_SRC_input2=Utilities.formatDate(new Date(CERM_SRC_toinputdate.getFullYear(),CERM_SRC_toinputdate.getMonth(),CERM_SRC_toinputdate.getDate()+1), TimeZone, 'yyyy-MM-dd');
      CERM_SRC_QUERY="SELECT ERM.ERM_ID,NC.NC_DATA,ERM.ERM_CUST_NAME,ERM.ERM_RENT,ERM.ERM_MOVING_DATE,ERM.ERM_MIN_STAY,EOD.ERMO_DATA,ERM.ERM_NO_OF_GUESTS,ERM.ERM_AGE,ERM.ERM_CONTACT_NO,ERM.ERM_EMAIL_ID,ERM.ERM_COMMENTS,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(ERM.ERM_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS ERM_TIME_STAMP FROM ERM_ENTRY_DETAILS ERM left join NATIONALITY_CONFIGURATION NC ON ERM.NC_ID=NC.NC_ID left join ERM_OCCUPATION_DETAILS EOD ON ERM.ERMO_ID=EOD.ERMO_ID left join USER_LOGIN_DETAILS ULD on ERM.ULD_ID=ULD.ULD_ID WHERE ERM.ERM_TIMESTAMP BETWEEN '"+CERM_SRC_input1+"' AND '"+CERM_SRC_input2+"' ORDER BY ERM.ERM_TIMESTAMP,ERM.ERM_CUST_NAME"
    }
    var CERM_SRC_searchresult=CERM_SRC_searchstmt.executeQuery(CERM_SRC_QUERY);
    var CERM_SRC_resultarray=[];
    while(CERM_SRC_searchresult.next())
    {
      var CERM_SRC_sno=CERM_SRC_searchresult.getString("ERM_ID");
      var CERM_SRC_ncsno=CERM_SRC_searchresult.getString("NC_DATA");
      if(CERM_SRC_ncsno!=null)
      { var ncdata=CERM_SRC_ncsno;}
      else{ ncdata="";}
      var CERM_SRC_customername=CERM_SRC_searchresult.getString("ERM_CUST_NAME");
      var CERM_SRC_rent=CERM_SRC_searchresult.getString("ERM_RENT");
      var CERM_SRC_movingdate=eilib.SqlDateFormat(CERM_SRC_searchresult.getString("ERM_MOVING_DATE"));
      var CERM_SRC_minstay=CERM_SRC_searchresult.getString("ERM_MIN_STAY");
      var CERM_SRC_occupation=CERM_SRC_searchresult.getString("ERMO_DATA");
      var CERM_SRC_nationality=ncdata;
      var CERM_SRC_noofguest=CERM_SRC_searchresult.getString("ERM_NO_OF_GUESTS");
      if(CERM_SRC_noofguest==null ||CERM_SRC_noofguest=='null' )
      { CERM_SRC_noofguest="";}
      var CERM_SRC_age=CERM_SRC_searchresult.getString("ERM_AGE");
      if(CERM_SRC_age==null ||CERM_SRC_age=='null' )
      { CERM_SRC_age="";}
      var CERM_SRC_contact=CERM_SRC_searchresult.getString("ERM_CONTACT_NO");
      if(CERM_SRC_contact==null || CERM_SRC_contact=='null')
      { CERM_SRC_contact=""; }
      var CERM_SRC_mailid=CERM_SRC_searchresult.getString("ERM_EMAIL_ID");
      if(CERM_SRC_mailid==null)
      {
        CERM_SRC_mailid="";
      }
      var CERM_SRC_comments=CERM_SRC_searchresult.getString("ERM_COMMENTS");
      var CERM_SRC_userstamp=CERM_SRC_searchresult.getString("ULD_LOGINID");
      var CERM_SRC_timestamp=CERM_SRC_searchresult.getString("ERM_TIME_STAMP");
      var CERM_SRC_RESULTS={ID:CERM_SRC_sno,CUSTOMER:CERM_SRC_customername,RENT:CERM_SRC_rent,MOVINGDATE:CERM_SRC_movingdate,MINIMUMSTAY:CERM_SRC_minstay,OCCUPATION:CERM_SRC_occupation,NATIONALITY:CERM_SRC_nationality,GUEST:CERM_SRC_noofguest,AGE:CERM_SRC_age,CONTACT:CERM_SRC_contact,MAIL:CERM_SRC_mailid,COMMENTS:CERM_SRC_comments,USERSTAMP:CERM_SRC_userstamp,TIMESTAMP:CERM_SRC_timestamp};
      CERM_SRC_resultarray.push(CERM_SRC_RESULTS);  
    }
    var CERM_SRC_returnarray=[CERM_SRC_resultarray,CERM_SRC_ermoption,CERM_SRC_input1,CERM_SRC_input2];
    return CERM_SRC_returnarray;
    CERM_SRC_searchresult.close();
    CERM_SRC_searchstmt.close();
    CERM_SRC_conn.close();
  }
  
  //*****************************ERM UPDATION INITIAL LOAD FUNCTION****************************//
  function CERM_SRC_commonvalues()
  {
    var CERM_SRC_conn =eilib.db_GetConnection();
    //////////////SEARCH OPTION/////////////////////
    var CERM_searchoptionstmt=CERM_SRC_conn.createStatement();
    var CERM_searchoptionquery="SELECT *FROM ERM_CONFIGURATION ORDER BY ERMCN_DATA ASC";
    var CERM_searchoptionresult=CERM_searchoptionstmt.executeQuery(CERM_searchoptionquery);
    var CERM_searchoption_array=[];
    while(CERM_searchoptionresult.next())
    {
      var CERM_searchoptiondata= CERM_searchoptionresult.getString("ERMCN_DATA"); 
      var CERM_searchoptionid= CERM_searchoptionresult.getString("ERMCN_ID"); 
      CERM_searchoption_array.push({ERMoptionid:CERM_searchoptionid,ERMoptiondata:CERM_searchoptiondata})
    }
    CERM_searchoptionresult.close();
    CERM_searchoptionstmt.close();
    ///////////////OCCUPATION///////////
    var CERM_SRC_occupationstmt = CERM_SRC_conn.createStatement();
    var CERM_SRC_occupation_array =[];
    var CERM_SRC_occupation_query = "SELECT ERMO_DATA FROM ERM_OCCUPATION_DETAILS order by ERMO_DATA ASC"; 
    var CERM_SRC_occupation_result = CERM_SRC_occupationstmt.executeQuery(CERM_SRC_occupation_query);
    while(CERM_SRC_occupation_result.next())
    {
      CERM_SRC_occupation_array.push(CERM_SRC_occupation_result.getString("ERMO_DATA"));
    }
    CERM_SRC_occupation_result.close();
    CERM_SRC_occupationstmt.close();
    /////////////NATIONALITY///////////////////////
    var CERM_SRC_nation_array =eilib.CUST_getNationality(CERM_SRC_conn);
    
    /////////////////////USERSTAMP//////////////////
    var CERM_SRC_userstampstmt = CERM_SRC_conn.createStatement();
    var CERM_SRC_userstamp_array =[];
    var CERM_SRC_userstamp_query = "SELECT DISTINCT ULD.ULD_LOGINID FROM ERM_ENTRY_DETAILS ERM,USER_LOGIN_DETAILS ULD WHERE ERM.ULD_ID=ULD.ULD_ID ORDER BY ERM.ULD_ID ASC"; 
    var CERM_SRC_userstamp_result = CERM_SRC_userstampstmt.executeQuery(CERM_SRC_userstamp_query);
    while(CERM_SRC_userstamp_result.next())
    {
      CERM_SRC_userstamp_array.push(CERM_SRC_userstamp_result.getString("ULD_LOGINID"));
    }
    CERM_SRC_userstamp_result.close();
    CERM_SRC_userstampstmt.close();
    /////////////////////ERROR MESSAGE///////////////////
    var CERM_SRC_error_code ='1,2,4,5,6,36,45,170,315,383,384,385,401';
    var CERM_SRC_error_array=eilib.GetErrorMessageList(CERM_SRC_conn, CERM_SRC_error_code)
    var CERM_SRC_emailfromstmt=CERM_SRC_conn.createStatement();
    var emailids=eilib.getProfileEmailId(CERM_SRC_conn, 'ERM')
    //////////////ERM ENTRY DETAILS CHECKING////////////////////
    var CERM_SRC_ermdetailsstmt=CERM_SRC_conn.createStatement();
    var CERM_SRC_ermdetailsquery="SELECT ERM_ID FROM ERM_ENTRY_DETAILS"
    var CERM_SRC_ermdetailsresult=CERM_SRC_ermdetailsstmt.executeQuery(CERM_SRC_ermdetailsquery);
    if(CERM_SRC_ermdetailsresult.next())
    {
      var CERM_SRC_records=CERM_SRC_ermdetailsresult.getString(1);
    }
    CERM_SRC_ermdetailsresult.close();
    CERM_SRC_ermdetailsstmt.close();
    var CERM_SRC_RESULTS={ERMsearchoption:CERM_searchoption_array,error:CERM_SRC_error_array.errormsg,nationality:CERM_SRC_nation_array,occupation:CERM_SRC_occupation_array,userstamp:CERM_SRC_userstamp_array,emailname:emailids,Record:CERM_SRC_records}
    return CERM_SRC_RESULTS; 
    CERM_SRC_conn.close()
  }
   function CERM_SRC_ERMdeletionrecord(id)
  {
    var CERM_SRC_conn =eilib.db_GetConnection();
      var returnflag=eilib.DeleteRecord(CERM_SRC_conn, 80, id)
    if(returnflag==1)
    { var return_flag='DELETION';}else{return_flag="NOTDELETED";}
    return return_flag;
    CERM_SRC_conn.close();
  }
}
catch(err)
{
}
//************************************ERM UPDATION PART*********************************//
  function CERM_SRC_ERMupdationrecord(id,customer,rent,movingdate,minimumstay,occupation,others,nationality,guests,age,contact,mailid,comments,CERM_oldarrayvalue)
  {
    try
    {
    var CERM_SRC_conn =eilib.db_GetConnection();
    CERM_SRCconn=CERM_SRC_conn;
    CERM_SRC_conn.setAutoCommit(false);
    var ERM_SRC_occupation1=occupation;
    var updatemovedate=movingdate;
    movingdate=eilib.SqlDateFormat(movingdate)
    var ERM_nationality=eilib.ConvertSpclCharString(nationality);
    if(ERM_SRC_occupation1=="OTHERS")
    {
      var ERM_SRC_occupation=others;
    }
    else
    {
      ERM_SRC_occupation=occupation;
    }
    if(contact=="")
    { 
      contact=null;
    }
      
    if(minimumstay!="")
    {
    var mailminstay=minimumstay;
    minimumstay=eilib.ConvertSpclCharString(minimumstay)  
    }
    else
    {
   mailminstay= "";  
    }
    if(guests!="")
    {
      var mailguests=guests;
      guests=eilib.ConvertSpclCharString(guests)
    }
    else
    {
    mailguests="";  
    }
    if(age!="")
    {
      var mailage=age;
      age=eilib.ConvertSpclCharString(age)
    }
    else
    {
      mailage="";
    }
    var ERM_mailid=mailid.toLowerCase();
    var Erm_comments=eilib.ConvertSpclCharString(comments);
    var ERM_SRC_timestamp=Utilities.formatDate(new Date(), TimeZone, 'yyyy-MM-dd hh:mm:ss');
    var CERM_SRC_updatestmt=CERM_SRC_conn.createStatement();
    var CERM_SRC_updatequery="CALL SP_ERM_UPDATE('"+ERM_SRC_occupation+"',"+id+",'"+customer+"',"+rent+",'"+movingdate+"','"+minimumstay+"','"+ERM_nationality+"','"+guests+"','"+age+"','"+contact+"','"+ERM_mailid+"','"+Erm_comments+"','"+UserStamp+"',@ERM_SUCCESSFLAG)";
    CERM_SRC_updatestmt.execute(CERM_SRC_updatequery);
    var returnflagresult=CERM_SRC_updatestmt.executeQuery("SELECT @ERM_SUCCESSFLAG");
    if(returnflagresult.next())
    { var returnflag=returnflagresult.getString(1);}
    returnflagresult.close();
    CERM_SRC_updatestmt.close();
    if(returnflag==1)
    {
    var emailids=eilib.getProfileEmailId(CERM_SRC_conn, 'ERM')
    var name=emailids[0];
    var ccList=emailids[1];
    name=name.toString();
    var username=name.split('@');
    var mailusername=username[0].toUpperCase();
    var sysdate=Utilities.formatDate(new Date(), TimeZone, "dd-MM-yyyy")
    var subject="HELLO "+" <font color='gray'>"+"</font>"+"<font color='#498af3'><b>"+mailusername+"</b> </font>"+"<br>"+" PLEASE FIND ATTACHED UPDATED LEED DETAILS FROM ERM: "+"<br>";
    var message = '<body>'+'<br>'+'<h> '+subject+'</h>'+'<br>'+'</body>';
    if(ERM_SRC_occupation1=="OTHERS")
    {
      var dataarray=[customer,rent,updatemovedate,mailminstay,ERM_SRC_occupation,nationality,mailguests,mailage,contact,ERM_mailid,comments];
    }
    else
    {
      var dataarray=[customer,rent,updatemovedate,mailminstay,ERM_SRC_occupation,nationality,mailguests,mailage,contact,ERM_mailid,comments];
    }
    var head_array=['CUSTOMER NAME','RENT','MOVING DATE','MIN STAY','OCCUPATION','NATIONALITY','NO OF GUESTS','AGE','CONTACT','EMAIL','COMMENTS'];
    for(var i=0;i<dataarray.length;i++)
    {
      var value=dataarray[i];
      if(value=="" || value==null || value=="SELECT")continue;
      message += '<body>'+'<table border="1"width="500" >'+'<tr align="left" >'+'<td width=40%>'+head_array[i]+'</td>'+'<td width=60%>'+value+'</td>'+'</tr>'+'</table>'+'</body>';
    }
    var emailsubject="UPDATED ERM LEED -"+sysdate;
    var displayname ='ERM' ;
    var advancedArgs={cc:ccList,name:displayname,htmlBody:message};
    MailApp.sendEmail(name,emailsubject,message ,advancedArgs);
    CERM_SRC_conn.commit();
    }
    if(returnflag==1)
    { var return_flag='UPDATION';    }else{return_flag="NOTUPDATION";}
    return return_flag;
    CERM_SRC_conn.close();
    }
    catch(err)
    {
      CERM_SRCconn.rollback();
    }
  }
  //****************************ERM RECORD DELETE FUNCTION *******************************//
 
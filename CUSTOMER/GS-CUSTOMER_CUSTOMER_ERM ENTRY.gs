//*******************************************ERM ENTRY*********************************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY:PUNI
//VER 1.08- SD:24/10/2014 ED:24/10/2014,TRACKER NO:709,cleared reset button issue.-removed unwanted onclick reset function
//DONE BY:KUMAR
//VER 1.07- SD:20/10/2014 ED:20/10/2014,TRACKER NO:709,fixed no of guests saving issue
//VER 1.06- SD:19/09/2014 ED:19/09/2014,TRACKER NO:709,Implemented preloader and msgbox position script
//VER 1.06- SD:19/09/2014 ED:19/09/2014,TRACKER NO:709,Implemented preloader and msgbox position script
//VER 1.05- SD:28/08/2014 ED:28/08/2014,TRACKER NO:709 Changed contact no input value format 
//VER 1.04- SD:08/08/2014 ED:08/08/2014,TRACKER NO:708 implemented rollback and commit in script side AND updated new jquery and css links .
//VER 1.03- SD:22/07/2014 ED:22/07/2014,TRACKER NO:708 coverted age,guests,minimum stay data's to string.
//VER 1.02- SD:16/06/2014 ED:16/07/2014,TRACKER NO:708 changed Contact no datatype bigint(20) to varchar(20) and used class prefix accept 00 also 
//VER 1.01- SD:28/06/2014 ED:28/06/2014,TRACKER NO:708 cleared email id button vlaidation issue and chenaged erm rent maximum digit 4 to 5 
//VER 1.00- SD:18/06/2014 ED:18/06/2014,TRACKER NO:708 Added conn error mesaage and did moving date min and max date validation.and updated new email id validation.
//VER 0.09- SD:06/06/2014 ED:06/06/2014,TRACKER NO:708 Changed jquery common link and css link.
//ver 0.08- SD:02/06/2014 ED:02/06/2014,TRACKER NO:708 Some nationality have spl character so used eilib splchar conversion function in save part.
//VER 0.07- SD:17/04/2014 ED:17/04/2014,TRACKER NO:708 Restricted DP manual inputs and Removed Mantatory Field for Email id.
//VER 0.06- SD:27/02/2014 ED:27/02/2014,TRACKER NO:708 did userstamp id convrsion changes and return flags;
//VER 0.05- SD:12/01/2014 ED:12/12/2014,TRACKER NO:708 changed conformation msg and preloader id and title position
//VER O.O4- SD:30/12/2013 ED:30/12/2013,TRACKER NO:171 Removed multiple conn in same function.in ver 0.04
//VER 0.03- SD:03/12/2013 ED:03/12/2013,TRACKER NO:171Added Return function script in ver0.03
//VER 0.02- SD:30/11/2013 ED:30/11/2013,TRACKER NO:171-changed html file name and gs file name in ver0.02
//VER 0.01-INITIAL VERSION-SD:14/09/2013 ED:17/09/2013,TRACKER NO:171
//*********************************************************************************************************//
try
{
  var CERM_ENTRYconn;
  //***************************INITIAL TABLE CALL QUERIES*********************//
  function CERM_ENTRY_commonvalues()
  {
    var CERM_ENTRY_conn =eilib.db_GetConnection();
    /********************************ERROR MESSAGES************************************/
    var CERM_ENTRY_error_code ='1,2,3,6,36,382,400';
    var CERM_ENTRY_error_array=eilib.GetErrorMessageList(CERM_ENTRY_conn, CERM_ENTRY_error_code);
    /********************************GETTING OCCUPATION DETAILS*************************/
    var CERM_ENTRY_occupationstmt = CERM_ENTRY_conn.createStatement();
    var CERM_ENTRY_occupation_array =[];
    var CERM_ENTRY_occupation_query = "SELECT ERMO_DATA FROM ERM_OCCUPATION_DETAILS order by ERMO_DATA ASC"; 
    var CERM_ENTRY_occupation_result = CERM_ENTRY_occupationstmt.executeQuery(CERM_ENTRY_occupation_query);
    while(CERM_ENTRY_occupation_result.next())
    {
      CERM_ENTRY_occupation_array.push(CERM_ENTRY_occupation_result.getString("ERMO_DATA"));
    }
    CERM_ENTRY_occupation_result.close();
    CERM_ENTRY_occupationstmt.close();
    /********************************GETTING NATIONALITY DATA'S*****************************/
    var CERM_ENTRY_nation_array =eilib.CUST_getNationality(CERM_ENTRY_conn);
    /********************************GETTING EMAIL ID'S*****************************/
    var emailids=eilib.getProfileEmailId(CERM_ENTRY_conn, 'ERM');
    var CERM_RESULT={error:CERM_ENTRY_error_array.errormsg,occupation:CERM_ENTRY_occupation_array,nationality:CERM_ENTRY_nation_array,name:emailids}
    return CERM_RESULT;
    CERM_ENTRY_conn.close();
  }
}
catch(err)
{
}
/*******************ERM RECORDS SAVE FUNCTION*******************************/
function CERM_ENTRY_processFormSubmit(ERM_ENTRY_details)
{
  try
  {
    var CERM_ENTRY_conn =eilib.db_GetConnection();
    CERM_ENTRYconn=CERM_ENTRY_conn
    var ERM_ENTRY_userstamp=Session.getActiveUser().getEmail();
    var ERM_ENTRY_customername=ERM_ENTRY_details.CERM_ENTRY_tb_customername;
    var ERM_ENTRY_rent=ERM_ENTRY_details.CERM_ENTRY_tb_rent;
    var ERM_ENTRY_moving_date=ERM_ENTRY_details.CERM_ENTRY_db_movingdate;
    var ERM_ENTRY_movingdate=eilib.SqlDateFormat(ERM_ENTRY_moving_date)
    var mailminimummovedate=ERM_ENTRY_details.CERM_ENTRY_tb_minimumstay;
    var ERM_ENTRY_minimumstay=eilib.ConvertSpclCharString(ERM_ENTRY_details.CERM_ENTRY_tb_minimumstay);
    var ERM_ENTRY_occupation1=ERM_ENTRY_details.CERM_ENTRY_lb_occupation;
    if(ERM_ENTRY_occupation1=="OTHERS")
    { 
      var ERM_ENTRY_occupation=ERM_ENTRY_details.CERM_ENTRY_tb_others;
    }
    else
    {
      ERM_ENTRY_occupation=ERM_ENTRY_details.CERM_ENTRY_lb_occupation;
    }
    var ERM_ENTRY_nation=ERM_ENTRY_details.CERM_ENTRY_lb_nationselect;
    if(ERM_ENTRY_nation=="SELECT")
    { 
      var ERM_ENTRY_nation=null;var nationality="";
    }
    else
    { 
      nationality=ERM_ENTRY_nation;ERM_ENTRY_nation="'"+eilib.ConvertSpclCharString(ERM_ENTRY_nation)+"'";
    }
    var ERM_ENTRY_others=ERM_ENTRY_details.CERM_ENTRY_tb_others;
    var ERM_ENTRY_guests=ERM_ENTRY_details.CERM_ENTRY_tb_noofguests;
    if(ERM_ENTRY_guests=="")
    {
      var mailguests="";ERM_ENTRY_guests=null;
    }
    else
    {
      var mailguests=ERM_ENTRY_guests;ERM_ENTRY_guests="'"+eilib.ConvertSpclCharString(ERM_ENTRY_guests)+"'";
    }
    var ERM_ENTRY_age=ERM_ENTRY_details.CERM_ENTRY_tb_age;
    if(ERM_ENTRY_age=="")
    { 
      var mailage=ERM_ENTRY_age;ERM_ENTRY_age=null;
    }
    else
    {
      mailage=ERM_ENTRY_age;ERM_ENTRY_age="'"+eilib.ConvertSpclCharString(ERM_ENTRY_age)+"'"
    }
    var ERM_ENTRY_contact=ERM_ENTRY_details.CERM_ENTRY_tb_contact;
    if(ERM_ENTRY_contact=="")
    {
      var mailcontact="";ERM_ENTRY_contact=null;
    }
    else
    {
      mailcontact=ERM_ENTRY_contact;ERM_ENTRY_contact="'"+ERM_ENTRY_contact+"'"
    }
    var ERM_ENTRY_mailid=(ERM_ENTRY_details.CERM_ENTRY_tb_mailid).toLowerCase();
    var ERM_ENTRY_comments=eilib.ConvertSpclCharString(ERM_ENTRY_details.CERM_ENTRY_ta_comments);
    var mailERM_ENTRY_comments=ERM_ENTRY_details.CERM_ENTRY_ta_comments;
    var ERM_ENTRY_insertstmt=CERM_ENTRY_conn.createStatement();
    var ERM_ENTRY_insertquery="CALL SP_ERM_INSERT('"+ERM_ENTRY_customername+"',"+ERM_ENTRY_rent+",'"+ERM_ENTRY_movingdate+"','"+ERM_ENTRY_minimumstay+"','"+ERM_ENTRY_occupation+"',"+ERM_ENTRY_nation+","+ERM_ENTRY_guests+","+ERM_ENTRY_age+","+ERM_ENTRY_contact+",'"+ERM_ENTRY_mailid+"','"+ERM_ENTRY_comments+"','"+UserStamp+"',@ERM_SUCCESSFLAG)"
    ERM_ENTRY_insertstmt.execute(ERM_ENTRY_insertquery);
    var updateconformquery="SELECT @ERM_SUCCESSFLAG";
    var updateconformresult=ERM_ENTRY_insertstmt.executeQuery(updateconformquery);
    while(updateconformresult.next())
    {
      var errormsg=updateconformresult.getString(1);
    }
    updateconformresult.close();
    ERM_ENTRY_insertstmt.close();
    var ERM_mailids=eilib.getProfileEmailId(CERM_ENTRY_conn,'ERM');
    var name=ERM_mailids[0];
    var ccList=ERM_mailids[1];
    name=name.toString();
    var username=name.split('@');
    var mailusername=username[0].toUpperCase();
    var sysdate=Utilities.formatDate(new Date(), TimeZone, "dd-MM-yyyy")
    var subject="HELLO "+" <font color='gray'>"+"</font>"+"<font color='#498af3'><b>"+mailusername+"</b> </font>"+"<br>"+" PLEASE FIND ATTACHED NEW LEED DETAILS FROM ERM: "+"<br>";
    var message = '<body>'+'<br>'+'<h> '+subject+'</h>'+'<br>'+'</body>';
    if(ERM_ENTRY_occupation1=="OTHERS")
    {
      var dataarray=[ERM_ENTRY_customername,ERM_ENTRY_rent,ERM_ENTRY_moving_date,mailminimummovedate,ERM_ENTRY_occupation,nationality,mailguests,mailage,mailcontact,ERM_ENTRY_mailid,mailERM_ENTRY_comments];
    }
    else
    {
      var dataarray=[ERM_ENTRY_customername,ERM_ENTRY_rent,ERM_ENTRY_moving_date,mailminimummovedate,ERM_ENTRY_occupation1,nationality,mailguests,mailage,mailcontact,ERM_ENTRY_mailid,mailERM_ENTRY_comments];
    }
    var head_array=['CUSTOMER NAME','RENT','MOVING DATE','MIN STAY','OCCUPATION','NATIONALITY','NO OF GUESTS','AGE','CONTACT','EMAIL','COMMENTS'];
    if(errormsg==1)
    {
      for(var i=0;i<dataarray.length;i++)
      {
        var value=dataarray[i];
        if(value=="" || value==null)continue;
        message += '<body>'+'<table border="1"width="500" >'+'<tr align="left" >'+'<td width=40%>'+head_array[i]+'</td>'+'<td width=60%>'+value+'</td>'+'</tr>'+'</table>'+'</body>';
      }
      var emailsubject="NEW ERM LEED -"+sysdate;
      var displayname ='ERM' ;
      var advancedArgs={cc:ccList,name:displayname,htmlBody:message};
      MailApp.sendEmail(name,emailsubject,message ,advancedArgs);
      CERM_ENTRY_conn.commit();
      return 'SAVED';
    }
    else { return "NOTSAVED";}
    CERM_ENTRY_conn.close();
  }
  catch(err)
  {
    CERM_ENTRYconn.rollback();
    Logger.log('err'+err);
  }
}
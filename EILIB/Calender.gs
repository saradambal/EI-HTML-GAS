//CONVERT INPUT DATE TO CREATE CALENDAR EVENT
function CalenderTime_Convertion(calenderIDcode,CSRC_startdate, CSRC_startdate_starttime, CSRC_startdate_endtime)
{
  var cal = CalendarApp.getCalendarsByName(calenderIDcode)[0]; 
  var stime_in=CSRC_startdate_starttime.split(':');
  var stime_out=CSRC_startdate_endtime.split(':');
  var startdate=CSRC_startdate.split('-');//START DATE
  var month = startdate[1];
  var day = startdate[2];
  var year = startdate[0];
  var startdate = month + '/' + day + '/' + year;//string format of startdate
  var startdate1 = month + '/' + day + '/' + year;//string format of startdate
  startdate=new Date(startdate)
  startdate1=new Date(startdate1)
  var enddate=CSRC_startdate.split('-');
  var month1 = enddate[1];
  var day1 = enddate[2];
  var year1 = enddate[0];
  var enddate = month1 + '/' + day1 + '/' + year1;//string format of enddate
  var enddate1 = month1 + '/' + day1 + '/' + year1;//string format of enddate
  enddate=new Date(enddate)
  enddate1=new Date(enddate1)
  //CHECKIN DELETION
  var checkin=startdate;
  var checkin1=startdate1;
  var starttime=checkin.setHours(checkin.getHours() + stime_in[0]);
  var start_time=checkin.setMinutes(checkin.getMinutes() + stime_in[1]);
  var startdate_deletion=new Date(start_time);
  var starttime1=checkin1.setHours(checkin1.getHours() + stime_out[0]);
  var start_time1 = checkin1.setMinutes(checkin1.getMinutes() + stime_out[1]);//assigning time(hour) to enddate
  var startdate1_deletion=new Date(start_time1);
  var returnvalues=[startdate_deletion,startdate1_deletion];
  return returnvalues;
}
//FUNCTION TO CREATE CALENDAR EVENT
function  CUST_customercalendercreation(custid,calenderIDcode,startdate,startdate_starttime,startdate_endtime,enddate,enddate_starttime,enddate_endtime,firstname,lastname,mobile,intmobile,office,customermailid,unit,roomtype,unitrmtype)
{
  var cal = CalendarApp.getCalendarsByName(calenderIDcode)[0] ;
  var initialsdate=startdate;
  var initialedate=enddate;
  var startevents=CalenderTime_Convertion(calenderIDcode,startdate, startdate_starttime, startdate_endtime)
  var calendername= firstname+' '+lastname;
  var contactno="";
  var contactaddr="";
  if(mobile!=null)
  {contactno=mobile;}
  else if(intmobile!=null)
  {contactno=intmobile;}
  else if(office!=null)
  {contactno=office;}
  if(mobile!=null||intmobile!=null||office!=null)
  {
    contactaddr=custid+" "+"EMAIL :"+customermailid+",CONTACT NO :"+contactno;
  }
  else
  {
    contactaddr=custid+" "+"EMAIL :"+customermailid;
  }
  if(unitrmtype!="")
  {
    var details =unit+ " " + calendername + " " +unitrmtype+" "+ "CHECKIN";
  }
  else
  {
    var details =unit+ " " + calendername + " " + "CHECKIN";
  }
  var details1 =unit+ " " +roomtype ;
  if(initialsdate!="")
  {
    var c= cal.createEvent(details, startevents[0], startevents[1], {description:contactaddr, location: details1});// event creation if more event on same date in startdate
  }
  var endevents=CalenderTime_Convertion(calenderIDcode,enddate,enddate_starttime,enddate_endtime)
  var detailsend =unit+ " " + calendername + " " + "CHECKOUT";
  var detailsend1 =unit+ " " +roomtype ;
  if(initialedate!="")
  {
    var k= cal.createEvent(detailsend, endevents[0], endevents[1], {description:contactaddr, location: detailsend1});//.addEmailReminder(10080).addSmsReminder(10080);//event creation if event is empty in enddate
  }
}
//FUNCTION TO DELETE CALENDER EVENTS
function CUST_customercalenderdeletion(custid,calenderIDcode,startdate,start_time_in,start_time_out,enddate,end_time_in,end_time_out,formname)
{
  
  var cal = CalendarApp.getCalendarsByName(calenderIDcode)[0] ; 
  var startevents=CalenderTime_Convertion(calenderIDcode,startdate, start_time_in, start_time_out)
  if(formname=='UNCANCEL' && startdate!='')
  {
    var startdate=startdate.split('-');//START DATE
    var month = startdate[1];
    var day = startdate[2];
    var year = startdate[0];
    var startdate = month + '/' + day + '/' + year;//string format of startdate
    startdate=new Date(startdate) 
    var startevent_deletion=cal.getEventsForDay((startdate))
    }
  else{
    var startevent_deletion=cal.getEvents(startevents[0], startevents[1]);//getting start date event from calendar
  }
  for(var q=0;q<startevent_deletion.length;q++)
  {
    if(startevent_deletion[q])
    {
      var start_desc=startevent_deletion[q].getDescription();
      var ev_title=startevent_deletion[q].getTitle();
      start_desc=start_desc.split(' ');
      if(parseInt(start_desc[0]) == custid)
      {
        startevent_deletion[q].deleteEvent(); // Deleting events if any edit occure
      }
    }
  }
  //CHECKOUT DELETION    
  var endevents=CalenderTime_Convertion(calenderIDcode,enddate,end_time_in,end_time_out)
  if(formname=='UNCANCEL' && enddate!='')
  {
    var enddate=enddate.split('-');
    var month1 = enddate[1];
    var day1 = enddate[2];
    var year1 = enddate[0];
    var enddate = month1 + '/' + day1 + '/' + year1;//string format of enddate
    enddate=new Date(enddate)
    var endevent_deletion=cal.getEventsForDay((enddate));
  }
  else
  {
    var endevent_deletion=cal.getEvents(endevents[0],endevents[1]);      
  }
  for(var q=0;q<endevent_deletion.length;q++)
  {
    if(endevent_deletion[q])
    {
      var end_desc=endevent_deletion[q].getDescription();
      var ev_title=endevent_deletion[q].getTitle();
      end_desc=end_desc.split(' ');
      if(parseInt(end_desc[0]) == custid)
      {
        endevent_deletion[q].deleteEvent(); // Deleting events if any edit occure
      }
    }
  } 
}
//FUNCTION TO DELETE CALENDER EVENTS FOR STAR HUB
function StarHubUnit_DeleteCalEvent(unitno,calenderIDcode,startdate,start_time_in,start_time_out,enddate,end_time_in,end_time_out,formname)
{
  var cal = CalendarApp.getCalendarsByName(calenderIDcode)[0] ; 
  var startevents=CalenderTime_Convertion(calenderIDcode,startdate, start_time_in, start_time_out)
  var startevent_deletion=cal.getEvents(startevents[0],startevents[1]);
  for(var q=0;q<startevent_deletion.length;q++)
  {
    if(startevent_deletion[q])
    {
      var start_desc=startevent_deletion[q].getDescription();
      start_desc=start_desc.split(' - ');
      if((start_desc[1].toString().match("EI")&&formname=="UNIT")||(formname=="STARHUB"))
      {
        if(start_desc[0]==unitno)
        {
          startevent_deletion[q].deleteEvent(); // Deleting events if any edit occure
        }
      }
    }
  }
  //CHECKOUT DELETION    
  var endevents=CalenderTime_Convertion(calenderIDcode,enddate, end_time_in, end_time_out)
  var endevent_deletion=cal.getEvents(endevents[0],endevents[1]);
  for(var q=0;q<endevent_deletion.length;q++)
  {
    if(endevent_deletion[q])
    {
      var end_desc=endevent_deletion[q].getDescription();
      end_desc=end_desc.split(' - ');
      if(end_desc[1].toString().match("EI")&&formname=="UNIT"||formname=="STARHUB")
      {
        if(end_desc[0]==unitno)
        {
          endevent_deletion[q].deleteEvent(); // Deleting events if any edit occure
        }
      }
    }
  } 
}
//CALENDAR EVENT CREATION FOR STARHUB N UNIT FORM
function  StarHubUnit_CreateCalEvent(calenderIDcode,startdate,startdate_starttime,startdate_endtime,enddate,enddate_starttime,enddate_endtime,TypeOfExp,unitno,accountno,starteventtype,endeventtype,eiornonei,rent)
{
  var cal = CalendarApp.getCalendarsByName(calenderIDcode)[0] ;
  var startevents=CalenderTime_Convertion(calenderIDcode,startdate, startdate_starttime, startdate_endtime)
  if(eiornonei=="X"){eiornonei="EI"} else{eiornonei="NON EI"}
  var calseventtitle="",calseventdesc="",calseventloc="",caleeventtitle="",caleeventdesc="",caleeventloc="";  
  if(TypeOfExp=="STARHUB")
  {
    calseventtitle=TypeOfExp+" "+unitno+" - "+starteventtype;//title of start event
    calseventdesc=unitno+" - "+accountno+" - "+starteventtype;//description of start event
    calseventloc=unitno+" - "+accountno;//location of start event
  }
  else//UNIT
  {
    calseventtitle=unitno+" - "+"LEASE "+starteventtype;//title of start event
    calseventdesc=unitno+" - "+eiornonei+" - "+"RENT :"+rent;//description of start event
    calseventloc=unitno+" - "+eiornonei;//location of start event
  }
  //create start event
  var c= cal.createEvent(calseventtitle, startevents[0], startevents[1], {description:calseventdesc, location: calseventloc});// event creation if more event on same date in startdate
  var endevents=CalenderTime_Convertion(calenderIDcode,enddate,enddate_starttime,enddate_endtime)
  if(TypeOfExp=="STARHUB")
  {
    caleeventtitle=TypeOfExp+" "+unitno+" - "+endeventtype;//title of end event
    caleeventdesc=unitno+" - "+accountno+" - "+endeventtype;//description of end event
    caleeventloc=unitno+" - "+accountno;//location of end event
  }
  else//UNIT
  {
    caleeventtitle=unitno+" - "+"LEASE "+endeventtype;//title of start event
    caleeventdesc=unitno+" - "+eiornonei+" - "+"RENT AMOUNT "+rent;//description of start event
    caleeventloc=unitno+" - "+eiornonei;//location of start event
  }
  //create end event
  var k= cal.createEvent(caleeventtitle, endevents[0], endevents[1], {description:caleeventdesc, location: caleeventloc});//.addEmailReminder(10080).addSmsReminder(10080);//event creation if event is empty in enddate
}
//FUNCTION TO DELETE EXISTING EVENT N CREATE CURRENT CALENDAR EVENT DTS FOR EXTENSION N TERMINATION
function CTermExtn_Calevent(conn,CTermExtn_custid,CTermExtn_recver,calenderIDcode,CTermExtn_customerptd,CTermExtn_ptdsttime,CTermExtn_ptdedtime,CTermExtn_calptd,ctermformname)
{
  var CTermExtn_custfirstname="",CTermExtn_custlastname="";
  var CTermExtn_calevntchk_flag=0;
  var CTermExtn_prevunitno=[];
  var CTermExtn_prevroomtype=[];    
  var CTermExtn_caleventcount=0;
  var CTermExtn_tempstmt=conn.createStatement();
  CTermExtn_tempstmt.execute("CALL SP_CUSTOMER_MIN_MAX_RV('"+UserStamp+"',"+CTermExtn_custid+",@MNMAXTBLNAME)");
  CTermExtn_tempstmt.close();
   var CTermExtn_temptbl_stmt=conn.createStatement();
    var CTermExtn_temptbl_query="SELECT @MNMAXTBLNAME";
    var CTermExtn_temptblres=CTermExtn_temptbl_stmt.executeQuery(CTermExtn_temptbl_query);
    var CTermExtntblname="";
    while(CTermExtn_temptblres.next())
    {
      CTermExtntblname=CTermExtn_temptblres.getString("@MNMAXTBLNAME");
    }
    CTermExtn_temptblres.close();
    CTermExtn_temptbl_stmt.close();
  if(ctermformname=="EXTENSION")
  {
    var CTermExtn_calmaxrvstmt= conn.createStatement();
    var CTermExtn_calmaxrvquery="SELECT CED_REC_VER FROM VW_EXTENSION_CUSTOMER WHERE CUSTOMER_ID="+CTermExtn_custid+"";
    var CTermExtn_calmaxrvres = CTermExtn_calmaxrvstmt.executeQuery(CTermExtn_calmaxrvquery);
    while(CTermExtn_calmaxrvres.next())
    {
      var CTermExtn_custmaxrv=CTermExtn_calmaxrvres.getString("CED_REC_VER");
      CTermExtn_recver=CTermExtn_custmaxrv;
    }   
  }
  var CTermExtn_calevntstmt= conn.createStatement();
  var i=0;//position to know prev rv unitno or prev rv rm
  var CTermExtn_calevntquery="SELECT  C.CUSTOMER_FIRST_NAME,C.CUSTOMER_LAST_NAME,CED.CED_REC_VER,CTD.CLP_GUEST_CARD,CTD.CLP_STARTDATE,CTD.CLP_ENDDATE,CTD.CLP_PRETERMINATE_DATE,CPD.CPD_MOBILE,CPD.CPD_INTL_MOBILE,CCD.CCD_OFFICE_NO,CPD.CPD_EMAIL,U.UNIT_NO,URTD.URTD_ROOM_TYPE,CTPA.CTP_DATA AS CED_SD_STIME, CTPB.CTP_DATA AS CED_SD_ETIME,CTPC.CTP_DATA AS CED_ED_STIME, CTPD.CTP_DATA AS CED_ED_ETIME FROM  CUSTOMER_ENTRY_DETAILS CED LEFT JOIN CUSTOMER_TIME_PROFILE CTPA ON CED.CED_SD_STIME = CTPA.CTP_ID LEFT JOIN CUSTOMER_TIME_PROFILE CTPB ON CED.CED_SD_ETIME = CTPB.CTP_ID LEFT JOIN CUSTOMER_TIME_PROFILE CTPC ON CED.CED_ED_STIME = CTPC.CTP_ID LEFT JOIN CUSTOMER_TIME_PROFILE CTPD ON CED.CED_ED_ETIME = CTPD.CTP_ID LEFT JOIN CUSTOMER_COMPANY_DETAILS CCD ON CED.CUSTOMER_ID=CCD.CUSTOMER_ID LEFT JOIN  CUSTOMER_PERSONAL_DETAILS CPD ON CED.CUSTOMER_ID=CPD.CUSTOMER_ID,CUSTOMER_LP_DETAILS CTD,UNIT_ROOM_TYPE_DETAILS URTD, UNIT_ACCESS_STAMP_DETAILS UASD ,UNIT U,CUSTOMER C WHERE  CED.UNIT_ID=U.UNIT_ID AND (CED.CUSTOMER_ID="+CTermExtn_custid+")AND (CTD.CUSTOMER_ID=CED.CUSTOMER_ID) AND (CED.CED_REC_VER=CTD.CED_REC_VER) AND (CTD.CLP_GUEST_CARD IS NULL) AND CED.CED_CANCEL_DATE IS  NULL AND(UASD.UASD_ID=CED.UASD_ID) AND(UASD.URTD_ID=URTD.URTD_ID)  AND (C.CUSTOMER_ID=CED.CUSTOMER_ID) AND (CTD.CUSTOMER_ID=C.CUSTOMER_ID) AND CED.CED_REC_VER>=(SELECT TCMM_MINRV FROM "+CTermExtntblname+" WHERE TCMM_CUSTOMERID="+CTermExtn_custid+") AND CTD.CLP_GUEST_CARD IS NULL ORDER BY CED.CED_REC_VER, CTD.CLP_GUEST_CARD ASC"
  var CTermExtn_calevntres = CTermExtn_calevntstmt.executeQuery(CTermExtn_calevntquery);
  while(CTermExtn_calevntres.next())
  {
    CTermExtn_caleventcount=CTermExtn_caleventcount+1;
    var CTermExtn_gstcard=CTermExtn_calevntres.getString("CLP_GUEST_CARD");
    if(CTermExtn_gstcard==null)
    {
      CTermExtn_custfirstname=CTermExtn_calevntres.getString("CUSTOMER_FIRST_NAME");
      CTermExtn_custlastname=CTermExtn_calevntres.getString("CUSTOMER_LAST_NAME");
      var CTermExtn_stdate=CTermExtn_calevntres.getString("CLP_STARTDATE");
      var CTermExtn_stdate1=CTermExtn_calevntres.getDate("CLP_STARTDATE").getTime();
      var CTermExtn_eddate=CTermExtn_calevntres.getString("CLP_ENDDATE");
      var CTermExtn_eddate1=CTermExtn_calevntres.getDate("CLP_ENDDATE").getTime();
      var CTermExtn_ptddate=CTermExtn_calevntres.getString("CLP_PRETERMINATE_DATE");        
      var CTermExtn_start_time_in=CTermExtn_calevntres.getString("CED_SD_STIME");
      var CTermExtn_start_time_out=CTermExtn_calevntres.getString("CED_SD_ETIME");
      var CTermExtn_end_time_in=CTermExtn_calevntres.getString("CED_ED_STIME");
      var CTermExtn_end_time_out=CTermExtn_calevntres.getString("CED_ED_ETIME");
      var CTermExtn_recversion=CTermExtn_calevntres.getString("CED_REC_VER");        
      if(CTermExtn_ptddate!=null)
      {          
        var CTermExtn_ptddate1=CTermExtn_calevntres.getDate("CLP_PRETERMINATE_DATE").getTime();
      }
      else
      {
        var CTermExtn_ptddate1=CTermExtn_eddate1;
      }
      if(ctermformname=="TERMINATION")
      {
        for(var j=0;j<CTermExtn_calptd.length;j++)
        {
          if(CTermExtn_calptd[j].calrv==CTermExtn_recversion)
          {
            CTermExtn_ptddate1=new Date((CTermExtn_calptd[j].calptd).split('-')[0],((CTermExtn_calptd[j].calptd).split('-')[1])-1,(CTermExtn_calptd[j].calptd).split('-')[2]).getTime();
          }          
        }
      }
      if(CTermExtn_recversion==CTermExtn_recver&&ctermformname=="TERMINATION")
      {
        var CTermExtn_ptddate1=new Date(CTermExtn_customerptd.split('-')[0],(CTermExtn_customerptd.split('-')[1])-1,CTermExtn_customerptd.split('-')[2]).getTime();
      }
      if(CTermExtn_ptddate!=null)
      {
        CTermExtn_eddate=CTermExtn_ptddate;
      }
      //call cal event delete function from eilib     
      CUST_customercalenderdeletion(CTermExtn_custid,calenderIDcode,CTermExtn_stdate,CTermExtn_start_time_in,CTermExtn_start_time_out,CTermExtn_eddate,CTermExtn_end_time_in,CTermExtn_end_time_out,"")
      var CTermExtn_custunittype="";
      var CTermExtn_mobile=CTermExtn_calevntres.getString("CPD_MOBILE");
      var CTermExtn_intmoblie=CTermExtn_calevntres.getString("CPD_INTL_MOBILE");
      var CTermExtn_office=CTermExtn_calevntres.getString("CCD_OFFICE_NO");
      var CTermExtn_emailid=CTermExtn_calevntres.getString("CPD_EMAIL");
      var CTermExtn_unitno=CTermExtn_calevntres.getString("UNIT_NO");
      var CTermExtn_roomtype=CTermExtn_calevntres.getString("URTD_ROOM_TYPE");
      if(new Date(Utilities.formatDate(new Date(CTermExtn_ptddate1),TimeZone, 'yyyy/MM/dd 00:00:00'))>new Date(Utilities.formatDate(new Date(CTermExtn_stdate1),TimeZone, 'yyyy/MM/dd 00:00:00')))//new Date(Utilities.formatDate(new Date(CTermExtn_ptddate1),TimeZone, 'yyyy/MM/dd 00:00:00'))<=new Date(Utilities.formatDate(new Date(CTermExtn_eddate1),TimeZone, 'yyyy/MM/dd 00:00:00')))
      {
        CTermExtn_prevunitno.push(CTermExtn_calevntres.getString("UNIT_NO"));
        CTermExtn_prevroomtype.push(CTermExtn_calevntres.getString("URTD_ROOM_TYPE"));
        if(CTermExtn_caleventcount>1)
        {       
          if(CTermExtn_unitno!=CTermExtn_prevunitno[i-1]&&CTermExtn_prevunitno[i-1]!=undefined)
          {
            CTermExtn_custunittype="DIFF UNIT";
          }
          else
          {
            if(CTermExtn_roomtype!=CTermExtn_prevroomtype[i-1]&&CTermExtn_prevroomtype[i-1]!=undefined)
            {
              CTermExtn_custunittype="DIFF RM";
            }
            else
            {
              CTermExtn_stdate="";
              CTermExtn_start_time_in="";
              CTermExtn_start_time_out="";
            }
          }
        }
        if(CTermExtn_recversion==CTermExtn_recver)
        {
          //call cal event create function from eilib
          if(ctermformname=="EXTENSION")
          {
            CUST_customercalendercreation(CTermExtn_custid,calenderIDcode,CTermExtn_stdate,CTermExtn_start_time_in,CTermExtn_start_time_out,CTermExtn_eddate,CTermExtn_end_time_in,CTermExtn_end_time_out,CTermExtn_custfirstname,CTermExtn_custlastname,CTermExtn_mobile,CTermExtn_intmoblie,CTermExtn_office,CTermExtn_emailid,CTermExtn_unitno,CTermExtn_roomtype,CTermExtn_custunittype)
          }
          else
          {
            CUST_customercalendercreation(CTermExtn_custid,calenderIDcode,CTermExtn_stdate,CTermExtn_start_time_in,CTermExtn_start_time_out,CTermExtn_customerptd,CTermExtn_ptdsttime,CTermExtn_ptdedtime,CTermExtn_custfirstname,CTermExtn_custlastname,CTermExtn_mobile,CTermExtn_intmoblie,CTermExtn_office,CTermExtn_emailid,CTermExtn_unitno,CTermExtn_roomtype,CTermExtn_custunittype)
          }
          CTermExtn_calevntchk_flag=1
        }
        if(CTermExtn_calevntchk_flag==0)
        {
          //call cal event create function from eilib
          CUST_customercalendercreation(CTermExtn_custid,calenderIDcode,CTermExtn_stdate,CTermExtn_start_time_in,CTermExtn_start_time_out,"","","",CTermExtn_custfirstname,CTermExtn_custlastname,CTermExtn_mobile,CTermExtn_intmoblie,CTermExtn_office,CTermExtn_emailid,CTermExtn_unitno,CTermExtn_roomtype,CTermExtn_custunittype)
        }
      }
    }
    i=i+1;
  }
  var CTermExtn_temp_stmt= conn.createStatement();
  var CTermExtn_delete_temp = "DROP TABLE IF EXISTS "+CTermExtntblname+""; 
  CTermExtn_temp_stmt.execute(CTermExtn_delete_temp);
  CTermExtn_temp_stmt.close();
  CTermExtn_calevntres.close();
  CTermExtn_calevntstmt.close();   
}
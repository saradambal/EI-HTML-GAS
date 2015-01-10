//changed scriptproperties to userproperties by Puni on 21/01/2014
/**
* @param {Date} startdate
* @param {Date} enddate
* @return {String}
*/
function quarterCalc(startdate,enddate)
{
  var getbyquartcalcUserProperty = PropertiesService.getUserProperties();
  var getsquartcalcUserProperty = PropertiesService.getUserProperties();
  var getequartcalcUserProperty = PropertiesService.getUserProperties();
  if(startdate.valueOf()>enddate.valueOf()){
    return('0');
  }
  else{
    var s_year=startdate.getFullYear();
    var s_month=startdate.getMonth()+1;
    var s_date=startdate.getDate();
    
    var e_year=enddate.getFullYear();
    var e_month=enddate.getMonth()+1;
    var e_date=enddate.getDate();
    
    var  btw_year=e_year-s_year;
    
    var by_quarters=0;
    var s_quarters=0;
    var e_quarters=0;
    
    if(btw_year<=1){
      var by_quat = 0;
      getbyquartcalcUserProperty.setProperty('by_quarters',by_quat);
    }
    else if(btw_year>1){
      var by_quat = (btw_year-1)*4;
      getbyquartcalcUserProperty.setProperty('by_quarters',by_quat);
    }
    
    
    if(btw_year==0){
      var  btw_month=e_month-s_month;
      if(btw_month==0){
        if(((s_year%4)==0&&(s_year%100)!=0)||((s_year%400)==0)){//leap year
          if(1<=s_month<=3){
            var m_days=e_date-s_date;
            var s_year_quarter=m_days/91;
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
        }
        else{
          if(1<=s_month<=3){
            var m_days=e_date-s_date;
            var s_year_quarter=m_days/90;
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
        }
        if(4<=s_month<=6){
          var m_days=e_date-s_date;
          var s_year_quarter=m_days/91;
          var e_year_quarter=0;
          getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
          getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
        }
        else if(7<=s_month<=9){
          var m_days=e_date-s_date;
          var s_year_quarter=m_days/92;
          var e_year_quarter=0;
          getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
          getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
        }
        else if(10<=s_month<=12){
          var m_days=e_date-s_date;
          var s_year_quarter=m_days/92;
          var e_year_quarter=0;
          getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
          getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
        }
      }
      else if(btw_month>0){
        if(((s_year%4)==0&&(s_year%100)!=0)||((s_year%400)==0)){//leap year
          if(s_month==1){
            if(btw_month==1){//FEB
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days+e_date)/91;
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==2){//MAR
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days+29+e_date)/91;
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==3){//APR
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+29+31)/91)+(e_date/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==4){//MAY
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+29+31)/91)+((30+e_date)/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==5){//JUN
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+29+31)/91)+((30+31+e_date)/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==6){//JUL
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+29+31)/91)+1+(e_date/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==7){//AUG
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+29+31)/91)+1+((31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==8){//SEP
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+29+31)/91)+1+((31+31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==9){//OCT
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+29+31)/91)+2+(e_date/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==10){//NOV
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+29+31)/91)+2+((31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==11){//DEC
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+29+31)/91)+2+((31+30+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
          }
          else if(s_month==2){
            if(btw_month==1){//MAR
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days+e_date)/91;
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==2){//APR
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/91)+(e_date/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==3){//MAY
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/91)+((30+e_date)/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==4){//JUN
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/91)+((30+31+e_date)/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==5){//JUL
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/91)+1+(e_date/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==6){//AUG
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/91)+1+((31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==7){//SEP
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/91)+1+((31+31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==8){//OCT
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/91)+2+(e_date/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==9){//NOV
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/91)+2+((31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==10){//DEC
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/91)+2+((31+30+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
          }
          else if(s_month==3){
            if(btw_month==1){//APR
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/91)+(e_date/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==2){//MAY
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/91)+((30+e_date)/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==3){//JUN
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/91)+((30+31+e_date)/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==4){//JUL
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/91)+1+(e_date/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==5){//AUG
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/91)+1+((31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==6){//SEP
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/91)+1+((31+31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==7){//OCT
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/91)+2+(e_date/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==8){//NOV
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/91)+2+((31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==9){//DEC
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/91)+2+((31+30+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
          }
        }
        else{
          if(s_month==1){
            if(btw_month==1){//FEB
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days+e_date)/90;
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==2){//MAR
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days+28+e_date)/90;
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==3){//APR
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+28+31)/90)+(e_date/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==4){//MAY
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+28+31)/90)+((30+e_date)/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==5){//JUN
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+28+31)/90)+((30+31+e_date)/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==6){//JUL
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+28+31)/90)+1+(e_date/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==7){//AUG
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+28+31)/90)+1+((31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==8){//SEP
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+28+31)/90)+1+((31+31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==9){//OCT
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+28+31)/90)+2+(e_date/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==10){//NOV
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+28+31)/90)+2+((31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==11){//DEC
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+28+31)/90)+2+((31+30+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
          }
          else if(s_month==2){
            if(btw_month==1){//MAR
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days+e_date)/90;
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==2){//APR
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/90)+(e_date/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==3){//MAY
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/90)+((30+e_date)/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==4){//JUN
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/90)+((30+31+e_date)/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==5){//JUL
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/90)+1+(e_date/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==6){//AUG
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/90)+1+((31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==7){//SEP
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/90)+1+((31+31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==8){//OCT
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/90)+2+(e_date/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==9){//NOV
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/90)+2+((31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==10){//DEC
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=((sm_days+31)/90)+2+((31+30+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
          }
          else if(s_month==3){
            if(btw_month==1){//APR
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/90)+(e_date/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==2){//MAY
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/90)+((30+e_date)/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==3){//JUN
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/90)+((30+31+e_date)/91);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==4){//JUL
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/90)+1+(e_date/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==5){//AUG
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/90)+1+((31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==6){//SEP
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/90)+1+((31+31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==7){//OCT
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/90)+2+(e_date/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==8){//NOV
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/90)+2+((31+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
            else if(btw_month==9){//DEC
              var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
              var sm_days=s_lastdate-s_date+1;
              var s_year_quarter=(sm_days/90)+2+((31+30+e_date)/92);
              var e_year_quarter=0;
              getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
              getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
            }
          }
        }
        if(s_month==4){
          if(btw_month==1){//MAY
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days+e_date)/91;
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==2){//JUN
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days+31+e_date)/91;
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==3){//JUL
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+31+30)/91)+(e_date/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==4){//AUG
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+31+30)/91)+((31+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==5){//SEP
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+31+30)/91)+((31+31+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==6){//OCT
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+31+30)/91)+1+(e_date/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==7){//NOV
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+31+30)/91)+1+((31+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==8){//DEC
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+31+30)/91)+1+((31+30+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
        }
        else if(s_month==5){
          if(btw_month==1){//JUN
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days+e_date)/91;
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==2){//JUL
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+30)/91)+(e_date/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==3){//AUG
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+30)/91)+((31+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==4){//SEP
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+30)/91)+((31+31+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==5){//OCT
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+30)/91)+1+(e_date/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==6){//NOV
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+30)/91)+1+((31+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==7){//DEC
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+30)/91)+1+((31+30+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
        }
        else if(s_month==6){
          if(btw_month==1){//JUL
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days/91)+(e_date/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==2){//AUG
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days/91)+((31+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==3){//SEP
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days/91)+((31+31+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==4){//OCT
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days/91)+1+(e_date/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==5){//NOV
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days/91)+1+((31+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==6){//DEC
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days/91)+1+((31+30+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
        }
        else if(s_month==7){
          if(btw_month==1){//AUG
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days+e_date)/92;
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==2){//SEP
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days+31+e_date)/92;
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==3){//OCT
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+31+30)/92)+(e_date/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==4){//NOV
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+31+30)/92)+((31+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==5){//DEC
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+31+30)/92)+((31+30+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
        }
        else if(s_month==8){
          if(btw_month==1){//SEP
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days+e_date)/92;
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==2){//OCT
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+30)/92)+(e_date/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==3){//NOV
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+30)/92)+((31+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==4){//DEC
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=((sm_days+30)/92)+((31+30+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
        }
        else if(s_month==9){
          if(btw_month==1){//OCT
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days/92)+(e_date/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==2){//NOV
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days/92)+((31+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==3){//DEC
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days/92)+((31+30+e_date)/92);
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
        }
        else if(s_month==10){
          if(btw_month==1){//NOV
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days+e_date)/92;
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
          else if(btw_month==2){//DEC
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days+30+e_date)/92;
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
        }
        else if(s_month==11){
          if(btw_month==1){//DEC
            var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
            var sm_days=s_lastdate-s_date+1;
            var s_year_quarter=(sm_days+e_date)/92;
            var e_year_quarter=0;
            getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
            getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
          }
        }
      }
    }    
    
    
    else if(btw_year>0){
      //START DATE QUARTER CALCULATION
      if(((s_year%4)==0&&(s_year%100)!=0)||((s_year%400)==0)){//leap year
        if(s_month==1){
          var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
          var sm_days=s_lastdate-s_date+1;
          var s_year_quarter=((sm_days+29+31)/91)+3;
          getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
        }
        else if(s_month==2){
          var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
          var sm_days=s_lastdate-s_date+1;
          var s_year_quarter=((sm_days+31)/91)+3;
          getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
        }
        else if(s_month==3){
          var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
          var sm_days=s_lastdate-s_date+1;
          var s_year_quarter=(sm_days/91)+3;
          getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
        }
      }
      else{
        if(s_month==1){
          var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
          var sm_days=s_lastdate-s_date+1;
          var s_year_quarter=parseFloat((sm_days+28+31)/90)+3;
          getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
        }
        else if(s_month==2){
          var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
          var sm_days=s_lastdate-s_date+1;
          var s_year_quarter=((sm_days+31)/90)+3;
          getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
        }
        else if(s_month==3){
          var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
          var sm_days=s_lastdate-s_date+1;
          var s_year_quarter=(sm_days/90)+3;
          getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
        }
      }
      if(s_month==4){
        var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
        var sm_days=s_lastdate-s_date+1;
        var s_year_quarter=((sm_days+31+30)/91)+2;
        getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
      }
      else if(s_month==5){
        var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
        var sm_days=s_lastdate-s_date+1;
        var s_year_quarter=((sm_days+30)/91)+2;
        getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
      }
      else if(s_month==6){
        var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
        var sm_days=s_lastdate-s_date+1;
        var s_year_quarter=(sm_days/91)+2;
        getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
      }
      else if(s_month==7){
        var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
        var sm_days=s_lastdate-s_date+1;
        var s_year_quarter=((sm_days+31+30)/92)+1;
        getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
      }
      else if(s_month==8){
        var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
        var sm_days=s_lastdate-s_date+1;
        var s_year_quarter=((sm_days+30)/92)+1;
        getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
      }
      else if(s_month==9){
        var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
        var sm_days=s_lastdate-s_date+1;
        var s_year_quarter=(sm_days/92)+1;
        getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
      }
      else if(s_month==10){
        var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
        var sm_days=s_lastdate-s_date+1;
        var s_year_quarter=(sm_days+30+31)/92;
        getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
      }
      else if(s_month==11){
        var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
        var sm_days=s_lastdate-s_date+1;
        var s_year_quarter=(sm_days+31)/92;
        getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
      }
      else if(s_month==12){
        var s_lastdate = new Date((new Date(s_year, s_month,1))-1).getDate();
        var sm_days=s_lastdate-s_date+1;
        var s_year_quarter=sm_days/92;
        getsquartcalcUserProperty.setProperty('s_quarters', s_year_quarter);
      }
      
      
      
      //END DATE QUARTER CALCULATION
      if(((e_year%4)==0&&(e_year%100)!=0)||((e_year%400)==0)){//leap year
        if(e_month==1){
          var e_year_quarter=e_date/91;
          getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
        }
        else if(e_month==2){
          var e_year_quarter=(31+e_date)/91;
          getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
        }
        else if(e_month==3){
          var e_year_quarter=(31+29+e_date)/91;
          getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
        }
      }
      else{
        if(e_month==1){
          var e_year_quarter=e_date/90;
          getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
        }
        else if(e_month==2){
          var e_year_quarter=(31+e_date)/90;
          getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
        }
        else if(e_month==3){
          var e_year_quarter=(31+28+e_date)/90;
          getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
        }
      }
      if(e_month==4){
        var e_year_quarter=(e_date/91)+1;
        getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
      }
      else if(e_month==5){
        var e_year_quarter=((30+e_date)/91)+1;
        getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
      }
      else if(e_month==6){
        var e_year_quarter=((30+31+e_date)/91)+1;
        getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
      }
      else if(e_month==7){
        var e_year_quarter=(e_date/92)+2;
        getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
      }
      else if(e_month==8){
        var e_year_quarter=((31+e_date)/92)+2;
        getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
      }
      else if(e_month==9){
        var e_year_quarter=((31+31+e_date)/92)+2;
        getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
      }
      else if(e_month==10){
        var e_year_quarter=(e_date/92)+3;
        getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
      }
      else if(e_month==11){
        var e_year_quarter=((31+e_date)/92)+3;
        getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
      }
      else if(e_month==12){
        var e_year_quarter=((31+30+e_date)/92)+3;
        getequartcalcUserProperty.setProperty('e_quarters', e_year_quarter);
      }
    }
    
    
    by_quarters=getbyquartcalcUserProperty.getProperty('by_quarters');
    s_quarters=getsquartcalcUserProperty.getProperty('s_quarters');
    e_quarters=getequartcalcUserProperty.getProperty('e_quarters');
    
    var quarters=parseFloat(parseFloat(by_quarters).toFixed(2))+parseFloat(parseFloat(s_quarters).toFixed(2))+parseFloat(parseFloat(e_quarters).toFixed(2));
    quarters=quarters.toFixed(2);
    return (quarters.toString());
  }
}

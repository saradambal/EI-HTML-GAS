/**
* @param {Date} startdate
* @param {Date} enddate
* @return {String}
*/
function leasePeriodCalc(startDate, endDate)
{
  var sdate=startDate;
  var edate=endDate;
  var year;
  var month;
  var day;
  var output = '';
  edate.setDate( edate.getDate()+1);
  var years=((((edate.getDate()-sdate.getDate())<0 ? -1:0)+((edate.getMonth()+1)-(sdate.getMonth()+1)))< 0 ? -1 : 0)+(edate.getFullYear()-sdate.getFullYear());
  var months=((((edate.getDate()-sdate.getDate())<0 ? -1:0)+((edate.getMonth()+1)-(sdate.getMonth()+1)))< 0 ?12:0)+((edate.getDate()-sdate.getDate())<0 ? -1:0)+((edate.getMonth()+1)-(sdate.getMonth()+1));
  if((edate.getMonth()-1)!=1.0)
  {
    var days=((edate.getDate()-sdate.getDate())< 0 ?new Date(edate.getFullYear(), edate.getMonth(),0).getDate():0)+(edate.getDate()-sdate.getDate());
  }
  else
  {
    var days=((edate.getDate()-sdate.getDate())< 0 ?new Date(edate.getFullYear(), edate.getMonth()+1,0).getDate():0)+(edate.getDate()-sdate.getDate());
  }
  output += (years == 0 ? '' : (', ' + years + ' Year' + (years == 1 ? '' : 's')));
  output += (months == 0 ? '' : (', ' + months + ' Month' + (months == 1 ? '' : 's')));
  output += (days == 0 ? '' : (', ' + days + ' Day' + (days == 1 ? '' : 's')));
  return output.substr(2);
}
/**
 * @param {Date} check_in_date
 * @param {Number} rentPerMonth
 * @return {Number}
 */
function sMonthProratedCalc(check_in_date,rentPerMonth)
{
  rentPerMonth=parseFloat(rentPerMonth);
  var curr_date = 0;
  var curr_month =check_in_date.getMonth();
  curr_month++;
  var curr_year = check_in_date.getYear();
  var Checkindate = check_in_date.getDate();
  var LastMonth = new Date(curr_year,curr_month,curr_date);
  if(Checkindate >1)
  {
    var Tdays = LastMonth.getDate();
    var Proratedfull1 = (((Tdays - Checkindate) +1) * 12/365 * rentPerMonth);
    var proratedfixed1 = Proratedfull1.toFixed(2);
    var Proratedfull2= (((Tdays - Checkindate) +1)/Tdays) * rentPerMonth;
    var proratedfixed2 = Proratedfull2.toFixed(2);
    if(parseFloat(proratedfixed1) > parseFloat(proratedfixed2)) 
    {
      return proratedfixed1; // prorated rent calculation
    }
    else
    {
      return proratedfixed2;
    }
  }
  else
  {
    return 0;
  }
}

/**
 * @param {Date} check_out_date
 * @param {Number} rentPerMonth
 * @return {Number}
 */
function eMonthProratedCalc(check_out_date,rentPerMonth)
{
  rentPerMonth=parseFloat(rentPerMonth);
  var curr_date = 0;
  var curr_month =check_out_date.getMonth();
  curr_month++;
  var curr_year = check_out_date.getYear();
  var Checkoutdate = check_out_date.getDate();
  var LastMonth = new Date(curr_year,curr_month,curr_date);
  if(Checkoutdate >1)
  {
    var Tdays = LastMonth.getDate();
    var Proratedfull1 = ((Checkoutdate -1) * 12/365 * rentPerMonth);
    var proratedfixed1 = Proratedfull1.toFixed(2);
    var Proratedfull2= ((Checkoutdate -1)/Tdays) * rentPerMonth;
    var proratedfixed2 = Proratedfull2.toFixed(2);
    if(parseFloat(proratedfixed1) > parseFloat(proratedfixed2)) 
    {
      return proratedfixed1; // prorated rent calculation
    }
    else
    {
      return proratedfixed2;
    }
  }
  else
  {
    return 0;
  }
}
/**
 * @param {Date} check_in_date
 * @param {Date} check_out_date
 * @param {Number} rentPerMonth
 * @return {Number}
 */
function wMonthProratedCalc(check_in_date,check_out_date,rentPerMonth)
{
  rentPerMonth=parseFloat(rentPerMonth);
  var curr_date = 0;
  var curr_month =check_out_date.getMonth();
  curr_month++;
  var curr_year = check_out_date.getYear();
  var Checkindate = check_in_date.getDate();
  var Checkoutdate = check_out_date.getDate();
  var LastMonth = new Date(curr_year,curr_month,curr_date);
  var Tdays = LastMonth.getDate();
  var Proratedfull1 = ((Checkoutdate-Checkindate) * 12/365 * rentPerMonth);
  var proratedfixed1 = Proratedfull1.toFixed(2);
  var Proratedfull2= ((Checkoutdate-Checkindate)/Tdays) * rentPerMonth;
  var proratedfixed2 = Proratedfull2.toFixed(2);
  if(parseFloat(proratedfixed1) > parseFloat(proratedfixed2)) 
  {
    return proratedfixed1; // prorated rent calculation
  }
  else
  {
    return proratedfixed2;
  }
}
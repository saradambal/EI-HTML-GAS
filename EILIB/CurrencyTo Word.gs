/**
* @param {String} currencyInString
* @return {String}
*/
function currencyToWord(currencyInString){
  var array=currencyInString.split('.');
  var dollar = converter(array[0]);
  var cent = converter(array[1]); 
  if(dollar==''&&cent==''){
    return ('0');
  }
  else if(dollar==''&&cent!=''){
    if(array[1]=='01')
      return (cent+' Cent');
    else
      return (cent+' Cents');
  }
  else if(dollar!=''&&cent==''){
    if(array[0]=='1')
      return (dollar+' Dollar');
    else
      return (dollar+' Dollars');
  }
  else if(dollar!=''&&cent!=''){
    if(array[0]=='1'&&array[1]=='01'){
      return (dollar+' Dollar and '+cent+' Cent');
    }
    else if(array[0]=='1'&&array[1]!='01'){
      return (dollar+' Dollar and '+cent+' Cents');
    }
    else if(array[0]!='1'&&array[1]=='01'){
      return (dollar+' Dollars and '+cent+' Cent');
    }
    else if(array[0]!='1'&&array[1]!='01'){
      return (dollar+' Dollars and '+cent+' Cents');
    }
  }
}

// American Numbering System
//var th = ['','Thousand','Million', 'Billion','Trillion'];
// uncomment this line for English Number System
var th = ['','Thousand','Million', 'Milliard','Billion'];

var dg = ['Zero','One','Two','Three','Four', 'Five','Six','Seven','Eight','Nine']; 
var tn = ['Ten','Eleven','Twelve','Thirteen', 'Fourteen','Fifteen','Sixteen', 'Seventeen','Eighteen','Nineteen']; 
var tw = ['Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety']; 
/**
* @param {Number} s
* @return {String}
*/
function converter(s){
  s = s.toString(); s = s.replace(/[\, ]/g,''); 
  if (s != parseFloat(s)) 
  return 'not a number'; 
  var x = s.indexOf('.'); 
  if (x == -1)
    x = s.length; 
  if (x > 15) 
    return 'too big'; 
  var n = s.split(''); 
  var str = ''; 
  var sk = 0; 
  for (var i=0; i < x; i++) {
    if ((x-i)%3==2) {
      if (n[i] == '1') {
        str += tn[Number(n[i+1])] + ' '; 
        i++; 
        sk=1;
      } 
      else if (n[i]!=0) {
        str += tw[n[i]-2] + ' ';sk=1;
      }
    } 
    else if (n[i]!=0) {
      str += dg[n[i]] +' '; 
      if ((x-i)%3==0) 
        str += 'Hundred ';
      sk=1;
    } 
    if ((x-i)%3==1) {
      if (sk) str += th[(x-i-1)/3] + ' ';
      sk=0;
    }
  } 
  if (x != s.length) {
    var y = s.length; 
    str += 'point '; 
    for (var i=x+1; i<y; i++) 
      str += dg[n[i]] +' ';
  } 
  return str.replace(/\s+/g,' ');
}
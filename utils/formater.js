export const fixNumberTwo = (number)=>{
    const f_x = parseFloat(number);
    if (isNaN(f_x)) {
        return 0.00;
    }
      let s_x = number.toString();
      let pos_decimal = s_x.indexOf('.');
  
      if(pos_decimal < 0){
        pos_decimal = s_x.length;
        s_x += '.';
  
      }
        while (s_x.length <= pos_decimal + 2) {
          s_x += '0';
        }
    let str = s_x.substring(0,s_x.indexOf(".") + 3);
    return  str
  }
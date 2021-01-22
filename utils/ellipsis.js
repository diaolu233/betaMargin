function ellipsis(str) {
// 中间显示省略号，截取显示括号内容
var last = 0;
var all = str.length;
var fisrt = str.substring(0,3);
var newstr = ""
// 没有中文括号（
if (str.lastIndexOf('（') == -1) {
    // 也没有英文括号(
    if (str.lastIndexOf('(') == -1) {
        last = all - 2;
    }else{
        // 有英文括号(，就从英文括号开始截取
        last = str.lastIndexOf('(');
    }
}else{
    last = str.lastIndexOf('（');
}
// 如果长度大于13个字符才显示省略号
if (all > 13) {
    // $(".text").text(fisrt " ... " str.substring(last,all));
    newstr = fisrt + " ... " + str.substring(last,all)
}else{
    newstr = str
}
return newstr
}
export default ellipsis
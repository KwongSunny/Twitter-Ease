
//takes in a hex code as string, ex: #01A327
//returns a JSON of separated red, green, blue values in base 10
function hexStringToJson(hexString){
    let string = hexString.substring(1);
    let r_val = parseInt(string.substring(0,2), 16);
    let g_val = parseInt(string.substring(2,4), 16);
    let b_val = parseInt(string.substring(4,6), 16);

    return {
        red: r_val,
        green: g_val,
        blue: b_val
    };
}
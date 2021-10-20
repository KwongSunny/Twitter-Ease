
//takes in a hex code as string, ex: #01A327
//returns a JSON of separated red, green, blue values in base 10
function hexStringToJson(hexString){
    let string = hexString.substring(1);
    
    let r_val = null;
    let g_val = null;
    let b_val = null;

    return {
        red: r_val,
        green: g_val,
        blue: b_val
    };
}
console.log(hexStringToJson("#012345"));
// function highlightButton(element){
//     let isHover = (e) => e.parentElement.querySelector(':hover') === e;
//     document.addEventListener('mousemove', function checkHover() {
//         const hovered = isHover(element);
//         if (hovered !== checkHover.hovered) {
//             console.log(hovered ? 'hovered' : 'not hovered');
//             checkHover.hovered = hovered;
//         }
//     })

// }
// //export default highlightButton;

//checks the string password for a capital letter and a symbol
//returns a boolean
function checkValidPassword(password){
    let re;
    if(password.length == 0){
        console.log("Password cannot be empty");
        return false;
    }
    else if(password.length < 8){
        console.log("Password must contain at least 8 characters");
        return false;
    }
    re = /[0-9]/;
    if(!re.test(password)){
        console.log("Password must contain at least 1 number from (0-9)");
        return false;
    }
    re = /[a-z]/;
    if(!re.test(password)){
        console.log("Password must contain at least 1 lower case letter from (a-z)");
        return false;
    }
    re = /[A-Z]/;
    if(!re.test(password)){
        console.log("Password must contain at least 1 upper case letter from (A-Z)");
        return false;
    }
    re = /[!@#$%^&*]/;
    if(!re.test(password)){
        console.log("Password must contain at least 1 special character from (!@#$%^&*)");
        return false;
    }
    console.log("You have entered a valid password");
        return true;

    //return password === /^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{8,}$/; // using regex to check if theres at least one upper case letter, symbol, and number
}


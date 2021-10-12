function highlightButton(element){
    let isHover = (e) => e.parentElement.querySelector(':hover') === e;
    document.addEventListener('mousemove', function checkHover() {
        const hovered = isHover(element);
        if (hovered !== checkHover.hovered) {
            console.log(hovered ? 'hovered' : 'not hovered');
            checkHover.hovered = hovered;
        }
    })

}
export default highlightButton;

//checks the string password for a capital letter and a symbol
//returns a boolean
function checkValidPassword(password){
    
}
let nextButton = document.querySelector('a.nextBtn');
let answerBox = document.querySelector('textarea');

function linkChange() {
    if(!sessionStorage.getItem("demo5Link")) {
        return "";
    }
    else {
        return (sessionStorage.getItem("demo5Link"));
    }
}

function checkInput() {
    if (answerBox.value.length >= 1) {
        sessionStorage.setItem("demo5Link", "./demo6");
        sessionStorage.setItem("demo5", answerBox.value);
        sessionStorage.setItem("scorePoint", 10);
    }
} 
    
answerBox.addEventListener("keyup", checkInput);


// Listen for changes in the text field
answerBox.addEventListener("change", function() {
    // And save the results into the session storage object
    sessionStorage.setItem("demo5", answerBox.value);
});

answerBox.innerHTML = sessionStorage.getItem("demo5");


let nextButton = document.querySelector('a.nextBtn');
let answerBox = document.querySelector('textarea');

function linkChange() {
    if(!sessionStorage.getItem("demo8Link")) {
        return "";
    }
    else {
        return (sessionStorage.getItem("demo8Link"));
    }
}

function checkInput() {
    if (answerBox.value.length >= 1) {
        sessionStorage.setItem("demo8Link", "./demo9");
        sessionStorage.setItem("demo8", answerBox.value);
        sessionStorage.setItem("scorePoint", 20);
    } 
}
answerBox.addEventListener("keyup", checkInput);


// Listen for changes in the text field
answerBox.addEventListener("change", function() {
    // And save the results into the session storage object
    sessionStorage.setItem("demo8", answerBox.value);
});

answerBox.innerHTML = sessionStorage.getItem("demo8");


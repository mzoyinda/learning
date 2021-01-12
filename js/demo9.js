let nextButton = document.querySelector('a.nextBtn');
let answerBox = document.querySelector('textarea');

function linkChange() {
    if(!sessionStorage.getItem("demo9Link")) {
        return "";
    }
    else {
        return (sessionStorage.getItem("demo9Link"));
    }
}

function checkInput() {
    if (answerBox.value.length >= 1) {
        sessionStorage.setItem("demo9Link", "./demo10");
        sessionStorage.setItem("demo9", answerBox.value);
        sessionStorage.setItem("scorePoint", 25);
    }
}
answerBox.addEventListener("keyup", checkInput);


// Listen for changes in the text field
answerBox.addEventListener("change", function() {
    // And save the results into the session storage object
    sessionStorage.setItem("demo9", answerBox.value);
});

answerBox.innerHTML = sessionStorage.getItem("demo9");


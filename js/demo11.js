let nextButton = document.querySelector('a.nextBtn');
let answerBox = document.querySelector('textarea');

function linkChange() {
    if(!sessionStorage.getItem("demo11Link")) {
        return "";
    }
    else {
        return (sessionStorage.getItem("demo11Link"));
    }
}

function checkInput() {
    if (answerBox.value.length >= 1) {
        sessionStorage.setItem("demo11Link", "./demo12");
        sessionStorage.setItem("demo11", answerBox.value);
        sessionStorage.setItem("scorePoint", 30);
    }
}
answerBox.addEventListener("keyup", checkInput);


// Listen for changes in the text field
answerBox.addEventListener("change", function() {
    // And save the results into the session storage object
    sessionStorage.setItem("demo11", answerBox.value);
});

answerBox.innerHTML = sessionStorage.getItem("demo11");


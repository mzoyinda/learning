let nextButton = document.querySelector('a.nextBtn');
let answerBox = document.querySelector('textarea');

function linkChange() {
    if(!sessionStorage.getItem("demo13Link")) {
        return "";
    }
    else {
        return (sessionStorage.getItem("demo13Link"));
    }
}

function checkInput() {
    if (answerBox.value.length >= 1) {
        sessionStorage.setItem("demo13Link", "./demo14");
        sessionStorage.setItem("demo13", answerBox.value);
        sessionStorage.setItem("scorePoint", 40);
    }

}
answerBox.addEventListener("keyup", checkInput);


// Listen for changes in the text field
answerBox.addEventListener("change", function() {
    // And save the results into the session storage object
    sessionStorage.setItem("demo13", answerBox.value);
});

answerBox.innerHTML = sessionStorage.getItem("demo13");


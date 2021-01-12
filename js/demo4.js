let nextButton = document.querySelector('a.nextBtn');
let answerBox = document.querySelector('textarea');

function linkChange() {
    if(!sessionStorage.getItem("demo4Link")) {
        
        return "";
    }
    else {
        return (sessionStorage.getItem("demo4Link"));
    }
}

function checkInput() {
    if (answerBox.value.length >= 1) {
        sessionStorage.setItem("demo4Link", "./demo5");
        sessionStorage.setItem("demo4", answerBox.value);
        sessionStorage.setItem("scorePoint", +5);
    } else {
        sessionStorage.setItem("demo4Link", "");
        sessionStorage.setItem("scorePoint", 0);
    }
    
}

answerBox.addEventListener("keyup", checkInput);


// Listen for changes in the text field
answerBox.addEventListener("change", function() {
    // And save the results into the session storage object
    sessionStorage.setItem("demo4", answerBox.value);
});

answerBox.innerHTML = sessionStorage.getItem("demo4");


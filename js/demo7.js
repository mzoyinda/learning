let nextButton = document.querySelector('a.nextBtn');
let answerBox = document.querySelector('textarea');

function linkChange() {
    if(!sessionStorage.getItem("demo7Link")) {
        
        return "";
    }
    else {
     
        return (sessionStorage.getItem("demo7Link"));
    }
}

function checkInput() {
    if (answerBox.value.length >= 1) {
        sessionStorage.setItem("demo7Link", "./demo8");
        sessionStorage.setItem("demo7", answerBox.value);
        sessionStorage.setItem("scorePoint", 15);        
    }
}
answerBox.addEventListener("keyup", checkInput);


// Listen for changes in the text field
answerBox.addEventListener("change", function() {
    // And save the results into the session storage object
    sessionStorage.setItem("demo7", answerBox.value);
});

answerBox.innerHTML = sessionStorage.getItem("demo7");


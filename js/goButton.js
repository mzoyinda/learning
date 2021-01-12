let text = document.querySelector(".courseOfStudyText");
let button = document.querySelector(".formButton");


function textLength() {

    return(text.value);
}

// Redirect when an option is chosen and enter key or the submit button is clicked.
function searchBox() {
    if (textLength() === 'Pick One:' || textLength() === "") {    
        window.location.href = "/";
    } else {
        window.location.href = `/courseOfStudy?courseOfStudy=${text.value}`;
        
    }

}



function addTextAfterClick() {
    searchBox();
}

function addTextAfterEnter(event) {

    if (event.keyCode === 13 ) {
        searchBox();
    }

}

// Redirect automatically when an option is chosen.
function optionRedirect() {
    pickedCourse = text.value;
    // alert(pickedCourse);

    switch (pickedCourse) {
        case "Aerospace Engineering":
            window.location.href = `/courseOfStudy?courseOfStudy=${textLength()}`;
            break;
        case "Agricultural Engineering":
            window.location.href = `/courseOfStudy?courseOfStudy=${textLength()}`;
            break;
        case "Chemical Engineering":
            window.location.href = `/courseOfStudy?courseOfStudy=${textLength()}`;
            break;
        case "Civil Engineering":
            window.location.href = `/courseOfStudy?courseOfStudy=${textLength()}`;
            break;
        case "Computer Engineering":
            window.location.href = `/courseOfStudy?courseOfStudy=${textLength()}`;
            break;    
        case "Electrical and Electronics Engineering":
            window.location.href = `/courseOfStudy?courseOfStudy=${textLength()}`;
            break;
        case "Industrial Engineering":
            window.location.href = `/courseOfStudy?courseOfStudy=${textLength()}`;
            break;
        case "Materials Engineering":
            window.location.href = `/courseOfStudy?courseOfStudy=${textLength()}`;
            break;
        case "Mechanical Engineering":
            window.location.href = `/courseOfStudy?courseOfStudy=${textLength()}`;
            break;    
        case "Mining Engineering":
            window.location.href = `/courseOfStudy?courseOfStudy=${textLength()}`;
            break;      
        case "Nuclear Engineering":
            window.location.href = `/courseOfStudy?courseOfStudy=${textLength()}`;
            break;
        case "Petroleum and Gas Engineering":
            window.location.href = `/courseOfStudy?courseOfStudy=${textLength()}`;
            break; 
        case "Systems Engineering":
            window.location.href = `/courseOfStudy?courseOfStudy=${textLength()}`;
            break;
        default:
            window.location.href = '/';
            break;
    }
}

button.addEventListener("click", addTextAfterClick);
text.addEventListener("keypress", addTextAfterEnter);

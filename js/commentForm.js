let mailingList = document.querySelector('.mailingForm');
let btn = document.querySelector('.save');
let commentText = document.querySelector('commentText');

function showMail() {
    if (commentText != "") {
        mailingList.style.visibility = "visible";
    }

    btn.style.display = "none";
}

function showMailAfterEnter(event) {

    if (event.keyCode === 13 ) {
        showMail();
    }

}

btn.addEventListener("click", showMail);
commentText.addEventListener("keypress", showMailAfterEnter);


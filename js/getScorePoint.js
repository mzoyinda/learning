let score = document.querySelector('#score').querySelectorAll('p')[0];

function getScorePoint() {
    if (!sessionStorage.getItem("scorePoint")) {
        // score.innerHTML = "0 points";

        return(" Score: 0 points");
    }

    else {
        return(` Score: ${sessionStorage.getItem("scorePoint")} points`);
    }

}

score.innerHTML = getScorePoint();
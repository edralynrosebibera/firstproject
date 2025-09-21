const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const answer = document.getElementById("answer");
const question = document.getElementById("question");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");
const listCard = document.getElementsByClassName("card-list-container");

let editBool = false;

addQuestion.addEventListener("click", () => {
    container.classList.add("hide");
    question.value = "";
    answer.value = "";
    addQuestionCard.classList.remove("hide");
});

cardButton.addEventListener("click", () => {
    const tempQuestion = question.value.trim();
    const tempAnswer = answer.value.trim();

    if (!tempQuestion || !tempAnswer) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        viewlist(tempQuestion, tempAnswer);
        question.value = "";
        answer.value = "";
        container.classList.remove("hide");
        addQuestionCard.classList.add("hide");
    }
});

closeBtn.addEventListener("click", () => {
    addQuestionCard.classList.add("hide");
    container.classList.remove("hide");
});

function viewlist(qText, aText) {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `<p class="question-div">${qText}</p>`;

    const displayAnswer = document.createElement("p");
    displayAnswer.classList.add("answer-div", "hide");
    displayAnswer.innerText = aText;

    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "show-hide-btn");
    link.innerText = "Show/Hide";
    link.addEventListener("click", () => {
        displayAnswer.classList.toggle("hide");
    });

    div.appendChild(link);
    div.appendChild(displayAnswer);

    const buttonsCon = document.createElement("div");
    buttonsCon.classList.add("button-con");

    const editButton = document.createElement("button");
    editButton.setAttribute("class", "edit");
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editButton.addEventListener("click", () => {
        editBool = true;
        modifyElement(editButton, true);
        addQuestionCard.classList.remove("hide");
        container.classList.add("hide");
    });

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteButton.addEventListener("click", () => {
        div.remove();
    });

    buttonsCon.appendChild(editButton);
    buttonsCon.appendChild(deleteButton);
    div.appendChild(buttonsCon);

    listCard[0].appendChild(div);
}

function modifyElement(element, edit = false) {
    const parentDiv = element.closest(".card");
    const parentQuestion = parentDiv.querySelector(".question-div").innerText;
    const parentAnswer = parentDiv.querySelector(".answer-div").innerText;

    if (edit) {
        question.value = parentQuestion;
        answer.value = parentAnswer;
        disableButtons(true);
        parentDiv.remove(); 
    }
}

function disableButtons(value) {
    const editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((btn) => {
        btn.disabled = value;
    });
}

const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

let currentActiveCard = 0;
const cardsEl = [];
const cardsData = getCardsData();

function createCards() {
    cardsData.forEach((cardData, index) => {
        createCard(cardData, index)
    })
}

function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
        <div class="inner-card">
        <div class="inner-card-front">
            <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
            <p>${data.answer}</p>
        </div>
        </div>
    `;

    cardsEl.push(card);
    cardsContainer.appendChild(card);
    updateCurrentText();
}

function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();
checkNextButtonVisibility();
checkPrevButtonVisibility();

cardsContainer.addEventListener('click', (event) => {
    const card = event.target.parentNode.parentNode;
    toggleCardAnswer(card);
})

function toggleCardAnswer(card) {
    card.classList.toggle('show-answer');
}

nextBtn.addEventListener('click', () => {
    showNextCard();
    updateCurrentText();
})

function showNextCard() {
    cardsEl[currentActiveCard].className = 'card left';
    currentActiveCard++;
    checkNextButtonVisibility();
    if (prevBtn.style.display === 'none') {
        prevBtn.style.display = 'block';
    }
    cardsEl[currentActiveCard].className = 'card active';
}

function checkNextButtonVisibility() {
    if (currentActiveCard === cardsEl.length - 1) {
        nextBtn.style.display = 'none';
    }
}

prevBtn.addEventListener('click', () => {
    showPrevCard();
    updateCurrentText();
})

function showPrevCard() {
    cardsEl[currentActiveCard].className = 'card right';
    currentActiveCard--;
    checkPrevButtonVisibility();
    if (nextBtn.style.display === 'none') {
        nextBtn.style.display = 'block';
    }
    cardsEl[currentActiveCard].className = 'card active';
}

function checkPrevButtonVisibility() {
    if (currentActiveCard === 0) {
        prevBtn.style.display = 'none';
    }
}

showBtn.addEventListener('click', showAddContainer);

function showAddContainer() {
    addContainer.classList.add('show');
}

hideBtn.addEventListener('click', hideAddContainer);

function hideAddContainer() {
    addContainer.classList.remove('show');
}

addCardBtn.addEventListener('click', addNewCard);

function addNewCard() {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        const newCard = { question, answer };
        createCard(newCard);
        questionEl.value = '';
        answerEl.value = '';

        addCardBtn.classList.remove('show');
        cardsData.push(newCard);
        setCardsData(cardsData);
    }
}

clearBtn.addEventListener('click', clearCards);

function clearCards() {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
}

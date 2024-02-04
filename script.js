loadPage();

function loadPage() {
    const notes = getFromStorage();
    
    for (const note of notes)
        displayNote(note, getRandom());
}

function addNote() {

    const noteBox = {
        note: document.getElementById('note'),
        date: document.getElementById('date'),
        time: document.getElementById('time')
    }

    const noteVals = {
        noteVal: noteBox.note.value,
        dateVal: noteBox.date.value,
        timeVal: noteBox.time.value
    }

    if (!validate(noteVals)) return;

    displayNote(noteVals);

    const notes = getFromStorage();

    notes.push(noteVals);

    saveToStorage(notes);

    clearVal(noteBox);
}

function validate(noteVals) {

    const noteErr = document.getElementById('noteErr');
    const dateErr = document.getElementById('dateErr');
    const timeErr = document.getElementById('timeErr');

    noteErr.innerText = '';
    dateErr.innerText = '';
    timeErr.innerText = '';

    let isValid = true;

    if (noteVals.noteVal.length < 10) {
        noteErr.innerText = 'The task cannot be less than 10 characters';
        isValid = false;
    }
    else if (noteVals.noteVal.length > 200) {
        noteErr.innerText = 'The task cannot be more than 200 characters';
        isValid = false;
    }

    if (noteVals.dateVal === '') {
        dateErr.innerText = 'Date cannot be empty';
        isValid = false;
    }

    if (noteVals.timeVal === '') {
        timeErr.innerText = 'Time cannot be empty';
        isValid = false;
    }

    return isValid;
}

function getRandom() {
    return Math.floor(Math.random() * 5) + 1;
}

function displayNote(noteVals) {

    const random = getRandom();
    const notesBox = document.getElementById('notesBox');
    const div = document.createElement("div");

    div.innerHTML = `
        <i id="iconX" onclick = "removeItem(this)" class="fa-regular fa-circle-xmark"></i>
        <div id="noteTxt">${noteVals.noteVal}</div>
        <span id="dateTxt">${(new Date(noteVals.dateVal)).toLocaleDateString("he-IL")}</span>
        <span id="timeTxt">${noteVals.timeVal}</span>`;

    div.className = `noteBox back${random}`;
    notesBox.appendChild(div);
}

function getFromStorage() {
    return JSON.parse(localStorage.getItem('notes')) ?? [];
}

function saveToStorage(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function clearVal(noteBox) {
    noteBox.note.value = '';
    noteBox.date.value = '';
    noteBox.time.value = '';
    noteBox.note.focus();
}

function removeItem(i) {
    const index = Array.from(document.getElementById('notesBox').children).indexOf(i.parentElement);
    const notes = getFromStorage();

    notes.splice(index, 1);
    saveToStorage(notes);

    i.parentElement.remove();
}
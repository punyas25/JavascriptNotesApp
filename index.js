function saveNote() {
    let title = document.getElementById('title').value;
    let desc = document.getElementById('description').value;

    let note = {
        'title': title,
        'description': desc
    };
    console.log(note);
}

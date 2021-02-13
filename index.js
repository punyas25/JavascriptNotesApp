let notes = JSON.parse(localStorage.getItem('notes')) || [];
let count = (notes) ? notes.length : 0;

displayNote = (note, i) => {
    var noteElement = [
        '<div class="item-wrapper" id="item-wrapper" data-noteid="',
        i,
        '">',
        '<p class="item-title">',
        note.title,
        '</p><p class="item-description">',
        note.description,
        '</p><input type="button" id="edit-btn" value="Edit" onclick="editNote(this);"><input type="button" id="delete-btn" value="Delete" onclick="deleteNote(this);"></div>'
      ];
    return $(noteElement.join(''));
}

let list = $();
if (notes) {
    notes.forEach((note, i) => {
        list = list.add(displayNote(note, i))
    });
    $('.list-container').append(list);
}

saveNote = () => {
    let noteExists = false;
    let title = document.getElementById('title').value;
    let desc = document.getElementById('description').value;

    if (title && desc) {
        let newNote = {
            'title': title,
            'description': desc
        };
    
        notes.forEach(note => {
            if (newNote.title === note.title ) {
                noteExists = true;
            }
        })

        if (!noteExists) {
            notes.push(newNote);
            localStorage.setItem('notes', JSON.stringify(notes));
            $('.note-form').reset();
        } else {
            alert('Note already exists');
        }
    } else {
        alert('Empty fields. Please  enter data');
    }
}

editNote = (element) => {
    let $this = $(element);
    let noteid = $this.closest('div').data('noteid');
    let selectedNote = notes[noteid];
    $('#title').val(selectedNote.title);
    $('.description').html(selectedNote.description);
    $('.note-form').attr('noteid', noteid);
    $('.save-edit-btn').show();
}

deleteNote = (element) => {
    let $this = $(element);
    let noteid = $this.closest('div').data('noteid');
    notes.splice(noteid, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    location.reload();
}

saveEditedNote = (element) => {
    let $this = $(element);
    let noteid = $this.closest('form').attr('noteid');
    let editedNote = {
        'title': document.getElementById('title').value,
        'description': document.getElementById('description').value
    }
    notes[noteid] = editedNote;
    localStorage.setItem('notes', JSON.stringify(notes));
    location.reload();
}
const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");
const saveFile = document.getElementById('saveFile');

saveFile.addEventListener('click', function() {
	downloadFile();
});

function downloadFile(){
	//console.log('Save this file');
	const content = document.querySelector("textarea").value;
  const file = new File([content], "sample.txt", { type: 'text/plain' });

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const link = document.createElement('a');
    link.setAttribute('href', reader.result);
    link.setAttribute('download', file.name);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
  reader.readAsDataURL(file);

}

const saveNotes = () => {
	const notes = document.querySelectorAll(".note textarea");
	//console.log(notes);
	const data = [];
	notes.forEach(
		(note) => {
			data.push(note.value);
		}
	);
	//console.log(data);

	if (data.length === 0) {
		localStorage.removeItem("notes")
	} else {
		localStorage.setItem("notes", JSON.stringify(data))
	}
	localStorage.setItem("notes", JSON.stringify(data))
};
addBtn.addEventListener("click", function () {
    addNote();
});


const addNote = (text = " ") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="tool">
            <i class="save fas fa-save"></i>
            <i class="trash fas fa-trash-alt"></i>
        </div>
        <textarea>${text}</textarea>
    `;
    note.querySelector(".trash").addEventListener(
    	"click", function(){
    		note.remove();
    		saveNotes();
    	});

    note.querySelector(".save").addEventListener(
    	"click", function() {
    		saveNotes();
    	});
    note.querySelector("textarea").addEventListener(
    	"focusout",
    	function() {
    		saveNotes();
    	});

    main.appendChild(note);
    saveNotes();
};

(
	function() {
		const lsNotes = JSON.parse(localStorage.getItem("notes"));
		//console.log(lsnotes);
		if (lsNotes === null) {
			addNote();
		} else {
			lsNotes.forEach(
				(lsNote) => {
					addNote(lsNote)
				})
		}
	})();
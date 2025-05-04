var ul = document.querySelector('ul')

document.getElementById('add-btn').addEventListener('click',
    function (e) {
        e.preventDefault();
        console.log('hello');

        var addInput = document.getElementById('add-input');

        if (addInput.value !== '') {
            var li = document.createElement('li'),
                firstPar = document.createElement('p'),
                secondPar = document.createElement('p'),
                firstIcon = document.createElement('i'),
                emptySpace = document.createElement('i'),
                secondIcon = document.createElement('i'),
                input = document.createElement('input');

            firstIcon.className = "fa fa-check";

            secondIcon.className = "fa fa-times";
            input.className = "edit-note";
            input.setAttribute('type', 'text');

            firstPar.textContent = addInput.value;
            emptySpace.textContent = ' e '

            secondPar.appendChild(firstIcon);
            secondPar.appendChild(secondIcon);
            // li.appendChild(emptySpace);
            li.appendChild(firstPar);
            li.appendChild(secondPar);
            li.appendChild(input);
            ul.appendChild(li);

            addInput.value = '';
        }
    });







// EDITITH AND DELETEITH ITEMS
ul.addEventListener('click', function (e) {
    if (e.target.classList[1] === 'fa-check') {
        console.log('easter')

        var parentPar = e.target.parentNode;
        parentPar.style.display = 'none'

        var note = parentPar.previousElementSibling;
        var input = parentPar.nextElementSibling;

        input.style.display = 'block';
        input.value = note.textContent;

        input.addEventListener('keypress', function (e) {
            console.log('ICE CREAMS')
            if (e.keyCode === 13) {
                if (input.value !== '') {
                    note.textContent = input.value;
                    input.style.display = 'none';
                    parentPar.style.display = 'block';
                } else {
                    var li = input.parentNode;
                    li.parentNode.removeChild(li);
                }
            }
        });

    }
});

ul.addEventListener('click', function (e) {
    if (e.target.classList[1] === 'fa-times') {
        console.log('St. Patrick Day')
        var li = e.target.parentNode.parentNode;
        li.parentNode.removeChild(li);
    }
})
// keyCode = 13

var hideItem = document.getElementById('hide');
hideItem.addEventListener('click', function () {
    console.log('forest');

    var label = document.querySelector('label')


    if (hideItem.checked) {
        label.textContent = 'Unhide notes'
        ul.style.display = 'none';
    } else {
        label.textContent = 'Hide notes'
        ul.style.display = 'block';
    }

});


/// searchith filterith

var searchInput = document.querySelector('#search-note input');

searchInput.addEventListener('keyup', function (e) {
    var searchChar = e.target.value.toUpperCase();
    console.log(searchChar);

    var notes = ul.getElementsByTagName('li');

    Array.from(notes).forEach(function (note) {
        var parText = note.firstElementChild.textContent;

        if (parText.toUpperCase().indexOf(searchChar) !== -1) {
            note.style.display = 'block'
        } else {
            note.style.display = 'none'
        }
    });

})
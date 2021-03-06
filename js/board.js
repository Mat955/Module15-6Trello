var board = {
    name: 'Trello Kanban',
    addColumn: function (column) {
        this.element.appendChild(column.element);
        initSortable(column.id);
    },
    element: document.querySelector('#board .column-container')
};

function initSortable(id) {
    var el = document.getElementById(id);
    var sortable = Sortable.create(el, {
        group: 'kanban',
        sort: true
    });
}


document.querySelector('#board .create-column').addEventListener('click', function () {
    var columnName = prompt('Enter a column name');
    if (columnName === '') {
        return alert('This is not a valid column name. Try Again');
    } else if (columnName === null) {
        return;
    }

    var data = new FormData();
    data.append('name', columnName);

    fetch(baseUrl + '/column', {
            method: 'POST',
            headers: myHeaders,
            body: data,
        })
        .then(function (resp) {
            return resp.json();
        })
        .then(function (resp) {
            var column = new Column(resp.id, columnName);
            board.addColumn(column);
        });
});
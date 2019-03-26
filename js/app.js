function generateTemplate(name, data, basicElement) {
    var template = document.getElementById(name).innerHTML;
    var element = document.createElement(basicElement || 'div');

    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);

    return element;
}

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '3872',
    'X-Auth-Token': '079e524b2cabf044543427029ab99cb8'
};

fetch(baseUrl + '/board', {
        headers: myHeaders
    })
    .then(function (resp) {
        return resp.json();
    })
    .then(function (resp) {
        setupColumns(resp.columns);
    });

function setupColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
    cards.forEach(function (card) {
        var cardObject = new Card(card.id, card.name);
        col.addCard(cardObject);
    });
}
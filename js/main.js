'use strict';
// GENERATING RANDOM ID OF 10 CHARACTERS
document.addEventListener('DOMContentLoaded', function () {
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    // FUNCTION GENERATING TEMPLATE
    function generateTemplate(name, data, basicElement) {
        var template = document.getElementById(name).innerHTML;
        var element = document.createElement(basicElement || 'div');

        Mustache.parse(template);
        element.innerHTML = Mustache.render(template, data);

        return element;
    }

    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.element = generateTemplate('column-template', {
            name: this.name,
            id: this.id
        });

        // HOOK EVENT DELETING AND ADDING COLUMN
        this.element.querySelector('.add-card').addEventListener('click', function () {
            var cardName = prompt('Enter the name of the card');
            if (cardName === '') {
                alert('This is not a valid card name. Please add correct name');
            } else if (cardName === null) {
                return;
            } else {
                self.addCard(new Card(cardName));
            }
        });
        this.element.querySelector('.btn-delete').addEventListener('click', function () {
            self.removeColumn();
        });
    }

    Column.prototype = {
        addCard: function (card) {
            this.element.querySelector('ul').appendChild(card.element);
        },
        removeColumn: function () {
            this.element.parentNode.removeChild(this.element);
        }
    };

    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.element = generateTemplate('card-template', {
            description: this.description
        }, 'li');
        this.element.querySelector('.card').addEventListener('click', function (event) {
            event.stopPropagation();
            if (event.target.classList.contains('btn-delete')) {
                self.removeCard();
            }
        });
    }
    // MAKING PROTOTYPE CARDS AND HOOK EVENT
    Card.prototype = {
        removeCard: function () {
            this.element.parentNode.removeChild(this.element);
        }
    };

    // MAKING OBJECT BOARD
    var board = {
        name: 'Kanban Board',
        addColumn: function (column) {
            this.element.appendChild(column.element);
            initSortable(column.id);
        },
        element: document.querySelector('#board .column-container')
    };

    // FUNCTION OF CARRY CARDS
    function initSortable(id) {
        var el = document.getElementById(id);
        var sortable = Sortable.create(el, {
            group: 'kanban',
            sort: true
        });

        // PINNING NEW FUNCTION FOR NEW COLUMN
        document.querySelector('#board .create-column').addEventListener('click', function () {
            var name = prompt('Enter a column name');
            if (name === '') {
                alert('This is not a valid board name. Please enter a name.');
            } else if (name === null) {
                return;
            } else {
                var column = new Column(name);
                board.addColumn(column);
            }
        });
    }

    // CREATING COLUMNS
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // CREATING CARDS
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
});
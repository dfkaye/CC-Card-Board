var cards = [
    {
        "card": {
            "name": "Tasks",
            "role": "Student",
            "role": "Advisor",
            "golive": "1",
            "jiraNumber": "9330"
        }
    },
    {
        "card": {
            "name": "SIR",
            "role": "Student",
            "role":"Advisor",
            "golive": "3",
            "jiraNumber": "6561"
        }
    },
    {
        "card": {
            "name": "Aid Summary",
            "role": "Student",
            "golive": "4",
            "jiraNumber": ""
        }
    },
    {
        "card": {
            "name": "Enrollment",
            "role": "Student",
            "golive": "5",
            "jiraNumber": "12204"
        }
    },
    {
        "card": {
            "name": "Advisee Personal Summary",
            "role": "Advisor",
            "golive": "5",
            "jiraNumber": "12053"
        }
    },
    {
        "card": {
            "name": "GPA Calculator",
            "role": "Student",
            "golive": "6",
            "jiraNumber": ""
        }
    }
  ];

var $role = $('#role'),
    $golive = $('#golive'),
    $result = $('#result');

$role.change(function () {
    onChange();
});

$golive.change(function () {
    onChange();
});

function onChange() {
    var findedCards = findCards();
    showCards(findedCards);
}

function findCards() {
    return filter($role.find('option:selected').val(), $golive.find('option:selected').val());
}

function filter(role, golive) {
    var result = [];

    for (var i = 0; i < cards.length; i++) {
        var card = cards[i].card;
        if ((!role || card.role === role) && (!golive || card.golive === golive)) {
            result.push(card);
        }
    }

    return result;
}

function showCards(cards) {
    $result.empty();
    for (var i = 0; i < cards.length; i++) {
        $result.append($('<div class="golive' + cards[i].golive + '">' + cards[i].name + '<br>' + 'Go Live ' + cards[i].golive + '<br><br>' + '<a href="https://jira.berkeley.edu/browse/SISRP-' + cards[i].jiraNumber + '">' + cards[i].jiraNumber + '</a>' + '</div>'  ));
    }
}

onChange();
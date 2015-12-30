jQuery(function($){
  
  $.getJSON("./js/cards.json", function(data) {
    console.warn(this)
    data && data.length > 0 || (error([this.url, 'data was not loaded', data].join('::')));
    
    init(data);
  });
  
  function error(msg, data) {
    throw Error(msg, data);
  }
  
  function init(cards) {
    
    var $role = $('#role');
    var $golive = $('#golive');
    var $result = $('#result');

    $role.on('change', function (e) {
      console.log('change of role')
      console.log(e.target.selectedIndex);
      
      onChange();
    });

    $golive.on('change', function (e) {
      
      console.log('change of golive')
      console.warn(e.target.selectedIndex);   
      
      onChange();
    });

    function onChange() {
      var cards = findCards();
      
      showCards(cards);
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
    

    
    // this is clearing and rewriting cards in the DOM, which is rather noisy.
    // better to run a createCards function that writes them all once,
    // then use filter to select cards by attributes and show only those
    
    function showCards(cards) {
      
      $result.empty();
      
      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        
        $result.append($('<div class="golive golive' + card.golive + '">' + card.name + 
                         '<br>' + 'Go Live ' + card.golive + '<br><br>' + 
                         '<a href="https://jira.berkeley.edu/browse/SISRP-' + 
                         card.jiraNumber + '">' + card.jiraNumber + '</a>' + 
                         '</div>'));
      }
    }

    
    
    onChange();
    
  
    $('button[data-go-live]').on('click', function updateGolive(e) {
      
      var index = e.target.getAttribute('data-go-live');
      var goliveClass = '.golive';
      var updateClass = goliveClass + index;
      
      $(updateClass).removeClass('inactive future').addClass('active');

      $(goliveClass).not(updateClass).each(function(i, elm) {
        
        var $elm = $(elm);       
        $elm.removeClass('active').addClass('inactive');
        
        var n = ('' + elm.className.match(/golive[\d]+/)).split('golive')[1];
        if (n > index) {
          $elm.addClass('future');
        }
      });
    });
  }
  
});

$('input[name="dates"]').daterangepicker();

;(function(){

    
  
    function emit(target, name) {
      var event
      if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(name, true, true);
      } else {
        event = document.createEventObject();
        event.eventType = name;
      }
  
      event.eventName = name;
  
      if (document.createEvent) {
        target.dispatchEvent(event);
      } else {
        target.fireEvent("on" + event.eventType, event);
      }    
    }
  
    var outputsSelector = "input[type=number][source],select[source]";
    
    function onChange(e) {
      var outputs = document.querySelectorAll(outputsSelector)
      for (var index = 0; index < outputs.length; index++) {
        var item = outputs[index]
        var source = document.querySelector(item.getAttribute('source'));
        if (source) {
          if (item === e.target) {
            source.value = item.value
            emit(source, 'input')
            emit(source, 'change')
          }
  
          if (source === e.target) {
            item.value = source.value
          }
        }
      }
    }
    
    document.addEventListener('change', onChange)
    document.addEventListener('input', onChange)
  }());

          // Вибірка елемента select
          var select = document.getElementById("cities");

          // Список міст України (ваші дані або отримані з якогось джерела)
          var citiesList = [
            "Київ",
            "Харків",
            "Одеса",
            "Дніпро",
            "Донецьк",
            "Запоріжжя",
            "Львів",
            "Кривий Ріг",
            "Миколаїв",
            "Вінниця",
            "Херсон",
            "Полтава",
            "Чернігів",
            "Черкаси",
            "Житомир",
            "Ялта",
            "Одеса",
            "Трускавець",
            "Івано-Франківськ",
            "Яремче",
            "Судак",
            "Затока",
            "Коблеве",
            "Іллічівськ",
            "Скадовськ"
              // Додайте інші міста тут
          ];
  
          // Додавання опцій до випадаючого списку
          citiesList.forEach(function(city) {
              var option = document.createElement("option");
              option.text = city;
              option.value = city;
              select.add(option);
          });
          
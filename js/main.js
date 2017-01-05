
$(document).ready(function(){
  var $terminal = $("#terminal");

  var opening = "Wake up...",
      cmdNotFound = "Sorry, this command is not found. Don't worry, just try again.",
      about = "My name is Isa Liang, and I am studying Software Engineering at the University of Waterloo",
      list = "For a list of available commands, type 'help'",
      availableCmds = "Available commands: [about] [skills] [experience] [contact] [clear]";

  var history = [];

  function generateSkills(){
    var skills = $('');
  }

  function generateContacts(){

  }

  function generateExperience(){

  }

  function clearTerminal(){
    $(".terminal-output").remove();
  }

	var typeSpeedSlowInms = 75;
	var typeSpeedFastInms = 60;

	var autotype = function(out, text, ptr, interval) {
		if (ptr < text.length) {
			$(out).append(text[ptr++]);
      // wait for interval then execuate function
			setTimeout(function(){
        autotype(out, text, ptr, interval);
      }, interval);
		}
		return $(out);
	};

  function display(text, isAutoType, speed){
    var $out = $("<p class='terminal-output'></p>").text("> ").appendTo($terminal);

    if(isAutoType){
      autotype($out, text, 0, speed);
    }else{
      $out.append(text);
    }

    return $out;
  }

  function displayHTML(html){
    var $out = $("<p class='terminal-output'></p>").append(html).appendTo($terminal);
    return $out;
  }

  function handleInput(){
    var value = $("#terminal-prompt").val().toLowerCase();
    var output = '';

    switch (value) {
      case 'about':
        output = display(about, false, typeSpeedFastInms);
        break;
      case 'skills':
        var skillHTML = generateSkills();
        output = displayHTML(skillHTML);
        break;
      case 'experience':
        var expHTML = generateExperienceHTML();
        output = displayHTML(expHTML);
        break;
      case 'contact':

        break;
      case 'help':
        output = diaplay(listCommands, true, typeSpeedFastInms);
        break;
      case 'clear':
        clearTerminal();
        output = display(list, true, typeSpeedFastInms);
        break;
      default:

    }
  }

  function init(){
    setTimeout(function(){
      display(opening, true, typeSpeedFastInms);
    }, 200);

    setTimeout(function(){
      display(list, true, typeSpeedFastInms);
    }, 3500);

    setTimeout(function() {
			$("#terminal-prompt").html('&#9612;');
			$("#terminal-input").show();
			$("#terminal-prompt").focus();
		}, 6500);
  }

  $("body").on('click', function(){
    $("termianl-prompt").focus();
  });
  $('#term-prompt').on('click', function() {
		$('#term-prompt').focus();
	});


  init();
});

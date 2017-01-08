$(document).ready(function(){
  let $terminal = $("#terminal");

  let opening = "Wake up, Jarvis...",
      cmdNotFound = "Sorry, this command is not found. Don't worry, just try again.",
      about = "My name is Isa Liang, and I am studying Software Engineering at the University of Waterloo. I am absolutely passionate about coding and future technology.",
      list = "For a list of available commands, type 'help'",
      availableCmds = "Available commands: [about] [skills] [experience] [contact] [social] [clear]",
      email = "My email: isaliangyiyun@hotmail.com",
      skills = "Proficient in Java, JavaScript; Familiar with Scala, Python",
      shortBio = "You can view my resume";

  function generateSocialAccts(){
    let space = ', ';
    let output = $("<p id='social'></p>");
    let githubLink = $('<a>Github</a>').attr({
			'href': 'https://github.com/Yiyun-Liang',
			'target': '_blank'
		});

		let twitterLink = $('<a>Twitter</a>').attr({
			'href': 'https://twitter.com/yiyunliang',
			'target': '_blank'
		});

    let linkedInLink = $('<a>LinkedIn</a>').attr({
			'href': 'https://ca.linkedin.com/in/yiyunliang',
			'target': '_blank'
		});

    output.append(githubLink);
    output.append(space);
    output.append(twitterLink);
    output.append(space);
    output.append(linkedInLink);

    return output;
  }

  function clearTerminal(){
    $(".terminal-output").remove();
  }

	let typeSpeedSlowInms = 75;
	let typeSpeedFastInms = 60;

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

    switch (value) {
      case 'about':
        display(about, false, typeSpeedFastInms);
        break;
      case 'skills':
        display(skills, false, typeSpeedFastInms);
        break;
      case 'experience':
        display(shortBio, false, typeSpeedFastInms);
        break;
      case 'contact':
        display(email, true, typeSpeedFastInms);
        break;
      case 'social':
        var socialHTML = generateSocialAccts();
        displayHTML(socialHTML);
        break;
      case 'help':
        display(availableCmds, true, typeSpeedFastInms);
        break;
      case 'clear':
        clearTerminal();
        display(list, true, typeSpeedFastInms);
        break;
      case 'fuck':
        display('Bang ', true, typeSpeedFastInms);
        display('Bang ', true, typeSpeedFastInms);
        display('Bang ', true, typeSpeedFastInms);
        display('!!!', true, typeSpeedFastInms);

        setTimeout(function(){
          display(availableCmds, true, typeSpeedFastInms);
        }, 3000);
        break;
      default:
        display(cmdNotFound, true, typeSpeedFastInms);

        setTimeout(function(){
          display(availableCmds, true, typeSpeedFastInms);
        }, 4500);
    }
  }

  function init(){
    setTimeout(function(){
      display(opening, true, typeSpeedFastInms);
    }, 200);

    setTimeout(function(){
      display(list, true, typeSpeedFastInms);
    }, 2000);

    setTimeout(function() {
			$("#terminal-prompt").html('&#9612;');
			$("#terminal-input").show();
			$("#terminal-prompt").focus();
		}, 5000);
  }

  $("body").on('click', function(){
    $("termianl-prompt").focus();
  });
  $('#terminal-prompt').on('click', function() {
		$('#terminal-prompt').focus();
	});

  var history = [];
  var historyIndex = 0;
  var historyHighlighted;

  $('#terminal-prompt').on('keydown', function(e){
    var enterKey = 13;
    var arrowUpKey = 38;
    var arrowDownKey = 40;

    if(e.which == enterKey){
      if($('#terminal-prompt').val() != history[history.length-1]){
        // a new input from the user
        handleInput();
      }
      if($('#terminal-prompt').val() !== ""){
        history.push($('#terminal-prompt').val());
      }

      historyIndex++;
      $('#terminal-prompt').val("");
    }

    if(e.which == arrowUpKey){
      if(historyIndex > 0){
        historyIndex--;
      }

      historyHighlighted = history[historyIndex];
			$('#terminal-prompt').val(historyHighlighted);
    }

    if(e.which == arrowDownKey){
      if(historyIndex < history.length){
        historyIndex++;
      }

      historyHighlighted = history[historyIndex];
			$('#terminal-prompt').val(historyHighlighted);
    }
  });


  init();
});

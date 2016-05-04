/*
 * Written-by: John Mezzanote
 * translate.js
 * 12-3-2015
 */


$(function(){
	
	// set the translate settings to default values 
	$('#langFrom').val('en'); // default to english
	$('#choiceFrom').text('From ' + $('#langFrom option:selected').text());
	$('#langTo').val('es'); // default to spanish
	$('#choiceTo').text('To ' + $('#langTo option:selected').text());
	$('#translate').attr('value', 'How do you say it in ' + $('#langTo option:selected').text() + '?');
	
	function translate(){
		// grab the text from the messageToSend textarea               
		var message = $('#messageToSend').val().replace(/ /g, '+');
		var translateFrom = $('#langFrom').val();
		var translateTo = $('#langTo').val();
		var apikey = 'trnsl.1.1.20151204T025720Z.8fa3835dfba83dd4.71b336d4000b4414c0a154701fbaafb193f238bb'	//
			
		var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + apikey + 
			'&lang='+ translateFrom +'-' + translateTo +'&text=' + message + '&callback=?';
		
		$.getJSON(url)
			.done(function(data){
				$('#output').text('');
				console.log(url);
				$('#translatedMessage').text(data.text[0]);
			})
			.fail(function(data){
				console.log(data);
				$('#output').text('Error in translation.');
			
			});
	}
	
	// All the work is going to be done inside a a function that handles the translate button onclick event
	//$('#translate').click(function(){
	
	$('#translate').click(translate);
	$('#langTo').change(translate);
	$('#translateFrom').keydown(function(e){
		if(e.keyCode == 13){
			translate();
		}
	});
	
	// When the user changes the translate from selectbox, update their choice in the UI
	$('#langFrom').change(function(){
		
		var choiceFrom = $('#langFrom option:selected').text();
		
		// update the language selections in the UI
		$('#choiceFrom').text('From ' +  choiceFrom);
	});	
	
	$('#langTo').change(function(){
		
		var choiceTo = $('#langTo option:selected').text();
		
		// update the language selections in the UI
		$('#choiceTo').text('To ' + choiceTo);
		$('#translate').attr('value', 'How do you say it in ' + choiceTo + '?');
	});	
	
	$('#size').change(function(){
		var v = $('#size').val();
		$('#messageToSend, #translatedMessage').css('font-size', v + 'px');
		$('#size-display').html(v + 'px');
	
	});
	
	$('#clear').click(function(){
		$('#messageToSend').val(''); 
		$('#translatedMessage').html('');
	});
	
	
});	
	
	

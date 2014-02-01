$(function(){
	// Put your Voice RSS here
	var voicerssKey = 'ceb2be03f99a402eb1c1cd3bd6dd29eb';

	var endpointTTS = 'http://api.voicerss.org/?key='+voicerssKey+'&src={0}&hl={1}&f=24khz_16bit_stereo';
	var endpointTTT = 'http://mymemory.translated.net/api/get?q={0}&langpair={1}|{2}';
	var langs = [
		{code: 'en-US', name: 'English'},
		{code: 'fr-FR', name: 'French'},
		{code: 'de-DE', name: 'German'}, 
		{code: 'it-IT', name: 'Italian'}, 
		{code: 'pt-BR', name: 'Portuguese'}, 
		{code: 'es-ES', name: 'Spanish'}
	];

	for(var i = 0; i < langs.length; i++){
		$('#translate-from').append('<option value="{0}">{1}</option>'.format(langs[i].code, langs[i].name));
		$('#translate-to').append('<option value="{0}">{1}</option>'.format(langs[i].code, langs[i].name));
	}
	$('#translate-from').val('pt-BR');

	$('#btn-about-open').click(function(){
		$('#dlg-about').removeClass('hidden');
	});

	$('#btn-about-close').click(function(){
		$('#dlg-about').addClass('hidden');
	});

	$('#translate-form').submit(function(e){
		e.preventDefault();

		var textToTranslate = $('#text-to-translate').val();
		var langFrom = $('#translate-from').val();
		var langTo = $('#translate-to').val();
		var urlTTT = endpointTTT.format(textToTranslate, langFrom, langTo);

		if(langFrom == langTo){
			alert('Select two different languages');
			return false;
		} else if(!navigator.onLine){
			alert('You need to be connected to internet');
			return false;
		}
		
		$.get(urlTTT, function(response){
			var translatedText = response.responseData.translatedText;
			var lang = $('#translate-to').val();
			var urlTTS = endpointTTS.format(translatedText, lang);
			$('#audio').html('<audio src="{0}" autoplay><p>Error</p></audio>'.format(urlTTS));
		});
	});
});

String.prototype.format = function () {
	var args = arguments;
  	return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
    	if (m == "{{") return "{";
    	if (m == "}}") return "}";
    	return args[n];
  	});
};
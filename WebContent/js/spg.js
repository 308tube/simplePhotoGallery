/**
 * Simple Photo Gallery 
 * v1.0.0
 * July 3rd, 2014
 * 
 * Test URLs (base on Eclipse Static Web Project)
 * http://localhost:8080/simplePhotoGallery/?file=set1.array
 * http://localhost:8080/simplePhotoGallery/?file=set2.array
 */
$(document).ready(function(){

	var urlParam = getParameterByName("file")
		, ajaxFile = "files/" + urlParam
		, $ajaxResponse = $('#ajaxResponse')
		, $loadingText = $('#loadingText')
		, $linkResume = $('#linkResume')
		, $linkPause = $('#linkPause')
		, $body = $('body');

	//AJAX GET method
	$.get(ajaxFile, function(data) {
		$ajaxResponse.text('Photo set: ' + urlParam); //Show what photo set is loaded
		$body.backstretch( JSON.parse(data), {duration: 5000, fade: 750});
	})
	/*
	 * if the ajax request fails because the file does not exist or if the url 
	 * parameter does not exist; the code below will load in random images.
	 * It is possible to load duplicated images.
	 */
	.fail(function() {
		//you can change the alert message or remove it
		$ajaxResponse.text('No defined photo set, loading random');
		
		var imageArray = []
			, maxRange = 3	//number of images to rotate through
			, min = 1000	//starting point
			, max = 1004	//end point
			, i = 0;
		
		for(i; i<maxRange; i++) {
			imageArray.push("photos/pict-" + (Math.floor(Math.random()*(max-min+1))+min) + ".jpg");
		}
		$body.backstretch(imageArray, {duration: 5000, fade: 750});
	});

	$(window).on("backstretch.after", function (e, instance, index) {
		
		//you can change the text when image start displaying
		$loadingText.text("Done Loading");
		
		$linkResume.addClass("btn-success").removeClass("btn-default");
		$(window).off("backstretch.after");
	});

	$('#linkBack').click(function(e){
		e.preventDefault();
		$body.backstretch("prev");
	});
	$linkPause.click(function(e){
		e.preventDefault();
		$linkResume.addClass("btn-default").removeClass("btn-success");
		$linkPause.addClass("btn-success").removeClass("btn-default");
		$body.backstretch("pause");
	});
	$linkResume.click(function(e){
		e.preventDefault();
		$linkResume.addClass("btn-success").removeClass("btn-default");
		$linkPause.addClass("btn-default").removeClass("btn-success");
		$body.backstretch("resume");
	});
	$('#linkForward').click(function(e){
		e.preventDefault();
		$body.backstretch("next");
	});
	$loadingText.click(function(e){
		e.preventDefault();
	});
	$ajaxResponse.click(function(e){
		e.preventDefault();
	});
});

/**
 * used to grab url parameter
 * http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 * 
 * @param name
 * @returns
 */
function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
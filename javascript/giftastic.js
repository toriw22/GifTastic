var gifs = ["Cute", "Dog", "Hotdog", "Turtle", "Cat Fail"];

function generateButtons(){

	for (var j = 0; j < gifs.length; j++) { 
		var b = $("<button>");
		b.addClass("gif");
		b.attr("data-name", gifs[j]);
		b.text(gifs[j]);
		$("#buttonsDisplay").append(b);
	}
}

generateButtons();

$("#addGifButton").on("click", function(event) {
	event.preventDefault();
	$("#buttonsDisplay").empty();
	var gifResponse = $("#gInput").val().trim();
	var userInput = gifResponse.replace(/ /g, "+");
	gifs.push(userInput);
	console.log(gifs);
	generateButtons();
	// $("#gifsDisplay").push(gifs);
});

$(".gif").on("click", function(event) {

	$("#gifsDisplay").empty();
	var gifInput = $(this).data("name");

	var giphyURL = "http://api.giphy.com/v1/gifs/search?q=" + gifInput + "&limit=10&rating=pg-13&api_key=e09541ae28964b48a10187d2597e88bf"
	console.log(gifInput);
	$.ajax({
		url: giphyURL,
		method: "GET"
	}).done(function(response) {
		
		console.log(response);
		for (var i = 0; i < response.data.length; i++) {
			var gifDiv = $("<div class = 'gif'>");	
			var rating = response.data[i].rating;
			console.log(rating);
			var ratingView = $("<h2>").text("Rating: " + rating);
			gifDiv.append(ratingView);
			var gifURL = response.data[i].images.downsized_still.url;
			var image = $("<img>").attr("src", gifURL);
			gifDiv.append(image);
			image.attr("data-animate", gifURL);
			var gifPlay = response.data[i].images.downsized.url;
			image.attr("data-still", gifPlay);
			image.on("click", function() { 
				var state = $(this).attr("data-state");
				if (state === "still") {
					var animateURL=$(this).attr("data-animate")
					$(this).attr("src", animateURL);
					$(this).attr("data-state", "animate");
				 } 
				else {
					var stillURL=$(this).attr("data-still")
					$(this).attr("src", stillURL);
					$(this).attr("data-state", "still");
				 }
			});
			$("#gifsDisplay").append(gifDiv);
		}
	});


	
});




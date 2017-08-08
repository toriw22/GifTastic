var gifs = ["Cute", "Dog", "Hotdog", "Turtle", "Cat Fail"];

function displayGifs() { 
	var gifInput = $(this).attr("gifName")

	var giphyURL = "http://api.giphy.com/v1/gifs/search?q=" + gifInput + "&limit=10&rating=pg-13&api_key=e09541ae28964b48a10187d2597e88bf"

	$.ajax({
		url: giphyURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		var gifDIv = $("<div class='gif'>");
		var rating = response.rating;
		var ratingDisplay = $("<h2>").text("Rating: " + rating);
		gifDiv.append(ratingDisplay);
		var gifURL = response.url;
		var image = $("<img>").attr("src", response.data[0].images.downsized_small.original_still.url);
		gifDiv.append(image);

		$("#gifsDisplay").append(gifDiv);

	});

}

function generateButtons(){
	for (var i = 0; i < gifs.length; i++) { 
		var b = $("<button>");
		b.addClass("gif");
		b.attr("gifName", gifs[i]);
		b.text(gifs[i]);
		$("#gifsDisplay").append(b);
	}
}

$("#buttonsDisplay").on("click", function(event) {
	event.preventDefault();
	var gifInput = $("#gifInput").val().trim();
		userInput = userInput.replace(/ /g, "+");
	gifs.push(gifInput);
});

generateButtons();
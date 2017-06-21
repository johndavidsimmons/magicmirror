var quotes;

 function getRandomArbitrary(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
 }


stoic();
var stoicInterval = window.setInterval(stoic, 43200000);

function stoic() {
	$.get("quotes_good.txt", function(data) {
	     quotes = data.split('\n');

	     random_quote = quotes[getRandomArbitrary(0, quotes.length)]

	     document.getElementById("stoic").innerHTML = random_quote;
	 });
}
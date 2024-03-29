var x = document.getElementById("demo");
var user_location='';
var findResult;
navigator.geolocation = 1;
navigator.geolocation.getCurrentPosition(getMyPosition);


$("document").ready(function(){
	let myCoordinate = `<div class="contact-form">
							<h1>Dining Spot</h1>
							<p>Location:
								<select id="myPlace">
									<option value="0">Places Near Me</option>
									<option value="-35.279790,149.133674">Canberra Centre</option>
									<option value="-35.250421,149.136690">Dickson</option>
									<option value="-35.238516,149.065203">Belconnen</option>
									<option value="-35.346010,149.085275">Woden</option>
									<option value="-35.4132462,149.0750259">Tuggeranong</option>
								</select>
								Radius:
								<select id = "myRadius">
									<option value="&radius=1000">1000m</option>
									<option value="&radius=2000">2000m</option>
									<option value="&radius=3000">3000m</option>
									<option value="&radius=4000">4000m</option>
								</select></p>
								<p>Cuisine:
								<select id = "myCuisine">
									<option value=""></option>
									<option value="&keyword=Korean">Korean</option>
									<option value="&keyword=Vietnamese">Vietnamese</option>
									<option value="&keyword=Italian">Italian</option>
									<option value="&keyword=Spanish">Spanish</option>
									<option value="&keyword=Australian">Australian</option>
									<option value="&keyword=Mexican">Mexican</option>  
								</select>
							</p>
							<button id="btn_Find" onclick="find_place()">Find </button>
							<div id="showResult"> 		
							</div>	
						</div>`;					
	$('#article').append(myCoordinate);	
});


function getMyPosition(position){
	let myposition = position.coords.latitude + ',' + position.coords.longitude;
	console.log("myposition is :" + myposition);
	user_location = myposition;
	console.log("user_location is :" + user_location);
	//return user_location;
}

function find_place(){
	let myPlace = document.getElementById("myPlace").value;
	let myRadius = document.getElementById("myRadius").value;
	let myCuisine = document.getElementById("myCuisine").value;	
	var data = {};
	
	//reset result list
	$("#showResult").html("");
	if (myPlace == 0 ){	
		myPlace = user_location;
	}	
	data.location = "&location=" + myPlace;
	data.keyword = myCuisine;	
	data.radius = myRadius;
	$.ajax({
		type: 'POST',
		data: JSON.stringify(data), //input data to be sent to the server
		contentType: 'application/json',
		url: '/findlocation',                        
		success: function(res) {	
			console.log('success');			
			findResult = JSON.parse(res);			
			console.log(findResult);	
			if (findResult.results.length === 0) {
				$('<h3/>')
				.append("Sorry but please try again with larger radius")
				.appendTo('#showResult');						
			}
			else
			{		
				$('<h4/>')
				.append("Search result:")
				.appendTo('#showResult');	
				
				for (let i = 0 ; i < findResult.results.length ; i++){				
					let id_name = "result"+i;
					let restaurant_Name = (i+1) + "." + findResult.results[i].name;
					// Create H3 heading with restaurant name
					$('<h4/>')
					.attr('id', 'id_name')
					.append(restaurant_Name)
					.css('cursor', 'pointer') //change cursor to pointer
					.click(function(){
						showPopup();
						showEmbedMap(findResult.results[i].place_id);
					})
					.appendTo('#showResult');				
				}		
			}
		}
	});		
}

function showEmbedMap(place_id){
	var Iframe_Open  = '<iframe class="embed-responsive-item" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBfEZy8-4n1bfWcL9haLlAjTioWvLZW_M4&q=place_id:';
	var Iframe_Close = '"></iframe><div></div>';
	var setIframe = $('<div/>')
					.addClass('embed-responsive embed-responsive-4by3')
					.append(Iframe_Open + place_id + Iframe_Close);
					
	$(".popup-inner-body").append(setIframe);
}

function showPopup(){ //create popup when click on the results list
	var pop_outer = $('<div/>') //create a div right under body
					.addClass('popup-outer-body')
					.attr("data-popup","popup-embed-map")
					.appendTo('body');
	var close_icon = '<div id="btn-close"><a class="popup-close" data-popup-close="popup-embed-map" href="#">x </div>';
	var pop_inner = $('<div/>')  //create inner popup
					.addClass("popup-inner-body")
					.append(close_icon)
					.appendTo($('.popup-outer-body'));
	$(".popup-outer-body").fadeIn("slow");  
	$('[data-popup-close]').on('click', function(e)  { //close function
		e.preventDefault();
		var targeted_popup_class = $(this).attr('data-popup-close');
		$('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);			
		var x = setTimeout(function(){
			$('.popup-outer-body').remove();
		},500);
		});
}


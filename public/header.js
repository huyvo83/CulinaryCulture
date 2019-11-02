$("document").ready(function(){
	let mainHeader = $('<header>')
					.attr('id','mainHeader');
	$('body').append(mainHeader);			 
	let myNav = `<img id="banner-image" src="images/banner.png" alt="Culinary Banner">
	            <nav id="main-nav" class="navbar navbar-expand-md navbar-light">
					<button type="button" class="navbar-toggler navbar-toggler-left" data-toggle="collapse" data-target="#navbarCollapse">
					<span class="navbar-toggler-icon"></span> 
					</button>
					<div class="collapse navbar-collapse" id="navbarCollapse">
						<div class="navbar-nav ml-auto text-center">
							<a href="index.html" class="nav-item nav-link">What\'s On</a>
							<a href="#" class="nav-item nav-link" onclick="openDining()">Dining Spot</a>
							<a href="#" class="nav-item nav-link" onclick="openEvents()">Special Events</a>
							<a href="#" class="nav-item nav-link" onclick="openContact()">Contact Us</a>
						</div>
						<div class="navbar-nav ml-auto">
							
						</div>
					</div>				
				</nav>`;
	$("#mainHeader").append(myNav);
	createSkeleton();		
});

function createSkeleton(){
		let myArticle =	`
						<div class="container">
							<div class="row">
								<div class="col-12 col-md-12" id ="article">
									
								
								</div>
							</div>
						</div>`;
	$('body').append(myArticle);
}

function openDining(){
	$('.container').remove();
	$('#activeScript').remove();	
	createSkeleton();	
	let loadScript = $('<script/>')
	                 .attr("id", "activeScript")
					 .attr('src','loadDining.js')	
					 .appendTo($("head"));
	
}

function openEvents(){
	$('.container').remove();
	$('#activeScript').remove();	
	createSkeleton();	
	let loadScript = $('<script/>')
	                 .attr("id", "activeScript")
					 .attr('src','loadEvents.js')	
					 .appendTo($("head"));
	
}

function openContact(){
	$('.container').remove();
	$('#activeScript').remove();
	createSkeleton();	
	let loadScript = $('<script/>')
	                 .attr("id", "activeScript")
					 .attr('src','loadContact.js')	
					 .appendTo($("head"));
	
}
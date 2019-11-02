$("document").ready(function(){
	loadContact();
});
		
function loadContact(){			
	let myContact = `<div class="contact-form">
						<h1>Contact Us</h1>
						<p id="welcomeLine">Feel free to give us a message if you've any query.</p>
						<form id="setForm">
							<div class="form-group">
								<label for="inputName">Contact Name</label>
								<input type="text" class="form-control" id="inputName" required>
							</div>      
							<div class="form-group">
								<label for="inputEmail">Email Address</label>
							<input type="email" class="form-control" id="inputEmail" required>
							</div>
							<div class="form-group">
								<label for="inputMessage">Message</label>
								<textarea class="form-control" id="inputMessage" rows="5" required></textarea>
							</div>
							<button type="button" onclick="submitContact()">Submit</button>
							<br>
						</form>
					</div>`;
	$('#article').append(myContact);	
}	
	
function submitContact(){
	console.log("clicked Submit-btn");
	let checkCount  = 0 ;
	let data = {};
	let endLoop  = false;
	data.inputName = $("#inputName")[0].value;
	data.inputEmail = $("#inputEmail")[0].value;
	data.inputMessage = $("#inputMessage")[0].value;
	Object.keys(data).forEach(function(key) {
		if(endLoop){
			return;
		}
		else{
			if(data[key].length === 0) {
				endLoop = true;
				alert("Please fill all the information in the form");			  
				return;
			}
			else{
			  checkCount = checkCount + 1;
			}
		}
	});
	if(checkCount == 3){	
		// validate email if all the information is filled
		checkCount = ValidateEmail(data.inputEmail, checkCount);
	}
	//if pass all error check then submit the form
	if(checkCount === 4){
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data), //input data to be sent to the server
			contentType: 'application/json',
			url: '/contactUs',                        
			success: function(res) {	
				$("#welcomeLine").html("<p> Thank you for contact us, we will get back to you as soon as possible.</p>");
				$("#setForm").html("");						
			},
			error: function(err){
				$("#setForm").html("");	
				console.log("Error when submit the form");
				console.log(err);
			}
		});				
	}

}
function ValidateEmail(email, checkCount)
{
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(email.match(mailformat))
	{
		
		console.log("email good");		
		checkCount = checkCount + 1;
		console.log("checkCount in email good is : " + checkCount);
		return checkCount;
	}
	else
	{
	alert("You have entered an invalid email address!");
	return false;
	}
}
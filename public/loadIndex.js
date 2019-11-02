$("document").ready(function(){
	loadHome();
});
		
function loadHome(){			
	$("#headlines").remove();
	$("#article").append('<div id="headlines">');							 	
	$.ajax({
		type: 'POST',
		//data: JSON.stringify(data), //input data to be sent to the server
		contentType: 'application/json',
		url: '/headlines',                        
		success: function(res) {	
			let newsContent = JSON.parse(res);
			console.log(newsContent);	
			var hover_block = $('<ul>')
								.addClass('hover_block')									
								.appendTo($('#headlines'));					
			for(let i = 0; i<newsContent.articles.length; i++){									
				let eachArticle = newsContent.articles[i];					
				let article_img = '<img src="' + eachArticle.urlToImage + '">';
				let article_title = '<p>' + eachArticle.title;								
				let article_link = '<a href="' + eachArticle.url + '" target="_blank">'+article_img + article_title ;
				let li = $('<li/>')
						 .append(article_link)							 
						 .appendTo($('.hover_block'));
						 
			}					
		}
	});
}	
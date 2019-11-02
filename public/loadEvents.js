var records = []; //global variable
$("document").ready(function(){
	loadEvents();
	$.get("loadImages.txt",function(data) { //get data from the manifest
		var lines = data.split(/[\r\n]+/g);
		for(let i =1; i<lines.length; i++) //create hash and add dish information 
		{
			records[i]={}; //create hash to store information
			let each_line = lines[i].split("\t");
			records[i]["location"] = each_line[0];
			records[i]["image_count"] = each_line[1];
			
		}
		for(let k = 1; k < records.length -3; k++){
			if(k < 3 ){
				loadFood(k,"showFood1");
			}		
			else{
				loadFood(k,"showFood2");
			}					
		}
		let load3dLib = $('<script/>')
					 .attr('src','https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/2/js-cloudimage-360-view.min.js')	
					 .appendTo('#article');
		
	});
});

function loadFood(item,place){  //create DIV and add 3deye library for 360 view
	let foodFrameId = "food_frame" + item;
	let food_area = $('<div/>')
					.addClass("col-6 col-md-6 cloudimage-360 food")
					.attr("ID",foodFrameId)
					.attr("data-folder", '/' + records[item]["location"]) 
					.attr("data-filename", item.toString().padStart(2, '0') + '-' + '{index}.jpg')
					.attr("data-amount", records[item]["image_count"])
					.appendTo($('#' + place));
} 
		
function loadEvents(){			
	let events = `	<div class="events" class="col-md-12">
						<h1>National Multicultural festival in Canberra</h1>
						<p>Proposed time: 21 Feb - 23 Feb 2020<br>
						   Proposed place: Various venues, Garema Place, Canberra </p>
						<p>Come along to experience yourself in Australian Capital Territory’s various cultures. This is absolutely free entry event for friends and families. You can explore diverse nations via a variety of musical and dance performances and try a various types of food from other culinary. 
						This is also a place to meet people representing different cultural backgrounds. <br>
						You all are invited to join us and share journey!
						Stay tuned as other activities will be posted soon!
						</p>
						<div id="showFood1" class="col-md-12">
						</div>
					</div>
					<div class="events" class="col-md-12">
						<h1>Night noodle market Canberra </h1>
						<p>Proposed time: 28 Feb – 15 Mar 2020<br>
						   Proposed place: : Reconciliation Place, Canberra
						</p>
						<p>This festival will be running throughout Enlighten festival. More than 20 eateries will dish up, where you can find authentic food from other cultures such as Asian, European, and Middle East etc. <br>
						The festival will not just provide delicious food; there will be live music and artistic lightning projections as well! <br>
						Cash or major cards are welcome so the queuing time will be less and you will more enjoy the night. 
						</p>
						<div id="showFood2" class="col-md-12">
						</div>						
					</div>
					`;
	$('#article').append(events);	
}	

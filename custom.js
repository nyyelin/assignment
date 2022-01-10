var card_array = [0,1,2,3,4,5,6,7,8,9];

var player = 4;


var choose_player = document.querySelector(".choose_player");

choose_player.addEventListener('change', function(){
    var player = choose_player.options[choose_player.selectedIndex].value;
    var html = "";
    var checked = "";
    html += `<div class="row mt-5">
				<div class="col-md-4 mx-auto">
					<div class="d-grid gap-2">
					  <button class="btn btn-block btn-success btn_start">Start</button>
					</div>
				</div>
			</div>`
    for (var i = 1; i <= player; i++) {
    	
    	if (i == 1) {
    		checked = "checked";
    	} else {
    		checked = "";
    	}

    	html += `<div class="row mt-5 ">
					<div class="col-md-4 offset-4">
					<h5 style = 'padding-left:32px'>Player ${i}</h5>
						<div class="input-group player_${i}">
							<input type="radio" name="radio" class="player_radio${i} radio mx-1 mt-2 form-check-input" ${checked} value="${i}">
							<input type="number" name="" class="player_num1 form-control mx-2" readonly>
							<input type="number" name="" class="player_num2 form-control mx-2" readonly>
							<input type="number" name="" class="player_num3 form-control mx-2" readonly>
							<button class="btn btn-primary mx-1 skip_btn${i}" data-id = "${i}">Skip</button>
							<button class="btn btn-warning mx-1 take_btn${i}" data-id = "${i}">Take</button>
						</div>
					</div>
					</div>`;
    }
    document.querySelector('.show_data').innerHTML = html;

    var start = document.querySelector('.show_data .btn_start');
	start.addEventListener('click',function(){
		choose_player.setAttribute("disabled", true);
		start.setAttribute('disabled',true);
		var value = "";
		var radio = "";
		for (var i = 1; i <= player; i++) {
			var radio_checked = document.querySelector('.player_'+i+' .player_radio'+i).checked;
			if(radio_checked == true){
				radio = document.querySelector('.player_'+i+' .player_radio'+i).value;
			}
		}
		shownumber(player,value,radio);
		// setInterval(shownumber,2000);
	})
});

function show(player,value,radio) {
	for (var i = radio; i <= player; i++) {
		if (i == radio){
			var random = card_array[Math.floor(Math.random() * card_array.length)]; 
			document.querySelector('.player_'+radio+' .player_num1').value = random;
			document.querySelector('.player_'+radio+' .player_num2').value = random;
			if (radio != 1){
				var num_radio = radio - 1;
				last_show(num_radio);
			}
		} else {
			setTimeout(function(y) {
				var random = card_array[Math.floor(Math.random() * card_array.length)]; 
				document.querySelector('.player_'+y+' .player_num1').value = random;
				document.querySelector('.player_'+y+' .player_num2').value = random;
				if (radio != 1){
					var num_radio = radio - 1;
					last_show(num_radio);
				}
			},i * 500, i);
		}
	}
}

function last_show(num_radio) {
	for (var i = 1; i <= num_radio; i++) {
		setTimeout(function(y) { 
			var random = card_array[Math.floor(Math.random() * card_array.length)]; 
			document.querySelector('.player_'+y+' .player_num1').value = random;
			document.querySelector('.player_'+y+' .player_num2').value = random;
		},i * 500, i);
	}
}
// show number process
function shownumber(player,value,radio){
	var checked_value = '';
	console.log(value);
	for (var i = 1; i <= player; i++) {

		if(value != "data"){

			show(player,value,radio);
		}

		var check_data = document.querySelector('.player_'+i+' .player_radio'+i).checked;
		var checked = document.querySelector('.player_'+i+' .player_radio'+i).value;
		if(check_data == true){

			checked_value = document.querySelector('.player_'+i+' .player_radio'+i).value;
			var num1 = document.querySelector('.player_'+i+' .player_num1').value;
			var num2 = document.querySelector('.player_'+i+' .player_num2').value;
			var number1 = parseInt(num1);
			var number2 = parseInt(num2);
			var subtotal = number1 + number2;
			var total = 0;
			
			// take process
			if(subtotal > 9){
				total = subtotal - card_array.length;
			}else {
				total = subtotal;
			}
			if (total > 3 && total < 8) {
				var btn_take = document.querySelector('.player_'+i+' .take_btn'+i);
				document.querySelector('.player_'+i+' .skip_btn'+i).removeAttribute("disabled");
				btn_take.addEventListener('click',function(){
					var random3 = card_array[Math.floor(Math.random() * card_array.length)];
					document.querySelector('.player_'+checked_value+' .player_num3').value = random3;
					var btn_value = document.querySelector('.player_'+checked_value+' .take_btn'+checked_value).getAttribute('data-id');
					var j = parseInt(btn_value) + 1;
					skipButton(btn_value,j,player);
				})
			}

			if(total < 4){
		   		var btn_take = document.querySelector('.player_'+i+' .take_btn'+i);
				document.querySelector('.player_'+i+' .skip_btn'+i).setAttribute("disabled", true);
				btn_take.addEventListener('click',function(){
					var random3 = card_array[Math.floor(Math.random() * card_array.length)];
					document.querySelector('.player_'+checked_value+' .player_num3').value = random3;
					var btn_value = document.querySelector('.player_'+checked_value+' .take_btn'+checked_value).getAttribute('data-id');
					var j = parseInt(btn_value) + 1;
					skipButton(btn_value,j,player);
				})
			}
	
		} else {

			document.querySelector('.player_'+i+' .player_radio'+i).setAttribute("disabled", true);
			document.querySelector('.player_'+i+' .skip_btn'+i).setAttribute("disabled", true);
			document.querySelector('.player_'+i+' .take_btn'+i).setAttribute("disabled", true);
		}

	}
	// skip button
	var btn_skip = document.querySelector('.player_'+checked_value+' .skip_btn'+checked_value);
	var btn_value = document.querySelector('.player_'+checked_value+' .skip_btn'+checked_value).getAttribute('data-id');

	btn_skip.addEventListener('click',function(){
		var j = parseInt(btn_value) + 1;
		skipButton(btn_value,j,player,radio);
	})

}

function skipButton(btn_value,j,player,radio) {
	var value = "data";

	document.querySelector('.player_'+btn_value+' .player_radio'+btn_value).setAttribute("disabled", true);
	document.querySelector('.player_'+btn_value+' .skip_btn'+btn_value).setAttribute("disabled", true);
	document.querySelector('.player_'+btn_value+' .take_btn'+btn_value).setAttribute("disabled", true);
	
	if (j > player) {
		var data = document.querySelector('.player_1 .player_num3').value;
		console.log(data);
		if (!data) {
			console.log('heelo');
			var k = 1;
			document.querySelector('.player_'+k+' .player_radio'+k).removeAttribute("disabled");
			document.querySelector('.player_'+k+' .skip_btn'+k).removeAttribute("disabled");
			document.querySelector('.player_'+k+' .take_btn'+k).removeAttribute("disabled");
			document.querySelector('.player_'+k+' .player_radio'+k).setAttribute("checked", true);
			shownumber(player,value,radio);
		} else {

			document.querySelector('.player_'+btn_value+' .player_radio'+btn_value).setAttribute("checked", true);
			document.querySelector('.player_'+btn_value+' .skip_btn'+btn_value).setAttribute("checked", true);
			document.querySelector('.player_'+btn_value+' .take_btn'+btn_value).setAttribute("checked", true);
			document.querySelector('.player_'+btn_value+' .player_radio'+btn_value).setAttribute("checked", true);
		}
	} else {
		document.querySelector('.player_'+j+' .player_radio'+j).removeAttribute("disabled");
		document.querySelector('.player_'+j+' .skip_btn'+j).removeAttribute("disabled");
		document.querySelector('.player_'+j+' .take_btn'+j).removeAttribute("disabled");
		document.querySelector('.player_'+j+' .player_radio'+j).setAttribute("checked", true);
		shownumber(player,value,radio);
	}
	

}

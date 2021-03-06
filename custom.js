var card_array = ["image/clubs_A.png", "image/clubs_2.png", "image/clubs_3.png", "image/clubs_4.png", "image/clubs_5.png", "image/clubs_6.png", "image/clubs_7.png", "image/clubs_8.png", "image/clubs_9.png", "image/clubs_10.png", "image/clubs_J.png", "image/clubs_Q.png", "image/clubs_K.png",
                  "image/diamond_A.png", "image/diamond_2.png", "image/diamond_3.png", "image/diamond_4.png", "image/diamond_5.png", "image/diamond_6.png", "image/diamond_7.png", "image/diamond_8.png", "image/diamond_9.png", "image/diamond_10.png", "image/diamond_J.png", "image/diamond_Q.png", "image/diamond_K.png",
                  "image/heart_A.png", "image/heart_2.png", "image/heart_3.png", "image/heart_4.png", "image/heart_5.png", "image/heart_6.png", "image/heart_7.png", "image/heart_8.png", "image/heart_9.png", "image/heart_10.png", "image/heart_J.png", "image/heart_Q.png", "image/heart_K.png",
                  "image/spade_A.png", "image/spade_2.png", "image/spade_3.png", "image/spade_4.png", "image/spade_5.png", "image/spade_6.png", "image/spade_7.png", "image/spade_8.png", "image/spade_9.png", "image/spade_10.png", "image/spade_j.png", "image/spade_Q.png", "image/spade_K.png"];
var card_exit_array = [];
var final_result = [];
var choose_player = document.querySelector(".choose_player");

// array filter for card not to be duplicate
function getArraysIntersection(a1, a2){
    return  a1.filter(function(n) { 
        return a2.indexOf(n) == -1;
    });
}
choose_player.addEventListener('change', function(){
    var player = choose_player.options[choose_player.selectedIndex].value;
    var html = "";
    var checked = "";
    html += `<div class="row mt-5">
                <div class="col-md-4 mx-auto">
                    <div class="row">
                        <div class = "col-md-12">
                            <div class="d-grid gap-2">
                                <button class="btn btn-block btn-success btn_start">Start</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5 ">
                <div class="col-md-8 offset-1 mx-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Player</th>
                                <th>Card One</th>
                                <th>Card Two</th>
                                <th>Card Three</th>
                                <th>Card Total</th>
                                <th>Card Action</th>
                            </tr>
                        </thead>
                        <tbody>`
    for (var i = 1; i <= player; i++) {
        if (i == 1) {
            checked = "checked";
        } else {
            checked = "";
        }
        html += `<tr class="player_${i}">
                    <td width="5%">
                        <input type="radio" name="radio" class="player_radio${i} radio mx-1 mt-2 form-check-input" ${checked} value="${i}">
                    </td>
                    <td width="20%">
                        <span>Player ${i}</span>
                    </td>
                    <td width="11%">
                        <input type="hidden" name="" class="player_num1 form-control mx-2" readonly>
                        <img src="image/back.png" alt="" class="img-fluid back_image_1">
                        <img src="" alt="" class="img-fluid show_image_1">
                    </td>
                    <td width="11%">
                        <input type="hidden" name="" class="player_num2 form-control mx-2" readonly>
                        <img src="image/back.png" alt="" class="img-fluid back_image_2">
                        <img src="" alt="" class="img-fluid show_image_2">
                    </td>
                    <td width="11%">
                        <input type="hidden" name="" class="player_num3 form-control mx-2" readonly>
                        <img src="image/back.png" alt="" class="img-fluid back_image_3">
                        <img src="" alt="" class="img-fluid show_image_3">
                    </td>
                    <td width="11%">
                        <input type="text" name="" class="total_card form-control mx-2" readonly>
                    </td>
                    <td width="40%">
                        <button class="btn btn-primary mx-1 skip_btn${i}" data-id = "${i}" disabled = "disabled">Skip</button>
                        <button class="btn btn-warning mx-1 take_btn${i}" data-id = "${i}" disabled = "disabled">Take</button>
                    </td>
                </tr>`;
    }
    html += `   </tbody>
            </table>
        </div>
    </div>`
    document.querySelector('.show_data').innerHTML = html;

    // start card process
    var start = document.querySelector('.show_data .btn_start');
    start.addEventListener('click', function(){
        choose_player.setAttribute("disabled", true);
        start.setAttribute('disabled',true);
        var value = "";
        var radio = "";
        for (var i = 1; i <= player; i++) {
            var radio_checked = document.querySelector('.player_' + i + ' .player_radio' + i).checked;
            if (radio_checked == true) {
                radio = document.querySelector('.player_' + i + ' .player_radio' + i).value;
            } else {
                document.querySelector('.player_' + i + ' .player_radio' + i).setAttribute("disabled", true);
            }
        }
        shownumber(player, value, radio);
    })
});

// show card 1
function show (player, value, radio) {
    for (var i = radio; i <= player; i++) {
        if (i == radio){
            var check_duplicate_card = getArraysIntersection(card_array, card_exit_array);
            var random = check_duplicate_card[Math.floor(Math.random() * check_duplicate_card.length)];
            var random_array = random.split('_');
            var random_number = random_array[1].split(".")
            document.querySelector('.player_' + radio + ' .player_num1').value = random_number[0];
            document.querySelector('.player_' + radio + ' .back_image_1').style.display = "none";
            document.querySelector('.player_' + radio + ' .show_image_1').setAttribute('src',random);
            card_exit_array.push(random);
            var plyaer1_last = document.querySelector('.player_' + player + ' .player_num1').value;
            if (radio != 1 && plyaer1_last){
                var num_radio = radio - 1;
                last_show1(num_radio, player, value, radio);
            }
        } else {
            setTimeout(function (y) {
                var check_duplicate_card = getArraysIntersection(card_array, card_exit_array);
                var random = check_duplicate_card[Math.floor(Math.random() * check_duplicate_card.length)];
                var random_array = random.split('_');
                var random_number = random_array[1].split(".")
                document.querySelector('.player_' + y + ' .player_num1').value = random_number[0];
                document.querySelector('.player_' + y + ' .back_image_1').style.display = "none";
                document.querySelector('.player_' + y + ' .show_image_1').setAttribute('src',random);
                card_exit_array.push(random);
                var plyaer1_last = document.querySelector('.player_' + player + ' .player_num1').value;
                if (radio != 1 && plyaer1_last){
                    var num_radio = radio - 1;
                    last_show1(num_radio, player, value, radio);
                } else {
                    if (plyaer1_last) {
                        shownumber2(player, value, radio)
                    }
                }
            }, i * 400, i);
        }
    }
}

// for card 2
function shownumber2 (player, value, radio) {
    var checked_value = '';
    for (var i = radio; i <= player; i++) {
        setTimeout(function (y) {
            var check_duplicate_card = getArraysIntersection(card_array, card_exit_array);
            var random = check_duplicate_card[Math.floor(Math.random() * check_duplicate_card.length)];
            var random_array = random.split('_');
            var random_number = random_array[1].split(".")
            document.querySelector('.player_' + y + ' .player_num2').value = random_number[0];
            document.querySelector('.player_' + y + ' .back_image_2').style.display = "none";
            document.querySelector('.player_' + y + ' .show_image_2').setAttribute('src',random);
            card_exit_array.push(random);
            var plyaer2_last = document.querySelector('.player_' + player + ' .player_num2').value;
            if (radio != 1 && plyaer2_last) {
                var num_radio = radio - 1;
                last_show2(num_radio, player, value, radio);
            } else {
                if (plyaer2_last) {
                    result(player);
                    button(checked_value, radio, value, player)
                }
            }
        }, i * 400, i);
    }
}
// show last card
function last_show1(num_radio, player, value, radio) {
    for (var i = 1; i <= num_radio; i++) {
        setTimeout(function(y) { 
            var check_duplicate_card = getArraysIntersection(card_array, card_exit_array);
            var random = check_duplicate_card[Math.floor(Math.random() * check_duplicate_card.length)];
            var random_array = random.split('_');
            var random_number = random_array[1].split(".")
            document.querySelector('.player_' + y + ' .player_num1').value = random_number[0];
            document.querySelector('.player_' + y + ' .back_image_1').style.display = "none";
            document.querySelector('.player_' + y + ' .show_image_1').setAttribute('src',random);
            card_exit_array.push(random);
            var plyaer1_last = document.querySelector('.player_' + num_radio + ' .player_num1').value;
            if (plyaer1_last) {
                shownumber2(player, value, radio);
            }
        },i * 400, i);
    }
}

function last_show2(num_radio, player, value, radio) {
    var checked_value = '';
    for (var i = 1; i <= num_radio; i++) {
        setTimeout(function(y) {
            var check_duplicate_card = getArraysIntersection(card_array, card_exit_array);
            var random = check_duplicate_card[Math.floor(Math.random() * check_duplicate_card.length)];
            var random_array = random.split('_');
            var random_number = random_array[1].split(".")
            document.querySelector('.player_' + y + ' .player_num2').value = random_number[0];
            document.querySelector('.player_' + y + ' .back_image_2').style.display = "none";
            document.querySelector('.player_' + y + ' .show_image_2').setAttribute('src',random);
            card_exit_array.push(random);
            var plyaer2_last = document.querySelector('.player_' + num_radio + ' .player_num2').value;
            if (plyaer2_last) {
                result(player);
                button(checked_value, radio, value, player)
            }
        }, i * 400, i);
    }
}

// for card 2 result
function result (player) {
    for (let i = 1; i <= player; i++) {
        var num1 = document.querySelector('.player_' + i + ' .player_num1').value;
        var num2 = document.querySelector('.player_' + i + ' .player_num2').value;
        console.log("no"+i,num1,num2)
        if (num1 == "A" || num2 == "A") {
            num1 = 1;
            num2 = 1;
        }
        if (num1 == "J" || num1 == "Q" || num1 == "K") {
            num1 = 10;
        }
        if (num2 == "J" || num2 == "Q" || num2 == "K") {
            num2= 10;
        }
        var number1 = parseInt(num1);
        var number2 = parseInt(num2);
        var subtotal = number1 + number2;
        var total = 0;

        // take process
        if (subtotal > 9) {
            total = subtotal % 10;
        } else {
            total = subtotal;
        }
        document.querySelector('.player_' + i + ' .total_card').value = total;
    }
}

// show card number process
function shownumber (player, value, radio){
    var checked_value = '';
    if (value != "data") {
        show(player, value, radio);
    }
    if (value == "data") {
        button(checked_value, radio, value, player);
    }
}

// skip and take process
function button (checked_value, radio, value, player) {
    var checked_value = 0;
    if (value == "reclickbtn") {
        for (var i = 1; i <= radio; i++) {
            var check_data = document.querySelector('.player_' + i + ' .player_radio' + i).checked;
            if (check_data == true) {
                checked_value = document.querySelector('.player_' + i + ' .player_radio' + i).value;
            }

        }
    } else {
        for (var i = radio; i <= player; i++) {
            var check_data = document.querySelector('.player_' + i + ' .player_radio' + i).checked;
            if (check_data == true) {
                checked_value = document.querySelector('.player_' + i + ' .player_radio' + i).value;
            }

        }
    }
    // take button
    var num1 = document.querySelector('.player_' + checked_value + ' .player_num1').value;
    var num2 = document.querySelector('.player_' + checked_value + ' .player_num2').value;
    if (num1 == "A" || num2 == "A") {
        num1 = 1;
        num2 = 1;
    }
    if (num1 == "J" || num1 == "Q" || num1 == "K") {
        num1 = 10;
    }
    if (num2 == "J" || num2 == "Q" || num2 == "K") {
        num2= 10;
    }
    var number1 = parseInt(num1);
    var number2 = parseInt(num2);
    var subtotal = number1 + number2;
    var total = 0;

    // take process
    if (subtotal > 9) {
        total = subtotal % 10;
    } else {
        total = subtotal;
    }
    var btn_take = document.querySelector('.player_' + checked_value + ' .take_btn' + checked_value);
    var btn_value = document.querySelector('.player_' + checked_value + ' .skip_btn' + checked_value).getAttribute('data-id');

    if (total > 3 && total < 8) {
        document.querySelector('.player_' + checked_value + ' .skip_btn'+ checked_value).removeAttribute("disabled");
        document.querySelector('.player_' + checked_value + ' .take_btn' + checked_value).removeAttribute("disabled");

        btn_take.addEventListener('click', function(){
            var random3 = card_array[Math.floor(Math.random() * card_array.length)];
            var random_array = random3.split('_');
            var random_number3 = random_array[1].split(".")
            document.querySelector('.player_' + checked_value + ' .player_num3').value = random_number3[0];
            document.querySelector('.player_' + checked_value + ' .back_image_3').style.display = "none";
            document.querySelector('.player_' + checked_value + ' .show_image_3').setAttribute('src',random3);
            var j = parseInt(btn_value) + 1;
            skipButton(btn_value, j, player, radio, total, random_number3);
        })
    }

    if (total < 4) {
        document.querySelector('.player_' + checked_value + ' .skip_btn' + checked_value).setAttribute("disabled", true);
        document.querySelector('.player_' + checked_value + ' .take_btn' + checked_value).removeAttribute("disabled");

        btn_take.addEventListener('click',function(){
            var random3 = card_array[Math.floor(Math.random() * card_array.length)];
            var random_array = random3.split('_');
            var random_number3 = random_array[1].split(".")
            document.querySelector('.player_' + checked_value + ' .player_num3').value = random_number3[0];
            document.querySelector('.player_' + checked_value + ' .back_image_3').style.display = "none";
            document.querySelector('.player_' + checked_value + ' .show_image_3').setAttribute('src',random3);
            var j = parseInt(btn_value) + 1;
            skipButton(btn_value, j, player, radio, total, random_number3);
        })
    }

    if (total > 7) {
        document.querySelector('.player_' + checked_value + ' .take_btn' + checked_value).setAttribute("disabled", true);
        document.querySelector('.player_' + checked_value + ' .skip_btn' + checked_value).removeAttribute("disabled");
    }
    // skip button
    var btn_skip = document.querySelector('.player_' + checked_value + ' .skip_btn' + checked_value);

    btn_skip.addEventListener('click',function(){
        var random_number3 = 0;
        var j = parseInt(btn_value) + 1;
        document.querySelector('.player_' + btn_value + ' .player_num3').value = 0;
        skipButton(btn_value, j, player, radio, total, random_number3);
    })
}

// button process and change player
function skipButton(btn_value, j, player, radio, total, random_number3) {
    card_total(total, random_number3, btn_value);
    var checked_value = "";
    if (final_result.length == player) {
        finalresult(player);
    }
    document.querySelector('.player_' + btn_value + ' .player_radio' + btn_value).setAttribute("disabled", true);
    document.querySelector('.player_' + btn_value + ' .skip_btn' + btn_value).setAttribute("disabled", true);
    document.querySelector('.player_' + btn_value + ' .take_btn' + btn_value).setAttribute("disabled", true);
    if (btn_value == player && radio != 1) {
        var data = document.querySelector('.player_'+ player +' .player_num3').value;
        if (data) {
            document.querySelector('.player_' + btn_value + ' .player_radio' + btn_value).removeAttribute("checked");
            document.querySelector('.player_1 .player_radio1').removeAttribute("disabled");
            document.querySelector('.player_1 .skip_btn1').removeAttribute("disabled");
            document.querySelector('.player_1 .take_btn1').removeAttribute("disabled");
            document.querySelector('.player_1 .player_radio1').setAttribute("checked", "checked");
            radio = radio - 1 ;
            value = "reclickbtn";
            button(checked_value, radio, value, player);
        }
    } else {
        if (radio != 1) {
            console.log(btn_value,radio);
            if (btn_value <= radio) {
                console.log('hello');
                var value = "data";
                document.querySelector('.player_' + j + ' .player_radio' + j).removeAttribute("disabled");
                document.querySelector('.player_' + j + ' .skip_btn' + j).removeAttribute("disabled");
                document.querySelector('.player_' + j + ' .take_btn' + j).removeAttribute("disabled");
                document.querySelector('.player_' + j + ' .player_radio' + j).setAttribute("checked", true);
                button(checked_value, radio, value, player);
            }
        } else {
            if (j <= player && final_result.length != player) {
                console.log("b");
                var value = "data";
                document.querySelector('.player_' + j + ' .player_radio' + j).removeAttribute("disabled");
                document.querySelector('.player_' + j + ' .skip_btn' + j).removeAttribute("disabled");
                document.querySelector('.player_' + j + ' .take_btn' + j).removeAttribute("disabled");
                document.querySelector('.player_' + j + ' .player_radio' + j).setAttribute("checked", true);
                button(checked_value, radio, value, player);
            } 
        }   
    }
}

// card total
function card_total (total, random_number3, btn_value) {
    if (random_number3[0] == "A" || random_number3[0] == "A") {
        random_number3 = 1;
    }
    if (random_number3[0] == "J" || random_number3[0] == "Q" || random_number3[0] == "K") {
        random_number3 = 10;
    }
    var num3 = parseInt(random_number3);
    var subtotal_card = total + num3;
    if (subtotal_card > 9) {
        var total_card = subtotal_card % 10;
    } else {
        var total_card = subtotal_card;
    }
    final_result.push(total_card);
    document.querySelector('.player_' + btn_value + ' .total_card').value = total_card;
}

// final result
function finalresult(player) {
    var max = Math.max(...final_result);
    var html = '';
    for (var i = 0; i < final_result.length; i++) {
       if (final_result[i] == max) {
        var j = i + 1;
        html += `<h3 class = 'mt-5'>The Winner is Player ${j} !!!</h3> `
       }
    }
    html += `<div class = "row col-md-2 mx-auto ">
                <div class="d-grid gap-2">
                    <button class="btn btn-block btn-danger btn_replay">Replay</button>
                </div>
            </div>`
    document.querySelector('.winner').innerHTML = html;

    // replay game process
    var replay = document.querySelector('.winner .btn_replay');
    replay.addEventListener('click', function() {
        choose_player.removeAttribute("disabled");
        document.querySelector('.show_data').innerHTML = "";
        document.querySelector('.winner').innerHTML = "";
    })

}
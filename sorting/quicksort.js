var html = '';
var number_array = [];
var btn_add = document.querySelector('.btn_add');
btn_add.addEventListener('click', function(argument) {
    var num_value = document.querySelector('.number').value;
    if (num_value) {
        for (var i = 1; i <= num_value; i++) {
                html += `<div class="col-md-4 mt-4">
                            <input type="number" name="" class="form-control mx-2 get_number${i}">
                         </div>`;
            }

            html += `<div class="col-md-4 mt-4">
                        <button class = 'btn btn-success btn_sort'>Sort</button>
                     </div>`;
    } else {
        html = "";
    }
    
    document.querySelector('.show_num').innerHTML = html;

    var btn_sort = document.querySelector('.show_num .btn_sort');
    btn_sort.addEventListener('click', function (argument) {
        for(var i = 1; i <= num_value; i++){
            var get_number = document.querySelector(".show_num .get_number" + i).value;
            if (get_number) {
                number_array.push(parseInt(get_number));
            }
        }
        // first call to quick sort
        var sortedArray = quickSort(number_array, 0, number_array.length - 1);
        document.write(sortedArray + "");
    })
})
// var items = [5,3,7,6,2,9];
function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right);
        }
    }
    return items;
}
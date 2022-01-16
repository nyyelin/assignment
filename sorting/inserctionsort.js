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
            number_array.push(parseInt(get_number));
        }
        var n = number_array.length;
        insertionSort(number_array, n);
        printArray(number_array, n);
    })
})

// Javascript program for insertion sort

// Function to sort an array using insertion sort
function insertionSort(arr, n)
{
    let i, key, j;
    for (i = 1; i < n; i++) 
    {
        key = arr[i];
        j = i - 1;

        /* Move elements of arr[0..i-1], that are
        greater than key, to one position ahead
        of their current position */
        while (j >= 0 && arr[j] > key) 
        {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

// A utility function to print an array of size n
function printArray(arr, n)
{
    let i;
    for (i = 0; i < n; i++)
        document.write(arr[i] + " ");
        document.write("<br>"); 
}

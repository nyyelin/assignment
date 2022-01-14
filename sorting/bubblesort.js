var number = document.querySelector('.number');
var html = '';
var number_array = [];
number.addEventListener('keyup', function(argument) {
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
            number_array.push(get_number);
        }
        var n = number_array.length;
        document.write("UnSorted array: \n");
        printArray(number_array, n);

        // sort
        bubbleSort(number_array,n);
        document.write("Sorted array: \n");
        printArray(number_array, n);
    })
})
function swap(arr, xp, yp)
{
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

// An optimized version of Bubble Sort
function bubbleSort( arr, n)
{
    var i, j;
    for (i = 0; i < n-1; i++)
    {
        // reverse array
        for (j = 0; j < n-i-1; j++)
        {
            if (arr[j] > arr[j+1])
            {
                swap(arr,j,j+1);
            }
        }
    }
}

/* Function to print an array */
function printArray(arr, length)
{
    var i;
    for (i=0; i < length; i++)
    document.write(arr[i]+ " ");
    document.write("\n");
}
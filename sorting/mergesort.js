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
        // var arr = [ 12, 11, 13, 5, 6, 7 ];
        var arr_size = number_array.length;

        document.write("Given array is <br>");
        printArray(number_array, arr_size);

        mergeSort(number_array, 0, arr_size - 1);

        document.write("<br>Sorted array is <br>");
        printArray(number_array, arr_size);
    })
})

// JavaScript program for Merge Sort
// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
function merge(arr, l, m, r)
{
    var n1 = m - l + 1;
    var n2 = r - m;
  
    // Create temp arrays
    var L = new Array(n1); 
    var R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
  
    // Merge the temp arrays back into arr[l..r]
  
    // Initial index of first subarray
    var i = 0;
  
    // Initial index of second subarray
    var j = 0;
  
    // Initial index of merged subarray
    var k = l;
  
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
  
    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
function mergeSort(arr,l, r){
    if(l >= r){
        return;//returns recursively
    }
    var m =l+ parseInt((r - l) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

// UTILITY FUNCTIONS
// Function to print an array
function printArray( A, size)
{
    for (var i = 0; i < size; i++)
       document.write(  A[i] + " ");
}
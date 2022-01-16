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
        var n = number_array.length;    
        stableSelectionSort(number_array, n);
        prletArray(number_array, n);
    })
})
// Javascript program for modifying Selection Sort
// so that it becomes stable.
 
function stableSelectionSort(a, n)
{
    // Iterate through array elements
    for (let i = 0; i < n - 1; i++)
    {

        // Loop invariant : Elements till
        // a[i - 1] are already sorted.

        // Find minimum element from
        // arr[i] to arr[n - 1].
        let min = i;
        for (let j = i + 1; j < n; j++){
            if (a[min] > a[j])
            min = j;
        }
        // Move minimum element at current i.
        let key = a[min];
        while (min > i)
        {
            a[min] = a[min - 1];
            min--;
        }
            
        a[i] = key;
    }
}

function prletArray(a, n)
{
    for (let i = 0; i < n; i++)
    document.write(a[i]+ " ");
        
    document.write("<br/>");
}
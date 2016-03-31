// add scripts


//The function below is janky as hell, need refactoring.
// $(document).on('ready', function() {
//   console.log('sanity check!');
//   console.log(sessionStorage.products);
//   $.ajax('/api/products').done(function(data){
//     console.log(data);
//   var seshCart = JSON.parse(sessionStorage.products);
//     var runTotal = 0;
//     seshCart.map(function(id){
//         $('#checkoutProducts').append(
//           '<h1>'+data[JSON.parse(id)-1].name+" "+data[JSON.parse(id)-1].price+'</h1>'
//         );
//         runTotal += parseFloat(data[JSON.parse(id)-1].price)
//     });
//     $("#total").html(runTotal);
//   });

// });

// var prodArr = [];

// $('.purchaseProduct').on('click', function(){
//   if (sessionStorage.products){
//     prodArr = JSON.parse(sessionStorage.products);
//   }
//   var product = $(this).attr('id');
//   prodArr.push(product);
//   console.log(prodArr);
//   var addVal = JSON.stringify(prodArr);
//   sessionStorage.setItem('products', addVal);
// });

// $.ajax('/api/products').done(function(data){
//   console.log(data);
//   var seshCart = JSON.parse(sessionStorage.products);
//   seshCart.map(function(id){
//     $('#cartTable').append('<tr><td>'+data[JSON.parse(id)-1].name+'</td><td>'+data[JSON.parse(id)-1].volume+'</td><td>'+'$'+data[JSON.parse(id)-1].price+'</td></tr>');

//   });
//   console.log(seshCart);
// });




require("./products_data.js");
var num_products = 5;
var prod_num = 0;
while(prod_num++ < num_products){
    
    if( (prod_num > num_products*.75) || (prod_num < num_products*.25) ) {
    console.log(`${eval(`name`+prod_num)} Is Sold Out!`);
    continue;
    }
    console.log(`prod_num`);
}
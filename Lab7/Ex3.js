require("./products_data.js");

for(var prod_num = 1; eval("typeof name" + prod_num) != 'undefined'; prod_num++) {
    console.log(`${prod_num}. ${eval('name' + prod_num)}`);
}
    
console.log("That's all we have!");
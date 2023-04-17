




//GLOBAL VARIABLES --------------------------------------------------------------------------------------------------------------------------

var onloadtable = (JSON.parse(localStorage.getItem('itemlist')));
var solditemsList = (JSON.parse(localStorage.getItem('solditems')));
var totalprofit = (JSON.parse(localStorage.getItem('totalprofit')));
var totalspent = (JSON.parse(localStorage.getItem('totalspent')));
var check_profitTable = 0 
//var id_num (declared later)

//-------------------------------------------------------------------------------------------------------------------------------------------





//ONLOAD ------------------------------------------------------------------------------------------------------------------------------------

setList();
setTableonload();
display_profits();


//-------------------------------------------------------------------------------------------------------------------------------------------





//SCRIPT ------------------------------------------------------------------------------------------------------------------------------------

function setList() { //detects if there in an Itemlist in localstorage, and if not sets a blank template.
    var itemlist = {name:[], price:[], quantity:[],date:[],total:[], arrayNum: 0}; 
    var sellitemlist = {name:[], price:[], quantity:[],date:[],total:[],profit:[], percentage_profit:[],arrayNum: 0}; 
    var total_profit = {display:'Total Profit: $', money:0}
    var total_spent = {display:'Total Invested: $', money:0}
    if (localStorage.length == 0) {
        localStorage.setItem('itemlist', JSON.stringify(itemlist));
        localStorage.setItem('solditems', JSON.stringify(sellitemlist));
        localStorage.setItem('totalprofit', JSON.stringify(total_profit));
        localStorage.setItem('totalspent', JSON.stringify(total_spent));

    }
}

function setTableonload(){ //displays the localstorage items on the table. WILL DISPLAY AN ERROR IF TABLE IS NOT PRESENT.

    var tablelength =  onloadtable.arrayNum;
    var soldtablelength = solditemsList.arrayNum;

    for (let i = 0; i < tablelength; i++) {
            
        let name1 = onloadtable.name[i]
        let price1 = onloadtable.price[i]
        let quantity1 = onloadtable.quantity[i]
        let date1 = onloadtable.date[i]

        diplay_table_setup(name1,price1,quantity1,date1,'extable',i);

    }

    for (let i = 0; i < soldtablelength; i++) {
            
        let name1 = solditemsList.name[i]
        let price1 = solditemsList.price[i]
        let quantity1 = solditemsList.quantity[i]
        let date1 = solditemsList.date[i]
        let profit1 = solditemsList.profit[i]
        let percentage_profit1 = solditemsList.percentage_profit[i];

        diplay_table_setup(name1,price1,quantity1,date1,'selltable',i,profit1, percentage_profit1);

    }
}

function addItem() { //Adds item in text input boxes to frontend graph, and to backend list.
        let name = document.getElementById("name").value;
        let price = document.getElementById("price").value;
        let quantity = document.getElementById("quantity").value;
        let dateex = document.getElementById("date").value;
        let date = compare_dates(dateex);

        var templist = (JSON.parse(localStorage.getItem('itemlist')));

        templist.name.push(name);
        templist.price.push(price);
        templist.quantity.push(quantity);
        templist.date.push(date);
        templist.total.push(Number(price) * Number(quantity));
        templist.arrayNum += 1

        display_table(name,price,quantity,date,'extable');

        localStorage.setItem('itemlist', JSON.stringify(templist));

        window.location.reload();
}

function display_table(item_name,item_price,item_quantity,item_date,table_id) { //Displays relevant Information to HTML table. Accepts parameters. (USED FOR ADDING NEW ITEMS)
    var tbody = document.getElementById(table_id);
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(item_name))
    tr.appendChild(td);
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(item_price))
    tr.appendChild(td);
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(item_quantity))
    tr.appendChild(td);
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(item_date))
    tr.appendChild(td);
    var td = document.createElement("td");
    td.appendChild(document.createTextNode((Math.round((Number(item_price) * Number(item_quantity)) * 100) / 100)));
    tr.appendChild(td);
    var td = document.createElement("td");
   
    
    let button = createButton(false);
    let tempcall = (JSON.parse(localStorage.getItem('itemlist')));
    let id_num = tempcall.arrayNum;
    tr.setAttribute('id', id_num);
   
    td.appendChild(button);
    tr.appendChild(td);
    tbody.appendChild(tr); 
}

function diplay_table_setup(item_name,item_price,item_quantity,item_date,table_id,arrayNumber,profit,percentage_profit) { //Displays relevant Information to HTML table. Accepts parameters. (USED FOR SETTING TABLE ON LOAD)
    var tbody = document.getElementById(table_id);
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(item_name))
    tr.appendChild(td);
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(item_price))
    tr.appendChild(td);
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(item_quantity))
    tr.appendChild(td);
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(item_date))
    tr.appendChild(td);
    var td = document.createElement("td");
    td.appendChild(document.createTextNode((Math.round((Number(item_price) * Number(item_quantity)) * 100) / 100)));
    tr.appendChild(td);
    if (table_id == 'selltable') {


        var td = document.createElement("td");
        td.appendChild(document.createTextNode(profit));
        tr.appendChild(td);

        var td = document.createElement("td");
        td.appendChild(document.createTextNode(percentage_profit));
        tr.appendChild(td);

        if (check_profitTable == 0) {
            var headers = document.getElementById('headers');
            var th = document.createElement('th');
            th.appendChild(document.createTextNode('Profit'));
            headers.appendChild(th)
            var th = document.createElement('th');
            th.appendChild(document.createTextNode('%'));
            headers.appendChild(th)

            check_profitTable = 1
        }
    }
   
    if (table_id == 'extable') {
        var td = document.createElement("td")
        let button = createButton(true,arrayNumber);
        td.appendChild(button);
    }
    tr.setAttribute('id', arrayNumber);
    tr.appendChild(td);
    tbody.appendChild(tr); 
}

function compare_dates(text) { //calculates number of days an item has been held

    let listyear = Number(text.substring(0,4));
    let listmonth = Number(text.substring(5,7));
    let listdate = Number(text.substring(8,10));


    let liststr = (listmonth + "/" + listdate + "/" + listyear);

    let ex = new Date();
    let ex1 = new Date(liststr.toString());
    let diff = ex.getTime() - ex1.getTime();
    return (Math.round(diff / 86400000));
}

function createButton(setup, arrayNumber) { //Creates a 'Sell' button as a new row in the itemlist. Created as a function to uncrowd display_table function. 
    
    if (setup == false) {
        
        let button = document.createElement("button")
        button.setAttribute('onclick','sellItem(this.id)');
        let tempcall = (JSON.parse(localStorage.getItem('itemlist')));
        let id_num = tempcall.arrayNum;
        button.setAttribute('id', ('btn_' + id_num));
        button.appendChild(document.createTextNode('Sell'));

        return button

    } else if (setup == true) {
        
        let button = document.createElement("button")
        button.setAttribute('onclick','sellItem(this.id)');
        button.setAttribute('id', ('btn_' + arrayNumber));
        button.appendChild(document.createTextNode('Sell'));

        return button

    }
}

function sellItem(id) { //deletes the item from the frontend and backend, transfers it to selltable
    var new_id = id.substring(4, id.length);
    var temp = document.getElementById(new_id);
    temp.remove();

    //THIS IS WHERE YOU HAVE TO SEND ALL THE INFO TO THE SOLD ITEMS GRAPH
    var templist = (JSON.parse(localStorage.getItem('itemlist')))
    var templist_2 = (JSON.parse(localStorage.getItem('solditems')));

    var name = templist.name[Number(new_id)]
    var price =  templist.price[Number(new_id)];
    var quantity = templist.quantity[Number(new_id)];
    var date = templist.date[Number(new_id)];
    var total = templist.total[Number(new_id)];
    var sellprice = prompt('Enter the Sell price:')
    var profit = (determineProfit(price,sellprice,quantity));

    templist_2.name.push(name)
    templist_2.price.push(price)
    templist_2.quantity.push(quantity)
    templist_2.date.push(date)
    templist_2.total.push(total)
    templist_2.profit.push(profit[0]);
    templist_2.percentage_profit.push(profit[1]);
    templist_2.arrayNum += 1
    
    localStorage.setItem('solditems', JSON.stringify(templist_2));

    diplay_table_setup(name,price,quantity,date,'selltable');

    templist.arrayNum -= 1
    templist.name.splice(new_id,1);
    templist.price.splice(new_id,1);
    templist.quantity.splice(new_id,1);
    templist.date.splice(new_id,1);
    templist.total.splice(new_id,1);
    localStorage.setItem('itemlist', JSON.stringify(templist));


    window.location.reload()
} 

function determineProfit(buyPrice, sellPrice, quantity) { // Determines profit. Assuming tax for item is 14%
    let sell_price = Number(sellPrice) * Number(quantity);
    let buy_price = Number(buyPrice) * Number(quantity);
    let sell_w_tax = sell_price - (sell_price * 0.05);

    let profit_notax = (Math.round(100 * (sell_price - buy_price))) / 100; // profit notax
    let profit_wtax = (Math.round(((sell_price - (sell_price * 0.05)) - buy_price) * 100)) / 100; // profit wtax
    let display = '$' + profit_wtax + ' ($' + profit_notax + ')';
    let percentage_profit = (Math.round(100 - (100 *(buy_price / sell_w_tax)))); // percentage profit wtax
    


    display_profits(profit_wtax,0,false)
    


    let displayarr = [];
    displayarr.push(display, percentage_profit);
    return displayarr;

}

function reset_tables() { //deletes the values listed from the localstorage list
    localStorage.removeItem('solditems')
    localStorage.removeItem('itemlist')
    localStorage.removeItem('totalprofit')
    localStorage.removeItem('totalspent')
    window.location.reload();
}

function display_profits(profit,total,setup) {

if (setup == false) { 
var tempspent = totalspent;
var tempprofit = totalprofit;

tempprofit.money += profit;
tempspent.money += total;

localStorage.setItem('totalprofit', JSON.stringify(tempprofit));
localStorage.setItem('totalspent', JSON.stringify(tempspent));
} 

let spentstring = totalprofit.display + totalprofit.money;
let profitstring = totalspent.display + totalspent.money;

document.getElementById('profits').innerHTML = profitstring;
document.getElementById('total_display').innerHTML = spentstring;
}

//-------------------------------------------------------------------------------------------------------------------------------------------










/* SUGGESTIONS -------------------------------------------------------------------------------------------------------------------------------

the total profit and invested sections at the bottom need to be refined, and both need to round the number.

Profit percentages are wrong on the sell graph. Half of what they should be.

Input data box needs to reset when add button is clicked

Sell button cont.
Fix it so the button does not show up and is deleted
It will then calculate the profit given with taxes and w/o. 
It will also potentially add the number suggested below.



Add symbols to the table like $ and corresponding national currency (CDN, USD, ...)

Make a number that will get the % of profit divided by the amount of time it has been held. 
This will be included in the "Sold items" section, and will be used to determine how profitable
an item has been within a certain time frame. Its just a reflective measure.

Potentially add a currency conversion to the site, like CDN, USD, EUR, GBP

-------------------------------------------------------------------------------------------------------------------------------*/


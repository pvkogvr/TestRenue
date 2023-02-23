var sumTag = document.getElementById("input");
var infoTag = document.getElementById("info");
var btnDelivery = document.getElementById("delivery");


var products = [
  {
    id: 1,
    price: 150,
    count: 10,
    name:"Lay\'s",
    idhtml: document.getElementById("product1"),
    buycount:0,
    src:"./image/chips.jpg",
    alt:"Изображение чипсов"
  },
  {
    id: 2,
    price:47,
    count: 10,
    name: "Apple",
    idhtml: document.getElementById("product2"),
    buycount:0,
    src:"./image/apple.jpeg",
    alt:"Изображение яблока"
  },
  {
    id: 3,
    price: 50,
    count: 10,
    name:"Pear",
    idhtml: document.getElementById("product3"),
    buycount:0,
    src:"./image/pear.jpeg",
    alt:"Изображение груши"
  },
  {
    id: 4,
    price: 200,
    count: 10,
    name:"Snikers",
    idhtml: document.getElementById("product4"),
    buycount:0,
    src:"./image/snikers.jpg",
    alt:"Изображение сникерса"
  },
  {
    id: 5,
    price: 100,
    count: 10,
    name:"Oreo",
    idhtml: document.getElementById("product5"),
    buycount:0,
    src:"./image/oreo.jpg",
    alt:"Изображение орео"
  },
  {
    id: 6,
    price: 76,
    count: 10,
    name:"Natahtari",
    idhtml: document.getElementById("product6"),
    buycount:0,
    src:"./image/natahtari.jpg",
    alt:"Изображение лимонада"
  },
  {
    id: 7,
    price: 14,
    count: 10,
    name:"Pen",
    idhtml: document.getElementById("product7"),
    buycount:0,
    src:"./image/pen.jpg",
    alt:"Изображение ручки"
  },
  {
    id: 8,
    price: 54,
    count: 10,
    name:"Water",
    idhtml: document.getElementById("product8"),
    buycount:0,
    src:"./image/water.jpg",
    alt:"Изображение воды"
  }
]

var oddmoneys = [ {
    id: 1,
    price: 1,
    count: 10
},
{
    id: 2,
    price: 5,
    count: 10
},
{
    id: 3,
    price: 10,
    count: 10
},
{
    id: 4,
    price: 50,
    count: 10
},
{
    id: 5,
    price: 100,
    count: 10
},
{
    id: 6,
    price: 500,
    count: 10
},
{
    id: 7,
    price: 1000,
    count: 10
}
]

function icon(products){
    var y = 0;
    while(y < products.length){
        products[y].idhtml.innerHTML = `<img id=\"immg\" src=${products[y].src} alt=${products[y].alt}> <p>${products[y].id + " " + products[y].name + " " + products[y].price}</p>`;
        y++;
    }
}
icon(products)
sumTag.innerHTML = "0";

function addSum(sum) {
  let curSum = sumTag.innerHTML;
  sumTag.innerHTML = parseInt(curSum) + parseInt(sum);
  let i = 0;
  while(i < 7){
    if(oddmoneys[i].price == parseInt(sum)){
        oddmoneys[i].count +=1;
    }
    i++;
  }
}

function buyItem(item){
    let product = products.filter(_ => _.id == item)[0];
    let curSum = sumTag.innerHTML;
    if(product.count == 0){
        infoTag.innerHTML = "Товар закончился";
        product.idhtml.innerHTML = "<img id=\"immg\" src=\"./image/ended.jpg\" alt=\"Товар закончился\" style=\"position: absolute; width: 115px; height: 136px; left: 0px; top: 0px;\">";
    }
    else{
        if (curSum < product.price){
            infoTag.innerHTML ="У вас не хватает денег";
        }
        else{
            product.count -= 1;
            addSum((0-product.price));
            infoTag.innerHTML = "Возьмите товар";
            product.buycount += 1;
        }
    }
}

function wopp(){ //withdrawal of purchased products
    var i = 0;
    var sms ="Вы купили: \n";
    while(i < products.length){
        if(products[i].buycount != 0){
            sms = sms + `${products[i].name}: ${products[i].buycount} шт. \n`;
        }
        i++;
    }
    alert(sms)
}

function sortAndWhile(sum, list, isProd = false){
    list = list.sort((a,b) => {
        if(a.price < b.price){
            return 1;
        }
        else if (a.price > b.price){
            return -1;
        }
        else return 0;
    })
    let i = 0
    while(sum > 0 && i < list.length){
        if(list[i].price > 500){
            i++;
        }
        else{
            if(sum < list[i].price || list[i].count <= 0){
                i++;
            }
            else{
                sum -= list[i].price;
                list[i].count -= 1;
                if(isProd){
                    list[i].buycount += 1;
                }
            }
        }
    }
    sumTag.innerHTML = sum;
    return sum;
}

function buyClear(){
    var i = 0;
    while(i < products.length){
        if(products[i].buycount != 0){
            products[i].buycount = 0;
        }
        i++;
    }
}

function finishsdacha(){
    buyClear();
    let curSum = sumTag.innerHTML;
    let resSum = curSum;
    curSum = sortAndWhile(curSum, oddmoneys);
    if(curSum == 0){
        sumTag.innerHTML = 0;
        return infoTag.innerHTML =`Ваша сдача ${resSum} руб.`;
    }
    else{
        curSum = sortAndWhile(curSum, products, true)
        if(curSum = 0){
            sumTag.innerHTML = 0;
            return infoTag.innerHTML = `Приходите ещё!`;
        }
        else{
            var i = 0;
            while(i < products.length){
                if(products[i].count == 0){
                    products[i].idhtml.innerHTML = "<img id=\"immg\" src=\"./image/ended.jpg\" alt=\"Товар закончился\" style=\"position: absolute; width: 115px; height: 136px; left: 0px; top: 0px;\">";
                }
                i++;
            }
            var m = 0
            m = parseInt(m) +  sumTag.innerHTML; //Невыданная сдача
            return infoTag.innerHTML = `В аппарате остается ${sumTag.innerHTML} руб`;
        }
    }
}



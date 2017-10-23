var socket = io('localhost:16729');

var pStart = Settings.products[1].price / 100;
var pMax = 1.0;
var pMin = 0.25;
var pDelta = 0.05;
var pMulti = 0.5;

var p = pStart;

var lastAdvertisedPrice = parseInt(pMax * 100);

function newPrice() {
  var cents = Math.round(p * 100);
  Settings.products[1].price = cents;

  if(cents != lastAdvertisedPrice) {
    var diff;
    var string = (cents / 100).toFixed(2).replace('.', ',');
    string += ' ';
    if (cents >= lastAdvertisedPrice) {
      string += '+';
      diff = (cents - lastAdvertisedPrice) / lastAdvertisedPrice;
    } else {
      string += '-';
      diff = (lastAdvertisedPrice - cents) / lastAdvertisedPrice;
    }
    string += (diff * 100).toFixed(1).replace('.', ',');
    string += '%';

    socket.emit('new price', string);
    lastAdvertisedPrice = cents;
  }
}

function reducePrice() {
  p = p - (pDelta * ((p / pMin) - 1));

  if(p < pMin) {
    p = pMin;
  }

  newPrice();
}

function increasePrice(numBeers) {
  p = p + (pDelta * (numBeers ** pMulti));

  if(p > pMax) {
    p = pMax;
  }

  newPrice();
}

setInterval(reducePrice, 60 * 1000);

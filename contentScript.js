// alert("contentscript2 Executed ... ");

// changeBackgroundToGreen();

var colorPreset = [];
colorPreset=[
    '#f5f7e1',
    '#fff2c9',
    '#f2caa9',
    '#4f423e',
    '#997d6a',
    '#d1b9a7'
];

// document.body.style.backgroundColor="yellow";
// jQuery = require('./jquery-2.1.1.js');
var all = document.getElementsByTagName("*");

for (var i=0, max=all.length; i < max; i++) {
     // Do something with the element here

     all[i].style.backgroundColor= colorPreset[i % colorPreset[0].length];
     console.log("here");
}

// document.
// $('body').style.backgroundColor = "green";

// alert("Second code Executed ... ");

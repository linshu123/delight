// alert("contentscript2 Executed ... ");

// changeBackgroundToGreen();

function log(obj){
    console.log(obj);
}
// var _ = require('dsaf');

var springSet = [
    '#699a33',
    '#92c060',
    '#c2e79a',
    '#457313',
    '#284d00'
];


var colorPreset = [];

colorPreset=[
    '#f5f7e1',
    '#fff2c9',
    '#f2caa9',
    '#4f423e',
    '#997d6a',
    '#d1b9a7'
];

baseColors = [
    'rgb(128, 144, 166)',
    'rgb(170, 82, 72)',
    'rgb(240, 213, 134)',
    'rgb(242, 93, 50)',
    'rgb(237, 95, 93)',
    'rgb(188, 204, 194)',
    'rgb(70, 170, 172)',
    'rgb(207, 89, 77)',
    'rgb(250, 179, 27)',
    'rgb(43, 127, 138)',
    'rgb(192, 188, 88)',
    'rgb(122, 131, 128)'
];

colorPreset = baseColors;

// debugger;

function getRandomInt (upperBound) {
    return Math.floor((Math.random() * upperBound) + 1) - 1;
}

// Select one as background color and remove it from others.
var bgColorIndex = getRandomInt(colorPreset.length);
var backgroundColor = colorPreset[bgColorIndex];
colorPreset.splice(bgColorIndex, 1);


Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

var all = document.getElementsByTagName("*");
var classNames = [];

for (var i = 0; i < all.length; i++) {

    if (!all[i].className){
        continue;
    }

    var classList = all[i].className.split(/\s+/);
    for (var j = 0; j < classList.length; j++) {
        classNames.push(classList[j]);
    };
};

classNames = classNames.unique();

// Take all the unique class names and make a dictionary. 
var colorMapping = {};
var colorIndex = getRandomInt(colorPreset.length);
for (var i = 0; i < classNames.length; i++) {


    var elementsByClass = document.getElementsByClassName(classNames[i]);
    if (elementsByClass.length){

        if (!(classNames[i] in colorMapping)){
            
            colorMapping[classNames[i]] = {};
            // colorMapping[classNames[i]].backgroundColor = colorPreset[colorIndex++ % colorPreset.length];
            colorMapping[classNames[i]].color = colorPreset[colorIndex++ % colorPreset.length];
        }
    }
    else {
        classNames.splice(i, 1);
    }
};

// debugger;

// var index = 0;
for (var i = 0; i < classNames.length; i++) {
    var elementsByClass = document.getElementsByClassName(classNames[i]);
    if (!colorMapping[classNames[i]])
        continue;
    for (var j = 0; j < elementsByClass.length; j++) {

        log("classname: " + classNames[i]);
        log(colorMapping[classNames[i]].color);
        log(colorMapping[classNames[i]].backgroundColor);

        elementsByClass[j].style.color = colorMapping[classNames[i]].color;
        elementsByClass[j].style.backgroundColor = backgroundColor;
        // elementsByClass[j].style.backgroundColor = colorMapping[classNames[i]].backgroundColor;
    };
};






// alert("contentscript2 Executed ... ");

// changeBackgroundToGreen();

function log(obj){
    console.log(obj);
}

var colorPreset = [];
colorPreset=[
    '#f5f7e1',
    '#fff2c9',
    '#f2caa9',
    '#4f423e',
    '#997d6a',
    '#d1b9a7'
];

var backgroundColor;

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

// var index = 0;
// // console.log(colorMapping);
// for (var color in colorMapping){
//     index++;
//     colorMapping[color] = colorPreset[index % colorPreset.length];   
// }
// log(all);

var index = 0;
for (var i = 0; i < classNames.length; i++) {
    elementsByClass = document.getElementsByClassName(classNames[i]);
    for (var j = 0; j < elementsByClass.length; j++) {
        elementsByClass[j].style.color = colorPreset[index++ % colorPreset.length];
        elementsByClass[j].style.backgroundColor = backgroundColor;
    };
};


// for (var i=0, max=all.length; i < max; i++) {
//      // Do something with the element here
//      all[i].style.backgroundColor = colorPreset[i % colorPreset.length];
//      all[i].style.color = colorPreset[i % colorPreset.length];
//      // all[i].style.backgroundColor= colorMapping[all[i].style.backgroundColor];
//      // all[i].style.color= colorMapping[all[i].style.color];
// }




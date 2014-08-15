// ************** Helper functions start **************

function log(obj){
    console.log(obj);
}

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function getRandomInt (upperBound) {
    return Math.floor((Math.random() * upperBound) + 1) - 1;
}

// Helper functions to eliminate duplicates from array.
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

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

// Convert rgb colors to hex
function rgbToHex(r, g, b) {
    // debugger;
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// Convert 'rgb(200, 12, 53)' to ["200", "12", "53"]
function rgbStringToHex (rgbString) {
    // debugger;
    var rgb = rgbString.substring(4, rgbString.length-1)
                       .replace(/ /g, '')
                       .split(',');

    return rgbToHex(parseInt(rgb[0]), 
                    parseInt(rgb[1]), 
                    parseInt(rgb[2]));
}

// Convert hex colors to rgb
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Get luminance of rgb color.
function luminance(r, g, b) {
    var a = [r,g,b].map(function(v) {
        v /= 255;
        return (v <= 0.03928) ?
            v / 12.92 :
            Math.pow( ((v+0.055)/1.055), 2.4 );
        });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Get luminance of hex color. Return a number between 0 and 100.
function getHexLumin (c) {
    var c = c.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    return luma;
}

// Parse Colors according to luminance.
function parseColors(colors, threshold){
    // Convert colors to hex.
    
    var hexColors = [];
    for (var i = 0; i < colors.length; i++) {
        if (colors[i][0] == '#'){
            hexColors.push(colors[i]);
        }
        else 
            hexColors.push(rgbStringToHex(colors[i]));
    };

    // Remove light colors.
    var darkColors = [], lightColors =[];
    for (var i = 0; i < hexColors.length; i++) {
        
        if (getHexLumin(hexColors[i]) < threshold)
            darkColors.push(hexColors[i]);
        else
            lightColors.push(hexColors[i]);
    };

    return [lightColors, darkColors];
}

// ************** Helper functions end **************

function getClassNamesOnPage(){

    var all = document.getElementsByTagName("*");
    var classNames = [];

    for (var i = 0; i < all.length; i++) {

        if (!all[i].className){
            all[i].setAttribute("class", "non-class");
        }
        if (typeof(all[i]) == 'a')
            all[i].setAttribute("class", "h-link");   

        // Parse "class-name-1 class-name-2" into ["class-name-1", "class-name-2"].
        var classList = all[i].className.split(/\s+/);

        for (var j = 0; j < classList.length; j++) {
            classNames.push(classList[j]);
        };
    };

    return classNames.unique();
}

// Take all the unique class names and make a dictionary. 
function createColorMapping(classNames, colorPreset){

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
    };

    return colorMapping;
}

function mapEverythingColors (color) {
    var all = document.getElementsByTagName("*");
    for (var i = 0; i < all.length; i++) {
        all[i].style.color = color;
    };
}

function mapClassColors (colorMapping, backgroundColors) {

    for (var className in colorMapping){

        var elementsByClass = document.getElementsByClassName(className);
        
        for (var j = 0; j < elementsByClass.length; j++) {
            elementsByClass[j].style.color = colorMapping[className].color;
            // elementsByClass[j].style.backgroundColor = backgroundColors[0];
        };
    }
}

function setBackgroundColor(backgroundColor){

    var elementsWithoutBackgroundImage = $('*').filter(function() {
        if (this.currentStyle) 
                  return this.currentStyle['backgroundImage'] !== 'none';
        else if (window.getComputedStyle)
                  return document.defaultView.getComputedStyle(this,null)
                                 .getPropertyValue('background-image') !== 'none';
    });
    // debugger;

    for (var i = 0; i < elementsWithoutBackgroundImage.length; i++) {
        // if (elementsWithoutBackgroundImage[i].style)
            // elementsWithoutBackgroundImage[i].style.backgroundColor = backgroundColor;
    };
    
    // var all = document.getElementsByTagName("*");
    // for (var i = 0; i < all.length; i++) {
    //     // if (all[i].style.backgroundImage.slice(4, -1)){
    //     // all[i].style.backgroundImage = 'none';
    //     // all[i].style.border = 'none';
    //     // }
    //     if (!all[i].style.backgroundImage)
    //         all[i].style.backgroundColor = backgroundColor;
    // };
}

var oceanSet = [
    '#4183D7',
    '#59ABE3',
    '#81CFE0',
    '#52B3D9',
    '#C5EFF7',
    '#22A7F0',
    '#3498DB',
    '#19B5FE',
    '#6BB9F0',
    '#1E8BC3',
    '#3A539B',
    '#34495E',
    '#2574A9',
    '#1F3A93',
    '#89C4F4',
    '#4B77BE',
    '#5C97BF'
];

var springSet = [
    '#699a33',
    '#92c060',
    '#c2e79a',
    '#457313',
    '#284d00',
    '#A2DED0',
    '#87D37C',
    '#90C695',
    '#26A65B',
    '#03C9A9',
    '#C8F7C5',
    '#A2DED0',
    '#87D37C',
    '#90C695',
    '#26A65B',
    '#03C9A9',
    '#68C3A3',
    '#65C6BB',
    '#1BBC9B',
    '#1BA39C',
    '#66CC99',
    '#36D7B7',
    '#C8F7C5',
    '#86E2D5',
    '#2ECC71',
    '#16A085'
];

var brownPreset=[
    '#f5f7e1',
    '#fff2c9',
    '#f2caa9',
    '#4f423e',
    '#997d6a',
    '#d1b9a7'
];

var baseColors = [
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

// Self excuting function
(function (){

    // Select preset colors.
    var colorPreset = parseColors(shuffle(springSet), 150);
    var contentColors = colorPreset[1]; // Dark colors
    var everythingColor = contentColors[0];
    // contentColors.splice(1, 1);
    var backgroundColors = parseColors(colorPreset[0], 180)[0]; // Light colors

    log(contentColors);

    // Get all class names.
    classNames = getClassNamesOnPage();
    // Assign a color to each class.
    colorMapping = createColorMapping(classNames, contentColors);

    // Give a color to everything LOL
    // mapEverythingColors(everythingColor);

    // Change the colors of those classes.
    mapClassColors(colorMapping, backgroundColors);
    // Set background color of everything.
    setBackgroundColor(backgroundColors[getRandomInt(backgroundColors.length)]);
})();







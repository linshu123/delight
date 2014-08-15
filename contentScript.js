// ************** Helper functions start **************

function log(obj){
    console.log(obj);
}

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

// ************** Helper functions end **************


var springSet = [
    '#699a33',
    '#92c060',
    '#c2e79a',
    '#457313',
    '#284d00'
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

function getClassNamesOnPage(){

    var all = document.getElementsByTagName("*");
    var classNames = [];

    for (var i = 0; i < all.length; i++) {

        if (!all[i].className){
            continue;
        }

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
        else {
            classNames.splice(i, 1);
        }
    };

    return colorMapping;
}

function mapColors (colorMapping) {
    
    
    for (var className in colorMapping){

        var elementsByClass = document.getElementsByClassName(className);
        
        for (var j = 0; j < elementsByClass.length; j++) {

            // log("classname: " + classNames[i]);
            // log(colorMapping[classNames[i]].color);
            // log(colorMapping[classNames[i]].backgroundColor);

            elementsByClass[j].style.color = colorMapping[className].color;
            // elementsByClass[j].style.backgroundColor = backgroundColor;
            // elementsByClass[j].style.backgroundColor = colorMapping[classNames[i]].backgroundColor;
        };
    }
    
}

function main(){

    // Select preset colors.
    var colorPreset = baseColors;

    // Select one as background color and remove it from others.
    var bgColorIndex = getRandomInt(colorPreset.length);
    var backgroundColor = colorPreset[bgColorIndex];
    colorPreset.splice(bgColorIndex, 1);

    // Get all class names.
    classNames = getClassNamesOnPage();
    // Assign a color to each class.
    colorMapping = createColorMapping(classNames, colorPreset);
    // Change the colors of those classes.
    mapColors(colorMapping);
}

main();






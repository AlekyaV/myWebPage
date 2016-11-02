// ADD NEW ITEM TO END OF LIST

var list = document.getElementsByTagName('ul')[0];
//creating a new element
var newItemLast = document.createElement('li');
// creating a TextNode
var newTextLast = document.createTextNode('cream');
newItemLast.appendChild(newTextLast);

list.appendChild(newItemLast);

// ADD NEW ITEM START OF LIST
var newItemFirst = document.createElement('li');

var newTextFirst = document.createTextNode('kale');
//adding the node to element
newItemFirst.appendChild(newTextFirst);
// adding the element to the list
list.insertBefore(newItemFirst, list.firstChild);

// ADD A CLASS OF COOL TO ALL LIST ITEMS

var listItems = document.querySelectorAll('li');
// declare a count variable
var i;

for(i=0; i < listItems.length; i++)
    {
        // class name changed to cool for a blue color
 listItems[i].className = 'cool';
    }

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
// accessing h2 heading element
var heading = document.querySelector('h2');

var headingText = heading.firstChild.nodeValue;

// calculating number of items in the list
var totalItems = listItems.length;
// total of the list to be displayed 
var newHeading = headingText + '<span>' + totalItems + '</span>';

// h2 should be updated by innerHTML
heading.innerHTML=newHeading;
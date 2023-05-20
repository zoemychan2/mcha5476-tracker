// HTML elements that won't change, they will stay the same the entire time, setting up a constant variable that won't change
const bobatrackform = document.getElementById('bobatrackform')
const trackedbobaorders = document.getElementById ('trackedbobaorders')

function checkButton() {
    if (document.getElementById('small').checked) {
        return document.getElementById("small").value;
    } else if (document.getElementById('medium').checked) {
        return document.getElementById("medium").value;
    } else if (document.getElementById('large').checked) {
        return document.getElementById("large").value;
    }
}

//Creating event listener, listen for form submission
// When submit happens, calls the function, passing through the event and all data related to it 
bobatrackform.addEventListener('submit', function(event){
    event.preventDefault(); // Block default submission behaviour

    //everything that's happening within the function is called here
    console.log(bobatrackform.elements)

    //create function that's passing through each of the radio options to get the size, will return the size
    
    //addTask function being called with our input elements
    addBobaorder(
        bobatrackform.elements.bobaOrder.value,
        bobatrackform.elements.bobaShop.value,
        //bobatrackform.elements.bobaSize.name, 
        //add the function 
        //document.querySelector(`input[name="radio"]:checked`),
        checkButton(),
        //bobatrackform.elements.radio.id,
        bobatrackform.elements.bobaPrice.value,
        bobatrackform.elements.bobaRating.value,
        bobatrackform.elements.bobaComments.value
    )
})

// Displaying bobatrackform everytime we submit the form - doing it as part of addBobaorder function
function displayTrackedbobaorders (bobatrackform) {
    let item = document.createElement('li');
    //item.setAttribute('data-id', bobatrackform.id);
    item.innerHTML = `<p> <strong>Order: </strong>${bobatrackform.bobaorder} <br/> <strong>Shop: </strong>${bobatrackform.bobashop} <br/> <strong>Size: </strong>${bobatrackform.bobasize} <br/> <strong>Price: </strong>$${bobatrackform.bobaprice} <br/> <strong>Rating: </strong>${mapRatingText(bobatrackform.bobarating)} <br/> <strong>Comments: </strong>${bobatrackform.bobacomments}</p>`; //populating item with some data from bobatrackform, assigning it with a value (HTML code)
    trackedbobaorders.appendChild(item); // Want to put item into trackedbobaorders

    let delButton = document.createElement('button'); // Creating a delete button for every time something is added to the list
    let delButtonText = document.createTextNode ('Delete'); // Value we want our text to say in the delete button
    delButton.appendChild(delButtonText); // Append text to the button
    item.appendChild(delButton);// Append the whole button to the list item, add it after our HTML

    //this button will be associated with only refer to the each individual item it's next to - we will have multiple event listeners that will be different from eachother
    delButton.addEventListener('click', function(event){
        item.remove();
        trackedBobaorders.forEach(function(trackArrayElement, trackArrayIndex){
            if(trackArrayElement.id == item.getAttribute('data-id')){
                trackedBobaorders.splice(trackArrayIndex, 1)
            }
        })
        console.log(trackedBobaorders);
    })

}

// Function to help map bobarating value to my desired text
function mapRatingText(rating) {
    switch (rating) {
        case 'one-star':
            return '1 Star ⭐️';
        case 'two-star':
            return '2 Stars ⭐️⭐️';
        case 'three-star':
            return '3 Stars ⭐️⭐️⭐️';
        case 'four-star':
            return '4 Stars ⭐️⭐️⭐️⭐️';
        case 'five-star':
            return '5 Stars ⭐️⭐️⭐️⭐️⭐️';
        default:
            return rating;
    }
}

// Create array called trackedBobaorders
var trackedBobaorders=[];

//Create function called addBobaorder
function addBobaorder(bobaorder, bobashop, bobasize, bobaprice, bobarating, bobacomments){
    
    let bobatrackform = {
        bobaorder,
        bobashop,
        bobasize, 
        bobaprice, 
        bobarating, 
        bobacomments,
        id: Date.now(),
        date: new Date().toISOString(),
    }


    trackedBobaorders.push(bobatrackform);
    displayTrackedbobaorders(bobatrackform);

    console.log(bobatrackform);
}







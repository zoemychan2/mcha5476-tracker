// HTML elements that won't change, they will stay the same the entire time, setting up a constant variable that won't change
const bobatrackform = document.getElementById('bobatrackform')
const trackedbobaorders = document.getElementById('trackedbobaorders')

// * RESET BUTTON *
// Getting the reset-button element
const resetButton = document.querySelector('.reset-button');

// Add event listener to the reset button
resetButton.addEventListener('click', function () {
    bobatrackform.reset(); // Resetting the form when reset button is clicked
})


// * RADIO BUTTONS FUNCTION *
// Radio buttons - what happens if user presses each radio button (Small, Medium, Large)
function checkButton() {
    if (document.getElementById('small').checked) {
        return document.getElementById("small").value;
    } else if (document.getElementById('medium').checked) {
        return document.getElementById("medium").value;
    } else if (document.getElementById('large').checked) {
        return document.getElementById("large").value;
    }
}

// * CREATING EVENT LISTENER, LISTENING FOR FORM SUBMISSION* 
// When submit happens, calls the function, passing through the event and all data related to it 
bobatrackform.addEventListener('submit', function (event) {
    event.preventDefault(); // Block default submission behaviour

    //everything that's happening within the function is called here
    console.log(bobatrackform.elements);

    //addTask function being called with our input elements
    addBobaorder(
        bobatrackform.elements.bobaOrder.value,
        bobatrackform.elements.bobaShop.value,
        checkButton(), //radio button function is called here
        bobatrackform.elements.bobaPrice.value,
        bobatrackform.elements.bobaRating.value,
        bobatrackform.elements.bobaComments.value
    )
})


// * THE DISPLAY EVERYTIME USER SUBMITS FORM - doing it as part of addBobaorder function *
function displayTrackedbobaorders(bobatrackform) {

    let dateElement = document.createElement('p');
    dateElement.classList.add("date-element");


    // Changing the format of date
    const newformat = new Intl.DateTimeFormat('en-US',{
        year:'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })

    const formatDate = newformat.format(new Date(bobatrackform.date));

    dateElement.innerHTML = `<p> <strong>${formatDate}</strong></p>`;


    let delButton = document.createElement('button'); // Creating a delete button for every time something is added to the list
    let delButtonText = document.createTextNode('🗑️'); // What the text in the delete button says
    delButton.appendChild(delButtonText); // Append text to the button

    // This button will be associated with each individual item it's next to - we will have multiple event listeners that will be different from eachother
    delButton.addEventListener('click', function (event) {
        item.remove(); // When delete button is pressed, item element is removed 
        dateDeletecontainer.remove();
        trackedBobaorders.forEach(function (trackArrayElement, trackArrayIndex) { // Removes item element from trackedBobaorders array
            if (trackArrayElement.id == item.getAttribute('data-id')) {
                trackedBobaorders.splice(trackArrayIndex, 1)
            }
        })
        console.log(trackedBobaorders);
    })

    var dateDeletecontainer = document.createElement('div');
    dateDeletecontainer.classList.add("datedelete-container");
    dateDeletecontainer.appendChild(dateElement);
    dateDeletecontainer.appendChild(delButton);

    dateDeletecontainer.addEventListener('click', function(){
        if (item.style.display=== "none"){
            item.style.display="block"; // Show the li elements
        } else {
            item.style.display = "none"; // Hide the li elements
        }
    });

    trackedbobaorders.appendChild(dateDeletecontainer);

     // List of items which shows in the Tracked Boba Orders section 
     let item = document.createElement('li');
     item.style.display="none"; // Hide the li element at first
     item.innerHTML = `<p> <strong>Order: </strong>${bobatrackform.bobaorder} <br/> <strong>Shop: </strong>${bobatrackform.bobashop} <br/> <strong>Size: </strong>${bobatrackform.bobasize} <br/> <strong>Price: </strong>$${bobatrackform.bobaprice} <br/> <strong>Rating: </strong>${mapRatingText(bobatrackform.bobarating)} <br/> <strong>Comments: </strong>${bobatrackform.bobacomments}</p>`; // Populating item with some data from bobatrackform, assigning it with a value (HTML code)
     trackedbobaorders.appendChild(item); // Put item into trackedbobaorders
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
var trackedBobaorders = [];

//Create function called addBobaorder
function addBobaorder(bobaorder, bobashop, bobasize, bobaprice, bobarating, bobacomments, date) {

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

    trackedBobaorders.push(bobatrackform); // Push bobatrackform into trackedBobaorders
    displayTrackedbobaorders(bobatrackform);

    console.log(bobatrackform);
}







// The foundation format of this Javascript code was based on DECO2017 JS Objects Input and event handling Scrimba (Dongas, 2023) https://scrimba.com/scrim/coa064ba08c96c1639bc9531b

// HTML elements that won't change, they will stay the same the entire time, setting up a constant variable that won't change
const bobatrackform = document.getElementById('bobatrackform')
const trackedbobaorders = document.getElementById('trackedbobaorders')

// * RESET BUTTON *
// Getting the reset-button element and constructing it to resetButton
const resetButton = document.querySelector('.reset-button');

// Add event listener to the reset button
resetButton.addEventListener('click', function () {
    bobatrackform.reset(); // Resetting the form when reset button is clicked
})


// * RADIO BUTTONS FUNCTION *
// Radio buttons - what happens if user presses each radio button (Small, Medium, Large)
function checkButton() {
    if (document.getElementById('small').checked) { // If small radio button is checked
        return document.getElementById("small").value; // Return small radio button value (Small) 
    } else if (document.getElementById('medium').checked) { // If medium radio button is checked
        return document.getElementById("medium").value; // Return medium radio button value (Medium) 
    } else if (document.getElementById('large').checked) { // If large radio button is checked
        return document.getElementById("large").value; // Return large radio button value (Large) 
    }
}

// * CREATING EVENT LISTENER, LISTENING FOR FORM SUBMISSION* 
// When submit happens, calls the function, passing through the event and all data related to it 
bobatrackform.addEventListener('submit', function (event) {
    event.preventDefault(); // Block default submission behaviour

    // addBobaorder function being called with our input elements
    addBobaorder(
        bobatrackform.elements.bobaOrder.value, // bobaOrder value is called when we addBobaorder
        bobatrackform.elements.bobaShop.value, // bobaShop value is called when we addBobaorder
        checkButton(), // radio button function is called here
        bobatrackform.elements.bobaPrice.value, // bobaPrice value is called when we addBobaorder
        bobatrackform.elements.bobaRating.value, // bobaRating value is called when we addBobaorder
        bobatrackform.elements.bobaComments.value // bobaComments value is called when we addBobaorder
    )
})


// * THE DISPLAY EVERYTIME USER SUBMITS FORM - doing it as part of addBobaorder function *
function displayTrackedbobaorders() {
    trackedbobaorders.innerHTML = "<h2>Tracked Boba Orders</h2>"; // Replaces existing content of trackedbobaorders, but adds the h2 element Tracked Boba Orders
        
    let localTracked = JSON.parse(localStorage.getItem('tracked')); // Setting local storage - getting the item 'tracked' from browser localStorage, converting it from JSON item to Javascript object (localTracked)   
    if (localTracked !== null){  // If localTracked is not null

        localTracked.forEach((bobatrackform)=>{ // running through bobatrackform, for each element in the localTacked array
            let dateElement = document.createElement('p'); // create a paragraph element with the name dateElement
            dateElement.classList.add("date-element"); // adding date-element CSS class to dateElement

            // Changing the format of date, inspired by MDN Contributors (2023) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
            const newformat = new Intl.DateTimeFormat('en-US',{
                year:'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            })
            
            const formatDate = newformat.format(new Date(bobatrackform.date)); // assigning newformat to formatDate using a more language written option (eg. May 28th, 2023 at 8:49pm)

            dateElement.innerHTML = `<p> <strong>${formatDate}</strong></p>`; // making the dateElement bolded 


            let delButton = document.createElement('button'); // Creating a delete button for every time something is added to the list - inspired by Thomas (2021) https://herewecode.io/blog/create-button-javascript/#:~:text=To%20create%20a%20button%20in%20JavaScript%2C%20you%20must%20use%20the,button%20element%20const%20button%20%3D%20document.
            let delButtonText = document.createTextNode('🗑️'); // What the text in the delete button says
            delButton.appendChild(delButtonText); // Append text to the button

            // This button will be associated with each individual item it's next to - we will have multiple event listeners that will be different from eachother
            delButton.addEventListener('click', function (event) {
                listContainer.remove(); // When delete button is pressed, listContainer is removed (contains the boba order)
                dateDeletecontainer.remove(); // The dateDelete container is removed as well (contains the date and delete button)
                
                localTracked = localTracked.filter((listContainer)=> listContainer.id !==bobatrackform.id); // when pressing the delete button, localTracked checks if listContainer.id equals to bobatrackform.id and removes it 
                localStorage.setItem('tracked', JSON.stringify(localTracked)); // updates 'tracked' in the localStorage with the updated localTracked array by converting to JSON string before storing it in localStorage
            })

            var dateDeletecontainer = document.createElement('div'); // Create a div called dateDeletecontainer 
            dateDeletecontainer.classList.add("datedelete-container"); // adding datedelete-container CSS class to dateDeletecontainer, so can be used to edit in CSS
            dateDeletecontainer.appendChild(dateElement); // appending dateElement to dateDeletecontainer
            dateDeletecontainer.appendChild(delButton); // appending delButton to dateDeletecontainer

            dateDeletecontainer.addEventListener('click', function(){ // Adding click event listener to the dateDeletecontainer to show and hide tracked boba order elements
                if (listContainer.style.display=== "none"){ 
                    listContainer.style.display="block"; // Show the li elements
                } else {
                    listContainer.style.display = "none"; // Hide the li elements
                }
            });

            trackedbobaorders.appendChild(dateDeletecontainer); // Appending dateDeletecontainer to trackedbobaorders

            let listContainer = document.createElement('li'); // List of items which shows in the Tracked Boba Orders section 
            listContainer.classList.add('list')
            listContainer.style.display="none"; // Hide the li element at first

            let paragraphElement = document.createElement('p'); // Creating p element
            paragraphElement.innerHTML = `<p> <strong>Order: </strong>${bobatrackform.bobaorder} <br/> <strong>Shop: </strong>${bobatrackform.bobashop} <br/> <strong>Size: </strong>${bobatrackform.bobasize} <br/> <strong>Price: </strong>$${bobatrackform.bobaprice} <br/> <strong>Rating: </strong>${mapRatingText(bobatrackform.bobarating)} <br/> <strong>Comments: </strong>${bobatrackform.bobacomments}</p>`; // Populating item with some data from bobatrackform, assigning it with a value (HTML code)

            let generatedImage = document.createElement('img'); // Creating generated image next to the p element
            generatedImage.src = bobatrackform.image; // the source for generatedImage comes from 'image' which is called in the bobatrackform
            generatedImage.classList.add('generated-img'); // Add class to generatedImage so it can be called in style.css

            listContainer.appendChild(paragraphElement); // Appending paragraph to listContainer
            listContainer.appendChild(generatedImage); // Appending generatedImage to listContainer

            trackedbobaorders.appendChild(listContainer); // Appending listContainer to trackedbobaorders section

        }) 
    } 
}

let autoImages = ["../Bobatrack Images/autoimages1.png", "../Bobatrack Images/autoimages2.png", "../Bobatrack Images/autoimages3.png", "../Bobatrack Images/autoimages4.png"]; // Create array of images I want to use as the autogenerated image (there will be a lot more selection of images in the real product, these few images were just to demonstrate how it would work)

// Function to autogenerate a random image from the autoImages array, inspired by W3Schools (2023) https://www.w3schools.com/js/js_random.asp
function getRandomImage(autoImages){
    const random = Math.floor(Math.random()* autoImages.length);
    return autoImages[random]
}

// Function to help map bobarating value to my desired text
function mapRatingText(rating) {
    switch (rating) {
        case 'one-star': // If one-star in bobaRating
            return '1 Star ⭐️'; // return '1 Star ⭐️'

        //Similar cases with the other rating types - similar format
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

//Create function called addBobaorder
function addBobaorder(bobaorder, bobashop, bobasize, bobaprice, bobarating, bobacomments, date) {

    // Inside the addBobaorder function where new bobatrackform object is called bobatrackform
    let bobatrackform = {

       // Properties of bobatrackform
        bobaorder,
        bobashop,
        bobasize,
        bobaprice,
        bobarating,
        bobacomments,
        id: Date.now(), // id is the unique identifier of each order
        date: new Date().toISOString(), // date format is assigned 
        image: getRandomImage(autoImages), // Create image property, where it gets a random image from the autoImages array. By putting this code here, it allows the autogenerated image to not change each time on their existing Tracked Boba Orders when the user refreshes the page. 
    }

    // fetching and parse localStorage value - inspired by DECO2017 Local Storage Tasklist Scrimba https://scrimba.com/scrim/cEr7veuE
    let localTracked = JSON.parse(localStorage.getItem('tracked')); // retrieves current value of 'tracked' from localStorage & stores in localTracked

    if (localTracked == null){  // If localTracked is not null (has existing orders)
        localTracked = [bobatrackform]; // make localTracked be assigned with new bobatrackform array 
    } else {
        if (localTracked.find(element => element.id === bobatrackform.id)){ // if there are existing orders, check to see if the element.id is equal to bobatrackform.id
            console.log('bobatrackform ID already exists'); // log 'bobatrackform ID already exists' into the console
        } else {
            localTracked.push(bobatrackform); // if not, push bobatrackform into localTracked  
        }
    }

    localStorage.setItem('tracked', JSON.stringify(localTracked)); // Updated localTracked array is stored back in localStorage through converting localTracked using JSON stringify
    displayTrackedbobaorders(); // update the tracked boba orders display 

    console.log(bobatrackform); // help with debugging
}

displayTrackedbobaorders(); // Running the tracked boba orders display 





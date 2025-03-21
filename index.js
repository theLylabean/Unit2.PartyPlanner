/** Steps:
✅1. create a state
✅2. add the api in a variable
✅3. select the root div and store in a variable
✅4. target the form from the HTML and store it in a variable or create it dynamically in js
❌4a. if creating dynamically, add an eventListener('DOMContentLoaded' before the init function (which will be inside the {} of the eventListener)) --didn't need this.
✅5. create a render function
✅5a. inside the render function add:
    ❌1. an eventListener to 'Get Info' that calls 'getSingleEvent' --didn't need it.
    ✅2. create a detailed Event View with a 'Go Back' button
    ✅3. add an eventListener to 'Go Back' to re-render the events from state
    ✅4. add a 'Delete' button to each Event
❌6. create 2 async functions to fetch all events and a single event --didn't need it.
✅7. create a details, go back, and delete button for each card in the list
✅8. create an eventListener that is attached to each delete button
✅8a. create a function to delete the card
✅9. create an eventListener for the form to add new parties to the list
✅9a. create a function to add to the state and render on the page
 */

// Step 2:
const baseUrl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-FTB-ET-WEB-PT/events'

// Step 1:
const state = {
    events: [],
    singleEvent: {}
}

// Step 3:
const root = document.querySelector('#root');
const submitButton = document.querySelector('#submit')
const form = document.querySelector('form');
const heading1 = document.querySelector('#partyList')
const heading2 = document.querySelector('#userAdd')

// Step 8a:
const deleteEvent = async (eventId) => {
    const res = await fetch(`${baseUrl}/${eventId}`, {
        method: 'DELETE'
    })
    getEvents()
}

// Step 5, 5a-4, & 7:
const render = (content) => {
    root.innerHTML = ''
    form.classList.remove('hide')
    heading1.classList.remove('hide')
    heading2.classList.remove('hide')
    if(Array.isArray(content)){
        content.forEach((events) => {
            const card = document.createElement('div')
            card.classList.add('card', 'show')
            card.classList.remove('hide')
            card.innerHTML = `
            <h1>${events.name}</h1>
            <button class='getInfo' data-url='${events.id}'> Get Info </button>
            <br>
            <button class='getInfo' id='delete'> Delete Info </button>
            `
            root.appendChild(card);

            card.querySelector('#delete').addEventListener('click', () => deleteEvent(events.id))

    // Step 5a-1:
    // -----old code-----
    // document.querySelectorAll('.getInfo').forEach((button) => {
    //     button.addEventListener('click', () => {
    //         // console.log(button)
    //         // console.log(e)
    //         render(events)
    //         console.log()

    // -----new code-----
    const button = card.querySelector('.getInfo');
    button.addEventListener('click', () => {
        render(events);
    });
});

    } else {
        // Step 5a-2 & 5a-4:
        const heading3 = document.createElement('h1')
        heading3.innerHTML = 'Party Information'
        heading3.classList.add('heading3')
        form.classList.add('hide')
        const card = document.createElement('div')
        heading1.classList.add('hide')
        heading2.classList.add('hide')
        card.classList.add('card', 'single')
        card.innerHTML = `
        <h1>${content.name}</h1>
        <p>${content.date}</p>
        <p>${content.location}</p>
        <p>${content.description}</p>
        <button class='getInfo' id='goBack'> Go Back </button>
        <br>
        <button class='getInfo' id='delete'> Delete Info </button>
        `
        document.querySelector('body').append(heading3)
        root.append(card)

// Step 5a-3:
        document.querySelector('#goBack').addEventListener('click', () => render(state.events))

// Step 8:
        document.querySelector('#delete').addEventListener('click', () => deleteEvent(content.id))
    }
}

// Step 6:
async function getEvents(){
    try{
        const res = await fetch(baseUrl)
        console.log(res)
        const info = await res.json()
        console.log(info.data)

        state.events = info.data
        render(state.events)
    } catch(error){
        console.error(error)
    }
}
getEvents()

// Step 6:
// async function getSingleEvent(){
//     try{
//         const res = await fetch(`${baseUrl}/${state.singleEvent.id}`)
//         console.log(res)
//         const info = await res.json()
//         console.log(info)

//         state.singleEvent = info
//         render(state.singleEvent)
//     } catch(error){
//         console.error(error)
//     }
// }
// getSingleEvent()

// Step 9a:
const addEvent = async(eventInfo) => {
    const res = await fetch (baseUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(eventInfo)
    })
    const info = await res.json()
    console.log(info)
    getEvents()
}

// Step 4 & 9:

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(form.name.value)

    const eventInfo = {
        name: form.name.value,
        date: `${form.date.value}:00Z`,
        location: form.location.value,
        description: form.details.value,
    }
    addEvent(eventInfo)
})
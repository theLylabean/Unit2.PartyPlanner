/** Steps:
✅1. create a state
✅2. add the api in a variable
✅3. select the root div and store in a variable
✅4. target the form from the HTML and store it in a variable or create it dynamically in js
4a. if creating dynamically, add an eventListener('DOMContentLoaded' before the init function (which will be inside the {} of the eventListener))
✅5. create a render function
5a. inside the render function add:
    ❌1. an eventListener to 'Get Info' that calls 'getSingleEvent' --stupid. didn't need it.
    ✅2. create a detailed Event View with a 'Go Back' button
    3. add an eventListener to 'Go Back' to re-render the events from state
    4. add a 'Delete Party Info' button to each Event
❌6. create 2 async functions to fetch all events and a single event -- this was stupid. didn't need it.
7. create a button for each party in the list
8. create an eventListener that is attached to each delete button
9. create an eventListener for the form to add new parties to the list
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

const deleteEvent = async (eventId) => {
    const res = await fetch(`${baseUrl}/${eventId}`, {
        method: 'DELETE'
    })
    getEvents()
}

// Step 5:
const render = (content) => {
    root.innerHTML = ''
    if(Array.isArray(content)){
        content.forEach((events) => {
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
            <h1>${events.name}</h1>
            <button class='getInfo' data-url='${events.id}'> Get Info </button>
            <button class='deleteInfo' id='delete'> Delete Info </button>
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
        // Step 5a-2:
        const card = document.createElement('div')
        card.classList.add('card', 'single')
        card.innerHTML = `
        <h1>${content.name}</h1>
        <p>${content.date}</p>
        <p>${content.location}</p>
        <p>${content.description}</p>
        <button class='getInfo' id='goBack'> Go Back </button>
        <button class='deleteInfo' id='delete'> Delete Info </button>
        `
        root.replaceChildren(card)

        document.querySelector('#goBack').addEventListener('click', () => render(state.events))

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

// Step 4:
const form = document.querySelector('form');
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
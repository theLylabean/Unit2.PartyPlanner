/** Steps:
✅1. create a state
✅2. add the api in a variable
✅3. select the root div and store in a variable
✅4. target the form from the HTML and store it in a variable or create it dynamically in js
4a. if creating dynamically, add an eventListener('DOMContentLoaded' before the init function (which will be inside the {} of the eventListener))
✅5. create a render function
5a. inside the render function add:
    ✅1. an eventListener to 'Get Info' that calls 'getSingleEvent'
    ✅2. create a detailed Event View with a 'Go Back' button
    3. add an eventListener to 'Go Back' to re-render the events from state
    4. add a 'Delete Party Info' button to each Event
✅6. create 2 async functions to fetch all events and a single event
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

// Step 5:
const render = (content) => {
    if(Array.isArray(content)){
        content.forEach((events) => {
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
            <h1>${events.name}</h1>
            <button class='getInfo' data-url='${events.id}'> Get Info </button>
            `
    root.appendChild(card);

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
        console.log(content)
        // Step 5a-2:
        const card = document.createElement('div')
        card.classList.add('card', 'single')
        card.innerHTML = `
        <h1>${content.name}</h1>
        <p>${content.date}</p>
        <p>${content.location}</p>
        <p>${content.description}</p>
        `
        root.replaceChildren(card)
    }
}

// Step 6:
const getEvents = async () => {
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

// Step 4:
// const form = document.querySelector('form');
// form.addEventListener('submit', (event) => {
//     event.preventDefault();

// })
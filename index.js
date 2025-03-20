/** Steps:
1. create a state
2. add the api in a variable
3. select the root div and store in a variable
4. target the form from the HTML and store it in a variable or create it dynamically in js
4a. if creating dynamically, add an eventListener('DOMContentLoaded' before the init function (which will be inside the {} of the eventListener))
5. create a render function
6. create an async function to fetch the events and put them in a list on the page
7. create a button for each party in the list
8. create an eventListener that is attached to each delete button
9. create an eventListener for the form to add new parties to the list
 */

// Step 2:
const baseUrl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/COHORT_CODE/events'

// Step 1:
const state = {
    events: [],
}

// Step 3:
const root = document.querySelector('#root');

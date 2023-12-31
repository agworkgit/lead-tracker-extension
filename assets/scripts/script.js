const inputBtn = document.querySelector("#input-btn");
const deleteBtn = document.querySelector("#delete-btn");
const tabBtn = document.querySelector("#tab-btn");

let myLeads = [];
// myLeads = JSON.stringify(myLeads); // swap to string
// myLeads = JSON.parse(myLeads); // swap to array

const inputEl = document.querySelector("#input-el");
let listEl = document.querySelector("#list-el");

const leadsFromLocal = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocal) { // if truthy, this code will run
    myLeads = leadsFromLocal;
    render(myLeads);
}

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
        <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
        <a/>
        </li>`;
    }
    listEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    // clear out the input field
    inputEl.value = "";
    // save locally
    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    render(myLeads);
});

// by default use const, if it must be changed use let

// delete btn function - clears local storage, myLeads and DOM

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

// tab btn event listener
// chrome tab api
//grab url of current tab below
tabBtn.addEventListener("click", function() {
/*     chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        let activeTab = tabs[0];
      }); */
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
});

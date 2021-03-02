const errMsg = document.querySelector("#errMsg");
const divRecords = document.querySelector("div#records");

const reloadRecords = async () => {
    let records;
    // AJAX call
    try {
        const res = await fetch("/records");
        records = await res.json();
    } catch (e) {
        errMsg.textContent = "Error getting records";
        errMsg.style.display = "block";
        console.log(e);
        return;
    }

    console.log("Got results", records);
    divRecords.textContent = "Gotttttt dataaaaaaa";
};

reloadRecords();

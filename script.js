// Function that loads and displays all makes in the dropdown options
function loadMakes() {
    fetch("database.php?action=get_makes")
        .then(response => response.json())
        .then(data => {
            let makeSelect = document.getElementById("make");
            data.forEach(make => {
                makeSelect.innerHTML += `<option value="${make}">${make}</option>`;
            });
        });
}

// Function that loads and displays all models respective to selected make in the dropdown options
function loadModels() {
    let make = document.getElementById("make").value;
    // If no make is chosen, remove the following options
    if (make === "") {
        document.getElementById("model-container").innerHTML = "";
        document.getElementById("type-container").innerHTML = "";
        document.getElementById("part-number-container").innerHTML = "";
        return;
    }
    // Display the model options with chosen make
    fetch(`database.php?action=get_models&make=${encodeURIComponent(make)}`)
        .then(response => response.json())
        .then(data => {
            let modelContainer = document.getElementById("model-container");
            modelContainer.innerHTML = `Model:
                                    <select id="model" onchange="loadTypes()">
                                        <option value="">Select Model</option>
                                    </select>`;
            let modelSelect = document.getElementById("model");
            data.forEach(model => {
                modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
            });
            // Remove type and part number since model not selected yet
            document.getElementById("type-container").innerHTML = "";
            document.getElementById("part-number-container").innerHTML = "";
        });
}

// Function that loads and displays all types respective to selected make and model in the dropdown options
function loadTypes() {
    let make = document.getElementById("make").value;
    let model = document.getElementById("model").value;
    // If no model is chosen, remove the following options
    if (model === "") {
        document.getElementById("type-container").innerHTML = "";
        document.getElementById("part-number-container").innerHTML = "";
        return;
    }
    // Display the type options with chosen make and model
    fetch(`database.php?action=get_types&make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}`)
        .then(response => response.json())
        .then(data => {
            let typeContainer = document.getElementById("type-container");
            typeContainer.innerHTML = `Type:
                                    <select id="type" onchange="loadPartNo()">
                                        <option value="">Select Type</option>
                                    </select>`;
            let typeSelect = document.getElementById("type");
            data.forEach(type => {
                typeSelect.innerHTML += `<option value="${type}">${type}</option>`;
            });
            // Remove part number since type not selected yet
            document.getElementById("part-number-container").innerHTML = "";
        });
}

// Function that loads and displays all part numbers respective to selected make, model and type
function loadPartNo() {
    let make = document.getElementById("make").value;
    let model = document.getElementById("model").value;
    let type = document.getElementById("type").value;
    if (type === "") {
        document.getElementById("part-number-container").innerHTML = "";
        return;
    }
    // Display the part numbers with chosen make, model and type
    fetch(`database.php?action=get_partNo&make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&type=${encodeURIComponent(type)}`)
        .then(response => response.json())
        .then(data => {
            let partNoContainer = document.getElementById("part-number-container");
            partNoContainer.innerHTML = "Part Numbers: ";
            data.forEach(partNo => {
                partNoContainer.innerHTML += `${partNo} `;
            });
        });
}

// Load make options once window loads
window.onload = function () {
    loadMakes();
};

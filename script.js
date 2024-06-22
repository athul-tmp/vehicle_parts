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

function loadModels() {
    let make = document.getElementById("make").value;
    if (make === "") {
        document.getElementById("model-container").innerHTML = "";
        document.getElementById("type-container").innerHTML = "";
        document.getElementById("part-number-container").innerHTML = "";
        return;
    }
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
            document.getElementById("type-container").innerHTML = "";
            document.getElementById("part-number-container").innerHTML = "";
        });
}

function loadTypes() {
    let make = document.getElementById("make").value;
    let model = document.getElementById("model").value;
    if (model === "") {
        document.getElementById("type-container").innerHTML = "";
        document.getElementById("part-number-container").innerHTML = "";
        return;
    }
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
            document.getElementById("part-number-container").innerHTML = "";
        });
}

function loadPartNo() {
    let make = document.getElementById("make").value;
    let model = document.getElementById("model").value;
    let type = document.getElementById("type").value;
    if (type === "") {
        document.getElementById("part-number-container").innerHTML = "";
        return;
    }
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

window.onload = function () {
    loadMakes();
};

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
        });
}

window.onload = function () {
    loadMakes();
};

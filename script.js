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

window.onload = function () {
    loadMakes();
};

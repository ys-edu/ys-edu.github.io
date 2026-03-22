// listener for zip code text
document.querySelector("#zip").addEventListener("change", displayCity);

// displayCity() fetches data from web API and displays information after user enters a zip code
async function displayCity() {
    //alert(document.querySelector("#zip").value);
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
}
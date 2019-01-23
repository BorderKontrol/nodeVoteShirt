document.getElementById("authcode").value = window.location.pathname.slice(1);

var modalimg = document.getElementById("modalimg");
var modal = document.getElementById("modal");
var items = document.getElementsByClassName("items");

for(var i = 0; i < items.length; i++){
    var item = items.item(i);
    item.addEventListener("click", function(event) {
        modalimg.src = encodeURIComponent("/__static/images/" + event.currentTarget.textContent + ".jpg");
        modal.style.display = "block";
    });
}

modal.addEventListener("click", function(event) {
    modal.style.display = "none";
});
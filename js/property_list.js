window.addEventListener("load", function () {
    var filterBar = document.querySelector(".filter-bar");
    var sortButtons = filterBar ? filterBar.querySelectorAll(".col-auto") : [];
    var pageContainer = document.querySelector(".page-container");

    function getRent(card) {
        var rentEl = card.querySelector(".rent");
        if (!rentEl) return 0;
        return parseFloat(rentEl.textContent.replace(/[^\d]/g, "")) || 0;
    }

    function sortCards(order) {
        var cards = Array.from(document.querySelectorAll(".property-card"));
        cards.sort(function (a, b) {
            return order === "asc" ? getRent(a) - getRent(b) : getRent(b) - getRent(a);
        });
        cards.forEach(function (card) { pageContainer.appendChild(card); });
    }

    sortButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var text = btn.querySelector("span") ? btn.querySelector("span").textContent.trim() : "";
            if (text === "Highest rent first") {
                sortCards("desc");
                sortButtons.forEach(function (b) { b.style.background = ""; b.style.color = ""; });
                btn.style.background = "#f0f0ff";
                btn.style.color = "#667eea";
            } else if (text === "Lowest rent first") {
                sortCards("asc");
                sortButtons.forEach(function (b) { b.style.background = ""; b.style.color = ""; });
                btn.style.background = "#f0f0ff";
                btn.style.color = "#667eea";
            }
        });
    });


    var is_interested_images = document.getElementsByClassName("is-interested-image");
    Array.from(is_interested_images).forEach(element => {
        element.addEventListener("click", function (event) {
            var XHR = new XMLHttpRequest();
            var property_id = event.target.getAttribute("property_id");

            // On success
            XHR.addEventListener("load", toggle_interested_success);

            // On error
            XHR.addEventListener("error", on_error);

            // Set up request
            XHR.open("GET", "api/toggle_interested.php?property_id=" + property_id);

            // Initiate the request
            XHR.send();

            document.getElementById("loading").style.display = 'block';
            event.preventDefault();
        });
    });
});

var toggle_interested_success = function (event) {
    document.getElementById("loading").style.display = 'none';

    var response = JSON.parse(event.target.responseText);
    if (response.success) {
        var property_id = response.property_id;

        var is_interested_image = document.querySelectorAll(".property-id-" + property_id + " .is-interested-image")[0];
        var interested_user_count = document.querySelectorAll(".property-id-" + property_id + " .interested-user-count")[0];

        if (response.is_interested) {
            is_interested_image.classList.add("fas");
            is_interested_image.classList.remove("far");
            interested_user_count.innerHTML = parseFloat(interested_user_count.innerHTML) + 1;
        } else {
            is_interested_image.classList.add("far");
            is_interested_image.classList.remove("fas");
            interested_user_count.innerHTML = parseFloat(interested_user_count.innerHTML) - 1;
        }
    } else if (!response.success && !response.is_logged_in) {
        window.$("#login-modal").modal("show");
    }
};

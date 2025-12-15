
jQuery(document).ready(function () {
  // startOwlSlider();
  setHamburgerActiveToggle();
});
jQuery(window).scroll(function () {
  // hideOnScroll();
});
jQuery(window).resize(function () {
});

function setHamburgerActiveToggle() {
  jQuery(".hamburger").on("click", function () {
    jQuery(".hamburger").addClass("is-active");
    jQuery("#nav-items").addClass("is-active");
    jQuery("body, html").addClass("stop-scrolling");
  });
  jQuery("#cross").on("click", function () {
    jQuery(".hamburger").removeClass("is-active");
    jQuery("#nav-items").removeClass("is-active");
    jQuery("body, html").removeClass("stop-scrolling");
  });
}

function hideOnScroll() {
  //needs work
  var currentScrollTop = jQuery(window).scrollTop();
  if (togglePosition < currentScrollTop && togglePosition > 180 && !isMobile) {
    mainHeader.addClass("hide");
  } else {
    mainHeader.removeClass("hide");
  }
  togglePosition = currentScrollTop;
}

function startOwlSlider() {
  jQuery(".owl-carousel").owlCarousel({
    dots: false,
    nav: true,
    margin: 12,
    navText: [
      '<img class="checkmark" src="/wp-content/themes/valkentij-theme/images/check.svg" alt="checkmark icon">',
      '<img class="checkmark" src="/wp-content/themes/valkentij-theme/images/check.svg" alt="checkmark icon">',
    ],
    responsive: {
      0: {
        items: 1,
        stagePadding: 32,
      },
      768: {
        items: 2,
      },
      1199: {
        items: 3,
      },
    },
  });
}

// AJAX FILTERS
function postcodeAutofill() {
  console.log("main.js loaded");
  jQuery("#input_3_7").on("change", function () {
    console.log("input jquery hi!");

    // Get the value from the input field
    var postcodeValue = jQuery("#input_3_3").val();
    var houseNumberValue = jQuery(this).val();

    jQuery.ajax({
      // Use the input value in the URL
      url:
        "https://postcode.tech/api/v1/postcode?postcode=" +
        encodeURIComponent(postcodeValue) +
        "&number=" +
        encodeURIComponent(houseNumberValue),
      headers: {
        Authorization: "Bearer 28d9bd81-3f4d-4cec-a05d-4ec732e9f578",
      },
      method: "GET",

      success: function (data) {
        jQuery("#input_3_5").val(data.city);
        // Handle the successful response
        console.log(data);
        // Populate Gravity Forms fields with the received data
        // populateGravityFormsFields(data);
      },
      error: function (error) {
        // Handle errors
        console.error("Error fetching KVK data:", error);
      },
    });
  });
}
function setOnBtnAjaxFilter() {
  jQuery(".filter-change").on("change", function () {
    jQuery("#all-projects").addClass("fade-out");
    jQuery("#loader").show();

    jQuery.ajax({
      //object from functions.php
      url: ajax_object.ajax_url,
      type: "POST",
      data: {
        action: "filter_projects",
        filters: {
          budget: {
            budgetFrom: jQuery("input[name='budget-from']").val(),
            budgetTo: jQuery("input[name='budget-to']").val(),
            field: "budget",
          },
          stays: {
            staysAmount: jQuery("#filter-stays").val(),
            field: "aantal_nachten",
          },
          people: {
            peopleAmount: jQuery("#filter-people").val(),
            field: "max_aantal_bruiloftsgasten",
          },
        },
      },
      success: function (response) {
        var responseData = JSON.parse(response);
        var htmlContent = responseData.html;
        var postCount = responseData.postCount;

        jQuery("#loader").hide();
        jQuery("#all-projects").html(htmlContent);
        jQuery("#all-projects").css("opcacity", 1);
        jQuery("#all-projects").removeClass("fade-out");
        jQuery("#filter-results").text(postCount);
      },
    });
  });
}


/* =========================
   NAVIGATION FUNCTIONS
========================= */

function initNavigation() {
  var $ = jQuery;

  console.log("initNavigation called");

  // Toggle mobile menu
  $("#menuToggle").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Menu toggle clicked!");
    toggleMenu();
  });

  // Close menu when clicking overlay
  $("#mobileOverlay").on("click", function () {
    console.log("Overlay clicked!");
    toggleMenu();
  });

  // Handle dropdown clicks on mobile
  $(".menu-item-has-children > a").on("click", function (e) {
    if ($(window).width() <= 991) {
      var $parent = $(this).parent();
      var $submenu = $parent.find(".sub-menu").first();

      if ($submenu.length > 0) {
        e.preventDefault();
        console.log("Dropdown toggled");

        // Close other open dropdowns
        $(".menu-item-has-children").not($parent).removeClass("active");

        // Toggle this dropdown
        $parent.toggleClass("active");
      }
    }
  });

  // Keyboard accessibility
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $("#mainNav").hasClass("active")) {
      console.log("Escape pressed");
      toggleMenu();
    }
  });
}

function toggleMenu() {
  var $ = jQuery;

  console.log("toggleMenu called");

  $("#menuToggle").toggleClass("active");
  $("#mainNav").toggleClass("active");
  $("#mobileOverlay").toggleClass("active");

  // Update aria-expanded for accessibility
  var isActive = $("#mainNav").hasClass("active");
  $("#menuToggle").attr("aria-expanded", isActive);

  if (isActive) {
    $("body").css("overflow", "hidden");
    console.log("Menu opened");
  } else {
    $("body").css("overflow", "");
    // Close all dropdowns when closing menu
    $(".menu-item-has-children").removeClass("active");
    console.log("Menu closed");
  }
}

/* =========================
   HAMBURGER MENU (Legacy)
========================= */

// function setHamburgerActiveToggle() {
//   var $ = jQuery;

//   $(".hamburger").on("click", function () {
//     $(".hamburger").addClass("is-active");
//     $("#nav-items").addClass("is-active");
//     $("body, html").addClass("stop-scrolling");
//   });

//   $("#cross").on("click", function () {
//     $(".hamburger").removeClass("is-active");
//     $("#nav-items").removeClass("is-active");
//     $("body, html").removeClass("stop-scrolling");
//   });
// }

/* =========================
   SCROLL FUNCTIONS
========================= */

function hideOnScroll() {
  var $ = jQuery;
  var currentScrollTop = $(window).scrollTop();
  var mainHeader = $(".site-header");
  var isMobile = $(window).width() <= 991;
  var togglePosition = 0;

  if (togglePosition < currentScrollTop && togglePosition > 180 && !isMobile) {
    mainHeader.addClass("hide");
  } else {
    mainHeader.removeClass("hide");
  }

  togglePosition = currentScrollTop;
}



/* =========================
   AJAX FILTERS
========================= */

function setOnBtnAjaxFilter() {
  var $ = jQuery;

  $(".filter-change").on("change", function () {
    console.log("Filter changed");

    // Add fade-out effect
    $("#all-projects").addClass("fade-out");
    $("#loader").show();

    $.ajax({
      // ajax_object comes from wp_localize_script in functions.php
      url: ajax_object.ajax_url,
      type: "POST",
      data: {
        action: "filter_projects",
        nonce: ajax_object.nonce, // Add nonce for security
        filters: {
          budget: {
            budgetFrom: $("input[name='budget-from']").val(),
            budgetTo: $("input[name='budget-to']").val(),
            field: "budget",
          },
          stays: {
            staysAmount: $("#filter-stays").val(),
            field: "aantal_nachten",
          },
          people: {
            peopleAmount: $("#filter-people").val(),
            field: "max_aantal_bruiloftsgasten",
          },
        },
      },
      success: function (response) {
        console.log("AJAX filter success");

        try {
          var responseData = JSON.parse(response);
          var htmlContent = responseData.html;
          var postCount = responseData.postCount;

          $("#loader").hide();
          $("#all-projects").html(htmlContent);
          $("#all-projects").css("opacity", 1);
          $("#all-projects").removeClass("fade-out");
          $("#filter-results").text(postCount);
        } catch (e) {
          console.error("Error parsing AJAX response:", e);
          $("#loader").hide();
          $("#all-projects").removeClass("fade-out");
        }
      },
      error: function (xhr, status, error) {
        console.error("AJAX filter error:", error);
        $("#loader").hide();
        $("#all-projects").removeClass("fade-out");

        // Optional: Show error message to user
        // $("#all-projects").html('<p class="error-message">Er is een fout opgetreden. Probeer het opnieuw.</p>');
      },
    });
  });
}

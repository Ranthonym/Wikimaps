$(document).ready(() => {
  console.log("Form Ready");
  $(".nav-item").hide();

  //create map handling
  // $('#map-form').toggle();
  $("#create-map-cancel").click(e => {
    e.preventDefault();
    $("#create-map-div").toggle();
  });
  $("#create-map-submit").click(e => {
    $("#create-map-div").toggle();
  });
  $("#nav-create-map").click(e => {
    $("#create-map-div").toggle();
  });

  $("#input-form").submit(e => {
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "/login",
      data: { input: $("#input-form input").val() }
    })
      .then(res => {
        if (res === "email validated") {
          $("#input-form input")
            .attr("name", "password")
            .attr("type", "password")
            .attr("placeholder", "********")
            .val("");
          $("#login-button").show(500);
          $("#logout-button")
            .addClass('btn-warning')
            .removeClass('btn-dark')
            .text("Back")
            .show(500);
          $("#register-button").hide(500);
          $(".error-message").hide(500);
          $(".nav-item").hide(500);
          return;
        }
        if (res.text === "password validated") {
          const capitalName = res.name
            .split("")
            .map((el, i) => (i === 0 ? el.toUpperCase() : el))
            .join("");
          console.log(capitalName);
          const html = `Welcome <span id="logged-name">${capitalName}   </span>`;
          $("#input-form input")
            .attr("name", "email")
            .attr("type", "email")
            .attr("placeholder", "example@email.com")
            .val("")
            .hide(500);
          $("#form-msg").html(html);
          $("#login-button").hide(500);
          $("#logout-button")
            .text("Logout")
            .show(500);
          $("#register-button").hide(500);
          $(".error-message").hide();
          $(".nav-item").show(500);
          return "";
        }
        return;
      })
      .catch(e => {
        console.log("error", e);
        const errorMSG = e.responseText;
        $(".error-message").hide();
        $("#form-msg")
          .before(`<span class='error-message text-danger'>${errorMSG} </span>`)
          .show(500);
      });
  });

  $("#logout-button").click(e => {
    $.ajax({
      type: "POST",
      url: "/logout"
    }).then(() => {
      console.log("logout");
      $(".error-message").hide();
      $("#input-form input")
        .attr("name", "email")
        .attr("type", "email")
        .attr("placeholder", "example@email.com")
        .val("")
        .show(500);
      $("#form-msg").text("Enter Email:  ");
      $("#register-button").show(500);
      $(".nav-item").hide(500);
      $("#login-button").hide(500);
      $("#logout-button").addClass('btn-dark').removeClass('btn-warning');
      return;
    });
  });

  //works bring user specific map back and front
  $("#map")
    .css("z-index", 5)
    .css("filter", "invert(1)");
  $("#map")
    .css("z-index", -1000)
    .css("filter", "invert(1) blur(1.1px)");
});

// ----- NOTES FOR LUCAS
//     $('#input-form').html()
// "
//         <input class=\"form-control\" name=\"login-email\" type=\"email\" placeholder=\"example@email.com\">
//       "
// $('#input-form input').val()
// "cekancelucas@gmail.com"
// $('#input-form input').before('<i>Hello<i>')
// Object { 0: input.form-control
// , length: 1, prevObject: {…} }

// $('#input-form').before('<i>Hello<i>')
// Object { 0: form#input-form.form-control.form-control-lg.form-inline, length: 1 }
/*
  <input type="color" id="head" name="head"
             value="#e66465"></input> */
// https://developers.google.com/maps/documentation/javascript/styling

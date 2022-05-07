function myFunction() {
    var x = document.getElementById("myNav");
    if (x.className === "menu") {
      x.className += " responsive";
    } else {
      x.className = "menu";
    }
  }
(function () {
	'use strict';

	var toggles = document.querySelectorAll(".nav-toggle");

	for (var i = toggles.length - 1; i >= 0; i--) {
		var toggle = toggles[i];

		toggle.addEventListener("click", toggleHandler)
	}

	function toggleHandler(e) {
		e.preventDefault();

		var isActive = this.classList.contains("is-active");
		var classAction = (isActive) ? "remove" : "add";
		var navMenus = document.querySelectorAll('.nav-menu');

		this.classList[classAction]("is-active");

		for (var n = navMenus.length - 1; n >= 0; n--) {
			var navMenu = navMenus[n];

			navMenu.classList[classAction]("is-active");
		}
	}
})();
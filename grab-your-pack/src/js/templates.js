define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["page1"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div data-role=\"header\">\n    <a href=\"#\" data-icon=\"back\" class=\"back ui-btn-left\">Back</a>\n    <h1>Page 1</h1>\n</div>\n\n<div class=\"ui-content\" role=\"main\">\n    <p>This is Page 1. It was created dynamically using an underscore.js template.</p>\n    <p>Navigate to:</p>\n    <ul data-role=\"listview\" data-inset=\"true\">\n        <li><a href=\"#\">Home</a></li>\n        <li><a href=\"#page2\">Page 2</a></li>\n    </ul>\n</div>\n";
},"useData":true});

this["JST"]["page2"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div data-role=\"header\">\n    <a href=\"#\" data-icon=\"back\" class=\"back ui-btn-left\">Back</a>\n    <h1>Page 2</h1>\n</div>\n\n<div class=\"ui-content\" role=\"main\">\n    <p>This is Page 2. It was created dynamically using an underscore.js template.</p>\n    <p>Navigate to:</p>\n    <ul data-role=\"listview\" data-inset=\"true\">\n        <li><a href=\"#\">Home</a></li>\n        <li><a href=\"#page1\">Page 1</a></li>\n    </ul>\n</div>\n";
},"useData":true});

this["JST"]["tutorial"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!--\nTutorial Page\n-->\n<!-- <div id=\"tutorial-page\" class=\"tutorial-page swipeable\"> -->\n    <div data-role=\"header\" id=\"transparent-header\">\n        <h3>GrabYourPack</h3>\n    </div>\n\n    <div role=\"main\" class=\"ui-content\">\n        <div id=\"tutorial-01\" class=\"visible-page\">\n            <h3 class=\"tutorial-title\">Are you waiting for that so special package?</h3>\n            <p class=\"tutorial-paragraph\">Let your good neighbors notify you as soon as it gets delivered.</p>\n        </div>\n\n        <div id=\"tutorial-02\" class=\"hidden-page\">\n            <h3 class=\"tutorial-title\">The end of missed deliveries.</h3>\n            <p class=\"tutorial-paragraph\"> Forget the worries of not knowing when your package is delivered.</p>\n        </div>\n\n\n        <div id=\"tutorial-03\" class=\"hidden-page\">\n            <h3 class=\"tutorial-title\">Get ready to never miss a package delivery again.</h3>\n            <p class=\"tutorial-paragraph\">Get to know the exact time your package is in your front door.</p>\n        </div>\n\n        <div class=\"swipe-dot-view\" align=\"center\">\n            <span class=\"swipe-dot current\"></span>\n            <span class=\"swipe-dot\"></span>\n            <span class=\"swipe-dot\"></span>\n        </div>\n    </div>\n\n    <div id=\"tutorial-footer\" data-role=\"footer\" data-position=\"fixed\">\n        <fieldset class=\"ui-grid-a\">\n            <div class=\"ui-block-a\">\n                <a id=\"tutorial-sign-up\" href=\"#signup-page\" class=\"ui-btn\" data-transition=\"slide\" data-theme=\"a\">Sign Up</a>\n            </div>\n            <div class=\"ui-block-b\">\n                <a id=\"tutorial-sign-up\"  href=\"#choose-login-signup-page\" class=\"ui-btn\" data-transition=\"slide\" data-theme=\"a\">Log In</a>\n            </div>\n        </fieldset>\n    </div>\n<!-- </div> -->\n";
},"useData":true});

return this["JST"];

});
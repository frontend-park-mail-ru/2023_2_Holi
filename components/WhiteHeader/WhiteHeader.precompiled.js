(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['WhiteHeader.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<header-reg>\n    <div class=\"header-content\">\n        <div class=\"row\">\n            <div class=\"col justify-content-start\">\n                <img class=\"w-25 ps-2\" src=\"/img/logo.svg\" alt=\"logo\">\n            </div>\n\n            <div class=\"signIn-element\">\n                <a href=\"#\" class=\"signIn-link\">Войти</a>\n            </div>\n        </div>\n    </div>\n</header-reg>\n";
},"useData":true});
})();
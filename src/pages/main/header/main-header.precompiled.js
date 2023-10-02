(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['main-header.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"header-content\">\r\n    <div class=\"row\">\r\n        <div class=\"col justify-content-start\">\r\n            <img src=\"/img/logo.svg\" alt=\"logo\">\r\n        </div>\r\n\r\n        <div class=\"col d-flex justify-content-end\">\r\n            <a href=\"#\" class=\"btn btn-signIn\">Войти</a>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"useData":true});
})();
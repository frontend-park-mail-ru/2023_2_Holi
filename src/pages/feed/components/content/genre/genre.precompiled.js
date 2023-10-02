(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['genre.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <a href=\"/feed/"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" data-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" class=\"ms-2 genre-card-link\"\r\n            data-link>\r\n            <div class=\"genre-card\">\r\n\r\n                <img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"img") : depth0), depth0))
    + "\" alt>\r\n            </div>\r\n        </a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"ms-4\">\r\n    <h1 >"
    + alias4(((helper = (helper = lookupProperty(helpers,"genreTitle") || (depth0 != null ? lookupProperty(depth0,"genreTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"genreTitle","hash":{},"data":data,"loc":{"start":{"line":2,"column":9},"end":{"line":2,"column":23}}}) : helper)))
    + "</h1>\r\n</div>\r\n<div class=\"genre-carousel\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id_carousel") || (depth0 != null ? lookupProperty(depth0,"id_carousel") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id_carousel","hash":{},"data":data,"loc":{"start":{"line":4,"column":32},"end":{"line":4,"column":47}}}) : helper)))
    + "\">\r\n    <div class=\"genre-card-container\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id_container") || (depth0 != null ? lookupProperty(depth0,"id_container") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id_container","hash":{},"data":data,"loc":{"start":{"line":5,"column":42},"end":{"line":5,"column":58}}}) : helper)))
    + "\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"genreContent") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":14,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n</div>";
},"useData":true});
})();
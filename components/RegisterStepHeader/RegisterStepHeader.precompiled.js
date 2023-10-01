(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['RegisterStepHeader.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + " ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<content-fragment>\n    <span class=\"step-indicator "
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"spanClasses") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":32},"end":{"line":2,"column":72}}})) != null ? stack1 : "")
    + "\">\n        ШАГ\n        <b>1</b>\n        ИЗ\n        <b>3</b>\n    </span>\n    <h1 class=\"mt-0 "
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"headerClasses") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":20},"end":{"line":8,"column":62}}})) != null ? stack1 : "")
    + "\">\n        "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"headerText") || (depth0 != null ? lookupProperty(depth0,"headerText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"headerText","hash":{},"data":data,"loc":{"start":{"line":9,"column":8},"end":{"line":9,"column":22}}}) : helper)))
    + "\n    </h1>\n</content-fragment>";
},"useData":true});
})();
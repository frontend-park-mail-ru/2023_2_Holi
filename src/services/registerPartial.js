/* global Handlebars */

export const registerComponents = () => {
    Handlebars.registerPartial('btn-link', Handlebars.templates['btn-link.hbs']);
    Handlebars.registerPartial('netflix-logo', Handlebars.templates['netflix-logo.hbs']);
    Handlebars.registerPartial('avatar', Handlebars.templates['avatar.hbs']);
    Handlebars.registerPartial('partial-header', Handlebars.templates['partial-header.hbs']);
    Handlebars.registerPartial('partial-footer', Handlebars.templates['partial-footer.hbs']);
    Handlebars.registerPartial('main-background', Handlebars.templates['main-background.hbs']);
    Handlebars.registerPartial('input-control', Handlebars.templates['input-control.hbs']);
    Handlebars.registerPartial('main-form', Handlebars.templates['main-form.hbs']);
    Handlebars.registerPartial('button', Handlebars.templates['button.hbs']);
    Handlebars.registerPartial('main-banner', Handlebars.templates['main-banner.hbs']);
    Handlebars.registerPartial('login-form', Handlebars.templates['login-form.hbs']);
    Handlebars.registerPartial('login-background', Handlebars.templates['login-background.hbs']);
    Handlebars.registerPartial('main-content', Handlebars.templates['main-content.hbs']);
    Handlebars.registerPartial('start-register-form', Handlebars.templates['start-register-form.hbs']);
    Handlebars.registerPartial('register-form', Handlebars.templates['register-form.hbs']);
    Handlebars.registerPartial('btn-action', Handlebars.templates['btn-action.hbs']);
    Handlebars.registerPartial('feed-preview', Handlebars.templates['feed-preview.hbs']);
    Handlebars.registerPartial('feed-collection', Handlebars.templates['feed-collection.hbs']);
    Handlebars.registerPartial('player', Handlebars.templates['player.hbs']);
    Handlebars.registerPartial('profile-form', Handlebars.templates['profile-form.hbs']);
    Handlebars.registerPartial('video-item', Handlebars.templates['video-item.hbs']);
};

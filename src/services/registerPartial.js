/* global Handlebars */
import btnLink from '../../dist/btn-link.js';
import logo from '../../dist/netflix-logo.js';
import header from '../../dist/partial-header.js';
import footer from '../../dist/partial-footer.js';
import avatar from '../../dist/avatar.js';
import mBackground from '../../dist/main-background.js';
import iControl from '../../dist/input-control.js';
import mainForm from '../../dist/main-form.js';
import button from '../../dist/button.js';
import banner from '../../dist/main-banner.js';
import mCont from '../../dist/main-content.js';
import lForm from '../../dist/login-form.js';
import lBack from '../../dist/login-background.js';
import sRegF from '../../dist/start-register-form.js';
import ferGorm from '../../dist/register-form.js';
import btnAct from '../../dist/btn-action.js';
import feedPrev from '../../dist/feed-preview.js';
import profF from '../../dist/profile-form.js';

export const registerComponents = () => {
    Handlebars.registerPartial('btn-link', btnLink);
    Handlebars.registerPartial('netflix-logo', logo);
    Handlebars.registerPartial('avatar', avatar);
    Handlebars.registerPartial('partial-header', header);
    Handlebars.registerPartial('partial-footer', footer);
    Handlebars.registerPartial('main-background', mBackground);
    Handlebars.registerPartial('input-control', iControl);
    Handlebars.registerPartial('button', button);
    Handlebars.registerPartial('main-banner', banner);
    Handlebars.registerPartial('login-form', lForm);
    Handlebars.registerPartial('login-background', lBack);
    Handlebars.registerPartial('main-content', mCont);
    Handlebars.registerPartial('start-register-form', sRegF);
    Handlebars.registerPartial('register-form', ferGorm);
    Handlebars.registerPartial('btn-action', btnAct);
    Handlebars.registerPartial('feed-preview', feedPrev);
    Handlebars.registerPartial('profile-form', profF);
};

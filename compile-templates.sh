mkdir dist &&
handlebars src/pages/login/components/footer/footer.hbs -f dist/footer.precompiled.js && 
handlebars src/pages/login/components/header/header-login.hbs -f dist/header-login.precompiled.js && 
handlebars src/pages/login/components/body/body.hbs -f dist/body.precompiled.js &&
handlebars src/pages/feed/components/footer/footer-feed.hbs -f dist/footer-feed.precompiled.js &&
handlebars src/pages/feed/components/header/header-feed.hbs -f dist/header-feed.precompiled.js &&
handlebars src/pages/feed/components/content/feed-content-main.hbs -f dist/feed-content-main.precompiled.js &&
handlebars src/pages/feed/components/content/genre/genre.hbs -f dist/genre.precompiled.js &&
handlebars src/pages/register/components/AlreadyCreatedPasswordContent/AlreadyCreatedPasswordContent.hbs -f dist/AlreadyCreatedPasswordContent.precompiled.js &&
handlebars src/pages/register/components/CreatePasswordContent/CreatePasswordContent.hbs -f dist/CreatePasswordContent.precompiled.js &&
handlebars src/pages/register/components/EmailPreferenceContainer/EmailPreferenceContainer.hbs -f dist/EmailPreferenceContainer.precompiled.js &&
handlebars src/pages/register/components/FinishAccContent/FinishAccContent.hbs -f dist/FinishAccContent.precompiled.js &&
handlebars src/pages/register/components/FormInput/FormInput.hbs -f dist/FormInput.precompiled.js &&
handlebars src/pages/register/components/FormList/FormList.hbs -f dist/FormList.precompiled.js &&
handlebars src/pages/register/components/Header/Header.hbs -f dist/Header.precompiled.js &&
handlebars src/pages/register/components/LinkForgotPassword/LinkForgotPassword.hbs -f dist/LinkForgotPassword.precompiled.js &&
handlebars src/pages/register/components/NetflixLogo/NetflixLogo.hbs -f dist/NetflixLogo.precompiled.js &&
handlebars src/pages/register/components/RegFooter/RegFooter.hbs -f dist/RegFooter.precompiled.js &&
handlebars src/pages/register/components/RegisterContextBody/RegisterContextBody.hbs -f dist/RegisterContextBody.precompiled.js &&
handlebars src/pages/register/components/RegisterStepHeader/RegisterStepHeader.hbs -f dist/RegisterStepHeader.precompiled.js &&
handlebars src/pages/register/components/SignInLink/SignInLink.hbs -f dist/SignInLink.precompiled.js &&
handlebars src/pages/register/components/SubmitRegisterButton/SubmitRegisterButton.hbs -f dist/SubmitRegisterButton.precompiled.js &&
handlebars src/pages/main/main-page.hbs -f dist/main-page.precompiled.js
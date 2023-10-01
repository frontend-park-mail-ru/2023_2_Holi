
export class LoginBody {

    render() {
        const template = Handlebars.templates['body.hbs'];
        return template();
    }
}

window.link = function(event){
    console.log(event)
    event.preventDefault();
    history.pushState(null, null, '/feed');

}
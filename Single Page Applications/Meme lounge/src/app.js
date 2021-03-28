import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import {logout} from './api/data.js';

import {homePage} from './views/home.js';
import {loginPage} from './views/login.js';
import {registerPage} from './views/register.js';
import {catalogPage} from './views/catalog.js';
import {detailsPage} from './views/details.js';
import {createPage} from './views/create.js';
import {editPage} from './views/edit.js';
import {myPage} from './views/my-profile.js';
import {notify} from './notification.js';

const main = document.querySelector('main');

page('/', decorateContext, homePage);
page('/home', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/catalog', decorateContext, catalogPage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/my-profile', decorateContext, myPage);

page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

setUserNav();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/');
})

function setUserNav(){
    let userId = sessionStorage.getItem('userId');
    let email = sessionStorage.getItem('email');

    if(userId != null){
    document.querySelector('.user').style.display = '';
    document.querySelector('.guest').style.display = 'none';
    document.getElementById('welcomeSpan').textContent = `Welcome, ${email}`;
    }else{
    document.querySelector('.user').style.display = 'none';
    document.querySelector('.guest').style.display = '';
    }
}
import * as topic from './topic.js'

async function onSubmit(event){
    event.preventDefault();
    let title = document.querySelectorAll('input')[0];
    let username = document.querySelectorAll('input')[1];
    let post = document.querySelector('textarea');
  
    var d = new Date("2011-04-20T09:30:51.01");

    let data = {
        title: title.value,
        username: username.value,
        post: post.value,
        date: d,
        subscribers: 100
    }

    let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    title.value = '';
    username.value = '';
    post.value = '';

    
   if(response.ok){
    const data = await response.json();
    let posts = document.getElementById('posts');
    
    let currPost = document.createElement('div');
    currPost.classList.add('topic-container');
    currPost.innerHTML = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <a href="#" class="normal">
                <h2>${data.title}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${data.date}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${data.username}</span></p>
                    </div>
                </div>
                <div class="subscribers">
                    <!-- <button class="subscribe">Subscribe</button> -->
                    <p>Subscribers: <span>${data.subscribers}</span></p>
                </div>
            </div>
        </div>
    </div>`;
    posts.appendChild(currPost);

    }else{
    const error = await response.json();
    alert(error.message);
    }
}



let main;
let section

export function setupCreate(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    loadPosts();
    document.getElementById('cancel').addEventListener('click', (event) => {
        event.preventDefault();
        let title = document.querySelectorAll('input')[0];
        let username = document.querySelectorAll('input')[1];
        let post = document.querySelector('textarea');

        title.value = '';
        username.value = '';
        post.value = '';
    });

    const form = document.getElementById('create-post');
    form.addEventListener('submit', onSubmit);
}

export async function showCreate() {
    main.innerHTML = '';
    main.appendChild(section);
}

async function loadPosts(){
    let posts = document.getElementById('posts');
    
    let url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
    let response = await fetch(url);
    let data = await response.json();

    Object.values(data).map(v => {
    let currPost = document.createElement('div');
    currPost.classList.add('topic-container');
    currPost.innerHTML = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <a href="#" class="normal">
                <h2>${v.title}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${v.date}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${v.username}</span></p>
                    </div>
                </div>
                <div class="subscribers">
                    <!-- <button class="subscribe">Subscribe</button> -->
                    <p>Subscribers: <span>${v.subscribers}</span></p>
                </div>
            </div>
        </div>
    </div>`;
    posts.appendChild(currPost);
    currPost.addEventListener('click', (event) => {
        event.preventDefault();
        topic.createComment(v);
    })
    })
}
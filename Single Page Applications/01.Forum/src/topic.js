let main;
let section;

export function setupTopics(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function createComment(data){
    console.log(data);
    let commentContainer = document.getElementById('commentContainer');
    let topicContent = document.createElement('div');
    topicContent.classList.add('topic-content');

    topicContent.innerHTML =  
    `
        <!-- topic-title  -->
        <div class="topic-title">
            <div class="topic-name-wrapper">
                <div class="topic-name">
                    <h2>${data.title}</h2>
                    <p>Date: <time>${data.date}</time></p>
                </div>
                <div class="subscribers">
                    <p>Subscribers: <span>${data.subscribers}</span></p>
                    <!-- <button class="subscribe">Subscribe</button>
                    <button class="unsubscribe">Unsubscribe</button> -->
                </div>`;

    async function loadComments(){
        let url = 'http://localhost:3030/jsonstore/collections/myboard/comments';
                
        let response = await fetch(url);
                
        let commentData = await response.json();
        
        Object.values(commentData).map(v => {
        if(v.title == data.title){
        let comment = document.createElement('div');
        comment.classList.add('comment');
        comment.innerHTML = `<header class="header">
        <p><span>${v.username}</span> posted on <time>${v.date}</time></p>
    </header>
    <div class="comment-main">
        <div class="userdetails">
            <img src="./static/profile.png" alt="avatar">
        </div>
        <div class="post-content">
            <p>${v.comment}</p>
        </div>
    </div>
    <div class="footer">
        <p><span>${v.likes}</span> likes</p>
    </div>`;
        commentContainer.appendChild(comment);
            }
        })
                    
    }
    loadComments();

    commentContainer.appendChild(topicContent);
    let formForComments = document.getElementById('create-comment').addEventListener('submit',async function(event) {
        event.preventDefault();
        let currComment = document.querySelectorAll('textarea')[1];
        let username = document.querySelectorAll('input')[2];
        var d = new Date("2011-04-20T09:30:51.01");
        let commentData = {
            title: data.title,
            id: data.id,
            username: username.value,
            comment: currComment.value,
            likes: 5,
            date: d
        }
        let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        })
        currComment.value = '';
        username.value = '';

        let comment = document.createElement('div');
        comment.classList.add('comment');
        comment.innerHTML = `<header class="header">
        <p><span>${commentData.username}</span> posted on <time>${commentData.date}</time></p>
    </header>
    <div class="comment-main">
        <div class="userdetails">
            <img src="./static/profile.png" alt="avatar">
        </div>
        <div class="post-content">
            <p>${commentData.comment}</p>
        </div>
    </div>
    <div class="footer">
        <p><span>${commentData.likes}</span> likes</p>
    </div>`;
        commentContainer.appendChild(comment);

    });
   /* document.querySelector('a').addEventListener('click', () => {
        commentContainer.style.display = 'none';
        let formForPosts= document.getElementById('create-post').style.display = 'block';
        let posts = document.getElementById('posts').style.display = 'block';
    })*/
    commentContainer.style.display = 'block';
    let formForPosts= document.getElementById('create-post').style.display = 'none';
    let posts = document.getElementById('posts').style.display = 'none';
}

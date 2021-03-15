import {setupCreate} from './create.js';
import {setupTopics} from './topic.js'

const main = document.querySelector('main');
console.log('Im here');
setupSection('create-post', setupCreate);
setupSection('create-comment', setupTopics);
 document.querySelector('a').addEventListener('click', () => {
        commentContainer.style.display = 'none';
        let formForPosts= document.getElementById('create-post').style.display = 'block';
        let posts = document.getElementById('posts').style.display = 'block';
    })
function setupSection(sectionId, setup){
    const section = document.getElementById(sectionId);
    setup(main, section);
}
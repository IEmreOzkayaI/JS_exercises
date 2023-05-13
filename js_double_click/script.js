let image = document.querySelector('.container');
let icon = document.querySelector('.heart');

image.addEventListener('dblclick', e => {

    let pageX = e.pageX - e.target.offsetLeft;
    let pageY = e.pageY - e.target.offsetTop;   

    icon.style.top = `${pageY}px`;  
    icon.style.left = `${pageX}px`;

    icon.classList.add('active');
    setTimeout(()=>{
        icon.classList.remove('active');
    }, 500);
});
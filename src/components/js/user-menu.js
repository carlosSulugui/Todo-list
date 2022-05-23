const userMenu = document.getElementById('user-component');
let isVisible = false;

userMenu.addEventListener('click', (e) =>{

    if(!isVisible){
        userMenu.style.overflow = "visible";
        isVisible = !isVisible;
    }else{
        userMenu.style.overflow = "hidden";
        isVisible = !isVisible;
    }
});

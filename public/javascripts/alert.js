(function () {
    let socket = io('http://localhost:9385');
    let alert = document.querySelector(".name");
    let notificationContainer = document.querySelector('.notification-container');

    socket.on('new follower', function(msg){
        notificationContainer.classList.remove('notification-container');
        alert.innerHTML=msg.from_name;
        console.log(msg.from_name);
        void notificationContainer.offsetWidth;
        notificationContainer.classList.add('notification-container');
        
        let particles = document.querySelectorAll('.particle');
        particles.forEach(e=>e.style.animation = 'none');
        setTimeout(function() {
            particles.forEach(e=>e.style.animation = '');
        }, 10);

      });
})();
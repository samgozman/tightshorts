const cookie_message = document.getElementById('cookie-message')
const cookie_button = document.getElementById('cookie-close')

cookie_button.addEventListener('click', function () {
    cookie_message.classList.add('hide')
    localStorage.setItem('cookieUsage', true)
})

if(localStorage.getItem('cookieUsage')){
    cookie_message.classList.add('hide')
} else {
    cookie_message.classList.remove('hide')
}
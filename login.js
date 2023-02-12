$(document).ready(function () {

    if(localStorage.getItem("username") == 'kirito') {

        window.location.replace(`${window.location.origin}/Kafene/order.html`);
    }

    $('#login').on('click', function () {

        let userName = '';
        let passWord = '';

        userName = $('#userName').val();
        passWord = $('#passWord').val();

        if (userName === 'kirito' && passWord === 'kirito') {

            localStorage.setItem("username", "kirito");
            alert('Login Successfully!!!');
            window.location.replace(`${window.location.origin}/Kafene/order.html`);
        } else if(userName == '' && passWord == '') {

            alert('Please enter Username and Password!!!');

        } else if(userName != '' && passWord == '') {
            
            alert('Please enter Password!!!');

        } else if(userName == '' && passWord != '') {
            
            alert('Please enter Username!!!');

        } else {

            alert('Please enter valid credentials!');
        }

    })
})

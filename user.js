$(document).ready(function () {
    usersTab = $('#usersTab');
    logout = $('#logout');
    var button = $('button');
    var search = $('#search');

    usersTab.css('border-bottom', '2px solid rgb(45, 220, 45)')
    usersTab.css('color', 'rgb(45, 220, 45)')

    logout.on('click', function () {
        localStorage.removeItem("username");

    })

    const getUsers = () => {

        $.ajax({
            url: 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users',
            method: 'GET',
            success: function (user) {
                var tableBody = $('#tableBody');
                tableBody.html('');
                $('#users').append($('h1').text(''));
                for (i = 0; i < user.length; i++) {

                    var tr = $('<tr>');
                    var id = $('<td>').text(user[i].id);
                    var name = $('<td>').append($('<img>').attr('src', user[i].profilePic));
                    var amount = $('<td>').text(user[i].fullName);
                    var status = $('<td>').text(user[i].dob);
                    var gender = $('<td>').text(user[i].gender);
                    var location = $('<td>').text(user[i].currentCity + ', ' + user[i].currentCountry);

                    tr.append(id, name, amount, status, gender, location);
                    tableBody.append(tr);
                }
            }
        })
    }
    getUsers();

    button.on('click', function () {
        getUsers();
        search.val('');

    })

    const searchUsers = (searchText) => {
        $.ajax({
            url: `https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${searchText}`,
            method: 'GET',
            success: function (user) {
                var tableBody = $('#tableBody');
                tableBody.html('');
                $('#users').append($('h1').text(''));
                if (user.length != 0) {

                    for (i = 0; i < user.length; i++) {

                        var tr = $('<tr>');
                        var id = $('<td>').text(user[i].id);
                        var name = $('<td>').append($('<img>').attr('src', user[i].profilePic));
                        var amount = $('<td>').text(user[i].fullName);
                        var status = $('<td>').text(user[i].dob);
                        var gender = $('<td>').text(user[i].gender);
                        var location = $('<td>').text(user[i].currentCity + ', ' + user[i].currentCountry);

                        tr.append(id, name, amount, status, gender, location);
                        tableBody.append(tr);
                    }
                } else {
                    $('#users').append($('h1').text('No Users Found. Try again with different user name!!!'));
                }
            }
        })
    }

    $(document).on("keypress", function (e) {

        if (e.which == 13) {

            var searchText = search.val();

            if (searchText.length < 3) {
                alert('Enter more than two characters');
            } else {
                searchUsers(searchText);
            }
        }
    })
});
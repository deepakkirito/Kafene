$(document).ready(function () {
    orderTab = $('#ordersTab');
    logout = $('#logout');

    orderTab.css('border-bottom', '2px solid rgb(45, 220, 45)')
    orderTab.css('color', 'rgb(45, 220, 45)')

    logout.on('click', function () {
        localStorage.removeItem("username");
    })

    var newBox = $('#new');
    var packed = $('#packed');
    var intransit = $('#intransit');
    var delivered = $('#delivered');

    newBox.attr('checked', true);
    packed.attr('checked', true);
    intransit.attr('checked', true);
    delivered.attr('checked', true);

    $.ajax({

        url: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",
        method: "GET",
        success: function (orders) {
            var tableBody = $('#tableBody');
            var counter = 0;

            filter = [$('input[name = New]:checked').val(), $('input[name = Packed]:checked').val(),
            $('input[name = InTransit]:checked').val(), $('input[name = Delivered]:checked').val()]

            for (i = 0; i < orders.length; i++) {

                for (j = 0; j < filter.length; j++) {

                    if (orders[i].orderStatus == filter[j]) {

                        var tr = $('<tr>');
                        var id = $('<td>').text(orders[i].id);
                        var name = $('<td>').text(orders[i].customerName);
                        var amount = $('<td>').text('$ ' + orders[i].amount);
                        var status = $('<td>').text(orders[i].orderStatus);
                        var date = $('<td>').append($('<p>').text(orders[i].orderDate)).append($('<p>').text(orders[i].orderTime));

                        tr.append(id, name, date, amount, status);
                        tableBody.append(tr);

                        counter++;

                        var count = $('#count');
                        count.text('Count: ' + counter);

                    }
                }
            }

            counter = 0;

            var checkBox = $('input');
            var length = 0;
            checkBox.on('click', function (e) {

                tableBody.html('');

                filter = [$('input[name = New]:checked').val(), $('input[name = Packed]:checked').val(),
                $('input[name = InTransit]:checked').val(), $('input[name = Delivered]:checked').val()]
                console.log(filter);

                for (i = 0; i < orders.length; i++) {

                    for (j = 0; j < filter.length; j++) {

                        if (orders[i].orderStatus == filter[j]) {

                            var tr = $('<tr>');
                            var id = $('<td>').text(orders[i].id);
                            var name = $('<td>').text(orders[i].customerName);
                            var amount = $('<td>').text('$ ' + orders[i].amount);
                            var status = $('<td>').text(orders[i].orderStatus);
                            var date = $('<td>').append($('<p>').text(orders[i].orderDate)).append($('<p>').text(orders[i].orderTime));

                            tr.append(id, name, date, amount, status);
                            tableBody.append(tr);

                            counter++;

                            var count = $('#count');
                            count.text('Count: ' + counter);

                        } else if (newBox.is(':checked') == false && packed.is(':checked') == false && intransit.is(':checked') == false && delivered.is(':checked') == false) {

                            for (i = 0; i < orders.length; i++) {

                                var tr = $('<tr>');
                                var id = $('<td>').text(orders[i].id);
                                var name = $('<td>').text(orders[i].customerName);
                                var amount = $('<td>').text("$ " + orders[i].amount);
                                var status = $('<td>').text(orders[i].orderStatus);
                                var date = $('<td>').append($('<p>').text(orders[i].orderDate)).append($('<p>').text(orders[i].orderTime));

                                tr.append(id, name, date, amount, status);
                                tableBody.append(tr);

                                counter++;

                                var count = $('#count');
                                count.text('Count: ' + counter);
                            }

                            counter = 0;

                        }


                    }
                }

                counter = 0;

            })
        }
    })
})
$(document).ready(function () {
    productTab = $('#productsTab');
    logout = $('#logout');

    productTab.css('border-bottom', '2px solid rgb(45, 220, 45)')
    productTab.css('color', 'rgb(45, 220, 45)')

    logout.on('click', function () {

        localStorage.removeItem("username");

    })

    var expired = $('#expired');
    var lowstock = $('#lowstock');

    expired.attr('checked', true);
    lowstock.attr('checked', true);

    $.ajax({

        url: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
        method: "GET",
        success: function (products) {

            var tableBody = $('#tableBody');
            var counter = 0;
            var fullDate = new Date()

            //convert month to 2 digits
            var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);

            var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

            filter = [$('input[name = expired]:checked').val(), $('input[name = lowstock]:checked').val()];

            var count = $('#count');

            for (i = 0; i < products.length; i++) {

                var currentYear = fullDate.getFullYear();
                var productYear = products[i].expiryDate.slice(-4)

                if (productYear <= currentYear || products[i].stock < 100) {

                    var tr = $('<tr>');
                    var id = $('<td>').text(products[i].id);
                    var name = $('<td>').text(products[i].medicineName);
                    var brand = $('<td>').text(products[i].medicineBrand);
                    var date = $('<td>').text(products[i].expiryDate);
                    var price = $('<td>').text('$ ' + products[i].unitPrice);
                    var stock = $('<td>').text(products[i].stock);

                    tr.append(id, name, brand, date, price, stock);
                    tableBody.append(tr);

                    counter++;
                    count.text('Count: ' + counter);
                }
            }

            counter = 0;

            var checkBox = $('input');
            checkBox.on('click', function (e) {

                console.log(expired.is(':checked'));

                tableBody.html('');

                if (expired.is(':checked')) {

                    for (i = 0; i < products.length; i++) {

                        var currentYear = fullDate.getFullYear();
                        var productYear = products[i].expiryDate.slice(-4)

                        if (productYear <= currentYear) {

                            var tr = $('<tr>');
                            var id = $('<td>').text(products[i].id);
                            var name = $('<td>').text(products[i].medicineName);
                            var brand = $('<td>').text(products[i].medicineBrand);
                            var date = $('<td>').text(products[i].expiryDate);
                            var price = $('<td>').text('$ ' + products[i].unitPrice);
                            var stock = $('<td>').text(products[i].stock);

                            tr.append(id, name, brand, date, price, stock);
                            tableBody.append(tr);

                            counter++;
                            count.text('Count: ' + counter);
                        }
                    }
                }

                if (lowstock.is(':checked')) {

                    for (i = 0; i < products.length; i++) {

                        var currentYear = fullDate.getFullYear();
                        var productYear = products[i].expiryDate.slice(-4)

                        if (products[i].stock < 100) {

                            var tr = $('<tr>');
                            var id = $('<td>').text(products[i].id);
                            var name = $('<td>').text(products[i].medicineName);
                            var brand = $('<td>').text(products[i].medicineBrand);
                            var date = $('<td>').text(products[i].expiryDate);
                            var price = $('<td>').text('$ ' + products[i].unitPrice);
                            var stock = $('<td>').text(products[i].stock);

                            tr.append(id, name, brand, date, price, stock);
                            tableBody.append(tr);

                            counter++;

                            count.text('Count: ' + counter);
                        }
                    }
                }

                if (lowstock.is(':checked')  == false && expired.is(':checked') == false) {

                    for (i = 0; i < products.length; i++) {
                        
                        var tr = $('<tr>');
                        var id = $('<td>').text(products[i].id);
                        var name = $('<td>').text(products[i].medicineName);
                        var brand = $('<td>').text(products[i].medicineBrand);
                        var date = $('<td>').text(products[i].expiryDate);
                        var price = $('<td>').text('$ ' + products[i].unitPrice);
                        var stock = $('<td>').text(products[i].stock);
                        
                        tr.append(id, name, brand, date, price, stock);
                        tableBody.append(tr);
                        
                        counter++;
                        count.text('Count: ' + counter);                       
                        
                    }
                }

                counter = 0;

            })
        }
    })  
})
$(document).ready(function() {
    // get the random user data
    $.ajax({
        url: 'https://randomuser.me/api/?results=12&nat=us',
        dataType: 'json',
        success: function(data) {
            // element to hold the employees
            var container = $('#employees');
            // sanity check - remove any existing elements
            container.children().remove();

            for (let index in data.results) {
                let employee = data.results[index];

                // create a new div to hold the employee
                var el = $('<div></div>');
                el.addClass('employee');

                // create an image element to hold to profile image
                var image = $('<img></img>')
                image.attr('src', employee.picture.large);
                // add the image to the main element
                el.append(image);

                // element to hold overview details like name
                var details = $('<div></div>')
                details.addClass('employee-details');

                // create elements for the details
                var name = $(`<h1>${employee.name.first} ${employee.name.last}</h1>`)
                name.addClass('employee-name');
                var email = $(`<h3>${employee.email}</h3>`)
                email.addClass('employee-email');
                var city = $(`<h3>${employee.location.city}</h3>`)
                city.addClass('employee-city');

                // add details to the details container
                details.append(name);
                details.append(email);
                details.append(city);

                // add the details to the employee element
                el.append(details);

                // handle clicks on the employee - show the modal
                el.click(function() {
                    // remove all previous child elements
                    $('#modal-content').children().remove();

                    var closeModal = $(`<a>x</a>`)
                    $('#modal-content').append(closeModal);
                    closeModal.click(function() {
                        $('#modal').fadeOut();
                    });

                    var image = $('<img></img>');
                    image.attr('src', employee.picture.large);

                    var name = $(`<h1>${employee.name.first} ${employee.name.last}</h1>`)
                    name.addClass('employee-name');

                    var email = $(`<h3>${employee.email}</h3>`)
                    email.addClass('employee-email');

                    var city = $(`<h3>${employee.location.city}</h3>`)
                    city.addClass('employee-city');

                    $('#modal-content').append(image);
                    $('#modal-content').append(name);
                    $('#modal-content').append(email);
                    $('#modal-content').append(city);

                    $('#modal-content').append($('<div class="splitter"></div>'));

                    var phone = $(`<h3>${employee.cell}</h3>`)
                    phone.addClass('employee-phone');

                    var address = $(`<h3><span class="employee-address-street">${employee.location.street}, ${employee.location.city}, ${employee.location.state}</span>, ${employee.location.postcode}</h3>`)
                    address.addClass('employee-address');

                    var birthday = $(`<h3>Birthday: ${employee.dob}</h3>`)
                    birthday.addClass('employee-birthday');

                    $('#modal-content').append(phone);
                    $('#modal-content').append(address);
                    $('#modal-content').append(birthday);



                    // show the modal
                    $('#modal').fadeIn();
                })

                // wrapper element for holdign the employee element
                var wrapper = $('<div></div>')
                wrapper.addClass('employee-wrapper');
                wrapper.append(el);

                // add the employee to the container element
                container.append(wrapper);
            }
        }
    });

});
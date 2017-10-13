 $(window).on('load', function() {
   const api = {
       base: '../../dealers.json'
   }

   $.get(`${api.base}`, function(data, status) {
       console.table(data);
       const allData = data;
       const cardsWrapper = $('.js-cards');
       const dealers = allData.dealers;
       console.log(dealers);

         //loop through each instance in dealers object
         dealers.forEach(function(dealer, index) {

           const name = dealer.data.name;
           const str = dealer.data.phone1;

             //replace all - in phone number with .
             const phoneNum = str.replace(/-/g, ".");

             const weekDays = dealer.data.weekHours.mon;
             dealer.data.weekHours.sun = dealer.data.weekHours.sun === '' ? 'CLOSED' : dealer.data.weekHours.sun;
             dealer.data.weekHours.sat = dealer.data.weekHours.sat === '' ? 'CLOSED' : dealer.data.weekHours.sat;

             //attach HTML to section with js-cards class 
             cardsWrapper.append(`<div class="company-cards">
                <div class="cards-content">
                <h1>${name}</h1>
                <hr>
                <div class="call-now"><button type="button" class="call-btn"><i class="fa fa-phone icon-phone" aria-hidden="true"></i><span class="tap">Tap to call</span><span class="phone-num">${phoneNum}</span></button></div>
                <p class="talk"><em>Can't talk now? Click below to send an email.</em></p>
                <button type="button" class="email-btn js-email-btn" onclick="openContact()" data-title="${name}"><i class="fa fa-envelope icon-envelope" aria-hidden="true"></i><span class="contact">Contact this Pro</span></button>
                <h2>Business Hours</h2>
                <ul class="hours">
                <li>Weekdays ${weekDays}
                </li>
                <li>Saturdays ${dealer.data.weekHours.sat}</li>
                <li>Sundays - ${dealer.data.weekHours.sun}</li>
                </ul>
                <div class="grey-wrapper">
                <ul class="js-list-${index} columns">
                </ul>
                </div>
                </div>
                </div>
                `)

             const certList = $(`.js-list-${index}`);
             console.log(certList);
             const certs = dealer.data.certifications;

             //loop through each certification in certifications 
             certs.forEach(function(cert) {
               console.log(cert);
               let icon;

                 //evaluate each cert and compare with values of each case
                 switch (cert) {
                   case 'Installation Pro':
                   icon = 'ss-star'
                   break;

                   case 'Residential Pro':
                   icon = 'ss-home'
                   break;

                   case 'Commercial Pro':
                   icon = 'ss-users'
                   break;

                   case 'Service Pro':
                   icon = 'ss-settings'
                   break;

                   default:
                   icon = 'ss-star'
               }

               certList.append(`
                <li><i class="${icon}"></i>${cert}</li>
                `)
           });

         });

     });

});


 $(document).on('click', '.js-email-btn', function() {
   const title = $(this).data('title');
   $('.js-company-name').text(title);
})

 //allow only one option to be checked on contact form; update both options checked property each time the other is clicked
 $('.question').on('change', function() {
   $('.question').not(this).prop('checked', false);
});

 function openMenu() {
   document.getElementById("menu-pop").style.height = "400px";
   document.getElementById("menu-pop").style.overflow = "visible";
}


function closeMenu() {
   document.getElementById("menu-pop").style.height = "0%";
   document.getElementById("menu-pop").style.overflow = "hidden";
}

function myFunction() {
   document.getElementById("myDropDown").classList.toggle("show");
   document.getElementById("b-border").classList.toggle("no-border");
}

function openContact() {
   document.getElementById("myContact").style.height = "100%";
}

function closeContact() {
   document.getElementById("myContact").style.height = "0%";
}

 // when submit button is clicked, call closeContact function to close contact form 
 document.getElementById("form-submit").addEventListener("click", function(event) {
   event.preventDefault();
   closeContact();
});

 //when user moves out of input field on contact form, check to see if there is a value in the field; assign checked image to checkbox if there is a value and assign unchecked image if there is no value
 //Need to loop through each input field rather than just targeting input with fl-name ID
 var input_field = $('.hasValue');

 input_field.blur(function() {
   var input_val = input_field.val();
   if (input_val != "") {
       document.getElementById("fl-name").src = "assets/images/check.png";
   } else {
       document.getElementById("fl-name").src = "assets/images/circle.png";
   }
});
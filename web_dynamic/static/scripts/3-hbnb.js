const amenities = {};

$(document).ready(function () {
  $('input').each(function () {
    checkAndAppend(this);
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      if ($('div#api_status').hasClass('available')) {
        $('div#api_status').removeClass('available');
      }
    }
  }, 'json');
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    data: '{}',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
      places(data);
    }
  });
});

function checkAndAppend (inp) {
  $(inp).click(function () {
    if ($(inp).prop('checked')) {
      amenities[$(inp).data('id')] = $(inp).data('name');
      console.log(amenities);
    } else {
      delete amenities[$(inp).data('id')];
    }
    $('div.amenities h4').html(Object.values(amenities).join(', '));
    if (Object.values(amenities).length === 0) {
      $('div.amenities h4').html('&nbsp;');
    }
  });
}

function places (data) {
  for (const place of data) {
    $('section.places').append('<article> <div class="title_box"> <h2></h2> <div class="price_by_night"></div> </div> <div class="information"> <div class="max_guest"></div> <div class="number_rooms"></div> <div class="number_bathrooms"></div> </div> <div class="user"></div> <div class="description"></div></article>');

    $('div.title_box h2').last().text(place.name);
    $('.price_by_night').last().text('$' + place.price_by_night);

    if (place.max_guest > 1) {
      $('.max_guest').last().text(`${place.max_guest} Guests`);
    } else {
      $('.max_guest').last().text(`${place.max_guest} Guest`);
    }

    if (place.number_rooms > 1) {
      $('.number_rooms').last().text(`${place.number_rooms} Bedrooms`);
    } else {
      $('.number_rooms').last().text(`${place.number_rooms} Bedroom`);
    }

    if (place.number_bathrooms > 1) {
      $('.number_bathrooms').last().text(`${place.number_bathrooms} Bathrooms`);
    } else {
      $('.number_bathrooms').last().text(`${place.number_bathrooms} Bathroom`);
    }

    /* $('.user').last().append(place.user_id); */

    $('.description').last().html(place.description);
  }
}

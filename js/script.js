$(document).ready(function() {
	var addItemToList = function(item) {
		var $item = $('<span><input type="checkbox"x class="item"/><label>'+item+'</label><br/></span>');	
		$('#todo-list').append($item);
	};

	// GOAL: Type an item to do
	//		When I click the button, adds item to list
	$('#add-item-button').on('click', function(e){
		e.preventDefault(); // to prevent the form from sending data to the server when we click the button since we want to handle the event in javascript
		var itemValue = $('#todo-list-item').val();
		addItemToList(itemValue);
	});

	$('#remove-item-button').on('click', function(e) {
		e.preventDefault();
		$('.item:checked').closest('span').remove();
	});

	$('#ajax-button').one('click', function() {
		$.ajax('test.html', {
			success: function(response) {
				$('body').append(response);
			},
			error: function() {
				alert("It's broken! :(");
			}
		});
	});

	$('#populate-list-button').one('click', function() {
		$.ajax({
			url: 'test.json',
			type: "GET",
			dataType: "json",
			success: function(response) {
				for(var i=0; i<response.tasks.length; i++) {
					addItemToList(response.tasks[i]);
				}
			}
		});
	});
});
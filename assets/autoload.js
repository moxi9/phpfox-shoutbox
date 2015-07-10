
var socketIO;

/**
 * Function we use to build each shoutbox message
 *
 * @param messages
 */
var socketMessages = function(messages) {
	var t = $('#shoutbox-js .messages'), html = '';

	for (var i in messages) {
		var b = messages[i];

		if (b.image) {
			b.image = '<img src="' + b.image + '">';
		}
		html += '<div class="row">' +
			'<div class="shoutbox-image">' + b.image + '</div>' +
			'<div class="shoutbox-content">' +
			'<div class="shoutbox-user">' + b.name + '</div>' +
			cleanHTML(b.message) +
			'</div>' +
			'</div>';
	}

	t.html(html);

	t.scrollTop(t[0].scrollHeight);
};

/**
 * Clean naughty HTML
 *
 * @param text
 * @returns {string}
 */
var cleanHTML = function(text) {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};

	return text.replace(/[&<>"']/g, function(m) { return map[m]; }).substr(0, 140);
};

/**
 * Load routine when PHPfox is ready or a new page has been loaded.
 */
$Ready(function() {
	var s = $('#shoutbox-js'), b = $('#right ._block'), u = $('#auth-user');

	if (!node_js_server) {
		p('NodeJS server not set.');
		return;
	}

	// If user is not logged in, lets ignore this routine
	if (!u.length) {
		return;
	}

	// Only load the shoutbox on the sites index page for members
	if (!s.length && $('#page_core_index-member').length) {
		if (b.length) {

			// Load up socket.io server based on Admins settings
			socketIO = io(node_js_server);

			// Handle new messages being emitted from others
			socketIO.on('add', function(messages) {
				socketMessages(messages);
			});

			// Get the latest messages from socket.io
			socketIO.emit('load');

			// Build the shoutbox form/block
			var html = '<div id="shoutbox-js" class="block">' +
				'<div class="title">Shoutbox</div>' +
				'<div class="content">' +
				'<div class="messages"></div>' +
				'<form method="post" action="#" id="shoutbox-js-form">' +
				'<input type="text" name="message" placeholder="Chat..." id="shoutbox-js-input" autocomplete="off" maxlength="140">' +
				'</form>' +
				'</div>' +
				'</div>';
			b.append(html);
		}
	}

	// Catch when the shoutbox form is submitted
	$('#shoutbox-js-form').submit(function() {
		var t = $(this), o = t.find('input');

		// Send new message to socket.io
		socketIO.emit('add', {
			user_id: u.data('id'),
			name: u.data('name'),
			image: u.data('image'),
			message: o.val()
		});

		// Clear the form
		o.val('');

		return false;
	});
});
document.addEventListener('DOMContentLoaded', function () {
	const canvas = document.getElementById('drawCanvas');
	const clearBtn = document.getElementById('clear-btn');
	const sendBtn = document.getElementById('send-btn');
	const ctx = canvas.getContext('2d');
	ctx.lineWidth = 20;
	thickness = 30;
	// ctx.lineHeight = 20;

	let isDrawing = false;
	let isErasing = false;

	canvas.addEventListener('mousedown', startDrawing);
	canvas.addEventListener('mousemove', draw);
	canvas.addEventListener('mouseup', stopDrawing);
	canvas.addEventListener('mouseout', stopDrawing);
	clearBtn.addEventListener('click', clearCanvas);
	sendBtn.addEventListener('click', sendImage);

	function startDrawing(e) {
		isDrawing = true;
		draw(e);
	}

	function draw(e) {
		if (!isDrawing) return;
		ctx.beginPath();
		ctx.fillStyle = '#6efad9';
		ctx.fillRect(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, thickness, thickness);
		ctx.stroke();
		ctx.closePath();
	}

	function stopDrawing() {
		isDrawing = false;
	}

	function startErasing(e) {
		isErasing = true;
		erase(e);
	}

	function erase(e) {
		if (!isDrawing) return;
		ctx.globalCompositeOperation = 'destination-out'; // Set composite mode to erase
		ctx.beginPath();
		ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // Transparent color to erase
		ctx.fillRect(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, thickness, thickness); // Adjust the size as needed
		ctx.stroke();
		ctx.closePath();
		ctx.globalCompositeOperation = 'source-over'; // Reset composite mode
	}

	function stopErasing() {
		isErasing = false;
	}

	function clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	function dataURLtoBlob(dataURL) {
		const parts = dataURL.split(';base64,');
		const contentType = parts[0].split(':')[1];
		const raw = window.atob(parts[1]);
		const array = new Uint8Array(new ArrayBuffer(raw.length));

		for (let i = 0; i < raw.length; i++) {
			array[i] = raw.charCodeAt(i);
		}

		return new Blob([array], { type: contentType });
	}

	function sendImage() {
		// Get the image data from the canvas
		const imageDataURL = canvas.toDataURL('image/png');

		// Convert the data URL to a Blob
		const blob = dataURLtoBlob(imageDataURL);

		// Create a FormData object
		const formData = new FormData();
		formData.append('image', blob, 'drawing.png');

		// Send the image data to the server
		fetch('/process_image', {
			method: 'POST',
			body: formData,
		})
		.then(response => response.clone().json())
		.then((data) => {
			// Display the image preview below
			const previewContainer = document.querySelector('.preview');
            const image = new Image();
            image.onload = function() {
                const aspectRatio = this.width / this.height;
                const containerAspectRatio = previewContainer.offsetWidth / previewContainer.offsetHeight;
                if (aspectRatio > containerAspectRatio) {
                    this.style.width = '100%';
                    this.style.height = 'auto';
                } else {
                    this.style.width = 'auto';
                    this.style.height = '100%';
                }
            };
            image.src = '/get_image?' + new Date().getTime();
			previewContainer.innerHTML = ''; // Clear previous image
            previewContainer.appendChild(image);

			// Predictions
			console.log('Server response:', data);
			let pred = data.prediction;
			//console.log(pred);
			
			// Update the guesses in the GUI with the new predictions
			const guesses = document.querySelectorAll('.each-guess span');
			guesses.forEach((guess, index) => {
				guess.textContent = pred[index];
			});		
			
		})
		.catch((error) => {
			console.error('Error sending image:', error);
		});
	}

	canvas.addEventListener('mousedown', startErasing);
	canvas.addEventListener('mousemove', erase);
	canvas.addEventListener('mouseup', stopErasing);
});

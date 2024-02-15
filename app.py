from flask import Flask, render_template, request, jsonify, send_file
import numpy as np
import matplotlib.pyplot as plt
import cv2
from skimage.transform import resize
from keras.models import load_model
import keras
from keras.models import model_from_json

import json

app = Flask(__name__)

def models():
	# Model reconstruction from JSON file
	with open('cnn.json', 'r') as f:
			model = model_from_json(f.read())

	# Load weights into the new model
	model.load_weights('cnn_weights.h5')
	print("Model Loaded...")
	return model

new_model = models()
new_model.make_predict_function()

# Now you can use the new_model for predictions or further training

@app.route("/")
def index_page():
	# Render index Page
	return render_template("index.html")

# Endpoint to process image
@app.route('/process_image', methods=['POST'])
def process_image():

	if "image" in request.files:
		image_file = request.files["image"]
		# Upload image to server or save it
		image_file.save("test.jpg")

		# Load image with opencv
		rgb_image = cv2.imread('test.jpg') # cv2.imread('0.png')

		# Convert from RGB(3 Channels) to GrayScale(1 Channel)
		gray_image = cv2.cvtColor(rgb_image, cv2.COLOR_BGR2GRAY)
		np_arr = np.array(gray_image)
		np_arr = np_arr.astype(np.uint8)
	
		resized_image = resize(np_arr, (28, 28))

		# Normalize the values to be between 0 and 255
		normalized_image = (resized_image - np.min(resized_image)) / (np.max(resized_image) - np.min(resized_image)) * 255
		# Convert the values to integers
		normalized_image = normalized_image.astype(np.uint8)

		# print( normalized_image[normalized_image != 0])
		cv2.imwrite('resized_image.jpg', normalized_image)

		model_input = normalized_image.reshape((1, 28, 28, 1)).astype('float32')

		model_input = model_input / 255.0
		# print(model_input)
		# print(new_model.summary())

		# Display the original and thresholded images using matplotlib
		'''
		plt.subplot(1, 2, 1)
		plt.imshow(gray_image, cmap='gray')
		plt.title('Original Image')

		plt.subplot(1, 2, 2)
		plt.imshow(normalized_image, cmap='gray')
		plt.title('Thresholded Image')

		plt.show()
		'''
		prediction = new_model.predict(model_input)

		# Assuming prediction is a one-hot encoded output, you might want to get the predicted class
		top_3_indices = np.argsort(prediction)[::-1][:3]
		predicted_class = list(reversed(top_3_indices[0]))
		res = predicted_class[:3]
		print(res)

		first_guess, second_guess, third_guess =  int(res[0]), int(res[1]), int(res[2])
		prediction = prediction[0]
		print(prediction)
		p1, p2, p3 = float(prediction[first_guess]), float(prediction[second_guess]), float(prediction[third_guess])
		return json.dumps({'result': 'Image received and processed successfully!', 'prediction': [first_guess, second_guess, third_guess], 'probability':[p1, p2, p3]})
	else: 
		print("No image received!")
		response = {"result": "No image received!"}
		return jsonify(response)
	
@app.route('/get_image')
def get_image():
    return send_file('resized_image.jpg', mimetype='image/jpeg')

if __name__ == "__main__":
	app.run(debug=True)
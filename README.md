# Digit Recognizer

A dynamic digit recognizer app in progress, enabling users to handwrite on a canvas element. The drawn images are sent to the backend, processed with OpenCV, and predicted using a Convolutional Neural Network (CNN). Built with Flask (Python)

## Features:

- User-friendly web interface
- Backend processing with OpenCV and matplotlib
- CNN for digit recognition
- Flask web app
- Google Collab for building model

To run app: `export FLASK_APP=app.py && export FLASK_DEBUG=1 && flask run`

<img align='center' alt='web app ui' src='/static/images/cnn_empty.png'>
<img align='center' alt='web app ui' src='./static/images/cnn_correct_1.png'>
<img align='center' alt='web app ui' src='./static/images/cnn_correct_2.png'>

# Digit Recognizer CNN

A web-based digit recognition application that allows users to draw digits on a canvas and get real-time predictions using a Convolutional Neural Network (CNN) trained on the MNIST dataset. The application features a user-friendly interface where users can draw digits, and the backend processes the image using OpenCV before making predictions with the trained CNN model.

## Features

- 🎨 **Interactive Canvas**: Draw digits directly in the web browser
- 🤖 **CNN Model**: Trained on MNIST dataset with 90.93% accuracy
- 🔄 **Real-time Processing**: Instant digit recognition with top 3 predictions and confidence scores
- 🖼️ **Image Preprocessing**: Automatic image resizing and normalization using OpenCV
- 🌐 **Flask Backend**: Lightweight Python web framework for API endpoints
- 📊 **Visual Feedback**: Display of processed images and prediction probabilities

## Model Architecture

The CNN model consists of:

- **Input Layer**: 28x28x1 grayscale images
- **Convolutional Layer 1**: 32 filters, 3x3 kernel, ReLU activation
- **Convolutional Layer 2**: 64 filters, 3x3 kernel, ReLU activation
- **Flatten Layer**: Converts 2D feature maps to 1D
- **Dense Layer**: 128 neurons with ReLU activation
- **Output Layer**: 10 neurons (digits 0-9) with softmax activation

**Model Performance**: 90.93% accuracy on MNIST test set

## Project Structure

```
Digit_Recognizer_CNN/
├── app.py                          # Flask application and API endpoints
├── cnn.json                        # Model architecture (JSON)
├── cnn_weights.h5                  # Trained model weights
├── requirements.txt                # Python dependencies
├── notebooks/
│   └── CNN_Digit_Recognizer_MNIST_Dataset.ipynb  # Model training notebook
├── static/
│   ├── css/
│   │   └── index.css              # Styling
│   ├── js/
│   │   └── main.js                # Frontend JavaScript
│   ├── icons/                     # UI icons
│   └── images/                    # Screenshots
└── templates/
    └── index.html                 # Main HTML template
```

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Digit_Recognizer_CNN
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

   Additional dependencies needed:

   ```bash
   pip install tensorflow keras opencv-python scikit-image numpy matplotlib
   ```

3. **Ensure model files are present**
   - `cnn.json` - Model architecture
   - `cnn_weights.h5` - Trained weights

## Usage

1. **Start the Flask application**

   ```bash
   export FLASK_APP=app.py
   export FLASK_DEBUG=1
   flask run
   ```

   Or alternatively:

   ```bash
   python app.py
   ```

2. **Access the application**
   - Open your browser and navigate to `http://localhost:5000`
   - Draw a digit (0-9) on the canvas
   - Click the predict button to get the model's prediction
   - View the top 3 predictions with their confidence scores

## API Endpoints

- `GET /` - Renders the main application page
- `POST /process_image` - Processes the drawn image and returns predictions
- `GET /get_image` - Returns the processed/resized image

## Technologies Used

- **Backend**: Flask (Python)
- **Deep Learning**: Keras/TensorFlow
- **Image Processing**: OpenCV, scikit-image
- **Data Visualization**: Matplotlib
- **Frontend**: HTML, CSS, JavaScript (Canvas API)

## Model Training

The CNN model was trained using Google Colab on the MNIST dataset:

- **Training Set**: 60,000 images
- **Test Set**: 10,000 images
- **Epochs**: 2
- **Batch Size**: 10,000
- **Optimizer**: Adam (learning rate: 0.01)
- **Loss Function**: Categorical Crossentropy

See `notebooks/CNN_Digit_Recognizer_MNIST_Dataset.ipynb` for the complete training pipeline.

## Screenshots

![Empty Canvas](static/images/cnn_empty.png)
_Application interface with empty canvas_

![Correct Prediction 1](static/images/cnn_correct_1.png)
_Example prediction: Digit 1_

![Correct Prediction 2](static/images/cnn_correct_2.png)
_Example prediction: Digit 2_

<img align='center' alt='web app ui' src='/static/images/cnn_empty.png'>
<img align='center' alt='web app ui' src='./static/images/cnn_correct_1.png'>
<img align='center' alt='web app ui' src='./static/images/cnn_correct_2.png'>

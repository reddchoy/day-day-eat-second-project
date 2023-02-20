from PIL import Image
from sanic.response import json
from sanic import Sanic
import tensorflow as tf
import numpy as np
import base64
import io
from sanic.worker.manager import WorkerManager


WorkerManager.THRESHOLD = 100

app = Sanic("BAD_C23G1_API")

model = tf.keras.models.load_model("./model")
CLASSES = ["food", "environment"]
IMG_SIZE = 299

@app.post("/food-env-predict")
def predict_food_env(request):
    try:
        content = request.json
        image_base64 = content["review_pic"]
        img = Image.open(io.BytesIO(base64.decodebytes(bytes(image_base64, "utf-8"))))
        img = img.resize((IMG_SIZE, IMG_SIZE))
        img_arr = np.array(img)
        img_arr = img_arr / 255.
        img_arr = np.expand_dims(img_arr, axis=0)
 
        prediction = model.predict(img_arr)
        index = np.argmax(prediction)
        CLASSES.sort()
        pred_value = CLASSES[index]
        print(pred_value)

        return json(pred_value)
    except Exception:
        print(Exception)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)

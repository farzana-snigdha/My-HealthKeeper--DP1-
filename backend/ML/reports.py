import os
import h5py
# import tensorflow.keras as tf
import keras as keras
import cv2 as cv2
import matplotlib
from numpy import loadtxt
from keras.models import load_model
import sys


# load model
model = load_model('../backend/ML/xray_model.h5')
load_image = cv2.imread(str(sys.argv[1]))
img_new = cv2.resize(load_image, (180,180))

new = img_new.reshape(1,img_new.shape[0], img_new.shape[1],3)
result = model.predict(new, steps=10)
print(result[0][0])


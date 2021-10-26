
import pandas as pd
import numpy as np
import sys
import os

# userName = '01771794998'
# password = 'e4855a4a8a'
# recipientNumber = str(sys.argv[1])

# arr = [recipientNumber, str(sys.argv[2]), str(
#     sys.argv[3]), str(sys.argv[4]), str(sys.argv[5])]
# for x in range(5):
#     print(arr[x])
#     # print('phone1 ',arr[x])


l1 = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain',
      'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination', 'fatigue',
      'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat',
      'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion',
      'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation',
      'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload',
      'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation',
      'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate',
      'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps',
      'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails',
      'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain',
      'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side',
      'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)',
      'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic _patches',
      'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances',
      'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption',
      'fluid_overload', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling',
      'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze']

disease = ['Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis', 'Drug Reaction',
           'Peptic ulcer diseae', 'AIDS', 'Diabetes', 'Gastroenteritis', 'Bronchial Asthma', 'Hypertension',
           'Migraine', 'Cervical spondylosis',
           'Paralysis (brain hemorrhage)', 'Jaundice', 'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A',
           'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Alcoholic hepatitis', 'Tuberculosis',
           'Common Cold', 'Pneumonia', 'Dimorphic hemmorhoids(piles)',
           'Heartattack', 'Varicoseveins', 'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia', 'Osteoarthristis',
           'Arthritis', '(vertigo) Paroymsal  Positional Vertigo', 'Acne', 'Urinary tract infection', 'Psoriasis',
           'Impetigo']

l2 = []
for x in range(0, len(l1)):
    l2.append(0)

# Training DATA
trg = pd.read_csv('./Training.csv')
trg.replace({'prognosis': {'Fungal infection': 0, 'Allergy': 1, 'GERD': 2, 'Chronic cholestasis': 3, 'Drug Reaction': 4,
                          'Peptic ulcer diseae': 5, 'AIDS': 6, 'Diabetes ': 7, 'Gastroenteritis': 8, 'Bronchial Asthma': 9, 'Hypertension ': 10,
                          'Migraine': 11, 'Cervical spondylosis': 12,
                          'Paralysis (brain hemorrhage)': 13, 'Jaundice': 14, 'Malaria': 15, 'Chicken pox': 16, 'Dengue': 17, 'Typhoid': 18, 'hepatitis A': 19,
                          'Hepatitis B': 20, 'Hepatitis C': 21, 'Hepatitis D': 22, 'Hepatitis E': 23, 'Alcoholic hepatitis': 24, 'Tuberculosis': 25,
                          'Common Cold': 26, 'Pneumonia': 27, 'Dimorphic hemmorhoids(piles)': 28, 'Heart attack': 29, 'Varicose veins': 30, 'Hypothyroidism': 31,
                          'Hyperthyroidism': 32, 'Hypoglycemia': 33, 'Osteoarthristis': 34, 'Arthritis': 35,
                          '(vertigo) Paroymsal  Positional Vertigo': 36, 'Acne': 37, 'Urinary tract infection': 38, 'Psoriasis': 39,
                          'Impetigo': 40,'Diabetes':7, 'Hypertension':10}}, inplace=True)
trg.drop('Unnamed: 133', axis=1, inplace=True)
# print(df[0:5])
# print(tr[0:5])


x_train = trg.iloc[:,:-1]
y_train = trg.iloc[:,132]

# TESTING DATA
tr = pd.read_csv('./Testing.csv')
tr.replace({'prognosis': {'Fungal infection': 0, 'Allergy': 1, 'GERD': 2, 'Chronic cholestasis': 3, 'Drug Reaction': 4,
                          'Peptic ulcer diseae': 5, 'AIDS': 6, 'Diabetes ': 7, 'Gastroenteritis': 8, 'Bronchial Asthma': 9, 'Hypertension ': 10,
                          'Migraine': 11, 'Cervical spondylosis': 12,
                          'Paralysis (brain hemorrhage)': 13, 'Jaundice': 14, 'Malaria': 15, 'Chicken pox': 16, 'Dengue': 17, 'Typhoid': 18, 'hepatitis A': 19,
                          'Hepatitis B': 20, 'Hepatitis C': 21, 'Hepatitis D': 22, 'Hepatitis E': 23, 'Alcoholic hepatitis': 24, 'Tuberculosis': 25,
                          'Common Cold': 26, 'Pneumonia': 27, 'Dimorphic hemmorhoids(piles)': 28, 'Heart attack': 29, 'Varicose veins': 30, 'Hypothyroidism': 31,
                          'Hyperthyroidism': 32, 'Hypoglycemia': 33, 'Osteoarthristis': 34, 'Arthritis': 35,
                          '(vertigo) Paroymsal  Positional Vertigo': 36, 'Acne': 37, 'Urinary tract infection': 38, 'Psoriasis': 39,
                          'Impetigo': 40,'Diabetes':7, 'Hypertension':10}}, inplace=True)
tr.drop('Unnamed: 133', axis=1, inplace=True)
# print(df[0:5])
# print(tr[0:5])


x_test = tr.iloc[:,:-1]
y_test = tr.iloc[:,132]

from numpy.core.numeric import cross
from sklearn.ensemble import VotingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn import svm
from sklearn.naive_bayes import MultinomialNB

def decisionTree():
    from sklearn.tree import DecisionTreeClassifier
    dt=DecisionTreeClassifier(random_state=42,max_depth=36) 
    dt.fit(x_train, y_train)
    y_pred = dt.predict(x_test)
    from sklearn import metrics
    # Y_pred.unique()
    # Y_test.size
    # Model Accuracy: how often is the classifier correct?
    print("Accuracy:",metrics.accuracy_score(y_test, y_pred))


    

    test_sample = x_test[0:0]

    # symptoms = ["nausea","loss_of_appetite","abdominal_pain","yellowing_of_eyes"]
    symptoms = ['silver_like_dusting', 'acidity',  'malaise','vomiting', 'obesity']

    input_test = []

    for i in range(len(l1)):
      if(l1[i] in symptoms):
        input_test.append(1)
      else:
        input_test.append(0)

    test_sample.loc[0] = np.array(input_test)

    # prediction = knn.predict(test_sample)
    prediction = dt.predict(test_sample)
    # prediction_probability = knn.predict_proba(test_sample)
    prediction_probability = dt.predict_proba(test_sample)

    # print(prediction, prediction_probability)

    # print(prediction_probability)
    disease_list = disease
    prediction_probability_array = prediction_probability[0]
    # print(prediction_probability_array)
    ind = -1
    top_probability_prediction = []
    top_disease_prediction = []

    # print(1e-100)
    for u in range(0, 3):
        max1 = 1e-100
        for q in range(len(prediction_probability_array)):
            if(prediction_probability_array[q] > max1):
                float("{:.2f}".format(prediction_probability_array[q]))
                max1 = prediction_probability_array[q]
                ind = q
        # print(ind)
        top_disease_prediction.append(disease_list[ind])
        # top_disease_prediction.append(max1)
        prediction_probability_array = np.delete(prediction_probability_array, ind)
        # print(try1)
        disease_list = np.delete(disease_list, ind)
        top_probability_prediction.append(("{:.2f}".format(max1*100)))


    print(top_disease_prediction)
    print(top_probability_prediction)

      
decisionTree()



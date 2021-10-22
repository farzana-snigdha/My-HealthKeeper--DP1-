# My HealthKeeper (DP1)
 
# My-Health-Keeper

My Health Keeper is a ONE STOP solution where users can store all sorts of health related information in ONE place, predict possible diseases and analyze chest x-ray reports.


## Features

1. Storing General Health Information

Regularly keep track of health related general information like - 
- Blood pressure
- Pulse rate
- Blood sugar level
- Weight

2. Diet Plan

- Log his/her consumed food items along with its amount and our application will calculate the calories intake.  
- Calculate his/her BMI. From the result, the application will suggest necessary steps for maintaining a healthy lifestyle for the user.
- Monitor his/her weight.
 
3. Storing Specialized Health Information

User can record any kind of abnormalities/diseases by -
- Writing notes about his/her situation including its date
- Uploading health related files and prescriptions etc.

4. Report Analysis

User can upload two types of report -
- X-Ray report of the lungs
Our application will analyse the report and will give a list of probable diseases accordingly with a suggestion to visit the required doctor.

5. Disease Prediction

User can choose his/her evident symptoms then our application will showcase the possibility of probable diseases in percentage and so type of doctor will be suggested accordingly

6. Medicine Reminder

User can list the names of medicines and set time and duration for them and a chart will be created accordingly. 
Before every medication a notification(email and sms notification) will be send as a reminder. 

7. 	Menstrual Cycle Tracker

For female users, our application will have an additional feature where she can keep a track of the menstruation cycle by storing information like -
- Starting of the cycle
- Ending of the cycle
- Duration of each cycle to come
- Daily log
A reminder (sms and email notification) will be given to the user approximately 3 days before the starting of each cycle 


## Technologies used
1. ExpressJs
2. ReactJs
3. MongoDB
4. NodeJs
5. Python

## Environment setup
The project is modular so it has separate frontend and backend. And the whole propject was developed in VS Code.
NodeJs and Python need to be installed first.

Instruction to setup the project :

open a terminal and type-

1. cd .\frontend\
2. npm install
3. npm run start

open another terminal and type-

1. cd .\backend\
2. npm install
3. pip install tensorflow keras h5py opencv-python zeep sklearn numpy pandas metrics naive_bayes svm rfc knn decision_tree ensemble neighbors tree clf
4. npm run start

After installing all the packages, the project will be ready to run.

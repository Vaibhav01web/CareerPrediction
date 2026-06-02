import sys
import os
import pandas as pd
import joblib

current_dir = os.path.dirname(__file__)

model = joblib.load(
    os.path.join(current_dir, "career_model.pkl")
)

data = pd.DataFrame([{
    "cgpa": float(sys.argv[1]),
    "dsa": int(sys.argv[2]),
    "communication": int(sys.argv[3]),
    "ml": int(sys.argv[4]),
    "webdev": int(sys.argv[5]),
    "cloud": int(sys.argv[6]),
    "cybersecurity": int(sys.argv[7]),
    "projects": int(sys.argv[8]),
    "internships": int(sys.argv[9])
}])

prediction = model.predict(data)

print(prediction[0])
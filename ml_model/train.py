import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import os
current_dir = os.path.dirname(__file__)
csv_path = os.path.join(current_dir, "career_dataset.csv")
data = pd.read_csv(csv_path)
X = data.drop("career",axis=1)
y = data["career"]
model = RandomForestClassifier()
model.fit(X, y)
joblib.dump(model, "career_model.pkl")
print("Model saved")
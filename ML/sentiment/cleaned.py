import pandas as pd
import ast

# Simulating reading the CSV data
data = pd.read_csv("converted (7).csv")

# Convert to DataFrame
df = pd.DataFrame(data)

# Check the columns to see if 'success' exists
print("Columns in DataFrame:", df.columns)

# Clean the 'data' column by parsing it as a Python literal
df['data'] = df['data'].apply(ast.literal_eval)

# Normalize the 'data' column into separate columns
df_cleaned = pd.json_normalize(df['data'])

# Drop the 'success' column if it exists
df_cleaned.drop(columns=['success'], inplace=True, errors='ignore')

# Print the cleaned DataFrame or save it to a new CSV file
df_cleaned.to_csv('cleaned_movie_sentiment.csv', index=False)

# Show the cleaned DataFrame
print(df_cleaned)

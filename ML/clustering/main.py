from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import ast

app = Flask(__name__)
CORS(app)

def clean_data():
    df = pd.read_csv("converted (3).csv")
    df['user_profile_data'] = df['user_profile_data'].apply(ast.literal_eval)
    df['user_activity_data'] = df['user_activity_data'].apply(ast.literal_eval)
    df['user_engagement_data'] = df['user_engagement_data'].apply(ast.literal_eval)
    df['churn_indicators'] = df['churn_indicators'].apply(ast.literal_eval)
    df['movie_data'] = df['movie_data'].apply(ast.literal_eval)
    df['age'] = df['user_profile_data'].apply(lambda x: x['age'])
    df['gender'] = df['user_profile_data'].apply(lambda x: x['gender'])
    df['movies_watched'] = df['movie_data'].apply(lambda x: [movie["movie_name"] for movie in x["watched_movies"]])
    return df

def process_movie_data():
    df = clean_data()
    bins = [0, 20, 25, 35, 45, 60, 100]
    labels = ['<20', '20-25', '25-35', '35-45', '45-60', '60+']
    df['age_group'] = pd.cut(df['age'], bins=bins, labels=labels, right=False)
    movie_df = df.explode('movies_watched')
    most_watched_by_age = (
        movie_df.groupby(['age_group', 'movies_watched']).size()
        .reset_index(name='count')
        .sort_values(['age_group', 'count'], ascending=[True, False])
    )
    most_watched_by_age = most_watched_by_age.groupby("age_group").first().reset_index()
    most_watched_by_gender = (
        movie_df.groupby(['gender', 'movies_watched']).size()
        .reset_index(name='count')
        .sort_values(['gender', 'count'], ascending=[True, False])
    )
    most_watched_by_gender = most_watched_by_gender.groupby("gender").first().reset_index()
    return {
        "most_watched_movies_by_age_group": most_watched_by_age.to_dict(orient='records'),
        "most_watched_movies_by_gender": most_watched_by_gender.to_dict(orient='records'),
    }

@app.route('/api/get_movie_data', methods=['GET'])
def get_movie_data():
    try:
        data = process_movie_data()
        return jsonify({'success': True, 'data': data})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
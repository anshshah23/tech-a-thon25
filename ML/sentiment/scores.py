import logging
from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import ast
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def clean_data():
    try:
        df = pd.read_csv("converted (3).csv")
        json_columns = ['user_profile_data', 'user_activity_data', 'user_engagement_data', 'churn_indicators', 'movie_data']
        for col in json_columns:
            df[col] = df[col].apply(ast.literal_eval)
        
        movie_reviews = []
        for _, row in df.iterrows():
            for movie in row['movie_data'].get('watched_movies', []):
                if 'movie_name' in movie and 'reviews' in movie:
                    for review in movie['reviews']:
                        movie_reviews.append({
                            'movie_name': movie['movie_name'],
                            'review': review
                        })
        
        # Create a DataFrame for movie reviews
        return pd.DataFrame(movie_reviews)
    except Exception as e:
        logger.error(f"Error cleaning data: {e}")
        raise

def analyze_sentiment(text):
    try:
        return TextBlob(text).sentiment.polarity
    except Exception as e:
        logger.error(f"Error analyzing sentiment: {e}")
        return 0

def process_movie_sentiment():
    try:
        df = clean_data()
        
        # Apply sentiment analysis to each review
        df['sentiment_score'] = df['review'].apply(analyze_sentiment)
        
        # For each movie, we now add a separate sentiment column for each review
        df['sentiment_label'] = df['sentiment_score'].apply(
            lambda x: 'positive' if x > 0 else 'negative' if x < 0 else 'neutral'
        )

        # Align the sentiment result accordingly to the review, with movie_name
        return df  # Returning the DataFrame with the sentiment_score and sentiment_label columns added
    except Exception as e:
        logger.error(f"Error processing movie sentiment: {e}")
        raise

@app.route('/api/get_movie_sentiment', methods=['GET'])
def get_movie_sentiment():
    try:
        data = process_movie_sentiment()
        return jsonify({'success': True, 'data': data.to_dict(orient='records')})
    except Exception as e:
        logger.error(f"Error in API endpoint: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

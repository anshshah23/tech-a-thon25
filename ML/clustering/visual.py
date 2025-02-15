import streamlit as st
import pandas as pd
import ast
import matplotlib.pyplot as plt

bins = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 100]
labels = ['<10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40', 
          '40-45', '45-50', '50-55', '55-60', '60-70', '70-80', '80+']

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
    df['age_group'] = pd.cut(df['age'], bins=bins, labels=labels, right=False)
    movie_df = df.explode('movies_watched')

    most_watched_by_age = (
        movie_df.groupby(['age_group', 'movies_watched']).size()
        .reset_index(name='count')
        .sort_values(['age_group', 'count'], ascending=[True, False])
    )
    most_watched_by_age = most_watched_by_age.groupby("age_group").head(3)

    most_watched_by_gender = (
        movie_df.groupby(['gender', 'movies_watched']).size()
        .reset_index(name='count')
        .sort_values(['gender', 'count'], ascending=[True, False])
    )
    most_watched_by_gender = most_watched_by_gender.groupby("gender").head(3)

    return most_watched_by_age, most_watched_by_gender

st.title("Movie Watching Trends by Age & Gender")

if st.button("Load Data"):
    try:
        most_watched_by_age, most_watched_by_gender = process_movie_data()

        st.subheader("Most Watched Movies by Age Group")
        fig, ax = plt.subplots(figsize=(12, 6))
        for age_group in most_watched_by_age['age_group'].unique():
            subset = most_watched_by_age[most_watched_by_age['age_group'] == age_group]
            ax.bar(subset['movies_watched'], subset['count'], label=age_group)

        ax.set_xlabel("Movies")
        ax.set_ylabel("Watch Count")
        ax.set_title("Most Watched Movies by Age Group")
        ax.legend(title="Age Group", bbox_to_anchor=(1.05, 1), loc="upper left")
        plt.xticks(rotation=45)
        st.pyplot(fig)

        st.subheader("Most Watched Movies by Gender")
        fig, ax = plt.subplots(figsize=(8, 5))
        for gender in most_watched_by_gender['gender'].unique():
            subset = most_watched_by_gender[most_watched_by_gender['gender'] == gender]
            ax.bar(subset['movies_watched'], subset['count'], label=gender)

        ax.set_xlabel("Movies")
        ax.set_ylabel("Watch Count")
        ax.set_title("Most Watched Movies by Gender")
        ax.legend(title="Gender")
        plt.xticks(rotation=45)
        st.pyplot(fig)

        st.subheader("Most Watched Movies by Age Group")
        st.write(most_watched_by_age)

        st.subheader("Most Watched Movies by Gender")
        st.write(most_watched_by_gender)

    except Exception as e:
        st.error(f"Error processing data: {e}")

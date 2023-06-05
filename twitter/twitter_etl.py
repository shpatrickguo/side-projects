import tweepy
import pandas as pd
import json
from datetime import datetime
import s3fs
from dotenv import load_dotenv
import os

# load .env file
load_dotenv()

# get the access token
access_key = os.getenv("access_key")
access_secret = os.getenv("access_secret")
consumer_key = os.getenv("consumer_key")
consumer_secret = os.getenv("consumer_secret")

# Twitter authentication
auth = tweepy.OAuthHandler(access_key, access_secret)
auth.set_access_token(consumer_key, consumer_secret)

# Creating an API object
api = tweepy.API(auth)

tweets = api.user_timeline(screen_name='@elonmusk',
                           # 200 is the maximum allowed count
                           count = 200, 
                           include_rts = False,
                           # Necessary to keep full_tex
                           # otherwise only the first 140 words are extracted                        
                           tweet_mode = 'extended'
                           )
# Convert raw tweets
tweet_list = []
for tweet in tweets:
    text = tweet._json["full_text"]

    refined_tweet = {"user": tweet.user.screen_name,
                     "text": text,
                     "favorite_count": tweet.favorite_count,
                     "retweet_count": tweet.retweet_count,
                     "created_at": tweet.created_at
                    }
    tweet_list.append(refined_tweet)
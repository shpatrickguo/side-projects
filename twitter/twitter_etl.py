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

# Twitter API

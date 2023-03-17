import requests
import dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Access the environment variable
api_key =  os.getenv("OPENAI_KEY")

# Define the API endpoint and parameters
url = "https://api.openai.com/v1/engines/davinci-codex/completions"
prompt = "Hello,"
params = {
    "prompt": prompt,
    "max_tokens": 5,
    "temperature": 0.5,
    "n": 1,
}

# Send the API request
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json",
}
response = requests.post(url, headers=headers, json=params)

# Check if the request was successful
if response.status_code == 200:
    print("API request successful!")
    print(response.json())
else:
    print(f"API request failed with error code {response.status_code}: {response.text}")

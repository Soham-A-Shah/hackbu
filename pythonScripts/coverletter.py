import openai
import pymongo
from webscrapping import extract_text_after_keyword  # Import your web scraping functions
import requests
from bs4 import BeautifulSoup
import re

def extract_company_and_role(line):
    # Ignore the phrase "Job Application for"
    line = line.replace("Job Application for", "").strip()
    
    # Split the line into company and role
    company, role = line.split(" at ", 1)
    return company.strip(), role.strip()

# URL of the webpage
url = "https://boards.greenhouse.io/uniswaplabs/jobs/4357289005?utm_source=Simplify&ref=Simplify"

response = requests.get(url)
html_content = response.text

# Parse the HTML content
soup = BeautifulSoup(html_content, 'html.parser')

# Extract text from first 3 lines
lines = soup.get_text(separator='\n', strip=True).split('\n')[:3]

# Define the keywords
keywords = ['intern', 'associate', 'engineer', 'manager']

# Check if any keyword is present in the first 3 lines
for line in lines:
    for keyword in keywords:
        if keyword.lower() in line.lower():
            # Extract company and role information
            company, role = extract_company_and_role(line)
            print("Company:", role)
            print("Role:",company )
            break  # Stop after finding the first relevant line
    else:
        continue
    break

# Connect to MongoDB
client = pymongo.MongoClient("mongodb+srv://shubhamnavalem:HackBU123@cluster0.w9sbu7k.mongodb.net/?retryWrites=true&w=majority")
db = client["job_application_tracker_mongo"]
collection = db["job_application_tracker_mongo"]

# Retrieve old resume from MongoDB
old_resume_doc = collection.find_one()
print(old_resume_doc)

# Scrape job description
job_description = extract_text_after_keyword()  # Call your web scraping function

print(company)
print(role)
openai.api_key = "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"

prompt = f"""
Write an engaging cover letter using my experience and job description above.

Here is my old resume:

{old_resume_doc}

This is the job description and skills:

{job_description}

"""

result = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You're an expert cover letter writer."},
        {"role": "user", "content": prompt}
    ],
)

print(result)

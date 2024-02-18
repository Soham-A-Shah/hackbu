import openai
import pdfkit
import jinja2
import pymongo
import time
import json
import pandas as pd
from html_to_pdf import html_to_pdf
from webscrapping import extract_text_after_keyword  # Import your web scraping function

# Connect to MongoDB
client = pymongo.MongoClient("mongodb+srv://shubhamnavalem:HackBU123@cluster0.w9sbu7k.mongodb.net/?retryWrites=true&w=majority")
db = client["job_application_tracker_mongo"]
collection = db["job_application_tracker_mongo"]

# Retrieve old resume from MongoDB
old_resume_doc = collection.find_one()
print(old_resume_doc)
# old_resume_text = old_resume_doc["resume_text"]

# Scrape job description
job_description = extract_text_after_keyword()  # Call your web scraping function here

openai.api_key = "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"

prompt = f"""
Here is my old resume:

{old_resume_doc}

This is the job description and skills:

{job_description}

Enhance my resume and include the missing skills . Rewrite the job duties with relevant and impressive skills according to job description to improve my ATS score for this job.\n 
Return the output in following format : 
Give me a json data with proper formatting and parsing which has summary as a key and give 2 line value for that, skills as a value and give list of skills as a value,
and give experiece as a list of experiences having objects consisted of titlr, technologies and list of 3 descriptions points
   data = 
    'summary': ' ',
    'skills': ['Python', 'Java'.......]
    'experience': ['title': " ",'technologies': " ",'description': [" "," "," ",]],
    if there are multiple experiences make multiple formats inside experience bracket like above . 
"""


result = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You're an expert resume writer."},
        {"role": "user", "content": prompt}
    ],
)
# new_data = {}
# data = result.choices[0].message.content


# string_object = data.strip('```').strip()
# start_index = string_object.find('"summary": "') + len('"summary": "')
# end_index = string_object.find('"', start_index)
# summary = string_object[start_index:end_index]

# # Extracting skills
# start_index = string_object.find('"skills": [') + len('"skills": [')
# end_index = string_object.find(']', start_index) + 1
# skills = string_object[start_index:end_index]

# # Extracting experience
# start_index = string_object.find('"experience": [') + len('"experience": [')
# end_index = string_object.find(']', start_index) + 1
# experience = string_object[start_index:end_index]

# print(summary)
# print(skills)
# print(experience)
# # print(json_str.summary)
# data_dict = json.load(data)   
# print("::" ,data_dict)
# html_to_pdf(result.choices[0].message.content)

# time.sleep(5)

data2 = {
    'summary': 'Dedicated and experienced Software Engineer with a strong foundation in building robust solutions. Pursuing MS in Computer Science with a keen interest in Security Engineering. Actively seeking an opportunity to contribute to the innovation of financial products in a dynamic environment.',
    'skills': ["Python", "Java", "C++", "C#", "JavaScript", "HTML", "CSS", "SQL", "MongoDB", "PostgreSQL", "MySQL", "AWS", "Azure", "Docker", "Git", "GitHub", "Linux", "Windows", "MacOS", "TypeScript", "ReactJS", "React Native"],
    'experience': {
            "title": "Software Engineer, Iorta Technology Solutions",
            "technologies": "NodeJS | MongoDB",
            "description": [
                {
                    "Developed and executed automation scripts to enhance secure deployments and adopted secure coding practices for heightened product integrity.",
                    "Collaborated with security teams to implement robust alerting systems for immediate response to security events leveraging innovative approaches.",
                    "Conducted extensive research on vulnerabilities in Web2 and Web3 environments, specifically focusing on Defi protocols, to fortify system defenses."
                },
                {
                    "Developed and executed automation scripts to enhance secure deployments and adopted secure coding practices for heightened product integrity.",
                    "Collaborated with security teams to implement robust alerting systems for immediate response to security events leveraging innovative approaches.",
                    "Conducted extensive research on vulnerabilities in Web2 and Web3 environments, specifically focusing on Defi protocols, to fortify system defenses."
                }
            ]
    }    
}

try:
    template_loader = jinja2.FileSystemLoader('./')
    template_env = jinja2.Environment(loader=template_loader)
    template = template_env.get_template('resume.html')
    output = template.render(data2)

    config = pdfkit.configuration(wkhtmltopdf=r"C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe")
    pdfkit.from_string(output, 'resume.pdf', configuration=config)
    print("Generated PDF File")
except Exception as e:
    print("Error:", e)


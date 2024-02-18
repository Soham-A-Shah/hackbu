import openai
import pdfkit
import jinja2
import pymongo
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
Give me a json data which has summary as a key and give 2 line value for that, skills as a value and give list of skills as a value,
and give experiece as a list of experiences having objects consisted of titlr, technologies and list of 3 descriptions points
   data = 
    'summary': ' ',
    'skills': ['Python', 'Java'.......]
    'experience': [
        
            'title': " ",
            'technologies': " ",
            'description': [
                " "
                " "
                " "
            ]
        ,
  ],

if there are multiple experiences make multiple formats inside experience bracket like above . 
"""


result = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You're an expert resume writer."},
        {"role": "user", "content": prompt}
    ],
)

print(result.choices[0].message.content)


data = {
    'summary': result.choices[0].message.content.summary,
    'skills': result.choices[0].message.content.skills,
    'experience': result.choices[0].message.content.experience
}

template_loader = jinja2.FileSystemLoader('./')
template_env = jinja2.Environment(loader=template_loader)
template = template_env.get_template('resume.html')
output = template.render(data)

config = pdfkit.configuration(wkhtmltopdf=r"C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe")
pdfkit.from_string(output, 'resume.pdf', configuration=config)


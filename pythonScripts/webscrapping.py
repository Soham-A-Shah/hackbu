import requests
from bs4 import BeautifulSoup
import re

# Function to extract company and role information from the line
def extract_company_and_role(line):
    # Ignore the phrase "Job Application for"
    line = line.replace("Job Application for", "").strip()
    
    # Split the line into company and role
    company, role = line.split(" at ", 1)
    return company.strip(), role.strip()

# URL of the webpage
url = "https://boards.greenhouse.io/uniswaplabs/jobs/4357289005?utm_source=Simplify&ref=Simplify"

# Fetch the webpage content
response = requests.get(url)
html_content = response.text

# Parse the HTML content
soup = BeautifulSoup(html_content, 'html.parser')

# Extract text from first 3 lines
lines = soup.get_text(separator='\n', strip=True).split('\n')[:3]

# Define the keywords
keywords = ['intern', 'associate', 'engineer', 'manager']

# Initialize variable to store job description
job_description = ""

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

# Function to extract text after a keyword
def extract_text_after_keyword():
    keywords = ['intern', 'associate', 'engineer', 'manager']

    # Compile regular expression pattern for each keyword in the list
    patterns = [re.compile(r'{}(.*)'.format(keyword)) for keyword in keywords]
    
    # Search for each pattern in the text
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            # Get the index where the keyword is found
            start_index = match.start()
            
            # Extract text after the keyword
            extracted_text = match.group(1).strip()
            
            # Check if the length of extracted text is more than 1500 characters
            if len(extracted_text) > 1000:
                return extracted_text[:1000]  # Return first 1500 characters
            else:
                return extracted_text  # Return all text after the keyword

    # If none of the keywords are found, return a message
    return "None of the keywords found: {}".format(", ".join(keywords))

# Extract text from all elements
text = soup.get_text(strip=True)

# Define the list of keywords you want to search for (case-sensitive)
keywords  = [
    "Job Description",
    "Role Description",
    "Position Description",
    "Job Summary",
    "Role Summary",
    "Position Summary",
    "Job Overview",
    "Role Overview",
    "Position Overview",
    "Job Responsibilities",
    "Role Responsibilities",
    "Position Responsibilities",
    "Job Duties",
    "Role Duties",
    "Position Duties",
    "Job Functions",
    "Role Functions",
    "Position Functions",
    "Job Requirements",
    "Role Requirements",
    "Position Requirements",
    "Job Qualifications",
    "Role Qualifications",
    "Position Qualifications",
    "Job Skills",
    "Role Skills",
    "Position Skills",
    "Job Profile",
    "Role Profile",
    "Position Profile",
    "Role",
    "Responsibilities"
]

# Extract text after any of the keywords, limited to 1500 characters
text_after_keyword = extract_text_after_keyword()

# Print the extracted text after any of the keywords
print("Job description" + text_after_keyword)


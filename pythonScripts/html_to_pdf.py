def html_to_pdf(data):
    print("here in html ", data)
    # data = {
    #     'summary': 'Having two years of hands-on experience in building robust and scalable solutions in Software Development. Currently pursuing MS in Computer Science at Binghamton University and looking for Summer Internship / Co-op 2024.',
    #     'skills': ['Python', 'Java', 'C++', 'C#', 'JavaScript', 'HTML', 'CSS', 'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'AWS', 'Azure', 'Docker', 'Git', 'GitHub', 'Linux', 'Windows', 'MacOS'],
    #     'experience': [
    #         {
    #             'title': "Software Engineer, Iorta Technology Solutions",
    #             'technologies': "NodeJS | MongoDB",
    #             'description': [
    #                 "Designed and implemented a highly efficient Bulk Data Import/Export system using NodeJS and MongoDB, resulting in a remarkable reduction in user creation time by 95% for the admin module streamlining data migration, enhanced data integrity, and allowed users to oversee extensive user data effortlessly.",
    #                 "Integrated third-party RESTful NodeJS APIs with strong error handling, incorporating retry mechanisms and structured logging for smooth communication with external systems. Ensured reliability and resilience in unexpected scenarios.",
    #                 "Effectively applied New Relic Service for in-depth application performance analysis, resulting in data-driven optimizations that significantly improved system performance and enhanced the overall user experience."
    #             ]
    #         },
    #     ],
    # }
    import pdfkit
    import jinja2
    template_loader = jinja2.FileSystemLoader('./')
    template_env = jinja2.Environment(loader=template_loader)
    template = template_env.get_template('resume.html')
    output = template.render(data)

    config = pdfkit.configuration(wkhtmltopdf=r"C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe")
    pdfkit.from_string(output, 'resume.pdf', configuration=config)

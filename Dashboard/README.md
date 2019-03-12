The only template in use right now is Dashboard.html to generate the single page that
the app will run off of, but I left the other templates and urls in here in case someone wanted 
to run everything statically through django. 

Right now the only parts of the django backend that are generating urls are the REST APIs, one to send all of the announce messages in the database and one to get individual announce messages based on a key. The React frontend reads from this url to get the data for the dashboard. 

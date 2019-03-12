
ReactJS + Redux + Django Dashboard for Timing Testbed Monitoring

Dependencies: 

    django
    django-rest-framework
    django-webpack-loader
    database software (I am using postgres)
    node (If you want to use hot-reloading)
    pyshark
    pyshark-parser
    
    
to setup postgres (MACOSX):

    install Homebrew (if you do not already have it)
    run:  brew install postgres
    run:  brew services start postgresql
    run:  psql postrges
    create user to acess the database from django ( CREATE ROLE kgb WITH LOGIN PASSWORD '1qaz!QAZ1qaz';)
    (make sure your username and password match to whatever you create in the database and that the port information matches as well)
    grant privileges for the database to this user ( GRANT ALL PRIVILEGES ON DATABASE timing_testbed TO kgb;)
    run:  python(3) manage.py makemigrations
    run:  python(3) manage.py migrate
    npm install
    
    
to run dashboard:

    manage.py shell  (if you need to test whether django is connecting to your database)
    manage.py makemigrations Dashboard     (once you have your database set up and connecting to django)
    manage.py migrate Dashboard      (to generate sql code in your database to make your tables based on your models)
    run:  node_modules/.bin/webpack --config webpack.local.config.js to create bundle for webpack to run in django
    manage.py runserver ( to run the django web server)
    node server.js  (to run the webpack-connected server to enable hot-reloading)

#!/bin/bash

# Start Gunicorn processes
echo Starting Gunicorn.
exec gunicorn -c gunicorn.ini Timing_Testbed_Dashboard.wsgi
# PostgreSQL Setup Guide

## Prerequisites
1. PostgreSQL must be installed and running
2. Database `dashboard_react` must exist
3. User `dashboard_user` with password `Admin@123` must have access

## Steps to Setup PostgreSQL

### 1. Create the Database
Open PostgreSQL command line (psql) or pgAdmin and run:
```sql
CREATE DATABASE "dashboard_react";
```

Or using command line:
```bash
psql -U dashboard_user
CREATE DATABASE "dashboard_react";
\q
```

### 2. Verify Database Connection
Test connection with:
```bash
psql -U dashboard_user -d dashboard_react -h localhost
```

### 3. Run Migrations
```bash
cd api-server-django
.\venv\Scripts\Activate.ps1
python manage.py migrate
```

### 4. Start Server
```bash
python manage.py runserver 8000
```

## If PostgreSQL is Not Available

To use SQLite instead, set environment variable:
```bash
$env:DB_ENGINE="django.db.backends.sqlite3"
python manage.py runserver 8000
```

## Current Configuration
- Database: dashboard_react
- User: dashboard_user
- Password: Admin@123
- Host: localhost
- Port: 5432


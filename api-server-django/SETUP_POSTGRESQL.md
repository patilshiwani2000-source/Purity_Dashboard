# PostgreSQL Setup Guide

## Prerequisites
1. PostgreSQL must be installed and running
2. Database `DashboardReact` must exist
3. User `postgres` with password `Admin@123` must have access

## Steps to Setup PostgreSQL

### 1. Create the Database
Open PostgreSQL command line (psql) or pgAdmin and run:
```sql
CREATE DATABASE "DashboardReact";
```

Or using command line:
```bash
psql -U postgres
CREATE DATABASE "DashboardReact";
\q
```

### 2. Verify Database Connection
Test connection with:
```bash
psql -U postgres -d DashboardReact -h localhost
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
- Database: DashboardReact
- User: postgres
- Password: Admin@123
- Host: localhost
- Port: 5432


#!/usr/bin/env python
"""Script to create PostgreSQL database if it doesn't exist"""
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

try:
    # Connect to PostgreSQL server
    conn = psycopg2.connect(
        host='localhost',
        port=5432,
        user='postgres',
        password='Admin@123'
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    
    # Check if database exists
    cursor.execute("SELECT 1 FROM pg_database WHERE datname='DashboardReact'")
    exists = cursor.fetchone()
    
    if not exists:
        # Create database
        cursor.execute('CREATE DATABASE "DashboardReact"')
        print("Database 'DashboardReact' created successfully!")
    else:
        print("Database 'DashboardReact' already exists.")
    
    cursor.close()
    conn.close()
    print("PostgreSQL connection successful!")
    
except psycopg2.Error as e:
    print(f"PostgreSQL Error: {e}")
    exit(1)
except Exception as e:
    print(f"Error: {e}")
    exit(1)


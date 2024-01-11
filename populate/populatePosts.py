import datetime
import psycopg2
from faker import Faker
import random

conn = psycopg2.connect(
    dbname='cvwo',
    user='cvwo',
    password='cvwo',
    host='localhost',
    port='5432'
)

cursor = conn.cursor()

fake = Faker()

categories = ["Technology", "Sports", "Politics", "Entertainment", "Science", "Health", "Gaming"]
cursor.execute("SELECT FROM users WHERE username = %s", ('mockPopulate',))
if cursor.fetchone() is None:
    # Create dummy user
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", ('mockPopulate', 'mockPopulate'))

# Generate and insert mock data
for _ in range(100): 
    title = fake.sentence()
    content = fake.text()
    category = random.choice(categories)
    username = "mockPopulate"
    user_id = 1
    created_at = fake.date_between(start_date=datetime.date(2023, 1, 1), end_date=datetime.date(2023, 12, 31)).isoformat()

    # Insert data into the 'posts' table
    cursor.execute(
        "INSERT INTO posts (created_at, updated_at, title, content, category, username, user_id) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        (created_at, created_at, title, content, category, username, user_id)
    )

conn.commit()
conn.close()
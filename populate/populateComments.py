import datetime
import psycopg2
from faker import Faker

conn = psycopg2.connect(
    dbname='cvwo',
    user='cvwo',
    password='cvwo',
    host='localhost',
    port='5432'
)

cursor = conn.cursor()

fake = Faker()

cursor.execute("SELECT FROM users WHERE username = %s", ('mockPopulate',))
if cursor.fetchone() is None:
    # Create dummy user
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", ('mockPopulate', 'mockPopulate'))

# Generate and insert mock data
for _ in range(100):  
    for post_id in range(1, 101):
        content = fake.paragraph()
        username = "mockPopulate"
        user_id = 1
        created_at = fake.date_between(start_date=datetime.date(2023, 1, 1), end_date=datetime.date(2023, 12, 31)).isoformat()

        cursor.execute(
            "INSERT INTO comments (created_at, updated_at, content, username, user_id, post_id) VALUES (%s, %s, %s, %s, %s, %s)",
            (created_at, created_at, content, username, user_id, post_id)
        )

conn.commit()
conn.close()
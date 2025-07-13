"# URL-shortener" 

- *Instructions:*
- Django model ShortURL with fields: id (UUID), original_url (URLField), short_code (unique CharField), and created_at (DateTimeField). Short code is unique and randomly generated (6-8 characters).
- API endpoints:
POST /api/shorten/ accepts JSON { "url": "<original_url>" } and returns { "short_url": "<host>/<short_code>" }.
GET /<short_code> redirects (302) to the original URL.
- React Native app with input screen to enter long URL, button to call shorten endpoint and display generated short URL, and a tappable link to open it in device’s default browser using Linking.openURL().

Setup:

- *Backend:*
Clone repo
Create virtual environment
Install dependencies with pip install -r requirements.txt
Run migrations: python manage.py migrate
Start server: python manage.py runserver

- *Frontend:*
Navigate to frontend folder
Install dependencies with npm install or yarn install
Run with npx expo start


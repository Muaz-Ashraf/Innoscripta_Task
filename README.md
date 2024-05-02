This project can be containerized using docker by following these steps:

1. Clone this repository
2. Make sure you have Docker installed
3. Run command 
docker build . -t "news_app:v1.0"
4. Check if the image has been created by running
docker images
5. Now run
docker run -p 8080:8080 news_app:v1.0


# News Aggregator App

This project can be containerized using docker by following these steps:

1. Clone this repository by running 
```bash
  git clone https://github.com/Muaz-Ashraf/News_App.git
  cd NEWS_APP
```
2. Make sure you have Docker installed
3. Run command 
```bash
docker build . -t "news_app:v1.0"
```
4. Check if the image has been created by running
```bash
docker images
```
5. Now run
```
docker run -p 8080:8080 news_app:v1.0
```
6. The app will be hosted on
```
localhost:8080
```

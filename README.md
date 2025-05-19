# News App

A modern news application that displays current news articles from different categories and countries using the Mediastack API.

## Project Structure
```
news-app/
├── src/
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── README.md
```

## API Documentation

### Mediastack API
The application uses the Mediastack API to fetch news articles.

#### Base URL
```
http://api.mediastack.com/v1
```

#### Endpoints

##### News Endpoint
```
GET /news
```

#### Query Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| access_key | string | Your API key | Yes |
| countries | string | Country code (e.g., 'us', 'in') | Yes |
| categories | string | News category | Yes |
| limit | number | Number of articles to return (max 100) | No |

#### Categories Available
- general
- business
- technology
- sports
- entertainment

#### Country Codes
- us (United States)
- in (India)
- gb (United Kingdom)
- au (Australia)
- ca (Canada)

#### Response Format
```json
{
  "data": [
    {
      "title": "string",
      "description": "string",
      "url": "string",
      "image": "string",
      "published_at": "string",
      "source": "string"
    }
  ]
}
```

## Setup Instructions

1. Get your free API key from [Mediastack](https://mediastack.com/)
2. Replace the API_KEY constant in `app.js` with your key
3. Open `index.html` in a web browser

## Features
- Category-based news filtering
- Country-based news filtering
- Responsive design
- Real-time news updates
- Image display for articles
- Time-ago display for article dates

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## API Rate Limits
- Free tier: 500 requests per month
- Standard tier: 5,000 requests per month
- Professional tier: 50,000 requests per month

## Error Handling
The application handles the following error cases:
- API key invalid
- No articles found
- Network errors
- Invalid country/category selection 
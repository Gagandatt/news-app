// Get your free API key from https://newsapi.org/
// Sign up for a free account and replace this with your API key
const API_KEY = '5e998ede4e8071b626f63af701f6f16c'; // Replace with your NewsAPI key
const BASE_URL = 'https://newsapi.org/v2';

// State management
const state = {
  currentCategory: 'general',
  currentCountry: 'us'
};

// DOM Elements
const elements = {
  newsContainer: document.getElementById('news-container'),
  loadingElement: document.getElementById('loading'),
  errorElement: document.getElementById('error')
};

// Utility Functions
const timeAgo = (date) => {
  if (!date) return 'Unknown time';
  
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
};

// UI Functions
const showLoading = () => {
  elements.loadingElement.classList.remove('hidden');
};

const hideLoading = () => {
  elements.loadingElement.classList.add('hidden');
};

const showError = (message) => {
  elements.errorElement.textContent = message;
  elements.errorElement.classList.remove('hidden');
};

const hideError = () => {
  elements.errorElement.classList.add('hidden');
};

const displayNews = (articles) => {
  elements.newsContainer.innerHTML = articles.map(article => `
    <div class="card">
      <img src="${article.urlToImage}" 
           class="card-img" 
           alt="${article.title}"
           onerror="this.style.display='none'">
      <div class="card-content">
        <h3 class="card-title">${article.title || 'No Title Available'}</h3>
        <p class="card-text">${article.description || 'No description available'}</p>
      </div>
      <div class="card-footer">
        <small class="time-ago">${timeAgo(article.publishedAt)}</small>
        <a href="${article.url}" class="read-more" target="_blank">Read More</a>
      </div>
    </div>
  `).join('');
};

// Core Functions
const loadNews = async () => {
  try {
    hideError();
    showLoading();
    elements.newsContainer.innerHTML = '';

    const url = `${BASE_URL}/top-headlines?country=${state.currentCountry}&category=${state.currentCategory}&apiKey=${API_KEY}`;

    console.log('Fetching news from:', url);

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (data.status !== 'ok') {
      throw new Error(data.message || 'Failed to load news');
    }

    if (!data.articles || data.articles.length === 0) {
      throw new Error('No articles found for this country. Please try another country.');
    }

    displayNews(data.articles);
  } catch (error) {
    console.error('Detailed error:', error);
    showError(error.message || 'Failed to load news. Please try again later.');
  } finally {
    hideLoading();
  }
};

const changeCategory = (category) => {
  if (category === state.currentCategory) return;

  // Update active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.category === category) {
      link.classList.add('active');
    }
  });

  state.currentCategory = category;
  loadNews();
};

const changeCountry = (country) => {
  if (country === state.currentCountry) return;
  state.currentCountry = country;
  loadNews();
};

// Event Listeners
const setupEventListeners = () => {
  // Category links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = e.target.dataset.category;
      changeCategory(category);
    });
  });

  // Country select
  const countrySelect = document.getElementById('country-select');
  countrySelect.addEventListener('change', (e) => {
    changeCountry(e.target.value);
  });
};

// Initialize the app
const init = () => {
  setupEventListeners();
  loadNews();
};

// Start the app when the page loads
document.addEventListener('DOMContentLoaded', init); 

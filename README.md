# 📈 Growww Stock App  

Stock app— explore, search, and view stock details. 

---

## 🛠️ Tech Stack
- **Language**: TypeScript  
- **UI**: React Native + React Native Paper (for UI components)  
- **Architecture**: MVC(Modal-View-Controller) 
- **State Management**: Zustand(for saving stocks in watchlist) + React Context API(for dark mode)  
- **Navigation**: React Navigation (stack navigator)  
- **Data Fetching**: Axios (REST APIs)  
- **Storage**: AsyncStorage (local persistence) + api caching in the local storage 
- **Charts**: react-native-graph  

---

## 📂 Folder Structure
```src/
├── components/ # Reusable UI components
│ ├── ErrorState.tsx # Error UI component
│ ├── Graph.tsx # Stock graph component
│ ├── LoadingSkeleton.tsx # Skeleton loader for better UX
│ ├── navbar.tsx # Navigation bar component
│ ├── SectionHeader.tsx # Common section header
│ ├── StockCard.tsx # Stock item card
│ ├── TopBar.tsx # Top navigation bar
│ └── WatchlistModel.tsx # Modal for watchlist management
│
├── config/
│ └── env.ts # API keys & environment variables
│
├── contexts/
│ └── themeContext.tsx # Theme provider (light/dark)
│
├── navigation/
│ └── RootNavigator.tsx # Root navigation setup
│
├── screens/
│ ├── AppLayout.tsx # App layout with navigation
│ ├── ExploreScreen.tsx # Explore trending stocks
│ ├── ProductScreen.tsx # Stock detail screen
│ ├── ViewAllScreen.tsx # View all stocks/search results
│ ├── Watchlist.tsx # Watchlist screen
│ └── WatchlistsScreen.tsx # Multiple watchlists management
│
├── store/
│ └── watchlists.ts # State management for watchlists
│
├── theme/
│ └── index.js # Theme configuration (colors, fonts)
│
└── App.tsx # Entry point
```
---

## 🚀 Features
- 🔍 Search for stocks 
- 📊 View stock details with charts  
- ⭐ Add/remove stocks from watchlist  
- 📈 Explore top gainers/losers  
- 👤 Basic portfolio overview  
- ⏳ Persistent recent searches using AsyncStorage  

---

## ⚡ Future Improvements
- Optimize FlatList with virtualization for large stock lists  
- Secure storage for sensitive user data using **react-native-mmkv**  
- Offline mode with request queue replay on connectivity restore  
- Unit tests with Jest + React Native Testing Library  

---

## ▶️ How to Run
1. Clone the repo  
2. Install dependencies:  
   ```bash
   npm install
   # or
   yarn install
Run the app:

bash
Copy code
npm run android
# or
npm run ios
(Optional) Add your API key in .env as:

API_KEY=your_api_key_here
📸 Screenshots & Demo
Screenshots and demo video are available in the assets/ folder of the repository.

## 🎥 Demo Video
[![Watch the demo](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](assets/App Video.mp4)

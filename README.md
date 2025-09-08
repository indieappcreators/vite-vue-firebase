# Vue + Firebase Boilerplate

A minimal Vue 3 + Firebase boilerplate with authentication and emulator support.

## Features

- Vue 3 with Composition API
- Firebase 10 with Authentication
- Email Link Authentication
- Firebase Emulators for local development
- TypeScript support
- Vue Router for navigation

## 🚀 Quick Start

### ⚡ Get Running in 5 Minutes

1. **Install Firebase CLI (Required)**:
```bash
# Option 1: Run the setup script (recommended)
./setup.sh

# Option 2: Install manually
npm install -g firebase-tools
```

2. **Install Dependencies**:
```bash
npm install
```

3. **Configure Firebase**:
- Open `firebaseConfig.js`
- Replace placeholder values with your Firebase project config
- Update `.firebaserc` with your project ID

4. **Start Development**:
```bash
# Start everything with Firebase exec (recommended)
npm run dev

# Or separately:
npm run dev:firebase  # Firebase emulators
npm run dev:vite      # Vue dev server
```

### 🌐 Access Points
- **Vue App:** http://localhost:5173
- **Firebase Emulator UI:** http://localhost:4000

### 🔐 Test Authentication
1. Go to http://localhost:5173/login
2. Enter any email address
3. Check Firebase Emulator UI for the sign-in link
4. Click the link to sign in

## 📁 Key Files
- `firebaseConfig.js` - Your Firebase settings
- `src/views/Login.vue` - Authentication page
- `src/views/Home.vue` - Main dashboard
- `src/firebase/auth.js` - Auth functions

## Available Scripts

- `npm run dev` - Start both Vue and Firebase
- `npm run dev:vite` - Start Vite development server
- `npm run dev:firebase` - Start Firebase emulators
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/          # Vue components
├── firebase/           # Firebase configuration
├── views/              # Page components
├── router.ts           # Vue Router configuration
└── main.ts            # App entry point
```

## 🆘 Need Help?
- Run `./setup.sh` for setup assistance
- Review browser console for errors
- Ensure Firebase emulators are running

---

**That's it! You're ready to build amazing Vue apps! 🎉**

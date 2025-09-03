# 🚀 Vue + Firebase Boilerplate

A production-ready Vue 3 + Firebase boilerplate with authentication, emulator support, and minimal configuration required.

## ✨ Features

- **Vue 3** with Composition API
- **Firebase 10** with Authentication and Firestore
- **Email Link Authentication** (passwordless sign-in)
- **Firebase Emulators** for local development
- **TypeScript** support
- **Vue Router** for navigation
- **Modern UI** with responsive design
- **Zero-config** development setup

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd vite-vue-firebase
npm install
```

### 2. Configure Firebase

1. **Create a Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select existing one

2. **Get Your Config:**
   - Go to Project Settings → General
   - Scroll down to "Your apps" section
   - Click the web app icon (</>) to add a web app
   - Copy the config object

3. **Update Configuration:**
   - Open `firebaseConfig.js` in the root directory
   - Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 3. Start Development

```bash
# Start everything with Firebase exec (recommended)
npm run dev:full

# Or run them separately:
npm run dev:firebase  # Firebase emulators only
npm run dev          # Vue dev server only
```

Your app will be available at:
- **Vue App:** http://localhost:5173
- **Firebase Emulator UI:** http://localhost:4000

## 🔧 Available Scripts

- `npm run dev` - Start Vue development server
- `npm run dev:firebase` - Start Firebase emulators (Auth + Firestore)
- `npm run dev:full` - Start Vue dev server within Firebase emulator environment
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🏗️ Project Structure

```
src/
├── components/          # Reusable Vue components
├── firebase/           # Firebase configuration and utilities
│   ├── app.js         # Firebase app initialization
│   ├── auth.js        # Authentication functions
│   └── utils/         # Firebase utility functions
├── views/              # Page components
│   ├── Home.vue       # Main dashboard
│   └── Login.vue      # Authentication page
├── router.ts           # Vue Router configuration
└── main.ts            # App entry point
```

## 🔐 Authentication

This boilerplate uses **Email Link Authentication** (magic links):

1. User enters email on login page
2. Firebase sends a sign-in link to their email
3. User clicks the link to sign in automatically
4. No passwords required!

### Authentication Features

- ✅ Email link sign-in
- ✅ Automatic session management
- ✅ Protected routes
- ✅ Sign out functionality
- ✅ Development emulator support

## 🧪 Development with Emulators

The project automatically connects to Firebase emulators in development mode. Using `npm run dev:full` ensures your Vue app runs within the Firebase emulator environment:

- **Auth Emulator:** http://localhost:9099
- **Firestore Emulator:** http://localhost:8080
- **Emulator UI:** http://localhost:4000

### Benefits of Emulators

- **No Firebase costs** during development
- **Instant feedback** - no network delays
- **Reset data** easily between sessions
- **Test authentication** without real emails
- **Offline development** capability

## 🚀 Production Deployment

### 1. Build the App

```bash
npm run build
```

### 2. Deploy to Firebase Hosting

```bash
# Install Firebase CLI globally (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase Hosting (if not already done)
firebase init hosting

# Deploy
firebase deploy
```

### 3. Update Firebase Config

Make sure your `firebaseConfig.js` points to your production Firebase project (not emulators).

## 🔧 Customization

### Adding New Firebase Services

1. **Firestore:**
   ```javascript
   import { getFirestore } from 'firebase/firestore'
   export const db = getFirestore(app)
   ```

2. **Storage:**
   ```javascript
   import { getStorage } from 'firebase/storage'
   export const storage = getStorage(app)
   ```

3. **Functions:**
   ```javascript
   import { getFunctions } from 'firebase/functions'
   export const functions = getFunctions(app)
   ```

### Styling

The project uses scoped CSS with modern design principles. You can customize:
- Color schemes in CSS variables
- Component layouts and spacing
- Typography and fonts
- Responsive breakpoints

## 🐛 Troubleshooting

### Common Issues

1. **"Firebase not initialized" error:**
   - Check that `firebaseConfig.js` has correct values
   - Ensure Firebase project exists and is active

2. **Emulators not connecting:**
   - Verify ports aren't blocked by firewall
   - Check that `firebase.json` has correct emulator ports
   - Restart emulators with `npm run dev:firebase`

3. **Authentication not working:**
   - Ensure Auth is enabled in Firebase Console
   - Check that Email/Password provider is enabled
   - Verify emulator is running if in development

### Getting Help

- Check Firebase Console for error logs
- Review browser console for JavaScript errors
- Verify network connectivity
- Check Firebase project settings

## 📚 Learning Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vue Router](https://router.vuejs.org/)
- [Vite](https://vitejs.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding! 🎉**

Built with ❤️ using Vue 3 and Firebase

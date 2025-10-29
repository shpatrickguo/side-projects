# 📝 Bun Todo App

A simple, fast todo application built with [Bun](https://bun.sh), React, and TypeScript. This project demonstrates the power and simplicity of Bun as an all-in-one JavaScript runtime.

## ✨ Features

- ⚡ Lightning-fast performance powered by Bun
- 🎨 Clean, modern UI with responsive design
- 📦 Server-side rendering with React
- 🔥 Hot reload for rapid development
- 💾 In-memory todo storage (resets on server restart)
- ✅ TypeScript for type safety
- 🎯 Minimal dependencies

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0.0 or higher)

### Installation

1. Install Bun (if you haven't already):

```bash
curl -fsSL https://bun.sh/install | bash
```

2. Install dependencies:

```bash
bun install
```

## 🏃 Running the Application

### Development Mode (with hot reload)

```bash
bun run dev
```

Or run directly:

```bash
bun --hot run index.tsx
```

### Production Mode

```bash
bun run index.tsx
```

The application will start on `http://localhost:3000`

## 📖 Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a todo item in the input field
3. Click "Add Todo" or press Enter to add it to the list
4. Your todos will appear below the input field

**Note:** Todos are stored in memory and will be lost when the server restarts.

## 🏗️ Project Structure

```
bun-todo/
├── index.tsx       # Main server and React components
├── index.html      # Frontend HTML with styling and client-side JS
├── package.json    # Project dependencies and scripts
├── tsconfig.json   # TypeScript configuration
├── bun.lockb       # Bun lockfile
└── README.md       # This file
```

## 🛠️ API Endpoints

### `GET /`
Returns the main HTML page with the todo interface.

### `GET /todos`
Returns the rendered list of todos as HTML.

**Response:** HTML string of the todo list

### `POST /todos`
Creates a new todo item.

**Request Body:**
```json
{
  "todo": "Your todo item text"
}
```

**Response:** HTML string of the updated todo list

**Error Responses:**
- `400 Bad Request` - Invalid or empty todo text
- `500 Internal Server Error` - Server error while processing request

## 🧪 Technology Stack

- **Runtime:** Bun v1.3.1+
- **UI Framework:** React 19
- **Language:** TypeScript 5.9+
- **Server-Side Rendering:** React DOM Server
- **HTTP Server:** Bun native server

## 📝 Key Code Features

### Server-Side Rendering
The app uses React's `renderToString` to generate HTML on the server, providing fast initial page loads.

### Hot Reload
The `--hot` flag enables automatic server restart when files change, making development faster.

### Type Safety
Full TypeScript support with strict type checking ensures code reliability.

## 🔮 Future Enhancements

Potential improvements for this project:

- [ ] Add persistent storage (SQLite, PostgreSQL)
- [ ] Implement todo deletion and editing
- [ ] Add todo completion status
- [ ] User authentication
- [ ] Todo categories/tags
- [ ] Search and filter functionality
- [ ] Due dates and reminders
- [ ] Export/import todos

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements!

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Resources

- [Bun Documentation](https://bun.sh/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

This project was created using `bun init` and has been updated to use the latest Bun version (v1.3.1+).

# Profile Counter (Node.js + Redis)

This project is a visitor counter server written in Node.js using TypeScript, Express, Redis, and Docker. It provides an
embeddable SVG badge that increments each time it's accessed.

## ✨ Features

- ⚡ Lightweight and fast
- 🔢 Counts per unique `:key`
- 🐳 Docker & Docker Compose ready
- 🧠 Redis for efficient counter storage
- 🚀 Deployable with PM2

## 📦 Installation

### 1. Clone & Build

```bash
git clone git@github.com:leokwsw/profile-counter.git
cd profile-counter-node
docker-compose up --build
```

### 2. Access Counter

```md
<img src="http://localhost:3000/mykey/count.svg" alt="Visitor Count" />
```

Every time the image is loaded, the count will increment for `mykey`.

## 🛠 Development

```bash
npm install
npm run dev
```

## 🧪 Build

```bash
npm run build
```

## 🚀 Start

```bash
docker-compose up
```

## 📄 License

Leo Wu

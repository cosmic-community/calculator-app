# Calculator App

![Calculator Preview](https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=300&fit=crop&auto=format)

A modern, responsive calculator application built with Next.js 15 and TypeScript. Features basic arithmetic operations with a clean, intuitive interface that works seamlessly on both desktop and mobile devices.

## ✨ Features

- **Basic Arithmetic Operations**: Addition, subtraction, multiplication, and division
- **Clear Functions**: All clear (AC) and delete (DEL) functionality  
- **Decimal Support**: Handle decimal numbers with precision
- **Keyboard Support**: Full keyboard input for enhanced usability
- **Responsive Design**: Optimized for desktop and mobile devices
- **Error Handling**: Graceful handling of division by zero and invalid operations
- **Modern UI**: Clean, dark theme with smooth hover animations
- **TypeScript**: Full type safety and excellent developer experience

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68baa6e8285c02bfe718dac5&clone_repository=68baa7b0285c02bfe718dac8)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built as a standalone utility application

### Code Generation Prompt

> Build a calculator app with basic arithmetic operations and a clean interface

The app has been tailored to work as a standalone utility application and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Hooks** - useState for state management
- **Responsive Design** - Mobile-first approach with Tailwind breakpoints

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

1. Clone the repository
2. Install dependencies:
```bash
bun install
```

3. Run the development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 Usage

### Mouse/Touch Input
- Click on number buttons (0-9) to input numbers
- Click on operation buttons (+, -, ×, ÷) to select operations
- Click "=" to calculate the result
- Click "AC" to clear all input
- Click "DEL" to delete the last character
- Click "." for decimal point input

### Keyboard Input
- **Numbers**: 0-9 keys
- **Operations**: +, -, *, / keys
- **Calculate**: Enter key
- **Clear All**: Escape key
- **Delete**: Backspace key
- **Decimal**: Period (.) key

## 🏗️ Project Structure

```
calculator-app/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── Calculator.tsx
├── types.ts
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎯 Key Features Explained

### State Management
The calculator uses React's `useState` hook to manage:
- Current display value
- Previous operand
- Current operation
- Calculation state

### Error Handling
- Division by zero returns "Error"
- Invalid operations are handled gracefully
- Input validation prevents invalid number formats

### Responsive Design
- Mobile-first design approach
- Touch-friendly button sizes
- Adaptive layout for different screen sizes

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Netlify
1. Build the project: `bun run build`
2. Deploy the `out` folder to Netlify

### Other Platforms
The app can be deployed to any platform that supports Next.js applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.
<!-- README_END -->
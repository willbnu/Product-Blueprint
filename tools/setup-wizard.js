#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const CONFIG = {
    projectName: '',
    platforms: [],
    authProvider: 'supabase',
    envFile: true
};

console.log("\x1b[36m%s\x1b[0m", "\n🚀 Product-Blueprint Setup Wizard\n");
console.log("This wizard will help you configure your project.\n");

const questions = [
    {
        key: 'projectName',
        question: '📛 What is your project name? ',
        validate: (val) => val.length > 0
    },
    {
        key: 'platforms',
        question: '📱 Which platforms? (mobile/web/both) [both]: ',
        default: 'both',
        transform: (val) => {
            if (val === 'both' || val === '') return ['mobile', 'web'];
            return [val];
        }
    },
    {
        key: 'authProvider',
        question: '🔐 Auth provider? (supabase/firebase/none) [supabase]: ',
        default: 'supabase'
    }
];

let currentIndex = 0;

function askQuestion() {
    if (currentIndex >= questions.length) {
        finishSetup();
        return;
    }

    const q = questions[currentIndex];
    rl.question(q.question, (answer) => {
        const value = answer || q.default || '';

        if (q.validate && !q.validate(value)) {
            console.log("❌ Invalid input, please try again.");
            askQuestion();
            return;
        }

        CONFIG[q.key] = q.transform ? q.transform(value) : value;
        currentIndex++;
        askQuestion();
    });
}

function finishSetup() {
    console.log("\n✨ Configuration complete!\n");
    console.log("📋 Summary:");
    console.log(`   Project: ${CONFIG.projectName}`);
    console.log(`   Platforms: ${Array.isArray(CONFIG.platforms) ? CONFIG.platforms.join(', ') : CONFIG.platforms}`);
    console.log(`   Auth: ${CONFIG.authProvider}`);

    // Create .env.example
    const envContent = `# ${CONFIG.projectName} Environment Variables
# Copy this to .env.local and fill in your values

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_NAME=${CONFIG.projectName}
`;

    fs.writeFileSync('.env.example', envContent);
    console.log("\n✅ Created .env.example");

    console.log("\n🎯 Next steps:");
    console.log("   1. Copy .env.example to .env.local");
    console.log("   2. Fill in your Supabase credentials");
    console.log("   3. Run: npm install");
    console.log("   4. Run: npm run dev\n");

    rl.close();
}

askQuestion();

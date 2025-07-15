#!/bin/bash

echo "🔧 Fixing ApexCharts NaN errors..."

# Fix 1: Update ApexCharts to compatible version
echo "📦 Updating ApexCharts version..."
npm install apexcharts@^4.0.0

# Fix 2: Ensure react-apexcharts is compatible
echo "📦 Updating react-apexcharts..."
npm install react-apexcharts@^1.4.1

# Fix 3: Clear npm cache to ensure clean install
echo "🧹 Clearing npm cache..."
npm cache clean --force

# Fix 4: Reinstall dependencies
echo "♻️ Reinstalling dependencies..."
rm -rf node_modules package-lock.json
npm install

echo "✅ ApexCharts fix complete! The NaN errors should be resolved."
echo "🚀 Please restart your development server."
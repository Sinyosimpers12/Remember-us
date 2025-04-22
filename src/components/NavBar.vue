<template>
    <nav>
      <div class="nav-container">
        <div class="nav-brand">AlbumKita!</div>
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/upload">Upload</router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <style scoped>
  nav {
    padding: 20px;
    background-color: #ffffff;
  }
  
  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .nav-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: #000000;
  }
  
  .nav-links {
    display: flex;
    gap: 20px;
  }
  
  nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  nav a:hover {
    background-color: #f0f0f0;
  }
  
  nav a.router-link-exact-active {
    color: #42b983;
    background-color: #e8f5e9;
  }
  </style>
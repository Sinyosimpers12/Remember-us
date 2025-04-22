<script setup lang="ts">
// Data tentang aplikasi
const appInfo = {
  name: "Remember Us",
  version: "1.0.0",
  description: "Aplikasi album foto sederhana untuk menyimpan kenangan berharga",
  features: [
    "Tampilan foto dalam grid",
    "Detail foto saat diklik",
    "Navigasi mudah",
    "Tampilan responsif",
    "Tujuan Aplikasi Yohana"
  ]
}

const developers = [
  {
    name: "Sinyo Simpers Soba",
    role: "Full Stack Developer",
    contact: "sinyosimpers@outlook.com"
  }
]
</script>

<template>
  <div class="about-container">
    <h1>Tentang Aplikasi</h1>
    
    <section class="about-section">
      <h2>{{ appInfo.name }}</h2>
      <p class="version">Versi: {{ appInfo.version }}</p>
      <p class="description">{{ appInfo.description }}</p>
      
      <div class="features">
        <h3>Fitur Utama:</h3>
        <ul>
          <li v-for="(feature, index) in appInfo.features" :key="index">
            {{ feature }}
          </li>
        </ul>
      </div>
    </section>

    <section class="team-section">
      <h2>Tim Pengembang</h2>
      <div class="developer-card" v-for="(dev, index) in developers" :key="index">
        <h3>{{ dev.name }}</h3>
        <p><strong>Peran:</strong> {{ dev.role }}</p>
        <p><strong>Kontak:</strong> {{ dev.contact }}</p>
      </div>
    </section>

    <footer class="app-footer">
      <p>&copy; 2023 {{ appInfo.name }}. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: #2c3e50;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #42b983;
  font-size: 2.5rem;
}

h2 {
  color: #42b983;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
  margin-top: 2rem;
}

h3 {
  color: #35495e;
}

.about-section, .team-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.version {
  color: #7f8c8d;
  font-style: italic;
}

.description {
  line-height: 1.6;
  margin: 1rem 0;
}

.features ul {
  padding-left: 1.5rem;
  line-height: 1.8;
}

.developer-card {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  margin: 1rem 0;
}

.app-footer {
  text-align: center;
  margin-top: 3rem;
  padding: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;
}

/* Responsive design */
@media (max-width: 600px) {
  .about-container {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}
</style>
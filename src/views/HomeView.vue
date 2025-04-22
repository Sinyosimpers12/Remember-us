<template>
    <div class="image-index">
      
      <!-- Loading state -->
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Memuat gambar agak lama emang ...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="error-message">
        <p>Gagal memuat data: {{ error }}</p>
        <button @click="fetchImages" class="retry-button">Coba Lagi</button>
      </div>
      
      <!-- Main content -->
      <template v-else>
        <div v-if="images.length === 0" class="empty-state">
          <p>Tidak ada gambar yang tersedia</p>
        </div>
        
        <div v-else class="image-grid">
          <div 
            v-for="(item, index) in images" 
            :key="index" 
            class="image-card"
            @click="showDetail(item)"
          >
            <div class="image-wrapper">
              <img 
                :src="item.image" 
                :alt="item.title" 
                loading="lazy"
                @load="imageLoaded"
              />
              <div class="image-overlay">
                <h3>{{ item.title }}</h3>
              </div>
            </div>
          </div>
        </div>
      </template>
  
      <!-- Modal -->
      <div 
        v-if="selectedImage" 
        class="modal" 
        @click.self="selectedImage = null"
      >
        <div class="modal-content">
          <span class="close-button" @click="selectedImage = null">&times;</span>
          <h2>{{ selectedImage.title }}</h2>
          <p class="modal-description">{{ selectedImage.description }}</p>
          <p class="modal-date"><strong>Tanggal:</strong> {{ formatDate(selectedImage.date) }}</p>
          <div class="modal-image-container">
            <img 
              :src="selectedImage.image" 
              :alt="selectedImage.title" 
              class="modal-image"
            />
          </div>
          <button @click="selectedImage = null" class="modal-close-button">Tutup</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        images: [],
        selectedImage: null,
        isLoading: false,
        error: null,
        loadedImages: 0
      }
    },
    methods: {
      async fetchImages() {
        this.isLoading = true
        this.error = null
        try {
          const res = await axios.get(
            'https://filosi-73b7e-default-rtdb.asia-southeast1.firebasedatabase.app/url.json'
          )
          this.images = Object.values(res.data)
        } catch (err) {
          console.error('Error fetching images:', err)
          this.error = err.message || 'Gagal memuat data'
        } finally {
          this.isLoading = false
        }
      },
      showDetail(item) {
        this.selectedImage = item
        document.body.style.overflow = 'hidden' // Prevent scrolling when modal is open
      },
      imageLoaded() {
        this.loadedImages++
      },
      formatDate(dateString) {
        if (!dateString) return 'Tidak tersedia'
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('id-ID', options)
      }
    },
    watch: {
      selectedImage(newVal) {
        if (!newVal) {
          document.body.style.overflow = '' // Restore scrolling when modal is closed
        }
      }
    },
    mounted() {
      this.fetchImages()
    }
  }
  </script>
  
  <style scoped>
  .image-index {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .page-title {
    text-align: center;
    color: #42b983;
    margin-bottom: 2rem;
    font-size: 2.2rem;
    font-weight: 600;
  }
  
  /* Loading state */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    gap: 1rem;
  }
  
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #42b983   ;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Error state */
  .error-message {
    text-align: center;
    padding: 2rem;
    background: #ffecec;
    border-radius: 8px;
    color: #e74c3c;
  }
  
  .retry-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .retry-button:hover {
    background: #c0392b;
  }
  
  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 8px;
  }
  
  /* Image grid */
  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .image-card {
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .image-card:hover {
    transform: translateY(-5px);
  }
  
  .image-wrapper {
    position: relative;
    border-radius: 2    px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    aspect-ratio: 4/3;
  }
  
  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .image-card:hover .image-wrapper img {
    transform: scale(1.05);
  }
  
  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    padding: 1rem;
    color: white;
  }
  
  .image-overlay h3 {
    margin: 0;
    font-size: 1.1rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }
  
  /* Modal */
  .modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
  }
  
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    color: #7f8c8d;
    transition: color 0.3s;
  }
  
  .close-button:hover {
    color: #e74c3c;
  }
  
  .modal h2 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  .modal-description {
    color: #34495e;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .modal-date {
    color: #7f8c8d;
    margin-bottom: 1.5rem;
  }
  
  .modal-image-container {
    margin: 1rem 0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .modal-image {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    border-radius: 8px;
  }
  
  .modal-close-button {
    display: block;
    margin: 1.5rem auto 0;
    padding: 0.7rem 1.5rem;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
  }
  
  .modal-close-button:hover {
    background: #2980b9;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .image-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
    
    .modal-content {
      padding: 1.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .image-index {
      padding: 1rem;
    }
    
    .page-title {
      font-size: 1.8rem;
    }
    
    .image-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>
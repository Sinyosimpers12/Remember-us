<template>
    <div class="upload-container">
      <div class="header">
        <h1>Upload Gambar Baru</h1>
        <p class="subtitle">Bagikan momen berharga Anda dengan Pasangan mu</p>
      </div>
  
      <div class="upload-card">
        <div class="upload-form">
          <div class="form-group">
            <label for="title">Judul Gambar<span class="required">*</span></label>
            <input 
              type="text" 
              id="title" 
              v-model="title" 
              placeholder="Contoh: Sunset di Pantai Kuta" 
              required
              class="input-field"
            >
          </div>
  
          <div class="form-group">
            <label for="description">Deskripsi Gambar</label>
            <textarea
              id="description"
              v-model="description"
              placeholder="Ceritakan lebih detail tentang gambar ini..."
              rows="4"
              maxlength="500"
              class="textarea-field"
            ></textarea>
            <div class="flex-row">
              <p class="char-count">{{ description.length }}/500 karakter</p>
              <p class="hint">Opsional</p>
            </div>
          </div>
  
          <div class="form-group">
            <label for="date">Tanggal Upload<span class="required">*</span></label>
            <input 
              type="date" 
              id="date" 
              v-model="date" 
              required
              class="input-field"
            >
          </div>
  
          <div class="form-group">
            <label for="image-upload">Pilih Gambar<span class="required">*</span></label>
            <div class="file-upload-wrapper">
              <label for="image-upload" class="file-upload-label">
                <span v-if="!previewImage" class="file-upload-content">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 13V19H5V13H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13H19ZM13 5V15H11V5H6L12 0L18 5H13Z" fill="#42b983"/>
                  </svg>
                  <span>Klik untuk memilih file</span>
                </span>
                <span v-else class="file-selected">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.433 13.134L15.187 6.38L16.245 7.438L8.433 15.25L4.245 11.062L5.303 10.004L8.433 13.134ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6867 3.825 17.9743 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.261667 8.61667 -0.000666667 10 0C11.3833 0 12.6833 0.262667 13.9 0.788C15.1167 1.31333 16.175 2.02567 17.075 2.925C17.975 3.825 18.6877 4.88333 19.213 6.1C19.7383 7.31667 20.0007 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6867 15.1167 17.9743 16.175 17.075 17.075C16.175 17.975 15.1167 18.6877 13.9 19.213C12.6833 19.7383 11.3833 20.0007 10 20Z" fill="#42b983"/>
                  </svg>
                  File terpilih
                </span>
              </label>
              <input
                type="file"
                id="image-upload"
                accept="image/jpeg, image/png, image/gif"
                @change="handleFileChange"
                class="file-input"
                required
              >
            </div>
            <p class="file-hint">Format: JPEG, PNG, GIF (Maks. 5MB)</p>
          </div>
  
          <div v-if="previewImage" class="image-preview">
            <div class="preview-header">
              <h3>Pratinjau Gambar</h3>
              <button @click="previewImage = null" class="remove-preview">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L4 12M4 4L12 12" stroke="#e74c3c" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            <div class="preview-image-container">
              <img :src="previewImage" alt="Preview gambar" class="preview-image">
            </div>
          </div>
  
          <button
            @click="uploadImage"
            :disabled="!title || !date || !previewImage || isLoading"
            class="upload-button"
            :class="{ 'loading': isLoading }"
          >
            <span v-if="isLoading">
              <svg class="spinner" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
              </svg>
              Mengupload...
            </span>
            <span v-else>Upload Gambar</span>
          </button>
  
          <div v-if="uploadStatus" class="upload-status" :class="{ 'success': uploadStatus === 'Upload berhasil!', 'error': uploadStatus === 'Upload gagal!' }">
            <svg v-if="uploadStatus === 'Upload berhasil!'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.433 13.134L15.187 6.38L16.245 7.438L8.433 15.25L4.245 11.062L5.303 10.004L8.433 13.134ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6867 3.825 17.9743 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.261667 8.61667 -0.000666667 10 0C11.3833 0 12.6833 0.262667 13.9 0.788C15.1167 1.31333 16.175 2.02567 17.075 2.925C17.975 3.825 18.6877 4.88333 19.213 6.1C19.7383 7.31667 20.0007 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6867 15.1167 17.9743 16.175 17.075 17.075C16.175 17.975 15.1167 18.6877 13.9 19.213C12.6833 19.7383 11.3833 20.0007 10 20Z" fill="#42b983"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="#e74c3c"/>
            </svg>
            <span>{{ uploadStatus }}</span>
          </div>
        </div>
      </div>
  
      <div v-if="imageUrls.length" class="gallery-section">
        <div class="section-header">
          <h2>Daftar Gambar</h2>
          <p class="section-subtitle">{{ imageUrls.length }} gambar tersimpan</p>
        </div>
        <div class="gallery-grid">
          <div v-for="(item, index) in imageUrls" :key="index" class="gallery-card">
            <div class="card-image">
              <img :src="item.image" :alt="item.title" class="gallery-image">
            </div>
            <div class="card-body">
              <h4 class="card-title">{{ item.title }}</h4>
              <p class="card-description" v-if="item.description">{{ item.description }}</p>
              <div class="card-footer">
                <span class="card-date">{{ formatDate(item.date) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        title: '',
        description: '',
        date: '',
        previewImage: null,
        uploadStatus: '',
        isLoading: false,
        imageUrls: []
      }
    },
    methods: {
      handleFileChange(e) {
        const file = e.target.files[0]
        if (file && file.size < 5 * 1024 * 1024) {
          const reader = new FileReader()
          reader.onload = () => {
            this.previewImage = reader.result
          }
          reader.readAsDataURL(file)
        } else {
          this.uploadStatus = 'Ukuran file terlalu besar. Maksimal 5MB.'
          setTimeout(() => {
            this.uploadStatus = ''
          }, 3000)
        }
      },
      async uploadImage() {
        this.isLoading = true
        this.uploadStatus = ''
        const data = {
          title: this.title,
          description: this.description,
          date: this.date,
          image: this.previewImage
        }
        try {
          await axios.post(
            'https://filosi-73b7e-default-rtdb.asia-southeast1.firebasedatabase.app/url.json',
            data
          )
          this.uploadStatus = 'Upload berhasil!'
          this.imageUrls.unshift(data) // Add new image at the beginning
          this.resetForm()
        } catch (error) {
          console.error(error)
          this.uploadStatus = 'Upload gagal! Silakan coba lagi.'
        } finally {
          this.isLoading = false
          setTimeout(() => {
            this.uploadStatus = ''
          }, 3000)
        }
      },
      resetForm() {
        this.title = ''
        this.description = ''
        this.date = ''
        this.previewImage = null
        document.getElementById('image-upload').value = ''
      },
      async fetchImages() {
        try {
          const res = await axios.get(
            'https://filosi-73b7e-default-rtdb.asia-southeast1.firebasedatabase.app/url.json'
          )
          const data = res.data
          if (data) {
            this.imageUrls = Object.values(data).reverse() // Show newest first
          }
        } catch (error) {
          console.error('Gagal mengambil data:', error)
        }
      },
      formatDate(dateString) {
        if (!dateString) return ''
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('id-ID', options)
      }
    },
    mounted() {
      this.fetchImages()
      // Set default date to today
      const today = new Date()
      this.date = today.toISOString().split('T')[0]
    }
  }
  </script>
  
  <style scoped>
  /* Base Styles */
  .upload-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #2c3e50;
  }
  
  .header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  h1 {
    color: #2c3e50;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: #7f8c8d;
    font-size: 1rem;
    margin: 0;
  }
  
  h2 {
    color: #2c3e50;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .section-header {
    margin-bottom: 1.5rem;
  }
  
  .section-subtitle {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin: 0;
  }
  
  /* Upload Card */
  .upload-card {
    background: white;
    border-radius: 12px;
    padding: 3rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    margin-bottom: 1rem;
  }
  
  /* Form Styles */
  .form-group {
    margin-bottom: 1.75rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #2c3e50;
    font-size: 0.95rem;
  }
  
  .required {
    color: #e74c3c;
    margin-left: 0.25rem;
  }
  
  .input-field {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background-color: #f9f9f9;
  }
  
  .input-field:focus {
    border-color: #42b983;
    box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
    outline: none;
    background-color: white;
  }
  
  .textarea-field {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    min-height: 120px;
    resize: vertical;
    transition: all 0.3s ease;
    background-color: #f9f9f9;
  }
  
  .textarea-field:focus {
    border-color: #42b983;
    box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
    outline: none;
    background-color: white;
  }
  
  .flex-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.25rem;
  }
  
  .char-count {
    font-size: 0.8rem;
    color: #95a5a6;
  }
  
  .hint {
    font-size: 0.8rem;
    color: #95a5a6;
    font-style: italic;
  }
  
  /* File Upload */
  .file-upload-wrapper {
    position: relative;
    margin-bottom: 0.5rem;
  }
  
  .file-input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  
  .file-upload-label {
    display: block;
    width: 100%;
    padding: 1.5rem;
    border: 2px dashed #e0e0e0;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #f9f9f9;
  }
  
  .file-upload-label:hover {
    border-color: #42b983;
    background-color: rgba(66, 185, 131, 0.05);
  }
  
  .file-upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #7f8c8d;
  }
  
  .file-selected {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #42b983;
    font-weight: 500;
  }
  
  .file-hint {
    font-size: 0.85rem;
    color: #95a5a6;
    margin: 0;
  }
  
  /* Image Preview */
  .image-preview {
    margin: 1.5rem 0;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e0e0e0;
  }
  
  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: #f9f9f9;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .preview-header h3 {
    font-size: 1rem;
    margin: 0;
    color: #2c3e50;
  }
  
  .remove-preview {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .preview-image-container {
    padding: 1rem;
    background: white;
    text-align: center;
  }
  
  .preview-image {
    max-width: 100%;
    max-height: 300px;
    border-radius: 4px;
    object-fit: contain;
  }
  
  /* Upload Button */
  .upload-button {
    width: 100%;
    padding: 1rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .upload-button:hover {
    background-color: #3aa876;
    transform: translateY(-1px);
  }
  
  .upload-button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
    transform: none;
  }
  
  .upload-button.loading {
    background-color: #42b983;
  }
  
  /* Spinner Animation */
  .spinner {
    animation: rotate 2s linear infinite;
    width: 20px;
    height: 20px;
  }
  
  .spinner .path {
    stroke: white;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
  
  /* Upload Status */
  .upload-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    margin-top: 1rem;
    font-size: 0.95rem;
  }
  
  .upload-status.success {
    background-color: rgba(66, 185, 131, 0.1);
    color: #42b983;
  }
  
  .upload-status.error {
    background-color: rgba(231, 76, 60, 0.1);
    color: #e74c3c;
  }
  
  /* Gallery Section */
  .gallery-section {
    margin-top: 2rem;
  }
  
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .gallery-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  
  .gallery-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
  
  .card-image {
    height: 180px;
    overflow: hidden;
  }
  
  .gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .gallery-card:hover .gallery-image {
    transform: scale(1.05);
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .card-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .card-description {
    font-size: 0.85rem;
    color: #7f8c8d;
    margin: 0 0 0.75rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-date {
    font-size: 0.75rem;
    color: #95a5a6;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .upload-container {
      padding: 1rem;
    }
    
    .upload-card {
      padding: 1.5rem;
    }
    
    h1 {
      font-size: 1.75rem;
    }
    
    .gallery-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }
  
  @media (max-width: 480px) {
    .upload-card {
      padding: 1rem;
    }
    
    .gallery-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>
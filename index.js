require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: 'https://netflix-clone-app-backend.onrender.com'
}))

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'en-US',
  },
})

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Netflix backend is running!' })
})

// One route per endpoint — simple and works with Express v5
app.get('/api/trending', async (req, res) => {
  try {
    const { data } = await tmdb.get('/trending/all/week')
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/netflix-originals', async (req, res) => {
  try {
    const { data } = await tmdb.get('/discover/tv', { params: { with_network: 213 } })
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/top-rated', async (req, res) => {
  try {
    const { data } = await tmdb.get('/movie/top_rated')
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/action', async (req, res) => {
  try {
    const { data } = await tmdb.get('/discover/movie', { params: { with_genres: 28 } })
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/comedy', async (req, res) => {
  try {
    const { data } = await tmdb.get('/discover/movie', { params: { with_genres: 35 } })
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/horror', async (req, res) => {
  try {
    const { data } = await tmdb.get('/discover/movie', { params: { with_genres: 27 } })
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/romance', async (req, res) => {
  try {
    const { data } = await tmdb.get('/discover/movie', { params: { with_genres: 10749 } })
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/documentaries', async (req, res) => {
  try {
    const { data } = await tmdb.get('/discover/movie', { params: { with_genres: 99 } })
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/trailer/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params
    const { data } = await tmdb.get(`/${type}/${id}/videos`)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
import { useState, useEffect } from 'react'
import { fetchStarredRepos } from './services/githubApi'
import './App.css'

function App() {
  const [repos, setRepos] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadRepos = async () => {
      setLoading(true)
      try {
        const data = await fetchStarredRepos(page)
        setRepos(prev => page === 1 ? data : [...prev, ...data])
      } catch (error) {
        console.error('Failed to fetch repos:', error)
      }
      setLoading(false)
    }
    loadRepos()
  }, [page])

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        setPage(prev => prev + 1)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <header className="action-bar">
        <h1>Trending Repos</h1>
      </header>

      <main className="repo-list">
        {repos.map(repo => (
          <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-item">
            <div className="repo-header">
              <img src={repo.owner.avatar_url} alt={repo.owner.login} className="avatar" />
              <div className="repo-info">
                <h3 className="repo-name">{repo.name}</h3>
                <p className="repo-owner">by {repo.owner.login}</p>
              </div>
            </div>
            <p className="repo-description">{repo.description}</p>
            <div className="repo-stats">
              <span className="stars">⭐ {repo.stargazers_count}</span>
            </div>
          </a>
        ))}
        {loading && <p className="loading">Loading...</p>}
      </main>

      <footer className="footer">
        <p>Aizzat bin Suhardi 2025</p>
      </footer>
    </div>
  )
}

export default App

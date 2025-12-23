import { useState, useEffect, useMemo } from "react";

const DUMMY_VIDEOS = [
  {
    id: 1,
    title: "Classical Mechanics: Laws of Motion and Energy Conservation",
    thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=450&fit=crop",
    duration: "2:30:15",
    category: "Physics",
    notesLink: "https://example.com/notes/physics-1"
  },
  {
    id: 2,
    title: "Organic Chemistry: Understanding Chemical Bonds and Reactions",
    thumbnail: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&h=450&fit=crop",
    duration: "1:45:30",
    category: "Chemistry",
    notesLink: "https://example.com/notes/chemistry-1"
  },
  {
    id: 3,
    title: "Calculus Fundamentals: Derivatives and Integrals Explained",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop",
    duration: "3:15:45",
    category: "Math",
    notesLink: "https://example.com/notes/math-1"
  },
  {
    id: 4,
    title: "Quantum Physics: Wave-Particle Duality and Uncertainty Principle",
    thumbnail: "https://images.unsplash.com/photo-1635070041409-e63e783ce3e0?w=800&h=450&fit=crop",
    duration: "2:10:20",
    category: "Physics",
    notesLink: "https://example.com/notes/physics-2"
  },
  {
    id: 5,
    title: "Electrochemistry: Redox Reactions and Cell Potential",
    thumbnail: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&h=450&fit=crop",
    duration: "1:55:10",
    category: "Chemistry",
    notesLink: "https://example.com/notes/chemistry-2"
  },
  {
    id: 6,
    title: "Linear Algebra: Matrices, Vectors and Transformations",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=450&fit=crop",
    duration: "2:40:55",
    category: "Math",
    notesLink: "https://example.com/notes/math-2"
  }
];

const CATEGORIES = ["All", "Physics", "Chemistry", "Math", "English", "Fine Arts"];

function Home() {
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const filteredVideos = useMemo(() => {
    return DUMMY_VIDEOS.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || video.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    // Disable text selection on mobile
    document.body.style.webkitUserSelect = "none";
    document.body.style.userSelect = "none";

    // Disable zoom/pinch
    const handleTouchMove = (e) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header className="header" data-testid="header">
        <div className="header-left">
          <div className="app-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div className="header-text">
            <h1 className="logo" data-testid="logo">PRO STREAM</h1>
            <p className="tagline">Learn Smarter, Not Harder</p>
          </div>
        </div>
        <div className="header-right">
          <a href="/gitpush" className="git-push-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            data-testid="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
          <div className="profile-container">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Profile"
              className="profile-pic"
              data-testid="profile-pic"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Search Bar */}
        <div className="search-container" data-testid="search-container">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search videos..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="search-input"
          />
        </div>

        {/* Category Pills */}
        <div className="categories-section">
          <h2 className="section-title">Browse by Subject</h2>
          <div className="categories-wrapper" data-testid="categories-wrapper">
            <div className="categories">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={`category-pill ${activeCategory === category ? "active" : ""}`}
                  onClick={() => setActiveCategory(category)}
                  data-testid={`category-${category.toLowerCase()}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="video-section">
          <h2 className="section-title">Available Videos</h2>
          <div className="video-grid" data-testid="video-grid">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <div key={video.id} className="video-card" data-testid={`video-card-${video.id}`}>
                  <div className="thumbnail-container">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="thumbnail"
                      loading="lazy"
                    />
                    <span className="duration-badge" data-testid={`duration-${video.id}`}>
                      {video.duration}
                    </span>
                    <div className="category-badge">{video.category}</div>
                  </div>
                  <div className="video-info">
                    <h3 className="video-title" data-testid={`title-${video.id}`}>
                      {video.title}
                    </h3>
                    <a
                      href={video.notesLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="notes-button"
                      data-testid={`notes-${video.id}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span>Notes</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results" data-testid="no-results">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <p>No videos found</p>
                <span>Try searching for something else</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
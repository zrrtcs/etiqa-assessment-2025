// Get date N days ago in YYYY-MM-DD format
export const getDateFromDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

// Fetch starred repos from GitHub API
export const fetchStarredRepos = async (page = 1) => {
  const createdDate = getDateFromDaysAgo(10);
  const query = `sort=stars&order=desc&created:>=${createdDate}`;
  const url = `https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=10`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Failed to fetch repos:', error);
    throw error;
  }
};

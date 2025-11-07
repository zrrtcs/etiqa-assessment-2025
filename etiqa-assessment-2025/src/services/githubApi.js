/**
 * Calculate date from N days ago
 * @param {number} days - Number of days in the past
 * @returns {string} - Formatted date string (YYYY-MM-DD)
 */
export const getDateFromDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

/**
 * Fetch most starred GitHub repos created in the last 10 days
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise<Array>} - Array of repository objects
 */
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

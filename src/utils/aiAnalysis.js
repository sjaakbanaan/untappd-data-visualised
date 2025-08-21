/* eslint-disable no-console */
import { GoogleGenerativeAI } from '@google/generative-ai';
import { formatWrappdDates, getLocalStorageData } from '../utils';

export const analyzeBeerDataWithAI = async (beerData) => {
  if (!beerData || beerData.length === 0) {
    throw new Error('No beer data available for analysis');
  }

  const apiKey = getLocalStorageData('gemini_api_key');

  if (!apiKey) {
    throw new Error(
      'Gemini API key not found. Please add your Gemini API key in the upload form.'
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Try different models in order of preference
  const modelsToTry = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro'];
  let model = null;
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      model = genAI.getGenerativeModel({ model: modelName });
      // Test the model with a simple prompt
      const testResult = await model.generateContent('Hello');
      await testResult.response;
      console.log(`Successfully connected to ${modelName}`);
      break;
    } catch (err) {
      lastError = err;
      console.log(`Failed to connect to ${modelName}:`, err.message);
      continue;
    }
  }

  if (!model) {
    throw new Error(
      `Failed to connect to any available models. Last error: ${lastError?.message}`
    );
  }

  // Prepare data for analysis
  const analysisData = {
    totalCheckins: beerData.length,
    uniqueBeers: [
      ...new Set(beerData.map((item) => `${item.beer_name} (${item.brewery_name})`)),
    ].length,
    uniqueBreweries: [...new Set(beerData.map((item) => item.brewery_name))].length,
    averageRating:
      beerData.reduce((sum, item) => sum + (item.rating_score || 0), 0) / beerData.length,
    topRatedBeers: beerData
      .filter((item) => item.rating_score)
      .sort((a, b) => b.rating_score - a.rating_score)
      .slice(0, beerData.length > 50 ? 50 : beerData.length)
      .map((item) => ({
        name: `${item.beer_name} (${item.brewery_name})`,
        rating: item.rating_score,
        brewery: item.brewery_name,
        country: item.brewery_country,
      })),
    beerTypes: beerData.reduce((acc, item) => {
      const type = item.beer_type || 'Unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {}),
    countries: [...new Set(beerData.map((item) => item.brewery_country))],
    dateRange: {
      first: beerData[0]?.created_at,
      last: beerData[beerData.length - 1]?.created_at,
    },
    // Add favorite brewery analysis
    favoriteBreweries: beerData.reduce((acc, item) => {
      const brewery = item.brewery_name;
      if (!acc[brewery]) {
        acc[brewery] = {
          count: 0,
          country: item.brewery_country,
          totalRating: 0,
          beers: [],
        };
      }
      acc[brewery].count += 1;
      if (item.rating_score) {
        acc[brewery].totalRating += item.rating_score;
      }
      if (!acc[brewery].beers.includes(item.beer_name)) {
        acc[brewery].beers.push(item.beer_name);
      }
      return acc;
    }, {}),
    // Add venue analysis
    favoriteVenues: beerData.reduce((acc, item) => {
      const venue = item.venue_name;
      if (venue && venue !== 'Untappd at Home') {
        if (!acc[venue]) {
          acc[venue] = {
            count: 0,
            city: item.venue_city,
            country: item.venue_country,
          };
        }
        acc[venue].count += 1;
      }
      return acc;
    }, {}),
  };

  const prompt = `
    Analyze this beer drinking data and provide 3-5 striking, interesting facts about the user's beer consumption patterns for the given date range: ${formatWrappdDates(analysisData.dateRange.first, analysisData.dateRange.last)}
    Focus on unique insights, trends, or surprising statistics that would be engaging to share.

    Data Summary:
    - Total check-ins: ${analysisData.totalCheckins}
    - Unique beers tried: ${analysisData.uniqueBeers}
    - Unique breweries visited: ${analysisData.uniqueBreweries}
    - Average rating: ${analysisData.averageRating.toFixed(2)}/5
    - Top rated beers: ${analysisData.topRatedBeers.map((b) => `${b.name} (${b.rating}/5)`).join(', ')}
    - Beer types consumed: ${Object.entries(analysisData.beerTypes)
      .map(([type, count]) => `${type}: ${count}`)
      .join(', ')}
    - Countries: ${analysisData.countries.join(', ')}
    - Date range: ${analysisData.dateRange.first} to ${analysisData.dateRange.last}

    Favorite Breweries (by check-in count):
    ${Object.entries(analysisData.favoriteBreweries)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, beerData.length > 10 ? 10 : beerData.length)
      .map(([brewery, data]) => `${brewery} (${data.count} beers, ${data.country})`)
      .join(', ')}

    Favorite Venues:
    ${Object.entries(analysisData.favoriteVenues)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, beerData.length > 10 ? 10 : beerData.length)
      .map(
        ([venue, data]) =>
          `${venue} (${data.count} visits, ${data.city}, ${data.country})`
      )
      .join(', ')}

    Please provide:
    1. 2-4 specific, interesting facts about the user's drinking patterns, prefered beer types, drinking locations and days of the week
    2. Any notable trends or preferences
    3. Tell the user their top 3 favorite breweries, tell them about it
    4. Tell the user their top 3 favorite drinking locations, tell them about it, but if the user drank a lot of beers in the same country, it's probably the country they live in, so better to focus on the rest.
    5. Tell the user their top 3 favorite brewery origin countries, tell them about it, but if the user drank a lot of beers from the same country, it's probably the country they live in, so better to focus on the rest.
    6. Tell the user their top 3 favorite beer types, tell them about it, etc.
    7. Don't number the responses, just write them out
    8. Focus on facts, around 4000 characters
    9. Keep it engaging and conversational, as if you're sharing insights with a friend.
    10. If the date range is a full or half year, emphasize that like 'the last 6 months' or 'the last year' or 'in 2024'.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

/* eslint-disable no-console */
import { useState, useContext } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { DataContext } from '../../DataContext';

const AIAnalysis = () => {
  const { beerData } = useContext(DataContext);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeBeerData = async () => {
    if (!beerData || beerData.length === 0) {
      setError('No beer data available for analysis');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        setError('Gemini API key not found. Please check your environment variables.');
        return;
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
          beerData.reduce((sum, item) => sum + (item.rating_score || 0), 0) /
          beerData.length,
        topRatedBeers: beerData
          .filter((item) => item.rating_score)
          .sort((a, b) => b.rating_score - a.rating_score)
          .slice(0, 5)
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
        Analyze this beer drinking data and provide 3-5 striking, interesting facts about the user's beer consumption patterns. 
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
          .slice(0, 5)
          .map(([brewery, data]) => `${brewery} (${data.count} beers, ${data.country})`)
          .join(', ')}

        Favorite Venues:
        ${Object.entries(analysisData.favoriteVenues)
          .sort(([, a], [, b]) => b.count - a.count)
          .slice(0, 5)
          .map(
            ([venue, data]) =>
              `${venue} (${data.count} visits, ${data.city}, ${data.country})`
          )
          .join(', ')}

        Please provide:
        1. A brief overview of their beer journey, around 1000 characters
        2. 2-4 specific, interesting facts about the user's drinking patterns and prefered beer types and drinking locations and days of the week
        3. Any notable trends or preferences
        4. Don't see 'this beer data', say 'your beer data' since it's a personal analysis
        5. Don't number the responses, just write them out
        6. Do some name dropping like the user's favorite beer, favourite brewery, favourite drinking locations. And be specific and include the brewery and country

        Keep it engaging and conversational, as if you're sharing insights with a friend.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setAnalysis(response.text());
    } catch (err) {
      setError('Failed to analyze data. Please check your API key and try again.');
      console.error('AI Analysis Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-bold text-white">AI beer analysis</h2>

        <div className="block overflow-hidden border border-white p-6 shadow-lg md:rounded-lg">
          <div className="mb-4 text-center">
            <p className="text-gray-300">
              Get AI-powered insights about your beer drinking patterns and discover
              interesting facts about your Untappd journey!
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={analyzeBeerData}
              disabled={isLoading || !beerData || beerData.length === 0}
              className={`mx-2 mb-0 flex items-center rounded border px-6 py-3 shadow transition-colors duration-300
                ${
                  isLoading || !beerData || beerData.length === 0
                    ? 'cursor-not-allowed border-gray-600 bg-gray-600 text-gray-400'
                    : 'border-yellow-500 bg-yellow-500 text-gray-900 hover:bg-yellow-400'
                }`}
            >
              {isLoading ? 'Analyzing...' : 'Analyze my checkins'}
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded border border-red-400 bg-red-900/50 p-3 text-red-300">
              {error}
            </div>
          )}

          {analysis && (
            <div className="mt-6 block overflow-hidden bg-gray-700 p-6 shadow-lg md:rounded-lg">
              <h3 className="mb-4 text-xl font-semibold text-yellow-500">
                Your beer analysis
              </h3>
              <div className="prose prose-sm max-w-none text-gray-300">
                {analysis.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-3">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;

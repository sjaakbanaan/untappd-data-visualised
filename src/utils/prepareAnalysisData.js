/**
 * Prepares beer data for AI analysis
 */
export const prepareAnalysisData = (beerData) => {
  const countries = beerData.reduce((acc, item) => {
    const country = item.venue_country;
    if (!country) return acc;

    if (!acc[country]) {
      acc[country] = { beers: 0, days: new Set() };
    }

    acc[country].beers += 1;
    const day = item.created_at?.split(' ')[0];
    if (day) acc[country].days.add(day);

    return acc;
  }, {});

  return {
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
    countries: Object.entries(countries)
      .map(([name, data]) => ({
        name,
        beers: data.beers,
        days: data.days.size,
      }))
      .sort((a, b) => b.beers - a.beers),
    dateRange: {
      first: beerData[0]?.created_at,
      last: beerData[beerData.length - 1]?.created_at,
    },
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
};

/**
 * Builds the analysis prompt from prepared data
 */
export const buildAnalysisPrompt = (analysisData, beerData, formatWrappdDates) => {
  return `
    Analyze this beer drinking data and provide 3-5 striking, interesting facts about the user's beer consumption patterns for the given date range: ${formatWrappdDates(analysisData.dateRange.first, analysisData.dateRange.last)}
    Focus on unique insights, trends, or surprising statistics that would be engaging to share.
    These people are experienced Untappd users, so the amount of beers is not impressive, so don't say things like 'Wow, so many beers!'. Also drinking unique beers is what these people do, no comments about that. Stay factual, no 'ass licking', but also not too serious.

    Data Summary:
    - Total check-ins: ${analysisData.totalCheckins}
    - Unique beers tried: ${analysisData.uniqueBeers}
    - Unique breweries visited: ${analysisData.uniqueBreweries}
    - Average rating: ${analysisData.averageRating.toFixed(2)}/5
    - Top rated beers: ${analysisData.topRatedBeers.map((b) => `${b.name} (${b.rating}/5)`).join(', ')}
    - Beer types consumed: ${Object.entries(analysisData.beerTypes)
      .map(([type, count]) => `${type}: ${count}`)
      .join(', ')}
    - Countries (where the beers were drunk): ${analysisData.countries
      .map(
        ({ name, beers, days }) =>
          `${name} (${beers} ${beers === 1 ? 'beer' : 'beers'} over ${days} ${days === 1 ? 'day' : 'days'})`
      )
      .join(', ')}
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
    8. Focus on facts, around 2500 characters
    9. Keep it engaging and conversational, as if you're sharing insights with a friend.
    10. If the date range is a full or half year, emphasize that like 'the last 6 months' or 'the last year' or 'in 2024'.
    12. See if the user went on holiday based on the Countries data, if so, mention it.
    11. Make use of markdown formatting for the response, like **bold**, *italic*, etc.
  `;
};

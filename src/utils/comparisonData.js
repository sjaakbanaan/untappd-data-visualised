import { ref, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';

export const COMPARISON_DATA_VERSION = 1;

const COMPARISON_FIELDS = [
  'bid',
  'beer_name',
  'beer_type',
  'beer_url',
  'brewery_name',
  'brewery_country',
  'checkin_id',
  'created_at',
  'global_rating_score',
  'global_total_checkins',
  'global_unique_users',
  'photo_url',
  'purchase_venue',
  'rating_score',
  'tagged_friends',
  'total_comments',
  'total_toasts',
  'venue_city',
  'venue_country',
  'venue_name',
];

const getCheckinDate = (item) => item?.created_at?.split(' ')[0] || null;

export const getDataCoverage = (beerData) => {
  if (!Array.isArray(beerData) || beerData.length === 0) {
    return { firstCheckinDate: null, lastCheckinDate: null };
  }

  const dates = beerData.map(getCheckinDate).filter(Boolean).sort();

  return {
    firstCheckinDate: dates[0] || null,
    lastCheckinDate: dates[dates.length - 1] || null,
  };
};

export const buildComparisonData = (beerData) => {
  const checkins = Array.isArray(beerData)
    ? beerData.map((item) =>
        COMPARISON_FIELDS.reduce((acc, field) => {
          if (item[field] !== undefined) {
            acc[field] = item[field];
          }
          return acc;
        }, {})
      )
    : [];

  return {
    version: COMPARISON_DATA_VERSION,
    exportedAt: new Date().toISOString(),
    ...getDataCoverage(checkins),
    checkins,
  };
};

const addToSet = (target, value) => {
  if (value !== undefined && value !== null && value !== '') {
    target.add(value);
  }
};

const serializeDay = (day) => ({
  date: day.date,
  total: day.total,
  uniqueBeerIds: [...day.uniqueBeerIds],
  breweries: [...day.breweries],
  beerStyles: [...day.beerStyles],
  venues: [...day.venues],
  purchaseVenues: [...day.purchaseVenues],
  cities: [...day.cities],
  countries: [...day.countries],
  breweryCountries: [...day.breweryCountries],
  friends: [...day.friends],
  photos: day.photos,
  toasts: day.toasts,
  comments: day.comments,
  ratingSum: day.ratingSum,
  ratingCount: day.ratingCount,
  globalRatingSum: day.globalRatingSum,
  globalRatingCount: day.globalRatingCount,
  higherThanGlobal: day.higherThanGlobal,
  lowerThanGlobal: day.lowerThanGlobal,
  mostCheckedIn: day.mostCheckedIn,
  mostUniqueDrinkers: day.mostUniqueDrinkers,
});

export const buildComparisonStatsDays = (beerData) => {
  if (!Array.isArray(beerData)) return [];

  const days = new Map();

  beerData.forEach((item) => {
    const date = getCheckinDate(item);
    if (!date) return;

    if (!days.has(date)) {
      days.set(date, {
        date,
        total: 0,
        uniqueBeerIds: new Set(),
        breweries: new Set(),
        beerStyles: new Set(),
        venues: new Set(),
        purchaseVenues: new Set(),
        cities: new Set(),
        countries: new Set(),
        breweryCountries: new Set(),
        friends: new Set(),
        photos: 0,
        toasts: 0,
        comments: 0,
        ratingSum: 0,
        ratingCount: 0,
        globalRatingSum: 0,
        globalRatingCount: 0,
        higherThanGlobal: 0,
        lowerThanGlobal: 0,
        mostCheckedIn: null,
        mostUniqueDrinkers: null,
      });
    }

    const day = days.get(date);
    const rating = Number(item.rating_score);
    const globalRating = Number(item.global_rating_score);

    day.total += 1;
    addToSet(day.uniqueBeerIds, item.bid);
    addToSet(day.breweries, item.brewery_name);
    addToSet(day.beerStyles, item.beer_type);
    addToSet(day.venues, item.venue_name);
    addToSet(day.purchaseVenues, item.purchase_venue);
    addToSet(day.cities, item.venue_city);
    addToSet(day.countries, item.venue_country);
    addToSet(day.breweryCountries, item.brewery_country);

    if (item.tagged_friends) {
      item.tagged_friends
        .split(',')
        .map((friend) => friend.trim())
        .forEach((friend) => addToSet(day.friends, friend));
    }

    if (item.photo_url) day.photos += 1;
    if (Number(item.total_toasts) !== 0) day.toasts += 1;
    if (Number(item.total_comments) !== 0) day.comments += 1;

    if (rating > 0) {
      day.ratingSum += rating;
      day.ratingCount += 1;

      if (Number.isFinite(globalRating) && rating !== globalRating) {
        if (rating > globalRating) day.higherThanGlobal += 1;
        if (rating < globalRating) day.lowerThanGlobal += 1;
      }
    }

    if (globalRating > 0) {
      day.globalRatingSum += globalRating;
      day.globalRatingCount += 1;
    }

    if (
      item.global_total_checkins != null &&
      (!day.mostCheckedIn ||
        item.global_total_checkins > day.mostCheckedIn.global_total_checkins)
    ) {
      day.mostCheckedIn = {
        beer_name: item.beer_name,
        beer_url: item.beer_url,
        global_total_checkins: item.global_total_checkins,
      };
    }

    if (
      item.global_unique_users != null &&
      (!day.mostUniqueDrinkers ||
        item.global_unique_users > day.mostUniqueDrinkers.global_unique_users)
    ) {
      day.mostUniqueDrinkers = {
        beer_name: item.beer_name,
        beer_url: item.beer_url,
        global_unique_users: item.global_unique_users,
      };
    }
  });

  return [...days.values()]
    .map(serializeDay)
    .sort((a, b) => a.date.localeCompare(b.date));
};

export const getComparisonStoragePath = (uid) =>
  uid ? `public-comparison/${uid}.json` : null;

export const uploadComparisonData = async (user, beerData) => {
  if (!user?.uid || !Array.isArray(beerData) || beerData.length === 0) return null;

  const comparisonData = buildComparisonData(beerData);
  const blob = new Blob([JSON.stringify(comparisonData)], {
    type: 'application/json',
  });

  await uploadBytes(ref(storage, getComparisonStoragePath(user.uid)), blob);

  return comparisonData;
};

export const deleteComparisonData = async (uid) => {
  if (!uid) return;

  try {
    await deleteObject(ref(storage, getComparisonStoragePath(uid)));
  } catch (error) {
    if (error.code !== 'storage/object-not-found') {
      throw error;
    }
  }
};

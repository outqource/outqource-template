import axios from 'axios';
import queryString from 'query-string';

import config from '../config';

type TCoordination = {
  latitude: string | null;
  longitude: string | null;
};

interface DistanceProps {
  target: TCoordination;
  current: TCoordination;
}

export const getLocationByAddress = async (address: string, page = 1, size = 15) => {
  const query = {
    query: address,
  };

  const url = `https://dapi.kakao.com/v2/local/search/address?${queryString.stringify(query)}`;
  const headers = {
    Authorization: `KakaoAK ${config.KAKAO_KEY}`,
  };
  const response = await axios.get(url, { headers });

  return { data: response.data.documents, count: response.data.meta.total_count };
};

export const getLocationByKeyword = async (
  keyword: string,
  x: string,
  y: string,

  radius?: number,
  page = 1,
  size = 15
) => {
  const query: Record<string, string | number> = {
    query: keyword,
    page,
    size,
    x,
    y,
  };

  if (radius) query['radius'] = radius;

  const headers = {
    Authorization: `KakaoAK ${config.KAKAO_KEY}`,
  };

  const kakaoUrl = `https://dapi.kakao.com/v2/local/search/keyword?${queryString.stringify(query)}`;

  const response = await axios.get(kakaoUrl, { headers });

  return { data: response.data.documents, count: response.data.meta.total_count };
};

export const getLocationByGeocode = async (x: string, y: string): Promise<any[]> => {
  const query = { x, y };
  const url = `https://dapi.kakao.com/v2/local/geo/coord2address?${queryString.stringify(query)}`;
  const headers = {
    Authorization: `KakaoAK ${config.KAKAO_KEY}`,
  };
  const response = await axios.get(url, { headers });

  return response.data.documents;
};

export const getDistance = ({ target, current }: DistanceProps) => {
  if (!target.latitude || !target.longitude) return -1;
  const R = 6371e3; // metres
  const φ1 = (Number(current.latitude) * Math.PI) / 180; // φ, λ in radians
  const φ2 = (Number(target.latitude) * Math.PI) / 180;
  const Δφ = ((Number(target.latitude) - Number(current.latitude)) * Math.PI) / 180;
  const Δλ = ((Number(target.longitude) - Number(target.longitude)) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;

  return d;
};

export const sortByDistance = ({
  prev,
  next,
  options,
}: {
  prev: TCoordination;
  next: TCoordination;
  options: TCoordination;
}): number => {
  const { longitude: prevLongitude, latitude: prevLatitude } = prev;
  const { longitude: nextLongitude, latitude: nextLatitude } = next;

  if (!prevLatitude || !prevLongitude || !nextLatitude || !nextLongitude) return 0;

  const prevDistance = getDistance({
    target: { latitude: prevLatitude as string, longitude: prevLongitude as string },
    current: {
      latitude: options.latitude as string,
      longitude: options.longitude as string,
    },
  });
  const nextDistance = getDistance({
    target: { latitude: nextLatitude as string, longitude: nextLongitude as string },
    current: {
      latitude: options.latitude as string,
      longitude: options.longitude as string,
    },
  });

  if (prevDistance === -1 || prevDistance > nextDistance) return 1;
  else if (prevDistance < nextDistance) return -1;
  else return 0;
};

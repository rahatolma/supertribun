import { inject, track } from '@vercel/analytics';
import { consentStore } from './consent';
import { filterMeasurement, permittedEvent } from './measurement-policy';

export const measurementEnabled = import.meta.env.PROD;
export const beforeAnalytics = (event) => filterMeasurement(event, consentStore.allows('analytics'));
export const beforePerformance = (event) => filterMeasurement(event, consentStore.allows('performance'));

export function trackSiteEvent(name) {
  const event = permittedEvent(name, measurementEnabled && consentStore.allows('analytics'));
  if (!event) return;
  // Consent can be granted immediately before the first click. Initialise the
  // queue synchronously so that click cannot race the React Analytics effect.
  inject({ beforeSend: beforeAnalytics });
  track(event.name, event.properties);
}

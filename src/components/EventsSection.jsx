import React from 'react';
import { useAdminContent } from '@/hooks/useAdminContent';
import EventsCalendar from '@/components/EventsCalendar';

export default function EventsSection() {
  const { content } = useAdminContent();
  const { events } = content.eventsSection || { events: [] };

  if (!events || events.length === 0) {
    return null;
  }

  return <EventsCalendar events={events} />;
}

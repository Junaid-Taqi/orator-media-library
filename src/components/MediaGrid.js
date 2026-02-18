import React from 'react';
import MediaCard from './MediaCard';

export default function MediaGrid({ user, items = [] }) {
  return (
    <section className="media-grid">
      {items.map(item => (
        <MediaCard key={item.mediaId} item={item} user={user} />
      ))}
    </section>
  );
}

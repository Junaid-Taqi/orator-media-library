import React from 'react';
import MediaCard from './MediaCard';

export default function MediaGrid({ items = [] }) {
  return (
    <section className="media-grid">
      {items.map(item => (
        <MediaCard key={item.mediaId} item={item} />
      ))}
    </section>
  );
}

import React, { useState } from 'react';
import MediaCard from './MediaCard';

export default function MediaGrid({ user, items = [] }) {
  const [visibleCount, setVisibleCount] = useState(16);

  return (
    <>
      <section className="media-grid">
        {items.slice(0, visibleCount).map(item => (
          <MediaCard key={item.mediaId} item={item} user={user} />
        ))}
      </section>

      {visibleCount < items.length && (
        <div style={{ textAlign: 'center' }}>
          <button
            className="btn btn-outline-primary px-4 py-2 my-5 text-white"
            onClick={() => setVisibleCount(prev => prev + 16)}
            style={{ fontWeight: 500, borderRadius: '50rem', borderColor: '#fff' }}
          >
            Load More Media
          </button>
        </div>
      )}
    </>
  );
}

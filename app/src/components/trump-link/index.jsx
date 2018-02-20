import React from 'react';

export default function ({id, children}) {
  return (
    <a href={`https://twitter.com/realDonaldTrump/status/${id}`} target="_blank" rel="noopener noreferrer">
      { children }
    </a>
  );
}

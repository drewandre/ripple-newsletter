import React from 'react';

const ArtistList = props => {
	let artistList = props.savedArtists.map(artist => {
		return (
			<div id="artist-text" key={Date.now() * 1000 * Math.random(1000)}>
				{artist.name}
			</div>
		);
	});
	return <div className="saved-artist-list">{artistList}</div>;
};

export default ArtistList;

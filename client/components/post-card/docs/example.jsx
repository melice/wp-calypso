/**
* External dependencies
*/
import React from 'react';

/**
 * Internal dependencies
 */
import SmallPostCard from 'components/post-card/small';
import SearchPostCard from 'components/post-card/search';

const smallItems = [
	{
		post: {
			ID: 1,
			title: 'What cats are best for coastal Maine?',
			site_ID: 1234,
			site_name: 'All the catsss',
			global_ID: 1,
			author: {
				name: 'wolvy'
			},
			canonical_image: {
				uri: 'http://lorempixel.com/256/256/cats/',
				height: 256,
				width: 256
			}
		},
		site: {
			ID: 1234,
			title: 'All the cats',
			URL: 'http://www.allthecats.com',
			icon: {
				img: 'http://lorempixel.com/64/64/cats/'
			}
		}
	},
	{
		post: {
			ID: 2,
			title: 'No Site? No Problem.',
			site_ID: 99,
			site_name: '99 Problems',
			global_ID: 2,
			author: {
				name: 'wolvy'
			},
			canonical_image: {
				uri: 'http://lorempixel.com/1024/256/sports/',
				height: 256,
				width: 1024
			}
		}
	},
	{
		post: {
			ID: 3,
			title: 'Seven weird numbers that are even lonlier than one. You won\'t believe number 4',
			site_ID: 7,
			site_name: 'Made You Click! Made You Click! Made You Click! Made You Click! Made You Click! Made You Click! Made You Click! Made You Click! Made You Click! Made You Click!',
			global_ID: 3,
			author: {
				name: 'wolvy'
			},
			canonical_image: {
				uri: 'http://lorempixel.com/128/96/sports/',
				height: 96,
				width: 128
			}
		}
	},
	{
		post: {
			ID: 2,
			title: 'No Image? No Problem. We don\'t need an image where we\'re going',
			site_ID: 99,
			site_name: 'The text only web is the only web we need.',
			global_ID: 4,
			author: {
				name: 'wolvy'
			}
		}
	},
];

const searchItems = [
	{
		post: {
			ID: 1,
			title: 'A first post',
			content: 'Look, I have content!',
			site_ID: 1,
			site_URL: 'http://example.com',
			feed_ID: 1,
			feed_item_ID: 1,
			author: {
				name: 'Sue Smith',
				email: 'sue@example.com'
			},
			discussion: {
				comment_count: 15
			},
			canonical_image: {
				uri: 'https://placekitten.com/600/400',
				width: 300,
				height: 200
			},
			date: '1976-09-15T10:12:00Z',

			excerpt: 'Amazing cat photos updated daily. Come back at three for tabbies.'
		},
		site: {
			ID: 1,
			title: 'My Site'
		},
		feed: {
			feed_ID: 1
		}
	}
];

const PostCards = React.createClass( {
	displayName: 'PostCard',

	render: function() {
		return (
			<div className="design-assets__group">
				<h2>
					<a href="/devdocs/app-components/post-card">Post Cards</a>
				</h2>
				<h3>Small Post Cards</h3>
				<div>
					{ smallItems.map( item => <SmallPostCard key={ item.post.global_ID } post={ item.post } site={ item.site } /> ) }
				</div>

				<h3>Search Cards</h3>
				<div>
					{ searchItems.map( item => <SearchPostCard key={ item.post.global_ID } post={ item.post } site={ item.site } /> ) }
				</div>
			</div>
		);
	}
} );

module.exports = PostCards;

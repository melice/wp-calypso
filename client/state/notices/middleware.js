/**
 * External dependencies
 */
import { truncate, forEach } from 'lodash';
import { translate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { errorNotice } from 'state/notices/actions';
import { POST_DELETE_FAILURE } from 'state/action-types';
import { getSitePost } from 'state/posts/selectors';

const OBSERVERS = {
	[ POST_DELETE_FAILURE ]: [
		( action, dispatch, getState ) => {
			const post = getSitePost( getState(), action.siteId, action.postId );

			let message;
			if ( post ) {
				message = translate( 'An error occurred while deleting "%s"', {
					args: [ truncate( post.title, { length: 24 } ) ]
				} );
			} else {
				message = translate( 'An error occurred while deleting the post' );
			}

			dispatch( errorNotice( message ) );
		}
	]
};

export default function( { dispatch, getState } ) {
	return ( next ) => ( action ) => {
		forEach( OBSERVERS[ action.type ], ( observer ) => observer( action, dispatch, getState ) );

		return next( action );
	};
}

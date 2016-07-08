import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-pure-render/mixin';
import classNames from 'classnames';
import crypto from 'crypto';

const baseDomain = url =>
	url
		.replace( /^[^/]+[/]*/, '' ) // strip leading protocol
		.replace( /\/.*$/, '' ); // strip everything after the domain

const blavatarUrl = slug => {
	const slugHash = crypto
		.createHash( 'md5' )
		.update( slug )
		.digest( 'hex' );

	return `https://secure.gravatar.com/blavatar/${ slugHash }?s=512`;
};

export const TwitterPreview = React.createClass( {
	mixins: [ PureRenderMixin ],

	render() {
		const {
			url,
			title,
			type,
			description,
			image,
			slug
		} = this.props;

		const previewClasses = classNames( 'twitter-card-preview', {
			[ `twitter-card-preview__${ type }` ]: true
		} );

		return (
			<div className={ previewClasses }>
				<div className="twitter-card-preview__image">
					<img className="" src={ image || blavatarUrl( slug ) } />
				</div>
				<div className="twitter-card-preview__body">
					<div className="twitter-card-preview__title">
						{ title || '' }
					</div>
					<div className="twitter-card-preview__description">
						{ description || '' }
					</div>
					<div className="twitter-card-preview__url">
						{ baseDomain( url ) }
					</div>
				</div>
			</div>
		);
	}
} );

TwitterPreview.propTypes = {
	url: PropTypes.string,
	title: PropTypes.string,
	type: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
	slug: PropTypes.string
};

export default TwitterPreview;

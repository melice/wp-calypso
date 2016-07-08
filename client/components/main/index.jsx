/** @ssr-ready **/

/**
 * External dependencies
 */
import React from 'react';
import { connect }	from 'react-redux';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { shouldViewBeVisible } from 'state/first-view/selectors';

const Main = React.createClass( {
	displayName: 'Main',

	render: function() {
		const classes = classnames( this.props.className, 'main', {
			'is-first-view-visible': this.props.isFirstViewVisible
		} );

		return (
			<main className={ classes } role="main">
				{ this.props.children }
			</main>
		);
	}
} );

export default connect(
	( state ) => {
		return {
			isFirstViewVisible: shouldViewBeVisible( state ),
		};
	},
	null
)( Main );

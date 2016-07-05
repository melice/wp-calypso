/**
 * External dependencies
 */
import React from 'react' ;

/**
 * Internal dependencies
 */
import Card from 'components/card';
import { localize } from 'i18n-calypso';

const NonOwnerCard = ( { translate } ) => {
	return (
		<Card className="domain-management-non-owner-card">
			<p className="domain-management-non-owner-card__explanation">
				{ translate(
					'These settings can be changed by the user who registered the domain.'
				) }
			</p>
		</Card>
	);
};

export default localize( NonOwnerCard );

/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	getSyncStatus,
	getFullSyncRequest,
	isPendingSyncStart,
	isFullSyncing,
	getSyncProgressPercentage
} from '../selectors';

const nonExistentId = '111111';
const requestedSiteId = '123456';
const successfulSiteId = '1234567';
const errorSiteId = '12345678';
const syncScheduledSiteID = '123455';
const oldSyncSiteId = '987654321';
const syncStartedSiteId = '87654321';
const syncInProgressSiteId = '7654321';

const syncStatusSuccessful = {
	isRequesting: false,
	error: false,
	lastSuccessfulStatus: 1467926563436,
	started: 1466010260,
	queue_finished: 1466010260,
	sent_started: 1466010290,
	finished: 1466010313,
	queue: {
		constants: 1,
		functions: 1,
		options: 1,
		terms: 3,
		themes: 1,
		users: 2,
		posts: 15,
		comments: 1,
		updates: 6
	},
	sent: {
		constants: 1,
		functions: 1,
		options: 1,
		terms: 3,
		themes: 1,
		users: 2,
		posts: 15,
		comments: 1
	},
	is_scheduled: false
};

const syncStatusScheduled = {
	isRequesting: false,
	error: false,
	lastSuccessfulStatus: 1467926563436,
	started: 1466010260,
	queue_finished: 1466010260,
	sent_started: 1466010290,
	finished: 1466010313,
	queue: {
		constants: 1,
		functions: 1,
		options: 1,
		terms: 3,
		themes: 1,
		users: 2,
		posts: 15,
		comments: 1,
		updates: 6
	},
	sent: {
		constants: 1,
		functions: 1,
		options: 1,
		terms: 3,
		themes: 1,
		users: 2,
		posts: 15,
		comments: 1
	},
	is_scheduled: true
};

const syncStatusErrored = {
	isRequesting: false,
	error: {
		statusCode: 400
	}
};

const syncStatusStarted = {
	started: 1467998622,
	queue_finished: 1467998622,
	queue: {
		constants: 1,
		functions: 1,
		options: 1,
		terms: 1,
		themes: 1,
		users: 1,
		posts: 102,
		comments: 1,
		updates: 1
	},
	sent: [],
	is_scheduled: false
};

const syncStatusInProgress = {
	started: 1467998622,
	queue_finished: 1467998622,
	sent_started: 1467999200,
	queue: {
		constants: 1,
		functions: 1,
		options: 1,
		terms: 1,
		themes: 1,
		users: 1,
		posts: 102,
		comments: 1,
		updates: 1
	},
	sent: {
		constants: 1,
		functions: 1,
		options: 1,
		terms: 1,
		themes: 1,
		users: 1,
		posts: 25
	},
	is_scheduled: false,
};

const fullSyncRequested = {
	isRequesting: true,
	lastRequested: 1467944517955
};

const fullSyncRequestSuccessful = {
	isRequesting: true,
	scheduled: true,
	error: false,
	lastRequested: 1467944517955
};

const fullSyncRequestOld = {
	isRequesting: true,
	scheduled: true,
	error: false,
	lastRequested: 1467926563435
};

const fullSyncRequestErrored = {
	isRequesting: false,
	scheduled: false,
	lastRequested: 1467944517955,
	error: {
		statusCode: 400
	}
};

const testState = {
	jetpackSync: {
		syncStatus: {
			[ successfulSiteId ]: syncStatusSuccessful,
			[ errorSiteId ]: syncStatusErrored,
			[ syncScheduledSiteID ]: syncStatusScheduled,
			[ oldSyncSiteId ]: syncStatusSuccessful,
			[ syncStartedSiteId ]: syncStatusStarted,
			[ syncInProgressSiteId ]: syncStatusInProgress
		},
		fullSyncRequest: {
			[ requestedSiteId ]: fullSyncRequested,
			[ successfulSiteId ]: fullSyncRequestSuccessful,
			[ errorSiteId ]: fullSyncRequestErrored,
			[ oldSyncSiteId ]: fullSyncRequestOld
		}
	}
};

describe( 'selectors', () => {
	describe( '#getSyncStatus()', () => {
		it( 'should return undefined when state is {}', () => {
			const syncStatus = getSyncStatus( {}, nonExistentId );
			expect( syncStatus ).to.be.eql( undefined );
		} );

		it( 'should return undefined if site is not in state', () => {
			const syncStatus = getSyncStatus( testState, nonExistentId );
			expect( syncStatus ).to.be.eql( undefined );
		} );

		it( 'should return sync status for site if site in state', () => {
			const syncStatus = getSyncStatus( testState, successfulSiteId );
			expect( syncStatus ).to.be.eql( testState.jetpackSync.syncStatus[ successfulSiteId ] );
		} );
	} );

	describe( '#getFullSyncRequest()', () => {
		it( 'should return undefined when state is {}', () => {
			const fullSyncRequest = getFullSyncRequest( {}, nonExistentId );
			expect( fullSyncRequest ).to.be.eql( undefined );
		} );

		it( 'should return undefined if site is not in state', () => {
			const fullSyncRequest = getFullSyncRequest( testState, nonExistentId );
			expect( fullSyncRequest ).to.be.eql( undefined );
		} );

		it( 'should return full sync status for a site if in state', () => {
			const fullSyncRequest = getFullSyncRequest( testState, successfulSiteId );
			expect( fullSyncRequest ).to.be.eql( testState.jetpackSync.fullSyncRequest[ successfulSiteId ] );
		} );
	} );

	describe( '#isPendingSyncStart()', () => {
		it( 'should return true if a sync is scheduled', () => {
			const test = isPendingSyncStart( testState, syncScheduledSiteID );
			expect( test ).to.be.true;
		} );

		it( 'should return false if sync status and full sync request show not scheduled', () => {
			const test = isPendingSyncStart( testState, errorSiteId );
			expect( test ).to.be.false;
		} );

		it( 'should return true if a sync has been requested, but before sync status has updated', () => {
			const test = isPendingSyncStart( testState, successfulSiteId );
			expect( test ).to.be.true;
		} );

		it( 'should be false if a sync has been requested, but sync has already finished', () => {
			const test = isPendingSyncStart( testState, oldSyncSiteId );
			expect( test ).to.be.false;
		} );
	} );

	describe( '#isFullSyncing()', () => {
		it( 'should return false if no sync status for a site', () => {
			const test = isFullSyncing( testState, nonExistentId );
			expect( test ).to.be.false;
		} );

		it( 'should return false if syncing is has finished', () => {
			const test = isFullSyncing( testState, successfulSiteId );
			expect( test ).to.be.false;
		} );

		it( 'should return false if syncing is scheduled but not started', () => {
			const test = isFullSyncing( testState, syncScheduledSiteID );
			expect( test ).to.be.false;
		} );

		it( 'should return true if sync has started and not finished', () => {
			const test = isFullSyncing( testState, syncStartedSiteId );
			expect( test ).to.be.true;
		} );
	} );

	describe( '#getSyncProgressPercentage()', () => {
		it( 'should return 0 if no sync status for a site', () => {
			const test = getSyncProgressPercentage( testState, nonExistentId );
			expect( test ).to.be.eql( 0 );
		} );

		it( 'should return a non-zero integer if site has sent data to be synced', () => {
			const test = getSyncProgressPercentage( testState, syncInProgressSiteId );
			expect( test ).to.be.eql( 29 )
		} );
	} );
} );

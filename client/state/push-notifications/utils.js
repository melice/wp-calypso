/**
 * Internal dependencies
 */
import {
	isServiceWorkerSupported,
} from 'lib/service-worker';

export function isUnsupportedChromeVersion() {
	if ( window && window.chrome && window.navigator.appVersion ) {
		return getChromeVersion() < 50;
	}
	return false;
}

export function getChromeVersion() {
	return window.navigator.appVersion.match( /Chrome\/(\d+)/ )[ 1 ];
}

export function isPushNotificationsSupported() {
	return (
		isServiceWorkerSupported() &&
		'showNotification' in window.ServiceWorkerRegistration.prototype &&
		'PushManager' in window
	);
}

export function isPushNotificationsDenied() {
	return (
		( ! ( 'Notification' in window ) ) ||
		'denied' === window.Notification.permission
	);
}

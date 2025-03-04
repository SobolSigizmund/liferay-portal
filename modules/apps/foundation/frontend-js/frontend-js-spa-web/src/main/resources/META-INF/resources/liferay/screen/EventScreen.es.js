'use strict';

import HtmlScreen from 'senna/src/screen/HtmlScreen';
import {CancellablePromise} from 'metal-promise/src/promise/Promise';
import Utils from '../util/Utils.es';

class EventScreen extends HtmlScreen {
	constructor() {
		super();

		this.cacheable = false;
		this.timeout = Liferay.PropsValues.JAVASCRIPT_SINGLE_PAGE_APPLICATION_TIMEOUT;
	}

	dispose() {
		super.dispose();

		Liferay.fire(
			'screenDispose',
			{
				app: Liferay.SPA.app,
				screen: this
			}
		);
	}

	activate() {
		super.activate();

		Liferay.fire(
			'screenActivate',
			{
				app: Liferay.SPA.app,
				screen: this
			}
		);
	}

	addCache(content) {
		super.addCache(content);

		this.cacheLastModified = (new Date()).getTime();
	}

	deactivate() {
		super.deactivate();

		Liferay.fire(
			'screenDeactivate',
			{
				app: Liferay.SPA.app,
				screen: this
			}
		);
	}

	beforeScreenFlip() {
		Liferay.fire(
			'beforeScreenFlip',
			{
				app: Liferay.SPA.app,
				screen: this
			}
		);
	}

	flip(surfaces) {
		document.body.className = this.virtualDocument.querySelector('body').className;

		return CancellablePromise.resolve(Utils.resetAllPortlets())
			.then(CancellablePromise.resolve(this.beforeScreenFlip()))
			.then(super.flip(surfaces))
			.then(
				() => {
					Liferay.fire(
						'screenFlip',
						{
							app: Liferay.SPA.app,
							screen: this
						}
					);
				}
			);
	}

	getCache() {
		var app = Liferay.SPA.app;

		if (app.isCacheEnabled() && !app.isScreenCacheExpired(this)) {
			return super.getCache();
		}

		return null;
	}

	getCacheLastModified() {
		return this.cacheLastModified;
	}

	isValidResponseStatusCode(statusCode) {
		var validStatusCodes = Liferay.SPA.app.getValidStatusCodes();

		return super.isValidResponseStatusCode(statusCode) || (validStatusCodes.indexOf(statusCode) > -1);
	}

	load(path) {
		return super.load(path)
			.then(
				(content) => {
					Liferay.fire(
						'screenLoad',
						{
							app: Liferay.SPA.app,
							content: content,
							screen: this
						}
					);

					return content;
				}
			);
	}
}

export default EventScreen;
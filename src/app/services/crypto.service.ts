import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

import { StorageService } from '@services/storage.service';

@Injectable({
	providedIn: 'root'
})
export class CryptoService {

	sessionInitial = 'rs';

	constructor(
		private storageService: StorageService,
	) { }

	encryptData(data: unknown): string {
		return Buffer.from(JSON.stringify(data)).toString('base64');
	}

	decryptData(data: string): unknown {
		const encrypted = Buffer.from(data, 'base64').toString('ascii');
		return JSON.parse(encrypted);
	}

	setEncryptedStorage(key: string, data: unknown): void {
		const encryptedString = this.encryptData(data);
		const keyName = this.sessionInitial + '-' + key.trim();
		this.storageService.set(keyName, encryptedString);
	}

	getDecryptedStorage(key: string): unknown {
		const keyName = this.sessionInitial + '-' + key.trim();
		const storageData = this.storageService.get(keyName);
		if (storageData) {
			return this.decryptData(storageData);
		}
		return null;
	}

	removeEncryptedStorage(key: string): void {
		const keyName = this.sessionInitial + '-' + key.trim();
		this.storageService.remove(keyName);
	}
}

import fs from 'fs';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

import environment from '../config/environment';

export class JwtUtil {
	static privateKey = fs.readFileSync('cert/private.key');
	static publicKey = fs.readFileSync('cert/public.key');

	static generateToken(payload: string | Buffer | object, audience: string) {
		return {
			authToken: this.generateAuthToken(payload, audience),
			refreshToken: this.generateRefreshToken(payload, audience),
		};
	}

	static generateAuthToken(payload: string | Buffer | object, audience: string, expiresIn = environment.JWT_EXPIRE) {
		return Jwt.sign(payload, this.privateKey, {
			expiresIn: expiresIn,
			audience: audience,
			subject: 'auth.token',
			algorithm: 'RS256',
		});
	}

	static generateRefreshToken(payload: string | Buffer | object, audience: string, expiresIn = environment.JWT_REFRESH_EXPIRE) {
		return Jwt.sign(payload, this.privateKey, {
			expiresIn: expiresIn,
			audience: audience,
			subject: 'refresh.token',
			algorithm: 'RS256',
		});
	}

	static verifyAuthToken(token: string, audience: string):JwtPayload|string {
		return Jwt.verify(token, this.publicKey, {
			audience: audience,
			subject: 'auth.token',
			algorithms: ['RS256'],
		});
	}

	static verifyRefreshToken(token: string, audience: string):JwtPayload|string {
		return Jwt.verify(token, this.publicKey, {
			audience: audience,
			subject: 'refresh.token',
			algorithms: ['RS256'],
		});
	}

	static decode(token: string) {
		return jwtDecode(token);
	}
}

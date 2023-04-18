import { cleanEnv, str, port,
	//  email, url
} from 'envalid';

const validateEnv = () => {
	cleanEnv(process.env, {
		NODE_ENV: str(),
		PORT: port(),
		LOG_DIR: str(),
		// JWT_EXPIRE: str(),
		// JWT_REFRESH_EXPIRE: str(),
		MONGO_URI: str(),
		// REDIS_PORT: str(),
		// REDIS_HOST: str(),
		// REDIS_PASSWORD: str(),
		// EMAIL_FROM: email(),
		// APP_NAME: str(),
		// SELLER_EMAIL_VERIFICATION_LINK: url(),
		// SELLER_FRONTEND_DASHBOARD_URL: url(),
		// SELLER_LINK_EXPIRE_URL: url(),
		// SELLER_RESET_PASSWORD_LINK: url(),
		// VERIFY_FORGOT_PASSWORD_LINK: url(),
	});
};

export default validateEnv;
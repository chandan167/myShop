import moment from 'moment';

export class DateUtil {

	static addMinutes(minutes:number) {
		return moment().add(minutes, 'minute');
	}

	static now() {
		return moment();
	}

}

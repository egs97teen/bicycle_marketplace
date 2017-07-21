export class User {
	constructor (
		public first_name: string ="",
		public last_name: string ="",
		public username: string="",
		public email: string = "",
		public password: string = "",
		public birthday = null,
		public bicycles = []
		) {}
}

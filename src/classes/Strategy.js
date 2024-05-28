class Strategy {
	execute(a, b) {
		throw new Error("method must be executed");
	}
}

class SortByTitleStrategy extends Strategy {
	execute(tasks, method) {
		switch (method) {
			case 'asc':
				return tasks.slice().sort((a, b) => a.localeCompare(b));
			case 'desc':
				return tasks.slice().sort((a, b) => b.localeCompare(a));
			default:
				throw new Error("method must be asc or desc");
		}
	}
}

const sortStrategies = new SortByTitleStrategy();
export default sortStrategies;
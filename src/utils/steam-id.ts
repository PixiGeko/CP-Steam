export function cleanId(id: string) {
	if(id.startsWith('@')) {
		return id.substring(1);
	}

	return id;
}
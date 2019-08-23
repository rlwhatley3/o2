export interface IPin {
	pin: number;
	mode: string;
	value: number;
	debugging: boolean;
	get?(): number;
	set?(value: number): void;
}

